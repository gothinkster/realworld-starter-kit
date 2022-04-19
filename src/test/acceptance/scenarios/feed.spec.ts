import { dslFactory } from '../support/factory.dsl'
import { Users } from '../support/interface.driver'
import { RealWorldDSL } from '../support/realworld.dsl'

/**
 The feed is where users can see articles published by their followers
 **/
describe('Feed', () => {
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
    await dsl.follow(Users.Costello)
  }

  it('should show me I am following Costello', async () => {
    await dsl.assertIAmFollowing(Users.Costello)
  })

  it('should be able to unfollow an author', async () => {
    await dsl.unfollow(Users.Costello)
    await dsl.assertIAmNotFollowing(Users.Costello)
  })

  it('should show articles from authors I follow in my feed', async () => {
    await dsl.publishAnArticle({ author: Users.Costello })
    await dsl.assertTheArticleIsInMyFeed(Users.Costello)
  })

  it('should not show me unpublished articles', async () => {
    await dsl.publishAnArticle({ author: Users.Costello })
    await dsl.unpublishTheArticle()
    await dsl.assertTheArticleIsNotInMyFeed()
  })

  it('should not show articles from authors I unfollowed', async () => {
    await dsl.publishAnArticle({ author: Users.Costello })
    await dsl.unfollow(Users.Costello)
    await dsl.assertTheArticleIsNotInMyFeed()
  })

  it('should not show articles from authors I unfollowed', async () => {
    await dsl.publishAnArticle({ author: Users.Costello })
    await dsl.unfollow(Users.Costello)
    await dsl.assertTheArticleIsNotInMyFeed()
  })
})
