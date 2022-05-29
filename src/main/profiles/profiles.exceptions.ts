import { NotFoundException } from '@nestjs/common'

export class ProfileNotFound extends NotFoundException {
  constructor(filters: { username?: string; account?: { id: number } }) {
    let message = ''
    if (!!filters.username) {
      message = `Profile with username=${filters.username} doesn't exist.`
    }
    if (!!filters.account?.id) {
      message = `Profile with accountId=${filters.account.id} doesn't exist.`
    }
    super(message)
    this.name = 'ProfileNotFound'
  }
}
