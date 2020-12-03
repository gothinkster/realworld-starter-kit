(self["webpackChunkneo_mjs_realworld_example_app"] = self["webpackChunkneo_mjs_realworld_example_app"] || []).push([["src/draggable/toolbar/SortZone-mjs.js"],{

/***/ "./node_modules/neo.mjs/src/draggable/toolbar/DragZone.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/neo.mjs/src/draggable/toolbar/DragZone.mjs ***!
  \*****************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ DragZone
/* harmony export */ });
/* harmony import */ var _draggable_DragZone_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../draggable/DragZone.mjs */ "./node_modules/neo.mjs/src/draggable/DragZone.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");
/* harmony import */ var _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/VDom.mjs */ "./node_modules/neo.mjs/src/util/VDom.mjs");




/**
 * @class Neo.draggable.toolbar.DragZone
 * @extends Neo.draggable.DragZone
 */
class DragZone extends _draggable_DragZone_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.draggable.toolbar.DragZone'
         * @protected
         */
        className: 'Neo.draggable.toolbar.DragZone',
        /**
         * @member {String} ntype='toolbar-dragzone'
         * @protected
         */
        ntype: 'toolbar-dragzone'
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me           = this,
            owner        = me.owner,
            domListeners = owner.domListeners,
            opts         = {delegate: '.neo-draggable', scope: me};

        domListeners.push(
            {'drag:end'  : me.onDragEnd,   ...opts},
            {'drag:move' : me.onDragMove,  ...opts},
            {'drag:start': me.onDragStart, ...opts}
        );

        owner.domListeners = domListeners;

        owner.on('insert', me.onItemInsert, me);

        me.adjustToolbarItemCls(true);
    }

    /**
     *
     * @param {Boolean} draggable
     */
    adjustToolbarItemCls(draggable) {
        let me    = this,
            owner = me.owner,
            vdom  = owner.vdom;

        vdom.cn.forEach(item => {
            item.cls = item.cls || [];

            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__.default[draggable ? 'add' : 'remove'](item.cls, 'neo-draggable');
        });

        owner.vdom = vdom;
    }

    /**
     *
     * @param {Object} data
     */
    onDragEnd(data) {
        if (this.owner.draggable) {
            let me           = this,
                proxy        = me.dragProxy,
                cls          = proxy.cls || {},
                rect         = me.dragElementRect,
                wrapperStyle = proxy.wrapperStyle || {};

            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__.default.add(cls, 'neo-animate');
            proxy.cls = cls;

            // ensure to get into the next animation frame
            setTimeout(() => {
                wrapperStyle.left = `${rect.left}px`;
                wrapperStyle.top  = `${rect.top}px`;

                proxy.wrapperStyle = wrapperStyle;

                setTimeout(() => {
                    me.dragEnd();
                }, 300);
            }, 30);
        }
    }

    /**
     *
     * @param {Object} data
     */
    onDragStart(data) {
        let me = this;

        if (me.owner.draggable) {
            me.dragElement = _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_2__.default.findVdomChild(me.owner.vdom, data.path[0].id).vdom;
            me.dragStart(data);
        }
    }

    /**
     * @param {Object} data
     * @param {Number} data.index
     * @param {Neo.component.Base} data.item
     */
    onItemInsert(data) {
        let item = data.item,
            cls  = item.cls || [];

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__.default.add(cls, 'neo-draggable');
        item.cls = cls;
    }
}

Neo.applyClassConfig(DragZone);



/***/ }),

/***/ "./node_modules/neo.mjs/src/draggable/toolbar/SortZone.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/neo.mjs/src/draggable/toolbar/SortZone.mjs ***!
  \*****************************************************************/
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
/* harmony import */ var _DragZone_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DragZone.mjs */ "./node_modules/neo.mjs/src/draggable/toolbar/DragZone.mjs");
/* harmony import */ var _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/VDom.mjs */ "./node_modules/neo.mjs/src/util/VDom.mjs");



/**
 * @class Neo.draggable.toolbar.SortZone
 * @extends Neo.draggable.toolbar.DragZone
 */
class SortZone extends _DragZone_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.draggable.toolbar.SortZone'
         * @protected
         */
        className: 'Neo.draggable.toolbar.SortZone',
        /**
         * @member {String} ntype='toolbar-sortzone'
         * @protected
         */
        ntype: 'toolbar-sortzone',
        /**
         * @member {Boolean} alwaysFireDragMove=true
         */
        alwaysFireDragMove: true,
        /**
         * @member {Number} currentIndex=-1
         * @protected
         */
        currentIndex: -1,
        /**
         * @member {Object} indexMap=null
         * @protected
         */
        indexMap: null,
        /**
         * @member {Array|null} itemRects=null
         * @protected
         */
        itemRects: null,
        /**
         * @member {Array|null} itemStyles=null
         * @protected
         */
        itemStyles: null,
        /**
         * @member {Object} ownerRect=null
         * @protected
         */
        ownerRect: null,
        /**
         * @member {Object} ownerStyle=null
         * @protected
         */
        ownerStyle: null,
        /**
         * @member {Boolean} alwaysFireDragMove=false
         * @protected
         */
        reversedLayoutDirection: false,
        /**
         * Internal flag: onDragStart() will set the value to horizontal or vertical, depending on the current layout.
         * @member {String} sortDirection='horizontal'
         * @protected
         */
        sortDirection: 'horizontal',
        /**
         * @member {Number} startIndex=-1
         * @protected
         */
        startIndex: -1
    }}

    /**
     * Override this method for class extensions (e.g. tab.header.Toolbar)
     * @param {Number} fromIndex
     * @param {Number} toIndex
     */
    moveTo(fromIndex, toIndex) {
        this.owner.moveTo(fromIndex, toIndex);
    }

    /**
     *
     * @param {Object} data
     */
    onDragEnd(data) {
        let me         = this,
            owner      = me.owner,
            itemStyles = me.itemStyles,
            ownerStyle = owner.style || {},
            itemStyle;

        if (owner.sortable) {
            ownerStyle.height = me.ownerStyle.height || null;
            ownerStyle.width  = me.ownerStyle.width  || null;

            owner.style = ownerStyle;

            owner.items.forEach((item, index) => {
                itemStyle = item.style || {};

                Object.assign(itemStyle, {
                    height  : itemStyles[index].height || null,
                    left    : null,
                    position: null,
                    top     : null,
                    width   : itemStyles[index].width || null
                });

                if (index === me.startIndex) {
                    itemStyle.visibility = null;
                }

                item.style = itemStyle;
            });

            if (me.startIndex !== me.currentIndex) {
                me.moveTo(me.startIndex, me.currentIndex);
            }

            Object.assign(me, {
                currentIndex: -1,
                indexMap    : null,
                itemRects   : null,
                itemStyles  : null,
                ownerRect   : null,
                startIndex  : -1
            });

            me.dragEnd(data); // we do not want to trigger the super class call here
        }
    }

    /**
     *
     * @param {Object} data
     */
    onDragMove(data) {
        if (this.itemRects) { // the method can trigger before we got the client rects from the main thread
            let me         = this,
                moveFactor = 0.55, // we can not use 0.5, since items would jump back & forth
                index      = me.currentIndex,
                itemRects  = me.itemRects,
                maxItems   = itemRects.length - 1,
                reversed   = me.reversedLayoutDirection,
                delta, itemWidth;

            if (me.sortDirection === 'horizontal') {
                delta     = data.clientX - me.offsetX - itemRects[index].left;
                itemWidth = 'width';
            } else {
                delta     = data.clientY - me.offsetY - itemRects[index].top;
                itemWidth = 'height';
            }

            if (index > 0 && (!reversed && delta < 0 || reversed && delta > 0)) {
                if (Math.abs(delta) > itemRects[index - 1][itemWidth] * moveFactor) {
                    me.currentIndex--;
                    me.switchItems(index, me.currentIndex);
                }
            }

            else if (index < maxItems && (!reversed && delta > 0 || reversed && delta < 0)) {
                if (Math.abs(delta) > itemRects[index + 1][itemWidth] * moveFactor) {
                    me.currentIndex++;
                    me.switchItems(index, me.currentIndex);
                }
            }
        }
    }

    /**
     *
     * @param {Object} data
     */
    onDragStart(data) {
        let me         = this,
            button     = Neo.getComponent(data.path[0].id),
            owner      = me.owner,
            itemStyles = me.itemStyles = [],
            layout     = owner.layout,
            ownerStyle = owner.style || {},
            index, indexMap, itemStyle, rect;

        if (owner.sortable) {
            index    = owner.indexOf(button.id);
            indexMap = {};

            Object.assign(me, {
                currentIndex           : index,
                dragElement            : _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__.default.findVdomChild(owner.vdom, button.id).vdom,
                dragProxyConfig        : {...me.dragProxyConfig || {}, cls : [...owner.cls]},
                indexMap               : indexMap,
                ownerStyle             : {height: ownerStyle.height, width : ownerStyle.width},
                reversedLayoutDirection: layout.direction === 'column-reverse' || layout.direction === 'row-reverse',
                sortDirection          : owner.layout.ntype === 'layout-vbox' ? 'vertical' : 'horizontal',
                startIndex             : index
            });

            me.dragStart(data); // we do not want to trigger the super class call here

            owner.items.forEach((item, index) => {
                indexMap[index] = index;

                itemStyles.push({
                    height: item.style && item.style.height,
                    width : item.style && item.style.width
                });
            });

            Neo.main.DomAccess.getBoundingClientRect({
                id: [owner.id].concat(owner.items.map(e => e.id))
            }).then(itemRects => {
                me.ownerRect = itemRects[0];

                ownerStyle.height = `${itemRects[0].height}px`;
                ownerStyle.width  = `${itemRects[0].width}px`;

                // the only reason we are adjusting the toolbar style is that there is no min height or width present.
                // removing items from the layout could trigger a change in size.
                owner.style = ownerStyle;

                itemRects.shift();
                me.itemRects = itemRects;

                owner.items.forEach((item, index) => {
                    itemStyle = item.style || {};
                    rect      = itemRects[index];

                    item.style = Object.assign(itemStyle, {
                        height  : `${rect.height}px`,
                        left    : `${rect.left}px`,
                        position: 'absolute',
                        top     : `${rect.top}px`,
                        width   : `${rect.width}px`
                    });
                });

                // we need to add a short (1 frame) delay to ensure the item has switched to an absolute position
                setTimeout(() => {
                    itemStyle = button.style || {};
                    itemStyle.visibility = 'hidden';
                    button.style = itemStyle;
                }, 30);
            });
        }
    }

    /**
     *
     * @param {Number} index1
     * @param {Number} index2
     */
    switchItems(index1, index2) {
        let me       = this,
            reversed = me.reversedLayoutDirection,
            tmp;

        if ((!reversed && index2 < index1) || (reversed && index1 < index2)) {
            tmp    = index1;
            index1 = index2;
            index2 = tmp;
        }

        let itemRects = me.itemRects,
            map       = me.indexMap,
            rect1     = itemRects[index1],
            rect2     = itemRects[index2],
            rect1Copy = {...rect1},
            rect2Copy = {...rect2};

        if (me.sortDirection === 'horizontal') {
            rect1.width = rect2Copy.width;
            rect2.left  = rect1Copy.left + rect2Copy.width;
            rect2.width = rect1Copy.width;
        } else {
            rect1.height = rect2Copy.height;
            rect2.height = rect1Copy.height;
            rect2.top    = rect1Copy.top + rect2Copy.height;
        }

        tmp         = map[index1];
        map[index1] = map[index2];
        map[index2] = tmp;

        me.updateItem(index1, rect1);
        me.updateItem(index2, rect2);
    }

    /**
     *
     * @param {Number} index
     * @param {Object} rect
     */
    updateItem(index, rect) {
        let me    = this,
            item  = me.owner.items[me.indexMap[index]],
            style = item.style;

        style.left = `${rect.left}px`;
        style.top  = `${rect.top}px`;

        item.style = style;
    }
}

Neo.applyClassConfig(SortZone);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9kcmFnZ2FibGUvdG9vbGJhci9EcmFnWm9uZS5tanMiLCJ3ZWJwYWNrOi8vbmVvLm1qcy1yZWFsd29ybGQtZXhhbXBsZS1hcHAvLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZHJhZ2dhYmxlL3Rvb2xiYXIvU29ydFpvbmUubWpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXdEO0FBQ1I7QUFDRDs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsNERBQVk7QUFDbkMsd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7O0FBRTVCO0FBQ0EsYUFBYSxzQ0FBc0M7QUFDbkQsYUFBYSxzQ0FBc0M7QUFDbkQsYUFBYTtBQUNiOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsWUFBWSxvREFBUTtBQUNwQixTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7O0FBRUEsWUFBWSx3REFBWTtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0EsdUNBQXVDLFVBQVU7QUFDakQsdUNBQXVDLFNBQVM7O0FBRWhEOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtB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QSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixTQUFTO0FBQ2xDLHlCQUF5Qjs7QUFFekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCQUF3QixVQUFVO0FBQ2xDLHdCQUF3QixTQUFTOztBQUVqQztBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiY2h1bmtzL3NyYy9kcmFnZ2FibGUvdG9vbGJhci9Tb3J0Wm9uZS1tanMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZURyYWdab25lIGZyb20gJy4uLy4uL2RyYWdnYWJsZS9EcmFnWm9uZS5tanMnO1xuaW1wb3J0IE5lb0FycmF5ICAgICBmcm9tICcuLi8uLi91dGlsL0FycmF5Lm1qcyc7XG5pbXBvcnQgVkRvbVV0aWwgICAgIGZyb20gJy4uLy4uL3V0aWwvVkRvbS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8uZHJhZ2dhYmxlLnRvb2xiYXIuRHJhZ1pvbmVcbiAqIEBleHRlbmRzIE5lby5kcmFnZ2FibGUuRHJhZ1pvbmVcbiAqL1xuY2xhc3MgRHJhZ1pvbmUgZXh0ZW5kcyBCYXNlRHJhZ1pvbmUge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uZHJhZ2dhYmxlLnRvb2xiYXIuRHJhZ1pvbmUnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5kcmFnZ2FibGUudG9vbGJhci5EcmFnWm9uZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSd0b29sYmFyLWRyYWd6b25lJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ3Rvb2xiYXItZHJhZ3pvbmUnXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIGxldCBtZSAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgb3duZXIgICAgICAgID0gbWUub3duZXIsXG4gICAgICAgICAgICBkb21MaXN0ZW5lcnMgPSBvd25lci5kb21MaXN0ZW5lcnMsXG4gICAgICAgICAgICBvcHRzICAgICAgICAgPSB7ZGVsZWdhdGU6ICcubmVvLWRyYWdnYWJsZScsIHNjb3BlOiBtZX07XG5cbiAgICAgICAgZG9tTGlzdGVuZXJzLnB1c2goXG4gICAgICAgICAgICB7J2RyYWc6ZW5kJyAgOiBtZS5vbkRyYWdFbmQsICAgLi4ub3B0c30sXG4gICAgICAgICAgICB7J2RyYWc6bW92ZScgOiBtZS5vbkRyYWdNb3ZlLCAgLi4ub3B0c30sXG4gICAgICAgICAgICB7J2RyYWc6c3RhcnQnOiBtZS5vbkRyYWdTdGFydCwgLi4ub3B0c31cbiAgICAgICAgKTtcblxuICAgICAgICBvd25lci5kb21MaXN0ZW5lcnMgPSBkb21MaXN0ZW5lcnM7XG5cbiAgICAgICAgb3duZXIub24oJ2luc2VydCcsIG1lLm9uSXRlbUluc2VydCwgbWUpO1xuXG4gICAgICAgIG1lLmFkanVzdFRvb2xiYXJJdGVtQ2xzKHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBkcmFnZ2FibGVcbiAgICAgKi9cbiAgICBhZGp1c3RUb29sYmFySXRlbUNscyhkcmFnZ2FibGUpIHtcbiAgICAgICAgbGV0IG1lICAgID0gdGhpcyxcbiAgICAgICAgICAgIG93bmVyID0gbWUub3duZXIsXG4gICAgICAgICAgICB2ZG9tICA9IG93bmVyLnZkb207XG5cbiAgICAgICAgdmRvbS5jbi5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaXRlbS5jbHMgPSBpdGVtLmNscyB8fCBbXTtcblxuICAgICAgICAgICAgTmVvQXJyYXlbZHJhZ2dhYmxlID8gJ2FkZCcgOiAncmVtb3ZlJ10oaXRlbS5jbHMsICduZW8tZHJhZ2dhYmxlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG93bmVyLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbkRyYWdFbmQoZGF0YSkge1xuICAgICAgICBpZiAodGhpcy5vd25lci5kcmFnZ2FibGUpIHtcbiAgICAgICAgICAgIGxldCBtZSAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgICAgIHByb3h5ICAgICAgICA9IG1lLmRyYWdQcm94eSxcbiAgICAgICAgICAgICAgICBjbHMgICAgICAgICAgPSBwcm94eS5jbHMgfHwge30sXG4gICAgICAgICAgICAgICAgcmVjdCAgICAgICAgID0gbWUuZHJhZ0VsZW1lbnRSZWN0LFxuICAgICAgICAgICAgICAgIHdyYXBwZXJTdHlsZSA9IHByb3h5LndyYXBwZXJTdHlsZSB8fCB7fTtcblxuICAgICAgICAgICAgTmVvQXJyYXkuYWRkKGNscywgJ25lby1hbmltYXRlJyk7XG4gICAgICAgICAgICBwcm94eS5jbHMgPSBjbHM7XG5cbiAgICAgICAgICAgIC8vIGVuc3VyZSB0byBnZXQgaW50byB0aGUgbmV4dCBhbmltYXRpb24gZnJhbWVcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHdyYXBwZXJTdHlsZS5sZWZ0ID0gYCR7cmVjdC5sZWZ0fXB4YDtcbiAgICAgICAgICAgICAgICB3cmFwcGVyU3R5bGUudG9wICA9IGAke3JlY3QudG9wfXB4YDtcblxuICAgICAgICAgICAgICAgIHByb3h5LndyYXBwZXJTdHlsZSA9IHdyYXBwZXJTdHlsZTtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBtZS5kcmFnRW5kKCk7XG4gICAgICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgICAgIH0sIDMwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbkRyYWdTdGFydChkYXRhKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKG1lLm93bmVyLmRyYWdnYWJsZSkge1xuICAgICAgICAgICAgbWUuZHJhZ0VsZW1lbnQgPSBWRG9tVXRpbC5maW5kVmRvbUNoaWxkKG1lLm93bmVyLnZkb20sIGRhdGEucGF0aFswXS5pZCkudmRvbTtcbiAgICAgICAgICAgIG1lLmRyYWdTdGFydChkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGRhdGEuaW5kZXhcbiAgICAgKiBAcGFyYW0ge05lby5jb21wb25lbnQuQmFzZX0gZGF0YS5pdGVtXG4gICAgICovXG4gICAgb25JdGVtSW5zZXJ0KGRhdGEpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSBkYXRhLml0ZW0sXG4gICAgICAgICAgICBjbHMgID0gaXRlbS5jbHMgfHwgW107XG5cbiAgICAgICAgTmVvQXJyYXkuYWRkKGNscywgJ25lby1kcmFnZ2FibGUnKTtcbiAgICAgICAgaXRlbS5jbHMgPSBjbHM7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhEcmFnWm9uZSk7XG5cbmV4cG9ydCB7RHJhZ1pvbmUgYXMgZGVmYXVsdH07IiwiaW1wb3J0IERyYWdab25lIGZyb20gJy4vRHJhZ1pvbmUubWpzJztcbmltcG9ydCBWRG9tVXRpbCBmcm9tICcuLi8uLi91dGlsL1ZEb20ubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgTmVvLmRyYWdnYWJsZS50b29sYmFyLlNvcnRab25lXG4gKiBAZXh0ZW5kcyBOZW8uZHJhZ2dhYmxlLnRvb2xiYXIuRHJhZ1pvbmVcbiAqL1xuY2xhc3MgU29ydFpvbmUgZXh0ZW5kcyBEcmFnWm9uZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5kcmFnZ2FibGUudG9vbGJhci5Tb3J0Wm9uZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLmRyYWdnYWJsZS50b29sYmFyLlNvcnRab25lJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J3Rvb2xiYXItc29ydHpvbmUnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAndG9vbGJhci1zb3J0em9uZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBhbHdheXNGaXJlRHJhZ01vdmU9dHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgYWx3YXlzRmlyZURyYWdNb3ZlOiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBjdXJyZW50SW5kZXg9LTFcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY3VycmVudEluZGV4OiAtMSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gaW5kZXhNYXA9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBpbmRleE1hcDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0FycmF5fG51bGx9IGl0ZW1SZWN0cz1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGl0ZW1SZWN0czogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0FycmF5fG51bGx9IGl0ZW1TdHlsZXM9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBpdGVtU3R5bGVzOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBvd25lclJlY3Q9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBvd25lclJlY3Q6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IG93bmVyU3R5bGU9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBvd25lclN0eWxlOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gYWx3YXlzRmlyZURyYWdNb3ZlPWZhbHNlXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHJldmVyc2VkTGF5b3V0RGlyZWN0aW9uOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEludGVybmFsIGZsYWc6IG9uRHJhZ1N0YXJ0KCkgd2lsbCBzZXQgdGhlIHZhbHVlIHRvIGhvcml6b250YWwgb3IgdmVydGljYWwsIGRlcGVuZGluZyBvbiB0aGUgY3VycmVudCBsYXlvdXQuXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gc29ydERpcmVjdGlvbj0naG9yaXpvbnRhbCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc29ydERpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBzdGFydEluZGV4PS0xXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHN0YXJ0SW5kZXg6IC0xXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIGZvciBjbGFzcyBleHRlbnNpb25zIChlLmcuIHRhYi5oZWFkZXIuVG9vbGJhcilcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZnJvbUluZGV4XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRvSW5kZXhcbiAgICAgKi9cbiAgICBtb3ZlVG8oZnJvbUluZGV4LCB0b0luZGV4KSB7XG4gICAgICAgIHRoaXMub3duZXIubW92ZVRvKGZyb21JbmRleCwgdG9JbmRleCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRHJhZ0VuZChkYXRhKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIG93bmVyICAgICAgPSBtZS5vd25lcixcbiAgICAgICAgICAgIGl0ZW1TdHlsZXMgPSBtZS5pdGVtU3R5bGVzLFxuICAgICAgICAgICAgb3duZXJTdHlsZSA9IG93bmVyLnN0eWxlIHx8IHt9LFxuICAgICAgICAgICAgaXRlbVN0eWxlO1xuXG4gICAgICAgIGlmIChvd25lci5zb3J0YWJsZSkge1xuICAgICAgICAgICAgb3duZXJTdHlsZS5oZWlnaHQgPSBtZS5vd25lclN0eWxlLmhlaWdodCB8fCBudWxsO1xuICAgICAgICAgICAgb3duZXJTdHlsZS53aWR0aCAgPSBtZS5vd25lclN0eWxlLndpZHRoICB8fCBudWxsO1xuXG4gICAgICAgICAgICBvd25lci5zdHlsZSA9IG93bmVyU3R5bGU7XG5cbiAgICAgICAgICAgIG93bmVyLml0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbVN0eWxlID0gaXRlbS5zdHlsZSB8fCB7fTtcblxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oaXRlbVN0eWxlLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCAgOiBpdGVtU3R5bGVzW2luZGV4XS5oZWlnaHQgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgbGVmdCAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICB0b3AgICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGggICA6IGl0ZW1TdHlsZXNbaW5kZXhdLndpZHRoIHx8IG51bGxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gbWUuc3RhcnRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtU3R5bGUudmlzaWJpbGl0eSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaXRlbS5zdHlsZSA9IGl0ZW1TdHlsZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAobWUuc3RhcnRJbmRleCAhPT0gbWUuY3VycmVudEluZGV4KSB7XG4gICAgICAgICAgICAgICAgbWUubW92ZVRvKG1lLnN0YXJ0SW5kZXgsIG1lLmN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obWUsIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50SW5kZXg6IC0xLFxuICAgICAgICAgICAgICAgIGluZGV4TWFwICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICBpdGVtUmVjdHMgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgaXRlbVN0eWxlcyAgOiBudWxsLFxuICAgICAgICAgICAgICAgIG93bmVyUmVjdCAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICBzdGFydEluZGV4ICA6IC0xXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWUuZHJhZ0VuZChkYXRhKTsgLy8gd2UgZG8gbm90IHdhbnQgdG8gdHJpZ2dlciB0aGUgc3VwZXIgY2xhc3MgY2FsbCBoZXJlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25EcmFnTW92ZShkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLml0ZW1SZWN0cykgeyAvLyB0aGUgbWV0aG9kIGNhbiB0cmlnZ2VyIGJlZm9yZSB3ZSBnb3QgdGhlIGNsaWVudCByZWN0cyBmcm9tIHRoZSBtYWluIHRocmVhZFxuICAgICAgICAgICAgbGV0IG1lICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgICAgIG1vdmVGYWN0b3IgPSAwLjU1LCAvLyB3ZSBjYW4gbm90IHVzZSAwLjUsIHNpbmNlIGl0ZW1zIHdvdWxkIGp1bXAgYmFjayAmIGZvcnRoXG4gICAgICAgICAgICAgICAgaW5kZXggICAgICA9IG1lLmN1cnJlbnRJbmRleCxcbiAgICAgICAgICAgICAgICBpdGVtUmVjdHMgID0gbWUuaXRlbVJlY3RzLFxuICAgICAgICAgICAgICAgIG1heEl0ZW1zICAgPSBpdGVtUmVjdHMubGVuZ3RoIC0gMSxcbiAgICAgICAgICAgICAgICByZXZlcnNlZCAgID0gbWUucmV2ZXJzZWRMYXlvdXREaXJlY3Rpb24sXG4gICAgICAgICAgICAgICAgZGVsdGEsIGl0ZW1XaWR0aDtcblxuICAgICAgICAgICAgaWYgKG1lLnNvcnREaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgICAgIGRlbHRhICAgICA9IGRhdGEuY2xpZW50WCAtIG1lLm9mZnNldFggLSBpdGVtUmVjdHNbaW5kZXhdLmxlZnQ7XG4gICAgICAgICAgICAgICAgaXRlbVdpZHRoID0gJ3dpZHRoJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsdGEgICAgID0gZGF0YS5jbGllbnRZIC0gbWUub2Zmc2V0WSAtIGl0ZW1SZWN0c1tpbmRleF0udG9wO1xuICAgICAgICAgICAgICAgIGl0ZW1XaWR0aCA9ICdoZWlnaHQnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaW5kZXggPiAwICYmICghcmV2ZXJzZWQgJiYgZGVsdGEgPCAwIHx8IHJldmVyc2VkICYmIGRlbHRhID4gMCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGVsdGEpID4gaXRlbVJlY3RzW2luZGV4IC0gMV1baXRlbVdpZHRoXSAqIG1vdmVGYWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgbWUuY3VycmVudEluZGV4LS07XG4gICAgICAgICAgICAgICAgICAgIG1lLnN3aXRjaEl0ZW1zKGluZGV4LCBtZS5jdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxzZSBpZiAoaW5kZXggPCBtYXhJdGVtcyAmJiAoIXJldmVyc2VkICYmIGRlbHRhID4gMCB8fCByZXZlcnNlZCAmJiBkZWx0YSA8IDApKSB7XG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRlbHRhKSA+IGl0ZW1SZWN0c1tpbmRleCArIDFdW2l0ZW1XaWR0aF0gKiBtb3ZlRmFjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lLmN1cnJlbnRJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICBtZS5zd2l0Y2hJdGVtcyhpbmRleCwgbWUuY3VycmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25EcmFnU3RhcnQoZGF0YSkge1xuICAgICAgICBsZXQgbWUgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBidXR0b24gICAgID0gTmVvLmdldENvbXBvbmVudChkYXRhLnBhdGhbMF0uaWQpLFxuICAgICAgICAgICAgb3duZXIgICAgICA9IG1lLm93bmVyLFxuICAgICAgICAgICAgaXRlbVN0eWxlcyA9IG1lLml0ZW1TdHlsZXMgPSBbXSxcbiAgICAgICAgICAgIGxheW91dCAgICAgPSBvd25lci5sYXlvdXQsXG4gICAgICAgICAgICBvd25lclN0eWxlID0gb3duZXIuc3R5bGUgfHwge30sXG4gICAgICAgICAgICBpbmRleCwgaW5kZXhNYXAsIGl0ZW1TdHlsZSwgcmVjdDtcblxuICAgICAgICBpZiAob3duZXIuc29ydGFibGUpIHtcbiAgICAgICAgICAgIGluZGV4ICAgID0gb3duZXIuaW5kZXhPZihidXR0b24uaWQpO1xuICAgICAgICAgICAgaW5kZXhNYXAgPSB7fTtcblxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihtZSwge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRJbmRleCAgICAgICAgICAgOiBpbmRleCxcbiAgICAgICAgICAgICAgICBkcmFnRWxlbWVudCAgICAgICAgICAgIDogVkRvbVV0aWwuZmluZFZkb21DaGlsZChvd25lci52ZG9tLCBidXR0b24uaWQpLnZkb20sXG4gICAgICAgICAgICAgICAgZHJhZ1Byb3h5Q29uZmlnICAgICAgICA6IHsuLi5tZS5kcmFnUHJveHlDb25maWcgfHwge30sIGNscyA6IFsuLi5vd25lci5jbHNdfSxcbiAgICAgICAgICAgICAgICBpbmRleE1hcCAgICAgICAgICAgICAgIDogaW5kZXhNYXAsXG4gICAgICAgICAgICAgICAgb3duZXJTdHlsZSAgICAgICAgICAgICA6IHtoZWlnaHQ6IG93bmVyU3R5bGUuaGVpZ2h0LCB3aWR0aCA6IG93bmVyU3R5bGUud2lkdGh9LFxuICAgICAgICAgICAgICAgIHJldmVyc2VkTGF5b3V0RGlyZWN0aW9uOiBsYXlvdXQuZGlyZWN0aW9uID09PSAnY29sdW1uLXJldmVyc2UnIHx8IGxheW91dC5kaXJlY3Rpb24gPT09ICdyb3ctcmV2ZXJzZScsXG4gICAgICAgICAgICAgICAgc29ydERpcmVjdGlvbiAgICAgICAgICA6IG93bmVyLmxheW91dC5udHlwZSA9PT0gJ2xheW91dC12Ym94JyA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCcsXG4gICAgICAgICAgICAgICAgc3RhcnRJbmRleCAgICAgICAgICAgICA6IGluZGV4XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWUuZHJhZ1N0YXJ0KGRhdGEpOyAvLyB3ZSBkbyBub3Qgd2FudCB0byB0cmlnZ2VyIHRoZSBzdXBlciBjbGFzcyBjYWxsIGhlcmVcblxuICAgICAgICAgICAgb3duZXIuaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpbmRleE1hcFtpbmRleF0gPSBpbmRleDtcblxuICAgICAgICAgICAgICAgIGl0ZW1TdHlsZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogaXRlbS5zdHlsZSAmJiBpdGVtLnN0eWxlLmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGggOiBpdGVtLnN0eWxlICYmIGl0ZW0uc3R5bGUud2lkdGhcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBOZW8ubWFpbi5Eb21BY2Nlc3MuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KHtcbiAgICAgICAgICAgICAgICBpZDogW293bmVyLmlkXS5jb25jYXQob3duZXIuaXRlbXMubWFwKGUgPT4gZS5pZCkpXG4gICAgICAgICAgICB9KS50aGVuKGl0ZW1SZWN0cyA9PiB7XG4gICAgICAgICAgICAgICAgbWUub3duZXJSZWN0ID0gaXRlbVJlY3RzWzBdO1xuXG4gICAgICAgICAgICAgICAgb3duZXJTdHlsZS5oZWlnaHQgPSBgJHtpdGVtUmVjdHNbMF0uaGVpZ2h0fXB4YDtcbiAgICAgICAgICAgICAgICBvd25lclN0eWxlLndpZHRoICA9IGAke2l0ZW1SZWN0c1swXS53aWR0aH1weGA7XG5cbiAgICAgICAgICAgICAgICAvLyB0aGUgb25seSByZWFzb24gd2UgYXJlIGFkanVzdGluZyB0aGUgdG9vbGJhciBzdHlsZSBpcyB0aGF0IHRoZXJlIGlzIG5vIG1pbiBoZWlnaHQgb3Igd2lkdGggcHJlc2VudC5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmluZyBpdGVtcyBmcm9tIHRoZSBsYXlvdXQgY291bGQgdHJpZ2dlciBhIGNoYW5nZSBpbiBzaXplLlxuICAgICAgICAgICAgICAgIG93bmVyLnN0eWxlID0gb3duZXJTdHlsZTtcblxuICAgICAgICAgICAgICAgIGl0ZW1SZWN0cy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIG1lLml0ZW1SZWN0cyA9IGl0ZW1SZWN0cztcblxuICAgICAgICAgICAgICAgIG93bmVyLml0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1TdHlsZSA9IGl0ZW0uc3R5bGUgfHwge307XG4gICAgICAgICAgICAgICAgICAgIHJlY3QgICAgICA9IGl0ZW1SZWN0c1tpbmRleF07XG5cbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZSA9IE9iamVjdC5hc3NpZ24oaXRlbVN0eWxlLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQgIDogYCR7cmVjdC5oZWlnaHR9cHhgLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCAgICA6IGAke3JlY3QubGVmdH1weGAsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcCAgICAgOiBgJHtyZWN0LnRvcH1weGAsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCAgIDogYCR7cmVjdC53aWR0aH1weGBcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyB3ZSBuZWVkIHRvIGFkZCBhIHNob3J0ICgxIGZyYW1lKSBkZWxheSB0byBlbnN1cmUgdGhlIGl0ZW0gaGFzIHN3aXRjaGVkIHRvIGFuIGFic29sdXRlIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1TdHlsZSA9IGJ1dHRvbi5zdHlsZSB8fCB7fTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbVN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLnN0eWxlID0gaXRlbVN0eWxlO1xuICAgICAgICAgICAgICAgIH0sIDMwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXgxXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4MlxuICAgICAqL1xuICAgIHN3aXRjaEl0ZW1zKGluZGV4MSwgaW5kZXgyKSB7XG4gICAgICAgIGxldCBtZSAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICByZXZlcnNlZCA9IG1lLnJldmVyc2VkTGF5b3V0RGlyZWN0aW9uLFxuICAgICAgICAgICAgdG1wO1xuXG4gICAgICAgIGlmICgoIXJldmVyc2VkICYmIGluZGV4MiA8IGluZGV4MSkgfHwgKHJldmVyc2VkICYmIGluZGV4MSA8IGluZGV4MikpIHtcbiAgICAgICAgICAgIHRtcCAgICA9IGluZGV4MTtcbiAgICAgICAgICAgIGluZGV4MSA9IGluZGV4MjtcbiAgICAgICAgICAgIGluZGV4MiA9IHRtcDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpdGVtUmVjdHMgPSBtZS5pdGVtUmVjdHMsXG4gICAgICAgICAgICBtYXAgICAgICAgPSBtZS5pbmRleE1hcCxcbiAgICAgICAgICAgIHJlY3QxICAgICA9IGl0ZW1SZWN0c1tpbmRleDFdLFxuICAgICAgICAgICAgcmVjdDIgICAgID0gaXRlbVJlY3RzW2luZGV4Ml0sXG4gICAgICAgICAgICByZWN0MUNvcHkgPSB7Li4ucmVjdDF9LFxuICAgICAgICAgICAgcmVjdDJDb3B5ID0gey4uLnJlY3QyfTtcblxuICAgICAgICBpZiAobWUuc29ydERpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICByZWN0MS53aWR0aCA9IHJlY3QyQ29weS53aWR0aDtcbiAgICAgICAgICAgIHJlY3QyLmxlZnQgID0gcmVjdDFDb3B5LmxlZnQgKyByZWN0MkNvcHkud2lkdGg7XG4gICAgICAgICAgICByZWN0Mi53aWR0aCA9IHJlY3QxQ29weS53aWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlY3QxLmhlaWdodCA9IHJlY3QyQ29weS5oZWlnaHQ7XG4gICAgICAgICAgICByZWN0Mi5oZWlnaHQgPSByZWN0MUNvcHkuaGVpZ2h0O1xuICAgICAgICAgICAgcmVjdDIudG9wICAgID0gcmVjdDFDb3B5LnRvcCArIHJlY3QyQ29weS5oZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICB0bXAgICAgICAgICA9IG1hcFtpbmRleDFdO1xuICAgICAgICBtYXBbaW5kZXgxXSA9IG1hcFtpbmRleDJdO1xuICAgICAgICBtYXBbaW5kZXgyXSA9IHRtcDtcblxuICAgICAgICBtZS51cGRhdGVJdGVtKGluZGV4MSwgcmVjdDEpO1xuICAgICAgICBtZS51cGRhdGVJdGVtKGluZGV4MiwgcmVjdDIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlY3RcbiAgICAgKi9cbiAgICB1cGRhdGVJdGVtKGluZGV4LCByZWN0KSB7XG4gICAgICAgIGxldCBtZSAgICA9IHRoaXMsXG4gICAgICAgICAgICBpdGVtICA9IG1lLm93bmVyLml0ZW1zW21lLmluZGV4TWFwW2luZGV4XV0sXG4gICAgICAgICAgICBzdHlsZSA9IGl0ZW0uc3R5bGU7XG5cbiAgICAgICAgc3R5bGUubGVmdCA9IGAke3JlY3QubGVmdH1weGA7XG4gICAgICAgIHN0eWxlLnRvcCAgPSBgJHtyZWN0LnRvcH1weGA7XG5cbiAgICAgICAgaXRlbS5zdHlsZSA9IHN0eWxlO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoU29ydFpvbmUpO1xuXG5leHBvcnQge1NvcnRab25lIGFzIGRlZmF1bHR9OyJdLCJzb3VyY2VSb290IjoiIn0=