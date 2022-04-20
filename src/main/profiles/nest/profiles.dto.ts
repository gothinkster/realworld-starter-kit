import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsString } from 'class-validator'
import { PartialProfileSnapshot, ProfileSnapshot } from '../profile.entity'

export class CreateProfileDTO implements ProfileSnapshot {
  @IsString()
  @IsNotEmpty()
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
