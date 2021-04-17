(self["webpackChunkneo_mjs_realworld_example_app"] = self["webpackChunkneo_mjs_realworld_example_app"] || []).push([["src/draggable/toolbar/SortZone-mjs.js"],{

/***/ "./node_modules/neo.mjs/src/draggable/toolbar/DragZone.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/neo.mjs/src/draggable/toolbar/DragZone.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DragZone)
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
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SortZone)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9kcmFnZ2FibGUvdG9vbGJhci9EcmFnWm9uZS5tanMiLCJ3ZWJwYWNrOi8vbmVvLm1qcy1yZWFsd29ybGQtZXhhbXBsZS1hcHAvLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZHJhZ2dhYmxlL3Rvb2xiYXIvU29ydFpvbmUubWpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBd0Q7QUFDUjtBQUNEOztBQUUvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qiw0REFBWTtBQUNuQyx3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qjs7QUFFNUI7QUFDQSxhQUFhLHNDQUFzQztBQUNuRCxhQUFhLHNDQUFzQztBQUNuRCxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxZQUFZLG9EQUFRO0FBQ3BCLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTs7QUFFQSxZQUFZLHdEQUFZO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQSx1Q0FBdUMsVUFBVTtBQUNqRCx1Q0FBdUMsU0FBUzs7QUFFaEQ7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7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QUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsU0FBUztBQUNsQyx5QkFBeUI7O0FBRXpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0IsVUFBVTtBQUNsQyx3QkFBd0IsU0FBUzs7QUFFakM7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6ImNodW5rcy9hcHAvc3JjL2RyYWdnYWJsZS90b29sYmFyL1NvcnRab25lLW1qcy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlRHJhZ1pvbmUgZnJvbSAnLi4vLi4vZHJhZ2dhYmxlL0RyYWdab25lLm1qcyc7XG5pbXBvcnQgTmVvQXJyYXkgICAgIGZyb20gJy4uLy4uL3V0aWwvQXJyYXkubWpzJztcbmltcG9ydCBWRG9tVXRpbCAgICAgZnJvbSAnLi4vLi4vdXRpbC9WRG9tLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby5kcmFnZ2FibGUudG9vbGJhci5EcmFnWm9uZVxuICogQGV4dGVuZHMgTmVvLmRyYWdnYWJsZS5EcmFnWm9uZVxuICovXG5jbGFzcyBEcmFnWm9uZSBleHRlbmRzIEJhc2VEcmFnWm9uZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5kcmFnZ2FibGUudG9vbGJhci5EcmFnWm9uZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLmRyYWdnYWJsZS50b29sYmFyLkRyYWdab25lJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J3Rvb2xiYXItZHJhZ3pvbmUnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAndG9vbGJhci1kcmFnem9uZSdcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBvd25lciAgICAgICAgPSBtZS5vd25lcixcbiAgICAgICAgICAgIGRvbUxpc3RlbmVycyA9IG93bmVyLmRvbUxpc3RlbmVycyxcbiAgICAgICAgICAgIG9wdHMgICAgICAgICA9IHtkZWxlZ2F0ZTogJy5uZW8tZHJhZ2dhYmxlJywgc2NvcGU6IG1lfTtcblxuICAgICAgICBkb21MaXN0ZW5lcnMucHVzaChcbiAgICAgICAgICAgIHsnZHJhZzplbmQnICA6IG1lLm9uRHJhZ0VuZCwgICAuLi5vcHRzfSxcbiAgICAgICAgICAgIHsnZHJhZzptb3ZlJyA6IG1lLm9uRHJhZ01vdmUsICAuLi5vcHRzfSxcbiAgICAgICAgICAgIHsnZHJhZzpzdGFydCc6IG1lLm9uRHJhZ1N0YXJ0LCAuLi5vcHRzfVxuICAgICAgICApO1xuXG4gICAgICAgIG93bmVyLmRvbUxpc3RlbmVycyA9IGRvbUxpc3RlbmVycztcblxuICAgICAgICBvd25lci5vbignaW5zZXJ0JywgbWUub25JdGVtSW5zZXJ0LCBtZSk7XG5cbiAgICAgICAgbWUuYWRqdXN0VG9vbGJhckl0ZW1DbHModHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGRyYWdnYWJsZVxuICAgICAqL1xuICAgIGFkanVzdFRvb2xiYXJJdGVtQ2xzKGRyYWdnYWJsZSkge1xuICAgICAgICBsZXQgbWUgICAgPSB0aGlzLFxuICAgICAgICAgICAgb3duZXIgPSBtZS5vd25lcixcbiAgICAgICAgICAgIHZkb20gID0gb3duZXIudmRvbTtcblxuICAgICAgICB2ZG9tLmNuLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNscyA9IGl0ZW0uY2xzIHx8IFtdO1xuXG4gICAgICAgICAgICBOZW9BcnJheVtkcmFnZ2FibGUgPyAnYWRkJyA6ICdyZW1vdmUnXShpdGVtLmNscywgJ25lby1kcmFnZ2FibGUnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgb3duZXIudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRHJhZ0VuZChkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLm93bmVyLmRyYWdnYWJsZSkge1xuICAgICAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICAgICAgcHJveHkgICAgICAgID0gbWUuZHJhZ1Byb3h5LFxuICAgICAgICAgICAgICAgIGNscyAgICAgICAgICA9IHByb3h5LmNscyB8fCB7fSxcbiAgICAgICAgICAgICAgICByZWN0ICAgICAgICAgPSBtZS5kcmFnRWxlbWVudFJlY3QsXG4gICAgICAgICAgICAgICAgd3JhcHBlclN0eWxlID0gcHJveHkud3JhcHBlclN0eWxlIHx8IHt9O1xuXG4gICAgICAgICAgICBOZW9BcnJheS5hZGQoY2xzLCAnbmVvLWFuaW1hdGUnKTtcbiAgICAgICAgICAgIHByb3h5LmNscyA9IGNscztcblxuICAgICAgICAgICAgLy8gZW5zdXJlIHRvIGdldCBpbnRvIHRoZSBuZXh0IGFuaW1hdGlvbiBmcmFtZVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgd3JhcHBlclN0eWxlLmxlZnQgPSBgJHtyZWN0LmxlZnR9cHhgO1xuICAgICAgICAgICAgICAgIHdyYXBwZXJTdHlsZS50b3AgID0gYCR7cmVjdC50b3B9cHhgO1xuXG4gICAgICAgICAgICAgICAgcHJveHkud3JhcHBlclN0eWxlID0gd3JhcHBlclN0eWxlO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1lLmRyYWdFbmQoKTtcbiAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgfSwgMzApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRHJhZ1N0YXJ0KGRhdGEpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUub3duZXIuZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgICBtZS5kcmFnRWxlbWVudCA9IFZEb21VdGlsLmZpbmRWZG9tQ2hpbGQobWUub3duZXIudmRvbSwgZGF0YS5wYXRoWzBdLmlkKS52ZG9tO1xuICAgICAgICAgICAgbWUuZHJhZ1N0YXJ0KGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZGF0YS5pbmRleFxuICAgICAqIEBwYXJhbSB7TmVvLmNvbXBvbmVudC5CYXNlfSBkYXRhLml0ZW1cbiAgICAgKi9cbiAgICBvbkl0ZW1JbnNlcnQoZGF0YSkge1xuICAgICAgICBsZXQgaXRlbSA9IGRhdGEuaXRlbSxcbiAgICAgICAgICAgIGNscyAgPSBpdGVtLmNscyB8fCBbXTtcblxuICAgICAgICBOZW9BcnJheS5hZGQoY2xzLCAnbmVvLWRyYWdnYWJsZScpO1xuICAgICAgICBpdGVtLmNscyA9IGNscztcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKERyYWdab25lKTtcblxuZXhwb3J0IHtEcmFnWm9uZSBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgRHJhZ1pvbmUgZnJvbSAnLi9EcmFnWm9uZS5tanMnO1xuaW1wb3J0IFZEb21VdGlsIGZyb20gJy4uLy4uL3V0aWwvVkRvbS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8uZHJhZ2dhYmxlLnRvb2xiYXIuU29ydFpvbmVcbiAqIEBleHRlbmRzIE5lby5kcmFnZ2FibGUudG9vbGJhci5EcmFnWm9uZVxuICovXG5jbGFzcyBTb3J0Wm9uZSBleHRlbmRzIERyYWdab25lIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLmRyYWdnYWJsZS50b29sYmFyLlNvcnRab25lJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uZHJhZ2dhYmxlLnRvb2xiYXIuU29ydFpvbmUnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0ndG9vbGJhci1zb3J0em9uZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICd0b29sYmFyLXNvcnR6b25lJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGFsd2F5c0ZpcmVEcmFnTW92ZT10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBhbHdheXNGaXJlRHJhZ01vdmU6IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IGN1cnJlbnRJbmRleD0tMVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjdXJyZW50SW5kZXg6IC0xLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBpbmRleE1hcD1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGluZGV4TWFwOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl8bnVsbH0gaXRlbVJlY3RzPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgaXRlbVJlY3RzOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl8bnVsbH0gaXRlbVN0eWxlcz1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGl0ZW1TdHlsZXM6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IG93bmVyUmVjdD1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG93bmVyUmVjdDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gb3duZXJTdHlsZT1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG93bmVyU3R5bGU6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBhbHdheXNGaXJlRHJhZ01vdmU9ZmFsc2VcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgcmV2ZXJzZWRMYXlvdXREaXJlY3Rpb246IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogSW50ZXJuYWwgZmxhZzogb25EcmFnU3RhcnQoKSB3aWxsIHNldCB0aGUgdmFsdWUgdG8gaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCwgZGVwZW5kaW5nIG9uIHRoZSBjdXJyZW50IGxheW91dC5cbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBzb3J0RGlyZWN0aW9uPSdob3Jpem9udGFsJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBzb3J0RGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IHN0YXJ0SW5kZXg9LTFcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc3RhcnRJbmRleDogLTFcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgZm9yIGNsYXNzIGV4dGVuc2lvbnMgKGUuZy4gdGFiLmhlYWRlci5Ub29sYmFyKVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBmcm9tSW5kZXhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdG9JbmRleFxuICAgICAqL1xuICAgIG1vdmVUbyhmcm9tSW5kZXgsIHRvSW5kZXgpIHtcbiAgICAgICAgdGhpcy5vd25lci5tb3ZlVG8oZnJvbUluZGV4LCB0b0luZGV4KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25EcmFnRW5kKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgb3duZXIgICAgICA9IG1lLm93bmVyLFxuICAgICAgICAgICAgaXRlbVN0eWxlcyA9IG1lLml0ZW1TdHlsZXMsXG4gICAgICAgICAgICBvd25lclN0eWxlID0gb3duZXIuc3R5bGUgfHwge30sXG4gICAgICAgICAgICBpdGVtU3R5bGU7XG5cbiAgICAgICAgaWYgKG93bmVyLnNvcnRhYmxlKSB7XG4gICAgICAgICAgICBvd25lclN0eWxlLmhlaWdodCA9IG1lLm93bmVyU3R5bGUuaGVpZ2h0IHx8IG51bGw7XG4gICAgICAgICAgICBvd25lclN0eWxlLndpZHRoICA9IG1lLm93bmVyU3R5bGUud2lkdGggIHx8IG51bGw7XG5cbiAgICAgICAgICAgIG93bmVyLnN0eWxlID0gb3duZXJTdHlsZTtcblxuICAgICAgICAgICAgb3duZXIuaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtU3R5bGUgPSBpdGVtLnN0eWxlIHx8IHt9O1xuXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihpdGVtU3R5bGUsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ICA6IGl0ZW1TdHlsZXNbaW5kZXhdLmhlaWdodCB8fCBudWxsLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0ICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHRvcCAgICAgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aCAgIDogaXRlbVN0eWxlc1tpbmRleF0ud2lkdGggfHwgbnVsbFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSBtZS5zdGFydEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1TdHlsZS52aXNpYmlsaXR5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlID0gaXRlbVN0eWxlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChtZS5zdGFydEluZGV4ICE9PSBtZS5jdXJyZW50SW5kZXgpIHtcbiAgICAgICAgICAgICAgICBtZS5tb3ZlVG8obWUuc3RhcnRJbmRleCwgbWUuY3VycmVudEluZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihtZSwge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRJbmRleDogLTEsXG4gICAgICAgICAgICAgICAgaW5kZXhNYXAgICAgOiBudWxsLFxuICAgICAgICAgICAgICAgIGl0ZW1SZWN0cyAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICBpdGVtU3R5bGVzICA6IG51bGwsXG4gICAgICAgICAgICAgICAgb3duZXJSZWN0ICAgOiBudWxsLFxuICAgICAgICAgICAgICAgIHN0YXJ0SW5kZXggIDogLTFcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtZS5kcmFnRW5kKGRhdGEpOyAvLyB3ZSBkbyBub3Qgd2FudCB0byB0cmlnZ2VyIHRoZSBzdXBlciBjbGFzcyBjYWxsIGhlcmVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbkRyYWdNb3ZlKGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuaXRlbVJlY3RzKSB7IC8vIHRoZSBtZXRob2QgY2FuIHRyaWdnZXIgYmVmb3JlIHdlIGdvdCB0aGUgY2xpZW50IHJlY3RzIGZyb20gdGhlIG1haW4gdGhyZWFkXG4gICAgICAgICAgICBsZXQgbWUgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICAgICAgbW92ZUZhY3RvciA9IDAuNTUsIC8vIHdlIGNhbiBub3QgdXNlIDAuNSwgc2luY2UgaXRlbXMgd291bGQganVtcCBiYWNrICYgZm9ydGhcbiAgICAgICAgICAgICAgICBpbmRleCAgICAgID0gbWUuY3VycmVudEluZGV4LFxuICAgICAgICAgICAgICAgIGl0ZW1SZWN0cyAgPSBtZS5pdGVtUmVjdHMsXG4gICAgICAgICAgICAgICAgbWF4SXRlbXMgICA9IGl0ZW1SZWN0cy5sZW5ndGggLSAxLFxuICAgICAgICAgICAgICAgIHJldmVyc2VkICAgPSBtZS5yZXZlcnNlZExheW91dERpcmVjdGlvbixcbiAgICAgICAgICAgICAgICBkZWx0YSwgaXRlbVdpZHRoO1xuXG4gICAgICAgICAgICBpZiAobWUuc29ydERpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICAgICAgZGVsdGEgICAgID0gZGF0YS5jbGllbnRYIC0gbWUub2Zmc2V0WCAtIGl0ZW1SZWN0c1tpbmRleF0ubGVmdDtcbiAgICAgICAgICAgICAgICBpdGVtV2lkdGggPSAnd2lkdGgnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWx0YSAgICAgPSBkYXRhLmNsaWVudFkgLSBtZS5vZmZzZXRZIC0gaXRlbVJlY3RzW2luZGV4XS50b3A7XG4gICAgICAgICAgICAgICAgaXRlbVdpZHRoID0gJ2hlaWdodCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA+IDAgJiYgKCFyZXZlcnNlZCAmJiBkZWx0YSA8IDAgfHwgcmV2ZXJzZWQgJiYgZGVsdGEgPiAwKSkge1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkZWx0YSkgPiBpdGVtUmVjdHNbaW5kZXggLSAxXVtpdGVtV2lkdGhdICogbW92ZUZhY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICBtZS5jdXJyZW50SW5kZXgtLTtcbiAgICAgICAgICAgICAgICAgICAgbWUuc3dpdGNoSXRlbXMoaW5kZXgsIG1lLmN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbHNlIGlmIChpbmRleCA8IG1heEl0ZW1zICYmICghcmV2ZXJzZWQgJiYgZGVsdGEgPiAwIHx8IHJldmVyc2VkICYmIGRlbHRhIDwgMCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGVsdGEpID4gaXRlbVJlY3RzW2luZGV4ICsgMV1baXRlbVdpZHRoXSAqIG1vdmVGYWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgbWUuY3VycmVudEluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgIG1lLnN3aXRjaEl0ZW1zKGluZGV4LCBtZS5jdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbkRyYWdTdGFydChkYXRhKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGJ1dHRvbiAgICAgPSBOZW8uZ2V0Q29tcG9uZW50KGRhdGEucGF0aFswXS5pZCksXG4gICAgICAgICAgICBvd25lciAgICAgID0gbWUub3duZXIsXG4gICAgICAgICAgICBpdGVtU3R5bGVzID0gbWUuaXRlbVN0eWxlcyA9IFtdLFxuICAgICAgICAgICAgbGF5b3V0ICAgICA9IG93bmVyLmxheW91dCxcbiAgICAgICAgICAgIG93bmVyU3R5bGUgPSBvd25lci5zdHlsZSB8fCB7fSxcbiAgICAgICAgICAgIGluZGV4LCBpbmRleE1hcCwgaXRlbVN0eWxlLCByZWN0O1xuXG4gICAgICAgIGlmIChvd25lci5zb3J0YWJsZSkge1xuICAgICAgICAgICAgaW5kZXggICAgPSBvd25lci5pbmRleE9mKGJ1dHRvbi5pZCk7XG4gICAgICAgICAgICBpbmRleE1hcCA9IHt9O1xuXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKG1lLCB7XG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4ICAgICAgICAgICA6IGluZGV4LFxuICAgICAgICAgICAgICAgIGRyYWdFbGVtZW50ICAgICAgICAgICAgOiBWRG9tVXRpbC5maW5kVmRvbUNoaWxkKG93bmVyLnZkb20sIGJ1dHRvbi5pZCkudmRvbSxcbiAgICAgICAgICAgICAgICBkcmFnUHJveHlDb25maWcgICAgICAgIDogey4uLm1lLmRyYWdQcm94eUNvbmZpZyB8fCB7fSwgY2xzIDogWy4uLm93bmVyLmNsc119LFxuICAgICAgICAgICAgICAgIGluZGV4TWFwICAgICAgICAgICAgICAgOiBpbmRleE1hcCxcbiAgICAgICAgICAgICAgICBvd25lclN0eWxlICAgICAgICAgICAgIDoge2hlaWdodDogb3duZXJTdHlsZS5oZWlnaHQsIHdpZHRoIDogb3duZXJTdHlsZS53aWR0aH0sXG4gICAgICAgICAgICAgICAgcmV2ZXJzZWRMYXlvdXREaXJlY3Rpb246IGxheW91dC5kaXJlY3Rpb24gPT09ICdjb2x1bW4tcmV2ZXJzZScgfHwgbGF5b3V0LmRpcmVjdGlvbiA9PT0gJ3Jvdy1yZXZlcnNlJyxcbiAgICAgICAgICAgICAgICBzb3J0RGlyZWN0aW9uICAgICAgICAgIDogb3duZXIubGF5b3V0Lm50eXBlID09PSAnbGF5b3V0LXZib3gnID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJyxcbiAgICAgICAgICAgICAgICBzdGFydEluZGV4ICAgICAgICAgICAgIDogaW5kZXhcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtZS5kcmFnU3RhcnQoZGF0YSk7IC8vIHdlIGRvIG5vdCB3YW50IHRvIHRyaWdnZXIgdGhlIHN1cGVyIGNsYXNzIGNhbGwgaGVyZVxuXG4gICAgICAgICAgICBvd25lci5pdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGluZGV4TWFwW2luZGV4XSA9IGluZGV4O1xuXG4gICAgICAgICAgICAgICAgaXRlbVN0eWxlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBpdGVtLnN0eWxlICYmIGl0ZW0uc3R5bGUuaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICB3aWR0aCA6IGl0ZW0uc3R5bGUgJiYgaXRlbS5zdHlsZS53aWR0aFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIE5lby5tYWluLkRvbUFjY2Vzcy5nZXRCb3VuZGluZ0NsaWVudFJlY3Qoe1xuICAgICAgICAgICAgICAgIGlkOiBbb3duZXIuaWRdLmNvbmNhdChvd25lci5pdGVtcy5tYXAoZSA9PiBlLmlkKSlcbiAgICAgICAgICAgIH0pLnRoZW4oaXRlbVJlY3RzID0+IHtcbiAgICAgICAgICAgICAgICBtZS5vd25lclJlY3QgPSBpdGVtUmVjdHNbMF07XG5cbiAgICAgICAgICAgICAgICBvd25lclN0eWxlLmhlaWdodCA9IGAke2l0ZW1SZWN0c1swXS5oZWlnaHR9cHhgO1xuICAgICAgICAgICAgICAgIG93bmVyU3R5bGUud2lkdGggID0gYCR7aXRlbVJlY3RzWzBdLndpZHRofXB4YDtcblxuICAgICAgICAgICAgICAgIC8vIHRoZSBvbmx5IHJlYXNvbiB3ZSBhcmUgYWRqdXN0aW5nIHRoZSB0b29sYmFyIHN0eWxlIGlzIHRoYXQgdGhlcmUgaXMgbm8gbWluIGhlaWdodCBvciB3aWR0aCBwcmVzZW50LlxuICAgICAgICAgICAgICAgIC8vIHJlbW92aW5nIGl0ZW1zIGZyb20gdGhlIGxheW91dCBjb3VsZCB0cmlnZ2VyIGEgY2hhbmdlIGluIHNpemUuXG4gICAgICAgICAgICAgICAgb3duZXIuc3R5bGUgPSBvd25lclN0eWxlO1xuXG4gICAgICAgICAgICAgICAgaXRlbVJlY3RzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgbWUuaXRlbVJlY3RzID0gaXRlbVJlY3RzO1xuXG4gICAgICAgICAgICAgICAgb3duZXIuaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbVN0eWxlID0gaXRlbS5zdHlsZSB8fCB7fTtcbiAgICAgICAgICAgICAgICAgICAgcmVjdCAgICAgID0gaXRlbVJlY3RzW2luZGV4XTtcblxuICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlID0gT2JqZWN0LmFzc2lnbihpdGVtU3R5bGUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodCAgOiBgJHtyZWN0LmhlaWdodH1weGAsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ICAgIDogYCR7cmVjdC5sZWZ0fXB4YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wICAgICA6IGAke3JlY3QudG9wfXB4YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoICAgOiBgJHtyZWN0LndpZHRofXB4YFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIHdlIG5lZWQgdG8gYWRkIGEgc2hvcnQgKDEgZnJhbWUpIGRlbGF5IHRvIGVuc3VyZSB0aGUgaXRlbSBoYXMgc3dpdGNoZWQgdG8gYW4gYWJzb2x1dGUgcG9zaXRpb25cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbVN0eWxlID0gYnV0dG9uLnN0eWxlIHx8IHt9O1xuICAgICAgICAgICAgICAgICAgICBpdGVtU3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgICAgICAgICBidXR0b24uc3R5bGUgPSBpdGVtU3R5bGU7XG4gICAgICAgICAgICAgICAgfSwgMzApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleDFcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXgyXG4gICAgICovXG4gICAgc3dpdGNoSXRlbXMoaW5kZXgxLCBpbmRleDIpIHtcbiAgICAgICAgbGV0IG1lICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHJldmVyc2VkID0gbWUucmV2ZXJzZWRMYXlvdXREaXJlY3Rpb24sXG4gICAgICAgICAgICB0bXA7XG5cbiAgICAgICAgaWYgKCghcmV2ZXJzZWQgJiYgaW5kZXgyIDwgaW5kZXgxKSB8fCAocmV2ZXJzZWQgJiYgaW5kZXgxIDwgaW5kZXgyKSkge1xuICAgICAgICAgICAgdG1wICAgID0gaW5kZXgxO1xuICAgICAgICAgICAgaW5kZXgxID0gaW5kZXgyO1xuICAgICAgICAgICAgaW5kZXgyID0gdG1wO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGl0ZW1SZWN0cyA9IG1lLml0ZW1SZWN0cyxcbiAgICAgICAgICAgIG1hcCAgICAgICA9IG1lLmluZGV4TWFwLFxuICAgICAgICAgICAgcmVjdDEgICAgID0gaXRlbVJlY3RzW2luZGV4MV0sXG4gICAgICAgICAgICByZWN0MiAgICAgPSBpdGVtUmVjdHNbaW5kZXgyXSxcbiAgICAgICAgICAgIHJlY3QxQ29weSA9IHsuLi5yZWN0MX0sXG4gICAgICAgICAgICByZWN0MkNvcHkgPSB7Li4ucmVjdDJ9O1xuXG4gICAgICAgIGlmIChtZS5zb3J0RGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIHJlY3QxLndpZHRoID0gcmVjdDJDb3B5LndpZHRoO1xuICAgICAgICAgICAgcmVjdDIubGVmdCAgPSByZWN0MUNvcHkubGVmdCArIHJlY3QyQ29weS53aWR0aDtcbiAgICAgICAgICAgIHJlY3QyLndpZHRoID0gcmVjdDFDb3B5LndpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVjdDEuaGVpZ2h0ID0gcmVjdDJDb3B5LmhlaWdodDtcbiAgICAgICAgICAgIHJlY3QyLmhlaWdodCA9IHJlY3QxQ29weS5oZWlnaHQ7XG4gICAgICAgICAgICByZWN0Mi50b3AgICAgPSByZWN0MUNvcHkudG9wICsgcmVjdDJDb3B5LmhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRtcCAgICAgICAgID0gbWFwW2luZGV4MV07XG4gICAgICAgIG1hcFtpbmRleDFdID0gbWFwW2luZGV4Ml07XG4gICAgICAgIG1hcFtpbmRleDJdID0gdG1wO1xuXG4gICAgICAgIG1lLnVwZGF0ZUl0ZW0oaW5kZXgxLCByZWN0MSk7XG4gICAgICAgIG1lLnVwZGF0ZUl0ZW0oaW5kZXgyLCByZWN0Mik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVjdFxuICAgICAqL1xuICAgIHVwZGF0ZUl0ZW0oaW5kZXgsIHJlY3QpIHtcbiAgICAgICAgbGV0IG1lICAgID0gdGhpcyxcbiAgICAgICAgICAgIGl0ZW0gID0gbWUub3duZXIuaXRlbXNbbWUuaW5kZXhNYXBbaW5kZXhdXSxcbiAgICAgICAgICAgIHN0eWxlID0gaXRlbS5zdHlsZTtcblxuICAgICAgICBzdHlsZS5sZWZ0ID0gYCR7cmVjdC5sZWZ0fXB4YDtcbiAgICAgICAgc3R5bGUudG9wICA9IGAke3JlY3QudG9wfXB4YDtcblxuICAgICAgICBpdGVtLnN0eWxlID0gc3R5bGU7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhTb3J0Wm9uZSk7XG5cbmV4cG9ydCB7U29ydFpvbmUgYXMgZGVmYXVsdH07Il0sInNvdXJjZVJvb3QiOiIifQ==