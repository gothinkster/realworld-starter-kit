import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import { SwaggerModule } from '@nestjs/swagger'
import { Context } from 'aws-lambda'
import * as serverlessExpress from 'aws-serverless-express'
import * as express from 'express'
import { Server } from 'http'
import { AppModules } from './nest/app.modules'
import { createOpenAPI } from './nest/openapi'
import { GLOBAL_PREFIX } from './global/constants'

let lambdaProxy: Server

async function bootstrap() {
  const expressServer = express()
  const app = await NestFactory.create(
    AppModules,
    new ExpressAdapter(expressServer),
  )
  app.setGlobalPrefix(GLOBAL_PREFIX)
  SwaggerModule.setup('docs', app, createOpenAPI(app), {
    useGlobalPrefix: true,
  })
  await app.init()
  return serverlessExpress.createServer(expressServer)
}

export function handler(event: any, context: Context) {
  if (!lambdaProxy) {
    bootstrap().then((server) => {
      lambdaProxy = server
      serverlessExpress.proxy(lambdaProxy, event, context)
    })
  } else {
    serverlessExpress.proxy(lambdaProxy, event, context)
  }
}
