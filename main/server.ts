import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { API_PORT, GLOBAL_PREFIX } from './global/constants'
import { createOpenAPI } from './nest/openapi'

async function bootstrapServer(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix(GLOBAL_PREFIX)
  SwaggerModule.setup('docs', app, createOpenAPI(app), {
    useGlobalPrefix: true,
  })
  await app.listen(API_PORT)
}

bootstrapServer()
  .then(() => console.log('Nest application started.'))
  .catch(() => console.log('Gracefully shutting down application.'))
