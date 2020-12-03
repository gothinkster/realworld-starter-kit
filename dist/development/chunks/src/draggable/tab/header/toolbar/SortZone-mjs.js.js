(self["webpackChunkneo_mjs_realworld_example_app"] = self["webpackChunkneo_mjs_realworld_example_app"] || []).push([["src/draggable/tab/header/toolbar/SortZone-mjs.js"],{

/***/ "./node_modules/neo.mjs/src/draggable/tab/header/toolbar/SortZone.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/neo.mjs/src/draggable/tab/header/toolbar/SortZone.mjs ***!
  \****************************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ SortZone
/* harmony export */ });
/* harmony import */ var _toolbar_SortZone_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../toolbar/SortZone.mjs */ "./node_modules/neo.mjs/src/draggable/toolbar/SortZone.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");



/**
 * @class Neo.draggable.tab.header.toolbar.SortZone
 * @extends Neo.draggable.toolbar.SortZone
 */
class SortZone extends _toolbar_SortZone_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.draggable.tab.header.toolbar.SortZone'
         * @protected
         */
        className: 'Neo.draggable.tab.header.toolbar.SortZone',
        /**
         * @member {String} ntype='tab-header-toolbar-sortzone'
         * @protected
         */
        ntype: 'tab-header-toolbar-sortzone',
        /**
         * @member {Object|null} dragProxyConfig
         */
        dragProxyConfig: {
            cls: ['neo-tab-header-toolbar', 'neo-toolbar']
        }
    }}

    /**
     * Override this method for class extensions (e.g. tab.header.Toolbar)
     * @param {Number} fromIndex
     * @param {Number} toIndex
     */
    moveTo(fromIndex, toIndex) {
        this.owner.up().moveTo(fromIndex, toIndex);
    }

    /**
     *
     * @param {Object} data
     */
    onDragEnd(data) {
        super.onDragEnd(data);

        setTimeout(() => {
            let me    = this,
                owner = me.owner,
                cls   = owner.cls || [];

            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__.default.remove(cls, 'neo-no-animation');
            owner.cls = cls;
        }, 300);
    }

    /**
     *
     * @param {Object} data
     */
    onDragStart(data) {
        let me    = this,
            owner = me.owner,
            cls   = owner.cls || [];

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__.default.add(cls, 'neo-no-animation');
        owner.cls = cls;

        super.onDragStart(data);
    }
}

Neo.applyClassConfig(SortZone);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9kcmFnZ2FibGUvdGFiL2hlYWRlci90b29sYmFyL1NvcnRab25lLm1qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlEO0FBQ0g7O0FBRXREO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDBEQUFZO0FBQ25DLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFlBQVksMkRBQWU7QUFDM0I7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsd0RBQVk7QUFDcEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6ImNodW5rcy9zcmMvZHJhZ2dhYmxlL3RhYi9oZWFkZXIvdG9vbGJhci9Tb3J0Wm9uZS1tanMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZVNvcnRab25lIGZyb20gJy4uLy4uLy4uL3Rvb2xiYXIvU29ydFpvbmUubWpzJztcbmltcG9ydCBOZW9BcnJheSAgICAgZnJvbSAnLi4vLi4vLi4vLi4vdXRpbC9BcnJheS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8uZHJhZ2dhYmxlLnRhYi5oZWFkZXIudG9vbGJhci5Tb3J0Wm9uZVxuICogQGV4dGVuZHMgTmVvLmRyYWdnYWJsZS50b29sYmFyLlNvcnRab25lXG4gKi9cbmNsYXNzIFNvcnRab25lIGV4dGVuZHMgQmFzZVNvcnRab25lIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLmRyYWdnYWJsZS50YWIuaGVhZGVyLnRvb2xiYXIuU29ydFpvbmUnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5kcmFnZ2FibGUudGFiLmhlYWRlci50b29sYmFyLlNvcnRab25lJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J3RhYi1oZWFkZXItdG9vbGJhci1zb3J0em9uZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICd0YWItaGVhZGVyLXRvb2xiYXItc29ydHpvbmUnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fG51bGx9IGRyYWdQcm94eUNvbmZpZ1xuICAgICAgICAgKi9cbiAgICAgICAgZHJhZ1Byb3h5Q29uZmlnOiB7XG4gICAgICAgICAgICBjbHM6IFsnbmVvLXRhYi1oZWFkZXItdG9vbGJhcicsICduZW8tdG9vbGJhciddXG4gICAgICAgIH1cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgZm9yIGNsYXNzIGV4dGVuc2lvbnMgKGUuZy4gdGFiLmhlYWRlci5Ub29sYmFyKVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBmcm9tSW5kZXhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdG9JbmRleFxuICAgICAqL1xuICAgIG1vdmVUbyhmcm9tSW5kZXgsIHRvSW5kZXgpIHtcbiAgICAgICAgdGhpcy5vd25lci51cCgpLm1vdmVUbyhmcm9tSW5kZXgsIHRvSW5kZXgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbkRyYWdFbmQoZGF0YSkge1xuICAgICAgICBzdXBlci5vbkRyYWdFbmQoZGF0YSk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbWUgICAgPSB0aGlzLFxuICAgICAgICAgICAgICAgIG93bmVyID0gbWUub3duZXIsXG4gICAgICAgICAgICAgICAgY2xzICAgPSBvd25lci5jbHMgfHwgW107XG5cbiAgICAgICAgICAgIE5lb0FycmF5LnJlbW92ZShjbHMsICduZW8tbm8tYW5pbWF0aW9uJyk7XG4gICAgICAgICAgICBvd25lci5jbHMgPSBjbHM7XG4gICAgICAgIH0sIDMwMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRHJhZ1N0YXJ0KGRhdGEpIHtcbiAgICAgICAgbGV0IG1lICAgID0gdGhpcyxcbiAgICAgICAgICAgIG93bmVyID0gbWUub3duZXIsXG4gICAgICAgICAgICBjbHMgICA9IG93bmVyLmNscyB8fCBbXTtcblxuICAgICAgICBOZW9BcnJheS5hZGQoY2xzLCAnbmVvLW5vLWFuaW1hdGlvbicpO1xuICAgICAgICBvd25lci5jbHMgPSBjbHM7XG5cbiAgICAgICAgc3VwZXIub25EcmFnU3RhcnQoZGF0YSk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhTb3J0Wm9uZSk7XG5cbmV4cG9ydCB7U29ydFpvbmUgYXMgZGVmYXVsdH07Il0sInNvdXJjZVJvb3QiOiIifQ==