import gleam/dynamic.{Dynamic}
import gleam/atom.{Atom}
import gleam/list
import gleam/map
import gleam/string
import gleam/json.{Json}

pub type TypedJson {
  JsonNull
  JsonBool(v: Bool)
  JsonInt(v: Int)
  JsonFloat(v: Float)
  JsonString(v: String)
  JsonArray(v: List(TypedJson))
  JsonObject(v: List(tuple(String, TypedJson)))
}

fn type_atom(an_atom: Atom) -> TypedJson {
  case atom.to_string(an_atom) {
    "true" -> JsonBool(True)
    "false" -> JsonBool(False)
    _ -> JsonNull
  }
}

fn type_json_data(data: Dynamic) -> TypedJson {
  case dynamic.atom(data) {
    Ok(an_atom) -> type_atom(an_atom)
    Error(_) ->
      case dynamic.int(data) {
        Ok(an_int) -> JsonInt(an_int)
        Error(_) ->
          case dynamic.float(data) {
            Ok(a_float) -> JsonFloat(a_float)
            Error(_) ->
              case dynamic.string(data) {
                Ok(a_string) -> JsonString(a_string)
                Error(_) ->
                  case dynamic.list(data) {
                    Ok(a_list) -> JsonArray(list.map(a_list, type_json_data))
                    Error(_) ->
                      case dynamic.map(data) {
                        Ok(a_map) ->
                          JsonObject(
                            a_map
                            |> map.to_list()
                            |> list.map(fn(field) {
                              let tuple(key, value) = field
                              assert Ok(string_key) = dynamic.string(key)
                              tuple(string_key, type_json_data(value))
                            })
                            |> list.sort(fn(left, right) {
                              let tuple(string_key_left, _value_left) = left
                              let tuple(string_key_right, _value_right) = right
                              string.compare(string_key_left, string_key_right)
                            }),
                          )
                        Error(_) ->
                          // ugh!
                          JsonNull
                      }
                  }
              }
          }
      }
  }
}

pub fn from_json(json_data: Json) -> TypedJson {
  type_json_data(dynamic.from(json_data))
}
