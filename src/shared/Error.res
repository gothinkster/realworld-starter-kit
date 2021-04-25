type t =
  | Fetch((int, string, [#text(string) | #json(Js.Json.t)]))
  | Decode(string)

let fetch: ((int, string, [#text(string) | #json(Js.Json.t)])) => t = e => Fetch(e)
