import { RealWorldDSL } from '../support/realworld.dsl'
import { dslFactory } from '../support/factory.dsl'

/**
 Users should be able to favorite and unfavorite articles.
 **/
describe('Favorites', () => {
  let dsl: RealWorldDSL

  beforeEach(async () => {
    dsl = await dslFactory()
    await background()
  })

  afterEach(async () => {
    await dsl.getDriver().stop()
  })

  async function background() {
    await dsl.login()
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
