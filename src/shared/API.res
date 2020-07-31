open Js.Promise
open Fetch
open Relude.Globals

module Decode = Decode.AsResult.OfParseError

module Action = {
  type article =
    | Create(Shape.Article.t)
    | Read(string)
    | Update(string, Shape.Article.t)
    | Delete(string)

  type follow =
    | Follow(string)
    | Unfollow(string)

  type favorite =
    | Favorite(string)
    | Unfavorite(string)
}

module Headers = {
  let addJwtToken: unit => array<(string, string)> = () =>
    Utils.getCookie("jwtToken")
    |> Option.flatMap(snd)
    |> Option.map(token => [("Authorization", Printf.sprintf("Token %s", token))])
    |> Option.getOrElse([])

  let addContentTypeAsJson: unit => array<(string, string)> = () => [
    ("Content-Type", "application/json; charset=UTF-8"),
  ]
}

let getErrorBodyJson: Result.t<Js.Json.t, Fetch.Response.t> => Js.Promise.t<
  Result.t<Js.Json.t, Error.t>,
> = x =>
  switch x {
  | Ok(_json) as ok => ok |> resolve
  | Error(resp) =>
    resp
    |> Response.json
    |> then_(json =>
      Error.fetch((resp |> Fetch.Response.status, resp |> Fetch.Response.statusText, #json(json)))
      |> Result.error
      |> resolve
    )
  }

let getErrorBodyText: Result.t<Js.Json.t, Fetch.Response.t> => Js.Promise.t<
  Result.t<Js.Json.t, Error.t>,
> = x =>
  switch x {
  | Ok(_json) as ok => ok |> resolve
  | Error(resp) =>
    resp
    |> Response.text
    |> then_(body =>
      Error.fetch((resp |> Fetch.Response.status, resp |> Fetch.Response.statusText, #text(body)))
      |> Result.error
      |> resolve
    )
  }

let parseJsonIfOk: Fetch.Response.t => Js.Promise.t<Result.t<Js.Json.t, Fetch.Response.t>> = resp =>
  if Fetch.Response.ok(resp) {
    resp
    |> Response.json
    |> then_(json => json |> Result.ok |> resolve)
    |> catch(_error => resp |> Result.error |> resolve)
  } else {
    resp |> Result.error |> resolve
  }

let article: (~action: Action.article, unit) => Js.Promise.t<Result.t<Shape.Article.t, Error.t>> = (
  ~action,
  (),
) => {
  let body = switch action {
  | Create(article) | Update(_, article) =>
    let article =
      list{
        ("title", Js.Json.string(article.title)),
        ("description", Js.Json.string(article.description)),
        ("body", Js.Json.string(article.body)),
        ("tagList", Js.Json.stringArray(article.tagList)),
      }
      |> Js.Dict.fromList
      |> Js.Json.object_

    list{("article", article)}
    |> Js.Dict.fromList
    |> Js.Json.object_
    |> Js.Json.stringify
    |> Fetch.BodyInit.make
    |> Option.some
  | Read(_) | Delete(_) => Option.none
  }

  let method__ = switch action {
  | Create(_) => Post
  | Read(_) => Get
  | Update(_) => Put
  | Delete(_) => Delete
  }

  let headers = switch action {
  | Create(_) | Update(_) => [Headers.addContentTypeAsJson()]
  | Read(_) | Delete(_) => []
  }
  |> Array.append(Headers.addJwtToken())
  |> Array.flatten
  |> HeadersInit.makeWithArray

  let slug = switch action {
  | Create(_) => ""
  | Read(slug) | Update(slug, _) | Delete(slug) => slug
  }

  Endpoints.Articles.article(~slug, ())
  |> fetchWithInit(_, RequestInit.make(~method_=method__, ~headers, ~body?, ()))
  |> then_(parseJsonIfOk)
  |> then_(getErrorBodyJson)
  |> then_(result =>
    result
    |> Result.flatMap(json => json |> Shape.Article.decode |> Result.mapError(Error.decode))
    |> resolve
  )
}

let favoriteArticle: (
  ~action: Action.favorite,
  unit,
) => Js.Promise.t<Result.t<Shape.Article.t, Error.t>> = (~action, ()) => {
  let requestInit = RequestInit.make(
    ~method_=switch action {
    | Favorite(_slug) => Post
    | Unfavorite(_slug) => Delete
    },
    ~headers=[Headers.addJwtToken()] |> Array.flatten |> HeadersInit.makeWithArray,
    (),
  )

  Endpoints.Articles.favorite(
    ~slug=switch action {
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
    |> Result.flatMap(json => json |> Shape.Article.decode |> Result.mapError(Error.decode))
    |> resolve
  )
}

let listArticles: (
  ~limit: int=?,
  ~offset: int=?,
  ~tag: string=?,
  ~author: string=?,
  ~favorited: string=?,
  unit,
) => Js.Promise.t<Result.t<Shape.Articles.t, Error.t>> = (
  ~limit=10,
  ~offset=0,
  ~tag=?,
  ~author=?,
  ~favorited=?,
  (),
) => {
  let requestInit = RequestInit.make(
    ~headers=[Headers.addJwtToken()] |> Array.flatten |> HeadersInit.makeWithArray,
    (),
  )

  Endpoints.Articles.root(~limit, ~offset, ~tag?, ~author?, ~favorited?, ())
  |> fetchWithInit(_, requestInit)
  |> then_(parseJsonIfOk)
  |> then_(getErrorBodyText)
  |> then_(result =>
    result
    |> Result.flatMap(json => json |> Shape.Articles.decode |> Result.mapError(Error.decode))
    |> resolve
  )
}

let feedArticles: (
  ~limit: int=?,
  ~offset: int=?,
  unit,
) => Js.Promise.t<Result.t<Shape.Articles.t, Error.t>> = (~limit=10, ~offset=0, ()) => {
  let requestInit = RequestInit.make(
    ~headers=[Headers.addJwtToken()] |> Array.flatten |> HeadersInit.makeWithArray,
    (),
  )

  Endpoints.Articles.feed(~limit, ~offset, ())
  |> fetchWithInit(_, requestInit)
  |> then_(parseJsonIfOk)
  |> then_(getErrorBodyText)
  |> then_(result =>
    result
    |> Result.flatMap(json => json |> Shape.Articles.decode |> Result.mapError(Error.decode))
    |> resolve
  )
}

let tags: unit => Js.Promise.t<Result.t<Shape.Tags.t, Error.t>> = () =>
  Endpoints.tags
  |> fetch
  |> then_(parseJsonIfOk)
  |> then_(getErrorBodyText)
  |> then_(result =>
    result
    |> Result.flatMap(json => json |> Shape.Tags.decode |> Result.mapError(Error.decode))
    |> resolve
  )

let currentUser: unit => Js.Promise.t<Result.t<Shape.User.t, Error.t>> = () => {
  let requestInit = RequestInit.make(
    ~headers=[Headers.addJwtToken()] |> Array.flatten |> HeadersInit.makeWithArray,
    (),
  )

  Endpoints.user
  |> fetchWithInit(_, requestInit)
  |> then_(parseJsonIfOk)
  |> then_(getErrorBodyText)
  |> then_(result =>
    result
    |> Result.flatMap(json => json |> Shape.User.decode |> Result.mapError(Error.decode))
    |> resolve
  )
}

let updateUser: (
  ~user: Shape.User.t,
  ~password: string,
  unit,
) => Js.Promise.t<Result.t<Shape.User.t, Error.t>> = (~user, ~password, ()) => {
  let user = list{
    list{("email", Js.Json.string(user.email))},
    list{("bio", Js.Json.string(user.bio |> Option.getOrElse("")))},
    list{("image", Js.Json.string(user.image |> Option.getOrElse("")))},
    list{("username", Js.Json.string(user.username))},
    if password == "" {
      list{}
    } else {
      list{("password", Js.Json.string(password))}
    },
  }
  |> List.flatten
  |> Js.Dict.fromList
  |> Js.Json.object_
  let body =
    list{("user", user)}
    |> Js.Dict.fromList
    |> Js.Json.object_
    |> Js.Json.stringify
    |> Fetch.BodyInit.make

  let requestInit = RequestInit.make(
    ~method_=Put,
    ~headers=[Headers.addJwtToken(), Headers.addContentTypeAsJson()]
    |> Array.flatten
    |> HeadersInit.makeWithArray,
    ~body,
    (),
  )

  Endpoints.user
  |> fetchWithInit(_, requestInit)
  |> then_(parseJsonIfOk)
  |> then_(getErrorBodyJson)
  |> then_(result =>
    result
    |> Result.flatMap(json => json |> Shape.User.decode |> Result.mapError(Error.decode))
    |> resolve
  )
}

let followUser: (
  ~action: Action.follow,
  unit,
) => Js.Promise.t<Result.t<Shape.Author.t, Error.t>> = (~action, ()) => {
  let requestInit = RequestInit.make(
    ~method_=switch action {
    | Follow(_username) => Post
    | Unfollow(_username) => Delete
    },
    ~headers=[Headers.addJwtToken()] |> Array.flatten |> HeadersInit.makeWithArray,
    (),
  )

  Endpoints.Profiles.follow(
    ~username=switch action {
    | Follow(username) | Unfollow(username) => username
    },
    (),
  )
  |> fetchWithInit(_, requestInit)
  |> then_(parseJsonIfOk)
  |> then_(getErrorBodyText)
  |> then_(result => result |> Result.flatMap(json =>
      json
      |> {
        open Shape.Decode
        field("profile", Shape.Author.decode)
      }
      |> Result.mapError(Error.decode)
    ) |> resolve)
}

let getComments: (
  ~slug: string,
  unit,
) => Js.Promise.t<Result.t<array<Shape.Comment.t>, Error.t>> = (~slug, ()) => {
  let requestInit = RequestInit.make(
    ~headers=[Headers.addJwtToken()] |> Array.flatten |> HeadersInit.makeWithArray,
    (),
  )

  Endpoints.Articles.comments(~slug, ())
  |> fetchWithInit(_, requestInit)
  |> then_(parseJsonIfOk)
  |> then_(getErrorBodyText)
  |> then_(result =>
    result
    |> Result.flatMap(json => json |> Shape.Comment.decode |> Result.mapError(Error.decode))
    |> resolve
  )
}

let deleteComment: (
  ~slug: string,
  ~id: int,
  unit,
) => Js.Promise.t<Result.t<(string, int), Error.t>> = (~slug, ~id, ()) => {
  let requestInit = RequestInit.make(
    ~method_=Delete,
    ~headers=[Headers.addJwtToken()] |> Array.flatten |> HeadersInit.makeWithArray,
    (),
  )

  Endpoints.Articles.comment(~slug, ~id, ())
  |> fetchWithInit(_, requestInit)
  |> then_(parseJsonIfOk)
  |> then_(getErrorBodyText)
  |> then_(result => result |> Result.flatMap(_json => Result.ok((slug, id))) |> resolve)
}

let addComment: (
  ~slug: string,
  ~body: string,
  unit,
) => Js.Promise.t<Result.t<Shape.Comment.t, Error.t>> = (~slug, ~body, ()) => {
  let comment = list{("body", Js.Json.string(body))} |> Js.Dict.fromList |> Js.Json.object_

  let body =
    list{("comment", comment)}
    |> Js.Dict.fromList
    |> Js.Json.object_
    |> Js.Json.stringify
    |> Fetch.BodyInit.make

  let requestInit = RequestInit.make(
    ~method_=Post,
    ~headers=[Headers.addJwtToken(), Headers.addContentTypeAsJson()]
    |> Array.flatten
    |> HeadersInit.makeWithArray,
    ~body,
    (),
  )

  Endpoints.Articles.comments(~slug, ())
  |> fetchWithInit(_, requestInit)
  |> then_(parseJsonIfOk)
  |> then_(getErrorBodyText)
  |> then_(result =>
    result
    |> Result.flatMap(json =>
      json |> Decode.field("comment", Shape.Comment.decodeComment) |> Result.mapError(Error.decode)
    )
    |> resolve
  )
}

let getProfile: (~username: string, unit) => Js.Promise.t<Result.t<Shape.Author.t, Error.t>> = (
  ~username,
  (),
) => {
  let requestInit = RequestInit.make(
    ~headers=[Headers.addJwtToken()] |> Array.flatten |> HeadersInit.makeWithArray,
    (),
  )

  Endpoints.Profiles.profile(~username, ())
  |> fetchWithInit(_, requestInit)
  |> then_(parseJsonIfOk)
  |> then_(getErrorBodyText)
  |> then_(result =>
    result
    |> Result.flatMap(json =>
      json |> Decode.field("profile", Shape.Author.decode) |> Result.mapError(Error.decode)
    )
    |> resolve
  )
}

let login: (
  ~email: string,
  ~password: string,
  unit,
) => Js.Promise.t<Result.t<Shape.User.t, Error.t>> = (~email, ~password, ()) => {
  let user =
    list{("email", Js.Json.string(email)), ("password", Js.Json.string(password))}
    |> Js.Dict.fromList
    |> Js.Json.object_

  let body =
    list{("user", user)}
    |> Js.Dict.fromList
    |> Js.Json.object_
    |> Js.Json.stringify
    |> Fetch.BodyInit.make

  let requestInit = RequestInit.make(
    ~method_=Post,
    ~headers=[Headers.addContentTypeAsJson()] |> Array.flatten |> HeadersInit.makeWithArray,
    ~body,
    (),
  )

  Endpoints.Users.login
  |> fetchWithInit(_, requestInit)
  |> then_(parseJsonIfOk)
  |> then_(getErrorBodyJson)
  |> then_(result =>
    result
    |> Result.flatMap(json => json |> Shape.User.decode |> Result.mapError(Error.decode))
    |> resolve
  )
}

let register: (
  ~username: string,
  ~email: string,
  ~password: string,
  unit,
) => Js.Promise.t<Result.t<Shape.User.t, Error.t>> = (~username, ~email, ~password, ()) => {
  let user =
    list{
      ("email", Js.Json.string(email)),
      ("password", Js.Json.string(password)),
      ("username", Js.Json.string(username)),
    }
    |> Js.Dict.fromList
    |> Js.Json.object_

  let body =
    list{("user", user)}
    |> Js.Dict.fromList
    |> Js.Json.object_
    |> Js.Json.stringify
    |> Fetch.BodyInit.make

  let requestInit = RequestInit.make(
    ~method_=Post,
    ~headers=[Headers.addContentTypeAsJson()] |> Array.flatten |> HeadersInit.makeWithArray,
    ~body,
    (),
  )

  Endpoints.Users.root
  |> fetchWithInit(_, requestInit)
  |> then_(parseJsonIfOk)
  |> then_(getErrorBodyJson)
  |> then_(result =>
    result
    |> Result.flatMap(json => json |> Shape.User.decode |> Result.mapError(Error.decode))
    |> resolve
  )
}
