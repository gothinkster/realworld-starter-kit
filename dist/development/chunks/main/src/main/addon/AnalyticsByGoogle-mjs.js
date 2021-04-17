(self["webpackChunkneo_mjs_realworld_example_app"] = self["webpackChunkneo_mjs_realworld_example_app"] || []).push([["src/main/addon/AnalyticsByGoogle-mjs"],{

/***/ "./node_modules/neo.mjs/src/main/addon/AnalyticsByGoogle.mjs":
/*!*******************************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/addon/AnalyticsByGoogle.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * Required for the online version of the examples & docs app
 * We can not name the file GoogleAnalytics, since it does break when using uBlock origin for dist versions.
 * See: https://github.com/neomjs/neo/issues/651
 * @class Neo.main.addon.AnalyticsByGoogle
 * @extends Neo.core.Base
 * @singleton
 */
class AnalyticsByGoogle extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.addon.AnalyticsByGoogle'
         * @protected
         */
        className: 'Neo.main.addon.AnalyticsByGoogle',
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
        this.insertGoogleAnalyticsScript();
    }

    /**
     *
     * @protected
     */
    insertGoogleAnalyticsScript() {
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());
        gtag('config', Neo.config.gtagId);

        const script = document.createElement('script');

        Object.assign(script, {
            async: true,
            src  : `https://www.googletagmanager.com/gtag/js?id=${Neo.config.gtagId}`
        });

        document.head.appendChild(script);
    }
}

Neo.applyClassConfig(AnalyticsByGoogle);

let instance = Neo.create(AnalyticsByGoogle);

Neo.applyToGlobalNs(instance);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (instance);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9tYWluL2FkZG9uL0FuYWx5dGljc0J5R29vZ2xlLm1qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUF1Qzs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxtREFBSTtBQUNwQyx3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxrRUFBa0Usa0JBQWtCO0FBQ3BGLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLGlFQUFlLFFBQVEsRSIsImZpbGUiOiJjaHVua3MvbWFpbi9zcmMvbWFpbi9hZGRvbi9BbmFseXRpY3NCeUdvb2dsZS1tanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tICcuLi8uLi9jb3JlL0Jhc2UubWpzJztcblxuLyoqXG4gKiBSZXF1aXJlZCBmb3IgdGhlIG9ubGluZSB2ZXJzaW9uIG9mIHRoZSBleGFtcGxlcyAmIGRvY3MgYXBwXG4gKiBXZSBjYW4gbm90IG5hbWUgdGhlIGZpbGUgR29vZ2xlQW5hbHl0aWNzLCBzaW5jZSBpdCBkb2VzIGJyZWFrIHdoZW4gdXNpbmcgdUJsb2NrIG9yaWdpbiBmb3IgZGlzdCB2ZXJzaW9ucy5cbiAqIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL25lb21qcy9uZW8vaXNzdWVzLzY1MVxuICogQGNsYXNzIE5lby5tYWluLmFkZG9uLkFuYWx5dGljc0J5R29vZ2xlXG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKiBAc2luZ2xldG9uXG4gKi9cbmNsYXNzIEFuYWx5dGljc0J5R29vZ2xlIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5tYWluLmFkZG9uLkFuYWx5dGljc0J5R29vZ2xlJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8ubWFpbi5hZGRvbi5BbmFseXRpY3NCeUdvb2dsZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBzaW5nbGV0b249dHJ1ZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBzaW5nbGV0b246IHRydWVcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuICAgICAgICB0aGlzLmluc2VydEdvb2dsZUFuYWx5dGljc1NjcmlwdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGluc2VydEdvb2dsZUFuYWx5dGljc1NjcmlwdCgpIHtcbiAgICAgICAgd2luZG93LmRhdGFMYXllciA9IHdpbmRvdy5kYXRhTGF5ZXIgfHwgW107XG5cbiAgICAgICAgZnVuY3Rpb24gZ3RhZygpIHtcbiAgICAgICAgICAgIGRhdGFMYXllci5wdXNoKGFyZ3VtZW50cyk7XG4gICAgICAgIH1cblxuICAgICAgICBndGFnKCdqcycsIG5ldyBEYXRlKCkpO1xuICAgICAgICBndGFnKCdjb25maWcnLCBOZW8uY29uZmlnLmd0YWdJZCk7XG5cbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbihzY3JpcHQsIHtcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgc3JjICA6IGBodHRwczovL3d3dy5nb29nbGV0YWdtYW5hZ2VyLmNvbS9ndGFnL2pzP2lkPSR7TmVvLmNvbmZpZy5ndGFnSWR9YFxuICAgICAgICB9KTtcblxuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhBbmFseXRpY3NCeUdvb2dsZSk7XG5cbmxldCBpbnN0YW5jZSA9IE5lby5jcmVhdGUoQW5hbHl0aWNzQnlHb29nbGUpO1xuXG5OZW8uYXBwbHlUb0dsb2JhbE5zKGluc3RhbmNlKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7Il0sInNvdXJjZVJvb3QiOiIifQ==