import { Repository } from 'typeorm'
import { InjectAccountRepository } from '../accounts.providers'
import { AccountDTO } from '../models/accounts.dto'
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
}
