import { Inject, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy as NestGuardStrategyFor } from '@nestjs/passport'
import { BasicStrategy } from 'passport-http'
import { InvalidCredentialsError } from './accounts.exceptions'
import { UsersService } from './accounts.service'
import { AccountEntity } from './accounts.entity'

export class BasicAuthStrategy extends NestGuardStrategyFor(BasicStrategy) {
  constructor(@Inject(UsersService) private service: UsersService) {
    super()
  }

  async validate(email, password): Promise<AccountEntity> {
    try {
      return await this.service.getAccount({ email: email, password: password })
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        throw new UnauthorizedException()
      }
      throw error
    }
  }
}
