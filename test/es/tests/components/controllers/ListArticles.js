// @ts-nocheck

import Test from '../../../Test.js'

let counter = 0

/**
 * ListArticles Tests
 *
 * @param {string} testTitle
 * @param {string} moduleName
 * @param {string} modulePath
 * @param {string} [namespace = '']
 * @return {Promise<[number, number, number]>}
 */
export const test = (testTitle = 'controllers/ListArticles', moduleName = 'default', modulePath = '../../src/es/components/controllers/ListArticles.js', namespace = counter) => {
  let resolveTest
  const result = new Promise(resolve => resolveTest = resolve)
  // test modulePath must be from Test.js perspective
  const test = new Test(testTitle, namespace)

  // ------------------------------------------------------------------------------------------------------------
  // HTML -------------------------------------------------------------------------------------------------------
  test.runTest('list-articles-setup', moduleName, modulePath,
    el => !!el
  ).then(el => {
    const child = document.createElement('div')
    el.appendChild(child)
    let gotFetch = false
    let func
    document.body.addEventListener('listArticles', (func = event => {
      gotFetch = typeof event?.detail?.fetch?.then === 'function'
      event?.detail?.fetch?.then(multipleArticles => {
        test.test('list-articles-got-fetched-articles', () => multipleArticles.articles.length > 0, undefined, el)
        resolveTest([test.counter, test.passedCounter, test.failedCounter])
      })
      document.body.removeEventListener('listArticles', func)
    }))
    child.dispatchEvent(new CustomEvent('requestListArticles', {
      /** @type {import("../../../../../src/es/components/controllers/ListArticles").RequestListArticlesEventDetail} */
      detail: {},
      bubbles: true,
      cancelable: true,
      composed: true
    }))
    test.test('list-articles-got-fetch', () => gotFetch, undefined, el)
  })
  // ------------------------------------------------------------------------------------------------------------
  return result
  counter++
}
