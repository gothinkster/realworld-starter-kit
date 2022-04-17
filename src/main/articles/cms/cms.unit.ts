import { ContentManagementSystem } from './cms.service'
import { CMSPersistence } from './cms.persistence'
import { createConnection, getConnection } from 'typeorm'
import { ArticleEntity } from '../persistence/article.entity'
import { UserNotAllowedToChangeArticle } from './cms.exceptions'
import { CMSPersistenceTypeORM } from '../persistence/persistence.impl'
import { testConnectionOptions } from '../../../test/local/local.typeorm'
import { Author } from '../views/views.models'
import { exampleArticle, exampleArticle2 } from '../../utils/test.utils'

beforeEach(() => {
  return createConnection(testConnectionOptions)
})

afterEach(() => {
  const conn = getConnection()
  return conn.close()
})

describe('Content Management System', () => {
  let persistence: CMSPersistence
  let cms: ContentManagementSystem
  const author: Author = { getAuthorID: () => 1 }

  beforeEach(() => {
    persistence = new CMSPersistenceTypeORM(
      getConnection().getRepository(ArticleEntity),
    )
    cms = new ContentManagementSystem(persistence, author)
  })

  it("should let author access it's own article", async () => {
    // Arrange
    await cms
      .createNewEditor()
      .setTitle(exampleArticle.title)
      .setBody(exampleArticle.body)
      .save()

    // Act
    const article = await cms.getArticle(exampleArticle.slug)

    // Assert
    expect(article.getAuthorID()).toEqual(author.getAuthorID())
  })

  it("should let author change it's own article", async () => {
    // Arrange
    await cms
      .createNewEditor()
      .setTitle(exampleArticle.title)
      .setDescription(exampleArticle.description)
      .setBody(exampleArticle.body)
      .save()

    // Act
    const article = await cms.getArticle(exampleArticle.slug)
    await article.getEditor().setBody(exampleArticle2.body).save()

    // Assert
    expect(await cms.getArticle(exampleArticle.slug)).toMatchObject({
      ...exampleArticle,
      body: exampleArticle2.body,
    })
  })

  it('should not let another author change the article', async () => {
    // Arrange
    await cms
      .createNewEditor()
      .setTitle(exampleArticle.title)
      .setBody(exampleArticle.body)
      .save()

    //
    const cmsForOtherAuthor = new ContentManagementSystem(persistence, {
      getAuthorID: () => 10,
    })

    // Act - Assert
    await expect(() =>
      cmsForOtherAuthor.getArticle(exampleArticle.slug),
    ).rejects.toThrow(UserNotAllowedToChangeArticle)
  })
})
