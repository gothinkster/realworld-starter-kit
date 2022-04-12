export class ProfileResponseDTO {
  username: string
  bio: string
  image: string
  following: boolean
}

export class ProfileResponsePayload {
  profile: ProfileResponseDTO
}
