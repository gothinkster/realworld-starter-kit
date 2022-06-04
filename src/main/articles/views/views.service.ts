import { In, Repository } from 'typeorm'
import { Brackets } from 'typeorm/query-builder/Brackets'
import { ProfilesService } from '../../profiles/profiles.service'
import { ArticleFilters } from '../articles.dto'
import { Author, ReadonlyArticle } from '../articles.models'
import { ArticleEntity } from '../persistence/article.entity'
import { TagEntity } from '../persistence/tag.entity'
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

  async getArticlesByFilter(
    filters: ArticleFilters,
    limit: number = 20,
    offset: number = 0,
  ): Promise<ReadonlyArticle[]> {
    const qb = this.repository
      .createQueryBuilder()
      .setFindOptions({ loadEagerRelations: true })
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
    if (filters.tags) {
      const tags = await TagEntity.getOrCreateFromNames(filters.tags.split(','))
      qb.innerJoinAndSelect('article.tagList', 'tag')
      qb.andWhere('tag.id = :tagId', { tagId: In(tags.map((tag) => tag.id)) })
    }
    return await qb.getMany()
  }
}
