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

let unfollowUser = (~username, ()) => {
  open Js.Promise;
  let url = host ++ "/api/profiles/" ++ username ++ "/follow";

  url->(
         Fetch.fetchWithInit(
           makeFetchInit(~method_=Delete, ~authorization=true, ()),
         )
       )
  |> then_(getResultIfOk);
};

let getArticle = (~slug, ()) => {
  open Js.Promise;
  let url = host ++ "/api/articles/" ++ slug;

  url->(Fetch.fetchWithInit(makeFetchInit(~authorization=true, ())))
  |> then_(getResultIfOk);
};

let deleteArticle = (~slug, ()) => {
  open Js.Promise;
  let url = host ++ "/api/articles/" ++ slug;

  url->(
         Fetch.fetchWithInit(
           makeFetchInit(~method_=Delete, ~authorization=true, ()),
         )
       )
  |> then_(getResultIfOk);
};

let favoriteArticle = (~slug, ()) => {
  open Js.Promise;
  let url = host ++ "/api/articles/" ++ slug ++ "/favorite";

  url->(
         Fetch.fetchWithInit(
           makeFetchInit(~method_=Post, ~authorization=true, ()),
         )
       )
  |> then_(getResultIfOk);
};

let unfavoriteArticle = (~slug, ()) => {
  open Js.Promise;
  let url = host ++ "/api/articles/" ++ slug ++ "/favorite";

  url->(
         Fetch.fetchWithInit(
           makeFetchInit(~method_=Delete, ~authorization=true, ()),
         )
       )
  |> then_(getResultIfOk);
};

let comments = (~slug, ()) => {
  open Js.Promise;
  let url = host ++ "/api/articles/" ++ slug ++ "/comments";

  url->(Fetch.fetchWithInit(makeFetchInit())) |> then_(getResultIfOk);
};

let addCommentsToAnArticle = (~slug, ~body, ()) => {
  open Js.Promise;
  let url = host ++ "/api/articles/" ++ slug ++ "/comments";

  url->(
         Fetch.fetchWithInit(
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
       )
  |> then_(getResultIfOk);
};

let deleteComment = (~slug, ~id, ()) => {
  open Js.Promise;
  let url =
    host ++ "/api/articles/" ++ slug ++ "/comments/" ++ string_of_int(id);

  url->(
         Fetch.fetchWithInit(
           makeFetchInit(~method_=Delete, ~authorization=true, ()),
         )
       )
  |> then_(getResultIfOk);
};

let user = () => {
  open Js.Promise;
  let url = host ++ "/api/user";

  url->(Fetch.fetchWithInit(makeFetchInit(~authorization=true, ())))
  |> then_(getResultIfOk);
};

let updateUser = (~email, ~username, ~password, ~image, ~bio, ()) => {
  open Js.Promise;
  let url = host ++ "/api/user";

  url->(
         Fetch.fetchWithInit(
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
       )
  |> then_(getResultIfOk);
};

let register = (~email, ~password, ~username, ()) => {
  open Js.Promise;
  let url = host ++ "/api/users";

  url->(
         Fetch.fetchWithInit(
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
       )
  |> then_(getResultIfOk);
};

let login = (~email, ~password, ()) => {
  open Js.Promise;
  let url = host ++ "/api/users/login";

  url->(
         Fetch.fetchWithInit(
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
       )
  |> then_(getResultIfOk);
};

let createArticle = (~title, ~description, ~body, ~tagList, ()) => {
  open Js.Promise;
  let url = host ++ "/api/articles";

  url->(
         Fetch.fetchWithInit(
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
       )
  |> then_(getResultIfOk);
};

let updateArticle = (~slug, ~title, ~description, ~body, ~tagList, ()) => {
  open Js.Promise;
  let url = host ++ "/api/articles/" ++ slug;
  let article =
    Json.Encode.[
      switch (title) {
      | None => []
      | Some(v) => [("title", v |> string)]
      },
      switch (description) {
      | None => []
      | Some(v) => [("description", v |> string)]
      },
      switch (body) {
      | None => []
      | Some(v) => [("body", v |> string)]
      },
      switch (tagList) {
      | None => []
      | Some(v) => [("tagList", v |> Belt.List.toArray |> array(string))]
      },
    ]
    |> Belt.List.flatten
    |> Json.Encode.object_;

  url->(
         Fetch.fetchWithInit(
           makeFetchInit(
             ~method_=Put,
             ~jsonContentType=true,
             ~authorization=true,
             ~body=
               Fetch.BodyInit.make(
                 Json.Encode.([("article", article)] |> object_)
                 |> Json.stringify,
               ),
             (),
           ),
         )
       )
  |> then_(getResultIfOk);
};
