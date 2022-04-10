import {
  ArticleProps,
  ArticleDefinition,
  ProtocolDriver,
  Users,
  exampleArticle,
  exampleNewArticle,
} from './interface.driver'

export class RealWorldDSL {
  private lastArticleCreated: ArticleDefinition

  constructor(private driver: ProtocolDriver) {}

  public getDriver(): ProtocolDriver {
    return this.driver
  }

  loginAs(user: Users = null): void {
    this.driver.loginAs(user || Users.Me)
  }
  follow(user: Users): void {
    this.driver.makeLoggedInUserFollow(user)
  }
  unfollow(user: Users): void {
    this.driver.makeLoggedInUserUnfollow(user)
  }

  favoriteTheArticle() {
    this.driver.favoriteArticle(this.lastArticleCreated)
  }

  undoTheFavoriting() {
    this.driver.unfavoriteArticle(this.lastArticleCreated)
  }

  createAnArticle(): void {
    this.lastArticleCreated = this.driver.createArticle(exampleArticle)
  }

  publishTheArticle(): void {
    this.driver.publishArticle(this.lastArticleCreated)
  }

  unpublishTheArticle() {
    this.driver.unpublishArticle(this.lastArticleCreated)
  }
  deleteTheArticle(): void {
    this.driver.deleteArticle(this.lastArticleCreated)
  }

  editTheArticle(): void {
    this.driver.editArticle(this.lastArticleCreated, {
      body: exampleNewArticle.body,
    })
  }

  commentOnArticleAs(commenter: Users = null) {
    this.loginAs(commenter)

    this.driver.commentOnArticle(
      this.lastArticleCreated,
      'I liked that article!',
    )

    this.loginAs()
  }

  unpublishArticlesFrom(author: Users) {
    this.loginAs(author)

    this.unpublishTheArticle()

    this.loginAs()
  }

  publishAnArticle(props: ArticleProps = {}): void {
    this.loginAs(props.author)

    this.createAnArticle()
    this.publishTheArticle()

    this.loginAs()
  }

  favoriteAnArticle() {
    this.publishAnArticle({ author: Users.Abbott })
    this.favoriteTheArticle()
  }

  assertThePublishedVersionIsTheLastIWrote() {
    expect(false).toBe(true)
  }

  assertCostellosArticleIsPublished() {
    expect(false).toBe(true)
  }

  assertICanFindTheArticleFilteringBy(filters: ArticleProps) {
    expect(false).toBe(true)
  }

  assertICanNotFindTheArticleFilteringBy(filters: ArticleProps) {
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
  assertMyFeedContainsAnArticleFrom(author: Users) {
    expect(false).toBe(true)
  }
  assertMyFeedDoesntContainAnArticleFrom(author: Users) {
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
