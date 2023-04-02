import { DataSource } from 'typeorm'
import { slugify } from './slug.utils'
import {
  Article,
  ArticleNotFound,
  Authored,
  Dated,
  FullArticle,
  Sluged,
  Tagged,
} from './articles.service'
import { Brackets } from 'typeorm/query-builder/Brackets'
import { ArticleEntity } from './articles.entity'

export class ArticleFinder {
  private readonly qb =
    ArticleEntity.createQueryBuilder('article').where('true')
  private slug: string

  constructor(private page = { take: 20, skip: 0 }) {}

  filterBySlug(slug: string) {
    this.qb.andWhere({ slug: slug })
    this.slug = slug
    return this
  }

  filterByAuthors(authors: { id: number }[]) {
    this.qb.andWhere(`${this.qb.alias}.author_id IN (:...authorIds)`, {
      authorIds: authors.map((author) => author.id),
    })
    return this
  }

  filterByTags(tags: string[]) {
    this.qb.andWhere(
      `${this.qb.alias}.id IN (
SELECT aht.articles_id
FROM articles_have_tags AS aht
WHERE aht.tags_id IN (
  SELECT t.id FROM tags AS t WHERE t.name IN (:...tags)
))`,
      { tags: tags },
    )
    return this
  }

  filterByPublishedOrOwnedBy(author?: { id: number }) {
    this.qb.andWhere(
      new Brackets((qb) => {
        qb.where({ published: true })
        if (author) {
          qb.orWhere(`${this.qb.alias}.author_id = :authorId`, {
            authorId: author.id,
          })
        }
      }),
    )
    return this
  }

  filterByPublished() {
    this.qb.andWhere({ published: true })
    return this
  }

  private finalizeSelectQuery() {
    this.qb
      .leftJoinAndSelect(`${this.qb.alias}.author`, 'author')
      .take(this.page?.take || 20)
      .skip(this.page?.skip || 0)
      .orderBy(`${this.qb.alias}.createdAt`, 'DESC')
    return this.qb
  }

  async getOne(): Promise<
    Article & { id: number } & Authored & Sluged & Dated
  > {
    const article = await this.finalizeSelectQuery().getOne()
    if (!article) {
      throw new ArticleNotFound(this.slug)
    }
    return article
  }

  async getMany(): Promise<
    (Article & { id: number } & Authored & Sluged & Dated)[]
  > {
    return await this.finalizeSelectQuery().getMany()
  }
}

export class ArticlesRepository {
  constructor(private readonly datasource: Pick<DataSource, 'query'>) {}

  async createArticle(
    articleData: Article & Sluged,
    owner: { id: number },
  ): Promise<FullArticle & { id: number }> {
    const raw = await this.datasource.query(
      `
INSERT INTO articles (slug, title, description, body, published, author_id, created_at, updated_at)
VALUES ($1, $2, $3, $4, $5, $6, current_date, current_date)
RETURNING *`,
      [
        articleData.slug,
        articleData.title,
        articleData.description,
        articleData.body,
        false,
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
    const [raw, affected] = await this.datasource.query(
      `
UPDATE articles SET 
    slug = COALESCE($3, slug),
    title = COALESCE($4, title),
    description = COALESCE($5, description),
    body = COALESCE($6, body),
    updated_at = current_date
WHERE slug = $1 AND author_id = $2
RETURNING *;`,
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
    const [_, affected] = await this.datasource.query(
      `DELETE FROM articles WHERE slug = $1 AND author_id = $2`,
      [slug, owner.id],
    )
    if (affected === 0) {
      throw new ArticleNotFound(slug)
    }
  }

  async publishArticle(slug: string, owner: { id: number }) {
    const [raw, affected] = await this.datasource.query(
      `
UPDATE articles
SET published = true
WHERE slug = $1 AND author_id = $2
RETURNING *;`,
      [slug, owner.id],
    )
    return this.extractOneArticleFromQueryResult(slug, { raw, count: affected })
  }

  async unpublishArticle(slug: string, owner: { id: number }) {
    const [raw, affected] = await this.datasource.query(
      `
UPDATE articles
SET published = false
WHERE slug = $1 AND author_id = $2
RETURNING *;`,
      [slug, owner.id],
    )
    return this.extractOneArticleFromQueryResult(slug, { raw, count: affected })
  }

  private extractOneArticleFromQueryResult(
    slug: string,
    rawQueryResult: { count: number; raw: any[] },
  ): FullArticle & { id: number } {
    if (rawQueryResult.count === 0) {
      throw new ArticleNotFound(slug)
    }
    if (rawQueryResult.count > 1) {
      throw new Error('Multiple articles returned unexpectedly')
    }

    const article = rawQueryResult.raw[0]

    article.createdAt = article.created_at
    article.updatedAt = article.updated_at
    article.author = {
      id: article.author_id,
    }

    delete article.created_at
    delete article.updated_at
    delete article.author_id

    return article
  }
}

export class TagsRepository {
  constructor(private readonly datasource: Pick<DataSource, 'query'>) {}

  async setArticleTags(
    tags: string[],
    article: { id: number },
  ): Promise<string[]> {
    await this.createTags(tags)
    await this.insertMissingTags(tags, article)
    await this.unsetOtherTags(tags, article)
    return await this.getArticleTags(article)
  }

  async getArticleTags(article: { id: number }): Promise<string[]> {
    const raw = await this.datasource.query(
      `
SELECT tags.name FROM tags
INNER JOIN articles_have_tags ON tags.id = articles_have_tags.tags_id
WHERE articles_have_tags.articles_id = $1;
`,
      [article.id],
    )
    return raw.map(({ name }) => name)
  }

  private async createTags(tags: string[]) {
    await this.datasource.query(
      `
INSERT INTO tags (name)
SELECT * FROM unnest($1::text[]) AS tag
ON CONFLICT (name) DO NOTHING;
    `,
      [tags],
    )
  }

  private async insertMissingTags(tags: string[], article: { id: number }) {
    await this.datasource.query(
      `
INSERT INTO articles_have_tags (tags_id, articles_id)
SELECT id, $2 FROM tags
WHERE tags.name IN (SELECT * FROM unnest($1::text[]))
ON CONFLICT (tags_id, articles_id) DO NOTHING;
`,
      [tags, article.id],
    )
  }

  private async unsetOtherTags(tags: string[], article: { id: number }) {
    await this.datasource.query(
      `
DELETE FROM articles_have_tags
WHERE articles_id = $2 AND tags_id NOT IN (
SELECT id FROM tags WHERE tags.name IN (SELECT * FROM unnest($1::text[]))
);`,
      [tags, article.id],
    )
  }
}
