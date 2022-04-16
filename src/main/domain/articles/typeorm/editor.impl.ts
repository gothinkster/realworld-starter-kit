import { ArticleEntity } from './article.entity'
import { Editor } from '../cms/cms.editor'

export class EditorTypeORM extends Editor {
  protected article: ArticleEntity

  constructor(article?: ArticleEntity) {
    super()
    this.article = article || new ArticleEntity()
  }

  delete() {
    return this.article.remove()
  }

  publish() {
    this.article.published = true
    return this
  }

  unpublish() {
    this.article.published = false
    return this
  }

  save(): Promise<ArticleEntity> {
    return this.article.save()
  }
}
