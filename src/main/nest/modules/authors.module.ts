import { Module } from '@nestjs/common'
import { AuthorsService } from '../../domain/authors/service'
import { AuthorsController } from '../controllers/authors.controller'

@Module({
  providers: [AuthorsService],
  controllers: [AuthorsController],
  exports: [AuthorsService],
})
export class AuthorsModule {}
