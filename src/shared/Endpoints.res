@scope(("window", "app")) @val external backend: string = "backend"

module Articles = {
  let root: (
    ~limit: int=?,
    ~offset: int=?,
    ~tag: string=?,
    ~author: string=?,
    ~favorited: string=?,
    unit,
  ) => string = (~limit=10, ~offset=0, ~tag=?, ~author=?, ~favorited=?, ()) => {
    let limit = limit->Belt.Int.toString
    let offset = offset->Belt.Int.toString
    let tag = tag->Belt.Option.map(tag' => "&tag=" ++ tag')->Belt.Option.getWithDefault("")
    let author =
      author->Belt.Option.map(author' => "&author=" ++ author')->Belt.Option.getWithDefault("")
    let favorited =
      favorited
      ->Belt.Option.map(favorited' => "&favorited=" ++ favorited')
      ->Belt.Option.getWithDefault("")

    `${backend}/api/articles?limit=${limit}&offset=${offset}${tag}${author}${favorited}`
  }

  let article: (~slug: string, unit) => string = (~slug, ()) => `${backend}/api/articles/${slug}`

  let favorite: (~slug: string, unit) => string = (~slug, ()) =>
    `${backend}/api/articles/${slug}/favorite`

  let feed: (~limit: int=?, ~offset: int=?, unit) => string = (~limit=10, ~offset=0, ()) => {
    let limit = limit->Belt.Int.toString
    let offset = offset->Belt.Int.toString

    `${backend}/api/articles/feed?limit=${limit}&offset=${offset}`
  }

  let comments: (~slug: string, unit) => string = (~slug: string, ()) =>
    `${backend}/api/articles/${slug}/comments`

  let comment: (~slug: string, ~id: int, unit) => string = (~slug, ~id, ()) => {
    let id = id->Belt.Int.toString

    `${backend}/api/articles/${slug}/comments/${id}`
  }
}

module Profiles = {
  let profile: (~username: string, unit) => string = (~username, ()) =>
    `${backend}/api/profiles/${username}`

  let follow: (~username: string, unit) => string = (~username, ()) =>
    `${backend}/api/profiles/${username}/follow`
}

module Users = {
  let root = `${backend}/api/users`
  let login = `${backend}/api/users/login`
}

let tags = `${backend}/api/tags`

let user = `${backend}/api/user`
