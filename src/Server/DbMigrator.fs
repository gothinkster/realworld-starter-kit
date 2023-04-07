module DbMigrator

open System
open Shared
open Db

type DbMigrator(connStr : string, schemaName: string) =
    let conn = connStr
    let schema = schemaName

    let CreateUserTableQuery =
        $"""
            create table if not exists {schema}.users
            (
                id                  bigserial
                    primary key,
                username            varchar(255)                    not null
                    unique,
                password            varchar(255)                    not null,
                email               varchar(255)                    not null
                    unique,
                bio                 text,
                image               text,
                salt                uuid default uuid_generate_v4() not null,
                token               uuid,
                utc_token_expire_at timestamp
            );
        """


    let createUserTable() : Async<int> = async {
        return! QueryExecute(conn, CreateUserTableQuery, {|  |})
    }

    member this.MigrateAll() : Async<int> = async {
        let! _ = QueryExecute(conn, $"CREATE SCHEMA IF NOT EXISTS {schema}", {|  |})
        let! result = createUserTable()
        return result
    }
