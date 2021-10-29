import std/[json, strutils, logging]

import quickjwt
import prologue
import allographer/[connection, query_builder]


type
  DbContext* = ref object of Context
    db*: Rdb


method extend(ctx: DbContext) =
  let
    env = loadPrologueEnv(".env")
    dbUrl = env.getOrDefault("databaseUrl", "real.db")
    db: Rdb = dbOpen(Sqlite3, dbUrl, shouldDisplayLog=true)
  logging.info "Connecting to database"
  ctx.db = db


proc jwtMiddleware*(secret: string, exclude: seq[string]): HandlerAsync =
  result = proc(ctx: Context) {.async.} =
    if not exclude.contains(ctx.request.url.path):
      let auth = ctx.request.getHeaderOrDefault("Authorization", @[])

      if auth.len == 0:
        resp "Authorization token missing", Http401
        return

      let token = auth[0]
      try:
        token.verifyEx(secret, @["HS256"])
      except:
        let
          # e = getCurrentException()
          msg = getCurrentExceptionMsg()
        resp msg, Http401
        return

      ctx.ctxData["payload"] = $token.claim["payload"]
    await switch(ctx)


proc dbMiddleware*(): HandlerAsync =
  result = proc(ctx: Context) {.async.} =
    let ctx = DbContext(ctx)
    await switch(ctx)
    logging.info "Clossing the database"
