(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src/main/addon/DragDrop-mjs"],{

/***/ "./node_modules/neo.mjs/src/main/addon/DragDrop.mjs":
/*!**********************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/addon/DragDrop.mjs ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");
/* harmony import */ var _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DomEvents.mjs */ "./node_modules/neo.mjs/src/main/DomEvents.mjs");



/**
 * @class Neo.main.addon.DragDrop
 * @extends Neo.core.Base
 * @singleton
 */
class DragDrop extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {
        return {
            /**
             * @member {String} className='Neo.main.addon.DragDrop'
             * @protected
             */
            className: 'Neo.main.addon.DragDrop',
            /**
             * @member {DOMRect|null} scrollContainerRect=null
             */
            boundaryContainerRect: null,
            /**
             * @member {HTMLElement|null} dragProxyElement=null
             * @protected
             */
            dragProxyElement: null,
            /**
             * @member {DOMRect|null} dragProxyRect=null
             */
            dragProxyRect: null,
            /**
             * @member {Number} clientX=0
             */
            clientX: 0,
            /**
             * @member {Number} clientY=0
             */
            clientY: 0,
            /**
             * @member {Number} initialScrollLeft=0
             */
            initialScrollLeft: 0,
            /**
             * @member {Number} initialScrollTop=0
             */
            initialScrollTop: 0,
            /**
             * @member {Number} offsetX=0
             */
            offsetX: 0,
            /**
             * @member {Number} offsetY=0
             */
            offsetY: 0,
            /**
             * Remote method access for other workers
             * @member {Object} remote
             * @protected
             */
            remote: {
                app: [
                    'setBoundaryContainer',
                    'setDragProxyElement',
                    'setScrollContainer',
                    'setScrollFactorLeft',
                    'setScrollFactorTop'
                ]
            },
            /**
             * @member {HTMLElement|null} scrollContainerElement=null
             */
            scrollContainerElement: null,
            /**
             * @member {DOMRect|null} scrollContainerRect=null
             */
            scrollContainerRect: null,
            /**
             * @member {Number} scrollFactorLeft=1
             */
            scrollFactorLeft: 1,
            /**
             * @member {Number} scrollFactorTop=1
             */
            scrollFactorTop: 1,
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

        let imports = []

        this.addGlobalEventListeners();

        if (Neo.config.hasTouchEvents) {
            imports.push(__webpack_require__.e(/*! import() | src/main/draggable/sensor/Touch.mjs */ "src/main/draggable/sensor/Touch.mjs").then(__webpack_require__.bind(null, /*! ../draggable/sensor/Touch.mjs */ "./node_modules/neo.mjs/src/main/draggable/sensor/Touch.mjs")));
        } else {
            imports.push(__webpack_require__.e(/*! import() | src/main/draggable/sensor/Mouse.mjs */ "src/main/draggable/sensor/Mouse.mjs").then(__webpack_require__.bind(null, /*! ../draggable/sensor/Mouse.mjs */ "./node_modules/neo.mjs/src/main/draggable/sensor/Mouse.mjs")));
        }

        Promise.all(imports).then(modules => {
            // create the Touch or MouseSensor
            Neo.create({
                module: modules[0].default
            });
        });
    }

    /**
     *
     */
    addGlobalEventListeners() {
        let me = this;

        document.addEventListener('drag:end',   me.onDragEnd  .bind(me), true);
        document.addEventListener('drag:move',  me.onDragMove .bind(me), true);
        document.addEventListener('drag:start', me.onDragStart.bind(me), true);
    }

    /**
     *
     * @param {Event} event
     * @returns {Object}
     */
    getEventData(event) {
        const path = event.path || event.composedPath();

        const e = {
            ..._DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].getEventData(event.detail.originalEvent),
            clientX: event.detail.clientX,
            clientY: event.detail.clientY
        };

        if (event.detail.eventPath) {
            e.targetPath = event.detail.eventPath.map(e => _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].getTargetData(e));
        } else {
            e.targetPath = e.path || e.composedPath();
        }

        e.path = path.map(e => _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].getTargetData(e));

        return e;
    }

    /**
     *
     * @param {Object} event
     */
    onDragEnd(event) {
        let me = this;

        Object.assign(me, {
            boundaryContainerRect : null,
            dragProxyElement      : null,
            dragProxyRect         : null,
            initialScrollLeft     : 0,
            initialScrollTop      : 0,
            scrollContainerElement: null,
            scrollContainerRect   : null,
            setScrollFactorLeft   : 1,
            scrollFactorTop       : 1
        });

        _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].sendMessageToApp({
            ...me.getEventData(event),
            type: 'drag:end'
        });
    }

    /**
     *
     * @param {Object} event
     */
    onDragMove(event) {
        let me        = this,
            proxyRect = me.dragProxyRect,
            rect      = me.boundaryContainerRect,
            data, left, top;

        if (me.scrollContainerElement) {
            data = me.scrollContainer({
                clientX: event.detail.clientX,
                clientY: event.detail.clientY
            });

            event.detail.clientX = data.clientX;
            event.detail.clientY = data.clientY;
        }

        if (me.dragProxyElement) {
            left = event.detail.clientX - me.offsetX;
            top  = event.detail.clientY - me.offsetY;

            if (rect) {
                if (left < rect.left) {
                    left = rect.left;
                } else if (left > rect.right - proxyRect.width) {
                    left = rect.right - proxyRect.width;
                }

                if (top < rect.top) {
                    top = rect.top;
                } else if (top > rect.bottom - proxyRect.height) {
                    top = rect.bottom - proxyRect.height
                }
            }

            me.dragProxyElement.style.left = `${left}px`;
            me.dragProxyElement.style.top  = `${top}px`;
        } else {
            _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].sendMessageToApp({
                ...me.getEventData(event),
                type: 'drag:move'
            });
        }
    }

    /**
     *
     * @param {Object} event
     */
    onDragStart(event) {
        let me   = this,
            rect = me.dragProxyRect = event.target.getBoundingClientRect();

        me.offsetX = event.detail.clientX - rect.left;
        me.offsetY = event.detail.clientY - rect.top;

        _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].sendMessageToApp({
            ...this.getEventData(event),
            type: 'drag:start'
        });
    }

    /**
     *
     * @param {Object} data
     * @param {Number} data.clientX
     * @param {Number} data.clientY
     * @returns {Object}
     */
    scrollContainer(data) {
        let me     = this,
            deltaX = data.clientX - me.clientX,
            deltaY = data.clientY - me.clientY,
            el     = me.scrollContainerElement,
            gap    = 250,
            rect   = me.scrollContainerRect;

        me.clientX =  data.clientX;
        me.clientY =  data.clientY;

        if (
            (deltaX < 0 && data.clientX < rect.left  + gap) ||
            (deltaX > 0 && data.clientX > rect.right - gap)
        ) {
            el.scrollLeft += (deltaX * me.scrollFactorLeft);
        }

        if (
            (deltaY < 0 && data.clientY < rect.top    + gap) ||
            (deltaY > 0 && data.clientY > rect.bottom - gap)
        ) {
            el.scrollTop += (deltaY * me.scrollFactorTop);
        }

        return {
            clientX: me.clientX + el.scrollLeft - me.initialScrollLeft,
            clientY: me.clientY + el.scrollTop  - me.initialScrollTop
        };
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.id
     */
    setBoundaryContainer(data) {
        let me   = this,
            node = data.id === 'document.body' ? document.body : document.getElementById(data.id);

        me.boundaryContainerRect = node.getBoundingClientRect();
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.id
     */
    setDragProxyElement(data) {
        this.dragProxyElement = document.getElementById(data.id);
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.id
     */
    setScrollContainer(data) {
        let me   = this,
            node = data.id === 'document.body' ? document.body : document.getElementById(data.id);

        Object.assign(me, {
            scrollContainerElement: node,
            scrollContainerRect   : node.getBoundingClientRect(),
            initialScrollLeft     : node.scrollLeft,
            initialScrollTop      : node.scrollTop
        });
    }

    /**
     *
     * @param {Object} data
     * @param {Number} data.value
     */
    setScrollFactorLeft(data) {
        this.scrollFactorLeft = data.value;
    }

    /**
     *
     * @param {Object} data
     * @param {Number} data.value
     */
    setScrollFactorTop(data) {
        this.scrollFactorTop = data.value;
    }
}

Neo.applyClassConfig(DragDrop);

let instance = Neo.create(DragDrop);

Neo.applyToGlobalNs(instance);

/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9hZGRvbi9EcmFnRHJvcC5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUE0QztBQUNIOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNEQUFJO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGFBQWE7QUFDckM7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixhQUFhO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixhQUFhO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EseUJBQXlCLDBQQUFxRztBQUM5SCxTQUFTO0FBQ1QseUJBQXlCLDBQQUFxRztBQUM5SDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLHNEQUFTO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJEQUEyRCxzREFBUztBQUNwRSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQSwrQkFBK0Isc0RBQVM7O0FBRXhDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVULFFBQVEsc0RBQVM7QUFDakI7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQSxnREFBZ0QsS0FBSztBQUNyRCxnREFBZ0QsSUFBSTtBQUNwRCxTQUFTO0FBQ1QsWUFBWSxzREFBUztBQUNyQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFFBQVEsc0RBQVM7QUFDakI7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRWUsdUVBQVEsRSIsImZpbGUiOiJzcmMvbWFpbi9hZGRvbi9EcmFnRHJvcC1tanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSAgICAgIGZyb20gJy4uLy4uL2NvcmUvQmFzZS5tanMnO1xuaW1wb3J0IERvbUV2ZW50cyBmcm9tICcuLi9Eb21FdmVudHMubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgTmVvLm1haW4uYWRkb24uRHJhZ0Ryb3BcbiAqIEBleHRlbmRzIE5lby5jb3JlLkJhc2VcbiAqIEBzaW5nbGV0b25cbiAqL1xuY2xhc3MgRHJhZ0Ryb3AgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLm1haW4uYWRkb24uRHJhZ0Ryb3AnXG4gICAgICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ05lby5tYWluLmFkZG9uLkRyYWdEcm9wJyxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1lbWJlciB7RE9NUmVjdHxudWxsfSBzY3JvbGxDb250YWluZXJSZWN0PW51bGxcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgYm91bmRhcnlDb250YWluZXJSZWN0OiBudWxsLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAbWVtYmVyIHtIVE1MRWxlbWVudHxudWxsfSBkcmFnUHJveHlFbGVtZW50PW51bGxcbiAgICAgICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZHJhZ1Byb3h5RWxlbWVudDogbnVsbCxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1lbWJlciB7RE9NUmVjdHxudWxsfSBkcmFnUHJveHlSZWN0PW51bGxcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZHJhZ1Byb3h5UmVjdDogbnVsbCxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBjbGllbnRYPTBcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY2xpZW50WDogMCxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBjbGllbnRZPTBcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY2xpZW50WTogMCxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBpbml0aWFsU2Nyb2xsTGVmdD0wXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGluaXRpYWxTY3JvbGxMZWZ0OiAwLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IGluaXRpYWxTY3JvbGxUb3A9MFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpbml0aWFsU2Nyb2xsVG9wOiAwLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IG9mZnNldFg9MFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBvZmZzZXRYOiAwLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IG9mZnNldFk9MFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBvZmZzZXRZOiAwLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZW1vdGUgbWV0aG9kIGFjY2VzcyBmb3Igb3RoZXIgd29ya2Vyc1xuICAgICAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSByZW1vdGVcbiAgICAgICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcmVtb3RlOiB7XG4gICAgICAgICAgICAgICAgYXBwOiBbXG4gICAgICAgICAgICAgICAgICAgICdzZXRCb3VuZGFyeUNvbnRhaW5lcicsXG4gICAgICAgICAgICAgICAgICAgICdzZXREcmFnUHJveHlFbGVtZW50JyxcbiAgICAgICAgICAgICAgICAgICAgJ3NldFNjcm9sbENvbnRhaW5lcicsXG4gICAgICAgICAgICAgICAgICAgICdzZXRTY3JvbGxGYWN0b3JMZWZ0JyxcbiAgICAgICAgICAgICAgICAgICAgJ3NldFNjcm9sbEZhY3RvclRvcCdcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAbWVtYmVyIHtIVE1MRWxlbWVudHxudWxsfSBzY3JvbGxDb250YWluZXJFbGVtZW50PW51bGxcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc2Nyb2xsQ29udGFpbmVyRWxlbWVudDogbnVsbCxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1lbWJlciB7RE9NUmVjdHxudWxsfSBzY3JvbGxDb250YWluZXJSZWN0PW51bGxcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc2Nyb2xsQ29udGFpbmVyUmVjdDogbnVsbCxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBzY3JvbGxGYWN0b3JMZWZ0PTFcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc2Nyb2xsRmFjdG9yTGVmdDogMSxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBzY3JvbGxGYWN0b3JUb3A9MVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzY3JvbGxGYWN0b3JUb3A6IDEsXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHNpbmdsZXRvbj10cnVlXG4gICAgICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHNpbmdsZXRvbjogdHJ1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIGxldCBpbXBvcnRzID0gW11cblxuICAgICAgICB0aGlzLmFkZEdsb2JhbEV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAgICAgaWYgKE5lby5jb25maWcuaGFzVG91Y2hFdmVudHMpIHtcbiAgICAgICAgICAgIGltcG9ydHMucHVzaChpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogJ3NyYy9tYWluL2RyYWdnYWJsZS9zZW5zb3IvVG91Y2gubWpzJyAqLyAnLi4vZHJhZ2dhYmxlL3NlbnNvci9Ub3VjaC5tanMnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbXBvcnRzLnB1c2goaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6ICdzcmMvbWFpbi9kcmFnZ2FibGUvc2Vuc29yL01vdXNlLm1qcycgKi8gJy4uL2RyYWdnYWJsZS9zZW5zb3IvTW91c2UubWpzJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgUHJvbWlzZS5hbGwoaW1wb3J0cykudGhlbihtb2R1bGVzID0+IHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgVG91Y2ggb3IgTW91c2VTZW5zb3JcbiAgICAgICAgICAgIE5lby5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIG1vZHVsZTogbW9kdWxlc1swXS5kZWZhdWx0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBhZGRHbG9iYWxFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnOmVuZCcsICAgbWUub25EcmFnRW5kICAuYmluZChtZSksIHRydWUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnOm1vdmUnLCAgbWUub25EcmFnTW92ZSAuYmluZChtZSksIHRydWUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnOnN0YXJ0JywgbWUub25EcmFnU3RhcnQuYmluZChtZSksIHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldEV2ZW50RGF0YShldmVudCkge1xuICAgICAgICBjb25zdCBwYXRoID0gZXZlbnQucGF0aCB8fCBldmVudC5jb21wb3NlZFBhdGgoKTtcblxuICAgICAgICBjb25zdCBlID0ge1xuICAgICAgICAgICAgLi4uRG9tRXZlbnRzLmdldEV2ZW50RGF0YShldmVudC5kZXRhaWwub3JpZ2luYWxFdmVudCksXG4gICAgICAgICAgICBjbGllbnRYOiBldmVudC5kZXRhaWwuY2xpZW50WCxcbiAgICAgICAgICAgIGNsaWVudFk6IGV2ZW50LmRldGFpbC5jbGllbnRZXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGV2ZW50LmRldGFpbC5ldmVudFBhdGgpIHtcbiAgICAgICAgICAgIGUudGFyZ2V0UGF0aCA9IGV2ZW50LmRldGFpbC5ldmVudFBhdGgubWFwKGUgPT4gRG9tRXZlbnRzLmdldFRhcmdldERhdGEoZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZS50YXJnZXRQYXRoID0gZS5wYXRoIHx8IGUuY29tcG9zZWRQYXRoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBlLnBhdGggPSBwYXRoLm1hcChlID0+IERvbUV2ZW50cy5nZXRUYXJnZXREYXRhKGUpKTtcblxuICAgICAgICByZXR1cm4gZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG9uRHJhZ0VuZChldmVudCkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24obWUsIHtcbiAgICAgICAgICAgIGJvdW5kYXJ5Q29udGFpbmVyUmVjdCA6IG51bGwsXG4gICAgICAgICAgICBkcmFnUHJveHlFbGVtZW50ICAgICAgOiBudWxsLFxuICAgICAgICAgICAgZHJhZ1Byb3h5UmVjdCAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgIGluaXRpYWxTY3JvbGxMZWZ0ICAgICA6IDAsXG4gICAgICAgICAgICBpbml0aWFsU2Nyb2xsVG9wICAgICAgOiAwLFxuICAgICAgICAgICAgc2Nyb2xsQ29udGFpbmVyRWxlbWVudDogbnVsbCxcbiAgICAgICAgICAgIHNjcm9sbENvbnRhaW5lclJlY3QgICA6IG51bGwsXG4gICAgICAgICAgICBzZXRTY3JvbGxGYWN0b3JMZWZ0ICAgOiAxLFxuICAgICAgICAgICAgc2Nyb2xsRmFjdG9yVG9wICAgICAgIDogMVxuICAgICAgICB9KTtcblxuICAgICAgICBEb21FdmVudHMuc2VuZE1lc3NhZ2VUb0FwcCh7XG4gICAgICAgICAgICAuLi5tZS5nZXRFdmVudERhdGEoZXZlbnQpLFxuICAgICAgICAgICAgdHlwZTogJ2RyYWc6ZW5kJ1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG9uRHJhZ01vdmUoZXZlbnQpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBwcm94eVJlY3QgPSBtZS5kcmFnUHJveHlSZWN0LFxuICAgICAgICAgICAgcmVjdCAgICAgID0gbWUuYm91bmRhcnlDb250YWluZXJSZWN0LFxuICAgICAgICAgICAgZGF0YSwgbGVmdCwgdG9wO1xuXG4gICAgICAgIGlmIChtZS5zY3JvbGxDb250YWluZXJFbGVtZW50KSB7XG4gICAgICAgICAgICBkYXRhID0gbWUuc2Nyb2xsQ29udGFpbmVyKHtcbiAgICAgICAgICAgICAgICBjbGllbnRYOiBldmVudC5kZXRhaWwuY2xpZW50WCxcbiAgICAgICAgICAgICAgICBjbGllbnRZOiBldmVudC5kZXRhaWwuY2xpZW50WVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGV2ZW50LmRldGFpbC5jbGllbnRYID0gZGF0YS5jbGllbnRYO1xuICAgICAgICAgICAgZXZlbnQuZGV0YWlsLmNsaWVudFkgPSBkYXRhLmNsaWVudFk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWUuZHJhZ1Byb3h5RWxlbWVudCkge1xuICAgICAgICAgICAgbGVmdCA9IGV2ZW50LmRldGFpbC5jbGllbnRYIC0gbWUub2Zmc2V0WDtcbiAgICAgICAgICAgIHRvcCAgPSBldmVudC5kZXRhaWwuY2xpZW50WSAtIG1lLm9mZnNldFk7XG5cbiAgICAgICAgICAgIGlmIChyZWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGxlZnQgPCByZWN0LmxlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IHJlY3QubGVmdDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxlZnQgPiByZWN0LnJpZ2h0IC0gcHJveHlSZWN0LndpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSByZWN0LnJpZ2h0IC0gcHJveHlSZWN0LndpZHRoO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0b3AgPCByZWN0LnRvcCkge1xuICAgICAgICAgICAgICAgICAgICB0b3AgPSByZWN0LnRvcDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRvcCA+IHJlY3QuYm90dG9tIC0gcHJveHlSZWN0LmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICB0b3AgPSByZWN0LmJvdHRvbSAtIHByb3h5UmVjdC5oZWlnaHRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1lLmRyYWdQcm94eUVsZW1lbnQuc3R5bGUubGVmdCA9IGAke2xlZnR9cHhgO1xuICAgICAgICAgICAgbWUuZHJhZ1Byb3h5RWxlbWVudC5zdHlsZS50b3AgID0gYCR7dG9wfXB4YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIERvbUV2ZW50cy5zZW5kTWVzc2FnZVRvQXBwKHtcbiAgICAgICAgICAgICAgICAuLi5tZS5nZXRFdmVudERhdGEoZXZlbnQpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdkcmFnOm1vdmUnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgb25EcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgcmVjdCA9IG1lLmRyYWdQcm94eVJlY3QgPSBldmVudC50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgbWUub2Zmc2V0WCA9IGV2ZW50LmRldGFpbC5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgICAgICBtZS5vZmZzZXRZID0gZXZlbnQuZGV0YWlsLmNsaWVudFkgLSByZWN0LnRvcDtcblxuICAgICAgICBEb21FdmVudHMuc2VuZE1lc3NhZ2VUb0FwcCh7XG4gICAgICAgICAgICAuLi50aGlzLmdldEV2ZW50RGF0YShldmVudCksXG4gICAgICAgICAgICB0eXBlOiAnZHJhZzpzdGFydCdcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkYXRhLmNsaWVudFhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZGF0YS5jbGllbnRZXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBzY3JvbGxDb250YWluZXIoZGF0YSkge1xuICAgICAgICBsZXQgbWUgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGRlbHRhWCA9IGRhdGEuY2xpZW50WCAtIG1lLmNsaWVudFgsXG4gICAgICAgICAgICBkZWx0YVkgPSBkYXRhLmNsaWVudFkgLSBtZS5jbGllbnRZLFxuICAgICAgICAgICAgZWwgICAgID0gbWUuc2Nyb2xsQ29udGFpbmVyRWxlbWVudCxcbiAgICAgICAgICAgIGdhcCAgICA9IDI1MCxcbiAgICAgICAgICAgIHJlY3QgICA9IG1lLnNjcm9sbENvbnRhaW5lclJlY3Q7XG5cbiAgICAgICAgbWUuY2xpZW50WCA9ICBkYXRhLmNsaWVudFg7XG4gICAgICAgIG1lLmNsaWVudFkgPSAgZGF0YS5jbGllbnRZO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIChkZWx0YVggPCAwICYmIGRhdGEuY2xpZW50WCA8IHJlY3QubGVmdCAgKyBnYXApIHx8XG4gICAgICAgICAgICAoZGVsdGFYID4gMCAmJiBkYXRhLmNsaWVudFggPiByZWN0LnJpZ2h0IC0gZ2FwKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGVsLnNjcm9sbExlZnQgKz0gKGRlbHRhWCAqIG1lLnNjcm9sbEZhY3RvckxlZnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKGRlbHRhWSA8IDAgJiYgZGF0YS5jbGllbnRZIDwgcmVjdC50b3AgICAgKyBnYXApIHx8XG4gICAgICAgICAgICAoZGVsdGFZID4gMCAmJiBkYXRhLmNsaWVudFkgPiByZWN0LmJvdHRvbSAtIGdhcClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBlbC5zY3JvbGxUb3AgKz0gKGRlbHRhWSAqIG1lLnNjcm9sbEZhY3RvclRvcCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2xpZW50WDogbWUuY2xpZW50WCArIGVsLnNjcm9sbExlZnQgLSBtZS5pbml0aWFsU2Nyb2xsTGVmdCxcbiAgICAgICAgICAgIGNsaWVudFk6IG1lLmNsaWVudFkgKyBlbC5zY3JvbGxUb3AgIC0gbWUuaW5pdGlhbFNjcm9sbFRvcFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqL1xuICAgIHNldEJvdW5kYXJ5Q29udGFpbmVyKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgbm9kZSA9IGRhdGEuaWQgPT09ICdkb2N1bWVudC5ib2R5JyA/IGRvY3VtZW50LmJvZHkgOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhLmlkKTtcblxuICAgICAgICBtZS5ib3VuZGFyeUNvbnRhaW5lclJlY3QgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqL1xuICAgIHNldERyYWdQcm94eUVsZW1lbnQoZGF0YSkge1xuICAgICAgICB0aGlzLmRyYWdQcm94eUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhLmlkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKi9cbiAgICBzZXRTY3JvbGxDb250YWluZXIoZGF0YSkge1xuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICBub2RlID0gZGF0YS5pZCA9PT0gJ2RvY3VtZW50LmJvZHknID8gZG9jdW1lbnQuYm9keSA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRhdGEuaWQpO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24obWUsIHtcbiAgICAgICAgICAgIHNjcm9sbENvbnRhaW5lckVsZW1lbnQ6IG5vZGUsXG4gICAgICAgICAgICBzY3JvbGxDb250YWluZXJSZWN0ICAgOiBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgICAgaW5pdGlhbFNjcm9sbExlZnQgICAgIDogbm9kZS5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgaW5pdGlhbFNjcm9sbFRvcCAgICAgIDogbm9kZS5zY3JvbGxUb3BcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkYXRhLnZhbHVlXG4gICAgICovXG4gICAgc2V0U2Nyb2xsRmFjdG9yTGVmdChkYXRhKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsRmFjdG9yTGVmdCA9IGRhdGEudmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkYXRhLnZhbHVlXG4gICAgICovXG4gICAgc2V0U2Nyb2xsRmFjdG9yVG9wKGRhdGEpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxGYWN0b3JUb3AgPSBkYXRhLnZhbHVlO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoRHJhZ0Ryb3ApO1xuXG5sZXQgaW5zdGFuY2UgPSBOZW8uY3JlYXRlKERyYWdEcm9wKTtcblxuTmVvLmFwcGx5VG9HbG9iYWxOcyhpbnN0YW5jZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3RhbmNlOyJdLCJzb3VyY2VSb290IjoiIn0=