import { PartialArticleSnapshot, ReadonlyArticle } from '../articles.models'

export interface EditableArticle extends ReadonlyArticle {
  loadSnapshot(snapshot: PartialArticleSnapshot): this
  publish(): this
  unpublish(): this
  save(): Promise<this>
  delete(): Promise<void>
}
