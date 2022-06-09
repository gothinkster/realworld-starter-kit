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
import { ProfileEntity } from './profiles.entity'

@Entity({ name: 'Comment' })
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text', nullable: false })
  body: string

  @ManyToOne(() => ProfileEntity, (profile) => profile.comments)
  author: ProfileEntity

  @ManyToOne(() => ArticleEntity, (article) => article.comments)
  article: ArticleEntity

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
