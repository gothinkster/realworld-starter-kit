import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { User } from '../accounts/accounts.controller'
import { Profile, ProfileFields } from './authors.service'

@Entity({ name: 'authors' })
export class AuthorEntity extends BaseEntity implements Profile {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  username!: string

  @Column({ type: 'text', nullable: true })
  bio!: string

  @Column({ type: 'text', nullable: true })
  image!: string

  @Column({ nullable: false, type: 'integer' })
  public accountId!: number

  get account(): User {
    return { id: this.accountId }
  }

  set account(account: User) {
    this.accountId = account.id
  }

  async isFollowing(profile: this): Promise<boolean> {
    return await UserFollows.exists(this, profile)
  }

  async follow(profile: this): Promise<void> {
    await UserFollows.set(this, profile)
  }

  async unfollow(profile: this): Promise<void> {
    await UserFollows.unset(this, profile)
  }

  loadData(fields: Partial<ProfileFields>) {
    this.username = fields.username ?? this.username
    this.bio = fields.bio ?? this.bio
    this.image = fields.image ?? this.image
    return this
  }
}

@Unique(['userId', 'followsId'])
@Entity({ name: 'user_follows' })
export class UserFollows extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false, type: 'integer' })
  public userId!: number

  @Column({ nullable: false, type: 'integer' })
  public followsId!: number

  public static async exists(
    user: AuthorEntity,
    follows: AuthorEntity,
  ): Promise<boolean> {
    const following = await UserFollows.get(user, follows)
    return !!following
  }

  private static async get(user: AuthorEntity, follows: AuthorEntity) {
    return await UserFollows.createQueryBuilder()
      .where({ userId: user.id, followsId: follows })
      .getOne()
  }

  public static async set(user: AuthorEntity, follows: AuthorEntity) {
    await UserFollows.createQueryBuilder()
      .insert()
      .values({ userId: user.id, followsId: follows.id })
      .orIgnore()
      .execute()
  }

  public static async unset(user: AuthorEntity, follows: AuthorEntity) {
    await UserFollows.createQueryBuilder()
      .delete()
      .where({ userId: user.id, followsId: follows.id })
      .execute()
  }
}
