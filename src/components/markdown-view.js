import { tag, template } from "slim-js/Decorators";
import { Slim } from "slim-js";

const parse = markdownText => {
  return new Promise(resolve => {
    window._markedReady.then( () => {
      const {marked} = window
      resolve(marked(markdownText))
    })
  })
}

@tag('markdown-view')
@template('<div s:id="container"></div>')
class SlimComponent extends Slim {
  articleContent

  onAdded () {
    Slim.bindOwn(this, 'articleContent', () => {
      if (!this.articleContent) return
      parse(this.articleContent).then(markdown => this.container.innerHTML = markdown)
    })
  }
}