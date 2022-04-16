import { createConnection, getConnection } from 'typeorm'
import { ArticleEntity } from './typeorm/article.entity'
import { CMSPersistenceTypeORM } from './typeorm/persistence.impl'
import { exampleArticle, exampleTags } from '../../utils/helpers'
import { ArticlesService } from './articles.service'
import { ArticleNotFound } from './views/views.exceptions'
import { testConnectionOptions } from '../../../test/local/local.typeorm'
import { Author } from './views/views.models'

beforeEach(() => {
  return createConnection(testConnectionOptions)
})

afterEach(() => {
  const conn = getConnection()
  return conn.close()
})

describe('Articles', () => {
  const author: Author = { getAuthorID: () => 1 }
  let service: ArticlesService

  beforeEach(() => {
    service = new ArticlesService(
      new CMSPersistenceTypeORM(getConnection().getRepository(ArticleEntity)),
    )
  })

  it('should be accessible to other users after published', async () => {
    // Arrange
    await service
      .getCMS(author)
      .createNewEditor()
      .setTitle(exampleArticle.title)
      .setDescription(exampleArticle.description)
      .setBody(exampleArticle.body)
      .setTags(exampleTags)
      .publish()
      .save()

    // Act
    const article = await service.getViews(null).getArticle(exampleArticle.slug)

    // Assert
    expect(article).toMatchObject(exampleArticle)
    expect(article.getTags()).toEqual(exampleTags)
  })

  it('should always be accessible to the author', async () => {
    // Arrange
    await service
      .getCMS(author)
      .createNewEditor()
      .setTitle(exampleArticle.title)
      .setDescription(exampleArticle.description)
      .setBody(exampleArticle.body)
      .publish()
      .save()

    // Act
    const article = await service
      .getViews(author)
      .getArticle(exampleArticle.slug)

    // Assert
    expect(article).toMatchObject(exampleArticle)
  })

  it('should not be accessible to other users if not published', async () => {
    // Arrange
    await service
      .getCMS(author)
      .createNewEditor()
      .setTitle(exampleArticle.title)
      .save()

    // Act - Assert
    await expect(
      service.getViews().getArticle(exampleArticle.slug),
    ).rejects.toThrow(ArticleNotFound)
    await expect(
      service
        .getViews({ getAuthorID: () => 10 })
        .getArticle(exampleArticle.slug),
    ).rejects.toThrow(ArticleNotFound)
  })
})
