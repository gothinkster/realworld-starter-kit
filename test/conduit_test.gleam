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
import gleam/json
import gleam/pgo

// external fn io_format(Atom, String, List(a)) -> Dynamic =
//   "io" "format"
// fn debug_user_print_string(string) {
//   assert Ok(user) = atom.from_string("user")
//   io_format(user, "~tp~n", [string])
// }
// external fn rand_uniform(Int) -> Int =
//   "rand" "uniform"
// external fn timer_sleep(Int) -> Dynamic =
//   "timer" "sleep"
// fn sleep(milliseconds) {
//   timer_sleep(milliseconds)
// }
// fn random_sleep() {
//   rand_uniform(2000)
//   |> sleep()
// }
fn atom_(atom_name) {
  atom.create_from_string(atom_name)
}

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
        "{\"user\":{\"email\":\"user@example.com\",\"password\":\"some_password\",\"username\":\"some_username\",\"some\":\"thing_to_ignore\"},\"some\":\"thing_to_ignore\"}":utf8,
      >>,
      path: "api/users",
    )
  let response = conduit.service(request)

  response.status
  |> should.equal(200)
  assert Ok(response_body) =
    response.body
    |> bit_builder.to_bit_string()
    |> bit_string.to_string()
  // debug_user_print_string(response_body)
  assert Ok(data) = json.decode(response_body)
  let data = dynamic.from(data)
  assert Ok(user_response) = dynamic.field(data, "user")
  assert Ok(email) = dynamic.field(user_response, "email")
  assert Ok("user@example.com") = dynamic.string(email)
  assert Ok(username) = dynamic.field(user_response, "username")
  assert Ok("some_username") = dynamic.string(username)

  assert Ok(tuple(_, 1, [db_user])) =
    pgo.query(atom_("default"), "SELECT email, username FROM users", [])

  assert Ok(db_email_dynamic) = dynamic.element(db_user, 0)
  assert Ok(db_email) = dynamic.string(db_email_dynamic)
  db_email
  |> should.equal("user@example.com")

  assert Ok(db_username_dynamic) = dynamic.element(db_user, 1)
  assert Ok(db_username) = dynamic.string(db_username_dynamic)
  db_username
  |> should.equal("some_username")

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
