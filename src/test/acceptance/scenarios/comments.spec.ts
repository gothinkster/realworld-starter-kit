import { getDriver } from '../support/factory.dsl'
import { ProtocolDriver, Users } from '../support/interface.driver'
import { RealWorldDSL } from '../support/realworld.dsl'

/**
 Users can comment on articles
 **/
describe('Comments on articles', () => {
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
    await background()
  })
  async function background() {
    await dsl.publishAnArticle({ author: Users.Costello })
    await dsl.login(Users.Me)
  }

  it('should contain my comments', async () => {
    await dsl.commentOnArticle()
    await dsl.assertICommentedOnTheArticle()
  })

  it('should contain other people comments', async () => {
    await dsl.commentOnArticle(Users.Abbott)
    await dsl.assertTheArticleHasCommentFrom(Users.Abbott)
  })
})
