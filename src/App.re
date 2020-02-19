module AsyncData = Relude.AsyncData;

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
       | Settings => <Settings />
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
