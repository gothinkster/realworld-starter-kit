self["webpackChunk"](["src/draggable/tree/DragZone-mjs.js"],{

/***/ "./node_modules/neo.mjs/src/draggable/list/DragZone.mjs":
/*!**************************************************************!*\
  !*** ./node_modules/neo.mjs/src/draggable/list/DragZone.mjs ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DragZone; });
/* harmony import */ var _draggable_DragZone_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../draggable/DragZone.mjs */ "./node_modules/neo.mjs/src/draggable/DragZone.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");
/* harmony import */ var _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/VDom.mjs */ "./node_modules/neo.mjs/src/util/VDom.mjs");




/**
 * @class Neo.draggable.list.DragZone
 * @extends Neo.draggable.DragZone
 */
class DragZone extends _draggable_DragZone_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.draggable.list.DragZone'
         * @protected
         */
        className: 'Neo.draggable.list.DragZone',
        /**
         * @member {String} ntype='list-dragzone'
         * @protected
         */
        ntype: 'list-dragzone',
        /**
         * @member {Object|null} dragProxyConfig
         */
        dragProxyConfig: {
            cls: ['neo-list']
        }
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
            opts         = {delegate: '.neo-draggable', scope: me},
            store        = owner.store;

        domListeners.push(
            {'drag:end'  : me.onDragEnd,   ...opts},
            {'drag:start': me.onDragStart, ...opts}
        );

        owner.domListeners = domListeners;

        store.on({
            load : me.onStoreLoad,
            scope: me
        });

        // check if the store is already loaded
        if (store.getCount() > 0) {
            me.onStoreLoad();
        }
    }

    /**
     *
     * @param {Boolean} draggable
     */
    adjustListItemCls(draggable) {
        let me    = this,
            owner = me.owner,
            store = owner.store,
            vdom  = owner.vdom,
            node;

        store.items.forEach((record, index) => {
            node = me.getItemVdom(record, index);

            if (node) {
                node.cls = node.cls || [];
                _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"][draggable ? 'add' : 'remove'](node.cls, 'neo-draggable');
            }
        });

        owner.vdom = vdom;
    }

    /**
     *
     * @param {Object} record
     * @param {Number} index
     * @returns {Object|null} vdom
     */
    getItemVdom(record, index) {
        return this.owner.vdom.cn[index];
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
     *
     */
    onStoreLoad() {
        this.adjustListItemCls(true);
    }

    /**
     *
     * @param {Object} data={}
     */
    setData(data={}) {
        let me       = this,
            owner    = me.owner,
            recordId = owner.getItemRecordId(me.getDragElementRoot().id);

        data.record = owner.store.get(recordId);

        super.setData(data);
    }
}

Neo.applyClassConfig(DragZone);



/***/ }),

/***/ "./node_modules/neo.mjs/src/draggable/tree/DragZone.mjs":
/*!**************************************************************!*\
  !*** ./node_modules/neo.mjs/src/draggable/tree/DragZone.mjs ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DragZone; });
/* harmony import */ var _draggable_list_DragZone_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../draggable/list/DragZone.mjs */ "./node_modules/neo.mjs/src/draggable/list/DragZone.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");
/* harmony import */ var _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/VDom.mjs */ "./node_modules/neo.mjs/src/util/VDom.mjs");




/**
 * @class Neo.draggable.tree.DragZone
 * @extends Neo.draggable.list.DragZone
 */
class DragZone extends _draggable_list_DragZone_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.draggable.tree.DragZone'
         * @protected
         */
        className: 'Neo.draggable.tree.DragZone',
        /**
         * @member {String} ntype='tree-dragzone'
         * @protected
         */
        ntype: 'tree-dragzone',
        /**
         * @member {Object|null} dragProxyConfig
         */
        dragProxyConfig: {
            cls: ['neo-tree-list']
        },
        /**
         * Limit drag&drop to leaf nodes => excluding folders
         * @member {Boolean} leafNodesOnly_=true
         */
        leafNodesOnly_: false
    }}

    /**
     * Triggered after the leafNodesOnly config got changed
     * We only need to adjust folder (non leaf) nodes
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetLeafNodesOnly(value, oldValue) {
        if (oldValue !== undefined) { // we only need to react to dynamic changes
            let owner = this.owner,
                store = owner.store,
                vdom  = owner.vdom,
                node;

            store.items.forEach(record => {
                if (!record.isLeaf) {
                    node = owner.getVdomChild(owner.getItemId(record.id), owner.vdom);
                    node.cls = node.cls || [];
                    _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"][value ? 'remove' : 'add'](node.cls, 'neo-draggable');
                }
            });

            owner.vdom = vdom;
        }
    }

    /**
     *
     * @returns {Object}
     */
    getDragElementRoot() {
        return this.dragElement.cn[0];
    }

    /**
     *
     * @param {Object} record
     * @param {Number} index
     * @returns {Object|null} vdom
     */
    getItemVdom(record, index) {
        let owner = this.owner;

        if (!(this.leafNodesOnly && !record.isLeaf)) {
            return owner.getVdomChild(owner.getItemId(record.id), owner.vdom);
        }

        return null;
    }

    /**
     *
     * @param {Object} data
     */
    onDragStart(data) {
        let me = this;

        if (me.owner.draggable) {
            me.dragElement = {
                tag: 'ul',
                cls: ['neo-list-container', 'neo-list'],
                cn : [_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].findVdomChild(me.owner.vdom, data.path[0].id).vdom]
            };

            me.dragStart(data);
        }
    }
}

Neo.applyClassConfig(DragZone);



/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZHJhZ2dhYmxlL2xpc3QvRHJhZ1pvbmUubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9kcmFnZ2FibGUvdHJlZS9EcmFnWm9uZS5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBd0Q7QUFDUjtBQUNEOztBQUUvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwrREFBWTtBQUNuQyx3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsc0NBQXNDO0FBQ2xFOztBQUVBO0FBQ0EsYUFBYSxzQ0FBc0M7QUFDbkQsYUFBYTtBQUNiOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQix1REFBUTtBQUN4QjtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTs7QUFFQSxZQUFZLHVEQUFRO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQSx1Q0FBdUMsVUFBVTtBQUNqRCx1Q0FBdUMsU0FBUzs7QUFFaEQ7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZCQUE2QixzREFBUTtBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUM1SkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE2RDtBQUNiO0FBQ0Q7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG9FQUFZO0FBQ25DLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix1REFBUTtBQUM1QjtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHNEQUFRO0FBQzlCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6InNyYy9kcmFnZ2FibGUvdHJlZS9EcmFnWm9uZS1tanMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZURyYWdab25lIGZyb20gJy4uLy4uL2RyYWdnYWJsZS9EcmFnWm9uZS5tanMnO1xuaW1wb3J0IE5lb0FycmF5ICAgICBmcm9tICcuLi8uLi91dGlsL0FycmF5Lm1qcyc7XG5pbXBvcnQgVkRvbVV0aWwgICAgIGZyb20gJy4uLy4uL3V0aWwvVkRvbS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8uZHJhZ2dhYmxlLmxpc3QuRHJhZ1pvbmVcbiAqIEBleHRlbmRzIE5lby5kcmFnZ2FibGUuRHJhZ1pvbmVcbiAqL1xuY2xhc3MgRHJhZ1pvbmUgZXh0ZW5kcyBCYXNlRHJhZ1pvbmUge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uZHJhZ2dhYmxlLmxpc3QuRHJhZ1pvbmUnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5kcmFnZ2FibGUubGlzdC5EcmFnWm9uZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSdsaXN0LWRyYWd6b25lJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ2xpc3QtZHJhZ3pvbmUnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fG51bGx9IGRyYWdQcm94eUNvbmZpZ1xuICAgICAgICAgKi9cbiAgICAgICAgZHJhZ1Byb3h5Q29uZmlnOiB7XG4gICAgICAgICAgICBjbHM6IFsnbmVvLWxpc3QnXVxuICAgICAgICB9XG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIGxldCBtZSAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgb3duZXIgICAgICAgID0gbWUub3duZXIsXG4gICAgICAgICAgICBkb21MaXN0ZW5lcnMgPSBvd25lci5kb21MaXN0ZW5lcnMsXG4gICAgICAgICAgICBvcHRzICAgICAgICAgPSB7ZGVsZWdhdGU6ICcubmVvLWRyYWdnYWJsZScsIHNjb3BlOiBtZX0sXG4gICAgICAgICAgICBzdG9yZSAgICAgICAgPSBvd25lci5zdG9yZTtcblxuICAgICAgICBkb21MaXN0ZW5lcnMucHVzaChcbiAgICAgICAgICAgIHsnZHJhZzplbmQnICA6IG1lLm9uRHJhZ0VuZCwgICAuLi5vcHRzfSxcbiAgICAgICAgICAgIHsnZHJhZzpzdGFydCc6IG1lLm9uRHJhZ1N0YXJ0LCAuLi5vcHRzfVxuICAgICAgICApO1xuXG4gICAgICAgIG93bmVyLmRvbUxpc3RlbmVycyA9IGRvbUxpc3RlbmVycztcblxuICAgICAgICBzdG9yZS5vbih7XG4gICAgICAgICAgICBsb2FkIDogbWUub25TdG9yZUxvYWQsXG4gICAgICAgICAgICBzY29wZTogbWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHN0b3JlIGlzIGFscmVhZHkgbG9hZGVkXG4gICAgICAgIGlmIChzdG9yZS5nZXRDb3VudCgpID4gMCkge1xuICAgICAgICAgICAgbWUub25TdG9yZUxvYWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBkcmFnZ2FibGVcbiAgICAgKi9cbiAgICBhZGp1c3RMaXN0SXRlbUNscyhkcmFnZ2FibGUpIHtcbiAgICAgICAgbGV0IG1lICAgID0gdGhpcyxcbiAgICAgICAgICAgIG93bmVyID0gbWUub3duZXIsXG4gICAgICAgICAgICBzdG9yZSA9IG93bmVyLnN0b3JlLFxuICAgICAgICAgICAgdmRvbSAgPSBvd25lci52ZG9tLFxuICAgICAgICAgICAgbm9kZTtcblxuICAgICAgICBzdG9yZS5pdGVtcy5mb3JFYWNoKChyZWNvcmQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBub2RlID0gbWUuZ2V0SXRlbVZkb20ocmVjb3JkLCBpbmRleCk7XG5cbiAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5jbHMgPSBub2RlLmNscyB8fCBbXTtcbiAgICAgICAgICAgICAgICBOZW9BcnJheVtkcmFnZ2FibGUgPyAnYWRkJyA6ICdyZW1vdmUnXShub2RlLmNscywgJ25lby1kcmFnZ2FibGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgb3duZXIudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVjb3JkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICogQHJldHVybnMge09iamVjdHxudWxsfSB2ZG9tXG4gICAgICovXG4gICAgZ2V0SXRlbVZkb20ocmVjb3JkLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vd25lci52ZG9tLmNuW2luZGV4XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25EcmFnRW5kKGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMub3duZXIuZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgICBsZXQgbWUgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICBwcm94eSAgICAgICAgPSBtZS5kcmFnUHJveHksXG4gICAgICAgICAgICAgICAgY2xzICAgICAgICAgID0gcHJveHkuY2xzIHx8IHt9LFxuICAgICAgICAgICAgICAgIHJlY3QgICAgICAgICA9IG1lLmRyYWdFbGVtZW50UmVjdCxcbiAgICAgICAgICAgICAgICB3cmFwcGVyU3R5bGUgPSBwcm94eS53cmFwcGVyU3R5bGUgfHwge307XG5cbiAgICAgICAgICAgIE5lb0FycmF5LmFkZChjbHMsICduZW8tYW5pbWF0ZScpO1xuICAgICAgICAgICAgcHJveHkuY2xzID0gY2xzO1xuXG4gICAgICAgICAgICAvLyBlbnN1cmUgdG8gZ2V0IGludG8gdGhlIG5leHQgYW5pbWF0aW9uIGZyYW1lXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB3cmFwcGVyU3R5bGUubGVmdCA9IGAke3JlY3QubGVmdH1weGA7XG4gICAgICAgICAgICAgICAgd3JhcHBlclN0eWxlLnRvcCAgPSBgJHtyZWN0LnRvcH1weGA7XG5cbiAgICAgICAgICAgICAgICBwcm94eS53cmFwcGVyU3R5bGUgPSB3cmFwcGVyU3R5bGU7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbWUuZHJhZ0VuZCgpO1xuICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICB9LCAzMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25EcmFnU3RhcnQoZGF0YSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChtZS5vd25lci5kcmFnZ2FibGUpIHtcbiAgICAgICAgICAgIG1lLmRyYWdFbGVtZW50ID0gVkRvbVV0aWwuZmluZFZkb21DaGlsZChtZS5vd25lci52ZG9tLCBkYXRhLnBhdGhbMF0uaWQpLnZkb207XG4gICAgICAgICAgICBtZS5kcmFnU3RhcnQoZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uU3RvcmVMb2FkKCkge1xuICAgICAgICB0aGlzLmFkanVzdExpc3RJdGVtQ2xzKHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGE9e31cbiAgICAgKi9cbiAgICBzZXREYXRhKGRhdGE9e30pIHtcbiAgICAgICAgbGV0IG1lICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIG93bmVyICAgID0gbWUub3duZXIsXG4gICAgICAgICAgICByZWNvcmRJZCA9IG93bmVyLmdldEl0ZW1SZWNvcmRJZChtZS5nZXREcmFnRWxlbWVudFJvb3QoKS5pZCk7XG5cbiAgICAgICAgZGF0YS5yZWNvcmQgPSBvd25lci5zdG9yZS5nZXQocmVjb3JkSWQpO1xuXG4gICAgICAgIHN1cGVyLnNldERhdGEoZGF0YSk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhEcmFnWm9uZSk7XG5cbmV4cG9ydCB7RHJhZ1pvbmUgYXMgZGVmYXVsdH07IiwiaW1wb3J0IEJhc2VEcmFnWm9uZSBmcm9tICcuLi8uLi9kcmFnZ2FibGUvbGlzdC9EcmFnWm9uZS5tanMnO1xuaW1wb3J0IE5lb0FycmF5ICAgICBmcm9tICcuLi8uLi91dGlsL0FycmF5Lm1qcyc7XG5pbXBvcnQgVkRvbVV0aWwgICAgIGZyb20gJy4uLy4uL3V0aWwvVkRvbS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8uZHJhZ2dhYmxlLnRyZWUuRHJhZ1pvbmVcbiAqIEBleHRlbmRzIE5lby5kcmFnZ2FibGUubGlzdC5EcmFnWm9uZVxuICovXG5jbGFzcyBEcmFnWm9uZSBleHRlbmRzIEJhc2VEcmFnWm9uZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5kcmFnZ2FibGUudHJlZS5EcmFnWm9uZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLmRyYWdnYWJsZS50cmVlLkRyYWdab25lJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J3RyZWUtZHJhZ3pvbmUnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAndHJlZS1kcmFnem9uZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R8bnVsbH0gZHJhZ1Byb3h5Q29uZmlnXG4gICAgICAgICAqL1xuICAgICAgICBkcmFnUHJveHlDb25maWc6IHtcbiAgICAgICAgICAgIGNsczogWyduZW8tdHJlZS1saXN0J11cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIExpbWl0IGRyYWcmZHJvcCB0byBsZWFmIG5vZGVzID0+IGV4Y2x1ZGluZyBmb2xkZXJzXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGxlYWZOb2Rlc09ubHlfPXRydWVcbiAgICAgICAgICovXG4gICAgICAgIGxlYWZOb2Rlc09ubHlfOiBmYWxzZVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGxlYWZOb2Rlc09ubHkgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogV2Ugb25seSBuZWVkIHRvIGFkanVzdCBmb2xkZXIgKG5vbiBsZWFmKSBub2Rlc1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0TGVhZk5vZGVzT25seSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlICE9PSB1bmRlZmluZWQpIHsgLy8gd2Ugb25seSBuZWVkIHRvIHJlYWN0IHRvIGR5bmFtaWMgY2hhbmdlc1xuICAgICAgICAgICAgbGV0IG93bmVyID0gdGhpcy5vd25lcixcbiAgICAgICAgICAgICAgICBzdG9yZSA9IG93bmVyLnN0b3JlLFxuICAgICAgICAgICAgICAgIHZkb20gID0gb3duZXIudmRvbSxcbiAgICAgICAgICAgICAgICBub2RlO1xuXG4gICAgICAgICAgICBzdG9yZS5pdGVtcy5mb3JFYWNoKHJlY29yZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZWNvcmQuaXNMZWFmKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBvd25lci5nZXRWZG9tQ2hpbGQob3duZXIuZ2V0SXRlbUlkKHJlY29yZC5pZCksIG93bmVyLnZkb20pO1xuICAgICAgICAgICAgICAgICAgICBub2RlLmNscyA9IG5vZGUuY2xzIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICBOZW9BcnJheVt2YWx1ZSA/ICdyZW1vdmUnIDogJ2FkZCddKG5vZGUuY2xzLCAnbmVvLWRyYWdnYWJsZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBvd25lci52ZG9tID0gdmRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXREcmFnRWxlbWVudFJvb3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRyYWdFbGVtZW50LmNuWzBdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlY29yZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAqIEByZXR1cm5zIHtPYmplY3R8bnVsbH0gdmRvbVxuICAgICAqL1xuICAgIGdldEl0ZW1WZG9tKHJlY29yZCwgaW5kZXgpIHtcbiAgICAgICAgbGV0IG93bmVyID0gdGhpcy5vd25lcjtcblxuICAgICAgICBpZiAoISh0aGlzLmxlYWZOb2Rlc09ubHkgJiYgIXJlY29yZC5pc0xlYWYpKSB7XG4gICAgICAgICAgICByZXR1cm4gb3duZXIuZ2V0VmRvbUNoaWxkKG93bmVyLmdldEl0ZW1JZChyZWNvcmQuaWQpLCBvd25lci52ZG9tKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbkRyYWdTdGFydChkYXRhKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKG1lLm93bmVyLmRyYWdnYWJsZSkge1xuICAgICAgICAgICAgbWUuZHJhZ0VsZW1lbnQgPSB7XG4gICAgICAgICAgICAgICAgdGFnOiAndWwnLFxuICAgICAgICAgICAgICAgIGNsczogWyduZW8tbGlzdC1jb250YWluZXInLCAnbmVvLWxpc3QnXSxcbiAgICAgICAgICAgICAgICBjbiA6IFtWRG9tVXRpbC5maW5kVmRvbUNoaWxkKG1lLm93bmVyLnZkb20sIGRhdGEucGF0aFswXS5pZCkudmRvbV1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIG1lLmRyYWdTdGFydChkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoRHJhZ1pvbmUpO1xuXG5leHBvcnQge0RyYWdab25lIGFzIGRlZmF1bHR9OyJdLCJzb3VyY2VSb290IjoiIn0=