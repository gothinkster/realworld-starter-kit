import { Author } from '../articles.models'
import { EditableArticle } from '../cms/cms.models'
import { CMSPersistence } from '../cms/cms.persistence'
import { ViewsPersistence } from '../views/views.persistence'
import { ArticleEntity } from './article.entity'

export class ArticlesTypeORMPersistence
  implements CMSPersistence, ViewsPersistence
{
  async getArticle(slug: string): Promise<ArticleEntity | null> {
    return await ArticleEntity.findOneBy({ slug: slug })
  }

  createArticle(author: Author): EditableArticle {
    const article = new ArticleEntity()
    article.authorId = author.getAuthorID()
    return article
  }
}
