// @ts-nocheck

import Test from '../../../Test.js'

let counter = 0

/**
 * Footer Tests
 *
 * @param {string} testTitle
 * @param {string} moduleName
 * @param {string} modulePath
 * @param {string} [namespace = '']
 * @return {Promise<[number, number, number]>}
 */
export const test = (testTitle = 'organisms/Footer', moduleName = 'default', modulePath = '../../src/es/components/organisms/Footer.js', namespace = counter) => {
  let resolveTest
  const result = new Promise(resolve => resolveTest = resolve)
  // test modulePath must be from Test.js perspective
  const test = new Test(testTitle, namespace)

  // ------------------------------------------------------------------------------------------------------------
  // HTML -------------------------------------------------------------------------------------------------------
  let shouldComponentRenderCounter = 0
  let renderCount = 0
  test.runTest('footer-setup', moduleName, modulePath,
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
    }
  ).then(el => {
    const parent = el.parentNode
    test.test('footer-content', el => !!el.querySelector('.logo-font') && !!el.querySelector('.attribution')?.querySelector('a')?.href?.includes('thinkster'), undefined, el)
    // remove and append to trigger connectedCallback
    el.remove()
    parent.appendChild(el)
    test.test('footer-render-counts', () => renderCount === 1, undefined, el)
    test.test('footer-should-component-render-counts', () => shouldComponentRenderCounter === 2, undefined, el)
    resolveTest([test.counter, test.passedCounter, test.failedCounter])
  })
  // ------------------------------------------------------------------------------------------------------------
  counter++
  return result
}
