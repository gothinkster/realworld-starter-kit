(self["webpackChunkneo_mjs_realworld_example_app"] = self["webpackChunkneo_mjs_realworld_example_app"] || []).push([["apps_realworld_view_article_CreateComponent_mjs"],{

/***/ "./apps/realworld/view/article/CreateComponent.mjs":
/*!*********************************************************!*\
  !*** ./apps/realworld/view/article/CreateComponent.mjs ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateComponent)
/* harmony export */ });
/* harmony import */ var _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/util/VDom.mjs */ "./node_modules/neo.mjs/src/util/VDom.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_util_VNode_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/util/VNode.mjs */ "./node_modules/neo.mjs/src/util/VNode.mjs");
/* harmony import */ var _api_Article_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../api/Article.mjs */ "./apps/realworld/api/Article.mjs");





/**
 * @class RealWorld.view.article.CreateComponent
 * @extends Neo.component.Base
 */
class CreateComponent extends _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.view.article.CreateComponent'
         * @protected
         */
        className: 'RealWorld.view.article.CreateComponent',
        /**
         * @member {String} body_=''
         */
        body_: '',
        /**
         * @member {String[]} cls=['editor-page']
         */
        cls: ['editor-page'],
        /**
         * @member {Object[]} errors_=[]
         */
        errors_: [],
        /**
         * @member {String} description_=''
         */
        description_: '',
        /**
         * @member {String|null} slug=null
         */
        slug: null,
        /**
         * @member {String[]} tagList_=[]
         */
        tagList_: [],
        /**
         * @member {String} title_=''
         */
        title_: '',
        /**
         * @member {Object} _vdom
         */
        _vdom:
        {cn: [
            {cls: ['container', 'page'], cn: [
                {cls: ['row'], cn: [
                    {cls: ['col-md-10', 'offset-md-1', 'col-xs-12'], cn: [
                        {tag: 'ul', cls : ['error-messages'], flag: 'errors'},
                        {tag: 'form', cn: [
                            {tag: 'fieldset', cn: [
                                {tag: 'fieldset', cls: ['form-group'], cn: [
                                    {tag: 'input', cls: ['form-control', 'form-control-lg'], flag: 'title', name: 'title', placeholder: 'Article Title', type: 'text'}
                                ]},
                                {tag: 'fieldset', cls: ['form-group'], cn: [
                                    {tag: 'input', cls: ['form-control'], name: 'description', flag: 'description', placeholder: 'What\'s this article about?', type: 'text'}
                                ]},
                                {tag: 'fieldset', cls: ['form-group'], cn: [
                                    {tag: 'textarea', cls: ['form-control'], flag: 'body', name: 'body', placeholder: 'Write your article (in markdown)', rows: 8}
                                ]},
                                {tag: 'fieldset', cls: ['form-group'], cn: [
                                    {tag: 'input', cls: ['form-control', 'field-tags'], flag: 'tags', name: 'tags', placeholder: 'Enter tags', type: 'text'},
                                    {cls: ['tag-list'], flag: 'tag-list'}
                                ]},
                                {tag: 'button', cls: ['btn', 'btn-lg', 'btn-primary', 'pull-xs-right'], html: 'Publish Article', type: 'button'}
                            ]}
                        ]}
                    ]}
                ]}
            ]}
        ]}
    }}

    /**
     * constructor
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me           = this,
            domListeners = me.domListeners;

        domListeners.push(
            {click  : {fn: me.onSubmitButtonClick, delegate: '.btn-primary',     scope: me}},
            {click  : {fn: me.onTagClose,          delegate: '.ion-close-round', scope: me}},
            {keydown: {fn: me.onFieldTagsKeyDown,  delegate: '.field-tags',      scope: me}}
        );

        me.domListeners = domListeners;
    }

    /**
     * Triggered after the body config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetBody(value, oldValue) {
        let vdom = this.vdom;

        _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getByFlag(vdom, 'body').value = value;
        this.vdom = vdom;
    }

    /**
     * Triggered after the description config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetDescription(value, oldValue) {
        let vdom = this.vdom;

        _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getByFlag(vdom, 'description').value = value;
        this.vdom = vdom;
    }

    /**
     * Triggered after the errors config got changed
     * @param {Object[]} value
     * @param {Object[]} oldValue
     * @protected
     */
    afterSetErrors(value, oldValue) {
        let me   = this,
            vdom = me.vdom,
            list = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getByFlag(vdom, 'errors');

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
     * Triggered after the tagList config got changed
     * Render tag list and reset tag field value
     * @param {String[]} value
     * @param {String[]} oldValue
     */
    afterSetTagList(value, oldValue) {
        let me       = this,
            vdom     = me.vdom,
            list     = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getByFlag(vdom, 'tag-list'),
            tagField = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getByFlag(vdom, 'tags');

        list.cn        = [];
        tagField.value = null; // TODO Reset tag field value properly

        Object.entries(value || {}).forEach(([key, value]) => {
            list.cn.push({
                tag: 'span',
                cls: ['tag-default tag-pill'],
                cn : [{
                    tag         : 'i',
                    cls         : ['ion-close-round'],
                    'data-value': value,
                }, {
                    vtype: 'text',
                    html : value
                }]
            });
        });

        me.vdom = vdom;
    }

    /**
     * Triggered after the title config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetTitle(value, oldValue) {
        let vdom = this.vdom;

        _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getByFlag(vdom, 'title').value = value;
        this.vdom = vdom;
    }

    /**
     * on field tags key down enter add tag to tag list
     * @param event
     */
    onFieldTagsKeyDown(event) {
        const me = this;

        if (event.key === 'Enter') {
            Neo.main.DomAccess.getAttributes({
                id        : event.target.id,
                attributes: 'value'
            }).then(data => {
                _node_modules_neo_mjs_src_util_VNode_mjs__WEBPACK_IMPORTED_MODULE_2__.default.findChildVnode(me.vnode, {className: 'field-tags'}).vnode.attributes.value = data.value;
                me.tagList = [...me._tagList, data.value];
            });
        }
    }

    /**
     * get the form data and post the article via api
     */
    onSubmitButtonClick() {
        let me          = this,
            vdom        = me.vdom,
            body        = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getByFlag(vdom, 'body'),
            description = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getByFlag(vdom, 'description'),
            title       = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getByFlag(vdom, 'title'),
            ids         = [
                title.id,
                description.id,
                body.id
            ];

        Neo.main.DomAccess.getAttributes({
            id        : ids,
            attributes: 'value'
        }).then(data => {
            _api_Article_mjs__WEBPACK_IMPORTED_MODULE_3__.default[me.slug ? 'put' : 'post']({
                data: JSON.stringify({
                    "article": {
                        "title"      : data[0].value,
                        "description": data[1].value,
                        "body"       : data[2].value,
                        "tagList"    : me.tagList
                    }
                }),
                slug: me.slug
            }).then(data => {
                const errors = data.json.errors;

                if (errors) {
                    me.errors = errors;
                } else {
                    Neo.Main.setRoute({
                        value: '/article/' + data.json.article.slug
                    });
                }
            });
        });
    }

    /**
     * Remove clicked tag from list
     * @param event
     */
    onTagClose(event) {
        this.tagList = this.tagList.filter(e => e !== event.target.data.value);
    }

    /**
     * Resets the value of all fields
     */
    resetForm() {
        this.set({
            body       : '',
            description: '',
            slug       : null,
            tagList    : [],
            title      : ''
        });
    }
}

Neo.applyClassConfig(CreateComponent);




/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL3ZpZXcvYXJ0aWNsZS9DcmVhdGVDb21wb25lbnQubWpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWlGO0FBQ0w7QUFDQztBQUM5Qjs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsaUZBQVM7QUFDdkMsd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0EsU0FBUztBQUNULGFBQWE7QUFDYixpQkFBaUI7QUFDakIscUJBQXFCO0FBQ3JCLHlCQUF5QixvREFBb0Q7QUFDN0UseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFDakMscUNBQXFDO0FBQ3JDLGtDQUFrQztBQUNsQyxpQ0FBaUM7QUFDakMscUNBQXFDO0FBQ3JDLGtDQUFrQztBQUNsQyxpQ0FBaUM7QUFDakMscUNBQXFDO0FBQ3JDLGtDQUFrQztBQUNsQyxpQ0FBaUM7QUFDakMscUNBQXFDLHVIQUF1SDtBQUM1SixxQ0FBcUM7QUFDckMsa0NBQWtDO0FBQ2xDLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxVQUFVLHFFQUFxRTtBQUM1RixhQUFhLFVBQVUscUVBQXFFO0FBQzVGLGFBQWEsVUFBVTtBQUN2Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsc0ZBQWtCO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxzRkFBa0I7QUFDMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHNGQUFrQjs7QUFFckM7O0FBRUEsa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzRkFBa0I7QUFDekMsdUJBQXVCLHNGQUFrQjs7QUFFekM7QUFDQSw4QkFBOEI7O0FBRTlCLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxzRkFBa0I7QUFDMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsZ0JBQWdCLDRGQUF3QixZQUFZLHdCQUF3QjtBQUM1RTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixzRkFBa0I7QUFDNUMsMEJBQTBCLHNGQUFrQjtBQUM1QywwQkFBMEIsc0ZBQWtCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFlBQVkscURBQVU7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVvQyIsImZpbGUiOiJjaHVua3MvYXBwL2FwcHNfcmVhbHdvcmxkX3ZpZXdfYXJ0aWNsZV9DcmVhdGVDb21wb25lbnRfbWpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCAgZnJvbSAnLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbXBvbmVudC9CYXNlLm1qcyc7XG5pbXBvcnQgVkRvbVV0aWwgICBmcm9tICcuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdXRpbC9WRG9tLm1qcyc7XG5pbXBvcnQgVk5vZGVVdGlsICBmcm9tICcuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdXRpbC9WTm9kZS5tanMnO1xuaW1wb3J0IEFydGljbGVBcGkgZnJvbSAnLi4vLi4vYXBpL0FydGljbGUubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgUmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5DcmVhdGVDb21wb25lbnRcbiAqIEBleHRlbmRzIE5lby5jb21wb25lbnQuQmFzZVxuICovXG5jbGFzcyBDcmVhdGVDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdSZWFsV29ybGQudmlldy5hcnRpY2xlLkNyZWF0ZUNvbXBvbmVudCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnUmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5DcmVhdGVDb21wb25lbnQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBib2R5Xz0nJ1xuICAgICAgICAgKi9cbiAgICAgICAgYm9keV86ICcnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ2VkaXRvci1wYWdlJ11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWydlZGl0b3ItcGFnZSddLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0W119IGVycm9yc189W11cbiAgICAgICAgICovXG4gICAgICAgIGVycm9yc186IFtdLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBkZXNjcmlwdGlvbl89JydcbiAgICAgICAgICovXG4gICAgICAgIGRlc2NyaXB0aW9uXzogJycsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gc2x1Zz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBzbHVnOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IHRhZ0xpc3RfPVtdXG4gICAgICAgICAqL1xuICAgICAgICB0YWdMaXN0XzogW10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IHRpdGxlXz0nJ1xuICAgICAgICAgKi9cbiAgICAgICAgdGl0bGVfOiAnJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gX3Zkb21cbiAgICAgICAgICovXG4gICAgICAgIF92ZG9tOlxuICAgICAgICB7Y246IFtcbiAgICAgICAgICAgIHtjbHM6IFsnY29udGFpbmVyJywgJ3BhZ2UnXSwgY246IFtcbiAgICAgICAgICAgICAgICB7Y2xzOiBbJ3JvdyddLCBjbjogW1xuICAgICAgICAgICAgICAgICAgICB7Y2xzOiBbJ2NvbC1tZC0xMCcsICdvZmZzZXQtbWQtMScsICdjb2wteHMtMTInXSwgY246IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0YWc6ICd1bCcsIGNscyA6IFsnZXJyb3ItbWVzc2FnZXMnXSwgZmxhZzogJ2Vycm9ycyd9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ2Zvcm0nLCBjbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0YWc6ICdmaWVsZHNldCcsIGNuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0YWc6ICdmaWVsZHNldCcsIGNsczogWydmb3JtLWdyb3VwJ10sIGNuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAnaW5wdXQnLCBjbHM6IFsnZm9ybS1jb250cm9sJywgJ2Zvcm0tY29udHJvbC1sZyddLCBmbGFnOiAndGl0bGUnLCBuYW1lOiAndGl0bGUnLCBwbGFjZWhvbGRlcjogJ0FydGljbGUgVGl0bGUnLCB0eXBlOiAndGV4dCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF19LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAnZmllbGRzZXQnLCBjbHM6IFsnZm9ybS1ncm91cCddLCBjbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ2lucHV0JywgY2xzOiBbJ2Zvcm0tY29udHJvbCddLCBuYW1lOiAnZGVzY3JpcHRpb24nLCBmbGFnOiAnZGVzY3JpcHRpb24nLCBwbGFjZWhvbGRlcjogJ1doYXRcXCdzIHRoaXMgYXJ0aWNsZSBhYm91dD8nLCB0eXBlOiAndGV4dCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF19LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAnZmllbGRzZXQnLCBjbHM6IFsnZm9ybS1ncm91cCddLCBjbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ3RleHRhcmVhJywgY2xzOiBbJ2Zvcm0tY29udHJvbCddLCBmbGFnOiAnYm9keScsIG5hbWU6ICdib2R5JywgcGxhY2Vob2xkZXI6ICdXcml0ZSB5b3VyIGFydGljbGUgKGluIG1hcmtkb3duKScsIHJvd3M6IDh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF19LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAnZmllbGRzZXQnLCBjbHM6IFsnZm9ybS1ncm91cCddLCBjbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ2lucHV0JywgY2xzOiBbJ2Zvcm0tY29udHJvbCcsICdmaWVsZC10YWdzJ10sIGZsYWc6ICd0YWdzJywgbmFtZTogJ3RhZ3MnLCBwbGFjZWhvbGRlcjogJ0VudGVyIHRhZ3MnLCB0eXBlOiAndGV4dCd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2NsczogWyd0YWctbGlzdCddLCBmbGFnOiAndGFnLWxpc3QnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ2J1dHRvbicsIGNsczogWydidG4nLCAnYnRuLWxnJywgJ2J0bi1wcmltYXJ5JywgJ3B1bGwteHMtcmlnaHQnXSwgaHRtbDogJ1B1Ymxpc2ggQXJ0aWNsZScsIHR5cGU6ICdidXR0b24nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICBdfVxuICAgICAgICBdfVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKiBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBsZXQgbWUgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGRvbUxpc3RlbmVycyA9IG1lLmRvbUxpc3RlbmVycztcblxuICAgICAgICBkb21MaXN0ZW5lcnMucHVzaChcbiAgICAgICAgICAgIHtjbGljayAgOiB7Zm46IG1lLm9uU3VibWl0QnV0dG9uQ2xpY2ssIGRlbGVnYXRlOiAnLmJ0bi1wcmltYXJ5JywgICAgIHNjb3BlOiBtZX19LFxuICAgICAgICAgICAge2NsaWNrICA6IHtmbjogbWUub25UYWdDbG9zZSwgICAgICAgICAgZGVsZWdhdGU6ICcuaW9uLWNsb3NlLXJvdW5kJywgc2NvcGU6IG1lfX0sXG4gICAgICAgICAgICB7a2V5ZG93bjoge2ZuOiBtZS5vbkZpZWxkVGFnc0tleURvd24sICBkZWxlZ2F0ZTogJy5maWVsZC10YWdzJywgICAgICBzY29wZTogbWV9fVxuICAgICAgICApO1xuXG4gICAgICAgIG1lLmRvbUxpc3RlbmVycyA9IGRvbUxpc3RlbmVycztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGJvZHkgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0Qm9keSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG5cbiAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdib2R5JykudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGRlc2NyaXB0aW9uIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldERlc2NyaXB0aW9uKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgdmRvbSA9IHRoaXMudmRvbTtcblxuICAgICAgICBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ2Rlc2NyaXB0aW9uJykudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGVycm9ycyBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0RXJyb3JzKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tID0gbWUudmRvbSxcbiAgICAgICAgICAgIGxpc3QgPSBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ2Vycm9ycycpO1xuXG4gICAgICAgIGxpc3QuY24gPSBbXTtcblxuICAgICAgICBPYmplY3QuZW50cmllcyh2YWx1ZSB8fCB7fSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICBsaXN0LmNuLnB1c2goe1xuICAgICAgICAgICAgICAgIHRhZyA6ICdsaScsXG4gICAgICAgICAgICAgICAgaHRtbDoga2V5ICsgJyAnICsgdmFsdWUuam9pbignIGFuZCAnKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgdGFnTGlzdCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBSZW5kZXIgdGFnIGxpc3QgYW5kIHJlc2V0IHRhZyBmaWVsZCB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmdbXX0gb2xkVmFsdWVcbiAgICAgKi9cbiAgICBhZnRlclNldFRhZ0xpc3QodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tICAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICBsaXN0ICAgICA9IFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAndGFnLWxpc3QnKSxcbiAgICAgICAgICAgIHRhZ0ZpZWxkID0gVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICd0YWdzJyk7XG5cbiAgICAgICAgbGlzdC5jbiAgICAgICAgPSBbXTtcbiAgICAgICAgdGFnRmllbGQudmFsdWUgPSBudWxsOyAvLyBUT0RPIFJlc2V0IHRhZyBmaWVsZCB2YWx1ZSBwcm9wZXJseVxuXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHZhbHVlIHx8IHt9KS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgIGxpc3QuY24ucHVzaCh7XG4gICAgICAgICAgICAgICAgdGFnOiAnc3BhbicsXG4gICAgICAgICAgICAgICAgY2xzOiBbJ3RhZy1kZWZhdWx0IHRhZy1waWxsJ10sXG4gICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICB0YWcgICAgICAgICA6ICdpJyxcbiAgICAgICAgICAgICAgICAgICAgY2xzICAgICAgICAgOiBbJ2lvbi1jbG9zZS1yb3VuZCddLFxuICAgICAgICAgICAgICAgICAgICAnZGF0YS12YWx1ZSc6IHZhbHVlLFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdnR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgaHRtbCA6IHZhbHVlXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHRpdGxlIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFRpdGxlKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgdmRvbSA9IHRoaXMudmRvbTtcblxuICAgICAgICBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ3RpdGxlJykudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBvbiBmaWVsZCB0YWdzIGtleSBkb3duIGVudGVyIGFkZCB0YWcgdG8gdGFnIGxpc3RcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKi9cbiAgICBvbkZpZWxkVGFnc0tleURvd24oZXZlbnQpIHtcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgIE5lby5tYWluLkRvbUFjY2Vzcy5nZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICAgICAgICBpZCAgICAgICAgOiBldmVudC50YXJnZXQuaWQsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogJ3ZhbHVlJ1xuICAgICAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBWTm9kZVV0aWwuZmluZENoaWxkVm5vZGUobWUudm5vZGUsIHtjbGFzc05hbWU6ICdmaWVsZC10YWdzJ30pLnZub2RlLmF0dHJpYnV0ZXMudmFsdWUgPSBkYXRhLnZhbHVlO1xuICAgICAgICAgICAgICAgIG1lLnRhZ0xpc3QgPSBbLi4ubWUuX3RhZ0xpc3QsIGRhdGEudmFsdWVdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXQgdGhlIGZvcm0gZGF0YSBhbmQgcG9zdCB0aGUgYXJ0aWNsZSB2aWEgYXBpXG4gICAgICovXG4gICAgb25TdWJtaXRCdXR0b25DbGljaygpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gICAgICAgID0gbWUudmRvbSxcbiAgICAgICAgICAgIGJvZHkgICAgICAgID0gVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdib2R5JyksXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA9IFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnZGVzY3JpcHRpb24nKSxcbiAgICAgICAgICAgIHRpdGxlICAgICAgID0gVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICd0aXRsZScpLFxuICAgICAgICAgICAgaWRzICAgICAgICAgPSBbXG4gICAgICAgICAgICAgICAgdGl0bGUuaWQsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24uaWQsXG4gICAgICAgICAgICAgICAgYm9keS5pZFxuICAgICAgICAgICAgXTtcblxuICAgICAgICBOZW8ubWFpbi5Eb21BY2Nlc3MuZ2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICBpZCAgICAgICAgOiBpZHMsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiAndmFsdWUnXG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBBcnRpY2xlQXBpW21lLnNsdWcgPyAncHV0JyA6ICdwb3N0J10oe1xuICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgXCJhcnRpY2xlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIiAgICAgIDogZGF0YVswXS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogZGF0YVsxXS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9keVwiICAgICAgIDogZGF0YVsyXS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGFnTGlzdFwiICAgIDogbWUudGFnTGlzdFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgc2x1ZzogbWUuc2x1Z1xuICAgICAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvcnMgPSBkYXRhLmpzb24uZXJyb3JzO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgICAgICAgICBtZS5lcnJvcnMgPSBlcnJvcnM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgTmVvLk1haW4uc2V0Um91dGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcvYXJ0aWNsZS8nICsgZGF0YS5qc29uLmFydGljbGUuc2x1Z1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGNsaWNrZWQgdGFnIGZyb20gbGlzdFxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqL1xuICAgIG9uVGFnQ2xvc2UoZXZlbnQpIHtcbiAgICAgICAgdGhpcy50YWdMaXN0ID0gdGhpcy50YWdMaXN0LmZpbHRlcihlID0+IGUgIT09IGV2ZW50LnRhcmdldC5kYXRhLnZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIHZhbHVlIG9mIGFsbCBmaWVsZHNcbiAgICAgKi9cbiAgICByZXNldEZvcm0oKSB7XG4gICAgICAgIHRoaXMuc2V0KHtcbiAgICAgICAgICAgIGJvZHkgICAgICAgOiAnJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgICAgIHNsdWcgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgdGFnTGlzdCAgICA6IFtdLFxuICAgICAgICAgICAgdGl0bGUgICAgICA6ICcnXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoQ3JlYXRlQ29tcG9uZW50KTtcblxuZXhwb3J0IHtDcmVhdGVDb21wb25lbnQgYXMgZGVmYXVsdH07XG4iXSwic291cmNlUm9vdCI6IiJ9