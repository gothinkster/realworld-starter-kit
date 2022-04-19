import { Inject } from '@nestjs/common'
import { Repository } from 'typeorm'
import { AccountDTO } from '../models/account.dto'
import { AccountEntity } from '../models/account.entity'
import { InvalidCredentialsError } from '../models/exceptions'

export const AccountRepositoryToken = 'AccountRepository'

export class AccountsService {
  constructor(
    @Inject(AccountRepositoryToken)
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
}
