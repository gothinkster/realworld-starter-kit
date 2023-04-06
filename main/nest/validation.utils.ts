import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common'
import { ZodError, ZodType } from 'zod'
import { PipeTransform } from '@nestjs/common/interfaces/features/pipe-transform.interface'

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

export function createZodTransformer<ZT extends ZodType>(
  schema: ZT,
): PipeTransform<any, ZT['_output']> {
  return {
    transform: (value, _) => {
      try {
        return schema.parse(value) as ZT['_output']
      } catch (e) {
        if (e instanceof ZodError) {
          throw new HttpException(e.errors, HttpStatus.UNPROCESSABLE_ENTITY)
        }
        throw e
      }
    },
  }
}
