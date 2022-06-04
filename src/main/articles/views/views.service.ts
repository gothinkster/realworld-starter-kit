import { Repository, SelectQueryBuilder } from 'typeorm'
import { Brackets } from 'typeorm/query-builder/Brackets'
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
    const article = await new ArticleFinder(this.repository)
      .filterBySlug(slug)
      .filterByPublishedOrOwnedBy(this.user)
      .getOne()
    if (!article) {
      throw new ArticleNotFound(slug)
    }
    return article
  }

  async getArticlesByFilter(
    filters: ArticleFilters,
    limit: number = 20,
    offset: number = 0,
  ): Promise<ReadonlyArticle[]> {
    const finder = new ArticleFinder(this.repository, limit, offset)
      .filterByPublishedOrOwnedBy(this.user)
      .filterByTags(filters.tags?.split(','))
    await finder.filterByAuthor(this.profiles, filters.author)
    return await finder.getMany()
  }
}

class ArticleFinder {
  private readonly qb: SelectQueryBuilder<ArticleEntity>
  constructor(
    private readonly repository: Repository<ArticleEntity>,
    limit: number = 20,
    offset: number = 0,
  ) {
    this.qb = this.repository
      .createQueryBuilder()
      .where('true')
      .limit(limit)
      .skip(offset)
    this.qb.leftJoinAndSelect(`${this.qb.alias}.tagList`, 'tags')
  }

  filterBySlug(slug: string) {
    this.qb.andWhere({ slug: slug })
    return this
  }

  async filterByAuthor(profiles: ProfilesService, author?: string) {
    if (author) {
      const authorProfile = await profiles.getProfile({
        username: author,
      })
      if (!authorProfile) {
        this.qb.andWhere('false')
      } else {
        this.qb.andWhere({ authorId: authorProfile.getAuthorID() })
      }
    }
    return this
  }

  filterByTags(tags: string[]) {
    if (tags && tags !== []) {
      this.qb.andWhere('tags.name IN (:...tags)', { tags: tags })
    }
    return this
  }

  filterByPublishedOrOwnedBy(author?: Author) {
    this.qb.andWhere(
      new Brackets((qb) => {
        qb.where({ published: true })
        if (author) {
          qb.orWhere({ authorId: author.getAuthorID() })
        }
      }),
    )
    return this
  }

  getOne() {
    return this.qb.getOne()
  }

  getMany() {
    return this.qb.getMany()
  }
}
