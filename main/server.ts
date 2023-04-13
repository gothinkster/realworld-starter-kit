import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import * as trpcExpress from '@trpc/server/adapters/express'
import * as express from 'express'
import { AppModule } from './app.module'
import { ArticlesController } from './articles/articles.controller'
import { AuthorsController } from './authors/authors.controller'
import { CommentsController } from './comments/comments.controller'
import { getEnvs } from './environment'
import { createPreConfiguredOpenAPIDocumentBuilder } from './nest/openapi'
import { createContext } from './trpc/app'
import { createMergedTRPCApp } from './trpc/merged'

export async function createNestApplication() {
  const { BASE_API_URL } = getEnvs()
  const nest = await NestFactory.create(AppModule)
  SwaggerModule.setup(
    'docs',
    nest,
    SwaggerModule.createDocument(
      nest,
      createPreConfiguredOpenAPIDocumentBuilder()
        .addServer(BASE_API_URL)
        .build(),
    ),
    {
      useGlobalPrefix: true,
    },
  )
  await nest.init()
  return nest
}

export async function createExpressApp() {
  const app = express()

  const { API_PREFIX } = getEnvs()

  const nest = await createNestApplication()

  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      createContext: createContext,
      router: createMergedTRPCApp(
        nest.get(CommentsController),
        nest.get(ArticlesController),
        nest.get(AuthorsController),
      ),
      onError: (err) => delete err.error.stack, // Don't expose failures to the World
    }),
  )

  app.use(`/${API_PREFIX}`, nest.getHttpAdapter().getInstance())

  return app
}

async function bootstrapServer(): Promise<void> {
  const { API_PORT } = getEnvs()
  const app = await createExpressApp()
  await app.listen(API_PORT)
}

if (require.main === module) {
  bootstrapServer()
    .then(() => console.log('Nest application started.'))
    .catch(() => console.log('Gracefully shutting down application.'))
}

export type { AppRouter } from './trpc/merged'
