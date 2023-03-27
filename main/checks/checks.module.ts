import { Module } from '@nestjs/common'
import { ChecksController } from './checks.controller'

@Module({
  controllers: [ChecksController],
})
export class ChecksModule {}
