import gleam/http.{Request, Response}
import gleam/bit_string
import gleam/bit_builder.{BitBuilder}
import gleam/json.{Json}
import gleam/dynamic
import gleam/int
import gleam/atom
import gleam/pgo
import gleam/option.{None, Option, Some}

fn check_utf8_encoding(
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

type RegistrationParams {
  RegistrationParams(
    email: String,
    password: String
  )
}

fn read_registration_params(registration_json: Json) -> Result(RegistrationParams, Response(String)) {
  let data = dynamic.from(registration_json)
  Ok(RegistrationParams("", ""))
}

type User {
  User(
    email: String,
    token: String,
    username: String,
    bio: Option(String),
    image: Option(String),
  )
}

fn user_registration(_request, registration_json) {
  try registration_params = read_registration_params(registration_json)

  let user = User("user@example.com", "some_token", "some_username", None, None)

  let user_response =
    json.object([
      tuple(
        "user",
        json.object([
          tuple("email", json.string(user.email)),
          tuple("token", json.string(user.token)),
          tuple("username", json.string(user.username)),
          tuple("bio", json.null()),
          tuple("image", json.null()),
        ]),
      ),
    ])
    |> json.encode()

  http.response(200)
  |> http.set_resp_body(user_response)
  |> Ok()
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
    http.Post, ["users"] -> {
      try string_body = check_utf8_encoding(request)
      try json_body = parse_json(string_body)
      user_registration(request, json_body)
    }
    _, _ -> not_found()
  }
}

pub fn service(request: Request(BitString)) -> Response(BitBuilder) {
  let response_result =
    request
    |> router()

  let response = case response_result {
    Ok(response) -> response
    Error(response) -> response
  }

  response
  |> http.map_resp_body(bit_builder.from_string)
}
