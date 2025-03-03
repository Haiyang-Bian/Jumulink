# 类型测试（受不了了！）
using JSON3

@info "测试IComponentInfo"

json_str = """
{
    "type": "TransFunction",
    "args": {
        "num": "[1, 2]",
        "den": "[1, 2, 3]"
    }
}
"""

@test JSON3.read(json_str, JumuLink.IComponentInfo) == JumuLink.IComponentInfo("TransFunction", Dict("num" => "[1, 2]", "den" => "[1, 2, 3]"))

json_str = """
{
    "type": "TransFunction",
}
"""

@test JSON3.read(json_str, JumuLink.IComponentInfo) == JumuLink.IComponentInfo("TransFunction", nothing)

@info "测试IAjmatrix"

json_str = """
{
    "nid": "1",
    "nnum": 2,
    "nnodes": [1, 2, 3]
}
"""

@test JSON3.read(json_str, JumuLink.IAjmatrix) == JumuLink.IAjmatrix("1", 2, [1, 2, 3])

@info "测试ICalcInfo"

json_str = """
{
    "nodes": {
        "1": {
            "type": "TransFunction",
            "args": {
                "num": "[1, 2]",
                "den": "[1, 2, 3]"
            }
        },
        "2": {
            "type": "TransFunction",
            "args": {
                "num": "[1, 2]",
				"den": "[1, 2, 3]"
            }
        }
    },
    "map": [
        {
            "nid": "1",
            "nnum": 2,
            "nnodes": [1, 2, 3]
        },
        {
            "nid": "2",
            "nnum": 2,
            "nnodes": [1, 2, 3]
        }
    ],
    "tend": 10
}
"""

@test JSON3.read(json_str, JumuLink.ICalcInfo) == JumuLink.ICalcInfo(Dict("1" => IComponentInfo("TransFunction", Dict("num" => "[1, 2]", "den" => "[1, 2, 3]")), "2" => IComponentInfo("TransFunction", Dict("num" => "[1, 2]", "den" => "[1, 2, 3]"))), [IAjmatrix("1", 2, [1, 2, 3]), IAjmatrix("2", 2, [1, 2, 3])])

