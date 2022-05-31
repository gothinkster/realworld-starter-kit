import {
  BaseEntity,
  Column,
  Entity,
  In,
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

  static async getOrCreateFromNames(tags: string[]): Promise<TagEntity[]> {
    let entities: TagEntity[] = await TagEntity.findBy({ name: In(tags) })
    const missingTags = tags.filter(
      (tag) => !entities.some((entity) => entity.name === tag),
    )
    const missingTagsPromises = missingTags.map((tag) =>
      TagEntity.create({ name: tag }).save(),
    )
    return entities.concat(await Promise.all(missingTagsPromises))
  }
}
