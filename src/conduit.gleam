import gleam/http.{Request, Response}
import gleam/bit_string
import gleam/bit_builder.{BitBuilder}
import gleam/json.{Json}
import gleam/dynamic

fn hello_world() -> Result(Response(String), Response(String)) {
  Ok(
    http.response(200)
    |> http.set_resp_body("Hello, from conduit!"),
  )
}

fn validate_encoding(
  request: Request(BitString),
) -> Result(Request(String), Response(String)) {
  case bit_string.to_string(request.body) {
    Ok(body) -> Ok(http.set_req_body(request, body))
    Error(_) ->
      Error(
        http.response(400)
        |> http.set_resp_body(
          "Could not read the request body: make sure the body of your request is a valid UTF-8 string",
        ),
      )
  }
}

fn parse_json_body(
  request: Request(String),
) -> Result(Request(Json), Response(String)) {
  case json.decode(request.body) {
    Ok(json) ->
      Ok(
        request
        |> http.set_req_body(json),
      )
    Error(_) ->
      Error(
        http.response(400)
        |> http.set_resp_body("Could not parse the json body"),
      )
  }
}

fn json_check_foo(
  request: Request(BitString),
) -> Result(Response(String), Response(String)) {
  try string_request = validate_encoding(request)
  try json = parse_json_body(string_request)
  let maybe_foo_val = {
    let map = dynamic.from(json.body)
    try foo = dynamic.field(map, "foo")
    dynamic.string(foo)
  }
  case maybe_foo_val {
    Ok("bar") ->
      Ok(
        http.response(200)
        |> http.set_resp_body("baz!"),
      )
    _ ->
      Ok(
        http.response(200)
        |> http.set_resp_body("that's a fine json you have there"),
      )
  }
}

fn not_found() -> Result(Response(String), Response(String)) {
  Error(
    http.response(404)
    |> http.set_resp_body("Not found"),
  )
}

fn router(
  request: Request(BitString),
) -> Result(Response(String), Response(String)) {
  let path_segments = http.path_segments(request)
  case request.method, path_segments {
    http.Get, ["hello_world"] -> hello_world()
    http.Post, ["json_check_foo"] -> json_check_foo(request)
    _, _ -> not_found()
  }
}

fn untangle(
  result: Result(Response(String), Response(String)),
) -> Response(String) {
  case result {
    Ok(response) -> response
    Error(response) -> response
  }
}

pub fn service(request: Request(BitString)) -> Response(BitBuilder) {
  let response =
    request
    |> router()
    |> untangle()
  response
  |> http.set_resp_body(bit_builder.from_string(response.body))
}
