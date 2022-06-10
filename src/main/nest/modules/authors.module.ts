import { Module, Scope } from '@nestjs/common'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { DataSource } from 'typeorm'
import { AuthorsService } from '../../domain/authors/service'
import { AuthorEntity } from '../../persistence/author.entity'
import { AuthorsController } from '../controllers/authors.controller'
import { DATASOURCE_PROVIDER } from '../providers/database.providers'

export const AuthorsServiceProvider: Provider = {
  provide: AuthorsService,
  useFactory: (dataSource: DataSource) =>
    new AuthorsService(dataSource.getRepository(AuthorEntity)),
  inject: [DATASOURCE_PROVIDER],
  scope: Scope.DEFAULT,
}

@Module({
  providers: [AuthorsServiceProvider],
  controllers: [AuthorsController],
  exports: [AuthorsService],
})
export class AuthorsModule {}
