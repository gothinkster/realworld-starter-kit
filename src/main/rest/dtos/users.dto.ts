import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UserAuthenticationDTO {
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string
}

export class UserRegistrationDTO extends UserAuthenticationDTO {
  @IsNotEmpty()
  @IsString()
  username: string
}

export class UserRequestPayload<T> {
  @IsNotEmpty()
  user: T
}

export class UserDTO {
  token: string
  email: string
  username: string
  bio: string
  image?: string
}

export class UserUpdateDTO {
  @IsEmail()
  email?: string
  @IsString()
  bio?: string
  @IsString()
  image?: string
}

export class UserResponsePayload {
  user: UserDTO
}
