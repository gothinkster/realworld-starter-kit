import { LoremIpsum } from 'lorem-ipsum'
import {
  ArticleSnapshot,
  PartialArticleSnapshot,
} from '../../../main/articles/articles.models'

export interface ProtocolDriver {
  login(user: Users): Promise<void>
  getCurrentUser(): Promise<Users>

  follow(user: Users): Promise<void>

  unfollow(user: Users): Promise<void>

  publishArticle(searchParams: ArticleDefinition): Promise<void>

  deleteArticle(searchParams: ArticleDefinition): Promise<void>

  unpublishArticle(searchParams: ArticleDefinition): Promise<void>

  findArticle(searchParams: ArticleDefinition): Promise<ArticleSnapshot>

  editArticle(
    searchParams: ArticleDefinition,
    editions: PartialArticleSnapshot,
  ): Promise<ArticleDefinition>

  unfavoriteArticle(searchParams: ArticleDefinition): Promise<void>

  favoriteArticle(searchParams: ArticleDefinition): Promise<void>

  createArticle(article: ArticleSnapshot): Promise<ArticleDefinition>

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
  Me = 'Me',
  Costello = 'Costello',
  Abbott = 'Abbott',
}

export function createCredentials(user: Users) {
  return {
    email: `${user.toLowerCase()}@mail.com`,
    password: 'asdaWAdji!oi8809jk',
  }
}

const lorem = new LoremIpsum()

export function makeRandomArticle(
  article: PartialArticleSnapshot = {},
): Readonly<ArticleSnapshot> {
  return {
    title: article?.title || lorem.generateSentences(1),
    description: article?.description || lorem.generateSentences(2),
    body: article?.body || lorem.generateParagraphs(1),
    tags: article?.tags || lorem.generateWords(4).toLowerCase().split(' '),
  }
}
