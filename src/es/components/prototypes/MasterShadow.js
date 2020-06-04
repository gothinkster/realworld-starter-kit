// @ts-check
/** @typedef {ShadowRootMode | 'false'} mode */

/* global HTMLElement */
/* global document */
/* global customElements */
/* global CustomEvent */

/**
 * MasterShadow is a helper with a few functions for every web component (atom, organism and molecule)
 *
 * @export
 * @function MasterShadow
 * @param {HTMLElement | *} ChosenHTMLElement
 * @attribute {mode} [mode='open']
 * @property {
      MasterShadow.parseAttribute,
      addEventListenerInitialOnce,
      addEventListenerInitialTimeout,
      connectedCallbackEventListeners,
      connectedCallbackEventOnceListeners,
      css,
      disconnectedCallback,
      getCustomEvent,
      hasShadow,
      html,
      importCustomElementsAndDefine,
      _masterHTMLStyleElement,
      root,
      shadow,
      _shadow
    }
 */
export const MasterShadow = (ChosenHTMLElement = HTMLElement) => class MasterShadow extends ChosenHTMLElement {
  /**
   * Creates an instance of MasterShadow. The constructor will be called for every custom element using this class when initially created.
   *
   * @param {{mode?: mode | undefined}} [masterArgs = {mode: undefined}]
   * @param {*} args
   */
  constructor (masterArgs = { mode: undefined }, ...args) {
    super(...args)

    /**
     * Digest attribute to have shadow or not
     * open, closed or no shadow resp. open or closed only differs by exposing shadowRoot, which can be worked around anyways.
     *
     * @type {mode}
     */
    const mode = typeof masterArgs.mode === 'string' ? masterArgs.mode : this.getAttribute('mode') || 'open'
    if (mode === 'open' || mode === 'closed') this.shadow = this.attachShadow({ mode })

    /**
     * Store all created custom events in this map by using this.getCustomEvent
     *
     * @protected
     * @type {Map<string, CustomEvent>}
     */
    this._customEvents = new Map()

    /**
     * move children to shadow, if there is one, otherwise they won't be visible
     */
    if (this.hasShadow) Array.from(this.childNodes).forEach(childNode => this.shadow.appendChild(childNode))
    /** @type {function[]} */
    this.connectedCallbackEventListeners = []
    /** @type {function[]} */
    this.connectedCallbackEventOnceListeners = []
  }

  /**
   * Lifecycle callback, triggered when node is attached to the dom
   *
   * @return {void}
   */
  connectedCallback () {
    this.connectedCallbackEventListeners.forEach(listener => listener())
    this.connectedCallbackEventOnceListeners.forEach(listener => listener())
    this.connectedCallbackEventOnceListeners = []
  }

  /**
   * Lifecycle callback, triggered when node is detached from the dom
   *
   * @return {void}
   */
  disconnectedCallback () {}

  /**
   * return object if JSON parsable or null
   *
   * @static
   * @param {string} attribute
   * @return {{} | null}
   */
  static parseAttribute (attribute) {
    if (!attribute || typeof attribute !== 'string') return null
    try {
      return JSON.parse(attribute.replace(/'/g, '"')) || null
    } catch (e) {
      return null
    }
  }

  // customized built-in https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define
  /**
   * imports the desired web component, when not already done, defines it and gives back an instance of each or name string
   *
   * @static
   * @param {{path:string, name: string, moduleName?:string | undefined, options?:{extends:string} | undefined, createElement?: boolean}[]} [elements=[{moduleName: 'default', options: undefined, createElement: true}]]
   * @returns {[Promise<HTMLElement[] | string[]>, Promise<HTMLElement | string>[]]}
   */
  static importCustomElementsAndDefine (elements = []) {
    const promises = elements.map(element => {
      // @ts-ignore
      if (!element.path || !element.name) return Promise.resolve(document.createElement(console.warn(`not-found-at-master-shadow-import-custom-elements-and-define-${element.name || 'undefined'}`)))
      return import(element.path).then(module => {
        if (!customElements.get(element.name)) customElements.define(element.name, module[element.moduleName || 'default'].toString().includes(' => class') ? module[element.moduleName || 'default']() : module[element.moduleName || 'default'], element.options)
        return element.createElement === false ? element.name : document.createElement(element.name)
      })
    })
    return [Promise.all(promises), promises]
  }

  /**
   * easily make or reuse (when eventInit == undefined) a CustomEvent and store it
   *
   * @param {string} type
   * @param {CustomEventInit} [eventInit = {bubbles: true, cancelable: true, detail: null, composed: true}]
   * @return {CustomEvent}
   */
  getCustomEvent (type, eventInit) {
    if (!eventInit && this._customEvents.has(type)) return this._customEvents.get(type)
    const event = new CustomEvent(type, Object.assign({ bubbles: true, cancelable: true, detail: null, composed: true }, eventInit))
    this._customEvents.set(type, event)
    return event
  }

  /**
   * Register functions to be executed at connectedCallback
   *
   * @param {(any?)=>void} listener
   * @param {boolean} [once=false]
   * @return {void}
   */
  addConnectedCallbackEventListener (listener, once = false) {
    if (once) {
      // immediately execute when already intersecting
      if (this.isConnected) {
        listener()
      } else {
        this.connectedCallbackEventOnceListeners.push(listener)
      }
    } else {
      // immediately execute when already intersecting
      if (this.isConnected) listener()
      this.connectedCallbackEventListeners.push(listener)
    }
  }

  /**
   * !!! Try not to use this but refactor your events smartly (eg. listens once at start to general event and then to onchange event) !!!
   * listens once at first event, waits for the specified timeout to receive no event, triggers with last recent event and an array of all passed events -> then keeps listening as usual event listeners do
   * use this to not trigger the listener function excessively at startup, when all other elements request events but have a first immediate feedback
   *
   * @param {HTMLElement} target
   * @param {string} type
   * @param {(event:CustomEvent | Event, events?:CustomEvent[])=>void} listener
   * @param {*} [options={}]
   * @param {number} [timeout=1000]
   */
  addEventListenerInitialOnce (target, type, listener, options = {}, timeout = 1000) {
    target.addEventListener(type, event => {
      listener(event)
      this.addEventListenerInitialTimeout(target, type, listener, options, timeout)
    }, Object.assign(Object.assign({}, options), { once: true }))
  }

  /**
   * !!! Try not to use this but refactor your events smartly (eg. listens once at start to general event and then to onchange event) !!!
   * waits for the specified timeout to receive no event, triggers with last recent event and an array of all passed events -> then keeps listening as usual event listeners do
   * use this to not trigger the listener function excessively at startup, when all other elements request events
   *
   * @param {HTMLElement} target
   * @param {string} type
   * @param {(event:CustomEvent | Event, events?:CustomEvent[])=>void} listener
   * @param {*} [options={}]
   * @param {number} [timeout=500]
   */
  addEventListenerInitialTimeout (target, type, listener, options = {}, timeout = 500) {
    let dispatchTimeoutID = null
    const events = []
    const func = event => {
      events.push(event)
      clearTimeout(dispatchTimeoutID)
      dispatchTimeoutID = setTimeout(() => {
        target.removeEventListener(type, func, options)
        listener(event, events)
        target.addEventListener(type, listener, options)
      }, timeout)
    }
    target.addEventListener(type, func, options)
  }

  /**
   * This can have a shadow (open | closed) or no shadow at all
   *
   * @readonly
   * @return {ShadowRoot | null}
   */
  get shadow () {
    return this._shadow || null
  }

  /**
   * @param {ShadowRoot} shadow
   */
  set shadow (shadow) {
    if (!this._shadow) this._shadow = shadow
  }

  /**
   * check if we operate with a shadow
   *
   * @readonly
   * @return {boolean}
   */
  get hasShadow () {
    return this.shadow !== null
  }

  /**
   * this or this.shadow, depends if a shadow was initiated, for this reason use this.root and you will always get the component element to work with
   *
   * @readonly
   * @return {ShadowRoot | MasterShadow}
   */
  get root () {
    return this.shadowRoot || this.shadow || this
  }

  /**
   * selector :host only works when shadow is active, fallback to id then nodeName
   *
   * @readonly
   */
  get cssSelector () {
    return this.hasShadow ? ':host' : this.getAttribute('id') ? `#${this.getAttribute('id')}` : this.nodeName
  }

  /**
   * the master css style of this component
   *
   * @return {string}
   */
  get css () {
    return this._masterHTMLStyleElement.textContent
  }

  /**
   * to clear, set empty string otherwise it gets prepended to already set style
   *
   * @param {string} style
   */
  set css (style) {
    if (!this._masterHTMLStyleElement) {
      /** @type {HTMLStyleElement} */
      this._masterHTMLStyleElement = document.createElement('style')
      this._masterHTMLStyleElement.setAttribute('protected', 'true') // this will avoid deletion by html=''
      this.root.appendChild(this._masterHTMLStyleElement)
    }
    this._masterHTMLStyleElement.textContent = (!this._masterHTMLStyleElement.textContent ? style : !style ? '' : this._masterHTMLStyleElement.textContent + '\n' + style).replace(/this\s{0,5}/g, `${this.cssSelector} `)
  }

  /**
   * returns innerHTML STRING of shadow else this
   *
   * @return {string | HTMLCollection | HTMLElement[]| ChildNode[] | HTMLElement | NodeList}
   */
  get html () {
    return this.root.innerHTML
  }

  /**
   * set innerHTML of shadow else this
   *
   * @param {string | HTMLCollection | HTMLElement[]| ChildNode[] | HTMLElement | NodeList} innerHTML
   */
  set html (innerHTML) {
    if (typeof innerHTML === 'string') {
      if (!innerHTML) {
        // save all protected
        innerHTML = this.root.querySelectorAll('[protected=true]')
        // clear all childNodes but keep protected
        this.root.innerHTML = ''
      } else {
        /**
         * this div is used to render string to childNodes and avoids:
         * "this.root.innerHTML = this.root.innerHTML + innerHTML"
         * the above would re-initiate (newly construct) already set childNodes, which is bad for performance but also destroys references
         *
         * @type {HTMLElement}
         */
        const div = document.createElement('div')
        div.innerHTML = innerHTML
        innerHTML = div.childNodes
      }
    }
    // @ts-ignore
    if (innerHTML.length === undefined) innerHTML = [innerHTML]
    // @ts-ignore
    Array.from(innerHTML).forEach(node => this.root.appendChild(node))
  }
}
