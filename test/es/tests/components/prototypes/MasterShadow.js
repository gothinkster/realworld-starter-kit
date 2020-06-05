// @ts-nocheck

import Test from '../../../Test.js'

let counter = 0

/**
 * MasterShadow Tests
 *
 * @param {string} testTitle
 * @param {string} moduleName
 * @param {string} modulePath
 * @param {string} [namespace = '']
 */
export const test = (testTitle = 'MasterShadow', moduleName = 'MasterShadow', modulePath = '../../src/es/components/prototypes/MasterShadow.js', namespace = counter) => {
  // test modulePath must be from Test.js perspective
  const test = new Test(testTitle, namespace)

  // MODE -------------------------------------------------------------------------------------------------------
  // MODE: OPEN
  const shadowRootOpenFunc = el => el.shadowRoot !== null && el.shadow !== null && el.shadow === el.shadowRoot && el.hasShadow && el.cssSelector === ':host'
  test.runTest('shadow-root-by-attribute-open', moduleName, modulePath,
    shadowRootOpenFunc,
    'mode=open'
  )
  test.runTest('shadow-root-by-extends-open', moduleName, modulePath,
    shadowRootOpenFunc,
    undefined,
    (subclass) => class extends subclass {
      constructor (masterArgs = {}, ...args) {
        super(Object.assign(masterArgs, { mode: 'open' }), ...args)
      }
    }
  )
  // MODE: CLOSED
  const shadowRootClosedFunc = el => el.shadowRoot === null && el.shadow !== null && el.shadow !== el.shadowRoot && el.hasShadow && el.cssSelector === ':host'
  test.runTest('shadow-root-by-attribute-closed', moduleName, modulePath,
    shadowRootClosedFunc,
    'mode=closed'
  )
  test.runTest('shadow-root-by-extends-closed', moduleName, modulePath,
    shadowRootClosedFunc,
    undefined,
    (subclass) => class extends subclass {
      constructor (masterArgs = {}, ...args) {
        super(Object.assign(masterArgs, { mode: 'closed' }), ...args)
      }
    }
  )
  // MODE: FALSE
  const shadowRootFalseFunc = el => el.shadowRoot === null && el.shadow === null && el.shadow === el.shadowRoot && !el.hasShadow && el.cssSelector.includes('shadow-root-'.toUpperCase())
  test.runTest('shadow-root-by-attribute-false', moduleName, modulePath,
    shadowRootFalseFunc,
    'mode=false'
  )
  test.runTest('shadow-root-by-extends-false', moduleName, modulePath,
    shadowRootFalseFunc,
    undefined,
    (subclass) => class extends subclass {
      constructor (masterArgs = {}, ...args) {
        super(Object.assign(masterArgs, { mode: 'false' }), ...args)
      }
    }
  )
  // ------------------------------------------------------------------------------------------------------------
  // CSS --------------------------------------------------------------------------------------------------------
  test.runTest('shadow-root-css-setup', moduleName, modulePath,
    el => el
  ).then(el => {
    el.css = `this {
      height: 200px;
      /* reset all css inherited from Test css */
      border: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
    }`
    test.test('shadow-root-css-height', el => el.offsetHeight === 200, undefined, el)
    el.css = `this {
      width: 300px;
    }`
    test.test('shadow-root-css-width', el => el.offsetWidth === 300, undefined, el)
    el.css = ''
    test.test('shadow-root-css-cleanup1', el => el.root.textContent === `<shadow-root-css-setup${namespace ? '-' + namespace : ''}>`, undefined, el)
    // safari does not update the css on dom until the html got mutated, should not be an issue in production
    // test.test('shadow-root-css-cleanup-safari', el => el.offsetHeight !== 200 && el.offsetWidth !== 300, undefined, el, true)
    test.test('shadow-root-css-cleanup2', el => el.offsetHeight !== 200 && el.offsetWidth !== 300, undefined, el)
  })
  // ------------------------------------------------------------------------------------------------------------
  // HTML -------------------------------------------------------------------------------------------------------
  const htmlString = '<span>Hello World</span>'
  let oldInnerHTML = ''
  test.runTest('shadow-root-html-setup', moduleName, modulePath,
    el => {
      oldInnerHTML = el.html
      return true
    }
  ).then(el => {
    el.html = ''
    test.test('shadow-root-html-empty', el => el.root.innerHTML === '', undefined, el)
    el.html = htmlString
    test.test('shadow-root-html-string', el => el.root.innerHTML === htmlString, undefined, el)
    el.html = ''
    el.html = [document.createElement('span'), document.createElement('span')]
    test.test('shadow-root-html-collection', el => el.root.innerHTML === '<span></span><span></span>', undefined, el)
    el.html = oldInnerHTML
    // IMPORT -----------------------------------------------------------------------------------------------------
    el.constructor.importCustomElementsAndDefine([
      {
        path: '../../components/prototypes/MasterShadow.js',
        name: 'shadow-root-import',
        moduleName: 'MasterShadow'
      }
    ])[0].then(elements => elements.forEach(element => test.test('shadow-root-import', el => el.nodeName === 'shadow-root-import'.toUpperCase(), undefined, element)))
    // ------------------------------------------------------------------------------------------------------------
  })
  // ------------------------------------------------------------------------------------------------------------
  // timeout ----------------------------------------------------------------------------------------------------
  test.runTest('shadow-root-add-event-listener-setup', moduleName, modulePath,
    el => el
  ).then(el => {
    // 'shadow-root-add-event-listener-initial-timeout'
    let container1 = []
    el.addEventListenerInitialTimeout(document.body, 'TestListenerEvent1', (event, events) => {
      container1 = [event, events]
    }, undefined, 100)
    document.body.dispatchEvent(el.getCustomEvent('TestListenerEvent1'))
    document.body.dispatchEvent(el.getCustomEvent('TestListenerEvent1'))
    document.body.dispatchEvent(el.getCustomEvent('TestListenerEvent1'))
    setTimeout(() => {
      test.test('shadow-root-add-event-listener-initial-timeout1', () => !container1[0] && !container1[1], undefined, el)
    }, 10)
    setTimeout(() => {
      test.test('shadow-root-add-event-listener-initial-timeout2', () => container1[0] && container1[1].length === 3, undefined, el)
    }, 120)
    // 'shadow-root-add-event-listener-initial-once'
    let container2 = []
    el.addEventListenerInitialOnce(document.body, 'TestListenerEvent2', (event, events) => {
      container2 = [event, events]
    }, undefined, 100)
    document.body.dispatchEvent(el.getCustomEvent('TestListenerEvent2'))
    document.body.dispatchEvent(el.getCustomEvent('TestListenerEvent2'))
    document.body.dispatchEvent(el.getCustomEvent('TestListenerEvent2'))
    setTimeout(() => {
      test.test('shadow-root-add-event-listener-initial-once1', () => container2[0] && !container2[1], undefined, el)
    }, 10)
    setTimeout(() => {
      test.test('shadow-root-add-event-listener-initial-once2', () => container2[0] && container2[1].length === 2, undefined, el)
    }, 120)
  })
  // ------------------------------------------------------------------------------------------------------------
  counter++
}
