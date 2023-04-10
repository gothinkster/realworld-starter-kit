import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { getEnvs } from './environment'
import { createPreConfiguredOpenAPIDocumentBuilder } from './nest/openapi'

async function bootstrapServer(): Promise<void> {
  const { API_PORT, API_PREFIX, BASE_URL } = getEnvs()
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix(API_PREFIX)
  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(
      app,
      createPreConfiguredOpenAPIDocumentBuilder().addServer(BASE_URL).build(),
    ),
    {
      useGlobalPrefix: true,
    },
  )
  await app.listen(API_PORT)
}

bootstrapServer()
  .then(() => console.log('Nest application started.'))
  .catch(() => console.log('Gracefully shutting down application.'))
