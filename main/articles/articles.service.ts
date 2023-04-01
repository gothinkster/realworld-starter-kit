import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ArticleEntity, ArticleFinder } from './articles.entity'
import { AuthorNotFound, AuthorsService } from '../authors/authors.service'
import { slugify } from './slug.utils'
import { DataSource } from 'typeorm'

type Pagination = {
  skip: number
  take: number
}

export interface Author {
  id: number
}

@Injectable()
export class ArticlesService {
  constructor(
    @Inject(AuthorsService)
    private readonly authorsService: Pick<
      AuthorsService,
      'getAuthorByUsername'
    >,
  ) {}

  getCMS(author: Author): ContentManagementSystem {
    return new ContentManagementSystem(author, undefined)
  }

  getView(author?: Author): ArticleView {
    return new ArticleView(this.authorsService, author)
  }
}

export type Dated<T extends {}> = T & {
  readonly createdAt: Date
  readonly updatedAt: Date
}
export type Sluged<T extends {}> = T & {
  slug: string
}

export interface Article {
  title: string
  description: string
  body: string
  tags: string[]
}

export type ArticleFields = Partial<Article>
export type FullArticle = Dated<Sluged<Article>>

export interface ArticleFilters {
  tags?: string[]
  author?: string
  favorited?: boolean
}

export class ArticleView {
  constructor(
    private authorsService: Pick<AuthorsService, 'getAuthorByUsername'>,
    private author?: Author,
  ) {}

  async getArticle(slug: string) {
    return await new ArticleFinder()
      .filterBySlug(slug)
      .filterByPublishedOrOwnedBy(this.author)
      .getOne()
  }

  async getFeed(pagination?: Pagination) {
    return await new ArticleFinder(pagination)
      .filterByPublished()
      .filterByFollowedBy(this.author)
      .getMany()
  }

  async getArticlesByFilters(filters: ArticleFilters, pagination?: Pagination) {
    const finder = new ArticleFinder(pagination)
      .filterByPublishedOrOwnedBy(this.author)
      .filterByTags(filters.tags)

    if (filters.author) {
      try {
        const author = await this.authorsService.getAuthorByUsername(
          filters.author,
        )
        finder.filterByAuthor(author)
      } catch (error) {
        if (error instanceof AuthorNotFound) {
          return []
        } else {
          throw error
        }
      }
    }

    return await finder.getMany()
  }
}

/**
 The ContentManagementSystem is responsible for letting only the authors
 change the content.
 **/
export class ContentManagementSystem {
  private readonly tagsService = new TagsService(this.datasource)

  constructor(
    private author: Author,
    private readonly datasource: Pick<DataSource, 'query'> = ArticleEntity,
  ) {}

  async createArticle(data: Article): Promise<FullArticle> {
    const slug = slugify(data.title)

    const raw = await this.datasource.query(
      `
INSERT INTO articles (slug, title, description, body, published, author_id, created_at, updated_at)
VALUES ($1, $2, $3, $4, $5, $6, current_date, current_date)
RETURNING *`,
      [slug, data.title, data.description, data.body, false, this.author.id],
    )

    const article = this.extractOneArticleFromQueryResult(slug, {
      raw,
      affected: 1,
    })
    article.tags = await this.tagsService.setArticleTags(data.tags, article)
    return article
  }

  async updateArticle(
    slug: string,
    snapshot: ArticleFields,
  ): Promise<FullArticle> {
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
        this.author.id,
        snapshot.title ? slugify(snapshot.title) : undefined,
        snapshot.title,
        snapshot.description,
        snapshot.body,
      ],
    )

    const article = this.extractOneArticleFromQueryResult(slug, {
      raw,
      affected,
    })

    if (snapshot.tags) {
      article.tags = await this.tagsService.setArticleTags(
        snapshot.tags,
        article,
      )
    } else {
      article.tags = await this.tagsService.getArticleTags(article)
    }

    return article
  }

  async deleteArticle(slug: string): Promise<void> {
    const [_, affected] = await this.datasource.query(
      `DELETE FROM articles WHERE slug = $1 AND author_id = $2`,
      [slug, this.author.id],
    )
    if (affected === 0) {
      throw new ArticleNotFound(slug)
    }
  }

  async publishArticle(slug: string): Promise<FullArticle> {
    const [raw, affected] = await this.datasource.query(
      `
UPDATE articles
SET published = true
WHERE slug = $1 AND author_id = $2
RETURNING *;`,
      [slug, this.author.id],
    )

    const article = this.extractOneArticleFromQueryResult(slug, {
      raw,
      affected,
    })
    article.tags = await this.tagsService.getArticleTags(article)
    return article
  }

  async unpublishArticle(slug: string): Promise<FullArticle> {
    const [raw, affected] = await this.datasource.query(
      `
UPDATE articles
SET published = false
WHERE slug = $1 AND author_id = $2
RETURNING *;`,
      [slug, this.author.id],
    )

    const article = this.extractOneArticleFromQueryResult(slug, {
      raw,
      affected,
    })
    article.tags = await this.tagsService.getArticleTags(article)
    return article
  }

  private extractOneArticleFromQueryResult(
    slug: string,
    rawQueryResult: { affected: number; raw: any },
  ) {
    if (rawQueryResult.affected === 0) {
      throw new ArticleNotFound(slug)
    }
    if (rawQueryResult.affected > 1) {
      throw new Error('Multiple articles returned unexpectedly')
    }

    const article = rawQueryResult.raw[0]

    article.createdAt = article.created_at
    article.updatedAt = article.updated_at
    delete article.created_at
    delete article.updated_at

    return {
      ...article,
      author: this.author,
    }
  }
}

export class TagsService {
  constructor(
    private readonly datasource: Pick<DataSource, 'query'> = ArticleEntity,
  ) {}

  async setArticleTags(tags: string[], article: ArticleEntity) {
    await this.createTags(tags)
    await this.insertMissingTags(tags, article)
    await this.unsetOtherTags(tags, article)
    return await this.getArticleTags(article)
  }

  async getArticleTags(article: ArticleEntity) {
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

  private async insertMissingTags(tags: string[], article: ArticleEntity) {
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

  private async unsetOtherTags(tags: string[], article: ArticleEntity) {
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
export class ArticleNotFound extends NotFoundException {
  constructor(slug?: string) {
    super(`Article ${slug} not found`)
    this.name = 'ArticleNotFound'
  }
}
