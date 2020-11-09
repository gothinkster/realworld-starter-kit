(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src/main/addon/LocalStorage-mjs"],{

/***/ "./node_modules/neo.mjs/src/main/addon/LocalStorage.mjs":
/*!**************************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/addon/LocalStorage.mjs ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * Basic CRUD support for window.localStorage
 * @class Neo.main.addon.LocalStorage
 * @extends Neo.core.Base
 * @singleton
 */
class LocalStorage extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.addon.LocalStorage'
         * @protected
         */
        className: 'Neo.main.addon.LocalStorage',
        /**
         * Remote method access for other workers
         * @member {Object} remote={app: [//...]}
         * @protected
         */
        remote: {
            app: [
                'createLocalStorageItem',
                'destroyLocalStorageItem',
                'readLocalStorageItem',
                'updateLocalStorageItem'
            ]
        },
        /**
         * @member {Boolean} singleton=true
         * @protected
         */
        singleton: true
    }}

    /**
     * Creates a new item into window.localStorage
     * Uses updateLocalStorageItem() internally
     * @param {Object} opts
     * @param {String} opts.key
     * @param {String} opts.value
     */
    createLocalStorageItem(opts) {
        this.updateLocalStorageItem(opts);
    }

    /**
     * Removes an item from window.localStorage
     * @param {Object} opts
     * @param {String} opts.key
     */
    destroyLocalStorageItem(opts) {
        window.localStorage.removeItem(opts.key);
    }

    /**
     * Gets an item from window.localStorage
     * @param {Object} opts
     * @param {String} opts.key
     */
    readLocalStorageItem(opts) {
        return {
            key  : opts.key,
            value: window.localStorage.getItem(opts.key)
        }
    }

    /**
     * Reads an item from window.localStorage
     * @param {Object} opts
     * @param {String} opts.key
     * @param {String} opts.value
     */
    updateLocalStorageItem(opts) {
        window.localStorage.setItem(opts.key, opts.value);
    }
}

Neo.applyClassConfig(LocalStorage);

let instance = Neo.create(LocalStorage);

Neo.applyToGlobalNs(instance);

/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9hZGRvbi9Mb2NhbFN0b3JhZ2UubWpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQXVDOztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsc0RBQUk7QUFDL0Isd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPLFNBQVM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRWUsdUVBQVEsRSIsImZpbGUiOiJzcmMvbWFpbi9hZGRvbi9Mb2NhbFN0b3JhZ2UtbWpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2UgZnJvbSAnLi4vLi4vY29yZS9CYXNlLm1qcyc7XG5cbi8qKlxuICogQmFzaWMgQ1JVRCBzdXBwb3J0IGZvciB3aW5kb3cubG9jYWxTdG9yYWdlXG4gKiBAY2xhc3MgTmVvLm1haW4uYWRkb24uTG9jYWxTdG9yYWdlXG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKiBAc2luZ2xldG9uXG4gKi9cbmNsYXNzIExvY2FsU3RvcmFnZSBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8ubWFpbi5hZGRvbi5Mb2NhbFN0b3JhZ2UnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5tYWluLmFkZG9uLkxvY2FsU3RvcmFnZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdGUgbWV0aG9kIGFjY2VzcyBmb3Igb3RoZXIgd29ya2Vyc1xuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHJlbW90ZT17YXBwOiBbLy8uLi5dfVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICByZW1vdGU6IHtcbiAgICAgICAgICAgIGFwcDogW1xuICAgICAgICAgICAgICAgICdjcmVhdGVMb2NhbFN0b3JhZ2VJdGVtJyxcbiAgICAgICAgICAgICAgICAnZGVzdHJveUxvY2FsU3RvcmFnZUl0ZW0nLFxuICAgICAgICAgICAgICAgICdyZWFkTG9jYWxTdG9yYWdlSXRlbScsXG4gICAgICAgICAgICAgICAgJ3VwZGF0ZUxvY2FsU3RvcmFnZUl0ZW0nXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBzaW5nbGV0b249dHJ1ZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBzaW5nbGV0b246IHRydWVcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpdGVtIGludG8gd2luZG93LmxvY2FsU3RvcmFnZVxuICAgICAqIFVzZXMgdXBkYXRlTG9jYWxTdG9yYWdlSXRlbSgpIGludGVybmFsbHlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzLmtleVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzLnZhbHVlXG4gICAgICovXG4gICAgY3JlYXRlTG9jYWxTdG9yYWdlSXRlbShvcHRzKSB7XG4gICAgICAgIHRoaXMudXBkYXRlTG9jYWxTdG9yYWdlSXRlbShvcHRzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB3aW5kb3cubG9jYWxTdG9yYWdlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0cy5rZXlcbiAgICAgKi9cbiAgICBkZXN0cm95TG9jYWxTdG9yYWdlSXRlbShvcHRzKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShvcHRzLmtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhbiBpdGVtIGZyb20gd2luZG93LmxvY2FsU3RvcmFnZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdHMua2V5XG4gICAgICovXG4gICAgcmVhZExvY2FsU3RvcmFnZUl0ZW0ob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5ICA6IG9wdHMua2V5LFxuICAgICAgICAgICAgdmFsdWU6IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShvcHRzLmtleSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlYWRzIGFuIGl0ZW0gZnJvbSB3aW5kb3cubG9jYWxTdG9yYWdlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0cy5rZXlcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0cy52YWx1ZVxuICAgICAqL1xuICAgIHVwZGF0ZUxvY2FsU3RvcmFnZUl0ZW0ob3B0cykge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0ob3B0cy5rZXksIG9wdHMudmFsdWUpO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoTG9jYWxTdG9yYWdlKTtcblxubGV0IGluc3RhbmNlID0gTmVvLmNyZWF0ZShMb2NhbFN0b3JhZ2UpO1xuXG5OZW8uYXBwbHlUb0dsb2JhbE5zKGluc3RhbmNlKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7Il0sInNvdXJjZVJvb3QiOiIifQ==