import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'

import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'
import { ArticlesService } from '../articles/articles.service'
import { createAuthorDTO } from '../authors/authors.controller'
import { AuthorsService, Profile } from '../authors/authors.service'
import { GetUser, JWTAuthGuard, RequireUser, User } from '../nest/jwt.guard'
import { Pagination, ZodPagination } from '../nest/pagination'
import { buildUrlToPath } from '../nest/url'
import { ZodBody, ZodQuery } from '../nest/validation.utils'
import { Comment, CommentsRepository } from './comments.repository'

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
    private commentsRepository: CommentsRepository,
    private authorsService: AuthorsService,
    private articlesService: ArticlesService,
  ) {}

  @ApiBody({
    schema: zodToJsonSchema(CreateCommentBody) as any,
  })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @Post()
  async addCommentToAnArticle(
    @RequireUser() user: User,
    @Param('slug') slug: string,
    @ZodBody(CreateCommentBody) body: CreateCommentBody,
  ) {
    const me = await this.authorsService.getUserAuthorProfile(user)
    const article = await this.articlesService.getView(me).getArticle(slug)
    const comment = await this.commentsRepository.commentArticle(
      me,
      article,
      body.comment.body,
    )
    return {
      comment: createCommentDTO(slug, comment, me),
    } as const
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getCommentsFromAnArticle(
    @GetUser() user: User | null,
    @Param('slug') slug: string,
    @ZodQuery(ZodPagination) pagination: Pagination,
  ) {
    const me = user
      ? await this.authorsService.getUserAuthorProfile(user)
      : undefined
    const article = await this.articlesService.getView(me).getArticle(slug)
    const comments = await this.commentsRepository.getCommentsFromArticle(
      article,
      pagination,
    )
    return {
      comments: await Promise.all(
        comments.map(async (comment) => {
          const author = await this.authorsService.getAuthorById(
            comment.authorId,
          )
          return createCommentDTO(slug, comment, author)
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
    @RequireUser() user: User,
    @Param('slug') slug: string,
    @Param(ParseIntPipe) id: number,
  ) {
    const me = await this.authorsService.getUserAuthorProfile(user)
    const article = await this.articlesService.getView(me).getArticle(slug)
    await this.commentsRepository.deleteCommentFromArticle(id, article, me)
    return {
      links: { article: buildUrlToPath(`/articles/${slug}`) },
    }
  }
}

function createCommentDTO(
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
