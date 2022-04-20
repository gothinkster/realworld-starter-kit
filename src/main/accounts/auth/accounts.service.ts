import * as jwt from 'jsonwebtoken'
import { Repository } from 'typeorm'
import { AUDIENCE, TOKEN_PRIVATE_KEY } from '../../constants'
import { InjectAccountRepository } from '../accounts.providers'
import { AccountDTO, AccountResponsePayload } from '../models/accounts.dto'
import { AccountEntity } from '../models/accounts.entity'
import { InvalidCredentialsError } from '../models/accounts.exceptions'

export class AccountsService {
  constructor(
    @InjectAccountRepository()
    private repository: Repository<AccountEntity>,
  ) {}

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
        { account_id: account.getAccountID(), email: account.email },
        TOKEN_PRIVATE_KEY,
        {
          expiresIn: '24h',
          subject: account.getAccountID().toString(),
          issuer: account.getAccountID().toString(),
          audience: AUDIENCE,
        },
      ),
    }
  }
}
