import { Injectable } from '@nestjs/common'
import { CommentEntity } from '../../persistence/comment.entity'
import { ArticlesService } from '../articles/articles.service'
import { Pagination } from '../articles/finder'
import { Account } from '../authors/models'
import { AuthorsService } from '../authors/service'

@Injectable()
export class CommentsService {
  constructor(
    private articlesService: ArticlesService,
    private authorsService: AuthorsService,
  ) {}

  async commentArticle(parameters: {
    account: Account
    body: string
    slug: string
  }): Promise<CommentEntity> {
    const me = await this.authorsService.getByAccount(parameters.account)
    const article = await this.articlesService
      .getView(me)
      .getArticle(parameters.slug)
    return await CommentEntity.create({
      body: parameters.body,
      author: me,
      article: article,
    }).save()
  }

  async getCommentsFromArticle(
    slug: string,
    pagination: Pagination,
  ): Promise<CommentEntity[]> {
    const article = await this.articlesService.getView().getArticle(slug)
    return await CommentEntity.createQueryBuilder('comment')
      .take(pagination.take)
      .skip(pagination.skip)
      .orderBy('comment.createdAt', 'DESC')
      .where({ article: article })
      .leftJoinAndSelect('comment.author', 'author')
      .getMany()
  }

  async deleteCommentFromArticle(
    id: number,
    slug: string,
    account: Account,
  ): Promise<void> {
    const me = await this.authorsService.getByAccount(account)
    const article = await this.articlesService.getView(me).getArticle(slug)
    await CommentEntity.createQueryBuilder('comment')
      .delete()
      .where({ article: article, author: me, id: id })
      .execute()
  }
}
