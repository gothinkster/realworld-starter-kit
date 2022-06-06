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
