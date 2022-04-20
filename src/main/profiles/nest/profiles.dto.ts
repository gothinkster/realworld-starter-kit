import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { PartialProfileSnapshot, ProfileSnapshot } from '../profiles.models'

export class CreateProfileDTO implements ProfileSnapshot {
  @IsString()
  @IsNotEmpty()
  @Matches(String.raw`^[A-Za-z0-9\-\_]*$`, '', {
    message:
      'The username should contain only letters, numbers, traces and underscores.',
  })
  username: string

  @IsString()
  bio: string

  @IsString()
  @IsNotEmpty()
  image: string
}

export class UpdateProfileDTO
  extends PartialType<CreateProfileDTO>(CreateProfileDTO)
  implements PartialProfileSnapshot {}

export interface OtherProfileResponse extends ProfileSnapshot {
  following?: boolean
}

export interface OwnProfileResponse extends ProfileSnapshot {
  email: string
}

export interface ProfileResponsePayload<T = ProfileSnapshot> {
  profile: T
}
