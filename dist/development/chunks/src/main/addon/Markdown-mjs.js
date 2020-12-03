(self["webpackChunkneo_mjs_realworld_example_app"] = self["webpackChunkneo_mjs_realworld_example_app"] || []).push([["src/main/addon/Markdown-mjs"],{

/***/ "./node_modules/neo.mjs/src/main/addon/Markdown.mjs":
/*!**********************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/addon/Markdown.mjs ***!
  \**********************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");
/* harmony import */ var _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DomAccess.mjs */ "./node_modules/neo.mjs/src/main/DomAccess.mjs");



/**
 * A markdown mixin to convert markdown to html by using showdown.js
 * https://github.com/showdownjs/showdown
 * script tag with the markdown lib has to be added before the Main.mjs script tag in the index.html
 * <script src="https://cdn.jsdelivr.net/npm/showdown@1.9.1/dist/showdown.min.js"></script>
 * @class Neo.main.addon.Markdown
 * @extends Neo.core.Base
 * @singleton
 */
class Markdown extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.addon.Markdown'
         * @protected
         */
        className: 'Neo.main.addon.Markdown',
        /**
         * Remote method access for other workers
         * @member {Object} remote={app: [//...]}
         * @protected
         */
        remote: {
            app: [
                'markdownToHtml'
            ]
        },
        /**
         * @member {String} showdownPath='https://cdn.jsdelivr.net/npm/showdown@1.9.1/dist/showdown.min.js'
         * @protected
         */
        showdownPath: 'https://cdn.jsdelivr.net/npm/showdown@1.9.1/dist/showdown.min.js',
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
        _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__.default.addScript({src: this.showdownPath});
    }

    /**
     * Markdown to HTML converter
     * @param {String} markdown string to convert
     * @protected
     */
    markdownToHtml(markdown) {
        let converter = new showdown.Converter();

        return converter.makeHtml(markdown);
    }
}

Neo.applyClassConfig(Markdown);

let instance = Neo.create(Markdown);

Neo.applyToGlobalNs(instance);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (instance);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9tYWluL2FkZG9uL01hcmtkb3duLm1qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTRDO0FBQ0g7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixtREFBSTtBQUMzQix3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU8sU0FBUztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNkRBQW1CLEVBQUUsdUJBQXVCO0FBQ3BEOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLGlFQUFlLFFBQVEsRSIsImZpbGUiOiJjaHVua3Mvc3JjL21haW4vYWRkb24vTWFya2Rvd24tbWpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2UgICAgICBmcm9tICcuLi8uLi9jb3JlL0Jhc2UubWpzJztcbmltcG9ydCBEb21BY2Nlc3MgZnJvbSAnLi4vRG9tQWNjZXNzLm1qcyc7XG5cbi8qKlxuICogQSBtYXJrZG93biBtaXhpbiB0byBjb252ZXJ0IG1hcmtkb3duIHRvIGh0bWwgYnkgdXNpbmcgc2hvd2Rvd24uanNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zaG93ZG93bmpzL3Nob3dkb3duXG4gKiBzY3JpcHQgdGFnIHdpdGggdGhlIG1hcmtkb3duIGxpYiBoYXMgdG8gYmUgYWRkZWQgYmVmb3JlIHRoZSBNYWluLm1qcyBzY3JpcHQgdGFnIGluIHRoZSBpbmRleC5odG1sXG4gKiA8c2NyaXB0IHNyYz1cImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vc2hvd2Rvd25AMS45LjEvZGlzdC9zaG93ZG93bi5taW4uanNcIj48L3NjcmlwdD5cbiAqIEBjbGFzcyBOZW8ubWFpbi5hZGRvbi5NYXJrZG93blxuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICogQHNpbmdsZXRvblxuICovXG5jbGFzcyBNYXJrZG93biBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8ubWFpbi5hZGRvbi5NYXJrZG93bidcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLm1haW4uYWRkb24uTWFya2Rvd24nLFxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3RlIG1ldGhvZCBhY2Nlc3MgZm9yIG90aGVyIHdvcmtlcnNcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSByZW1vdGU9e2FwcDogWy8vLi4uXX1cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3RlOiB7XG4gICAgICAgICAgICBhcHA6IFtcbiAgICAgICAgICAgICAgICAnbWFya2Rvd25Ub0h0bWwnXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IHNob3dkb3duUGF0aD0naHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9zaG93ZG93bkAxLjkuMS9kaXN0L3Nob3dkb3duLm1pbi5qcydcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc2hvd2Rvd25QYXRoOiAnaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9zaG93ZG93bkAxLjkuMS9kaXN0L3Nob3dkb3duLm1pbi5qcycsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBzaW5nbGV0b249dHJ1ZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBzaW5nbGV0b246IHRydWVcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuICAgICAgICBEb21BY2Nlc3MuYWRkU2NyaXB0KHtzcmM6IHRoaXMuc2hvd2Rvd25QYXRofSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFya2Rvd24gdG8gSFRNTCBjb252ZXJ0ZXJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWFya2Rvd24gc3RyaW5nIHRvIGNvbnZlcnRcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgbWFya2Rvd25Ub0h0bWwobWFya2Rvd24pIHtcbiAgICAgICAgbGV0IGNvbnZlcnRlciA9IG5ldyBzaG93ZG93bi5Db252ZXJ0ZXIoKTtcblxuICAgICAgICByZXR1cm4gY29udmVydGVyLm1ha2VIdG1sKG1hcmtkb3duKTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKE1hcmtkb3duKTtcblxubGV0IGluc3RhbmNlID0gTmVvLmNyZWF0ZShNYXJrZG93bik7XG5cbk5lby5hcHBseVRvR2xvYmFsTnMoaW5zdGFuY2UpO1xuXG5leHBvcnQgZGVmYXVsdCBpbnN0YW5jZTsiXSwic291cmNlUm9vdCI6IiJ9