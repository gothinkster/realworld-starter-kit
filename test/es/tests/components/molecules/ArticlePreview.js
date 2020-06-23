// @ts-nocheck

import Test from '../../../Test.js'

let counter = 0

/**
 * ArticlePreview Tests
 *
 * @param {string} testTitle
 * @param {string} moduleName
 * @param {string} modulePath
 * @param {string} [namespace = '']
 * @return {Promise<[number, number, number]>}
 */
export const test = (testTitle = 'molecules/ArticlePreview', moduleName = 'default', modulePath = '../../src/es/components/molecules/ArticlePreview.js', namespace = counter) => {
  let resolveTest
  const result = new Promise(resolve => resolveTest = resolve)
  // test modulePath must be from Test.js perspective
  const test = new Test(testTitle, namespace)

  // ------------------------------------------------------------------------------------------------------------
  // HTML -------------------------------------------------------------------------------------------------------
  let shouldComponentRenderCounter = 0
  let renderCount = 0
  test.runTest('article-preview-setup', moduleName, modulePath,
    el => !!el,
    undefined,
    subclass => class extends subclass {
      shouldComponentRender() {
        shouldComponentRenderCounter++
        return super.shouldComponentRender()
      }
      render() {
        if (super.render()) renderCount++
      }
    }
  ).then(el => {
    const parent = el.parentNode
    test.test('article-preview-empty', el => !el.innerHTML, undefined, el)
    el.article = {
      author: {
        username: 'test'
      },
      tagList: ['testTag']
    }
    el.render()
    test.test('article-preview-content', el => !!el.querySelector('.article-meta') && el.querySelector('.author')?.textContent === 'test' && el.querySelector('.tag-default')?.textContent === 'testTag', undefined, el)
    // remove and append to trigger connectedCallback
    el.remove()
    parent.appendChild(el)
    test.test('article-preview-render-counts', () => renderCount === 1, undefined, el)
    test.test('article-preview-should-component-render-counts', () => shouldComponentRenderCounter === 2, undefined, el)
    resolveTest([test.counter, test.passedCounter, test.failedCounter])
  })
  // ------------------------------------------------------------------------------------------------------------
  counter++
  return result
}
