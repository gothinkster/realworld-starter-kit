import { Controller, Post, Put, Patch, Body, Inject } from '@nestjs/common'
import {
  CreateAccountDTO,
  AccountRequestPayload,
  AccountResponsePayload,
  UpdateAccountDTO,
} from './dto'
import { validateModel } from '../utils/validation.utils'
import { AccountEntity } from './entity'
import { Repository } from 'typeorm'
import { InvalidCredentialsError } from './exceptions'
import { createTokenForAccount } from './jwt'

export const AccountRepositoryToken = 'AccountRepository'

@Controller('accounts')
export class AccountsController {
  constructor(
    @Inject(AccountRepositoryToken)
    private repository: Repository<AccountEntity>,
  ) {}

  @Post('signup')
  async signup(
    @Body(validateModel())
    userRegistration: AccountRequestPayload<CreateAccountDTO>,
  ): Promise<AccountResponsePayload> {
    const user = userRegistration.user
    const account = new AccountEntity(user.email, user.password)
    await this.repository.save(account)
    return {
      user: { email: account.email, token: createTokenForAccount(account) },
    }
  }

  @Put('signup')
  @Patch('signup')
  update(
    @Body(validateModel()) userUpdate: AccountRequestPayload<UpdateAccountDTO>,
  ) {
    return undefined
  }

  @Post('login')
  async login(
    @Body(validateModel())
    userAuthentication: AccountRequestPayload<CreateAccountDTO>,
  ): Promise<AccountResponsePayload> {
    const user = userAuthentication.user
    const account: AccountEntity = await this.repository.findOneBy({
      email: user.email,
    })
    if (!account.passwordMatch(user.password)) {
      throw new InvalidCredentialsError()
    }
    return {
      user: { email: account.email, token: createTokenForAccount(account) },
    }
  }
}
