import { PartialType } from '@nestjs/mapped-types'
import { ApiResponseProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { OtherProfileResponse } from '../profiles/profiles.dto'
import {
  ArticleSnapshot,
  Dated,
  PartialArticleSnapshot,
  Sluged,
} from './articles.models'

export class CreateArticleDTO implements ArticleSnapshot {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsString()
  body: string

  @IsString({ each: true })
  tags: string[] = []
}

export class ArticleFilters {
  @IsString()
  @IsOptional()
  tags?: string

  @IsString()
  @IsOptional()
  author?: string

  @IsString()
  @IsOptional()
  favorited?: string
}

export class UpdateArticleDTO
  extends PartialType(CreateArticleDTO)
  implements PartialArticleSnapshot {}

export class ArticleResponseDTO
  extends CreateArticleDTO
  implements Dated<Sluged<ArticleSnapshot>>
{
  @ApiResponseProperty()
  slug: string
  @ApiResponseProperty() updatedAt: Date
  @ApiResponseProperty() createdAt: Date
  @ApiResponseProperty() favorited?: boolean
  @ApiResponseProperty() favoritesCount: number
  @ApiResponseProperty() author: OtherProfileResponse
}
