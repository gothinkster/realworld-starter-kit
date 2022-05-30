import { Module } from '@nestjs/common'
import { AccountsController } from './accounts.controller'
import { AccountRepository } from './accounts.providers'
import { AccountsService } from './auth/accounts.service'
import { BasicAuthStrategy } from './auth/basic.auth'

@Module({
  providers: [AccountRepository, AccountsService, BasicAuthStrategy],
  controllers: [AccountsController],
})
export class AccountsModule {}
