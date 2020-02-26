open Relude.Globals;

let authenticated:
  (Shape.User.t => React.element, option(Shape.User.t)) => React.element =
  (getPage, user) =>
    user
    |> Option.map(getPage)
    |> Option.getOrElseLazy(() => {
         Link.home |> Link.push;
         React.null;
       });

[@react.component]
let make = () => {
  let currentUser = Hook.useCurrentUser();
  let route = Route.useRoute();

  switch (currentUser) {
  | Init
  | Loading => React.null
  | Reloading(user)
  | Complete(user) =>
    <>
      <Header user />
      {switch (route) {
       | Settings => authenticated(user => <Settings user />, user)
       | Login => <Login />
       | Register => <Register />
       | CreateArticle => <Editor />
       | EditArticle(slug) => <Editor slug />
       | Article(slug) => <Article slug user />
       | Profile(username) =>
         <Profile viewMode={Shape.Profile.Author(username, 10, 0)} user />
       | Favorited(username) =>
         <Profile viewMode={Shape.Profile.Favorited(username, 10, 0)} user />
       | Home => <Home user />
       }}
      <Footer />
    </>
  };
};
