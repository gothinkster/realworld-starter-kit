type t';

type whose =
  | Author(string)
  | FavoritedBy(string);

type t =
  | Home
  | Login
  | Register
  | CreateArticle
  | EditArticle(string)
  | Article(string)
  | Profile(whose)
  | Settings;

external make: string => t' = "%identity";
external toString: t' => string = "%identity";

let home = make("/");
let settings = make("/#/settings");
let register = make("/#/register");
let login = make("/#/login");
let createArticle = make("/#/editor");
let editArticle = (~slug) => make(Printf.sprintf("/#/editor/%s", slug));
let article = (~slug) => make(Printf.sprintf("/#/article/%s", slug));
let viewProfile = (~username) =>
  make(Printf.sprintf("/#/profile/%s", username));
let viewFavorites = (~username) =>
  make(Printf.sprintf("/#/profile/%s/favorites", username));

let useRoute: unit => t =
  () => {
    let url = ReasonReactRouter.useUrl();
    let hash = url.hash |> Js.String.split("/");

    switch (hash) {
    | [|"", "settings"|] => Settings
    | [|"", "login"|] => Login
    | [|"", "register"|] => Register
    | [|"", "editor"|] => CreateArticle
    | [|"", "editor", slug|] => EditArticle(slug)
    | [|"", "article", slug|] => Article(slug)
    | [|"", "profile", user|] => Profile(Author(user))
    | [|"", "profile", user, "favorites"|] => Profile(FavoritedBy(user))
    | _ => Home
    };
  };
