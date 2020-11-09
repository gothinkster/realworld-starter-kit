self["webpackChunk"](["vendors~src/draggable/list/DragZone-mjs.js~src/draggable/tab/header/toolbar/SortZone-mjs.js~src/drag~e3af9737"],{

/***/ "./node_modules/neo.mjs/src/draggable/DragProxyComponent.mjs":
/*!*******************************************************************!*\
  !*** ./node_modules/neo.mjs/src/draggable/DragProxyComponent.mjs ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DragProxyComponent; });
/* harmony import */ var _component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");


/**
 * @class Neo.draggable.DragProxyComponent
 * @extends Neo.component.Base
 */
class DragProxyComponent extends _component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.draggable.DragProxyComponent'
         * @protected
         */
        className: 'Neo.draggable.DragProxyComponent',
        /**
         * @member {String} ntype='dragproxy'
         * @protected
         */
        ntype: 'dragproxy',
        /**
         * @member {Boolean} autoMount=true
         */
        autoMount: true,
        /**
         * @member {Boolean} autoRender=true
         */
        autoRender: true,
        /**
         * @member {String[]} cls=['neo-dragproxy']
         */
        cls: ['neo-dragproxy'],
        /**
         * @member {Boolean} moveInMainThread=true
         */
        moveInMainThread: true
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me = this;

        me.on('mounted', me.onMounted, me);
    }

    /**
     *
     * @param {String} id
     */
    onMounted(id) {
        if (this.moveInMainThread) {
            Neo.main.addon.DragDrop.setDragProxyElement({
                id: id
            });
        }
    }
}

Neo.applyClassConfig(DragProxyComponent);



/***/ }),

/***/ "./node_modules/neo.mjs/src/draggable/DragZone.mjs":
/*!*********************************************************!*\
  !*** ./node_modules/neo.mjs/src/draggable/DragZone.mjs ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DragZone; });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");
/* harmony import */ var _DragProxyComponent_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DragProxyComponent.mjs */ "./node_modules/neo.mjs/src/draggable/DragProxyComponent.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");
/* harmony import */ var _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/VDom.mjs */ "./node_modules/neo.mjs/src/util/VDom.mjs");





/**
 * @class Neo.draggable.DragZone
 * @extends Neo.core.Base
 */
class DragZone extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getStaticConfig() {return {
        /**
         * True automatically applies the core/Observable.mjs mixin
         * @member {Boolean} observable=true
         * @static
         */
        observable: true
    }}

    static getConfig() {return {
        /**
         * @member {String} className='Neo.draggable.DragZone'
         * @protected
         */
        className: 'Neo.draggable.DragZone',
        /**
         * @member {String} ntype='dragzone'
         * @protected
         */
        ntype: 'dragzone',
        /**
         * Adds this.dragProxyCls => 'neo-dragproxy' to the top level dragProxyEl node
         * @member {Boolean} addDragProxyCls=true
         */
        addDragProxyCls: true,
        /**
         * drag:move will by default only fire in case moveInMainThread === false.
         * In case you want to move the dragProxy inside main but still get the event,
         * set this config to true.
         * @member {Boolean} alwaysFireDragMove=false
         */
        alwaysFireDragMove: false,
        /**
         * The name of the App this instance belongs to
         * @member {String|null} appName=null
         */
        appName: null,
        /**
         * @member {String|null} boundaryContainerId=null
         */
        boundaryContainerId: null,
        /**
         * Store data which you want to pass to drop related events here
         * @member {Object|null} data=null
         */
        data: null,
        /**
         * The vdom (tree) of the element you want to drag
         * @member {Object|null} dragElement=null
         */
        dragElement: null,
        /**
         * The bounding client rect of the dragElement
         * Will get set inside dragStart()
         * @member {Object|null} dragElementRect=null
         */
        dragElementRect: null,
        /**
         * @member {Neo.component.Base|null} dragProxy=null
         * @protected
         */
        dragProxy: null,
        /**
         * @member {Object|null} dragProxyConfig=null
         */
        dragProxyConfig_: null,
        /**
         * @member {String} dragProxyCls='neo-dragproxy'
         */
        dragProxyCls: 'neo-dragproxy',
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
         * @member {Boolean} moveHorizontal=true
         */
        moveHorizontal: true,
        /**
         * @member {Boolean} moveInMainThread=true
         */
        moveInMainThread: true,
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
         * @member {Neo.component.Base} owner=null
         */
        owner: null,
        /**
         * @member {String} proxyParentId_='document.body'
         */
        proxyParentId_: 'document.body',
        /**
         * @member {String|null} scrollContainerId=null
         */
        scrollContainerId: null,
        /**
         * @member {Number} scrollFactorLeft=1
         */
        scrollFactorLeft: 1,
        /**
         * @member {Number} scrollFactorTop=1
         */
        scrollFactorTop: 1,
        /**
         * True creates a position:absolute wrapper div which contains the cloned element
         * @member {Boolean} useProxyWrapper=true
         */
        useProxyWrapper: true
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        if (!Neo.main.addon.DragDrop) {
            console.error('You can not use Neo.draggable.DragZone without adding Neo.main.addon.DragDrop to the main thread addons', this.id);
        }
    }

    /**
     * Triggered when accessing the dragProxyConfig config
     * We are re-using this config to create multiple dragProxies,
     * so it is important to work with a clone. see: createDragProxy()
     * @param {Object} value
     * @protected
     */
    beforeGetDragProxyConfig(value) {
        return Neo.clone(value, true, true);
    }

    /**
     *
     * @param {Object} data
     */
    createDragProxy(data) {
        let me        = this,
            component = Neo.getComponent(me.getDragElementRoot().id) || me.owner,
            clone     = _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].clone(me.dragElement);

        const config = {
            module          : _DragProxyComponent_mjs__WEBPACK_IMPORTED_MODULE_1__["default"],
            appName         : me.appName,
            moveInMainThread: me.moveInMainThread,
            parentId        : me.proxyParentId,
            vdom            : me.useProxyWrapper ? {cn: [clone]} : clone,

            style: {
                height: `${data.height}px`,
                left  : `${me.moveHorizontal ? data.left : 0}px`,
                top   : `${me.moveVertical   ? data.top  : 0}px`,
                width : `${data.width}px`
            },

            ...me.dragProxyConfig || {}
        };

        config.cls = config.cls || [];

        if (component) {
            config.cls.push(component.getTheme());
        }

        if (!me.useProxyWrapper) {
            config.cls.push(...clone.cls);
        }

        if (me.addDragProxyCls && config.cls) {
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].add(config.cls, me.dragProxyCls);
        }

        me.dragProxy = Neo.create(config);
    }

    /**
     * Override for using custom animations
     */
    destroyDragProxy() {
        let me = this,
            id = me.dragProxy.id;

        setTimeout(() => {
            Neo.currentWorker.promiseMessage('main', {
                action: 'updateDom',
                deltas: [{action: 'removeNode', id: id}]
            });
        }, me.moveInMainThread ? 0 : 30);

        me.dragProxy.destroy();
    }

    /**
     *
     */
    dragEnd() {
        let me    = this,
            owner = me.owner,
            cls   = owner.cls;

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].remove(cls, 'neo-is-dragging');
        owner.cls = cls;

        if (me.dragProxy) {
            me.destroyDragProxy();
            me.dragProxy = null;
        }

        Object.assign(me, {
            dragElementRect  : null,
            offsetX          : 0,
            offsetY          : 0,
            scrollContainerId: null
        });

        me.resetData();
    }

    /**
     *
     * @param {Object} data
     */
    dragMove(data) {
        let me = this,
            style;

        if (!me.moveInMainThread && me.dragProxy) {
            style = me.dragProxy.style;

            if (me.moveHorizontal) {
                style.left = `${data.clientX - me.offsetX}px`;
            }

            if (me.moveVertical) {
                style.top = `${data.clientY - me.offsetY}px`;
            }

            me.dragProxy.style = style;
        }
    }

    /**
     *
     * @param {Object} data
     */
    dragStart(data) {
        let me    = this,
            owner = me.owner,
            cls   = owner.cls;

        me.setData();

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].add(cls, 'neo-is-dragging');
        owner.cls = cls;

        Neo.main.addon.DragDrop.setConfigs(me.getMainThreadConfigs());

        Neo.main.DomAccess.getBoundingClientRect({
            id: me.getDragElementRoot().id
        }).then(rect => {
            Object.assign(me, {
                dragElementRect: rect,
                offsetX        : data.clientX - rect.left,
                offsetY        : data.clientY - rect.top
            });

            me.createDragProxy(rect);
        });
    }

    /**
     * Override this method in case you want to wrap your dragElement.
     * See: draggable.tree.DragZone
     * @returns {Object}
     */
    getDragElementRoot() {
        return this.dragElement;
    }

    /**
     * Override this method inside class extensions to add more configs
     * which get passed to main.addon.DragDrop onDragStart()
     * @returns {Object}
     * @protected
     */
    getMainThreadConfigs() {
        let me = this;

        return {
            alwaysFireDragMove : me.alwaysFireDragMove,
            boundaryContainerId: me.boundaryContainerId,
            dragProxyCls       : me.dragProxyCls,
            dragZoneId         : me.id,
            dropZoneIdentifier : me.dropZoneIdentifier,
            scrollContainerId  : me.scrollContainerId,
            scrollFactorLeft   : me.scrollFactorLeft,
            scrollFactorTop    : me.scrollFactorTop
        };
    }

    /**
     * You can either extend this class and override the handler or listen to the event from the outside
     * @param {Object} data
     */
    onDrop(data) {
        this.fire('drop', data);
    }

    /**
     * You can either extend this class and override the handler or listen to the event from the outside
     * @param {Object} data
     */
    onDropEnter(data) {
        this.fire('drop:enter', data);
    }

    /**
     * You can either extend this class and override the handler or listen to the event from the outside
     * @param {Object} data
     */
    onDropLeave(data) {
        this.fire('drop:leave', data);
    }

    /**
     *
     */
    resetData() {
        setTimeout(() => {
            this.data = null;
        }, 30);
    }

    /**
     * Extend this method for child classes to pass additional properties
     * @param {Object} data={}
     */
    setData(data={}) {
        let me = this;

        me.data = {
            dragElement: me.getDragElementRoot(),
            dragZoneId : me.id,
            ...data
        };
    }
}

Neo.applyClassConfig(DragZone);



/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZHJhZ2dhYmxlL0RyYWdQcm94eUNvbXBvbmVudC5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2RyYWdnYWJsZS9EcmFnWm9uZS5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUF5Qzs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsMkRBQUk7QUFDckMsd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDN0RBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFrRDtBQUNRO0FBQ1A7QUFDRDs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0RBQUk7QUFDM0IsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFB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QTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0EsbUJBQW1CO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6InZlbmRvcnN+c3JjL2RyYWdnYWJsZS9saXN0L0RyYWdab25lLW1qcy5qc35zcmMvZHJhZ2dhYmxlL3RhYi9oZWFkZXIvdG9vbGJhci9Tb3J0Wm9uZS1tanMuanN+c3JjL2RyYWd+ZTNhZjk3MzcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tICcuLi9jb21wb25lbnQvQmFzZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8uZHJhZ2dhYmxlLkRyYWdQcm94eUNvbXBvbmVudFxuICogQGV4dGVuZHMgTmVvLmNvbXBvbmVudC5CYXNlXG4gKi9cbmNsYXNzIERyYWdQcm94eUNvbXBvbmVudCBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uZHJhZ2dhYmxlLkRyYWdQcm94eUNvbXBvbmVudCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLmRyYWdnYWJsZS5EcmFnUHJveHlDb21wb25lbnQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0nZHJhZ3Byb3h5J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ2RyYWdwcm94eScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBhdXRvTW91bnQ9dHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgYXV0b01vdW50OiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gYXV0b1JlbmRlcj10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBhdXRvUmVuZGVyOiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ25lby1kcmFncHJveHknXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ25lby1kcmFncHJveHknXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IG1vdmVJbk1haW5UaHJlYWQ9dHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgbW92ZUluTWFpblRocmVhZDogdHJ1ZVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIG1lLm9uKCdtb3VudGVkJywgbWUub25Nb3VudGVkLCBtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKi9cbiAgICBvbk1vdW50ZWQoaWQpIHtcbiAgICAgICAgaWYgKHRoaXMubW92ZUluTWFpblRocmVhZCkge1xuICAgICAgICAgICAgTmVvLm1haW4uYWRkb24uRHJhZ0Ryb3Auc2V0RHJhZ1Byb3h5RWxlbWVudCh7XG4gICAgICAgICAgICAgICAgaWQ6IGlkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoRHJhZ1Byb3h5Q29tcG9uZW50KTtcblxuZXhwb3J0IHtEcmFnUHJveHlDb21wb25lbnQgYXMgZGVmYXVsdH07IiwiaW1wb3J0IEJhc2UgICAgICAgICAgICAgICBmcm9tICcuLi9jb3JlL0Jhc2UubWpzJztcbmltcG9ydCBEcmFnUHJveHlDb21wb25lbnQgZnJvbSAnLi9EcmFnUHJveHlDb21wb25lbnQubWpzJztcbmltcG9ydCBOZW9BcnJheSAgICAgICAgICAgZnJvbSAnLi4vdXRpbC9BcnJheS5tanMnO1xuaW1wb3J0IFZEb21VdGlsICAgICAgICAgICBmcm9tICcuLi91dGlsL1ZEb20ubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgTmVvLmRyYWdnYWJsZS5EcmFnWm9uZVxuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICovXG5jbGFzcyBEcmFnWm9uZSBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRTdGF0aWNDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRydWUgYXV0b21hdGljYWxseSBhcHBsaWVzIHRoZSBjb3JlL09ic2VydmFibGUubWpzIG1peGluXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IG9ic2VydmFibGU9dHJ1ZVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBvYnNlcnZhYmxlOiB0cnVlXG4gICAgfX1cblxuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uZHJhZ2dhYmxlLkRyYWdab25lJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uZHJhZ2dhYmxlLkRyYWdab25lJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J2RyYWd6b25lJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ2RyYWd6b25lJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZHMgdGhpcy5kcmFnUHJveHlDbHMgPT4gJ25lby1kcmFncHJveHknIHRvIHRoZSB0b3AgbGV2ZWwgZHJhZ1Byb3h5RWwgbm9kZVxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBhZGREcmFnUHJveHlDbHM9dHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgYWRkRHJhZ1Byb3h5Q2xzOiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogZHJhZzptb3ZlIHdpbGwgYnkgZGVmYXVsdCBvbmx5IGZpcmUgaW4gY2FzZSBtb3ZlSW5NYWluVGhyZWFkID09PSBmYWxzZS5cbiAgICAgICAgICogSW4gY2FzZSB5b3Ugd2FudCB0byBtb3ZlIHRoZSBkcmFnUHJveHkgaW5zaWRlIG1haW4gYnV0IHN0aWxsIGdldCB0aGUgZXZlbnQsXG4gICAgICAgICAqIHNldCB0aGlzIGNvbmZpZyB0byB0cnVlLlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBhbHdheXNGaXJlRHJhZ01vdmU9ZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGFsd2F5c0ZpcmVEcmFnTW92ZTogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbmFtZSBvZiB0aGUgQXBwIHRoaXMgaW5zdGFuY2UgYmVsb25ncyB0b1xuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gYXBwTmFtZT1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBhcHBOYW1lOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IGJvdW5kYXJ5Q29udGFpbmVySWQ9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgYm91bmRhcnlDb250YWluZXJJZDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JlIGRhdGEgd2hpY2ggeW91IHdhbnQgdG8gcGFzcyB0byBkcm9wIHJlbGF0ZWQgZXZlbnRzIGhlcmVcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fG51bGx9IGRhdGE9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgZGF0YTogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB2ZG9tICh0cmVlKSBvZiB0aGUgZWxlbWVudCB5b3Ugd2FudCB0byBkcmFnXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdHxudWxsfSBkcmFnRWxlbWVudD1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBkcmFnRWxlbWVudDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBib3VuZGluZyBjbGllbnQgcmVjdCBvZiB0aGUgZHJhZ0VsZW1lbnRcbiAgICAgICAgICogV2lsbCBnZXQgc2V0IGluc2lkZSBkcmFnU3RhcnQoKVxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R8bnVsbH0gZHJhZ0VsZW1lbnRSZWN0PW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGRyYWdFbGVtZW50UmVjdDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge05lby5jb21wb25lbnQuQmFzZXxudWxsfSBkcmFnUHJveHk9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBkcmFnUHJveHk6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R8bnVsbH0gZHJhZ1Byb3h5Q29uZmlnPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGRyYWdQcm94eUNvbmZpZ186IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGRyYWdQcm94eUNscz0nbmVvLWRyYWdwcm94eSdcbiAgICAgICAgICovXG4gICAgICAgIGRyYWdQcm94eUNsczogJ25lby1kcmFncHJveHknLFxuICAgICAgICAvKipcbiAgICAgICAgICogWW91IGNhbiBlaXRoZXIgcGFzcyBhbiBhcnJheSBvZiAoZG9tKSBpZHMgb3IgY2xzIHJ1bGVzIG9yIGJvdGhcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogZHJvcFpvbmVJZGVudGlmaWVyOiB7XG4gICAgICAgICAqICAgICBpZHM6IFsnZm9vJywnYmFyJ11cbiAgICAgICAgICogfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBkcm9wWm9uZUlkZW50aWZpZXI6IHtcbiAgICAgICAgICogICAgIGNsczogWydteS1jbGFzcy0xJywnbXktY2xhc3MtMiddXG4gICAgICAgICAqIH1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogZHJvcFpvbmVJZGVudGlmaWVyOiB7XG4gICAgICAgICAqICAgICBjbHM6IFsnbXktY2xhc3MtMScsJ215LWNsYXNzLTInXSxcbiAgICAgICAgICogICAgIGlkczogWydmb28nLCdiYXInXVxuICAgICAgICAgKiB9XG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdHxudWxsfSBkcm9wWm9uZUlkZW50aWZpZXI9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgZHJvcFpvbmVJZGVudGlmaWVyOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gbW92ZUhvcml6b250YWw9dHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgbW92ZUhvcml6b250YWw6IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBtb3ZlSW5NYWluVGhyZWFkPXRydWVcbiAgICAgICAgICovXG4gICAgICAgIG1vdmVJbk1haW5UaHJlYWQ6IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBtb3ZlVmVydGljYWw9dHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgbW92ZVZlcnRpY2FsOiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBvZmZzZXRYPTBcbiAgICAgICAgICovXG4gICAgICAgIG9mZnNldFg6IDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IG9mZnNldFk9MFxuICAgICAgICAgKi9cbiAgICAgICAgb2Zmc2V0WTogMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge05lby5jb21wb25lbnQuQmFzZX0gb3duZXI9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgb3duZXI6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IHByb3h5UGFyZW50SWRfPSdkb2N1bWVudC5ib2R5J1xuICAgICAgICAgKi9cbiAgICAgICAgcHJveHlQYXJlbnRJZF86ICdkb2N1bWVudC5ib2R5JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBzY3JvbGxDb250YWluZXJJZD1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBzY3JvbGxDb250YWluZXJJZDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gc2Nyb2xsRmFjdG9yTGVmdD0xXG4gICAgICAgICAqL1xuICAgICAgICBzY3JvbGxGYWN0b3JMZWZ0OiAxLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBzY3JvbGxGYWN0b3JUb3A9MVxuICAgICAgICAgKi9cbiAgICAgICAgc2Nyb2xsRmFjdG9yVG9wOiAxLFxuICAgICAgICAvKipcbiAgICAgICAgICogVHJ1ZSBjcmVhdGVzIGEgcG9zaXRpb246YWJzb2x1dGUgd3JhcHBlciBkaXYgd2hpY2ggY29udGFpbnMgdGhlIGNsb25lZCBlbGVtZW50XG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHVzZVByb3h5V3JhcHBlcj10cnVlXG4gICAgICAgICAqL1xuICAgICAgICB1c2VQcm94eVdyYXBwZXI6IHRydWVcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgaWYgKCFOZW8ubWFpbi5hZGRvbi5EcmFnRHJvcCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignWW91IGNhbiBub3QgdXNlIE5lby5kcmFnZ2FibGUuRHJhZ1pvbmUgd2l0aG91dCBhZGRpbmcgTmVvLm1haW4uYWRkb24uRHJhZ0Ryb3AgdG8gdGhlIG1haW4gdGhyZWFkIGFkZG9ucycsIHRoaXMuaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIHdoZW4gYWNjZXNzaW5nIHRoZSBkcmFnUHJveHlDb25maWcgY29uZmlnXG4gICAgICogV2UgYXJlIHJlLXVzaW5nIHRoaXMgY29uZmlnIHRvIGNyZWF0ZSBtdWx0aXBsZSBkcmFnUHJveGllcyxcbiAgICAgKiBzbyBpdCBpcyBpbXBvcnRhbnQgdG8gd29yayB3aXRoIGEgY2xvbmUuIHNlZTogY3JlYXRlRHJhZ1Byb3h5KClcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYmVmb3JlR2V0RHJhZ1Byb3h5Q29uZmlnKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBOZW8uY2xvbmUodmFsdWUsIHRydWUsIHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBjcmVhdGVEcmFnUHJveHkoZGF0YSkge1xuICAgICAgICBsZXQgbWUgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IE5lby5nZXRDb21wb25lbnQobWUuZ2V0RHJhZ0VsZW1lbnRSb290KCkuaWQpIHx8IG1lLm93bmVyLFxuICAgICAgICAgICAgY2xvbmUgICAgID0gVkRvbVV0aWwuY2xvbmUobWUuZHJhZ0VsZW1lbnQpO1xuXG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgICAgIG1vZHVsZSAgICAgICAgICA6IERyYWdQcm94eUNvbXBvbmVudCxcbiAgICAgICAgICAgIGFwcE5hbWUgICAgICAgICA6IG1lLmFwcE5hbWUsXG4gICAgICAgICAgICBtb3ZlSW5NYWluVGhyZWFkOiBtZS5tb3ZlSW5NYWluVGhyZWFkLFxuICAgICAgICAgICAgcGFyZW50SWQgICAgICAgIDogbWUucHJveHlQYXJlbnRJZCxcbiAgICAgICAgICAgIHZkb20gICAgICAgICAgICA6IG1lLnVzZVByb3h5V3JhcHBlciA/IHtjbjogW2Nsb25lXX0gOiBjbG9uZSxcblxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGAke2RhdGEuaGVpZ2h0fXB4YCxcbiAgICAgICAgICAgICAgICBsZWZ0ICA6IGAke21lLm1vdmVIb3Jpem9udGFsID8gZGF0YS5sZWZ0IDogMH1weGAsXG4gICAgICAgICAgICAgICAgdG9wICAgOiBgJHttZS5tb3ZlVmVydGljYWwgICA/IGRhdGEudG9wICA6IDB9cHhgLFxuICAgICAgICAgICAgICAgIHdpZHRoIDogYCR7ZGF0YS53aWR0aH1weGBcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC4uLm1lLmRyYWdQcm94eUNvbmZpZyB8fCB7fVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbmZpZy5jbHMgPSBjb25maWcuY2xzIHx8IFtdO1xuXG4gICAgICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNvbmZpZy5jbHMucHVzaChjb21wb25lbnQuZ2V0VGhlbWUoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW1lLnVzZVByb3h5V3JhcHBlcikge1xuICAgICAgICAgICAgY29uZmlnLmNscy5wdXNoKC4uLmNsb25lLmNscyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWUuYWRkRHJhZ1Byb3h5Q2xzICYmIGNvbmZpZy5jbHMpIHtcbiAgICAgICAgICAgIE5lb0FycmF5LmFkZChjb25maWcuY2xzLCBtZS5kcmFnUHJveHlDbHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgbWUuZHJhZ1Byb3h5ID0gTmVvLmNyZWF0ZShjb25maWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIGZvciB1c2luZyBjdXN0b20gYW5pbWF0aW9uc1xuICAgICAqL1xuICAgIGRlc3Ryb3lEcmFnUHJveHkoKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXMsXG4gICAgICAgICAgICBpZCA9IG1lLmRyYWdQcm94eS5pZDtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIE5lby5jdXJyZW50V29ya2VyLnByb21pc2VNZXNzYWdlKCdtYWluJywge1xuICAgICAgICAgICAgICAgIGFjdGlvbjogJ3VwZGF0ZURvbScsXG4gICAgICAgICAgICAgICAgZGVsdGFzOiBbe2FjdGlvbjogJ3JlbW92ZU5vZGUnLCBpZDogaWR9XVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIG1lLm1vdmVJbk1haW5UaHJlYWQgPyAwIDogMzApO1xuXG4gICAgICAgIG1lLmRyYWdQcm94eS5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBkcmFnRW5kKCkge1xuICAgICAgICBsZXQgbWUgICAgPSB0aGlzLFxuICAgICAgICAgICAgb3duZXIgPSBtZS5vd25lcixcbiAgICAgICAgICAgIGNscyAgID0gb3duZXIuY2xzO1xuXG4gICAgICAgIE5lb0FycmF5LnJlbW92ZShjbHMsICduZW8taXMtZHJhZ2dpbmcnKTtcbiAgICAgICAgb3duZXIuY2xzID0gY2xzO1xuXG4gICAgICAgIGlmIChtZS5kcmFnUHJveHkpIHtcbiAgICAgICAgICAgIG1lLmRlc3Ryb3lEcmFnUHJveHkoKTtcbiAgICAgICAgICAgIG1lLmRyYWdQcm94eSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3QuYXNzaWduKG1lLCB7XG4gICAgICAgICAgICBkcmFnRWxlbWVudFJlY3QgIDogbnVsbCxcbiAgICAgICAgICAgIG9mZnNldFggICAgICAgICAgOiAwLFxuICAgICAgICAgICAgb2Zmc2V0WSAgICAgICAgICA6IDAsXG4gICAgICAgICAgICBzY3JvbGxDb250YWluZXJJZDogbnVsbFxuICAgICAgICB9KTtcblxuICAgICAgICBtZS5yZXNldERhdGEoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgZHJhZ01vdmUoZGF0YSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzLFxuICAgICAgICAgICAgc3R5bGU7XG5cbiAgICAgICAgaWYgKCFtZS5tb3ZlSW5NYWluVGhyZWFkICYmIG1lLmRyYWdQcm94eSkge1xuICAgICAgICAgICAgc3R5bGUgPSBtZS5kcmFnUHJveHkuc3R5bGU7XG5cbiAgICAgICAgICAgIGlmIChtZS5tb3ZlSG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgIHN0eWxlLmxlZnQgPSBgJHtkYXRhLmNsaWVudFggLSBtZS5vZmZzZXRYfXB4YDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1lLm1vdmVWZXJ0aWNhbCkge1xuICAgICAgICAgICAgICAgIHN0eWxlLnRvcCA9IGAke2RhdGEuY2xpZW50WSAtIG1lLm9mZnNldFl9cHhgO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtZS5kcmFnUHJveHkuc3R5bGUgPSBzdHlsZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBkcmFnU3RhcnQoZGF0YSkge1xuICAgICAgICBsZXQgbWUgICAgPSB0aGlzLFxuICAgICAgICAgICAgb3duZXIgPSBtZS5vd25lcixcbiAgICAgICAgICAgIGNscyAgID0gb3duZXIuY2xzO1xuXG4gICAgICAgIG1lLnNldERhdGEoKTtcblxuICAgICAgICBOZW9BcnJheS5hZGQoY2xzLCAnbmVvLWlzLWRyYWdnaW5nJyk7XG4gICAgICAgIG93bmVyLmNscyA9IGNscztcblxuICAgICAgICBOZW8ubWFpbi5hZGRvbi5EcmFnRHJvcC5zZXRDb25maWdzKG1lLmdldE1haW5UaHJlYWRDb25maWdzKCkpO1xuXG4gICAgICAgIE5lby5tYWluLkRvbUFjY2Vzcy5nZXRCb3VuZGluZ0NsaWVudFJlY3Qoe1xuICAgICAgICAgICAgaWQ6IG1lLmdldERyYWdFbGVtZW50Um9vdCgpLmlkXG4gICAgICAgIH0pLnRoZW4ocmVjdCA9PiB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKG1lLCB7XG4gICAgICAgICAgICAgICAgZHJhZ0VsZW1lbnRSZWN0OiByZWN0LFxuICAgICAgICAgICAgICAgIG9mZnNldFggICAgICAgIDogZGF0YS5jbGllbnRYIC0gcmVjdC5sZWZ0LFxuICAgICAgICAgICAgICAgIG9mZnNldFkgICAgICAgIDogZGF0YS5jbGllbnRZIC0gcmVjdC50b3BcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtZS5jcmVhdGVEcmFnUHJveHkocmVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIGluIGNhc2UgeW91IHdhbnQgdG8gd3JhcCB5b3VyIGRyYWdFbGVtZW50LlxuICAgICAqIFNlZTogZHJhZ2dhYmxlLnRyZWUuRHJhZ1pvbmVcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldERyYWdFbGVtZW50Um9vdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHJhZ0VsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgaW5zaWRlIGNsYXNzIGV4dGVuc2lvbnMgdG8gYWRkIG1vcmUgY29uZmlnc1xuICAgICAqIHdoaWNoIGdldCBwYXNzZWQgdG8gbWFpbi5hZGRvbi5EcmFnRHJvcCBvbkRyYWdTdGFydCgpXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgZ2V0TWFpblRocmVhZENvbmZpZ3MoKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFsd2F5c0ZpcmVEcmFnTW92ZSA6IG1lLmFsd2F5c0ZpcmVEcmFnTW92ZSxcbiAgICAgICAgICAgIGJvdW5kYXJ5Q29udGFpbmVySWQ6IG1lLmJvdW5kYXJ5Q29udGFpbmVySWQsXG4gICAgICAgICAgICBkcmFnUHJveHlDbHMgICAgICAgOiBtZS5kcmFnUHJveHlDbHMsXG4gICAgICAgICAgICBkcmFnWm9uZUlkICAgICAgICAgOiBtZS5pZCxcbiAgICAgICAgICAgIGRyb3Bab25lSWRlbnRpZmllciA6IG1lLmRyb3Bab25lSWRlbnRpZmllcixcbiAgICAgICAgICAgIHNjcm9sbENvbnRhaW5lcklkICA6IG1lLnNjcm9sbENvbnRhaW5lcklkLFxuICAgICAgICAgICAgc2Nyb2xsRmFjdG9yTGVmdCAgIDogbWUuc2Nyb2xsRmFjdG9yTGVmdCxcbiAgICAgICAgICAgIHNjcm9sbEZhY3RvclRvcCAgICA6IG1lLnNjcm9sbEZhY3RvclRvcFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFlvdSBjYW4gZWl0aGVyIGV4dGVuZCB0aGlzIGNsYXNzIGFuZCBvdmVycmlkZSB0aGUgaGFuZGxlciBvciBsaXN0ZW4gdG8gdGhlIGV2ZW50IGZyb20gdGhlIG91dHNpZGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRHJvcChkYXRhKSB7XG4gICAgICAgIHRoaXMuZmlyZSgnZHJvcCcsIGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFlvdSBjYW4gZWl0aGVyIGV4dGVuZCB0aGlzIGNsYXNzIGFuZCBvdmVycmlkZSB0aGUgaGFuZGxlciBvciBsaXN0ZW4gdG8gdGhlIGV2ZW50IGZyb20gdGhlIG91dHNpZGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRHJvcEVudGVyKGRhdGEpIHtcbiAgICAgICAgdGhpcy5maXJlKCdkcm9wOmVudGVyJywgZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogWW91IGNhbiBlaXRoZXIgZXh0ZW5kIHRoaXMgY2xhc3MgYW5kIG92ZXJyaWRlIHRoZSBoYW5kbGVyIG9yIGxpc3RlbiB0byB0aGUgZXZlbnQgZnJvbSB0aGUgb3V0c2lkZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25Ecm9wTGVhdmUoZGF0YSkge1xuICAgICAgICB0aGlzLmZpcmUoJ2Ryb3A6bGVhdmUnLCBkYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIHJlc2V0RGF0YSgpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBudWxsO1xuICAgICAgICB9LCAzMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXh0ZW5kIHRoaXMgbWV0aG9kIGZvciBjaGlsZCBjbGFzc2VzIHRvIHBhc3MgYWRkaXRpb25hbCBwcm9wZXJ0aWVzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGE9e31cbiAgICAgKi9cbiAgICBzZXREYXRhKGRhdGE9e30pIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBtZS5kYXRhID0ge1xuICAgICAgICAgICAgZHJhZ0VsZW1lbnQ6IG1lLmdldERyYWdFbGVtZW50Um9vdCgpLFxuICAgICAgICAgICAgZHJhZ1pvbmVJZCA6IG1lLmlkLFxuICAgICAgICAgICAgLi4uZGF0YVxuICAgICAgICB9O1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoRHJhZ1pvbmUpO1xuXG5leHBvcnQge0RyYWdab25lIGFzIGRlZmF1bHR9OyJdLCJzb3VyY2VSb290IjoiIn0=