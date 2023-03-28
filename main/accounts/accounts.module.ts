import { Module } from '@nestjs/common'
import { UsersService } from './accounts.service'
import { BasicAuthStrategy } from './basic.auth'
import { AccountsController } from './accounts.controller'

@Module({
  providers: [UsersService, BasicAuthStrategy],
  controllers: [AccountsController],
})
export class AccountsModule {}
