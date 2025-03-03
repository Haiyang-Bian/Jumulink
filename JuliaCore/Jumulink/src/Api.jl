const CORS_HEADERS = [
    "Access-Control-Allow-Origin" => "*",
    "Access-Control-Allow-Headers" => "*",
    "Access-Control-Allow-Methods" => "POST, GET, OPTIONS"
]

# 本质上是作用域的问题，如果把serve放在函数中
# 路由放在函数外，导致定义在函数外，服务器丢失路由
# 然而这个问题主要出现在包的发布模式下，直接include似乎又不是必然发生
# 有待进一步的探究。。。
function core_middleware(handler)
    return function (req)
        if HTTP.method(req) in ["OPTIONS", "GET", "POST"]
            println(handler(req))
            return HTTP.Response(200, CORS_HEADERS, HTTP.body(handler(req)))
        else
            return handler(req)
        end
    end
end

# 定义路由并异步启动服务器（鬼日的宏）
function server_mode()
    @get "/connect" function (res::HTTP.Request)
        # 测试连接
        return "连接成功！"
    end

    @websocket "/calculation" function (ws::HTTP.WebSocket)
        for msg in ws
            @info "接受到计算请求！开始解析请求。。。"
            println(msg)
            msg = JSON3.read(msg, Dict)
            @info "解析完毕！开始计算。。。"
            res = ControlSystem(msg)
            @info "求解完成！"
            res = JSON3.write(res)
            send(ws, res)
        end
    end

    serve(async=true, middleware=[core_middleware])
end

# 关闭服务器
function close_server()
    terminate()
end