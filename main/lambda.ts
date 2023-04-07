import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import { SwaggerModule } from '@nestjs/swagger'
import { Context } from 'aws-lambda'
import * as serverlessExpress from 'aws-serverless-express'
import * as express from 'express'
import { Server } from 'http'
import { AppModule } from './app.module'
import { GLOBAL_PREFIX } from './global/constants'
import { createOpenAPI } from './nest/openapi'

let lambdaProxyServer: Server

export async function handler(event: any, context: Context) {
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
