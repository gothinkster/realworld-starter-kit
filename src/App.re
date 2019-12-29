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
     | Profile(whose) => <Profile whose />
     | Home => <Home currentUser />
     }}
    <Footer />
  </>;
};
