import { UnauthorizedException } from '@nestjs/common'
import {
  AuthGuard,
  PassportStrategy as NestGuardStrategyFor,
} from '@nestjs/passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { AccountEntity } from '../models/account.entity'
import { InvalidCredentialsError } from '../models/exceptions'
import { AccountsService } from './accounts.service'

export class LocalAuthPassport extends NestGuardStrategyFor(LocalStrategy) {
  constructor(private service: AccountsService) {
    super({ usernameField: 'email' })
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

export class BasicAuthGuard extends AuthGuard('local') {}
