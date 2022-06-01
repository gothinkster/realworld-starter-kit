import { PartialArticleSnapshot } from '../../../main/articles/articles.models'
import {
  ArticleDefinition,
  ArticleProps,
  makeRandomArticle,
  ProtocolDriver,
  Users,
} from '../drivers/protocol.driver'

export class RealWorldDSL {
  private selectedArticle: ArticleDefinition

  constructor(private driver: ProtocolDriver) {}

  login = () => this.driver.login(Users.Me)
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
    await this.driver.login(commenter || Users.Me)
    await this.driver.commentOnArticle(
      this.selectedArticle,
      'I liked that article!',
    )
    await this.login()
  }

  async publishAnArticle(props: ArticleProps = {}) {
    await this.driver.login(props.author || Users.Me)
    await this.createAnArticle()
    await this.publishTheArticle()
    await this.login()
  }

  async favoriteAnArticle() {
    await this.publishAnArticle({ author: Users.Abbott })
    await this.favoriteTheArticle()
  }

  async assertTheArticleIsPublished() {
    const article = await this.driver.getArticle(this.selectedArticle.slug)
    expect(this.selectedArticle.author !== Users.Me).toBeTruthy()
    expect(article).toBeTruthy()
  }

  async assertICanFindTheArticleFilteringBy(filters: ArticleProps) {
    const articles = await this.driver.findArticles(filters)
    expect(articles).toContainEqual(this.selectedArticle)
  }

  async assertICanNotFindTheArticleFilteringBy(filters: ArticleProps) {
    const articles = await this.driver.findArticles(filters)
    expect(articles).not.toContainEqual(this.selectedArticle)
  }

  async assertICanFindTheArticle() {
    const article = await this.driver.getArticle(this.selectedArticle.slug)
    expect(article).toBeTruthy()
  }

  async assertICanNotFindTheArticle() {
    const article = await this.driver.getArticle(this.selectedArticle.slug)
    expect(article).toBeFalsy()
  }

  assertICommentedOnTheArticle = () =>
    this.assertTheArticleHasCommentFrom(Users.Me)

  assertTheArticleHasCommentFrom(commenter: Users) {
    expect(false).toBeTruthy()
  }

  assertIFavoritedTheArticle() {
    expect(false).toBeTruthy()
  }

  assertIDidntFavoriteTheArticle() {
    expect(false).toBeTruthy()
  }

  assertIAmFollowing(user: Users) {
    expect(false).toBeTruthy()
  }

  assertIAmNotFollowing(user: Users) {
    expect(false).toBeTruthy()
  }

  assertTheArticleIsInMyFeed(author: Users) {
    expect(false).toBeTruthy()
  }

  assertTheArticleIsNotInMyFeed() {
    expect(false).toBeTruthy()
  }

  assertTheArticleCanBeFoundByOtherUsers() {
    expect(false).toBeTruthy()
  }

  assertTheArticleCannotBeFoundByOtherUsers(author: Users = Users.Me) {
    expect(false).toBeTruthy()
  }
}
