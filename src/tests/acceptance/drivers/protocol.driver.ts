import { LoremIpsum } from 'lorem-ipsum'
import {
  ArticleSnapshot,
  PartialArticleSnapshot,
} from '../../../main/articles/articles.models'

export interface ProtocolDriver {
  login(user: User): void
  getCurrentUser(): Promise<User>

  follow(user: User): Promise<void>

  unfollow(user: User): Promise<void>

  publishArticle(slug: string): Promise<void>

  deleteArticle(slug: string): Promise<void>

  unpublishArticle(slug: string): Promise<void>

  getArticle(slug: string): Promise<ArticleSnapshot>

  findArticles(filters: ArticleSearch): Promise<ArticleSnapshot[]>

  editArticle(slug: string, editions: PartialArticleSnapshot): Promise<string>

  unfavoriteArticle(slug: string): Promise<void>

  favoriteArticle(slug: string): Promise<void>

  createArticle(article: ArticleSnapshot): Promise<string>

  commentOnArticle(slug: string, comment: string): Promise<void>
}

export interface ArticleSearch {
  tags?: string[]
  author?: User | { user: User }
}

export interface ArticleContext {
  slug?: string
  author?: User
}

export interface User {
  name: string
}

export function createCredentials(username: string) {
  return {
    email: `${username.toLowerCase()}@mail.com`,
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
    tags: [
      ...new Set(
        article?.tags || lorem.generateWords(4).toLowerCase().split(' '),
      ),
    ].sort(),
  }
}
