import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger'
import { Account } from '../domain/authors/models'
import { InjectAccount } from '../nest/decorators/account.decorator'
import { validateModel } from '../nest/validation/validation.utils'
import { AccountDTO, AccountResponsePayload } from './accounts.dto'
import { AccountsService } from './accounts.service'
import { BasicAuthGuard } from './basic.guard'

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private service: AccountsService) {}

  @Post('signup')
  async signup(
    @Body('user', validateModel())
    user: AccountDTO,
  ): Promise<AccountResponsePayload> {
    const account = await this.service.createAccount(user)
    return this.service.getJWTResponse(account)
  }

  @UseGuards(BasicAuthGuard)
  @ApiBasicAuth()
  @Post('login')
  login(@InjectAccount() account: Account): AccountResponsePayload {
    return this.service.getJWTResponse(account)
  }
}
