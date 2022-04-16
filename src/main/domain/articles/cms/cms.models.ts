import { ReadonlyArticle } from '../views/views.models'
import { Editor } from './cms.editor'

export interface EditableArticle extends ReadonlyArticle {
  title: string
  description: string
  body: string
  setTags(tags: string[])
  getEditor(): Editor
}

export interface Author {
  getAuthorID(): number
}
