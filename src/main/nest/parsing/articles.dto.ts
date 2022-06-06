import { PartialType } from '@nestjs/mapped-types'
import { IsBoolean, IsOptional, IsString } from 'class-validator'
import {
  Article,
  ArticleFields,
  ArticleFilters,
  Author,
  Dated,
  FullArticle,
  Sluged,
} from '../../domain/articles/models'
import { ProfileResponseDTO } from './profiles.dto'

export class CreateArticleDTO implements Article {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsString()
  body: string

  @IsString({ each: true })
  tags: string[] = []
}

export class ArticleFiltersDTO implements ArticleFilters {
  @IsString()
  @IsOptional()
  tags?: string

  @IsString()
  @IsOptional()
  author?: string

  @IsBoolean()
  @IsOptional()
  favorited?: boolean
}

export class UpdateArticleDTO
  extends PartialType(CreateArticleDTO)
  implements ArticleFields {}

export interface ArticleResponseDTO extends Dated<Sluged<Article>> {
  favorited?: boolean
  favoritesCount?: number
  author: Author | ProfileResponseDTO
}

export function cloneArticleToOutput(
  article: FullArticle,
  author?: ProfileResponseDTO,
  favorited?: boolean,
): ArticleResponseDTO {
  const output: ArticleResponseDTO = {
    slug: article.slug,
    title: article.title,
    description: article.description,
    body: article.body,
    tags: article.tags,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    author: article.author,
  }
  if (typeof favorited === 'boolean') {
    output.favorited = favorited
  }
  if (author) {
    output.author = author
  }
  return output
}
