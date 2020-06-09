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
 */
export const test = (testTitle = 'Footer', moduleName = 'default', modulePath = '../../src/es/components/organisms/Footer.js', namespace = counter) => {
  // test modulePath must be from Test.js perspective
  const test = new Test(testTitle, namespace)

  // ------------------------------------------------------------------------------------------------------------
  // HTML -------------------------------------------------------------------------------------------------------
  test.runTest('footer-setup', moduleName, modulePath,
    el => !!el
  ).then(el => {
    test.test('footer-content', el => !!el.querySelector('.logo-font') && !!el.querySelector('.attribution')?.querySelector('a')?.href?.includes('thinkster'), undefined, el)
  })
  // ------------------------------------------------------------------------------------------------------------
  counter++
}
