import { RealWorldDSL } from '../support/realworld.dsl'
import { dslFactory } from '../support/factory.dsl'

/**
 Users should be able to favorite and unfavorite articles.
 **/
describe('Favorites', () => {
  let dsl: RealWorldDSL

  beforeEach(async () => {
    dsl = await dslFactory()
    await dsl.getDriver().init()
    await background()
  })

  afterEach(async () => {
    await dsl.getDriver().stop()
  })

  async function background() {
    dsl.givenILogin()
  }

  it('should include me in the favoriters list', () => {
    dsl.givenICanSeeAPublishedArticle()
    dsl.whenIFavoriteTheArticle()
    dsl.thenICanSeeMyselfInTheListOfFavoriters()
  })

  it('should exclude me from favoriters list when I unfavorite an article', () => {
    dsl.givenIFavoritedAnArticle()
    dsl.whenIUndoTheFavoriting()
    dsl.thenIAmNotInTheFavoritersList()
  })
})
