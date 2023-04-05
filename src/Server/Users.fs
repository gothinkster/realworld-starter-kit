module Users

open System
open Shared
open Npgsql
open Dapper

let LoginRequestHandler(conn: string, user: UserLoginDto) : Async<UserAuthDto>  = async {
    use conn = new NpgsqlConnection(conn)
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

let RegisterRequestHandler(conn: string, req: RegisterRequest) : Async<UserAuthDto>  = async {
    use conn = new NpgsqlConnection(conn)
    let salt = Guid.NewGuid().ToString()
    do! conn.OpenAsync() |> Async.AwaitTask
    let! result = conn.QuerySingleOrDefaultAsync<UserAuthDto>(
        """
            INSERT INTO public.users (username, email, password, token, utc_token_expire_at, bio, image, salt)
            VALUES (@Username, @Email,  hashtextextended(@Password || @Salt  , 0)::text, uuid_generate_v4(), now() at time zone ('utc') + interval '1 hour', 'bio', 'image', @Salt::uuid)
            RETURNING email as Email,
                   token::text as Token,
                   username as Username,
                   bio as Bio,
                   image as Image
        """
        , {| Username = req.username; Email = req.email; Password = req.password; Salt = salt |}) |> Async.AwaitTask
    do! conn.CloseAsync() |> Async.AwaitTask
    return result
}

