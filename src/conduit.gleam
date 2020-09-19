import gleam/http.{Request, Response}
import gleam/bit_string
import gleam/bit_builder.{BitBuilder}
import gleam/json
import gleam/dynamic
import gleam/int
import gleam/atom
import gleam/pgo
import gleam/option.{None, Option, Some}
import gleam/string
import gleam/regex
import gleam/list
import typed_json.{JsonObject, JsonString, TypedJson}

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

fn parse_json(string_body: String) -> Result(TypedJson, Response(String)) {
  case json.decode(string_body) {
    Ok(json_data) -> Ok(typed_json.from_json(json_data))
    Error(_) ->
      http.response(400)
      |> http.set_resp_body("Could not parse the json body")
      |> Error()
  }
}

type RegistrationParams {
  RegistrationParams(email: String, password: String, username: String)
}

fn registration_params_builder() {
  fn(email) {
    fn(password) {
      fn(username) {
        RegistrationParams(email: email, password: password, username: username)
      }
    }
  }
}

type ConduitErrors =
  List(tuple(String, List(String)))

fn validation_errors_joiner(
  errors1: ConduitErrors,
  errors2: ConduitErrors,
) -> ConduitErrors {
  list.append(errors1, errors2)
  |> list.sort(fn(left, right) {
    let tuple(string_key_left, _value_left) = left
    let tuple(string_key_right, _value_right) = right
    string.compare(string_key_left, string_key_right)
  })
  |> list.fold(
    [],
    fn(error, acc) {
      case error, acc {
        tuple(key, key_errors), [tuple(acc_key, acc_key_errors), ..rest] if key == acc_key -> [
          tuple(key, list.append(acc_key_errors, key_errors)),
          ..rest
        ]
        error, acc -> [error, ..acc]
      }
    },
  )
  |> list.reverse()
}

fn validate_registration_email(
  user_json: TypedJson,
) -> Result(String, ConduitErrors) {
  case typed_json.filter_object(user_json, ["email"]) {
    JsonObject([tuple("email", JsonString(email))]) -> {
      assert Ok(email_regex) = regex.from_string("^[^@]+@[^@]+$")
      case regex.check(email_regex, email) {
        True -> Ok(email)
        False -> Error([tuple("email", ["is not valid"])])
      }
    }
    JsonObject([tuple("email", _)]) ->
      Error([tuple("email", ["must be a string"])])
    _ -> Error([tuple("email", ["must be present"])])
  }
}

fn validate_registration_password(
  user_json: TypedJson,
) -> Result(String, ConduitErrors) {
  case typed_json.filter_object(user_json, ["password"]) {
    JsonObject([tuple("password", JsonString(password))]) ->
      case string.length(password) {
        length if length >= 8 -> Ok(password)
        _ -> Error([tuple("password", ["must be at least 8 characters long"])])
      }
    JsonObject([tuple("password", _)]) ->
      Error([tuple("password", ["must be a string"])])
    _ -> Error([tuple("password", ["must be present"])])
  }
}

fn validate_registration_username(
  user_json: TypedJson,
) -> Result(String, ConduitErrors) {
  case typed_json.filter_object(user_json, ["username"]) {
    JsonObject([tuple("username", JsonString(username))]) ->
      // assert Ok(username_regex) = regex.from_string("^\S{1,20}$")
      // case regex.check(username_regex, username) {
      //   True -> Ok(username)
      //   False -> Error([tuple("username", ["is not valid"])])
      // }
      Ok(username)
    JsonObject([tuple("username", _)]) ->
      Error([tuple("username", ["must be a string"])])
    _ -> Error([tuple("username", ["must be present"])])
  }
}

fn apply_validation_result(
  result1: Result(fn(a) -> b, e),
  result2: Result(a, e),
  errors_joiner: fn(e, e) -> e,
) -> Result(b, e) {
  case result1, result2 {
    Ok(f), Ok(x) -> Ok(f(x))
    Ok(_), Error(errors) -> Error(errors)
    Error(errors), Ok(_) -> Error(errors)
    Error(errors1), Error(errors2) ->
      errors_joiner(errors1, errors2)
      |> Error()
  }
}

fn validate_registration_user_fields(
  user_json: TypedJson,
) -> Result(RegistrationParams, ConduitErrors) {
  registration_params_builder()
  |> Ok()
  |> apply_validation_result(
    validate_registration_email(user_json),
    validation_errors_joiner,
  )
  |> apply_validation_result(
    validate_registration_password(user_json),
    validation_errors_joiner,
  )
  |> apply_validation_result(
    validate_registration_username(user_json),
    validation_errors_joiner,
  )
}

fn render_errors_json(errors: ConduitErrors) -> Response(String) {
  let error_response =
    json.object([
      tuple(
        "errors",
        json.object(
          errors
          |> list.map(fn(field_errors) {
            let tuple(field, errors_list) = field_errors
            tuple(
              field,
              json.list(list.map(
                errors_list,
                fn(error_string) { json.string(error_string) },
              )),
            )
          }),
        ),
      ),
    ])
    |> json.encode()

  http.response(422)
  |> http.set_resp_body(error_response)
}

fn read_registration_params(
  registration_json: TypedJson,
) -> Result(RegistrationParams, Response(String)) {
  // What errors should be returned, exactly? This is not well-defined in the in realworld API spec
  let validated_registration_params = case typed_json.filter_object(
    registration_json,
    ["user"],
  ) {
    JsonObject([tuple("user", user_json)]) ->
      validate_registration_user_fields(user_json)
    _ -> validate_registration_user_fields(JsonObject([]))
  }
  case validated_registration_params {
    Ok(registration_params) -> Ok(registration_params)
    Error(errors) -> Error(render_errors_json(errors))
  }
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

fn user_registration(
  registration_json: TypedJson,
) -> Result(Response(String), Response(String)) {
  try RegistrationParams(user_email, _user_password, user_username) =
    read_registration_params(registration_json)

  let user = User(user_email, "some_token", user_username, None, None)

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
    http.Post, ["api", "users"] -> {
      try string_body = check_utf8_encoding(request)
      try json_body = parse_json(string_body)
      user_registration(json_body)
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
