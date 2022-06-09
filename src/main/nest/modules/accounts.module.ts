import { Module, Scope } from '@nestjs/common'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { DataSource } from 'typeorm'
import { AccountsService } from '../../accounts/accounts.service'
import { BasicAuthStrategy } from '../../accounts/basic.auth'
import { AccountEntity } from '../../persistence/accounts.entity'
import { AccountsController } from '../controllers/accounts.controller'
import { DATASOURCE_PROVIDER } from '../providers/database.providers'

const AccountsServiceProvider: Provider = {
  provide: AccountsService,
  useFactory: (dataSource: DataSource) =>
    new AccountsService(dataSource.getRepository(AccountEntity)),
  inject: [DATASOURCE_PROVIDER],
  scope: Scope.DEFAULT,
}

@Module({
  providers: [AccountsServiceProvider, BasicAuthStrategy],
  controllers: [AccountsController],
})
export class AccountsModule {}
