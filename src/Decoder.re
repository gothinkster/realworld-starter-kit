let author = (json: Js.Json.t) : Types.author =>
  Json.Decode.{
    username: json |> field("username", string),
    bio: json |> field("bio", optional(string)),
    image: json |> field("image", string),
    following: json |> field("following", boolean) |> Js.to_bool,
  };

let article = (json: Js.Json.t) : Types.article =>
  Json.Decode.{
    slug: json |> field("slug", string),
    title: json |> field("title", string),
    description:
      json
      |> field("description", optional(string))
      |. Belt.Option.getWithDefault(""),
    body: json |> field("body", string),
    tagList: json |> field("tagList", array(string)) |> Belt.List.fromArray,
    createdAt: json |> field("createdAt", date),
    updatedAt: json |> field("updatedAt", date),
    favorited: json |> field("favorited", boolean) |> Js.to_bool,
    favoritesCount: json |> field("favoritesCount", int),
    author: json |> field("author", author),
  };
