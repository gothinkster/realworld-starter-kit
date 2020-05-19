(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~src/main/addon/HighlightJS-mjs"],{

/***/ "./node_modules/neo.mjs/src/main/addon/HighlightJS.mjs":
/*!*************************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/addon/HighlightJS.mjs ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");
/* harmony import */ var _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DomAccess.mjs */ "./node_modules/neo.mjs/src/main/DomAccess.mjs");
/* harmony import */ var _Stylesheet_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Stylesheet.mjs */ "./node_modules/neo.mjs/src/main/addon/Stylesheet.mjs");




/**
 * Required for the docs app which uses highlight.js for the source views
 * @class Neo.main.addon.HighlightJS
 * @extends Neo.core.Base
 * @singleton
 */
class HighlightJS extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {
        return {
            /**
             * @member {String} className='Neo.main.addon.HighlightJS'
             * @private
             */
            className: 'Neo.main.addon.HighlightJS',
            /**
             * @member {String} highlightJsPath='./resources/highlight/highlight.pack.js'
             * @private
             */
            highlightJsPath: './resources/highlight/highlight.pack.js',
            /**
             * @member {String} highlightJsLineNumbersPath=Neo.config.basePath + 'node_modules/highlightjs-line-numbers.js/dist/highlightjs-line-numbers.min.js'
             * @private
             */
            highlightJsLineNumbersPath: Neo.config.basePath + 'node_modules/highlightjs-line-numbers.js/dist/highlightjs-line-numbers.min.js',
            /**
             * Remote method access for other workers
             * @member {Object} remote={app: [//...]}
             * @private
             */
            remote: {
                app: [
                    'scrollIntoView',
                    'syntaxHighlight',
                    'syntaxHighlightInit',
                    'syntaxHighlightLine'
                ]
            },
            /**
             * @member {Boolean} singleton=true
             * @private
             */
            singleton: true,
            /**
             * @member {String} themePath='./resources/highlightjs-custom-github-theme.css'
             * @private
             */
            themePath: './resources/highlightjs-custom-github-theme.css'
        }
    }

    /**
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me = this;

        _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].loadScript(me.highlightJsPath).then(() => {
            _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].addScript({src: me.highlightJsLineNumbersPath});
        });

        _Stylesheet_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].createStyleSheet(null, 'hljs-theme', me.themePath);
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.text
     * @param {String} data.vnodeId
     * @private
     */
    scrollIntoView(data) {
        let parentEl = _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].getElement(data.vnodeId),
            el       = parentEl.querySelector('[data-list-header="' + data.text + '"]');

        if (el) {
            el.previousSibling.scrollIntoView({
                behavior: 'smooth',
                block   : 'start',
                inline  : 'nearest'
            });
        }
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.vnodeId
     */
    syntaxHighlight(data) {
        if (hljs) {
            let node = document.getElementById(data.vnodeId);

            hljs.highlightBlock(node);
            hljs.lineNumbersBlock(node);
        } else {
            console.error('highlight.js is not included inside the main thread.');
        }
    }

    /**
     *
     * @param {Object} data
     */
    syntaxHighlightInit(data) {
        if (hljs) {
            let blocks = document.querySelectorAll('pre code:not(.hljs)');
            Array.prototype.forEach.call(blocks, hljs.highlightBlock);
        } else {
            console.error('highlight.js is not included inside the main thread.');
        }
    }

    /**
     *
     * @param {Object} data
     * @param {Number} data.addLine
     * @param {String} data.vnodeId
     * @param {Number} data.removeLine
     */
    syntaxHighlightLine(data) {
        let parentEl = document.getElementById(data.vnodeId),
            cls      = 'neo-highlighted-line',
            el;

        if (Neo.isNumber(data.addLine)) {
            el = parentEl.querySelector('[data-line-number="' + data.addLine + '"]');

            if (el) {
                el.parentNode.classList.add(cls);

                el.parentNode.scrollIntoView({
                    behavior: 'smooth',
                    block   : 'start',
                    inline  : 'nearest'
                });
            }
        }

        if (Neo.isNumber(data.removeLine)) {
            el = parentEl.querySelector('[data-line-number="' + data.removeLine + '"]');

            if (el) {
                el.parentNode.classList.remove(cls);
            }
        }
    }
}

Neo.applyClassConfig(HighlightJS);

let instance = Neo.create(HighlightJS);

Neo.applyToGlobalNs(instance);

/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ }),

/***/ "./node_modules/neo.mjs/src/main/addon/Stylesheet.mjs":
/*!************************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/addon/Stylesheet.mjs ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * Logic to work with stylesheets, e.g. apply & switch Neo based themes
 * main.addon.HighlightJS requires this file
 * @class Neo.main.addon.Stylesheet
 * @extends Neo.core.Base
 * @singleton
 */
class Stylesheet extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {
        return {
            /**
             * @member {String} className='Neo.main.addon.Stylesheet'
             * @private
             */
            className: 'Neo.main.addon.Stylesheet',
            /**
             * Remote method access for other workers
             * @member {Object} remote={app: [//...]}
             * @private
             */
            remote: {
                app: [
                    'createStyleSheet',
                    'insertCssRules',
                    'swapStyleSheet'
                ]
            },
            /**
             * @member {Boolean} singleton=true
             * @private
             */
            singleton: true
        }
    }

    /**
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        if (Neo.config.useFontAwesome) {
            this.createStyleSheet(null, null, Neo.config.basePath + 'node_modules/@fortawesome/fontawesome-free/css/all.min.css');
        }

        if (Neo.config.themes.length > 0 && Neo.config.themes[0] !== '') {
            this.insertTheme();
        }
    }

    /**
     * Use either name for a neo theme (e.g. 'neo-theme-dark.css') or pass a href
     * @param {String} [name]
     * @param {String} [id]
     * @param {String} [href]
     */
    createStyleSheet(name, id, href) {
        if (!name && !href) {
            throw new Error('createStyleSheet: you need to either pass a name or a href');
        }

        const link = document.createElement('link'),
              url  = href ? href : Neo.config.cssPath
                  ? Neo.config.cssPath + name
                  : Neo.config.basePath + 'dist/' + Neo.config.environment + '/' + name;

        Object.assign(link, {
            href: url,
            rel : 'stylesheet',
            type: 'text/css'
        });

        if (id) {
            link.id = id;
        }

        document.head.appendChild(link);
    }

    /**
     *
     * @param {String} token
     * @returns {Boolean}
     */
    hasStyleSheet(token) {
        let i   = 0,
            len = document.styleSheets.length,
            sheet;

        for (; i < len; i++) {
            sheet = document.styleSheets[i];
            if (sheet.href && sheet.href.includes(token)) {
                return true;
            }
        }

        return false;
    }

    /**
     *
     * @param {Object} data
     * @private
     */
    insertCssRules(data) {
        let styleEl = document.getElementById('neoDynamicStyleSheet'),
            i     = 0,
            len   = data.rules.length,
            styleSheet;

        if (!styleEl) {
            styleEl = document.createElement('style');

            styleEl.id = 'neoDynamicStyleSheet';
            document.head.appendChild(styleEl);
        }

        styleSheet = styleEl.sheet;

        for (; i < len; i++) {
            styleSheet.insertRule(data.rules[i], styleSheet.cssRules.length);
        }
    }

    /**
     *
     * @private
     */
    insertTheme() {
        let me     = this,
            themes = Neo.config.themes;

        if (!Array.isArray(themes)) {
            themes = [themes];
        }

        if (themes[0]) {
            document.body.classList.add(themes[0]);
        }

        if (Neo.config.useCss4) {
            me.removeStyleSheets({
                included: ['neo-theme-', '-no-css4.css']
            });

            if (themes.length > 0 && !me.hasStyleSheet('neo-structure.css')) {
                me.createStyleSheet('neo-structure.css');
            }

            themes.forEach(theme => {
                if (!me.hasStyleSheet(theme + '.css')) {
                    me.createStyleSheet(theme + '.css');
                }
            });
        } else {
            me.removeStyleSheets({
                included: ['neo-structure.css']
            });

            me.removeStyleSheets({
                included: ['neo-theme-'],
                excluded: ['-no-css4.css']
            });

            if (themes.length > 0 && !me.hasStyleSheet(themes[0] + '-no-css4.css')) {
                me.createStyleSheet(themes[0] + '-no-css4.css', 'neo-theme');
            }
        }
    }

    /**
     *
     * @param {Object} opts
     * @param {String[]} opts.included
     * @param {String[]} opts.excluded
     */
    removeStyleSheets(opts) {
        let i        = 0,
            len      = document.styleSheets.length,
            included = opts.included || [],
            excluded = opts.included || [],
            sheet, removeSheet;

        for (; i < len; i++) {
            sheet = document.styleSheets[i];

            removeSheet = true;

            if (sheet.href) {
                excluded.forEach(name => {
                    if (sheet.href.includes(name)) {
                        removeSheet = false;
                    }
                });

                if (removeSheet) {
                    included.forEach(name => {
                        if (!sheet.href.includes(name)) {
                            removeSheet = false;
                        }
                    });

                    if (removeSheet) {
                        console.log('removeSheet', sheet.href);
                        sheet.ownerNode.parentNode.removeChild(sheet.ownerNode);
                    }
                }
            }
        }
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.href
     * @param {String} data.id
     */
    swapStyleSheet(data) {
        document.getElementById(data.id).setAttribute('href', data.href);
    }
}

Neo.applyClassConfig(Stylesheet);

let instance = Neo.create(Stylesheet);

Neo.applyToGlobalNs(instance);

/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9hZGRvbi9IaWdobGlnaHRKUy5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL21haW4vYWRkb24vU3R5bGVzaGVldC5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTZDO0FBQ0g7QUFDRDs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHNEQUFJO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU8sU0FBUztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBOztBQUVBLFFBQVEsc0RBQVM7QUFDakIsWUFBWSxzREFBUyxZQUFZLG1DQUFtQztBQUNwRSxTQUFTOztBQUVULFFBQVEsdURBQVU7QUFDbEI7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzREFBUztBQUNoQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRWUsdUVBQVEsRTs7Ozs7Ozs7Ozs7O0FDaEt2QjtBQUFBO0FBQXVDOztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixzREFBSTtBQUM3QjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU8sU0FBUztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsU0FBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsU0FBUztBQUN4QixlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYyxTQUFTO0FBQ3ZCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRWUsdUVBQVEsRSIsImZpbGUiOiJ2ZW5kb3JzfnNyYy9tYWluL2FkZG9uL0hpZ2hsaWdodEpTLW1qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlICAgICAgIGZyb20gJy4uLy4uL2NvcmUvQmFzZS5tanMnO1xuaW1wb3J0IERvbUFjY2VzcyAgZnJvbSAnLi4vRG9tQWNjZXNzLm1qcyc7XG5pbXBvcnQgU3R5bGVzaGVldCBmcm9tICcuL1N0eWxlc2hlZXQubWpzJ1xuXG4vKipcbiAqIFJlcXVpcmVkIGZvciB0aGUgZG9jcyBhcHAgd2hpY2ggdXNlcyBoaWdobGlnaHQuanMgZm9yIHRoZSBzb3VyY2Ugdmlld3NcbiAqIEBjbGFzcyBOZW8ubWFpbi5hZGRvbi5IaWdobGlnaHRKU1xuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICogQHNpbmdsZXRvblxuICovXG5jbGFzcyBIaWdobGlnaHRKUyBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8ubWFpbi5hZGRvbi5IaWdobGlnaHRKUydcbiAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ05lby5tYWluLmFkZG9uLkhpZ2hsaWdodEpTJyxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBoaWdobGlnaHRKc1BhdGg9Jy4vcmVzb3VyY2VzL2hpZ2hsaWdodC9oaWdobGlnaHQucGFjay5qcydcbiAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGhpZ2hsaWdodEpzUGF0aDogJy4vcmVzb3VyY2VzL2hpZ2hsaWdodC9oaWdobGlnaHQucGFjay5qcycsXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gaGlnaGxpZ2h0SnNMaW5lTnVtYmVyc1BhdGg9TmVvLmNvbmZpZy5iYXNlUGF0aCArICdub2RlX21vZHVsZXMvaGlnaGxpZ2h0anMtbGluZS1udW1iZXJzLmpzL2Rpc3QvaGlnaGxpZ2h0anMtbGluZS1udW1iZXJzLm1pbi5qcydcbiAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGhpZ2hsaWdodEpzTGluZU51bWJlcnNQYXRoOiBOZW8uY29uZmlnLmJhc2VQYXRoICsgJ25vZGVfbW9kdWxlcy9oaWdobGlnaHRqcy1saW5lLW51bWJlcnMuanMvZGlzdC9oaWdobGlnaHRqcy1saW5lLW51bWJlcnMubWluLmpzJyxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVtb3RlIG1ldGhvZCBhY2Nlc3MgZm9yIG90aGVyIHdvcmtlcnNcbiAgICAgICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gcmVtb3RlPXthcHA6IFsvLy4uLl19XG4gICAgICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByZW1vdGU6IHtcbiAgICAgICAgICAgICAgICBhcHA6IFtcbiAgICAgICAgICAgICAgICAgICAgJ3Njcm9sbEludG9WaWV3JyxcbiAgICAgICAgICAgICAgICAgICAgJ3N5bnRheEhpZ2hsaWdodCcsXG4gICAgICAgICAgICAgICAgICAgICdzeW50YXhIaWdobGlnaHRJbml0JyxcbiAgICAgICAgICAgICAgICAgICAgJ3N5bnRheEhpZ2hsaWdodExpbmUnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc2luZ2xldG9uPXRydWVcbiAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHNpbmdsZXRvbjogdHJ1ZSxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSB0aGVtZVBhdGg9Jy4vcmVzb3VyY2VzL2hpZ2hsaWdodGpzLWN1c3RvbS1naXRodWItdGhlbWUuY3NzJ1xuICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhlbWVQYXRoOiAnLi9yZXNvdXJjZXMvaGlnaGxpZ2h0anMtY3VzdG9tLWdpdGh1Yi10aGVtZS5jc3MnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBEb21BY2Nlc3MubG9hZFNjcmlwdChtZS5oaWdobGlnaHRKc1BhdGgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgRG9tQWNjZXNzLmFkZFNjcmlwdCh7c3JjOiBtZS5oaWdobGlnaHRKc0xpbmVOdW1iZXJzUGF0aH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBTdHlsZXNoZWV0LmNyZWF0ZVN0eWxlU2hlZXQobnVsbCwgJ2hsanMtdGhlbWUnLCBtZS50aGVtZVBhdGgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS50ZXh0XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEudm5vZGVJZFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgc2Nyb2xsSW50b1ZpZXcoZGF0YSkge1xuICAgICAgICBsZXQgcGFyZW50RWwgPSBEb21BY2Nlc3MuZ2V0RWxlbWVudChkYXRhLnZub2RlSWQpLFxuICAgICAgICAgICAgZWwgICAgICAgPSBwYXJlbnRFbC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1saXN0LWhlYWRlcj1cIicgKyBkYXRhLnRleHQgKyAnXCJdJyk7XG5cbiAgICAgICAgaWYgKGVsKSB7XG4gICAgICAgICAgICBlbC5wcmV2aW91c1NpYmxpbmcuc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICAgICAgICAgICAgICBibG9jayAgIDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICBpbmxpbmUgIDogJ25lYXJlc3QnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS52bm9kZUlkXG4gICAgICovXG4gICAgc3ludGF4SGlnaGxpZ2h0KGRhdGEpIHtcbiAgICAgICAgaWYgKGhsanMpIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YS52bm9kZUlkKTtcblxuICAgICAgICAgICAgaGxqcy5oaWdobGlnaHRCbG9jayhub2RlKTtcbiAgICAgICAgICAgIGhsanMubGluZU51bWJlcnNCbG9jayhub2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2hpZ2hsaWdodC5qcyBpcyBub3QgaW5jbHVkZWQgaW5zaWRlIHRoZSBtYWluIHRocmVhZC4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBzeW50YXhIaWdobGlnaHRJbml0KGRhdGEpIHtcbiAgICAgICAgaWYgKGhsanMpIHtcbiAgICAgICAgICAgIGxldCBibG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdwcmUgY29kZTpub3QoLmhsanMpJyk7XG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGJsb2NrcywgaGxqcy5oaWdobGlnaHRCbG9jayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdoaWdobGlnaHQuanMgaXMgbm90IGluY2x1ZGVkIGluc2lkZSB0aGUgbWFpbiB0aHJlYWQuJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGRhdGEuYWRkTGluZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLnZub2RlSWRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZGF0YS5yZW1vdmVMaW5lXG4gICAgICovXG4gICAgc3ludGF4SGlnaGxpZ2h0TGluZShkYXRhKSB7XG4gICAgICAgIGxldCBwYXJlbnRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRhdGEudm5vZGVJZCksXG4gICAgICAgICAgICBjbHMgICAgICA9ICduZW8taGlnaGxpZ2h0ZWQtbGluZScsXG4gICAgICAgICAgICBlbDtcblxuICAgICAgICBpZiAoTmVvLmlzTnVtYmVyKGRhdGEuYWRkTGluZSkpIHtcbiAgICAgICAgICAgIGVsID0gcGFyZW50RWwucXVlcnlTZWxlY3RvcignW2RhdGEtbGluZS1udW1iZXI9XCInICsgZGF0YS5hZGRMaW5lICsgJ1wiXScpO1xuXG4gICAgICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICAgICAgICBlbC5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoY2xzKTtcblxuICAgICAgICAgICAgICAgIGVsLnBhcmVudE5vZGUuc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrICAgOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICBpbmxpbmUgIDogJ25lYXJlc3QnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTmVvLmlzTnVtYmVyKGRhdGEucmVtb3ZlTGluZSkpIHtcbiAgICAgICAgICAgIGVsID0gcGFyZW50RWwucXVlcnlTZWxlY3RvcignW2RhdGEtbGluZS1udW1iZXI9XCInICsgZGF0YS5yZW1vdmVMaW5lICsgJ1wiXScpO1xuXG4gICAgICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICAgICAgICBlbC5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoY2xzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoSGlnaGxpZ2h0SlMpO1xuXG5sZXQgaW5zdGFuY2UgPSBOZW8uY3JlYXRlKEhpZ2hsaWdodEpTKTtcblxuTmVvLmFwcGx5VG9HbG9iYWxOcyhpbnN0YW5jZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3RhbmNlOyIsImltcG9ydCBCYXNlIGZyb20gJy4uLy4uL2NvcmUvQmFzZS5tanMnO1xuXG4vKipcbiAqIExvZ2ljIHRvIHdvcmsgd2l0aCBzdHlsZXNoZWV0cywgZS5nLiBhcHBseSAmIHN3aXRjaCBOZW8gYmFzZWQgdGhlbWVzXG4gKiBtYWluLmFkZG9uLkhpZ2hsaWdodEpTIHJlcXVpcmVzIHRoaXMgZmlsZVxuICogQGNsYXNzIE5lby5tYWluLmFkZG9uLlN0eWxlc2hlZXRcbiAqIEBleHRlbmRzIE5lby5jb3JlLkJhc2VcbiAqIEBzaW5nbGV0b25cbiAqL1xuY2xhc3MgU3R5bGVzaGVldCBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8ubWFpbi5hZGRvbi5TdHlsZXNoZWV0J1xuICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnTmVvLm1haW4uYWRkb24uU3R5bGVzaGVldCcsXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlbW90ZSBtZXRob2QgYWNjZXNzIGZvciBvdGhlciB3b3JrZXJzXG4gICAgICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHJlbW90ZT17YXBwOiBbLy8uLi5dfVxuICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcmVtb3RlOiB7XG4gICAgICAgICAgICAgICAgYXBwOiBbXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVTdHlsZVNoZWV0JyxcbiAgICAgICAgICAgICAgICAgICAgJ2luc2VydENzc1J1bGVzJyxcbiAgICAgICAgICAgICAgICAgICAgJ3N3YXBTdHlsZVNoZWV0J1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHNpbmdsZXRvbj10cnVlXG4gICAgICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzaW5nbGV0b246IHRydWVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBpZiAoTmVvLmNvbmZpZy51c2VGb250QXdlc29tZSkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVTdHlsZVNoZWV0KG51bGwsIG51bGwsIE5lby5jb25maWcuYmFzZVBhdGggKyAnbm9kZV9tb2R1bGVzL0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2Nzcy9hbGwubWluLmNzcycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE5lby5jb25maWcudGhlbWVzLmxlbmd0aCA+IDAgJiYgTmVvLmNvbmZpZy50aGVtZXNbMF0gIT09ICcnKSB7XG4gICAgICAgICAgICB0aGlzLmluc2VydFRoZW1lKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVc2UgZWl0aGVyIG5hbWUgZm9yIGEgbmVvIHRoZW1lIChlLmcuICduZW8tdGhlbWUtZGFyay5jc3MnKSBvciBwYXNzIGEgaHJlZlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbbmFtZV1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2lkXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbaHJlZl1cbiAgICAgKi9cbiAgICBjcmVhdGVTdHlsZVNoZWV0KG5hbWUsIGlkLCBocmVmKSB7XG4gICAgICAgIGlmICghbmFtZSAmJiAhaHJlZikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcmVhdGVTdHlsZVNoZWV0OiB5b3UgbmVlZCB0byBlaXRoZXIgcGFzcyBhIG5hbWUgb3IgYSBocmVmJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpLFxuICAgICAgICAgICAgICB1cmwgID0gaHJlZiA/IGhyZWYgOiBOZW8uY29uZmlnLmNzc1BhdGhcbiAgICAgICAgICAgICAgICAgID8gTmVvLmNvbmZpZy5jc3NQYXRoICsgbmFtZVxuICAgICAgICAgICAgICAgICAgOiBOZW8uY29uZmlnLmJhc2VQYXRoICsgJ2Rpc3QvJyArIE5lby5jb25maWcuZW52aXJvbm1lbnQgKyAnLycgKyBuYW1lO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24obGluaywge1xuICAgICAgICAgICAgaHJlZjogdXJsLFxuICAgICAgICAgICAgcmVsIDogJ3N0eWxlc2hlZXQnLFxuICAgICAgICAgICAgdHlwZTogJ3RleHQvY3NzJ1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgIGxpbmsuaWQgPSBpZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdG9rZW5cbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBoYXNTdHlsZVNoZWV0KHRva2VuKSB7XG4gICAgICAgIGxldCBpICAgPSAwLFxuICAgICAgICAgICAgbGVuID0gZG9jdW1lbnQuc3R5bGVTaGVldHMubGVuZ3RoLFxuICAgICAgICAgICAgc2hlZXQ7XG5cbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgc2hlZXQgPSBkb2N1bWVudC5zdHlsZVNoZWV0c1tpXTtcbiAgICAgICAgICAgIGlmIChzaGVldC5ocmVmICYmIHNoZWV0LmhyZWYuaW5jbHVkZXModG9rZW4pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgaW5zZXJ0Q3NzUnVsZXMoZGF0YSkge1xuICAgICAgICBsZXQgc3R5bGVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZW9EeW5hbWljU3R5bGVTaGVldCcpLFxuICAgICAgICAgICAgaSAgICAgPSAwLFxuICAgICAgICAgICAgbGVuICAgPSBkYXRhLnJ1bGVzLmxlbmd0aCxcbiAgICAgICAgICAgIHN0eWxlU2hlZXQ7XG5cbiAgICAgICAgaWYgKCFzdHlsZUVsKSB7XG4gICAgICAgICAgICBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgICAgICAgICAgc3R5bGVFbC5pZCA9ICduZW9EeW5hbWljU3R5bGVTaGVldCc7XG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3R5bGVTaGVldCA9IHN0eWxlRWwuc2hlZXQ7XG5cbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgc3R5bGVTaGVldC5pbnNlcnRSdWxlKGRhdGEucnVsZXNbaV0sIHN0eWxlU2hlZXQuY3NzUnVsZXMubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBpbnNlcnRUaGVtZSgpIHtcbiAgICAgICAgbGV0IG1lICAgICA9IHRoaXMsXG4gICAgICAgICAgICB0aGVtZXMgPSBOZW8uY29uZmlnLnRoZW1lcztcblxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhlbWVzKSkge1xuICAgICAgICAgICAgdGhlbWVzID0gW3RoZW1lc107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhlbWVzWzBdKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQodGhlbWVzWzBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChOZW8uY29uZmlnLnVzZUNzczQpIHtcbiAgICAgICAgICAgIG1lLnJlbW92ZVN0eWxlU2hlZXRzKHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlZDogWyduZW8tdGhlbWUtJywgJy1uby1jc3M0LmNzcyddXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHRoZW1lcy5sZW5ndGggPiAwICYmICFtZS5oYXNTdHlsZVNoZWV0KCduZW8tc3RydWN0dXJlLmNzcycpKSB7XG4gICAgICAgICAgICAgICAgbWUuY3JlYXRlU3R5bGVTaGVldCgnbmVvLXN0cnVjdHVyZS5jc3MnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhlbWVzLmZvckVhY2godGhlbWUgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghbWUuaGFzU3R5bGVTaGVldCh0aGVtZSArICcuY3NzJykpIHtcbiAgICAgICAgICAgICAgICAgICAgbWUuY3JlYXRlU3R5bGVTaGVldCh0aGVtZSArICcuY3NzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZS5yZW1vdmVTdHlsZVNoZWV0cyh7XG4gICAgICAgICAgICAgICAgaW5jbHVkZWQ6IFsnbmVvLXN0cnVjdHVyZS5jc3MnXVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1lLnJlbW92ZVN0eWxlU2hlZXRzKHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlZDogWyduZW8tdGhlbWUtJ10sXG4gICAgICAgICAgICAgICAgZXhjbHVkZWQ6IFsnLW5vLWNzczQuY3NzJ11cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhlbWVzLmxlbmd0aCA+IDAgJiYgIW1lLmhhc1N0eWxlU2hlZXQodGhlbWVzWzBdICsgJy1uby1jc3M0LmNzcycpKSB7XG4gICAgICAgICAgICAgICAgbWUuY3JlYXRlU3R5bGVTaGVldCh0aGVtZXNbMF0gKyAnLW5vLWNzczQuY3NzJywgJ25lby10aGVtZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IG9wdHMuaW5jbHVkZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBvcHRzLmV4Y2x1ZGVkXG4gICAgICovXG4gICAgcmVtb3ZlU3R5bGVTaGVldHMob3B0cykge1xuICAgICAgICBsZXQgaSAgICAgICAgPSAwLFxuICAgICAgICAgICAgbGVuICAgICAgPSBkb2N1bWVudC5zdHlsZVNoZWV0cy5sZW5ndGgsXG4gICAgICAgICAgICBpbmNsdWRlZCA9IG9wdHMuaW5jbHVkZWQgfHwgW10sXG4gICAgICAgICAgICBleGNsdWRlZCA9IG9wdHMuaW5jbHVkZWQgfHwgW10sXG4gICAgICAgICAgICBzaGVldCwgcmVtb3ZlU2hlZXQ7XG5cbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgc2hlZXQgPSBkb2N1bWVudC5zdHlsZVNoZWV0c1tpXTtcblxuICAgICAgICAgICAgcmVtb3ZlU2hlZXQgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoc2hlZXQuaHJlZikge1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVkLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGVldC5ocmVmLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVTaGVldCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVtb3ZlU2hlZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZWQuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2hlZXQuaHJlZi5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZVNoZWV0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZW1vdmVTaGVldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlbW92ZVNoZWV0Jywgc2hlZXQuaHJlZik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGVldC5vd25lck5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzaGVldC5vd25lck5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmhyZWZcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqL1xuICAgIHN3YXBTdHlsZVNoZWV0KGRhdGEpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YS5pZCkuc2V0QXR0cmlidXRlKCdocmVmJywgZGF0YS5ocmVmKTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKFN0eWxlc2hlZXQpO1xuXG5sZXQgaW5zdGFuY2UgPSBOZW8uY3JlYXRlKFN0eWxlc2hlZXQpO1xuXG5OZW8uYXBwbHlUb0dsb2JhbE5zKGluc3RhbmNlKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7Il0sInNvdXJjZVJvb3QiOiIifQ==