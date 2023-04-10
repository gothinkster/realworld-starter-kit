import { DocumentBuilder } from '@nestjs/swagger'

export function createPreConfiguredOpenAPIDocumentBuilder() {
  return new DocumentBuilder()
    .setTitle('Real World API')
    .setDescription(
      'A Rest API for publishing articles and consuming articles from authors you follow.',
    )
    .setVersion('1.0')
    .addBasicAuth()
    .addBearerAuth()
}
