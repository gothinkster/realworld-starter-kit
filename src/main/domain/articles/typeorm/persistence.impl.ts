import { Author } from '../cms/cms.models'
import { ArticleEntity } from './article.entity'
import { CMSPersistence } from '../cms/cms.persistence'
import { Repository } from 'typeorm'
import { ViewsPersistence } from '../views/views.persistence'
import { EditorTypeORM } from './editor.impl'

export class CMSPersistenceTypeORM implements CMSPersistence, ViewsPersistence {
  constructor(private articleRepository: Repository<ArticleEntity>) {}

  createNewEditor(author: Author): EditorTypeORM {
    return new EditorTypeORM()
  }

  async getArticle(slug: string): Promise<ArticleEntity> {
    return await this.articleRepository.findOneBy({ slug: slug })
  }
}
