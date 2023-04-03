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
      qb.andWhere(
        `${qb.alias}.id IN (
SELECT aht.article_id
FROM articles_have_tags AS aht
WHERE aht.tag_id IN (
  SELECT t.id FROM tags AS t WHERE t.name IN (:...tags)
))`,
        { tags: options.filterByTags },
      )
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
    const raw = await ArticleEntity.query(
      'INSERT INTO articles (slug, title, description, body, author_id, created_at, updated_at, published) VALUES ($1, $2, $3, $4, $5, now(), now(), false) RETURNING *;',
      [
        articleData.slug,
        articleData.title,
        articleData.description,
        articleData.body,
        owner.id,
      ],
    )
    return this.extractOneArticleFromQueryResult(articleData.slug, {
      raw,
      count: 1,
    })
  }

  async updateArticle(
    slug: string,
    owner: { id: number },
    snapshot: Partial<Article & Tagged>,
  ) {
    const [raw, affected] = await ArticleEntity.query(
      'UPDATE articles SET slug = COALESCE($3, slug), title = COALESCE($4, title), description = COALESCE($5, description), body = COALESCE($6, body), updated_at = now() WHERE slug = $1 AND author_id = $2 RETURNING *;',
      [
        slug,
        owner.id,
        snapshot.title ? slugify(snapshot.title) : undefined,
        snapshot.title,
        snapshot.description,
        snapshot.body,
      ],
    )

    return this.extractOneArticleFromQueryResult(slug, {
      raw,
      count: affected,
    })
  }

  async deleteArticle(slug: string, owner: { id: number }) {
    const [_, affected] = await ArticleEntity.query(
      'DELETE FROM articles WHERE slug = $1 AND author_id = $2',
      [slug, owner.id],
    )
    if (affected === 0) {
      throw new ArticleNotFound(slug)
    }
  }

  async publishArticle(slug: string, owner: { id: number }) {
    const [raw, affected] = await ArticleEntity.query(
      'UPDATE articles SET published = true WHERE slug = $1 AND author_id = $2 RETURNING *;',
      [slug, owner.id],
    )
    return this.extractOneArticleFromQueryResult(slug, { raw, count: affected })
  }

  async unpublishArticle(slug: string, owner: { id: number }) {
    const [raw, affected] = await ArticleEntity.query(
      'UPDATE articles SET published = false WHERE slug = $1 AND author_id = $2 RETURNING *;',
      [slug, owner.id],
    )
    return this.extractOneArticleFromQueryResult(slug, { raw, count: affected })
  }

  private extractOneArticleFromQueryResult(
    slug: string,
    rawQueryResult: { count: number; raw: any[] },
  ) {
    if (rawQueryResult.count === 0) {
      throw new ArticleNotFound(slug)
    }
    if (rawQueryResult.count > 1) {
      throw new Error('Multiple articles returned unexpectedly')
    }

    const article = rawQueryResult.raw[0]

    return this.createArticleResponse(article)
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
    const raw = await TagEntity.query(
      'SELECT tags.name FROM tags INNER JOIN articles_have_tags ON tags.id = articles_have_tags.tag_id WHERE articles_have_tags.article_id = $1;',
      [article.id],
    )
    return raw.map(({ name }) => name)
  }

  private async createTags(tags: string[]) {
    await TagEntity.query(
      'INSERT INTO tags (name) SELECT * FROM unnest($1::text[]) AS tag ON CONFLICT (name) DO NOTHING;',
      [tags],
    )
  }

  private async insertMissingTags(tags: string[], article: { id: number }) {
    await TagEntity.query(
      'INSERT INTO articles_have_tags (tag_id, article_id) SELECT id, $2 FROM tags WHERE tags.name IN (SELECT * FROM unnest($1::text[])) ON CONFLICT (tag_id, article_id) DO NOTHING;',
      [tags, article.id],
    )
  }

  private async unsetOtherTags(tags: string[], article: { id: number }) {
    await TagEntity.query(
      'DELETE FROM articles_have_tags WHERE article_id = $2 AND tag_id NOT IN (SELECT id FROM tags WHERE tags.name IN (SELECT * FROM unnest($1::text[])));',
      [tags, article.id],
    )
  }
}
@Entity({ name: 'articles' })
export class ArticleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  slug!: string

  @Column({ unique: true, type: 'text' })
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
