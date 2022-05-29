import { ReadonlyArticle } from '../articles.models'

export interface ViewsPersistence {
  getArticle(slug: string): Promise<ReadonlyArticle>
}
