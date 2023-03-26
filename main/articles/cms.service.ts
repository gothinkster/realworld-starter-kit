import { ArticleFinder } from './finder'
import { Article, ArticleFields, Author, FullArticle } from './models'
import { ArticleEntity } from './article.entity'

/**
The ContentManagementSystem is responsible for letting only the authors
 change the content.
**/
export class ContentManagementSystem {
  constructor(private author: Author) {}

  async createArticle(snapshot: Article): Promise<FullArticle> {
    const article = ArticleEntity.create({
      author: this.author,
    })
    return await article.loadData(snapshot).save()
  }

  private async getArticleForModification(
    slug: string,
  ): Promise<ArticleEntity> {
    return new ArticleFinder()
      .filterBySlug(slug)
      .filterByAuthor(this.author)
      .getOne()
  }

  async updateArticle(
    slug: string,
    snapshot: ArticleFields,
  ): Promise<FullArticle> {
    const article = await this.getArticleForModification(slug)
    return await article.loadData(snapshot).save()
  }

  async deleteArticle(slug: string): Promise<void> {
    const article = await this.getArticleForModification(slug)
    await article.delete()
  }

  async publishArticle(slug: string): Promise<FullArticle> {
    const article = await this.getArticleForModification(slug)
    return await article.publish().save()
  }

  async unpublishArticle(slug: string): Promise<FullArticle> {
    const article = await this.getArticleForModification(slug)
    return await article.unpublish().save()
  }
}
