(self["webpackChunkneo_mjs_realworld_example_app"] = self["webpackChunkneo_mjs_realworld_example_app"] || []).push([["apps_realworld_view_user_SignUpComponent_mjs"],{

/***/ "./apps/realworld/view/user/SignUpComponent.mjs":
/*!******************************************************!*\
  !*** ./apps/realworld/view/user/SignUpComponent.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SignUpComponent)
/* harmony export */ });
/* harmony import */ var _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/util/VDom.mjs */ "./node_modules/neo.mjs/src/util/VDom.mjs");



/**
 * @class RealWorld.view.user.SignUpComponent
 * @extends Neo.component.Base
 */
class SignUpComponent extends _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.view.user.SignUpComponent'
         * @protected
         */
        className: 'RealWorld.view.user.SignUpComponent',
        /**
         * @member {String[]} cls=['auth-page']
         */
        cls: ['auth-page'],
        /**
         * @member {Object[]} errors_=[]
         */
        errors_: [],
        /**
         * @member {Object[]} fieldsets_
         */
        fieldsets_: [
            {name: 'username', placeholder: 'Your Name', type: 'text'},
            {name: 'email',    placeholder: 'Email',     type: 'text'},
            {name: 'password', placeholder: 'Password',  type: 'password'}
        ],
        /**
         * @member {Object} keys
         */
        keys: {
            'Enter': 'onKeyDownEnter'
        },
        /**
         * @member {String} mode_='signup'
         * @protected
         */
        mode_: 'signup',
        /**
         * @member {Object} _vdom
         */
        _vdom:
        {cn: [
            {cls: ['container', 'page'], cn: [
                {cls: ['row'], cn: [
                    {cls: ['col-md-6', 'offset-md-3', 'col-xs-12'], cn: [
                        {tag: 'h1', cls: ['text-xs-center']},
                        {tag: 'p', cls: ['text-xs-center'], cn : [{tag: 'a'}]},
                        {tag: 'ul', cls: ['error-messages']},
                        {tag: 'form', cn: [
                            {tag: 'fieldset', cn: [
                                {tag: 'button', cls: ['btn', 'btn-lg', 'btn-primary', 'pull-xs-right'], type: 'button'}
                            ]}
                        ]}
                    ]}
                ]}
            ]}
        ]}
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me           = this,
            domListeners = me.domListeners;

        domListeners.push({
            click: {
                fn      : me.onSubmitButtonClick,
                delegate: '.btn-primary',
                scope   : me
            }
        });

        me.domListeners = domListeners;
    }

    /**
     * Triggered after the errors config got changed
     * @param {Object[]} value
     * @param {Object[]} oldValue
     * @protected
     */
    afterSetErrors(value, oldValue) {
        let me   = this,
            list = me.getErrorMessagesList(),
            vdom = me.vdom;

        list.cn = [];

        Object.entries(value || {}).forEach(([key, value]) => {
            list.cn.push({
                tag : 'li',
                html: key + ' ' + value.join(' and ')
            });
        });

        me.vdom = vdom;
    }

    /**
     * Triggered after the fieldsets config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetFieldsets(value, oldValue) {
        let me   = this,
            vdom = me.vdom,
            form = vdom.cn[0].cn[0].cn[0].cn[3];

        // slice().reverse() => iterate backwards
        value.slice().reverse().forEach(item => {
            form.cn[0].cn.unshift({
                tag: 'fieldset',
                cls: ['form-group'],
                cn : [{
                    tag        : 'input',
                    cls        : ['form-control', 'form-control-lg'],
                    id         : me.getInputId(item.name),
                    name       : item.name,
                    placeholder: item.placeholder,
                    type       : item.type
                }]
            });
        });

        me.vdom = vdom;
    }

    /**
     * Triggered after the mode config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetMode(value, oldValue) {
        let me         = this,
            isSignup   = value === 'signup',
            vdom       = me.vdom,
            contentDiv = vdom.cn[0].cn[0].cn[0];

        // vdom bulk update
        contentDiv.cn[0].html = isSignup ? 'Sign up' : 'Sign in';

        contentDiv.cn[1].cn[0].href = isSignup ? '#/login' : '#/register';
        contentDiv.cn[1].cn[0].html = isSignup ? 'Have an account?' : 'Need an account?';

        // remove the username fieldset if needed
        contentDiv.cn[3].cn[0].cn[0].removeDom = !isSignup;

        // submit button text
        contentDiv.cn[3].cn[0].cn[3].html = isSignup ? 'Sign up' : 'Sign in';

        me.vdom = vdom;
    }

    /**
     * Example for dynamically finding vdom elements
     * @returns {Object} vdom
     */
    getErrorMessagesList() {
        let el = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__.default.findVdomChild(this.vdom, {cls: 'error-messages'});
        return el && el.vdom;
    }

    /**
     * Creates an inputEl id using the view id as a prefix
     * @returns {String} itemId
     */
    getInputId(id) {
        return this.id + '__' + id;
    }

    /**
     *
     */
    onKeyDownEnter() {
        this.onSubmitButtonClick();
    }

    /**
     *
     */
    onSubmitButtonClick() {
        let me         = this,
            controller = me.getController(),
            isSignup   = me.mode === 'signup',
            ids        = [me.getInputId('email'), me.getInputId('password')],
            userData;

        if (isSignup) {
            ids.push(me.getInputId('username'));
        }

        // read the input values from the main thread
        // we could register an oninput event to this view as well and store the changes
        Neo.main.DomAccess.getAttributes({
            id        : ids,
            attributes: 'value'
        }).then(data => {
            userData = {
                user: {
                    email   : data[0].value,
                    password: data[1].value
                }
            };

            if (isSignup) {
                userData.user.username = data[2].value;
            }

            controller.saveUser({
                data: JSON.stringify(userData),
                slug: isSignup ? '' : '/login'
            }).then(data => {
                const errors = data.json.errors;

                if (errors) {
                    me.errors = errors;
                } else {
                    controller.login(data.json.user);
                }
            });
        });
    }
}

Neo.applyClassConfig(SignUpComponent);




/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL3ZpZXcvdXNlci9TaWduVXBDb21wb25lbnQubWpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFnRjtBQUNMOztBQUUzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixpRkFBUztBQUN2Qyx3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQSxhQUFhLHlEQUF5RDtBQUN0RSxhQUFhLHlEQUF5RDtBQUN0RSxhQUFhO0FBQ2I7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBLFNBQVM7QUFDVCxhQUFhO0FBQ2IsaUJBQWlCO0FBQ2pCLHFCQUFxQjtBQUNyQix5QkFBeUIsbUNBQW1DO0FBQzVELHlCQUF5QiwwQ0FBMEMsU0FBUyxFQUFFO0FBQzlFLHlCQUF5QixtQ0FBbUM7QUFDNUQseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QixlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQSxpQkFBaUIsMEZBQXNCLGFBQWEsc0JBQXNCO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVvQyIsImZpbGUiOiJjaHVua3MvYXBwL2FwcHNfcmVhbHdvcmxkX3ZpZXdfdXNlcl9TaWduVXBDb21wb25lbnRfbWpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29tcG9uZW50L0Jhc2UubWpzJztcbmltcG9ydCBWRG9tVXRpbCAgZnJvbSAnLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL3V0aWwvVkRvbS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBSZWFsV29ybGQudmlldy51c2VyLlNpZ25VcENvbXBvbmVudFxuICogQGV4dGVuZHMgTmVvLmNvbXBvbmVudC5CYXNlXG4gKi9cbmNsYXNzIFNpZ25VcENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J1JlYWxXb3JsZC52aWV3LnVzZXIuU2lnblVwQ29tcG9uZW50J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdSZWFsV29ybGQudmlldy51c2VyLlNpZ25VcENvbXBvbmVudCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gY2xzPVsnYXV0aC1wYWdlJ11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWydhdXRoLXBhZ2UnXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdFtdfSBlcnJvcnNfPVtdXG4gICAgICAgICAqL1xuICAgICAgICBlcnJvcnNfOiBbXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdFtdfSBmaWVsZHNldHNfXG4gICAgICAgICAqL1xuICAgICAgICBmaWVsZHNldHNfOiBbXG4gICAgICAgICAgICB7bmFtZTogJ3VzZXJuYW1lJywgcGxhY2Vob2xkZXI6ICdZb3VyIE5hbWUnLCB0eXBlOiAndGV4dCd9LFxuICAgICAgICAgICAge25hbWU6ICdlbWFpbCcsICAgIHBsYWNlaG9sZGVyOiAnRW1haWwnLCAgICAgdHlwZTogJ3RleHQnfSxcbiAgICAgICAgICAgIHtuYW1lOiAncGFzc3dvcmQnLCBwbGFjZWhvbGRlcjogJ1Bhc3N3b3JkJywgIHR5cGU6ICdwYXNzd29yZCd9XG4gICAgICAgIF0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IGtleXNcbiAgICAgICAgICovXG4gICAgICAgIGtleXM6IHtcbiAgICAgICAgICAgICdFbnRlcic6ICdvbktleURvd25FbnRlcidcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbW9kZV89J3NpZ251cCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbW9kZV86ICdzaWdudXAnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBfdmRvbVxuICAgICAgICAgKi9cbiAgICAgICAgX3Zkb206XG4gICAgICAgIHtjbjogW1xuICAgICAgICAgICAge2NsczogWydjb250YWluZXInLCAncGFnZSddLCBjbjogW1xuICAgICAgICAgICAgICAgIHtjbHM6IFsncm93J10sIGNuOiBbXG4gICAgICAgICAgICAgICAgICAgIHtjbHM6IFsnY29sLW1kLTYnLCAnb2Zmc2V0LW1kLTMnLCAnY29sLXhzLTEyJ10sIGNuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAnaDEnLCBjbHM6IFsndGV4dC14cy1jZW50ZXInXX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAncCcsIGNsczogWyd0ZXh0LXhzLWNlbnRlciddLCBjbiA6IFt7dGFnOiAnYSd9XX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAndWwnLCBjbHM6IFsnZXJyb3ItbWVzc2FnZXMnXX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAnZm9ybScsIGNuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ2ZpZWxkc2V0JywgY246IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ2J1dHRvbicsIGNsczogWydidG4nLCAnYnRuLWxnJywgJ2J0bi1wcmltYXJ5JywgJ3B1bGwteHMtcmlnaHQnXSwgdHlwZTogJ2J1dHRvbid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgIF19XG4gICAgICAgIF19XG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIGxldCBtZSAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgZG9tTGlzdGVuZXJzID0gbWUuZG9tTGlzdGVuZXJzO1xuXG4gICAgICAgIGRvbUxpc3RlbmVycy5wdXNoKHtcbiAgICAgICAgICAgIGNsaWNrOiB7XG4gICAgICAgICAgICAgICAgZm4gICAgICA6IG1lLm9uU3VibWl0QnV0dG9uQ2xpY2ssXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6ICcuYnRuLXByaW1hcnknLFxuICAgICAgICAgICAgICAgIHNjb3BlICAgOiBtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBtZS5kb21MaXN0ZW5lcnMgPSBkb21MaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBlcnJvcnMgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtPYmplY3RbXX0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEVycm9ycyh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgbGlzdCA9IG1lLmdldEVycm9yTWVzc2FnZXNMaXN0KCksXG4gICAgICAgICAgICB2ZG9tID0gbWUudmRvbTtcblxuICAgICAgICBsaXN0LmNuID0gW107XG5cbiAgICAgICAgT2JqZWN0LmVudHJpZXModmFsdWUgfHwge30pLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgbGlzdC5jbi5wdXNoKHtcbiAgICAgICAgICAgICAgICB0YWcgOiAnbGknLFxuICAgICAgICAgICAgICAgIGh0bWw6IGtleSArICcgJyArIHZhbHVlLmpvaW4oJyBhbmQgJylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGZpZWxkc2V0cyBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRGaWVsZHNldHModmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tLFxuICAgICAgICAgICAgZm9ybSA9IHZkb20uY25bMF0uY25bMF0uY25bMF0uY25bM107XG5cbiAgICAgICAgLy8gc2xpY2UoKS5yZXZlcnNlKCkgPT4gaXRlcmF0ZSBiYWNrd2FyZHNcbiAgICAgICAgdmFsdWUuc2xpY2UoKS5yZXZlcnNlKCkuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGZvcm0uY25bMF0uY24udW5zaGlmdCh7XG4gICAgICAgICAgICAgICAgdGFnOiAnZmllbGRzZXQnLFxuICAgICAgICAgICAgICAgIGNsczogWydmb3JtLWdyb3VwJ10sXG4gICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICB0YWcgICAgICAgIDogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgY2xzICAgICAgICA6IFsnZm9ybS1jb250cm9sJywgJ2Zvcm0tY29udHJvbC1sZyddLFxuICAgICAgICAgICAgICAgICAgICBpZCAgICAgICAgIDogbWUuZ2V0SW5wdXRJZChpdGVtLm5hbWUpLFxuICAgICAgICAgICAgICAgICAgICBuYW1lICAgICAgIDogaXRlbS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogaXRlbS5wbGFjZWhvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgICAgICA6IGl0ZW0udHlwZVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBtb2RlIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldE1vZGUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGlzU2lnbnVwICAgPSB2YWx1ZSA9PT0gJ3NpZ251cCcsXG4gICAgICAgICAgICB2ZG9tICAgICAgID0gbWUudmRvbSxcbiAgICAgICAgICAgIGNvbnRlbnREaXYgPSB2ZG9tLmNuWzBdLmNuWzBdLmNuWzBdO1xuXG4gICAgICAgIC8vIHZkb20gYnVsayB1cGRhdGVcbiAgICAgICAgY29udGVudERpdi5jblswXS5odG1sID0gaXNTaWdudXAgPyAnU2lnbiB1cCcgOiAnU2lnbiBpbic7XG5cbiAgICAgICAgY29udGVudERpdi5jblsxXS5jblswXS5ocmVmID0gaXNTaWdudXAgPyAnIy9sb2dpbicgOiAnIy9yZWdpc3Rlcic7XG4gICAgICAgIGNvbnRlbnREaXYuY25bMV0uY25bMF0uaHRtbCA9IGlzU2lnbnVwID8gJ0hhdmUgYW4gYWNjb3VudD8nIDogJ05lZWQgYW4gYWNjb3VudD8nO1xuXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgdXNlcm5hbWUgZmllbGRzZXQgaWYgbmVlZGVkXG4gICAgICAgIGNvbnRlbnREaXYuY25bM10uY25bMF0uY25bMF0ucmVtb3ZlRG9tID0gIWlzU2lnbnVwO1xuXG4gICAgICAgIC8vIHN1Ym1pdCBidXR0b24gdGV4dFxuICAgICAgICBjb250ZW50RGl2LmNuWzNdLmNuWzBdLmNuWzNdLmh0bWwgPSBpc1NpZ251cCA/ICdTaWduIHVwJyA6ICdTaWduIGluJztcblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGFtcGxlIGZvciBkeW5hbWljYWxseSBmaW5kaW5nIHZkb20gZWxlbWVudHNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSB2ZG9tXG4gICAgICovXG4gICAgZ2V0RXJyb3JNZXNzYWdlc0xpc3QoKSB7XG4gICAgICAgIGxldCBlbCA9IFZEb21VdGlsLmZpbmRWZG9tQ2hpbGQodGhpcy52ZG9tLCB7Y2xzOiAnZXJyb3ItbWVzc2FnZXMnfSk7XG4gICAgICAgIHJldHVybiBlbCAmJiBlbC52ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5wdXRFbCBpZCB1c2luZyB0aGUgdmlldyBpZCBhcyBhIHByZWZpeFxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IGl0ZW1JZFxuICAgICAqL1xuICAgIGdldElucHV0SWQoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQgKyAnX18nICsgaWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvbktleURvd25FbnRlcigpIHtcbiAgICAgICAgdGhpcy5vblN1Ym1pdEJ1dHRvbkNsaWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvblN1Ym1pdEJ1dHRvbkNsaWNrKCkge1xuICAgICAgICBsZXQgbWUgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBjb250cm9sbGVyID0gbWUuZ2V0Q29udHJvbGxlcigpLFxuICAgICAgICAgICAgaXNTaWdudXAgICA9IG1lLm1vZGUgPT09ICdzaWdudXAnLFxuICAgICAgICAgICAgaWRzICAgICAgICA9IFttZS5nZXRJbnB1dElkKCdlbWFpbCcpLCBtZS5nZXRJbnB1dElkKCdwYXNzd29yZCcpXSxcbiAgICAgICAgICAgIHVzZXJEYXRhO1xuXG4gICAgICAgIGlmIChpc1NpZ251cCkge1xuICAgICAgICAgICAgaWRzLnB1c2gobWUuZ2V0SW5wdXRJZCgndXNlcm5hbWUnKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZWFkIHRoZSBpbnB1dCB2YWx1ZXMgZnJvbSB0aGUgbWFpbiB0aHJlYWRcbiAgICAgICAgLy8gd2UgY291bGQgcmVnaXN0ZXIgYW4gb25pbnB1dCBldmVudCB0byB0aGlzIHZpZXcgYXMgd2VsbCBhbmQgc3RvcmUgdGhlIGNoYW5nZXNcbiAgICAgICAgTmVvLm1haW4uRG9tQWNjZXNzLmdldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgaWQgICAgICAgIDogaWRzLFxuICAgICAgICAgICAgYXR0cmlidXRlczogJ3ZhbHVlJ1xuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdXNlckRhdGEgPSB7XG4gICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICBlbWFpbCAgIDogZGF0YVswXS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGRhdGFbMV0udmFsdWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoaXNTaWdudXApIHtcbiAgICAgICAgICAgICAgICB1c2VyRGF0YS51c2VyLnVzZXJuYW1lID0gZGF0YVsyXS52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udHJvbGxlci5zYXZlVXNlcih7XG4gICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodXNlckRhdGEpLFxuICAgICAgICAgICAgICAgIHNsdWc6IGlzU2lnbnVwID8gJycgOiAnL2xvZ2luJ1xuICAgICAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvcnMgPSBkYXRhLmpzb24uZXJyb3JzO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgICAgICAgICBtZS5lcnJvcnMgPSBlcnJvcnM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5sb2dpbihkYXRhLmpzb24udXNlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoU2lnblVwQ29tcG9uZW50KTtcblxuZXhwb3J0IHtTaWduVXBDb21wb25lbnQgYXMgZGVmYXVsdH07XG4iXSwic291cmNlUm9vdCI6IiJ9