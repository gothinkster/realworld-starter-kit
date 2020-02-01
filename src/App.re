module AsyncData = Relude.AsyncData;

[@react.component]
let make = () => {
  let currentUser = Hook.useCurrentUser();
  let route = Route.useRoute();

  <>
    <Header currentUser />
    {switch (route) {
     | Settings => <Settings />
     | Login => <Login />
     | Register => <Register />
     | CreateArticle => <Editor />
     | EditArticle(slug) => <Editor slug />
     | Article(slug) => <Article slug />
     | Profile(username) => <Profile viewMode={Profile.Author(username)} />
     | Favorited(username) =>
       <Profile viewMode={Profile.Favorited(username)} />
     | Home => <Home currentUser />
     }}
    <Footer />
  </>;
};
