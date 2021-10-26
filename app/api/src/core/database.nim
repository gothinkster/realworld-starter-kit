import prologue
import allographer/connection
import allographer/query_builder


type Repository* = ref object
  rdb*:Rdb


proc newRepository*():Repository =
  let
    env = loadPrologueEnv(".env")
    rdb = dbOpen(Sqlite3, env.get("databaseUrl"), shouldDisplayLog=true)
  return Repository(rdb:rdb)
