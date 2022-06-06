import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { Profile, ProfileFields } from '../../domain/profiles/models'

export class CreateProfileDTO implements ProfileFields {
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
  implements ProfileFields {}

export interface ProfileResponseDTO extends ProfileFields {
  username: string
  bio: string
  image: string
  email: string
  following?: boolean
}

export function cloneProfileToOutput(
  profile: Profile,
  email?: string,
  following: boolean = false,
): ProfileResponseDTO {
  return {
    username: profile.username,
    bio: profile.bio,
    image: profile.image,
    email: email,
    following: following,
  }
}
