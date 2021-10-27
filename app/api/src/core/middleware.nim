import json
import strutils

import prologue
import quickjwt

import database


type
  RepositoryContext* = ref object of Context
    rdb*: Repository


method extend(ctx: RepositoryContext) =
  ctx.rdb = newRepository()


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
          e = getCurrentException()
          msg = getCurrentExceptionMsg()
        resp msg, Http401
        return

      ctx.ctxData["user"] = $token.claim["payload"]
    await switch(ctx)


proc repositoryMiddleware*(): HandlerAsync =
  result = proc(ctx: Context) {.async.} =
    let ctx = RepositoryContext(ctx)
    await switch(ctx)
