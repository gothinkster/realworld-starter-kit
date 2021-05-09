type t =
  | Fetch((int, string, [#text(string) | #json(Js.Json.t)]))
  | Decode(string)

let fetch: ((int, string, [#text(string) | #json(Js.Json.t)])) => t = e => Fetch(e)

let decode = (result: result<'a, string>): result<'a, t> =>
  switch result {
  | Ok(_ok) as ok => ok
  | Error(err) => Error(Decode(err))
  }
