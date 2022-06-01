import {
  ArticleSnapshot,
  Author,
  Dated,
} from '../../main/articles/articles.models'
import { ArticlesService } from '../../main/articles/articles.service'
import { ContentManagementSystem } from '../../main/articles/cms/cms.service'
import { exampleArticle, exampleTags } from '../../main/articles/examples'
import { ArticleEntity } from '../../main/articles/persistence/article.entity'
import { ArticleNotFound } from '../../main/articles/views/views.exceptions'
import { testDataSource } from '../utils'

beforeEach(() => {
  return testDataSource.initialize()
})

afterEach(() => {
  return testDataSource.destroy()
})

describe('Article', () => {
  const author: Author = { getAuthorID: () => 1 }
  let service: ArticlesService
  let cms: ContentManagementSystem

  beforeEach(() => {
    service = new ArticlesService(testDataSource.getRepository(ArticleEntity))
    cms = service.getCMS(author)
  })

  it('should be accessible to other users after published', async () => {
    // Arrange
    await cms.createFromSnapshot(exampleArticle, true)

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
    await cms.createFromSnapshot(exampleArticle)

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
    await cms.createFromSnapshot(exampleArticle)

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
    await cms.createFromSnapshot({
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
    await cms.createFromSnapshot({
      title: 'One article',
      description: 'One article',
      body: 'One article',
      tags: ['programming', 'physics'],
    })
    await cms.createFromSnapshot({
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
