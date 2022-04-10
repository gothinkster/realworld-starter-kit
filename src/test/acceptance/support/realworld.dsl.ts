import {
  ArticleProps,
  ArticleDefinition,
  ProtocolDriver,
  Users,
  exampleArticle,
  exampleNewArticle,
} from './interface.driver'

export class RealWorldDSL {
  private selectedArticle: ArticleDefinition

  constructor(private driver: ProtocolDriver) {}

  public getDriver(): ProtocolDriver {
    return this.driver
  }

  login(as: Users = null): void {
    this.driver.loginAs(as || Users.Me)
  }
  follow(user: Users): void {
    this.driver.follow(user)
  }
  unfollow(user: Users): void {
    this.driver.unfollow(user)
  }

  favoriteTheArticle() {
    this.driver.favoriteArticle(this.selectedArticle)
  }

  undoTheFavoriting() {
    this.driver.unfavoriteArticle(this.selectedArticle)
  }

  createAnArticle(): void {
    this.selectedArticle = this.driver.createArticle(exampleArticle)
  }

  private requireUserLogin(action: () => void, user: Users = null): void {
    this.login(user || this.selectedArticle?.author)
    action()
    this.login()
  }

  publishTheArticle(): void {
    this.requireUserLogin(() =>
      this.driver.publishArticle(this.selectedArticle),
    )
  }

  unpublishTheArticle() {
    this.requireUserLogin(() =>
      this.driver.unpublishArticle(this.selectedArticle),
    )
  }

  deleteTheArticle(): void {
    this.requireUserLogin(() => this.driver.deleteArticle(this.selectedArticle))
  }

  editTheArticle(): void {
    this.requireUserLogin(() =>
      this.driver.editArticle(this.selectedArticle, {
        body: exampleNewArticle.body,
      }),
    )
  }

  commentOnArticle(commenter: Users = null) {
    this.requireUserLogin(
      () =>
        this.driver.commentOnArticle(
          this.selectedArticle,
          'I liked that article!',
        ),
      commenter,
    )
  }

  publishAnArticle(props: ArticleProps = {}): void {
    this.requireUserLogin(() => {
      this.createAnArticle()
      this.publishTheArticle()
    }, props.author)
  }

  favoriteAnArticle() {
    this.publishAnArticle({ author: Users.Abbott })
    this.favoriteTheArticle()
  }

  assertICanSeeTheArticle() {}
  assertThePublishedVersionIsTheLastIWrote() {}

  assertCostellosArticleIsPublished() {}

  assertICanFindTheArticleFilteringBy(filters: ArticleProps) {}

  assertICanNotFindTheArticleFilteringBy(filters: ArticleProps) {}

  assertTheArticleIsInMyList(): void {}

  assertTheArticleIsNotInMyList(): void {}

  assertICommentedOnTheArticle() {
    this.assertTheArticleHasCommentFrom(Users.Me)
  }

  assertTheArticleHasCommentFrom(commenter: Users) {}

  assertIFavoritedTheArticle() {}

  assertIDidntFavoriteTheArticle() {}

  assertIAmFollowing(user: Users) {}
  assertIAmNotFollowing(user: Users) {}
  assertTheArticleIsInMyFeed(author: Users) {}
  assertTheArticleIsNotInMyFeed() {}
  assertTheArticleCanBeFoundByOtherUsers() {}
  assertTheArticleCannotBeFoundByOtherUsers(author: Users = Users.Me) {}
}
