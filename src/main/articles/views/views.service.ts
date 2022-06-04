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
    const qb = this.newQueryBuilder()
    this.filterBySlug(qb, slug)
    this.filterByPublishedOrOwned(qb, this.user)
    const article = await qb.getOne()
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
    const qb = this.newQueryBuilder(limit, offset)
    this.filterByPublishedOrOwned(qb, this.user)
    this.filterByTags(qb, filters.tags?.split(','))
    await this.filterByAuthor(qb, filters.author)

    return await qb.getMany()
  }

  private newQueryBuilder(
    limit: number = 20,
    offset: number = 0,
  ): SelectQueryBuilder<ArticleEntity> {
    const qb = this.repository
      .createQueryBuilder()
      .where('true')
      .limit(limit)
      .skip(offset)
    qb.leftJoinAndSelect(`${qb.alias}.tagList`, 'tags')
    return qb
  }

  private filterBySlug(qb: SelectQueryBuilder<ArticleEntity>, slug: string) {
    qb.andWhere({ slug: slug })
  }

  private async filterByAuthor(
    qb: SelectQueryBuilder<ArticleEntity>,
    author?: string,
  ) {
    if (author) {
      const authorProfile = await this.profiles.getProfile({
        username: author,
      })
      if (!authorProfile) {
        qb.andWhere('false')
      } else {
        qb.andWhere({ authorId: authorProfile.getAuthorID() })
      }
    }
  }

  private filterByTags(qb: SelectQueryBuilder<ArticleEntity>, tags: string[]) {
    if (tags && tags !== []) {
      qb.andWhere('tags.name IN (:...tags)', { tags: tags })
    }
  }

  private filterByPublishedOrOwned(
    qb: SelectQueryBuilder<ArticleEntity>,
    author?: Author,
  ) {
    qb.andWhere(
      new Brackets((qb) => {
        qb.where({ published: true })
        if (author) {
          qb.orWhere({ authorId: author.getAuthorID() })
        }
      }),
    )
  }
}
