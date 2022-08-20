module Api

open Shared

let login (email: string) (password: string) =
    async {
        do! Async.Sleep 1500
        if email = "admin@admin.com" && password = "admin" then
            let accessToken = System.Guid.NewGuid().ToString()
            return LoggedIn { Email = email; AccessToken = AccessToken accessToken; Username = "ramad" }
        else
            return UsernameOrPasswordIncorrect
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
