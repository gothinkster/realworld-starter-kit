import { PartialType } from '@nestjs/mapped-types'
import { ApiResponseProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateProfileDTO {
  @IsString()
  @IsNotEmpty()
  username

  @IsString()
  bio: string

  @IsString()
  @IsNotEmpty()
  image: string
}

export class UpdateProfileDTO extends PartialType<CreateProfileDTO>(
  CreateProfileDTO,
) {}

export class ProfileResponseDTO extends CreateProfileDTO {
  @ApiResponseProperty()
  following: boolean
}

export class OwnProfileResponseDTO extends CreateProfileDTO {
  @ApiResponseProperty()
  email: string
}

export class ProfileResponsePayload<T = CreateProfileDTO> {
  @ApiResponseProperty()
  profile: T
}
