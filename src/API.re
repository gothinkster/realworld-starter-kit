open Js.Promise;
open Fetch;

[@bs.scope ("window", "app")] [@bs.val] external backend: string = "backend";

external unsafeConvertToArticlesResponse: Js.Json.t => Shape.articlesResponse =
  "%identity";

module Endpoints = {
  let listArticles = Printf.sprintf("%s/api/articles", backend);
  let feedArticles = Printf.sprintf("%s/api/articles/feed", backend);
};

let listArticles = () => {
  Endpoints.listArticles
  |> fetch
  |> then_(Response.json)
  |> then_(json => json |> unsafeConvertToArticlesResponse |> resolve);
};

let feedArticles = () => {
  Endpoints.feedArticles |> fetch |> then_(Response.json);
};
