import { Repository } from 'typeorm'
import { ProfileEntity } from '../../persistence/profiles.entity'
import { Author } from '../articles/models'
import { ProfileNotFound } from './exceptions'
import { Account, Profile, ProfileFields } from './models'

export class ProfilesService {
  constructor(private repository: Repository<ProfileEntity>) {}

  async createForAccount(
    account: Account,
    fields: ProfileFields,
  ): Promise<Profile> {
    const profile = await this.repository.create(fields)
    profile.account = account
    await this.repository.save(profile)
    return profile
  }

  async getByAuthor(author: Author): Promise<ProfileEntity> {
    const profile = await this.repository.findOne({
      where: { id: author.id },
    })
    if (!profile) {
      throw new ProfileNotFound(
        `I can't find a profile for author ${author.id}`,
      )
    }
    return profile
  }

  async getByUsername(username: string): Promise<ProfileEntity> {
    const profile = this.repository.findOne({
      where: { username: username },
    })
    if (!profile) {
      throw new ProfileNotFound(
        `I can't find a profile with username ${username}`,
      )
    }
    return profile
  }

  async getByAccount(account: Account): Promise<ProfileEntity> {
    const profile = this.repository.findOne({
      where: { accountId: account.id },
    })
    if (!profile) {
      throw new ProfileNotFound(
        `I can't find a profile with accountId ${account.id}`,
      )
    }
    return profile
  }

  async updateByAccount(
    account: Account,
    fields: ProfileFields,
  ): Promise<ProfileEntity> {
    const profile = await this.getByAccount(account)
    profile.loadData(fields)
    return await this.repository.save(profile)
  }
}
