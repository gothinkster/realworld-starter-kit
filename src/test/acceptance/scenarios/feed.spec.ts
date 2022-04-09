import { RealWorldDSL } from '../support/realworld.dsl'
import { dslFactory } from '../support/factory.dsl'

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
    dsl.givenILogin()
    dsl.andIFollowCostello()
  }

  it('should show me I am following Costello', () => {
    dsl.thenIAmAtCostelloFollowersList()
  })

  it('should be able to unfollow an author', () => {
    dsl.whenIUnfollowCostello()
    dsl.thenIAmNotAtCostelloFollowersList()
  })

  it('should show articles from authors I follow in my feed', () => {
    dsl.whenCostelloPublishesAnArticle()
    dsl.thenICanSeeCostellosArticleInMyFeed()
  })

  it('should not show me unpublished articles', () => {
    dsl.whenCostelloPublishesAnArticle()
    dsl.butCostelloUnpublishesHisArticle()
    dsl.thenICanNotSeeCostellosArticleInMyFeed()
  })

  it('should not show articles from authors I unfollowed', () => {
    dsl.whenCostelloPublishesAnArticle()
    dsl.butIUnfollowCostello()
    dsl.thenICanNotSeeCostellosArticleInMyFeed()
  })
})
