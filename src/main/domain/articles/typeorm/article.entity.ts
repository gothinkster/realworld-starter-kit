import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { slugify } from '../../../utils/helpers'
import { EditableArticle } from '../cms/cms.models'
import { ReadonlyArticle } from '../views/views.models'
import { TagEntity } from './tag.entity'
import { EditorTypeORM } from './editor.impl'
import { SaveOptions } from 'typeorm/repository/SaveOptions'

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
  @JoinTable()
  tagList: TagEntity[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column()
  published: boolean = false

  @BeforeInsert()
  @BeforeUpdate()
  getSlug(): string {
    this.slug = slugify(this.title)
    return this.slug
  }

  getTags(): string[] {
    return this.tagList.map((value) => value.name)
  }

  getAuthorID(): number {
    return 1
  }

  isPublished(): boolean {
    return this.published
  }

  getEditor(): EditorTypeORM {
    if (!this.editor) {
      this.editor = new EditorTypeORM(this)
    }
    return this.editor
  }

  setTags(tags: string[]) {
    this.tagList = tags.map((value) => {
      const tag = new TagEntity()
      tag.name = value
      return tag
    })
  }

  private editor: EditorTypeORM
}
