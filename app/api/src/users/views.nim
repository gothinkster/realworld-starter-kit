import std/[json]

import prologue
import jsony

import ../core/[auth, middleware]
import ../core/views
import allographer/query_builder
import models


type
  UserFields = object
    email: string
    username: string
    password: string
  UserInput = object
    user: UserFields



proc registerView*(ctx: Context) {.async.} =
  let
    ctx = DbContext(ctx)

  var input = ctx.request.body.fromJson(UserInput)

  input.user.password = encode(input.user.password)
  var user =  %*input.user
  user["bio"] = newJString("")
  user["image"] = newJString("")

  user["id"] = newJInt(await ctx.db.table(t_user).insertId(user))
  user["token"] = newJString(sign(user))
  user.delete("password")
  user["token"] = newJString(sign(user))
  user.delete("id")
  jresp %*{"user": user}, Http201


proc loginView*(ctx: Context) {.async.} =
  let ctx = DbContext(ctx)
  let
    input = parseJson(ctx.request.body)["user"]

  var user = await ctx.db.getUser(input["email"].getStr, by="email")

  if not user.isSome:
    jerror "Incorrect email or password", Http404
    return

  let password = user.get()["password"].getStr
  user.get().delete("password")
  let token = authenticate(input["password"].getStr, password, payload=user.get())
  if not token.isSome:
    jerror "Incorrect email or password", Http404
    return

  user.get()["token"] = newJString(token.get)
  user.get().delete("id")
  jresp %*{"user": user.get()}, Http200


proc getUserView*(ctx: Context) {.async.} =
  let
    ctx = DbContext(ctx)
    id = parseJson(ctx.ctxData["payload"])["id"].getInt

  var user = await ctx.db.getUser(id, exclude= @["password"])
  if not user.isSome:
    jerror "User not found", Http404
  else:
    user.get["token"] = newJString(sign(user.get))
    user.get.delete("id")
    jresp %*{"user": user.get}, Http200


proc editUserView*(ctx: Context) {.async.} =
  let
    ctx = DbContext(ctx)
    input = parseJson(ctx.request.body)["user"]
    payload = parseJson(ctx.ctxData["payload"])
    id = payload["id"].getInt

  await ctx.db.table(t_user).where("id", "=", id).update(input)

  var user = await ctx.db.getUser(id, exclude= @["password"])
  if not user.isSome:
    jerror "User not found", Http404
  else:
    user.get["token"] = newJString(sign(user.get))
    user.get.delete("id")
    jresp %*{"user": user.get}, Http200
