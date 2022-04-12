import { LoremIpsum } from 'lorem-ipsum'

export interface ProtocolDriver {
  init(): Promise<void>
  stop(): Promise<void>

  loginAs(user: Users): Promise<void>
  getCurrentUser(): Promise<Users>

  follow(user: Users): Promise<void>

  unfollow(user: Users): Promise<void>

  publishArticle(searchParams: ArticleDefinition): Promise<void>

  deleteArticle(searchParams: ArticleDefinition): Promise<void>

  unpublishArticle(searchParams: ArticleDefinition): Promise<void>

  editArticle(
    searchParams: ArticleDefinition,
    editions: ArticleEditions,
  ): Promise<ArticleDefinition>

  unfavoriteArticle(searchParams: ArticleDefinition): Promise<void>

  favoriteArticle(searchParams: ArticleDefinition): Promise<void>

  createArticle(article: ArticleCreation): Promise<ArticleDefinition>

  commentOnArticle(article: ArticleDefinition, comment: string): Promise<void>
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
  Me = 'AmyAdams',
  Costello = 'Costello',
  Abbott = 'Abbott',
}

export interface ArticleCreation {
  title: string
  description: string
  body: string
  tagList: string[]
}

export interface ArticleEditions {
  title?: string
  description?: string
  body?: string
  tagList?: string[]
}

const lorem = new LoremIpsum()

export function makeRandomArticle(
  article: ArticleEditions = {},
): Readonly<ArticleCreation> {
  return {
    title: article?.title || lorem.generateSentences(1),
    description: article?.description || lorem.generateSentences(2),
    body: article?.body || lorem.generateParagraphs(1),
    tagList:
      article?.tagList || lorem.generateWords(4).toLowerCase().split(' '),
  }
}
