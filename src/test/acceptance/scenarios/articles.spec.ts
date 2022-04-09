import { RealWorldDSL } from '../support/realworld.dsl'
import { dslFactory } from '../support/factory.dsl'
import { Users } from '../support/interface.driver'

/**
 Users should be able to edit and delete articles.
 The article list is global and should return all articles, filtered by tags,
 authors and who favorited them. However, unpublished articles should be
 acessible only to the owner.
 **/
describe('Article', () => {
  let dsl: RealWorldDSL

  beforeEach(async () => {
    dsl = await dslFactory()
    await dsl.getDriver().init()
  })

  afterEach(async () => {
    await dsl.getDriver().stop()
  })

  it('should appear in my private list after creation', () => {
    dsl.loginAs()
    dsl.createAnArticle()
    dsl.assertTheArticleIsInMyList()
  })

  it('should not be found after deletion', () => {
    dsl.loginAs()
    dsl.publishAnArticle()
    dsl.deleteTheArticle()
    dsl.assertTheArticleIsNotInMyList()
  })

  it('should be found only as the latest version', () => {
    dsl.loginAs()
    dsl.publishAnArticle()
    dsl.editTheArticle()
    dsl.assertThePublishedVersionIsTheLastIWrote()
  })

  it('should be shown in the global feed', () => {
    dsl.publishAnArticle(Users.Costello)
    dsl.assertCostellosArticleIsPublished()
  })

  it('should be excluded from search by author', () => {
    dsl.publishAnArticle(Users.Costello)
    dsl.assertICanNotFindTheArticleFilteringBy({ author: Users.Abbott })
  })

  it('should be found by tag', () => {
    dsl.publishAnArticle(Users.Costello, ['physics', 'programming'])
    dsl.assertICanFindTheArticleFilteringBy({ tags: ['physics'] })
  })

  it('should be excluded from search by tags', () => {
    dsl.publishAnArticle(Users.Costello, ['physics', 'programming'])
    dsl.assertICanNotFindTheArticleFilteringBy({ tags: ['drinks'] })
  })
})
