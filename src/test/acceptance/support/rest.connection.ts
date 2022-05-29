import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
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

export async function connectToNestApp(): Promise<{
  app: INestApplication
  url: string
}> {
  const apiUrl: string = process.env.API_URL
  if (!apiUrl) {
    const app = await createAppForLocalTest()
    return {
      app: app,
      url: `${await app.getUrl()}/api`,
    }
  }
  return { app: null, url: apiUrl }
}
