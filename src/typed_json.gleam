import gleam/dynamic.{Dynamic}
import gleam/atom.{Atom}
import gleam/list

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

pub fn type_json(data: Dynamic) -> TypedJson {
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
                    Ok(a_list) -> JsonArray(list.map(a_list, type_json))
                    Error(_) -> JsonObject([])
                  }
              }
          }
      }
  }
}
