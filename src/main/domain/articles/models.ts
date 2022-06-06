export type Dated<T extends {}> = T & {
  readonly createdAt: Date
  readonly updatedAt: Date
}

export type Sluged<T extends {}> = T & {
  slug: string
}

export interface ArticleFields {
  title?: string
  description?: string
  body?: string
  tags?: string[]
}

export interface Article {
  title: string
  description: string
  body: string
  tags: string[]
}

export interface Author {
  id: number
}

export interface FullArticle extends Dated<Sluged<Article>> {
  author: Author
}

export interface ArticleFilters {
  tags?: string
  author?: string
  favorited?: boolean
}
