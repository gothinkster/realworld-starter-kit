import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiProperty,
  ApiResponseProperty,
  ApiTags,
} from '@nestjs/swagger'

import { Account } from '../authors/models'
import { AuthorsService } from '../authors/service'
import { InjectAccount } from '../accounts/account.decorator'
import { CommentsService } from './comments.service'
import { buildUrlToPath } from '../nest/url'
import { PaginationDTO } from '../nest/pagination.dto'
import { JWTAuthGuard } from '../nest/jwt.guard'
import { validateModel } from '../nest/validation.utils'
import { CommentEntity } from './comment.entity'
import {
  createAuthorDTO,
  ProfileResponseDTO,
} from '../authors/authors.controller'
import { IsString, MaxLength, ValidateNested } from 'class-validator'
import {
  ApiModelProperty,
  ApiResponseModelProperty,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator'
import { Type } from 'class-transformer'
import { Slug } from '../articles/articles.controller'

export class CommentDTO {
  @ApiProperty({
    description: "The comment body. Example: 'I liked that article'",
    required: true,
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  body: string
}

export class CreateCommentBody {
  @ApiModelProperty({ type: CommentDTO, required: true })
  @ValidateNested()
  @Type(() => CommentDTO)
  comment: CommentDTO
}

export class CommentResponseDTO extends CommentDTO {
  @ApiResponseProperty()
  body: string

  @ApiResponseProperty()
  id: number

  @ApiResponseProperty()
  updatedAt: Date

  @ApiResponseProperty()
  createdAt: Date

  @ApiResponseModelProperty({ type: ProfileResponseDTO })
  author: ProfileResponseDTO

  @ApiResponseProperty()
  links?: {
    [key: string]: string
  }
}

export class CommentResponseBody {
  @ApiResponseProperty({ type: CommentResponseDTO })
  comment: CommentResponseDTO
}

export class CommentsResponseBody {
  @ApiResponseProperty({ type: [CommentResponseDTO] })
  comments: CommentResponseDTO[]

  @ApiResponseProperty()
  links?: { [key: string]: string }
}

@ApiTags('comments')
@Controller('articles/:slug/comments')
export class CommentsController {
  constructor(
    private commentsService: CommentsService,
    private authorsService: AuthorsService,
  ) {}

  @ApiCreatedResponse({ type: CommentResponseBody })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @Post()
  @Slug()
  async addCommentToAnArticle(
    @Req() req,
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
    @Body(validateModel()) body: CreateCommentBody,
  ): Promise<CommentResponseBody> {
    const me = await this.authorsService.getByAccount(account)
    const comment = await this.commentsService.commentArticle({
      me,
      slug,
      body: body.comment.body,
    })
    return {
      comment: createCommentDTO(req, comment, slug),
    } as const
  }

  @ApiOkResponse({ type: CommentsResponseBody })
  @HttpCode(HttpStatus.OK)
  @Get()
  @Slug()
  async getCommentsFromAnArticle(
    @Req() req,
    @Param('slug') slug: string,
    @Query(validateModel()) pagination: PaginationDTO,
  ): Promise<CommentsResponseBody> {
    const comments = await this.commentsService.getCommentsFromArticle(
      slug,
      pagination,
    )
    return {
      comments: comments.map((comment) => createCommentDTO(req, comment, slug)),
      links:
        comments.length > 0
          ? {
              next: buildUrlToPath(
                req,
                `articles/${slug}/comments`,
                pagination.getNextPage().toParams(),
              ),
            }
          : {},
    } as const
  }

  @ApiNoContentResponse({ type: CommentsResponseBody })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @Slug()
  async deleteCommentFromArticle(
    @Req() req,
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
    @Param(ParseIntPipe) id: number,
  ) {
    const me = await this.authorsService.getByAccount(account)
    await this.commentsService.deleteCommentFromArticle(id, slug, me)
    return {
      links: { article: buildUrlToPath(req, `/articles/${slug}`) },
    }
  }
}

function createCommentDTO(
  req,
  comment: CommentEntity,
  articleSlug: string,
): CommentResponseDTO {
  return {
    id: comment.id,
    body: comment.body,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    author: createAuthorDTO(req, comment.author),
    links: {
      article: buildUrlToPath(req, `/articles/${articleSlug}`),
      author: buildUrlToPath(req, `/profiles/${comment.author.username}`),
    },
  } as const
}
