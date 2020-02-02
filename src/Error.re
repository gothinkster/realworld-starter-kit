type t =
  | EFetch(Js.Promise.error)
  | EDecodeParseError(Decode.ParseError.failure);

let fromPromiseError:
  Js.Promise.error => Js.Promise.t(Relude.Result.t(Js.Json.t, t)) =
  error => EFetch(error) |> Relude.Result.error |> Js.Promise.resolve;
