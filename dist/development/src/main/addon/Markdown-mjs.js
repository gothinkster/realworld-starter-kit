(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src/main/addon/Markdown-mjs"],{

/***/ "./node_modules/neo.mjs/src/main/addon/Markdown.mjs":
/*!**********************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/addon/Markdown.mjs ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
class Markdown extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {
        return {
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
        }
    }

    /**
     * @param {Object} config
     */
    constructor(config) {
        super(config);
        _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].addScript({src: this.showdownPath});
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

/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9hZGRvbi9NYXJrZG93bi5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUE0QztBQUNIOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0RBQUk7QUFDM0I7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPLFNBQVM7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQVMsWUFBWSx1QkFBdUI7QUFDcEQ7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRWUsdUVBQVEsRSIsImZpbGUiOiJzcmMvbWFpbi9hZGRvbi9NYXJrZG93bi1tanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSAgICAgIGZyb20gJy4uLy4uL2NvcmUvQmFzZS5tanMnO1xuaW1wb3J0IERvbUFjY2VzcyBmcm9tICcuLi9Eb21BY2Nlc3MubWpzJztcblxuLyoqXG4gKiBBIG1hcmtkb3duIG1peGluIHRvIGNvbnZlcnQgbWFya2Rvd24gdG8gaHRtbCBieSB1c2luZyBzaG93ZG93bi5qc1xuICogaHR0cHM6Ly9naXRodWIuY29tL3Nob3dkb3duanMvc2hvd2Rvd25cbiAqIHNjcmlwdCB0YWcgd2l0aCB0aGUgbWFya2Rvd24gbGliIGhhcyB0byBiZSBhZGRlZCBiZWZvcmUgdGhlIE1haW4ubWpzIHNjcmlwdCB0YWcgaW4gdGhlIGluZGV4Lmh0bWxcbiAqIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9zaG93ZG93bkAxLjkuMS9kaXN0L3Nob3dkb3duLm1pbi5qc1wiPjwvc2NyaXB0PlxuICogQGNsYXNzIE5lby5tYWluLmFkZG9uLk1hcmtkb3duXG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKiBAc2luZ2xldG9uXG4gKi9cbmNsYXNzIE1hcmtkb3duIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5tYWluLmFkZG9uLk1hcmtkb3duJ1xuICAgICAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdOZW8ubWFpbi5hZGRvbi5NYXJrZG93bicsXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlbW90ZSBtZXRob2QgYWNjZXNzIGZvciBvdGhlciB3b3JrZXJzXG4gICAgICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHJlbW90ZT17YXBwOiBbLy8uLi5dfVxuICAgICAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByZW1vdGU6IHtcbiAgICAgICAgICAgICAgICBhcHA6IFtcbiAgICAgICAgICAgICAgICAgICAgJ21hcmtkb3duVG9IdG1sJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gc2hvd2Rvd25QYXRoPSdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL3Nob3dkb3duQDEuOS4xL2Rpc3Qvc2hvd2Rvd24ubWluLmpzJ1xuICAgICAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzaG93ZG93blBhdGg6ICdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL3Nob3dkb3duQDEuOS4xL2Rpc3Qvc2hvd2Rvd24ubWluLmpzJyxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc2luZ2xldG9uPXRydWVcbiAgICAgICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc2luZ2xldG9uOiB0cnVlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG4gICAgICAgIERvbUFjY2Vzcy5hZGRTY3JpcHQoe3NyYzogdGhpcy5zaG93ZG93blBhdGh9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXJrZG93biB0byBIVE1MIGNvbnZlcnRlclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtYXJrZG93biBzdHJpbmcgdG8gY29udmVydFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBtYXJrZG93blRvSHRtbChtYXJrZG93bikge1xuICAgICAgICBsZXQgY29udmVydGVyID0gbmV3IHNob3dkb3duLkNvbnZlcnRlcigpO1xuXG4gICAgICAgIHJldHVybiBjb252ZXJ0ZXIubWFrZUh0bWwobWFya2Rvd24pO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoTWFya2Rvd24pO1xuXG5sZXQgaW5zdGFuY2UgPSBOZW8uY3JlYXRlKE1hcmtkb3duKTtcblxuTmVvLmFwcGx5VG9HbG9iYWxOcyhpbnN0YW5jZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3RhbmNlOyJdLCJzb3VyY2VSb290IjoiIn0=