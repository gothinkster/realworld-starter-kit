import { Author } from '../articles/models'
import { User } from '../accounts/accounts.controller'

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
