import {tag, template} from 'slim-js/Decorators'
import {Slim} from 'slim-js'
import {onEvent, Events} from '../event-bus'

@tag('loading-modal')
@template(/*html*/ `
  <dialog s:id="dialog" open>
    <div class="logo-font container" bind>{{message}}</div>
    <newton-spinner></newton-spinner>
  </dialog>
`)
class LoadingModal extends Slim {
  constructor() {
    super()
    this.modalCount = 0
    onEvent(Events.OPEN_MODAL, (message) => {
      this.message = message
      this.modalCount++
      if (this.dialog) {
        this.dialog.setAttribute('open', '')
      }
    })
    onEvent(Events.CLOSE_MODAL, () => {
      this.modalCount--
      if (this.modalCount <= 0) {
        this.modalCount = 0
        if (this.dialog) {
          this.dialog.removeAttribute('open')
        }
      }
    })
  }
}
