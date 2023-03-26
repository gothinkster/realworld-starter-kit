import { Injectable } from '@nestjs/common'
import { Account } from '../authors/models'
import { AuthorsService } from '../authors/service'
import { ContentManagementSystem } from './cms.service'
import { ArticleView } from './views.service'

@Injectable()
export class ArticlesService {
  constructor(private authorsService?: AuthorsService) {}

  getCMS(author: Account): ContentManagementSystem {
    return new ContentManagementSystem(author)
  }

  getView(author?: Account): ArticleView {
    return new ArticleView(author, this.authorsService)
  }
}
