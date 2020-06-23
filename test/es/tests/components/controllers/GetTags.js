// @ts-nocheck

import Test from '../../../Test.js'

let counter = 0

/**
 * GetTags Tests
 *
 * @param {string} testTitle
 * @param {string} moduleName
 * @param {string} modulePath
 * @param {string} [namespace = '']
 * @return {Promise<[number, number, number]>}
 */
export const test = (testTitle = 'controllers/GetTags', moduleName = 'default', modulePath = '../../src/es/components/controllers/GetTags.js', namespace = counter) => {
  let resolveTest
  const result = new Promise(resolve => resolveTest = resolve)
  // test modulePath must be from Test.js perspective
  const test = new Test(testTitle, namespace)

  // ------------------------------------------------------------------------------------------------------------
  // HTML -------------------------------------------------------------------------------------------------------
  test.runTest('get-tags-setup', moduleName, modulePath,
    el => !!el
  ).then(el => {
    const child = document.createElement('div')
    el.appendChild(child)
    let gotFetch = false
    let func
    document.body.addEventListener('tags', (func = event => {
      gotFetch = typeof event?.detail?.fetch?.then === 'function'
      event?.detail?.fetch?.then(tag => {
        test.test('get-tags-got-fetched-tags', () => tag.tags.length > 0, undefined, el)
        resolveTest([test.counter, test.passedCounter, test.failedCounter])
      })
      document.body.removeEventListener('tags', func)
    }))
    child.dispatchEvent(new CustomEvent('getTags', {
      /** @type {import("../../../../../src/es/components/controllers/GetTags").RequestGetTagsEventDetail} */
      detail: {},
      bubbles: true,
      cancelable: true,
      composed: true
    }))
    test.test('get-tags-got-fetch', () => gotFetch, undefined, el)
  })
  // ------------------------------------------------------------------------------------------------------------
  counter++
  return result
}
