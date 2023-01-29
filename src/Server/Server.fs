module Server

open Fable.Remoting.Server
open Fable.Remoting.Giraffe
open Saturn
open Shared
open Helper
open Users

let connStr = "Host=localhost;Port=5432;Database=conduit_fsharp;Username=postgres;Password=postgres"

let api: users = {
    login = fun loginRequest -> async { //request example, send POST with body: [{"user":{"email":"some@domain.com","password":"pass"}}]
        let! u = LoginRequestHandler(connStr, loginRequest.user)
        return match u with
            | NotNull -> User u
            | _ -> Errors (ConduitError [| "users not found" |] )
    }
}

let webApp =
    Remoting.createApi ()
    |> Remoting.withRouteBuilder Route.builder
    |> Remoting.fromValue api
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
