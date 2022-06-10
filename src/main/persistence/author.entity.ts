import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { Account, Profile, ProfileFields } from '../domain/authors/models'
import { ArticleEntity } from './article.entity'
import { CommentEntity } from './comment.entity'

@Entity({ name: 'authors' })
export class AuthorEntity extends BaseEntity implements Profile {
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
    return await UserFollows.exists(this, profile)
  }

  async follow(profile: this): Promise<void> {
    await UserFollows.set(this, profile)
  }

  async unfollow(profile: this): Promise<void> {
    await UserFollows.unset(this, profile)
  }

  loadData(fields: ProfileFields) {
    this.username = fields.username || this.username
    this.bio = fields.bio || this.bio
    this.image = fields.image || this.image
    return this
  }
}

@Unique(['userId', 'followsId'])
@Entity({ name: 'user_follows' })
export class UserFollows extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ nullable: false, type: 'bigint' })
  public userId: number
  @Column({ nullable: false, type: 'bigint' })
  public followsId: number

  public static async exists(
    user: AuthorEntity,
    follows: AuthorEntity,
  ): Promise<boolean> {
    const following = await UserFollows.get(user, follows)
    return !!following
  }

  private static async get(
    user: AuthorEntity,
    follows: AuthorEntity,
  ): Promise<UserFollows> {
    return await UserFollows.createQueryBuilder()
      .where({ userId: user.id, followsId: follows })
      .getOne()
  }

  public static async set(
    user: AuthorEntity,
    follows: AuthorEntity,
  ): Promise<void> {
    await UserFollows.createQueryBuilder()
      .insert()
      .values({ userId: user.id, followsId: follows.id })
      .orIgnore()
      .execute()
  }

  public static async unset(
    user: AuthorEntity,
    follows: AuthorEntity,
  ): Promise<void> {
    await UserFollows.createQueryBuilder()
      .delete()
      .where({ userId: user.id, followsId: follows.id })
      .execute()
  }
}
