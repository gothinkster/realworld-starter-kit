module Api

open Fable.Remoting.Client
open Shared
open Elmish

let api = Remoting.createApi() |> Remoting.withRouteBuilder Route.builder |> Remoting.buildProxy<IApi>

let login (email: string) (password: string) =
    async {
        let! loginResponse = api.login { user = { email = email; password = password } }
        return loginResponse
    }


let register (username: string) (email: string) (password: string) =
    async {
        let! RegisterResponse = api.register {
            username = username
            email = email
            password = password
        }
        return RegisterResponse
    }

let submitArticle (title: string) (content: string) (tags: string) = SuccessSubmitArticle
