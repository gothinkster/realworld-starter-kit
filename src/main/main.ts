import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

export async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix(process.env.PREFIX || 'api')
  await app.listen(process.env.PORT || 3000)
}

bootstrap()
  .then((r) => console.log('Nest application started.'))
  .catch((r) => console.log('Gracefully shutting down application.'))
