module JumuLink

using DifferentialEquations, Dierckx
using Oxygen, HTTP, JSON3, SHA, Base64
import HTTP.WebSockets.send

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