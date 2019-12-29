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

  let decode = json =>
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

  let decode = json =>
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

module ArticleApiResponse = {
  type t = {
    articles: array(Article.t),
    articlesCount: int,
  };

  let make = (articles, articlesCount) => {articles, articlesCount};

  let decode = json =>
    Decode.Pipeline.(
      succeed(make)
      |> field("articles", array(Article.decode))
      |> field("articlesCount", intFromNumber)
      |> run(json)
    );
};
