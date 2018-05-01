import {tag, template} from 'slim-js/Decorators'
import {Slim} from 'slim-js'
import {onEvent, Events} from '../event-bus'

@tag('loading-modal')
@template(/*html*/ `
  <dialog s:if="modalCount" open>
    <div>Loading data...</div><hr/>
    <newton-spinner></newton-spinner>
  </dialog>
`)
class LoadingModal extends Slim {
  constructor() {
    super()
    this.modalCount = 0
    onEvent(Events.OPEN_MODAL, () => {
      this.modalCount++
    })
    onEvent(Events.CLOSE_MODAL, () => {
      this.modalCount--
      if (this.modalCount < 0) {
        this.modalCount = 0
      }
    })
  }
}
