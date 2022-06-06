import { ArticleFields } from '../../main/domain/articles/models'
import { makeRandomArticle } from './drivers/factories/articles.factory'
import { ArticleSearch, ProtocolDriver } from './drivers/protocol.driver'

export interface Context {
  slug?: string
}

export class UserDSL {
  constructor(
    public readonly username: string,
    private driver: ProtocolDriver,
    private context: Context,
  ) {}

  login = () => this.driver.login(this.username)
  follow = (user: UserDSL) => this.driver.follow(user.username)
  unfollow = (user: UserDSL) => this.driver.unfollow(user.username)

  async writeArticle(article: ArticleFields = {}) {
    this.context.slug = await this.driver.writeArticle({
      ...makeRandomArticle(),
      ...article,
    })
  }

  publishTheArticle = (slug?: string) =>
    this.driver.publishArticle(slug || this.context.slug)
  unpublishTheArticle = (slug?: string) =>
    this.driver.unpublishArticle(slug || this.context.slug)
  deleteTheArticle = (slug?: string) =>
    this.driver.deleteArticle(slug || this.context.slug)
  editTheArticle = (slug?: string) =>
    this.driver.editArticle(slug || this.context.slug, {
      body: makeRandomArticle().body,
    })

  async commentOnArticle(slug?: string, comment?: string) {
    await this.driver.commentOnArticle(
      slug || this.context.slug,
      comment || 'I liked that article!',
    )
  }

  async publishAnArticle(article: ArticleFields = {}) {
    await this.writeArticle(article)
    await this.publishTheArticle()
  }

  async shouldFindArticleBy(filters: ArticleSearch) {
    await this.driver.shouldFindArticleBy(filters, this.context.slug)
  }

  async shouldNotFindArticleBy(filters: ArticleSearch) {
    await this.driver.shouldNotFindArticleBy(filters, this.context.slug)
  }

  async shouldFindTheArticle(slug?: string) {
    const article = await this.driver.getArticle(slug || this.context.slug)
    expect(article).toBeTruthy()
  }

  async shouldNotFindTheArticle(slug?: string) {
    const article = await this.driver.getArticle(slug || this.context.slug)
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
