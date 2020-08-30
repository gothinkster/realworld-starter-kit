import gleam/http
import gleam/bit_string
import gleam/bit_builder
import gleam/json
import gleam/dynamic

type TryableResponse =
  Result(http.Response(String), http.Response(String))

fn hello_world() -> TryableResponse {
  Ok(
    http.response(200)
    |> http.set_resp_body("Hello, from conduit!"),
  )
}

fn validate_encoding(
  request: http.Request(BitString),
) -> Result(http.Request(String), http.Response(String)) {
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

fn parse_json_body(request: http.Request(String)) -> TryableResponse {
  case json.decode(request.body) {
    Ok(json) -> {
      let maybe_bar = {
        try foo = dynamic.field(dynamic.from(json), "foo")
        dynamic.string(foo)
      }
      case maybe_bar {
        Ok("bar") -> Ok(
            http.response(200)
            |> http.set_resp_body("baz!"),
          )
        Error(_) -> Ok(
          http.response(200)
          |> http.set_resp_body("that's a fine json you have there"),
        )
      }
    }
    Error(_) ->
      Error(
        http.response(400)
        |> http.set_resp_body("Could not parse the json body"),
      )
  }
}

fn parse_json(request: http.Request(BitString)) -> TryableResponse {
  try string_request = validate_encoding(request)
  parse_json_body(string_request)
}

fn not_found() -> TryableResponse {
  Error(
    http.response(404)
    |> http.set_resp_body("Not found"),
  )
}

fn router(request: http.Request(BitString)) -> TryableResponse {
  let path_segments = http.path_segments(request)
  case request.method, path_segments {
    http.Get, ["hello_world"] -> hello_world()
    http.Post, ["parse_json"] -> parse_json(request)
    _, _ -> not_found()
  }
}

fn untangle(result: TryableResponse) -> http.Response(String) {
  case result {
    Ok(response) -> response
    Error(response) -> response
  }
}

pub fn service(
  request: http.Request(BitString),
) -> http.Response(bit_builder.BitBuilder) {
  let response =
    request
    |> router()
    |> untangle()
  response
  |> http.set_resp_body(bit_builder.from_string(response.body))
}
