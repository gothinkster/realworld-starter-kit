import { Module } from '@nestjs/common'
import { AccountsService } from '../../accounts/accounts.service'
import { BasicAuthStrategy } from '../../accounts/basic.auth'
import { AccountsController } from '../controllers/accounts.controller'
import { AccountRepository } from '../providers/accounts.providers'

@Module({
  providers: [AccountRepository, AccountsService, BasicAuthStrategy],
  controllers: [AccountsController],
})
export class AccountsModule {}
