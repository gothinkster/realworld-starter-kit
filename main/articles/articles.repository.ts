import { DataSource } from 'typeorm'
import { slugify } from './slug.utils'
import {
  Article,
  ArticleNotFound,
  Authored,
  Dated,
  Sluged,
  Tagged,
} from './articles.service'
import { ArticleEntity } from './articles.entity'

export class ArticlesRepository {
  constructor(private readonly datasource: Pick<DataSource, 'query'>) {}

  async getArticles(
    options: {
      filterBySlug?: string
      filterByAuthors?: { id: number }[]
      filterByTags?: string[]
      owner?: { id: number }
    },
    pagination?: { take: number; skip: number },
  ): Promise<(Article & { id: number } & Authored & Sluged & Dated)[]> {
    const qb = ArticleEntity.createQueryBuilder('article').where('true')

    if (options.filterBySlug) {
      qb.andWhere({ slug: options.filterBySlug })
    }

    if (options.filterByAuthors) {
      qb.andWhere(`${qb.alias}.author_id IN (:...authorIds)`, {
        authorIds: options.filterByAuthors.map((author) => author.id),
      })
    }

    if (options.filterByTags) {
      qb.andWhere(
        `${qb.alias}.id IN (
SELECT aht.articles_id
FROM articles_have_tags AS aht
WHERE aht.tags_id IN (
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
      .leftJoinAndSelect(`${qb.alias}.author`, 'author')
      .orderBy(`${qb.alias}.createdAt`, 'DESC')

    const queryResult = await qb.getMany()

    return queryResult.map((article) => this.createArticleResponse(article))
  }

  async createArticle(articleData: Article & Sluged, owner: { id: number }) {
    const raw = await this.datasource.query(
      `
INSERT INTO articles (slug, title, description, body, published, author_id, created_at, updated_at)
VALUES ($1, $2, $3, $4, $5, $6, current_timestamp, current_timestamp)
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
    updated_at = current_timestamp
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
