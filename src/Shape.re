module Decode = Decode.AsResult.OfParseError;

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

  let decode = (json: Js.Json.t): Belt.Result.t(t, Decode.ParseError.failure) =>
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

  let decode = (json: Js.Json.t): Belt.Result.t(t, Decode.ParseError.failure) =>
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
};

module Articles = {
  type t = {
    articles: array(Article.t),
    articlesCount: int,
  };

  let make = (articles, articlesCount) => {articles, articlesCount};

  let empty = make([||], 0);

  let decode = (json: Js.Json.t): Belt.Result.t(t, Decode.ParseError.failure) =>
    Decode.Pipeline.(
      succeed(make)
      |> field("articles", array(Article.decode))
      |> field("articlesCount", intFromNumber)
      |> run(json)
    );
};

module Tags = {
  type t = array(string);

  let empty = [||];

  let decode = (json: Js.Json.t): Belt.Result.t(t, Decode.ParseError.failure) =>
    Decode.(field("tags", array(string), json));
};

module User = {
  type t = {
    id: int,
    email: string,
    createdAt: Js.Date.t,
    updatedAt: Js.Date.t,
    username: string,
    bio: string,
    image: string,
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

  let empty = (0, "", Js.Date.make(), Js.Date.make(), "", "", "", "");

  let decodeUser =
      (json: Js.Json.t): Belt.Result.t(t, Decode.ParseError.failure) =>
    Decode.Pipeline.(
      succeed(make)
      |> field("id", intFromNumber)
      |> field("email", string)
      |> field("createdAt", date)
      |> field("updatedAt", date)
      |> field("username", string)
      |> field("bio", string)
      |> field("image", string)
      |> field("token", string)
      |> run(json)
    );

  let decode = (json: Js.Json.t): Belt.Result.t(t, Decode.ParseError.failure) =>
    Decode.field("user", decodeUser, json);
};
