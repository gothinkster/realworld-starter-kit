import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'

@Entity({ name: 'Profile' })
export class Profile extends BaseEntity {
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

  async following(profile: Profile): Promise<boolean> {
    const followingRelation = await Followers.findOneBy({
      followerId: this.id,
      followedId: profile.id,
    })
    return !!followingRelation
  }

  async follow(profile: Profile): Promise<void> {
    const followingRelation = new Followers()
    followingRelation.followerId = this.id
    followingRelation.followedId = profile.id
    await followingRelation.save()
  }

  async unfollow(profile: Profile): Promise<void> {
    const followingRelation = await Followers.findOneByOrFail({
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

  loadSnapshot(snapshot: PartialProfileSnapshot): this {
    this.username = snapshot.username ?? this.username
    this.bio = snapshot.bio ?? this.bio
    this.image = snapshot.image ?? this.image
    return this
  }
}

@Unique(['followedId', 'followerId'])
@Entity({ name: 'Followers' })
class Followers extends BaseEntity {
  @PrimaryGeneratedColumn()
  private id: number
  public followedId: number
  public followerId: number
}

export interface PartialProfileSnapshot {
  username?: string
  bio?: string
  image?: string
}

export interface ProfileSnapshot extends PartialProfileSnapshot {
  username: string
  bio: string
  image: string
}
