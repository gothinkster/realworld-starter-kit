import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ArticleEntity } from './article.entity'

@Entity({ name: 'Tag' })
export class TagEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, update: false, nullable: false })
  name: string

  @ManyToMany(() => ArticleEntity, (article) => article.tagList)
  articles: ArticleEntity[]
}
