[@react.component]
let make = () => {
  let route = Route.useRoute();
  let currentUser = Hook.useCurrentUser();

  <>
    <Header />
    {switch (route) {
     | Settings => <Settings />
     | Login => <Login />
     | Register => <Register />
     | CreateArticle => <Editor />
     | EditArticle(slug) => <Editor slug />
     | Article(slug) => <Article slug />
     | Profile(username) => <Profile viewMode={Profile.Author(username)} />
     | Favorited(username) => <Profile viewMode={Profile.Favorited(username)} />
     | Home => <Home currentUser />
     }}
    <Footer />
  </>;
};
