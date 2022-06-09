import * as jwt from 'jsonwebtoken'
import { Repository } from 'typeorm'
import { AUDIENCE, TOKEN_PRIVATE_KEY } from '../constants'
import { AccountEntity } from '../persistence/accounts.entity'
import { AccountDTO, AccountResponsePayload } from './accounts.dto'
import { InvalidCredentialsError } from './accounts.exceptions'

export class AccountsService {
  constructor(private repository: Repository<AccountEntity>) {}

  async createAccount(user: AccountDTO): Promise<AccountEntity> {
    const account = new AccountEntity(user.email, user.password)
    await this.repository.save(account)
    return account
  }

  async getAccount(user: AccountDTO): Promise<AccountEntity> {
    const account: AccountEntity = await this.repository.findOneBy({
      email: user.email,
    })
    if (!account || !account.passwordMatch(user.password)) {
      throw new InvalidCredentialsError()
    }
    return account
  }

  getJWTResponse(account: AccountEntity): AccountResponsePayload {
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
