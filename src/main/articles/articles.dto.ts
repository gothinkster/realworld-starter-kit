import { PartialType } from '@nestjs/mapped-types'
import { ProfileResponseDTO } from '../profiles/profiles.dto'
import { IsString, MaxLength } from 'class-validator'

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
  tagList: string[]
}

export class ArticleUpdateDTO extends PartialType(ArticleCreateDTO) {}

export class ArticleResponseDTO extends ArticleCreateDTO {
  slug: string
  updatedAt: Date
  createdAt: Date
  favorited?: boolean
  favoritesCount: number
  author: ProfileResponseDTO

  constructor(createArticleDTO?: ArticleCreateDTO) {
    super()
    this.title = createArticleDTO.title
    this.description = createArticleDTO.description
    this.body = createArticleDTO.body
    this.tagList = createArticleDTO.tagList
  }
}

export class ArticleRequestPayload {
  article: ArticleCreateDTO
}

export class ArticleResponsePayload {
  article: ArticleResponseDTO
}
