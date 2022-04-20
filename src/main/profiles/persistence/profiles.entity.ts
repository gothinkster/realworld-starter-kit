import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import {
  PartialProfileSnapshot,
  Profile,
  ProfileSnapshot,
} from '../profiles.models'

@Entity({ name: 'Profile' })
export class ProfileEntity extends BaseEntity implements Profile {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column({ type: 'text' })
  bio: string

  @Column({ type: 'text' })
  image: string

  @Column({ unique: true })
  accountId: number

  constructor(accountId: number) {
    super()
    this.accountId = accountId
  }

  async following(profile: this): Promise<boolean> {
    const followingRelation = await FollowersRelation.findOneBy({
      followerId: this.id,
      followedId: profile.id,
    })
    return !!followingRelation
  }

  async follow(profile: this): Promise<void> {
    const followingRelation = new FollowersRelation()
    followingRelation.followerId = this.id
    followingRelation.followedId = profile.id
    await followingRelation.save()
  }

  async unfollow(profile: this): Promise<void> {
    const followingRelation = await FollowersRelation.findOneByOrFail({
      followerId: this.id,
      followedId: profile.id,
    })
    await followingRelation.remove()
  }

  createSnapshot(): ProfileSnapshot {
    return {
      username: this.username,
      bio: this.bio,
      image: this.image,
    }
  }

  async loadSnapshot(snapshot: ProfileSnapshot): Promise<this> {
    this.username = snapshot.username
    this.bio = snapshot.bio
    this.image = snapshot.image
    await this.save()
    return this
  }

  async loadPartialSnapshot(snapshot: PartialProfileSnapshot): Promise<this> {
    this.username = snapshot.username ?? this.username
    this.bio = snapshot.bio ?? this.bio
    this.image = snapshot.image ?? this.image
    await this.save()
    return this
  }

  getAuthorID(): number {
    return this.id
  }
}

@Unique(['followedId', 'followerId'])
@Entity({ name: 'Followers' })
export class FollowersRelation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'integer' })
  public followedId: number
  @Column({ type: 'integer' })
  public followerId: number
}
