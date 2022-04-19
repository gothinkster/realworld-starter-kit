import { ArticleNotFound } from './views.exceptions'
import { Author, ReadonlyArticle } from './views.models'
import { ViewsPersistence } from './views.persistence'

export class ArticleViews {
  constructor(private persistence: ViewsPersistence, private user?: Author) {}

  async getArticle(slug: string): Promise<ReadonlyArticle> {
    const article = await this.persistence.getArticle(slug)
    if (
      !article ||
      (!article.isPublished() &&
        (!this.user || this.user.getAuthorID() !== article.getAuthorID()))
    ) {
      throw new ArticleNotFound(slug)
    }
    return article
  }
}
