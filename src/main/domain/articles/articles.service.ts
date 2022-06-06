import { Repository } from 'typeorm'
import { ArticleEntity } from '../../persistence/article.entity'
import { ProfilesService } from '../profiles/service'
import { ContentManagementSystem } from './cms.service'
import { Author } from './models'
import { ArticleViews } from './views.service'

export class ArticlesService {
  constructor(
    private repository: Repository<ArticleEntity>,
    private profiles?: ProfilesService,
  ) {}

  getCMS(author: Author): ContentManagementSystem {
    return new ContentManagementSystem(author)
  }

  getViews(author?: Author): ArticleViews {
    return new ArticleViews(this.repository, author, this.profiles)
  }
}
