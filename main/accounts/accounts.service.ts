import { Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { AccountDTO, AccountResponseBody } from './accounts.dto'
import { InvalidCredentialsError } from './accounts.exceptions'
import { AccountAlreadyExistsException } from './exeptions'
import { Account } from '../authors/models'
import { AccountEntity } from './accounts.entity'
import { AUDIENCE, TOKEN_PRIVATE_KEY } from '../global/constants'

@Injectable()
export class AccountsService {
  async createAccount(user: AccountDTO): Promise<AccountEntity> {
    return await new AccountEntity()
      .changeEmail(user.email)
      .changePassword(user.password)
      .save()
      .catch((err) => {
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

  getJWTResponse(account: Account): AccountResponseBody {
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
