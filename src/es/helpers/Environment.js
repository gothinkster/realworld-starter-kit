// @ts-check

/* global self */

/**
 * This global Helper-Class holds all Environment relevant data
 *
 * @class EnvironmentClass
 */
class EnvironmentClass {
  constructor () {
    // https://github.com/Weedshaker/event-driven-web-components-realworld-example-app/blob/master/FRONTEND_INSTRUCTIONS.md#using-the-hosted-api
    this.fetchBaseUrl = 'https://conduit.productionready.io/api/'

    /**
     * it seems as the conduit example always limits by 10 articles per page
     *
     * @type {number}
     */
    this.articlesPerPageLimit = 10
  }

  /**
   * get the fetchBaseUrl
   *
   * @return {string}
   */
  get fetchBaseUrl () {
    return this._fetchBaseUrl
  }

  /**
   * set the fetchBaseUrl
   *
   * @param {string} url
   */
  set fetchBaseUrl (url) {
    const link = document.createElement('link')
    link.setAttribute('rel', 'preconnect')
    link.setAttribute('href', this._fetchBaseUrl = url)
    document.head.appendChild(link)
  }
}
// @ts-ignore
export const Environment = self.Environment = new EnvironmentClass()
