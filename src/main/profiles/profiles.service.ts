import { Repository } from 'typeorm'
import { ProfileEntity } from './persistence/profiles.entity'
import { Profile, ProfileSnapshot } from './profiles.models'

export class ProfilesService {
  constructor(private repository: Repository<ProfileEntity>) {}

  async createForAccount(
    account: { id: number },
    snapshot: ProfileSnapshot,
  ): Promise<Profile> {
    const profile = new ProfileEntity(account.id)
    await profile.loadSnapshot(snapshot)
    return profile
  }

  async getProfile(filters: {
    username?: string
    account?: { id: number }
  }): Promise<Profile> {
    if (!filters.username && !filters.account?.id) {
      throw Error('I can only find profiles with at least one filter!')
    }
    if (!!filters.username) {
      return await this.repository.findOne({
        cache: { id: `username=${filters.username}`, milliseconds: 500 },
        where: { username: filters.username },
      })
    }
    if (!!filters.account?.id) {
      return await this.repository.findOne({
        cache: { id: `accountId=${filters.account.id}`, milliseconds: 500 },
        where: { accountId: filters.account.id },
      })
    }
  }
}
