import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { AuthorEntity } from '../authors/authors.entity'
import { CommentEntity } from '../comments/comments.entity'

@Entity({ name: 'tags' })
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, update: false, nullable: false })
  name: string

  @ManyToMany(() => ArticleEntity, (article) => article.tagList, {
    // onDelete: 'CASCADE',
    // nullable: false,
  })
  articles: ArticleEntity[]
}

@Entity({ name: 'articles' })
export class ArticleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  slug: string

  @Column({ unique: true, type: 'text' })
  title: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'text', nullable: true })
  body: string

  @ManyToMany(() => Tag, (tag) => tag.articles, {
    cascade: ['insert'],
    eager: true,
  })
  @JoinTable({ name: 'articles_have_tags' })
  tagList: Tag[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column()
  published: boolean = false

  @ManyToOne(() => AuthorEntity, (profile) => profile.articles, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'author_id' })
  author: AuthorEntity

  @OneToMany(() => CommentEntity, (comment) => comment.article)
  comments: CommentEntity[]
}
