import { ArticleFilters, ProtocolDriver, Users } from './interface.driver'

export class RealWorldDSL {
  constructor(private driver: ProtocolDriver) {}

  public getDriver(): ProtocolDriver {
    return this.driver
  }

  givenILogin(as: Users = Users.Me): void {}
  givenIFollowCostello() {}
  givenCostelloPublishesAnArticle(tags?: string[]) {}
  givenIFavoritedAnArticle() {}
  givenICanSeeAPublishedArticle() {}
  givenICreateAnArticle(): void {}
  givenIPublishTheArticle(): void {}
  givenIPublishAnArticle(): void {
    this.givenILogin()
    this.givenICreateAnArticle()
    this.givenIPublishTheArticle()
  }
  whenIUnfollowCostello() {}

  whenIUnpublishTheArticle() {}
  whenIDeleteTheArticle(): void {}

  whenIEditTheArticle(): void {}

  whenIFavoriteTheArticle() {}
  whenIUndoTheFavoriting() {}

  whenICommentOnCostellosArticle() {}
  whenAbbottCommentsOnCostellosArticle() {}
  whenCostelloUnpublishesHisArticle() {}

  whenICreateAnArticle = this.givenICreateAnArticle
  whenIPublishTheArticle = this.givenIPublishTheArticle
  whenCostelloPublishesAnArticle = this.givenCostelloPublishesAnArticle
  whenIPublishAnArticle = this.givenIPublishAnArticle
  andIFollowCostello = this.givenIFollowCostello
  andIEditTheArticle = this.whenIEditTheArticle
  butIUnfollowCostello = this.whenIUnfollowCostello
  butIDeleteTheArticle = this.whenIDeleteTheArticle
  butICanSeeMyArticle = this.thenICanSeeMyArticle
  butCostelloUnpublishesHisArticle = this.whenCostelloUnpublishesHisArticle

  thenICanSeeThePublishedVersionIsTheLastIWrote() {
    expect(false).toBe(true)
  }

  thenICanSeeCostellosArticleIsPublished() {
    expect(false).toBe(true)
  }

  thenICanFindTheArticleFilteringBy(filters: ArticleFilters) {
    expect(false).toBe(true)
  }

  thenICanNotFindTheArticleFilteringBy(filters: ArticleFilters) {
    expect(false).toBe(true)
  }

  thenICanSeeTheArticleInMyList(): void {
    expect(false).toBe(true)
  }

  thenICanNotSeeTheArticleInMyList(): void {
    expect(false).toBe(true)
  }

  thenICanSeeMyCommentInCostellosArticleCommentsSession() {
    expect(false).toBe(true)
  }

  thenCostellosArticleHasCommentsFrom(user: Users) {
    expect(false).toBe(true)
  }

  thenICanSeeMyselfInTheListOfFavoriters() {
    expect(false).toBe(true)
  }

  thenIAmNotInTheFavoritersList() {
    expect(false).toBe(true)
  }

  thenIAmAtCostelloFollowersList() {
    expect(false).toBe(true)
  }
  thenIAmNotAtCostelloFollowersList() {
    expect(false).toBe(true)
  }
  thenICanSeeCostellosArticleInMyFeed() {
    expect(false).toBe(true)
  }
  thenICanNotSeeCostellosArticleInMyFeed() {
    expect(false).toBe(true)
  }
  thenMyArticleCanBeFoundByOtherUsers() {
    expect(false).toBe(true)
  }
  thenMyArticleCanNotBeFoundByOtherUsers() {
    expect(false).toBe(true)
  }
  thenICanSeeMyArticle() {
    expect(false).toBe(true)
  }
}
