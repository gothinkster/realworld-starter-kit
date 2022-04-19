import { Author } from '../views/views.models'
import { ViewsPersistence } from '../views/views.persistence'
import { Editor } from './cms.editor'
import { EditableArticle } from './cms.models'

export interface CMSPersistence extends ViewsPersistence {
  getArticle(slug: string): Promise<EditableArticle>

  createNewEditor(author: Author): Editor
}
