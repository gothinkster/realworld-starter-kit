import conduit
import gleam/should
import gleam/http.{Get, Https, Post, Request}
import gleam/bit_builder
import gleam/bit_string
import gleam/option.{None}
import gleam/string

fn default_request() {
  http.default_req()
  |> http.set_req_body(<<>>)
}

pub fn hello_world_test() {
  let default_request = default_request()
  let request = Request(..default_request, path: "hello_world")

  let response =
    request
    |> conduit.service()

  response.status
  |> should.equal(200)

  assert Ok(response_body) =
    response.body
    |> bit_builder.to_bit_string()
    |> bit_string.to_string()
  response_body
  |> should.equal("Hello, from conduit!")
}

pub fn json_request_foo_bar_detection_different_key_test() {
  let default_request = default_request()
  let request =
    Request(
      ..default_request,
      method: Post,
      path: "json_check_foo",
      body: <<"{\"fow\":\"bar\"}":utf8>>,
    )

  let response =
    request
    |> conduit.service()

  response.status
  |> should.equal(200)

  assert Ok(response_body) =
    response.body
    |> bit_builder.to_bit_string()
    |> bit_string.to_string()
  response_body
  |> should.equal("that's a fine json you have there")
}

pub fn json_request_foo_bar_detection_different_value_test() {
  let default_request = default_request()
  let request =
    Request(
      ..default_request,
      method: Post,
      path: "json_check_foo",
      body: <<"{\"foo\":\"boo\"}":utf8>>,
    )

  let response =
    request
    |> conduit.service()

  response.status
  |> should.equal(200)

  assert Ok(response_body) =
    response.body
    |> bit_builder.to_bit_string()
    |> bit_string.to_string()
  response_body
  |> should.equal("that's a fine json you have there")
}

pub fn json_parsing_foo_bar_detection_success_test() {
  let default_request = default_request()
  let request =
    Request(
      ..default_request,
      method: Post,
      path: "json_check_foo",
      body: <<"{\"foo\":\"bar\"}":utf8>>,
    )

  let response =
    request
    |> conduit.service()

  response.status
  |> should.equal(200)

  assert Ok(response_body) =
    response.body
    |> bit_builder.to_bit_string()
    |> bit_string.to_string()
  response_body
  |> should.equal("baz!")
}

pub fn invalid_json_request_test() {
  let default_request = default_request()
  let request =
    Request(
      ..default_request,
      method: Post,
      path: "json_check_foo",
      body: <<"{\"foo\"\"::}":utf8>>,
    )

  let response =
    request
    |> conduit.service()

  response.status
  |> should.equal(400)

  assert Ok(response_body) =
    response.body
    |> bit_builder.to_bit_string()
    |> bit_string.to_string()
  response_body
  |> should.equal("Could not parse the json body")
}

pub fn invalid_encoding_request_test() {
  let default_request = default_request()
  let request =
    Request(
      ..default_request,
      method: Post,
      path: "json_check_foo",
      body: <<0xF5>>,
    )

  let response =
    request
    |> conduit.service()

  response.status
  |> should.equal(400)

  assert Ok(response_body) =
    response.body
    |> bit_builder.to_bit_string()
    |> bit_string.to_string()
  response_body
  |> string.starts_with("Could not read the request body")
  |> should.be_true()
}

pub fn not_found_test() {
  let default_request = default_request()
  let request =
    Request(..default_request, path: "asd/fa/sdfso/me/rando/mst/ring")

  let response =
    request
    |> conduit.service()

  response.status
  |> should.equal(404)

  assert Ok(response_body) =
    response.body
    |> bit_builder.to_bit_string()
    |> bit_string.to_string()
  response_body
  |> should.equal("Not found")
}
