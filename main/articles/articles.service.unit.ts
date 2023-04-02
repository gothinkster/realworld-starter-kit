import {
  Article,
  ArticleNotFound,
  ArticlesService,
  Sluged,
  Tagged,
} from './articles.service'
import { DataSource } from 'typeorm'
import { getPostgresDataSource } from '../global/global.module'
import { AuthorsService } from '../authors/authors.service'
import { LoremIpsum } from 'lorem-ipsum'
import {
  TypeORMArticlesRepository,
  TypeORMTagsRepository,
} from './articles.repository.typeorm'

const lorem = new LoremIpsum()

function makeRandomArticle(article: Partial<Article & Tagged> = {}) {
  return {
    title: article?.title || lorem.generateSentences(1),
    description: article?.description || lorem.generateSentences(2),
    body: article?.body || lorem.generateParagraphs(1),
    tags: [
      ...new Set(
        article?.tags || lorem.generateWords(4).toLowerCase().split(' '),
      ),
    ],
  }
}

let dataSource: DataSource
let service: ArticlesService
let authorsService: AuthorsService

beforeAll(async () => {
  dataSource = await getPostgresDataSource().initialize()
  authorsService = new AuthorsService()
  service = new ArticlesService(
    authorsService,
    new TypeORMTagsRepository(),
    new TypeORMArticlesRepository(),
  )
})

afterAll(async () => {
  await dataSource.destroy()
})

let author: { id: number; username: string }
let testRandomNumber: number
let exampleArticle: Sluged & Article & Tagged

beforeEach(async () => {
  testRandomNumber = Date.now() % 10 ** 9
  exampleArticle = {
    slug: `how-to-train-your-dragon-${testRandomNumber}`,
    ...makeRandomArticle({
      title: `How to train your dragon? ${testRandomNumber}`,
    }),
  }
  author = await authorsService.createUserAuthorProfile(
    { id: testRandomNumber },
    { username: `john-doe-${testRandomNumber}`, bio: 'I am a bio', image: '' },
  )
})

describe('Article', () => {
  it('should be accessible to other users after published', async () => {
    // Arrange
    const cms = service.getCMS(author)
    await cms.createArticle(exampleArticle)
    await cms.publishArticle(exampleArticle.slug)

    // Act
    const article = await service
      .getView(undefined)
      .getArticle(exampleArticle.slug)

    // Assert
    expect(article).toMatchObject({
      ...exampleArticle,
      tags: expect.arrayContaining(exampleArticle.tags),
    })
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
      service.getView({ id: author.id + 1 }).getArticle(exampleArticle.slug),
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
    articles.forEach((article) =>
      expect(article.tags).toContainEqual('programming'),
    )
  })

  it('should return articles sorted by creation date', async () => {
    // Arrange
    const cms = service.getCMS(author)
    const createdArticles = await Promise.all([
      cms.createArticle(makeRandomArticle()),
      cms.createArticle(makeRandomArticle()),
      cms.createArticle(makeRandomArticle()),
    ])
    await Promise.all(
      createdArticles.map((article) => cms.publishArticle(article.slug)),
    )

    // Act
    const articles = await service.getView(undefined).getFeed()

    // Assert
    const dates = articles.map((a) => a.createdAt)
    expect(dates).toEqual(dates.sort((a, b) => b.getTime() - a.getTime()))
    expect(dates.length).toBeGreaterThanOrEqual(createdArticles.length)
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
    const cmsForOtherAuthor = service.getCMS({ id: 2 })

    // Act - Assert
    await expect(() =>
      cmsForOtherAuthor.updateArticle(exampleArticle.slug, {
        title: 'Other title',
      }),
    ).rejects.toThrow(ArticleNotFound)
  })
})
