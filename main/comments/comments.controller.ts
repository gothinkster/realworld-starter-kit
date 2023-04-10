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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { z } from 'zod'
import { createAuthorDTO } from '../authors/authors.controller'
import { AuthorsService, Profile } from '../authors/authors.service'
import { JWTAuthGuard } from '../nest/jwt.guard'
import { Pagination, ZodPagination } from '../nest/pagination'
import { buildUrlToPath } from '../nest/url'
import { createZodTransformer } from '../nest/validation.utils'
import { Comment, CommentsService } from './comments.service'

const CommentDTO = z.object({
  body: z
    .string()
    .max(255)
    .describe("The comment body. Example: 'I liked that article'"),
})

const CreateCommentBody = z.object({
  comment: CommentDTO,
})

type CreateCommentBody = z.infer<typeof CreateCommentBody>

@ApiTags('comments')
@Controller('articles/:slug/comments')
export class CommentsController {
  constructor(
    private commentsService: CommentsService,
    private authorsService: AuthorsService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @Post()
  async addCommentToAnArticle(
    @Req() req,
    @Param('slug') slug: string,
    @Body(createZodTransformer(CreateCommentBody)) body: CreateCommentBody,
  ) {
    const me = await this.authorsService.getUserAuthorProfile(req.user)
    const comment = await this.commentsService.commentArticle(
      me,
      slug,
      body.comment.body,
    )
    return {
      comment: createCommentDTO(req, slug, comment, me),
    } as const
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getCommentsFromAnArticle(
    @Req() req,
    @Param('slug') slug: string,
    @Query(createZodTransformer(ZodPagination)) pagination: Pagination,
  ) {
    const comments = await this.commentsService.getCommentsFromArticle(
      slug,
      pagination,
    )
    return {
      comments: await Promise.all(
        comments.map(async (comment) => {
          const author = await this.authorsService.getAuthorById(
            comment.authorId,
          )
          return createCommentDTO(req, slug, comment, author)
        }),
      ),
      links:
        comments.length > 0
          ? {
              next: buildUrlToPath(
                `articles/${slug}/comments`,
                pagination.getNextPage().toParams(),
              ),
            }
          : {},
    } as const
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async deleteCommentFromArticle(
    @Req() req,
    @Param('slug') slug: string,
    @Param(ParseIntPipe) id: number,
  ) {
    const me = await this.authorsService.getUserAuthorProfile(req.user)
    await this.commentsService.deleteCommentFromArticle(id, slug, me)
    return {
      links: { article: buildUrlToPath(`/articles/${slug}`) },
    }
  }
}

function createCommentDTO(
  req,
  articleSlug: string,
  comment: Comment,
  author: Profile,
) {
  return {
    id: comment.id,
    body: comment.body,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    author: createAuthorDTO(author),
    links: {
      article: buildUrlToPath(`/articles/${articleSlug}`),
      author: buildUrlToPath(`/profiles/${author.username}`),
    },
  } as const
}
