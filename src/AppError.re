type t =
  | EFetch(Js.Promise.error)
  | EDecodeParseError(Decode.ParseError.failure);
