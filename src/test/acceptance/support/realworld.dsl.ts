import { PartialArticleSnapshot } from '../../../main/articles/articles.models'
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

  login = (user: Users) => this.driver.login(user)
  follow = (user: Users) => this.driver.follow(user)
  unfollow = (user: Users) => this.driver.unfollow(user)
  favoriteTheArticle = () => this.driver.favoriteArticle(this.selectedArticle)
  undoTheFavoriting = () => this.driver.unfavoriteArticle(this.selectedArticle)

  async createAnArticle(article: PartialArticleSnapshot = {}) {
    this.selectedArticle = await this.driver.createArticle({
      ...makeRandomArticle(),
      ...article,
    })
  }

  publishTheArticle = () => this.driver.publishArticle(this.selectedArticle)
  unpublishTheArticle = () => this.driver.unpublishArticle(this.selectedArticle)
  deleteTheArticle = () => this.driver.deleteArticle(this.selectedArticle)
  editTheArticle = () =>
    this.driver.editArticle(this.selectedArticle, {
      body: makeRandomArticle().body,
    })

  async commentOnArticle(commenter: Users = null) {
    await this.login(commenter || Users.Me)
    await this.driver.commentOnArticle(
      this.selectedArticle,
      'I liked that article!',
    )
    await this.login(Users.Me)
  }

  async publishAnArticle(props: ArticleProps = {}) {
    await this.login(props.author || Users.Me)
    await this.createAnArticle()
    await this.publishTheArticle()
    await this.login(Users.Me)
  }

  async favoriteAnArticle() {
    await this.publishAnArticle({ author: Users.Abbott })
    await this.favoriteTheArticle()
  }

  assertICanSeeTheArticle() {}

  assertThePublishedVersionIsTheLastIWrote() {}

  async assertTheArticleIsPublished() {
    const article = await this.driver.findArticle(this.selectedArticle)
    expect(this.selectedArticle.author !== Users.Me).toBeTruthy()
    expect(article).toBeTruthy()
  }

  assertICanFindTheArticleFilteringBy(filters: ArticleProps) {}

  assertICanNotFindTheArticleFilteringBy(filters: ArticleProps) {}

  async assertICanFindTheArticle() {
    const article = await this.driver.findArticle(this.selectedArticle)
    expect(article).toBeTruthy()
  }

  async assertICanNotFindTheArticle() {
    const article = await this.driver.findArticle(this.selectedArticle)
    expect(article).toBeFalsy()
  }

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
