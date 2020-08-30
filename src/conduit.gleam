import gleam/http
import gleam/bit_string
import gleam/bit_builder

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

fn hello_world(
  _request: http.Request(String),
) -> Result(http.Response(String), http.Response(String)) {
  Ok(
    http.response(200)
    |> http.set_resp_body("Hello, from conduit!"),
  )
}

pub fn service(
  request: http.Request(BitString),
) -> http.Response(bit_builder.BitBuilder) {
  let string_response_result = {
    try string_request = validate_encoding(request)
    hello_world(string_request)
  }
  let string_response = case string_response_result {
    Ok(response) -> response
    Error(response) -> response
  }
  http.set_resp_body(
    string_response,
    bit_builder.from_string(string_response.body),
  )
}
