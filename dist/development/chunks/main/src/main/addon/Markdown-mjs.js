(self["webpackChunkneo_mjs_realworld_example_app"] = self["webpackChunkneo_mjs_realworld_example_app"] || []).push([["src/main/addon/Markdown-mjs"],{

/***/ "./node_modules/neo.mjs/src/main/addon/Markdown.mjs":
/*!**********************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/addon/Markdown.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9tYWluL2FkZG9uL01hcmtkb3duLm1qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBNEM7QUFDSDs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1EQUFJO0FBQzNCLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTyxTQUFTO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0EsUUFBUSw2REFBbUIsRUFBRSx1QkFBdUI7QUFDcEQ7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsaUVBQWUsUUFBUSxFIiwiZmlsZSI6ImNodW5rcy9tYWluL3NyYy9tYWluL2FkZG9uL01hcmtkb3duLW1qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlICAgICAgZnJvbSAnLi4vLi4vY29yZS9CYXNlLm1qcyc7XG5pbXBvcnQgRG9tQWNjZXNzIGZyb20gJy4uL0RvbUFjY2Vzcy5tanMnO1xuXG4vKipcbiAqIEEgbWFya2Rvd24gbWl4aW4gdG8gY29udmVydCBtYXJrZG93biB0byBodG1sIGJ5IHVzaW5nIHNob3dkb3duLmpzXG4gKiBodHRwczovL2dpdGh1Yi5jb20vc2hvd2Rvd25qcy9zaG93ZG93blxuICogc2NyaXB0IHRhZyB3aXRoIHRoZSBtYXJrZG93biBsaWIgaGFzIHRvIGJlIGFkZGVkIGJlZm9yZSB0aGUgTWFpbi5tanMgc2NyaXB0IHRhZyBpbiB0aGUgaW5kZXguaHRtbFxuICogPHNjcmlwdCBzcmM9XCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL3Nob3dkb3duQDEuOS4xL2Rpc3Qvc2hvd2Rvd24ubWluLmpzXCI+PC9zY3JpcHQ+XG4gKiBAY2xhc3MgTmVvLm1haW4uYWRkb24uTWFya2Rvd25cbiAqIEBleHRlbmRzIE5lby5jb3JlLkJhc2VcbiAqIEBzaW5nbGV0b25cbiAqL1xuY2xhc3MgTWFya2Rvd24gZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLm1haW4uYWRkb24uTWFya2Rvd24nXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5tYWluLmFkZG9uLk1hcmtkb3duJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW90ZSBtZXRob2QgYWNjZXNzIGZvciBvdGhlciB3b3JrZXJzXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gcmVtb3RlPXthcHA6IFsvLy4uLl19XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHJlbW90ZToge1xuICAgICAgICAgICAgYXBwOiBbXG4gICAgICAgICAgICAgICAgJ21hcmtkb3duVG9IdG1sJ1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBzaG93ZG93blBhdGg9J2h0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vc2hvd2Rvd25AMS45LjEvZGlzdC9zaG93ZG93bi5taW4uanMnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHNob3dkb3duUGF0aDogJ2h0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vc2hvd2Rvd25AMS45LjEvZGlzdC9zaG93ZG93bi5taW4uanMnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc2luZ2xldG9uPXRydWVcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc2luZ2xldG9uOiB0cnVlXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcbiAgICAgICAgRG9tQWNjZXNzLmFkZFNjcmlwdCh7c3JjOiB0aGlzLnNob3dkb3duUGF0aH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1hcmtkb3duIHRvIEhUTUwgY29udmVydGVyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1hcmtkb3duIHN0cmluZyB0byBjb252ZXJ0XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG1hcmtkb3duVG9IdG1sKG1hcmtkb3duKSB7XG4gICAgICAgIGxldCBjb252ZXJ0ZXIgPSBuZXcgc2hvd2Rvd24uQ29udmVydGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnZlcnRlci5tYWtlSHRtbChtYXJrZG93bik7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhNYXJrZG93bik7XG5cbmxldCBpbnN0YW5jZSA9IE5lby5jcmVhdGUoTWFya2Rvd24pO1xuXG5OZW8uYXBwbHlUb0dsb2JhbE5zKGluc3RhbmNlKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7Il0sInNvdXJjZVJvb3QiOiIifQ==