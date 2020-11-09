(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src/main/addon/AnalyticsByGoogle-mjs"],{

/***/ "./node_modules/neo.mjs/src/main/addon/AnalyticsByGoogle.mjs":
/*!*******************************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/addon/AnalyticsByGoogle.mjs ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * Required for the online version of the examples & docs app
 * We can not name the file GoogleAnalytics, since it does break when using uBlock origin for dist versions.
 * See: https://github.com/neomjs/neo/issues/651
 * @class Neo.main.addon.AnalyticsByGoogle
 * @extends Neo.core.Base
 * @singleton
 */
class AnalyticsByGoogle extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
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

/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9hZGRvbi9BbmFseXRpY3NCeUdvb2dsZS5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBdUM7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msc0RBQUk7QUFDcEMsd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esa0VBQWtFLGtCQUFrQjtBQUNwRixTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFZSx1RUFBUSxFIiwiZmlsZSI6InNyYy9tYWluL2FkZG9uL0FuYWx5dGljc0J5R29vZ2xlLW1qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gJy4uLy4uL2NvcmUvQmFzZS5tanMnO1xuXG4vKipcbiAqIFJlcXVpcmVkIGZvciB0aGUgb25saW5lIHZlcnNpb24gb2YgdGhlIGV4YW1wbGVzICYgZG9jcyBhcHBcbiAqIFdlIGNhbiBub3QgbmFtZSB0aGUgZmlsZSBHb29nbGVBbmFseXRpY3MsIHNpbmNlIGl0IGRvZXMgYnJlYWsgd2hlbiB1c2luZyB1QmxvY2sgb3JpZ2luIGZvciBkaXN0IHZlcnNpb25zLlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbmVvbWpzL25lby9pc3N1ZXMvNjUxXG4gKiBAY2xhc3MgTmVvLm1haW4uYWRkb24uQW5hbHl0aWNzQnlHb29nbGVcbiAqIEBleHRlbmRzIE5lby5jb3JlLkJhc2VcbiAqIEBzaW5nbGV0b25cbiAqL1xuY2xhc3MgQW5hbHl0aWNzQnlHb29nbGUgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLm1haW4uYWRkb24uQW5hbHl0aWNzQnlHb29nbGUnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5tYWluLmFkZG9uLkFuYWx5dGljc0J5R29vZ2xlJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHNpbmdsZXRvbj10cnVlXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHNpbmdsZXRvbjogdHJ1ZVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG4gICAgICAgIHRoaXMuaW5zZXJ0R29vZ2xlQW5hbHl0aWNzU2NyaXB0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgaW5zZXJ0R29vZ2xlQW5hbHl0aWNzU2NyaXB0KCkge1xuICAgICAgICB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTtcblxuICAgICAgICBmdW5jdGlvbiBndGFnKCkge1xuICAgICAgICAgICAgZGF0YUxheWVyLnB1c2goYXJndW1lbnRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGd0YWcoJ2pzJywgbmV3IERhdGUoKSk7XG4gICAgICAgIGd0YWcoJ2NvbmZpZycsIE5lby5jb25maWcuZ3RhZ0lkKTtcblxuICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKHNjcmlwdCwge1xuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBzcmMgIDogYGh0dHBzOi8vd3d3Lmdvb2dsZXRhZ21hbmFnZXIuY29tL2d0YWcvanM/aWQ9JHtOZW8uY29uZmlnLmd0YWdJZH1gXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKEFuYWx5dGljc0J5R29vZ2xlKTtcblxubGV0IGluc3RhbmNlID0gTmVvLmNyZWF0ZShBbmFseXRpY3NCeUdvb2dsZSk7XG5cbk5lby5hcHBseVRvR2xvYmFsTnMoaW5zdGFuY2UpO1xuXG5leHBvcnQgZGVmYXVsdCBpbnN0YW5jZTsiXSwic291cmNlUm9vdCI6IiJ9