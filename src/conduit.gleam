import gleam/http
import gleam/bit_string
import gleam/bit_builder

type OkOrErrorResponse =
  Result(http.Response(String), http.Response(String))

fn hello_world(_request: http.Request(String)) -> OkOrErrorResponse {
  Ok(
    http.response(200)
    |> http.set_resp_body("Hello, from conduit!"),
  )
}

fn not_found() -> OkOrErrorResponse {
  Error(
    http.response(404)
    |> http.set_resp_body("Not found"),
  )
}

fn router(request: http.Request(String)) -> OkOrErrorResponse {
  let path_segments = http.path_segments(request)

  case request.method, path_segments {
    http.Get, ["hello"] -> hello_world(request)
    _, _ -> not_found()
  }
}

fn validate_encoding(
  request: http.Request(BitString),
) -> Result(http.Request(String), http.Response(String)) {
  case bit_string.to_string(request.body) {
    Ok(body) -> Ok(http.set_req_body(request, body))
    Error(_) ->
      Error(
        http.response(500)
        |> http.set_resp_body(
          "Could not read the request body: make sure the body of your request is a valid UTF-8 string",
        ),
      )
  }
}

fn unresult(result: OkOrErrorResponse) -> http.Response(String) {
  case result {
    Ok(response) -> response
    Error(response) -> response
  }
}

pub fn service(
  request: http.Request(BitString),
) -> http.Response(bit_builder.BitBuilder) {
  let string_response =
    {
      try string_request = validate_encoding(request)
      router(string_request)
    }
    |> unresult()
  http.set_resp_body(
    string_response,
    bit_builder.from_string(string_response.body),
  )
}
