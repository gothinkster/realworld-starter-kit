module Server.Tests

open Expecto

open System
open Shared
open DbMigrator

let connStr = "Host=localhost;Port=5432;Database=conduit_fsharp;Username=postgres;Password=postgres"


open Users
open Db
let server = testList "Server" [
    testCaseAsync "user queries test" <| async {
        let defaultSchema = "test_" + Guid.NewGuid().ToString("N")
        let! _ = DbMigrator(connStr, defaultSchema).MigrateAll()

        let userDb = UserDb(connStr, defaultSchema)
        let register = { username = "username1"; email = "email@example.com"; password = "password123" }
        let! registerResult = userDb.RegisterRequestHandler(register)
        let login = { email = "email@example.com"; password = "password123"}
        let! loginResult = userDb.LoginRequestHandler(login)
        let! _ = QueryExecute(connStr, $"DROP SCHEMA IF EXISTS {defaultSchema} CASCADE", {|  |})

        Expect.equal registerResult.Email loginResult.Email "email should be the same"
    }
]


let all =
    testList "All"
        [
            Tests.shared
            server
        ]


[<EntryPoint>]
let main _ = runTestsWithCLIArgs [] [||] all
