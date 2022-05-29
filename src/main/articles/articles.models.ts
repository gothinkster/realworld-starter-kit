export type Dated<T extends {}> = T & {
  readonly createdAt: Date
  readonly updatedAt: Date
}

export type Sluged<T extends {}> = T & {
  readonly slug: string
}

export interface PartialArticleSnapshot {
  title?: string
  description?: string
  body?: string
  tags?: string[]
}

export interface ArticleSnapshot extends PartialArticleSnapshot {
  readonly title: string
  readonly description: string
  readonly body: string
  readonly tags: string[]
}

export interface ReadonlyArticle {
  getSlug(): string
  getAuthorID(): number
  isPublished(): boolean
  createSnapshot(): Dated<Sluged<ArticleSnapshot>>
}

export interface Author {
  getAuthorID(): number
}
