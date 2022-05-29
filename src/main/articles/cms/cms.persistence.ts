import { Author } from '../articles.models'
import { ViewsPersistence } from '../views/views.persistence'
import { EditableArticle } from './cms.models'

export interface CMSPersistence extends ViewsPersistence {
  getArticle(slug: string): Promise<EditableArticle>
  createArticle(author: Author): EditableArticle
}
