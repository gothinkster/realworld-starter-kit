module Server

open Fable.Remoting.Server
open Fable.Remoting.Giraffe
open Saturn

open Shared
open Npgsql
open Dapper

let connStr = "Host=localhost;Port=5432;Database=conduit_fsharp;Username=postgres;Password=postgres"


let (|NotNull|_|) value =
  if obj.ReferenceEquals(value, null) then None
  else Some()

let selectUserData (user: UserLoginDto) : Async<UserAuthDto>  = async {
    use conn = new NpgsqlConnection(connStr)
    do! conn.OpenAsync() |> Async.AwaitTask
    let! result = conn.QuerySingleOrDefaultAsync<UserAuthDto>(
        """
            -- the_user will return 1 row if the password match
            WITH the_user AS (
                SELECT id FROM users
                WHERE hashtextextended(@Password || salt  , 0)::text = password
                AND email = @Email
                LIMIT 1
            )
            -- generate token that will expire after 1 hour
            UPDATE users
            SET token = uuid_generate_v4(), utc_token_expire_at =  now() at time zone ('utc') + interval '1 hour'
            FROM the_user
            WHERE users.id = the_user.id
            RETURNING email as Email,
                   token::text as Token,
                   username as Username,
                   bio as Bio,
                   image as Image
        """
        , {| Email = user.email; Password = user.password |}) |> Async.AwaitTask
    do! conn.CloseAsync() |> Async.AwaitTask
    return result
}


let api: users = {
    login = fun loginRequest -> async { //request example, send POST with body: [{"user":{"email":"some@domain.com","password":"pass"}}]
        let! u = selectUserData loginRequest.user
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
