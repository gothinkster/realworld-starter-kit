@bs.scope(("window", "app")) @bs.val external backend: string = "backend"

module Articles = {
  let root: (
    ~limit: int=?,
    ~offset: int=?,
    ~tag: string=?,
    ~author: string=?,
    ~favorited: string=?,
    unit,
  ) => string = (~limit=10, ~offset=0, ~tag=?, ~author=?, ~favorited=?, ()) =>
    Printf.sprintf(
      "%s/api/articles?limit=%d&offset=%d%s%s%s",
      backend,
      limit,
      offset,
      tag |> Option.map(tag' => "&tag=" ++ tag') |> Option.getOrElse(""),
      author |> Option.map(author' => "&author=" ++ author') |> Option.getOrElse(""),
      favorited |> Option.map(favorited' => "&favorited=" ++ favorited') |> Option.getOrElse(""),
    )

  let article: (~slug: string, unit) => string = (~slug, ()) =>
    Printf.sprintf("%s/api/articles/%s", backend, slug)

  let favorite: (~slug: string, unit) => string = (~slug, ()) =>
    Printf.sprintf("%s/api/articles/%s/favorite", backend, slug)

  let feed: (~limit: int=?, ~offset: int=?, unit) => string = (~limit=10, ~offset=0, ()) =>
    Printf.sprintf("%s/api/articles/feed?limit=%d&offset=%d", backend, limit, offset)

  let comments: (~slug: string, unit) => string = (~slug: string, ()) =>
    Printf.sprintf("%s/api/articles/%s/comments", backend, slug)

  let comment: (~slug: string, ~id: int, unit) => string = (~slug, ~id, ()) =>
    Printf.sprintf("%s/api/articles/%s/comments/%d", backend, slug, id)
}

module Profiles = {
  let profile: (~username: string, unit) => string = (~username, ()) =>
    Printf.sprintf("%s/api/profiles/%s", backend, username)

  let follow: (~username: string, unit) => string = (~username, ()) =>
    Printf.sprintf("%s/api/profiles/%s/follow", backend, username)
}

module Users = {
  let root = Printf.sprintf("%s/api/users", backend)
  let login = Printf.sprintf("%s/api/users/login", backend)
}

let tags = Printf.sprintf("%s/api/tags", backend)

let user = Printf.sprintf("%s/api/user", backend)
