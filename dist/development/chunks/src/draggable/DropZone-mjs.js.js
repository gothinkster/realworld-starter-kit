(self["webpackChunkneo_mjs_realworld_example_app"] = self["webpackChunkneo_mjs_realworld_example_app"] || []).push([["src/draggable/DropZone-mjs.js"],{

/***/ "./node_modules/neo.mjs/src/draggable/DropZone.mjs":
/*!*********************************************************!*\
  !*** ./node_modules/neo.mjs/src/draggable/DropZone.mjs ***!
  \*********************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ DropZone
/* harmony export */ });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * @class Neo.draggable.DropZone
 * @extends Neo.core.Base
 */
class DropZone extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.draggable.DropZone'
         * @protected
         */
        className: 'Neo.draggable.DropZone',
        /**
         * @member {String} ntype='dropzone'
         * @protected
         */
        ntype: 'dropzone',
        /**
         * @member {Neo.component.Base} owner=null
         */
        owner: null
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me           = this,
            owner        = me.owner,
            domListeners = owner.domListeners;

        domListeners.push(
            {'drop'      : me.onDrop,      scope: me},
            {'drop:enter': me.onDropEnter, scope: me},
            {'drop:leave': me.onDropLeave, scope: me}
        );

        owner.domListeners = domListeners;
    }

    /**
     *
     * @param {String} name
     * @param {Object} data
     */
    fireOwnerEvent(name, data) {
        this.owner.fire(name, this.getDragData(data.dragZoneId));
    }

    /**
     *
     * @param {String} dragZoneId
     * @returns {Object|null}
     */
    getDragData(dragZoneId) {
        let dragZone = Neo.get(dragZoneId);

        if (dragZone) {
            return dragZone.data;
        }

        return null;
    }

    /**
     *
     * @param {Object} data
     */
    onDrop(data) {
        this.fireOwnerEvent('drop', data);
    }

    /**
     *
     * @param {Object} data
     */
    onDropEnter(data) {
        this.fireOwnerEvent('drop:enter', data);
    }

    /**
     *
     * @param {Object} data
     */
    onDropLeave(data) {
        this.fireOwnerEvent('drop:leave', data);
    }
}

Neo.applyClassConfig(DropZone);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9kcmFnZ2FibGUvRHJvcFpvbmUubWpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFvQzs7QUFFcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsbURBQUk7QUFDM0Isd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWEsd0NBQXdDO0FBQ3JELGFBQWEsd0NBQXdDO0FBQ3JELGFBQWE7QUFDYjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6ImNodW5rcy9zcmMvZHJhZ2dhYmxlL0Ryb3Bab25lLW1qcy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gJy4uL2NvcmUvQmFzZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8uZHJhZ2dhYmxlLkRyb3Bab25lXG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKi9cbmNsYXNzIERyb3Bab25lIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5kcmFnZ2FibGUuRHJvcFpvbmUnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5kcmFnZ2FibGUuRHJvcFpvbmUnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0nZHJvcHpvbmUnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnZHJvcHpvbmUnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TmVvLmNvbXBvbmVudC5CYXNlfSBvd25lcj1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBvd25lcjogbnVsbFxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBsZXQgbWUgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIG93bmVyICAgICAgICA9IG1lLm93bmVyLFxuICAgICAgICAgICAgZG9tTGlzdGVuZXJzID0gb3duZXIuZG9tTGlzdGVuZXJzO1xuXG4gICAgICAgIGRvbUxpc3RlbmVycy5wdXNoKFxuICAgICAgICAgICAgeydkcm9wJyAgICAgIDogbWUub25Ecm9wLCAgICAgIHNjb3BlOiBtZX0sXG4gICAgICAgICAgICB7J2Ryb3A6ZW50ZXInOiBtZS5vbkRyb3BFbnRlciwgc2NvcGU6IG1lfSxcbiAgICAgICAgICAgIHsnZHJvcDpsZWF2ZSc6IG1lLm9uRHJvcExlYXZlLCBzY29wZTogbWV9XG4gICAgICAgICk7XG5cbiAgICAgICAgb3duZXIuZG9tTGlzdGVuZXJzID0gZG9tTGlzdGVuZXJzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIGZpcmVPd25lckV2ZW50KG5hbWUsIGRhdGEpIHtcbiAgICAgICAgdGhpcy5vd25lci5maXJlKG5hbWUsIHRoaXMuZ2V0RHJhZ0RhdGEoZGF0YS5kcmFnWm9uZUlkKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZHJhZ1pvbmVJZFxuICAgICAqIEByZXR1cm5zIHtPYmplY3R8bnVsbH1cbiAgICAgKi9cbiAgICBnZXREcmFnRGF0YShkcmFnWm9uZUlkKSB7XG4gICAgICAgIGxldCBkcmFnWm9uZSA9IE5lby5nZXQoZHJhZ1pvbmVJZCk7XG5cbiAgICAgICAgaWYgKGRyYWdab25lKSB7XG4gICAgICAgICAgICByZXR1cm4gZHJhZ1pvbmUuZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbkRyb3AoZGF0YSkge1xuICAgICAgICB0aGlzLmZpcmVPd25lckV2ZW50KCdkcm9wJywgZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRHJvcEVudGVyKGRhdGEpIHtcbiAgICAgICAgdGhpcy5maXJlT3duZXJFdmVudCgnZHJvcDplbnRlcicsIGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbkRyb3BMZWF2ZShkYXRhKSB7XG4gICAgICAgIHRoaXMuZmlyZU93bmVyRXZlbnQoJ2Ryb3A6bGVhdmUnLCBkYXRhKTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKERyb3Bab25lKTtcblxuZXhwb3J0IHtEcm9wWm9uZSBhcyBkZWZhdWx0fTsiXSwic291cmNlUm9vdCI6IiJ9