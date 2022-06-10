import { Repository } from 'typeorm'
import { ArticleEntity } from '../../persistence/article.entity'
import { AuthorsService } from '../authors/service'
import { ArticleFinder } from './finder'
import { ArticleFilters, Author, FullArticle } from './models'

export class ArticleView {
  constructor(
    private repository: Repository<ArticleEntity>,
    private author?: Author,
    private authorsService?: AuthorsService,
  ) {}

  async getArticle(slug: string): Promise<FullArticle> {
    return await new ArticleFinder()
      .filterBySlug(slug)
      .filterByPublishedOrOwnedBy(this.author)
      .getOne()
  }

  async getFeed(
    limit: number = 20,
    offset: number = 0,
  ): Promise<FullArticle[]> {
    return await new ArticleFinder(limit, offset)
      .filterByPublished()
      .filterByFollowedBy(this.author)
      .getMany()
  }

  async getArticlesByFilters(
    filters: ArticleFilters,
    limit: number = 20,
    offset: number = 0,
  ): Promise<FullArticle[]> {
    const finder = new ArticleFinder(limit, offset)
      .filterByPublishedOrOwnedBy(this.author)
      .filterByTags(filters.tags?.split(','))

    if (filters.author) {
      const author = await this.authorsService.getByUsername(filters.author)
      if (!author) {
        return []
      }
      finder.filterByAuthor(author)
    }

    return await finder.getMany()
  }
}
