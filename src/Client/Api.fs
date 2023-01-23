module Api

open Fable.Remoting.Client
open Shared
open Elmish

let loginOld (email: string) (password: string) =
    async {
        do! Async.Sleep 1500
        if email = "admin@admin.com" && password = "admin" then
            let accessToken = System.Guid.NewGuid().ToString()
            return LoggedIn { Email = email; AccessToken = AccessToken accessToken; Username = "ramad" }
        else
            return UsernameOrPasswordIncorrect
    }
let users = Remoting.createApi() |> Remoting.withRouteBuilder Route.builder |> Remoting.buildProxy<users>



let login (email: string) (password: string) =
    async {
        let! loginResponse = users.login { user = { email = email; password = password } }
        match loginResponse with
        | User ur -> return LoggedIn { Email = ur.Email; AccessToken = AccessToken ur.Token; Username = ur.Username }
        | Errors _ -> return UsernameOrPasswordIncorrect
    }


let register (username: string) (email: string) (password: string) =
    async {
        do! Async.Sleep 1500
        if email = "admin@admin.com" && password = "admin" && username = "admin" then
            let accessToken = System.Guid.NewGuid().ToString()
            return Registered { Email = email; AccessToken = AccessToken accessToken; Username = "ramad" }
        else
            return Failed
    }
