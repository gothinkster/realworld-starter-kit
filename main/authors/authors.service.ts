import { HttpException, HttpStatus } from '@nestjs/common'
import { User } from '../accounts/accounts.controller'
import { AuthorEntity } from './authors.entity'
import { Author } from '../articles/articles.service'

export interface ProfileFields {
  username?: string
  bio?: string
  image?: string
}

export interface Profile extends Author {
  username: string
  bio: string
  image: string
  account: User

  follow(profile: this): Promise<void>

  unfollow(profile: this): Promise<void>

  isFollowing(profile: this): Promise<boolean>
}

export type Authored<T extends {}> = T & {
  author: Profile
}

export class AuthorsService {
  async createForAccount(
    account: User,
    fields: ProfileFields,
  ): Promise<Profile> {
    return await AuthorEntity.create({
      ...fields,
      accountId: account.id,
    })
      .save()
      .catch((err) => {
        throw new AuthorAlreadyExists(fields.username)
      })
  }

  async getByUsername(username: string): Promise<AuthorEntity> {
    const profile = await AuthorEntity.findOne({
      where: { username: username },
    })
    if (!profile) {
      throw new AuthorNotFound(
        `I can't find a profile with username ${username}`,
      )
    }
    return profile
  }

  async getByAccount(account: User): Promise<AuthorEntity> {
    const profile = await AuthorEntity.createQueryBuilder('profile')
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
    account: User,
    fields: ProfileFields,
  ): Promise<AuthorEntity> {
    const profile = await this.getByAccount(account)
    return await profile.loadData(fields).save()
  }
}

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
