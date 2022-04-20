import { EditableArticle } from './cms.models'

export abstract class Editor {
  protected article: EditableArticle

  setTitle(title: string): Editor {
    this.article.title = title ?? this.article.title
    return this
  }

  setDescription(description: string): Editor {
    this.article.description = description ?? this.article.description
    return this
  }

  setBody(body: string): Editor {
    this.article.body = body ?? this.article.body
    return this
  }

  setTags(tags: string[]): Editor {
    if (!!tags) {
      this.article.setTags(tags)
    }
    return this
  }

  abstract unpublish(): Editor

  abstract publish(): Editor

  abstract delete()

  abstract save(): Promise<EditableArticle>
}
