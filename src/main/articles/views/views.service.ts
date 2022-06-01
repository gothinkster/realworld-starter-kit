import { Repository } from 'typeorm'
import { ProfilesService } from '../../profiles/profiles.service'
import { ArticleFilters } from '../articles.dto'
import { Author, ReadonlyArticle } from '../articles.models'
import { ArticleEntity } from '../persistence/article.entity'
import { ArticleNotFound } from './views.exceptions'

export class ArticleViews {
  constructor(
    private repository: Repository<ArticleEntity>,
    private user?: Author,
    private profiles?: ProfilesService,
  ) {}

  async getArticle(slug: string): Promise<ReadonlyArticle> {
    const article = await this.repository.findOneBy({ slug: slug })
    if (
      !article ||
      (!article.isPublished() &&
        (!this.user || this.user.getAuthorID() !== article.getAuthorID()))
    ) {
      throw new ArticleNotFound(slug)
    }
    return article
  }

  async getManyArticles(
    filters: ArticleFilters,
    limit: number,
    offset: number,
  ) {
    const whereClause = {}
    if (filters.author) {
      const author = await this.profiles.getProfile({
        username: filters.author,
      })
      whereClause['authorId'] = author.getAuthorID()
    }
    if (filters.tag) {
    }
    ArticleEntity.find({
      where: { tags: filters.tag },
      skip: offset,
      take: limit,
    })
  }
}
