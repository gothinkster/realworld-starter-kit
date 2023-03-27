import { Injectable } from '@nestjs/common'
import { Account } from '../authors/models'
import { AuthorsService } from '../authors/service'
import {
  Article,
  ArticleFields,
  ArticleFilters,
  Author,
  FullArticle,
} from './models'
import { ArticleEntity } from './article.entity'
import { ArticleFinder, Pagination } from './finder'
import { AuthorNotFound } from '../authors/exceptions'

@Injectable()
export class ArticlesService {
  constructor(private authorsService?: AuthorsService) {}

  getCMS(author: Account): ContentManagementSystem {
    return new ContentManagementSystem(author)
  }

  getView(author?: Account): ArticleView {
    return new ArticleView(author, this.authorsService)
  }
}

export class ArticleView {
  constructor(
    private author?: Author,
    private authorsService?: AuthorsService,
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
        const author = await this.authorsService.getByUsername(filters.author)
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

  async createArticle(snapshot: Article): Promise<FullArticle> {
    const article = ArticleEntity.create({
      author: this.author,
    })
    return await article.loadData(snapshot).save()
  }

  private async getArticleForModification(
    slug: string,
  ): Promise<ArticleEntity> {
    return new ArticleFinder()
      .filterBySlug(slug)
      .filterByAuthor(this.author)
      .getOne()
  }

  async updateArticle(
    slug: string,
    snapshot: ArticleFields,
  ): Promise<FullArticle> {
    const article = await this.getArticleForModification(slug)
    return await article.loadData(snapshot).save()
  }

  async deleteArticle(slug: string): Promise<void> {
    const article = await this.getArticleForModification(slug)
    await article.delete()
  }

  async publishArticle(slug: string): Promise<FullArticle> {
    const article = await this.getArticleForModification(slug)
    return await article.publish().save()
  }

  async unpublishArticle(slug: string): Promise<FullArticle> {
    const article = await this.getArticleForModification(slug)
    return await article.unpublish().save()
  }
}
