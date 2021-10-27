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

  resp jsonResponse(data, code=Http200)


proc getUserView*(ctx: Context) {.async.} =
  let
    ctx = RepositoryContext(ctx)
    usr = parseJson(ctx.ctxData["user"])
  var
    user = await ctx.rdb.getUserRaw(usr["id"].getInt, "id", "email", "username", "password", "bio", "image")
    data = user.get()
    # data = %*user.get()

  echo data
  data["token"] = newJString(sign(data))
  data.delete("id")
  data.delete("password")
  resp jsonResponse(%*{"user": data}, code=Http200)


proc editUserView*(ctx: Context) {.async.} =
  let
    ctx = RepositoryContext(ctx)
    input = parseJson(ctx.request.body)["user"]
    header_user = parseJson(ctx.ctxData["user"])

  await ctx.rdb.updateUser(header_user["id"].getInt, input)

  var
    user = await ctx.rdb.getUser(header_user["id"].getInt)
    data = %*user.get()

  data["token"] = newJString(sign(data))
  data.delete("id")
  data.delete("password")
  resp jsonResponse(%*{"user": data}, code=Http200)
