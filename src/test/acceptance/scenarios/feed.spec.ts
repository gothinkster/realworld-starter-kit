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
    await dsl.getDriver().init()
    await background()
  })

  afterEach(async () => {
    await dsl.getDriver().stop()
  })

  async function background() {
    dsl.loginAs(Users.Me)
    dsl.follow(Users.Costello)
  }

  it('should show me I am following Costello', () => {
    dsl.assertIAmAtFollowersListFor(Users.Costello)
  })

  it('should be able to unfollow an author', () => {
    dsl.unfollow(Users.Costello)
    dsl.assertIAmNotAtFollowersListFor(Users.Costello)
  })

  it('should show articles from authors I follow in my feed', () => {
    dsl.publishAnArticle(Users.Costello)
    dsl.assertMyFeedHasAnArticleFrom(Users.Costello)
  })

  it('should not show me unpublished articles', () => {
    dsl.publishAnArticle(Users.Costello)
    dsl.unpublishArticlesFrom(Users.Costello)
    dsl.assertMyFeedHasNotAnArticleFrom(Users.Costello)
  })

  it('should not show articles from authors I unfollowed', () => {
    dsl.publishAnArticle(Users.Costello)
    dsl.unfollow(Users.Costello)
    dsl.assertMyFeedHasNotAnArticleFrom(Users.Costello)
  })
})
