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
  ApiTags,
} from '@nestjs/swagger'

import { Account } from '../authors/models'
import { AuthorsService } from '../authors/service'
import { InjectAccount } from '../accounts/account.decorator'
import { Slug } from '../articles/articles.dto'
import {
  cloneCommentToOutput,
  CommentResponseBody,
  CommentsResponseBody,
  CreateCommentBody,
} from './comments.dto'
import { CommentsService } from './comments.service'
import { buildUrl } from '../nest/url'
import { PaginationDTO } from '../nest/pagination.dto'
import { JWTAuthGuard } from '../nest/jwt.guard'
import { validateModel } from '../nest/validation.utils'

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
