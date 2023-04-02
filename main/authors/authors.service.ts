import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from '../accounts/accounts.controller'
import { AuthorEntity } from './authors.entity'

export interface ProfileFields {
  username?: string
  bio?: string
  image?: string
}

export interface Profile {
  id: number
  username: string
  bio: string
  image: string
  account: User

  follow(profile: this): Promise<void>

  unfollow(profile: this): Promise<void>

  isFollowing(profile: this): Promise<boolean>
}

@Injectable()
export class AuthorsService {
  async getFollowingIds(profile: { id: number }) {
    const following = await AuthorEntity.query(
      `
SELECT authors.id
FROM user_follows
LEFT JOIN authors ON authors.id = user_follows.follows_id
WHERE user_follows.user_id = $1;
`,
      [profile.id],
    )
    return following as { id: number }[]
  }

  async getAuthorById(id: number): Promise<AuthorEntity> {
    const profile = await AuthorEntity.findOne({
      where: { id: id },
    })
    if (!profile) {
      throw new AuthorNotFound(`I can't find a profile with id ${id}`)
    }
    return profile
  }

  async createUserAuthorProfile(
    user: User,
    fields: ProfileFields,
  ): Promise<Profile> {
    return await AuthorEntity.create({
      ...fields,
      accountId: user.id,
    })
      .save()
      .catch((err) => {
        throw new AuthorAlreadyExists(fields.username)
      })
  }

  async getAuthorByUsername(username: string): Promise<AuthorEntity> {
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

  async getUserAuthorProfile(user: User): Promise<AuthorEntity> {
    const profile = await AuthorEntity.createQueryBuilder('profile')
      .select()
      .where({ accountId: user.id })
      .getOne()
    if (!profile) {
      throw new AuthorNotFound(
        `I can't find a profile with accountId ${user.id}`,
      )
    }
    return profile
  }

  async updateUserAuthorProfile(
    user: User,
    fields: ProfileFields,
  ): Promise<AuthorEntity> {
    const profile = await this.getUserAuthorProfile(user)
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
