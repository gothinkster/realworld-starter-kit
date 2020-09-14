import conduit
import conduit/db/db_setup
import gleam/should
import gleam/http.{Get, Https, Post, Request}
import gleam/bit_builder
import gleam/bit_string
import gleam/option.{None}
import gleam/string
import gleam/atom.{Atom}
import gleam/dynamic.{Dynamic}

// external fn io_format(Atom, String, List(a)) -> Dynamic =
//   "io" "format"
// external fn rand_uniform(Int) -> Int =
//   "rand" "uniform"
// external fn timer_sleep(Int) -> Dynamic =
//   "timer" "sleep"
// fn debug_user_print_string(string) {
//   assert Ok(user) = atom.from_string("user")
//   io_format(user, "~tp~n", [string])
// }
// fn sleep(milliseconds) {
//   timer_sleep(milliseconds)
// }
// fn random_sleep() {
//   rand_uniform(2000)
//   |> sleep()
// }
fn default_request() {
  http.default_req()
  |> http.set_req_body(<<>>)
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

fn registration_test() {
  let default_request = default_request()
  let request =
    Request(
      ..default_request,
      method: Post,
      headers: [
        tuple("Content-Type", "application/json"),
        tuple("X-Requested-With", "XMLHttpRequest"),
      ],
      body: <<
        "{\"user\":{\"email\":\"user@example.com\", \"password\":\"some_password\", \"username\":\"some_username\"}}":utf8,
      >>,
      path: "users",
    )
  let response = conduit.service(request)
  response.status
  |> should.equal(200)

  Nil
}

external fn application_ensure_all_started(Atom) -> Dynamic =
  "application" "ensure_all_started"

fn top_setup() {
  assert Ok(pgo) = atom.from_string("pgo")
  application_ensure_all_started(pgo)
  db_setup.reset_database("conduit_test")
  Nil
}

fn top_cleanup(_) {
  Nil
}

fn parallel_tests(_) {
  assert Ok(inparallel) = atom.from_string("inparallel")
  tuple(inparallel, 8, [not_found_test])
}

fn ordered_tests(_) {
  assert Ok(inorder) = atom.from_string("inorder")
  // Those tests  need to run in order, e.g. because they change
  // database data and we don't have sandboxing set up
  tuple(inorder, [registration_test])
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
