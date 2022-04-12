import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common'
import { QueryInt } from '../dtos/pagination.dtos'
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
    @QueryInt('limit', 20) limit: number,
    @QueryInt('offset', 0) offset: number,
    @Body(validateModel()) comment: CommentRequestPayload,
  ): CommentResponsePayload {
    return undefined
  }

  @Get()
  getCommentsFromAnArticle(
    @Param() slug: string,
    @QueryInt('limit', 20) limit: number,
    @QueryInt('offset', 0) offset: number,
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
