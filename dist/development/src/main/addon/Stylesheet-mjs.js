(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src/main/addon/Stylesheet-mjs"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9hZGRvbi9TdHlsZXNoZWV0Lm1qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUF1Qzs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsc0RBQUk7QUFDN0I7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPLFNBQVM7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsY0FBYyxTQUFTO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLFNBQVM7QUFDeEIsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsU0FBUztBQUN2Qjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVlLHVFQUFRLEUiLCJmaWxlIjoic3JjL21haW4vYWRkb24vU3R5bGVzaGVldC1tanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tICcuLi8uLi9jb3JlL0Jhc2UubWpzJztcblxuLyoqXG4gKiBMb2dpYyB0byB3b3JrIHdpdGggc3R5bGVzaGVldHMsIGUuZy4gYXBwbHkgJiBzd2l0Y2ggTmVvIGJhc2VkIHRoZW1lc1xuICogbWFpbi5hZGRvbi5IaWdobGlnaHRKUyByZXF1aXJlcyB0aGlzIGZpbGVcbiAqIEBjbGFzcyBOZW8ubWFpbi5hZGRvbi5TdHlsZXNoZWV0XG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKiBAc2luZ2xldG9uXG4gKi9cbmNsYXNzIFN0eWxlc2hlZXQgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLm1haW4uYWRkb24uU3R5bGVzaGVldCdcbiAgICAgICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnTmVvLm1haW4uYWRkb24uU3R5bGVzaGVldCcsXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlbW90ZSBtZXRob2QgYWNjZXNzIGZvciBvdGhlciB3b3JrZXJzXG4gICAgICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHJlbW90ZT17YXBwOiBbLy8uLi5dfVxuICAgICAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByZW1vdGU6IHtcbiAgICAgICAgICAgICAgICBhcHA6IFtcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZVN0eWxlU2hlZXQnLFxuICAgICAgICAgICAgICAgICAgICAnaW5zZXJ0Q3NzUnVsZXMnLFxuICAgICAgICAgICAgICAgICAgICAnc3dhcFN0eWxlU2hlZXQnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc2luZ2xldG9uPXRydWVcbiAgICAgICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc2luZ2xldG9uOiB0cnVlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgaWYgKE5lby5jb25maWcudXNlRm9udEF3ZXNvbWUpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU3R5bGVTaGVldChudWxsLCBudWxsLCBOZW8uY29uZmlnLmJhc2VQYXRoICsgJ25vZGVfbW9kdWxlcy9AZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLm1pbi5jc3MnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChOZW8uY29uZmlnLnRoZW1lcy5sZW5ndGggPiAwICYmIE5lby5jb25maWcudGhlbWVzWzBdICE9PSAnJykge1xuICAgICAgICAgICAgdGhpcy5pbnNlcnRUaGVtZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXNlIGVpdGhlciBuYW1lIGZvciBhIG5lbyB0aGVtZSAoZS5nLiAnbmVvLXRoZW1lLWRhcmsuY3NzJykgb3IgcGFzcyBhIGhyZWZcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW25hbWVdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtpZF1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2hyZWZdXG4gICAgICovXG4gICAgY3JlYXRlU3R5bGVTaGVldChuYW1lLCBpZCwgaHJlZikge1xuICAgICAgICBpZiAoIW5hbWUgJiYgIWhyZWYpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY3JlYXRlU3R5bGVTaGVldDogeW91IG5lZWQgdG8gZWl0aGVyIHBhc3MgYSBuYW1lIG9yIGEgaHJlZicpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKSxcbiAgICAgICAgICAgICAgdXJsICA9IGhyZWYgPyBocmVmIDogTmVvLmNvbmZpZy5jc3NQYXRoXG4gICAgICAgICAgICAgICAgICA/IE5lby5jb25maWcuY3NzUGF0aCArIG5hbWVcbiAgICAgICAgICAgICAgICAgIDogTmVvLmNvbmZpZy5iYXNlUGF0aCArICdkaXN0LycgKyBOZW8uY29uZmlnLmVudmlyb25tZW50ICsgJy8nICsgbmFtZTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKGxpbmssIHtcbiAgICAgICAgICAgIGhyZWY6IHVybCxcbiAgICAgICAgICAgIHJlbCA6ICdzdHlsZXNoZWV0JyxcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0L2NzcydcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICBsaW5rLmlkID0gaWQ7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRva2VuXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgaGFzU3R5bGVTaGVldCh0b2tlbikge1xuICAgICAgICBsZXQgaSAgID0gMCxcbiAgICAgICAgICAgIGxlbiA9IGRvY3VtZW50LnN0eWxlU2hlZXRzLmxlbmd0aCxcbiAgICAgICAgICAgIHNoZWV0O1xuXG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHNoZWV0ID0gZG9jdW1lbnQuc3R5bGVTaGVldHNbaV07XG4gICAgICAgICAgICBpZiAoc2hlZXQuaHJlZiAmJiBzaGVldC5ocmVmLmluY2x1ZGVzKHRva2VuKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgaW5zZXJ0Q3NzUnVsZXMoZGF0YSkge1xuICAgICAgICBsZXQgc3R5bGVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZW9EeW5hbWljU3R5bGVTaGVldCcpLFxuICAgICAgICAgICAgaSAgICAgPSAwLFxuICAgICAgICAgICAgbGVuICAgPSBkYXRhLnJ1bGVzLmxlbmd0aCxcbiAgICAgICAgICAgIHN0eWxlU2hlZXQ7XG5cbiAgICAgICAgaWYgKCFzdHlsZUVsKSB7XG4gICAgICAgICAgICBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgICAgICAgICAgc3R5bGVFbC5pZCA9ICduZW9EeW5hbWljU3R5bGVTaGVldCc7XG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3R5bGVTaGVldCA9IHN0eWxlRWwuc2hlZXQ7XG5cbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgc3R5bGVTaGVldC5pbnNlcnRSdWxlKGRhdGEucnVsZXNbaV0sIHN0eWxlU2hlZXQuY3NzUnVsZXMubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGluc2VydFRoZW1lKCkge1xuICAgICAgICBsZXQgbWUgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHRoZW1lcyA9IE5lby5jb25maWcudGhlbWVzO1xuXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGVtZXMpKSB7XG4gICAgICAgICAgICB0aGVtZXMgPSBbdGhlbWVzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGVtZXNbMF0pIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCh0aGVtZXNbMF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE5lby5jb25maWcudXNlQ3NzNCkge1xuICAgICAgICAgICAgbWUucmVtb3ZlU3R5bGVTaGVldHMoe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVkOiBbJ25lby10aGVtZS0nLCAnLW5vLWNzczQuY3NzJ11cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhlbWVzLmxlbmd0aCA+IDAgJiYgIW1lLmhhc1N0eWxlU2hlZXQoJ25lby1zdHJ1Y3R1cmUuY3NzJykpIHtcbiAgICAgICAgICAgICAgICBtZS5jcmVhdGVTdHlsZVNoZWV0KCduZW8tc3RydWN0dXJlLmNzcycpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGVtZXMuZm9yRWFjaCh0aGVtZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFtZS5oYXNTdHlsZVNoZWV0KHRoZW1lICsgJy5jc3MnKSkge1xuICAgICAgICAgICAgICAgICAgICBtZS5jcmVhdGVTdHlsZVNoZWV0KHRoZW1lICsgJy5jc3MnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lLnJlbW92ZVN0eWxlU2hlZXRzKHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlZDogWyduZW8tc3RydWN0dXJlLmNzcyddXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWUucmVtb3ZlU3R5bGVTaGVldHMoe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVkOiBbJ25lby10aGVtZS0nXSxcbiAgICAgICAgICAgICAgICBleGNsdWRlZDogWyctbm8tY3NzNC5jc3MnXVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh0aGVtZXMubGVuZ3RoID4gMCAmJiAhbWUuaGFzU3R5bGVTaGVldCh0aGVtZXNbMF0gKyAnLW5vLWNzczQuY3NzJykpIHtcbiAgICAgICAgICAgICAgICBtZS5jcmVhdGVTdHlsZVNoZWV0KHRoZW1lc1swXSArICctbm8tY3NzNC5jc3MnLCAnbmVvLXRoZW1lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICogQHBhcmFtIHtTdHJpbmdbXX0gb3B0cy5pbmNsdWRlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IG9wdHMuZXhjbHVkZWRcbiAgICAgKi9cbiAgICByZW1vdmVTdHlsZVNoZWV0cyhvcHRzKSB7XG4gICAgICAgIGxldCBpICAgICAgICA9IDAsXG4gICAgICAgICAgICBsZW4gICAgICA9IGRvY3VtZW50LnN0eWxlU2hlZXRzLmxlbmd0aCxcbiAgICAgICAgICAgIGluY2x1ZGVkID0gb3B0cy5pbmNsdWRlZCB8fCBbXSxcbiAgICAgICAgICAgIGV4Y2x1ZGVkID0gb3B0cy5pbmNsdWRlZCB8fCBbXSxcbiAgICAgICAgICAgIHNoZWV0LCByZW1vdmVTaGVldDtcblxuICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBzaGVldCA9IGRvY3VtZW50LnN0eWxlU2hlZXRzW2ldO1xuXG4gICAgICAgICAgICByZW1vdmVTaGVldCA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmIChzaGVldC5ocmVmKSB7XG4gICAgICAgICAgICAgICAgZXhjbHVkZWQuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoZWV0LmhyZWYuaW5jbHVkZXMobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZVNoZWV0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChyZW1vdmVTaGVldCkge1xuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlZC5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzaGVldC5ocmVmLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlU2hlZXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbW92ZVNoZWV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVtb3ZlU2hlZXQnLCBzaGVldC5ocmVmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoZWV0Lm93bmVyTm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNoZWV0Lm93bmVyTm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaHJlZlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICovXG4gICAgc3dhcFN0eWxlU2hlZXQoZGF0YSkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhLmlkKS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBkYXRhLmhyZWYpO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoU3R5bGVzaGVldCk7XG5cbmxldCBpbnN0YW5jZSA9IE5lby5jcmVhdGUoU3R5bGVzaGVldCk7XG5cbk5lby5hcHBseVRvR2xvYmFsTnMoaW5zdGFuY2UpO1xuXG5leHBvcnQgZGVmYXVsdCBpbnN0YW5jZTsiXSwic291cmNlUm9vdCI6IiJ9