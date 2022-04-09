import { ArticleFilters, ProtocolDriver, Users } from './interface.driver'

export class RealWorldDSL {
  constructor(private driver: ProtocolDriver) {}

  public getDriver(): ProtocolDriver {
    return this.driver
  }

  loginAs(user: Users = Users.Me): void {}
  follow(user: Users): void {}
  unfollow(user: Users): void {}

  createAnArticle(): void {}
  publishTheArticle(): void {}

  unpublishTheArticle() {}
  deleteTheArticle(): void {}

  editTheArticle(): void {}

  favoriteTheArticle() {}
  undoTheFavoriting() {}

  commentOnArticleFrom(author: Users, as: Users = null) {}

  unpublishArticlesFrom(author: Users) {}

  publishAnArticle(author: Users = Users.Me, tags: string[] = null): void {
    this.loginAs(author)
    this.createAnArticle()
    this.publishTheArticle()
  }

  favoriteAnArticle() {
    this.publishAnArticle(Users.Abbott)
    this.favoriteTheArticle()
  }

  assertThePublishedVersionIsTheLastIWrote() {
    expect(false).toBe(true)
  }

  assertCostellosArticleIsPublished() {
    expect(false).toBe(true)
  }

  assertICanFindTheArticleFilteringBy(filters: ArticleFilters) {
    expect(false).toBe(true)
  }

  assertICanNotFindTheArticleFilteringBy(filters: ArticleFilters) {
    expect(false).toBe(true)
  }

  assertTheArticleIsInMyList(): void {
    expect(false).toBe(true)
  }

  assertTheArticleIsNotInMyList(): void {
    expect(false).toBe(true)
  }

  assertICommentedOnTheArticleFrom(author: Users) {
    this.assertArticleFromAuthorHasCommentFrom(author, Users.Me)
  }

  assertArticleFromAuthorHasCommentFrom(author: Users, commenter: Users) {
    expect(false).toBe(true)
  }

  assertICanSeeMeInTheListOfFavoriters() {
    expect(false).toBe(true)
  }

  assertIAmNotInTheFavoritersList() {
    expect(false).toBe(true)
  }

  assertIAmAtFollowersListFor(user: Users) {
    expect(false).toBe(true)
  }
  assertIAmNotAtFollowersListFor(user: Users) {
    expect(false).toBe(true)
  }
  assertMyFeedHasAnArticleFrom(author: Users) {
    expect(false).toBe(true)
  }
  assertMyFeedHasNotAnArticleFrom(author: Users) {
    expect(false).toBe(true)
  }
  assertMyArticleCanBeFoundByOtherUsers() {
    expect(false).toBe(true)
  }
  assertMyArticleCanNotBeFoundByOtherUsers() {
    expect(false).toBe(true)
  }
  assertICanSeeMyArticle() {
    expect(false).toBe(true)
  }
}
