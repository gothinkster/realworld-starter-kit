import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Axios } from 'axios'
import { AppModule } from '../../../main/app.module'

async function createAppForLocalTest(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  const app = moduleFixture.createNestApplication()
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
    const nest = await createAppForLocalTest()
    apiUrl = `${await nest.getUrl()}/api`
    stop = nest.close
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
