import { Module } from '@nestjs/common'
import { GlobalModule } from '../global.module'
import { AccountsController } from './accounts.controller'
import { AccountRepository } from './accounts.providers'
import { AccountsService } from './auth/accounts.service'
import { BasicAuthStrategy } from './auth/basic.auth'

@Module({
  imports: [GlobalModule],
  providers: [AccountRepository, AccountsService, BasicAuthStrategy],
  controllers: [AccountsController],
})
export class AccountsModule {}
