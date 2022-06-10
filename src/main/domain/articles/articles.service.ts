import { Repository } from 'typeorm'
import { ArticleEntity } from '../../persistence/article.entity'
import { Account } from '../authors/models'
import { AuthorsService } from '../authors/service'
import { ContentManagementSystem } from './cms.service'
import { ArticleView } from './views.service'

export class ArticlesService {
  constructor(
    private repository: Repository<ArticleEntity>,
    private authorsService?: AuthorsService,
  ) {}

  getCMS(author: Account): ContentManagementSystem {
    return new ContentManagementSystem(author)
  }

  getView(author?: Account): ArticleView {
    return new ArticleView(this.repository, author, this.authorsService)
  }
}
