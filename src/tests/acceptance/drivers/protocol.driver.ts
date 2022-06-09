import { Article, ArticleFields } from '../../../main/domain/articles/models'

export interface ProtocolDriver {
  login(username: string): Promise<void>
  follow(username: string): Promise<void>
  unfollow(username: string): Promise<void>
  publishArticle(slug: string): Promise<void>
  deleteArticle(slug: string): Promise<void>
  unpublishArticle(slug: string): Promise<void>
  editArticle(slug: string, editions: ArticleFields): Promise<string>
  writeArticle(article: Article): Promise<string>
  commentOnArticle(slug: string, comment: string): Promise<void>
  shouldFindArticleBy(filters: ArticleSearch, slug: string): Promise<void>
  shouldNotFindArticleBy(filters: ArticleSearch, slug: string): Promise<void>
  shouldFindTheArticle(slug: string): Promise<void>
  shouldNotFindTheArticle(slug: string): Promise<void>
  shouldSeeTheArticleInTheFeed(slug: string): Promise<void>
  shouldNotSeeTheArticleInTheFeed(slug: string): Promise<void>
  shouldSeeCommentFrom(slug: string, username: string): Promise<void>
}

export interface ArticleSearch {
  tags?: string[]
  author?: string
}
