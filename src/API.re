open Js.Promise;
open Fetch;

[@bs.scope ("window", "app")] [@bs.val] external backend: string = "backend";

module Endpoints = {
  let listArticles = Printf.sprintf("%s/api/articles", backend);
  let feedArticles = Printf.sprintf("%s/api/articles/feed", backend);
  let tags = Printf.sprintf("%s/api/tags", backend);
  let currentUser = Printf.sprintf("%s/api/user", backend);
};

let listArticles = () => {
  Endpoints.listArticles
  |> fetch
  |> then_(Response.json)
  |> then_(json => json |> Shape.Articles.decode |> resolve);
};

let feedArticles = () => {
  Endpoints.feedArticles |> fetch |> then_(Response.json);
};

let tags = () => {
  Endpoints.tags
  |> fetch
  |> then_(Response.json)
  |> then_(json => json |> Shape.Tags.decode |> resolve);
};

let currentUser = () => {
  let token =
    Utils.getCookie("jwtToken")
    |> Relude.Option.flatMap(snd)
    |> Relude.Option.map(token =>
         [|("Authorization", Printf.sprintf("Token %s", token))|]
       )
    |> Relude.Option.getOrElse([||]);

  let headers = HeadersInit.makeWithArray([|token|] |> Relude.Array.flatten);
  let requestInit = RequestInit.make(~headers, ());

  Endpoints.currentUser
  |> fetchWithInit(_, requestInit)
  |> then_(Response.json)
  |> then_(json => json |> Shape.User.decode |> resolve);
};
