# JumuLkink所使用的类型定义及其构造函数

# 对应于前端的节点数据接口
StructTypes.@Struct struct IComponentInfo
    type::String
    # 一般情况下，args为字典，然而有Nothing的情况
    # JONS3不能处理联合类型，所以只能使用Any
    # 也是无奈之举
    args
end

# 对等于前端的邻接矩阵数据接口
StructTypes.@Struct struct IAjmatrix
    nid::String
    nnum::Number
    nnodes::Vector{Number}
end

# 对应于前端的计算数据接口
StructTypes.@CustomStruct struct ICalcInfo
    nodes::Dict{String,IComponentInfo}
    map::Vector{IAjmatrix}
    tend::Number
end
