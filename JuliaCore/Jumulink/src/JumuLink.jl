module JumuLink

using DifferentialEquations, Dierckx

using Oxygen
@oxidise

using HTTP, JSON3, StructTypes
import HTTP.WebSockets.send

include("Types.jl")
include("Polynomial.jl")
include("SymbolTest.jl")
include("TransferFunction.jl")
include("StateSpace.jl")
include("Controler.jl")
include("Api.jl")

export ControlSystem,
    StateSpace,
    transfer_matrix,
    solve_by_state_space,
    SystemMap,
    Fraction,
    server_mode,
    close_server

end