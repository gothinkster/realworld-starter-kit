import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Axios } from 'axios'
import { DataSource } from 'typeorm'
import { AppModule } from '../../../main/nest/app.module'
import { DATASOURCE_PROVIDER } from '../../../main/nest/providers/database.providers'
import { testDataSource } from '../../utils'

async function createAppForLocalTest(
  dataSource: DataSource,
): Promise<INestApplication> {
  const moduleBuilder = await Test.createTestingModule({
    imports: [AppModule],
  })
  await dataSource.initialize()
  moduleBuilder.overrideProvider(DATASOURCE_PROVIDER).useValue(dataSource)
  const testingModule: TestingModule = await moduleBuilder.compile()

  const app = testingModule.createNestApplication()
  app.setGlobalPrefix('api')
  await app.listen(10000 + Math.floor(Math.random() * 55000))
  return app
}

export interface AppConnection {
  axios: Axios
  stop: () => Promise<void>
}

export async function connectToNestApp(): Promise<AppConnection> {
  let stop: () => Promise<void> = () => Promise.resolve()

  let apiUrl: string = process.env.API_URL
  if (!apiUrl) {
    const nest = await createAppForLocalTest(testDataSource)
    apiUrl = `${await nest.getUrl()}/api`
    stop = async () => {
      await nest.close()
      await testDataSource.destroy()
    }
  }

  const axios = new Axios({
    baseURL: apiUrl,
    responseType: 'json',
    transformRequest: (data) => (data ? JSON.stringify(data) : data),
    transformResponse: (data) => (data ? JSON.parse(data) : data),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return {
    axios: axios,
    stop: stop,
  }
}
