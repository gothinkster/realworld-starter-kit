import {
  Controller,
  Post,
  Put,
  Patch,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common'
import {
  AccountDTO,
  AccountResponsePayload,
  PartialAccountDTO,
} from './models/account.dtos'
import { validateModel } from '../utils/validation.utils'
import { createTokenForAccount } from './models/token'
import { AccountsService } from './auth/accounts.service'
import { AccountEntity } from './models/account.entity'
import { BasicAuthGuard } from './auth/local.auth'

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
  @Put('signup')
  @Patch('signup')
  async update(
    @Request() req: { user: AccountEntity },
    @Body('user', validateModel()) user: PartialAccountDTO,
  ) {
    await req.user.changeEmail(user.email).changePassword(user.password).save()
  }

  @UseGuards(BasicAuthGuard)
  @Post('login')
  login(@Request() req: { user: AccountEntity }): AccountResponsePayload {
    return AccountsController.createResponsePayload(req.user)
  }
}
