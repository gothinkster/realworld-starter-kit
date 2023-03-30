import { Injectable, NotFoundException } from '@nestjs/common'
import {
  ArticleEntity,
  ArticleFinder,
  ARTICLES_HAVE_TAGS_JOIN_TABLE,
  Tag,
} from './articles.entity'
import {
  Authored,
  AuthorNotFound,
  AuthorsService,
} from '../authors/authors.service'
import { slugify } from './slug.utils'

type Pagination = {
  skip: number
  take: number
}

export interface Author {
  id: number
}

@Injectable()
export class ArticlesService {
  constructor(private readonly authorsService?: AuthorsService) {}

  getCMS(author: Author): ContentManagementSystem {
    return new ContentManagementSystem(author)
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
export type FullArticle = Authored<Dated<Sluged<Article>>>

export interface ArticleFilters {
  tags?: string[]
  author?: string
  favorited?: boolean
}

export class ArticleView {
  constructor(
    private authorsService?: AuthorsService,
    private author?: Author,
  ) {}

  async getArticle(slug: string): Promise<FullArticle> {
    return await new ArticleFinder()
      .filterBySlug(slug)
      .filterByPublishedOrOwnedBy(this.author)
      .getOne()
  }

  async getFeed(pagination?: Pagination): Promise<FullArticle[]> {
    return await new ArticleFinder(pagination)
      .filterByPublished()
      .filterByFollowedBy(this.author)
      .getMany()
  }

  async getArticlesByFilters(
    filters: ArticleFilters,
    pagination?: Pagination,
  ): Promise<FullArticle[]> {
    const finder = new ArticleFinder(pagination)
      .filterByPublishedOrOwnedBy(this.author)
      .filterByTags(filters.tags)

    if (filters.author) {
      try {
        const author = await this.authorsService?.getAuthorByUsername(
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
  constructor(private author: Author) {}

  async createArticle(data: Article): Promise<FullArticle> {
    const article = ArticleEntity.create({
      author: this.author,
      slug: slugify(data.title),
      tagList: await Tag.getOrCreateFromNames(data.tags),
      ...data,
    })
    await article.save()
    return article
  }

  private createQueryBuilderForModification(slug: string) {
    return ArticleEntity.createQueryBuilder('articles')
      .where('articles.slug = :slug', { slug })
      .andWhere('articles.author_id = :authorId', { authorId: this.author.id })
  }

  private async _updateArticleTagsReturning(
    articleId: number,
    tags?: string[],
  ) {
    if (!tags) {
      return await Tag.createQueryBuilder('tags')
        .select('tags.name')
        .leftJoin(ARTICLES_HAVE_TAGS_JOIN_TABLE, 'aht', 'aht.tags_id = tags.id')
        .where('aht.articles_id = :articleId', { articleId })
        .getMany()
        .then((r) => r.map((t) => t.name))
    }

    const tagEntities = await Tag.getOrCreateFromNames(tags)

    await Tag.createQueryBuilder('aht')
      .delete()
      .from(ARTICLES_HAVE_TAGS_JOIN_TABLE)
      .where('articles_id = :articleId', { articleId })
      .execute()

    await Tag.createQueryBuilder('aht')
      .insert()
      .into(ARTICLES_HAVE_TAGS_JOIN_TABLE)
      .values(
        tagEntities.map((tag) => ({
          articles_id: articleId,
          tags_id: tag.id,
        })),
      )
      .execute()

    return tags
  }

  private async _updateArticle(
    slug: string,
    snapshot: ArticleFields & {
      published?: boolean
    },
  ) {
    const qb = this.createQueryBuilderForModification(slug)
      .update({
        published: snapshot.published,
        slug: snapshot.title ? slugify(snapshot.title) : undefined,
        title: snapshot.title,
        description: snapshot.description,
        body: snapshot.body,
      })
      .returning('*')

    const queryResult = await qb.execute()
    if (queryResult.affected === 0) {
      throw new ArticleNotFound(slug)
    }
    if (queryResult.affected > 1) {
      throw new Error('Multiple articles updated unexpectedly')
    }

    const article = queryResult.raw[0]

    return {
      ...article,
      author: this.author,
      tags: await this._updateArticleTagsReturning(article.id, snapshot.tags),
    }
  }

  async updateArticle(
    slug: string,
    snapshot: ArticleFields,
  ): Promise<FullArticle> {
    return await this._updateArticle(slug, snapshot)
  }

  async deleteArticle(slug: string): Promise<void> {
    const result = await this.createQueryBuilderForModification(slug)
      .delete()
      .execute()
    if (result.affected === 0) {
      throw new ArticleNotFound(slug)
    }
  }

  async publishArticle(slug: string): Promise<FullArticle> {
    return await this._updateArticle(slug, { published: true })
  }

  async unpublishArticle(slug: string): Promise<FullArticle> {
    return await this._updateArticle(slug, { published: false })
  }
}

export class ArticleNotFound extends NotFoundException {
  constructor(slug?: string) {
    super(`Article ${slug} not found`)
    this.name = 'ArticleNotFound'
  }
}
