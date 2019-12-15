type whom =
  | Author(string)
  | FavoritedBy(string);

type routes =
  | Home
  | Login
  | Register
  | Editor(option(string))
  | Article(string)
  | Profile(whom)
  | Settings;

let useRoute = () => {
  let url = ReasonReactRouter.useUrl();
  let hash = url.hash |> Js.String.split("/");

  switch (hash) {
  | [|"", "settings"|] => Settings
  | [|"", "login"|] => Login
  | [|"", "register"|] => Register
  | [|"", "editor"|] => Editor(None)
  | [|"", "editor", slug|] => Editor(Some(slug))
  | [|"", "article", slug|] => Article(slug)
  | [|"", "profile", user|] => Profile(Author(user))
  | [|"", "profile", user, "favorites"|] => Profile(FavoritedBy(user))
  | _ => Home
  };
};

[@react.component]
let make = () => {
  let route = useRoute();

  <>
    <Header />
    {switch (route) {
     | Settings => <Settings />
     | Login => <Login />
     | Register => <Register />
     | Editor(_slug) => <CreateOrEditArticle />
     | Article(_slug) => <Article />
     | Profile(_whom) => <Profile />
     | Home => <Home />
     }}
    <Footer />
  </>;
};
