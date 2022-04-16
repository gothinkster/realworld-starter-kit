import { Author } from '../cms/cms.models'
import { ArticleNotFound } from './views.exceptions'
import { ViewsPersistence } from './views.persistence'
import { ReadonlyArticle } from './views.models'

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
