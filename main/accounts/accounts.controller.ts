import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import {
  ApiBasicAuth,
  ApiCreatedResponse,
  ApiProperty,
  ApiResponseProperty,
  ApiTags,
} from '@nestjs/swagger'
import { UsersService } from './accounts.service'
import { BasicAuthGuard } from './basic.guard'
import { validateModel } from '../nest/validation.utils'
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'

export interface User {
  id: number
  email?: string
}

export class UserDTO {
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

export class UserResponseBody {
  @ApiResponseProperty()
  access_token: string
}

export class CreateUserBody {
  @ApiProperty({ type: UserDTO })
  @ValidateNested()
  @Type(() => UserDTO)
  user: UserDTO
}

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private service: UsersService) {}

  @ApiCreatedResponse({
    description: 'When you signup sucesfully',
    type: UserResponseBody,
  })
  @Post('signup')
  async signup(
    @Body(validateModel())
    body: CreateUserBody,
  ): Promise<UserResponseBody> {
    const user = await this.service.createAccount(body.user)
    return this.service.getJWTResponse(user)
  }

  @ApiCreatedResponse({
    description: 'When you login sucesfully',
    type: UserResponseBody,
  })
  @UseGuards(BasicAuthGuard)
  @ApiBasicAuth()
  @Post('login')
  login(@Req() req) {
    return this.service.getJWTResponse(req.user)
  }
}
