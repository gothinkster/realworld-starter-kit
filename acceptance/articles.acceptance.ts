import { UserDSL } from './dsl/UserDSL'
import { createUsers } from './dsl/createUsers'

let abbott: UserDSL
let costello: UserDSL
let guest: UserDSL

beforeEach(async () => {
  ;({ abbott, costello, guest } = createUsers())
})

/**
 Users should be able to edit and delete domain.
 The article list is global and should return all domain, filtered by tags,
 authors and who favorited them. However, unpublished domain should be
 accessible only to the owner.
 **/
describe('Article', () => {
  it('should be found by the author', async () => {
    await abbott.login()

    await abbott.writeArticle()
    await abbott.shouldFindTheArticle()
  })

  it('should not be found after deletion', async () => {
    await abbott.login()

    await abbott.writeArticle()
    await abbott.deleteTheArticle()

    await abbott.shouldNotFindTheArticle()
    await guest.shouldNotFindTheArticle()
  })

  it('should not be found by others if not published', async () => {
    await abbott.login()
    await costello.login()

    await abbott.writeArticle()

    await costello.shouldNotFindTheArticle()
    await guest.shouldNotFindTheArticle()
  })

  it('should be found by other users after published', async () => {
    await abbott.login()
    await costello.login()

    await abbott.publishAnArticle()

    await costello.shouldFindTheArticle()
    await guest.shouldFindTheArticle()
  })

  it('should be found by correct author', async () => {
    await abbott.login()
    await costello.login()

    await abbott.publishAnArticle()

    await costello.shouldFindArticleBy({ author: abbott.username })
    await guest.shouldFindArticleBy({ author: abbott.username })
  })

  it('should not be found for other author', async () => {
    await abbott.login()
    await costello.login()

    await abbott.publishAnArticle()

    await costello.shouldNotFindArticleBy({ author: 'amy-adams' })
    await guest.shouldNotFindArticleBy({ author: 'amy-adams' })
  })

  it('should be found by correct tag', async () => {
    await abbott.login()
    await costello.login()

    await abbott.publishAnArticle({ tags: ['physics', 'programming'] })

    await costello.shouldFindArticleBy({ tags: ['physics'] })
    await guest.shouldFindArticleBy({ tags: ['physics'] })
  })

  it('should not be found by wrong tag', async () => {
    await abbott.login()
    await costello.login()

    await abbott.publishAnArticle({ tags: ['physics', 'programming'] })

    await costello.shouldNotFindArticleBy({ tags: ['drinks'] })
  })

  it('should show other people comments', async () => {
    await abbott.login()
    await costello.login()

    await abbott.publishAnArticle()
    await costello.commentOnArticle()

    await abbott.shouldSeeCommentFrom(costello)
    await guest.shouldSeeCommentFrom(costello)
  })
})
