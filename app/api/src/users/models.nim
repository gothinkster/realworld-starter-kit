import json
import std/[asyncdispatch, options]

import allographer/schema_builder
import allographer/query_builder

import ../core/database


type User* = ref object
  id*: int
  email*: string
  username*: string
  password*: string
  bio*: string
  image*: string


const t_users* = "users"


# newRepository().rdb.schema([
#   table(t_users, [
#     Column().increments("id"),
#     Column().string("email"),
#     Column().string("username"),
#     Column().string("password"),
#     Column().string("bio"),
#     Column().string("image")
#   ])
# ])


# proc seed() =
#   let rdb = newRepository().rdb
#   seeder rdb, t_users:
#     var data: seq[JsonNode]
#     for i in 1..3:
#       data.add(%* {
#         "email": &"email{i}",
#         "username": &"username{i}",
#         "password": &"password{i}",
#         "bio": &"bio{i}",
#         "image": &"image{i}",
#       })

#     waitFor rdb.table(t_users).insert(data)


proc newUser*(id: int, email: string, username: string): User =
  User(id: id, email: email, username: username)


proc registerUser*(self: Repository, email: string, username: string, password: string, bio="", image=""): Future[int] {.async.}=
  let id = await self.rdb.table(t_users).insertId(%*{
    "email": email,
    "username": username,
    "password": password,
    "bio": bio,
    "image": image,
  })
  return id


proc getUserRaw*(self: Repository, id: int, columns:varargs[string, `$`]): Future[Option[JsonNode]] {.async.} =
  let user = await self.rdb.table(t_users)
    .select(columns)
    .find(id)
  return user


proc getUser*(self: Repository, id: int): Future[Option[User]] {.async.} =
  var user = await(self.rdb.table(t_users)
    .select("id", "email", "username", "password", "bio", "image")
    .find(id)
  ).orm(User)
  return user


proc getUser*[T](self: Repository, field: string, value: T): Future[Option[User]] {.async.} =
  var user = await(self.rdb.table(t_users)
    .select("id", "email", "username", "password", "bio", "image")
    .find(value, field)
  ).orm(User)
  return user


proc updateUser*(self: Repository, id: int, data: JsonNode) {.async.} =
  await self.rdb.table(t_users).where("id", "=", id).update(%*data)
