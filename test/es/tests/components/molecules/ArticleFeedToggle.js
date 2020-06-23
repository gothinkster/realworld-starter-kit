// @ts-nocheck

import Test from '../../../Test.js'

let counter = 0

/**
 * ArticleFeedToggle Tests
 *
 * @param {string} testTitle
 * @param {string} moduleName
 * @param {string} modulePath
 * @param {string} [namespace = '']
 * @return {Promise<[number, number, number]>}
 */
export const test = (testTitle = 'molecules/ArticleFeedToggle', moduleName = 'default', modulePath = '../../src/es/components/molecules/ArticleFeedToggle.js', namespace = counter) => {
  let resolveTest
  const result = new Promise(resolve => resolveTest = resolve)
  // test modulePath must be from Test.js perspective
  const test = new Test(testTitle, namespace)

  // ------------------------------------------------------------------------------------------------------------
  // HTML -------------------------------------------------------------------------------------------------------
  let shouldComponentRenderCounter = 0
  let renderCount = 0
  test.runTest('article-feed-toggle-setup', moduleName, modulePath,
    el => !!el,
    undefined,
    subclass => class extends subclass {
      shouldComponentRender() {
        shouldComponentRenderCounter++
        return super.shouldComponentRender()
      }
      render(tag) {
        super.render(tag)
        renderCount++
      }
    }
  ).then(el => {
    const parent = el.parentNode
    test.test('article-feed-toggle-content', el => el.querySelector('ul')?.children?.length === 2, undefined, el)
    // feed article query tag
    parent.dispatchEvent(new CustomEvent('listArticles', {
      /** @type {ListArticlesEventDetail} */
      detail: {
        query: { tag: 'Test' }
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))
    test.test('article-feed-toggle-content-got-tag', el => el.querySelector('ul')?.children?.length === 3 && el.querySelector('ul')?.children[2]?.textContent?.includes('Test'), undefined, el)
    // test click setFavorite button
    let gotClicks = 0
    let func
    // click above favorite button
    document.body.addEventListener('requestListArticles', (func = event => {
      gotClicks++
    }))
    el.querySelector('ul')?.click()
    document.body.removeEventListener('requestListArticles', func)
    test.test('article-feed-toggle-click-counts', () => gotClicks === 1, undefined, el)
    // remove and append to trigger connectedCallback
    el.remove()
    parent.appendChild(el)
    test.test('article-feed-toggle-render-counts', () => renderCount === 2, undefined, el)
    test.test('article-feed-toggle-should-component-render-counts', () => shouldComponentRenderCounter === 2, undefined, el)
    resolveTest([test.counter, test.passedCounter, test.failedCounter])
  })
  // ------------------------------------------------------------------------------------------------------------
  counter++
  return result
}
