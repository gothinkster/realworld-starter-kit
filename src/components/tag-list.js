import {Slim} from 'slim-js'
import {template, tag} from 'slim-js/Decorators'
import API from '../api'
import bindable from '../decorators/bindable';
import { dispatch, Events } from '../event-bus';

@tag('tag-list')
@template(/*html*/ `
<p>Popular Tags</p>
<div class="tag-list">
  <a s:repeat="tags as tag"
     class="tag-pill tag-default"
     click="onTagClick"
     bind>{{tag}}</a>
</div>
`)
export default class TagList extends Slim {
  @bindable('tags') tags

  onAdded () {
    dispatch(Events.GET_TAGS)
  }

  onTagClick({target}) {
    const {tag} = target
    this.callAttribute('on-tag-select', tag)
  }
}
