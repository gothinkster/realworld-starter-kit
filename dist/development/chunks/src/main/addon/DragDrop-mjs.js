(self["webpackChunkneo_mjs_realworld_example_app"] = self["webpackChunkneo_mjs_realworld_example_app"] || []).push([["src/main/addon/DragDrop-mjs"],{

/***/ "./node_modules/neo.mjs/src/main/addon/DragDrop.mjs":
/*!**********************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/addon/DragDrop.mjs ***!
  \**********************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.e, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");
/* harmony import */ var _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DomAccess.mjs */ "./node_modules/neo.mjs/src/main/DomAccess.mjs");
/* harmony import */ var _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DomEvents.mjs */ "./node_modules/neo.mjs/src/main/DomEvents.mjs");




/**
 * @class Neo.main.addon.DragDrop
 * @extends Neo.core.Base
 * @singleton
 */
class DragDrop extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.addon.DragDrop'
         * @protected
         */
        className: 'Neo.main.addon.DragDrop',
        /**
         * @member {Boolean} alwaysFireDragMove=false
         */
        alwaysFireDragMove: false,
        /**
         * @member {DOMRect|null} scrollContainerRect=null
         */
        boundaryContainerRect: null,
        /**
         * @member {Number} clientX=0
         */
        clientX: 0,
        /**
         * @member {Number} clientY=0
         */
        clientY: 0,
        /**
         * @member {String|null} dragElementRootId=null
         */
        dragElementRootId: null,
        /**
         * @member {String} dragProxyCls='neo-dragproxy'
         */
        dragProxyCls: 'neo-dragproxy',
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
         * @member {String|null} dragZoneId=null
         */
        dragZoneId: null,
        /**
         * You can either pass an array of (dom) ids or cls rules or both
         * @example
         * dropZoneIdentifier: {
         *     ids: ['foo','bar']
         * }
         * @example
         * dropZoneIdentifier: {
         *     cls: ['my-class-1','my-class-2']
         * }
         * @example
         * dropZoneIdentifier: {
         *     cls: ['my-class-1','my-class-2'],
         *     ids: ['foo','bar']
         * }
         * @member {Object|null} dropZoneIdentifier=null
         */
        dropZoneIdentifier: null,
        /**
         * @member {Number} initialScrollLeft=0
         */
        initialScrollLeft: 0,
        /**
         * @member {Number} initialScrollTop=0
         */
        initialScrollTop: 0,
        /**
         * @member {Boolean} moveHorizontal=true
         */
        moveHorizontal: true,
        /**
         * @member {Boolean} moveVertical=true
         */
        moveVertical: true,
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
                'setConfigs',
                'setDragProxyElement'
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
    }}

    /**
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me      = this,
            imports = [];

        _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__.default.on({
            mouseEnter: me.onMouseEnter,
            mouseLeave: me.onMouseLeave,
            scope     : me
        });

        me.addGlobalEventListeners();

        if (Neo.config.hasTouchEvents) {
            imports.push(__webpack_require__.e(/*! import() | src/main/draggable/sensor/Touch.mjs */ "src/main/draggable/sensor/Touch.mjs").then(__webpack_require__.bind(__webpack_require__, /*! ../draggable/sensor/Touch.mjs */ "./node_modules/neo.mjs/src/main/draggable/sensor/Touch.mjs")));
        } else {
            imports.push(__webpack_require__.e(/*! import() | src/main/draggable/sensor/Mouse.mjs */ "src/main/draggable/sensor/Mouse.mjs").then(__webpack_require__.bind(__webpack_require__, /*! ../draggable/sensor/Mouse.mjs */ "./node_modules/neo.mjs/src/main/draggable/sensor/Mouse.mjs")));
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
            ..._DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__.default.getEventData(event.detail.originalEvent),
            clientX: event.detail.clientX,
            clientY: event.detail.clientY
        };

        if (event.detail.eventPath) {
            e.targetPath = event.detail.eventPath.map(e => _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__.default.getTargetData(e));
        } else {
            e.targetPath = e.path || e.composedPath();
        }

        e.path = path.map(e => _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__.default.getTargetData(e));

        return e;
    }

    /**
     *
     * @param {Object} event
     */
    onDragEnd(event) {
        let me          = this,
            parsedEvent = me.getEventData(event),
            isDrop      = me.pathIncludesDropZone(parsedEvent.targetPath);

        _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__.default.setBodyCls({
            remove: ['neo-unselectable']
        });

        _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__.default.sendMessageToApp({
            ...parsedEvent,
            isDrop: isDrop,
            type  : 'drag:end'
        });

        if (isDrop) {
            _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__.default.sendMessageToApp({
                ..._DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__.default.getMouseEventData(event.detail.originalEvent),
                dragZoneId: me.dragZoneId,
                type      : 'drop'
            });
        }

        Object.assign(me, {
            alwaysFireDragMove    : false,
            boundaryContainerRect : null,
            dragElementRootId     : null,
            dragElementRootRect   : null,
            dragProxyCls          : 'neo-dragproxy',
            dragProxyElement      : null,
            dragZoneId            : null,
            dropZoneIdentifier    : null,
            initialScrollLeft     : 0,
            initialScrollTop      : 0,
            moveHorizontal        : true,
            moveVertical          : true,
            scrollContainerElement: null,
            scrollContainerRect   : null,
            setScrollFactorLeft   : 1,
            scrollFactorTop       : 1
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

            if (!me.moveHorizontal) {
                left = me.dragProxyRect.x;
            }

            me.dragProxyElement.style.left = `${left}px`;

            if (!me.moveVertical) {
                top = me.dragProxyRect.y;
            }

            me.dragProxyElement.style.top = `${top}px`;
        }

        if (!me.dragProxyElement || me.alwaysFireDragMove) {
            _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__.default.sendMessageToApp({
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
            rect = event.target.getBoundingClientRect();

        _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__.default.setBodyCls({
            add: ['neo-unselectable']
        });

        Object.assign(me, {
            dragProxyRect: rect,
            offsetX      : event.detail.clientX - rect.left,
            offsetY      : event.detail.clientY - rect.top
        });

        _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__.default.sendMessageToApp({
            ...this.getEventData(event),
            type: 'drag:start'
        });
    }

    /**
     *
     * @param {Object} event
     */
    onMouseEnter(event) {
        let me = this;

        if (me.pathIncludesDropZone(event.path)) {
            _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__.default.sendMessageToApp({
                ...event,
                dragZoneId: me.dragZoneId,
                type      : 'drop:enter'
            });
        }
    }

    /**
     *
     * @param {Object} event
     */
    onMouseLeave(event) {
        let me = this;

        if (me.pathIncludesDropZone(event.path)) {
            _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__.default.sendMessageToApp({
                ...event,
                dragZoneId: me.dragZoneId,
                type      : 'drop:leave'
            });
        }
    }

    /**
     *
     * @param {Array} path
     * @returns {Boolean}
     */
    pathIncludesDropZone(path) {
        let me         = this,
            hasMatch   = true,
            identifier = me.dropZoneIdentifier,
            cls, ids;

        if (identifier) {
            cls = identifier.cls;
            ids = identifier.ids;

            for (const item of path) {
                if (cls) {
                    hasMatch = false;

                    for (const targetCls of item.cls) {
                        if (cls.includes(targetCls)) {
                            hasMatch = true;
                            break;
                        }
                    }
                }

                if (hasMatch && ids && !ids.includes(item.id)) {
                    hasMatch = false;
                }

                if (hasMatch) {
                    return true;
                }
            }
        }

        return false;
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
     * @param {Object}  data
     * @param {Boolean} data.alwaysFireDragMove
     * @param {String}  data.boundaryContainerId
     * @param {String}  data.scrollContainerId
     * @param {Number}  data.scrollFactorLeft
     * @param {Number}  data.scrollFactorTop
     */
    setConfigs(data) {
        let me = this,
            node;

        if (data.boundaryContainerId) {
            node = _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getElementOrBody(data.boundaryContainerId);
            me.boundaryContainerRect = node.getBoundingClientRect();
        }

        delete data.boundaryContainerId;

        if (data.scrollContainerId) {
            node = _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getElementOrBody(data.scrollContainerId);

            Object.assign(me, {
                scrollContainerElement: node,
                scrollContainerRect   : node.getBoundingClientRect(),
                initialScrollLeft     : node.scrollLeft,
                initialScrollTop      : node.scrollTop
            });
        }

        delete data.scrollContainerId;

        Object.entries(data).forEach(([key, value]) => {
            if (me.hasOwnProperty(key)) {
                me[key] = value;
            } else {
                console.error('unknown key passed inside setConfigs()', key);
            }
        });
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.id
     */
    setDragProxyElement(data) {
        this.dragProxyElement = document.getElementById(data.id);
    }
}

Neo.applyClassConfig(DragDrop);

let instance = Neo.create(DragDrop);

Neo.applyToGlobalNs(instance);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (instance);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9tYWluL2FkZG9uL0RyYWdEcm9wLm1qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUE0QztBQUNIO0FBQ0E7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsbURBQUk7QUFDM0Isd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsYUFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsaUJBQWlCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGFBQWE7QUFDakM7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxvQkFBb0IsaUJBQWlCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixhQUFhO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFFBQVEsc0RBQVk7QUFDcEI7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBLHlCQUF5Qix5UUFBcUc7QUFDOUgsU0FBUztBQUNULHlCQUF5Qix5UUFBcUc7QUFDOUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxnRUFBc0I7QUFDckM7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkRBQTJELGlFQUF1QjtBQUNsRixTQUFTO0FBQ1Q7QUFDQTs7QUFFQSwrQkFBK0IsaUVBQXVCOztBQUV0RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLDhEQUFvQjtBQUM1QjtBQUNBLFNBQVM7O0FBRVQsUUFBUSxvRUFBMEI7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBLFlBQVksb0VBQTBCO0FBQ3RDLG1CQUFtQixxRUFBMkI7QUFDOUM7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxnREFBZ0QsS0FBSzs7QUFFckQ7QUFDQTtBQUNBOztBQUVBLCtDQUErQyxJQUFJO0FBQ25EOztBQUVBO0FBQ0EsWUFBWSxvRUFBMEI7QUFDdEM7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSw4REFBb0I7QUFDNUI7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVCxRQUFRLG9FQUEwQjtBQUNsQztBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWSxvRUFBMEI7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZLG9FQUEwQjtBQUN0QztBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsUUFBUTtBQUN2QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsb0VBQTBCO0FBQzdDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxtQkFBbUIsb0VBQTBCOztBQUU3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsaUVBQWUsUUFBUSxFIiwiZmlsZSI6ImNodW5rcy9zcmMvbWFpbi9hZGRvbi9EcmFnRHJvcC1tanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSAgICAgIGZyb20gJy4uLy4uL2NvcmUvQmFzZS5tanMnO1xuaW1wb3J0IERvbUFjY2VzcyBmcm9tICcuLi9Eb21BY2Nlc3MubWpzJztcbmltcG9ydCBEb21FdmVudHMgZnJvbSAnLi4vRG9tRXZlbnRzLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby5tYWluLmFkZG9uLkRyYWdEcm9wXG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKiBAc2luZ2xldG9uXG4gKi9cbmNsYXNzIERyYWdEcm9wIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5tYWluLmFkZG9uLkRyYWdEcm9wJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8ubWFpbi5hZGRvbi5EcmFnRHJvcCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBhbHdheXNGaXJlRHJhZ01vdmU9ZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGFsd2F5c0ZpcmVEcmFnTW92ZTogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtET01SZWN0fG51bGx9IHNjcm9sbENvbnRhaW5lclJlY3Q9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgYm91bmRhcnlDb250YWluZXJSZWN0OiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBjbGllbnRYPTBcbiAgICAgICAgICovXG4gICAgICAgIGNsaWVudFg6IDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IGNsaWVudFk9MFxuICAgICAgICAgKi9cbiAgICAgICAgY2xpZW50WTogMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBkcmFnRWxlbWVudFJvb3RJZD1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBkcmFnRWxlbWVudFJvb3RJZDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gZHJhZ1Byb3h5Q2xzPSduZW8tZHJhZ3Byb3h5J1xuICAgICAgICAgKi9cbiAgICAgICAgZHJhZ1Byb3h5Q2xzOiAnbmVvLWRyYWdwcm94eScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtIVE1MRWxlbWVudHxudWxsfSBkcmFnUHJveHlFbGVtZW50PW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgZHJhZ1Byb3h5RWxlbWVudDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0RPTVJlY3R8bnVsbH0gZHJhZ1Byb3h5UmVjdD1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBkcmFnUHJveHlSZWN0OiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IGRyYWdab25lSWQ9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgZHJhZ1pvbmVJZDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFlvdSBjYW4gZWl0aGVyIHBhc3MgYW4gYXJyYXkgb2YgKGRvbSkgaWRzIG9yIGNscyBydWxlcyBvciBib3RoXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIGRyb3Bab25lSWRlbnRpZmllcjoge1xuICAgICAgICAgKiAgICAgaWRzOiBbJ2ZvbycsJ2JhciddXG4gICAgICAgICAqIH1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogZHJvcFpvbmVJZGVudGlmaWVyOiB7XG4gICAgICAgICAqICAgICBjbHM6IFsnbXktY2xhc3MtMScsJ215LWNsYXNzLTInXVxuICAgICAgICAgKiB9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIGRyb3Bab25lSWRlbnRpZmllcjoge1xuICAgICAgICAgKiAgICAgY2xzOiBbJ215LWNsYXNzLTEnLCdteS1jbGFzcy0yJ10sXG4gICAgICAgICAqICAgICBpZHM6IFsnZm9vJywnYmFyJ11cbiAgICAgICAgICogfVxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R8bnVsbH0gZHJvcFpvbmVJZGVudGlmaWVyPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGRyb3Bab25lSWRlbnRpZmllcjogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gaW5pdGlhbFNjcm9sbExlZnQ9MFxuICAgICAgICAgKi9cbiAgICAgICAgaW5pdGlhbFNjcm9sbExlZnQ6IDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IGluaXRpYWxTY3JvbGxUb3A9MFxuICAgICAgICAgKi9cbiAgICAgICAgaW5pdGlhbFNjcm9sbFRvcDogMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IG1vdmVIb3Jpem9udGFsPXRydWVcbiAgICAgICAgICovXG4gICAgICAgIG1vdmVIb3Jpem9udGFsOiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gbW92ZVZlcnRpY2FsPXRydWVcbiAgICAgICAgICovXG4gICAgICAgIG1vdmVWZXJ0aWNhbDogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gb2Zmc2V0WD0wXG4gICAgICAgICAqL1xuICAgICAgICBvZmZzZXRYOiAwLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBvZmZzZXRZPTBcbiAgICAgICAgICovXG4gICAgICAgIG9mZnNldFk6IDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdGUgbWV0aG9kIGFjY2VzcyBmb3Igb3RoZXIgd29ya2Vyc1xuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHJlbW90ZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICByZW1vdGU6IHtcbiAgICAgICAgICAgIGFwcDogW1xuICAgICAgICAgICAgICAgICdzZXRDb25maWdzJyxcbiAgICAgICAgICAgICAgICAnc2V0RHJhZ1Byb3h5RWxlbWVudCdcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0hUTUxFbGVtZW50fG51bGx9IHNjcm9sbENvbnRhaW5lckVsZW1lbnQ9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyRWxlbWVudDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0RPTVJlY3R8bnVsbH0gc2Nyb2xsQ29udGFpbmVyUmVjdD1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBzY3JvbGxDb250YWluZXJSZWN0OiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBzY3JvbGxGYWN0b3JMZWZ0PTFcbiAgICAgICAgICovXG4gICAgICAgIHNjcm9sbEZhY3RvckxlZnQ6IDEsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IHNjcm9sbEZhY3RvclRvcD0xXG4gICAgICAgICAqL1xuICAgICAgICBzY3JvbGxGYWN0b3JUb3A6IDEsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBzaW5nbGV0b249dHJ1ZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBzaW5nbGV0b246IHRydWVcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIGxldCBtZSAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGltcG9ydHMgPSBbXTtcblxuICAgICAgICBEb21FdmVudHMub24oe1xuICAgICAgICAgICAgbW91c2VFbnRlcjogbWUub25Nb3VzZUVudGVyLFxuICAgICAgICAgICAgbW91c2VMZWF2ZTogbWUub25Nb3VzZUxlYXZlLFxuICAgICAgICAgICAgc2NvcGUgICAgIDogbWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUuYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICAgICBpZiAoTmVvLmNvbmZpZy5oYXNUb3VjaEV2ZW50cykge1xuICAgICAgICAgICAgaW1wb3J0cy5wdXNoKGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiAnc3JjL21haW4vZHJhZ2dhYmxlL3NlbnNvci9Ub3VjaC5tanMnICovICcuLi9kcmFnZ2FibGUvc2Vuc29yL1RvdWNoLm1qcycpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGltcG9ydHMucHVzaChpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogJ3NyYy9tYWluL2RyYWdnYWJsZS9zZW5zb3IvTW91c2UubWpzJyAqLyAnLi4vZHJhZ2dhYmxlL3NlbnNvci9Nb3VzZS5tanMnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBQcm9taXNlLmFsbChpbXBvcnRzKS50aGVuKG1vZHVsZXMgPT4ge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBUb3VjaCBvciBNb3VzZVNlbnNvclxuICAgICAgICAgICAgTmVvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgbW9kdWxlOiBtb2R1bGVzWzBdLmRlZmF1bHRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGFkZEdsb2JhbEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWc6ZW5kJywgICBtZS5vbkRyYWdFbmQgIC5iaW5kKG1lKSwgdHJ1ZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWc6bW92ZScsICBtZS5vbkRyYWdNb3ZlIC5iaW5kKG1lKSwgdHJ1ZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWc6c3RhcnQnLCBtZS5vbkRyYWdTdGFydC5iaW5kKG1lKSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0RXZlbnREYXRhKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHBhdGggPSBldmVudC5wYXRoIHx8IGV2ZW50LmNvbXBvc2VkUGF0aCgpO1xuXG4gICAgICAgIGNvbnN0IGUgPSB7XG4gICAgICAgICAgICAuLi5Eb21FdmVudHMuZ2V0RXZlbnREYXRhKGV2ZW50LmRldGFpbC5vcmlnaW5hbEV2ZW50KSxcbiAgICAgICAgICAgIGNsaWVudFg6IGV2ZW50LmRldGFpbC5jbGllbnRYLFxuICAgICAgICAgICAgY2xpZW50WTogZXZlbnQuZGV0YWlsLmNsaWVudFlcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZXZlbnQuZGV0YWlsLmV2ZW50UGF0aCkge1xuICAgICAgICAgICAgZS50YXJnZXRQYXRoID0gZXZlbnQuZGV0YWlsLmV2ZW50UGF0aC5tYXAoZSA9PiBEb21FdmVudHMuZ2V0VGFyZ2V0RGF0YShlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlLnRhcmdldFBhdGggPSBlLnBhdGggfHwgZS5jb21wb3NlZFBhdGgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGUucGF0aCA9IHBhdGgubWFwKGUgPT4gRG9tRXZlbnRzLmdldFRhcmdldERhdGEoZSkpO1xuXG4gICAgICAgIHJldHVybiBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgb25EcmFnRW5kKGV2ZW50KSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBwYXJzZWRFdmVudCA9IG1lLmdldEV2ZW50RGF0YShldmVudCksXG4gICAgICAgICAgICBpc0Ryb3AgICAgICA9IG1lLnBhdGhJbmNsdWRlc0Ryb3Bab25lKHBhcnNlZEV2ZW50LnRhcmdldFBhdGgpO1xuXG4gICAgICAgIERvbUFjY2Vzcy5zZXRCb2R5Q2xzKHtcbiAgICAgICAgICAgIHJlbW92ZTogWyduZW8tdW5zZWxlY3RhYmxlJ11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgRG9tRXZlbnRzLnNlbmRNZXNzYWdlVG9BcHAoe1xuICAgICAgICAgICAgLi4ucGFyc2VkRXZlbnQsXG4gICAgICAgICAgICBpc0Ryb3A6IGlzRHJvcCxcbiAgICAgICAgICAgIHR5cGUgIDogJ2RyYWc6ZW5kJ1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaXNEcm9wKSB7XG4gICAgICAgICAgICBEb21FdmVudHMuc2VuZE1lc3NhZ2VUb0FwcCh7XG4gICAgICAgICAgICAgICAgLi4uRG9tRXZlbnRzLmdldE1vdXNlRXZlbnREYXRhKGV2ZW50LmRldGFpbC5vcmlnaW5hbEV2ZW50KSxcbiAgICAgICAgICAgICAgICBkcmFnWm9uZUlkOiBtZS5kcmFnWm9uZUlkLFxuICAgICAgICAgICAgICAgIHR5cGUgICAgICA6ICdkcm9wJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3QuYXNzaWduKG1lLCB7XG4gICAgICAgICAgICBhbHdheXNGaXJlRHJhZ01vdmUgICAgOiBmYWxzZSxcbiAgICAgICAgICAgIGJvdW5kYXJ5Q29udGFpbmVyUmVjdCA6IG51bGwsXG4gICAgICAgICAgICBkcmFnRWxlbWVudFJvb3RJZCAgICAgOiBudWxsLFxuICAgICAgICAgICAgZHJhZ0VsZW1lbnRSb290UmVjdCAgIDogbnVsbCxcbiAgICAgICAgICAgIGRyYWdQcm94eUNscyAgICAgICAgICA6ICduZW8tZHJhZ3Byb3h5JyxcbiAgICAgICAgICAgIGRyYWdQcm94eUVsZW1lbnQgICAgICA6IG51bGwsXG4gICAgICAgICAgICBkcmFnWm9uZUlkICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgZHJvcFpvbmVJZGVudGlmaWVyICAgIDogbnVsbCxcbiAgICAgICAgICAgIGluaXRpYWxTY3JvbGxMZWZ0ICAgICA6IDAsXG4gICAgICAgICAgICBpbml0aWFsU2Nyb2xsVG9wICAgICAgOiAwLFxuICAgICAgICAgICAgbW92ZUhvcml6b250YWwgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgICAgIG1vdmVWZXJ0aWNhbCAgICAgICAgICA6IHRydWUsXG4gICAgICAgICAgICBzY3JvbGxDb250YWluZXJFbGVtZW50OiBudWxsLFxuICAgICAgICAgICAgc2Nyb2xsQ29udGFpbmVyUmVjdCAgIDogbnVsbCxcbiAgICAgICAgICAgIHNldFNjcm9sbEZhY3RvckxlZnQgICA6IDEsXG4gICAgICAgICAgICBzY3JvbGxGYWN0b3JUb3AgICAgICAgOiAxXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgb25EcmFnTW92ZShldmVudCkge1xuICAgICAgICBsZXQgbWUgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHByb3h5UmVjdCA9IG1lLmRyYWdQcm94eVJlY3QsXG4gICAgICAgICAgICByZWN0ICAgICAgPSBtZS5ib3VuZGFyeUNvbnRhaW5lclJlY3QsXG4gICAgICAgICAgICBkYXRhLCBsZWZ0LCB0b3A7XG5cbiAgICAgICAgaWYgKG1lLnNjcm9sbENvbnRhaW5lckVsZW1lbnQpIHtcbiAgICAgICAgICAgIGRhdGEgPSBtZS5zY3JvbGxDb250YWluZXIoe1xuICAgICAgICAgICAgICAgIGNsaWVudFg6IGV2ZW50LmRldGFpbC5jbGllbnRYLFxuICAgICAgICAgICAgICAgIGNsaWVudFk6IGV2ZW50LmRldGFpbC5jbGllbnRZXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZXZlbnQuZGV0YWlsLmNsaWVudFggPSBkYXRhLmNsaWVudFg7XG4gICAgICAgICAgICBldmVudC5kZXRhaWwuY2xpZW50WSA9IGRhdGEuY2xpZW50WTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtZS5kcmFnUHJveHlFbGVtZW50KSB7XG4gICAgICAgICAgICBsZWZ0ID0gZXZlbnQuZGV0YWlsLmNsaWVudFggLSBtZS5vZmZzZXRYO1xuICAgICAgICAgICAgdG9wICA9IGV2ZW50LmRldGFpbC5jbGllbnRZIC0gbWUub2Zmc2V0WTtcblxuICAgICAgICAgICAgaWYgKHJlY3QpIHtcbiAgICAgICAgICAgICAgICBpZiAobGVmdCA8IHJlY3QubGVmdCkge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gcmVjdC5sZWZ0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGVmdCA+IHJlY3QucmlnaHQgLSBwcm94eVJlY3Qud2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IHJlY3QucmlnaHQgLSBwcm94eVJlY3Qud2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRvcCA8IHJlY3QudG9wKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcCA9IHJlY3QudG9wO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodG9wID4gcmVjdC5ib3R0b20gLSBwcm94eVJlY3QuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcCA9IHJlY3QuYm90dG9tIC0gcHJveHlSZWN0LmhlaWdodFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFtZS5tb3ZlSG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgIGxlZnQgPSBtZS5kcmFnUHJveHlSZWN0Lng7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1lLmRyYWdQcm94eUVsZW1lbnQuc3R5bGUubGVmdCA9IGAke2xlZnR9cHhgO1xuXG4gICAgICAgICAgICBpZiAoIW1lLm1vdmVWZXJ0aWNhbCkge1xuICAgICAgICAgICAgICAgIHRvcCA9IG1lLmRyYWdQcm94eVJlY3QueTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWUuZHJhZ1Byb3h5RWxlbWVudC5zdHlsZS50b3AgPSBgJHt0b3B9cHhgO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFtZS5kcmFnUHJveHlFbGVtZW50IHx8IG1lLmFsd2F5c0ZpcmVEcmFnTW92ZSkge1xuICAgICAgICAgICAgRG9tRXZlbnRzLnNlbmRNZXNzYWdlVG9BcHAoe1xuICAgICAgICAgICAgICAgIC4uLm1lLmdldEV2ZW50RGF0YShldmVudCksXG4gICAgICAgICAgICAgICAgdHlwZTogJ2RyYWc6bW92ZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKi9cbiAgICBvbkRyYWdTdGFydChldmVudCkge1xuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICByZWN0ID0gZXZlbnQudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIERvbUFjY2Vzcy5zZXRCb2R5Q2xzKHtcbiAgICAgICAgICAgIGFkZDogWyduZW8tdW5zZWxlY3RhYmxlJ11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbihtZSwge1xuICAgICAgICAgICAgZHJhZ1Byb3h5UmVjdDogcmVjdCxcbiAgICAgICAgICAgIG9mZnNldFggICAgICA6IGV2ZW50LmRldGFpbC5jbGllbnRYIC0gcmVjdC5sZWZ0LFxuICAgICAgICAgICAgb2Zmc2V0WSAgICAgIDogZXZlbnQuZGV0YWlsLmNsaWVudFkgLSByZWN0LnRvcFxuICAgICAgICB9KTtcblxuICAgICAgICBEb21FdmVudHMuc2VuZE1lc3NhZ2VUb0FwcCh7XG4gICAgICAgICAgICAuLi50aGlzLmdldEV2ZW50RGF0YShldmVudCksXG4gICAgICAgICAgICB0eXBlOiAnZHJhZzpzdGFydCdcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKi9cbiAgICBvbk1vdXNlRW50ZXIoZXZlbnQpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUucGF0aEluY2x1ZGVzRHJvcFpvbmUoZXZlbnQucGF0aCkpIHtcbiAgICAgICAgICAgIERvbUV2ZW50cy5zZW5kTWVzc2FnZVRvQXBwKHtcbiAgICAgICAgICAgICAgICAuLi5ldmVudCxcbiAgICAgICAgICAgICAgICBkcmFnWm9uZUlkOiBtZS5kcmFnWm9uZUlkLFxuICAgICAgICAgICAgICAgIHR5cGUgICAgICA6ICdkcm9wOmVudGVyJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG9uTW91c2VMZWF2ZShldmVudCkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChtZS5wYXRoSW5jbHVkZXNEcm9wWm9uZShldmVudC5wYXRoKSkge1xuICAgICAgICAgICAgRG9tRXZlbnRzLnNlbmRNZXNzYWdlVG9BcHAoe1xuICAgICAgICAgICAgICAgIC4uLmV2ZW50LFxuICAgICAgICAgICAgICAgIGRyYWdab25lSWQ6IG1lLmRyYWdab25lSWQsXG4gICAgICAgICAgICAgICAgdHlwZSAgICAgIDogJ2Ryb3A6bGVhdmUnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gcGF0aFxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIHBhdGhJbmNsdWRlc0Ryb3Bab25lKHBhdGgpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgaGFzTWF0Y2ggICA9IHRydWUsXG4gICAgICAgICAgICBpZGVudGlmaWVyID0gbWUuZHJvcFpvbmVJZGVudGlmaWVyLFxuICAgICAgICAgICAgY2xzLCBpZHM7XG5cbiAgICAgICAgaWYgKGlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgIGNscyA9IGlkZW50aWZpZXIuY2xzO1xuICAgICAgICAgICAgaWRzID0gaWRlbnRpZmllci5pZHM7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBwYXRoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNscykge1xuICAgICAgICAgICAgICAgICAgICBoYXNNYXRjaCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdGFyZ2V0Q2xzIG9mIGl0ZW0uY2xzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xzLmluY2x1ZGVzKHRhcmdldENscykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNNYXRjaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaGFzTWF0Y2ggJiYgaWRzICYmICFpZHMuaW5jbHVkZXMoaXRlbS5pZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzTWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaGFzTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZGF0YS5jbGllbnRYXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGRhdGEuY2xpZW50WVxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgc2Nyb2xsQ29udGFpbmVyKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lICAgICA9IHRoaXMsXG4gICAgICAgICAgICBkZWx0YVggPSBkYXRhLmNsaWVudFggLSBtZS5jbGllbnRYLFxuICAgICAgICAgICAgZGVsdGFZID0gZGF0YS5jbGllbnRZIC0gbWUuY2xpZW50WSxcbiAgICAgICAgICAgIGVsICAgICA9IG1lLnNjcm9sbENvbnRhaW5lckVsZW1lbnQsXG4gICAgICAgICAgICBnYXAgICAgPSAyNTAsXG4gICAgICAgICAgICByZWN0ICAgPSBtZS5zY3JvbGxDb250YWluZXJSZWN0O1xuXG4gICAgICAgIG1lLmNsaWVudFggPSAgZGF0YS5jbGllbnRYO1xuICAgICAgICBtZS5jbGllbnRZID0gIGRhdGEuY2xpZW50WTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAoZGVsdGFYIDwgMCAmJiBkYXRhLmNsaWVudFggPCByZWN0LmxlZnQgICsgZ2FwKSB8fFxuICAgICAgICAgICAgKGRlbHRhWCA+IDAgJiYgZGF0YS5jbGllbnRYID4gcmVjdC5yaWdodCAtIGdhcClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBlbC5zY3JvbGxMZWZ0ICs9IChkZWx0YVggKiBtZS5zY3JvbGxGYWN0b3JMZWZ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIChkZWx0YVkgPCAwICYmIGRhdGEuY2xpZW50WSA8IHJlY3QudG9wICAgICsgZ2FwKSB8fFxuICAgICAgICAgICAgKGRlbHRhWSA+IDAgJiYgZGF0YS5jbGllbnRZID4gcmVjdC5ib3R0b20gLSBnYXApXG4gICAgICAgICkge1xuICAgICAgICAgICAgZWwuc2Nyb2xsVG9wICs9IChkZWx0YVkgKiBtZS5zY3JvbGxGYWN0b3JUb3ApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNsaWVudFg6IG1lLmNsaWVudFggKyBlbC5zY3JvbGxMZWZ0IC0gbWUuaW5pdGlhbFNjcm9sbExlZnQsXG4gICAgICAgICAgICBjbGllbnRZOiBtZS5jbGllbnRZICsgZWwuc2Nyb2xsVG9wICAtIG1lLmluaXRpYWxTY3JvbGxUb3BcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgZGF0YVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZGF0YS5hbHdheXNGaXJlRHJhZ01vdmVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gIGRhdGEuYm91bmRhcnlDb250YWluZXJJZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgZGF0YS5zY3JvbGxDb250YWluZXJJZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSAgZGF0YS5zY3JvbGxGYWN0b3JMZWZ0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9ICBkYXRhLnNjcm9sbEZhY3RvclRvcFxuICAgICAqL1xuICAgIHNldENvbmZpZ3MoZGF0YSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzLFxuICAgICAgICAgICAgbm9kZTtcblxuICAgICAgICBpZiAoZGF0YS5ib3VuZGFyeUNvbnRhaW5lcklkKSB7XG4gICAgICAgICAgICBub2RlID0gRG9tQWNjZXNzLmdldEVsZW1lbnRPckJvZHkoZGF0YS5ib3VuZGFyeUNvbnRhaW5lcklkKTtcbiAgICAgICAgICAgIG1lLmJvdW5kYXJ5Q29udGFpbmVyUmVjdCA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBkZWxldGUgZGF0YS5ib3VuZGFyeUNvbnRhaW5lcklkO1xuXG4gICAgICAgIGlmIChkYXRhLnNjcm9sbENvbnRhaW5lcklkKSB7XG4gICAgICAgICAgICBub2RlID0gRG9tQWNjZXNzLmdldEVsZW1lbnRPckJvZHkoZGF0YS5zY3JvbGxDb250YWluZXJJZCk7XG5cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obWUsIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxDb250YWluZXJFbGVtZW50OiBub2RlLFxuICAgICAgICAgICAgICAgIHNjcm9sbENvbnRhaW5lclJlY3QgICA6IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgICAgICAgICAgaW5pdGlhbFNjcm9sbExlZnQgICAgIDogbm9kZS5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgICAgIGluaXRpYWxTY3JvbGxUb3AgICAgICA6IG5vZGUuc2Nyb2xsVG9wXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSBkYXRhLnNjcm9sbENvbnRhaW5lcklkO1xuXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGRhdGEpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgaWYgKG1lLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBtZVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3Vua25vd24ga2V5IHBhc3NlZCBpbnNpZGUgc2V0Q29uZmlncygpJywga2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICovXG4gICAgc2V0RHJhZ1Byb3h5RWxlbWVudChkYXRhKSB7XG4gICAgICAgIHRoaXMuZHJhZ1Byb3h5RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRhdGEuaWQpO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoRHJhZ0Ryb3ApO1xuXG5sZXQgaW5zdGFuY2UgPSBOZW8uY3JlYXRlKERyYWdEcm9wKTtcblxuTmVvLmFwcGx5VG9HbG9iYWxOcyhpbnN0YW5jZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3RhbmNlOyJdLCJzb3VyY2VSb290IjoiIn0=