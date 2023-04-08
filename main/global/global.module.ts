import { Global, Module } from '@nestjs/common'
import { DataSource, EntityManager } from 'typeorm'
import getDataSourceInstance from '../datasource'
import { JWTAuthPassport } from '../nest/jwt.guard'

export { getDataSourceInstance }

@Global()
@Module({
  providers: [
    {
      provide: DataSource,
      useFactory: () => getDataSourceInstance().initialize(),
    },
    {
      provide: EntityManager,
      useFactory: (dataSource: DataSource) => dataSource.manager,
      inject: [DataSource],
    },
    JWTAuthPassport,
  ],
  exports: [JWTAuthPassport, EntityManager],
})
export class GlobalModule {}
