import { getDriver } from '../drivers/factory.dsl'
import { ProtocolDriver } from '../drivers/protocol.driver'
import { RealWorldDSL } from '../dsl/realworld.dsl'

/**
   Articles can be published and unpublished. Users should be able to write articles and not publish them.
 They can use this as an editor, which they can save their article current state, deciding to publish only
 after finishing and polishing.
 **/
describe('Feed', () => {
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
    await dsl.login()
  }

  it('should not make my article public right after I create it', async () => {
    await dsl.createAnArticle()
    await dsl.assertTheArticleCannotBeFoundByOtherUsers()
  })

  it('should make my article public after I publish it', async () => {
    await dsl.createAnArticle()
    await dsl.publishTheArticle()
    await dsl.assertTheArticleCanBeFoundByOtherUsers()
  })

  it('should be still visible for me, the author, after unpublishing', async () => {
    await dsl.publishAnArticle()
    await dsl.unpublishTheArticle()
    await dsl.assertICanFindTheArticle()
  })

  it('should unpublish my article when I decide', async () => {
    await dsl.publishAnArticle()
    await dsl.unpublishTheArticle()
    await dsl.assertTheArticleCannotBeFoundByOtherUsers()
  })
})
