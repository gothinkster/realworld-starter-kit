import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException, Dependencies } from '@nestjs/common'
import { AccountsService } from './accounts.service'
import { InvalidCredentialsError } from '../models/exceptions'
import { AccountEntity } from '../models/account.entity'

@Injectable()
@Dependencies(AccountsService)
export class LocalStrategy extends PassportStrategy(Strategy) {
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
