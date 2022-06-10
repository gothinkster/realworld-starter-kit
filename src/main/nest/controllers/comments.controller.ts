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
import { Account } from '../../domain/authors/models'
import { CommentsService } from '../../domain/comments/comments.service'
import { InjectAccount } from '../decorators/account.decorator'
import {
  cloneCommentToOutput,
  CommentDTO,
  CommentResponseDTO,
} from '../parsing/comments.dto'
import { JWTAuthGuard } from '../security/jwt.guard'
import { QueryInt, validateModel } from '../validation/validation.utils'

@ApiTags('comments')
@Controller('articles/:slug/comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @Post()
  async addCommentToAnArticle(
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
    @Body('comment', validateModel()) commentDTO: CommentDTO,
  ): Promise<{ comment: CommentResponseDTO }> {
    const comment = await this.commentsService.commentArticle({
      account: account,
      slug: slug,
      body: commentDTO.body,
    })
    return {
      comment: cloneCommentToOutput(comment),
    }
  }

  @Get()
  async getCommentsFromAnArticle(
    @Param('slug') slug: string,
    @QueryInt('limit', 20) limit?: number,
    @QueryInt('offset', 0) offset?: number,
  ): Promise<{ comments: CommentResponseDTO[] }> {
    const comments = await this.commentsService.getCommentsFromArticle(
      slug,
      limit,
      offset,
    )
    return {
      comments: comments.map(cloneCommentToOutput),
    }
  }

  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async deleteCommentFromArticle(
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
    @Param(ParseIntPipe) id: number,
  ) {
    await this.commentsService.deleteCommentFromArticle(id, slug, account)
  }
}
