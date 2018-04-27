import {Slim} from 'slim-js';
import {template} from 'slim-js/Decorators';
import API from '../api';

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
  onCreated() {
    API.getAllTags().then(({tags}) => (this.tags = tags));
  }

  onTagClick({target}) {
    const {tag} = target;
    console.log(tag);
  }
}
