// @ts-nocheck

import Test from '../../../Test.js'

let counter = 0

/**
 * Header Tests
 *
 * @param {string} testTitle
 * @param {string} moduleName
 * @param {string} modulePath
 * @param {string} [namespace = '']
 * @return {Promise<[number, number, number]>}
 */
export const test = (testTitle = 'organisms/Header', moduleName = 'default', modulePath = '../../src/es/components/organisms/Header.js', namespace = counter) => {
  let resolveTest
  const result = new Promise(resolve => resolveTest = resolve)
  // test modulePath must be from Test.js perspective
  const test = new Test(testTitle, namespace)

  // ------------------------------------------------------------------------------------------------------------
  // HTML -------------------------------------------------------------------------------------------------------
  let shouldComponentRenderCounter = 0
  let renderCount = 0
  test.runTest('header-setup', moduleName, modulePath,
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
    test.test('header-content', el => !!el.querySelector('a.navbar-brand')?.href?.includes('index') && !!el.querySelector('.navbar-nav'), undefined, el)
    // remove and append to trigger connectedCallback
    el.remove()
    parent.appendChild(el)
    test.test('header-render-counts', () => renderCount === 1, undefined, el)
    test.test('header-should-component-render-counts', () => shouldComponentRenderCounter === 2, undefined, el)
    resolveTest([test.counter, test.passedCounter, test.failedCounter])
  })
  // ------------------------------------------------------------------------------------------------------------
  counter++
  return result
}
