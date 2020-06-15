// @ts-nocheck

import Test from '../../../Test.js'

let counter = 0

/**
 * Home Tests
 *
 * @param {string} testTitle
 * @param {string} moduleName
 * @param {string} modulePath
 * @param {string} [namespace = '']
 * @return {Promise<[number, number, number]>}
 */
export const test = (testTitle = 'organisms/Home', moduleName = 'default', modulePath = '../../src/es/components/pages/Home.js', namespace = counter) => {
  let resolveTest
  const result = new Promise(resolve => resolveTest = resolve)
  // test modulePath must be from Test.js perspective
  const test = new Test(testTitle, namespace)

  // ------------------------------------------------------------------------------------------------------------
  // HTML -------------------------------------------------------------------------------------------------------
  let shouldComponentRenderCounter = 0
  let renderCount = 0
  let loadChildComponentsCount = 0
  test.runTest('home-setup', moduleName, modulePath,
    el => !!el,
    undefined,
    subclass => class extends subclass {
      shouldComponentRender() {
        shouldComponentRenderCounter++
        return super.shouldComponentRender()
      }
      render() {
        renderCount++
        super.render()
      }
      loadChildComponents() {
        loadChildComponentsCount++
        return super.loadChildComponents()
      }
    }
  ).then(el => {
    const parent = el.parentNode
    // set timeout due to render is async
    setTimeout(() => {
      test.test('home-content', el => !!el.querySelector('c-list-articles') && !!el.querySelector('o-list-article-previews'), undefined, el)
      test.test('home-defined-child-components', () => customElements.get('c-list-articles') && customElements.get('o-list-article-previews'), undefined, el)
      // remove and append to trigger connectedCallback
      el.remove()
      parent.appendChild(el)
      test.test('home-should-component-render-counts', () => shouldComponentRenderCounter === 2, undefined, el)
      test.test('home-render-counts', () => renderCount === 1, undefined, el)
      test.test('home-load-child-components-counts', () => loadChildComponentsCount === 2, undefined, el)
      resolveTest([test.counter, test.passedCounter, test.failedCounter])
    }, 200);
  })
  // ------------------------------------------------------------------------------------------------------------
  return result
  counter++
}
