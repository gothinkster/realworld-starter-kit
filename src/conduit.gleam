import gleam/http.{Request, Response}
import gleam/bit_builder.{BitBuilder}

fn hello_world() -> String {
  "Hello, from conduit!"
}

pub fn service(_request: Request(BitString)) -> Response(BitBuilder) {
  let body = bit_builder.from_string(hello_world())

  http.response(200)
  |> http.set_resp_body(body)
}
