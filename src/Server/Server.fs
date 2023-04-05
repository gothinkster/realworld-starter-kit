module Server

open System
open Microsoft.AspNetCore.Http
open Fable.Remoting.Server
open Fable.Remoting.Giraffe
open Saturn
open Shared
open Helper
open Users

let connStr = "Host=localhost;Port=5432;Database=conduit_fsharp;Username=postgres;Password=postgres"

let api: IApi = {
    login = fun loginRequest -> async { //request example, send POST with body: [{"user":{"email":"some@domain.com","password":"pass"}}]
        let! u = LoginRequestHandler(connStr, loginRequest.user)
        return match u with
            | NotNull u -> LoggedIn u
            | _ -> ErrorLogin (ConduitError [| "user not found" |])
    }
    register = fun registerRequest -> async {
        let! u = RegisterRequestHandler(connStr, registerRequest)
        return match u with
            | NotNull u -> Registered u
            | _ -> ErrorRegister (ConduitError [| "users not found" |] )
    }
}

let fableRemotingErrorHandler (ex: Exception) (ri: RouteInfo<HttpContext>) =
    printfn "ERROR: %s" ex.Message
    Propagate ex.Message

let webApp =
    Remoting.createApi ()
    |> Remoting.withRouteBuilder Route.builder
    |> Remoting.fromValue api
    |> Remoting.withErrorHandler fableRemotingErrorHandler
    |> Remoting.buildHttpHandler

let app =
    application {
        url "http://0.0.0.0:8085"
        use_router webApp
        memory_cache
        use_static "public"
        use_gzip
    }

run app
