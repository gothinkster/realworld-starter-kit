import { Article, Author, Sluged } from './models'
import { ContentManagementSystem } from './cms.service'
import { AuthorsService } from '../authors/service'
import { ArticleNotFound } from './exceptions'
import { DataSource } from 'typeorm'
import { initializePostgresDataSource } from '../global/global.module'

let dataSource: DataSource
beforeAll(async () => {
  dataSource = await initializePostgresDataSource()
})

afterAll(async () => {
  await dataSource.destroy()
})

let author: Author
let cms: ContentManagementSystem
let exampleArticle: Sluged<Article>

beforeEach(async () => {
  const randomNumber = Date.now() % 10 ** 9
  exampleArticle = {
    title: `How to train your dragon? ${randomNumber}`,
    description: "You should train your dragon before it's too late",
    body: 'Feed it with fish',
    tags: ['dragons', 'friendship'],
    slug: `how-to-train-your-dragon-${randomNumber}`,
  }
  author = await new AuthorsService().createForAccount(
    { id: randomNumber },
    { username: `john-doe-${randomNumber}` },
  )
  cms = new ContentManagementSystem(author)
})

describe('Content Management System', () => {
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
