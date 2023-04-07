import { NotFoundException } from '@nestjs/common'
import { AuthorNotFound, AuthorsService } from '../authors/authors.service'
import { Article, Tagged } from './articles.models'
import {
  ArticleFilters,
  ArticlesRepository,
  Pagination,
  TagsRepository,
} from './articles.repository'
import { slugify } from './slugify'

export class ArticlesService {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly tagsRepository: TagsRepository,
    private readonly articlesRepository: ArticlesRepository,
  ) {}

  getCMS(author: { id: number }) {
    return new ContentManagementSystem(
      this.tagsRepository,
      this.articlesRepository,
      author,
    )
  }

  getView(author?: { id: number }) {
    return new ArticleView(
      this.tagsRepository,
      this.articlesRepository,
      this.authorsService,
      author,
    )
  }
}

export class ArticleView {
  constructor(
    private readonly tagsRepository: TagsRepository,
    private readonly articlesRepository: ArticlesRepository,
    private authorsService: AuthorsService,
    private owner?: { id: number },
  ) {}

  async getArticle(slug: string) {
    const articles = await this.articlesRepository.getArticles({
      filterBySlug: slug,
      owner: this.owner,
    })
    if (articles.length === 0) {
      throw new ArticleNotFound(slug)
    }
    if (articles.length > 1) {
      throw new Error('Multiple articles with the same slug')
    }
    const article = articles[0]
    return await this.addTagsAndAuthorToArticle(article)
  }

  private async addTagsAndAuthorToArticle<
    A extends { id: number; author: { id: number } },
  >(article: A) {
    const tags = await this.tagsRepository.getArticleTags(article)
    const author = await this.authorsService.getAuthorById(article.author.id)
    return { ...article, tags, author }
  }

  async getFeed(pagination?: Pagination) {
    if (!this.owner) {
      return await this.getGlobalFeed(pagination)
    }

    const following = await this.authorsService.getFollowingIds(this.owner)
    if (following.length === 0) {
      return []
    }

    const articles = await this.articlesRepository.getArticles(
      {
        filterByAuthors: following,
      },
      pagination,
    )

    return Promise.all(
      articles.map((article) => this.addTagsAndAuthorToArticle(article)),
    )
  }

  private async getGlobalFeed(pagination?: Pagination) {
    return await this.getArticlesByFilters({}, pagination)
  }

  async getArticlesByFilters(filters: ArticleFilters, pagination?: Pagination) {
    try {
      const articles = await this.articlesRepository.getArticles(
        {
          filterByTags: filters.tags,
          filterByAuthors: filters.author
            ? [await this.authorsService.getAuthorByUsername(filters.author)]
            : undefined,
          owner: this.owner,
        },
        pagination,
      )
      return await Promise.all(
        articles.map((article) => this.addTagsAndAuthorToArticle(article)),
      )
    } catch (error) {
      if (error instanceof AuthorNotFound) {
        return []
      } else {
        throw error
      }
    }
  }
}

/**
 The ContentManagementSystem is responsible for letting only the authors
 change the content.
 **/
export class ContentManagementSystem {
  constructor(
    private readonly tagsRepository: TagsRepository,
    private readonly articlesRepository: ArticlesRepository,
    private owner: { id: number },
  ) {}

  async createArticle(data: Article & Tagged) {
    const slug = slugify(data.title)
    const article = await this.articlesRepository.createArticle(
      { ...data, slug },
      this.owner,
    )
    const tags = await this.tagsRepository.setArticleTags(article, data.tags)
    return { ...article, tags, author: this.owner }
  }

  async updateArticle(slug: string, snapshot: Partial<Article & Tagged>) {
    const article = await this.articlesRepository.updateArticle(
      slug,
      this.owner,
      snapshot,
    )
    const tags = snapshot.tags
      ? await this.tagsRepository.setArticleTags(article, snapshot.tags)
      : await this.tagsRepository.getArticleTags(article)
    return { ...article, tags, author: this.owner }
  }

  async deleteArticle(slug: string): Promise<void> {
    await this.articlesRepository.deleteArticle(slug, this.owner)
  }

  async publishArticle(slug: string) {
    const article = await this.articlesRepository.publishArticle(
      slug,
      this.owner,
    )
    const tags = await this.tagsRepository.getArticleTags(article)
    return { ...article, tags, author: this.owner }
  }

  async unpublishArticle(slug: string) {
    const article = await this.articlesRepository.unpublishArticle(
      slug,
      this.owner,
    )
    const tags = await this.tagsRepository.getArticleTags(article)
    return { ...article, tags, author: this.owner }
  }
}

export class ArticleNotFound extends NotFoundException {
  constructor(slug?: string) {
    super(`Article ${slug} not found`)
    this.name = 'ArticleNotFound'
  }
}
