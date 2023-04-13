import { Context } from 'aws-lambda'
import * as serverlessExpress from 'aws-serverless-express'
import { Server } from 'http'
import { createExpressApp } from './server'

let lambdaProxyServer: Server

export async function handler(event: any, context: Context) {
  if (!lambdaProxyServer) {
    const app = await createExpressApp()
    lambdaProxyServer = serverlessExpress.createServer(app, undefined, [
      'application/octet-stream',
      'font/eot',
      'font/opentype',
      'font/otf',
      'image/jpeg',
      'image/png',
      'image/svg+xml',
    ])
  }
  return await serverlessExpress.proxy(
    lambdaProxyServer,
    event,
    context,
    'PROMISE',
  ).promise
}
