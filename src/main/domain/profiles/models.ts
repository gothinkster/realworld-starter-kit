import { Author } from '../articles/models'

export interface Account {
  id: number
  email?: string
}

export interface ProfileFields {
  username?: string
  bio?: string
  image?: string
}

export interface Profile extends Author {
  username: string
  bio: string
  image: string
  account: Account
  follow(profile: this): Promise<void>
  unfollow(profile: this): Promise<void>
  isFollowing(profile: this): Promise<boolean>
}
