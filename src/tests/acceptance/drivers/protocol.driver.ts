import {
  ArticleSnapshot,
  PartialArticleSnapshot,
} from '../../../main/articles/articles.models'

export interface ProtocolDriver {
  login(user: User): Promise<void>

  follow(user: User): Promise<void>

  unfollow(user: User): Promise<void>

  publishArticle(slug: string): Promise<void>

  deleteArticle(slug: string): Promise<void>

  unpublishArticle(slug: string): Promise<void>

  getArticle(slug: string): Promise<ArticleSnapshot>

  findArticles(filters: ArticleSearch): Promise<ArticleSnapshot[]>

  editArticle(slug: string, editions: PartialArticleSnapshot): Promise<string>

  writeArticle(article: ArticleSnapshot): Promise<string>

  commentOnArticle(slug: string, comment: string): Promise<void>
}

export interface User {
  name: string
}

export interface ArticleSearch {
  tags?: string[]
  author?: User | { user: User }
}

export interface ArticleContext {
  slug?: string
  author?: User
}
