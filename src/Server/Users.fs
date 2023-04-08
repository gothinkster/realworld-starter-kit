module Users

open System
open Shared
open Db
type UserDb(connStr : string, schemaName: string) =
    let conn = connStr
    let schema = schemaName

    let loginQuery =
        $"""
            -- the_user will return 1 row if the password match
            WITH the_user AS (
                SELECT id FROM {schema}.users
                WHERE hashtextextended(@Password || salt  , 0)::text = password
                AND email = @Email
                LIMIT 1
            )
            -- generate token that will expire after 1 hour
            UPDATE {schema}.users
            SET token = uuid_generate_v4(), utc_token_expire_at =  now() at time zone ('utc') + interval '1 hour'
            FROM the_user
            WHERE {schema}.users.id = the_user.id
            RETURNING email as Email,
               token::text as Token,
               username as Username,
               bio as Bio,
               image as Image
        """

    let registerQuery =
        $"""
            INSERT INTO {schema}.users (username, email, password, token, utc_token_expire_at, bio, image, salt)
            VALUES (
                @Username,
                @Email,
                hashtextextended(@Password || @Salt  , 0)::text,
                uuid_generate_v4(),
                now() at time zone ('utc') + interval '1 hour',
                'bio',
                'image',
                @Salt::uuid
            )
            RETURNING email as Email,
                   token::text as Token,
                   username as Username,
                   bio as Bio,
                   image as Image
        """


    member this.LoginRequestHandler(user: UserLoginDto) : Async<UserAuthDto>  = async {
        let parameters = {|Email = user.email; Password = user.password  |}
        return! QuerySingleOrDefaultAsync<UserAuthDto>(conn, loginQuery, parameters)
    }

    member this.RegisterRequestHandler(req: RegisterRequest) : Async<UserAuthDto>  = async {
        let salt = Guid.NewGuid().ToString()
        let parameters = {| Username = req.username; Email = req.email; Password = req.password; Salt = salt |}
        return! QuerySingleOrDefaultAsync<UserAuthDto>(conn, registerQuery, parameters)
    }

