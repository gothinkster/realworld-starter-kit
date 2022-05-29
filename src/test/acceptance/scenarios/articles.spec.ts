import { ProtocolDriver, Users } from '../support/interface.driver'
import { RealWorldDSL } from '../support/realworld.dsl'
import { AppConnection, connectToNestApp } from '../support/rest.connection'
import { RestDriver } from '../support/rest.driver'

/**
 Users should be able to edit and delete articles.
 The article list is global and should return all articles, filtered by tags,
 authors and who favorited them. However, unpublished articles should be
 accessible only to the owner.
 **/
describe('Article', () => {
  let dsl: RealWorldDSL
  let driver: ProtocolDriver
  let connection: AppConnection

  beforeAll(async () => {
    connection = await connectToNestApp()
  })

  afterAll(async () => {
    await connection.stop()
  })

  beforeEach(async () => {
    driver = new RestDriver(connection.axios)
    dsl = new RealWorldDSL(driver)
  })

  it('should be accessible to the author', async () => {
    await dsl.login(Users.Me)
    await dsl.createAnArticle()
    await dsl.assertICanFindTheArticle()
  })

  it('should not be found after deletion', async () => {
    await dsl.login(Users.Me)
    await dsl.createAnArticle()
    await dsl.deleteTheArticle()
    await dsl.assertICanNotFindTheArticle()
  })

  it('should be found only as the latest version', async () => {
    await dsl.login(Users.Me)
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
