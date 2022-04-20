import { Body, Controller, Post, Put, Request, UseGuards } from '@nestjs/common'
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger'
import { validateModel } from '../utils/validation.utils'
import { AccountsService } from './auth/accounts.service'
import { BasicAuthGuard } from './auth/basic.guard'
import {
  AccountDTO,
  AccountResponsePayload,
  PartialAccountDTO,
} from './models/accounts.dto'
import { AccountEntity } from './models/accounts.entity'
import { createTokenForAccount } from './models/token.factory'

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private service: AccountsService) {}

  private static createResponsePayload(
    account: AccountEntity,
  ): AccountResponsePayload {
    return {
      access_token: createTokenForAccount(account),
    }
  }

  @Post('signup')
  async signup(
    @Body('user', validateModel())
    user: AccountDTO,
  ): Promise<AccountResponsePayload> {
    const account = await this.service.createAccount(user)
    return AccountsController.createResponsePayload(account)
  }

  @UseGuards(BasicAuthGuard)
  @ApiBasicAuth()
  @Put('signup')
  async update(
    @Request() req: { user: AccountEntity },
    @Body('user', validateModel()) user: PartialAccountDTO,
  ) {
    await req.user.changeEmail(user.email).changePassword(user.password).save()
  }

  @UseGuards(BasicAuthGuard)
  @ApiBasicAuth()
  @Post('login')
  login(@Request() req: { user: AccountEntity }): AccountResponsePayload {
    return AccountsController.createResponsePayload(req.user)
  }
}
