import { Module } from '@nestjs/common'
import { AuthorsController } from './authors.controller'
import { AuthorsService } from './authors.service'

@Module({
  providers: [AuthorsService],
  controllers: [AuthorsController],
  exports: [AuthorsService],
})
export class AuthorsModule {}
