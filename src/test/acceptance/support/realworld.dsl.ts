import {
  ArticleDefinition,
  ArticleProps,
  makeRandomArticle,
  ProtocolDriver,
  Users,
} from './interface.driver'

export class RealWorldDSL {
  private selectedArticle: ArticleDefinition

  constructor(private driver: ProtocolDriver) {}

  login = (as: Users = null) => this.driver.loginAs(as || Users.Me)
  follow = (user: Users) => this.driver.follow(user)
  unfollow = (user: Users) => this.driver.unfollow(user)
  favoriteTheArticle = () => this.driver.favoriteArticle(this.selectedArticle)
  undoTheFavoriting = () => this.driver.unfavoriteArticle(this.selectedArticle)
  async createAnArticle() {
    this.selectedArticle = await this.driver.createArticle(makeRandomArticle())
  }

  private async requireAuthorLogin<T>(
    action: () => Promise<T>,
    author: Users = null,
  ): Promise<T> {
    await this.login(author || this.selectedArticle?.author)
    const ret = await action()
    await this.login()
    return ret
  }

  publishTheArticle() {
    return this.requireAuthorLogin(() =>
      this.driver.publishArticle(this.selectedArticle),
    )
  }

  unpublishTheArticle() {
    return this.requireAuthorLogin(() =>
      this.driver.unpublishArticle(this.selectedArticle),
    )
  }

  deleteTheArticle() {
    return this.requireAuthorLogin(() =>
      this.driver.deleteArticle(this.selectedArticle),
    )
  }

  async editTheArticle() {
    this.selectedArticle = await this.requireAuthorLogin(() =>
      this.driver.editArticle(this.selectedArticle, {
        body: makeRandomArticle().body,
      }),
    )
  }

  commentOnArticle(commenter: Users = null) {
    return this.requireAuthorLogin(
      () =>
        this.driver.commentOnArticle(
          this.selectedArticle,
          'I liked that article!',
        ),
      commenter,
    )
  }

  publishAnArticle(props: ArticleProps = {}) {
    return this.requireAuthorLogin(async () => {
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

  assertTheArticleIsInMyList() {
    expect(false).toBe(true)
  }

  assertTheArticleIsNotInMyList() {}

  assertICommentedOnTheArticle = () =>
    this.assertTheArticleHasCommentFrom(Users.Me)

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
