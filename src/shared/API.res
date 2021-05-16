open Promise
open Fetch

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
    ->Belt.Option.flatMap(snd)
    ->Belt.Option.map(token => [("Authorization", `Token ${token}`)])
    ->Belt.Option.getWithDefault([])

  let addContentTypeAsJson: unit => array<(string, string)> = () => [
    ("Content-Type", "application/json; charset=UTF-8"),
  ]
}

let getErrorBodyJson: result<Js.Json.t, Response.t> => Promise.t<
  result<Js.Json.t, AppError.t>,
> = x =>
  switch x {
  | Ok(_json) as ok => ok |> resolve
  | Error(resp) =>
    resp
    ->Response.json
    ->then(json => {
      let status = Response.status(resp)
      let statusText = Response.statusText(resp)
      let bodyJson = #json(json)

      AppError.fetch((status, statusText, bodyJson))->Belt.Result.Error->resolve
    })
  }

let getErrorBodyText: result<Js.Json.t, Response.t> => Promise.t<
  result<Js.Json.t, AppError.t>,
> = x =>
  switch x {
  | Ok(_json) as ok => ok |> resolve
  | Error(resp) =>
    let status = Response.status(resp)
    let statusText = Response.statusText(resp)
    let bodyText = #text("FIXME: show body text instead")

    AppError.fetch((status, statusText, bodyText))->Belt.Result.Error->resolve
  }

let parseJsonIfOk: Response.t => Promise.t<result<Js.Json.t, Response.t>> = resp =>
  if Response.ok(resp) {
    resp
    ->Response.json
    ->then(json => json->Ok->resolve)
    ->catch(_error => resp->Belt.Result.Error->resolve)
  } else {
    resp->Belt.Result.Error->resolve
  }

let article: (~action: Action.article, unit) => Promise.t<result<Shape.Article.t, AppError.t>> = (
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
    ->Js.Dict.fromList
    ->Js.Json.object_
    ->Js.Json.stringify
    ->BodyInit.make
    ->Some
  | Read(_) | Delete(_) => None
  }

  let method__ = switch action {
  | Create(_) => Post
  | Read(_) => Get
  | Update(_) => Put
  | Delete(_) => Delete
  }

  let headers =
    switch action {
    | Create(_) | Update(_) => Headers.addContentTypeAsJson()
    | Read(_) | Delete(_) => []
    }
    ->Belt.Array.concat(Headers.addJwtToken())
    ->HeadersInit.makeWithArray

  let slug = switch action {
  | Create(_) => ""
  | Read(slug) | Update(slug, _) | Delete(slug) => slug
  }

  fetchWithInit(
    Endpoints.Articles.article(~slug, ()),
    RequestInit.make(~method_=method__, ~headers, ~body?, ()),
  )
  ->then(parseJsonIfOk)
  ->then(getErrorBodyJson)
  ->then(result => {
    result
    ->Belt.Result.flatMap(json => {
      try {
        json
        ->Js.Json.decodeObject
        ->Belt.Option.getExn
        ->Js.Dict.get("article")
        ->Belt.Option.getExn
        ->Shape.Article.decode
        ->AppError.decode
      } catch {
      | _ => AppError.decode(Error("API.article: failed to decode json"))
      }
    })
    ->resolve
  })
}

let favoriteArticle: (
  ~action: Action.favorite,
  unit,
) => Promise.t<result<Shape.Article.t, AppError.t>> = (~action, ()) => {
  let requestInit = RequestInit.make(
    ~method_=switch action {
    | Favorite(_slug) => Post
    | Unfavorite(_slug) => Delete
    },
    ~headers=Headers.addJwtToken()->HeadersInit.makeWithArray,
    (),
  )

  Endpoints.Articles.favorite(
    ~slug=switch action {
    | Favorite(slug) => slug
    | Unfavorite(slug) => slug
    },
    (),
  )
  ->fetchWithInit(_, requestInit)
  ->then(parseJsonIfOk)
  ->then(getErrorBodyText)
  ->then(result =>
    result
    ->Belt.Result.flatMap(json =>
      try {
        json
        ->Js.Json.decodeObject
        ->Belt.Option.getExn
        ->Js.Dict.get("article")
        ->Belt.Option.getExn
        ->Shape.Article.decode
        ->AppError.decode
      } catch {
      | _ => AppError.decode(Error("API.favoriteArticle: failed to decode json"))
      }
    )
    ->resolve
  )
}

let listArticles: (
  ~limit: int=?,
  ~offset: int=?,
  ~tag: string=?,
  ~author: string=?,
  ~favorited: string=?,
  unit,
) => Promise.t<result<Shape.Articles.t, AppError.t>> = (
  ~limit=10,
  ~offset=0,
  ~tag=?,
  ~author=?,
  ~favorited=?,
  (),
) => {
  let requestInit = RequestInit.make(~headers=Headers.addJwtToken()->HeadersInit.makeWithArray, ())

  Endpoints.Articles.root(~limit, ~offset, ~tag?, ~author?, ~favorited?, ())
  ->fetchWithInit(_, requestInit)
  ->then(parseJsonIfOk)
  ->then(getErrorBodyText)
  ->then(result =>
    result->Belt.Result.flatMap(json => json->Shape.Articles.decode->AppError.decode)->resolve
  )
}

let feedArticles: (
  ~limit: int=?,
  ~offset: int=?,
  unit,
) => Promise.t<result<Shape.Articles.t, AppError.t>> = (~limit=10, ~offset=0, ()) => {
  let requestInit = RequestInit.make(~headers=Headers.addJwtToken()->HeadersInit.makeWithArray, ())

  Endpoints.Articles.feed(~limit, ~offset, ())
  ->fetchWithInit(_, requestInit)
  ->then(parseJsonIfOk)
  ->then(getErrorBodyText)
  ->then(result =>
    result->Belt.Result.flatMap(json => json->Shape.Articles.decode->AppError.decode)->resolve
  )
}

let tags: unit => Promise.t<result<Shape.Tags.t, AppError.t>> = () =>
  Endpoints.tags
  ->fetch
  ->then(parseJsonIfOk)
  ->then(getErrorBodyText)
  ->then(result =>
    result->Belt.Result.flatMap(json => json->Shape.Tags.decode->AppError.decode)->resolve
  )

let currentUser: unit => Promise.t<result<Shape.User.t, AppError.t>> = () => {
  let requestInit = RequestInit.make(~headers=Headers.addJwtToken()->HeadersInit.makeWithArray, ())

  Endpoints.user
  ->fetchWithInit(_, requestInit)
  ->then(parseJsonIfOk)
  ->then(getErrorBodyText)
  ->then(result =>
    result->Belt.Result.flatMap(json => json->Shape.User.decode->AppError.decode)->resolve
  )
}

let updateUser: (
  ~user: Shape.User.t,
  ~password: string,
  unit,
) => Promise.t<result<Shape.User.t, AppError.t>> = (~user, ~password, ()) => {
  let user =
    list{
      list{("email", Js.Json.string(user.email))},
      list{("bio", Js.Json.string(user.bio->Belt.Option.getWithDefault("")))},
      list{("image", Js.Json.string(user.image->Belt.Option.getWithDefault("")))},
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
    |> BodyInit.make

  let requestInit = RequestInit.make(
    ~method_=Put,
    ~headers=Headers.addJwtToken()
    ->Belt.Array.concat(Headers.addContentTypeAsJson())
    ->HeadersInit.makeWithArray,
    ~body,
    (),
  )

  Endpoints.user
  ->fetchWithInit(_, requestInit)
  ->then(parseJsonIfOk)
  ->then(getErrorBodyJson)
  ->then(result =>
    result->Belt.Result.flatMap(json => json->Shape.User.decode->AppError.decode)->resolve
  )
}

let followUser: (~action: Action.follow, unit) => Promise.t<result<Shape.Author.t, AppError.t>> = (
  ~action,
  (),
) => {
  let requestInit = RequestInit.make(
    ~method_=switch action {
    | Follow(_username) => Post
    | Unfollow(_username) => Delete
    },
    ~headers=Headers.addJwtToken()->HeadersInit.makeWithArray,
    (),
  )

  Endpoints.Profiles.follow(
    ~username=switch action {
    | Follow(username) | Unfollow(username) => username
    },
    (),
  )
  ->fetchWithInit(_, requestInit)
  ->then(parseJsonIfOk)
  ->then(getErrorBodyText)
  ->then(result =>
    result->Belt.Result.flatMap(json => {
      try {
        json
        ->Js.Json.decodeObject
        ->Belt.Option.getExn
        ->Js.Dict.get("profile")
        ->Belt.Option.getExn
        ->Shape.Author.decode
        ->AppError.decode
      } catch {
      | _ => AppError.decode(Belt.Result.Error("API.followUser: failed to decode json"))
      }
    }) |> resolve
  )
}

let getComments: (~slug: string, unit) => Promise.t<result<array<Shape.Comment.t>, AppError.t>> = (
  ~slug,
  (),
) => {
  let requestInit = RequestInit.make(~headers=Headers.addJwtToken()->HeadersInit.makeWithArray, ())

  Endpoints.Articles.comments(~slug, ())
  ->fetchWithInit(_, requestInit)
  ->then(parseJsonIfOk)
  ->then(getErrorBodyText)
  ->then(result =>
    result->Belt.Result.flatMap(json => json->Shape.Comment.decode->AppError.decode)->resolve
  )
}

let deleteComment: (
  ~slug: string,
  ~id: int,
  unit,
) => Promise.t<result<(string, int), AppError.t>> = (~slug, ~id, ()) => {
  let requestInit = RequestInit.make(
    ~method_=Delete,
    ~headers=Headers.addJwtToken()->HeadersInit.makeWithArray,
    (),
  )

  Endpoints.Articles.comment(~slug, ~id, ())
  ->fetchWithInit(_, requestInit)
  ->then(parseJsonIfOk)
  ->then(getErrorBodyText)
  ->then(result => result->Belt.Result.flatMap(_json => Belt.Result.Ok((slug, id)))->resolve)
}

let addComment: (
  ~slug: string,
  ~body: string,
  unit,
) => Promise.t<result<Shape.Comment.t, AppError.t>> = (~slug, ~body, ()) => {
  let comment = list{("body", Js.Json.string(body))} |> Js.Dict.fromList |> Js.Json.object_

  let body =
    list{("comment", comment)}
    |> Js.Dict.fromList
    |> Js.Json.object_
    |> Js.Json.stringify
    |> BodyInit.make

  let requestInit = RequestInit.make(
    ~method_=Post,
    ~headers=Headers.addJwtToken()
    ->Belt.Array.concat(Headers.addContentTypeAsJson())
    ->HeadersInit.makeWithArray,
    ~body,
    (),
  )

  Endpoints.Articles.comments(~slug, ())
  ->fetchWithInit(_, requestInit)
  ->then(parseJsonIfOk)
  ->then(getErrorBodyText)
  ->then(result =>
    result
    ->Belt.Result.flatMap(json => {
      try {
        json
        ->Js.Json.decodeObject
        ->Belt.Option.getExn
        ->Js.Dict.get("comment")
        ->Belt.Option.getExn
        ->Shape.Comment.decodeComment
        ->AppError.decode
      } catch {
      | _ => AppError.decode(Belt.Result.Error("API.addComment: failed to decode json"))
      }
    })
    ->resolve
  )
}

let getProfile: (~username: string, unit) => Promise.t<result<Shape.Author.t, AppError.t>> = (
  ~username,
  (),
) => {
  let requestInit = RequestInit.make(~headers=Headers.addJwtToken()->HeadersInit.makeWithArray, ())

  Endpoints.Profiles.profile(~username, ())
  ->fetchWithInit(_, requestInit)
  ->then(parseJsonIfOk)
  ->then(getErrorBodyText)
  ->then(result =>
    result
    ->Belt.Result.flatMap(json => {
      try {
        json
        ->Js.Json.decodeObject
        ->Belt.Option.getExn
        ->Js.Dict.get("profile")
        ->Belt.Option.getExn
        ->Shape.Author.decode
        ->AppError.decode
      } catch {
      | _ => AppError.decode(Belt.Result.Error("API.getProfile: failed to decode json"))
      }
    })
    ->resolve
  )
}

let login = (~email: string, ~password: string, ()): Promise.t<
  result<Shape.User.t, AppError.t>,
> => {
  let user =
    list{("email", Js.Json.string(email)), ("password", Js.Json.string(password))}
    |> Js.Dict.fromList
    |> Js.Json.object_

  let body =
    list{("user", user)}
    |> Js.Dict.fromList
    |> Js.Json.object_
    |> Js.Json.stringify
    |> BodyInit.make

  let requestInit = RequestInit.make(
    ~method_=Post,
    ~headers=Headers.addContentTypeAsJson()->HeadersInit.makeWithArray,
    ~body,
    (),
  )

  Endpoints.Users.login
  ->fetchWithInit(_, requestInit)
  ->then(parseJsonIfOk)
  ->then(getErrorBodyJson)
  ->then(result =>
    result->Belt.Result.flatMap(json => json->Shape.User.decode->AppError.decode)->resolve
  )
}

let register: (
  ~username: string,
  ~email: string,
  ~password: string,
  unit,
) => Promise.t<result<Shape.User.t, AppError.t>> = (~username, ~email, ~password, ()) => {
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
    |> BodyInit.make

  let requestInit = RequestInit.make(
    ~method_=Post,
    ~headers=Headers.addContentTypeAsJson()->HeadersInit.makeWithArray,
    ~body,
    (),
  )

  Endpoints.Users.root
  ->fetchWithInit(_, requestInit)
  ->then(parseJsonIfOk)
  ->then(getErrorBodyJson)
  ->then(result =>
    result->Belt.Result.flatMap(json => json->Shape.User.decode->AppError.decode)->resolve
  )
}
