module User = {
  type t = {
    bio: option(string),
    createdAt: Js.Date.t,
    email: string,
    id: int,
    image: option(string),
    token: string,
    updatedAt: Js.Date.t,
    username: string,
  };
};

type author = {
  username: string,
  bio: option(string),
  image: string,
  following: bool,
};

type article = {
  slug: string,
  title: string,
  description: string,
  body: string,
  tagList: list(string),
  createdAt: Js.Date.t,
  updatedAt: Js.Date.t,
  favorited: bool,
  favoritesCount: int,
  author,
};

type profile = {
  username: string,
  bio: option(string),
  image: string,
  following: bool,
};

type comment = {
  id: int,
  createdAt: Js.Date.t,
  updatedAt: Js.Date.t,
  body: string,
  author,
};

type remoteArticles = RemoteData.t(list(article), list(article), string);

type remoteComments = RemoteData.t(list(comment), unit, string);

type remoteArticle = RemoteData.t(article, unit, string);

type remoteProfile = RemoteData.t(profile, unit, string);

type remoteUser = RemoteData.t(User.t, unit, string);

type remoteTags = RemoteData.t(list(string), unit, string);

type remoteAction = RemoteData.t(string, unit, string);

type articleByAuthor =
  | Author(string)
  | Favorited(string);

type route =
  | Home
  | Login
  | Register
  | Settings
  | Editor(option(string))
  | Article(string)
  | Profile(articleByAuthor);
