import { SelectQueryBuilder } from 'typeorm'
import { Brackets } from 'typeorm/query-builder/Brackets'
import { ArticleEntity } from '../../persistence/article.entity'
import { UserFollows } from '../../persistence/author.entity'
import { ArticleNotFound } from './exceptions'
import { Author } from './models'

export class ArticleFinder {
  private readonly qb: SelectQueryBuilder<ArticleEntity>
  slug: string

  constructor(limit: number = 20, offset: number = 0) {
    this.qb = ArticleEntity.createQueryBuilder('article')
    this.qb
      .where('true')
      .limit(limit)
      .skip(offset)
      .orderBy(`${this.qb.alias}.createdAt`, 'DESC')
      .leftJoinAndSelect(`${this.qb.alias}.tagList`, 'tags')
      .leftJoinAndSelect(`${this.qb.alias}.author`, 'authors')
  }

  filterBySlug(slug: string) {
    this.qb.andWhere({ slug: slug })
    this.slug = slug
    return this
  }

  filterByAuthor(author: Author) {
    this.qb.andWhere('authorId = :authorId', { authorId: author.id })
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
          qb.orWhere('authorId = :authorId', { authorId: author.id })
        }
      }),
    )
    return this
  }

  filterByPublished() {
    this.qb.andWhere({ published: true })
    return this
  }

  filterByFollowedBy(user: Author) {
    const userFollows = UserFollows.createQueryBuilder('following')
      .select('followsId')
      .where('userId = :userId', { userId: user.id })
    this.qb.andWhere(`authorId IN (${userFollows.getSql()})`)
    return this
  }

  async getOne(): Promise<ArticleEntity> {
    const article = await this.qb.getOne()
    if (!article) {
      throw new ArticleNotFound(this.slug)
    }
    return article
  }

  async getMany(): Promise<ArticleEntity[]> {
    return await this.qb.getMany()
  }
}
