// @ts-check

/* global self */

/**
 * This global Helper-Class holds all Debugging relevant actions and is irrelevant in production
 *
 * @class DebuggingClass
 */
class DebuggingClass {
  constructor () {
    // when debugging locally navigate to localhost
    // NOTE: 1. Can not be set dynamically in .vscode/launch.json 2. Timeout is needed for the devtools to startup
    setTimeout(() => self.location.replace(self.location.href.replace(/.*?(www\/html|html|www|htdocs)(.*)index.*/, 'http://localhost$2')), self.location.href.includes('test') ? 0 : 2000)
  }
}
export const Debugging = self.location.href.includes('file://') ? new DebuggingClass() : null
