import conduit
import gleam/should
import gleam/http
import gleam/bit_builder
import gleam/bit_string
import gleam/option

pub fn hello_world_test() {
  let request =
    http.default_req()
    |> http.set_req_body(<<>>)

  let response =
    request
    |> conduit.service()

  response.status
  |> should.equal(200)

  response.body
  |> bit_builder.to_bit_string()
  |> should.equal(bit_string.from_string("Hello, from conduit!"))
}
