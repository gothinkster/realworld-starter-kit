import { Repository } from 'typeorm'
import { AuthorEntity } from '../../persistence/author.entity'
import { AuthorNotFound } from './exceptions'
import { Account, Profile, ProfileFields } from './models'

export class AuthorsService {
  constructor(private authorsRepository: Repository<AuthorEntity>) {}

  async createForAccount(
    account: Account,
    fields: ProfileFields,
  ): Promise<Profile> {
    const author = await this.authorsRepository.create({
      ...fields,
      accountId: account.id,
    })
    await this.authorsRepository.save(author)
    return author
  }

  async getByUsername(username: string): Promise<AuthorEntity> {
    const profile = this.authorsRepository.findOne({
      where: { username: username },
    })
    if (!profile) {
      throw new AuthorNotFound(
        `I can't find a profile with username ${username}`,
      )
    }
    return profile
  }

  async getByAccount(account: Account): Promise<AuthorEntity> {
    const profile = this.authorsRepository
      .createQueryBuilder('profile')
      .select()
      .where({ accountId: account.id })
      .getOne()
    if (!profile) {
      throw new AuthorNotFound(
        `I can't find a profile with accountId ${account.id}`,
      )
    }
    return profile
  }

  async updateByAccount(
    account: Account,
    fields: ProfileFields,
  ): Promise<AuthorEntity> {
    const profile = await this.getByAccount(account)
    profile.loadData(fields)
    return await this.authorsRepository.save(profile)
  }
}
