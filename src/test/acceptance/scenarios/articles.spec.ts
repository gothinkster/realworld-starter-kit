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
    dsl.givenILogin()
    dsl.whenICreateAnArticle()
    dsl.thenICanSeeTheArticleInMyList()
  })

  it('should not be found after deletion', () => {
    dsl.givenILogin()
    dsl.whenIPublishAnArticle()
    dsl.butIDeleteTheArticle()
    dsl.thenICanNotSeeTheArticleInMyList()
  })

  it('should be found only as the latest version', () => {
    dsl.givenILogin()
    dsl.whenIPublishAnArticle()
    dsl.andIEditTheArticle()
    dsl.thenICanSeeThePublishedVersionIsTheLastIWrote()
  })

  it('should be shown in the global feed', () => {
    dsl.whenCostelloPublishesAnArticle()
    dsl.thenICanSeeCostellosArticleIsPublished()
  })

  it('should be excluded from search by author', () => {
    dsl.whenCostelloPublishesAnArticle()
    dsl.thenICanNotFindTheArticleFilteringBy({ author: Users.Abbott })
  })

  it('should be found by tag', () => {
    dsl.whenCostelloPublishesAnArticle(['physics', 'programming'])
    dsl.thenICanFindTheArticleFilteringBy({ tags: ['physics'] })
  })

  it('should be excluded from search by tags', () => {
    dsl.whenCostelloPublishesAnArticle(['physics', 'programming'])
    dsl.thenICanNotFindTheArticleFilteringBy({ tags: ['drinks'] })
  })
})
