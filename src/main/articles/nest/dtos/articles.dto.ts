import { PartialType } from '@nestjs/mapped-types'
import { ProfileResponseDTO } from '../../../profiles/nest/profiles.dto'
import {
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator'

export class ArticleCreateDTO {
  @IsString()
  @MaxLength(80)
  title: string
  @IsString()
  @MaxLength(500)
  description: string
  @IsString()
  body: string
  @IsString({ each: true })
  tagList?: string[] = []
}

export class ArticleFilters {
  @IsString()
  @IsOptional()
  tag?: string
  @IsString()
  @IsOptional()
  author?: string
  @IsString()
  @IsOptional()
  favorited?: string
}

export class ArticleUpdateDTO extends PartialType(ArticleCreateDTO) {}

export class ArticleResponseDTO extends ArticleCreateDTO {
  slug: string
  updatedAt: Date
  createdAt: Date
  favorited?: boolean
  favoritesCount: number
  author: ProfileResponseDTO
}

export class ArticleRequestPayload<T> {
  @ValidateNested()
  article: T
}

export class ArticleResponsePayload {
  article: ArticleResponseDTO
}

export class ArticlesResponsePayload {
  articles: ArticleResponseDTO[]
}
