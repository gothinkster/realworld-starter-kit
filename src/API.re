open Js.Promise;
open Fetch;

module AsyncResult = Relude.AsyncResult;
module AsyncData = Relude.AsyncData;
module Option = Relude.Option;

[@bs.scope ("window", "app")] [@bs.val] external backend: string = "backend";

module Endpoints = {
  let listArticles =
      (~limit: int=10, ~offset: int=0, ~tag: option(string)=?, ()) =>
    Printf.sprintf(
      "%s/api/articles?limit=%d&offset=%d%s",
      backend,
      limit,
      offset,
      tag |> Option.map(someTag => "&tag=" ++ someTag) |> Option.getOrElse(""),
    );

  let feedArticles = (~limit: int=10, ~offset: int=0, ()) =>
    Printf.sprintf(
      "%s/api/articles/feed?limit=%d&offset=%d",
      backend,
      limit,
      offset,
    );

  let tags = Printf.sprintf("%s/api/tags", backend);
  let currentUser = Printf.sprintf("%s/api/user", backend);
};

let getJwtTokenHeader: unit => array((string, string)) =
  () =>
    Utils.getCookie("jwtToken")
    |> Relude.Option.flatMap(snd)
    |> Relude.Option.map(token =>
         [|("Authorization", Printf.sprintf("Token %s", token))|]
       )
    |> Relude.Option.getOrElse([||]);

let parseJsonIfOk:
  Fetch.Response.t => Js.Promise.t(Relude.Result.t(Js.Json.t, Error.t)) =
  resp =>
    if (Fetch.Response.ok(resp)) {
      resp
      |> Response.json
      |> then_(json => json |> Relude.Result.ok |> resolve);
    } else {
      Printf.sprintf(
        "%d %s",
        resp |> Fetch.Response.status,
        resp |> Fetch.Response.statusText,
      )
      |> Js.Exn.raiseError
      |> reject;
    };

let listArticles = (~limit=10, ~offset=0, ~tag=?, ()) => {
  Endpoints.listArticles(~limit, ~offset, ~tag?, ())
  |> fetch
  |> then_(Response.json)
  |> then_(json => json |> Shape.Articles.decode |> resolve);
};

let feedArticles = (~limit=10, ~offset=0, ()) => {
  let requestInit =
    RequestInit.make(
      ~headers=
        [|getJwtTokenHeader()|]
        |> Relude.Array.flatten
        |> HeadersInit.makeWithArray,
      (),
    );

  Endpoints.feedArticles(~limit, ~offset, ())
  |> fetchWithInit(_, requestInit)
  |> then_(Response.json)
  |> then_(json => json |> Shape.Articles.decode |> resolve);
};

let tags = () => {
  Endpoints.tags
  |> fetch
  |> then_(Response.json)
  |> then_(json => json |> Shape.Tags.decode |> resolve);
};

let currentUser = () => {
  let requestInit =
    RequestInit.make(
      ~headers=
        [|getJwtTokenHeader()|]
        |> Relude.Array.flatten
        |> HeadersInit.makeWithArray,
      (),
    );

  Endpoints.currentUser
  |> fetchWithInit(_, requestInit)
  |> then_(parseJsonIfOk)
  |> catch(Error.fromPromiseError)
  |> then_(result =>
       result
       |> Relude.Result.flatMap(json =>
            json
            |> Shape.User.decode
            |> Relude.Result.mapError(error => Error.EDecodeParseError(error))
          )
       |> resolve
     );
};
