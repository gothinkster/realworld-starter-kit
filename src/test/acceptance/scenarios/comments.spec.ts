import { RealWorldDSL } from '../support/realworld.dsl'
import { dslFactory } from '../support/factory.dsl'
import { Users } from '../support/interface.driver'

/**
 Users can comment on articles
 **/
describe('Comments on articles', () => {
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
    dsl.givenCostelloPublishesAnArticle()
  }

  it('should contain my comments', () => {
    dsl.whenICommentOnCostellosArticle()
    dsl.thenICanSeeMyCommentInCostellosArticleCommentsSession()
  })

  it('should contain other people comments', () => {
    dsl.whenAbbottCommentsOnCostellosArticle()
    dsl.thenCostellosArticleHasCommentsFrom(Users.Abbott)
  })
})
