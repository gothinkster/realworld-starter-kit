import { component$ } from "@builder.io/qwik"

export interface FormProps {
  article: {
    title: string
    description: string
    body: string
    tagList: string[]
  }
  method: string
}

export function getFormData(formData: FormData) {
  return {
    title: formData.get('title'),
    description: formData.get('description'),
    body: formData.get('body'),
    tagList: `${formData.get('tagList') || ''}`.split(' ')
      .map(i => i.trim())
      .filter(i => !!i),
  }
}

export const Form = component$((props: FormProps) => {
  return (
    <div class="editor-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-10 offset-md-1 col-xs-12">
            <form method={props.method}>
              <fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    name="title"
                    class="form-control form-control-lg"
                    value={props.article.title}
                    placeholder="Article Title"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    name="description"
                    value={props.article.description}
                    class="form-control"
                    placeholder="What's this article about?"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    class="form-control"
                    rows={8}
                    value={props.article.body}
                    name="body"
                    placeholder="Write your article (in markdown)"
                  ></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    name="tagList"
                    value={props.article.tagList.join(' ')}
                    placeholder="Enter tags"
                  />
                  <div class="tag-list"></div>
                </fieldset>
                <button
                  class="btn btn-lg pull-xs-right btn-primary"
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
})