using Oxygen, HTTP

include("Controler.jl")

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

@post "/jumulink" function (req::HTTP.Request)
    # 理想PID控制器
    input = json(req, Dict)
    return ControlSystem(input)
end

# 异步启动服务器
serve(async=true, middleware=[core_middleware])
