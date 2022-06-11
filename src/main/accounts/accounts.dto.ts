import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator'

export class AccountDTO {
  @ApiProperty({ example: 'me@mail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({ example: 'askljh3#892d1!' })
  @MinLength(8, { message: 'requires at least 8 characters' })
  @MaxLength(32, { message: 'requires at most 32 characters' })
  @Matches(String.raw`[A-Z]`, '', { message: 'requires upper-case characters' })
  @Matches(String.raw`[a-z]`, '', { message: 'requires lower-case characters' })
  @Matches(String.raw`\d`, '', { message: 'requires numbers' })
  @Matches(String.raw`\W`, '', {
    message: 'requires non alpha numeric characters',
  })
  @IsString()
  @IsNotEmpty()
  password: string
}

export class AccountResponseBody {
  @ApiResponseProperty()
  access_token: string
}

export class CreateAccountBody {
  @ApiProperty({ type: AccountDTO })
  @ValidateNested()
  @Type(() => AccountDTO)
  user: AccountDTO
}
