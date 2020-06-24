// @ts-nocheck

import Test from '../../../Test.js'

let counter = 0

/**
 * TagList Tests
 *
 * @param {string} testTitle
 * @param {string} moduleName
 * @param {string} modulePath
 * @param {string} [namespace = '']
 * @return {Promise<[number, number, number]>}
 */
export const test = (testTitle = 'molecules/TagList', moduleName = 'default', modulePath = '../../src/es/components/molecules/TagList.js', namespace = counter) => {
  let resolveTest
  const result = new Promise(resolve => resolveTest = resolve)
  // test modulePath must be from Test.js perspective
  const test = new Test(testTitle, namespace)

  // ------------------------------------------------------------------------------------------------------------
  // HTML -------------------------------------------------------------------------------------------------------
  let renderCount = 0
  test.runTest('tag-list-setup', moduleName, modulePath,
    el => !!el,
    undefined,
    subclass => class extends subclass {
      // avoid dispatching the getTags event and listen to this particular test
      connectedCallback () {
        document.body.addEventListener('tagsTest', this.tagsListener)
        this.addEventListener('click', this.clickListener)
      }
      render(fetchTags) {
        super.render(fetchTags)
        renderCount++
      }
    }
  ).then(el => {
    const parent = el.parentNode
    test.test('tag-list-empty', el => !el.innerHTML, undefined, el)
    document.body.dispatchEvent(new CustomEvent('tagsTest', {
      /** @type {ListArticlesEventDetail} */
      detail: {
        fetch: Promise.resolve({
          tags: ['test', 'hello', 'test']
        })
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))
    // wait for the Promise to resolve
    setTimeout(() => {
      test.test('tag-list-content', el => !!el.querySelector('.tag-list') && el.querySelector('.tag-list')?.children?.length === 3, undefined, el)
      // test click tag link
      let gotClicks = 0
      let func1
      document.body.addEventListener('requestListArticles', (func1 = event => {
        gotClicks = event?.detail?.tag === 'hello' ? gotClicks + 1 : gotClicks
      }))
      el.querySelector('.tag-list')?.children[1]?.click()
      document.body.removeEventListener('requestListArticles', func1)
      test.test('tag-list-click-counts', () => gotClicks === 1, undefined, el)
      // remove and append to trigger connectedCallback
      el.remove()
      parent.appendChild(el)
      test.test('tag-list-render-counts', () => renderCount === 1, undefined, el)
      resolveTest([test.counter, test.passedCounter, test.failedCounter])
    }, 50);
  })
  // ------------------------------------------------------------------------------------------------------------
  counter++
  return result
}
