import { RealWorldDSL } from '../support/realworld.dsl'
import { dslFactory } from '../support/factory.dsl'
import { Users } from '../support/interface.driver'

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
    dsl.login()
  }

  it('should include me in the favoriters list', () => {
    dsl.favoriteAnArticle()
    dsl.assertIFavoritedTheArticle()
  })

  it('should exclude me from favoriters list when I unfavorite an article', () => {
    dsl.favoriteAnArticle()
    dsl.undoTheFavoriting()
    dsl.assertIDidntFavoriteTheArticle()
  })
})
