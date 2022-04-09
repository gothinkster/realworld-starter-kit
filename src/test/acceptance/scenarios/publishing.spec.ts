import { RealWorldDSL } from '../support/realworld.dsl'
import { dslFactory } from '../support/factory.dsl'

/**
   Articles can be published and unpublished. Users should be able to write articles and not publish them.
 They can use this as an editor, which they can save their article current state, deciding to publish only
 after finishing and polishing.
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
  }

  it('should not make my article public right after I create it', () => {
    dsl.whenICreateAnArticle()
    dsl.thenMyArticleCanNotBeFoundByOtherUsers()
  })

  it('should make my article public after I publish it', () => {
    dsl.givenICreateAnArticle()
    dsl.whenIPublishTheArticle()
    dsl.thenMyArticleCanBeFoundByOtherUsers()
  })

  it('should unpublish my article when I decide', () => {
    dsl.givenIPublishAnArticle()
    dsl.whenIUnpublishTheArticle()
    dsl.thenMyArticleCanNotBeFoundByOtherUsers()
    dsl.butICanSeeMyArticle()
  })
})
