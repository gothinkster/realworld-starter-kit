import { PartialArticleSnapshot } from '../../main/articles/articles.models'
import { makeRandomArticle } from './drivers/factories/articles.factory'
import {
  ArticleContext,
  ArticleSearch,
  ProtocolDriver,
  User,
} from './drivers/protocol.driver'

export class UserDSL implements User {
  private readonly selectedArticle: ArticleContext

  constructor(public name: string, private driver: ProtocolDriver) {
    this.selectedArticle = {}
    return this
  }

  login = () => this.driver.login(this)
  follow = (user: UserDSL) => this.driver.follow(user)
  unfollow = (user: UserDSL) => this.driver.unfollow(user)

  async writeArticle(article: PartialArticleSnapshot = {}) {
    this.selectedArticle.slug = await this.driver.writeArticle({
      ...makeRandomArticle(),
      ...article,
    })
    if (this.selectedArticle.slug) {
      this.selectedArticle.author = this
    }
  }

  publishTheArticle = (slug?: string) =>
    this.driver.publishArticle(slug || this.selectedArticle.slug)
  unpublishTheArticle = (slug?: string) =>
    this.driver.unpublishArticle(slug || this.selectedArticle.slug)
  deleteTheArticle = (slug?: string) =>
    this.driver.deleteArticle(slug || this.selectedArticle.slug)
  editTheArticle = (slug?: string) =>
    this.driver.editArticle(slug || this.selectedArticle.slug, {
      body: makeRandomArticle().body,
    })

  async commentOnArticle(slug?: string, comment?: string) {
    await this.driver.commentOnArticle(
      slug || this.selectedArticle.slug,
      comment || 'I liked that article!',
    )
  }

  async publishAnArticle(article: PartialArticleSnapshot = {}) {
    await this.writeArticle(article)
    await this.publishTheArticle()
  }

  async shouldFindArticleBy(filters: ArticleSearch) {
    const articles = await this.driver.findArticles(filters)
    expect(articles).toContainEqual(this.selectedArticle)
  }

  async shouldNotFindArticleBy(filters: ArticleSearch) {
    const articles = await this.driver.findArticles(filters)
    expect(articles).not.toContainEqual(this.selectedArticle)
  }

  async shouldFindTheArticle(slug?: string) {
    const article = await this.driver.getArticle(
      slug || this.selectedArticle.slug,
    )
    expect(article).toBeTruthy()
  }

  async shouldNotFindTheArticle(slug?: string) {
    const article = await this.driver.getArticle(
      slug || this.selectedArticle.slug,
    )
    expect(article).toBeFalsy()
  }

  shouldSeeCommentFrom(author: UserDSL, slug?: string) {
    expect(false).toBeTruthy()
  }

  shouldSeeTheArticleInTheFeed(slug?: string) {
    expect(false).toBeTruthy()
  }

  shouldNotSeeTheArticleInTheFeed(slug?: string) {
    expect(false).toBeTruthy()
  }
}
