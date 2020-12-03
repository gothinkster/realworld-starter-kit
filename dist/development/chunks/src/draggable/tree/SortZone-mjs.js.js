(self["webpackChunkneo_mjs_realworld_example_app"] = self["webpackChunkneo_mjs_realworld_example_app"] || []).push([["src/draggable/tree/SortZone-mjs.js"],{

/***/ "./node_modules/neo.mjs/src/draggable/list/DragZone.mjs":
/*!**************************************************************!*\
  !*** ./node_modules/neo.mjs/src/draggable/list/DragZone.mjs ***!
  \**************************************************************/
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
 * @class Neo.draggable.list.DragZone
 * @extends Neo.draggable.DragZone
 */
class DragZone extends _draggable_DragZone_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
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
                _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__.default[draggable ? 'add' : 'remove'](node.cls, 'neo-draggable');
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
/* harmony import */ var _draggable_list_DragZone_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../draggable/list/DragZone.mjs */ "./node_modules/neo.mjs/src/draggable/list/DragZone.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");
/* harmony import */ var _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/VDom.mjs */ "./node_modules/neo.mjs/src/util/VDom.mjs");




/**
 * @class Neo.draggable.tree.DragZone
 * @extends Neo.draggable.list.DragZone
 */
class DragZone extends _draggable_list_DragZone_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
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
                    _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__.default[value ? 'remove' : 'add'](node.cls, 'neo-draggable');
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
                cn : [_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_2__.default.findVdomChild(me.owner.vdom, data.path[0].id).vdom]
            };

            me.dragStart(data);
        }
    }
}

Neo.applyClassConfig(DragZone);



/***/ }),

/***/ "./node_modules/neo.mjs/src/draggable/tree/SortZone.mjs":
/*!**************************************************************!*\
  !*** ./node_modules/neo.mjs/src/draggable/tree/SortZone.mjs ***!
  \**************************************************************/
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
/* harmony import */ var _DragZone_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DragZone.mjs */ "./node_modules/neo.mjs/src/draggable/tree/DragZone.mjs");


/**
 * @class Neo.draggable.tree.SortZone
 * @extends Neo.draggable.tree.DragZone
 */
class SortZone extends _DragZone_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.draggable.tree.SortZone'
         * @protected
         */
        className: 'Neo.draggable.tree.SortZone',
        /**
         * @member {String} ntype='tree-sortzone'
         * @protected
         */
        ntype: 'tree-sortzone'
    }}
}

Neo.applyClassConfig(SortZone);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9kcmFnZ2FibGUvbGlzdC9EcmFnWm9uZS5tanMiLCJ3ZWJwYWNrOi8vbmVvLm1qcy1yZWFsd29ybGQtZXhhbXBsZS1hcHAvLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZHJhZ2dhYmxlL3RyZWUvRHJhZ1pvbmUubWpzIiwid2VicGFjazovL25lby5tanMtcmVhbHdvcmxkLWV4YW1wbGUtYXBwLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2RyYWdnYWJsZS90cmVlL1NvcnRab25lLm1qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF3RDtBQUNSO0FBQ0Q7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDREQUFZO0FBQ25DLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixzQ0FBc0M7QUFDbEU7O0FBRUE7QUFDQSxhQUFhLHNDQUFzQztBQUNuRCxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCLG9EQUFRO0FBQ3hCO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBOztBQUVBLFlBQVksd0RBQVk7QUFDeEI7O0FBRUE7QUFDQTtBQUNBLHVDQUF1QyxVQUFVO0FBQ2pELHVDQUF1QyxTQUFTOztBQUVoRDs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCLGlFQUFzQjtBQUNuRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUo2RDtBQUNiO0FBQ0Q7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGlFQUFZO0FBQ25DLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixvREFBUTtBQUM1QjtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlFQUFzQjtBQUM1Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RHc0M7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGtEQUFRO0FBQy9CLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiJjaHVua3Mvc3JjL2RyYWdnYWJsZS90cmVlL1NvcnRab25lLW1qcy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlRHJhZ1pvbmUgZnJvbSAnLi4vLi4vZHJhZ2dhYmxlL0RyYWdab25lLm1qcyc7XG5pbXBvcnQgTmVvQXJyYXkgICAgIGZyb20gJy4uLy4uL3V0aWwvQXJyYXkubWpzJztcbmltcG9ydCBWRG9tVXRpbCAgICAgZnJvbSAnLi4vLi4vdXRpbC9WRG9tLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby5kcmFnZ2FibGUubGlzdC5EcmFnWm9uZVxuICogQGV4dGVuZHMgTmVvLmRyYWdnYWJsZS5EcmFnWm9uZVxuICovXG5jbGFzcyBEcmFnWm9uZSBleHRlbmRzIEJhc2VEcmFnWm9uZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5kcmFnZ2FibGUubGlzdC5EcmFnWm9uZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLmRyYWdnYWJsZS5saXN0LkRyYWdab25lJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J2xpc3QtZHJhZ3pvbmUnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnbGlzdC1kcmFnem9uZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R8bnVsbH0gZHJhZ1Byb3h5Q29uZmlnXG4gICAgICAgICAqL1xuICAgICAgICBkcmFnUHJveHlDb25maWc6IHtcbiAgICAgICAgICAgIGNsczogWyduZW8tbGlzdCddXG4gICAgICAgIH1cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBvd25lciAgICAgICAgPSBtZS5vd25lcixcbiAgICAgICAgICAgIGRvbUxpc3RlbmVycyA9IG93bmVyLmRvbUxpc3RlbmVycyxcbiAgICAgICAgICAgIG9wdHMgICAgICAgICA9IHtkZWxlZ2F0ZTogJy5uZW8tZHJhZ2dhYmxlJywgc2NvcGU6IG1lfSxcbiAgICAgICAgICAgIHN0b3JlICAgICAgICA9IG93bmVyLnN0b3JlO1xuXG4gICAgICAgIGRvbUxpc3RlbmVycy5wdXNoKFxuICAgICAgICAgICAgeydkcmFnOmVuZCcgIDogbWUub25EcmFnRW5kLCAgIC4uLm9wdHN9LFxuICAgICAgICAgICAgeydkcmFnOnN0YXJ0JzogbWUub25EcmFnU3RhcnQsIC4uLm9wdHN9XG4gICAgICAgICk7XG5cbiAgICAgICAgb3duZXIuZG9tTGlzdGVuZXJzID0gZG9tTGlzdGVuZXJzO1xuXG4gICAgICAgIHN0b3JlLm9uKHtcbiAgICAgICAgICAgIGxvYWQgOiBtZS5vblN0b3JlTG9hZCxcbiAgICAgICAgICAgIHNjb3BlOiBtZVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgc3RvcmUgaXMgYWxyZWFkeSBsb2FkZWRcbiAgICAgICAgaWYgKHN0b3JlLmdldENvdW50KCkgPiAwKSB7XG4gICAgICAgICAgICBtZS5vblN0b3JlTG9hZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGRyYWdnYWJsZVxuICAgICAqL1xuICAgIGFkanVzdExpc3RJdGVtQ2xzKGRyYWdnYWJsZSkge1xuICAgICAgICBsZXQgbWUgICAgPSB0aGlzLFxuICAgICAgICAgICAgb3duZXIgPSBtZS5vd25lcixcbiAgICAgICAgICAgIHN0b3JlID0gb3duZXIuc3RvcmUsXG4gICAgICAgICAgICB2ZG9tICA9IG93bmVyLnZkb20sXG4gICAgICAgICAgICBub2RlO1xuXG4gICAgICAgIHN0b3JlLml0ZW1zLmZvckVhY2goKHJlY29yZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIG5vZGUgPSBtZS5nZXRJdGVtVmRvbShyZWNvcmQsIGluZGV4KTtcblxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBub2RlLmNscyA9IG5vZGUuY2xzIHx8IFtdO1xuICAgICAgICAgICAgICAgIE5lb0FycmF5W2RyYWdnYWJsZSA/ICdhZGQnIDogJ3JlbW92ZSddKG5vZGUuY2xzLCAnbmVvLWRyYWdnYWJsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBvd25lci52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZWNvcmRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fG51bGx9IHZkb21cbiAgICAgKi9cbiAgICBnZXRJdGVtVmRvbShyZWNvcmQsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm93bmVyLnZkb20uY25baW5kZXhdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbkRyYWdFbmQoZGF0YSkge1xuICAgICAgICBpZiAodGhpcy5vd25lci5kcmFnZ2FibGUpIHtcbiAgICAgICAgICAgIGxldCBtZSAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgICAgIHByb3h5ICAgICAgICA9IG1lLmRyYWdQcm94eSxcbiAgICAgICAgICAgICAgICBjbHMgICAgICAgICAgPSBwcm94eS5jbHMgfHwge30sXG4gICAgICAgICAgICAgICAgcmVjdCAgICAgICAgID0gbWUuZHJhZ0VsZW1lbnRSZWN0LFxuICAgICAgICAgICAgICAgIHdyYXBwZXJTdHlsZSA9IHByb3h5LndyYXBwZXJTdHlsZSB8fCB7fTtcblxuICAgICAgICAgICAgTmVvQXJyYXkuYWRkKGNscywgJ25lby1hbmltYXRlJyk7XG4gICAgICAgICAgICBwcm94eS5jbHMgPSBjbHM7XG5cbiAgICAgICAgICAgIC8vIGVuc3VyZSB0byBnZXQgaW50byB0aGUgbmV4dCBhbmltYXRpb24gZnJhbWVcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHdyYXBwZXJTdHlsZS5sZWZ0ID0gYCR7cmVjdC5sZWZ0fXB4YDtcbiAgICAgICAgICAgICAgICB3cmFwcGVyU3R5bGUudG9wICA9IGAke3JlY3QudG9wfXB4YDtcblxuICAgICAgICAgICAgICAgIHByb3h5LndyYXBwZXJTdHlsZSA9IHdyYXBwZXJTdHlsZTtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBtZS5kcmFnRW5kKCk7XG4gICAgICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgICAgIH0sIDMwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbkRyYWdTdGFydChkYXRhKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKG1lLm93bmVyLmRyYWdnYWJsZSkge1xuICAgICAgICAgICAgbWUuZHJhZ0VsZW1lbnQgPSBWRG9tVXRpbC5maW5kVmRvbUNoaWxkKG1lLm93bmVyLnZkb20sIGRhdGEucGF0aFswXS5pZCkudmRvbTtcbiAgICAgICAgICAgIG1lLmRyYWdTdGFydChkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgb25TdG9yZUxvYWQoKSB7XG4gICAgICAgIHRoaXMuYWRqdXN0TGlzdEl0ZW1DbHModHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YT17fVxuICAgICAqL1xuICAgIHNldERhdGEoZGF0YT17fSkge1xuICAgICAgICBsZXQgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgb3duZXIgICAgPSBtZS5vd25lcixcbiAgICAgICAgICAgIHJlY29yZElkID0gb3duZXIuZ2V0SXRlbVJlY29yZElkKG1lLmdldERyYWdFbGVtZW50Um9vdCgpLmlkKTtcblxuICAgICAgICBkYXRhLnJlY29yZCA9IG93bmVyLnN0b3JlLmdldChyZWNvcmRJZCk7XG5cbiAgICAgICAgc3VwZXIuc2V0RGF0YShkYXRhKTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKERyYWdab25lKTtcblxuZXhwb3J0IHtEcmFnWm9uZSBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQmFzZURyYWdab25lIGZyb20gJy4uLy4uL2RyYWdnYWJsZS9saXN0L0RyYWdab25lLm1qcyc7XG5pbXBvcnQgTmVvQXJyYXkgICAgIGZyb20gJy4uLy4uL3V0aWwvQXJyYXkubWpzJztcbmltcG9ydCBWRG9tVXRpbCAgICAgZnJvbSAnLi4vLi4vdXRpbC9WRG9tLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby5kcmFnZ2FibGUudHJlZS5EcmFnWm9uZVxuICogQGV4dGVuZHMgTmVvLmRyYWdnYWJsZS5saXN0LkRyYWdab25lXG4gKi9cbmNsYXNzIERyYWdab25lIGV4dGVuZHMgQmFzZURyYWdab25lIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLmRyYWdnYWJsZS50cmVlLkRyYWdab25lJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uZHJhZ2dhYmxlLnRyZWUuRHJhZ1pvbmUnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0ndHJlZS1kcmFnem9uZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICd0cmVlLWRyYWd6b25lJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdHxudWxsfSBkcmFnUHJveHlDb25maWdcbiAgICAgICAgICovXG4gICAgICAgIGRyYWdQcm94eUNvbmZpZzoge1xuICAgICAgICAgICAgY2xzOiBbJ25lby10cmVlLWxpc3QnXVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogTGltaXQgZHJhZyZkcm9wIHRvIGxlYWYgbm9kZXMgPT4gZXhjbHVkaW5nIGZvbGRlcnNcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gbGVhZk5vZGVzT25seV89dHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgbGVhZk5vZGVzT25seV86IGZhbHNlXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgbGVhZk5vZGVzT25seSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBXZSBvbmx5IG5lZWQgdG8gYWRqdXN0IGZvbGRlciAobm9uIGxlYWYpIG5vZGVzXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRMZWFmTm9kZXNPbmx5KHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAob2xkVmFsdWUgIT09IHVuZGVmaW5lZCkgeyAvLyB3ZSBvbmx5IG5lZWQgdG8gcmVhY3QgdG8gZHluYW1pYyBjaGFuZ2VzXG4gICAgICAgICAgICBsZXQgb3duZXIgPSB0aGlzLm93bmVyLFxuICAgICAgICAgICAgICAgIHN0b3JlID0gb3duZXIuc3RvcmUsXG4gICAgICAgICAgICAgICAgdmRvbSAgPSBvd25lci52ZG9tLFxuICAgICAgICAgICAgICAgIG5vZGU7XG5cbiAgICAgICAgICAgIHN0b3JlLml0ZW1zLmZvckVhY2gocmVjb3JkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlY29yZC5pc0xlYWYpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG93bmVyLmdldFZkb21DaGlsZChvd25lci5nZXRJdGVtSWQocmVjb3JkLmlkKSwgb3duZXIudmRvbSk7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuY2xzID0gbm9kZS5jbHMgfHwgW107XG4gICAgICAgICAgICAgICAgICAgIE5lb0FycmF5W3ZhbHVlID8gJ3JlbW92ZScgOiAnYWRkJ10obm9kZS5jbHMsICduZW8tZHJhZ2dhYmxlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG93bmVyLnZkb20gPSB2ZG9tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldERyYWdFbGVtZW50Um9vdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHJhZ0VsZW1lbnQuY25bMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVjb3JkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICogQHJldHVybnMge09iamVjdHxudWxsfSB2ZG9tXG4gICAgICovXG4gICAgZ2V0SXRlbVZkb20ocmVjb3JkLCBpbmRleCkge1xuICAgICAgICBsZXQgb3duZXIgPSB0aGlzLm93bmVyO1xuXG4gICAgICAgIGlmICghKHRoaXMubGVhZk5vZGVzT25seSAmJiAhcmVjb3JkLmlzTGVhZikpIHtcbiAgICAgICAgICAgIHJldHVybiBvd25lci5nZXRWZG9tQ2hpbGQob3duZXIuZ2V0SXRlbUlkKHJlY29yZC5pZCksIG93bmVyLnZkb20pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRHJhZ1N0YXJ0KGRhdGEpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUub3duZXIuZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgICBtZS5kcmFnRWxlbWVudCA9IHtcbiAgICAgICAgICAgICAgICB0YWc6ICd1bCcsXG4gICAgICAgICAgICAgICAgY2xzOiBbJ25lby1saXN0LWNvbnRhaW5lcicsICduZW8tbGlzdCddLFxuICAgICAgICAgICAgICAgIGNuIDogW1ZEb21VdGlsLmZpbmRWZG9tQ2hpbGQobWUub3duZXIudmRvbSwgZGF0YS5wYXRoWzBdLmlkKS52ZG9tXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbWUuZHJhZ1N0YXJ0KGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhEcmFnWm9uZSk7XG5cbmV4cG9ydCB7RHJhZ1pvbmUgYXMgZGVmYXVsdH07IiwiaW1wb3J0IERyYWdab25lIGZyb20gJy4vRHJhZ1pvbmUubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgTmVvLmRyYWdnYWJsZS50cmVlLlNvcnRab25lXG4gKiBAZXh0ZW5kcyBOZW8uZHJhZ2dhYmxlLnRyZWUuRHJhZ1pvbmVcbiAqL1xuY2xhc3MgU29ydFpvbmUgZXh0ZW5kcyBEcmFnWm9uZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5kcmFnZ2FibGUudHJlZS5Tb3J0Wm9uZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLmRyYWdnYWJsZS50cmVlLlNvcnRab25lJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J3RyZWUtc29ydHpvbmUnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAndHJlZS1zb3J0em9uZSdcbiAgICB9fVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhTb3J0Wm9uZSk7XG5cbmV4cG9ydCB7U29ydFpvbmUgYXMgZGVmYXVsdH07Il0sInNvdXJjZVJvb3QiOiIifQ==