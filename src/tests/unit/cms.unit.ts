import { Repository } from 'typeorm'
import { Author } from '../../main/articles/articles.models'
import { ContentManagementSystem } from '../../main/articles/cms/cms.service'
import { exampleArticle, exampleArticle2 } from '../../main/articles/examples'
import { ArticleEntity } from '../../main/articles/persistence/article.entity'
import { ArticleNotFound } from '../../main/articles/views/views.exceptions'
import { testDataSource } from '../utils'

beforeEach(() => {
  return testDataSource.initialize()
})

afterEach(() => {
  return testDataSource.destroy()
})

describe('Content Management System', () => {
  let repository: Repository<ArticleEntity>
  let cms: ContentManagementSystem
  const author: Author = { getAuthorID: () => 1 }

  beforeEach(async () => {
    repository = testDataSource.getRepository(ArticleEntity)
    cms = new ContentManagementSystem(repository, author)
  })

  it("should let author access it's own article", async () => {
    // Arange
    await cms.createFromSnapshot(exampleArticle)

    // Act
    const article = await cms.getArticle(exampleArticle.slug)

    // Assert
    expect(article.authorId).toEqual(author.getAuthorID())
  })

  it("should let author change it's own article", async () => {
    // Arange
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
    // Arange
    await cms.createFromSnapshot(exampleArticle)

    // Arrange
    const cmsForOtherAuthor = new ContentManagementSystem(repository, {
      getAuthorID: () => 2,
    })

    // Act - Assert
    await expect(() =>
      cmsForOtherAuthor.getArticle(exampleArticle.slug),
    ).rejects.toThrow(ArticleNotFound)
  })
})
