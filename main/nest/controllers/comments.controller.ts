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
import { Account } from '../../domain/authors/models'
import { AuthorsService } from '../../domain/authors/service'
import { CommentsService } from '../../domain/comments/comments.service'
import { InjectAccount } from '../decorators/account.decorator'
import { Slug } from '../parsing/articles.dto'
import {
  cloneCommentToOutput,
  CommentResponseBody,
  CommentsResponseBody,
  CreateCommentBody,
} from '../parsing/comments.dto'
import { PaginationDTO } from '../parsing/pagination.dto'
import { buildUrl } from '../parsing/url'
import { JWTAuthGuard } from '../security/jwt.guard'
import { validateModel } from '../validation/validation.utils'

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
