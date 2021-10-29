import jsony
import prologue


template jresp*(content: untyped, status: HttpCode): auto =
  ctx.response.headers["Content-Type"] = "application/json"
  ctx.response.code = status
  ctx.response.body = toJson(content)


template jerror*(content: string = "", status: HttpCode): auto =
  ctx.response.headers["Content-Type"] = "application/json"
  ctx.response.code = status
  if content != "":
    ctx.response.body = toJson(%*{"errors": {"body": [content]}})


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
