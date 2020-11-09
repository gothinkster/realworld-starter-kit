self["webpackChunk"](["src/draggable/DropZone-mjs.js"],{

/***/ "./node_modules/neo.mjs/src/draggable/DropZone.mjs":
/*!*********************************************************!*\
  !*** ./node_modules/neo.mjs/src/draggable/DropZone.mjs ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DropZone; });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * @class Neo.draggable.DropZone
 * @extends Neo.core.Base
 */
class DropZone extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
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

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZHJhZ2dhYmxlL0Ryb3Bab25lLm1qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQW9DOztBQUVwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzREFBSTtBQUMzQix3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSx3Q0FBd0M7QUFDckQsYUFBYSx3Q0FBd0M7QUFDckQsYUFBYTtBQUNiOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoic3JjL2RyYWdnYWJsZS9Ecm9wWm9uZS1tanMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tICcuLi9jb3JlL0Jhc2UubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgTmVvLmRyYWdnYWJsZS5Ecm9wWm9uZVxuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICovXG5jbGFzcyBEcm9wWm9uZSBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uZHJhZ2dhYmxlLkRyb3Bab25lJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uZHJhZ2dhYmxlLkRyb3Bab25lJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J2Ryb3B6b25lJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ2Ryb3B6b25lJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge05lby5jb21wb25lbnQuQmFzZX0gb3duZXI9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgb3duZXI6IG51bGxcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBvd25lciAgICAgICAgPSBtZS5vd25lcixcbiAgICAgICAgICAgIGRvbUxpc3RlbmVycyA9IG93bmVyLmRvbUxpc3RlbmVycztcblxuICAgICAgICBkb21MaXN0ZW5lcnMucHVzaChcbiAgICAgICAgICAgIHsnZHJvcCcgICAgICA6IG1lLm9uRHJvcCwgICAgICBzY29wZTogbWV9LFxuICAgICAgICAgICAgeydkcm9wOmVudGVyJzogbWUub25Ecm9wRW50ZXIsIHNjb3BlOiBtZX0sXG4gICAgICAgICAgICB7J2Ryb3A6bGVhdmUnOiBtZS5vbkRyb3BMZWF2ZSwgc2NvcGU6IG1lfVxuICAgICAgICApO1xuXG4gICAgICAgIG93bmVyLmRvbUxpc3RlbmVycyA9IGRvbUxpc3RlbmVycztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBmaXJlT3duZXJFdmVudChuYW1lLCBkYXRhKSB7XG4gICAgICAgIHRoaXMub3duZXIuZmlyZShuYW1lLCB0aGlzLmdldERyYWdEYXRhKGRhdGEuZHJhZ1pvbmVJZCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRyYWdab25lSWRcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fG51bGx9XG4gICAgICovXG4gICAgZ2V0RHJhZ0RhdGEoZHJhZ1pvbmVJZCkge1xuICAgICAgICBsZXQgZHJhZ1pvbmUgPSBOZW8uZ2V0KGRyYWdab25lSWQpO1xuXG4gICAgICAgIGlmIChkcmFnWm9uZSkge1xuICAgICAgICAgICAgcmV0dXJuIGRyYWdab25lLmRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25Ecm9wKGRhdGEpIHtcbiAgICAgICAgdGhpcy5maXJlT3duZXJFdmVudCgnZHJvcCcsIGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbkRyb3BFbnRlcihkYXRhKSB7XG4gICAgICAgIHRoaXMuZmlyZU93bmVyRXZlbnQoJ2Ryb3A6ZW50ZXInLCBkYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25Ecm9wTGVhdmUoZGF0YSkge1xuICAgICAgICB0aGlzLmZpcmVPd25lckV2ZW50KCdkcm9wOmxlYXZlJywgZGF0YSk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhEcm9wWm9uZSk7XG5cbmV4cG9ydCB7RHJvcFpvbmUgYXMgZGVmYXVsdH07Il0sInNvdXJjZVJvb3QiOiIifQ==