type whose =
  | Author(string)
  | FavoritedBy(string);

type routes =
  | Home
  | Login
  | Register
  | CreateArticle
  | EditArticle(string)
  | Article(string)
  | Profile(whose)
  | Settings;

let useRoute = () => {
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
