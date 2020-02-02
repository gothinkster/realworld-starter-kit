open Js.Promise;
open Fetch;

module AsyncResult = Relude.AsyncResult;
module AsyncData = Relude.AsyncData;

[@bs.scope ("window", "app")] [@bs.val] external backend: string = "backend";

module Endpoints = {
  let listArticles = Printf.sprintf("%s/api/articles", backend);
  let feedArticles = Printf.sprintf("%s/api/articles/feed", backend);
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

let listArticles = () => {
  Endpoints.listArticles
  |> fetch
  |> then_(Response.json)
  |> then_(json => json |> Shape.Articles.decode |> resolve);
};

let feedArticles = () => {
  let requestInit =
    RequestInit.make(
      ~headers=
        [|getJwtTokenHeader()|]
        |> Relude.Array.flatten
        |> HeadersInit.makeWithArray,
      (),
    );

  Endpoints.feedArticles
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
  |> then_(Response.json)
  |> then_(json => json |> Shape.User.decode |> resolve);
};
