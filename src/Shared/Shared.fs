namespace Shared

open System

module Route =
    let builder typeName methodName =
        sprintf "/api/%s/%s" typeName methodName

type UserLoginDto = {
    email:    string
    password: string
}
type LoginRequest = {
    user: UserLoginDto
}

type UserAuthDto = {
    email:    string
    token:    string
    username: string
    bio:      string
    image:    string
}

type users = {
    login: LoginRequest -> Async<UserAuthDto>
}
