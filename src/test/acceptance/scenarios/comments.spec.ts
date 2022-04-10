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
    await background()
  })

  afterEach(async () => {
    await dsl.getDriver().stop()
  })

  async function background() {
    dsl.publishAnArticle({ author: Users.Costello })
    dsl.login()
  }

  it('should contain my comments', () => {
    dsl.commentOnArticle()
    dsl.assertICommentedOnTheArticle()
  })

  it('should contain other people comments', () => {
    dsl.commentOnArticle(Users.Abbott)
    dsl.assertTheArticleHasCommentFrom(Users.Abbott)
  })
})
