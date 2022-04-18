import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { AccountEntity } from '../models/account.entity'
import { InvalidCredentialsError } from '../models/exceptions'
import { AccountDTO } from '../models/account.dtos'

export const AccountRepositoryToken = 'AccountRepository'
@Injectable()
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
