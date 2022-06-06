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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import {
  CommentDTO,
  CommentResponsePayload,
  CommentsResponsePayload,
} from '../../domain/comments/comments.dto'
import { JWTAuthGuard } from '../security/jwt.guard'
import { QueryInt, validateModel } from '../validation/validation.utils'

@ApiTags('comments')
@Controller('domain/:slug/comments')
export class CommentsController {
  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @Post()
  addCommentToAnArticle(
    @Param() slug: string,
    @Body('comment', validateModel()) comment: CommentDTO,
    @QueryInt('limit', 20) limit?: number,
    @QueryInt('offset', 0) offset?: number,
  ): CommentResponsePayload {
    return undefined
  }

  @Get()
  getCommentsFromAnArticle(
    @Param() slug: string,
    @QueryInt('limit', 20) limit?: number,
    @QueryInt('offset', 0) offset?: number,
  ): CommentsResponsePayload {
    return undefined
  }

  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  deleteCommentFromArticle(
    @Param() slug: string,
    @Param(ParseIntPipe) id: number,
  ) {
    return undefined
  }
}
