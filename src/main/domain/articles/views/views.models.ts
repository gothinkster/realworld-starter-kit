export interface ReadonlyArticle {
  readonly title: string
  readonly description: string
  readonly body: string
  readonly createdAt: Date
  readonly updatedAt: Date
  getTags(): string[]
  getSlug(): string
  getAuthorID(): number
  isPublished(): boolean
}
