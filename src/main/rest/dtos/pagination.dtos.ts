import { IsInt, IsNumberString } from 'class-validator'

export class Pagination {
  @IsInt()
  @IsNumberString()
  offset: number = 0

  @IsNumberString()
  limit: number = 20
}
