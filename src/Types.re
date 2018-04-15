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

type user = {
  email: string,
  token: string,
  username: string,
  bio: option(string),
  image: option(string),
};

type remoteArticles = RemoteData.t(list(article), string);

type remoteComments = RemoteData.t(list(comment), string);

type remoteArticle = RemoteData.t(article, string);

type remoteProfile = RemoteData.t(profile, string);

type remoteUser = RemoteData.t(user, string);

type remoteTags = RemoteData.t(list(string), string);

type articleByAuthor =
  | Author(string)
  | Favorited(string);
