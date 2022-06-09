import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { Account, Profile, ProfileFields } from '../domain/profiles/models'
import { ArticleEntity } from './article.entity'
import { CommentEntity } from './comment.entity'

@Entity({ name: 'Profile' })
export class ProfileEntity implements Profile {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column({ type: 'text', nullable: true })
  bio: string

  @Column({ type: 'text', nullable: true })
  image: string

  @Column({ nullable: false })
  accountId: number

  @OneToMany(() => CommentEntity, (comment) => comment.author)
  comments: CommentEntity[]

  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: ArticleEntity[]

  get account(): Account {
    return { id: this.accountId }
  }

  set account(account: Account) {
    this.accountId = account.id
  }

  async isFollowing(profile: this): Promise<boolean> {
    return await Following.exists(this, profile)
  }

  async follow(profile: this): Promise<void> {
    await Following.set(this, profile)
  }

  async unfollow(profile: this): Promise<void> {
    await Following.unset(this, profile)
  }

  loadData(fields: ProfileFields) {
    this.username = fields.username || this.username
    this.bio = fields.bio || this.bio
    this.image = fields.image || this.image
    return this
  }
}

@Unique(['userId', 'followsId'])
@Entity()
export class Following extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ nullable: false, type: 'bigint' })
  public userId: number
  @Column({ nullable: false, type: 'bigint' })
  public followsId: number

  public static async exists(
    user: ProfileEntity,
    follows: ProfileEntity,
  ): Promise<boolean> {
    const following = await Following.get(user, follows)
    return !!following
  }

  private static async get(
    user: ProfileEntity,
    follows: ProfileEntity,
  ): Promise<Following> {
    return await Following.createQueryBuilder()
      .where({ userId: user.id, followsId: follows })
      .getOne()
  }

  public static async set(
    user: ProfileEntity,
    follows: ProfileEntity,
  ): Promise<void> {
    await Following.createQueryBuilder()
      .insert()
      .values({ userId: user.id, followsId: follows.id })
      .orIgnore()
      .execute()
  }

  public static async unset(
    user: ProfileEntity,
    follows: ProfileEntity,
  ): Promise<void> {
    await Following.createQueryBuilder()
      .delete()
      .where({ userId: user.id, followsId: follows.id })
      .execute()
  }
}
