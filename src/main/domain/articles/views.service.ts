import { AuthorNotFound } from '../authors/exceptions'
import { AuthorsService } from '../authors/service'
import { ArticleFinder, Pagination } from './finder'
import { ArticleFilters, Author, FullArticle } from './models'

export class ArticleView {
  constructor(
    private author?: Author,
    private authorsService?: AuthorsService,
  ) {}

  async getArticle(slug: string): Promise<FullArticle> {
    return await new ArticleFinder()
      .filterBySlug(slug)
      .filterByPublishedOrOwnedBy(this.author)
      .getOne()
  }

  async getFeed(pagination?: Pagination): Promise<FullArticle[]> {
    return await new ArticleFinder(pagination)
      .filterByPublished()
      .filterByFollowedBy(this.author)
      .getMany()
  }

  async getArticlesByFilters(
    filters: ArticleFilters,
    pagination?: Pagination,
  ): Promise<FullArticle[]> {
    const finder = new ArticleFinder(pagination)
      .filterByPublishedOrOwnedBy(this.author)
      .filterByTags(filters.tags?.split(','))

    if (filters.author) {
      try {
        const author = await this.authorsService.getByUsername(filters.author)
        finder.filterByAuthor(author)
      } catch (error) {
        if (error instanceof AuthorNotFound) {
          return []
        } else {
          throw error
        }
      }
    }

    return await finder.getMany()
  }
}
