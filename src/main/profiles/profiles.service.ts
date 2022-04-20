import { Repository } from 'typeorm'
import { Profile } from './profile.entity'

export class ProfilesService {
  constructor(private repository: Repository<Profile>) {}

  async getProfile(filters: {
    username?: string
    accountId?: number
  }): Promise<Profile> {
    if (!filters.username && !filters.accountId) {
      throw Error('I can only find profiles with at least one filter!')
    }
    if (!!filters.username) {
      return await this.repository.findOne({
        cache: { id: `username=${filters.username}`, milliseconds: 500 },
        where: { username: filters.username },
      })
    }
    if (!!filters.accountId) {
      return await this.repository.findOne({
        cache: { id: `accountId=${filters.accountId}`, milliseconds: 500 },
        where: { accountId: filters.accountId },
      })
    }
  }
}
