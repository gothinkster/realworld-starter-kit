import { Repository } from 'typeorm'
import { ProfilesService } from '../../profiles/profiles.service'
import { ArticleFilters } from '../articles.dto'
import { Author, ReadonlyArticle } from '../articles.models'
import { ArticleEntity } from '../persistence/article.entity'
import { ArticleFinder } from './articles.finder'

export class ArticleViews {
  constructor(
    private repository: Repository<ArticleEntity>,
    private user?: Author,
    private profiles?: ProfilesService,
  ) {}

  async getArticle(slug: string): Promise<ReadonlyArticle> {
    return await new ArticleFinder()
      .filterBySlug(slug)
      .filterByPublishedOrOwnedBy(this.user)
      .getOne()
  }

  async getFeed(
    limit: number = 20,
    offset: number = 0,
  ): Promise<ReadonlyArticle[]> {
    return await new ArticleFinder(limit, offset)
      .filterByPublished()
      .filterByFollowing(this.user)
      .getMany()
  }

  async getArticlesByFilters(
    filters: ArticleFilters,
    limit: number = 20,
    offset: number = 0,
  ): Promise<ReadonlyArticle[]> {
    const finder = new ArticleFinder(limit, offset)
      .filterByPublishedOrOwnedBy(this.user)
      .filterByTags(filters.tags?.split(','))

    if (filters.author) {
      const author = await this.profiles.getProfile({
        username: filters.author,
      })
      if (!author) {
        return []
      }
      finder.filterByAuthor(author)
    }

    return await finder.getMany()
  }
}
