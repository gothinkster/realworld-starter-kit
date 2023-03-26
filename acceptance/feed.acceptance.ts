import { UserDSL } from './dsl/UserDSL'
import { createUsers } from './dsl/createUsers'

let abbott: UserDSL
let costello: UserDSL

beforeEach(async () => {
  ;({ abbott, costello } = createUsers())
})

/**
 The feed is where users can see domain published by their followers
 **/
describe('Feed', () => {
  it('should show articles from authors I follow', async () => {
    await abbott.login()
    await costello.login()

    await costello.follow(abbott)
    await abbott.publishAnArticle()

    await costello.shouldSeeTheArticleInTheFeed()
  })

  it('should not show articles from authors I am not following', async () => {
    await abbott.login()
    await costello.login()

    await costello.follow(abbott)
    await abbott.publishAnArticle()
    await costello.unfollow(abbott)

    await costello.shouldNotSeeTheArticleInTheFeed()
  })

  it('should not show me unpublished articles', async () => {
    await abbott.login()
    await costello.login()

    await costello.follow(abbott)
    await abbott.publishAnArticle()
    await abbott.unpublishTheArticle()

    await costello.shouldNotSeeTheArticleInTheFeed()
  })
})
