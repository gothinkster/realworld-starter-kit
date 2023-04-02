import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ArticleEntity } from '../articles/articles.repository.typeorm'
import { AuthorEntity } from '../authors/authors.entity'

@Entity({ name: 'comments' })
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'text', nullable: false })
  body!: string

  @ManyToOne(() => AuthorEntity, (profile) => profile.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  author!: AuthorEntity

  @ManyToOne(() => ArticleEntity, (article) => article.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  article!: ArticleEntity

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
