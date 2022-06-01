import { Repository } from 'typeorm'
import { ProfilesService } from '../profiles/profiles.service'
import { Author } from './articles.models'
import { ContentManagementSystem } from './cms/cms.service'
import { ArticleEntity } from './persistence/article.entity'
import { ArticleViews } from './views/views.service'

export class ArticlesService {
  constructor(
    private repository: Repository<ArticleEntity>,
    private profiles?: ProfilesService,
  ) {}

  getCMS(author: Author): ContentManagementSystem {
    return new ContentManagementSystem(this.repository, author, this.profiles)
  }

  getViews(author?: Author): ArticleViews {
    return new ArticleViews(this.repository, author, this.profiles)
  }
}
