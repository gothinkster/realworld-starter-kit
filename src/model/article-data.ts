export interface AuthorData {
  imageUrl: string;
  username: string;
}

export interface ArticleData {
  author: AuthorData;
  tagList: string[];
  title: string;
  description: string;
  createdAt: string;
  favoritesCount: number;
  slug: string;
}

export interface CommentData {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: AuthorData;
}
