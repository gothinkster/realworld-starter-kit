(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src/main/draggable/sensor/Touch.mjs"],{

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

/***/ "./node_modules/neo.mjs/src/main/draggable/sensor/Touch.mjs":
/*!******************************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/draggable/sensor/Touch.mjs ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Touch; });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/main/draggable/sensor/Base.mjs");
/* harmony import */ var _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../DomEvents.mjs */ "./node_modules/neo.mjs/src/main/DomEvents.mjs");



let preventScrolling = false;

// WebKit requires cancelable touchmove events to be added as early as possible
window.addEventListener('touchmove', event => {
    if (!preventScrolling) {
        return;
    }

    // Prevent scrolling
    if (event.cancelable) {
        event.preventDefault();
    }
}, {cancelable: true, passive: false});

/**
 * @class Neo.main.draggable.sensor.Touch
 * @extends Neo.main.draggable.sensor.Base
 */
class Touch extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.draggable.sensor.Touch'
         * @protected
         */
        className: 'Neo.main.draggable.sensor.Touch',
        /**
         * @member {Number} delay=200
         */
        delay: 200,
        /**
         * @member {Number} minDistance=0
         */
        minDistance: 0,
        /**
         * @member {Number|null} pageX=null
         * @protected
         */
        pageX: null,
        /**
         * @member {Number|null} pageY=null
         * @protected
         */
        pageY: null,
        /**
         * @member {Number|null} tapTimeout=null
         */
        tapTimeout: null,
        /**
         * @member {Number} touchStartTime=0
         */
        touchStartTime: 0
    }}

    /**
     *
     * @param config
     */
    constructor(config) {
        super(config);
        Neo.bindMethods(this, ['onDistanceChange', 'onTouchEnd', 'onTouchMove', 'onTouchStart', 'startDrag']);
    }

    /**
     * Attaches sensors event listeners to the DOM
     */
    attach() {
        document.addEventListener('touchstart', this.onTouchStart);
    }

    /**
     * Detaches sensors event listeners from the DOM
     */
    detach() {
        document.removeEventListener('touchstart', this.onTouchStart);
    }

    /**
     * Detect change in distance, starting drag when both delay and distance requirements are met
     * @param {TouchEvent|Object} event - Object in case it does get trigger via the tapTimeout
     */
    onDistanceChange(event) {
        let me = this;

        if (me.currentElement) {
            const {pageX, pageY}    = _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].getTouchCoords(event),
                  start             = _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].getTouchCoords(me.startEvent),
                  timeElapsed       = Date.now() - me.touchStartTime,
                  distanceTravelled = _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].getDistance(start.pageX, start.pageY, pageX, pageY) || 0;

            Object.assign(me, {pageX, pageY});

            if (timeElapsed >= me.delay && distanceTravelled >= me.minDistance) {
                clearTimeout(me.tapTimeout);
                document.removeEventListener('touchmove', me.onDistanceChange);
                me.startDrag();
            }
        }
    }

    /**
     *
     * @param {TouchEvent} event
     */
    onTouchEnd(event) {
        preventScrolling = false;

        let me = this;

        clearTimeout(me.tapTimeout);

        document.removeEventListener('dragstart',   preventDefault);
        document.removeEventListener('touchcancel', me.onTouchEnd);
        document.removeEventListener('touchend',    me.onTouchEnd);
        document.removeEventListener('touchmove',   me.onDistanceChange);

        if (me.dragging) {
            const {pageX, pageY} = _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].getTouchCoords(event);

            let element = me.currentElement,
                target  = document.elementFromPoint(pageX - window.scrollX, pageY - window.scrollY);

            event.preventDefault();

            me.trigger(element, {
                clientX      : pageX,
                clientY      : pageY,
                element,
                eventPath    : _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].getPathFromElement(target),
                originalEvent: event,
                path         : me.startEvent.path || me.startEvent.composedPath(),
                target,
                type         : 'drag:end'
            });

            document.removeEventListener('contextmenu', preventDefault, true);
            document.removeEventListener('touchmove',   me.onTouchMove);

            Object.assign(me, {
                currentElement: null,
                dragging      : false,
                startEvent    : null
            });
        }

        me.dragging = false;
    }

    /**
     *
     * @param {TouchEvent} event
     */
    onTouchMove(event) {
        let me = this;

        if (me.dragging) {
            const {pageX, pageY} = _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].getTouchCoords(event);

            let element = me.currentElement,
                target  = document.elementFromPoint(pageX - window.scrollX, pageY - window.scrollY);

            me.trigger(element, {
                clientX      : pageX,
                clientY      : pageY,
                element,
                eventPath    : _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].getPathFromElement(target),
                originalEvent: event,
                path         : me.startEvent.path || me.startEvent.composedPath(),
                target,
                type         : 'drag:move'
            });
        }
    }

    /**
     *
     * @param {TouchEvent} event
     */
    onTouchStart(event) {
        let me     = this,
            target = _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].testPathInclusion(event, me.dragTargetClasses);

        if (target) {
            const {pageX, pageY} = _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].getTouchCoords(event);

            Object.assign(me, {
                currentElement: target.node,
                pageX         : pageX,
                pageY         : pageY,
                startEvent    : event,
                touchStartTime: Date.now()
            });

            document.addEventListener('dragstart',   preventDefault);
            document.addEventListener('touchcancel', me.onTouchEnd);
            document.addEventListener('touchend',    me.onTouchEnd);
            document.addEventListener('touchmove',   me.onDistanceChange, {cancelable: true});

            me.tapTimeout = setTimeout(() => {
                me.onDistanceChange({touches: [{pageX: me.pageX, pageY: me.pageY}]});
            }, me.delay);
        }
    }

    /**
     *
     */
    startDrag() {
        let me         = this,
            element    = me.currentElement,
            startEvent = me.startEvent,
            touch      = _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].getTouchCoords(me.startEvent);

        me.trigger(element, {
            clientX      : touch.pageX,
            clientY      : touch.pageY,
            element,
            originalEvent: startEvent,
            path         : startEvent.path || startEvent.composedPath(),
            target       : startEvent.target,
            type         : 'drag:start'
        });

        me.dragging = true; // todo

        if (me.dragging) {
            document.addEventListener('contextmenu', preventDefault, true);
            document.addEventListener('touchmove',   me.onTouchMove);
        }

        preventScrolling = me.dragging;
    }
}

function preventDefault(event) {
    event.preventDefault();
    event.stopPropagation();
}

Neo.applyClassConfig(Touch);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9kcmFnZ2FibGUvc2Vuc29yL0Jhc2UubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9tYWluL2RyYWdnYWJsZS9zZW5zb3IvVG91Y2gubWpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBOEM7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsc0RBQVE7QUFDM0Isd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsaUJBQWlCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsV0FBVztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixXQUFXO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFlBQVk7QUFDM0IsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDM0VBO0FBQUE7QUFBQTtBQUFBO0FBQW1DO0FBQ1M7O0FBRTVDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEdBQUcsaUNBQWlDOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixpREFBSTtBQUN4Qix3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLGtCQUFrQjtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsYUFBYSxNQUFNLHNEQUFTO0FBQy9DLHNDQUFzQyxzREFBUztBQUMvQztBQUNBLHNDQUFzQyxzREFBUzs7QUFFL0MsK0JBQStCLGFBQWE7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFdBQVc7QUFDMUI7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGFBQWEsR0FBRyxzREFBUzs7QUFFNUM7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixzREFBUztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFdBQVc7QUFDMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGFBQWEsR0FBRyxzREFBUzs7QUFFNUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixzREFBUztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFdBQVc7QUFDMUI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHNEQUFTOztBQUU5QjtBQUNBLG1CQUFtQixhQUFhLEdBQUcsc0RBQVM7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsMkVBQTJFLGlCQUFpQjs7QUFFNUY7QUFDQSxxQ0FBcUMsV0FBVyxpQ0FBaUMsRUFBRTtBQUNuRixhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixzREFBUzs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQsMkJBQTJCOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoic3JjL21haW4vZHJhZ2dhYmxlL3NlbnNvci9Ub3VjaC5tanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29yZUJhc2UgZnJvbSAnLi4vLi4vLi4vY29yZS9CYXNlLm1qcyc7XG5cbi8qKlxuICogQWJzdHJhY3QgYmFzZSBjbGFzcyBmb3Igb3RoZXIgc2Vuc29yc1xuICogQGNsYXNzIE5lby5tYWluLmRyYWdnYWJsZS5zZW5zb3IuQmFzZVxuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICovXG5jbGFzcyBCYXNlIGV4dGVuZHMgQ29yZUJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8ubWFpbi5kcmFnZ2FibGUuc2Vuc29yLkJhc2UnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5tYWluLmRyYWdnYWJsZS5zZW5zb3IuQmFzZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtIVE1MRWxlbWVudHxudWxsfSBjdXJyZW50RWxlbWVudD1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGN1cnJlbnRFbGVtZW50OiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGRyYWdUYXJnZXRDbGFzc2VzPVsnbmVvLWRyYWdnYWJsZScsJ25lby1yZXNpemFibGUnXVxuICAgICAgICAgKi9cbiAgICAgICAgZHJhZ1RhcmdldENsYXNzZXM6IFsnbmVvLWRyYWdnYWJsZScsICduZW8tcmVzaXphYmxlJ10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBpc0RyYWdnaW5nPWZhbHNlXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGlzRHJhZ2dpbmc6IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7RXZlbnR8bnVsbH0gbGFzdEV2ZW50PW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbGFzdEV2ZW50OiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7RXZlbnR8bnVsbH0gc3RhcnRFdmVudD1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHN0YXJ0RXZlbnQ6IG51bGxcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkNvbnN0cnVjdGVkKCkge1xuICAgICAgICB0aGlzLmF0dGFjaCgpO1xuICAgICAgICBzdXBlci5vbkNvbnN0cnVjdGVkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoZXMgc2Vuc29ycyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIERPTVxuICAgICAqL1xuICAgIGF0dGFjaCgpIHt9XG5cbiAgICAvKipcbiAgICAgKiBEZXRhY2hlcyBzZW5zb3JzIGV2ZW50IGxpc3RlbmVycyBmcm9tIHRoZSBET01cbiAgICAgKi9cbiAgICBkZXRhY2goKSB7fVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgYSBjdXN0b20gZXZlbnQgb24gdGhlIHRhcmdldCBlbGVtZW50XG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIEVsZW1lbnQgdG8gdHJpZ2dlciBldmVudCBvblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzZW5zb3JFdmVudCAtIFNlbnNvciBldmVudCB0byB0cmlnZ2VyXG4gICAgICogQHJldHVybnMge0V2ZW50fVxuICAgICAqL1xuICAgIHRyaWdnZXIoZWxlbWVudCwgc2Vuc29yRXZlbnQpIHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICAgICAgZXZlbnQuZGV0YWlsID0gc2Vuc29yRXZlbnQ7XG4gICAgICAgIGV2ZW50LmluaXRFdmVudChzZW5zb3JFdmVudC50eXBlLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgdGhpcy5sYXN0RXZlbnQgPSBzZW5zb3JFdmVudDtcblxuICAgICAgICByZXR1cm4gc2Vuc29yRXZlbnQ7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhCYXNlKTtcblxuZXhwb3J0IHtCYXNlIGFzIGRlZmF1bHR9OyIsImltcG9ydCBCYXNlICAgICAgZnJvbSAnLi9CYXNlLm1qcyc7XG5pbXBvcnQgRG9tRXZlbnRzIGZyb20gJy4uLy4uL0RvbUV2ZW50cy5tanMnO1xuXG5sZXQgcHJldmVudFNjcm9sbGluZyA9IGZhbHNlO1xuXG4vLyBXZWJLaXQgcmVxdWlyZXMgY2FuY2VsYWJsZSB0b3VjaG1vdmUgZXZlbnRzIHRvIGJlIGFkZGVkIGFzIGVhcmx5IGFzIHBvc3NpYmxlXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZXZlbnQgPT4ge1xuICAgIGlmICghcHJldmVudFNjcm9sbGluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gUHJldmVudCBzY3JvbGxpbmdcbiAgICBpZiAoZXZlbnQuY2FuY2VsYWJsZSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn0sIHtjYW5jZWxhYmxlOiB0cnVlLCBwYXNzaXZlOiBmYWxzZX0pO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8ubWFpbi5kcmFnZ2FibGUuc2Vuc29yLlRvdWNoXG4gKiBAZXh0ZW5kcyBOZW8ubWFpbi5kcmFnZ2FibGUuc2Vuc29yLkJhc2VcbiAqL1xuY2xhc3MgVG91Y2ggZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLm1haW4uZHJhZ2dhYmxlLnNlbnNvci5Ub3VjaCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLm1haW4uZHJhZ2dhYmxlLnNlbnNvci5Ub3VjaCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IGRlbGF5PTIwMFxuICAgICAgICAgKi9cbiAgICAgICAgZGVsYXk6IDIwMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gbWluRGlzdGFuY2U9MFxuICAgICAgICAgKi9cbiAgICAgICAgbWluRGlzdGFuY2U6IDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8bnVsbH0gcGFnZVg9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBwYWdlWDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcnxudWxsfSBwYWdlWT1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHBhZ2VZOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfG51bGx9IHRhcFRpbWVvdXQ9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgdGFwVGltZW91dDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gdG91Y2hTdGFydFRpbWU9MFxuICAgICAgICAgKi9cbiAgICAgICAgdG91Y2hTdGFydFRpbWU6IDBcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG4gICAgICAgIE5lby5iaW5kTWV0aG9kcyh0aGlzLCBbJ29uRGlzdGFuY2VDaGFuZ2UnLCAnb25Ub3VjaEVuZCcsICdvblRvdWNoTW92ZScsICdvblRvdWNoU3RhcnQnLCAnc3RhcnREcmFnJ10pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEF0dGFjaGVzIHNlbnNvcnMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBET01cbiAgICAgKi9cbiAgICBhdHRhY2goKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0YWNoZXMgc2Vuc29ycyBldmVudCBsaXN0ZW5lcnMgZnJvbSB0aGUgRE9NXG4gICAgICovXG4gICAgZGV0YWNoKCkge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vblRvdWNoU3RhcnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVjdCBjaGFuZ2UgaW4gZGlzdGFuY2UsIHN0YXJ0aW5nIGRyYWcgd2hlbiBib3RoIGRlbGF5IGFuZCBkaXN0YW5jZSByZXF1aXJlbWVudHMgYXJlIG1ldFxuICAgICAqIEBwYXJhbSB7VG91Y2hFdmVudHxPYmplY3R9IGV2ZW50IC0gT2JqZWN0IGluIGNhc2UgaXQgZG9lcyBnZXQgdHJpZ2dlciB2aWEgdGhlIHRhcFRpbWVvdXRcbiAgICAgKi9cbiAgICBvbkRpc3RhbmNlQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKG1lLmN1cnJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCB7cGFnZVgsIHBhZ2VZfSAgICA9IERvbUV2ZW50cy5nZXRUb3VjaENvb3JkcyhldmVudCksXG4gICAgICAgICAgICAgICAgICBzdGFydCAgICAgICAgICAgICA9IERvbUV2ZW50cy5nZXRUb3VjaENvb3JkcyhtZS5zdGFydEV2ZW50KSxcbiAgICAgICAgICAgICAgICAgIHRpbWVFbGFwc2VkICAgICAgID0gRGF0ZS5ub3coKSAtIG1lLnRvdWNoU3RhcnRUaW1lLFxuICAgICAgICAgICAgICAgICAgZGlzdGFuY2VUcmF2ZWxsZWQgPSBEb21FdmVudHMuZ2V0RGlzdGFuY2Uoc3RhcnQucGFnZVgsIHN0YXJ0LnBhZ2VZLCBwYWdlWCwgcGFnZVkpIHx8IDA7XG5cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obWUsIHtwYWdlWCwgcGFnZVl9KTtcblxuICAgICAgICAgICAgaWYgKHRpbWVFbGFwc2VkID49IG1lLmRlbGF5ICYmIGRpc3RhbmNlVHJhdmVsbGVkID49IG1lLm1pbkRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KG1lLnRhcFRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG1lLm9uRGlzdGFuY2VDaGFuZ2UpO1xuICAgICAgICAgICAgICAgIG1lLnN0YXJ0RHJhZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1RvdWNoRXZlbnR9IGV2ZW50XG4gICAgICovXG4gICAgb25Ub3VjaEVuZChldmVudCkge1xuICAgICAgICBwcmV2ZW50U2Nyb2xsaW5nID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBjbGVhclRpbWVvdXQobWUudGFwVGltZW91dCk7XG5cbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgICBwcmV2ZW50RGVmYXVsdCk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgbWUub25Ub3VjaEVuZCk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgICAgbWUub25Ub3VjaEVuZCk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsICAgbWUub25EaXN0YW5jZUNoYW5nZSk7XG5cbiAgICAgICAgaWYgKG1lLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICBjb25zdCB7cGFnZVgsIHBhZ2VZfSA9IERvbUV2ZW50cy5nZXRUb3VjaENvb3JkcyhldmVudCk7XG5cbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gbWUuY3VycmVudEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgdGFyZ2V0ICA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQocGFnZVggLSB3aW5kb3cuc2Nyb2xsWCwgcGFnZVkgLSB3aW5kb3cuc2Nyb2xsWSk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIG1lLnRyaWdnZXIoZWxlbWVudCwge1xuICAgICAgICAgICAgICAgIGNsaWVudFggICAgICA6IHBhZ2VYLFxuICAgICAgICAgICAgICAgIGNsaWVudFkgICAgICA6IHBhZ2VZLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgZXZlbnRQYXRoICAgIDogRG9tRXZlbnRzLmdldFBhdGhGcm9tRWxlbWVudCh0YXJnZXQpLFxuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIHBhdGggICAgICAgICA6IG1lLnN0YXJ0RXZlbnQucGF0aCB8fCBtZS5zdGFydEV2ZW50LmNvbXBvc2VkUGF0aCgpLFxuICAgICAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgICAgICB0eXBlICAgICAgICAgOiAnZHJhZzplbmQnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCBwcmV2ZW50RGVmYXVsdCwgdHJ1ZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCAgIG1lLm9uVG91Y2hNb3ZlKTtcblxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihtZSwge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50OiBudWxsLFxuICAgICAgICAgICAgICAgIGRyYWdnaW5nICAgICAgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdGFydEV2ZW50ICAgIDogbnVsbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBtZS5kcmFnZ2luZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtUb3VjaEV2ZW50fSBldmVudFxuICAgICAqL1xuICAgIG9uVG91Y2hNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKG1lLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICBjb25zdCB7cGFnZVgsIHBhZ2VZfSA9IERvbUV2ZW50cy5nZXRUb3VjaENvb3JkcyhldmVudCk7XG5cbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gbWUuY3VycmVudEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgdGFyZ2V0ICA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQocGFnZVggLSB3aW5kb3cuc2Nyb2xsWCwgcGFnZVkgLSB3aW5kb3cuc2Nyb2xsWSk7XG5cbiAgICAgICAgICAgIG1lLnRyaWdnZXIoZWxlbWVudCwge1xuICAgICAgICAgICAgICAgIGNsaWVudFggICAgICA6IHBhZ2VYLFxuICAgICAgICAgICAgICAgIGNsaWVudFkgICAgICA6IHBhZ2VZLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgZXZlbnRQYXRoICAgIDogRG9tRXZlbnRzLmdldFBhdGhGcm9tRWxlbWVudCh0YXJnZXQpLFxuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIHBhdGggICAgICAgICA6IG1lLnN0YXJ0RXZlbnQucGF0aCB8fCBtZS5zdGFydEV2ZW50LmNvbXBvc2VkUGF0aCgpLFxuICAgICAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgICAgICB0eXBlICAgICAgICAgOiAnZHJhZzptb3ZlJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VG91Y2hFdmVudH0gZXZlbnRcbiAgICAgKi9cbiAgICBvblRvdWNoU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgbGV0IG1lICAgICA9IHRoaXMsXG4gICAgICAgICAgICB0YXJnZXQgPSBEb21FdmVudHMudGVzdFBhdGhJbmNsdXNpb24oZXZlbnQsIG1lLmRyYWdUYXJnZXRDbGFzc2VzKTtcblxuICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICBjb25zdCB7cGFnZVgsIHBhZ2VZfSA9IERvbUV2ZW50cy5nZXRUb3VjaENvb3JkcyhldmVudCk7XG5cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obWUsIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50RWxlbWVudDogdGFyZ2V0Lm5vZGUsXG4gICAgICAgICAgICAgICAgcGFnZVggICAgICAgICA6IHBhZ2VYLFxuICAgICAgICAgICAgICAgIHBhZ2VZICAgICAgICAgOiBwYWdlWSxcbiAgICAgICAgICAgICAgICBzdGFydEV2ZW50ICAgIDogZXZlbnQsXG4gICAgICAgICAgICAgICAgdG91Y2hTdGFydFRpbWU6IERhdGUubm93KClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAgIHByZXZlbnREZWZhdWx0KTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgbWUub25Ub3VjaEVuZCk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsICAgIG1lLm9uVG91Y2hFbmQpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgICBtZS5vbkRpc3RhbmNlQ2hhbmdlLCB7Y2FuY2VsYWJsZTogdHJ1ZX0pO1xuXG4gICAgICAgICAgICBtZS50YXBUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbWUub25EaXN0YW5jZUNoYW5nZSh7dG91Y2hlczogW3twYWdlWDogbWUucGFnZVgsIHBhZ2VZOiBtZS5wYWdlWX1dfSk7XG4gICAgICAgICAgICB9LCBtZS5kZWxheSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIHN0YXJ0RHJhZygpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgZWxlbWVudCAgICA9IG1lLmN1cnJlbnRFbGVtZW50LFxuICAgICAgICAgICAgc3RhcnRFdmVudCA9IG1lLnN0YXJ0RXZlbnQsXG4gICAgICAgICAgICB0b3VjaCAgICAgID0gRG9tRXZlbnRzLmdldFRvdWNoQ29vcmRzKG1lLnN0YXJ0RXZlbnQpO1xuXG4gICAgICAgIG1lLnRyaWdnZXIoZWxlbWVudCwge1xuICAgICAgICAgICAgY2xpZW50WCAgICAgIDogdG91Y2gucGFnZVgsXG4gICAgICAgICAgICBjbGllbnRZICAgICAgOiB0b3VjaC5wYWdlWSxcbiAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBzdGFydEV2ZW50LFxuICAgICAgICAgICAgcGF0aCAgICAgICAgIDogc3RhcnRFdmVudC5wYXRoIHx8IHN0YXJ0RXZlbnQuY29tcG9zZWRQYXRoKCksXG4gICAgICAgICAgICB0YXJnZXQgICAgICAgOiBzdGFydEV2ZW50LnRhcmdldCxcbiAgICAgICAgICAgIHR5cGUgICAgICAgICA6ICdkcmFnOnN0YXJ0J1xuICAgICAgICB9KTtcblxuICAgICAgICBtZS5kcmFnZ2luZyA9IHRydWU7IC8vIHRvZG9cblxuICAgICAgICBpZiAobWUuZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgcHJldmVudERlZmF1bHQsIHRydWUpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgICBtZS5vblRvdWNoTW92ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBwcmV2ZW50U2Nyb2xsaW5nID0gbWUuZHJhZ2dpbmc7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwcmV2ZW50RGVmYXVsdChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKFRvdWNoKTtcblxuZXhwb3J0IHtUb3VjaCBhcyBkZWZhdWx0fTsiXSwic291cmNlUm9vdCI6IiJ9