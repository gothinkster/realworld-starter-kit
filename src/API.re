open Utils;

open Fetch;

let host = "https://conduit.productionready.io";

let optToQueryString = (prefix, opt) =>
  switch (opt) {
  | Some(v) => prefix ++ v
  | None => ""
  };

let getResultIfOk = res => {
  let isOk = res |> Response.ok;
  Js.Promise.(
    res
    |> Response.json
    |> then_(json =>
         (isOk ? Js.Result.Ok(json) : Js.Result.Error(json)) |> resolve
       )
  );
};

let getJsonContentType = () => {
  "Content-Type": "application/json; charset=utf-8",
};

let getAuthorizationHeader = () =>
  getCookie("token")
  |. Belt.Option.mapWithDefaultU(Js.Obj.empty(), (. value) =>
       {"Authorization": "Token " ++ value}
     );

let listArticlesFeed = (~limit=20, ~offset=0, ()) =>
  Js.Promise.(
    fetchWithInit(
      host
      ++ "/api/articles/feed"
      ++ "?limit="
      ++ string_of_int(limit)
      ++ "&offset="
      ++ string_of_int(offset),
      Fetch.RequestInit.make(
        ~credentials=Include,
        ~headers=getAuthorizationHeader() |> Fetch.HeadersInit.make,
        (),
      ),
    )
    |> then_(getResultIfOk)
  );

let listArticles = (~tag=?, ~author=?, ~favorited=?, ~limit=20, ~offset=0, ()) =>
  Js.Promise.(
    fetchWithInit(
      host
      ++ "/api/articles"
      ++ "?limit="
      ++ string_of_int(limit)
      ++ "&offset="
      ++ string_of_int(offset)
      ++ optToQueryString("&tag=", tag)
      ++ optToQueryString("&author=", author)
      ++ optToQueryString("&favorited=", favorited),
      Fetch.RequestInit.make(~credentials=Include, ()),
    )
    |> then_(getResultIfOk)
  );

let tags = () =>
  Js.Promise.(
    fetchWithInit(
      host ++ "/api/tags",
      Fetch.RequestInit.make(~credentials=Include, ()),
    )
    |> then_(getResultIfOk)
  );

let profiles = (~author) =>
  Js.Promise.(
    fetchWithInit(
      host ++ "/api/profiles/" ++ author,
      Fetch.RequestInit.make(~credentials=Include, ()),
    )
    |> then_(getResultIfOk)
  );

let article = (~slug) =>
  Js.Promise.(
    fetchWithInit(
      host ++ "/api/articles/" ++ slug,
      Fetch.RequestInit.make(~credentials=Include, ()),
    )
    |> then_(getResultIfOk)
  );

let comments = (~slug) =>
  Js.Promise.(
    fetchWithInit(
      host ++ "/api/articles/" ++ slug ++ "/comments",
      Fetch.RequestInit.make(~credentials=Include, ()),
    )
    |> then_(getResultIfOk)
  );

let user = () =>
  Js.Promise.(
    fetchWithInit(
      host ++ "/api/user",
      Fetch.RequestInit.make(
        ~method_=Get,
        ~headers=getAuthorizationHeader() |> Fetch.HeadersInit.make,
        ~credentials=Include,
        (),
      ),
    )
    |> then_(getResultIfOk)
  );

let register = (~email, ~password, ~username) =>
  Js.Promise.(
    fetchWithInit(
      host ++ "/api/users",
      Fetch.RequestInit.make(
        ~method_=Post,
        ~headers=getJsonContentType() |> Fetch.HeadersInit.make,
        ~body=
          Fetch.BodyInit.make(
            Json.Encode.(
              [
                (
                  "user",
                  [
                    ("username", username |> string),
                    ("email", email |> string),
                    ("password", password |> string),
                  ]
                  |> object_,
                ),
              ]
              |> object_
            )
            |> Json.stringify,
          ),
        ~credentials=Include,
        (),
      ),
    )
    |> then_(getResultIfOk)
  );

let login = (~email, ~password) =>
  Js.Promise.(
    fetchWithInit(
      host ++ "/api/users/login",
      Fetch.RequestInit.make(
        ~method_=Post,
        ~headers=getJsonContentType() |> Fetch.HeadersInit.make,
        ~body=
          Fetch.BodyInit.make(
            Json.Encode.(
              [
                (
                  "user",
                  [
                    ("email", email |> string),
                    ("password", password |> string),
                  ]
                  |> object_,
                ),
              ]
              |> object_
            )
            |> Json.stringify,
          ),
        ~credentials=Include,
        (),
      ),
    )
    |> then_(getResultIfOk)
  );

let createArticle = (~title, ~description, ~body, ~tagList) =>
  Js.Promise.(
    fetchWithInit(
      host ++ "/api/articles",
      Fetch.RequestInit.make(
        ~method_=Post,
        ~headers=
          Js.Obj.assign(getJsonContentType(), getAuthorizationHeader())
          |> Fetch.HeadersInit.make,
        ~body=
          Fetch.BodyInit.make(
            Json.Encode.(
              [
                (
                  "article",
                  [
                    ("title", title |> string),
                    ("description", description |> string),
                    ("body", body |> string),
                    (
                      "tagList",
                      tagList |> Belt.List.toArray |> array(string),
                    ),
                  ]
                  |> object_,
                ),
              ]
              |> object_
            )
            |> Json.stringify,
          ),
        ~credentials=Include,
        (),
      ),
    )
    |> then_(getResultIfOk)
  );
