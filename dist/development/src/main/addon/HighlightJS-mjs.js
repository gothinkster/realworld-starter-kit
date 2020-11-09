(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src/main/addon/HighlightJS-mjs"],{

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
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.addon.HighlightJS'
         * @protected
         */
        className: 'Neo.main.addon.HighlightJS',
        /**
         * @member {String} highlightJsPath='./resources/highlight/highlight.pack.js'
         * @protected
         */
        highlightJsPath: './resources/highlight/highlight.pack.js',
        /**
         * @member {String} highlightJsLineNumbersPath=Neo.config.basePath + 'node_modules/highlightjs-line-numbers.js/dist/highlightjs-line-numbers.min.js'
         * @protected
         */
        highlightJsLineNumbersPath: Neo.config.basePath + 'node_modules/highlightjs-line-numbers.js/dist/highlightjs-line-numbers.min.js',
        /**
         * Remote method access for other workers
         * @member {Object} remote={app: [//...]}
         * @protected
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
         * @protected
         */
        singleton: true,
        /**
         * @member {String} themePath='./resources/highlightjs-custom-github-theme.css'
         * @protected
         */
        themePath: './resources/highlightjs-custom-github-theme.css'
    }}

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
     * @protected
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
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.addon.Stylesheet'
         * @protected
         */
        className: 'Neo.main.addon.Stylesheet',
        /**
         * Remote method access for other workers
         * @member {Object} remote={app: [//...]}
         * @protected
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
         * @protected
         */
        singleton: true
    }}

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
              env  = Neo.config.environment,
              path = env.startsWith('dist/') ? env : ('dist/' + env),
              url  = href ? href : Neo.config.cssPath
                  ? Neo.config.cssPath + name
                  : Neo.config.basePath + path + '/' + name;

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
     * @protected
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
     * @protected
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

        if (Neo.config.useCssVars) {
            me.removeStyleSheets({
                included: ['neo-theme-', '-no-css-vars.css']
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
                excluded: ['-no-css-vars.css']
            });

            if (themes.length > 0 && !me.hasStyleSheet(themes[0] + '-no-css-vars.css')) {
                me.createStyleSheet(themes[0] + '-no-css-vars.css', 'neo-theme');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9hZGRvbi9IaWdobGlnaHRKUy5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL21haW4vYWRkb24vU3R5bGVzaGVldC5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTZDO0FBQ0g7QUFDRDs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHNEQUFJO0FBQzlCLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU8sU0FBUztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxRQUFRLHNEQUFTO0FBQ2pCLFlBQVksc0RBQVMsWUFBWSxtQ0FBbUM7QUFDcEUsU0FBUzs7QUFFVCxRQUFRLHVEQUFVO0FBQ2xCOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0RBQVM7QUFDaEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVlLHVFQUFRLEU7Ozs7Ozs7Ozs7OztBQzlKdkI7QUFBQTtBQUF1Qzs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsc0RBQUk7QUFDN0Isd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPLFNBQVM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsU0FBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsU0FBUztBQUN4QixlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYyxTQUFTO0FBQ3ZCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRWUsdUVBQVEsRSIsImZpbGUiOiJzcmMvbWFpbi9hZGRvbi9IaWdobGlnaHRKUy1tanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSAgICAgICBmcm9tICcuLi8uLi9jb3JlL0Jhc2UubWpzJztcbmltcG9ydCBEb21BY2Nlc3MgIGZyb20gJy4uL0RvbUFjY2Vzcy5tanMnO1xuaW1wb3J0IFN0eWxlc2hlZXQgZnJvbSAnLi9TdHlsZXNoZWV0Lm1qcydcblxuLyoqXG4gKiBSZXF1aXJlZCBmb3IgdGhlIGRvY3MgYXBwIHdoaWNoIHVzZXMgaGlnaGxpZ2h0LmpzIGZvciB0aGUgc291cmNlIHZpZXdzXG4gKiBAY2xhc3MgTmVvLm1haW4uYWRkb24uSGlnaGxpZ2h0SlNcbiAqIEBleHRlbmRzIE5lby5jb3JlLkJhc2VcbiAqIEBzaW5nbGV0b25cbiAqL1xuY2xhc3MgSGlnaGxpZ2h0SlMgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLm1haW4uYWRkb24uSGlnaGxpZ2h0SlMnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5tYWluLmFkZG9uLkhpZ2hsaWdodEpTJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gaGlnaGxpZ2h0SnNQYXRoPScuL3Jlc291cmNlcy9oaWdobGlnaHQvaGlnaGxpZ2h0LnBhY2suanMnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGhpZ2hsaWdodEpzUGF0aDogJy4vcmVzb3VyY2VzL2hpZ2hsaWdodC9oaWdobGlnaHQucGFjay5qcycsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGhpZ2hsaWdodEpzTGluZU51bWJlcnNQYXRoPU5lby5jb25maWcuYmFzZVBhdGggKyAnbm9kZV9tb2R1bGVzL2hpZ2hsaWdodGpzLWxpbmUtbnVtYmVycy5qcy9kaXN0L2hpZ2hsaWdodGpzLWxpbmUtbnVtYmVycy5taW4uanMnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGhpZ2hsaWdodEpzTGluZU51bWJlcnNQYXRoOiBOZW8uY29uZmlnLmJhc2VQYXRoICsgJ25vZGVfbW9kdWxlcy9oaWdobGlnaHRqcy1saW5lLW51bWJlcnMuanMvZGlzdC9oaWdobGlnaHRqcy1saW5lLW51bWJlcnMubWluLmpzJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW90ZSBtZXRob2QgYWNjZXNzIGZvciBvdGhlciB3b3JrZXJzXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gcmVtb3RlPXthcHA6IFsvLy4uLl19XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHJlbW90ZToge1xuICAgICAgICAgICAgYXBwOiBbXG4gICAgICAgICAgICAgICAgJ3Njcm9sbEludG9WaWV3JyxcbiAgICAgICAgICAgICAgICAnc3ludGF4SGlnaGxpZ2h0JyxcbiAgICAgICAgICAgICAgICAnc3ludGF4SGlnaGxpZ2h0SW5pdCcsXG4gICAgICAgICAgICAgICAgJ3N5bnRheEhpZ2hsaWdodExpbmUnXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBzaW5nbGV0b249dHJ1ZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBzaW5nbGV0b246IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IHRoZW1lUGF0aD0nLi9yZXNvdXJjZXMvaGlnaGxpZ2h0anMtY3VzdG9tLWdpdGh1Yi10aGVtZS5jc3MnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHRoZW1lUGF0aDogJy4vcmVzb3VyY2VzL2hpZ2hsaWdodGpzLWN1c3RvbS1naXRodWItdGhlbWUuY3NzJ1xuICAgIH19XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBEb21BY2Nlc3MubG9hZFNjcmlwdChtZS5oaWdobGlnaHRKc1BhdGgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgRG9tQWNjZXNzLmFkZFNjcmlwdCh7c3JjOiBtZS5oaWdobGlnaHRKc0xpbmVOdW1iZXJzUGF0aH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBTdHlsZXNoZWV0LmNyZWF0ZVN0eWxlU2hlZXQobnVsbCwgJ2hsanMtdGhlbWUnLCBtZS50aGVtZVBhdGgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS50ZXh0XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEudm5vZGVJZFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBzY3JvbGxJbnRvVmlldyhkYXRhKSB7XG4gICAgICAgIGxldCBwYXJlbnRFbCA9IERvbUFjY2Vzcy5nZXRFbGVtZW50KGRhdGEudm5vZGVJZCksXG4gICAgICAgICAgICBlbCAgICAgICA9IHBhcmVudEVsLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWxpc3QtaGVhZGVyPVwiJyArIGRhdGEudGV4dCArICdcIl0nKTtcblxuICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICAgIGVsLnByZXZpb3VzU2libGluZy5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnLFxuICAgICAgICAgICAgICAgIGJsb2NrICAgOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgIGlubGluZSAgOiAnbmVhcmVzdCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLnZub2RlSWRcbiAgICAgKi9cbiAgICBzeW50YXhIaWdobGlnaHQoZGF0YSkge1xuICAgICAgICBpZiAoaGxqcykge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhLnZub2RlSWQpO1xuXG4gICAgICAgICAgICBobGpzLmhpZ2hsaWdodEJsb2NrKG5vZGUpO1xuICAgICAgICAgICAgaGxqcy5saW5lTnVtYmVyc0Jsb2NrKG5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignaGlnaGxpZ2h0LmpzIGlzIG5vdCBpbmNsdWRlZCBpbnNpZGUgdGhlIG1haW4gdGhyZWFkLicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIHN5bnRheEhpZ2hsaWdodEluaXQoZGF0YSkge1xuICAgICAgICBpZiAoaGxqcykge1xuICAgICAgICAgICAgbGV0IGJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3ByZSBjb2RlOm5vdCguaGxqcyknKTtcbiAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYmxvY2tzLCBobGpzLmhpZ2hsaWdodEJsb2NrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2hpZ2hsaWdodC5qcyBpcyBub3QgaW5jbHVkZWQgaW5zaWRlIHRoZSBtYWluIHRocmVhZC4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZGF0YS5hZGRMaW5lXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEudm5vZGVJZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkYXRhLnJlbW92ZUxpbmVcbiAgICAgKi9cbiAgICBzeW50YXhIaWdobGlnaHRMaW5lKGRhdGEpIHtcbiAgICAgICAgbGV0IHBhcmVudEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YS52bm9kZUlkKSxcbiAgICAgICAgICAgIGNscyAgICAgID0gJ25lby1oaWdobGlnaHRlZC1saW5lJyxcbiAgICAgICAgICAgIGVsO1xuXG4gICAgICAgIGlmIChOZW8uaXNOdW1iZXIoZGF0YS5hZGRMaW5lKSkge1xuICAgICAgICAgICAgZWwgPSBwYXJlbnRFbC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1saW5lLW51bWJlcj1cIicgKyBkYXRhLmFkZExpbmUgKyAnXCJdJyk7XG5cbiAgICAgICAgICAgIGlmIChlbCkge1xuICAgICAgICAgICAgICAgIGVsLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZChjbHMpO1xuXG4gICAgICAgICAgICAgICAgZWwucGFyZW50Tm9kZS5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgYmxvY2sgICA6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIGlubGluZSAgOiAnbmVhcmVzdCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChOZW8uaXNOdW1iZXIoZGF0YS5yZW1vdmVMaW5lKSkge1xuICAgICAgICAgICAgZWwgPSBwYXJlbnRFbC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1saW5lLW51bWJlcj1cIicgKyBkYXRhLnJlbW92ZUxpbmUgKyAnXCJdJyk7XG5cbiAgICAgICAgICAgIGlmIChlbCkge1xuICAgICAgICAgICAgICAgIGVsLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZShjbHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhIaWdobGlnaHRKUyk7XG5cbmxldCBpbnN0YW5jZSA9IE5lby5jcmVhdGUoSGlnaGxpZ2h0SlMpO1xuXG5OZW8uYXBwbHlUb0dsb2JhbE5zKGluc3RhbmNlKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7IiwiaW1wb3J0IEJhc2UgZnJvbSAnLi4vLi4vY29yZS9CYXNlLm1qcyc7XG5cbi8qKlxuICogTG9naWMgdG8gd29yayB3aXRoIHN0eWxlc2hlZXRzLCBlLmcuIGFwcGx5ICYgc3dpdGNoIE5lbyBiYXNlZCB0aGVtZXNcbiAqIG1haW4uYWRkb24uSGlnaGxpZ2h0SlMgcmVxdWlyZXMgdGhpcyBmaWxlXG4gKiBAY2xhc3MgTmVvLm1haW4uYWRkb24uU3R5bGVzaGVldFxuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICogQHNpbmdsZXRvblxuICovXG5jbGFzcyBTdHlsZXNoZWV0IGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5tYWluLmFkZG9uLlN0eWxlc2hlZXQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5tYWluLmFkZG9uLlN0eWxlc2hlZXQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3RlIG1ldGhvZCBhY2Nlc3MgZm9yIG90aGVyIHdvcmtlcnNcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSByZW1vdGU9e2FwcDogWy8vLi4uXX1cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3RlOiB7XG4gICAgICAgICAgICBhcHA6IFtcbiAgICAgICAgICAgICAgICAnY3JlYXRlU3R5bGVTaGVldCcsXG4gICAgICAgICAgICAgICAgJ2luc2VydENzc1J1bGVzJyxcbiAgICAgICAgICAgICAgICAnc3dhcFN0eWxlU2hlZXQnXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBzaW5nbGV0b249dHJ1ZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBzaW5nbGV0b246IHRydWVcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIGlmIChOZW8uY29uZmlnLnVzZUZvbnRBd2Vzb21lKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVN0eWxlU2hlZXQobnVsbCwgbnVsbCwgTmVvLmNvbmZpZy5iYXNlUGF0aCArICdub2RlX21vZHVsZXMvQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5taW4uY3NzJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTmVvLmNvbmZpZy50aGVtZXMubGVuZ3RoID4gMCAmJiBOZW8uY29uZmlnLnRoZW1lc1swXSAhPT0gJycpIHtcbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0VGhlbWUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZSBlaXRoZXIgbmFtZSBmb3IgYSBuZW8gdGhlbWUgKGUuZy4gJ25lby10aGVtZS1kYXJrLmNzcycpIG9yIHBhc3MgYSBocmVmXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtuYW1lXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbaWRdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtocmVmXVxuICAgICAqL1xuICAgIGNyZWF0ZVN0eWxlU2hlZXQobmFtZSwgaWQsIGhyZWYpIHtcbiAgICAgICAgaWYgKCFuYW1lICYmICFocmVmKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyZWF0ZVN0eWxlU2hlZXQ6IHlvdSBuZWVkIHRvIGVpdGhlciBwYXNzIGEgbmFtZSBvciBhIGhyZWYnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyksXG4gICAgICAgICAgICAgIGVudiAgPSBOZW8uY29uZmlnLmVudmlyb25tZW50LFxuICAgICAgICAgICAgICBwYXRoID0gZW52LnN0YXJ0c1dpdGgoJ2Rpc3QvJykgPyBlbnYgOiAoJ2Rpc3QvJyArIGVudiksXG4gICAgICAgICAgICAgIHVybCAgPSBocmVmID8gaHJlZiA6IE5lby5jb25maWcuY3NzUGF0aFxuICAgICAgICAgICAgICAgICAgPyBOZW8uY29uZmlnLmNzc1BhdGggKyBuYW1lXG4gICAgICAgICAgICAgICAgICA6IE5lby5jb25maWcuYmFzZVBhdGggKyBwYXRoICsgJy8nICsgbmFtZTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKGxpbmssIHtcbiAgICAgICAgICAgIGhyZWY6IHVybCxcbiAgICAgICAgICAgIHJlbCA6ICdzdHlsZXNoZWV0JyxcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0L2NzcydcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICBsaW5rLmlkID0gaWQ7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRva2VuXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgaGFzU3R5bGVTaGVldCh0b2tlbikge1xuICAgICAgICBsZXQgaSAgID0gMCxcbiAgICAgICAgICAgIGxlbiA9IGRvY3VtZW50LnN0eWxlU2hlZXRzLmxlbmd0aCxcbiAgICAgICAgICAgIHNoZWV0O1xuXG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHNoZWV0ID0gZG9jdW1lbnQuc3R5bGVTaGVldHNbaV07XG4gICAgICAgICAgICBpZiAoc2hlZXQuaHJlZiAmJiBzaGVldC5ocmVmLmluY2x1ZGVzKHRva2VuKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgaW5zZXJ0Q3NzUnVsZXMoZGF0YSkge1xuICAgICAgICBsZXQgc3R5bGVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZW9EeW5hbWljU3R5bGVTaGVldCcpLFxuICAgICAgICAgICAgaSAgICAgPSAwLFxuICAgICAgICAgICAgbGVuICAgPSBkYXRhLnJ1bGVzLmxlbmd0aCxcbiAgICAgICAgICAgIHN0eWxlU2hlZXQ7XG5cbiAgICAgICAgaWYgKCFzdHlsZUVsKSB7XG4gICAgICAgICAgICBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgICAgICAgICAgc3R5bGVFbC5pZCA9ICduZW9EeW5hbWljU3R5bGVTaGVldCc7XG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3R5bGVTaGVldCA9IHN0eWxlRWwuc2hlZXQ7XG5cbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgc3R5bGVTaGVldC5pbnNlcnRSdWxlKGRhdGEucnVsZXNbaV0sIHN0eWxlU2hlZXQuY3NzUnVsZXMubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGluc2VydFRoZW1lKCkge1xuICAgICAgICBsZXQgbWUgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHRoZW1lcyA9IE5lby5jb25maWcudGhlbWVzO1xuXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGVtZXMpKSB7XG4gICAgICAgICAgICB0aGVtZXMgPSBbdGhlbWVzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGVtZXNbMF0pIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCh0aGVtZXNbMF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE5lby5jb25maWcudXNlQ3NzVmFycykge1xuICAgICAgICAgICAgbWUucmVtb3ZlU3R5bGVTaGVldHMoe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVkOiBbJ25lby10aGVtZS0nLCAnLW5vLWNzcy12YXJzLmNzcyddXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHRoZW1lcy5sZW5ndGggPiAwICYmICFtZS5oYXNTdHlsZVNoZWV0KCduZW8tc3RydWN0dXJlLmNzcycpKSB7XG4gICAgICAgICAgICAgICAgbWUuY3JlYXRlU3R5bGVTaGVldCgnbmVvLXN0cnVjdHVyZS5jc3MnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhlbWVzLmZvckVhY2godGhlbWUgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghbWUuaGFzU3R5bGVTaGVldCh0aGVtZSArICcuY3NzJykpIHtcbiAgICAgICAgICAgICAgICAgICAgbWUuY3JlYXRlU3R5bGVTaGVldCh0aGVtZSArICcuY3NzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZS5yZW1vdmVTdHlsZVNoZWV0cyh7XG4gICAgICAgICAgICAgICAgaW5jbHVkZWQ6IFsnbmVvLXN0cnVjdHVyZS5jc3MnXVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1lLnJlbW92ZVN0eWxlU2hlZXRzKHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlZDogWyduZW8tdGhlbWUtJ10sXG4gICAgICAgICAgICAgICAgZXhjbHVkZWQ6IFsnLW5vLWNzcy12YXJzLmNzcyddXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHRoZW1lcy5sZW5ndGggPiAwICYmICFtZS5oYXNTdHlsZVNoZWV0KHRoZW1lc1swXSArICctbm8tY3NzLXZhcnMuY3NzJykpIHtcbiAgICAgICAgICAgICAgICBtZS5jcmVhdGVTdHlsZVNoZWV0KHRoZW1lc1swXSArICctbm8tY3NzLXZhcnMuY3NzJywgJ25lby10aGVtZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IG9wdHMuaW5jbHVkZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBvcHRzLmV4Y2x1ZGVkXG4gICAgICovXG4gICAgcmVtb3ZlU3R5bGVTaGVldHMob3B0cykge1xuICAgICAgICBsZXQgaSAgICAgICAgPSAwLFxuICAgICAgICAgICAgbGVuICAgICAgPSBkb2N1bWVudC5zdHlsZVNoZWV0cy5sZW5ndGgsXG4gICAgICAgICAgICBpbmNsdWRlZCA9IG9wdHMuaW5jbHVkZWQgfHwgW10sXG4gICAgICAgICAgICBleGNsdWRlZCA9IG9wdHMuaW5jbHVkZWQgfHwgW10sXG4gICAgICAgICAgICBzaGVldCwgcmVtb3ZlU2hlZXQ7XG5cbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgc2hlZXQgPSBkb2N1bWVudC5zdHlsZVNoZWV0c1tpXTtcblxuICAgICAgICAgICAgcmVtb3ZlU2hlZXQgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoc2hlZXQuaHJlZikge1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVkLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGVldC5ocmVmLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVTaGVldCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVtb3ZlU2hlZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZWQuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2hlZXQuaHJlZi5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZVNoZWV0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZW1vdmVTaGVldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlbW92ZVNoZWV0Jywgc2hlZXQuaHJlZik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGVldC5vd25lck5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzaGVldC5vd25lck5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmhyZWZcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqL1xuICAgIHN3YXBTdHlsZVNoZWV0KGRhdGEpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YS5pZCkuc2V0QXR0cmlidXRlKCdocmVmJywgZGF0YS5ocmVmKTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKFN0eWxlc2hlZXQpO1xuXG5sZXQgaW5zdGFuY2UgPSBOZW8uY3JlYXRlKFN0eWxlc2hlZXQpO1xuXG5OZW8uYXBwbHlUb0dsb2JhbE5zKGluc3RhbmNlKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7Il0sInNvdXJjZVJvb3QiOiIifQ==