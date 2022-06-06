import { Inject, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy as NestGuardStrategyFor } from '@nestjs/passport'
import { BasicStrategy } from 'passport-http'
import { AccountEntity } from '../persistence/accounts.entity'
import { InvalidCredentialsError } from './accounts.exceptions'
import { AccountsService } from './accounts.service'

export class BasicAuthStrategy extends NestGuardStrategyFor(BasicStrategy) {
  constructor(@Inject(AccountsService) private service: AccountsService) {
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
