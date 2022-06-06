import { NotFoundException } from '@nestjs/common'

export class ProfileNotFound extends NotFoundException {
  constructor(message: string) {
    super(message)
    this.name = 'ProfileNotFound'
  }
}
