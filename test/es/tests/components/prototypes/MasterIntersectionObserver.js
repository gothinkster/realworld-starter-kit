// @ts-nocheck

/* global CustomEvent */
/* global self */

import Test from '../../../Test.js'

let counter = 0

/**
 * MasterIntersectionObserver Tests
 *
 * @param {string} testTitle
 * @param {string} moduleName
 * @param {string} modulePath
 * @param {string} [namespace = '']
 */
export const test = (testTitle = 'MasterIntersectionObserver', moduleName = 'MasterIntersectionObserver', modulePath = '../../src/es/components/prototypes/MasterIntersectionObserver.js', namespace = counter) => {
  // test modulePath must be from Test.js perspective
  const test = new Test(testTitle, namespace)

  // INTERSECTION -----------------------------------------------------------------------------------------------
  let eventDispatched = false
  let eventReceived = false
  test.runTest('intersection-observer-setup', moduleName, modulePath,
    el => el,
    undefined,
    (subclass) => class extends subclass {
      constructor (masterArgs = {}, ...args) {
        super(Object.assign(masterArgs, { intersectionObserverInit: {} }), ...args)
        this.css = `this{
          position: absolute;
          top: 2000px;
        }`
      }
    }
  ).then(el => {
    document.body.addEventListener('HelloFromComponent', event => (eventDispatched = true))
    el.addCustomEventListener(document.body, 'HelloFromBody', event => (eventReceived = true))
    el.dispatchCustomEvent(el.getCustomEvent('HelloFromComponent'))
    document.body.dispatchEvent(new CustomEvent('HelloFromBody', { bubbles: true, cancelable: true, detail: null, composed: true }))
    test.test('intersection-observer-not-dispatched-nor-received', el => !eventDispatched && !eventReceived, undefined, el)
    self.scrollTo(0, document.body.scrollHeight + 200)
    setTimeout(() => {
      test.test('intersection-observer-dispatched-received', el => eventDispatched && eventReceived, undefined, el)
      el.css = ''
      self.scrollTo(0, 0)
    }, 50)
  })
  // ------------------------------------------------------------------------------------------------------------
  counter++
}
