import typed_json
import gleam/json
import gleam/dynamic
import gleam/should

fn json_float(input: Float) -> json.Json {
  input
  |> dynamic.from()
  |> dynamic.unsafe_coerce()
}

pub fn type_simple_test() {
  json.null()
  |> typed_json.from_json()
  |> should.equal(typed_json.JsonNull)

  json.bool(True)
  |> typed_json.from_json()
  |> should.equal(typed_json.JsonBool(True))

  json.bool(False)
  |> typed_json.from_json()
  |> should.equal(typed_json.JsonBool(False))

  json.int(1337)
  |> typed_json.from_json()
  |> should.equal(typed_json.JsonInt(1337))

  json_float(1337.0)
  |> typed_json.from_json()
  |> should.equal(typed_json.JsonFloat(1337.0))

  json.string("Yup")
  |> typed_json.from_json()
  |> should.equal(typed_json.JsonString("Yup"))
}

pub fn type_array_test() {
  json.list([json.list([]), json_float(1337.0), json.null()])
  |> typed_json.from_json()
  |> should.equal(typed_json.JsonArray([
    typed_json.JsonArray([]),
    typed_json.JsonFloat(1337.0),
    typed_json.JsonNull,
  ]))
}

pub fn type_object_test() {
  json.object([
    tuple("key2", json.object([])),
    tuple("key1", json_float(1337.0)),
    tuple("key3", json.null()),
  ])
  |> typed_json.from_json()
  |> should.equal(typed_json.JsonObject([
    tuple("key1", typed_json.JsonFloat(1337.0)),
    tuple("key2", typed_json.JsonObject([])),
    tuple("key3", typed_json.JsonNull),
  ]))
}
