import { ApiProperty } from '@nestjs/swagger'
import { IsInt } from 'class-validator'
import { Pagination } from '../../domain/articles/finder'

export class PaginationDTO extends Pagination {
  @ApiProperty({
    required: false,
    description: 'Number of articles to skip (defaults to 0)',
  })
  @IsInt()
  skip: number = 0

  @ApiProperty({
    required: false,
    description: 'Number of articles to return (defaults to 20)',
  })
  @IsInt()
  take: number = 20
}

export function buildPageUrl(
  req,
  pagination: Pagination,
  params: { [key: string]: string } = {},
): string {
  const baseUrl = `${req.protocol}://${req.get('host')}${req.path}`
  const query = new URLSearchParams()
  if (pagination.skip) {
    query.set('skip', pagination.skip.toString())
  }
  if (pagination.take) {
    query.set('take', pagination.take.toString())
  }
  for (let key of Object.keys(params)) {
    if (params[key]) {
      query.set(key, params[key])
    }
  }
  return `${baseUrl}?${query.toString()}`
}
