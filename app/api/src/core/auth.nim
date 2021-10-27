import strutils
import json
import times
import options

import prologue
import quickjwt
import prologue/security/hasher


proc sign*(payload: JsonNode): string =
  let
    env = loadPrologueEnv(".env")
    til = env.getOrDefault("jwtExpires", "60").parseFloat
    token = sign(
      header = %*{
        "typ":"JWT",
        "alg":"HS256"
      },
      claim = %*{
        "payload": payload,
        "exp": int(epochTime() + til * 60),
        "iat": int(epochTime())
        },
      secret = env.get("secretKey")
    )
  return token


proc encode*(password: string): string =
  let
    env = loadPrologueEnv(".env")
    encoded = pbkdf2_sha256encode(SecretKey(password), env.get("secretKey"))
  return encoded


proc authenticate*(password, encoded: string, payload: JsonNode): Option[string] =
  if pbkdf2_sha256verify(SecretKey(password), encoded):
    return some(sign(payload))
