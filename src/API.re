open Utils;

let host = "https://conduit.productionready.io";

let optToQueryString = (prefix, opt) =>
  switch (opt) {
  | Some(v) => prefix ++ v
  | None => ""
  };

let getResultIfOk = res => {
  let isOk = res |> Fetch.Response.ok;
  Js.Promise.(
    res
    |> Fetch.Response.json
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
    Fetch.fetchWithInit(
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
    Fetch.fetchWithInit(
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
    Fetch.fetchWithInit(
      host ++ "/api/tags",
      Fetch.RequestInit.make(~credentials=Include, ()),
    )
    |> then_(getResultIfOk)
  );

let profiles = (~author) =>
  Js.Promise.(
    Fetch.fetchWithInit(
      host ++ "/api/profiles/" ++ author,
      Fetch.RequestInit.make(
        ~headers=getAuthorizationHeader() |> Fetch.HeadersInit.make,
        ~credentials=Include,
        (),
      ),
    )
    |> then_(getResultIfOk)
  );

let followUser = username =>
  Js.Promise.(
    Fetch.fetchWithInit(
      host ++ "/api/profiles/" ++ username ++ "/follow",
      Fetch.RequestInit.make(
        ~method_=Post,
        ~headers=getAuthorizationHeader() |> Fetch.HeadersInit.make,
        ~credentials=Include,
        (),
      ),
    )
    |> then_(getResultIfOk)
  );

let unfollowUser = username =>
  Js.Promise.(
    Fetch.fetchWithInit(
      host ++ "/api/profiles/" ++ username ++ "/follow",
      Fetch.RequestInit.make(
        ~method_=Delete,
        ~headers=getAuthorizationHeader() |> Fetch.HeadersInit.make,
        ~credentials=Include,
        (),
      ),
    )
    |> then_(getResultIfOk)
  );

let getArticle = (~slug) =>
  Js.Promise.(
    Fetch.fetchWithInit(
      host ++ "/api/articles/" ++ slug,
      Fetch.RequestInit.make(~credentials=Include, ()),
    )
    |> then_(getResultIfOk)
  );

let deleteArticle = slug =>
  Js.Promise.(
    Fetch.fetchWithInit(
      host ++ "/api/articles/" ++ slug,
      Fetch.RequestInit.make(
        ~method_=Delete,
        ~credentials=Include,
        ~headers=getAuthorizationHeader() |> Fetch.HeadersInit.make,
        (),
      ),
    )
    |> then_(getResultIfOk)
  );

let comments = (~slug) =>
  Js.Promise.(
    Fetch.fetchWithInit(
      host ++ "/api/articles/" ++ slug ++ "/comments",
      Fetch.RequestInit.make(~credentials=Include, ()),
    )
    |> then_(getResultIfOk)
  );

let addCommentsToAnArticle = (~slug, ~body) =>
  Js.Promise.(
    Fetch.fetchWithInit(
      host ++ "/api/articles/" ++ slug ++ "/comments",
      Fetch.RequestInit.make(
        ~method_=Post,
        ~credentials=Include,
        ~headers=
          Js.Obj.assign(getJsonContentType(), getAuthorizationHeader())
          |> Fetch.HeadersInit.make,
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
    |> then_(getResultIfOk)
  );

let deleteComment = (~slug, ~id) =>
  Js.Promise.(
    Fetch.fetchWithInit(
      host ++ "/api/articles/" ++ slug ++ "/comments/" ++ string_of_int(id),
      Fetch.RequestInit.make(
        ~method_=Delete,
        ~credentials=Include,
        ~headers=getAuthorizationHeader() |> Fetch.HeadersInit.make,
        (),
      ),
    )
    |> then_(getResultIfOk)
  );

let user = () =>
  Js.Promise.(
    Fetch.fetchWithInit(
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

let updateUser = (~email, ~username, ~password, ~image, ~bio) =>
  Js.Promise.(
    Fetch.fetchWithInit(
      host ++ "/api/user",
      Fetch.RequestInit.make(
        ~method_=Put,
        ~headers=
          Js.Obj.assign(getJsonContentType(), getAuthorizationHeader())
          |> Fetch.HeadersInit.make,
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
        ~credentials=Include,
        (),
      ),
    )
    |> then_(getResultIfOk)
  );

let register = (~email, ~password, ~username) =>
  Js.Promise.(
    Fetch.fetchWithInit(
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
    Fetch.fetchWithInit(
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
    Fetch.fetchWithInit(
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

let updateArticle = (~slug, ~title, ~description, ~body, ~tagList) => {
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
  Js.Promise.(
    Fetch.fetchWithInit(
      host ++ "/api/articles/" ++ slug,
      Fetch.RequestInit.make(
        ~method_=Put,
        ~headers=
          Js.Obj.assign(getJsonContentType(), getAuthorizationHeader())
          |> Fetch.HeadersInit.make,
        ~body=
          Fetch.BodyInit.make(
            Json.Encode.([("article", article)] |> object_) |> Json.stringify,
          ),
        ~credentials=Include,
        (),
      ),
    )
    |> then_(getResultIfOk)
  );
};
