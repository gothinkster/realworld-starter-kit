import { Repository, SelectQueryBuilder } from 'typeorm'
import { Brackets } from 'typeorm/query-builder/Brackets'
import { ProfilesService } from '../../profiles/profiles.service'
import { ArticleFilters } from '../articles.dto'
import { Author, Dated, ReadonlyArticle, Sluged } from '../articles.models'
import { EditableArticle } from '../cms/cms.models'
import { ArticleEntity } from '../persistence/article.entity'
import { ArticleNotFound } from './views.exceptions'

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

  async getArticlesByFilter(
    filters: ArticleFilters,
    limit: number = 20,
    offset: number = 0,
  ): Promise<ReadonlyArticle[]> {
    const finder = new ArticleFinder(limit, offset)
      .filterByPublishedOrOwnedBy(this.user)
      .filterByTags(filters.tags?.split(','))
    await finder.filterByAuthor(this.profiles, filters.author)
    return await finder.getMany()
  }
}

export class ArticleFinder {
  private readonly qb: SelectQueryBuilder<ArticleEntity>
  slug: string

  constructor(limit: number = 20, offset: number = 0) {
    this.qb = ArticleEntity.getRepository()
      .createQueryBuilder()
      .where('true')
      .limit(limit)
      .skip(offset)
    this.qb.leftJoinAndSelect(`${this.qb.alias}.tagList`, 'tags')
  }

  filterBySlug(slug: string) {
    this.qb.andWhere({ slug: slug })
    this.slug = slug
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

  async getOne(): Promise<Sluged<Dated<EditableArticle>>> {
    const article = await this.qb.getOne()
    if (!article) {
      throw new ArticleNotFound(this.slug)
    }
    return article
  }

  async getMany(): Promise<Sluged<Dated<EditableArticle>>[]> {
    return await this.qb.getMany()
  }
}
