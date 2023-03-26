import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { DB_URL } from '../constants'
import { AccountEntity } from '../persistence/accounts.entity'
import { ArticleEntity } from '../persistence/article.entity'
import { AuthorEntity, UserFollows } from '../persistence/author.entity'
import { CommentEntity } from '../persistence/comment.entity'
import { Tag } from '../persistence/tag.entity'

export const DATASOURCE_PROVIDER = 'DATASOURCE_PROVIDER'

export const databaseProviders: Provider[] = [
  {
    provide: DATASOURCE_PROVIDER,
    useFactory: () =>
      new DataSource({
        type: 'postgres',
        url: DB_URL,
        entities: [
          AccountEntity,
          ArticleEntity,
          AuthorEntity,
          UserFollows,
          CommentEntity,
          Tag,
        ],
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: true,
      }).initialize(),
  },
]
