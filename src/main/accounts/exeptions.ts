import { HttpException, HttpStatus } from '@nestjs/common'

export class AccountAlreadyExistsException extends HttpException {
  constructor(email) {
    super(`Account with email ${email} already exist!`, HttpStatus.CONFLICT)
    this.name = 'AccountAlreadyExistsException'
  }
}
