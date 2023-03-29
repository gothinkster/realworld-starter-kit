import { ApiProperty } from '@nestjs/swagger'
import { IsInt } from 'class-validator'

export class Pagination {
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

  getNextPage(): Pagination {
    const newPage = new Pagination()
    newPage.take = this.take
    newPage.skip = this.skip + this.take
    return newPage
  }

  toParams() {
    return {
      take: this.take.toString(),
      skip: this.skip.toString(),
    } as const
  }
}
