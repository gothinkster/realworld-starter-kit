import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { slugify } from '../../utils/transformation.utils'
import {
  ArticleSnapshot,
  Dated,
  PartialArticleSnapshot,
  ReadonlyArticle,
  Sluged,
} from '../articles.models'
import { EditableArticle } from '../cms/cms.models'
import { TagEntity } from './tag.entity'

@Entity({ name: 'Article' })
export class ArticleEntity
  extends BaseEntity
  implements ReadonlyArticle, EditableArticle
{
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

  @ManyToMany(() => TagEntity, (tag) => tag.articles, {
    cascade: ['insert'],
    eager: true,
  })
  @JoinTable({ name: 'ArticlesHaveTags' })
  tagList: TagEntity[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column()
  published: boolean = false

  @Column()
  authorId: number

  @BeforeInsert()
  @BeforeUpdate()
  getSlug(): string {
    this.slug = slugify(this.title)
    return this.slug
  }

  getAuthorID(): number {
    return this.authorId
  }

  isPublished(): boolean {
    return this.published
  }

  private getTags(): string[] {
    return this.tagList.map((value) => value.name)
  }

  private setTags(tags: string[]) {
    this.tagList = tags.map((value) => {
      const tag = new TagEntity()
      tag.name = value
      return tag
    })
  }

  createSnapshot(): Dated<Sluged<ArticleSnapshot>> {
    return {
      slug: this.getSlug(),
      title: this.title,
      description: this.description,
      body: this.body,
      tags: this.getTags(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  loadSnapshot(snapshot: PartialArticleSnapshot): this {
    this.title = snapshot.title ?? this.title
    this.description = snapshot.description ?? this.description
    this.body = snapshot.body ?? this.body
    if (!!snapshot.tags) {
      this.setTags(snapshot.tags)
    }
    return this
  }

  publish(): this {
    this.published = true
    return this
  }

  unpublish(): this {
    this.published = true
    return this
  }

  async delete() {
    await this.remove()
  }
}
