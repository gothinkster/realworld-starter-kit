import { ContentManagementSystem } from './cms/cms.service'
import { CMSPersistence } from './cms/cms.persistence'
import { ArticleViews } from './views/views.service'
import { Author } from './views/views.models'

export class ArticlesService {
  constructor(private persistence: CMSPersistence) {}

  getCMS(author: Author): ContentManagementSystem {
    return new ContentManagementSystem(this.persistence, author)
  }

  getViews(author?: Author): ArticleViews {
    return new ArticleViews(this.persistence, author)
  }
}
