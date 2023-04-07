import { Server } from 'http'
import { Context } from 'aws-lambda'
import * as express from 'express'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ExpressAdapter } from '@nestjs/platform-express'
import { GLOBAL_PREFIX } from './global/constants'
import { SwaggerModule } from '@nestjs/swagger'
import { createOpenAPI } from './nest/openapi'
import * as serverlessExpress from 'aws-serverless-express'

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
