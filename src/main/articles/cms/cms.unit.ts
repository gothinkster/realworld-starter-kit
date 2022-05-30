import { testDataSource } from '../../database/database.providers'
import { Author } from '../articles.models'
import { exampleArticle, exampleArticle2 } from '../examples'
import { ArticlesTypeORMPersistence } from '../persistence/persistence.impl'
import { UserNotAllowedToChangeArticle } from './cms.exceptions'
import { CMSPersistence } from './cms.persistence'
import { ContentManagementSystem } from './cms.service'

beforeEach(() => {
  return testDataSource.initialize()
})

afterEach(() => {
  return testDataSource.destroy()
})

describe('Content Management System', () => {
  let persistence: CMSPersistence
  let cms: ContentManagementSystem
  const author: Author = { getAuthorID: () => 1 }

  beforeEach(() => {
    persistence = new ArticlesTypeORMPersistence()
    cms = new ContentManagementSystem(persistence, author)
  })

  it("should let author access it's own article", async () => {
    // Arrange
    await cms.createFromSnapshot(exampleArticle)

    // Act
    const article = await cms.getArticle(exampleArticle.slug)

    // Assert
    expect(article.getAuthorID()).toEqual(author.getAuthorID())
  })

  it("should let author change it's own article", async () => {
    // Arrange
    await cms.createFromSnapshot(exampleArticle)

    // Act
    const article = await cms.getArticle(exampleArticle.slug)
    await article.loadSnapshot({ body: exampleArticle2.body }).save()

    // Assert
    expect(await cms.getArticle(exampleArticle.slug)).toMatchObject({
      title: exampleArticle.title,
      body: exampleArticle2.body,
    })
  })

  it('should not let another author change the article', async () => {
    // Arrange
    await cms.createFromSnapshot(exampleArticle)

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
