(self["webpackChunkneo_mjs_realworld_example_app"] = self["webpackChunkneo_mjs_realworld_example_app"] || []).push([["src/tooltip/Base"],{

/***/ "./node_modules/neo.mjs/src/component/Label.mjs":
/*!******************************************************!*\
  !*** ./node_modules/neo.mjs/src/component/Label.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Label)
/* harmony export */ });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");


/**
 * Convenience class to render a label with a text
 * @class Neo.component.Label
 * @extends Neo.component.Base
 */
class Label extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.component.Label'
         * @protected
         */
        className: 'Neo.component.Label',
        /**
         * @member {String} ntype='label'
         * @protected
         */
        ntype: 'label',
        /**
         * @member {String[]} cls=['neo-label']
         */
        cls: ['neo-label'],
        /**
         * @member {String} text_=''
         */
        text_: '',
        /**
         * @member {Object} _vdom={tag: 'label'}
         */
        _vdom:
        {tag: 'label', draggable: false}
    }}

    /**
     * Triggered after the text config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetText(value, oldValue) {
        let vdom = this.vdom;
        vdom.html = value;
        this.vdom = vdom;
    }
}

Neo.applyClassConfig(Label);



/***/ }),

/***/ "./node_modules/neo.mjs/src/tooltip/Base.mjs":
/*!***************************************************!*\
  !*** ./node_modules/neo.mjs/src/tooltip/Base.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Base)
/* harmony export */ });
/* harmony import */ var _container_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../container/Base.mjs */ "./node_modules/neo.mjs/src/container/Base.mjs");
/* harmony import */ var _util_Floating_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Floating.mjs */ "./node_modules/neo.mjs/src/util/Floating.mjs");
/* harmony import */ var _component_Label_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../component/Label.mjs */ "./node_modules/neo.mjs/src/component/Label.mjs");




/**
 * Base class for component tooltips
 * @class Neo.tooltip.Base
 * @extends Neo.container.Base
 */
class Base extends _container_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.tooltip.Base'
         * @protected
         */
        className: 'Neo.tooltip.Base',
        /**
         * @member {String} ntype='tooltip'
         * @protected
         */
        ntype: 'tooltip',
        /**
         * @member {String[]} cls=['neo-tooltip']
         */
        cls: ['neo-tooltip'],
        /**
         * A reference to the target component which is supposed to show this tooltip on mouseenter
         * @member {String|null} componentId_=null
         */
        componentId_: null,
        /**
         * Delegates down to a CSS selector inside the target component
         * @member {String|null} delegate=null
         */
        delegate: null,
        /**
         * The delay in ms before the tooltip gets hidden while hovering the target element.
         * Use null to disable the dismiss logic.
         * @member {Number|null} dismissDelay=10000
         */
        dismissDelay: 10000,
        /**
         * The dismissDelay task id generated by setTimeout()
         * @member {Number|null} dismissDelayTaskId=null
         * @protected
         */
        dismissDelayTaskId: null,
        /**
         * The delay in ms before the tooltip gets shown
         * @member {Number|null} hideDelay=400
         */
        hideDelay: 400,
        /**
         * The showDelay task id generated by setTimeout()
         * @member {Number|null} hideDelayTaskId=null
         * @protected
         */
        hideDelayTaskId: null,
        /**
         * @member {Array} mixins
         * @protected
         */
        mixins: [_util_Floating_mjs__WEBPACK_IMPORTED_MODULE_1__.default],
        /**
         * The delay in ms before the tooltip gets shown
         * @member {Number|null} showDelay=200
         */
        showDelay: 200,
        /**
         * The showDelay task id generated by setTimeout()
         * @member {Number|null} showDelayTaskId=null
         * @protected
         */
        showDelayTaskId: null,
        /**
         * True prevents the tooltip from hiding while the mouse cursor is above it
         * @member {Boolean|null} stayOnHover_=true
         */
        stayOnHover_: true,
        /**
         * Shortcut to add a label item
         * @member {String} text_=null
         */
        text_: null
    }}

    /**
     * Triggered after the componentId config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetComponentId(value, oldValue) {
        if (oldValue) {
            // todo: remove the component domListeners
        }

        if (value) {
            let me           = this,
                component    = Neo.getComponent(value),
                domListeners = component.domListeners || [];

            domListeners.push({
                mouseenter: me.showDelayed,
                delegate  : me.delegate,
                scope     : me
            }, {
                mouseleave: me.hideDelayed,
                delegate  : me.delegate,
                scope     : me
            });

            component.domListeners = domListeners;
        }
    }

    /**
     * Triggered after the stayOnHover config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetStayOnHover(value, oldValue) {
        if (oldValue) {
            // todo: remove the component domListeners
        }

        if (value) {
            let me           = this,
                domListeners = me.domListeners || [];

            domListeners.push(
                {mouseenter: me.onMouseEnter, scope: me},
                {mouseleave: me.onMouseLeave, scope: me}
            );

            me.domListeners = domListeners;
        }
    }

    /**
     * Triggered after the text config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetText(value, oldValue) {
        if (value) {
            let me    = this,
                items = me.items || [],
                item  = items[0];

            if (item && item.ntype === 'label') {
                item.text = value;
            } else {
                items.push({
                    module: _component_Label_mjs__WEBPACK_IMPORTED_MODULE_2__.default,
                    text  : value
                });

                me.items = items;
            }
        }
    }

    /**
     * Clears one or multiple setTimeout call(s)
     * @param {String[]|String} timers valid values: dismiss, hide, show
     */
    clearTimeout(timers) {
        if (!Array.isArray(timers)) {
            timers = [timers];
        }

        let me = this,
            id;

        timers.forEach(timer => {
            id = timer + 'DelayTaskId';

            if (me[id]) {
                clearTimeout(me[id]);
                me[id] = null;
            }
        });
    }

    /**
     * Instantly hides the tooltip
     * @param {Object|null} data
     */
    hide(data) {
        let me = this;

        me.clearTimeout(['dismiss', 'hide', 'show']);

        if (me.mounted) {
            me.unmount();
        }
    }

    /**
     * Hides the tooltip using the given hideDelay
     * @param {Object|null} data
     */
    hideDelayed(data) {
        let me = this;

        if (me.hideDelay) {
            me.hideDelayTaskId = setTimeout(me.hide.bind(me), me.hideDelay, data);
        } else {
            me.hide(data);
        }
    }

    /**
     * mouseenter event listener for the tooltip element
     * @param {Object} data
     */
    onMouseEnter(data) {
        let me       = this,
            targetId = data.path[0].id;

        // only use path[0] based events to ignore mouseenter & leave for child nodes
        if (me.id === targetId) {
            me.clearTimeout(['dismiss', 'hide']);
        }
    }

    /**
     * mouseleave event listener for the tooltip element
     * @param {Object} data
     */
    onMouseLeave(data) {
        let me       = this,
            targetId = data.path[0].id;

        // only use path[0] based events to ignore mouseenter & leave for child nodes
        if (me.id === targetId) {
            me.hideDelayed(null);
        }
    }

    /**
     * Instantly shows the tooltip
     * @param {Object} data
     */
    show(data) {
        let me = this;

        me.showDelayTaskId = null;

        me.clearTimeout('hide');

        if (me.dismissDelay) {
            me.dismissDelayTaskId = setTimeout(me.hide.bind(me), me.dismissDelay, data);
        }

        if (!me.mounted) {
            me.mount();
        }
    }

    /**
     * Shows the tooltip using the given showDelay
     * @param {Object} data
     */
    showDelayed(data) {
        let me = this;

        if (me.showDelay) {
            me.showDelayTaskId = setTimeout(me.show.bind(me), me.showDelay, data);
        } else {
            me.show(data);
        }
    }
}

Neo.applyClassConfig(Base);



/***/ }),

/***/ "./node_modules/neo.mjs/src/util/Floating.mjs":
/*!****************************************************!*\
  !*** ./node_modules/neo.mjs/src/util/Floating.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * todo: can probably get removed
 * Mixin to make Components floating (e.g. Windows)
 * @class Neo.util.Floating
 * @extends Neo.core.Base
 */
class Floating extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.util.Floating'
         * @protected
         */
        className: 'Neo.util.Floating',
        /**
         * @member {String} ntype='mixin-floating'
         * @protected
         */
        ntype: 'mixin-floating',
        /**
         * @member {Boolean} mixin=true
         */
        mixin: true,
        /**
         * @member {String|null} animateTargetId=null
         */
        animateTargetId: null,
        /**
         * @member {Boolean} modal=false
         */
        modal: false
    }}
}

Neo.applyClassConfig(Floating);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Floating);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9jb21wb25lbnQvTGFiZWwubWpzIiwid2VicGFjazovL25lby5tanMtcmVhbHdvcmxkLWV4YW1wbGUtYXBwLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL3Rvb2x0aXAvQmFzZS5tanMiLCJ3ZWJwYWNrOi8vbmVvLm1qcy1yZWFsd29ybGQtZXhhbXBsZS1hcHAvLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdXRpbC9GbG9hdGluZy5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBbUM7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsOENBQVM7QUFDN0Isd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPLFFBQVE7QUFDbkM7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9DOEM7QUFDRDtBQUNFOztBQUUvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHdEQUFTO0FBQzVCLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsTUFBTTtBQUMxQjtBQUNBO0FBQ0EsaUJBQWlCLHVEQUFRO0FBQ3pCO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsYUFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQix1Q0FBdUM7QUFDeEQsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsNEJBQTRCLHlEQUFLO0FBQ2pDO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxnQkFBZ0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLGVBQWUsWUFBWTtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsWUFBWTtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdFJvQzs7QUFFcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1EQUFJO0FBQzNCLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxpRUFBZSxRQUFRLEUiLCJmaWxlIjoiY2h1bmtzL2FwcC9zcmMvdG9vbHRpcC9CYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL0Jhc2UubWpzJztcblxuLyoqXG4gKiBDb252ZW5pZW5jZSBjbGFzcyB0byByZW5kZXIgYSBsYWJlbCB3aXRoIGEgdGV4dFxuICogQGNsYXNzIE5lby5jb21wb25lbnQuTGFiZWxcbiAqIEBleHRlbmRzIE5lby5jb21wb25lbnQuQmFzZVxuICovXG5jbGFzcyBMYWJlbCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5jb21wb25lbnQuTGFiZWwnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5jb21wb25lbnQuTGFiZWwnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0nbGFiZWwnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnbGFiZWwnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ25lby1sYWJlbCddXG4gICAgICAgICAqL1xuICAgICAgICBjbHM6IFsnbmVvLWxhYmVsJ10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IHRleHRfPScnXG4gICAgICAgICAqL1xuICAgICAgICB0ZXh0XzogJycsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IF92ZG9tPXt0YWc6ICdsYWJlbCd9XG4gICAgICAgICAqL1xuICAgICAgICBfdmRvbTpcbiAgICAgICAge3RhZzogJ2xhYmVsJywgZHJhZ2dhYmxlOiBmYWxzZX1cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSB0ZXh0IGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFRleHQodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCB2ZG9tID0gdGhpcy52ZG9tO1xuICAgICAgICB2ZG9tLmh0bWwgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKExhYmVsKTtcblxuZXhwb3J0IHtMYWJlbCBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQ29udGFpbmVyIGZyb20gJy4uL2NvbnRhaW5lci9CYXNlLm1qcyc7XG5pbXBvcnQgRmxvYXRpbmcgIGZyb20gJy4uL3V0aWwvRmxvYXRpbmcubWpzJztcbmltcG9ydCBMYWJlbCAgICAgZnJvbSAnLi4vY29tcG9uZW50L0xhYmVsLm1qcyc7XG5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgY29tcG9uZW50IHRvb2x0aXBzXG4gKiBAY2xhc3MgTmVvLnRvb2x0aXAuQmFzZVxuICogQGV4dGVuZHMgTmVvLmNvbnRhaW5lci5CYXNlXG4gKi9cbmNsYXNzIEJhc2UgZXh0ZW5kcyBDb250YWluZXIge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8udG9vbHRpcC5CYXNlJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8udG9vbHRpcC5CYXNlJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J3Rvb2x0aXAnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAndG9vbHRpcCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gY2xzPVsnbmVvLXRvb2x0aXAnXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ25lby10b29sdGlwJ10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgdGFyZ2V0IGNvbXBvbmVudCB3aGljaCBpcyBzdXBwb3NlZCB0byBzaG93IHRoaXMgdG9vbHRpcCBvbiBtb3VzZWVudGVyXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBjb21wb25lbnRJZF89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgY29tcG9uZW50SWRfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogRGVsZWdhdGVzIGRvd24gdG8gYSBDU1Mgc2VsZWN0b3IgaW5zaWRlIHRoZSB0YXJnZXQgY29tcG9uZW50XG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBkZWxlZ2F0ZT1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBkZWxlZ2F0ZTogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBkZWxheSBpbiBtcyBiZWZvcmUgdGhlIHRvb2x0aXAgZ2V0cyBoaWRkZW4gd2hpbGUgaG92ZXJpbmcgdGhlIHRhcmdldCBlbGVtZW50LlxuICAgICAgICAgKiBVc2UgbnVsbCB0byBkaXNhYmxlIHRoZSBkaXNtaXNzIGxvZ2ljLlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8bnVsbH0gZGlzbWlzc0RlbGF5PTEwMDAwXG4gICAgICAgICAqL1xuICAgICAgICBkaXNtaXNzRGVsYXk6IDEwMDAwLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGRpc21pc3NEZWxheSB0YXNrIGlkIGdlbmVyYXRlZCBieSBzZXRUaW1lb3V0KClcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfG51bGx9IGRpc21pc3NEZWxheVRhc2tJZD1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGRpc21pc3NEZWxheVRhc2tJZDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBkZWxheSBpbiBtcyBiZWZvcmUgdGhlIHRvb2x0aXAgZ2V0cyBzaG93blxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8bnVsbH0gaGlkZURlbGF5PTQwMFxuICAgICAgICAgKi9cbiAgICAgICAgaGlkZURlbGF5OiA0MDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgc2hvd0RlbGF5IHRhc2sgaWQgZ2VuZXJhdGVkIGJ5IHNldFRpbWVvdXQoKVxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8bnVsbH0gaGlkZURlbGF5VGFza0lkPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgaGlkZURlbGF5VGFza0lkOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl9IG1peGluc1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBtaXhpbnM6IFtGbG9hdGluZ10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZGVsYXkgaW4gbXMgYmVmb3JlIHRoZSB0b29sdGlwIGdldHMgc2hvd25cbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfG51bGx9IHNob3dEZWxheT0yMDBcbiAgICAgICAgICovXG4gICAgICAgIHNob3dEZWxheTogMjAwLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHNob3dEZWxheSB0YXNrIGlkIGdlbmVyYXRlZCBieSBzZXRUaW1lb3V0KClcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfG51bGx9IHNob3dEZWxheVRhc2tJZD1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHNob3dEZWxheVRhc2tJZDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRydWUgcHJldmVudHMgdGhlIHRvb2x0aXAgZnJvbSBoaWRpbmcgd2hpbGUgdGhlIG1vdXNlIGN1cnNvciBpcyBhYm92ZSBpdFxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufG51bGx9IHN0YXlPbkhvdmVyXz10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBzdGF5T25Ib3Zlcl86IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG9ydGN1dCB0byBhZGQgYSBsYWJlbCBpdGVtXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gdGV4dF89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgdGV4dF86IG51bGxcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBjb21wb25lbnRJZCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRDb21wb25lbnRJZCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAvLyB0b2RvOiByZW1vdmUgdGhlIGNvbXBvbmVudCBkb21MaXN0ZW5lcnNcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50ICAgID0gTmVvLmdldENvbXBvbmVudCh2YWx1ZSksXG4gICAgICAgICAgICAgICAgZG9tTGlzdGVuZXJzID0gY29tcG9uZW50LmRvbUxpc3RlbmVycyB8fCBbXTtcblxuICAgICAgICAgICAgZG9tTGlzdGVuZXJzLnB1c2goe1xuICAgICAgICAgICAgICAgIG1vdXNlZW50ZXI6IG1lLnNob3dEZWxheWVkLFxuICAgICAgICAgICAgICAgIGRlbGVnYXRlICA6IG1lLmRlbGVnYXRlLFxuICAgICAgICAgICAgICAgIHNjb3BlICAgICA6IG1lXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgbW91c2VsZWF2ZTogbWUuaGlkZURlbGF5ZWQsXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUgIDogbWUuZGVsZWdhdGUsXG4gICAgICAgICAgICAgICAgc2NvcGUgICAgIDogbWVcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb21wb25lbnQuZG9tTGlzdGVuZXJzID0gZG9tTGlzdGVuZXJzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBzdGF5T25Ib3ZlciBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFN0YXlPbkhvdmVyKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgIC8vIHRvZG86IHJlbW92ZSB0aGUgY29tcG9uZW50IGRvbUxpc3RlbmVyc1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgbWUgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICBkb21MaXN0ZW5lcnMgPSBtZS5kb21MaXN0ZW5lcnMgfHwgW107XG5cbiAgICAgICAgICAgIGRvbUxpc3RlbmVycy5wdXNoKFxuICAgICAgICAgICAgICAgIHttb3VzZWVudGVyOiBtZS5vbk1vdXNlRW50ZXIsIHNjb3BlOiBtZX0sXG4gICAgICAgICAgICAgICAge21vdXNlbGVhdmU6IG1lLm9uTW91c2VMZWF2ZSwgc2NvcGU6IG1lfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgbWUuZG9tTGlzdGVuZXJzID0gZG9tTGlzdGVuZXJzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSB0ZXh0IGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0VGV4dCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgbWUgICAgPSB0aGlzLFxuICAgICAgICAgICAgICAgIGl0ZW1zID0gbWUuaXRlbXMgfHwgW10sXG4gICAgICAgICAgICAgICAgaXRlbSAgPSBpdGVtc1swXTtcblxuICAgICAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5udHlwZSA9PT0gJ2xhYmVsJykge1xuICAgICAgICAgICAgICAgIGl0ZW0udGV4dCA9IHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlOiBMYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgdGV4dCAgOiB2YWx1ZVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbWUuaXRlbXMgPSBpdGVtcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsZWFycyBvbmUgb3IgbXVsdGlwbGUgc2V0VGltZW91dCBjYWxsKHMpXG4gICAgICogQHBhcmFtIHtTdHJpbmdbXXxTdHJpbmd9IHRpbWVycyB2YWxpZCB2YWx1ZXM6IGRpc21pc3MsIGhpZGUsIHNob3dcbiAgICAgKi9cbiAgICBjbGVhclRpbWVvdXQodGltZXJzKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh0aW1lcnMpKSB7XG4gICAgICAgICAgICB0aW1lcnMgPSBbdGltZXJzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtZSA9IHRoaXMsXG4gICAgICAgICAgICBpZDtcblxuICAgICAgICB0aW1lcnMuZm9yRWFjaCh0aW1lciA9PiB7XG4gICAgICAgICAgICBpZCA9IHRpbWVyICsgJ0RlbGF5VGFza0lkJztcblxuICAgICAgICAgICAgaWYgKG1lW2lkXSkge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChtZVtpZF0pO1xuICAgICAgICAgICAgICAgIG1lW2lkXSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluc3RhbnRseSBoaWRlcyB0aGUgdG9vbHRpcFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fG51bGx9IGRhdGFcbiAgICAgKi9cbiAgICBoaWRlKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBtZS5jbGVhclRpbWVvdXQoWydkaXNtaXNzJywgJ2hpZGUnLCAnc2hvdyddKTtcblxuICAgICAgICBpZiAobWUubW91bnRlZCkge1xuICAgICAgICAgICAgbWUudW5tb3VudCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZXMgdGhlIHRvb2x0aXAgdXNpbmcgdGhlIGdpdmVuIGhpZGVEZWxheVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fG51bGx9IGRhdGFcbiAgICAgKi9cbiAgICBoaWRlRGVsYXllZChkYXRhKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKG1lLmhpZGVEZWxheSkge1xuICAgICAgICAgICAgbWUuaGlkZURlbGF5VGFza0lkID0gc2V0VGltZW91dChtZS5oaWRlLmJpbmQobWUpLCBtZS5oaWRlRGVsYXksIGRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWUuaGlkZShkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIG1vdXNlZW50ZXIgZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSB0b29sdGlwIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uTW91c2VFbnRlcihkYXRhKSB7XG4gICAgICAgIGxldCBtZSAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB0YXJnZXRJZCA9IGRhdGEucGF0aFswXS5pZDtcblxuICAgICAgICAvLyBvbmx5IHVzZSBwYXRoWzBdIGJhc2VkIGV2ZW50cyB0byBpZ25vcmUgbW91c2VlbnRlciAmIGxlYXZlIGZvciBjaGlsZCBub2Rlc1xuICAgICAgICBpZiAobWUuaWQgPT09IHRhcmdldElkKSB7XG4gICAgICAgICAgICBtZS5jbGVhclRpbWVvdXQoWydkaXNtaXNzJywgJ2hpZGUnXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBtb3VzZWxlYXZlIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgdG9vbHRpcCBlbGVtZW50XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbk1vdXNlTGVhdmUoZGF0YSkge1xuICAgICAgICBsZXQgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdGFyZ2V0SWQgPSBkYXRhLnBhdGhbMF0uaWQ7XG5cbiAgICAgICAgLy8gb25seSB1c2UgcGF0aFswXSBiYXNlZCBldmVudHMgdG8gaWdub3JlIG1vdXNlZW50ZXIgJiBsZWF2ZSBmb3IgY2hpbGQgbm9kZXNcbiAgICAgICAgaWYgKG1lLmlkID09PSB0YXJnZXRJZCkge1xuICAgICAgICAgICAgbWUuaGlkZURlbGF5ZWQobnVsbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnN0YW50bHkgc2hvd3MgdGhlIHRvb2x0aXBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIHNob3coZGF0YSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIG1lLnNob3dEZWxheVRhc2tJZCA9IG51bGw7XG5cbiAgICAgICAgbWUuY2xlYXJUaW1lb3V0KCdoaWRlJyk7XG5cbiAgICAgICAgaWYgKG1lLmRpc21pc3NEZWxheSkge1xuICAgICAgICAgICAgbWUuZGlzbWlzc0RlbGF5VGFza0lkID0gc2V0VGltZW91dChtZS5oaWRlLmJpbmQobWUpLCBtZS5kaXNtaXNzRGVsYXksIGRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFtZS5tb3VudGVkKSB7XG4gICAgICAgICAgICBtZS5tb3VudCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgdGhlIHRvb2x0aXAgdXNpbmcgdGhlIGdpdmVuIHNob3dEZWxheVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgc2hvd0RlbGF5ZWQoZGF0YSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChtZS5zaG93RGVsYXkpIHtcbiAgICAgICAgICAgIG1lLnNob3dEZWxheVRhc2tJZCA9IHNldFRpbWVvdXQobWUuc2hvdy5iaW5kKG1lKSwgbWUuc2hvd0RlbGF5LCBkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lLnNob3coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKEJhc2UpO1xuXG5leHBvcnQge0Jhc2UgYXMgZGVmYXVsdH07IiwiaW1wb3J0IEJhc2UgZnJvbSAnLi4vY29yZS9CYXNlLm1qcyc7XG5cbi8qKlxuICogdG9kbzogY2FuIHByb2JhYmx5IGdldCByZW1vdmVkXG4gKiBNaXhpbiB0byBtYWtlIENvbXBvbmVudHMgZmxvYXRpbmcgKGUuZy4gV2luZG93cylcbiAqIEBjbGFzcyBOZW8udXRpbC5GbG9hdGluZ1xuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICovXG5jbGFzcyBGbG9hdGluZyBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8udXRpbC5GbG9hdGluZydcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLnV0aWwuRmxvYXRpbmcnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0nbWl4aW4tZmxvYXRpbmcnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnbWl4aW4tZmxvYXRpbmcnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gbWl4aW49dHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgbWl4aW46IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gYW5pbWF0ZVRhcmdldElkPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGFuaW1hdGVUYXJnZXRJZDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IG1vZGFsPWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBtb2RhbDogZmFsc2VcbiAgICB9fVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhGbG9hdGluZyk7XG5cbmV4cG9ydCBkZWZhdWx0IEZsb2F0aW5nOyJdLCJzb3VyY2VSb290IjoiIn0=