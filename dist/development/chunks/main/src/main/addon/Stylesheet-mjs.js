(self["webpackChunkneo_mjs_realworld_example_app"] = self["webpackChunkneo_mjs_realworld_example_app"] || []).push([["src/main/addon/Stylesheet-mjs"],{

/***/ "./node_modules/neo.mjs/src/main/addon/Stylesheet.mjs":
/*!************************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/addon/Stylesheet.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * Logic to work with stylesheets, e.g. apply & switch Neo based themes
 * main.addon.HighlightJS requires this file
 * @class Neo.main.addon.Stylesheet
 * @extends Neo.core.Base
 * @singleton
 */
class Stylesheet extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
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
                'addThemeFiles',
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
            this.addGlobalCss();
            // this.insertTheme();
        }
    }

    /**
     *
     */
    addGlobalCss() {
        let config  = Neo.config,
            themes  = config.themes,
            folders = config.useCssVars ? ['src', ...themes] : [themes[0]],
            env     = config.environment,
            path    = env.startsWith('dist/') ? env : ('dist/' + env);

        document.body.classList.add(themes[0]);

        folders.forEach(folder => {
            if (folder.startsWith('neo-')) {
                folder = folder.substring(4);
            }

            this.createStyleSheet(
                null,
                null,
                `${config.basePath}${path}/css${config.useCssVars ? '' : '-no-vars'}/${folder}/Global.css`
            );
        });
    }

    /**
     * @param {Object} data
     * @param {String} data.className
     * @param {String[]} data.folders
     */
    addThemeFiles(data) {
        let className = data.className,
            config    = Neo.config,
            env       = config.environment,
            path      = env.startsWith('dist/') ? env : ('dist/' + env);

        if (className.startsWith('Neo.')) {
            className = className.substring(4);
        }

        className = className.split('.').join('/');

        data.folders.forEach(folder => {
            if (
                folder === 'src' && config.useCssVars || folder.includes('theme-') && (
                     config.useCssVars && config.themes.includes(`neo-${folder}`) ||
                    !config.useCssVars && config.themes[0] === `neo-${folder}`
                )
            ) {
                this.createStyleSheet(
                    null,
                    null,
                    `${config.basePath}${path}/css${config.useCssVars ? '' : '-no-vars'}/${folder}/${className}.css`
                );
            }
        });
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
              url  = href ? href : Neo.config.basePath + path + '/' + name;

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
     * @param {Array} data.rules
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (instance);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9tYWluL2FkZG9uL1N0eWxlc2hlZXQubWpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQXVDOztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixtREFBSTtBQUM3Qix3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU8sU0FBUztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixnQkFBZ0IsRUFBRSxLQUFLLE1BQU0sb0NBQW9DLEdBQUcsT0FBTztBQUM5RjtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0VBQXdFLE9BQU87QUFDL0Usc0VBQXNFLE9BQU87QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixnQkFBZ0IsRUFBRSxLQUFLLE1BQU0sb0NBQW9DLEdBQUcsT0FBTyxHQUFHLFVBQVU7QUFDL0c7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxNQUFNO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGNBQWMsU0FBUztBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLFNBQVM7QUFDeEIsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsU0FBUztBQUN2Qjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxpRUFBZSxRQUFRLEUiLCJmaWxlIjoiY2h1bmtzL21haW4vc3JjL21haW4vYWRkb24vU3R5bGVzaGVldC1tanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tICcuLi8uLi9jb3JlL0Jhc2UubWpzJztcblxuLyoqXG4gKiBMb2dpYyB0byB3b3JrIHdpdGggc3R5bGVzaGVldHMsIGUuZy4gYXBwbHkgJiBzd2l0Y2ggTmVvIGJhc2VkIHRoZW1lc1xuICogbWFpbi5hZGRvbi5IaWdobGlnaHRKUyByZXF1aXJlcyB0aGlzIGZpbGVcbiAqIEBjbGFzcyBOZW8ubWFpbi5hZGRvbi5TdHlsZXNoZWV0XG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKiBAc2luZ2xldG9uXG4gKi9cbmNsYXNzIFN0eWxlc2hlZXQgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLm1haW4uYWRkb24uU3R5bGVzaGVldCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLm1haW4uYWRkb24uU3R5bGVzaGVldCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdGUgbWV0aG9kIGFjY2VzcyBmb3Igb3RoZXIgd29ya2Vyc1xuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHJlbW90ZT17YXBwOiBbLy8uLi5dfVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICByZW1vdGU6IHtcbiAgICAgICAgICAgIGFwcDogW1xuICAgICAgICAgICAgICAgICdhZGRUaGVtZUZpbGVzJyxcbiAgICAgICAgICAgICAgICAnY3JlYXRlU3R5bGVTaGVldCcsXG4gICAgICAgICAgICAgICAgJ2luc2VydENzc1J1bGVzJyxcbiAgICAgICAgICAgICAgICAnc3dhcFN0eWxlU2hlZXQnXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBzaW5nbGV0b249dHJ1ZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBzaW5nbGV0b246IHRydWVcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIGlmIChOZW8uY29uZmlnLnVzZUZvbnRBd2Vzb21lKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVN0eWxlU2hlZXQobnVsbCwgbnVsbCwgTmVvLmNvbmZpZy5iYXNlUGF0aCArICdub2RlX21vZHVsZXMvQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5taW4uY3NzJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTmVvLmNvbmZpZy50aGVtZXMubGVuZ3RoID4gMCAmJiBOZW8uY29uZmlnLnRoZW1lc1swXSAhPT0gJycpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkR2xvYmFsQ3NzKCk7XG4gICAgICAgICAgICAvLyB0aGlzLmluc2VydFRoZW1lKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGFkZEdsb2JhbENzcygpIHtcbiAgICAgICAgbGV0IGNvbmZpZyAgPSBOZW8uY29uZmlnLFxuICAgICAgICAgICAgdGhlbWVzICA9IGNvbmZpZy50aGVtZXMsXG4gICAgICAgICAgICBmb2xkZXJzID0gY29uZmlnLnVzZUNzc1ZhcnMgPyBbJ3NyYycsIC4uLnRoZW1lc10gOiBbdGhlbWVzWzBdXSxcbiAgICAgICAgICAgIGVudiAgICAgPSBjb25maWcuZW52aXJvbm1lbnQsXG4gICAgICAgICAgICBwYXRoICAgID0gZW52LnN0YXJ0c1dpdGgoJ2Rpc3QvJykgPyBlbnYgOiAoJ2Rpc3QvJyArIGVudik7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKHRoZW1lc1swXSk7XG5cbiAgICAgICAgZm9sZGVycy5mb3JFYWNoKGZvbGRlciA9PiB7XG4gICAgICAgICAgICBpZiAoZm9sZGVyLnN0YXJ0c1dpdGgoJ25lby0nKSkge1xuICAgICAgICAgICAgICAgIGZvbGRlciA9IGZvbGRlci5zdWJzdHJpbmcoNCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU3R5bGVTaGVldChcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgYCR7Y29uZmlnLmJhc2VQYXRofSR7cGF0aH0vY3NzJHtjb25maWcudXNlQ3NzVmFycyA/ICcnIDogJy1uby12YXJzJ30vJHtmb2xkZXJ9L0dsb2JhbC5jc3NgXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmNsYXNzTmFtZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IGRhdGEuZm9sZGVyc1xuICAgICAqL1xuICAgIGFkZFRoZW1lRmlsZXMoZGF0YSkge1xuICAgICAgICBsZXQgY2xhc3NOYW1lID0gZGF0YS5jbGFzc05hbWUsXG4gICAgICAgICAgICBjb25maWcgICAgPSBOZW8uY29uZmlnLFxuICAgICAgICAgICAgZW52ICAgICAgID0gY29uZmlnLmVudmlyb25tZW50LFxuICAgICAgICAgICAgcGF0aCAgICAgID0gZW52LnN0YXJ0c1dpdGgoJ2Rpc3QvJykgPyBlbnYgOiAoJ2Rpc3QvJyArIGVudik7XG5cbiAgICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKCdOZW8uJykpIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZS5zdWJzdHJpbmcoNCk7XG4gICAgICAgIH1cblxuICAgICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUuc3BsaXQoJy4nKS5qb2luKCcvJyk7XG5cbiAgICAgICAgZGF0YS5mb2xkZXJzLmZvckVhY2goZm9sZGVyID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBmb2xkZXIgPT09ICdzcmMnICYmIGNvbmZpZy51c2VDc3NWYXJzIHx8IGZvbGRlci5pbmNsdWRlcygndGhlbWUtJykgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgY29uZmlnLnVzZUNzc1ZhcnMgJiYgY29uZmlnLnRoZW1lcy5pbmNsdWRlcyhgbmVvLSR7Zm9sZGVyfWApIHx8XG4gICAgICAgICAgICAgICAgICAgICFjb25maWcudXNlQ3NzVmFycyAmJiBjb25maWcudGhlbWVzWzBdID09PSBgbmVvLSR7Zm9sZGVyfWBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVN0eWxlU2hlZXQoXG4gICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGAke2NvbmZpZy5iYXNlUGF0aH0ke3BhdGh9L2NzcyR7Y29uZmlnLnVzZUNzc1ZhcnMgPyAnJyA6ICctbm8tdmFycyd9LyR7Zm9sZGVyfS8ke2NsYXNzTmFtZX0uY3NzYFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZSBlaXRoZXIgbmFtZSBmb3IgYSBuZW8gdGhlbWUgKGUuZy4gJ25lby10aGVtZS1kYXJrLmNzcycpIG9yIHBhc3MgYSBocmVmXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtuYW1lXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbaWRdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtocmVmXVxuICAgICAqL1xuICAgIGNyZWF0ZVN0eWxlU2hlZXQobmFtZSwgaWQsIGhyZWYpIHtcbiAgICAgICAgaWYgKCFuYW1lICYmICFocmVmKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyZWF0ZVN0eWxlU2hlZXQ6IHlvdSBuZWVkIHRvIGVpdGhlciBwYXNzIGEgbmFtZSBvciBhIGhyZWYnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyksXG4gICAgICAgICAgICAgIGVudiAgPSBOZW8uY29uZmlnLmVudmlyb25tZW50LFxuICAgICAgICAgICAgICBwYXRoID0gZW52LnN0YXJ0c1dpdGgoJ2Rpc3QvJykgPyBlbnYgOiAoJ2Rpc3QvJyArIGVudiksXG4gICAgICAgICAgICAgIHVybCAgPSBocmVmID8gaHJlZiA6IE5lby5jb25maWcuYmFzZVBhdGggKyBwYXRoICsgJy8nICsgbmFtZTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKGxpbmssIHtcbiAgICAgICAgICAgIGhyZWY6IHVybCxcbiAgICAgICAgICAgIHJlbCA6ICdzdHlsZXNoZWV0JyxcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0L2NzcydcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICBsaW5rLmlkID0gaWQ7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRva2VuXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgaGFzU3R5bGVTaGVldCh0b2tlbikge1xuICAgICAgICBsZXQgaSAgID0gMCxcbiAgICAgICAgICAgIGxlbiA9IGRvY3VtZW50LnN0eWxlU2hlZXRzLmxlbmd0aCxcbiAgICAgICAgICAgIHNoZWV0O1xuXG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHNoZWV0ID0gZG9jdW1lbnQuc3R5bGVTaGVldHNbaV07XG4gICAgICAgICAgICBpZiAoc2hlZXQuaHJlZiAmJiBzaGVldC5ocmVmLmluY2x1ZGVzKHRva2VuKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhLnJ1bGVzXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGluc2VydENzc1J1bGVzKGRhdGEpIHtcbiAgICAgICAgbGV0IHN0eWxlRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmVvRHluYW1pY1N0eWxlU2hlZXQnKSxcbiAgICAgICAgICAgIGkgICAgID0gMCxcbiAgICAgICAgICAgIGxlbiAgID0gZGF0YS5ydWxlcy5sZW5ndGgsXG4gICAgICAgICAgICBzdHlsZVNoZWV0O1xuXG4gICAgICAgIGlmICghc3R5bGVFbCkge1xuICAgICAgICAgICAgc3R5bGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgICAgICAgICAgIHN0eWxlRWwuaWQgPSAnbmVvRHluYW1pY1N0eWxlU2hlZXQnO1xuICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0eWxlU2hlZXQgPSBzdHlsZUVsLnNoZWV0O1xuXG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHN0eWxlU2hlZXQuaW5zZXJ0UnVsZShkYXRhLnJ1bGVzW2ldLCBzdHlsZVNoZWV0LmNzc1J1bGVzLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICogQHBhcmFtIHtTdHJpbmdbXX0gb3B0cy5pbmNsdWRlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IG9wdHMuZXhjbHVkZWRcbiAgICAgKi9cbiAgICByZW1vdmVTdHlsZVNoZWV0cyhvcHRzKSB7XG4gICAgICAgIGxldCBpICAgICAgICA9IDAsXG4gICAgICAgICAgICBsZW4gICAgICA9IGRvY3VtZW50LnN0eWxlU2hlZXRzLmxlbmd0aCxcbiAgICAgICAgICAgIGluY2x1ZGVkID0gb3B0cy5pbmNsdWRlZCB8fCBbXSxcbiAgICAgICAgICAgIGV4Y2x1ZGVkID0gb3B0cy5pbmNsdWRlZCB8fCBbXSxcbiAgICAgICAgICAgIHNoZWV0LCByZW1vdmVTaGVldDtcblxuICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBzaGVldCA9IGRvY3VtZW50LnN0eWxlU2hlZXRzW2ldO1xuXG4gICAgICAgICAgICByZW1vdmVTaGVldCA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmIChzaGVldC5ocmVmKSB7XG4gICAgICAgICAgICAgICAgZXhjbHVkZWQuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoZWV0LmhyZWYuaW5jbHVkZXMobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZVNoZWV0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChyZW1vdmVTaGVldCkge1xuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlZC5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzaGVldC5ocmVmLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlU2hlZXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbW92ZVNoZWV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGVldC5vd25lck5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzaGVldC5vd25lck5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmhyZWZcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqL1xuICAgIHN3YXBTdHlsZVNoZWV0KGRhdGEpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YS5pZCkuc2V0QXR0cmlidXRlKCdocmVmJywgZGF0YS5ocmVmKTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKFN0eWxlc2hlZXQpO1xuXG5sZXQgaW5zdGFuY2UgPSBOZW8uY3JlYXRlKFN0eWxlc2hlZXQpO1xuXG5OZW8uYXBwbHlUb0dsb2JhbE5zKGluc3RhbmNlKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7Il0sInNvdXJjZVJvb3QiOiIifQ==