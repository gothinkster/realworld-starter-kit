(self["webpackChunkneo_mjs_realworld_example_app"] = self["webpackChunkneo_mjs_realworld_example_app"] || []).push([["src/draggable/tree/DragZone-mjs.js"],{

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



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9kcmFnZ2FibGUvbGlzdC9EcmFnWm9uZS5tanMiLCJ3ZWJwYWNrOi8vbmVvLm1qcy1yZWFsd29ybGQtZXhhbXBsZS1hcHAvLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZHJhZ2dhYmxlL3RyZWUvRHJhZ1pvbmUubWpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXdEO0FBQ1I7QUFDRDs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsNERBQVk7QUFDbkMsd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHNDQUFzQztBQUNsRTs7QUFFQTtBQUNBLGFBQWEsc0NBQXNDO0FBQ25ELGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0Isb0RBQVE7QUFDeEI7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7O0FBRUEsWUFBWSx3REFBWTtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0EsdUNBQXVDLFVBQVU7QUFDakQsdUNBQXVDLFNBQVM7O0FBRWhEOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsaUVBQXNCO0FBQ25EO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1SjZEO0FBQ2I7QUFDRDs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsaUVBQVk7QUFDbkMsd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG9EQUFRO0FBQzVCO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsaUVBQXNCO0FBQzVDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6ImNodW5rcy9zcmMvZHJhZ2dhYmxlL3RyZWUvRHJhZ1pvbmUtbWpzLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VEcmFnWm9uZSBmcm9tICcuLi8uLi9kcmFnZ2FibGUvRHJhZ1pvbmUubWpzJztcbmltcG9ydCBOZW9BcnJheSAgICAgZnJvbSAnLi4vLi4vdXRpbC9BcnJheS5tanMnO1xuaW1wb3J0IFZEb21VdGlsICAgICBmcm9tICcuLi8uLi91dGlsL1ZEb20ubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgTmVvLmRyYWdnYWJsZS5saXN0LkRyYWdab25lXG4gKiBAZXh0ZW5kcyBOZW8uZHJhZ2dhYmxlLkRyYWdab25lXG4gKi9cbmNsYXNzIERyYWdab25lIGV4dGVuZHMgQmFzZURyYWdab25lIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLmRyYWdnYWJsZS5saXN0LkRyYWdab25lJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uZHJhZ2dhYmxlLmxpc3QuRHJhZ1pvbmUnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0nbGlzdC1kcmFnem9uZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICdsaXN0LWRyYWd6b25lJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdHxudWxsfSBkcmFnUHJveHlDb25maWdcbiAgICAgICAgICovXG4gICAgICAgIGRyYWdQcm94eUNvbmZpZzoge1xuICAgICAgICAgICAgY2xzOiBbJ25lby1saXN0J11cbiAgICAgICAgfVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBsZXQgbWUgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIG93bmVyICAgICAgICA9IG1lLm93bmVyLFxuICAgICAgICAgICAgZG9tTGlzdGVuZXJzID0gb3duZXIuZG9tTGlzdGVuZXJzLFxuICAgICAgICAgICAgb3B0cyAgICAgICAgID0ge2RlbGVnYXRlOiAnLm5lby1kcmFnZ2FibGUnLCBzY29wZTogbWV9LFxuICAgICAgICAgICAgc3RvcmUgICAgICAgID0gb3duZXIuc3RvcmU7XG5cbiAgICAgICAgZG9tTGlzdGVuZXJzLnB1c2goXG4gICAgICAgICAgICB7J2RyYWc6ZW5kJyAgOiBtZS5vbkRyYWdFbmQsICAgLi4ub3B0c30sXG4gICAgICAgICAgICB7J2RyYWc6c3RhcnQnOiBtZS5vbkRyYWdTdGFydCwgLi4ub3B0c31cbiAgICAgICAgKTtcblxuICAgICAgICBvd25lci5kb21MaXN0ZW5lcnMgPSBkb21MaXN0ZW5lcnM7XG5cbiAgICAgICAgc3RvcmUub24oe1xuICAgICAgICAgICAgbG9hZCA6IG1lLm9uU3RvcmVMb2FkLFxuICAgICAgICAgICAgc2NvcGU6IG1lXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBzdG9yZSBpcyBhbHJlYWR5IGxvYWRlZFxuICAgICAgICBpZiAoc3RvcmUuZ2V0Q291bnQoKSA+IDApIHtcbiAgICAgICAgICAgIG1lLm9uU3RvcmVMb2FkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZHJhZ2dhYmxlXG4gICAgICovXG4gICAgYWRqdXN0TGlzdEl0ZW1DbHMoZHJhZ2dhYmxlKSB7XG4gICAgICAgIGxldCBtZSAgICA9IHRoaXMsXG4gICAgICAgICAgICBvd25lciA9IG1lLm93bmVyLFxuICAgICAgICAgICAgc3RvcmUgPSBvd25lci5zdG9yZSxcbiAgICAgICAgICAgIHZkb20gID0gb3duZXIudmRvbSxcbiAgICAgICAgICAgIG5vZGU7XG5cbiAgICAgICAgc3RvcmUuaXRlbXMuZm9yRWFjaCgocmVjb3JkLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgbm9kZSA9IG1lLmdldEl0ZW1WZG9tKHJlY29yZCwgaW5kZXgpO1xuXG4gICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgIG5vZGUuY2xzID0gbm9kZS5jbHMgfHwgW107XG4gICAgICAgICAgICAgICAgTmVvQXJyYXlbZHJhZ2dhYmxlID8gJ2FkZCcgOiAncmVtb3ZlJ10obm9kZS5jbHMsICduZW8tZHJhZ2dhYmxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG93bmVyLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlY29yZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAqIEByZXR1cm5zIHtPYmplY3R8bnVsbH0gdmRvbVxuICAgICAqL1xuICAgIGdldEl0ZW1WZG9tKHJlY29yZCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3duZXIudmRvbS5jbltpbmRleF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRHJhZ0VuZChkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLm93bmVyLmRyYWdnYWJsZSkge1xuICAgICAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICAgICAgcHJveHkgICAgICAgID0gbWUuZHJhZ1Byb3h5LFxuICAgICAgICAgICAgICAgIGNscyAgICAgICAgICA9IHByb3h5LmNscyB8fCB7fSxcbiAgICAgICAgICAgICAgICByZWN0ICAgICAgICAgPSBtZS5kcmFnRWxlbWVudFJlY3QsXG4gICAgICAgICAgICAgICAgd3JhcHBlclN0eWxlID0gcHJveHkud3JhcHBlclN0eWxlIHx8IHt9O1xuXG4gICAgICAgICAgICBOZW9BcnJheS5hZGQoY2xzLCAnbmVvLWFuaW1hdGUnKTtcbiAgICAgICAgICAgIHByb3h5LmNscyA9IGNscztcblxuICAgICAgICAgICAgLy8gZW5zdXJlIHRvIGdldCBpbnRvIHRoZSBuZXh0IGFuaW1hdGlvbiBmcmFtZVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgd3JhcHBlclN0eWxlLmxlZnQgPSBgJHtyZWN0LmxlZnR9cHhgO1xuICAgICAgICAgICAgICAgIHdyYXBwZXJTdHlsZS50b3AgID0gYCR7cmVjdC50b3B9cHhgO1xuXG4gICAgICAgICAgICAgICAgcHJveHkud3JhcHBlclN0eWxlID0gd3JhcHBlclN0eWxlO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1lLmRyYWdFbmQoKTtcbiAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgfSwgMzApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRHJhZ1N0YXJ0KGRhdGEpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUub3duZXIuZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgICBtZS5kcmFnRWxlbWVudCA9IFZEb21VdGlsLmZpbmRWZG9tQ2hpbGQobWUub3duZXIudmRvbSwgZGF0YS5wYXRoWzBdLmlkKS52ZG9tO1xuICAgICAgICAgICAgbWUuZHJhZ1N0YXJ0KGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvblN0b3JlTG9hZCgpIHtcbiAgICAgICAgdGhpcy5hZGp1c3RMaXN0SXRlbUNscyh0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhPXt9XG4gICAgICovXG4gICAgc2V0RGF0YShkYXRhPXt9KSB7XG4gICAgICAgIGxldCBtZSAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBvd25lciAgICA9IG1lLm93bmVyLFxuICAgICAgICAgICAgcmVjb3JkSWQgPSBvd25lci5nZXRJdGVtUmVjb3JkSWQobWUuZ2V0RHJhZ0VsZW1lbnRSb290KCkuaWQpO1xuXG4gICAgICAgIGRhdGEucmVjb3JkID0gb3duZXIuc3RvcmUuZ2V0KHJlY29yZElkKTtcblxuICAgICAgICBzdXBlci5zZXREYXRhKGRhdGEpO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoRHJhZ1pvbmUpO1xuXG5leHBvcnQge0RyYWdab25lIGFzIGRlZmF1bHR9OyIsImltcG9ydCBCYXNlRHJhZ1pvbmUgZnJvbSAnLi4vLi4vZHJhZ2dhYmxlL2xpc3QvRHJhZ1pvbmUubWpzJztcbmltcG9ydCBOZW9BcnJheSAgICAgZnJvbSAnLi4vLi4vdXRpbC9BcnJheS5tanMnO1xuaW1wb3J0IFZEb21VdGlsICAgICBmcm9tICcuLi8uLi91dGlsL1ZEb20ubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgTmVvLmRyYWdnYWJsZS50cmVlLkRyYWdab25lXG4gKiBAZXh0ZW5kcyBOZW8uZHJhZ2dhYmxlLmxpc3QuRHJhZ1pvbmVcbiAqL1xuY2xhc3MgRHJhZ1pvbmUgZXh0ZW5kcyBCYXNlRHJhZ1pvbmUge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uZHJhZ2dhYmxlLnRyZWUuRHJhZ1pvbmUnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5kcmFnZ2FibGUudHJlZS5EcmFnWm9uZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSd0cmVlLWRyYWd6b25lJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ3RyZWUtZHJhZ3pvbmUnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fG51bGx9IGRyYWdQcm94eUNvbmZpZ1xuICAgICAgICAgKi9cbiAgICAgICAgZHJhZ1Byb3h5Q29uZmlnOiB7XG4gICAgICAgICAgICBjbHM6IFsnbmVvLXRyZWUtbGlzdCddXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMaW1pdCBkcmFnJmRyb3AgdG8gbGVhZiBub2RlcyA9PiBleGNsdWRpbmcgZm9sZGVyc1xuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBsZWFmTm9kZXNPbmx5Xz10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBsZWFmTm9kZXNPbmx5XzogZmFsc2VcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBsZWFmTm9kZXNPbmx5IGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIFdlIG9ubHkgbmVlZCB0byBhZGp1c3QgZm9sZGVyIChub24gbGVhZikgbm9kZXNcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldExlYWZOb2Rlc09ubHkodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7IC8vIHdlIG9ubHkgbmVlZCB0byByZWFjdCB0byBkeW5hbWljIGNoYW5nZXNcbiAgICAgICAgICAgIGxldCBvd25lciA9IHRoaXMub3duZXIsXG4gICAgICAgICAgICAgICAgc3RvcmUgPSBvd25lci5zdG9yZSxcbiAgICAgICAgICAgICAgICB2ZG9tICA9IG93bmVyLnZkb20sXG4gICAgICAgICAgICAgICAgbm9kZTtcblxuICAgICAgICAgICAgc3RvcmUuaXRlbXMuZm9yRWFjaChyZWNvcmQgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcmVjb3JkLmlzTGVhZikge1xuICAgICAgICAgICAgICAgICAgICBub2RlID0gb3duZXIuZ2V0VmRvbUNoaWxkKG93bmVyLmdldEl0ZW1JZChyZWNvcmQuaWQpLCBvd25lci52ZG9tKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5jbHMgPSBub2RlLmNscyB8fCBbXTtcbiAgICAgICAgICAgICAgICAgICAgTmVvQXJyYXlbdmFsdWUgPyAncmVtb3ZlJyA6ICdhZGQnXShub2RlLmNscywgJ25lby1kcmFnZ2FibGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgb3duZXIudmRvbSA9IHZkb207XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0RHJhZ0VsZW1lbnRSb290KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kcmFnRWxlbWVudC5jblswXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZWNvcmRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fG51bGx9IHZkb21cbiAgICAgKi9cbiAgICBnZXRJdGVtVmRvbShyZWNvcmQsIGluZGV4KSB7XG4gICAgICAgIGxldCBvd25lciA9IHRoaXMub3duZXI7XG5cbiAgICAgICAgaWYgKCEodGhpcy5sZWFmTm9kZXNPbmx5ICYmICFyZWNvcmQuaXNMZWFmKSkge1xuICAgICAgICAgICAgcmV0dXJuIG93bmVyLmdldFZkb21DaGlsZChvd25lci5nZXRJdGVtSWQocmVjb3JkLmlkKSwgb3duZXIudmRvbSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25EcmFnU3RhcnQoZGF0YSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChtZS5vd25lci5kcmFnZ2FibGUpIHtcbiAgICAgICAgICAgIG1lLmRyYWdFbGVtZW50ID0ge1xuICAgICAgICAgICAgICAgIHRhZzogJ3VsJyxcbiAgICAgICAgICAgICAgICBjbHM6IFsnbmVvLWxpc3QtY29udGFpbmVyJywgJ25lby1saXN0J10sXG4gICAgICAgICAgICAgICAgY24gOiBbVkRvbVV0aWwuZmluZFZkb21DaGlsZChtZS5vd25lci52ZG9tLCBkYXRhLnBhdGhbMF0uaWQpLnZkb21dXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBtZS5kcmFnU3RhcnQoZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKERyYWdab25lKTtcblxuZXhwb3J0IHtEcmFnWm9uZSBhcyBkZWZhdWx0fTsiXSwic291cmNlUm9vdCI6IiJ9