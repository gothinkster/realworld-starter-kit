import { applyDecorators } from '@nestjs/common'
import { ApiParam, ApiProperty, ApiResponseProperty } from '@nestjs/swagger'
import {
  ApiModelProperty,
  ApiResponseModelProperty,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator'
import { Transform, Type } from 'class-transformer'
import { IsOptional, IsString, ValidateNested } from 'class-validator'
import {
  Article,
  ArticleFields,
  ArticleFilters,
  Dated,
  FullArticle,
  Sluged,
} from '../../domain/articles/models'
import { cloneProfileToOutput, ProfileResponseDTO } from './authors.dto'
import { buildUrl } from './pagination.dto'

export const articlesSwaggerOptions = {
  title: { example: 'How to train your dragon' },
  description: { example: 'Tips and tricks to train your dragon' },
  body: { example: 'Give it a lot a training and feed it with fish.' },
  slug: {
    name: 'slug',
    type: 'string',
    format: 'slug',
    description:
      'The article title written in slug format. Example: how-to-train-your-dragon',
  },
  tags: {
    example: ['dragons', 'training'],
    isArray: true,
    type: 'string',
  },
  createdAt: {
    example: new Date().toISOString(),
    description: "The article's creation date",
    type: 'date',
    format: 'date-time',
  },
  updatedAt: {
    example: new Date().toISOString(),
    description: "The article's last update date",
    type: 'date',
    format: 'date-time',
  },
  favorited: {
    example: true,
    description: 'Whether the article is favorited by the user',
    type: 'boolean',
  },
  favoritesCount: {
    example: 1,
    description: 'The number of favorites for the article',
    type: 'integer',
  },
}
export class CreateArticleDTO implements Article {
  @ApiProperty(articlesSwaggerOptions.title)
  @IsString()
  title: string

  @ApiProperty(articlesSwaggerOptions.description)
  @IsString()
  description: string

  @ApiProperty(articlesSwaggerOptions.body)
  @IsString()
  body: string

  @ApiProperty(articlesSwaggerOptions.tags)
  @IsString({ each: true })
  tags: string[] = []
}

export class CreateArticleBody {
  @ApiModelProperty({ type: CreateArticleDTO, required: true })
  @ValidateNested()
  @Type(() => CreateArticleDTO)
  article: CreateArticleDTO
}

export class UpdateArticleDTO implements ArticleFields {
  @ApiProperty({ ...articlesSwaggerOptions.title, required: false })
  @IsString()
  title: string

  @ApiProperty({ ...articlesSwaggerOptions.description, required: false })
  @IsString()
  description: string

  @ApiProperty({ ...articlesSwaggerOptions.body, required: false })
  @IsString()
  body: string

  @ApiProperty({ ...articlesSwaggerOptions.tags, required: false })
  @IsString({ each: true })
  tags: string[]
}

export class UpdateArticleBody {
  @ApiModelProperty({ type: UpdateArticleDTO })
  @ValidateNested()
  @Type(() => UpdateArticleDTO)
  article: UpdateArticleDTO
}

export class ArticleFiltersDTO implements ArticleFilters {
  @ApiProperty({
    description: 'Comma separated list of tags',
    required: false,
    type: 'string',
  })
  @Transform(({ obj }) =>
    obj.tags
      ?.split(/[\s,-]+/)
      ?.map((tag) => tag.trim())
      ?.filter((tag) => tag.length > 0),
  )
  tags?: string[]

  @ApiProperty({
    description: 'Author username',
    required: false,
  })
  @IsString()
  @IsOptional()
  author?: string

  @ApiProperty({
    description: 'Filter by articles favorited by you (requires logging)',
    required: false,
  })
  @Transform(({ obj }) =>
    ['True', 'true', true, 'yes', 'Yes', 'y', 'Y'].includes(obj.favorited),
  )
  favorited: boolean = false

  toParams(): { [key: string]: string } {
    return {
      ...(this.tags ? { tags: this.tags.join(',') } : {}),
      ...(this.author ? { author: this.author } : {}),
      ...(this.favorited ? { favorited: this.favorited.toString() } : {}),
    }
  }
}

class ArticleResponseDTO implements Dated<Sluged<Article>> {
  @ApiResponseProperty({ ...articlesSwaggerOptions.slug })
  slug: string

  @ApiResponseProperty({ ...articlesSwaggerOptions.title })
  title: string

  @ApiResponseProperty({ ...articlesSwaggerOptions.description })
  description: string

  @ApiResponseProperty({ ...articlesSwaggerOptions.body })
  body: string

  @ApiResponseProperty({ ...articlesSwaggerOptions.tags })
  tags: string[]

  @ApiResponseProperty({ ...articlesSwaggerOptions.createdAt })
  createdAt: Date

  @ApiResponseProperty({ ...articlesSwaggerOptions.updatedAt })
  updatedAt: Date

  @ApiResponseProperty({ ...articlesSwaggerOptions.favorited })
  favorited?: boolean

  @ApiResponseProperty({ ...articlesSwaggerOptions.favoritesCount })
  favoritesCount?: number

  @ApiResponseModelProperty({ type: ProfileResponseDTO })
  author: ProfileResponseDTO

  @ApiResponseProperty({ type: 'string', format: 'url' })
  '$self': string

  @ApiResponseProperty({ type: 'string', format: 'url' })
  '$comments': string
}

export class ArticleResponseBody {
  @ApiResponseModelProperty({ type: ArticleResponseDTO })
  article: ArticleResponseDTO
}

export class ArticlesResponseBody {
  @ApiResponseModelProperty({ type: [ArticleResponseDTO] })
  articles: ArticleResponseDTO[]

  @ApiResponseProperty({ type: 'string', format: 'url' })
  $next?: string
}

export function cloneArticleToOutput(
  req,
  article: FullArticle,
  favorited?: boolean,
): ArticleResponseDTO {
  const output: ArticleResponseDTO = {
    $self: buildUrl(req, `/articles/${article.slug}`),
    slug: article.slug,
    title: article.title,
    description: article.description,
    body: article.body,
    tags: article.tags,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    author: cloneProfileToOutput(req, article.author),
    $comments: buildUrl(req, `/articles/${article.slug}/comments`),
  }
  if (typeof favorited === 'boolean') {
    output.favorited = favorited
  }
  return output
}

export function Slug() {
  return applyDecorators(ApiParam(articlesSwaggerOptions.slug))
}
