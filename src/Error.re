type t =
  | EFetch((int, string, [ | `text(string) | `json(Js.Json.t)]))
  | EDecodeParseError(Decode.ParseError.failure);
