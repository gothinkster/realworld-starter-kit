import { ReadonlyArticle } from './views.models'

export interface ViewsPersistence {
  getArticle(slug: string): Promise<ReadonlyArticle>
}
