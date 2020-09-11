import conduit
import conduit/db_setup
import gleam/should
import gleam/http.{Get, Https, Post, Request}
import gleam/bit_builder
import gleam/bit_string
import gleam/option.{None}
import gleam/string
import gleam/atom.{Atom}
import gleam/dynamic.{Dynamic}

external fn io_format(Atom, String, List(a)) -> Dynamic =
  "io" "format"

external fn rand_uniform(Int) -> Int =
  "rand" "uniform"

external fn timer_sleep(Int) -> Dynamic =
  "timer" "sleep"

fn debug_user_print_string(string) {
  assert Ok(user) = atom.from_string("user")
  io_format(user, "~tp~n", [string])
}

fn sleep(milliseconds) {
  timer_sleep(milliseconds)
}

fn random_sleep() {
  rand_uniform(2000)
  |> sleep()
}

fn default_request() {
  http.default_req()
  |> http.set_req_body(<<>>)
}

fn hello_world_test() {
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

fn json_request_foo_bar_detection_different_key_test() {
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

fn json_request_foo_bar_detection_different_value_test() {
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

fn json_parsing_foo_bar_detection_success_test() {
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

fn invalid_json_request_test() {
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

fn invalid_encoding_request_test() {
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

fn not_found_test() {
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

fn try_add_to_db_test() {
  let default_request = default_request()
  let request = Request(..default_request, path: "add_stuff/112")
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
  |> should.equal("Alrighty! We have new stuff")
}

external fn application_ensure_all_started(Atom) -> Dynamic =
  "application" "ensure_all_started"

fn top_setup() {
  assert Ok(pgo) = atom.from_string("pgo")
  application_ensure_all_started(pgo)
  db_setup.set_up_database("conduit_test")
  Nil
}

fn top_cleanup(_) {
  Nil
}

fn parallel_tests(_) {
  assert Ok(inparallel) = atom.from_string("inparallel")
  tuple(
    inparallel,
    8,
    [
      hello_world_test,
      json_request_foo_bar_detection_different_key_test,
      json_request_foo_bar_detection_different_value_test,
      json_parsing_foo_bar_detection_success_test,
      invalid_json_request_test,
      invalid_encoding_request_test,
      not_found_test,
    ],
  )
}

fn ordered_tests(_) {
  assert Ok(inorder) = atom.from_string("inorder")
  // Those tests  need to run in order, e.g. because they change
  // database data and we don't have sandboxing set up
  tuple(inorder, [try_add_to_db_test])
}

fn conduit_test_suite(setup_return_value) {
  assert Ok(inorder) = atom.from_string("inorder")
  tuple(
    inorder,
    [
      dynamic.from(parallel_tests(setup_return_value)),
      dynamic.from(ordered_tests(setup_return_value)),
    ],
  )
}

pub fn conduit_test_() {
  assert Ok(setup) = atom.from_string("setup")
  tuple(setup, top_setup, top_cleanup, conduit_test_suite)
}
