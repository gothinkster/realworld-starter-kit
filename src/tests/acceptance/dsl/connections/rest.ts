import { Test, TestingModule } from '@nestjs/testing'
import { Axios } from 'axios'
import { AppModules } from '../../../../main/nest/app.modules'
import { DATASOURCE_PROVIDER } from '../../../../main/nest/db.providers'
import { getAcceptanceTestsDataSource } from '../../../utils'
import { UserDriver } from '../drivers/interface.driver'
import { UserRestDriver } from '../drivers/rest.driver'
import { AppConnection } from './interface'

interface ConnectionArgs {
  apiUrl: string
  stop(): Promise<void>
}

class RestAppConnection implements AppConnection {
  constructor(private args: ConnectionArgs) {}

  private createAxios(): Axios {
    return new Axios({
      baseURL: this.args.apiUrl,
      responseType: 'json',
      transformRequest: (data) => (data ? JSON.stringify(data) : data),
      transformResponse: (data) => (data ? JSON.parse(data) : data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  createUserDriver(): UserDriver {
    return new UserRestDriver(this.createAxios())
  }

  async stop() {
    await this.args.stop()
  }
}

async function createAppForLocalTest(): Promise<ConnectionArgs> {
  const moduleBuilder = await Test.createTestingModule({
    imports: [AppModules],
  })

  const dataSource = getAcceptanceTestsDataSource()
  await dataSource.initialize()
  moduleBuilder.overrideProvider(DATASOURCE_PROVIDER).useValue(dataSource)

  const testingModule: TestingModule = await moduleBuilder.compile()

  const app = testingModule.createNestApplication()
  app.setGlobalPrefix('api')
  await app.listen(10000 + Math.floor(Math.random() * 55000))

  return {
    apiUrl: `${await app.getUrl()}/api`,
    stop: async () => {
      await app.close()
      await dataSource.destroy()
    },
  }
}

export async function connectToRest(): Promise<RestAppConnection> {
  let API_URL: string = process.env.API_URL
  if (!API_URL) {
    return new RestAppConnection(await createAppForLocalTest())
  }
  return new RestAppConnection({
    apiUrl: API_URL,
    stop: () => Promise.resolve(),
  })
}
