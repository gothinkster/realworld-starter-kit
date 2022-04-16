import { EditableArticle, Author } from './cms.models'
import { CMSPersistence } from './cms.persistence'
import { UserNotAllowedToChangeArticle } from './cms.exceptions'
import { ArticleNotFound } from '../views/views.exceptions'

/**
The ContentManagementSystem is responsible for letting only the authors
 change the content.
**/
export class ContentManagementSystem {
  constructor(private persistence: CMSPersistence, private user: Author) {}

  async getArticle(slug: string): Promise<EditableArticle> {
    const article = await this.persistence.getArticle(slug)
    if (!article) {
      throw new ArticleNotFound(slug)
    }
    if (article.getAuthorID() !== this.user.getAuthorID()) {
      throw new UserNotAllowedToChangeArticle(this.user, article)
    }
    return article
  }

  createNewEditor = () => this.persistence.createNewEditor(this.user)
}
