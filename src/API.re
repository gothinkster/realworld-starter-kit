open Utils;

let host = "https://conduit.productionready.io";

let optToQueryString = (prefix, opt) =>
  opt->Belt.Option.mapWithDefault("", (++)(prefix));

let getResultIfOk = res => {
  open Js.Promise;
  open Belt.Result;

  let isOk = res |> Fetch.Response.ok;

  res
  |> Fetch.Response.json
  |> then_(json => (isOk ? Ok(json) : Error(json)) |> resolve);
};

let makeFetchInit =
    (
      ~body=?,
      ~method_=Fetch.Get,
      ~includeCookie=true,
      ~authorization=false,
      ~jsonContentType=false,
      (),
    ) => {
  let headers =
    [
      authorization ?
        getCookie("token")
        ->Belt.Option.mapWithDefault([], token =>
            [("Authorization", "Token " ++ token)]
          ) :
        [],
      jsonContentType ?
        [("Content-Type", "application/json; charset=utf-8")] : [],
    ]
    ->Belt.List.flatten
    ->Belt.List.toArray
    ->Fetch.HeadersInit.makeWithArray;
  let credentials = includeCookie ? Some(Fetch.Include) : None;

  Fetch.RequestInit.make(~body?, ~method_, ~credentials?, ~headers, ());
};

let listArticlesFeed = (~limit=20, ~offset=0, ()) =>
  Fetch.fetchWithInit(
    Printf.sprintf(
      "%s/api/articles/feed?limit=%d&offset=%d",
      host,
      limit,
      offset,
    ),
    makeFetchInit(~authorization=true, ()),
  )
  |> Js.Promise.then_(getResultIfOk);

let listArticles = (~tag=?, ~author=?, ~favorited=?, ~limit=20, ~offset=0, ()) =>
  Fetch.fetchWithInit(
    Printf.sprintf(
      "%s/api/articles?limit=%d&offset=%d%s%s%s",
      host,
      limit,
      offset,
      optToQueryString("&tag=", tag),
      optToQueryString("&author=", author),
      optToQueryString("&favorited=", favorited),
    ),
    makeFetchInit(~authorization=true, ()),
  )
  |> Js.Promise.then_(getResultIfOk);

let tags = () =>
  Fetch.fetchWithInit(Printf.sprintf("%s/api/tags", host), makeFetchInit())
  |> Js.Promise.then_(getResultIfOk);

let profiles = (~author, ()) =>
  Fetch.fetchWithInit(
    Printf.sprintf("%s/api/profiles/%s", host, author),
    makeFetchInit(~authorization=true, ()),
  )
  |> Js.Promise.then_(getResultIfOk);

let followUser = (~username, ()) =>
  Fetch.fetchWithInit(
    Printf.sprintf("%s/api/profiles/%s/follow", host, username),
    makeFetchInit(~method_=Post, ~authorization=true, ()),
  )
  |> Js.Promise.then_(getResultIfOk);

let unfollowUser = (~username, ()) =>
  Printf.sprintf("%s/api/profiles/%s/follow", host, username)
  ->Fetch.fetchWithInit(
      makeFetchInit(~method_=Delete, ~authorization=true, ()),
    )
  |> Js.Promise.then_(getResultIfOk);

let getArticle = (~slug, ()) =>
  Printf.sprintf("%s/api/articles/%s", host, slug)
  ->Fetch.fetchWithInit(makeFetchInit(~authorization=true, ()))
  |> Js.Promise.then_(getResultIfOk);

let deleteArticle = (~slug, ()) =>
  Printf.sprintf("%s/api/articles/%s", host, slug)
  ->Fetch.fetchWithInit(
      makeFetchInit(~method_=Delete, ~authorization=true, ()),
    )
  |> Js.Promise.then_(getResultIfOk);

let favoriteArticle = (~slug, ()) =>
  Printf.sprintf("%s/api/articles/%s/favorite", host, slug)
  ->Fetch.fetchWithInit(
      makeFetchInit(~method_=Post, ~authorization=true, ()),
    )
  |> Js.Promise.then_(getResultIfOk);

let unfavoriteArticle = (~slug, ()) =>
  Printf.sprintf("%s/api/articles/%s/favorite", host, slug)
  ->Fetch.fetchWithInit(
      makeFetchInit(~method_=Delete, ~authorization=true, ()),
    )
  |> Js.Promise.then_(getResultIfOk);

let comments = (~slug, ()) =>
  Printf.sprintf("%s/api/articles/%s/comments", host, slug)
  ->Fetch.fetchWithInit(makeFetchInit())
  |> Js.Promise.then_(getResultIfOk);

let addCommentsToAnArticle = (~slug, ~body, ()) =>
  "%s/api/articles/%s/comments"
  ->Printf.sprintf(host, slug)
  ->Fetch.fetchWithInit(
      makeFetchInit(
        ~method_=Post,
        ~authorization=true,
        ~jsonContentType=true,
        ~body=
          Fetch.BodyInit.make(
            Json.Encode.(
              [("comment", [("body", body |> string)] |> object_)]
              |> object_
            )
            |> Json.stringify,
          ),
        (),
      ),
    )
  |> Js.Promise.then_(getResultIfOk);

let deleteComment = (~slug, ~id, ()) =>
  "%s/api/articles/%s/comments/%d"
  ->Printf.sprintf(host, slug, id)
  ->Fetch.fetchWithInit(
      makeFetchInit(~method_=Delete, ~authorization=true, ()),
    )
  |> Js.Promise.then_(getResultIfOk);

let user = () =>
  "%s/api/user"
  ->Printf.sprintf(host)
  ->Fetch.fetchWithInit(makeFetchInit(~authorization=true, ()))
  |> Js.Promise.then_(getResultIfOk);

let updateUser = (~email, ~username, ~password, ~image, ~bio, ()) =>
  "%s/api/user"
  ->Printf.sprintf(host)
  ->Fetch.fetchWithInit(
      makeFetchInit(
        ~method_=Put,
        ~jsonContentType=true,
        ~authorization=true,
        ~body=
          Fetch.BodyInit.make(
            Json.Encode.(
              [
                (
                  "user",
                  [
                    ("email", email |> string),
                    ("username", username |> string),
                    ("password", password |> string),
                    ("image", image |> string),
                    ("bio", bio |> string),
                  ]
                  |> object_,
                ),
              ]
              |> object_
            )
            |> Json.stringify,
          ),
        (),
      ),
    )
  |> Js.Promise.then_(getResultIfOk);

let register = (~email, ~password, ~username, ()) =>
  "%s/api/users"
  ->Printf.sprintf(host)
  ->Fetch.fetchWithInit(
      makeFetchInit(
        ~method_=Post,
        ~authorization=true,
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
        (),
      ),
    )
  |> Js.Promise.then_(getResultIfOk);

let login = (~email, ~password, ()) =>
  "%s/api/users/login"
  ->Printf.sprintf(host)
  ->Fetch.fetchWithInit(
      makeFetchInit(
        ~method_=Post,
        ~jsonContentType=true,
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
        (),
      ),
    )
  |> Js.Promise.then_(getResultIfOk);

let createArticle = (~title, ~description, ~body, ~tagList, ()) =>
  "%s/api/articles"
  ->Printf.sprintf(host)
  ->Fetch.fetchWithInit(
      makeFetchInit(
        ~method_=Post,
        ~jsonContentType=true,
        ~authorization=true,
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
        (),
      ),
    )
  |> Js.Promise.then_(getResultIfOk);

let updateArticle = (~slug, ~title, ~description, ~body, ~tagList, ()) =>
  "%s/api/articles/%s"
  ->Printf.sprintf(host, slug)
  ->Fetch.fetchWithInit(
      makeFetchInit(
        ~method_=Put,
        ~jsonContentType=true,
        ~authorization=true,
        ~body=
          Fetch.BodyInit.make(
            Json.Encode.(
              [
                (
                  "article",
                  [
                    switch (title) {
                    | None => []
                    | Some(v) => [("title", v |> Json.Encode.string)]
                    },
                    switch (description) {
                    | None => []
                    | Some(v) => [("description", v |> Json.Encode.string)]
                    },
                    switch (body) {
                    | None => []
                    | Some(v) => [("body", v |> Json.Encode.string)]
                    },
                    switch (tagList) {
                    | None => []
                    | Some(v) => [
                        (
                          "tagList",
                          v |> Belt.List.toArray |> Json.Encode.array(string),
                        ),
                      ]
                    },
                  ]
                  |> Belt.List.flatten
                  |> Json.Encode.object_,
                ),
              ]
              |> object_
            )
            |> Json.stringify,
          ),
        (),
      ),
    )
  |> Js.Promise.then_(getResultIfOk);
