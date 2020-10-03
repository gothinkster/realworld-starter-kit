type t =
  | Fetch((int, string, [#text(string) | #json(Js.Json.t)]))
  | Decode(Decode.ParseError.failure)

let fetch: ((int, string, [#text(string) | #json(Js.Json.t)])) => t = e => Fetch(e)

let decode: Decode.ParseError.failure => t = e => Decode(e)
