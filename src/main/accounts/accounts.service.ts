import { Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { AUDIENCE, TOKEN_PRIVATE_KEY } from '../constants'
import { Account } from '../domain/authors/models'
import { AccountEntity } from '../persistence/accounts.entity'
import { AccountDTO, AccountResponsePayload } from './accounts.dto'
import { InvalidCredentialsError } from './accounts.exceptions'
import { AccountAlreadyExistsException } from './exeptions'

@Injectable()
export class AccountsService {
  async createAccount(user: AccountDTO): Promise<AccountEntity> {
    return await new AccountEntity()
      .changeEmail(user.email)
      .changePassword(user.password)
      .save()
      .catch((err) => {
        console.log(err)
        throw new AccountAlreadyExistsException(user.email)
      })
  }

  async getAccount(user: AccountDTO): Promise<AccountEntity> {
    const account = await AccountEntity.findOne({
      where: { email: user.email },
    })
    if (!account || !account.passwordMatch(user.password)) {
      throw new InvalidCredentialsError()
    }
    return account
  }

  getJWTResponse(account: Account): AccountResponsePayload {
    return {
      access_token: jwt.sign(
        { account_id: account.id, email: account.email },
        TOKEN_PRIVATE_KEY,
        {
          expiresIn: '24h',
          subject: account.id.toString(),
          issuer: account.id.toString(),
          audience: AUDIENCE,
        },
      ),
    }
  }
}
