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

  tags: string[]

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
    return this.tagList.map((value) => value.name).sort()
  }

  private async setTags(): Promise<this> {
    const uniqueTags = [...new Set(this.tags)].sort()
    this.tagList = await TagEntity.getOrCreateFromNames(uniqueTags)
    return this
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
    this.tags = [...new Set(snapshot.tags ?? this.tags)]
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

  async save() {
    await this.setTags()
    await super.save()
    return this
  }

  async delete() {
    await this.remove()
  }
}
