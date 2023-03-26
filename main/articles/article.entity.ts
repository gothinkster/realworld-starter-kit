import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
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
import { AuthorEntity } from './author.entity'
import { Tag } from './tag.entity'
import { ArticleFields, FullArticle } from './models'
import { CommentEntity } from '../comments/comment.entity'
import { slugify } from './slug.utils'

@Entity({ name: 'articles' })
export class ArticleEntity extends BaseEntity implements FullArticle {
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

  @ManyToOne(() => AuthorEntity, (profile) => profile.articles)
  author: AuthorEntity

  @OneToMany(() => CommentEntity, (comment) => comment.article)
  comments: CommentEntity[]

  @BeforeInsert()
  @BeforeUpdate()
  private slugify() {
    this.slug = slugify(this.title)
  }

  private tagStrings: string[]

  get tags(): string[] {
    return this.tagList ? this.tagList.map((value) => value.name).sort() : []
  }

  set tags(tags: string[]) {
    this.tagStrings = [...new Set(tags)]
  }

  private async persistTags() {
    if (this.tagStrings) {
      this.tagList = await Tag.getOrCreateFromNames(this.tagStrings)
    }
  }
  publish(): this {
    this.published = true
    return this
  }

  unpublish(): this {
    this.published = false
    return this
  }
  async save() {
    await this.persistTags()
    await super.save()
    return this
  }

  async delete() {
    await this.remove()
  }

  loadData(data: ArticleFields): this {
    for (let key of ['title', 'description', 'body', 'tags']) {
      if (data[key]) {
        this[key] = data[key]
      }
    }
    return this
  }
}
