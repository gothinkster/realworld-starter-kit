import conduit
import gleam/should
import gleam/http.{Get, Https, Post, Request}
import gleam/bit_builder
import gleam/bit_string
import gleam/option.{None}
import gleam/string

pub fn hello_world_test() {
  let request =
    Request(
      method: Get,
      headers: [],
      body: <<>>,
      scheme: Https,
      host: "localhost",
      port: None,
      path: "hello_world",
      query: None,
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
  |> should.equal("Hello, from conduit!")
}

pub fn json_request_foo_bar_detection_different_key_test() {
  let request =
    Request(
      method: Post,
      headers: [],
      body: <<"{\"fow\":\"bar\"}":utf8>>,
      scheme: Https,
      host: "localhost",
      port: None,
      path: "json_check_foo",
      query: None,
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
  let request =
    Request(
      method: Post,
      headers: [],
      body: <<"{\"foo\":\"boo\"}":utf8>>,
      scheme: Https,
      host: "localhost",
      port: None,
      path: "json_check_foo",
      query: None,
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
  let request =
    Request(
      method: Post,
      headers: [],
      body: <<"{\"foo\":\"bar\"}":utf8>>,
      scheme: Https,
      host: "localhost",
      port: None,
      path: "json_check_foo",
      query: None,
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
  let request =
    Request(
      method: Post,
      headers: [],
      body: <<"{\"foo\"\"::}":utf8>>,
      scheme: Https,
      host: "localhost",
      port: None,
      path: "json_check_foo",
      query: None,
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
  let request =
    Request(
      method: Post,
      headers: [],
      body: <<0xF5>>,
      scheme: Https,
      host: "localhost",
      port: None,
      path: "json_check_foo",
      query: None,
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
  let request =
    Request(
      method: Get,
      headers: [],
      body: <<>>,
      scheme: Https,
      host: "localhost",
      port: None,
      path: "asd/fa/sdfso/me/rando/mst/ring",
      query: None,
    )

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
