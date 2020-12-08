// @ts-check

/* global HTMLElement */
/* global AbortController */
/* global CustomEvent */
/* global fetch */
/* global location */

/**
 * https://github.com/gothinkster/realworld/tree/master/api#get-article
 *
 * @typedef {{ email: string, password: string }} loginUserEventDetail
 */

/**
 * https://github.com/gothinkster/realworld/tree/master/api#single-article
 *
 * @typedef {{
      fetch: Promise<import("../../helpers/Interfaces.js").User>
    }} UserEventDetail
 */

import { Environment } from '../../helpers/Environment.js'


/**
 * https://github.com/gothinkster/realworld/tree/master/api#get-article
 * As a controller, this component becomes a store and organizes events
 * dispatches: 'user' on 'loginUser'
 *
 * @export
 * @class User
 */
export default class User extends HTMLElement {
  constructor () {
    super()

    /**
     * Used to cancel ongoing, older fetches
     * this makes sense, if you only expect one and most recent true result and not multiple
     *
     * @type {AbortController | null}
     */
    this.abortController = null

    /**
     * Listens to the event name/typeArg: 'loginUser'
     *
     * @param {CustomEvent & {detail: loginUserEventDetail}} event
     */
    this.loginUserListener = event => {
      const url = `${Environment.fetchBaseUrl}users/login`
      const body = JSON.stringify(
        {
          'user': {
            'email': event.detail.email,
            'password': event.detail.password
          }
        }
      )


      // reset old AbortController and assign new one
      if (this.abortController) this.abortController.abort()
      this.abortController = new AbortController()
      console.log(url, Object.assign(Environment.fetchHeader, {body: body}, { signal: this.abortController.signal }));
      // answer with event
      this.dispatchEvent(new CustomEvent('user', {
        /** @type {UserEventDetail} */
        detail: {
          fetch: fetch(url, Object.assign(Environment.fetchHeader, {method: 'POST', body: body, signal: this.abortController.signal }))
                .then(response => {
                  if (response.status >= 200 && response.status <= 299)  console.log(response.json())
                  throw new Error(response.statusText)
                // @ts-ignore
                }).catch(error => console.warn(url, error) || error)
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    this.registerUserListener = event => {
      if(!event.detail.user) return;

      fetch(`${Environment.fetchBaseUrl}users`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(event.detail)
      }).then((response) => response.json())
      .then(data => {
        if (data.errors) return this.errorMessages = data.errors;

        this.token = data.user.token
        window.location.href = '#/'
      })
      .catch((error) => console.error('Error:', error))
    }
  }

  connectedCallback () {
    this.addEventListener('loginUser', this.loginUserListener)
    this.addEventListener('registerUser', this.registerUserListener)
  }

  disconnectedCallback () {
    this.removeEventListener('loginUser', this.loginUserListener)
    this.removeEventListener('registerUser', this.registerUserListener)
  }

  /**
   * get JWT token
   *
   * @return {string}
   */
  get token() {
    return window.localStorage.getItem('ID_TOKEN');
  }

  /**
   * set JWT token
   *
   * @param {string} token
   */
  set token(token) {
    if (token && token !== '') {
      window.localStorage.setItem('ID_TOKEN', token);
    } else {
      window.localStorage.removeItem('ID_TOKEN');
    }
  }
}
