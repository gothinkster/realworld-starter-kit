import json

import prologue

import ../core/auth
import models
from ../core/middleware import RepositoryContext


proc registerView*(ctx: Context) {.async.} =
  let ctx = RepositoryContext(ctx)
  let
      env = loadPrologueEnv(".env")
      input = parseJson(ctx.request.body)["user"]
      email = input["email"].getStr
      username = input["username"].getStr
      password = encode(input["password"].getStr)
      userId = await ctx.rdb.registerUser(email=email, username=username, password=password)
      user = await ctx.rdb.getUser(userId)

  var usr = %*user

  usr.delete("password")
  usr["token"] = newJString(sign(usr))
  usr.delete("id")
  let data = %{"user": usr}

  resp jsonResponse(data, code=Http201)


proc loginView*(ctx: Context) {.async.} =
  let ctx = RepositoryContext(ctx)
  let
    env = loadPrologueEnv(".env")
    input = parseJson(ctx.request.body)["user"]
    user = await ctx.rdb.getUser("email", input["email"].getStr)

  if not user.isSome:
    let data = %*{
      "errors": {
        "body": ["User not found"]}
    }

    resp jsonResponse(data, code=Http401)
    return

  var usr = %*user.get()
  usr.delete("password")
  let token = authenticate(input["password"].getStr, user.get().password, payload=usr)

  if not token.isSome:
    let data = %*{
      "errors": {
        "body": ["Wrong login stuff"]}
    }

    resp jsonResponse(data, code=Http422)
    return

  usr.delete("id")
  usr["token"] = newJString(token.get)
  let data = %{"user": usr}

  resp jsonResponse(data, code=Http201)


proc getUserView*(ctx: Context) {.async.} =
  var user = parseJson(ctx.ctxData["user"])
  user["token"] = newJString(sign(user))
  user.delete("id")
  resp jsonResponse(%*{"user": user}, code=Http200)
