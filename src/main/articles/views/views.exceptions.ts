import { NotFoundException } from '@nestjs/common'

export class ArticleNotFound extends NotFoundException {
  constructor(slug: string) {
    super(`Article ${slug} not found`)
    this.name = 'ArticleNotFound'
  }
}
