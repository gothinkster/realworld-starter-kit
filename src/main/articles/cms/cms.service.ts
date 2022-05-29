import { ArticleSnapshot, Author } from '../articles.models'
import { ArticleNotFound } from '../views/views.exceptions'
import { UserNotAllowedToChangeArticle } from './cms.exceptions'
import { EditableArticle } from './cms.models'
import { CMSPersistence } from './cms.persistence'

/**
The ContentManagementSystem is responsible for letting only the authors
 change the content.
**/
export class ContentManagementSystem {
  constructor(private persistence: CMSPersistence, private author: Author) {}

  async getArticle(slug: string): Promise<EditableArticle> {
    const article = await this.persistence.getArticle(slug)
    if (!article) {
      throw new ArticleNotFound(slug)
    }
    if (article.getAuthorID() !== this.author.getAuthorID()) {
      throw new UserNotAllowedToChangeArticle(this.author, article)
    }
    return article
  }

  async createFromSnapshot(
    snapshot: ArticleSnapshot,
    publish: boolean = false,
  ): Promise<EditableArticle> {
    const article = this.persistence.createArticle(this.author)
    article.loadSnapshot(snapshot)
    if (publish) {
      article.publish()
    }
    await article.save()
    return article
  }
}
