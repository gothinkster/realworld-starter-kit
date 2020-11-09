self["webpackChunk"](["vendors~src/draggable/tab/header/toolbar/SortZone-mjs.js~src/draggable/toolbar/SortZone-mjs.js"],{

/***/ "./node_modules/neo.mjs/src/draggable/toolbar/DragZone.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/neo.mjs/src/draggable/toolbar/DragZone.mjs ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DragZone; });
/* harmony import */ var _draggable_DragZone_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../draggable/DragZone.mjs */ "./node_modules/neo.mjs/src/draggable/DragZone.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");
/* harmony import */ var _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/VDom.mjs */ "./node_modules/neo.mjs/src/util/VDom.mjs");




/**
 * @class Neo.draggable.toolbar.DragZone
 * @extends Neo.draggable.DragZone
 */
class DragZone extends _draggable_DragZone_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
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

            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"][draggable ? 'add' : 'remove'](item.cls, 'neo-draggable');
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

            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(cls, 'neo-animate');
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
            me.dragElement = _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].findVdomChild(me.owner.vdom, data.path[0].id).vdom;
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

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(cls, 'neo-draggable');
        item.cls = cls;
    }
}

Neo.applyClassConfig(DragZone);



/***/ }),

/***/ "./node_modules/neo.mjs/src/draggable/toolbar/SortZone.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/neo.mjs/src/draggable/toolbar/SortZone.mjs ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SortZone; });
/* harmony import */ var _DragZone_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DragZone.mjs */ "./node_modules/neo.mjs/src/draggable/toolbar/DragZone.mjs");
/* harmony import */ var _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/VDom.mjs */ "./node_modules/neo.mjs/src/util/VDom.mjs");



/**
 * @class Neo.draggable.toolbar.SortZone
 * @extends Neo.draggable.toolbar.DragZone
 */
class SortZone extends _DragZone_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
                dragElement            : _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].findVdomChild(owner.vdom, button.id).vdom,
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

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZHJhZ2dhYmxlL3Rvb2xiYXIvRHJhZ1pvbmUubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9kcmFnZ2FibGUvdG9vbGJhci9Tb3J0Wm9uZS5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBd0Q7QUFDUjtBQUNEOztBQUUvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwrREFBWTtBQUNuQyx3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qjs7QUFFNUI7QUFDQSxhQUFhLHNDQUFzQztBQUNuRCxhQUFhLHNDQUFzQztBQUNuRCxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxZQUFZLHVEQUFRO0FBQ3BCLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTs7QUFFQSxZQUFZLHVEQUFRO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQSx1Q0FBdUMsVUFBVTtBQUNqRCx1Q0FBdUMsU0FBUzs7QUFFaEQ7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZCQUE2QixzREFBUTtBQUNyQztBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLFNBQVM7QUFDbEMseUJBQXlCOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLFVBQVU7QUFDbEMsd0JBQXdCLFNBQVM7O0FBRWpDO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiJ2ZW5kb3JzfnNyYy9kcmFnZ2FibGUvdGFiL2hlYWRlci90b29sYmFyL1NvcnRab25lLW1qcy5qc35zcmMvZHJhZ2dhYmxlL3Rvb2xiYXIvU29ydFpvbmUtbWpzLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VEcmFnWm9uZSBmcm9tICcuLi8uLi9kcmFnZ2FibGUvRHJhZ1pvbmUubWpzJztcbmltcG9ydCBOZW9BcnJheSAgICAgZnJvbSAnLi4vLi4vdXRpbC9BcnJheS5tanMnO1xuaW1wb3J0IFZEb21VdGlsICAgICBmcm9tICcuLi8uLi91dGlsL1ZEb20ubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgTmVvLmRyYWdnYWJsZS50b29sYmFyLkRyYWdab25lXG4gKiBAZXh0ZW5kcyBOZW8uZHJhZ2dhYmxlLkRyYWdab25lXG4gKi9cbmNsYXNzIERyYWdab25lIGV4dGVuZHMgQmFzZURyYWdab25lIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLmRyYWdnYWJsZS50b29sYmFyLkRyYWdab25lJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uZHJhZ2dhYmxlLnRvb2xiYXIuRHJhZ1pvbmUnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0ndG9vbGJhci1kcmFnem9uZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICd0b29sYmFyLWRyYWd6b25lJ1xuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBsZXQgbWUgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIG93bmVyICAgICAgICA9IG1lLm93bmVyLFxuICAgICAgICAgICAgZG9tTGlzdGVuZXJzID0gb3duZXIuZG9tTGlzdGVuZXJzLFxuICAgICAgICAgICAgb3B0cyAgICAgICAgID0ge2RlbGVnYXRlOiAnLm5lby1kcmFnZ2FibGUnLCBzY29wZTogbWV9O1xuXG4gICAgICAgIGRvbUxpc3RlbmVycy5wdXNoKFxuICAgICAgICAgICAgeydkcmFnOmVuZCcgIDogbWUub25EcmFnRW5kLCAgIC4uLm9wdHN9LFxuICAgICAgICAgICAgeydkcmFnOm1vdmUnIDogbWUub25EcmFnTW92ZSwgIC4uLm9wdHN9LFxuICAgICAgICAgICAgeydkcmFnOnN0YXJ0JzogbWUub25EcmFnU3RhcnQsIC4uLm9wdHN9XG4gICAgICAgICk7XG5cbiAgICAgICAgb3duZXIuZG9tTGlzdGVuZXJzID0gZG9tTGlzdGVuZXJzO1xuXG4gICAgICAgIG93bmVyLm9uKCdpbnNlcnQnLCBtZS5vbkl0ZW1JbnNlcnQsIG1lKTtcblxuICAgICAgICBtZS5hZGp1c3RUb29sYmFySXRlbUNscyh0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZHJhZ2dhYmxlXG4gICAgICovXG4gICAgYWRqdXN0VG9vbGJhckl0ZW1DbHMoZHJhZ2dhYmxlKSB7XG4gICAgICAgIGxldCBtZSAgICA9IHRoaXMsXG4gICAgICAgICAgICBvd25lciA9IG1lLm93bmVyLFxuICAgICAgICAgICAgdmRvbSAgPSBvd25lci52ZG9tO1xuXG4gICAgICAgIHZkb20uY24uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2xzID0gaXRlbS5jbHMgfHwgW107XG5cbiAgICAgICAgICAgIE5lb0FycmF5W2RyYWdnYWJsZSA/ICdhZGQnIDogJ3JlbW92ZSddKGl0ZW0uY2xzLCAnbmVvLWRyYWdnYWJsZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBvd25lci52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25EcmFnRW5kKGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMub3duZXIuZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgICBsZXQgbWUgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICBwcm94eSAgICAgICAgPSBtZS5kcmFnUHJveHksXG4gICAgICAgICAgICAgICAgY2xzICAgICAgICAgID0gcHJveHkuY2xzIHx8IHt9LFxuICAgICAgICAgICAgICAgIHJlY3QgICAgICAgICA9IG1lLmRyYWdFbGVtZW50UmVjdCxcbiAgICAgICAgICAgICAgICB3cmFwcGVyU3R5bGUgPSBwcm94eS53cmFwcGVyU3R5bGUgfHwge307XG5cbiAgICAgICAgICAgIE5lb0FycmF5LmFkZChjbHMsICduZW8tYW5pbWF0ZScpO1xuICAgICAgICAgICAgcHJveHkuY2xzID0gY2xzO1xuXG4gICAgICAgICAgICAvLyBlbnN1cmUgdG8gZ2V0IGludG8gdGhlIG5leHQgYW5pbWF0aW9uIGZyYW1lXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB3cmFwcGVyU3R5bGUubGVmdCA9IGAke3JlY3QubGVmdH1weGA7XG4gICAgICAgICAgICAgICAgd3JhcHBlclN0eWxlLnRvcCAgPSBgJHtyZWN0LnRvcH1weGA7XG5cbiAgICAgICAgICAgICAgICBwcm94eS53cmFwcGVyU3R5bGUgPSB3cmFwcGVyU3R5bGU7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbWUuZHJhZ0VuZCgpO1xuICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICB9LCAzMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25EcmFnU3RhcnQoZGF0YSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChtZS5vd25lci5kcmFnZ2FibGUpIHtcbiAgICAgICAgICAgIG1lLmRyYWdFbGVtZW50ID0gVkRvbVV0aWwuZmluZFZkb21DaGlsZChtZS5vd25lci52ZG9tLCBkYXRhLnBhdGhbMF0uaWQpLnZkb207XG4gICAgICAgICAgICBtZS5kcmFnU3RhcnQoZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkYXRhLmluZGV4XG4gICAgICogQHBhcmFtIHtOZW8uY29tcG9uZW50LkJhc2V9IGRhdGEuaXRlbVxuICAgICAqL1xuICAgIG9uSXRlbUluc2VydChkYXRhKSB7XG4gICAgICAgIGxldCBpdGVtID0gZGF0YS5pdGVtLFxuICAgICAgICAgICAgY2xzICA9IGl0ZW0uY2xzIHx8IFtdO1xuXG4gICAgICAgIE5lb0FycmF5LmFkZChjbHMsICduZW8tZHJhZ2dhYmxlJyk7XG4gICAgICAgIGl0ZW0uY2xzID0gY2xzO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoRHJhZ1pvbmUpO1xuXG5leHBvcnQge0RyYWdab25lIGFzIGRlZmF1bHR9OyIsImltcG9ydCBEcmFnWm9uZSBmcm9tICcuL0RyYWdab25lLm1qcyc7XG5pbXBvcnQgVkRvbVV0aWwgZnJvbSAnLi4vLi4vdXRpbC9WRG9tLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby5kcmFnZ2FibGUudG9vbGJhci5Tb3J0Wm9uZVxuICogQGV4dGVuZHMgTmVvLmRyYWdnYWJsZS50b29sYmFyLkRyYWdab25lXG4gKi9cbmNsYXNzIFNvcnRab25lIGV4dGVuZHMgRHJhZ1pvbmUge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uZHJhZ2dhYmxlLnRvb2xiYXIuU29ydFpvbmUnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5kcmFnZ2FibGUudG9vbGJhci5Tb3J0Wm9uZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSd0b29sYmFyLXNvcnR6b25lJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ3Rvb2xiYXItc29ydHpvbmUnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gYWx3YXlzRmlyZURyYWdNb3ZlPXRydWVcbiAgICAgICAgICovXG4gICAgICAgIGFsd2F5c0ZpcmVEcmFnTW92ZTogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gY3VycmVudEluZGV4PS0xXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGN1cnJlbnRJbmRleDogLTEsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IGluZGV4TWFwPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgaW5kZXhNYXA6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtBcnJheXxudWxsfSBpdGVtUmVjdHM9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBpdGVtUmVjdHM6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtBcnJheXxudWxsfSBpdGVtU3R5bGVzPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgaXRlbVN0eWxlczogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gb3duZXJSZWN0PW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgb3duZXJSZWN0OiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBvd25lclN0eWxlPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgb3duZXJTdHlsZTogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGFsd2F5c0ZpcmVEcmFnTW92ZT1mYWxzZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICByZXZlcnNlZExheW91dERpcmVjdGlvbjogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnRlcm5hbCBmbGFnOiBvbkRyYWdTdGFydCgpIHdpbGwgc2V0IHRoZSB2YWx1ZSB0byBob3Jpem9udGFsIG9yIHZlcnRpY2FsLCBkZXBlbmRpbmcgb24gdGhlIGN1cnJlbnQgbGF5b3V0LlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IHNvcnREaXJlY3Rpb249J2hvcml6b250YWwnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHNvcnREaXJlY3Rpb246ICdob3Jpem9udGFsJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gc3RhcnRJbmRleD0tMVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBzdGFydEluZGV4OiAtMVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCBmb3IgY2xhc3MgZXh0ZW5zaW9ucyAoZS5nLiB0YWIuaGVhZGVyLlRvb2xiYXIpXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGZyb21JbmRleFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0b0luZGV4XG4gICAgICovXG4gICAgbW92ZVRvKGZyb21JbmRleCwgdG9JbmRleCkge1xuICAgICAgICB0aGlzLm93bmVyLm1vdmVUbyhmcm9tSW5kZXgsIHRvSW5kZXgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbkRyYWdFbmQoZGF0YSkge1xuICAgICAgICBsZXQgbWUgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBvd25lciAgICAgID0gbWUub3duZXIsXG4gICAgICAgICAgICBpdGVtU3R5bGVzID0gbWUuaXRlbVN0eWxlcyxcbiAgICAgICAgICAgIG93bmVyU3R5bGUgPSBvd25lci5zdHlsZSB8fCB7fSxcbiAgICAgICAgICAgIGl0ZW1TdHlsZTtcblxuICAgICAgICBpZiAob3duZXIuc29ydGFibGUpIHtcbiAgICAgICAgICAgIG93bmVyU3R5bGUuaGVpZ2h0ID0gbWUub3duZXJTdHlsZS5oZWlnaHQgfHwgbnVsbDtcbiAgICAgICAgICAgIG93bmVyU3R5bGUud2lkdGggID0gbWUub3duZXJTdHlsZS53aWR0aCAgfHwgbnVsbDtcblxuICAgICAgICAgICAgb3duZXIuc3R5bGUgPSBvd25lclN0eWxlO1xuXG4gICAgICAgICAgICBvd25lci5pdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW1TdHlsZSA9IGl0ZW0uc3R5bGUgfHwge307XG5cbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGl0ZW1TdHlsZSwge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQgIDogaXRlbVN0eWxlc1tpbmRleF0uaGVpZ2h0IHx8IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQgICAgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgdG9wICAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoICAgOiBpdGVtU3R5bGVzW2luZGV4XS53aWR0aCB8fCBudWxsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IG1lLnN0YXJ0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbVN0eWxlLnZpc2liaWxpdHkgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUgPSBpdGVtU3R5bGU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG1lLnN0YXJ0SW5kZXggIT09IG1lLmN1cnJlbnRJbmRleCkge1xuICAgICAgICAgICAgICAgIG1lLm1vdmVUbyhtZS5zdGFydEluZGV4LCBtZS5jdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKG1lLCB7XG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4OiAtMSxcbiAgICAgICAgICAgICAgICBpbmRleE1hcCAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgaXRlbVJlY3RzICAgOiBudWxsLFxuICAgICAgICAgICAgICAgIGl0ZW1TdHlsZXMgIDogbnVsbCxcbiAgICAgICAgICAgICAgICBvd25lclJlY3QgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgc3RhcnRJbmRleCAgOiAtMVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1lLmRyYWdFbmQoZGF0YSk7IC8vIHdlIGRvIG5vdCB3YW50IHRvIHRyaWdnZXIgdGhlIHN1cGVyIGNsYXNzIGNhbGwgaGVyZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRHJhZ01vdmUoZGF0YSkge1xuICAgICAgICBpZiAodGhpcy5pdGVtUmVjdHMpIHsgLy8gdGhlIG1ldGhvZCBjYW4gdHJpZ2dlciBiZWZvcmUgd2UgZ290IHRoZSBjbGllbnQgcmVjdHMgZnJvbSB0aGUgbWFpbiB0aHJlYWRcbiAgICAgICAgICAgIGxldCBtZSAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICBtb3ZlRmFjdG9yID0gMC41NSwgLy8gd2UgY2FuIG5vdCB1c2UgMC41LCBzaW5jZSBpdGVtcyB3b3VsZCBqdW1wIGJhY2sgJiBmb3J0aFxuICAgICAgICAgICAgICAgIGluZGV4ICAgICAgPSBtZS5jdXJyZW50SW5kZXgsXG4gICAgICAgICAgICAgICAgaXRlbVJlY3RzICA9IG1lLml0ZW1SZWN0cyxcbiAgICAgICAgICAgICAgICBtYXhJdGVtcyAgID0gaXRlbVJlY3RzLmxlbmd0aCAtIDEsXG4gICAgICAgICAgICAgICAgcmV2ZXJzZWQgICA9IG1lLnJldmVyc2VkTGF5b3V0RGlyZWN0aW9uLFxuICAgICAgICAgICAgICAgIGRlbHRhLCBpdGVtV2lkdGg7XG5cbiAgICAgICAgICAgIGlmIChtZS5zb3J0RGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgICAgICBkZWx0YSAgICAgPSBkYXRhLmNsaWVudFggLSBtZS5vZmZzZXRYIC0gaXRlbVJlY3RzW2luZGV4XS5sZWZ0O1xuICAgICAgICAgICAgICAgIGl0ZW1XaWR0aCA9ICd3aWR0aCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlbHRhICAgICA9IGRhdGEuY2xpZW50WSAtIG1lLm9mZnNldFkgLSBpdGVtUmVjdHNbaW5kZXhdLnRvcDtcbiAgICAgICAgICAgICAgICBpdGVtV2lkdGggPSAnaGVpZ2h0JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGluZGV4ID4gMCAmJiAoIXJldmVyc2VkICYmIGRlbHRhIDwgMCB8fCByZXZlcnNlZCAmJiBkZWx0YSA+IDApKSB7XG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRlbHRhKSA+IGl0ZW1SZWN0c1tpbmRleCAtIDFdW2l0ZW1XaWR0aF0gKiBtb3ZlRmFjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lLmN1cnJlbnRJbmRleC0tO1xuICAgICAgICAgICAgICAgICAgICBtZS5zd2l0Y2hJdGVtcyhpbmRleCwgbWUuY3VycmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsc2UgaWYgKGluZGV4IDwgbWF4SXRlbXMgJiYgKCFyZXZlcnNlZCAmJiBkZWx0YSA+IDAgfHwgcmV2ZXJzZWQgJiYgZGVsdGEgPCAwKSkge1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkZWx0YSkgPiBpdGVtUmVjdHNbaW5kZXggKyAxXVtpdGVtV2lkdGhdICogbW92ZUZhY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICBtZS5jdXJyZW50SW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgbWUuc3dpdGNoSXRlbXMoaW5kZXgsIG1lLmN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRHJhZ1N0YXJ0KGRhdGEpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgYnV0dG9uICAgICA9IE5lby5nZXRDb21wb25lbnQoZGF0YS5wYXRoWzBdLmlkKSxcbiAgICAgICAgICAgIG93bmVyICAgICAgPSBtZS5vd25lcixcbiAgICAgICAgICAgIGl0ZW1TdHlsZXMgPSBtZS5pdGVtU3R5bGVzID0gW10sXG4gICAgICAgICAgICBsYXlvdXQgICAgID0gb3duZXIubGF5b3V0LFxuICAgICAgICAgICAgb3duZXJTdHlsZSA9IG93bmVyLnN0eWxlIHx8IHt9LFxuICAgICAgICAgICAgaW5kZXgsIGluZGV4TWFwLCBpdGVtU3R5bGUsIHJlY3Q7XG5cbiAgICAgICAgaWYgKG93bmVyLnNvcnRhYmxlKSB7XG4gICAgICAgICAgICBpbmRleCAgICA9IG93bmVyLmluZGV4T2YoYnV0dG9uLmlkKTtcbiAgICAgICAgICAgIGluZGV4TWFwID0ge307XG5cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obWUsIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50SW5kZXggICAgICAgICAgIDogaW5kZXgsXG4gICAgICAgICAgICAgICAgZHJhZ0VsZW1lbnQgICAgICAgICAgICA6IFZEb21VdGlsLmZpbmRWZG9tQ2hpbGQob3duZXIudmRvbSwgYnV0dG9uLmlkKS52ZG9tLFxuICAgICAgICAgICAgICAgIGRyYWdQcm94eUNvbmZpZyAgICAgICAgOiB7Li4ubWUuZHJhZ1Byb3h5Q29uZmlnIHx8IHt9LCBjbHMgOiBbLi4ub3duZXIuY2xzXX0sXG4gICAgICAgICAgICAgICAgaW5kZXhNYXAgICAgICAgICAgICAgICA6IGluZGV4TWFwLFxuICAgICAgICAgICAgICAgIG93bmVyU3R5bGUgICAgICAgICAgICAgOiB7aGVpZ2h0OiBvd25lclN0eWxlLmhlaWdodCwgd2lkdGggOiBvd25lclN0eWxlLndpZHRofSxcbiAgICAgICAgICAgICAgICByZXZlcnNlZExheW91dERpcmVjdGlvbjogbGF5b3V0LmRpcmVjdGlvbiA9PT0gJ2NvbHVtbi1yZXZlcnNlJyB8fCBsYXlvdXQuZGlyZWN0aW9uID09PSAncm93LXJldmVyc2UnLFxuICAgICAgICAgICAgICAgIHNvcnREaXJlY3Rpb24gICAgICAgICAgOiBvd25lci5sYXlvdXQubnR5cGUgPT09ICdsYXlvdXQtdmJveCcgPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnLFxuICAgICAgICAgICAgICAgIHN0YXJ0SW5kZXggICAgICAgICAgICAgOiBpbmRleFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1lLmRyYWdTdGFydChkYXRhKTsgLy8gd2UgZG8gbm90IHdhbnQgdG8gdHJpZ2dlciB0aGUgc3VwZXIgY2xhc3MgY2FsbCBoZXJlXG5cbiAgICAgICAgICAgIG93bmVyLml0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaW5kZXhNYXBbaW5kZXhdID0gaW5kZXg7XG5cbiAgICAgICAgICAgICAgICBpdGVtU3R5bGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGl0ZW0uc3R5bGUgJiYgaXRlbS5zdHlsZS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoIDogaXRlbS5zdHlsZSAmJiBpdGVtLnN0eWxlLndpZHRoXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgTmVvLm1haW4uRG9tQWNjZXNzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCh7XG4gICAgICAgICAgICAgICAgaWQ6IFtvd25lci5pZF0uY29uY2F0KG93bmVyLml0ZW1zLm1hcChlID0+IGUuaWQpKVxuICAgICAgICAgICAgfSkudGhlbihpdGVtUmVjdHMgPT4ge1xuICAgICAgICAgICAgICAgIG1lLm93bmVyUmVjdCA9IGl0ZW1SZWN0c1swXTtcblxuICAgICAgICAgICAgICAgIG93bmVyU3R5bGUuaGVpZ2h0ID0gYCR7aXRlbVJlY3RzWzBdLmhlaWdodH1weGA7XG4gICAgICAgICAgICAgICAgb3duZXJTdHlsZS53aWR0aCAgPSBgJHtpdGVtUmVjdHNbMF0ud2lkdGh9cHhgO1xuXG4gICAgICAgICAgICAgICAgLy8gdGhlIG9ubHkgcmVhc29uIHdlIGFyZSBhZGp1c3RpbmcgdGhlIHRvb2xiYXIgc3R5bGUgaXMgdGhhdCB0aGVyZSBpcyBubyBtaW4gaGVpZ2h0IG9yIHdpZHRoIHByZXNlbnQuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZpbmcgaXRlbXMgZnJvbSB0aGUgbGF5b3V0IGNvdWxkIHRyaWdnZXIgYSBjaGFuZ2UgaW4gc2l6ZS5cbiAgICAgICAgICAgICAgICBvd25lci5zdHlsZSA9IG93bmVyU3R5bGU7XG5cbiAgICAgICAgICAgICAgICBpdGVtUmVjdHMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBtZS5pdGVtUmVjdHMgPSBpdGVtUmVjdHM7XG5cbiAgICAgICAgICAgICAgICBvd25lci5pdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtU3R5bGUgPSBpdGVtLnN0eWxlIHx8IHt9O1xuICAgICAgICAgICAgICAgICAgICByZWN0ICAgICAgPSBpdGVtUmVjdHNbaW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUgPSBPYmplY3QuYXNzaWduKGl0ZW1TdHlsZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ICA6IGAke3JlY3QuaGVpZ2h0fXB4YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgICAgOiBgJHtyZWN0LmxlZnR9cHhgLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3AgICAgIDogYCR7cmVjdC50b3B9cHhgLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGggICA6IGAke3JlY3Qud2lkdGh9cHhgXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gd2UgbmVlZCB0byBhZGQgYSBzaG9ydCAoMSBmcmFtZSkgZGVsYXkgdG8gZW5zdXJlIHRoZSBpdGVtIGhhcyBzd2l0Y2hlZCB0byBhbiBhYnNvbHV0ZSBwb3NpdGlvblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtU3R5bGUgPSBidXR0b24uc3R5bGUgfHwge307XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1TdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5zdHlsZSA9IGl0ZW1TdHlsZTtcbiAgICAgICAgICAgICAgICB9LCAzMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4MVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleDJcbiAgICAgKi9cbiAgICBzd2l0Y2hJdGVtcyhpbmRleDEsIGluZGV4Mikge1xuICAgICAgICBsZXQgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgcmV2ZXJzZWQgPSBtZS5yZXZlcnNlZExheW91dERpcmVjdGlvbixcbiAgICAgICAgICAgIHRtcDtcblxuICAgICAgICBpZiAoKCFyZXZlcnNlZCAmJiBpbmRleDIgPCBpbmRleDEpIHx8IChyZXZlcnNlZCAmJiBpbmRleDEgPCBpbmRleDIpKSB7XG4gICAgICAgICAgICB0bXAgICAgPSBpbmRleDE7XG4gICAgICAgICAgICBpbmRleDEgPSBpbmRleDI7XG4gICAgICAgICAgICBpbmRleDIgPSB0bXA7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaXRlbVJlY3RzID0gbWUuaXRlbVJlY3RzLFxuICAgICAgICAgICAgbWFwICAgICAgID0gbWUuaW5kZXhNYXAsXG4gICAgICAgICAgICByZWN0MSAgICAgPSBpdGVtUmVjdHNbaW5kZXgxXSxcbiAgICAgICAgICAgIHJlY3QyICAgICA9IGl0ZW1SZWN0c1tpbmRleDJdLFxuICAgICAgICAgICAgcmVjdDFDb3B5ID0gey4uLnJlY3QxfSxcbiAgICAgICAgICAgIHJlY3QyQ29weSA9IHsuLi5yZWN0Mn07XG5cbiAgICAgICAgaWYgKG1lLnNvcnREaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgcmVjdDEud2lkdGggPSByZWN0MkNvcHkud2lkdGg7XG4gICAgICAgICAgICByZWN0Mi5sZWZ0ICA9IHJlY3QxQ29weS5sZWZ0ICsgcmVjdDJDb3B5LndpZHRoO1xuICAgICAgICAgICAgcmVjdDIud2lkdGggPSByZWN0MUNvcHkud2lkdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWN0MS5oZWlnaHQgPSByZWN0MkNvcHkuaGVpZ2h0O1xuICAgICAgICAgICAgcmVjdDIuaGVpZ2h0ID0gcmVjdDFDb3B5LmhlaWdodDtcbiAgICAgICAgICAgIHJlY3QyLnRvcCAgICA9IHJlY3QxQ29weS50b3AgKyByZWN0MkNvcHkuaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgdG1wICAgICAgICAgPSBtYXBbaW5kZXgxXTtcbiAgICAgICAgbWFwW2luZGV4MV0gPSBtYXBbaW5kZXgyXTtcbiAgICAgICAgbWFwW2luZGV4Ml0gPSB0bXA7XG5cbiAgICAgICAgbWUudXBkYXRlSXRlbShpbmRleDEsIHJlY3QxKTtcbiAgICAgICAgbWUudXBkYXRlSXRlbShpbmRleDIsIHJlY3QyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZWN0XG4gICAgICovXG4gICAgdXBkYXRlSXRlbShpbmRleCwgcmVjdCkge1xuICAgICAgICBsZXQgbWUgICAgPSB0aGlzLFxuICAgICAgICAgICAgaXRlbSAgPSBtZS5vd25lci5pdGVtc1ttZS5pbmRleE1hcFtpbmRleF1dLFxuICAgICAgICAgICAgc3R5bGUgPSBpdGVtLnN0eWxlO1xuXG4gICAgICAgIHN0eWxlLmxlZnQgPSBgJHtyZWN0LmxlZnR9cHhgO1xuICAgICAgICBzdHlsZS50b3AgID0gYCR7cmVjdC50b3B9cHhgO1xuXG4gICAgICAgIGl0ZW0uc3R5bGUgPSBzdHlsZTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKFNvcnRab25lKTtcblxuZXhwb3J0IHtTb3J0Wm9uZSBhcyBkZWZhdWx0fTsiXSwic291cmNlUm9vdCI6IiJ9