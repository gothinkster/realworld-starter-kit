import { ApiProperty } from '@nestjs/swagger'
import { IsInt } from 'class-validator'
import { GLOBAL_PREFIX } from '../../constants'
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

export function buildUrl(
  req,
  path: string,
  ...paramsArray: { [key: string]: string }[]
): string {
  path = path.replace(/^\//, '').replace(/\/$/, '')
  let url = `${req.protocol}://${req.get('host')}` + `/${GLOBAL_PREFIX}/${path}`
  const query = new URLSearchParams()

  paramsArray.forEach((params) => {
    for (let key of Object.keys(params)) {
      if (params[key]) {
        query.set(key, params[key])
      }
    }
  })

  const queryString = query.toString()
  if (queryString) {
    url += `?${queryString}`
  }

  return url
}
