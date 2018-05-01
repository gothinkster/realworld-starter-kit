import {tag, template} from 'slim-js/Decorators'
import {Slim} from 'slim-js'

customElements.define(
  'newton-spinner',
  class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `<div class="la-ball-newton-cradle la-2x"><div></div><div></div><div></div><div></div></div>`
    }
  }
)
