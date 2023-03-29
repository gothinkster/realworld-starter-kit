import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy as NestGuardStrategyFor } from '@nestjs/passport'
import { BasicStrategy } from 'passport-http'
import { InvalidCredentialsError } from './accounts.exceptions'
import { UsersService } from './accounts.service'
import { AccountEntity } from './accounts.entity'

@Injectable()
export class BasicAuthStrategy extends NestGuardStrategyFor(BasicStrategy) {
  constructor(private readonly usersService: UsersService) {
    super()
  }

  async validate(email, password): Promise<AccountEntity> {
    try {
      return await this.usersService.getUserAccount({
        email,
        password,
      })
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        throw new UnauthorizedException()
      }
      throw error
    }
  }
}
