import { PartialType } from '@nestjs/mapped-types'

export class ProfilesCreateDTO {}
export class ProfilesUpdateDTO extends PartialType(ProfilesCreateDTO) {}

export class ProfileResponseDTO {
  username: string
  bio: string
  image: string
  following: boolean
}

export class ProfileResponsePayload {
  profile: ProfileResponseDTO
}
