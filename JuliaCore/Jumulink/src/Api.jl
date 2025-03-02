const CORS_HEADERS = [
    "Access-Control-Allow-Origin" => "*",
    "Access-Control-Allow-Headers" => "*",
    "Access-Control-Allow-Methods" => "POST, GET, OPTIONS"
]

# 还是有点糊，但感觉应该是类型的问题。。。
function core_middleware(handler)
    return function (req)

    end
end


@get "/connect" function (_::HTTP.Request)
    # 测试连接
    return
end

@websocket "/calculation" function (ws::HTTP.WebSocket)
    for msg in ws
        @info "接受到计算请求！开始解析请求。。。"
        msg = JSON3.read(msg, Dict)
        @info "解析完毕！开始计算。。。"
        res = ControlSystem(msg)
        @info "求解完成！"
        res = JSON3.write(res)
        send(ws, res)
    end
end

# 异步启动服务器
function server_mode()
    serve(async=true)
end

# 关闭服务器
function close_server()
    terminate()
end