open Js.Promise;
open Relude.Globals;
open Fetch;

module Decode = Decode.AsResult.OfParseError;

[@bs.scope ("window", "app")] [@bs.val] external backend: string = "backend";

type articleAction =
  | Fetch(string)
  | Delete(string);

type followAction =
  | Follow(string)
  | Unfollow(string);

type favoriteAction =
  | Favorite(string)
  | Unfavorite(string);

module Endpoints = {
  let article = (~slug: string, ()) =>
    Printf.sprintf("%s/api/articles/%s", backend, slug);

  let favoriteArticle = (~slug: string, ()) =>
    Printf.sprintf("%s/api/articles/%s/favorite", backend, slug);

  let listArticles =
      (
        ~limit: int=10,
        ~offset: int=0,
        ~tag: option(string)=?,
        ~author: option(string)=?,
        ~favorited: option(string)=?,
        (),
      ) =>
    Printf.sprintf(
      "%s/api/articles?limit=%d&offset=%d%s%s%s",
      backend,
      limit,
      offset,
      tag |> Option.map(ok => "&tag=" ++ ok) |> Option.getOrElse(""),
      author |> Option.map(ok => "&author=" ++ ok) |> Option.getOrElse(""),
      favorited
      |> Option.map(ok => "&favorited=" ++ ok)
      |> Option.getOrElse(""),
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

  let profile = (~username: string, ()) =>
    Printf.sprintf("%s/api/profiles/%s", backend, username);

  let followUser = (~username: string, ()) =>
    Printf.sprintf("%s/api/profiles/%s/follow", backend, username);

  let comments = (~slug: string, ()) =>
    Printf.sprintf("%s/api/articles/%s/comments", backend, slug);

  let comment = (~slug: string, ~id: int, ()) =>
    Printf.sprintf("%s/api/articles/%s/comments/%d", backend, slug, id);
};

let getJwtTokenHeader: unit => array((string, string)) =
  () =>
    Utils.getCookie("jwtToken")
    |> Option.flatMap(snd)
    |> Option.map(token =>
         [|("Authorization", Printf.sprintf("Token %s", token))|]
       )
    |> Option.getOrElse([||]);

let getContentTypeJsonHeader: unit => array((string, string)) =
  () => [|("Content-Type", "application/json; charset=UTF-8")|];

let getErrorBodyJson:
  Result.t(Js.Json.t, Fetch.Response.t) =>
  Js.Promise.t(Relude.Result.t(Js.Json.t, Error.t)) =
  fun
  | Ok(_json) as ok => ok |> resolve
  | Error(resp) =>
    resp
    |> Response.json
    |> then_(json =>
         Error.EFetch((
           resp |> Fetch.Response.status,
           resp |> Fetch.Response.statusText,
           `json(json),
         ))
         |> Result.error
         |> resolve
       );

let getErrorBodyText:
  Result.t(Js.Json.t, Fetch.Response.t) =>
  Js.Promise.t(Relude.Result.t(Js.Json.t, Error.t)) =
  fun
  | Ok(_json) as ok => ok |> resolve
  | Error(resp) =>
    resp
    |> Response.text
    |> then_(body =>
         Error.EFetch((
           resp |> Fetch.Response.status,
           resp |> Fetch.Response.statusText,
           `text(body),
         ))
         |> Result.error
         |> resolve
       );

let parseJsonIfOk:
  Fetch.Response.t =>
  Js.Promise.t(Relude.Result.t(Js.Json.t, Fetch.Response.t)) =
  resp =>
    if (Fetch.Response.ok(resp)) {
      resp
      |> Response.json
      |> then_(json => json |> Relude.Result.ok |> resolve);
    } else {
      resp |> Result.error |> resolve;
    };

let article:
  (~action: articleAction, unit) =>
  Js.Promise.t(Relude.Result.t(Shape.Article.t, Error.t)) =
  (~action, ()) => {
    let requestInit =
      RequestInit.make(
        ~method_=
          switch (action) {
          | Fetch(_) => Get
          | Delete(_) => Delete
          },
        ~headers=
          [|getJwtTokenHeader()|]
          |> Relude.Array.flatten
          |> HeadersInit.makeWithArray,
        (),
      );

    Endpoints.article(
      ~slug=
        switch (action) {
        | Fetch(slug)
        | Delete(slug) => slug
        },
      (),
    )
    |> fetchWithInit(_, requestInit)
    |> then_(parseJsonIfOk)
    |> then_(getErrorBodyText)
    |> then_(result =>
         result
         |> Relude.Result.flatMap(json =>
              json
              |> Shape.Article.decode
              |> Relude.Result.mapError(error =>
                   Error.EDecodeParseError(error)
                 )
            )
         |> resolve
       );
  };

let favoriteArticle:
  (~action: favoriteAction, unit) =>
  Js.Promise.t(Relude.Result.t(Shape.Article.t, Error.t)) =
  (~action, ()) => {
    let requestInit =
      RequestInit.make(
        ~method_=
          switch (action) {
          | Favorite(_slug) => Post
          | Unfavorite(_slug) => Delete
          },
        ~headers=
          [|getJwtTokenHeader()|]
          |> Relude.Array.flatten
          |> HeadersInit.makeWithArray,
        (),
      );

    Endpoints.favoriteArticle(
      ~slug=
        switch (action) {
        | Favorite(slug) => slug
        | Unfavorite(slug) => slug
        },
      (),
    )
    |> fetchWithInit(_, requestInit)
    |> then_(parseJsonIfOk)
    |> then_(getErrorBodyText)
    |> then_(result =>
         result
         |> Relude.Result.flatMap(json =>
              json
              |> Shape.Article.decode
              |> Relude.Result.mapError(error =>
                   Error.EDecodeParseError(error)
                 )
            )
         |> resolve
       );
  };

let listArticles = (~limit=10, ~offset=0, ~tag=?, ~author=?, ~favorited=?, ()) => {
  let requestInit =
    RequestInit.make(
      ~headers=
        [|getJwtTokenHeader()|]
        |> Relude.Array.flatten
        |> HeadersInit.makeWithArray,
      (),
    );

  Endpoints.listArticles(~limit, ~offset, ~tag?, ~author?, ~favorited?, ())
  |> fetchWithInit(_, requestInit)
  |> then_(parseJsonIfOk)
  |> then_(getErrorBodyText)
  |> then_(result =>
       result
       |> Relude.Result.flatMap(json =>
            json
            |> Shape.Articles.decode
            |> Relude.Result.mapError(error => Error.EDecodeParseError(error))
          )
       |> resolve
     );
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
  |> then_(parseJsonIfOk)
  |> then_(getErrorBodyText)
  |> then_(result =>
       result
       |> Relude.Result.flatMap(json =>
            json
            |> Shape.Articles.decode
            |> Relude.Result.mapError(error => Error.EDecodeParseError(error))
          )
       |> resolve
     );
};

let tags = () => {
  Endpoints.tags
  |> fetch
  |> then_(parseJsonIfOk)
  |> then_(getErrorBodyText)
  |> then_(result =>
       result
       |> Relude.Result.flatMap(json =>
            json
            |> Shape.Tags.decode
            |> Relude.Result.mapError(error => Error.EDecodeParseError(error))
          )
       |> resolve
     );
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
  |> then_(getErrorBodyText)
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

let updateUser = (~user: Shape.User.t, ~password: string, ()) => {
  let user =
    [
      [("email", Js.Json.string(user.email))],
      [("bio", Js.Json.string(user.bio |> Option.getOrElse("")))],
      [("image", Js.Json.string(user.image))],
      [("username", Js.Json.string(user.username))],
      if (password == "") {
        [];
      } else {
        [("password", Js.Json.string(password))];
      },
    ]
    |> List.flatten
    |> Js.Dict.fromList
    |> Js.Json.object_;
  let body =
    [("user", user)]
    |> Js.Dict.fromList
    |> Js.Json.object_
    |> Js.Json.stringify
    |> Fetch.BodyInit.make;

  let requestInit =
    RequestInit.make(
      ~method_=Put,
      ~headers=
        [|getJwtTokenHeader(), getContentTypeJsonHeader()|]
        |> Relude.Array.flatten
        |> HeadersInit.makeWithArray,
      ~body,
      (),
    );

  Endpoints.currentUser
  |> fetchWithInit(_, requestInit)
  |> then_(parseJsonIfOk)
  |> then_(getErrorBodyJson)
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

let followUser = (~action: followAction, ()) => {
  let requestInit =
    RequestInit.make(
      ~method_=
        switch (action) {
        | Follow(_username) => Post
        | Unfollow(_username) => Delete
        },
      ~headers=
        [|getJwtTokenHeader()|]
        |> Relude.Array.flatten
        |> HeadersInit.makeWithArray,
      (),
    );

  Endpoints.followUser(
    ~username=
      switch (action) {
      | Follow(username)
      | Unfollow(username) => username
      },
    (),
  )
  |> fetchWithInit(_, requestInit)
  |> then_(parseJsonIfOk)
  |> then_(getErrorBodyText)
  |> then_(result =>
       result
       |> Relude.Result.flatMap(json =>
            json
            |> Shape.Decode.(field("profile", Shape.Author.decode))
            |> Relude.Result.mapError(error => Error.EDecodeParseError(error))
          )
       |> resolve
     );
};

let getComments:
  (~slug: string, unit) =>
  Js.Promise.t(Relude.Result.t(array(Shape.Comment.t), Error.t)) =
  (~slug, ()) => {
    let requestInit =
      RequestInit.make(
        ~headers=
          [|getJwtTokenHeader()|]
          |> Relude.Array.flatten
          |> HeadersInit.makeWithArray,
        (),
      );

    Endpoints.comments(~slug, ())
    |> fetchWithInit(_, requestInit)
    |> then_(parseJsonIfOk)
    |> then_(getErrorBodyText)
    |> then_(result =>
         result
         |> Relude.Result.flatMap(json =>
              json
              |> Shape.Comment.decode
              |> Relude.Result.mapError(error =>
                   Error.EDecodeParseError(error)
                 )
            )
         |> resolve
       );
  };

let deleteComment = (~slug: string, ~id: int, ()) => {
  let requestInit =
    RequestInit.make(
      ~method_=Delete,
      ~headers=
        [|getJwtTokenHeader()|]
        |> Relude.Array.flatten
        |> HeadersInit.makeWithArray,
      (),
    );

  Endpoints.comment(~slug, ~id, ())
  |> fetchWithInit(_, requestInit)
  |> then_(parseJsonIfOk)
  |> then_(getErrorBodyText)
  |> then_(result =>
       result
       |> Relude.Result.flatMap(_json => Relude.Result.ok((slug, id)))
       |> resolve
     );
};

let addComment = (~slug: string, ~body: string, ()) => {
  let requestInit =
    RequestInit.make(
      ~method_=Post,
      ~headers=
        [|getJwtTokenHeader(), getContentTypeJsonHeader()|]
        |> Relude.Array.flatten
        |> HeadersInit.makeWithArray,
      ~body=
        Fetch.BodyInit.make(
          Js.Json.stringify(
            Js.Json.object_(
              Js.Dict.fromList([
                (
                  "comment",
                  Js.Json.object_(
                    Js.Dict.fromList([("body", Js.Json.string(body))]),
                  ),
                ),
              ]),
            ),
          ),
        ),
      (),
    );

  Endpoints.comments(~slug, ())
  |> fetchWithInit(_, requestInit)
  |> then_(parseJsonIfOk)
  |> then_(getErrorBodyText)
  |> then_(result =>
       result
       |> Relude.Result.flatMap(json =>
            json
            |> Decode.field("comment", Shape.Comment.decodeComment)
            |> Relude.Result.mapError(error => Error.EDecodeParseError(error))
          )
       |> resolve
     );
};

let getProfile:
  (~username: string, unit) =>
  Js.Promise.t(Relude.Result.t(Shape.Author.t, Error.t)) =
  (~username, ()) => {
    let requestInit =
      RequestInit.make(
        ~headers=
          [|getJwtTokenHeader()|]
          |> Relude.Array.flatten
          |> HeadersInit.makeWithArray,
        (),
      );

    Endpoints.profile(~username, ())
    |> fetchWithInit(_, requestInit)
    |> then_(parseJsonIfOk)
    |> then_(getErrorBodyText)
    |> then_(result =>
         result
         |> Relude.Result.flatMap(json =>
              json
              |> Decode.field("profile", Shape.Author.decode)
              |> Relude.Result.mapError(error =>
                   Error.EDecodeParseError(error)
                 )
            )
         |> resolve
       );
  };
