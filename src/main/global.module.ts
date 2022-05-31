import { Global, Module } from '@nestjs/common'
import { databaseProviders } from './database.providers'
import { JWTAuthPassport } from './utils/jwt.strategy'

@Global()
@Module({
  providers: [...databaseProviders, JWTAuthPassport],
  exports: [...databaseProviders, JWTAuthPassport],
})
export class GlobalModule {}
