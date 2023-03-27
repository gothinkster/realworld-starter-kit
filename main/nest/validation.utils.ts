import { HttpStatus, ValidationPipe } from '@nestjs/common'

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
