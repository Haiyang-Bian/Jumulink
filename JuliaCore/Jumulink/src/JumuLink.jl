module JumuLink

using DifferentialEquations, Dierckx
using Oxygen, HTTP

include("Polynomial.jl")
include("SymbolTest.jl")
include("StateSpace.jl")
include("Controler.jl")
include("Api.jl")

export ControlSystem,
    StateSpace,
    transfer_matrix,
    solve_by_state_space,
    SystemMap,
    Fraction

end