import { Repository } from 'typeorm'
import { ArticleEntity } from '../../persistence/article.entity'
import { ProfilesService } from '../profiles/service'
import { ArticleFinder } from './finder'
import { ArticleFilters, Author, FullArticle } from './models'

export class ArticleViews {
  constructor(
    private repository: Repository<ArticleEntity>,
    private user?: Author,
    private profiles?: ProfilesService,
  ) {}

  async getArticle(slug: string): Promise<FullArticle> {
    return await new ArticleFinder()
      .filterBySlug(slug)
      .filterByPublishedOrOwnedBy(this.user)
      .getOne()
  }

  async getFeed(
    limit: number = 20,
    offset: number = 0,
  ): Promise<FullArticle[]> {
    return await new ArticleFinder(limit, offset)
      .filterByPublished()
      .filterByFollowedBy(this.user)
      .getMany()
  }

  async getArticlesByFilters(
    filters: ArticleFilters,
    limit: number = 20,
    offset: number = 0,
  ): Promise<FullArticle[]> {
    const finder = new ArticleFinder(limit, offset)
      .filterByPublishedOrOwnedBy(this.user)
      .filterByTags(filters.tags?.split(','))

    if (filters.author) {
      const author = await this.profiles.getByUsername(filters.author)
      if (!author) {
        return []
      }
      finder.filterByAuthor(author)
    }

    return await finder.getMany()
  }
}
