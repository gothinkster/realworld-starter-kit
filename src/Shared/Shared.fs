namespace Shared

open System

module Route =
    let builder typeName methodName =
        match methodName with
        | "login" -> "/api/users/login"
        | "register" -> "/api/users"
        | "createArticle" -> "/api/articles"
        | _ -> sprintf "/api/%s/%s" typeName methodName
//----------------------------------------
type ConduitError (error : string[]) =
    member this.body = error
//----------------------------------------
type UserAuthDto = {
    Email:    string
    Token:    string
    Username: string
    Bio:      string
    Image:    string
}
//----------------------------------------
type UserLoginDto = {
    email:    string
    password: string
}
type LoginRequest = {
    user: UserLoginDto
}
type LoginResponse =
    | LoggedIn of UserAuthDto
    | ErrorLogin of ConduitError
//----------------------------------------
type RegisterRequest = {
    username: string
    email: string
    password: string
}
type RegisterResponse =
    | Registered of UserAuthDto
    | ErrorRegister of ConduitError
//----------------------------------------
type IApi = {
    login: LoginRequest -> Async<LoginResponse>
    register: RegisterRequest -> Async<RegisterResponse>
}

type AccessToken = AccessToken of string

type SubmitArticleResult =
    | SuccessSubmitArticle
    | FailedSubmitArticle of string