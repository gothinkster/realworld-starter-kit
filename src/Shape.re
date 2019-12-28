type author = {
  username: string,
  bio: string,
  image: string,
  following: bool,
};

type article = {
  slug: string,
  title: string,
  description: string,
  body: string,
  tagList: array(string),
  createdAt: string,
  updatedAt: string,
  favorited: bool,
  favoritesCount: int,
  author,
};

type articlesResponse = {
  articles: array(article),
  articlesCount: int,
};
