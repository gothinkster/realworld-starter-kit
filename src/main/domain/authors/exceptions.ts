import { HttpException, HttpStatus } from '@nestjs/common'

export class AuthorNotFound extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND)
    this.name = 'AuthorNotFound'
  }
}

export class AuthorAlreadyExists extends HttpException {
  constructor(username: string) {
    super(
      `Author with username ${username} already exist!`,
      HttpStatus.CONFLICT,
    )
    this.name = 'ArticleAlreadyExists'
  }
}
