import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import { createOpenAPI } from './nest/openapi'
import { API_PORT, GLOBAL_PREFIX } from './global/constants'
import { AppModule } from './app.module'
import { Server } from 'http'
import * as express from 'express'
import { ExpressAdapter } from '@nestjs/platform-express'
import * as serverlessExpress from 'aws-serverless-express'
import { Context } from 'aws-lambda'

async function bootstrapServer(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix(GLOBAL_PREFIX)
  SwaggerModule.setup('docs', app, createOpenAPI(app), {
    useGlobalPrefix: true,
  })
  await app.listen(API_PORT)
}

if (require.main === module) {
  bootstrapServer()
    .then((r) => console.log('Nest application started.'))
    .catch((r) => console.log('Gracefully shutting down application.'))
}

let lambdaProxyServer: Server

export async function lambdaHandler(event: any, context: Context) {
  if (!lambdaProxyServer) {
    const expressServer = express()
    const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(expressServer),
    )
    app.setGlobalPrefix(GLOBAL_PREFIX)
    SwaggerModule.setup('docs', app, createOpenAPI(app), {
      useGlobalPrefix: true,
    })
    await app.init()
    lambdaProxyServer = serverlessExpress.createServer(expressServer)
  }
  serverlessExpress.proxy(lambdaProxyServer, event, context)
}
