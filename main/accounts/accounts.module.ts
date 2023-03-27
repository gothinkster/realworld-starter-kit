import { Module } from '@nestjs/common'
import { AccountsService } from './accounts.service'
import { BasicAuthStrategy } from './basic.auth'
import { AccountsController } from './accounts.controller'

@Module({
  providers: [AccountsService, BasicAuthStrategy],
  controllers: [AccountsController],
})
export class AccountsModule {}
