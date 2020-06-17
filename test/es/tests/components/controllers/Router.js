// @ts-nocheck

import Test from '../../../Test.js'

let counter = 0

/**
 * Router Tests
 *
 * @param {string} testTitle
 * @param {string} moduleName
 * @param {string} modulePath
 * @param {string} [namespace = '']
 * @return {Promise<[number, number, number]>}
 */
export const test = (testTitle = 'controllers/Router', moduleName = 'default', modulePath = '../../src/es/components/controllers/Router.js', namespace = counter) => {
  let resolveTest
  const result = new Promise(resolve => resolveTest = resolve)
  // test modulePath must be from Test.js perspective
  const test = new Test(testTitle, namespace)

  // ------------------------------------------------------------------------------------------------------------
  // HTML -------------------------------------------------------------------------------------------------------
  const oldHash = location.hash
  let shouldComponentRenderCounter = 0
  let renderCount = 0
  let routeCount = 0
  const oldHistoryLength = history.length
  test.runTest('router-setup', moduleName, modulePath,
    el => !!el,
    undefined,
    subclass => class extends subclass {
      shouldComponentRender(name) {
        shouldComponentRenderCounter++
        return super.shouldComponentRender(name)
      }
      render(component) {
        renderCount++
        super.render(component)
      }
    }
  ).then(el => {
    const parent = el.parentNode
    location.hash = '#/'
    // routeCount++ don't count here, since this is the connectedCallback default route and will be replaced
    setTimeout(() => {
      test.test('route-to-p-home', el => el?.children[0]?.tagName === 'P-HOME', undefined, el)
      location.hash = '#/article'
      routeCount++
      setTimeout(() => {
        test.test('route-to-p-article', el => el?.children[0]?.tagName === 'P-ARTICLE', undefined, el)
        // do the below at the very end
        el.remove()
        parent.appendChild(el)
        setTimeout(() => {
          test.test('router-render-counts', () => renderCount === 2, undefined, el)
          test.test('router-should-component-render-counts', () => shouldComponentRenderCounter === 3, undefined, el)
          test.test('history-length', () => oldHistoryLength + routeCount === history.length, undefined, el)
          resolveTest([test.counter, test.passedCounter, test.failedCounter])
          location.hash = oldHash
        }, 200);
      }, 200)
    }, 200)
  })
  // ------------------------------------------------------------------------------------------------------------
  counter++
  return result
}
