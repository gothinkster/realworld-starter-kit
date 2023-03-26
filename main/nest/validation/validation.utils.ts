import {
  DefaultValuePipe,
  HttpStatus,
  ParseIntPipe,
  Query,
  ValidationPipe,
} from '@nestjs/common'

export function validateModel(
  status: HttpStatus = HttpStatus.NOT_ACCEPTABLE,
): ValidationPipe {
  return new ValidationPipe({
    transform: true,
    errorHttpStatusCode: status.valueOf(),
    transformOptions: { enableImplicitConversion: true },
    forbidNonWhitelisted: true,
  })
}

export function QueryInt(name: string, defaultValue: number) {
  return Query(name, new DefaultValuePipe(defaultValue), ParseIntPipe)
}
