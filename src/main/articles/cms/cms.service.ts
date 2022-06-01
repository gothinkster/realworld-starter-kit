import { Repository } from 'typeorm'
import { ProfilesService } from '../../profiles/profiles.service'
import { ArticleSnapshot, Author } from '../articles.models'
import { ArticleEntity } from '../persistence/article.entity'
import { ArticleNotFound } from '../views/views.exceptions'
import { EditableArticle } from './cms.models'

/**
The ContentManagementSystem is responsible for letting only the authors
 change the content.
**/
export class ContentManagementSystem {
  constructor(
    private repository: Repository<ArticleEntity>,
    private author: Author,
    private profiles?: ProfilesService,
  ) {}

  async getArticle(slug: string): Promise<EditableArticle> {
    const article = await this.repository.findOneBy({
      slug: slug,
      authorId: this.author.getAuthorID(),
    })
    if (!article) {
      throw new ArticleNotFound(slug)
    }
    return article
  }

  async createFromSnapshot(
    snapshot: ArticleSnapshot,
    publish: boolean = false,
  ): Promise<EditableArticle> {
    const article = this.repository.create({
      authorId: this.author.getAuthorID(),
    })
    article.loadSnapshot(snapshot)
    if (publish) {
      article.publish()
    }
    await article.save()
    return article
  }
}
