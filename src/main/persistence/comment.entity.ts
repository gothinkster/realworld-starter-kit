import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ArticleEntity } from './article.entity'
import { AuthorEntity } from './author.entity'

@Entity({ name: 'comments' })
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text', nullable: false })
  body: string

  @ManyToOne(() => AuthorEntity, (profile) => profile.comments)
  author: AuthorEntity

  @ManyToOne(() => ArticleEntity, (article) => article.comments)
  article: ArticleEntity

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
