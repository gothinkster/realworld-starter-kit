import { AppConnection, connectToNestApp } from './drivers/rest.connection'
import { RestDriver } from './drivers/rest.driver'
import { UserDSL } from './user.dsl'

let connection: AppConnection
let abbott: UserDSL
let costello: UserDSL

beforeEach(async () => {
  connection = await connectToNestApp()
  await RestDriver.createAccounts(connection.axios, ['Abbott', 'Costello'])
  await RestDriver.createProfiles(connection.axios, ['Abbott', 'Costello'])
  abbott = new UserDSL('Abbott', new RestDriver(connection.axios))
  costello = new UserDSL('Costello', new RestDriver(connection.axios))
  await abbott.login()
  await costello.login()
})

afterEach(async () => {
  await connection.stop()
})

/**
 Users should be able to edit and delete articles.
 The article list is global and should return all articles, filtered by tags,
 authors and who favorited them. However, unpublished articles should be
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
    await abbott.writeArticle({ title: 'How to train your dragon?' })
    await costello.shouldNotFindTheArticle('how-to-train-your-dragon')
  })

  it('should be found by other users after published', async () => {
    await abbott.publishAnArticle({ title: 'How to train your dragon?' })
    await costello.shouldFindTheArticle('how-to-train-your-dragon')
  })

  it.skip('should not be found by author', async () => {
    await abbott.publishAnArticle({ title: 'How to train your dragon?' })
    await costello.shouldNotFindArticleBy({ author: abbott })
  })

  it.skip('should be found by tag', async () => {
    await abbott.publishAnArticle({ tags: ['physics', 'programming'] })
    await costello.shouldFindArticleBy({ tags: ['physics'] })
  })

  it.skip('should not be found by tag', async () => {
    await abbott.publishAnArticle({ tags: ['physics', 'programming'] })
    await costello.shouldNotFindArticleBy({ tags: ['drinks'] })
  })

  it.skip('should show other people comments', async () => {
    await abbott.publishAnArticle({ title: 'How to train your dragon?' })
    await costello.commentOnArticle('how-to-train-your-dragon')
    await abbott.shouldSeeCommentFrom(costello)
  })
})

/**
 The feed is where users can see articles published by their followers
 **/
describe('Feed', () => {
  it.skip('should show articles from authors I follow', async () => {
    await costello.follow(abbott)
    await abbott.publishAnArticle({ title: 'How to train your dragon?' })
    await costello.shouldSeeTheArticleInTheFeed('how-to-train-your-dragon')
  })

  it.skip('should not show articles from authors I unfollowed', async () => {
    await costello.follow(abbott)
    await abbott.publishAnArticle({ title: 'How to train your dragon?' })
    await costello.unfollow(abbott)
    await costello.shouldNotSeeTheArticleInTheFeed('how-to-train-your-dragon')
  })

  it.skip('should not show me unpublished articles', async () => {
    await costello.follow(abbott)
    await abbott.publishAnArticle({ title: 'How to train your dragon?' })
    await abbott.unpublishTheArticle()
    await costello.shouldNotSeeTheArticleInTheFeed('how-to-train-your-dragon')
  })
})
