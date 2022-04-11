import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { INestApplication } from '@nestjs/common'

export async function bootstrap(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  await app.listen(3000)
  return app
}
bootstrap()
