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
 */
export const test = (testTitle = 'Header', moduleName = 'default', modulePath = '../../src/es/components/organisms/Header.js', namespace = counter) => {
  // test modulePath must be from Test.js perspective
  const test = new Test(testTitle, namespace)

  // ------------------------------------------------------------------------------------------------------------
  // HTML -------------------------------------------------------------------------------------------------------
  test.runTest('header-setup', moduleName, modulePath,
    el => !!el
  ).then(el => {
    test.test('header-content', el => !!el.querySelector('a.navbar-brand')?.href?.includes('index'), undefined, el) && !!el.querySelector('.navbar-nav')
  })
  // ------------------------------------------------------------------------------------------------------------
  counter++
}
