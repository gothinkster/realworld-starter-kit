// @ts-nocheck

import Test from '../../../Test.js'

let counter = 0

/**
 * ListArticlePreviews Tests
 *
 * @param {string} testTitle
 * @param {string} moduleName
 * @param {string} modulePath
 * @param {string} [namespace = '']
 * @return {Promise<[number, number, number]>}
 */
export const test = (testTitle = 'organisms/ListArticlePreviews', moduleName = 'default', modulePath = '../../src/es/components/organisms/ListArticlePreviews.js', namespace = counter) => {
  let resolveTest
  const result = new Promise(resolve => resolveTest = resolve)
  // test modulePath must be from Test.js perspective
  const test = new Test(testTitle, namespace)

  // ------------------------------------------------------------------------------------------------------------
  // HTML -------------------------------------------------------------------------------------------------------
  let renderCount = 0
  let loadChildComponents = 0
  test.runTest('list-article-previews-setup', moduleName, modulePath,
    el => !!el,
    undefined,
    subclass => class extends subclass {
      // avoid dispatching the listArticlePreviewsTest event and listen to this particular test
      connectedCallback () {
        document.body.addEventListener('listArticlePreviewsTest', this.listArticlesListener)
      }
      render(fetchMultipleArticles) {
        super.render(fetchMultipleArticles)
        renderCount++
      }
      loadChildComponents () {
        loadChildComponents++
        return super.loadChildComponents()
      }
    }
  ).then(el => {
    const parent = el.parentNode
    test.test('list-article-previews-empty', el => !el.innerHTML, undefined, el)
    document.body.dispatchEvent(new CustomEvent('listArticlePreviewsTest', {
      /** @type {import("../../../../../src/es/components/controllers/ListArticles.js").ListArticlesEventDetail} */
      detail: {
        fetch: Promise.resolve({
          articles: [
            {
              author: {},
              tagList: []
            },
            {
              author: {},
              tagList: []
            },
            {
              author: {},
              tagList: []
            }
          ]
        }),
        query: {}
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))
    // wait for the Promise to resolve
    setTimeout(() => {
      console.log('changed', el?.children?.length);
      test.test('list-article-previews-content', el => el?.children?.length === 3, undefined, el)
      // remove and append to trigger connectedCallback
      el.remove()
      parent.appendChild(el)
      test.test('list-article-previews-render-counts', () => renderCount === 1, undefined, el)
      test.test('list-article-previews-load-child-components-counts', () => loadChildComponents === 1, undefined, el)
      resolveTest([test.counter, test.passedCounter, test.failedCounter])
    }, 200);
  })
  // ------------------------------------------------------------------------------------------------------------
  counter++
  return result
}
