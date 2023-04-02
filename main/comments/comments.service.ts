import { ArticlesService } from '../articles/articles.service'
import { CommentEntity } from './comments.entity'
import { Injectable } from '@nestjs/common'

export type Comment = {
  id: number
  body: string
  createdAt: Date
  updatedAt: Date
}

@Injectable()
export class CommentsService {
  constructor(private articlesService: ArticlesService) {}

  async commentArticle(me: { id: number }, slug: string, body: string) {
    const article = await this.articlesService.getView(me).getArticle(slug)
    return (await CommentEntity.create({
      body,
      author: me,
      article: article,
    }).save()) as Comment
  }

  async getCommentsFromArticle(
    slug: string,
    pagination: {
      take: number
      skip: number
    },
  ) {
    return await CommentEntity.createQueryBuilder('comment')
      .take(pagination.take)
      .skip(pagination.skip)
      .orderBy('comment.createdAt', 'DESC')
      .where(
        `comment.article_id IN (SELECT articles.id FROM articles WHERE articles.slug = :slug)`,
        { slug },
      )
      .leftJoinAndSelect('comment.author', 'author')
      .getMany()
  }

  async deleteCommentFromArticle(id: number, slug: string, me: { id: number }) {
    const result = await CommentEntity.createQueryBuilder('comment')
      .delete()
      .where({ id, author: { id: me.id } })
      .andWhere(
        `comment.article_id IN (SELECT articles.id FROM articles WHERE articles.slug = :slug)`,
        { slug },
      )
      .execute()
    if (result.affected === 0) {
      throw new CommentNotFoundException(id, slug)
    }
  }
}

export class CommentNotFoundException extends Error {
  constructor(id: number, slug: string) {
    super(`Comment with id ${id} not found in article with slug ${slug}`)
  }
}
