import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces'

export function createOpenAPI(app: INestApplication): OpenAPIObject {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Magazine API')
    .setDescription(
      'A Rest API for publishing articles and consuming articles from authors you follow.',
    )
    .setVersion('1.0')
    .addBasicAuth()
    .addBearerAuth()
    .build()
  return SwaggerModule.createDocument(app, swaggerConfig)
}
