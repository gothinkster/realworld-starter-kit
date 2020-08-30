import conduit
import gleam/should
import gleam/http
import gleam/bit_builder
import gleam/bit_string
import gleam/option

fn default_request() {
  http.Request(
    method: http.Get,
    headers: [],
    body: <<>>,
    scheme: http.Http,
    host: "",
    port: option.None,
    path: "",
    query: option.None,
  )
}

pub fn hello_world_test() {
  let response =
    default_request()
    |> conduit.service()

  assert http.Response(status: status, headers: _, body: body) = response

  status
  |> should.equal(200)

  body
  |> bit_builder.to_bit_string()
  |> should.equal(bit_string.from_string("Hello, from conduit!"))
}
