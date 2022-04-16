import { EditableArticle, Author } from './cms.models'
import { ViewsPersistence } from '../views/views.persistence'
import { Editor } from './cms.editor'

export interface CMSPersistence extends ViewsPersistence {
  getArticle(slug: string): Promise<EditableArticle>

  createNewEditor(author: Author): Editor
}
