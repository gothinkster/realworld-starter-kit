import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { getDataSource } from '../persistence/utils'

export const DATASOURCE_PROVIDER = 'DATASOURCE_PROVIDER'

export const databaseProviders: Provider[] = [
  {
    provide: DATASOURCE_PROVIDER,
    useFactory: () => getDataSource().initialize(),
  },
]
