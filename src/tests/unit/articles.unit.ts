import { ArticlesService } from '../../main/domain/articles/articles.service'
import { ArticleNotFound } from '../../main/domain/articles/exceptions'
import { Article, Author } from '../../main/domain/articles/models'
import { AuthorsService } from '../../main/domain/authors/service'
import { exampleArticle } from '../examples'
import { testDataSource } from '../utils'

beforeEach(() => {
  return testDataSource.initialize()
})

afterEach(() => {
  return testDataSource.destroy()
})

describe('Article', () => {
  let author: Author
  let service: ArticlesService

  beforeEach(async () => {
    author = await new AuthorsService().createForAccount(
      { id: 1 },
      { username: 'john-doe' },
    )
    service = new ArticlesService()
  })

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

  it('should ignore duplicated tags', async () => {
    // Arrange
    const cms = service.getCMS(author)
    await cms.createArticle({
      title: exampleArticle.title,
      description: exampleArticle.description,
      body: exampleArticle.body,
      tags: ['programming', 'physics', 'programming'],
    })

    // Act
    const article: Article = await service
      .getView(author)
      .getArticle(exampleArticle.slug)

    // Assert
    expect(article.tags).toEqual(['physics', 'programming'])
  })

  it('should be able to reuse tags from other domain', async () => {
    // Arrange
    const cms = service.getCMS(author)
    await cms.createArticle({
      title: 'One article',
      description: 'One article',
      body: 'One article',
      tags: ['programming', 'physics'],
    })
    await cms.createArticle({
      title: 'Other article',
      description: 'Other article',
      body: 'Other article',
      tags: ['physics', 'food'],
    })

    // Act
    const article: Article = await service
      .getView(author)
      .getArticle('other-article')

    // Assert
    expect(article.tags).toEqual(['food', 'physics'])
  })
})
