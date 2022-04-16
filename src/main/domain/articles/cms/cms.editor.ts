import { EditableArticle } from './cms.models'

export abstract class Editor {
  protected article: EditableArticle

  setTitle(title: string): Editor {
    if (title) {
      this.article.title = title
    }
    return this
  }

  setDescription(description: string): Editor {
    if (description) {
      this.article.description = description
    }
    return this
  }

  setBody(body: string): Editor {
    if (body) {
      this.article.body = body
    }
    return this
  }

  setTags(tags: string[]): Editor {
    if (tags) {
      this.article.setTags(tags)
    }
    return this
  }

  abstract unpublish(): Editor

  abstract publish(): Editor

  abstract delete()

  abstract save(): Promise<EditableArticle>
}
