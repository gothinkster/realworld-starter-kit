import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'

export class CreateAccountDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @MinLength(8, { message: 'requires at least 8 characters' })
  @MaxLength(32, { message: 'requires at most 32 characters' })
  @Matches('[A-Z]', '', { message: 'requires upper-case characters' })
  @Matches('[a-z]', '', { message: 'requires lower-case characters' })
  @Matches('\\d', '', { message: 'requires numbers' })
  @Matches('\\W', '', { message: 'requires non alpha numeric characters' })
  @IsString()
  @IsNotEmpty()
  password: string
}

export class UpdateAccountDTO extends PartialType<CreateAccountDTO>(
  CreateAccountDTO,
) {}

export class AccountRequestPayload<T> {
  @ValidateNested()
  @IsNotEmpty()
  user: T
}

export class AccountResponsePayload {
  user: { email: string; token: string }
}
