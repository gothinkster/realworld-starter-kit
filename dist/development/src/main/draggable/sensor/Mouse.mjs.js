(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src/main/draggable/sensor/Mouse.mjs"],{

/***/ "./node_modules/neo.mjs/src/main/draggable/sensor/Base.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/draggable/sensor/Base.mjs ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Base; });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * Abstract base class for other sensors
 * @class Neo.main.draggable.sensor.Base
 * @extends Neo.core.Base
 */
class Base extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.draggable.sensor.Base'
         * @protected
         */
        className: 'Neo.main.draggable.sensor.Base',
        /**
         * @member {HTMLElement|null} currentElement=null
         * @protected
         */
        currentElement: null,
        /**
         * @member {String[]} dragTargetClasses=['neo-draggable','neo-resizable']
         */
        dragTargetClasses: ['neo-draggable', 'neo-resizable'],
        /**
         * @member {Boolean} isDragging=false
         * @protected
         */
        isDragging: false,
        /**
         * @member {Event|null} lastEvent=null
         * @protected
         */
        lastEvent: null,
        /**
         * @member {Event|null} startEvent=null
         * @protected
         */
        startEvent: null
    }}

    /**
     *
     */
    onConstructed() {
        this.attach();
        super.onConstructed();
    }

    /**
     * Attaches sensors event listeners to the DOM
     */
    attach() {}

    /**
     * Detaches sensors event listeners from the DOM
     */
    detach() {}

    /**
     * Triggers a custom event on the target element
     * @param {HTMLElement} element - Element to trigger event on
     * @param {Object} sensorEvent - Sensor event to trigger
     * @returns {Event}
     */
    trigger(element, sensorEvent) {
        const event = document.createEvent('Event');
        event.detail = sensorEvent;
        event.initEvent(sensorEvent.type, true, true);
        element.dispatchEvent(event);
        this.lastEvent = sensorEvent;

        return sensorEvent;
    }
}

Neo.applyClassConfig(Base);



/***/ }),

/***/ "./node_modules/neo.mjs/src/main/draggable/sensor/Mouse.mjs":
/*!******************************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/draggable/sensor/Mouse.mjs ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Mouse; });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/main/draggable/sensor/Base.mjs");
/* harmony import */ var _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../DomEvents.mjs */ "./node_modules/neo.mjs/src/main/DomEvents.mjs");



/**
 * @class Neo.main.draggable.sensor.Mouse
 * @extends Neo.main.draggable.sensor.Base
 */
class Mouse extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.draggable.sensor.Mouse'
         * @protected
         */
        className: 'Neo.main.draggable.sensor.Mouse',
        /**
         * @member {Number} delay=0
         */
        delay: 0,
        /**
         * @member {Number} minDistance=1
         */
        minDistance: 1,
        /**
         * @member {Number} mouseDownTime=0
         */
        mouseDownTime: 0,
        /**
         * @member {Number|null} mouseDownTimeout=null
         */
        mouseDownTimeout: null,
        /**
         * @member {Number|null} pageX=null
         * @protected
         */
        pageX: null,
        /**
         * @member {Number|null} pageY=null
         * @protected
         */
        pageY: null
    }}

    /**
     *
     * @param config
     */
    constructor(config) {
        super(config);
        Neo.bindMethods(this, ['onDistanceChange', 'onMouseDown', 'onMouseMove', 'onMouseUp']);
    }

    /**
     * Attaches sensors event listeners to the DOM
     */
    attach() {
        document.addEventListener('mousedown', this.onMouseDown, true);
    }

    /**
     * Detaches sensors event listeners from the DOM
     */
    detach() {
        document.removeEventListener('mousedown', this.onMouseDown, true);
    }

    /**
     * Detect change in distance, starting drag when both delay and distance requirements are met
     * @param {MouseEvent|Object} event - Object in case it does get trigger via the mouseDownTimeout
     */
    onDistanceChange(event) {
        let me = this;

        if (me.currentElement) {
            const {pageX, pageY}    = event,
                  timeElapsed       = Date.now() - me.mouseDownTime,
                  distanceTravelled = _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].getDistance(me.startEvent.pageX, me.startEvent.pageY, pageX, pageY) || 0;

            Object.assign(me, {pageX, pageY});

            if (timeElapsed >= me.delay && distanceTravelled >= me.minDistance) {
                clearTimeout(me.mouseDownTimeout);
                document.removeEventListener('mousemove', me.onDistanceChange);
                me.startDrag();
            }
        }
    }

    /**
     *
     * @param {MouseEvent} event
     */
    onMouseDown(event) {
        if (event.button === 0 && !event.ctrlKey && !event.metaKey) {
            let me     = this,
                target = _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].testPathInclusion(event, me.dragTargetClasses);

            if (target) {
                Object.assign(me, {
                    currentElement: target.node,
                    mouseDownTime : Date.now(),
                    pageX         : event.pageX,
                    pageY         : event.pageY,
                    startEvent    : event
                });

                document.addEventListener('dragstart', preventDefault);
                document.addEventListener('mousemove', me.onDistanceChange);
                document.addEventListener('mouseup',   me.onMouseUp);

                me.mouseDownTimeout = setTimeout(() => {
                    me.onDistanceChange({pageX: me.pageX, pageY: me.pageY});
                }, me.delay);
            }
        }
    }

    /**
     *
     * @param {MouseEvent} event
     */
    onMouseMove(event) {
        let me = this;

        if (me.dragging) {
            let element = me.currentElement,
                target  = document.elementFromPoint(event.clientX, event.clientY);

            me.trigger(element, {
                clientX      : event.clientX,
                clientY      : event.clientY,
                element,
                originalEvent: event,
                path         : me.startEvent.path || me.startEvent.composedPath(),
                target,
                type         : 'drag:move'
            });
        }
    }

    /**
     *
     * @param {MouseEvent} event
     */
    onMouseUp(event) {
        if (event.button === 0) {
            let me = this;

            clearTimeout(me.mouseDownTimeout);

            document.removeEventListener('dragstart', preventDefault);
            document.removeEventListener('mousemove', me.onDistanceChange);
            document.removeEventListener('mouseup',   me.onMouseUp);

            if (me.dragging) {
                let element = me.currentElement,
                    target  = document.elementFromPoint(event.clientX, event.clientY);

                me.trigger(element, {
                    clientX      : event.clientX,
                    clientY      : event.clientY,
                    element,
                    originalEvent: event,
                    path         : me.startEvent.path || me.startEvent.composedPath(),
                    target,
                    type         : 'drag:end'
                });

                document.removeEventListener('contextmenu', preventDefault, true);
                document.removeEventListener('mousemove',   me.onMouseMove);

                Object.assign(me, {
                    currentElement: null,
                    dragging      : false,
                    startEvent    : null
                });
            }

            me.dragging = false;
        }
    }

    /**
     *
     */
    startDrag() {
        let me         = this,
            element    = me.currentElement,
            startEvent = me.startEvent;

        me.trigger(element, {
            clientX      : startEvent.clientX,
            clientY      : startEvent.clientY,
            element,
            originalEvent: startEvent,
            path         : startEvent.path || startEvent.composedPath(),
            target       : startEvent.target,
            type         : 'drag:start'
        });

        me.dragging = true;

        if (me.dragging) {
            document.addEventListener('contextmenu', preventDefault, true);
            document.addEventListener('mousemove',   me.onMouseMove);
        }
    }
}

function preventDefault(event) {
    event.preventDefault();
}

Neo.applyClassConfig(Mouse);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9kcmFnZ2FibGUvc2Vuc29yL0Jhc2UubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9tYWluL2RyYWdnYWJsZS9zZW5zb3IvTW91c2UubWpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBOEM7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsc0RBQVE7QUFDM0Isd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsaUJBQWlCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsV0FBVztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixXQUFXO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFlBQVk7QUFDM0IsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDM0VBO0FBQUE7QUFBQTtBQUFBO0FBQW1DO0FBQ1M7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGlEQUFJO0FBQ3hCLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsa0JBQWtCO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixhQUFhO0FBQ2hDO0FBQ0Esc0NBQXNDLHNEQUFTOztBQUUvQywrQkFBK0IsYUFBYTs7QUFFNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsV0FBVztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixzREFBUzs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlDQUF5QyxpQ0FBaUM7QUFDMUUsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxXQUFXO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFdBQVc7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6InNyYy9tYWluL2RyYWdnYWJsZS9zZW5zb3IvTW91c2UubWpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvcmVCYXNlIGZyb20gJy4uLy4uLy4uL2NvcmUvQmFzZS5tanMnO1xuXG4vKipcbiAqIEFic3RyYWN0IGJhc2UgY2xhc3MgZm9yIG90aGVyIHNlbnNvcnNcbiAqIEBjbGFzcyBOZW8ubWFpbi5kcmFnZ2FibGUuc2Vuc29yLkJhc2VcbiAqIEBleHRlbmRzIE5lby5jb3JlLkJhc2VcbiAqL1xuY2xhc3MgQmFzZSBleHRlbmRzIENvcmVCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLm1haW4uZHJhZ2dhYmxlLnNlbnNvci5CYXNlJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8ubWFpbi5kcmFnZ2FibGUuc2Vuc29yLkJhc2UnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7SFRNTEVsZW1lbnR8bnVsbH0gY3VycmVudEVsZW1lbnQ9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjdXJyZW50RWxlbWVudDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBkcmFnVGFyZ2V0Q2xhc3Nlcz1bJ25lby1kcmFnZ2FibGUnLCduZW8tcmVzaXphYmxlJ11cbiAgICAgICAgICovXG4gICAgICAgIGRyYWdUYXJnZXRDbGFzc2VzOiBbJ25lby1kcmFnZ2FibGUnLCAnbmVvLXJlc2l6YWJsZSddLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gaXNEcmFnZ2luZz1mYWxzZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBpc0RyYWdnaW5nOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0V2ZW50fG51bGx9IGxhc3RFdmVudD1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGxhc3RFdmVudDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0V2ZW50fG51bGx9IHN0YXJ0RXZlbnQ9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBzdGFydEV2ZW50OiBudWxsXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgb25Db25zdHJ1Y3RlZCgpIHtcbiAgICAgICAgdGhpcy5hdHRhY2goKTtcbiAgICAgICAgc3VwZXIub25Db25zdHJ1Y3RlZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEF0dGFjaGVzIHNlbnNvcnMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBET01cbiAgICAgKi9cbiAgICBhdHRhY2goKSB7fVxuXG4gICAgLyoqXG4gICAgICogRGV0YWNoZXMgc2Vuc29ycyBldmVudCBsaXN0ZW5lcnMgZnJvbSB0aGUgRE9NXG4gICAgICovXG4gICAgZGV0YWNoKCkge31cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIGEgY3VzdG9tIGV2ZW50IG9uIHRoZSB0YXJnZXQgZWxlbWVudFxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSBFbGVtZW50IHRvIHRyaWdnZXIgZXZlbnQgb25cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc2Vuc29yRXZlbnQgLSBTZW5zb3IgZXZlbnQgdG8gdHJpZ2dlclxuICAgICAqIEByZXR1cm5zIHtFdmVudH1cbiAgICAgKi9cbiAgICB0cmlnZ2VyKGVsZW1lbnQsIHNlbnNvckV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICAgIGV2ZW50LmRldGFpbCA9IHNlbnNvckV2ZW50O1xuICAgICAgICBldmVudC5pbml0RXZlbnQoc2Vuc29yRXZlbnQudHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgIHRoaXMubGFzdEV2ZW50ID0gc2Vuc29yRXZlbnQ7XG5cbiAgICAgICAgcmV0dXJuIHNlbnNvckV2ZW50O1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoQmFzZSk7XG5cbmV4cG9ydCB7QmFzZSBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQmFzZSAgICAgIGZyb20gJy4vQmFzZS5tanMnO1xuaW1wb3J0IERvbUV2ZW50cyBmcm9tICcuLi8uLi9Eb21FdmVudHMubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgTmVvLm1haW4uZHJhZ2dhYmxlLnNlbnNvci5Nb3VzZVxuICogQGV4dGVuZHMgTmVvLm1haW4uZHJhZ2dhYmxlLnNlbnNvci5CYXNlXG4gKi9cbmNsYXNzIE1vdXNlIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5tYWluLmRyYWdnYWJsZS5zZW5zb3IuTW91c2UnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5tYWluLmRyYWdnYWJsZS5zZW5zb3IuTW91c2UnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBkZWxheT0wXG4gICAgICAgICAqL1xuICAgICAgICBkZWxheTogMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gbWluRGlzdGFuY2U9MVxuICAgICAgICAgKi9cbiAgICAgICAgbWluRGlzdGFuY2U6IDEsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IG1vdXNlRG93blRpbWU9MFxuICAgICAgICAgKi9cbiAgICAgICAgbW91c2VEb3duVGltZTogMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcnxudWxsfSBtb3VzZURvd25UaW1lb3V0PW51bGxcbiAgICAgICAgICovXG4gICAgICAgIG1vdXNlRG93blRpbWVvdXQ6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8bnVsbH0gcGFnZVg9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBwYWdlWDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcnxudWxsfSBwYWdlWT1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHBhZ2VZOiBudWxsXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuICAgICAgICBOZW8uYmluZE1ldGhvZHModGhpcywgWydvbkRpc3RhbmNlQ2hhbmdlJywgJ29uTW91c2VEb3duJywgJ29uTW91c2VNb3ZlJywgJ29uTW91c2VVcCddKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBdHRhY2hlcyBzZW5zb3JzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgRE9NXG4gICAgICovXG4gICAgYXR0YWNoKCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duLCB0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRhY2hlcyBzZW5zb3JzIGV2ZW50IGxpc3RlbmVycyBmcm9tIHRoZSBET01cbiAgICAgKi9cbiAgICBkZXRhY2goKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24sIHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVjdCBjaGFuZ2UgaW4gZGlzdGFuY2UsIHN0YXJ0aW5nIGRyYWcgd2hlbiBib3RoIGRlbGF5IGFuZCBkaXN0YW5jZSByZXF1aXJlbWVudHMgYXJlIG1ldFxuICAgICAqIEBwYXJhbSB7TW91c2VFdmVudHxPYmplY3R9IGV2ZW50IC0gT2JqZWN0IGluIGNhc2UgaXQgZG9lcyBnZXQgdHJpZ2dlciB2aWEgdGhlIG1vdXNlRG93blRpbWVvdXRcbiAgICAgKi9cbiAgICBvbkRpc3RhbmNlQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKG1lLmN1cnJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCB7cGFnZVgsIHBhZ2VZfSAgICA9IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgdGltZUVsYXBzZWQgICAgICAgPSBEYXRlLm5vdygpIC0gbWUubW91c2VEb3duVGltZSxcbiAgICAgICAgICAgICAgICAgIGRpc3RhbmNlVHJhdmVsbGVkID0gRG9tRXZlbnRzLmdldERpc3RhbmNlKG1lLnN0YXJ0RXZlbnQucGFnZVgsIG1lLnN0YXJ0RXZlbnQucGFnZVksIHBhZ2VYLCBwYWdlWSkgfHwgMDtcblxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihtZSwge3BhZ2VYLCBwYWdlWX0pO1xuXG4gICAgICAgICAgICBpZiAodGltZUVsYXBzZWQgPj0gbWUuZGVsYXkgJiYgZGlzdGFuY2VUcmF2ZWxsZWQgPj0gbWUubWluRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobWUubW91c2VEb3duVGltZW91dCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbWUub25EaXN0YW5jZUNoYW5nZSk7XG4gICAgICAgICAgICAgICAgbWUuc3RhcnREcmFnKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnRcbiAgICAgKi9cbiAgICBvbk1vdXNlRG93bihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwICYmICFldmVudC5jdHJsS2V5ICYmICFldmVudC5tZXRhS2V5KSB7XG4gICAgICAgICAgICBsZXQgbWUgICAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBEb21FdmVudHMudGVzdFBhdGhJbmNsdXNpb24oZXZlbnQsIG1lLmRyYWdUYXJnZXRDbGFzc2VzKTtcblxuICAgICAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obWUsIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEVsZW1lbnQ6IHRhcmdldC5ub2RlLFxuICAgICAgICAgICAgICAgICAgICBtb3VzZURvd25UaW1lIDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgICAgICAgICAgcGFnZVggICAgICAgICA6IGV2ZW50LnBhZ2VYLFxuICAgICAgICAgICAgICAgICAgICBwYWdlWSAgICAgICAgIDogZXZlbnQucGFnZVksXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RXZlbnQgICAgOiBldmVudFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgcHJldmVudERlZmF1bHQpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1lLm9uRGlzdGFuY2VDaGFuZ2UpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAgIG1lLm9uTW91c2VVcCk7XG5cbiAgICAgICAgICAgICAgICBtZS5tb3VzZURvd25UaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1lLm9uRGlzdGFuY2VDaGFuZ2Uoe3BhZ2VYOiBtZS5wYWdlWCwgcGFnZVk6IG1lLnBhZ2VZfSk7XG4gICAgICAgICAgICAgICAgfSwgbWUuZGVsYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50XG4gICAgICovXG4gICAgb25Nb3VzZU1vdmUoZXZlbnQpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUuZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gbWUuY3VycmVudEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgdGFyZ2V0ICA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG5cbiAgICAgICAgICAgIG1lLnRyaWdnZXIoZWxlbWVudCwge1xuICAgICAgICAgICAgICAgIGNsaWVudFggICAgICA6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgICAgICAgICAgY2xpZW50WSAgICAgIDogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIHBhdGggICAgICAgICA6IG1lLnN0YXJ0RXZlbnQucGF0aCB8fCBtZS5zdGFydEV2ZW50LmNvbXBvc2VkUGF0aCgpLFxuICAgICAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgICAgICB0eXBlICAgICAgICAgOiAnZHJhZzptb3ZlJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnRcbiAgICAgKi9cbiAgICBvbk1vdXNlVXAoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KG1lLm1vdXNlRG93blRpbWVvdXQpO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBwcmV2ZW50RGVmYXVsdCk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtZS5vbkRpc3RhbmNlQ2hhbmdlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAgIG1lLm9uTW91c2VVcCk7XG5cbiAgICAgICAgICAgIGlmIChtZS5kcmFnZ2luZykge1xuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gbWUuY3VycmVudEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCAgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuXG4gICAgICAgICAgICAgICAgbWUudHJpZ2dlcihlbGVtZW50LCB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWVudFggICAgICA6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgICAgICAgICAgICAgIGNsaWVudFkgICAgICA6IGV2ZW50LmNsaWVudFksXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBwYXRoICAgICAgICAgOiBtZS5zdGFydEV2ZW50LnBhdGggfHwgbWUuc3RhcnRFdmVudC5jb21wb3NlZFBhdGgoKSxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICB0eXBlICAgICAgICAgOiAnZHJhZzplbmQnXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIHByZXZlbnREZWZhdWx0LCB0cnVlKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAgIG1lLm9uTW91c2VNb3ZlKTtcblxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obWUsIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEVsZW1lbnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGRyYWdnaW5nICAgICAgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRFdmVudCAgICA6IG51bGxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWUuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgc3RhcnREcmFnKCkge1xuICAgICAgICBsZXQgbWUgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBlbGVtZW50ICAgID0gbWUuY3VycmVudEVsZW1lbnQsXG4gICAgICAgICAgICBzdGFydEV2ZW50ID0gbWUuc3RhcnRFdmVudDtcblxuICAgICAgICBtZS50cmlnZ2VyKGVsZW1lbnQsIHtcbiAgICAgICAgICAgIGNsaWVudFggICAgICA6IHN0YXJ0RXZlbnQuY2xpZW50WCxcbiAgICAgICAgICAgIGNsaWVudFkgICAgICA6IHN0YXJ0RXZlbnQuY2xpZW50WSxcbiAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBzdGFydEV2ZW50LFxuICAgICAgICAgICAgcGF0aCAgICAgICAgIDogc3RhcnRFdmVudC5wYXRoIHx8IHN0YXJ0RXZlbnQuY29tcG9zZWRQYXRoKCksXG4gICAgICAgICAgICB0YXJnZXQgICAgICAgOiBzdGFydEV2ZW50LnRhcmdldCxcbiAgICAgICAgICAgIHR5cGUgICAgICAgICA6ICdkcmFnOnN0YXJ0J1xuICAgICAgICB9KTtcblxuICAgICAgICBtZS5kcmFnZ2luZyA9IHRydWU7XG5cbiAgICAgICAgaWYgKG1lLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIHByZXZlbnREZWZhdWx0LCB0cnVlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsICAgbWUub25Nb3VzZU1vdmUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwcmV2ZW50RGVmYXVsdChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKE1vdXNlKTtcblxuZXhwb3J0IHtNb3VzZSBhcyBkZWZhdWx0fTsiXSwic291cmNlUm9vdCI6IiJ9