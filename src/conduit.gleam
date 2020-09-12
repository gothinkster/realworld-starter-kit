import gleam/http.{Request, Response}
import gleam/bit_string
import gleam/bit_builder.{BitBuilder}
import gleam/json.{Json}
import gleam/dynamic
import gleam/int
import gleam/atom
import gleam/pgo

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
