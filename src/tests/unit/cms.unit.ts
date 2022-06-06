import { ContentManagementSystem } from '../../main/domain/articles/cms.service'
import { ArticleNotFound } from '../../main/domain/articles/exceptions'
import { Author } from '../../main/domain/articles/models'
import { exampleArticle } from '../examples'
import { testDataSource } from '../utils'

beforeEach(() => {
  return testDataSource.initialize()
})

afterEach(() => {
  return testDataSource.destroy()
})

describe('Content Management System', () => {
  let cms: ContentManagementSystem
  const author: Author = { id: 1 }

  beforeEach(async () => {
    cms = new ContentManagementSystem(author)
  })

  it("should let author change it's own article", async () => {
    // Arange
    await cms.createArticle(exampleArticle)

    // Act
    const article = await cms.updateArticle(exampleArticle.slug, {
      body: 'Other body',
    })

    // Assert
    expect(article).toMatchObject({
      title: exampleArticle.title,
      body: 'Other body',
    })
  })

  it('should not let another author change the article', async () => {
    // Arange
    await cms.createArticle(exampleArticle)

    // Arrange
    const cmsForOtherAuthor = new ContentManagementSystem({ id: 2 })

    // Act - Assert
    await expect(() =>
      cmsForOtherAuthor.updateArticle(exampleArticle.slug, {
        title: 'Other title',
      }),
    ).rejects.toThrow(ArticleNotFound)
  })
})
