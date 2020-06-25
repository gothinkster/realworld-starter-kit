// @ts-nocheck

import Test from '../../../Test.js'

let counter = 0

/**
 * Pagination Tests
 *
 * @param {string} testTitle
 * @param {string} moduleName
 * @param {string} modulePath
 * @param {string} [namespace = '']
 * @return {Promise<[number, number, number]>}
 */
export const test = (testTitle = 'molecules/Pagination', moduleName = 'default', modulePath = '../../src/es/components/molecules/Pagination.js', namespace = counter) => {
  let resolveTest
  const result = new Promise(resolve => resolveTest = resolve)
  // test modulePath must be from Test.js perspective
  const test = new Test(testTitle, namespace)

  // ------------------------------------------------------------------------------------------------------------
  // HTML -------------------------------------------------------------------------------------------------------
  let renderCount = 0
  test.runTest('pagination-setup', moduleName, modulePath,
    el => !!el,
    undefined,
    subclass => class extends subclass {
      // avoid dispatching the getPagination event and listen to this particular test
      connectedCallback () {
        document.body.addEventListener('paginationTest', this.listArticlesListener)
        this.addEventListener('click', this.clickListener)
      }
      render(fetchMultipleArticles, query) {
        super.render(fetchMultipleArticles, query)
        renderCount++
      }
    }
  ).then(el => {
    const parent = el.parentNode
    test.test('pagination-empty', el => !el.innerHTML, undefined, el)
    document.body.dispatchEvent(new CustomEvent('paginationTest', {
      /** @type {import("../../../../../src/es/components/controllers/ListArticles.js").ListArticlesEventDetail} */
      detail: {
        fetch: Promise.resolve({
          articlesCount: 250,
          articles: {}
        }),
        query: {}
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))
    // wait for the Promise to resolve
    setTimeout(() => {
      test.test('pagination-content', el => !!el.querySelector('.pagination') && el.querySelector('.pagination')?.children?.length === 25, undefined, el)
      // test click pagination link
      let gotClicks = 0
      let func1
      document.body.addEventListener('requestListArticles', (func1 = event => {
        gotClicks = event?.detail?.offset === 240 ? gotClicks + 1 : gotClicks
      }))
      el.querySelector('.pagination')?.children[24]?.querySelector('a')?.click()
      document.body.removeEventListener('requestListArticles', func1)
      test.test('pagination-click-counts', () => gotClicks === 1, undefined, el)
      // remove and append to trigger connectedCallback
      el.remove()
      parent.appendChild(el)
      test.test('pagination-render-counts', () => renderCount === 1, undefined, el)
      resolveTest([test.counter, test.passedCounter, test.failedCounter])
    }, 50);
  })
  // ------------------------------------------------------------------------------------------------------------
  counter++
  return result
}
