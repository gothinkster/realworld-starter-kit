import { SelectQueryBuilder } from 'typeorm'
import { Brackets } from 'typeorm/query-builder/Brackets'
import { Author, Dated, Sluged } from '../articles.models'
import { EditableArticle } from '../cms/cms.models'
import { ArticleEntity } from '../persistence/article.entity'
import { ArticleNotFound } from './views.exceptions'

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

  filterByAuthor(author: Author) {
    this.qb.andWhere({ authorId: author.getAuthorID() })
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

  filterByPublished() {
    this.qb.andWhere({ published: true })
    return this
  }

  filterByFollowing(user: Author) {
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
