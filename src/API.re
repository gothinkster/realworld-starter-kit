open Fetch;

let host = "https://conduit.productionready.io";

let getCookie = target =>
  Webapi.Dom.document
  |> Webapi.Dom.Document.asHtmlDocument
  |. Belt.Option.flatMapU((. htmlDocument) =>
       htmlDocument
       |> Webapi.Dom.HtmlDocument.cookie
       |> Js.String.split(";")
       |> Js.Array.map(cookieStr =>
            switch (cookieStr |> Js.String.split("=")) {
            | [|name, value|] => (name, value)
            | [||]
            | _ => ("", "")
            }
          )
       |> Js.Array.find(((name, _value)) => target === name)
     );

let optToQueryString = (prefix, opt) =>
  switch (opt) {
  | Some(v) => prefix ++ v
  | None => ""
  };

let getResultIfOk = res =>
  Js.Promise.(
    res |> Response.ok ?
      res |> Response.json |> then_(json => Js.Result.Ok(json) |> resolve) :
      Js.Result.Error(res |> Response.statusText) |> resolve
  );

let listArticles = (~tag=?, ~author=?, ~favorited=?, ~limit=20, ~offset=0, ()) =>
  Js.Promise.(
    fetch(
      host
      ++ "/api/articles"
      ++ "?limit="
      ++ string_of_int(limit)
      ++ "&offset="
      ++ string_of_int(offset)
      ++ optToQueryString("&tag=", tag)
      ++ optToQueryString("&author=", author)
      ++ optToQueryString("&favorited=", favorited),
    )
    |> then_(getResultIfOk)
  );

let tags = () =>
  Js.Promise.(fetch(host ++ "/api/tags") |> then_(getResultIfOk));

let profiles = (~author) =>
  Js.Promise.(
    fetch(host ++ "/api/profiles/" ++ author) |> then_(getResultIfOk)
  );

let article = (~slug) =>
  Js.Promise.(
    fetch(host ++ "/api/articles/" ++ slug) |> then_(getResultIfOk)
  );

let comments = (~slug) =>
  Js.Promise.(
    fetch(host ++ "/api/articles/" ++ slug ++ "/comments")
    |> then_(getResultIfOk)
  );

let user = () =>
  Js.Promise.(
    fetchWithInit(
      host ++ "/api/user",
      Fetch.RequestInit.make(
        ~method_=Get,
        ~headers=
          getCookie("token")
          |. Belt.Option.mapWithDefaultU(Js.Obj.empty(), (. v) =>
               {"Authorization": v}
             )
          |> Fetch.HeadersInit.make,
        (),
      ),
    )
    |> then_(getResultIfOk)
  );
