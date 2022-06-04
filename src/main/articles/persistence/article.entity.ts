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
      this.tagList = await TagEntity.getOrCreateFromNames(this.tagStrings)
    }
  }

  createSnapshot(): Dated<Sluged<ArticleSnapshot>> {
    return {
      slug: this.slug,
      title: this.title,
      description: this.description,
      body: this.body,
      tags: this.tags,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  loadSnapshot(snapshot: PartialArticleSnapshot): this {
    this.title = snapshot.title ?? this.title
    this.description = snapshot.description ?? this.description
    this.body = snapshot.body ?? this.body
    this.tags = snapshot.tags ?? this.tags
    return this
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
}
