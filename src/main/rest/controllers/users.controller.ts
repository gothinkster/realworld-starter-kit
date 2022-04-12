import { Controller, Get, Post, Put, Patch, Body } from '@nestjs/common'
import {
  UserAuthenticationDTO,
  UserRegistrationDTO,
  UserRequestPayload,
  UserResponsePayload,
  UserUpdateDTO,
} from '../dtos/users.dto'
import { validateModel } from '../functions.utils'

@Controller('users')
export class UsersController {
  @Post('login')
  authenticate(
    @Body(validateModel())
    userAuthentication: UserRequestPayload<UserAuthenticationDTO>,
  ): UserResponsePayload {
    return undefined
  }

  @Post()
  registrate(
    @Body(validateModel())
    userRegistration: UserRequestPayload<UserRegistrationDTO>,
  ): UserResponsePayload {
    return undefined
  }
}

@Controller('user')
export class UserController {
  @Get()
  getCurrent(): UserResponsePayload {
    return undefined
  }

  @Patch
  @Put()
  update(
    @Body(validateModel()) userUpdate: UserRequestPayload<UserUpdateDTO>,
  ): UserResponsePayload {
    return undefined
  }
}
