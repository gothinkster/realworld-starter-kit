import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '../app.module'
import { GLOBAL_PREFIX } from '../global/constants'
import * as fs from 'fs'

export function createOpenAPI(app: INestApplication): OpenAPIObject {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Real World API')
    .setDescription(
      'A Rest API for publishing articles and consuming articles from authors you follow.',
    )
    .setVersion('1.0')
    .addBasicAuth()
    .addBearerAuth()
    .build()
  return SwaggerModule.createDocument(app, swaggerConfig)
}

if (require.main === module) {
  NestFactory.create(AppModule).then((app) => {
    app.setGlobalPrefix(GLOBAL_PREFIX)
    fs.writeFileSync(
      'openapi.json',
      JSON.stringify(createOpenAPI(app), null, 2),
    )
  })
}
