import { EditableArticle } from './cms.models'
import { ViewsPersistence } from '../views/views.persistence'
import { Editor } from './cms.editor'
import { Author } from '../views/views.models'

export interface CMSPersistence extends ViewsPersistence {
  getArticle(slug: string): Promise<EditableArticle>

  createNewEditor(author: Author): Editor
}
