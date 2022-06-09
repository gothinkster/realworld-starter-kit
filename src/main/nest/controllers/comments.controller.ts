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
import { ArticleFinder } from '../../domain/articles/finder'
import { Account } from '../../domain/profiles/models'
import { ProfilesService } from '../../domain/profiles/service'
import { CommentEntity } from '../../persistence/comment.entity'
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
  constructor(private profilesService: ProfilesService) {}

  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @Post()
  async addCommentToAnArticle(
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
    @Body('comment', validateModel()) comment: CommentDTO,
    @QueryInt('limit', 20) limit?: number,
    @QueryInt('offset', 0) offset?: number,
  ): Promise<{ comment: CommentResponseDTO }> {
    const me = await this.profilesService.getByAccount(account)
    const article = await new ArticleFinder().filterBySlug(slug).getOne()
    const commentEntity = await CommentEntity.create({
      body: comment.body,
      author: me,
      article: article,
    }).save()
    return { comment: cloneCommentToOutput(commentEntity) }
  }

  @Get()
  async getCommentsFromAnArticle(
    @Param('slug') slug: string,
    @QueryInt('limit', 20) limit?: number,
    @QueryInt('offset', 0) offset?: number,
  ): Promise<{ comments: CommentResponseDTO[] }> {
    const article = await new ArticleFinder().filterBySlug(slug).getOne()
    const comments = await CommentEntity.createQueryBuilder('comment')
      .where({ article: article })
      .leftJoinAndSelect('comment.author', 'author')
      .getMany()
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
    const article = await new ArticleFinder().filterBySlug(slug).getOne()
    const me = await this.profilesService.getByAccount(account)
    await CommentEntity.createQueryBuilder('comment')
      .delete()
      .where({ article: article, author: me, id: id })
      .execute()
  }
}
