import { Test, TestingModule } from '@nestjs/testing'
import { Axios } from 'axios'
import { AppModules } from '../../../../main/nest/app.modules'
import { DATASOURCE_PROVIDER } from '../../../../main/nest/db.providers'
import { testDataSource } from '../../../utils'
import { UserDriver } from '../drivers/interface.driver'
import { UserRestDriver } from '../drivers/rest.driver'
import { AppConnection } from './interface'

class RestAppConnection implements AppConnection {
  constructor(private apiUrl: string, public stop: () => Promise<void>) {}

  private createAxios(): Axios {
    return new Axios({
      baseURL: this.apiUrl,
      responseType: 'json',
      transformRequest: (data) => (data ? JSON.stringify(data) : data),
      transformResponse: (data) => (data ? JSON.parse(data) : data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  driverFactory(): UserDriver {
    return new UserRestDriver(this.createAxios())
  }
}

async function createAndConnectToAppWithInMemoryPersistence(): Promise<RestAppConnection> {
  const moduleBuilder = await Test.createTestingModule({
    imports: [AppModules],
  })

  await testDataSource.initialize()
  moduleBuilder.overrideProvider(DATASOURCE_PROVIDER).useValue(testDataSource)

  const testingModule: TestingModule = await moduleBuilder.compile()

  const app = testingModule.createNestApplication()
  app.setGlobalPrefix('api')
  await app.listen(10000 + Math.floor(Math.random() * 55000))

  return new RestAppConnection(`${await app.getUrl()}/api`, async () => {
    await app.close()
    await testDataSource.destroy()
  })
}

export async function connectToRest(): Promise<RestAppConnection> {
  let API_URL: string = process.env.API_URL
  if (!API_URL) {
    return await createAndConnectToAppWithInMemoryPersistence()
  }
  return new RestAppConnection(API_URL, () => Promise.resolve())
}
