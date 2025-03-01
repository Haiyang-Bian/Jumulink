const CORS_HEADERS = [
    "Access-Control-Allow-Origin" => "*",
    "Access-Control-Allow-Headers" => "*",
    "Access-Control-Allow-Methods" => "POST, GET, OPTIONS"
]

function core_middleware(handler)
    return function (req::HTTP.Request)
        if HTTP.method(req) in ["POST", "GET", "OPTIONS"]
            return HTTP.Response(200, CORS_HEADERS, HTTP.body(handler(req)))
        else
            return handler(req)
        end
    end
end

@post "/connect" function (req::HTTP.Request)
    # 理想PID控制器
    input = json(req, Dict)
    return ControlSystem(input)
end

@websocket "/jumulink" function (ws::HTTP.WebSocket)
    for msg in ws
        @info "Received message: $msg"
        send(ws, "The time is: $(now())")
    end
end

# 异步启动服务器
function server_mode()
    serve(async=true, middleware=[core_middleware])
end
