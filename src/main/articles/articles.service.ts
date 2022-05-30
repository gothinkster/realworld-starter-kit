import { Author } from './articles.models'
import { CMSPersistence } from './cms/cms.persistence'
import { ContentManagementSystem } from './cms/cms.service'
import { ArticleViews } from './views/views.service'

export class ArticlesService {
  constructor(private persistence: CMSPersistence) {}

  getCMS(author: Author): ContentManagementSystem {
    return new ContentManagementSystem(this.persistence, author)
  }

  getViews(author?: Author): ArticleViews {
    return new ArticleViews(this.persistence, author)
  }
}
