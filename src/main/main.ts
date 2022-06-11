import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModules } from './nest/app.modules'

export async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModules)
  app.setGlobalPrefix(process.env.API_PREFIX || 'api')

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Magazine API')
    .setDescription(
      'A Rest API for publishing articles and consuming articles from authors you follow.',
    )
    .setVersion('1.0')
    .addBasicAuth()
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('docs', app, document, { useGlobalPrefix: true })

  await app.listen(process.env.API_PORT || 3000)
}

bootstrap()
  .then((r) => console.log('Nest application started.'))
  .catch((r) => console.log('Gracefully shutting down application.'))
