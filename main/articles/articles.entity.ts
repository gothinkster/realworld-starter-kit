import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  In,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Brackets } from 'typeorm/query-builder/Brackets'
import { AuthorEntity, UserFollows } from '../authors/authors.entity'
import { CommentEntity } from '../comments/comments.entity'
import { ArticleNotFound } from './articles.service'

export class ArticleFinder {
  private readonly qb =
    ArticleEntity.createQueryBuilder('article').where('true')
  private slug: string

  constructor(private page = { take: 20, skip: 0 }) {}

  filterBySlug(slug: string) {
    this.qb.andWhere({ slug: slug })
    this.slug = slug
    return this
  }

  filterByAuthors(authors: { id: number }[]) {
    this.qb.andWhere(`${this.qb.alias}.author_id IN (:...authorIds)`, {
      authorIds: authors.map((author) => author.id),
    })
    return this
  }

  filterByTags(tags: string[]) {
    this.qb.andWhere(
      `${this.qb.alias}.id IN (
SELECT aht.${ARTICLES_TABLE}_id
FROM ${ARTICLES_HAVE_TAGS_JOIN_TABLE} AS aht
WHERE aht.${TAGS_TABLE}_id IN (
  SELECT t.id FROM ${TAGS_TABLE} AS t WHERE t.name IN (:...tags)
))`,
      { tags: tags },
    )
    return this
  }

  filterByPublishedOrOwnedBy(author?: { id: number }) {
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

  filterByFollowedBy(user: { id: number }) {
    const userFollows = UserFollows.createQueryBuilder('uf')
      .select('uf.follows_id')
      .where('uf.user_id = :userId', { userId: user.id })
    this.qb.andWhere(
      `${this.qb.alias}.author_id IN (${userFollows.getQuery()})`,
      userFollows.getParameters(),
    )
    return this
  }

  private finalizeSelectQuery() {
    this.qb
      .leftJoinAndSelect(`${this.qb.alias}.tagList`, 'tags')
      .leftJoinAndSelect(`${this.qb.alias}.author`, 'authors')
      .take(this.page?.take || 20)
      .skip(this.page?.skip || 0)
      .orderBy(`${this.qb.alias}.createdAt`, 'DESC')
    return this.qb
  }

  async getOne(): Promise<ArticleEntity> {
    const article = await this.finalizeSelectQuery().getOne()
    if (!article) {
      throw new ArticleNotFound(this.slug)
    }
    return article
  }

  async getMany(): Promise<ArticleEntity[]> {
    return await this.finalizeSelectQuery().getMany()
  }
}

const TAGS_TABLE = 'tags'
@Entity({ name: TAGS_TABLE })
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

const ARTICLES_TABLE = 'articles'
export const ARTICLES_HAVE_TAGS_JOIN_TABLE = 'articles_have_tags'
@Entity({ name: ARTICLES_TABLE })
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
  @JoinTable({ name: ARTICLES_HAVE_TAGS_JOIN_TABLE })
  tagList: Tag[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column()
  published: boolean = false

  @ManyToOne(() => AuthorEntity, (profile) => profile.articles)
  @JoinTable({ name: 'author_id' })
  author: AuthorEntity

  @OneToMany(() => CommentEntity, (comment) => comment.article)
  comments: CommentEntity[]

  get tags(): string[] {
    return this.tagList ? this.tagList.map((value) => value.name).sort() : []
  }
}
