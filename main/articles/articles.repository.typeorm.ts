import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  In,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import { slugify } from './slugify'
import { ArticleNotFound } from './articles.service'
import { ArticlesRepository, TagsRepository } from './articles.repository'
import { Article, Authored, Dated, Sluged, Tagged } from './articles.models'

export class TypeORMArticlesRepository implements ArticlesRepository {
  async getArticles(
    options: {
      filterBySlug?: string
      filterByAuthors?: { id: number }[]
      filterByTags?: string[]
      owner?: { id: number }
    },
    pagination?: { take: number; skip: number },
  ) {
    const qb = ArticleEntity.createQueryBuilder('article').where('true')

    if (options.filterBySlug) {
      qb.andWhere({ slug: options.filterBySlug })
    }

    if (options.filterByAuthors) {
      qb.andWhere({
        authorId: In(options.filterByAuthors.map((author) => author.id)),
      })
    }

    if (options.filterByTags) {
      qb.andWhere((qb) => {
        return `${qb.alias}.id IN ${qb
          .subQuery()
          .select('aht.article_id')
          .from(ArticlesHaveTagsEntity, 'aht')
          .where((qb) => {
            return `aht.tag_id IN ${qb
              .subQuery()
              .select('t.id')
              .from(TagEntity, 't')
              .where('t.name IN (:...tags)')
              .getQuery()}`
          })
          .getQuery()}`
      })
      qb.setParameters({ tags: options.filterByTags })
    }

    if (options.owner) {
      qb.andWhere(`published = true OR ${qb.alias}.author_id = :authorId`, {
        authorId: options.owner.id,
      })
    } else {
      qb.andWhere({ published: true })
    }

    qb.take(pagination?.take || 20)
      .skip(pagination?.skip || 0)
      .orderBy(`${qb.alias}.createdAt`, 'DESC')

    const queryResult = await qb.getMany()

    return queryResult.map((article) => this.createArticleResponse(article))
  }

  async createArticle(articleData: Article & Sluged, owner: { id: number }) {
    const article = await ArticleEntity.create({
      slug: articleData.slug,
      title: articleData.title,
      description: articleData.description,
      body: articleData.body,
      authorId: owner.id,
    }).save()
    return this.createArticleResponse(article)
  }

  async updateArticle(
    slug: string,
    owner: { id: number },
    snapshot: Partial<Article & Tagged & { published: boolean }>,
  ) {
    const newSlug = snapshot.title ? slugify(snapshot.title) : undefined
    const result = await ArticleEntity.createQueryBuilder()
      .update()
      .where({ slug, authorId: owner.id })
      .set(
        removeUndefinedValues({
          slug: newSlug,
          title: snapshot.title,
          description: snapshot.description,
          body: snapshot.body,
          published: snapshot.published,
        }),
      )
      .returning('*')
      .execute()

    if (!result.affected || result.affected === 0) {
      throw new ArticleNotFound(slug)
    }

    if (result.affected > 1) {
      throw new Error('Multiple articles returned unexpectedly')
    }

    return this.createArticleResponse(result.raw[0])
  }

  async deleteArticle(slug: string, owner: { id: number }) {
    const result = await ArticleEntity.delete({ slug, authorId: owner.id })
    if (result.affected === 0) {
      throw new ArticleNotFound(slug)
    }
  }

  async publishArticle(slug: string, owner: { id: number }) {
    return await this.updateArticle(slug, owner, { published: true })
  }

  async unpublishArticle(slug: string, owner: { id: number }) {
    return await this.updateArticle(slug, owner, { published: false })
  }

  private createArticleResponse(
    article: ArticleEntity & any,
  ): Article & { id: number } & Authored & Sluged & Dated {
    article.createdAt = article.createdAt ?? article.created_at
    article.updatedAt = article.updatedAt ?? article.updated_at
    article.author = article.author ?? {
      id: article.authorId ?? article.author_id,
    }

    delete article.created_at
    delete article.updated_at
    delete article.author_id
    delete article.authorId

    return article
  }
}

export class TypeORMTagsRepository implements TagsRepository {
  async setArticleTags(
    article: { id: number },
    tags: string[],
  ): Promise<string[]> {
    await this.createTags(tags)
    await this.insertMissingTags(tags, article)
    await this.unsetOtherTags(tags, article)
    return await this.getArticleTags(article)
  }

  async getArticleTags(article: { id: number }): Promise<string[]> {
    const tagIdsQuery = ArticlesHaveTagsEntity.createQueryBuilder('aht')
      .select('aht.tag_id')
      .where('aht.article_id = :articleId', {
        articleId: article.id,
      })

    const tagNamesQuery = TagEntity.createQueryBuilder('t')
      .select('t.name as name')
      .where(`t.id IN (${tagIdsQuery.getQuery()})`)
      .setParameters(tagIdsQuery.getParameters())

    const raw = await tagNamesQuery.getRawMany()
    return raw.map(({ name }) => name)
  }

  private async createTags(tags: string[]) {
    await TagEntity.createQueryBuilder('tag')
      .insert()
      .values(tags.map((tag) => ({ name: tag })))
      .orIgnore()
      .execute()
  }

  private async insertMissingTags(tags: string[], article: { id: number }) {
    await ArticlesHaveTagsEntity.query(
      'INSERT INTO articles_have_tags (tag_id, article_id) SELECT id, $2 FROM tags WHERE tags.name IN (SELECT * FROM unnest($1::text[])) ON CONFLICT (tag_id, article_id) DO NOTHING;',
      [tags, article.id],
    )
  }

  private async unsetOtherTags(tags: string[], article: { id: number }) {
    const subQuery = TagEntity.createQueryBuilder('t')
      .select('t.id')
      .where('t.name IN (:...tags)')
      .getQuery()

    const queryBuilder = ArticlesHaveTagsEntity.createQueryBuilder()
      .delete()
      .from(ArticlesHaveTagsEntity, 'articles_have_tags')
      .where('articles_have_tags.article_id = :articleId', {
        articleId: article.id,
      })
      .andWhere(`articles_have_tags.tag_id NOT IN (${subQuery})`)

    await queryBuilder.setParameter('tags', tags).execute()
  }
}

@Entity({ name: 'articles' })
export class ArticleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  slug!: string

  @Column({ type: 'text' })
  title!: string

  @Column({ type: 'text', nullable: true })
  description!: string

  @Column({ type: 'text', nullable: true })
  body!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @Column()
  published: boolean = false

  @Column({ type: 'integer', nullable: false })
  authorId!: number
}

@Entity({ name: 'tags' })
export class TagEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true, update: false, nullable: false })
  name!: string
}

@Unique(['tagId', 'articleId'])
@Entity({ name: 'articles_have_tags' })
export class ArticlesHaveTagsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'integer', nullable: false })
  tagId!: number

  @Column({ type: 'integer', nullable: false })
  articleId!: number
}

function removeUndefinedValues<T extends Object>(obj: T): T {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key]
    }
  })
  return obj
}
