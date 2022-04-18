import { IsNotEmpty, IsString } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'

export class ProfileCreateDTO {
  @IsString()
  @IsNotEmpty()
  username

  @IsString()
  bio: string

  @IsString()
  @IsNotEmpty()
  image: string
}

export class ProfileUpdateDTO extends PartialType<ProfileCreateDTO>(
  ProfileCreateDTO,
) {}

export class ProfileResponseDTO extends ProfileCreateDTO {
  following: boolean
}

export class OwnProfileResponseDTO extends ProfileCreateDTO {
  email: string
}

export class ProfileResponsePayload<T = ProfileCreateDTO> {
  profile: T
}
