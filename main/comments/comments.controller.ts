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
import { buildUrl } from '../nest/url'
import { PaginationDTO } from '../nest/pagination.dto'
import { JWTAuthGuard } from '../nest/jwt.guard'
import { validateModel } from '../nest/validation.utils'
import { CommentEntity } from './comment.entity'
import {
  cloneProfileToOutput,
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
      comment: cloneCommentToOutput(req, comment, {
        article: buildUrl(req, `/articles/${slug}`),
        author: buildUrl(req, `/profiles/${me.username}`),
      }),
    }
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
    const response: CommentsResponseBody = {
      comments: comments.map((comment) =>
        cloneCommentToOutput(req, comment, {
          article: buildUrl(req, `/articles/${slug}`),
          author: buildUrl(req, `/profiles/${comment.author.username}`),
        }),
      ),
    }
    if (comments.length > 0) {
      response.links = {
        next: buildUrl(
          req,
          `articles/${slug}/comments`,
          pagination.getNextPage().toParams(),
        ),
      }
    }
    return response
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
      links: { article: buildUrl(req, `/articles/${slug}`) },
    }
  }
}

export function cloneCommentToOutput(
  req,
  comment: CommentEntity,
  links?: { [key: string]: string },
): CommentResponseDTO {
  const output: CommentResponseDTO = {
    id: comment.id,
    body: comment.body,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    author: cloneProfileToOutput(req, comment.author),
  }
  if (links) {
    output.links = links
  }
  return output
}
