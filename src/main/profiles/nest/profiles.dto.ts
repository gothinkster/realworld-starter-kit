import { IsNotEmpty, IsString } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'

class ProfileCreateDTO {
  @IsString()
  @IsNotEmpty()
  username

  @IsString()
  bio: string

  @IsString()
  @IsNotEmpty()
  image: string
}

class ProfileUpdateDTO extends PartialType<ProfileCreateDTO>(
  ProfileCreateDTO,
) {}

export class ProfileCreatePayload {
  profile: ProfileCreateDTO
}

export class ProfileUpdatePayload {
  profile: ProfileUpdateDTO
}

export class ProfileResponseDTO extends ProfileCreateDTO {
  following: boolean
}

export class OwnProfileResponseDTO extends ProfileCreateDTO {
  email: string
}

export class ProfileResponsePayload<T = ProfileCreateDTO> {
  profile: T
}
