import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBasicAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { AccountResponseBody, CreateAccountBody } from './accounts.dto'
import { AccountsService } from './accounts.service'
import { BasicAuthGuard } from './basic.guard'
import { Account } from '../authors/models'
import { InjectAccount } from './account.decorator'
import { validateModel } from '../nest/validation.utils'

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private service: AccountsService) {}

  @ApiCreatedResponse({
    description: 'When you signup sucesfully',
    type: AccountResponseBody,
  })
  @Post('signup')
  async signup(
    @Body(validateModel())
    body: CreateAccountBody,
  ): Promise<AccountResponseBody> {
    const account = await this.service.createAccount(body.user)
    return this.service.getJWTResponse(account)
  }

  @ApiCreatedResponse({
    description: 'When you login sucesfully',
    type: AccountResponseBody,
  })
  @UseGuards(BasicAuthGuard)
  @ApiBasicAuth()
  @Post('login')
  login(@InjectAccount() account: Account): AccountResponseBody {
    return this.service.getJWTResponse(account)
  }
}
