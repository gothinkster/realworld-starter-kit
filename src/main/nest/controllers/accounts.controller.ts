import { Body, Controller, Post, Put, Request, UseGuards } from '@nestjs/common'
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger'
import {
  AccountDTO,
  AccountResponsePayload,
  PartialAccountDTO,
} from '../../accounts/accounts.dto'
import { AccountsService } from '../../accounts/accounts.service'
import { BasicAuthGuard } from '../../accounts/basic.guard'
import { AccountEntity } from '../../persistence/accounts.entity'
import { validateModel } from '../validation/validation.utils'

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
    return this.service.getJWTResponse(req.user)
  }
}
