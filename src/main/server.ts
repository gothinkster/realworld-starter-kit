import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import { GLOBAL_PREFIX } from './constants'
import { AppModules } from './nest/app.modules'
import { createOpenAPI } from './nest/openapi'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModules)
  app.setGlobalPrefix(GLOBAL_PREFIX)
  SwaggerModule.setup('docs', app, createOpenAPI(app), {
    useGlobalPrefix: true,
  })
  await app.listen(process.env.API_PORT || 3000)
}

bootstrap()
  .then((r) => console.log('Nest application started.'))
  .catch((r) => console.log('Gracefully shutting down application.'))
