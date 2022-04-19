import { CMSPersistence } from './cms/cms.persistence'
import { ContentManagementSystem } from './cms/cms.service'
import { Author } from './views/views.models'
import { ViewsPersistence } from './views/views.persistence'
import { ArticleViews } from './views/views.service'

export class ArticlesService {
  constructor(
    private viewPersistence: ViewsPersistence,
    private cmsPersistence: CMSPersistence,
  ) {}

  getCMS(author: Author): ContentManagementSystem {
    return new ContentManagementSystem(this.cmsPersistence, author)
  }

  getViews(author?: Author): ArticleViews {
    return new ArticleViews(this.viewPersistence, author)
  }
}
