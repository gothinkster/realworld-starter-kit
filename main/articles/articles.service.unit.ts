import {
  Article,
  ArticleNotFound,
  ArticlesService,
  ContentManagementSystem,
  Sluged,
  Tagged,
} from './articles.service'
import { DataSource } from 'typeorm'
import { getPostgresDataSource } from '../global/global.module'
import { AuthorsService } from '../authors/authors.service'

let dataSource: DataSource
beforeAll(async () => {
  dataSource = await getPostgresDataSource().initialize()
})

afterAll(async () => {
  await dataSource.destroy()
})

let author: { id: number; username: string }
let service: ArticlesService
let exampleArticle: Sluged & Article & Tagged
let testRandomNumber: number

beforeEach(async () => {
  testRandomNumber = Date.now() % 10 ** 9
  exampleArticle = {
    title: `How to train your dragon? ${testRandomNumber}`,
    description: "You should train your dragon before it's too late",
    body: 'Feed it with fish',
    tags: ['dragons', 'friendship'],
    slug: `how-to-train-your-dragon-${testRandomNumber}`,
  }

  const authorsService = new AuthorsService()
  author = await authorsService.createUserAuthorProfile(
    { id: testRandomNumber },
    { username: `john-doe-${testRandomNumber}` },
  )

  service = new ArticlesService(authorsService)
})

describe('Article', () => {
  it('should be accessible to other users after published', async () => {
    // Arrange
    const cms = service.getCMS(author)
    await cms.createArticle(exampleArticle)
    await cms.publishArticle(exampleArticle.slug)

    // Act
    const article = await service.getView(null).getArticle(exampleArticle.slug)

    // Assert
    expect(article).toMatchObject(exampleArticle)
  })

  it('should always be accessible to the author', async () => {
    // Arrange
    const cms = service.getCMS(author)
    await cms.createArticle(exampleArticle)

    // Act
    const article = await service
      .getView(author)
      .getArticle(exampleArticle.slug)

    // Assert
    expect(article).toMatchObject({
      title: exampleArticle.title,
      body: exampleArticle.body,
    })
  })

  it('should not be accessible to other users if not published', async () => {
    // Arrange
    const cms = service.getCMS(author)
    await cms.createArticle(exampleArticle)

    // Act - Assert
    await expect(
      service.getView().getArticle(exampleArticle.slug),
    ).rejects.toThrow(ArticleNotFound)

    await expect(
      service.getView({ id: 10 }).getArticle(exampleArticle.slug),
    ).rejects.toThrow(ArticleNotFound)
  })

  it('should return article by tag', async () => {
    // Arrange
    const example = { ...exampleArticle, tags: ['programming', 'physics'] }
    const cms = service.getCMS(author)
    await cms.createArticle(example)

    // Act
    const articles = await service
      .getView(author)
      .getArticlesByFilters({ tags: ['programming'] })

    // Assert
    expect(articles).toContainEqual(
      expect.objectContaining({
        ...example,
        tags: expect.arrayContaining(['physics', 'programming']),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        author: expect.objectContaining({
          username: author.username,
        }),
      }),
    )
  })
})

describe('Content Management System', () => {
  it("should let author change it's own article", async () => {
    // Arange
    const cms = service.getCMS(author)
    await cms.createArticle(exampleArticle)

    // Act
    const article = await cms.updateArticle(exampleArticle.slug, {
      body: 'Other body',
      tags: ['physics', 'programming'],
    })

    // Assert
    expect(article).toMatchObject({
      title: exampleArticle.title,
      body: 'Other body',
      tags: expect.arrayContaining(['physics', 'programming']),
    })
  })

  it('should not let another author change the article', async () => {
    // Arange
    const cms = service.getCMS(author)
    await cms.createArticle(exampleArticle)

    // Arrange
    const cmsForOtherAuthor = new ContentManagementSystem({ id: 2 }, dataSource)

    // Act - Assert
    await expect(() =>
      cmsForOtherAuthor.updateArticle(exampleArticle.slug, {
        title: 'Other title',
      }),
    ).rejects.toThrow(ArticleNotFound)
  })
})
