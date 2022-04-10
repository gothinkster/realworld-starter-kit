import { PartialType } from '@nestjs/mapped-types'

export interface ProtocolDriver {
  init(): Promise<void>
  stop(): Promise<void>

  loginAs(user: Users)
  getCurrentUser(): Users

  makeLoggedInUserFollow(user: Users): void

  makeLoggedInUserUnfollow(user: Users): void

  publishArticle(searchParams: ArticleDefinition): void

  deleteArticle(searchParams: ArticleDefinition): void

  unpublishArticle(searchParams: ArticleDefinition): void

  editArticle(
    searchParams: ArticleDefinition,
    editions: PartialType<Article>,
  ): void

  unfavoriteArticle(searchParams: ArticleDefinition): void

  favoriteArticle(searchParams: ArticleDefinition): void

  createArticle(article: Article): ArticleDefinition

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
