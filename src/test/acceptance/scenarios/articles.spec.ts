import { getDriver } from '../support/factory.dsl'
import { ProtocolDriver, Users } from '../support/interface.driver'
import { RealWorldDSL } from '../support/realworld.dsl'

/**
 Users should be able to edit and delete articles.
 The article list is global and should return all articles, filtered by tags,
 authors and who favorited them. However, unpublished articles should be
 accessible only to the owner.
 **/
describe('Article', () => {
  let dsl: RealWorldDSL
  let driver: ProtocolDriver

  beforeAll(async () => {
    driver = getDriver()
    await driver.init()
  })

  afterAll(async () => {
    await driver.stop()
  })

  beforeEach(async () => {
    dsl = new RealWorldDSL(driver)
  })

  it('should appear in my private list after creation', async () => {
    await dsl.login()
    await dsl.createAnArticle()
    await dsl.assertTheArticleIsInMyList()
  })

  it('should not be found after deletion', async () => {
    await dsl.login()
    await dsl.publishAnArticle()
    await dsl.deleteTheArticle()
    await dsl.assertTheArticleIsNotInMyList()
  })

  it('should be found only as the latest version', async () => {
    await dsl.login()
    await dsl.publishAnArticle()
    await dsl.editTheArticle()
    await dsl.assertThePublishedVersionIsTheLastIWrote()
  })

  it('should be shown in the global feed', async () => {
    await dsl.publishAnArticle({ author: Users.Costello })
    await dsl.assertTheArticleIsPublished()
  })

  it('should be excluded from search by author', async () => {
    await dsl.publishAnArticle({ author: Users.Costello })
    await dsl.assertICanNotFindTheArticleFilteringBy({ author: Users.Abbott })
  })

  it('should be found by tag', async () => {
    await dsl.publishAnArticle({
      author: Users.Costello,
      tags: ['physics', 'programming'],
    })
    await dsl.assertICanFindTheArticleFilteringBy({ tags: ['physics'] })
  })

  it('should be excluded from search by tags', async () => {
    await dsl.publishAnArticle({
      author: Users.Costello,
      tags: ['physics', 'programming'],
    })
    await dsl.assertICanNotFindTheArticleFilteringBy({ tags: ['drinks'] })
  })
})
