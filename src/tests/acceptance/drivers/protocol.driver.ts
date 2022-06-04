import {
  ArticleSnapshot,
  PartialArticleSnapshot,
} from '../../../main/articles/articles.models'

export interface ProtocolDriver {
  login(username: string): Promise<void>

  follow(username: string): Promise<void>

  unfollow(username: string): Promise<void>

  publishArticle(slug: string): Promise<void>

  deleteArticle(slug: string): Promise<void>

  unpublishArticle(slug: string): Promise<void>

  getArticle(slug: string): Promise<ArticleSnapshot>

  shouldFindArticleBy(filters: ArticleSearch, slug: string): Promise<void>

  shouldNotFindArticleBy(filters: ArticleSearch, slug: string): Promise<void>

  editArticle(slug: string, editions: PartialArticleSnapshot): Promise<string>

  writeArticle(article: ArticleSnapshot): Promise<string>

  commentOnArticle(slug: string, comment: string): Promise<void>
}

export interface ArticleSearch {
  tags?: string[]
  author?: string
}
