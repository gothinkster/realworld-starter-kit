import { ApiProperty } from '@nestjs/swagger'
import { IsInt } from 'class-validator'
import { Pagination } from '../../domain/articles/finder'

export class PaginationDTO implements Pagination {
  @ApiProperty({
    required: false,
    description: 'Number of articles to return (defaults to 20)',
  })
  @IsInt()
  take: number = 20

  @ApiProperty({
    required: false,
    description: 'Number of articles to skip (defaults to 0)',
  })
  @IsInt()
  skip: number = 0
}
