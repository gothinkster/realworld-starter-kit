import { AppConnection, connectToApp } from './drivers/main'
import { UserDSL } from './user.dsl'

let connection: AppConnection
let abbott: UserDSL
let costello: UserDSL

beforeAll(async () => {
  connection = await connectToApp()
})

afterAll(async () => {
  await connection.stop()
})

beforeEach(async () => {
  const context = {}
  abbott = new UserDSL('Abbott', connection.driverFactory(), context)
  costello = new UserDSL('Costello', connection.driverFactory(), context)
  await Promise.all([abbott, costello].map((user) => user.login()))
})

/**
 Users should be able to edit and delete domain.
 The article list is global and should return all domain, filtered by tags,
 authors and who favorited them. However, unpublished domain should be
 accessible only to the owner.
 **/
describe('Article', () => {
  it('should be found by the author', async () => {
    await abbott.writeArticle()
    await abbott.shouldFindTheArticle()
  })

  it('should not be found after deletion', async () => {
    await abbott.writeArticle()
    await abbott.deleteTheArticle()
    await abbott.shouldNotFindTheArticle()
  })

  it('should not be found by others if not published', async () => {
    await abbott.writeArticle()
    await costello.shouldNotFindTheArticle()
  })

  it('should be found by other users after published', async () => {
    await abbott.publishAnArticle()
    await costello.shouldFindTheArticle()
  })

  it('should be found by correct author', async () => {
    await abbott.publishAnArticle()
    await costello.shouldFindArticleBy({ author: abbott.username })
  })

  it('should not be found by wrong author', async () => {
    await abbott.publishAnArticle()
    await costello.shouldNotFindArticleBy({ author: costello.username })
    await costello.shouldNotFindArticleBy({ author: 'amy-adams' })
  })

  it('should be found by correct tag', async () => {
    await abbott.publishAnArticle({ tags: ['physics', 'programming'] })
    await costello.shouldFindArticleBy({ tags: ['physics'] })
  })

  it('should not be found by wrong tag', async () => {
    await abbott.publishAnArticle({ tags: ['physics', 'programming'] })
    await costello.shouldNotFindArticleBy({ tags: ['drinks'] })
  })

  it('should show other people comments', async () => {
    await abbott.publishAnArticle()
    await costello.commentOnArticle()
    await abbott.shouldSeeCommentFrom(costello)
  })
})

/**
 The feed is where users can see domain published by their followers
 **/
describe('Feed', () => {
  it('should show articles from authors I follow', async () => {
    await costello.follow(abbott)
    await abbott.publishAnArticle()
    await costello.shouldSeeTheArticleInTheFeed()
  })

  it('should not show articles from authors I am not following', async () => {
    await costello.follow(abbott)
    await abbott.publishAnArticle()
    await costello.unfollow(abbott)
    await costello.shouldNotSeeTheArticleInTheFeed()
  })

  it('should not show me unpublished articles', async () => {
    await costello.follow(abbott)
    await abbott.publishAnArticle()
    await abbott.unpublishTheArticle()
    await costello.shouldNotSeeTheArticleInTheFeed()
  })
})
