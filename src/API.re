open Js.Promise;
open Fetch;

[@bs.scope ("window", "app")] [@bs.val] external backend: string = "backend";

module Endpoints = {
  let listArticles = Printf.sprintf("%s/api/articles", backend);
  let feedArticles = Printf.sprintf("%s/api/articles/feed", backend);
};

let listArticles = () => {
  Endpoints.listArticles |> fetch |> then_(Response.json);
};

let feedArticles = () => {
  Endpoints.feedArticles |> fetch |> then_(Response.json);
};
