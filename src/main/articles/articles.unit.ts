import { testDataSource } from '../database.providers'
import { ArticleSnapshot, Author, Dated } from './articles.models'
import { ArticlesService } from './articles.service'
import { exampleArticle, exampleTags } from './examples'
import { ArticlesTypeORMPersistence } from './persistence/persistence.impl'
import { ArticleNotFound } from './views/views.exceptions'

beforeEach(() => {
  return testDataSource.initialize()
})

afterEach(() => {
  return testDataSource.destroy()
})

describe('Article', () => {
  const author: Author = { getAuthorID: () => 1 }
  let service: ArticlesService

  beforeEach(() => {
    const persistence = new ArticlesTypeORMPersistence()
    service = new ArticlesService(persistence)
  })

  it('should be accessible to other users after published', async () => {
    // Arrange
    await service.getCMS(author).createFromSnapshot(exampleArticle, true)

    // Act
    const article: Dated<ArticleSnapshot> = await service
      .getViews(null)
      .getArticle(exampleArticle.slug)
      .then((v) => v.createSnapshot())

    // Assert
    expect(article).toMatchObject(exampleArticle)
    expect(article.tags).toEqual(exampleTags)
  })

  it('should always be accessible to the author', async () => {
    // Arrange
    await service.getCMS(author).createFromSnapshot(exampleArticle)

    // Act
    const article = await service
      .getViews(author)
      .getArticle(exampleArticle.slug)

    // Assert
    expect(article).toMatchObject({
      title: exampleArticle.title,
      body: exampleArticle.body,
    })
  })

  it('should not be accessible to other users if not published', async () => {
    // Arrange
    await service.getCMS(author).createFromSnapshot(exampleArticle)

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

  it('should ignore duplicated tags', async () => {
    // Arrange
    await service.getCMS(author).createFromSnapshot({
      title: exampleArticle.title,
      description: exampleArticle.description,
      body: exampleArticle.body,
      tags: ['programming', 'physics', 'programming'],
    })

    // Act
    const article: ArticleSnapshot = await service
      .getViews(author)
      .getArticle(exampleArticle.slug)
      .then((v) => v.createSnapshot())

    // Assert
    expect(article.tags).toEqual(['physics', 'programming'])
  })

  it('should be able to reuse tags from other articles', async () => {
    // Arrange
    await service.getCMS(author).createFromSnapshot({
      title: 'One article',
      description: 'One article',
      body: 'One article',
      tags: ['programming', 'physics'],
    })
    await service.getCMS(author).createFromSnapshot({
      title: 'Other article',
      description: 'Other article',
      body: 'Other article',
      tags: ['physics', 'food'],
    })

    // Act
    const article: ArticleSnapshot = await service
      .getViews(author)
      .getArticle('other-article')
      .then((v) => v.createSnapshot())

    // Assert
    expect(article.tags).toEqual(['food', 'physics'])
  })
})
