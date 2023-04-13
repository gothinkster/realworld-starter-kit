import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  EntityManager,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Injectable } from '@nestjs/common'

export type Comment = {
  id: number
  body: string
  createdAt: Date
  updatedAt: Date
}

@Injectable()
export class CommentsRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async commentArticle(
    me: { id: number },
    article: { id: number },
    body: string,
  ) {
    return await this.entityManager
      .create(CommentEntity, {
        body,
        authorId: me.id,
        articleId: article.id,
      })
      .save()
  }

  async getCommentsFromArticle(
    article: { id: number },
    pagination: {
      take: number
      skip: number
    },
  ) {
    return await this.entityManager
      .createQueryBuilder(CommentEntity, 'comment')
      .take(pagination.take)
      .skip(pagination.skip)
      .orderBy('comment.createdAt', 'DESC')
      .where({ articleId: article.id })
      .getMany()
  }

  async deleteCommentFromArticle(
    id: number,
    article: { id: number },
    me: { id: number },
  ) {
    const result = await this.entityManager
      .createQueryBuilder(CommentEntity, 'comment')
      .delete()
      .where({ id, authorId: me.id, articleId: article.id })
      .execute()
    if (result.affected === 0) {
      throw new CommentNotFoundException(id, article)
    }
  }
}

@Entity({ name: 'comments' })
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'text', nullable: false })
  body!: string

  @Column({ type: 'integer', nullable: false })
  authorId!: number

  @Column({ type: 'integer', nullable: false })
  articleId!: number

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}

export class CommentNotFoundException extends Error {
  constructor(id: number, article: { id: number }) {
    super(`Comment with id ${id} not found in article with id ${article.id}`)
  }
}
