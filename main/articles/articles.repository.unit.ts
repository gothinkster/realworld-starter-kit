import { DataSource } from 'typeorm'
import { getPostgresDataSource } from '../global/global.module'
import {
  TypeORMArticlesRepository,
  TypeORMTagsRepository,
} from './articles.repository.typeorm'
import { makeRandomArticle } from '../__mocks__/articles'
import { ArticlesRepository, TagsRepository } from './articles.repository'

let dataSource: DataSource
let tagsRepository: TagsRepository
let articlesRepository: ArticlesRepository

beforeAll(async () => {
  dataSource = await getPostgresDataSource().initialize()
  tagsRepository = new TypeORMTagsRepository(dataSource.manager)
  articlesRepository = new TypeORMArticlesRepository(dataSource.manager)
})

afterAll(async () => {
  await dataSource.destroy()
})

let testRandomNumber: number

beforeEach(async () => {
  testRandomNumber = Date.now() % 10 ** 9
})

describe('ArticlesRepository', () => {
  it('should create article', async () => {
    // Arrange
    const { title, slug, body, description } = makeRandomArticle({
      title: `How to train your dragon? ${testRandomNumber}`,
    })

    // Act
    const createdArticle = await articlesRepository.createArticle(
      { title, slug, body, description },
      { id: testRandomNumber },
    )
    const queriedArticle = await articlesRepository.getArticles({
      filterBySlug: slug,
      owner: { id: testRandomNumber },
    })

    // Assert
    const matchObject = {
      id: expect.any(Number),
      title,
      slug,
      body,
      description,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      author: {
        id: testRandomNumber,
      },
    }
    expect(createdArticle).toMatchObject(matchObject)
    expect(queriedArticle).toEqual([{ ...matchObject, published: false }])
  })

  it('should return updated article', async () => {
    // Arrange
    const { title, slug, body, description } = makeRandomArticle({
      title: `How to train your dragon? ${testRandomNumber}`,
    })
    await articlesRepository.createArticle(
      { title, slug, body, description },
      { id: testRandomNumber },
    )

    // Act
    const updatedArticle = await articlesRepository.updateArticle(
      slug,
      { id: testRandomNumber },
      { body: 'Blabla' },
    )
    const queriedArticle = await articlesRepository.getArticles({
      filterBySlug: slug,
      owner: { id: testRandomNumber },
    })

    // Assert
    const matchObject = {
      id: expect.any(Number),
      title,
      slug,
      body: 'Blabla',
      description,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      author: {
        id: testRandomNumber,
      },
    }
    expect(updatedArticle).toMatchObject(matchObject)
    expect(queriedArticle).toEqual([{ ...matchObject, published: false }])
  })
})

describe('TagsRepository', () => {
  it('should set article tags', async () => {
    const tags = await tagsRepository.setArticleTags({ id: testRandomNumber }, [
      'dragons',
      'friendship',
    ])
    expect(tags).toEqual(['dragons', 'friendship'])
    expect(
      await tagsRepository.getArticleTags({ id: testRandomNumber }),
    ).toEqual(['dragons', 'friendship'])
  })
})
