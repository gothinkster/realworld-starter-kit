import { DefaultValuePipe, ParseIntPipe, Query } from '@nestjs/common'

export function QueryInt(name: string, defaultValue: number) {
  return Query(name, new DefaultValuePipe(defaultValue), ParseIntPipe)
}
