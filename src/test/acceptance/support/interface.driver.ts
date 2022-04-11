export interface ProtocolDriver {
  init(): Promise<void>
  stop(): Promise<void>

  loginAs(user: Users)
  getCurrentUser(): Promise<Users>

  follow(user: Users)

  unfollow(user: Users)

  publishArticle(searchParams: ArticleDefinition)

  deleteArticle(searchParams: ArticleDefinition)

  unpublishArticle(searchParams: ArticleDefinition)

  editArticle(searchParams: ArticleDefinition, editions: ArticleEditions)

  unfavoriteArticle(searchParams: ArticleDefinition)

  favoriteArticle(searchParams: ArticleDefinition)

  createArticle(article: Article): Promise<ArticleDefinition>

  commentOnArticle(article: ArticleDefinition, comment: string)
}

export interface ArticleProps {
  tags?: string[]
  author?: Users
}

export interface ArticleDefinition {
  slug: string
  author: Users
}

export enum Users {
  Me = 'Amy-Adams',
  Costello = 'Costello',
  Abbott = 'Abbott',
}

export interface Article {
  title: string
  description: string
  body: string
  tags: string[]
}

export interface ArticleEditions {
  title?: string
  description?: string
  body?: string
  tags?: string[]
}

export const exampleArticle: Readonly<Article> = {
  title: 'How to train your dragon',
  description: 'Ever wonder how?',
  body: 'You have to believe',
  tags: ['reactjs', 'angularjs', 'dragons'],
}

export const exampleNewArticle: Readonly<Article> = {
  title: 'Lord of the Rings',
  description: 'What does Gandalf says?',
  body: 'You shall not pass',
  tags: ['magic', 'culture', 'dragons'],
}
