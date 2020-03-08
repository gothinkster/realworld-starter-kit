open Js.Promise;
open Relude.Globals;
open Fetch;

module Decode = Decode.AsResult.OfParseError;

type articleAction =
  | Create(Shape.Article.t)
  | Read(string)
  | Update(string, Shape.Article.t)
  | Delete(string);

type followAction =
  | Follow(string)
  | Unfollow(string);

type favoriteAction =
  | Favorite(string)
  | Unfavorite(string);

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
      |> then_(json => json |> Relude.Result.ok |> resolve)
      |> catch(_error => resp |> Result.error |> resolve);
    } else {
      resp |> Result.error |> resolve;
    };

let article:
  (~action: articleAction, unit) =>
  Js.Promise.t(Relude.Result.t(Shape.Article.t, Error.t)) =
  (~action, ()) => {
    let body =
      switch (action) {
      | Create(article)
      | Update(_, article) =>
        let article =
          [
            [("title", Js.Json.string(article.title))],
            [("description", Js.Json.string(article.description))],
            [("body", Js.Json.string(article.body))],
            [("tagList", Js.Json.stringArray(article.tagList))],
          ]
          |> List.flatten
          |> Js.Dict.fromList
          |> Js.Json.object_;

        [("article", article)]
        |> Js.Dict.fromList
        |> Js.Json.object_
        |> Js.Json.stringify
        |> Fetch.BodyInit.make
        |> Option.some;
      | Read(_)
      | Delete(_) => Option.none
      };

    let requestInit =
      RequestInit.make(
        ~method_=
          switch (action) {
          | Create(_) => Post
          | Read(_) => Get
          | Update(_) => Put
          | Delete(_) => Delete
          },
        ~headers=
          {
            switch (action) {
            | Create(_)
            | Update(_) => [|getJwtTokenHeader(), getContentTypeJsonHeader()|]
            | Read(_)
            | Delete(_) => [|getJwtTokenHeader()|]
            };
          }
          |> Array.flatten
          |> HeadersInit.makeWithArray,
        ~body?,
        (),
      );

    Endpoints.Articles.article(
      ~slug=
        switch (action) {
        | Create(_) => ""
        | Read(slug)
        | Update(slug, _)
        | Delete(slug) => slug
        },
      (),
    )
    |> fetchWithInit(_, requestInit)
    |> then_(parseJsonIfOk)
    |> then_(getErrorBodyJson)
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

    Endpoints.Articles.favorite(
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

  Endpoints.Articles.root(~limit, ~offset, ~tag?, ~author?, ~favorited?, ())
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

  Endpoints.Articles.feed(~limit, ~offset, ())
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

  Endpoints.user
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
      [("image", Js.Json.string(user.image |> Option.getOrElse("")))],
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

  Endpoints.user
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

  Endpoints.Profiles.follow(
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

    Endpoints.Articles.comments(~slug, ())
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

  Endpoints.Articles.comment(~slug, ~id, ())
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
  let comment =
    [("body", Js.Json.string(body))] |> Js.Dict.fromList |> Js.Json.object_;
  let body =
    [("comment", comment)]
    |> Js.Dict.fromList
    |> Js.Json.object_
    |> Js.Json.stringify
    |> Fetch.BodyInit.make;

  let requestInit =
    RequestInit.make(
      ~method_=Post,
      ~headers=
        [|getJwtTokenHeader(), getContentTypeJsonHeader()|]
        |> Relude.Array.flatten
        |> HeadersInit.makeWithArray,
      ~body,
      (),
    );

  Endpoints.Articles.comments(~slug, ())
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

    Endpoints.Profiles.profile(~username, ())
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

let login = (~email: string, ~password: string, ()) => {
  let user =
    [
      ("email", Js.Json.string(email)),
      ("password", Js.Json.string(password)),
    ]
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
      ~method_=Post,
      ~headers=
        [|getContentTypeJsonHeader()|]
        |> Relude.Array.flatten
        |> HeadersInit.makeWithArray,
      ~body,
      (),
    );

  Endpoints.Users.login
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

let register = (~username: string, ~email: string, ~password: string, ()) => {
  let user =
    [
      ("email", Js.Json.string(email)),
      ("password", Js.Json.string(password)),
      ("username", Js.Json.string(username)),
    ]
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
      ~method_=Post,
      ~headers=
        [|getContentTypeJsonHeader()|]
        |> Relude.Array.flatten
        |> HeadersInit.makeWithArray,
      ~body,
      (),
    );

  Endpoints.Users.root
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
