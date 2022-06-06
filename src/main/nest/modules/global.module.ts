import { Global, Module } from '@nestjs/common'
import { databaseProviders } from '../providers/database.providers'
import { JWTAuthPassport } from '../security/jwt.strategy'

@Global()
@Module({
  providers: [...databaseProviders, JWTAuthPassport],
  exports: [...databaseProviders, JWTAuthPassport],
})
export class GlobalModule {}
