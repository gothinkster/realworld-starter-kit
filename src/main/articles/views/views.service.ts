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
    const article = await this.repository.findOneBy({ slug: slug })
    if (
      !article ||
      (!article.published &&
        (!this.user || this.user.getAuthorID() !== article.authorId))
    ) {
      throw new ArticleNotFound(slug)
    }
    return article
  }

  async getArticlesByFilter(
    filters: ArticleFilters,
    limit: number = 20,
    offset: number = 0,
  ): Promise<ReadonlyArticle[]> {
    const qb = this.repository
      .createQueryBuilder()
      .limit(limit)
      .skip(offset)
      .where(
        new Brackets((qb) => {
          qb.where({ published: true })
          if (this.user) {
            qb.orWhere({ authorId: this.user.getAuthorID() })
          }
        }),
      )

    if (filters.author) {
      const author = await this.profiles.getProfile({
        username: filters.author,
      })
      if (!author) {
        return []
      } else {
        qb.andWhere({ authorId: author.getAuthorID() })
      }
    }
    await ArticleViews.filterByTags(qb, filters.tags)
    const query = qb.getQuery()
    const result = await qb.getMany()
    return result
  }

  private static async filterByTags(
    qb: SelectQueryBuilder<ArticleEntity>,
    tags: string | null | undefined,
  ) {
    if (!tags) {
      qb.leftJoinAndSelect(`${qb.alias}.tagList`, 'tags')
    } else {
      qb.leftJoin('ArticlesHaveTags', 'aht', `aht.articleId = ${qb.alias}.id`)
      qb.leftJoin('TagEntity', 'tags', 'tags.id = aht.tagId')
      qb.andWhere('tags.name IN (:...tags)', { tags: tags.split(',') })
    }
  }
}
