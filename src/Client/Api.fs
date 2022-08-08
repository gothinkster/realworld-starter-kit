module Api

type AccessToken = AccessToken of string

type User =
    { Email : string
      Username: string
      AccessToken : AccessToken }

type LoginResult =
    | UsernameOrPasswordIncorrect
    | LoggedIn of User

let login (email: string) (password: string) =
    async {
        do! Async.Sleep 1500
        if email = "admin@admin.com" && password = "admin" then
            let accessToken = System.Guid.NewGuid().ToString()
            return LoggedIn { Email = email; AccessToken = AccessToken accessToken; Username = "ramad" }
        else
            return UsernameOrPasswordIncorrect
    }