import {Slim} from 'slim-js';

export default class ReactiveElement extends Slim {
  attributeChangedCallback(attr, oldValue, newValue) {
    console.log('attr changed: ', attr, newValue, typeof newValue);
    const prop = Slim.dashToCamel(attr);
    const method = this[`${prop}Changed`];
    if (typeof method === 'function') {
      method.call(this, newValue);
    }
  }
}
