import { dslFactory } from '../support/factory.dsl'
import { Users } from '../support/interface.driver'
import { RealWorldDSL } from '../support/realworld.dsl'

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
    await dsl.publishAnArticle({ author: Users.Costello })
    await dsl.login()
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
