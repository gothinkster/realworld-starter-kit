import { Article, Authored, Dated, Sluged, Tagged } from './articles.models'

export type Pagination = {
  skip: number
  take: number
}

export interface ArticleFilters {
  tags?: string[]
  author?: string
  favorited?: boolean
}

type FullArticle = Article & Authored & Sluged & Dated & { id: number }

export interface TagsRepository {
  getArticleTags(article: { id: number }): Promise<string[]>

  setArticleTags(article: { id: number }, tags: string[]): Promise<string[]>
}

export interface ArticlesRepository {
  getArticles(
    options: {
      filterBySlug?: string
      filterByAuthors?: { id: number }[]
      filterByTags?: string[]
      owner?: { id: number }
    },
    pagination?: { take: number; skip: number },
  ): Promise<FullArticle[]>

  createArticle(
    param: {
      description: string
      title: string
      body: string
      slug: string
      tags: string[]
    },
    owner: { id: number },
  ): Promise<FullArticle>

  updateArticle(
    slug: string,
    owner: { id: number },
    snapshot: Partial<Article & Tagged>,
  ): Promise<FullArticle>

  deleteArticle(slug: string, owner: { id: number }): Promise<void>

  publishArticle(slug: string, owner: { id: number }): Promise<FullArticle>

  unpublishArticle(slug: string, owner: { id: number }): Promise<FullArticle>
}
