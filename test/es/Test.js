// @ts-check

/* global customElements */
/* global self */

export default class Test {
  /**
   * Creates an instance of Test
   * @param {string} name
   * @param {string} [namespace = ''] // is very important if the same test runs more than once in the same session
   * @memberof Test
   */
  constructor (name, namespace = '') {
    this.namespace = namespace

    this.summaries = document.createElement('div')
    this.summaries.innerHTML = `<a href=#${name}>${name} had <span class=hasDone></span> test runs done from which <span class=hasPassed></span> passed and <span class=hasFailed></span> failed</a>`
    document.getElementById('summary').appendChild(this.summaries)
    this.summarySpaceDone = this.summaries.getElementsByClassName('hasDone')[0]
    this.summarySpacePassed = this.summaries.getElementsByClassName('hasPassed')[0]
    this.summarySpaceFailed = this.summaries.getElementsByClassName('hasFailed')[0]
    this.counter = 0
    this.passedCounter = 0
    this.failedCounter = 0

    const results = document.createElement('div')
    results.innerHTML = `
      <div>
        <a name=${name}></a>
        <h2>Results: ${name}</h2>
        <div class=result></div>
      </div>
      <div>
        <h2>Test Artifacts</h2>
        <div class=test></div>
      </div>
    `
    document.getElementById('results').appendChild(results)
    document.getElementById('results').appendChild(document.createElement('hr'))
    this.resultSpace = results.getElementsByClassName('result')[0]
    this.testSpace = results.getElementsByClassName('test')[0]

    self.onerror = (message, source, lineno, colno, error) => {
      const errorEl = document.createElement('div')
      errorEl.classList.add(errorEl.textContent = 'failed')
      errorEl.textContent += `message: ${message}, source: ${source}, lineno: ${lineno}, colno: ${colno}, error: ${error}}`
      this.summaries.appendChild(errorEl)
    }
  }

  /**
   * runs a web-component test by first importing the needed module, define it and test it
   *
   * @param {string} testName
   * @param {string} [moduleName='default']
   * @param {string} modulePath
   * @param {(HTMLElement)=>boolean} testFunction
   * @param {string} [attributes='']
   * @param {(Function)=>Function} [extendsFunction=(Function)=>Function]
   * @memberof Test
   * @return {Promise<Element>}
   */
  runTest (testName, moduleName = 'default', modulePath, testFunction, attributes = '', extendsFunction = func => func) {
    testName = this.namespace ? `${testName}-${this.namespace}` : testName
    return import(modulePath).then(module => {
      // test shadowRoot
      try {
        if (!customElements.get(testName)) customElements.define(testName, extendsFunction(!module[moduleName].toString().includes('=>') ? class extends module[moduleName] {} : module[moduleName]()))
      } catch (error) {
        console.error(`Note! testName: ${testName} must be lower case with hyphen separated!`, error)
      }
      return this.test(testName, testFunction, attributes, null)
    })
  }

  /**
   * test a web-component
   *
   * @param {string} testName
   * @param {(HTMLElement)=>boolean} testFunction
   * @param {string} [attributes='']
   * @param {Element} [testEl = null]
   * @param {boolean} hidden
   * @return {Element | null}
   */
  test (testName, testFunction, attributes = '', testEl = null, hidden = false) {
    if (!testEl) {
      const container = document.createElement('div')
      container.innerHTML = `<${testName} ${attributes}>&lt;${testName}&gt;</${testName}>`
      testEl = container.getElementsByTagName(testName)[0]
      this.testSpace.appendChild(testEl)
      // @ts-ignore
      testEl.hidden = hidden
    } else {
      const placeHolder = document.createElement('div')
      placeHolder.textContent = `reused: <${testEl.tagName.toLowerCase()}> for ${testName} test`
      placeHolder.classList.add('placeHolder')
      this.testSpace.appendChild(placeHolder)
      placeHolder.hidden = hidden
    }
    if (testEl) {
      const resultEl = document.createElement('div')
      if (testFunction(testEl)) {
        resultEl.classList.add(resultEl.textContent = 'passed')
        if (!hidden) this.passedCounter++
      } else {
        resultEl.classList.add(resultEl.textContent = 'failed')
        if (!hidden) this.failedCounter++
      }
      testEl.className = ''
      testEl.classList.add(resultEl.textContent)
      resultEl.textContent += `: ${testName.replace(`-${this.namespace}`, '')}`
      this.resultSpace.appendChild(resultEl)
      resultEl.hidden = hidden
      if (hidden) console.info(`${testFunction(testEl) ? 'passed' : 'failed'} hidden test: ${testName} on element: ${testEl.tagName.toLowerCase()}`)
    }
    if (!hidden) this.counter++
    this.updateSummary()
    return testEl
  }

  updateSummary () {
    if (Number(this.summarySpaceFailed.textContent) > 0) this.summaries.classList.add('failed')
    if (Number(this.summarySpacePassed.textContent) === Number(this.summarySpaceDone.textContent)) {
      this.summaries.classList.add('passed')
    } else {
      this.summaries.classList.remove('passed')
    }
  }

  set counter (number) {
    this._counter = number
    this.summarySpaceDone.textContent = number
  }

  get counter () {
    return this._counter
  }

  set passedCounter (number) {
    this._passedCounter = number
    this.summarySpacePassed.textContent = number
  }

  get passedCounter () {
    return this._passedCounter
  }

  set failedCounter (number) {
    this._failedCounter = number
    this.summarySpaceFailed.textContent = number
  }

  get failedCounter () {
    return this._failedCounter
  }
}
