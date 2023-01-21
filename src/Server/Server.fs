module Server

open Fable.Remoting.Server
open Fable.Remoting.Giraffe
open Saturn

open Shared



let api: users = {
    login = fun loginRequest -> async { //request example, send POST with body: [{"user":{"email":"some@domain.com","password":"pass"}}]
        let u = {
            Email = loginRequest.user.email
            Token = "token"
            Username = "username"
            Bio = "bio"
            Image = "image"
        }
        return Some u
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
