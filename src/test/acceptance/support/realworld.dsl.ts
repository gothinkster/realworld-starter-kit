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

  getDriver = () => this.driver
  login = (as: Users = null) => this.driver.loginAs(as || Users.Me)
  follow = this.driver.follow
  unfollow = this.driver.unfollow
  favoriteTheArticle = () => this.driver.favoriteArticle(this.selectedArticle)
  undoTheFavoriting = () => this.driver.unfavoriteArticle(this.selectedArticle)
  createAnArticle = () => this.driver.createArticle(exampleArticle)

  private async requireUserLogin(
    action: () => Promise<void>,
    user: Users = null,
  ) {
    await this.login(user || this.selectedArticle?.author)
    await action()
    await this.login()
  }

  async publishTheArticle() {
    await this.requireUserLogin(
      async () => await this.driver.publishArticle(this.selectedArticle),
    )
  }

  async unpublishTheArticle() {
    await this.requireUserLogin(async () =>
      this.driver.unpublishArticle(this.selectedArticle),
    )
  }

  async deleteTheArticle() {
    await this.requireUserLogin(async () =>
      this.driver.deleteArticle(this.selectedArticle),
    )
  }

  async editTheArticle() {
    await this.requireUserLogin(
      async () =>
        await this.driver.editArticle(this.selectedArticle, {
          body: exampleNewArticle.body,
        }),
    )
  }

  async commentOnArticle(commenter: Users = null) {
    await this.requireUserLogin(
      async () =>
        await this.driver.commentOnArticle(
          this.selectedArticle,
          'I liked that article!',
        ),
      commenter,
    )
  }

  async publishAnArticle(props: ArticleProps = {}) {
    await this.requireUserLogin(async () => {
      await this.createAnArticle()
      await this.publishTheArticle()
    }, props.author)
  }

  async favoriteAnArticle() {
    await this.publishAnArticle({ author: Users.Abbott })
    await this.favoriteTheArticle()
  }

  assertICanSeeTheArticle() {}

  assertThePublishedVersionIsTheLastIWrote() {}

  assertTheArticleIsPublished() {}

  assertICanFindTheArticleFilteringBy(filters: ArticleProps) {}

  assertICanNotFindTheArticleFilteringBy(filters: ArticleProps) {}

  assertTheArticleIsInMyList() {}

  assertTheArticleIsNotInMyList() {}

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
