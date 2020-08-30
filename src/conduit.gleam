import gleam/http.{Request, Response}
import gleam/bit_builder.{BitBuilder}

pub fn hello_world() -> String {
  "Hello, from conduit!"
}

// Define a HTTP service
//
pub fn service(_req: Request(BitString)) -> Response(BitBuilder) {
  let body = bit_builder.from_string(hello_world())

  http.response(200)
  |> http.set_resp_body(body)
}
