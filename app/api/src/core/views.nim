import prologue


proc go401View*(ctx: Context) {.async.} =
  resp "Unauthorized", Http401


proc go404View*(ctx: Context) {.async.} =
  let data = %*{
    "errors": {
      "body": ["Page not found"]}
  }
  resp jsonResponse(data, code=Http404)


proc go422View*(ctx: Context) {.async.} =
  let data = %*{
    "errors": {
      "body": ["Forbidden"]}
  }
  resp jsonResponse(data, code=Http422)
