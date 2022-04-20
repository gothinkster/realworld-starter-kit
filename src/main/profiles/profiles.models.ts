import { Author } from '../articles/views/views.models'

export interface ReadonlyProfile extends Author {
  username: string
  bio: string
  image: string
  following(profile: this): Promise<boolean>
  createSnapshot(): ProfileSnapshot
}

export interface Profile extends ReadonlyProfile {
  follow(profile: this): Promise<void>
  unfollow(profile: this): Promise<void>
  loadSnapshot(snapshot: ProfileSnapshot): Promise<this>
  loadPartialSnapshot(snapshot: PartialProfileSnapshot): Promise<this>
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
