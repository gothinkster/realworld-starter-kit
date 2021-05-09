module Option = Belt.Option
module Result = Belt.Result
module Json = Js.Json
module Dict = Js.Dict

type decodeError = string

module Profile = {
  type username = string
  type limit = int
  type offset = int
  type viewMode =
    | Author(username, limit, offset)
    | Favorited(username, limit, offset)
}

module FeedType = {
  type tag = string
  type limit = int
  type offset = int
  type t =
    | Tag(tag, limit, offset)
    | Global(limit, offset)
    | Personal(limit, offset)
}

module Author = {
  type t = {
    username: string,
    bio: option<string>,
    image: string,
    following: bool,
  }

  let decode = (json: Json.t): Result.t<t, decodeError> => {
    try {
      let obj = json->Json.decodeObject->Option.getExn
      let username = obj->Dict.get("username")->Option.flatMap(Json.decodeString)->Option.getExn
      let bio = obj->Dict.get("bio")->Option.flatMap(Json.decodeString)
      let image = obj->Dict.get("image")->Option.flatMap(Json.decodeString)->Option.getExn
      let following = obj->Dict.get("following")->Option.flatMap(Json.decodeBoolean)->Option.getExn

      Result.Ok({
        username: username,
        bio: bio,
        image: image,
        following: following,
      })
    } catch {
    | _ => Error("Shape.Author: failed to decode json")
    }
  }
}

module Article = {
  type t = {
    slug: string,
    title: string,
    description: string,
    body: string,
    tagList: array<string>,
    createdAt: Js.Date.t,
    updatedAt: Js.Date.t,
    favorited: bool,
    favoritesCount: int,
    author: Author.t,
  }

  let decode = (json: Json.t): Result.t<t, decodeError> => {
    try {
      let obj = json->Json.decodeObject->Option.getExn
      let slug = obj->Dict.get("slug")->Option.flatMap(Json.decodeString)->Option.getExn
      let title = obj->Dict.get("title")->Option.flatMap(Json.decodeString)->Option.getExn
      let description =
        obj->Dict.get("description")->Option.flatMap(Json.decodeString)->Option.getExn
      let body = obj->Dict.get("body")->Option.flatMap(Json.decodeString)->Option.getExn
      let tagList =
        obj
        ->Dict.get("tagList")
        ->Option.flatMap(Json.decodeArray)
        ->Option.flatMap(tagList => Some(tagList->Belt.Array.keepMap(Json.decodeString)))
        ->Option.getExn
      let createdAt =
        obj
        ->Dict.get("createdAt")
        ->Option.flatMap(Json.decodeString)
        ->Option.getExn
        ->Js.Date.fromString
      let updatedAt =
        obj
        ->Dict.get("updatedAt")
        ->Option.flatMap(Json.decodeString)
        ->Option.getExn
        ->Js.Date.fromString
      let favorited = obj->Dict.get("favorited")->Option.flatMap(Json.decodeBoolean)->Option.getExn
      let favoritesCount =
        obj
        ->Dict.get("favoritesCount")
        ->Option.flatMap(Json.decodeNumber)
        ->Option.getExn
        ->int_of_float
      let author =
        obj
        ->Dict.get("author")
        ->Option.flatMap(author => {
          switch author->Author.decode {
          | Ok(ok) => Some(ok)
          | Error(_err) => None
          }
        })
        ->Option.getExn

      Result.Ok({
        slug: slug,
        title: title,
        description: description,
        body: body,
        tagList: tagList,
        createdAt: createdAt,
        updatedAt: updatedAt,
        favorited: favorited,
        favoritesCount: favoritesCount,
        author: author,
      })
    } catch {
    | _ => Error("Shape.Article: failed to decode json")
    }
  }
}

module Articles = {
  type t = {
    articles: array<Article.t>,
    articlesCount: int,
  }

  let decode = (json: Json.t): Result.t<t, decodeError> => {
    try {
      let obj = json->Json.decodeObject->Option.getExn
      let articles =
        obj
        ->Dict.get("articles")
        ->Option.flatMap(Json.decodeArray)
        ->Option.flatMap(articles => {
          articles
          ->Belt.Array.keepMap(article =>
            switch article->Article.decode {
            | Ok(ok) => Some(ok)
            | Error(_err) => None
            }
          )
          ->Some
        })
        ->Option.getExn
      let articlesCount =
        obj
        ->Dict.get("articlesCount")
        ->Option.flatMap(Json.decodeNumber)
        ->Option.map(int_of_float)
        ->Option.getExn

      Result.Ok({
        articles: articles,
        articlesCount: articlesCount,
      })
    } catch {
    | _ => Error("Shape.Article: failed to decode json")
    }
  }
}

module Tags = {
  type t = array<string>

  let decode = (json: Json.t): Result.t<t, decodeError> => {
    try {
      let obj = json->Json.decodeObject->Option.getExn
      let tags =
        obj
        ->Dict.get("tags")
        ->Option.flatMap(Json.decodeArray)
        ->Option.map(tags => tags->Belt.Array.keepMap(Json.decodeString))
        ->Option.getExn

      Result.Ok(tags)
    } catch {
    | _ => Error("Shape.Tags: failed to decode json")
    }
  }
}

module User = {
  type t = {
    id: int,
    email: string,
    createdAt: Js.Date.t,
    updatedAt: Js.Date.t,
    username: string,
    bio: option<string>,
    image: option<string>,
    token: string,
  }

  let empty = {
    id: 0,
    email: "",
    createdAt: Js.Date.make(),
    updatedAt: Js.Date.make(),
    username: "",
    bio: None,
    image: None,
    token: "",
  }

  let decodeUser = (json: Json.t): Result.t<t, decodeError> => {
    try {
      let obj = json->Json.decodeObject->Option.getExn
      let id =
        obj
        ->Dict.get("id")
        ->Option.flatMap(Json.decodeNumber)
        ->Option.map(int_of_float)
        ->Option.getExn
      let email = obj->Dict.get("email")->Option.flatMap(Json.decodeString)->Option.getExn
      let createdAt =
        obj
        ->Dict.get("createdAt")
        ->Option.flatMap(Json.decodeString)
        ->Option.map(Js.Date.fromString)
        ->Option.getExn
      let updatedAt =
        obj
        ->Dict.get("updatedAt")
        ->Option.flatMap(Json.decodeString)
        ->Option.map(Js.Date.fromString)
        ->Option.getExn
      let username = obj->Dict.get("username")->Option.flatMap(Json.decodeString)->Option.getExn
      let bio = obj->Dict.get("bio")->Option.flatMap(Json.decodeString)
      let image = obj->Dict.get("image")->Option.flatMap(Json.decodeString)
      let token = obj->Dict.get("token")->Option.flatMap(Json.decodeString)->Option.getExn

      Result.Ok({
        id: id,
        email: email,
        createdAt: createdAt,
        updatedAt: updatedAt,
        username: username,
        bio: bio,
        image: image,
        token: token,
      })
    } catch {
    | _ => Error("Shape.User: failed to decode json")
    }
  }

  let decode = (json: Json.t): Result.t<t, decodeError> => {
    try {
      let obj = json->Json.decodeObject->Option.getExn
      let user =
        obj
        ->Dict.get("user")
        ->Option.flatMap(user => {
          switch user->decodeUser {
          | Ok(ok) => Some(ok)
          | Error(_err) => None
          }
        })
        ->Option.getExn

      Result.Ok(user)
    } catch {
    | _ => Error("Shape.User: failed to decode json")
    }
  }
}

module CommentUser = {
  type t = {
    username: string,
    bio: option<string>,
    image: string,
    following: bool,
  }

  let decode = (json: Json.t): Result.t<t, decodeError> => {
    try {
      let obj = json->Json.decodeObject->Option.getExn
      let username = obj->Dict.get("username")->Option.flatMap(Json.decodeString)->Option.getExn
      let bio = obj->Dict.get("bio")->Option.flatMap(Json.decodeString)
      let image = obj->Dict.get("image")->Option.flatMap(Json.decodeString)->Option.getExn
      let following = obj->Dict.get("following")->Option.flatMap(Json.decodeBoolean)->Option.getExn

      Result.Ok({
        username: username,
        bio: bio,
        image: image,
        following: following,
      })
    } catch {
    | _ => Error("Shape.CommentUser: failed to decode json")
    }
  }
}

module Comment = {
  type t = {
    id: int,
    createdAt: Js.Date.t,
    updatedAt: Js.Date.t,
    body: string,
    author: CommentUser.t,
  }

  let decodeComment = (json: Json.t): Result.t<t, decodeError> => {
    try {
      let obj = json->Json.decodeObject->Option.getExn
      let id =
        obj
        ->Dict.get("id")
        ->Option.flatMap(Json.decodeNumber)
        ->Option.map(int_of_float)
        ->Option.getExn
      let createdAt =
        obj
        ->Dict.get("createdAt")
        ->Option.flatMap(Json.decodeString)
        ->Option.map(Js.Date.fromString)
        ->Option.getExn
      let updatedAt =
        obj
        ->Dict.get("updatedAt")
        ->Option.flatMap(Json.decodeString)
        ->Option.map(Js.Date.fromString)
        ->Option.getExn
      let body = obj->Dict.get("body")->Option.flatMap(Json.decodeString)->Option.getExn
      let author =
        obj
        ->Dict.get("author")
        ->Option.flatMap(author => {
          switch author->CommentUser.decode {
          | Ok(ok) => Some(ok)
          | Error(_err) => None
          }
        })
        ->Option.getExn

      Result.Ok({
        id: id,
        createdAt: createdAt,
        updatedAt: updatedAt,
        body: body,
        author: author,
      })
    } catch {
    | _ => Error("Shape.Comment: failed to decode json")
    }
  }

  let decode = (json: Json.t): Result.t<array<t>, decodeError> => {
    try {
      let obj = json->Json.decodeObject->Option.getExn
      let comments =
        obj
        ->Dict.get("comments")
        ->Option.flatMap(Json.decodeArray)
        ->Option.map(comments => {
          comments->Belt.Array.keepMap(comment => {
            switch comment->decodeComment {
            | Ok(ok) => Some(ok)
            | Error(_err) => None
            }
          })
        })
        ->Option.getExn

      Result.Ok(comments)
    } catch {
    | _ => Error("Shape.Comment: failed to decode json")
    }
  }
}

module Settings = {
  type t = {
    email: option<array<string>>,
    bio: option<array<string>>,
    image: option<array<string>>,
    username: option<array<string>>,
    password: option<array<string>>,
  }

  let decode = (json: Json.t): Result.t<t, decodeError> => {
    try {
      let obj = json->Json.decodeObject->Option.getExn
      let email = obj->Dict.get("email")->Utils.Json.decodeArrayString
      let bio = obj->Dict.get("bio")->Utils.Json.decodeArrayString
      let image = obj->Dict.get("image")->Utils.Json.decodeArrayString
      let username = obj->Dict.get("username")->Utils.Json.decodeArrayString
      let password = obj->Dict.get("password")->Utils.Json.decodeArrayString

      Result.Ok({
        email: email,
        bio: bio,
        image: image,
        username: username,
        password: password,
      })
    } catch {
    | _ => Error("Shape.Settings: failed to decode json")
    }
  }
}

module Editor = {
  type t = {
    title: option<array<string>>,
    body: option<array<string>>,
    description: option<array<string>>,
  }

  let decode = (json: Json.t): Result.t<t, decodeError> => {
    try {
      let obj = json->Json.decodeObject->Option.getExn
      let title = obj->Dict.get("title")->Utils.Json.decodeArrayString
      let body = obj->Dict.get("body")->Utils.Json.decodeArrayString
      let description = obj->Dict.get("description")->Utils.Json.decodeArrayString

      Result.Ok({
        title: title,
        body: body,
        description: description,
      })
    } catch {
    | _ => Error("Shape.Editor: failed to decode json")
    }
  }
}

module Login = {
  type t = option<array<string>>

  let decode = (json: Json.t): Result.t<t, decodeError> => {
    json->Json.decodeArray->Option.map(xs => xs->Belt.Array.keepMap(Json.decodeString))->Ok
  }
}

module Register = {
  type t = {
    email: option<array<string>>,
    password: option<array<string>>,
    username: option<array<string>>,
  }

  let decode = (json: Json.t): Result.t<t, decodeError> => {
    try {
      let obj = json->Json.decodeObject->Option.getExn
      let email = obj->Dict.get("email")->Utils.Json.decodeArrayString
      let username = obj->Dict.get("username")->Utils.Json.decodeArrayString
      let password = obj->Dict.get("password")->Utils.Json.decodeArrayString

      Result.Ok({
        email: email,
        password: password,
        username: username,
      })
    } catch {
    | _ => Error("Shape.Register: failed to decode json")
    }
  }
}
