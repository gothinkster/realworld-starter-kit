import { NotFoundException } from '@nestjs/common'

export class AuthorNotFound extends NotFoundException {
  constructor(message: string) {
    super(message)
    this.name = 'AuthorNotFound'
  }
}
