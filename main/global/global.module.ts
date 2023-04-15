import { Global, Module } from '@nestjs/common'
import { DataSource, EntityManager } from 'typeorm'
import { createDataSourceInstance } from '../datasource'
import { JWTAuthPassport } from '../nest/jwt.guard'

@Global()
@Module({
  providers: [
    {
      provide: DataSource,
      useFactory: () => createDataSourceInstance().initialize(),
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
