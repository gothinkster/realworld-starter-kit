import { Module } from '@nestjs/common'
import { AuthorsService } from './service'
import { AuthorsController } from './authors.controller'

@Module({
  providers: [AuthorsService],
  controllers: [AuthorsController],
  exports: [AuthorsService],
})
export class AuthorsModule {}
