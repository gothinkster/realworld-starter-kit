import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common'
import { Pagination } from '../dtos/pagination.dtos'
import {
  CommentRequestPayload,
  CommentResponsePayload,
  CommentsResponsePayload,
} from '../dtos/comments.dto'
import { validateModel } from '../functions.utils'

@Controller('articles/:slug/comments')
export class CommentsController {
  @Post()
  addCommentToAnArticle(
    @Param() slug: string,
    @Query(validateModel()) pagination: Pagination,
    @Body(validateModel()) comment: CommentRequestPayload,
  ): CommentResponsePayload {
    return undefined
  }

  @Get()
  getCommentsFromAnArticle(
    @Param() slug: string,
    @Query(validateModel()) pagination: Pagination,
  ): CommentsResponsePayload {
    return undefined
  }

  @Delete(':id')
  deleteCommentFromArticle(
    @Param() slug: string,
    @Param(ParseIntPipe) id: number,
  ) {
    return undefined
  }
}
