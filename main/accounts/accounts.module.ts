import { Module } from '@nestjs/common'
import { AccountsController } from './accounts.controller'
import { UsersService } from './accounts.service'
import { BasicAuthStrategy } from './basic.auth'

@Module({
  providers: [UsersService, BasicAuthStrategy],
  controllers: [AccountsController],
})
export class AccountsModule {}
