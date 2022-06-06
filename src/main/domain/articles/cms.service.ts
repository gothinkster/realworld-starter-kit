import { ArticleEntity } from '../../persistence/article.entity'
import { ArticleFinder } from './finder'
import { Article, ArticleFields, Author, FullArticle } from './models'

/**
The ContentManagementSystem is responsible for letting only the authors
 change the content.
**/
export class ContentManagementSystem {
  constructor(private author: Author) {}

  async createArticle(snapshot: Article): Promise<FullArticle> {
    const article = new ArticleEntity()
    article.loadData(snapshot)
    article.author = this.author
    return await article.save()
  }

  private async getArticleForModification(
    slug: string,
  ): Promise<ArticleEntity> {
    return new ArticleFinder()
      .filterBySlug(slug)
      .filterByAuthor(this.author)
      .getOne()
  }

  async updateArticle(slug: string, snapshot: ArticleFields) {
    const article = await this.getArticleForModification(slug)
    return await article.loadData(snapshot).save()
  }

  async deleteArticle(slug: string): Promise<void> {
    const article = await this.getArticleForModification(slug)
    await article.delete()
  }

  async publish(slug: string) {
    const article = await this.getArticleForModification(slug)
    return await article.publish().save()
  }

  async unpublish(slug: string) {
    const article = await this.getArticleForModification(slug)
    return await article.unpublish().save()
  }
}
