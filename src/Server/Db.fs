module Db

open Npgsql
open Dapper

let QuerySingleOrDefaultAsync<'T>(conn: string, query: string, parameters: obj) : Async<'T> = async {
    use conn = new NpgsqlConnection(conn)
    do! conn.OpenAsync() |> Async.AwaitTask
    let! result = conn.QuerySingleOrDefaultAsync<'T>(query, parameters) |> Async.AwaitTask
    do! conn.CloseAsync() |> Async.AwaitTask
    return result
}

let QueryExecute(conn: string, query: string, parameters: obj) : Async<int> = async {
    use conn = new NpgsqlConnection(conn)
    do! conn.OpenAsync() |> Async.AwaitTask
    let! result = conn.ExecuteAsync(query, parameters) |> Async.AwaitTask
    do! conn.CloseAsync() |> Async.AwaitTask
    return result
}
