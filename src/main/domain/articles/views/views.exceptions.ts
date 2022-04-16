export class ArticleNotFound extends Error {
  constructor(slug: string) {
    super(`Article ${slug} not found`)
    this.name = 'ArticleNotFound' // (2)
  }
}
