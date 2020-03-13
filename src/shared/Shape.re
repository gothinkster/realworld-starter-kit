open Relude.Globals;

module Decode = Decode.AsResult.OfParseError;

module Profile = {
  type username = string;
  type limit = int;
  type offset = int;
  type viewMode =
    | Author(username, limit, offset)
    | Favorited(username, limit, offset);
};

module FeedType = {
  type tag = string;
  type limit = int;
  type offset = int;
  type t =
    | Tag(tag, limit, offset)
    | Global(limit, offset)
    | Personal(limit, offset);
};

module Author = {
  type t = {
    username: string,
    bio: option(string),
    image: string,
    following: bool,
  };

  let make = (username, bio, image, following) => {
    username,
    bio,
    image,
    following,
  };

  let empty = make("", None, "", false);

  let decode = (json: Js.Json.t): Result.t(t, Decode.ParseError.failure) =>
    Decode.Pipeline.(
      succeed(make)
      |> field("username", string)
      |> optionalField("bio", string)
      |> field("image", string)
      |> field("following", boolean)
      |> run(json)
    );
};

module Article = {
  type t = {
    slug: string,
    title: string,
    description: string,
    body: string,
    tagList: array(string),
    createdAt: Js.Date.t,
    updatedAt: Js.Date.t,
    favorited: bool,
    favoritesCount: int,
    author: Author.t,
  };

  let make =
      (
        slug,
        title,
        description,
        body,
        tagList,
        createdAt,
        updatedAt,
        favorited,
        favoritesCount,
        author,
      ) => {
    slug,
    title,
    description,
    body,
    tagList,
    createdAt,
    updatedAt,
    favorited,
    favoritesCount,
    author,
  };

  let empty =
    make(
      "",
      "",
      "",
      "",
      [||],
      Js.Date.make(),
      Js.Date.make(),
      false,
      0,
      Author.empty,
    );

  let decodeArticle =
      (json: Js.Json.t): Result.t(t, Decode.ParseError.failure) =>
    Decode.Pipeline.(
      succeed(make)
      |> field("slug", string)
      |> field("title", string)
      |> field("description", string)
      |> field("body", string)
      |> field("tagList", array(string))
      |> field("createdAt", date)
      |> field("updatedAt", date)
      |> field("favorited", boolean)
      |> field("favoritesCount", intFromNumber)
      |> field("author", Author.decode)
      |> run(json)
    );

  let decode = (json: Js.Json.t): Result.t(t, Decode.ParseError.failure) =>
    Decode.(field("article", decodeArticle, json));
};

module Articles = {
  type t = {
    articles: array(Article.t),
    articlesCount: int,
  };

  let make = (articles, articlesCount) => {articles, articlesCount};

  let empty = make([||], 0);

  let decode = (json: Js.Json.t): Result.t(t, Decode.ParseError.failure) =>
    Decode.Pipeline.(
      succeed(make)
      |> field("articles", array(Article.decodeArticle))
      |> field("articlesCount", intFromNumber)
      |> run(json)
    );
};

module Tags = {
  type t = array(string);

  let empty: array(string) = [||];

  let decode = (json: Js.Json.t): Result.t(t, Decode.ParseError.failure) =>
    Decode.(field("tags", array(string), json));
};

module User = {
  type t = {
    id: int,
    email: string,
    createdAt: Js.Date.t,
    updatedAt: Js.Date.t,
    username: string,
    bio: option(string),
    image: option(string),
    token: string,
  };

  let make = (id, email, createdAt, updatedAt, username, bio, image, token) => {
    id,
    email,
    createdAt,
    updatedAt,
    username,
    bio,
    image,
    token,
  };

  let empty = make(0, "", Js.Date.make(), Js.Date.make(), "", None, None, "");

  let decodeUser = (json: Js.Json.t): Result.t(t, Decode.ParseError.failure) =>
    Decode.Pipeline.(
      succeed(make)
      |> field("id", intFromNumber)
      |> field("email", string)
      |> field("createdAt", date)
      |> field("updatedAt", date)
      |> field("username", string)
      |> optionalField("bio", string)
      |> optionalField("image", string)
      |> field("token", string)
      |> run(json)
    );

  let decode = (json: Js.Json.t): Result.t(t, Decode.ParseError.failure) =>
    Decode.field("user", decodeUser, json);
};

module CommentUser = {
  type t = {
    username: string,
    bio: option(string),
    image: string,
    following: bool,
  };

  let make = (username, bio, image, following) => {
    username,
    bio,
    image,
    following,
  };

  let empty = make("", None, "", false);

  let decode = (json: Js.Json.t): Result.t(t, Decode.ParseError.failure) =>
    Decode.Pipeline.(
      succeed(make)
      |> field("username", string)
      |> optionalField("bio", string)
      |> field("image", string)
      |> field("following", boolean)
      |> run(json)
    );
};

module Comment = {
  type t = {
    id: int,
    createdAt: Js.Date.t,
    updatedAt: Js.Date.t,
    body: string,
    author: CommentUser.t,
  };

  let make = (id, createdAt, updatedAt, body, author) => {
    id,
    createdAt,
    updatedAt,
    body,
    author,
  };

  let empty = make(0, Js.Date.make(), Js.Date.make(), "", CommentUser.empty);

  let decodeComment =
      (json: Js.Json.t): Result.t(t, Decode.ParseError.failure) =>
    Decode.Pipeline.(
      succeed(make)
      |> field("id", intFromNumber)
      |> field("createdAt", date)
      |> field("updatedAt", date)
      |> field("body", string)
      |> field("author", CommentUser.decode)
      |> run(json)
    );

  let decode =
      (json: Js.Json.t): Result.t(array(t), Decode.ParseError.failure) =>
    Decode.field("comments", Decode.Pipeline.array(decodeComment), json);
};

module Settings = {
  type t = {
    email: option(array(string)),
    bio: option(array(string)),
    image: option(array(string)),
    username: option(array(string)),
    password: option(array(string)),
  };

  let make = (email, bio, image, username, password) => {
    email,
    bio,
    image,
    username,
    password,
  };

  let empty = make(None, None, None, None, None);

  let decode = (json: Js.Json.t): Result.t(t, Decode.ParseError.failure) =>
    Decode.Pipeline.(
      succeed(make)
      |> optionalField("email", array(string))
      |> optionalField("bio", array(string))
      |> optionalField("image", array(string))
      |> optionalField("username", array(string))
      |> optionalField("password", array(string))
      |> run(json)
    );
};

module Editor = {
  type t = {
    title: option(array(string)),
    body: option(array(string)),
    description: option(array(string)),
  };

  let make = (title, body, description) => {title, body, description};

  let empty = make(None, None, None);

  let decode = (json: Js.Json.t): Result.t(t, Decode.ParseError.failure) =>
    Decode.Pipeline.(
      succeed(make)
      |> optionalField("title", array(string))
      |> optionalField("body", array(string))
      |> optionalField("description", array(string))
      |> run(json)
    );
};

module Login = {
  type t = option(array(string));

  let make = id;

  let empty = make(None);

  let decode = (json: Js.Json.t): Result.t(t, Decode.ParseError.failure) =>
    Decode.Pipeline.(
      succeed(make)
      |> optionalField("email or password", array(string))
      |> run(json)
    );
};

module Register = {
  type t = {
    email: option(array(string)),
    password: option(array(string)),
    username: option(array(string)),
  };

  let make = (email, password, username) => {email, password, username};

  let empty = make(None, None, None);

  let decode = (json: Js.Json.t): Result.t(t, Decode.ParseError.failure) =>
    Decode.Pipeline.(
      succeed(make)
      |> optionalField("email", array(string))
      |> optionalField("password", array(string))
      |> optionalField("username", array(string))
      |> run(json)
    );
};
