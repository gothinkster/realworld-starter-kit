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
  let null_json = dynamic.from(json.null())
  typed_json.type_json(null_json)
  |> should.equal(typed_json.JsonNull)

  let true_json = dynamic.from(json.bool(True))
  typed_json.type_json(true_json)
  |> should.equal(typed_json.JsonBool(True))

  let false_json = dynamic.from(json.bool(False))
  typed_json.type_json(false_json)
  |> should.equal(typed_json.JsonBool(False))

  let int_json = dynamic.from(json.int(1337))
  typed_json.type_json(int_json)
  |> should.equal(typed_json.JsonInt(1337))

  let float_json = dynamic.from(json_float(1337.0))
  typed_json.type_json(float_json)
  |> should.equal(typed_json.JsonFloat(1337.0))

  let string_json = dynamic.from(json.string("Yup"))
  typed_json.type_json(string_json)
  |> should.equal(typed_json.JsonString("Yup"))
}

pub fn type_array_test() {
  let list_json =
    dynamic.from(json.list([json.list([]), json_float(1337.0), json.null()]))
  typed_json.type_json(list_json)
  |> should.equal(typed_json.JsonArray([
    typed_json.JsonArray([]),
    typed_json.JsonFloat(1337.0),
    typed_json.JsonNull,
  ]))
}
