import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  In,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  SelectQueryBuilder,
  UpdateDateColumn,
} from 'typeorm'
import { slugify } from './slug.utils'
import { Brackets } from 'typeorm/query-builder/Brackets'
import { AuthorEntity, UserFollows } from '../authors/authors.entity'
import { CommentEntity } from '../comments/comments.entity'
import {
  ArticleFields,
  ArticleNotFound,
  Author,
  FullArticle,
} from './articles.service'

export class ArticleFinder {
  private readonly qb: SelectQueryBuilder<ArticleEntity>
  slug: string

  constructor(private page = { take: 20, skip: 0 }) {
    this.qb = ArticleEntity.createQueryBuilder('article').where('true')
  }

  filterBySlug(slug: string) {
    this.qb.andWhere({ slug: slug })
    this.slug = slug
    return this
  }

  filterByAuthor(author: Author) {
    this.qb.andWhere(`${this.qb.alias}.author_id = :authorId`, {
      authorId: author.id,
    })
    return this
  }

  filterByTags(tags: string[]) {
    if (tags && tags !== []) {
      this.qb.andWhere(`tags.name IN (:...tags)`, { tags: tags })
    }
    return this
  }

  filterByPublishedOrOwnedBy(author?: Author) {
    this.qb.andWhere(
      new Brackets((qb) => {
        qb.where({ published: true })
        if (author) {
          qb.orWhere(`${this.qb.alias}.author_id = :authorId`, {
            authorId: author.id,
          })
        }
      }),
    )
    return this
  }

  filterByPublished() {
    this.qb.andWhere({ published: true })
    return this
  }

  filterByFollowedBy(user: Author) {
    const userFollows = UserFollows.createQueryBuilder('uf')
      .select('uf.follows_id')
      .where('uf.user_id = :userId', { userId: user.id })
    this.qb.andWhere(
      `${this.qb.alias}.author_id IN (${userFollows.getQuery()})`,
      userFollows.getParameters(),
    )
    return this
  }

  private finalize(): this {
    this.qb
      .leftJoinAndSelect(`${this.qb.alias}.tagList`, 'tags')
      .leftJoinAndSelect(`${this.qb.alias}.author`, 'authors')
      .take(this.page?.take || 20)
      .skip(this.page?.skip || 0)
      .orderBy(`${this.qb.alias}.createdAt`, 'DESC')
    return this
  }

  async getOne(): Promise<ArticleEntity> {
    const article = await this.finalize().qb.getOne()
    if (!article) {
      throw new ArticleNotFound(this.slug)
    }
    return article
  }

  async getMany(): Promise<ArticleEntity[]> {
    return await this.finalize().qb.getMany()
  }
}

@Entity({ name: 'tags' })
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, update: false, nullable: false })
  name: string

  @ManyToMany(() => ArticleEntity, (article) => article.tagList)
  articles: ArticleEntity[]

  static async getOrCreateFromNames(tags: string[]): Promise<Tag[]> {
    const entities: Tag[] = await Tag.findBy({ name: In(tags) })
    const missingTags = tags.filter(
      (tag) => !entities.some((entity) => entity.name === tag),
    )
    const missingTagsEntitiesPromises = missingTags.map((tag) =>
      Tag.getRepository().create({ name: tag }).save(),
    )
    return entities.concat(await Promise.all(missingTagsEntitiesPromises))
  }
}

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
    for (const key of ['title', 'description', 'body'] as const) {
      if (data[key]) {
        this[key] = data[key]
      }
    }
    this.tags = data.tags ?? this.tags
    return this
  }
}
