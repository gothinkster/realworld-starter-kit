import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common'
import {
  CommentDTO,
  CommentResponsePayload,
  CommentsResponsePayload,
} from '../dtos/comments.dto'
import { QueryInt, validateModel } from '../../../utils/validation.utils'
import { JWTAuthGuard } from '../../../utils/jwt.guard'

@Controller('articles/:slug/comments')
export class CommentsController {
  @UseGuards(JWTAuthGuard)
  @Post()
  addCommentToAnArticle(
    @Param() slug: string,
    @QueryInt('limit', 20) limit: number,
    @QueryInt('offset', 0) offset: number,
    @Body('comment', validateModel()) comment: CommentDTO,
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

  @UseGuards(JWTAuthGuard)
  @Delete(':id')
  deleteCommentFromArticle(
    @Param() slug: string,
    @Param(ParseIntPipe) id: number,
  ) {
    return undefined
  }
}
