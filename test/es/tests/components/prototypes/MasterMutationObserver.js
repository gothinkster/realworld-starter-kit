// @ts-nocheck

import Test from '../../../Test.js'

let counter = 0

/**
 * MasterMutationObserver Tests
 *
 * @param {string} testTitle
 * @param {string} moduleName
 * @param {string} modulePath
 * @param {string} [namespace = '']
 */
export const test = (testTitle = 'MasterMutationObserver', moduleName = 'MasterMutationObserver', modulePath = '../../src/es/components/prototypes/MasterMutationObserver.js', namespace = counter) => {
  // test modulePath must be from Test.js perspective
  const test = new Test(testTitle, namespace)

  // MUTATION------------------------------------------------------------------------------------------------------
  let gotAttributeMutation = false
  let gotChildListMutation = false
  test.runTest('mutation-observer-by-attribute-setup', moduleName, modulePath,
    el => el,
    `mutationObserverInit="{
      'attributes': true,
      'characterData': true,
      'childList': true
    }"`,
    (subclass) => class extends subclass {
      constructor (masterArgs = {}, ...args) {
        super(masterArgs, ...args)
      }

      connectedCallback () {
        super.connectedCallback()
        this.setAttribute('hello', 'world')
        this.root.appendChild(document.createElement('span'))
      }

      mutationCallback (mutationList, observer) {
        super.mutationCallback(mutationList, observer)
        mutationList.forEach(mutation => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'hello') gotAttributeMutation = true
          if (mutation.type === 'childList') gotChildListMutation = true
        })
      }
    }
  ).then(el => {
    test.test('mutation-observer-by-attribute', el => gotAttributeMutation && gotChildListMutation, undefined, el)
  })
  let gotAttributeMutation2 = false
  let gotChildListMutation2 = false
  test.runTest('mutation-observer-by-extends-setup', moduleName, modulePath,
    el => el,
    undefined,
    (subclass) => class extends subclass {
      constructor (masterArgs = {}, ...args) {
        super(Object.assign(masterArgs, {
          mutationObserverInit: {
            attributes: true,
            characterData: true,
            childList: true
          }
        }), ...args)
      }

      connectedCallback () {
        super.connectedCallback()
        this.setAttribute('hello', 'world')
        this.root.appendChild(document.createElement('span'))
      }

      mutationCallback (mutationList, observer) {
        super.mutationCallback(mutationList, observer)
        mutationList.forEach(mutation => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'hello') gotAttributeMutation2 = true
          if (mutation.type === 'childList') gotChildListMutation2 = true
        })
      }
    }
  ).then(el => {
    test.test('mutation-observer-by-extends', el => gotAttributeMutation2 && gotChildListMutation2, undefined, el)
  })
  // ------------------------------------------------------------------------------------------------------------
  counter++
}
