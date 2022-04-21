import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

export async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix(process.env.API_PREFIX || 'api')

  const config = new DocumentBuilder()
    .setTitle('Real World APP')
    .setDescription('An api for publishing articles.')
    .setVersion('1.0')
    .addBasicAuth()
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document, { useGlobalPrefix: true })

  await app.listen(process.env.API_PORT || 3000)
}

bootstrap()
  .then((r) => console.log('Nest application started.'))
  .catch((r) => console.log('Gracefully shutting down application.'))
