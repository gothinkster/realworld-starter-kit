import { getDriver } from '../support/factory.dsl'
import { ProtocolDriver } from '../support/interface.driver'
import { RealWorldDSL } from '../support/realworld.dsl'

/**
 Users should be able to favorite and unfavorite articles.
 **/
describe('Favorites', () => {
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
    await dsl.login(Users.Me)
  }

  it('should include me in the favoriters list', async () => {
    await dsl.favoriteAnArticle()
    await dsl.assertIFavoritedTheArticle()
  })

  it('should exclude me from favoriters list when I unfavorite an article', async () => {
    await dsl.favoriteAnArticle()
    await dsl.undoTheFavoriting()
    await dsl.assertIDidntFavoriteTheArticle()
  })
})
