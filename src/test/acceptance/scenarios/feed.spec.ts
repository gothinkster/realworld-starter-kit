import { RealWorldDSL } from '../support/realworld.dsl'
import { dslFactory } from '../support/factory.dsl'
import { Users } from '../support/interface.driver'

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
    dsl.login()
    dsl.follow(Users.Costello)
  }

  it('should show me I am following Costello', () => {
    dsl.assertIAmFollowing(Users.Costello)
  })

  it('should be able to unfollow an author', () => {
    dsl.unfollow(Users.Costello)
    dsl.assertIAmNotFollowing(Users.Costello)
  })

  it('should show articles from authors I follow in my feed', () => {
    dsl.publishAnArticle({ author: Users.Costello })
    dsl.assertTheArticleIsInMyFeed(Users.Costello)
  })

  it('should not show me unpublished articles', () => {
    dsl.publishAnArticle({ author: Users.Costello })
    dsl.unpublishTheArticle()
    dsl.assertTheArticleIsNotInMyFeed()
  })

  it('should not show articles from authors I unfollowed', () => {
    dsl.publishAnArticle({ author: Users.Costello })
    dsl.unfollow(Users.Costello)
    dsl.assertTheArticleIsNotInMyFeed()
  })

  it('should not show articles from authors I unfollowed', () => {
    await dsl.publishAnArticle({ author: Users.Costello })
    await dsl.unfollow(Users.Costello)
    await dsl.assertTheArticleIsNotInMyFeed()
  })
})
