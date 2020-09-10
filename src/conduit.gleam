import gleam/http.{Request, Response}
import gleam/bit_string
import gleam/bit_builder.{BitBuilder}
import gleam/json.{Json}
import gleam/dynamic
import gleam/int
import gleam/atom
import gleam/pgo

fn hello_world() -> Result(Response(String), Response(String)) {
  http.response(200)
  |> http.set_resp_body("Hello, from conduit!")
  |> Ok()
}

fn check_encoding(
  request: Request(BitString),
) -> Result(String, Response(String)) {
  case bit_string.to_string(request.body) {
    Ok(body) -> Ok(body)
    Error(_) ->
      http.response(400)
      |> http.set_resp_body(
        "Could not read the request body: make sure the body of your request is a valid UTF-8 string",
      )
      |> Error()
  }
}

fn parse_json(string_body: String) -> Result(Json, Response(String)) {
  case json.decode(string_body) {
    Ok(json_body) -> Ok(json_body)
    Error(_) ->
      http.response(400)
      |> http.set_resp_body("Could not parse the json body")
      |> Error()
  }
}

fn json_check_foo(
  json_body: json.Json,
) -> Result(Response(String), Response(String)) {
  let maybe_foo_val = {
    let map = dynamic.from(json_body)
    try foo = dynamic.field(map, "foo")
    dynamic.string(foo)
  }
  case maybe_foo_val {
    Ok("bar") ->
      http.response(200)
      |> http.set_resp_body("baz!")
      |> Ok()
    _ ->
      http.response(200)
      |> http.set_resp_body("that's a fine json you have there")
      |> Ok()
  }
}

fn parse_number(number_string: String) -> Result(Int, Response(String)) {
  case int.parse(number_string) {
    Ok(parsed_number) -> Ok(parsed_number)
    Error(Nil) ->
      http.response(400)
      |> http.set_resp_body("That's not a number!")
      |> Error()
  }
}

fn add_stuff_to_database(
  number: Int,
) -> Result(Response(String), Response(String)) {
  assert Ok(default) = atom.from_string("default")
  case pgo.query(
    default,
    "insert into stuff(id) values ($1)",
    [pgo.int(number)],
  ) {
    Ok(_) ->
      http.response(200)
      |> http.set_resp_body("Alrighty! We have new stuff")
      |> Ok()
    Error(_) ->
      http.response(400)
      |> http.set_resp_body(
        "Uh oh! That didn't work. Maybe we already had your stuff?",
      )
      |> Error()
  }
}

fn not_found() -> Result(Response(String), Response(String)) {
  http.response(404)
  |> http.set_resp_body("Not found")
  |> Error()
}

fn router(
  request: Request(BitString),
) -> Result(Response(String), Response(String)) {
  let path_segments = http.path_segments(request)
  case request.method, path_segments {
    http.Get, ["hello_world"] -> hello_world()
    http.Post, ["json_check_foo"] -> {
      try string_body = check_encoding(request)
      try json_body = parse_json(string_body)
      json_check_foo(json_body)
    }
    http.Get, ["add_stuff", number_string] -> {
      try number = parse_number(number_string)
      add_stuff_to_database(number)
    }
    _, _ -> not_found()
  }
}

fn unresult_response(
  result: Result(Response(String), Response(String)),
) -> Response(String) {
  case result {
    Ok(response) -> response
    Error(response) -> response
  }
}

pub fn service(request: Request(BitString)) -> Response(BitBuilder) {
  request
  |> router()
  |> unresult_response()
  |> http.map_resp_body(bit_builder.from_string)
}
