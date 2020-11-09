self["webpackChunk"](["chunks/docs-app-mjs"],{

/***/ "./docs/app.mjs":
/*!**********************!*\
  !*** ./docs/app.mjs ***!
  \**********************/
/*! exports provided: onStart */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onStart", function() { return onStart; });
/* harmony import */ var _app_view_MainContainer_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/view/MainContainer.mjs */ "./docs/app/view/MainContainer.mjs");


const onStart = () => Neo.app({
    appPath : 'docs/',
    mainView: _app_view_MainContainer_mjs__WEBPACK_IMPORTED_MODULE_0__["default"],
    name    : 'Docs'
});



/***/ }),

/***/ "./docs/app/model/Api.mjs":
/*!********************************!*\
  !*** ./docs/app/model/Api.mjs ***!
  \********************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Api; });
/* harmony import */ var _node_modules_neo_mjs_src_data_Model_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/data/Model.mjs */ "./node_modules/neo.mjs/src/data/Model.mjs");


/**
 * @class Docs.app.model.Api
 * @extends Neo.data.Model
 */
class Api extends _node_modules_neo_mjs_src_data_Model_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Docs.app.model.Api'
         * @protected
         */
        className: 'Docs.app.model.Api',
        /**
         * @member {Object[]} fields
         */
        fields: [{
            name: 'className',
            type: 'String'
        }, {
            name: 'collapsed',
            type: 'Boolean'
        }, {
            name: 'id',
            type: 'Integer'
        }, {
            name: 'isLeaf',
            type: 'Boolean'
        }, {
            name: 'name',
            type: 'String'
        }, {
            name: 'parentId',
            type: 'Integer'
        }, {
            name: 'path',
            type: 'String'
        }, {
            name: 'singleton',
            type: 'Boolean'
        }, {
            name: 'srcPath',
            type: 'String'
        }]
    }}
}

Neo.applyClassConfig(Api);



/***/ }),

/***/ "./docs/app/model/Example.mjs":
/*!************************************!*\
  !*** ./docs/app/model/Example.mjs ***!
  \************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Example; });
/* harmony import */ var _node_modules_neo_mjs_src_data_Model_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/data/Model.mjs */ "./node_modules/neo.mjs/src/data/Model.mjs");


/**
 * @class Docs.app.model.Example
 * @extends Neo.data.Model
 */
class Example extends _node_modules_neo_mjs_src_data_Model_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Docs.app.model.Example'
         * @protected
         */
        className: 'Docs.app.model.Example',
        /**
         * @member {Object[]} fields
         */
        fields: [{
            name: 'collapsed', // optional, only needed for collapsed non leaf items
            type: 'Boolean'
        }, {
            name: 'id',
            type: 'Integer'
        }, {
            name: 'isLeaf',
            type: 'Boolean'
        }, {
            name: 'name',
            type: 'String'
        }, {
            name: 'parentId',
            type: 'Integer'
        }, {
            name: 'path',
            type: 'String'
        }]
    }}
}

Neo.applyClassConfig(Example);



/***/ }),

/***/ "./docs/app/model/Tutorial.mjs":
/*!*************************************!*\
  !*** ./docs/app/model/Tutorial.mjs ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tutorial; });
/* harmony import */ var _node_modules_neo_mjs_src_data_Model_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/data/Model.mjs */ "./node_modules/neo.mjs/src/data/Model.mjs");


/**
 * @class Docs.app.model.Tutorial
 * @extends Neo.data.Model
 */
class Tutorial extends _node_modules_neo_mjs_src_data_Model_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Docs.app.model.Tutorial'
         * @protected
         */
        className: 'Docs.app.model.Example',
        /**
         * @member {Object[]} fields
         */
        fields: [{
            name: 'fileName',
            type: 'String'
        }, {
            name: 'id',
            type: 'Integer'
        }, {
            name: 'isLeaf',
            type: 'Boolean'
        }, {
            name: 'name',
            type: 'String'
        }, {
            name: 'parentId',
            type: 'Integer'
        }, {
            name: 'type',
            type: 'String'
        }]
    }}
}

Neo.applyClassConfig(Tutorial);



/***/ }),

/***/ "./docs/app/store/Api.mjs":
/*!********************************!*\
  !*** ./docs/app/store/Api.mjs ***!
  \********************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Api; });
/* harmony import */ var _model_Api_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/Api.mjs */ "./docs/app/model/Api.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_data_Store_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/data/Store.mjs */ "./node_modules/neo.mjs/src/data/Store.mjs");



/**
 * @class Docs.app.store.Api
 * @extends Neo.data.Store
 */
class Api extends _node_modules_neo_mjs_src_data_Store_mjs__WEBPACK_IMPORTED_MODULE_1__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Docs.app.store.Api'
         * @protected
         */
        className: 'Docs.app.store.Api',
        /**
         * @member {String} keyProperty='id'
         */
        keyProperty: 'id',
        /**
         * @member {Neo.data.Model} model=ApiModel
         */
        model: _model_Api_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]
    }}
}

Neo.applyClassConfig(Api);



/***/ }),

/***/ "./docs/app/store/Examples.mjs":
/*!*************************************!*\
  !*** ./docs/app/store/Examples.mjs ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Examples; });
/* harmony import */ var _model_Example_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/Example.mjs */ "./docs/app/model/Example.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_data_Store_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/data/Store.mjs */ "./node_modules/neo.mjs/src/data/Store.mjs");



/**
 * @class Docs.app.store.Examples
 * @extends Neo.data.Store
 */
class Examples extends _node_modules_neo_mjs_src_data_Store_mjs__WEBPACK_IMPORTED_MODULE_1__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Docs.app.store.Examples'
         * @protected
         */
        className: 'Docs.app.store.Examples',
        /**
         * @member {String} keyProperty='id'
         */
        keyProperty: 'id',
        /**
         * @member {Neo.data.Model} model=Example
         */
        model: _model_Example_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]
    }}
}

Neo.applyClassConfig(Examples);



/***/ }),

/***/ "./docs/app/store/Tutorials.mjs":
/*!**************************************!*\
  !*** ./docs/app/store/Tutorials.mjs ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tutorials; });
/* harmony import */ var _node_modules_neo_mjs_src_data_Store_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/data/Store.mjs */ "./node_modules/neo.mjs/src/data/Store.mjs");
/* harmony import */ var _model_Tutorial_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/Tutorial.mjs */ "./docs/app/model/Tutorial.mjs");



/**
 * @class Docs.app.store.Tutorials
 * @extends Neo.data.Store
 */
class Tutorials extends _node_modules_neo_mjs_src_data_Store_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Docs.app.store.Tutorials'
         * @protected
         */
        className: 'Docs.app.store.Tutorials',
        /**
         * @member {String} keyProperty='id'
         */
        keyProperty: 'id',
        /**
         * @member {Neo.data.Model} model=Tutorial
         */
        model: _model_Tutorial_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]
    }}
}

Neo.applyClassConfig(Tutorials);



/***/ }),

/***/ "./docs/app/view/ApiTreeList.mjs":
/*!***************************************!*\
  !*** ./docs/app/view/ApiTreeList.mjs ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ApiTreeList; });
/* harmony import */ var _node_modules_neo_mjs_src_tree_List_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/tree/List.mjs */ "./node_modules/neo.mjs/src/tree/List.mjs");
/* harmony import */ var _store_Api_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store/Api.mjs */ "./docs/app/store/Api.mjs");



/**
 * @class Docs.app.view.ApiTreeList
 * @extends Neo.tree.List
 */
class ApiTreeList extends _node_modules_neo_mjs_src_tree_List_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Docs.app.view.ApiTreeList'
         * @protected
         */
        className: 'Docs.app.view.ApiTreeList',
        /**
         * @member {String} ntype='api-treelist'
         * @protected
         */
        ntype: 'api-treelist',
        /**
         * @member {Neo.data.Store|null} store=ApiStore
         * @protected
         */
        store: _store_Api_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]
    }}

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        let me = this;

        Neo.Xhr.promiseJson({
            url: '../../docs/output/structure.json'
        }).then(data => {
            let vdom     = me.vdom,
                itemRoot = me.getListItemsRoot();

            me.store.data = data.json;
            itemRoot = me.createItems(null, itemRoot, 0);

            me.vdom = vdom;
        });
    }
}

Neo.applyClassConfig(ApiTreeList);



/***/ }),

/***/ "./docs/app/view/ContentTabContainer.mjs":
/*!***********************************************!*\
  !*** ./docs/app/view/ContentTabContainer.mjs ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ContentTabContainer; });
/* harmony import */ var _node_modules_neo_mjs_src_tab_Container_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/tab/Container.mjs */ "./node_modules/neo.mjs/src/tab/Container.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_tab_header_Button_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/tab/header/Button.mjs */ "./node_modules/neo.mjs/src/tab/header/Button.mjs");



/**
 * @class Docs.app.view.ContentTabContainer
 * @extends Neo.tab.Container
 */
class ContentTabContainer extends _node_modules_neo_mjs_src_tab_Container_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Docs.app.view.ContentTabContainer'
         * @protected
         */
        className: 'Docs.app.view.ContentTabContainer',
        /**
         * @member {String} ntype='docs-content-tabcontainer'
         * @protected
         */
        ntype: 'docs-content-tabcontainer',
        /**
         * @member {Boolean} activateInsertedTabs=true
         */
        activateInsertedTabs: true,
        /**
         * @member {Object} contentContainerDefaults={cls:[//...]}
         */
        contentContainerDefaults: {
            cls: [
                'neo-docs-tab-content-container',
                'neo-tab-content-container',
                'neo-container'
            ]
        },
        /**
         * @member {Object} headerToolbarDefaults={cls:[//...]}
         */
        headerToolbarDefaults: {
            cls: [
                'docs-tab-header-toolbar',
                'neo-tab-header-toolbar',
                'neo-toolbar'
            ]
        },
        /**
         * @member {Array} items=[//...]]
         */
        items: [{
            ntype: 'component',
            html : 'Welcome to the neo.mjs docs!',
            style: {padding: '20px'},

            tabButtonConfig: {
                iconCls: 'fa fa-users',
                text   : 'Welcome!'
            }
        }],
        /**
         * @member {Boolean} sortable=true
         */
        sortable: true
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me  = this,
            cls = me.cls;

        cls.unshift('docs-content-tabcontainer');
        me.cls = cls;
    }

    /**
     * Overriding the button click listener to allow closing tabs on icon click
     * @param {Object} config
     * @param {Number} index
     * @returns {Object} The merged config
     * @protected
     * @override
     */
    getTabButtonConfig(config, index) {
        let me = this,
            defaultConfig = {
                module : _node_modules_neo_mjs_src_tab_header_Button_mjs__WEBPACK_IMPORTED_MODULE_1__["default"],
                flex   : 'none',
                index  : index,
                pressed: me.activeIndex === index,

                domListeners: [{
                    click: function(data) {
                        let path = data.path.map(e => e.id);

                        if (path[0].indexOf('neo-tab-header-button-') === 0) {
                            me.activeIndex = data.component.index;
                        } else {
                            me.removeAt(Neo.getComponent(me.tabBarId).indexOf(path[1]))
                        }
                    },
                    scope: me
                }]
            };

        return {...defaultConfig, ...config};
    }
}

Neo.applyClassConfig(ContentTabContainer);



/***/ }),

/***/ "./docs/app/view/ExamplesTreeList.mjs":
/*!********************************************!*\
  !*** ./docs/app/view/ExamplesTreeList.mjs ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ExamplesTreeList; });
/* harmony import */ var _store_Examples_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store/Examples.mjs */ "./docs/app/store/Examples.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_tree_List_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/tree/List.mjs */ "./node_modules/neo.mjs/src/tree/List.mjs");



/**
 * @class Docs.app.view.ExamplesTreeList
 * @extends Neo.tree.List
 */
class ExamplesTreeList extends _node_modules_neo_mjs_src_tree_List_mjs__WEBPACK_IMPORTED_MODULE_1__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Docs.app.view.ExamplesTreeList'
         * @protected
         */
        className: 'Docs.app.view.ExamplesTreeList',
        /**
         * @member {String} ntype='examples-treelist'
         * @protected
         */
        ntype: 'examples-treelist',
        /**
         * @member {String[]} cls=['docs-examples-treelist', 'neo-tree-list', 'neo-list-container', 'neo-list']
         */
        cls: [
            'docs-examples-treelist',
            'neo-tree-list',
            'neo-list-container',
            'neo-list'
        ],
        /**
         * @member {Neo.data.Store|null} store=ExamplesStore
         * @protected
         */
        store: _store_Examples_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]
    }}

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        let me = this;

        Neo.Xhr.promiseJson({
            url: '../../docs/examples.json'
        }).then(data => {
            let vdom     = me.vdom,
                itemRoot = me.getListItemsRoot();

            me.store.data = data.json;
            itemRoot = me.createItems(null, itemRoot, 0);

            me.vdom = vdom;
        });
    }
}

Neo.applyClassConfig(ExamplesTreeList);



/***/ }),

/***/ "./docs/app/view/HeaderContainer.mjs":
/*!*******************************************!*\
  !*** ./docs/app/view/HeaderContainer.mjs ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HeaderContainer; });
/* harmony import */ var _node_modules_neo_mjs_src_container_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/container/Base.mjs */ "./node_modules/neo.mjs/src/container/Base.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_button_Base_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/button/Base.mjs */ "./node_modules/neo.mjs/src/button/Base.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_form_field_Search_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/form/field/Search.mjs */ "./node_modules/neo.mjs/src/form/field/Search.mjs");




/**
 * @class Docs.app.view.HeaderContainer
 * @extends Neo.container.Base
 */
class HeaderContainer extends _node_modules_neo_mjs_src_container_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Docs.app.view.HeaderContainer'
         * @protected
         */
        className: 'Docs.app.view.HeaderContainer',
        /**
         * @member {String} ntype='header-container'
         * @protected
         */
        ntype: 'neo-docs-header-container',
        /**
         * @member {String[]} cls=['neo-docs-header-container']
         */
        cls: ['neo-docs-header-container'],
        /**
         * @member {Number} height=55
         */
        height: 55,
        /**
         * @member {Object} layout={ntype: 'hbox', align: 'stretch'}
         */
        layout: {ntype: 'hbox', align: 'stretch'},
        /**
         * @member {Array} items=[//...]
         */
        items: [{
            module         : _node_modules_neo_mjs_src_form_field_Search_mjs__WEBPACK_IMPORTED_MODULE_2__["default"],
            listeners      : {change: 'onNavigationSearchFieldChange'},
            placeholderText: 'Filter Navigation',
            style          : {padding: '10px'},
            width          : 240
        }, {
            module      : _node_modules_neo_mjs_src_button_Base_mjs__WEBPACK_IMPORTED_MODULE_1__["default"],
            domListeners: {click: 'onSwitchThemeButtonClick'},
            flex        : 'none',
            height      : 27,
            reference   : 'theme-button',
            style       : {marginTop: '5px'},
            text        : 'Theme Dark'
        }, {
            module      : _node_modules_neo_mjs_src_button_Base_mjs__WEBPACK_IMPORTED_MODULE_1__["default"],
            domListeners: {click: 'onSwitchSourceViewThemeButtonClick'},
            flex        : 'none',
            height      : 27,
            reference   : 'source-view-theme-button',
            style       : {marginLeft: '10px', marginTop: '5px'},
            text        : 'Source View Theme Dark'
        }, {
            ntype: 'component',
            flex : 1
        }, {
            ntype: 'component',
            cls  : ['neo-logo-text'],
            html : 'neo.mjs docs',
            width: 210
        }]
    }}
}

Neo.applyClassConfig(HeaderContainer);



/***/ }),

/***/ "./docs/app/view/MainContainer.mjs":
/*!*****************************************!*\
  !*** ./docs/app/view/MainContainer.mjs ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MainContainer; });
/* harmony import */ var _ApiTreeList_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ApiTreeList.mjs */ "./docs/app/view/ApiTreeList.mjs");
/* harmony import */ var _classdetails_MainContainer_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classdetails/MainContainer.mjs */ "./docs/app/view/classdetails/MainContainer.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_collection_Base_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/collection/Base.mjs */ "./node_modules/neo.mjs/src/collection/Base.mjs");
/* harmony import */ var _ContentTabContainer_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ContentTabContainer.mjs */ "./docs/app/view/ContentTabContainer.mjs");
/* harmony import */ var _ExamplesTreeList_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ExamplesTreeList.mjs */ "./docs/app/view/ExamplesTreeList.mjs");
/* harmony import */ var _HeaderContainer_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./HeaderContainer.mjs */ "./docs/app/view/HeaderContainer.mjs");
/* harmony import */ var _MainContainerController_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MainContainerController.mjs */ "./docs/app/view/MainContainerController.mjs");
/* harmony import */ var _classdetails_SourceViewComponent_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./classdetails/SourceViewComponent.mjs */ "./docs/app/view/classdetails/SourceViewComponent.mjs");
/* harmony import */ var _classdetails_TutorialComponent_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./classdetails/TutorialComponent.mjs */ "./docs/app/view/classdetails/TutorialComponent.mjs");
/* harmony import */ var _TutorialsTreeList_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./TutorialsTreeList.mjs */ "./docs/app/view/TutorialsTreeList.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_container_Viewport_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/container/Viewport.mjs */ "./node_modules/neo.mjs/src/container/Viewport.mjs");












/**
 * @class Docs.app.view.MainContainer
 * @extends Neo.container.Viewport
 */
class MainContainer extends _node_modules_neo_mjs_src_container_Viewport_mjs__WEBPACK_IMPORTED_MODULE_10__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Docs.app.view.MainContainer'
         * @protected
         */
        className: 'Docs.app.view.MainContainer',
        /**
         * @member {String} ntype='main-container'
         * @protected
         */
        ntype: 'main-container',
        /**
         * @member {Boolean} autoMount=true
         */
        autoMount : true,
        /**
         * @member {String[]} cls=['neo-docs-maincontainer', 'neo-viewport']
         */
        cls: ['neo-docs-maincontainer', 'neo-viewport'],
        /**
         * @member {Neo.controller.Component} controller=MainContainerController
         */
        controller: _MainContainerController_mjs__WEBPACK_IMPORTED_MODULE_6__["default"],
        /**
         * @member {Object} layout={ntype: 'vbox', align: 'stretch'}
         */
        layout: {ntype: 'vbox', align: 'stretch'},
        /**
         * @member {Neo.collection.Base|null} store_=null
         */
        store_: null,
        /**
         * @member {Array} items=[//...]
         */
        items: [_HeaderContainer_mjs__WEBPACK_IMPORTED_MODULE_5__["default"], {
            ntype : 'container',
            flex  : 1,
            layout: {ntype: 'hbox', align: 'stretch'},

            items: [{
                ntype   : 'tab-container',
                cls     : ['neo-docs-navigation-tab-container', 'neo-tab-container'],
                minWidth: 290,
                sortable: true,
                width   : 290,

                items: [{
                    module   : _ApiTreeList_mjs__WEBPACK_IMPORTED_MODULE_0__["default"],
                    listeners: {leafItemClick: 'onApiListLeafClick'},
                    reference: 'api-treelist',

                    tabButtonConfig: {
                        iconCls: 'fa fa-code',
                        text   : 'API'
                    }
                }, {
                    module   : _TutorialsTreeList_mjs__WEBPACK_IMPORTED_MODULE_9__["default"],
                    listeners: {leafItemClick: 'onTutorialListLeafClick'},
                    reference: 'tutorials-treelist',

                    tabButtonConfig: {
                        iconCls: 'fa fa-hands-helping',
                        text   : 'Tutorials'
                    }
                }, {
                    module   : _ExamplesTreeList_mjs__WEBPACK_IMPORTED_MODULE_4__["default"],
                    listeners: {leafItemClick: 'onExamplesListLeafClick'},
                    reference: 'examples-treelist',

                    tabButtonConfig: {
                        iconCls: 'fa fa-desktop',
                        text   : 'Examples'
                    }
                }]
            }, {
                module   : _ContentTabContainer_mjs__WEBPACK_IMPORTED_MODULE_3__["default"],
                flex     : 1,
                reference: 'content-tabcontainer'
            }]
        }]
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me = this;

        if (!me.store) {
            me.store = Neo.create(_node_modules_neo_mjs_src_collection_Base_mjs__WEBPACK_IMPORTED_MODULE_2__["default"], {
                keyProperty: 'id'
            });
        }

        // Disable the examples Tab for dist versions until the webpack builds can handle this (see: #140)
        me.items[1].items[0].items[2].tabButtonConfig.disabled = Neo.config.environment !== 'development';
    }

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        let me = this;

        Neo.Xhr.promiseJson({
            url: '../../docs/output/all.json'
        }).then(data => {
            me.store.items = data.json;
        });
    }
}

Neo.applyClassConfig(MainContainer);



/***/ }),

/***/ "./docs/app/view/MainContainerController.mjs":
/*!***************************************************!*\
  !*** ./docs/app/view/MainContainerController.mjs ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MainContainerController; });
/* harmony import */ var _node_modules_neo_mjs_src_controller_Component_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/controller/Component.mjs */ "./node_modules/neo.mjs/src/controller/Component.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");



/**
 * @class Docs.app.view.MainContainerController
 * @extends Neo.controller.Component
 */
class MainContainerController extends _node_modules_neo_mjs_src_controller_Component_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Docs.app.view.MainContainerController'
         * @protected
         */
        className: 'Docs.app.view.MainContainerController',
        /**
         * @member {String} ntype='docs-maincontainer-controller'
         * @protected
         */
        ntype: 'docs-maincontainer-controller'
    }}

    /**
     *
     * @param {Object} record
     */
    onApiListLeafClick(record) {
        let me                  = this,
            contentTabContainer = me.getReference('content-tabcontainer');

        contentTabContainer.add({
            ntype        : 'classdetails-maincontainer',
            id           : record.className,
            structureData: record,

            tabButtonConfig: {
                iconCls: record.singleton ? 'fa fa-arrow-alt-circle-right' : 'fa fa-copyright',
                text   : record.name
            }
        });
    }

    /**
     *
     * @param {Object} record
     */
    onExamplesListLeafClick(record) {
        let me                  = this,
            contentTabContainer = me.getReference('content-tabcontainer'),
            name                = record.name,
            pathArray           = [],
            store               = me.getReference('examples-treelist').store,
            tmpRecord           = record,
            tabButtonConfig;

        while (tmpRecord.parentId !== null) {
            tmpRecord = store.get(tmpRecord.parentId);
            name      = tmpRecord.name + '.' + name;
        }

        name = 'examples_' + name;

        tabButtonConfig = {
            iconCls: 'fa fa-desktop',
            text   : record.name
        };

        if (!Array.isArray(record.path)) {
            import(
                /* webpackIgnore: true */
                record.path).then((module) => {
                    contentTabContainer.add({
                        ntype          : module.default.prototype.ntype,
                        id             : name,
                        tabButtonConfig: tabButtonConfig
                    });
                }
            );
        } else {
            record.path.forEach(path => {
                pathArray.push(import(/* webpackIgnore: true */ path));
            });

            Promise.all(pathArray).then(function(modules) {
                let items = [];

                modules.forEach(module => {
                    items.push({
                        ntype: module.default.prototype.ntype
                    });
                });

                contentTabContainer.add({
                    ntype          : 'container',
                    id             : name,
                    items          : items,
                    style          : {padding: '10px'},
                    tabButtonConfig: tabButtonConfig
                });
            })
        }
    }

    /**
     *
     * @param {Object} value
     * @param {Object} oldValue
     */
    onHashChange(value, oldValue) {
        let me                  = this,
            hash                = value && value.hash,
            contentTabContainer = me.getReference('content-tabcontainer'),
            structureStore      = me.getReference('api-treelist').store,
            record, tab;

        if (hash && hash.hasOwnProperty('viewSource')) {
            record = structureStore.find('className', hash.viewSource)[0];

            if (record) {
                tab = contentTabContainer.add({
                    ntype        : 'classdetails-sourceviewcomponent',
                    id           : hash.viewSource + '__source',
                    line         : hash.line,
                    structureData: record,

                    tabButtonConfig: {
                        iconCls: 'fa fa-code',
                        text   : record.name
                    }
                });

                // adjust the highlighted line for already added source view tabs
                tab.line = hash.line;
            }
        }
    }

    /**
     *
     * @param {Object} data
     */
    onNavigationSearchFieldChange(data) {
        let me    = this,
            value = data.value;

        me.getReference('examples-treelist') .filter('name', value, null);
        me.getReference('api-treelist')      .filter('name', value, null);
        me.getReference('tutorials-treelist').filter('name', value, null);
    }

    /**
     *
     */
    onSwitchSourceViewThemeButtonClick() {
        let me     = this,
            button = me.getReference('source-view-theme-button'),
            buttonText, href;

        if (button.text === 'Source View Theme Light') {
            buttonText = 'Source View Theme Dark';
            href       = './resources/highlightjs-custom-github-theme.css';
        } else {
            buttonText = 'Source View Theme Light';
            href       = './resources/highlightjs-custom-dark-theme.css';
        }

        Neo.main.addon.Stylesheet.swapStyleSheet({
            href: href,
            id  : 'hljs-theme'
        }).then(data => {
            button.text = buttonText;
        });
    }

    /**
     *
     */
    onSwitchThemeButtonClick() {
        let me     = this,
            button = me.getReference('theme-button'),
            view   = me.view,
            buttonText, cls, href, theme;

        if (button.text === 'Theme Light') {
            buttonText = 'Theme Dark';
            href       = '../dist/development/neo-theme-light-no-css-vars.css';
            theme      = 'neo-theme-light';
        } else {
            buttonText = 'Theme Light';
            href       = '../dist/development/neo-theme-dark-no-css-vars.css';
            theme      = 'neo-theme-dark';
        }

        if (Neo.config.useCssVars) {
            cls = [...view.cls];

            view.cls.forEach((item, index) => {
                if (item.includes('neo-theme')) {
                    _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(cls, item);
                }
            });

            _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(cls, theme);
            view.cls = cls;

            button.text = buttonText;
        } else {
            Neo.main.addon.Stylesheet.swapStyleSheet({
                href: href,
                id  : 'neo-theme'
            }).then(data => {
                button.text = buttonText;
            });
        }
    }

    /**
     *
     * @param {Object} record
     */
    onTutorialListLeafClick(record) {
        let me                  = this,
            contentTabContainer = me.getReference('content-tabcontainer');

        contentTabContainer.add({
            ntype   : 'classdetails-tutorialcomponent',
            fileName: record.fileName,
            fileType: record.type,
            id      : record.name,

            tabButtonConfig: {
                iconCls: 'fa fa-hands-helping',
                text   : record.name
            }
        });
    }
}

Neo.applyClassConfig(MainContainerController);



/***/ }),

/***/ "./docs/app/view/TutorialsTreeList.mjs":
/*!*********************************************!*\
  !*** ./docs/app/view/TutorialsTreeList.mjs ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TutorialsTreeList; });
/* harmony import */ var _node_modules_neo_mjs_src_tree_List_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/tree/List.mjs */ "./node_modules/neo.mjs/src/tree/List.mjs");
/* harmony import */ var _store_Tutorials_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store/Tutorials.mjs */ "./docs/app/store/Tutorials.mjs");



/**
 * @class Docs.app.view.TutorialsTreeList
 * @extends Neo.tree.List
 */
class TutorialsTreeList extends _node_modules_neo_mjs_src_tree_List_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Docs.app.view.TutorialsTreeList'
         * @protected
         */
        className: 'Docs.app.view.TutorialsTreeList',
        /**
         * @member {String} ntype='tutorials-treelist'
         * @protected
         */
        ntype: 'tutorials-treelist',
        /**
         * @member {String[]} cls=['docs-tutorials-treelist', 'neo-tree-list', 'neo-list-container', 'neo-list']
         */
        cls: [
            'docs-tutorials-treelist',
            'neo-tree-list',
            'neo-list-container',
            'neo-list'
        ],
        /**
         * @member {Neo.data.Store|null} store=TutorialsStore
         * @protected
         */
        store: _store_Tutorials_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]
    }}

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        let me = this;

        Neo.Xhr.promiseJson({
            url: '../../docs/tutorials/tutorials.json'
        }).then(data => {
            let vdom     = me.vdom,
                itemRoot = me.getListItemsRoot();

            me.store.data = data.json;
            itemRoot = me.createItems(null, itemRoot, 0);

            me.vdom = vdom;
        });
    }
}

Neo.applyClassConfig(TutorialsTreeList);



/***/ }),

/***/ "./docs/app/view/classdetails/HeaderComponent.mjs":
/*!********************************************************!*\
  !*** ./docs/app/view/classdetails/HeaderComponent.mjs ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HeaderComponent; });
/* harmony import */ var _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");
/* harmony import */ var _SourceViewComponent_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SourceViewComponent.mjs */ "./docs/app/view/classdetails/SourceViewComponent.mjs");



/**
 * @class Docs.app.view.classdetails.HeaderComponent
 * @extends Neo.component.Base
 */
class HeaderComponent extends _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Docs.app.view.classdetails.HeaderComponent'
         * @protected
         */
        className: 'Docs.app.view.classdetails.HeaderComponent',
        /**
         * @member {String} ntype='classdetails-headercomponent'
         * @protected
         */
        ntype: 'classdetails-headercomponent',
        /**
         * @member {String[]} cls=['neo-docs-classdetails-headercomponent']
         */
        cls: ['neo-docs-classdetails-headercomponent'],
        /**
         * @member {Object|null} record_=null
         */
        record_: null,
        /**
         * @member {Object} domListeners
         */
        domListeners: {
            click: {
                fn      : 'onHeaderClick', // Docs.app.view.MainContainerController
                delegate: '.neo-docs-header-text'
            }
        },
        /**
         * @member {Object} _vdom
         */
        _vdom: {
            cn: [{
                tag: 'span',
                cls: ['neo-docs-header-text']
            }]
        }
    }}

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        let me         = this,
            vdom      = me.vdom,
            className = me.record.className,
            store     = me.up('main-container').store,
            record    = store.find({$kind: className === 'Neo' ? 'module' : 'class', neoClassName: className})[0],
            i         = 0,
            len       = record && record.tags && record.tags.length || 0,
            singleton = false;

        for (; i < len; i++) {
            if (record.tags[i].title === 'singleton') {
                singleton = true;
                break;
            }
        }

        vdom.cn[0].innerHTML = singleton ? (className + ' → Singleton') : className;

        if (record.description) {
            vdom.cn.push({
                cls      : ['neo-docs-header-description'],
                innerHTML: record.description
            });
        }

        me.vdom = vdom;
    }
}

Neo.applyClassConfig(HeaderComponent);



/***/ }),

/***/ "./docs/app/view/classdetails/HierarchyTreeList.mjs":
/*!**********************************************************!*\
  !*** ./docs/app/view/classdetails/HierarchyTreeList.mjs ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HierarchyTreeList; });
/* harmony import */ var _node_modules_neo_mjs_src_tree_List_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/tree/List.mjs */ "./node_modules/neo.mjs/src/tree/List.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");



/**
 * @class Docs.app.view.classdetails.HierarchyTreeList
 * @extends Neo.tree.List
 */
class HierarchyTreeList extends _node_modules_neo_mjs_src_tree_List_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Docs.app.view.classdetails.HierarchyTreeList'
         * @protected
         */
        className: 'Docs.app.view.classdetails.HierarchyTreeList',
        /**
         * @member {String} ntype='classdetails-treelist'
         * @protected
         */
        ntype: 'classhierarchy-treelist',
        /**
         * @member {String[]} cls=['docs-classhierarchy-treelist', 'neo-list-container', 'neo-list']
         */
        cls: [
            'docs-classhierarchy-treelist',
            'neo-list-container',
            'neo-tree-list',
            'neo-list'
        ],
        /**
         * @member {Boolean} showCollapseExpandAllIcons=false
         */
        showCollapseExpandAllIcons: false,
        /**
         * @member {Object|null} structureData=null
         */
        structureData: null
    }}

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        let me = this;

        me.createStoreItems();
        me.createItems(null, me.getListItemsRoot(), 0);
    }

    /**
     *
     */
    createStoreItems() {
        let me            = this,
            className     = me.structureData.className,
            mainContainer = me.up('main-container'),
            mainStore     = mainContainer.store,
            storeItems    = [],
            tmpItems      = [],
            item, parentId;

        item = mainStore.find({
            $kind       : className === 'Neo' ? 'module' : 'class',
            neoClassName: me.structureData.className
        })[0];

        tmpItems.unshift(item);

        while (item && item.hasOwnProperty('augments')) {
            item = mainStore.find({
                $kind       : 'class',
                neoClassName: item.augments[0]
            })[0];

            tmpItems.unshift(item);
        }

        tmpItems.forEach((key, index) => {
            if (key) {
                parentId = tmpItems[index - 1] ? tmpItems[index - 1].id : null;

                storeItems.push({
                    checked : true,
                    id      : key.id,
                    isLeaf  : true,
                    name    : key.neoClassName,
                    parentId: parentId
                });
            }
        });

        me.store.items = storeItems;
    }

    /**
     *
     * @param {Object} record
     */
    onLeafItemClick(record) {
        let me       = this,
            vnodeId  = me.getItemId(record.id),
            vdom     = me.vdom,
            vdomNode = me.getVdomChild(vnodeId);

        _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"][record.checked ? 'add' : 'remove'](vdomNode.cls, 'unchecked');

        record.checked = !record.checked;

        me.vdom = vdom;

        me.fire('refreshClassMembers');
    }
}

Neo.applyClassConfig(HierarchyTreeList);



/***/ }),

/***/ "./docs/app/view/classdetails/MainContainer.mjs":
/*!******************************************************!*\
  !*** ./docs/app/view/classdetails/MainContainer.mjs ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MainContainer; });
/* harmony import */ var _node_modules_neo_mjs_src_container_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/container/Base.mjs */ "./node_modules/neo.mjs/src/container/Base.mjs");
/* harmony import */ var _HeaderComponent_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HeaderComponent.mjs */ "./docs/app/view/classdetails/HeaderComponent.mjs");
/* harmony import */ var _HierarchyTreeList_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HierarchyTreeList.mjs */ "./docs/app/view/classdetails/HierarchyTreeList.mjs");
/* harmony import */ var _MainContainerController_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MainContainerController.mjs */ "./docs/app/view/classdetails/MainContainerController.mjs");
/* harmony import */ var _MembersList_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MembersList.mjs */ "./docs/app/view/classdetails/MembersList.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_container_Panel_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/container/Panel.mjs */ "./node_modules/neo.mjs/src/container/Panel.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_form_field_Search_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/form/field/Search.mjs */ "./node_modules/neo.mjs/src/form/field/Search.mjs");








/**
 * @class Docs.app.view.classdetails.MainContainer
 * @extends Neo.container.Base
 */
class MainContainer extends _node_modules_neo_mjs_src_container_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Docs.app.view.classdetails.MainContainer'
         * @protected
         */
        className: 'Docs.app.view.classdetails.MainContainer',
        /**
         * @member {String} ntype='classdetails-maincontainer'
         * @protected
         */
        ntype: 'classdetails-maincontainer',
        /**
         * @member {String[]} cls=['neo-docs-classdetails-maincontainer', 'neo-container']
         */
        cls: ['neo-docs-classdetails-maincontainer', 'neo-container'],
        /**
         * @member {Neo.controller.Component} controller=MainContainerController
         */
        controller: _MainContainerController_mjs__WEBPACK_IMPORTED_MODULE_3__["default"],
        /**
         * @member {Object} layout={ntype: 'vbox', align: 'stretch'}
         */
        layout: {ntype: 'vbox', align: 'stretch'},
        /**
         * @member {Object|null} structureData=null
         */
        structureData: null,
        /**
         * @member {Array} items=[//...]]
         */
        items: [{
            ntype : 'container',
            _cls  : ['neo-docs-classdetails-headercontainer'],
            flex  : '0 1 auto',
            layout: {ntype: 'hbox', align: 'stretch'},

            items: [{
                module : _node_modules_neo_mjs_src_container_Panel_mjs__WEBPACK_IMPORTED_MODULE_5__["default"],
                cls    : ['neo-docs-classdetails-headerpanel', 'neo-panel', 'neo-container'],
                headers: [{
                    dock : 'bottom',
                    style: {borderWidth: 0},
                    items: [{
                        handler  : 'onScrollIntoView',
                        reference: 'showConfigs',
                        style    : {marginRight: '5px'},
                        text     : 'Configs'
                    }, {
                        handler  : 'onScrollIntoView',
                        reference: 'showMethods',
                        style    : {marginRight: '5px'},
                        text     : 'Methods'
                    }, {
                        handler  : 'onScrollIntoView',
                        reference: 'showEvents',
                        text     : 'Events'
                    }, {
                        ntype: 'component',
                        flex : 1
                    }, {
                        module         : _node_modules_neo_mjs_src_form_field_Search_mjs__WEBPACK_IMPORTED_MODULE_6__["default"],
                        listeners      : {change: 'onSearchFieldChange'},
                        placeholderText: 'Filter Members',
                        width          : 160,

                        style: {
                            margin     : 0,
                            marginRight: '5px',
                            paddingTop : '2px'
                        }
                    }, {
                        checked  : true,
                        handler  : 'onToggleMembers',
                        iconCls  : 'fa fa-check-square',
                        reference: 'showPrivateMembers',
                        style    : {marginRight: '5px'},
                        text     : 'Private',
                    }, {
                        checked  : true,
                        handler  : 'onToggleMembers',
                        iconCls  : 'fa fa-check-square',
                        reference: 'showProtectedMembers',
                        style    : {marginRight: '5px'},
                        text     : 'Protected',
                    }, {
                        checked  : true,
                        handler  : 'onToggleMembers',
                        iconCls  : 'fa fa-check-square',
                        reference: 'showStaticMembers',
                        text     : 'Static'
                    }]
                }],

                items: [{
                    module: _HeaderComponent_mjs__WEBPACK_IMPORTED_MODULE_1__["default"],
                    flex  : 1,
                    record: '@config:structureData'
                }]
            }, {
                module       : _HierarchyTreeList_mjs__WEBPACK_IMPORTED_MODULE_2__["default"],
                flex         : '0 0 auto',
                minWidth     : 330,
                structureData: '@config:structureData'
            }]
        }, {
            module   : _MembersList_mjs__WEBPACK_IMPORTED_MODULE_4__["default"],
            flex     : 1,
            listeners: {mutateItems: 'onMutateItems'},
            reference: 'classdetails-memberslist'
        }]
    }}
}

Neo.applyClassConfig(MainContainer);



/***/ }),

/***/ "./docs/app/view/classdetails/MainContainerController.mjs":
/*!****************************************************************!*\
  !*** ./docs/app/view/classdetails/MainContainerController.mjs ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MainContainerController; });
/* harmony import */ var _node_modules_neo_mjs_src_controller_Component_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/controller/Component.mjs */ "./node_modules/neo.mjs/src/controller/Component.mjs");
/* harmony import */ var _SourceViewComponent_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SourceViewComponent.mjs */ "./docs/app/view/classdetails/SourceViewComponent.mjs");



/**
 * @class Docs.app.view.MainContainerController
 * @extends Neo.controller.Component
 */
class MainContainerController extends _node_modules_neo_mjs_src_controller_Component_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Docs.app.view.classdetails.MainContainerController'
         * @protected
         */
        className: 'Docs.app.view.classdetails.MainContainerController',
        /**
         * @member {String} ntype='docs-classdetails-maincontainer-controller'
         * @protected
         */
        ntype: 'docs-classdetails-maincontainer-controller'
    }}

    /**
     *
     * @param {Object} data
     */
    onHeaderClick(data) {
        let me                  = this,
            record              = me.view.structureData,
            mainContainer       = me.view.up('main-container'),
            contentTabContainer = mainContainer.down('docs-content-tabcontainer'),
            className           = (record.path ? record.path + '.' : '') + record.name;

        contentTabContainer.add({
            module       : _SourceViewComponent_mjs__WEBPACK_IMPORTED_MODULE_1__["default"],
            id           : className + '__source',
            structureData: record,

            tabButtonConfig: {
                iconCls: 'fa fa-code',
                text   : className
            }
        });
    }

    /**
     *
     * @param {Neo.collection.Base} store
     */
    onMutateItems(store) {
        let me              = this,
            countConfigs    = 0,
            countEvents     = 0,
            countMethods    = 0,
            countPrivates   = 0,
            countProtecteds = 0,
            countStatics    = 0;

        store.items.forEach(item => {
            if (item.kind === 'function') {
                countMethods++;
            } else if (item.kind === 'member') {
                countConfigs++;
            } else {
                countEvents++;
            }

            if (item.access === 'private') {
                countPrivates++;
            } else if (item.access === 'protected') {
                countProtecteds++;
            }

            if (item.scope === 'static') {
                countStatics++;
            }
        });

        me.getReference('showConfigs')         .text = 'Configs '   + countConfigs;
        me.getReference('showMethods')         .text = 'Methods '   + countMethods;
        me.getReference('showEvents')          .text = 'Events '    + countEvents;
        me.getReference('showPrivateMembers')  .text = 'Private '   + countPrivates;
        me.getReference('showProtectedMembers').text = 'Protected ' + countProtecteds;
        me.getReference('showStaticMembers')   .text = 'Static '    + countStatics;
    }

    /**
     *
     * @param {Object} data
     */
    onScrollIntoView(data) {
        let me     = this,
            button = Neo.getComponent(data.target.id);

        Neo.main.addon.HighlightJS.scrollIntoView({
            text   : button.reference.substr(4),
            vnodeId: me.view.vdom.id
        });
    }

    /**
     *
     * @param {Object} data
     */
    onSearchFieldChange(data) {
        this.getReference('classdetails-memberslist').filterMembersQuery = data.value;
    }

    /**
     *
     * @param {Object} data
     */
    onToggleMembers(data) {
        let button      = Neo.getComponent(data.target.id),
            membersList = this.getReference('classdetails-memberslist');

        button.iconCls = button.checked ? 'fa fa-square' : 'fa fa-check-square';
        button.checked = !button.checked;

        membersList[button.reference] = button.checked;
    }
}

Neo.applyClassConfig(MainContainerController);



/***/ }),

/***/ "./docs/app/view/classdetails/MembersList.mjs":
/*!****************************************************!*\
  !*** ./docs/app/view/classdetails/MembersList.mjs ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MembersList; });
/* harmony import */ var _node_modules_neo_mjs_src_list_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/list/Base.mjs */ "./node_modules/neo.mjs/src/list/Base.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_collection_Base_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/collection/Base.mjs */ "./node_modules/neo.mjs/src/collection/Base.mjs");



/**
 * @class Docs.app.view.classdetails.MembersList
 * @extends Neo.list.Base
 */
class MembersList extends _node_modules_neo_mjs_src_list_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Docs.app.view.classdetails.MembersList'
         * @protected
         */
        className: 'Docs.app.view.classdetails.MembersList',
        /**
         * @member {String} ntype='classdetails-memberslist'
         * @protected
         */
        ntype: 'classdetails-memberslist',
        /**
         * @member {String[]} cls=['docs-classhierarchy-memberslist']
         */
        cls: ['docs-classhierarchy-memberslist'],
        /**
         * @member {String} filterMembersQuery_=''
         * @protected
         */
        filterMembersQuery_: '',
        /**
         * @member {Boolean} showPrivateMembers_=true
         */
        showPrivateMembers_: true,
        /**
         * @member {Boolean} showProtectedMembers_=true
         */
        showProtectedMembers_: true,
        /**
         * @member {Boolean} showStaticMembers_=true
         */
        showStaticMembers_: true,
        /**
         * @member {Neo.collection.Base} store=null
         */
        store: null,
        /**
         * @member {String|null} targetClassName=null
         */
        targetClassName: null,
        /**
         * @member {Object} _vdom={cn: []}
         */
        _vdom: {
            cn: []
        }
    }}

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        let me            = this,
            hierarchyView = me.up('classdetails-maincontainer').down('classhierarchy-treelist'),
            mainStore     = me.up('main-container').store;

        hierarchyView.on({
            refreshClassMembers: me.onRefreshClassMembers,
            scope              : me
        });

        me.store = Neo.create(_node_modules_neo_mjs_src_collection_Base_mjs__WEBPACK_IMPORTED_MODULE_1__["default"], {
            filterMode: 'advanced',
            sourceId  : mainStore.id
        });

        me.onRefreshClassMembers();
    }

    /**
     * Triggered after the filterMembersQuery config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetFilterMembersQuery(value, oldValue) {
        if (oldValue !== undefined) {
            this.onRefreshClassMembers();
        }
    }

    /**
     * Triggered after the showProtectedMembers config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetShowProtectedMembers(value, oldValue) {
        if (oldValue !== undefined) {
            this.onRefreshClassMembers();
        }
    }

    /**
     * Triggered after the showPrivateMembers config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetShowPrivateMembers(value, oldValue) {
        if (oldValue !== undefined) {
            this.onRefreshClassMembers();
        }
    }

    /**
     * Triggered after the showStaticMembers config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetShowStaticMembers(value, oldValue) {
        if (oldValue !== undefined) {
            this.onRefreshClassMembers();
        }
    }

    /**
     *
     * @param {Neo.collection.Base} store
     * @param {Object} vdom
     * @returns {Object} vdom
     */
    applyConfigsHeader(store, vdom) {
        if (store.items[0] && store.items[0].kind === 'member') {
            vdom.cn.push({
                // scrolling placeholder
            }, {
                cls      : ['neo-docs-memberlist-group-header'],
                innerHTML: 'Configs',
                'data-list-header': 'Configs'
            });
        }

        return vdom;
    }

    /**
     *
     * @param {Object} item
     * @param {Number} index
     * @param {Neo.collection.Base} store
     * @param {Object} vdom
     * @returns {Object} vdom
     */
    applyEventsHeader(item, index, store, vdom) {
        if (
            item.kind === 'event' &&
            store.items[index -1] &&
            store.items[index -1].kind !== 'event'
        ) {
            vdom.cn.push({
                // scrolling placeholder
            }, {
                cls      : ['neo-docs-memberlist-group-header'],
                innerHTML: 'Events',
                style    : {zIndex: 3},
                'data-list-header': 'Events'
            });
        }

        return vdom;
    }

    /**
     *
     * @param {Object} item
     * @param {Number} index
     * @param {Neo.collection.Base} store
     * @param {Object} vdom
     * @returns {Object} vdom
     */
    applyMethodsHeader(item, index, store, vdom) {
        if (
            item.kind === 'function' &&
            (
                !store.items[index -1] || (
                    store.items[index -1] &&
                    store.items[index -1].kind !== 'function'
                )
            )
        ) {
            vdom.cn.push({
                // scrolling placeholder
            }, {
                cls      : ['neo-docs-memberlist-group-header'],
                innerHTML: 'Methods',
                style    : {zIndex: 2},
                'data-list-header': 'Methods'
            });
        }

        return vdom;
    }

    /**
     *
     */
    createItems() {
        let me                 = this,
            filterMembersRegEx = new RegExp(me.filterMembersQuery || '', 'gi'),
            hasExamples        = false,
            targetClassName    = me.targetClassName,
            vdom               = me.vdom,
            headerText, itemAttributes, itemConfig, path;

        vdom.cn = [];
        vdom = me.applyConfigsHeader(me.store, vdom);

        me.store.items.forEach((item, index) => {
            vdom = me.applyEventsHeader( item, index, me.store, vdom);
            vdom = me.applyMethodsHeader(item, index, me.store, vdom);

            itemAttributes = [];

            if (item.name.substr(-1) === '_') {
                item.name = item.name.slice(0, -1) ;
                itemAttributes.push('GS');
            }

            if (item.neoClassName !== targetClassName) {
                itemAttributes.push('inherited');
            }

            if (item.access === 'private' || item.access === 'protected') {
                itemAttributes.push(item.access);
            }

            if (item.scope === 'static') {
                itemAttributes.push('static');
            }

            headerText = item.name;

            if (me.filterMembersQuery !== '' && me.filterMembersQuery !== null) {
                headerText = headerText.replace(filterMembersRegEx, match => `<span class="neo-highlight-search">${match}</span>`);
            }

            // configs
            if (item.type && item.type.names) {
                headerText += (': {' + MembersList.escapeHtml(item.type.names.join('|')) + '}');
            }

            if (item.hasOwnProperty('defaultvalue')) {
                headerText += (' = ' + item.defaultvalue);
            }

            // methods
            if (item.params && item.kind !== 'event') {
                headerText += ('(' + item.params.reduce((result, param) => {
                    if (param.name.indexOf('.') < 0) {
                        if (param.optional) {
                            result.push('[' + param.name + ']');
                        } else {
                            result.push(param.name);
                        }
                    }
                    return result;
                }, []).join(', ') + ')');
            }

            if (item.returns) {
                headerText += (' → {' + MembersList.escapeHtml(item.returns[0].type.names.join('|') + '}'));
            }

            path = item.meta.path;

            if (path.includes('/neo.mjs/')) {
                path = path.substr(path.indexOf('/neo.mjs/') + 9);
            } else if (path.includes('/neomjs/')) {
                path = path.substr(path.indexOf('/neomjs/')  + 8);
            } else if (path.includes('/neo/')) {
                path = path.substr(path.indexOf('/neo/')     + 5);
            }

            itemConfig = {
                cls: ['neo-list-item'],
                cn : [{
                    cls: ['neo-list-item-header-container'],
                    cn : [{
                        cls      : ['neo-list-item-header'],
                        innerHTML: headerText
                    }, {
                        style: {
                            flex: 1
                        }
                    }, {
                        cls      : ['neo-list-item-header'],
                        innerHTML: itemAttributes.join(', ')
                    }]
                }, {
                    cls: 'neo-docs-view-source-link-container',
                    cn :[{
                        tag      : 'a',
                        cls      : ['neo-docs-view-source-link'],
                        href     : '#viewSource=' + item.neoClassName + '&line=' + item.meta.lineno,
                        innerHTML: 'Source: ' + path + '/' + item.meta.filename + ' (Line ' + item.meta.lineno + ')'
                    }]
                }, {
                    innerHTML: item.description
                }]
            };

            if (item.examples && item.examples.length > 0) {
                hasExamples = true;

                item.examples.forEach(example => {
                    itemConfig.cn.push({
                        tag: 'pre',
                        cn : [{
                            tag : 'code',
                            html: example
                        }]
                    });
                });
            }

            if (item.params && item.params.length > 0) {
                itemConfig.cn.push(MembersList.createParametersTable(item.params));
            }

            if (item.returns && item.kind !== 'event') {
                itemConfig.cn.push({
                    innerHTML: 'Returns {' + MembersList.escapeHtml(item.returns[0].type.names.join('|') + '} ') + (item.returns[0].description || '')
                });
            }

            vdom.cn.push(itemConfig);
        });

        me.vdom = vdom;

        if (hasExamples) {
            setTimeout(() => {
                Neo.main.addon.HighlightJS.syntaxHighlightInit();
            }, 100);
        }
    }

    /**
     *
     * @param {Object} params
     * @returns {Object} vdom
     */
    static createParametersTable(params) {
        let hasDefaultValues  = false,
            hasOptionalParams = false,
            description, nestedParams, paramTable;

        params.forEach(param => {
            if (param.hasOwnProperty('defaultvalue')) {
                hasDefaultValues = true;
            }

            if (param.hasOwnProperty('optional')) {
                hasOptionalParams = true;
            }
        });

        paramTable = {
            tag: 'table',
            cls: 'docs-param-table',
            cn : [{
                tag: 'thead',
                cn : [{
                    tag      : 'th',
                    innerHTML: 'Name'
                }, {
                    tag      : 'th',
                    innerHTML: 'Type'
                }, {
                    tag      : 'th',
                    innerHTML: 'Description'
                }]
            }]
        };

        if (hasDefaultValues) {
            paramTable.cn[0].cn.splice(2, 0, {
                tag      : 'th',
                innerHTML: 'Default'
            });
        }

        if (hasOptionalParams) {
            paramTable.cn[0].cn.splice(2, 0, {
                tag      : 'th',
                innerHTML: 'Optional'
            });
        }

        params.forEach(param => {
            if (param.name.indexOf('.') < 0) { // ignore nested params
                description = {
                    tag      : 'td',
                    innerHTML: param.description
                };
                nestedParams = [];

                params.forEach(p => {
                    if (p.name.indexOf(param.name + '.') === 0) {
                        p = Neo.clone(p, true);

                        p.name = p.name.split('.');
                        p.name.shift();
                        p.name = p.name.join('.');

                        nestedParams.push(p);
                    }
                });

                if (nestedParams.length > 0) {
                    description = {
                        tag: 'td',
                        cn : [{
                            innerHTML: description.innerHTML
                        },
                        MembersList.createParametersTable(nestedParams)]
                    }
                }

                paramTable.cn.push({
                    tag: 'tr',
                    cn : [{
                        tag      : 'td',
                        innerHTML: param.name
                    }, {
                        tag      : 'td',
                        innerHTML: param.type ? MembersList.escapeHtml(param.type.names.join(' | ')) : ''
                    },
                    description]
                });

                if (hasDefaultValues) {
                    paramTable.cn[paramTable.cn.length - 1].cn.splice(2, 0, {
                        tag      : 'td',
                        innerHTML: param.defaultvalue === undefined ? '' : (param.defaultvalue + '')
                    });
                }

                if (hasOptionalParams) {
                    paramTable.cn[paramTable.cn.length - 1].cn.splice(2, 0, {
                        tag      : 'td',
                        innerHTML: param.optional
                    });
                }
            }
        });

        return paramTable;
    }

    /**
     * Replaces '<' & '>'
     * @param {String} value
     * @returns {String}
     */
    static escapeHtml(value) {
        return value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    /**
     *
     */
    filterAndSortItems() {
        let me             = this,
            hierarchyMap   = {},
            hierarchyStore = me.up('classdetails-maincontainer').down('classhierarchy-treelist').store,
            hierarchyItems = hierarchyStore.items,
            i              = 0,
            tmpItems       = [],
            filters, tmpItemsLen;

        hierarchyItems.forEach(cls => {
            if (cls.checked === true) {
                tmpItems.push(cls.name);
            }
        });

        tmpItemsLen = tmpItems.length;

        for (; i < tmpItemsLen; i++) {
            hierarchyMap[tmpItems[i]] = i;
        }

        me.targetClassName = hierarchyItems[hierarchyItems.length -1].name;

        filters = [{
            operator: 'included',
            property: 'neoClassName',
            value   : tmpItems
        }, {
            operator: '!==',
            property: 'kind',
            value   : 'class'
        }, {
            operator: '!==',
            property: 'kind',
            value   : 'constant' // todo?
        }, {
            operator: '!==',
            property: 'kind',
            value   : 'module'
        }, {
            operator: 'isUndefined',
            property: 'inherited'
        }];

        if (!me.showPrivateMembers) {
            filters.push({
                operator: '!==',
                property: 'access',
                value   : 'private'
            });
        }

        if (!me.showProtectedMembers) {
            filters.push({
                operator: '!==',
                property: 'access',
                value   : 'protected'
            });
        }

        if (!me.showStaticMembers) {
            filters.push({
                operator: '!==',
                property: 'scope',
                value   : 'static'
            });
        }

        if (me.filterMembersQuery !== '' && me.filterMembersQuery !== null) {
            filters.push({
                operator: 'like',
                property: 'name',
                value   : me.filterMembersQuery
            });
        }

        filters.push({
            scope   : me,
            filterBy: function(item, filteredItems, allItems) {
                let me              = this,
                    targetClassName = me.targetClassName,
                    filteredItem, i, len;

                // always exclude inherited className & ntype configs
                if (item.name === 'ntype' && item.neoClassName !== targetClassName
                ) {
                    return true;
                }

                if (item.neoClassName !== targetClassName) {
                    i   = 0;
                    len = filteredItems.length;

                    for (; i < len; i++) {
                        filteredItem = filteredItems[i];

                        if (item.id !== filteredItem.id) {
                            if (
                                item.name  === filteredItem.name  &&
                                item.scope === filteredItem.scope && // static VS instance members
                                hierarchyMap[item.neoClassName] < hierarchyMap[filteredItem.neoClassName]
                            ) {
                                return true;
                            }
                        }
                    }
                }

                return false;
            }
        });

        me.store.filters = filters;

        me.store.sorters = [{
            // Configs => Methods => Events
            sortBy: function(a, b) {
                a = a.kind === 'member' ? 0 : a.kind === 'function' ? 1 : 2;
                b = b.kind === 'member' ? 0 : b.kind === 'function' ? 1 : 2;

                return a > b ? 1 : a < b ? -1 : 0;
            }
        }, {
            direction: 'ASC',
            property : 'name'
        }];

        me.fire('mutateItems', me.store);
    }

    /**
     * Override to not call createItems() at this point => onRefreshClassMembers()
     */
    onStoreFilter() {}

    /**
     *
     */
    onRefreshClassMembers() {
        this.filterAndSortItems();
        this.createItems();
    }
}

Neo.applyClassConfig(MembersList);



/***/ }),

/***/ "./docs/app/view/classdetails/SourceViewComponent.mjs":
/*!************************************************************!*\
  !*** ./docs/app/view/classdetails/SourceViewComponent.mjs ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SourceViewComponent; });
/* harmony import */ var _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");


/**
 * @class Docs.app.view.classdetails.SourceViewComponent
 * @extends Neo.component.Base
 */
class SourceViewComponent extends _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Docs.app.view.classdetails.SourceViewComponent'
         * @protected
         */
        className: 'Docs.app.view.classdetails.SourceViewComponent',
        /**
         * @member {String} ntype='classdetails-sourceviewcomponent'
         * @protected
         */
        ntype: 'classdetails-sourceviewcomponent',
        /**
         * @member {Boolean} isHighlighted_=false
         * @protected
         */
        isHighlighted_: false,
        /**
         * @member {Number|null} line_=null
         * @protected
         */
        line_: null,
        /**
         * @member {Number|null} previousLine=null
         * @protected
         */
        previousLine: null,
        /**
         * @member {Object|null} structureData=null
         * @protected
         */
        structureData: null,
        /**
         * @member {Object} style= {overflow: 'auto'}
         */
        style: {
            overflow: 'auto'
        },
        /**
         * @member {Object} _vdom={cn: [//...]}
         */
        _vdom: {
            cn: [{
                tag: 'pre',
                cn : [{
                    tag  : 'code',
                    class: 'javascript'
                }]
            }]
        }
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me   = this,
            url  = '../../' + me.structureData.srcPath;

        Neo.Xhr.promiseRequest({
            url: url
        }).then(data => {
            setTimeout(() => { // ensure we are not mounting
                me.applySourceCode(data.response);
            }, 100);
        });
    }

    /**
     * Triggered after the isHighlighted config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetIsHighlighted(value, oldValue) {
        if (value) {
            let me = this;

            setTimeout(() => {
                Neo.main.addon.HighlightJS.syntaxHighlightLine({
                    addLine   : me.line,
                    removeLine: me.previousLine,
                    vnodeId   : me.vdom.cn[0].id
                });
            }, 50);
        }
    }

    /**
     * Triggered after the line config got changed
     * @param {Number} value
     * @param {Number} oldValue
     * @protected
     */
    afterSetLine(value, oldValue) {
        let me = this;

        if (oldValue) {
            me.previousLine = oldValue;
        }

        if (me.isHighlighted) {
            me.afterSetIsHighlighted(true, false);
        }
    }

    /**
     *
     * @param {Object} data
     */
    applySourceCode(data) {
        let me   = this,
            vdom = me.vdom,
            node = vdom.cn[0]; // pre tag

        node.cn[0].innerHTML = data; // code tag
        me.vdom = vdom;

        setTimeout(() => {
            me.syntaxHighlight(node.id);
        }, 50);
    }

    /**
     *
     * @param {String} vnodeId
     */
    syntaxHighlight(vnodeId) {
        let me = this,
            id;

        if (me.vnode) {
            Neo.main.addon.HighlightJS.syntaxHighlight({
                vnodeId: me.vdom.cn[0].id
            }).then(() => {
                me.isHighlighted = true;
            });
        } else {
            id = me.on('mounted', () => {
                setTimeout(() => {
                    me.un('mounted', id);
                    me.syntaxHighlight(vnodeId);
                }, 50);
            });
        }
    }
}

Neo.applyClassConfig(SourceViewComponent);



/***/ }),

/***/ "./docs/app/view/classdetails/TutorialComponent.mjs":
/*!**********************************************************!*\
  !*** ./docs/app/view/classdetails/TutorialComponent.mjs ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TutorialComponent; });
/* harmony import */ var _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");


/**
 * @class Docs.app.view.classdetails.TutorialComponent
 * @extends Neo.component.Base
 */
class TutorialComponent extends _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Docs.app.view.classdetails.TutorialComponent'
         * @protected
         */
        className: 'Docs.app.view.classdetails.TutorialComponent',
        /**
         * @member {String} ntype='classdetails-tutorialcomponent'
         * @protected
         */
        ntype: 'classdetails-tutorialcomponent',
        /**
         * @member {String[]} cls=['neo-classdetails-tutorialcomponent']
         */
        cls: ['neo-classdetails-tutorialcomponent'],
        /**
         * @member {String|null} fileName=null
         */
        fileName: null,
        /**
         * @member {String|null} fileType=null
         */
        fileType: null,
        /**
         * @member {Object} style={overflow: 'auto'}
         */
        style: {
            overflow: 'auto'
        }
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me     = this,
            isJson = me.fileType === 'json',
            url    = '../../docs/tutorials/' + me.fileName;

        Neo.Xhr[isJson ? 'promiseJson' : 'promiseRequest']({
            url: url
        }).then(data => {
            setTimeout(() => { // ensure we are not mounting
                me.applySourceCode(isJson ? data.json : data.response);
            }, 100);
        });
    }

    /**
     *
     * @param {Object} data
     */
    applySourceCode(data) {
        let me   = this,
            vdom = me.vdom;

        if (me.fileType === 'json') {
            vdom.cn = data;
        } else {
            vdom.innerHTML = data;
        }

        me.vdom = vdom;

        setTimeout(() => {
            TutorialComponent.syntaxHighlight();
        }, 50);
    }

    /**
     *
     */
    static syntaxHighlight() {
        Neo.main.addon.HighlightJS.syntaxHighlightInit();
    }
}

Neo.applyClassConfig(TutorialComponent);



/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kb2NzL2FwcC5tanMiLCJ3ZWJwYWNrOi8vLy4vZG9jcy9hcHAvbW9kZWwvQXBpLm1qcyIsIndlYnBhY2s6Ly8vLi9kb2NzL2FwcC9tb2RlbC9FeGFtcGxlLm1qcyIsIndlYnBhY2s6Ly8vLi9kb2NzL2FwcC9tb2RlbC9UdXRvcmlhbC5tanMiLCJ3ZWJwYWNrOi8vLy4vZG9jcy9hcHAvc3RvcmUvQXBpLm1qcyIsIndlYnBhY2s6Ly8vLi9kb2NzL2FwcC9zdG9yZS9FeGFtcGxlcy5tanMiLCJ3ZWJwYWNrOi8vLy4vZG9jcy9hcHAvc3RvcmUvVHV0b3JpYWxzLm1qcyIsIndlYnBhY2s6Ly8vLi9kb2NzL2FwcC92aWV3L0FwaVRyZWVMaXN0Lm1qcyIsIndlYnBhY2s6Ly8vLi9kb2NzL2FwcC92aWV3L0NvbnRlbnRUYWJDb250YWluZXIubWpzIiwid2VicGFjazovLy8uL2RvY3MvYXBwL3ZpZXcvRXhhbXBsZXNUcmVlTGlzdC5tanMiLCJ3ZWJwYWNrOi8vLy4vZG9jcy9hcHAvdmlldy9IZWFkZXJDb250YWluZXIubWpzIiwid2VicGFjazovLy8uL2RvY3MvYXBwL3ZpZXcvTWFpbkNvbnRhaW5lci5tanMiLCJ3ZWJwYWNrOi8vLy4vZG9jcy9hcHAvdmlldy9NYWluQ29udGFpbmVyQ29udHJvbGxlci5tanMiLCJ3ZWJwYWNrOi8vLy4vZG9jcy9hcHAvdmlldy9UdXRvcmlhbHNUcmVlTGlzdC5tanMiLCJ3ZWJwYWNrOi8vLy4vZG9jcy9hcHAvdmlldy9jbGFzc2RldGFpbHMvSGVhZGVyQ29tcG9uZW50Lm1qcyIsIndlYnBhY2s6Ly8vLi9kb2NzL2FwcC92aWV3L2NsYXNzZGV0YWlscy9IaWVyYXJjaHlUcmVlTGlzdC5tanMiLCJ3ZWJwYWNrOi8vLy4vZG9jcy9hcHAvdmlldy9jbGFzc2RldGFpbHMvTWFpbkNvbnRhaW5lci5tanMiLCJ3ZWJwYWNrOi8vLy4vZG9jcy9hcHAvdmlldy9jbGFzc2RldGFpbHMvTWFpbkNvbnRhaW5lckNvbnRyb2xsZXIubWpzIiwid2VicGFjazovLy8uL2RvY3MvYXBwL3ZpZXcvY2xhc3NkZXRhaWxzL01lbWJlcnNMaXN0Lm1qcyIsIndlYnBhY2s6Ly8vLi9kb2NzL2FwcC92aWV3L2NsYXNzZGV0YWlscy9Tb3VyY2VWaWV3Q29tcG9uZW50Lm1qcyIsIndlYnBhY2s6Ly8vLi9kb2NzL2FwcC92aWV3L2NsYXNzZGV0YWlscy9UdXRvcmlhbENvbXBvbmVudC5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUF5RDs7QUFFekQ7QUFDQTtBQUNBLGNBQWMsbUVBQWE7QUFDM0I7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7OztBQ05EO0FBQUE7QUFBQTtBQUFxRTs7QUFFckU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsZ0ZBQUs7QUFDdkIsd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUMvQ0E7QUFBQTtBQUFBO0FBQXNFOztBQUV0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixnRkFBSztBQUMzQix3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUFBO0FBQUE7QUFBc0U7O0FBRXRFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGdGQUFLO0FBQzVCLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDdENBO0FBQUE7QUFBQTtBQUFBO0FBQXdDO0FBQ2dDOztBQUV4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixnRkFBSztBQUN2Qix3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixlQUFlO0FBQ25DO0FBQ0EsZUFBZSxzREFBUTtBQUN2QjtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQ3pCQTtBQUFBO0FBQUE7QUFBQTtBQUEyQztBQUM0Qjs7QUFFdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsZ0ZBQUs7QUFDNUIsd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZUFBZTtBQUNuQztBQUNBLGVBQWUsMERBQU87QUFDdEI7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUN6QkE7QUFBQTtBQUFBO0FBQUE7QUFBd0U7QUFDM0I7O0FBRTdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdGQUFLO0FBQzdCLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGVBQWU7QUFDbkM7QUFDQSxlQUFlLDJEQUFRO0FBQ3ZCO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDekJBO0FBQUE7QUFBQTtBQUFBO0FBQXVFO0FBQy9COztBQUV4QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiwrRUFBUTtBQUNsQyx3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG9CQUFvQjtBQUN4QztBQUNBO0FBQ0EsZUFBZSxzREFBUTtBQUN2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDaERBO0FBQUE7QUFBQTtBQUFBO0FBQStFO0FBQ0k7O0FBRW5GO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLG1GQUFTO0FBQzNDLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTywyQkFBMkI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxvQkFBb0IsT0FBTyx3QkFBd0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxvQkFBb0IsTUFBTTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixnQkFBZ0I7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qix1RkFBWTtBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQSxnQkFBZ0I7QUFDaEI7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUM5R0E7QUFBQTtBQUFBO0FBQUE7QUFBa0Q7QUFDMEI7O0FBRTVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLCtFQUFRO0FBQ3ZDLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG9CQUFvQjtBQUN4QztBQUNBO0FBQ0EsZUFBZSwyREFBYTtBQUM1Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDekRBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0U7QUFDSDtBQUNNOztBQUVsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixvRkFBUztBQUN2Qyx3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU8sU0FBUztBQUNwQztBQUNBLGlCQUFpQixnQ0FBZ0M7QUFDakQ7QUFDQSxvQkFBb0IsTUFBTTtBQUMxQjtBQUNBO0FBQ0EsNkJBQTZCLHVGQUFXO0FBQ3hDLDhCQUE4Qix3Q0FBd0M7QUFDdEU7QUFDQSw4QkFBOEIsZ0JBQWdCO0FBQzlDO0FBQ0EsU0FBUztBQUNULDBCQUEwQixpRkFBTTtBQUNoQywyQkFBMkIsa0NBQWtDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixpQkFBaUI7QUFDNUM7QUFDQSxTQUFTO0FBQ1QsMEJBQTBCLGlGQUFNO0FBQ2hDLDJCQUEyQiw0Q0FBNEM7QUFDdkU7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHFDQUFxQztBQUNoRTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDckVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXdEO0FBQ2U7QUFDcUI7QUFDNUI7QUFDSDtBQUNEO0FBQ1E7QUFDUztBQUNGO0FBQ2I7QUFDaUM7O0FBRS9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHlGQUFRO0FBQ3BDLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IseUJBQXlCO0FBQzdDO0FBQ0Esb0JBQW9CLG9FQUF1QjtBQUMzQztBQUNBLG9CQUFvQixPQUFPLFNBQVM7QUFDcEM7QUFDQSxpQkFBaUIsZ0NBQWdDO0FBQ2pEO0FBQ0Esb0JBQW9CLHlCQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsTUFBTTtBQUMxQjtBQUNBLGdCQUFnQiw0REFBZTtBQUMvQjtBQUNBO0FBQ0EscUJBQXFCLGdDQUFnQzs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0JBQStCLHdEQUFXO0FBQzFDLGdDQUFnQyxvQ0FBb0M7QUFDcEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsK0JBQStCLDhEQUFpQjtBQUNoRCxnQ0FBZ0MseUNBQXlDO0FBQ3pFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLCtCQUErQiw2REFBZ0I7QUFDL0MsZ0NBQWdDLHlDQUF5QztBQUN6RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2IsMkJBQTJCLGdFQUFtQjtBQUM5QztBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGtDQUFrQyxxRkFBVTtBQUM1QztBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDdElBO0FBQUE7QUFBQTtBQUFBO0FBQW1GO0FBQ1Y7O0FBRXpFO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLDBGQUFTO0FBQy9DLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxnQkFBZ0I7QUFDdEQ7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixnRkFBUTtBQUM1QjtBQUNBLGFBQWE7O0FBRWIsWUFBWSxnRkFBUTtBQUNwQjs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUM3T0E7QUFBQTtBQUFBO0FBQUE7QUFBNkU7QUFDekI7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLCtFQUFRO0FBQ3hDLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG9CQUFvQjtBQUN4QztBQUNBO0FBQ0EsZUFBZSw0REFBYztBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDekRBO0FBQUE7QUFBQTtBQUFBO0FBQTBGO0FBQzlCOztBQUU1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixvRkFBUztBQUN2Qyx3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MseUVBQXlFO0FBQzdHO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQTBFO0FBQ0M7O0FBRTNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLCtFQUFRO0FBQ3hDLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsZ0ZBQVE7O0FBRWhCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUNuSEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQThGO0FBQ2xDO0FBQ0U7QUFDTTtBQUNaO0FBQ3VDO0FBQ0U7O0FBRWpHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLG9GQUFTO0FBQ3JDLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IseUJBQXlCO0FBQzdDO0FBQ0Esb0JBQW9CLG9FQUF1QjtBQUMzQztBQUNBLG9CQUFvQixPQUFPLFNBQVM7QUFDcEM7QUFDQSxpQkFBaUIsZ0NBQWdDO0FBQ2pEO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE1BQU07QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixnQ0FBZ0M7O0FBRXJEO0FBQ0EseUJBQXlCLHFGQUFLO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixlQUFlO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxtQkFBbUI7QUFDdkQ7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLG9DQUFvQyxtQkFBbUI7QUFDdkQ7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIseUNBQXlDLHVGQUFXO0FBQ3BELDBDQUEwQyw4QkFBOEI7QUFDeEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLG1CQUFtQjtBQUN2RDtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxtQkFBbUI7QUFDdkQ7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7O0FBRWpCO0FBQ0EsNEJBQTRCLDREQUFlO0FBQzNDO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiLCtCQUErQiw4REFBaUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCx1QkFBdUIsd0RBQVc7QUFDbEM7QUFDQSx3QkFBd0IsNkJBQTZCO0FBQ3JEO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDOUhBO0FBQUE7QUFBQTtBQUFBO0FBQWdHO0FBQ3BDOztBQUU1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQywwRkFBUztBQUMvQyx3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkIsZ0VBQW1CO0FBQzlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLGVBQWUsb0JBQW9CO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDMUhBO0FBQUE7QUFBQTtBQUFBO0FBQTRFO0FBQ007O0FBRWxGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLCtFQUFJO0FBQzlCLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixvQkFBb0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU8sUUFBUTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQsOEJBQThCLHFGQUFVO0FBQ3hDO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsb0JBQW9CO0FBQ25DLGVBQWUsT0FBTztBQUN0QixpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsb0JBQW9CO0FBQ25DLGVBQWUsT0FBTztBQUN0QixpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLDRCQUE0QixVQUFVO0FBQ3RDO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxvQkFBb0I7QUFDbkMsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTtBQUN0QztBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsbUhBQW1ILE1BQU07QUFDekg7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQywwREFBMEQ7QUFDN0Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBLG9DQUFvQyxvRUFBb0U7QUFDeEc7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5Q0FBeUMsb0VBQW9FO0FBQzdHLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBLHdDQUF3QyxzQkFBc0I7QUFDOUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQSxjQUFjLGlCQUFpQjtBQUMvQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDBCQUEwQixTQUFTO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUMxbUJBO0FBQUE7QUFBQTtBQUFnRjs7QUFFaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0Msb0ZBQVM7QUFDM0Msd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU8sU0FBUztBQUNwQztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxvQkFBb0IsT0FBTyxRQUFRO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVCw4QkFBOEI7QUFDOUI7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qjs7QUFFOUIsb0NBQW9DO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDN0pBO0FBQUE7QUFBQTtBQUFnRjs7QUFFaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msb0ZBQVM7QUFDekMsd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPLFFBQVE7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVCw4QkFBOEI7QUFDOUI7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiY2h1bmtzL2RvY3MtYXBwLW1qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYWluQ29udGFpbmVyIGZyb20gJy4vYXBwL3ZpZXcvTWFpbkNvbnRhaW5lci5tanMnO1xuXG5jb25zdCBvblN0YXJ0ID0gKCkgPT4gTmVvLmFwcCh7XG4gICAgYXBwUGF0aCA6ICdkb2NzLycsXG4gICAgbWFpblZpZXc6IE1haW5Db250YWluZXIsXG4gICAgbmFtZSAgICA6ICdEb2NzJ1xufSk7XG5cbmV4cG9ydCB7b25TdGFydCBhcyBvblN0YXJ0fTsiLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2RhdGEvTW9kZWwubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgRG9jcy5hcHAubW9kZWwuQXBpXG4gKiBAZXh0ZW5kcyBOZW8uZGF0YS5Nb2RlbFxuICovXG5jbGFzcyBBcGkgZXh0ZW5kcyBNb2RlbCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J0RvY3MuYXBwLm1vZGVsLkFwaSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnRG9jcy5hcHAubW9kZWwuQXBpJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdFtdfSBmaWVsZHNcbiAgICAgICAgICovXG4gICAgICAgIGZpZWxkczogW3tcbiAgICAgICAgICAgIG5hbWU6ICdjbGFzc05hbWUnLFxuICAgICAgICAgICAgdHlwZTogJ1N0cmluZydcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2NvbGxhcHNlZCcsXG4gICAgICAgICAgICB0eXBlOiAnQm9vbGVhbidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2lkJyxcbiAgICAgICAgICAgIHR5cGU6ICdJbnRlZ2VyJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnaXNMZWFmJyxcbiAgICAgICAgICAgIHR5cGU6ICdCb29sZWFuJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnbmFtZScsXG4gICAgICAgICAgICB0eXBlOiAnU3RyaW5nJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAncGFyZW50SWQnLFxuICAgICAgICAgICAgdHlwZTogJ0ludGVnZXInXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdwYXRoJyxcbiAgICAgICAgICAgIHR5cGU6ICdTdHJpbmcnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdzaW5nbGV0b24nLFxuICAgICAgICAgICAgdHlwZTogJ0Jvb2xlYW4nXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdzcmNQYXRoJyxcbiAgICAgICAgICAgIHR5cGU6ICdTdHJpbmcnXG4gICAgICAgIH1dXG4gICAgfX1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoQXBpKTtcblxuZXhwb3J0IHtBcGkgYXMgZGVmYXVsdH07IiwiaW1wb3J0IE1vZGVsICBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZGF0YS9Nb2RlbC5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBEb2NzLmFwcC5tb2RlbC5FeGFtcGxlXG4gKiBAZXh0ZW5kcyBOZW8uZGF0YS5Nb2RlbFxuICovXG5jbGFzcyBFeGFtcGxlIGV4dGVuZHMgTW9kZWwge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdEb2NzLmFwcC5tb2RlbC5FeGFtcGxlJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdEb2NzLmFwcC5tb2RlbC5FeGFtcGxlJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdFtdfSBmaWVsZHNcbiAgICAgICAgICovXG4gICAgICAgIGZpZWxkczogW3tcbiAgICAgICAgICAgIG5hbWU6ICdjb2xsYXBzZWQnLCAvLyBvcHRpb25hbCwgb25seSBuZWVkZWQgZm9yIGNvbGxhcHNlZCBub24gbGVhZiBpdGVtc1xuICAgICAgICAgICAgdHlwZTogJ0Jvb2xlYW4nXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdpZCcsXG4gICAgICAgICAgICB0eXBlOiAnSW50ZWdlcidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2lzTGVhZicsXG4gICAgICAgICAgICB0eXBlOiAnQm9vbGVhbidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ25hbWUnLFxuICAgICAgICAgICAgdHlwZTogJ1N0cmluZydcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ3BhcmVudElkJyxcbiAgICAgICAgICAgIHR5cGU6ICdJbnRlZ2VyJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAncGF0aCcsXG4gICAgICAgICAgICB0eXBlOiAnU3RyaW5nJ1xuICAgICAgICB9XVxuICAgIH19XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKEV4YW1wbGUpO1xuXG5leHBvcnQge0V4YW1wbGUgYXMgZGVmYXVsdH07IiwiaW1wb3J0IE1vZGVsICBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZGF0YS9Nb2RlbC5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBEb2NzLmFwcC5tb2RlbC5UdXRvcmlhbFxuICogQGV4dGVuZHMgTmVvLmRhdGEuTW9kZWxcbiAqL1xuY2xhc3MgVHV0b3JpYWwgZXh0ZW5kcyBNb2RlbCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J0RvY3MuYXBwLm1vZGVsLlR1dG9yaWFsJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdEb2NzLmFwcC5tb2RlbC5FeGFtcGxlJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdFtdfSBmaWVsZHNcbiAgICAgICAgICovXG4gICAgICAgIGZpZWxkczogW3tcbiAgICAgICAgICAgIG5hbWU6ICdmaWxlTmFtZScsXG4gICAgICAgICAgICB0eXBlOiAnU3RyaW5nJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnaWQnLFxuICAgICAgICAgICAgdHlwZTogJ0ludGVnZXInXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdpc0xlYWYnLFxuICAgICAgICAgICAgdHlwZTogJ0Jvb2xlYW4nXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICduYW1lJyxcbiAgICAgICAgICAgIHR5cGU6ICdTdHJpbmcnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdwYXJlbnRJZCcsXG4gICAgICAgICAgICB0eXBlOiAnSW50ZWdlcidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ3R5cGUnLFxuICAgICAgICAgICAgdHlwZTogJ1N0cmluZydcbiAgICAgICAgfV1cbiAgICB9fVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhUdXRvcmlhbCk7XG5cbmV4cG9ydCB7VHV0b3JpYWwgYXMgZGVmYXVsdH07IiwiaW1wb3J0IEFwaU1vZGVsIGZyb20gJy4uL21vZGVsL0FwaS5tanMnO1xuaW1wb3J0IFN0b3JlICAgIGZyb20gJy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9kYXRhL1N0b3JlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIERvY3MuYXBwLnN0b3JlLkFwaVxuICogQGV4dGVuZHMgTmVvLmRhdGEuU3RvcmVcbiAqL1xuY2xhc3MgQXBpIGV4dGVuZHMgU3RvcmUge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdEb2NzLmFwcC5zdG9yZS5BcGknXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ0RvY3MuYXBwLnN0b3JlLkFwaScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGtleVByb3BlcnR5PSdpZCdcbiAgICAgICAgICovXG4gICAgICAgIGtleVByb3BlcnR5OiAnaWQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TmVvLmRhdGEuTW9kZWx9IG1vZGVsPUFwaU1vZGVsXG4gICAgICAgICAqL1xuICAgICAgICBtb2RlbDogQXBpTW9kZWxcbiAgICB9fVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhBcGkpO1xuXG5leHBvcnQge0FwaSBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgRXhhbXBsZSBmcm9tICcuLi9tb2RlbC9FeGFtcGxlLm1qcyc7XG5pbXBvcnQgU3RvcmUgICBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZGF0YS9TdG9yZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBEb2NzLmFwcC5zdG9yZS5FeGFtcGxlc1xuICogQGV4dGVuZHMgTmVvLmRhdGEuU3RvcmVcbiAqL1xuY2xhc3MgRXhhbXBsZXMgZXh0ZW5kcyBTdG9yZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J0RvY3MuYXBwLnN0b3JlLkV4YW1wbGVzJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdEb2NzLmFwcC5zdG9yZS5FeGFtcGxlcycsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGtleVByb3BlcnR5PSdpZCdcbiAgICAgICAgICovXG4gICAgICAgIGtleVByb3BlcnR5OiAnaWQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TmVvLmRhdGEuTW9kZWx9IG1vZGVsPUV4YW1wbGVcbiAgICAgICAgICovXG4gICAgICAgIG1vZGVsOiBFeGFtcGxlXG4gICAgfX1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoRXhhbXBsZXMpO1xuXG5leHBvcnQge0V4YW1wbGVzIGFzIGRlZmF1bHR9OyIsImltcG9ydCBTdG9yZSAgICBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZGF0YS9TdG9yZS5tanMnO1xuaW1wb3J0IFR1dG9yaWFsIGZyb20gJy4uL21vZGVsL1R1dG9yaWFsLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIERvY3MuYXBwLnN0b3JlLlR1dG9yaWFsc1xuICogQGV4dGVuZHMgTmVvLmRhdGEuU3RvcmVcbiAqL1xuY2xhc3MgVHV0b3JpYWxzIGV4dGVuZHMgU3RvcmUge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdEb2NzLmFwcC5zdG9yZS5UdXRvcmlhbHMnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ0RvY3MuYXBwLnN0b3JlLlR1dG9yaWFscycsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGtleVByb3BlcnR5PSdpZCdcbiAgICAgICAgICovXG4gICAgICAgIGtleVByb3BlcnR5OiAnaWQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TmVvLmRhdGEuTW9kZWx9IG1vZGVsPVR1dG9yaWFsXG4gICAgICAgICAqL1xuICAgICAgICBtb2RlbDogVHV0b3JpYWxcbiAgICB9fVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhUdXRvcmlhbHMpO1xuXG5leHBvcnQge1R1dG9yaWFscyBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgVHJlZUxpc3QgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL3RyZWUvTGlzdC5tanMnO1xuaW1wb3J0IEFwaVN0b3JlIGZyb20gJy4uL3N0b3JlL0FwaS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBEb2NzLmFwcC52aWV3LkFwaVRyZWVMaXN0XG4gKiBAZXh0ZW5kcyBOZW8udHJlZS5MaXN0XG4gKi9cbmNsYXNzIEFwaVRyZWVMaXN0IGV4dGVuZHMgVHJlZUxpc3Qge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdEb2NzLmFwcC52aWV3LkFwaVRyZWVMaXN0J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdEb2NzLmFwcC52aWV3LkFwaVRyZWVMaXN0JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J2FwaS10cmVlbGlzdCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICdhcGktdHJlZWxpc3QnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TmVvLmRhdGEuU3RvcmV8bnVsbH0gc3RvcmU9QXBpU3RvcmVcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc3RvcmU6IEFwaVN0b3JlXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgb25Db25zdHJ1Y3RlZCgpIHtcbiAgICAgICAgc3VwZXIub25Db25zdHJ1Y3RlZCgpO1xuXG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgTmVvLlhoci5wcm9taXNlSnNvbih7XG4gICAgICAgICAgICB1cmw6ICcuLi8uLi9kb2NzL291dHB1dC9zdHJ1Y3R1cmUuanNvbidcbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGxldCB2ZG9tICAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICAgICAgaXRlbVJvb3QgPSBtZS5nZXRMaXN0SXRlbXNSb290KCk7XG5cbiAgICAgICAgICAgIG1lLnN0b3JlLmRhdGEgPSBkYXRhLmpzb247XG4gICAgICAgICAgICBpdGVtUm9vdCA9IG1lLmNyZWF0ZUl0ZW1zKG51bGwsIGl0ZW1Sb290LCAwKTtcblxuICAgICAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoQXBpVHJlZUxpc3QpO1xuXG5leHBvcnQge0FwaVRyZWVMaXN0IGFzIGRlZmF1bHR9OyIsImltcG9ydCBDb250YWluZXIgICAgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL3RhYi9Db250YWluZXIubWpzJztcbmltcG9ydCBIZWFkZXJCdXR0b24gZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL3RhYi9oZWFkZXIvQnV0dG9uLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIERvY3MuYXBwLnZpZXcuQ29udGVudFRhYkNvbnRhaW5lclxuICogQGV4dGVuZHMgTmVvLnRhYi5Db250YWluZXJcbiAqL1xuY2xhc3MgQ29udGVudFRhYkNvbnRhaW5lciBleHRlbmRzIENvbnRhaW5lciB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J0RvY3MuYXBwLnZpZXcuQ29udGVudFRhYkNvbnRhaW5lcidcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnRG9jcy5hcHAudmlldy5Db250ZW50VGFiQ29udGFpbmVyJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J2RvY3MtY29udGVudC10YWJjb250YWluZXInXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnZG9jcy1jb250ZW50LXRhYmNvbnRhaW5lcicsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBhY3RpdmF0ZUluc2VydGVkVGFicz10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBhY3RpdmF0ZUluc2VydGVkVGFiczogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gY29udGVudENvbnRhaW5lckRlZmF1bHRzPXtjbHM6Wy8vLi4uXX1cbiAgICAgICAgICovXG4gICAgICAgIGNvbnRlbnRDb250YWluZXJEZWZhdWx0czoge1xuICAgICAgICAgICAgY2xzOiBbXG4gICAgICAgICAgICAgICAgJ25lby1kb2NzLXRhYi1jb250ZW50LWNvbnRhaW5lcicsXG4gICAgICAgICAgICAgICAgJ25lby10YWItY29udGVudC1jb250YWluZXInLFxuICAgICAgICAgICAgICAgICduZW8tY29udGFpbmVyJ1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBoZWFkZXJUb29sYmFyRGVmYXVsdHM9e2NsczpbLy8uLi5dfVxuICAgICAgICAgKi9cbiAgICAgICAgaGVhZGVyVG9vbGJhckRlZmF1bHRzOiB7XG4gICAgICAgICAgICBjbHM6IFtcbiAgICAgICAgICAgICAgICAnZG9jcy10YWItaGVhZGVyLXRvb2xiYXInLFxuICAgICAgICAgICAgICAgICduZW8tdGFiLWhlYWRlci10b29sYmFyJyxcbiAgICAgICAgICAgICAgICAnbmVvLXRvb2xiYXInXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtBcnJheX0gaXRlbXM9Wy8vLi4uXV1cbiAgICAgICAgICovXG4gICAgICAgIGl0ZW1zOiBbe1xuICAgICAgICAgICAgbnR5cGU6ICdjb21wb25lbnQnLFxuICAgICAgICAgICAgaHRtbCA6ICdXZWxjb21lIHRvIHRoZSBuZW8ubWpzIGRvY3MhJyxcbiAgICAgICAgICAgIHN0eWxlOiB7cGFkZGluZzogJzIwcHgnfSxcblxuICAgICAgICAgICAgdGFiQnV0dG9uQ29uZmlnOiB7XG4gICAgICAgICAgICAgICAgaWNvbkNsczogJ2ZhIGZhLXVzZXJzJyxcbiAgICAgICAgICAgICAgICB0ZXh0ICAgOiAnV2VsY29tZSEnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1dLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc29ydGFibGU9dHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgc29ydGFibGU6IHRydWVcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lICA9IHRoaXMsXG4gICAgICAgICAgICBjbHMgPSBtZS5jbHM7XG5cbiAgICAgICAgY2xzLnVuc2hpZnQoJ2RvY3MtY29udGVudC10YWJjb250YWluZXInKTtcbiAgICAgICAgbWUuY2xzID0gY2xzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRpbmcgdGhlIGJ1dHRvbiBjbGljayBsaXN0ZW5lciB0byBhbGxvdyBjbG9zaW5nIHRhYnMgb24gaWNvbiBjbGlja1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgbWVyZ2VkIGNvbmZpZ1xuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBnZXRUYWJCdXR0b25Db25maWcoY29uZmlnLCBpbmRleCkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzLFxuICAgICAgICAgICAgZGVmYXVsdENvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICBtb2R1bGUgOiBIZWFkZXJCdXR0b24sXG4gICAgICAgICAgICAgICAgZmxleCAgIDogJ25vbmUnLFxuICAgICAgICAgICAgICAgIGluZGV4ICA6IGluZGV4LFxuICAgICAgICAgICAgICAgIHByZXNzZWQ6IG1lLmFjdGl2ZUluZGV4ID09PSBpbmRleCxcblxuICAgICAgICAgICAgICAgIGRvbUxpc3RlbmVyczogW3tcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXRoID0gZGF0YS5wYXRoLm1hcChlID0+IGUuaWQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGF0aFswXS5pbmRleE9mKCduZW8tdGFiLWhlYWRlci1idXR0b24tJykgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZS5hY3RpdmVJbmRleCA9IGRhdGEuY29tcG9uZW50LmluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZS5yZW1vdmVBdChOZW8uZ2V0Q29tcG9uZW50KG1lLnRhYkJhcklkKS5pbmRleE9mKHBhdGhbMV0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzY29wZTogbWVcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gey4uLmRlZmF1bHRDb25maWcsIC4uLmNvbmZpZ307XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhDb250ZW50VGFiQ29udGFpbmVyKTtcblxuZXhwb3J0IHtDb250ZW50VGFiQ29udGFpbmVyIGFzIGRlZmF1bHR9OyIsImltcG9ydCBFeGFtcGxlc1N0b3JlIGZyb20gJy4uL3N0b3JlL0V4YW1wbGVzLm1qcyc7XG5pbXBvcnQgVHJlZUxpc3QgICAgICBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdHJlZS9MaXN0Lm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIERvY3MuYXBwLnZpZXcuRXhhbXBsZXNUcmVlTGlzdFxuICogQGV4dGVuZHMgTmVvLnRyZWUuTGlzdFxuICovXG5jbGFzcyBFeGFtcGxlc1RyZWVMaXN0IGV4dGVuZHMgVHJlZUxpc3Qge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdEb2NzLmFwcC52aWV3LkV4YW1wbGVzVHJlZUxpc3QnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ0RvY3MuYXBwLnZpZXcuRXhhbXBsZXNUcmVlTGlzdCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSdleGFtcGxlcy10cmVlbGlzdCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICdleGFtcGxlcy10cmVlbGlzdCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gY2xzPVsnZG9jcy1leGFtcGxlcy10cmVlbGlzdCcsICduZW8tdHJlZS1saXN0JywgJ25lby1saXN0LWNvbnRhaW5lcicsICduZW8tbGlzdCddXG4gICAgICAgICAqL1xuICAgICAgICBjbHM6IFtcbiAgICAgICAgICAgICdkb2NzLWV4YW1wbGVzLXRyZWVsaXN0JyxcbiAgICAgICAgICAgICduZW8tdHJlZS1saXN0JyxcbiAgICAgICAgICAgICduZW8tbGlzdC1jb250YWluZXInLFxuICAgICAgICAgICAgJ25lby1saXN0J1xuICAgICAgICBdLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TmVvLmRhdGEuU3RvcmV8bnVsbH0gc3RvcmU9RXhhbXBsZXNTdG9yZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBzdG9yZTogRXhhbXBsZXNTdG9yZVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uQ29uc3RydWN0ZWQoKSB7XG4gICAgICAgIHN1cGVyLm9uQ29uc3RydWN0ZWQoKTtcblxuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIE5lby5YaHIucHJvbWlzZUpzb24oe1xuICAgICAgICAgICAgdXJsOiAnLi4vLi4vZG9jcy9leGFtcGxlcy5qc29uJ1xuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgbGV0IHZkb20gICAgID0gbWUudmRvbSxcbiAgICAgICAgICAgICAgICBpdGVtUm9vdCA9IG1lLmdldExpc3RJdGVtc1Jvb3QoKTtcblxuICAgICAgICAgICAgbWUuc3RvcmUuZGF0YSA9IGRhdGEuanNvbjtcbiAgICAgICAgICAgIGl0ZW1Sb290ID0gbWUuY3JlYXRlSXRlbXMobnVsbCwgaXRlbVJvb3QsIDApO1xuXG4gICAgICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhFeGFtcGxlc1RyZWVMaXN0KTtcblxuZXhwb3J0IHtFeGFtcGxlc1RyZWVMaXN0IGFzIGRlZmF1bHR9OyIsImltcG9ydCBDb250YWluZXIgICBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29udGFpbmVyL0Jhc2UubWpzJztcbmltcG9ydCBCdXR0b24gICAgICBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvYnV0dG9uL0Jhc2UubWpzJztcbmltcG9ydCBTZWFyY2hGaWVsZCBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZm9ybS9maWVsZC9TZWFyY2gubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgRG9jcy5hcHAudmlldy5IZWFkZXJDb250YWluZXJcbiAqIEBleHRlbmRzIE5lby5jb250YWluZXIuQmFzZVxuICovXG5jbGFzcyBIZWFkZXJDb250YWluZXIgZXh0ZW5kcyBDb250YWluZXIge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdEb2NzLmFwcC52aWV3LkhlYWRlckNvbnRhaW5lcidcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnRG9jcy5hcHAudmlldy5IZWFkZXJDb250YWluZXInLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0naGVhZGVyLWNvbnRhaW5lcidcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICduZW8tZG9jcy1oZWFkZXItY29udGFpbmVyJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBjbHM9WyduZW8tZG9jcy1oZWFkZXItY29udGFpbmVyJ11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWyduZW8tZG9jcy1oZWFkZXItY29udGFpbmVyJ10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IGhlaWdodD01NVxuICAgICAgICAgKi9cbiAgICAgICAgaGVpZ2h0OiA1NSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gbGF5b3V0PXtudHlwZTogJ2hib3gnLCBhbGlnbjogJ3N0cmV0Y2gnfVxuICAgICAgICAgKi9cbiAgICAgICAgbGF5b3V0OiB7bnR5cGU6ICdoYm94JywgYWxpZ246ICdzdHJldGNoJ30sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtBcnJheX0gaXRlbXM9Wy8vLi4uXVxuICAgICAgICAgKi9cbiAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICBtb2R1bGUgICAgICAgICA6IFNlYXJjaEZpZWxkLFxuICAgICAgICAgICAgbGlzdGVuZXJzICAgICAgOiB7Y2hhbmdlOiAnb25OYXZpZ2F0aW9uU2VhcmNoRmllbGRDaGFuZ2UnfSxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyVGV4dDogJ0ZpbHRlciBOYXZpZ2F0aW9uJyxcbiAgICAgICAgICAgIHN0eWxlICAgICAgICAgIDoge3BhZGRpbmc6ICcxMHB4J30sXG4gICAgICAgICAgICB3aWR0aCAgICAgICAgICA6IDI0MFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBtb2R1bGUgICAgICA6IEJ1dHRvbixcbiAgICAgICAgICAgIGRvbUxpc3RlbmVyczoge2NsaWNrOiAnb25Td2l0Y2hUaGVtZUJ1dHRvbkNsaWNrJ30sXG4gICAgICAgICAgICBmbGV4ICAgICAgICA6ICdub25lJyxcbiAgICAgICAgICAgIGhlaWdodCAgICAgIDogMjcsXG4gICAgICAgICAgICByZWZlcmVuY2UgICA6ICd0aGVtZS1idXR0b24nLFxuICAgICAgICAgICAgc3R5bGUgICAgICAgOiB7bWFyZ2luVG9wOiAnNXB4J30sXG4gICAgICAgICAgICB0ZXh0ICAgICAgICA6ICdUaGVtZSBEYXJrJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBtb2R1bGUgICAgICA6IEJ1dHRvbixcbiAgICAgICAgICAgIGRvbUxpc3RlbmVyczoge2NsaWNrOiAnb25Td2l0Y2hTb3VyY2VWaWV3VGhlbWVCdXR0b25DbGljayd9LFxuICAgICAgICAgICAgZmxleCAgICAgICAgOiAnbm9uZScsXG4gICAgICAgICAgICBoZWlnaHQgICAgICA6IDI3LFxuICAgICAgICAgICAgcmVmZXJlbmNlICAgOiAnc291cmNlLXZpZXctdGhlbWUtYnV0dG9uJyxcbiAgICAgICAgICAgIHN0eWxlICAgICAgIDoge21hcmdpbkxlZnQ6ICcxMHB4JywgbWFyZ2luVG9wOiAnNXB4J30sXG4gICAgICAgICAgICB0ZXh0ICAgICAgICA6ICdTb3VyY2UgVmlldyBUaGVtZSBEYXJrJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBudHlwZTogJ2NvbXBvbmVudCcsXG4gICAgICAgICAgICBmbGV4IDogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBudHlwZTogJ2NvbXBvbmVudCcsXG4gICAgICAgICAgICBjbHMgIDogWyduZW8tbG9nby10ZXh0J10sXG4gICAgICAgICAgICBodG1sIDogJ25lby5tanMgZG9jcycsXG4gICAgICAgICAgICB3aWR0aDogMjEwXG4gICAgICAgIH1dXG4gICAgfX1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoSGVhZGVyQ29udGFpbmVyKTtcblxuZXhwb3J0IHtIZWFkZXJDb250YWluZXIgYXMgZGVmYXVsdH07IiwiaW1wb3J0IEFwaVRyZWVMaXN0ICAgICAgICAgICAgIGZyb20gJy4vQXBpVHJlZUxpc3QubWpzJztcbmltcG9ydCBDbGFzc0RldGFpbHNDb250YWluZXIgICBmcm9tICcuL2NsYXNzZGV0YWlscy9NYWluQ29udGFpbmVyLm1qcyc7XG5pbXBvcnQgQ29sbGVjdGlvbiAgICAgICAgICAgICAgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbGxlY3Rpb24vQmFzZS5tanMnO1xuaW1wb3J0IENvbnRlbnRUYWJDb250YWluZXIgICAgIGZyb20gJy4vQ29udGVudFRhYkNvbnRhaW5lci5tanMnO1xuaW1wb3J0IEV4YW1wbGVzVHJlZUxpc3QgICAgICAgIGZyb20gJy4vRXhhbXBsZXNUcmVlTGlzdC5tanMnO1xuaW1wb3J0IEhlYWRlckNvbnRhaW5lciAgICAgICAgIGZyb20gJy4vSGVhZGVyQ29udGFpbmVyLm1qcyc7XG5pbXBvcnQgTWFpbkNvbnRhaW5lckNvbnRyb2xsZXIgZnJvbSAnLi9NYWluQ29udGFpbmVyQ29udHJvbGxlci5tanMnO1xuaW1wb3J0IFNvdXJjZVZpZXdDb21wb25lbnQgICAgIGZyb20gJy4vY2xhc3NkZXRhaWxzL1NvdXJjZVZpZXdDb21wb25lbnQubWpzJztcbmltcG9ydCBUdXRvcmlhbENvbXBvbmVudCAgICAgICBmcm9tICcuL2NsYXNzZGV0YWlscy9UdXRvcmlhbENvbXBvbmVudC5tanMnO1xuaW1wb3J0IFR1dG9yaWFsc1RyZWVMaXN0ICAgICAgIGZyb20gJy4vVHV0b3JpYWxzVHJlZUxpc3QubWpzJztcbmltcG9ydCBWaWV3cG9ydCAgICAgICAgICAgICAgICBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29udGFpbmVyL1ZpZXdwb3J0Lm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIERvY3MuYXBwLnZpZXcuTWFpbkNvbnRhaW5lclxuICogQGV4dGVuZHMgTmVvLmNvbnRhaW5lci5WaWV3cG9ydFxuICovXG5jbGFzcyBNYWluQ29udGFpbmVyIGV4dGVuZHMgVmlld3BvcnQge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdEb2NzLmFwcC52aWV3Lk1haW5Db250YWluZXInXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ0RvY3MuYXBwLnZpZXcuTWFpbkNvbnRhaW5lcicsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSdtYWluLWNvbnRhaW5lcidcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICdtYWluLWNvbnRhaW5lcicsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBhdXRvTW91bnQ9dHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgYXV0b01vdW50IDogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBjbHM9WyduZW8tZG9jcy1tYWluY29udGFpbmVyJywgJ25lby12aWV3cG9ydCddXG4gICAgICAgICAqL1xuICAgICAgICBjbHM6IFsnbmVvLWRvY3MtbWFpbmNvbnRhaW5lcicsICduZW8tdmlld3BvcnQnXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge05lby5jb250cm9sbGVyLkNvbXBvbmVudH0gY29udHJvbGxlcj1NYWluQ29udGFpbmVyQ29udHJvbGxlclxuICAgICAgICAgKi9cbiAgICAgICAgY29udHJvbGxlcjogTWFpbkNvbnRhaW5lckNvbnRyb2xsZXIsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IGxheW91dD17bnR5cGU6ICd2Ym94JywgYWxpZ246ICdzdHJldGNoJ31cbiAgICAgICAgICovXG4gICAgICAgIGxheW91dDoge250eXBlOiAndmJveCcsIGFsaWduOiAnc3RyZXRjaCd9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TmVvLmNvbGxlY3Rpb24uQmFzZXxudWxsfSBzdG9yZV89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgc3RvcmVfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl9IGl0ZW1zPVsvLy4uLl1cbiAgICAgICAgICovXG4gICAgICAgIGl0ZW1zOiBbSGVhZGVyQ29udGFpbmVyLCB7XG4gICAgICAgICAgICBudHlwZSA6ICdjb250YWluZXInLFxuICAgICAgICAgICAgZmxleCAgOiAxLFxuICAgICAgICAgICAgbGF5b3V0OiB7bnR5cGU6ICdoYm94JywgYWxpZ246ICdzdHJldGNoJ30sXG5cbiAgICAgICAgICAgIGl0ZW1zOiBbe1xuICAgICAgICAgICAgICAgIG50eXBlICAgOiAndGFiLWNvbnRhaW5lcicsXG4gICAgICAgICAgICAgICAgY2xzICAgICA6IFsnbmVvLWRvY3MtbmF2aWdhdGlvbi10YWItY29udGFpbmVyJywgJ25lby10YWItY29udGFpbmVyJ10sXG4gICAgICAgICAgICAgICAgbWluV2lkdGg6IDI5MCxcbiAgICAgICAgICAgICAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB3aWR0aCAgIDogMjkwLFxuXG4gICAgICAgICAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZSAgIDogQXBpVHJlZUxpc3QsXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyczoge2xlYWZJdGVtQ2xpY2s6ICdvbkFwaUxpc3RMZWFmQ2xpY2snfSxcbiAgICAgICAgICAgICAgICAgICAgcmVmZXJlbmNlOiAnYXBpLXRyZWVsaXN0JyxcblxuICAgICAgICAgICAgICAgICAgICB0YWJCdXR0b25Db25maWc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb25DbHM6ICdmYSBmYS1jb2RlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgICA6ICdBUEknXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZSAgIDogVHV0b3JpYWxzVHJlZUxpc3QsXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyczoge2xlYWZJdGVtQ2xpY2s6ICdvblR1dG9yaWFsTGlzdExlYWZDbGljayd9LFxuICAgICAgICAgICAgICAgICAgICByZWZlcmVuY2U6ICd0dXRvcmlhbHMtdHJlZWxpc3QnLFxuXG4gICAgICAgICAgICAgICAgICAgIHRhYkJ1dHRvbkNvbmZpZzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbkNsczogJ2ZhIGZhLWhhbmRzLWhlbHBpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCAgIDogJ1R1dG9yaWFscydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlICAgOiBFeGFtcGxlc1RyZWVMaXN0LFxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnM6IHtsZWFmSXRlbUNsaWNrOiAnb25FeGFtcGxlc0xpc3RMZWFmQ2xpY2snfSxcbiAgICAgICAgICAgICAgICAgICAgcmVmZXJlbmNlOiAnZXhhbXBsZXMtdHJlZWxpc3QnLFxuXG4gICAgICAgICAgICAgICAgICAgIHRhYkJ1dHRvbkNvbmZpZzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbkNsczogJ2ZhIGZhLWRlc2t0b3AnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCAgIDogJ0V4YW1wbGVzJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBtb2R1bGUgICA6IENvbnRlbnRUYWJDb250YWluZXIsXG4gICAgICAgICAgICAgICAgZmxleCAgICAgOiAxLFxuICAgICAgICAgICAgICAgIHJlZmVyZW5jZTogJ2NvbnRlbnQtdGFiY29udGFpbmVyJ1xuICAgICAgICAgICAgfV1cbiAgICAgICAgfV1cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAoIW1lLnN0b3JlKSB7XG4gICAgICAgICAgICBtZS5zdG9yZSA9IE5lby5jcmVhdGUoQ29sbGVjdGlvbiwge1xuICAgICAgICAgICAgICAgIGtleVByb3BlcnR5OiAnaWQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERpc2FibGUgdGhlIGV4YW1wbGVzIFRhYiBmb3IgZGlzdCB2ZXJzaW9ucyB1bnRpbCB0aGUgd2VicGFjayBidWlsZHMgY2FuIGhhbmRsZSB0aGlzIChzZWU6ICMxNDApXG4gICAgICAgIG1lLml0ZW1zWzFdLml0ZW1zWzBdLml0ZW1zWzJdLnRhYkJ1dHRvbkNvbmZpZy5kaXNhYmxlZCA9IE5lby5jb25maWcuZW52aXJvbm1lbnQgIT09ICdkZXZlbG9wbWVudCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkNvbnN0cnVjdGVkKCkge1xuICAgICAgICBzdXBlci5vbkNvbnN0cnVjdGVkKCk7XG5cbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBOZW8uWGhyLnByb21pc2VKc29uKHtcbiAgICAgICAgICAgIHVybDogJy4uLy4uL2RvY3Mvb3V0cHV0L2FsbC5qc29uJ1xuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgbWUuc3RvcmUuaXRlbXMgPSBkYXRhLmpzb247XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoTWFpbkNvbnRhaW5lcik7XG5cbmV4cG9ydCB7TWFpbkNvbnRhaW5lciBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9jb250cm9sbGVyL0NvbXBvbmVudC5tanMnO1xuaW1wb3J0IE5lb0FycmF5ICBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdXRpbC9BcnJheS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBEb2NzLmFwcC52aWV3Lk1haW5Db250YWluZXJDb250cm9sbGVyXG4gKiBAZXh0ZW5kcyBOZW8uY29udHJvbGxlci5Db21wb25lbnRcbiAqL1xuY2xhc3MgTWFpbkNvbnRhaW5lckNvbnRyb2xsZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdEb2NzLmFwcC52aWV3Lk1haW5Db250YWluZXJDb250cm9sbGVyJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdEb2NzLmFwcC52aWV3Lk1haW5Db250YWluZXJDb250cm9sbGVyJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J2RvY3MtbWFpbmNvbnRhaW5lci1jb250cm9sbGVyJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ2RvY3MtbWFpbmNvbnRhaW5lci1jb250cm9sbGVyJ1xuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZWNvcmRcbiAgICAgKi9cbiAgICBvbkFwaUxpc3RMZWFmQ2xpY2socmVjb3JkKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGNvbnRlbnRUYWJDb250YWluZXIgPSBtZS5nZXRSZWZlcmVuY2UoJ2NvbnRlbnQtdGFiY29udGFpbmVyJyk7XG5cbiAgICAgICAgY29udGVudFRhYkNvbnRhaW5lci5hZGQoe1xuICAgICAgICAgICAgbnR5cGUgICAgICAgIDogJ2NsYXNzZGV0YWlscy1tYWluY29udGFpbmVyJyxcbiAgICAgICAgICAgIGlkICAgICAgICAgICA6IHJlY29yZC5jbGFzc05hbWUsXG4gICAgICAgICAgICBzdHJ1Y3R1cmVEYXRhOiByZWNvcmQsXG5cbiAgICAgICAgICAgIHRhYkJ1dHRvbkNvbmZpZzoge1xuICAgICAgICAgICAgICAgIGljb25DbHM6IHJlY29yZC5zaW5nbGV0b24gPyAnZmEgZmEtYXJyb3ctYWx0LWNpcmNsZS1yaWdodCcgOiAnZmEgZmEtY29weXJpZ2h0JyxcbiAgICAgICAgICAgICAgICB0ZXh0ICAgOiByZWNvcmQubmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZWNvcmRcbiAgICAgKi9cbiAgICBvbkV4YW1wbGVzTGlzdExlYWZDbGljayhyZWNvcmQpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgY29udGVudFRhYkNvbnRhaW5lciA9IG1lLmdldFJlZmVyZW5jZSgnY29udGVudC10YWJjb250YWluZXInKSxcbiAgICAgICAgICAgIG5hbWUgICAgICAgICAgICAgICAgPSByZWNvcmQubmFtZSxcbiAgICAgICAgICAgIHBhdGhBcnJheSAgICAgICAgICAgPSBbXSxcbiAgICAgICAgICAgIHN0b3JlICAgICAgICAgICAgICAgPSBtZS5nZXRSZWZlcmVuY2UoJ2V4YW1wbGVzLXRyZWVsaXN0Jykuc3RvcmUsXG4gICAgICAgICAgICB0bXBSZWNvcmQgICAgICAgICAgID0gcmVjb3JkLFxuICAgICAgICAgICAgdGFiQnV0dG9uQ29uZmlnO1xuXG4gICAgICAgIHdoaWxlICh0bXBSZWNvcmQucGFyZW50SWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRtcFJlY29yZCA9IHN0b3JlLmdldCh0bXBSZWNvcmQucGFyZW50SWQpO1xuICAgICAgICAgICAgbmFtZSAgICAgID0gdG1wUmVjb3JkLm5hbWUgKyAnLicgKyBuYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgbmFtZSA9ICdleGFtcGxlc18nICsgbmFtZTtcblxuICAgICAgICB0YWJCdXR0b25Db25maWcgPSB7XG4gICAgICAgICAgICBpY29uQ2xzOiAnZmEgZmEtZGVza3RvcCcsXG4gICAgICAgICAgICB0ZXh0ICAgOiByZWNvcmQubmFtZVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShyZWNvcmQucGF0aCkpIHtcbiAgICAgICAgICAgIGltcG9ydChcbiAgICAgICAgICAgICAgICAvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovXG4gICAgICAgICAgICAgICAgcmVjb3JkLnBhdGgpLnRoZW4oKG1vZHVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50VGFiQ29udGFpbmVyLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBudHlwZSAgICAgICAgICA6IG1vZHVsZS5kZWZhdWx0LnByb3RvdHlwZS5udHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkICAgICAgICAgICAgIDogbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYkJ1dHRvbkNvbmZpZzogdGFiQnV0dG9uQ29uZmlnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWNvcmQucGF0aC5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgICAgICAgICAgIHBhdGhBcnJheS5wdXNoKGltcG9ydCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHBhdGgpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBQcm9taXNlLmFsbChwYXRoQXJyYXkpLnRoZW4oZnVuY3Rpb24obW9kdWxlcykge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgbW9kdWxlcy5mb3JFYWNoKG1vZHVsZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgbnR5cGU6IG1vZHVsZS5kZWZhdWx0LnByb3RvdHlwZS5udHlwZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnRlbnRUYWJDb250YWluZXIuYWRkKHtcbiAgICAgICAgICAgICAgICAgICAgbnR5cGUgICAgICAgICAgOiAnY29udGFpbmVyJyxcbiAgICAgICAgICAgICAgICAgICAgaWQgICAgICAgICAgICAgOiBuYW1lLFxuICAgICAgICAgICAgICAgICAgICBpdGVtcyAgICAgICAgICA6IGl0ZW1zLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZSAgICAgICAgICA6IHtwYWRkaW5nOiAnMTBweCd9LFxuICAgICAgICAgICAgICAgICAgICB0YWJCdXR0b25Db25maWc6IHRhYkJ1dHRvbkNvbmZpZ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9sZFZhbHVlXG4gICAgICovXG4gICAgb25IYXNoQ2hhbmdlKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgICAgICAgICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBoYXNoICAgICAgICAgICAgICAgID0gdmFsdWUgJiYgdmFsdWUuaGFzaCxcbiAgICAgICAgICAgIGNvbnRlbnRUYWJDb250YWluZXIgPSBtZS5nZXRSZWZlcmVuY2UoJ2NvbnRlbnQtdGFiY29udGFpbmVyJyksXG4gICAgICAgICAgICBzdHJ1Y3R1cmVTdG9yZSAgICAgID0gbWUuZ2V0UmVmZXJlbmNlKCdhcGktdHJlZWxpc3QnKS5zdG9yZSxcbiAgICAgICAgICAgIHJlY29yZCwgdGFiO1xuXG4gICAgICAgIGlmIChoYXNoICYmIGhhc2guaGFzT3duUHJvcGVydHkoJ3ZpZXdTb3VyY2UnKSkge1xuICAgICAgICAgICAgcmVjb3JkID0gc3RydWN0dXJlU3RvcmUuZmluZCgnY2xhc3NOYW1lJywgaGFzaC52aWV3U291cmNlKVswXTtcblxuICAgICAgICAgICAgaWYgKHJlY29yZCkge1xuICAgICAgICAgICAgICAgIHRhYiA9IGNvbnRlbnRUYWJDb250YWluZXIuYWRkKHtcbiAgICAgICAgICAgICAgICAgICAgbnR5cGUgICAgICAgIDogJ2NsYXNzZGV0YWlscy1zb3VyY2V2aWV3Y29tcG9uZW50JyxcbiAgICAgICAgICAgICAgICAgICAgaWQgICAgICAgICAgIDogaGFzaC52aWV3U291cmNlICsgJ19fc291cmNlJyxcbiAgICAgICAgICAgICAgICAgICAgbGluZSAgICAgICAgIDogaGFzaC5saW5lLFxuICAgICAgICAgICAgICAgICAgICBzdHJ1Y3R1cmVEYXRhOiByZWNvcmQsXG5cbiAgICAgICAgICAgICAgICAgICAgdGFiQnV0dG9uQ29uZmlnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uQ2xzOiAnZmEgZmEtY29kZScsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ICAgOiByZWNvcmQubmFtZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGp1c3QgdGhlIGhpZ2hsaWdodGVkIGxpbmUgZm9yIGFscmVhZHkgYWRkZWQgc291cmNlIHZpZXcgdGFic1xuICAgICAgICAgICAgICAgIHRhYi5saW5lID0gaGFzaC5saW5lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uTmF2aWdhdGlvblNlYXJjaEZpZWxkQ2hhbmdlKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lICAgID0gdGhpcyxcbiAgICAgICAgICAgIHZhbHVlID0gZGF0YS52YWx1ZTtcblxuICAgICAgICBtZS5nZXRSZWZlcmVuY2UoJ2V4YW1wbGVzLXRyZWVsaXN0JykgLmZpbHRlcignbmFtZScsIHZhbHVlLCBudWxsKTtcbiAgICAgICAgbWUuZ2V0UmVmZXJlbmNlKCdhcGktdHJlZWxpc3QnKSAgICAgIC5maWx0ZXIoJ25hbWUnLCB2YWx1ZSwgbnVsbCk7XG4gICAgICAgIG1lLmdldFJlZmVyZW5jZSgndHV0b3JpYWxzLXRyZWVsaXN0JykuZmlsdGVyKCduYW1lJywgdmFsdWUsIG51bGwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgb25Td2l0Y2hTb3VyY2VWaWV3VGhlbWVCdXR0b25DbGljaygpIHtcbiAgICAgICAgbGV0IG1lICAgICA9IHRoaXMsXG4gICAgICAgICAgICBidXR0b24gPSBtZS5nZXRSZWZlcmVuY2UoJ3NvdXJjZS12aWV3LXRoZW1lLWJ1dHRvbicpLFxuICAgICAgICAgICAgYnV0dG9uVGV4dCwgaHJlZjtcblxuICAgICAgICBpZiAoYnV0dG9uLnRleHQgPT09ICdTb3VyY2UgVmlldyBUaGVtZSBMaWdodCcpIHtcbiAgICAgICAgICAgIGJ1dHRvblRleHQgPSAnU291cmNlIFZpZXcgVGhlbWUgRGFyayc7XG4gICAgICAgICAgICBocmVmICAgICAgID0gJy4vcmVzb3VyY2VzL2hpZ2hsaWdodGpzLWN1c3RvbS1naXRodWItdGhlbWUuY3NzJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJ1dHRvblRleHQgPSAnU291cmNlIFZpZXcgVGhlbWUgTGlnaHQnO1xuICAgICAgICAgICAgaHJlZiAgICAgICA9ICcuL3Jlc291cmNlcy9oaWdobGlnaHRqcy1jdXN0b20tZGFyay10aGVtZS5jc3MnO1xuICAgICAgICB9XG5cbiAgICAgICAgTmVvLm1haW4uYWRkb24uU3R5bGVzaGVldC5zd2FwU3R5bGVTaGVldCh7XG4gICAgICAgICAgICBocmVmOiBocmVmLFxuICAgICAgICAgICAgaWQgIDogJ2hsanMtdGhlbWUnXG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBidXR0b24udGV4dCA9IGJ1dHRvblRleHQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgb25Td2l0Y2hUaGVtZUJ1dHRvbkNsaWNrKCkge1xuICAgICAgICBsZXQgbWUgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGJ1dHRvbiA9IG1lLmdldFJlZmVyZW5jZSgndGhlbWUtYnV0dG9uJyksXG4gICAgICAgICAgICB2aWV3ICAgPSBtZS52aWV3LFxuICAgICAgICAgICAgYnV0dG9uVGV4dCwgY2xzLCBocmVmLCB0aGVtZTtcblxuICAgICAgICBpZiAoYnV0dG9uLnRleHQgPT09ICdUaGVtZSBMaWdodCcpIHtcbiAgICAgICAgICAgIGJ1dHRvblRleHQgPSAnVGhlbWUgRGFyayc7XG4gICAgICAgICAgICBocmVmICAgICAgID0gJy4uL2Rpc3QvZGV2ZWxvcG1lbnQvbmVvLXRoZW1lLWxpZ2h0LW5vLWNzcy12YXJzLmNzcyc7XG4gICAgICAgICAgICB0aGVtZSAgICAgID0gJ25lby10aGVtZS1saWdodCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBidXR0b25UZXh0ID0gJ1RoZW1lIExpZ2h0JztcbiAgICAgICAgICAgIGhyZWYgICAgICAgPSAnLi4vZGlzdC9kZXZlbG9wbWVudC9uZW8tdGhlbWUtZGFyay1uby1jc3MtdmFycy5jc3MnO1xuICAgICAgICAgICAgdGhlbWUgICAgICA9ICduZW8tdGhlbWUtZGFyayc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTmVvLmNvbmZpZy51c2VDc3NWYXJzKSB7XG4gICAgICAgICAgICBjbHMgPSBbLi4udmlldy5jbHNdO1xuXG4gICAgICAgICAgICB2aWV3LmNscy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmluY2x1ZGVzKCduZW8tdGhlbWUnKSkge1xuICAgICAgICAgICAgICAgICAgICBOZW9BcnJheS5yZW1vdmUoY2xzLCBpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgTmVvQXJyYXkuYWRkKGNscywgdGhlbWUpO1xuICAgICAgICAgICAgdmlldy5jbHMgPSBjbHM7XG5cbiAgICAgICAgICAgIGJ1dHRvbi50ZXh0ID0gYnV0dG9uVGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIE5lby5tYWluLmFkZG9uLlN0eWxlc2hlZXQuc3dhcFN0eWxlU2hlZXQoe1xuICAgICAgICAgICAgICAgIGhyZWY6IGhyZWYsXG4gICAgICAgICAgICAgICAgaWQgIDogJ25lby10aGVtZSdcbiAgICAgICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgYnV0dG9uLnRleHQgPSBidXR0b25UZXh0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZWNvcmRcbiAgICAgKi9cbiAgICBvblR1dG9yaWFsTGlzdExlYWZDbGljayhyZWNvcmQpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgY29udGVudFRhYkNvbnRhaW5lciA9IG1lLmdldFJlZmVyZW5jZSgnY29udGVudC10YWJjb250YWluZXInKTtcblxuICAgICAgICBjb250ZW50VGFiQ29udGFpbmVyLmFkZCh7XG4gICAgICAgICAgICBudHlwZSAgIDogJ2NsYXNzZGV0YWlscy10dXRvcmlhbGNvbXBvbmVudCcsXG4gICAgICAgICAgICBmaWxlTmFtZTogcmVjb3JkLmZpbGVOYW1lLFxuICAgICAgICAgICAgZmlsZVR5cGU6IHJlY29yZC50eXBlLFxuICAgICAgICAgICAgaWQgICAgICA6IHJlY29yZC5uYW1lLFxuXG4gICAgICAgICAgICB0YWJCdXR0b25Db25maWc6IHtcbiAgICAgICAgICAgICAgICBpY29uQ2xzOiAnZmEgZmEtaGFuZHMtaGVscGluZycsXG4gICAgICAgICAgICAgICAgdGV4dCAgIDogcmVjb3JkLm5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhNYWluQ29udGFpbmVyQ29udHJvbGxlcik7XG5cbmV4cG9ydCB7TWFpbkNvbnRhaW5lckNvbnRyb2xsZXIgYXMgZGVmYXVsdH07IiwiaW1wb3J0IFRyZWVMaXN0ICAgICAgIGZyb20gJy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy90cmVlL0xpc3QubWpzJztcbmltcG9ydCBUdXRvcmlhbHNTdG9yZSBmcm9tICcuLi9zdG9yZS9UdXRvcmlhbHMubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgRG9jcy5hcHAudmlldy5UdXRvcmlhbHNUcmVlTGlzdFxuICogQGV4dGVuZHMgTmVvLnRyZWUuTGlzdFxuICovXG5jbGFzcyBUdXRvcmlhbHNUcmVlTGlzdCBleHRlbmRzIFRyZWVMaXN0IHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nRG9jcy5hcHAudmlldy5UdXRvcmlhbHNUcmVlTGlzdCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnRG9jcy5hcHAudmlldy5UdXRvcmlhbHNUcmVlTGlzdCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSd0dXRvcmlhbHMtdHJlZWxpc3QnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAndHV0b3JpYWxzLXRyZWVsaXN0JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBjbHM9Wydkb2NzLXR1dG9yaWFscy10cmVlbGlzdCcsICduZW8tdHJlZS1saXN0JywgJ25lby1saXN0LWNvbnRhaW5lcicsICduZW8tbGlzdCddXG4gICAgICAgICAqL1xuICAgICAgICBjbHM6IFtcbiAgICAgICAgICAgICdkb2NzLXR1dG9yaWFscy10cmVlbGlzdCcsXG4gICAgICAgICAgICAnbmVvLXRyZWUtbGlzdCcsXG4gICAgICAgICAgICAnbmVvLWxpc3QtY29udGFpbmVyJyxcbiAgICAgICAgICAgICduZW8tbGlzdCdcbiAgICAgICAgXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge05lby5kYXRhLlN0b3JlfG51bGx9IHN0b3JlPVR1dG9yaWFsc1N0b3JlXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHN0b3JlOiBUdXRvcmlhbHNTdG9yZVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uQ29uc3RydWN0ZWQoKSB7XG4gICAgICAgIHN1cGVyLm9uQ29uc3RydWN0ZWQoKTtcblxuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIE5lby5YaHIucHJvbWlzZUpzb24oe1xuICAgICAgICAgICAgdXJsOiAnLi4vLi4vZG9jcy90dXRvcmlhbHMvdHV0b3JpYWxzLmpzb24nXG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBsZXQgdmRvbSAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgICAgIGl0ZW1Sb290ID0gbWUuZ2V0TGlzdEl0ZW1zUm9vdCgpO1xuXG4gICAgICAgICAgICBtZS5zdG9yZS5kYXRhID0gZGF0YS5qc29uO1xuICAgICAgICAgICAgaXRlbVJvb3QgPSBtZS5jcmVhdGVJdGVtcyhudWxsLCBpdGVtUm9vdCwgMCk7XG5cbiAgICAgICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKFR1dG9yaWFsc1RyZWVMaXN0KTtcblxuZXhwb3J0IHtUdXRvcmlhbHNUcmVlTGlzdCBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQ29tcG9uZW50ICAgICAgICAgICBmcm9tICcuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29tcG9uZW50L0Jhc2UubWpzJztcbmltcG9ydCBTb3VyY2VWaWV3Q29tcG9uZW50IGZyb20gJy4vU291cmNlVmlld0NvbXBvbmVudC5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBEb2NzLmFwcC52aWV3LmNsYXNzZGV0YWlscy5IZWFkZXJDb21wb25lbnRcbiAqIEBleHRlbmRzIE5lby5jb21wb25lbnQuQmFzZVxuICovXG5jbGFzcyBIZWFkZXJDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdEb2NzLmFwcC52aWV3LmNsYXNzZGV0YWlscy5IZWFkZXJDb21wb25lbnQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ0RvY3MuYXBwLnZpZXcuY2xhc3NkZXRhaWxzLkhlYWRlckNvbXBvbmVudCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSdjbGFzc2RldGFpbHMtaGVhZGVyY29tcG9uZW50J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ2NsYXNzZGV0YWlscy1oZWFkZXJjb21wb25lbnQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ25lby1kb2NzLWNsYXNzZGV0YWlscy1oZWFkZXJjb21wb25lbnQnXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ25lby1kb2NzLWNsYXNzZGV0YWlscy1oZWFkZXJjb21wb25lbnQnXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdHxudWxsfSByZWNvcmRfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHJlY29yZF86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IGRvbUxpc3RlbmVyc1xuICAgICAgICAgKi9cbiAgICAgICAgZG9tTGlzdGVuZXJzOiB7XG4gICAgICAgICAgICBjbGljazoge1xuICAgICAgICAgICAgICAgIGZuICAgICAgOiAnb25IZWFkZXJDbGljaycsIC8vIERvY3MuYXBwLnZpZXcuTWFpbkNvbnRhaW5lckNvbnRyb2xsZXJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogJy5uZW8tZG9jcy1oZWFkZXItdGV4dCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gX3Zkb21cbiAgICAgICAgICovXG4gICAgICAgIF92ZG9tOiB7XG4gICAgICAgICAgICBjbjogW3tcbiAgICAgICAgICAgICAgICB0YWc6ICdzcGFuJyxcbiAgICAgICAgICAgICAgICBjbHM6IFsnbmVvLWRvY3MtaGVhZGVyLXRleHQnXVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uQ29uc3RydWN0ZWQoKSB7XG4gICAgICAgIHN1cGVyLm9uQ29uc3RydWN0ZWQoKTtcblxuICAgICAgICBsZXQgbWUgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tICAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgY2xhc3NOYW1lID0gbWUucmVjb3JkLmNsYXNzTmFtZSxcbiAgICAgICAgICAgIHN0b3JlICAgICA9IG1lLnVwKCdtYWluLWNvbnRhaW5lcicpLnN0b3JlLFxuICAgICAgICAgICAgcmVjb3JkICAgID0gc3RvcmUuZmluZCh7JGtpbmQ6IGNsYXNzTmFtZSA9PT0gJ05lbycgPyAnbW9kdWxlJyA6ICdjbGFzcycsIG5lb0NsYXNzTmFtZTogY2xhc3NOYW1lfSlbMF0sXG4gICAgICAgICAgICBpICAgICAgICAgPSAwLFxuICAgICAgICAgICAgbGVuICAgICAgID0gcmVjb3JkICYmIHJlY29yZC50YWdzICYmIHJlY29yZC50YWdzLmxlbmd0aCB8fCAwLFxuICAgICAgICAgICAgc2luZ2xldG9uID0gZmFsc2U7XG5cbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKHJlY29yZC50YWdzW2ldLnRpdGxlID09PSAnc2luZ2xldG9uJykge1xuICAgICAgICAgICAgICAgIHNpbmdsZXRvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2ZG9tLmNuWzBdLmlubmVySFRNTCA9IHNpbmdsZXRvbiA/IChjbGFzc05hbWUgKyAnIOKGkiBTaW5nbGV0b24nKSA6IGNsYXNzTmFtZTtcblxuICAgICAgICBpZiAocmVjb3JkLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB2ZG9tLmNuLnB1c2goe1xuICAgICAgICAgICAgICAgIGNscyAgICAgIDogWyduZW8tZG9jcy1oZWFkZXItZGVzY3JpcHRpb24nXSxcbiAgICAgICAgICAgICAgICBpbm5lckhUTUw6IHJlY29yZC5kZXNjcmlwdGlvblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKEhlYWRlckNvbXBvbmVudCk7XG5cbmV4cG9ydCB7SGVhZGVyQ29tcG9uZW50IGFzIGRlZmF1bHR9OyIsImltcG9ydCBUcmVlTGlzdCBmcm9tICcuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdHJlZS9MaXN0Lm1qcyc7XG5pbXBvcnQgTmVvQXJyYXkgZnJvbSAnLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL3V0aWwvQXJyYXkubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgRG9jcy5hcHAudmlldy5jbGFzc2RldGFpbHMuSGllcmFyY2h5VHJlZUxpc3RcbiAqIEBleHRlbmRzIE5lby50cmVlLkxpc3RcbiAqL1xuY2xhc3MgSGllcmFyY2h5VHJlZUxpc3QgZXh0ZW5kcyBUcmVlTGlzdCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J0RvY3MuYXBwLnZpZXcuY2xhc3NkZXRhaWxzLkhpZXJhcmNoeVRyZWVMaXN0J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdEb2NzLmFwcC52aWV3LmNsYXNzZGV0YWlscy5IaWVyYXJjaHlUcmVlTGlzdCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSdjbGFzc2RldGFpbHMtdHJlZWxpc3QnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnY2xhc3NoaWVyYXJjaHktdHJlZWxpc3QnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ2RvY3MtY2xhc3NoaWVyYXJjaHktdHJlZWxpc3QnLCAnbmVvLWxpc3QtY29udGFpbmVyJywgJ25lby1saXN0J11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogW1xuICAgICAgICAgICAgJ2RvY3MtY2xhc3NoaWVyYXJjaHktdHJlZWxpc3QnLFxuICAgICAgICAgICAgJ25lby1saXN0LWNvbnRhaW5lcicsXG4gICAgICAgICAgICAnbmVvLXRyZWUtbGlzdCcsXG4gICAgICAgICAgICAnbmVvLWxpc3QnXG4gICAgICAgIF0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBzaG93Q29sbGFwc2VFeHBhbmRBbGxJY29ucz1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgc2hvd0NvbGxhcHNlRXhwYW5kQWxsSWNvbnM6IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fG51bGx9IHN0cnVjdHVyZURhdGE9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgc3RydWN0dXJlRGF0YTogbnVsbFxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uQ29uc3RydWN0ZWQoKSB7XG4gICAgICAgIHN1cGVyLm9uQ29uc3RydWN0ZWQoKTtcblxuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIG1lLmNyZWF0ZVN0b3JlSXRlbXMoKTtcbiAgICAgICAgbWUuY3JlYXRlSXRlbXMobnVsbCwgbWUuZ2V0TGlzdEl0ZW1zUm9vdCgpLCAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGNyZWF0ZVN0b3JlSXRlbXMoKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGNsYXNzTmFtZSAgICAgPSBtZS5zdHJ1Y3R1cmVEYXRhLmNsYXNzTmFtZSxcbiAgICAgICAgICAgIG1haW5Db250YWluZXIgPSBtZS51cCgnbWFpbi1jb250YWluZXInKSxcbiAgICAgICAgICAgIG1haW5TdG9yZSAgICAgPSBtYWluQ29udGFpbmVyLnN0b3JlLFxuICAgICAgICAgICAgc3RvcmVJdGVtcyAgICA9IFtdLFxuICAgICAgICAgICAgdG1wSXRlbXMgICAgICA9IFtdLFxuICAgICAgICAgICAgaXRlbSwgcGFyZW50SWQ7XG5cbiAgICAgICAgaXRlbSA9IG1haW5TdG9yZS5maW5kKHtcbiAgICAgICAgICAgICRraW5kICAgICAgIDogY2xhc3NOYW1lID09PSAnTmVvJyA/ICdtb2R1bGUnIDogJ2NsYXNzJyxcbiAgICAgICAgICAgIG5lb0NsYXNzTmFtZTogbWUuc3RydWN0dXJlRGF0YS5jbGFzc05hbWVcbiAgICAgICAgfSlbMF07XG5cbiAgICAgICAgdG1wSXRlbXMudW5zaGlmdChpdGVtKTtcblxuICAgICAgICB3aGlsZSAoaXRlbSAmJiBpdGVtLmhhc093blByb3BlcnR5KCdhdWdtZW50cycpKSB7XG4gICAgICAgICAgICBpdGVtID0gbWFpblN0b3JlLmZpbmQoe1xuICAgICAgICAgICAgICAgICRraW5kICAgICAgIDogJ2NsYXNzJyxcbiAgICAgICAgICAgICAgICBuZW9DbGFzc05hbWU6IGl0ZW0uYXVnbWVudHNbMF1cbiAgICAgICAgICAgIH0pWzBdO1xuXG4gICAgICAgICAgICB0bXBJdGVtcy51bnNoaWZ0KGl0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdG1wSXRlbXMuZm9yRWFjaCgoa2V5LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgIHBhcmVudElkID0gdG1wSXRlbXNbaW5kZXggLSAxXSA/IHRtcEl0ZW1zW2luZGV4IC0gMV0uaWQgOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgc3RvcmVJdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZCA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGlkICAgICAgOiBrZXkuaWQsXG4gICAgICAgICAgICAgICAgICAgIGlzTGVhZiAgOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lICAgIDoga2V5Lm5lb0NsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50SWQ6IHBhcmVudElkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lLnN0b3JlLml0ZW1zID0gc3RvcmVJdGVtcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZWNvcmRcbiAgICAgKi9cbiAgICBvbkxlYWZJdGVtQ2xpY2socmVjb3JkKSB7XG4gICAgICAgIGxldCBtZSAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB2bm9kZUlkICA9IG1lLmdldEl0ZW1JZChyZWNvcmQuaWQpLFxuICAgICAgICAgICAgdmRvbSAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgdmRvbU5vZGUgPSBtZS5nZXRWZG9tQ2hpbGQodm5vZGVJZCk7XG5cbiAgICAgICAgTmVvQXJyYXlbcmVjb3JkLmNoZWNrZWQgPyAnYWRkJyA6ICdyZW1vdmUnXSh2ZG9tTm9kZS5jbHMsICd1bmNoZWNrZWQnKTtcblxuICAgICAgICByZWNvcmQuY2hlY2tlZCA9ICFyZWNvcmQuY2hlY2tlZDtcblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcblxuICAgICAgICBtZS5maXJlKCdyZWZyZXNoQ2xhc3NNZW1iZXJzJyk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhIaWVyYXJjaHlUcmVlTGlzdCk7XG5cbmV4cG9ydCB7SGllcmFyY2h5VHJlZUxpc3QgYXMgZGVmYXVsdH07IiwiaW1wb3J0IENvbnRhaW5lciAgICAgICAgICAgICAgIGZyb20gJy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9jb250YWluZXIvQmFzZS5tanMnO1xuaW1wb3J0IEhlYWRlckNvbXBvbmVudCAgICAgICAgIGZyb20gJy4vSGVhZGVyQ29tcG9uZW50Lm1qcyc7XG5pbXBvcnQgSGllcmFyY2h5VHJlZUxpc3QgICAgICAgZnJvbSAnLi9IaWVyYXJjaHlUcmVlTGlzdC5tanMnO1xuaW1wb3J0IE1haW5Db250YWluZXJDb250cm9sbGVyIGZyb20gJy4vTWFpbkNvbnRhaW5lckNvbnRyb2xsZXIubWpzJztcbmltcG9ydCBNZW1iZXJzTGlzdCAgICAgICAgICAgICBmcm9tICcuL01lbWJlcnNMaXN0Lm1qcyc7XG5pbXBvcnQgUGFuZWwgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbnRhaW5lci9QYW5lbC5tanMnO1xuaW1wb3J0IFNlYXJjaEZpZWxkICAgICAgICAgICAgIGZyb20gJy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9mb3JtL2ZpZWxkL1NlYXJjaC5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBEb2NzLmFwcC52aWV3LmNsYXNzZGV0YWlscy5NYWluQ29udGFpbmVyXG4gKiBAZXh0ZW5kcyBOZW8uY29udGFpbmVyLkJhc2VcbiAqL1xuY2xhc3MgTWFpbkNvbnRhaW5lciBleHRlbmRzIENvbnRhaW5lciB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J0RvY3MuYXBwLnZpZXcuY2xhc3NkZXRhaWxzLk1haW5Db250YWluZXInXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ0RvY3MuYXBwLnZpZXcuY2xhc3NkZXRhaWxzLk1haW5Db250YWluZXInLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0nY2xhc3NkZXRhaWxzLW1haW5jb250YWluZXInXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnY2xhc3NkZXRhaWxzLW1haW5jb250YWluZXInLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ25lby1kb2NzLWNsYXNzZGV0YWlscy1tYWluY29udGFpbmVyJywgJ25lby1jb250YWluZXInXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ25lby1kb2NzLWNsYXNzZGV0YWlscy1tYWluY29udGFpbmVyJywgJ25lby1jb250YWluZXInXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge05lby5jb250cm9sbGVyLkNvbXBvbmVudH0gY29udHJvbGxlcj1NYWluQ29udGFpbmVyQ29udHJvbGxlclxuICAgICAgICAgKi9cbiAgICAgICAgY29udHJvbGxlcjogTWFpbkNvbnRhaW5lckNvbnRyb2xsZXIsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IGxheW91dD17bnR5cGU6ICd2Ym94JywgYWxpZ246ICdzdHJldGNoJ31cbiAgICAgICAgICovXG4gICAgICAgIGxheW91dDoge250eXBlOiAndmJveCcsIGFsaWduOiAnc3RyZXRjaCd9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fG51bGx9IHN0cnVjdHVyZURhdGE9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgc3RydWN0dXJlRGF0YTogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0FycmF5fSBpdGVtcz1bLy8uLi5dXVxuICAgICAgICAgKi9cbiAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICBudHlwZSA6ICdjb250YWluZXInLFxuICAgICAgICAgICAgX2NscyAgOiBbJ25lby1kb2NzLWNsYXNzZGV0YWlscy1oZWFkZXJjb250YWluZXInXSxcbiAgICAgICAgICAgIGZsZXggIDogJzAgMSBhdXRvJyxcbiAgICAgICAgICAgIGxheW91dDoge250eXBlOiAnaGJveCcsIGFsaWduOiAnc3RyZXRjaCd9LFxuXG4gICAgICAgICAgICBpdGVtczogW3tcbiAgICAgICAgICAgICAgICBtb2R1bGUgOiBQYW5lbCxcbiAgICAgICAgICAgICAgICBjbHMgICAgOiBbJ25lby1kb2NzLWNsYXNzZGV0YWlscy1oZWFkZXJwYW5lbCcsICduZW8tcGFuZWwnLCAnbmVvLWNvbnRhaW5lciddLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGRvY2sgOiAnYm90dG9tJyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtib3JkZXJXaWR0aDogMH0sXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlciAgOiAnb25TY3JvbGxJbnRvVmlldycsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcmVuY2U6ICdzaG93Q29uZmlncycsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSAgICA6IHttYXJnaW5SaWdodDogJzVweCd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCAgICAgOiAnQ29uZmlncydcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlciAgOiAnb25TY3JvbGxJbnRvVmlldycsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcmVuY2U6ICdzaG93TWV0aG9kcycsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSAgICA6IHttYXJnaW5SaWdodDogJzVweCd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCAgICAgOiAnTWV0aG9kcydcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlciAgOiAnb25TY3JvbGxJbnRvVmlldycsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcmVuY2U6ICdzaG93RXZlbnRzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgICAgIDogJ0V2ZW50cydcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbnR5cGU6ICdjb21wb25lbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmxleCA6IDFcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlICAgICAgICAgOiBTZWFyY2hGaWVsZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycyAgICAgIDoge2NoYW5nZTogJ29uU2VhcmNoRmllbGRDaGFuZ2UnfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyVGV4dDogJ0ZpbHRlciBNZW1iZXJzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoICAgICAgICAgIDogMTYwLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbiAgICAgOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAnNXB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wIDogJzJweCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZCAgOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlciAgOiAnb25Ub2dnbGVNZW1iZXJzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb25DbHMgIDogJ2ZhIGZhLWNoZWNrLXNxdWFyZScsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcmVuY2U6ICdzaG93UHJpdmF0ZU1lbWJlcnMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUgICAgOiB7bWFyZ2luUmlnaHQ6ICc1cHgnfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgICAgIDogJ1ByaXZhdGUnLFxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkICA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyICA6ICdvblRvZ2dsZU1lbWJlcnMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbkNscyAgOiAnZmEgZmEtY2hlY2stc3F1YXJlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVyZW5jZTogJ3Nob3dQcm90ZWN0ZWRNZW1iZXJzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlICAgIDoge21hcmdpblJpZ2h0OiAnNXB4J30sXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ICAgICA6ICdQcm90ZWN0ZWQnLFxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkICA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyICA6ICdvblRvZ2dsZU1lbWJlcnMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbkNscyAgOiAnZmEgZmEtY2hlY2stc3F1YXJlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVyZW5jZTogJ3Nob3dTdGF0aWNNZW1iZXJzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgICAgIDogJ1N0YXRpYydcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9XSxcblxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbe1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGU6IEhlYWRlckNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgICAgZmxleCAgOiAxLFxuICAgICAgICAgICAgICAgICAgICByZWNvcmQ6ICdAY29uZmlnOnN0cnVjdHVyZURhdGEnXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBtb2R1bGUgICAgICAgOiBIaWVyYXJjaHlUcmVlTGlzdCxcbiAgICAgICAgICAgICAgICBmbGV4ICAgICAgICAgOiAnMCAwIGF1dG8nLFxuICAgICAgICAgICAgICAgIG1pbldpZHRoICAgICA6IDMzMCxcbiAgICAgICAgICAgICAgICBzdHJ1Y3R1cmVEYXRhOiAnQGNvbmZpZzpzdHJ1Y3R1cmVEYXRhJ1xuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbW9kdWxlICAgOiBNZW1iZXJzTGlzdCxcbiAgICAgICAgICAgIGZsZXggICAgIDogMSxcbiAgICAgICAgICAgIGxpc3RlbmVyczoge211dGF0ZUl0ZW1zOiAnb25NdXRhdGVJdGVtcyd9LFxuICAgICAgICAgICAgcmVmZXJlbmNlOiAnY2xhc3NkZXRhaWxzLW1lbWJlcnNsaXN0J1xuICAgICAgICB9XVxuICAgIH19XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKE1haW5Db250YWluZXIpO1xuXG5leHBvcnQge01haW5Db250YWluZXIgYXMgZGVmYXVsdH07IiwiaW1wb3J0IENvbXBvbmVudCAgICAgICAgICAgZnJvbSAnLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbnRyb2xsZXIvQ29tcG9uZW50Lm1qcyc7XG5pbXBvcnQgU291cmNlVmlld0NvbXBvbmVudCBmcm9tIFwiLi9Tb3VyY2VWaWV3Q29tcG9uZW50Lm1qc1wiO1xuXG4vKipcbiAqIEBjbGFzcyBEb2NzLmFwcC52aWV3Lk1haW5Db250YWluZXJDb250cm9sbGVyXG4gKiBAZXh0ZW5kcyBOZW8uY29udHJvbGxlci5Db21wb25lbnRcbiAqL1xuY2xhc3MgTWFpbkNvbnRhaW5lckNvbnRyb2xsZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdEb2NzLmFwcC52aWV3LmNsYXNzZGV0YWlscy5NYWluQ29udGFpbmVyQ29udHJvbGxlcidcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnRG9jcy5hcHAudmlldy5jbGFzc2RldGFpbHMuTWFpbkNvbnRhaW5lckNvbnRyb2xsZXInLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0nZG9jcy1jbGFzc2RldGFpbHMtbWFpbmNvbnRhaW5lci1jb250cm9sbGVyJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ2RvY3MtY2xhc3NkZXRhaWxzLW1haW5jb250YWluZXItY29udHJvbGxlcidcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uSGVhZGVyQ2xpY2soZGF0YSkge1xuICAgICAgICBsZXQgbWUgICAgICAgICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICByZWNvcmQgICAgICAgICAgICAgID0gbWUudmlldy5zdHJ1Y3R1cmVEYXRhLFxuICAgICAgICAgICAgbWFpbkNvbnRhaW5lciAgICAgICA9IG1lLnZpZXcudXAoJ21haW4tY29udGFpbmVyJyksXG4gICAgICAgICAgICBjb250ZW50VGFiQ29udGFpbmVyID0gbWFpbkNvbnRhaW5lci5kb3duKCdkb2NzLWNvbnRlbnQtdGFiY29udGFpbmVyJyksXG4gICAgICAgICAgICBjbGFzc05hbWUgICAgICAgICAgID0gKHJlY29yZC5wYXRoID8gcmVjb3JkLnBhdGggKyAnLicgOiAnJykgKyByZWNvcmQubmFtZTtcblxuICAgICAgICBjb250ZW50VGFiQ29udGFpbmVyLmFkZCh7XG4gICAgICAgICAgICBtb2R1bGUgICAgICAgOiBTb3VyY2VWaWV3Q29tcG9uZW50LFxuICAgICAgICAgICAgaWQgICAgICAgICAgIDogY2xhc3NOYW1lICsgJ19fc291cmNlJyxcbiAgICAgICAgICAgIHN0cnVjdHVyZURhdGE6IHJlY29yZCxcblxuICAgICAgICAgICAgdGFiQnV0dG9uQ29uZmlnOiB7XG4gICAgICAgICAgICAgICAgaWNvbkNsczogJ2ZhIGZhLWNvZGUnLFxuICAgICAgICAgICAgICAgIHRleHQgICA6IGNsYXNzTmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TmVvLmNvbGxlY3Rpb24uQmFzZX0gc3RvcmVcbiAgICAgKi9cbiAgICBvbk11dGF0ZUl0ZW1zKHN0b3JlKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgY291bnRDb25maWdzICAgID0gMCxcbiAgICAgICAgICAgIGNvdW50RXZlbnRzICAgICA9IDAsXG4gICAgICAgICAgICBjb3VudE1ldGhvZHMgICAgPSAwLFxuICAgICAgICAgICAgY291bnRQcml2YXRlcyAgID0gMCxcbiAgICAgICAgICAgIGNvdW50UHJvdGVjdGVkcyA9IDAsXG4gICAgICAgICAgICBjb3VudFN0YXRpY3MgICAgPSAwO1xuXG4gICAgICAgIHN0b3JlLml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5raW5kID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY291bnRNZXRob2RzKys7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0ua2luZCA9PT0gJ21lbWJlcicpIHtcbiAgICAgICAgICAgICAgICBjb3VudENvbmZpZ3MrKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY291bnRFdmVudHMrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGl0ZW0uYWNjZXNzID09PSAncHJpdmF0ZScpIHtcbiAgICAgICAgICAgICAgICBjb3VudFByaXZhdGVzKys7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uYWNjZXNzID09PSAncHJvdGVjdGVkJykge1xuICAgICAgICAgICAgICAgIGNvdW50UHJvdGVjdGVkcysrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXRlbS5zY29wZSA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgICAgICAgICBjb3VudFN0YXRpY3MrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUuZ2V0UmVmZXJlbmNlKCdzaG93Q29uZmlncycpICAgICAgICAgLnRleHQgPSAnQ29uZmlncyAnICAgKyBjb3VudENvbmZpZ3M7XG4gICAgICAgIG1lLmdldFJlZmVyZW5jZSgnc2hvd01ldGhvZHMnKSAgICAgICAgIC50ZXh0ID0gJ01ldGhvZHMgJyAgICsgY291bnRNZXRob2RzO1xuICAgICAgICBtZS5nZXRSZWZlcmVuY2UoJ3Nob3dFdmVudHMnKSAgICAgICAgICAudGV4dCA9ICdFdmVudHMgJyAgICArIGNvdW50RXZlbnRzO1xuICAgICAgICBtZS5nZXRSZWZlcmVuY2UoJ3Nob3dQcml2YXRlTWVtYmVycycpICAudGV4dCA9ICdQcml2YXRlICcgICArIGNvdW50UHJpdmF0ZXM7XG4gICAgICAgIG1lLmdldFJlZmVyZW5jZSgnc2hvd1Byb3RlY3RlZE1lbWJlcnMnKS50ZXh0ID0gJ1Byb3RlY3RlZCAnICsgY291bnRQcm90ZWN0ZWRzO1xuICAgICAgICBtZS5nZXRSZWZlcmVuY2UoJ3Nob3dTdGF0aWNNZW1iZXJzJykgICAudGV4dCA9ICdTdGF0aWMgJyAgICArIGNvdW50U3RhdGljcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25TY3JvbGxJbnRvVmlldyhkYXRhKSB7XG4gICAgICAgIGxldCBtZSAgICAgPSB0aGlzLFxuICAgICAgICAgICAgYnV0dG9uID0gTmVvLmdldENvbXBvbmVudChkYXRhLnRhcmdldC5pZCk7XG5cbiAgICAgICAgTmVvLm1haW4uYWRkb24uSGlnaGxpZ2h0SlMuc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICAgICAgdGV4dCAgIDogYnV0dG9uLnJlZmVyZW5jZS5zdWJzdHIoNCksXG4gICAgICAgICAgICB2bm9kZUlkOiBtZS52aWV3LnZkb20uaWRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uU2VhcmNoRmllbGRDaGFuZ2UoZGF0YSkge1xuICAgICAgICB0aGlzLmdldFJlZmVyZW5jZSgnY2xhc3NkZXRhaWxzLW1lbWJlcnNsaXN0JykuZmlsdGVyTWVtYmVyc1F1ZXJ5ID0gZGF0YS52YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25Ub2dnbGVNZW1iZXJzKGRhdGEpIHtcbiAgICAgICAgbGV0IGJ1dHRvbiAgICAgID0gTmVvLmdldENvbXBvbmVudChkYXRhLnRhcmdldC5pZCksXG4gICAgICAgICAgICBtZW1iZXJzTGlzdCA9IHRoaXMuZ2V0UmVmZXJlbmNlKCdjbGFzc2RldGFpbHMtbWVtYmVyc2xpc3QnKTtcblxuICAgICAgICBidXR0b24uaWNvbkNscyA9IGJ1dHRvbi5jaGVja2VkID8gJ2ZhIGZhLXNxdWFyZScgOiAnZmEgZmEtY2hlY2stc3F1YXJlJztcbiAgICAgICAgYnV0dG9uLmNoZWNrZWQgPSAhYnV0dG9uLmNoZWNrZWQ7XG5cbiAgICAgICAgbWVtYmVyc0xpc3RbYnV0dG9uLnJlZmVyZW5jZV0gPSBidXR0b24uY2hlY2tlZDtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKE1haW5Db250YWluZXJDb250cm9sbGVyKTtcblxuZXhwb3J0IHtNYWluQ29udGFpbmVyQ29udHJvbGxlciBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQmFzZSAgICAgICBmcm9tICcuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbGlzdC9CYXNlLm1qcyc7XG5pbXBvcnQgQ29sbGVjdGlvbiBmcm9tICcuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29sbGVjdGlvbi9CYXNlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIERvY3MuYXBwLnZpZXcuY2xhc3NkZXRhaWxzLk1lbWJlcnNMaXN0XG4gKiBAZXh0ZW5kcyBOZW8ubGlzdC5CYXNlXG4gKi9cbmNsYXNzIE1lbWJlcnNMaXN0IGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J0RvY3MuYXBwLnZpZXcuY2xhc3NkZXRhaWxzLk1lbWJlcnNMaXN0J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdEb2NzLmFwcC52aWV3LmNsYXNzZGV0YWlscy5NZW1iZXJzTGlzdCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSdjbGFzc2RldGFpbHMtbWVtYmVyc2xpc3QnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnY2xhc3NkZXRhaWxzLW1lbWJlcnNsaXN0JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBjbHM9Wydkb2NzLWNsYXNzaGllcmFyY2h5LW1lbWJlcnNsaXN0J11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWydkb2NzLWNsYXNzaGllcmFyY2h5LW1lbWJlcnNsaXN0J10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGZpbHRlck1lbWJlcnNRdWVyeV89JydcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgZmlsdGVyTWVtYmVyc1F1ZXJ5XzogJycsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBzaG93UHJpdmF0ZU1lbWJlcnNfPXRydWVcbiAgICAgICAgICovXG4gICAgICAgIHNob3dQcml2YXRlTWVtYmVyc186IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBzaG93UHJvdGVjdGVkTWVtYmVyc189dHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgc2hvd1Byb3RlY3RlZE1lbWJlcnNfOiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc2hvd1N0YXRpY01lbWJlcnNfPXRydWVcbiAgICAgICAgICovXG4gICAgICAgIHNob3dTdGF0aWNNZW1iZXJzXzogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge05lby5jb2xsZWN0aW9uLkJhc2V9IHN0b3JlPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHN0b3JlOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IHRhcmdldENsYXNzTmFtZT1udWxsXG4gICAgICAgICAqL1xuICAgICAgICB0YXJnZXRDbGFzc05hbWU6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IF92ZG9tPXtjbjogW119XG4gICAgICAgICAqL1xuICAgICAgICBfdmRvbToge1xuICAgICAgICAgICAgY246IFtdXG4gICAgICAgIH1cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkNvbnN0cnVjdGVkKCkge1xuICAgICAgICBzdXBlci5vbkNvbnN0cnVjdGVkKCk7XG5cbiAgICAgICAgbGV0IG1lICAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgaGllcmFyY2h5VmlldyA9IG1lLnVwKCdjbGFzc2RldGFpbHMtbWFpbmNvbnRhaW5lcicpLmRvd24oJ2NsYXNzaGllcmFyY2h5LXRyZWVsaXN0JyksXG4gICAgICAgICAgICBtYWluU3RvcmUgICAgID0gbWUudXAoJ21haW4tY29udGFpbmVyJykuc3RvcmU7XG5cbiAgICAgICAgaGllcmFyY2h5Vmlldy5vbih7XG4gICAgICAgICAgICByZWZyZXNoQ2xhc3NNZW1iZXJzOiBtZS5vblJlZnJlc2hDbGFzc01lbWJlcnMsXG4gICAgICAgICAgICBzY29wZSAgICAgICAgICAgICAgOiBtZVxuICAgICAgICB9KTtcblxuICAgICAgICBtZS5zdG9yZSA9IE5lby5jcmVhdGUoQ29sbGVjdGlvbiwge1xuICAgICAgICAgICAgZmlsdGVyTW9kZTogJ2FkdmFuY2VkJyxcbiAgICAgICAgICAgIHNvdXJjZUlkICA6IG1haW5TdG9yZS5pZFxuICAgICAgICB9KTtcblxuICAgICAgICBtZS5vblJlZnJlc2hDbGFzc01lbWJlcnMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGZpbHRlck1lbWJlcnNRdWVyeSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRGaWx0ZXJNZW1iZXJzUXVlcnkodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm9uUmVmcmVzaENsYXNzTWVtYmVycygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBzaG93UHJvdGVjdGVkTWVtYmVycyBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFNob3dQcm90ZWN0ZWRNZW1iZXJzKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAob2xkVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5vblJlZnJlc2hDbGFzc01lbWJlcnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgc2hvd1ByaXZhdGVNZW1iZXJzIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0U2hvd1ByaXZhdGVNZW1iZXJzKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAob2xkVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5vblJlZnJlc2hDbGFzc01lbWJlcnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgc2hvd1N0YXRpY01lbWJlcnMgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRTaG93U3RhdGljTWVtYmVycyh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25SZWZyZXNoQ2xhc3NNZW1iZXJzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TmVvLmNvbGxlY3Rpb24uQmFzZX0gc3RvcmVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmRvbVxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IHZkb21cbiAgICAgKi9cbiAgICBhcHBseUNvbmZpZ3NIZWFkZXIoc3RvcmUsIHZkb20pIHtcbiAgICAgICAgaWYgKHN0b3JlLml0ZW1zWzBdICYmIHN0b3JlLml0ZW1zWzBdLmtpbmQgPT09ICdtZW1iZXInKSB7XG4gICAgICAgICAgICB2ZG9tLmNuLnB1c2goe1xuICAgICAgICAgICAgICAgIC8vIHNjcm9sbGluZyBwbGFjZWhvbGRlclxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGNscyAgICAgIDogWyduZW8tZG9jcy1tZW1iZXJsaXN0LWdyb3VwLWhlYWRlciddLFxuICAgICAgICAgICAgICAgIGlubmVySFRNTDogJ0NvbmZpZ3MnLFxuICAgICAgICAgICAgICAgICdkYXRhLWxpc3QtaGVhZGVyJzogJ0NvbmZpZ3MnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW1cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgKiBAcGFyYW0ge05lby5jb2xsZWN0aW9uLkJhc2V9IHN0b3JlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZkb21cbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSB2ZG9tXG4gICAgICovXG4gICAgYXBwbHlFdmVudHNIZWFkZXIoaXRlbSwgaW5kZXgsIHN0b3JlLCB2ZG9tKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGl0ZW0ua2luZCA9PT0gJ2V2ZW50JyAmJlxuICAgICAgICAgICAgc3RvcmUuaXRlbXNbaW5kZXggLTFdICYmXG4gICAgICAgICAgICBzdG9yZS5pdGVtc1tpbmRleCAtMV0ua2luZCAhPT0gJ2V2ZW50J1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHZkb20uY24ucHVzaCh7XG4gICAgICAgICAgICAgICAgLy8gc2Nyb2xsaW5nIHBsYWNlaG9sZGVyXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgY2xzICAgICAgOiBbJ25lby1kb2NzLW1lbWJlcmxpc3QtZ3JvdXAtaGVhZGVyJ10sXG4gICAgICAgICAgICAgICAgaW5uZXJIVE1MOiAnRXZlbnRzJyxcbiAgICAgICAgICAgICAgICBzdHlsZSAgICA6IHt6SW5kZXg6IDN9LFxuICAgICAgICAgICAgICAgICdkYXRhLWxpc3QtaGVhZGVyJzogJ0V2ZW50cydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAqIEBwYXJhbSB7TmVvLmNvbGxlY3Rpb24uQmFzZX0gc3RvcmVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmRvbVxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IHZkb21cbiAgICAgKi9cbiAgICBhcHBseU1ldGhvZHNIZWFkZXIoaXRlbSwgaW5kZXgsIHN0b3JlLCB2ZG9tKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGl0ZW0ua2luZCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICFzdG9yZS5pdGVtc1tpbmRleCAtMV0gfHwgKFxuICAgICAgICAgICAgICAgICAgICBzdG9yZS5pdGVtc1tpbmRleCAtMV0gJiZcbiAgICAgICAgICAgICAgICAgICAgc3RvcmUuaXRlbXNbaW5kZXggLTFdLmtpbmQgIT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgICAgdmRvbS5jbi5wdXNoKHtcbiAgICAgICAgICAgICAgICAvLyBzY3JvbGxpbmcgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBjbHMgICAgICA6IFsnbmVvLWRvY3MtbWVtYmVybGlzdC1ncm91cC1oZWFkZXInXSxcbiAgICAgICAgICAgICAgICBpbm5lckhUTUw6ICdNZXRob2RzJyxcbiAgICAgICAgICAgICAgICBzdHlsZSAgICA6IHt6SW5kZXg6IDJ9LFxuICAgICAgICAgICAgICAgICdkYXRhLWxpc3QtaGVhZGVyJzogJ01ldGhvZHMnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgY3JlYXRlSXRlbXMoKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgZmlsdGVyTWVtYmVyc1JlZ0V4ID0gbmV3IFJlZ0V4cChtZS5maWx0ZXJNZW1iZXJzUXVlcnkgfHwgJycsICdnaScpLFxuICAgICAgICAgICAgaGFzRXhhbXBsZXMgICAgICAgID0gZmFsc2UsXG4gICAgICAgICAgICB0YXJnZXRDbGFzc05hbWUgICAgPSBtZS50YXJnZXRDbGFzc05hbWUsXG4gICAgICAgICAgICB2ZG9tICAgICAgICAgICAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgaGVhZGVyVGV4dCwgaXRlbUF0dHJpYnV0ZXMsIGl0ZW1Db25maWcsIHBhdGg7XG5cbiAgICAgICAgdmRvbS5jbiA9IFtdO1xuICAgICAgICB2ZG9tID0gbWUuYXBwbHlDb25maWdzSGVhZGVyKG1lLnN0b3JlLCB2ZG9tKTtcblxuICAgICAgICBtZS5zdG9yZS5pdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgdmRvbSA9IG1lLmFwcGx5RXZlbnRzSGVhZGVyKCBpdGVtLCBpbmRleCwgbWUuc3RvcmUsIHZkb20pO1xuICAgICAgICAgICAgdmRvbSA9IG1lLmFwcGx5TWV0aG9kc0hlYWRlcihpdGVtLCBpbmRleCwgbWUuc3RvcmUsIHZkb20pO1xuXG4gICAgICAgICAgICBpdGVtQXR0cmlidXRlcyA9IFtdO1xuXG4gICAgICAgICAgICBpZiAoaXRlbS5uYW1lLnN1YnN0cigtMSkgPT09ICdfJykge1xuICAgICAgICAgICAgICAgIGl0ZW0ubmFtZSA9IGl0ZW0ubmFtZS5zbGljZSgwLCAtMSkgO1xuICAgICAgICAgICAgICAgIGl0ZW1BdHRyaWJ1dGVzLnB1c2goJ0dTJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpdGVtLm5lb0NsYXNzTmFtZSAhPT0gdGFyZ2V0Q2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlbUF0dHJpYnV0ZXMucHVzaCgnaW5oZXJpdGVkJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpdGVtLmFjY2VzcyA9PT0gJ3ByaXZhdGUnIHx8IGl0ZW0uYWNjZXNzID09PSAncHJvdGVjdGVkJykge1xuICAgICAgICAgICAgICAgIGl0ZW1BdHRyaWJ1dGVzLnB1c2goaXRlbS5hY2Nlc3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXRlbS5zY29wZSA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgICAgICAgICBpdGVtQXR0cmlidXRlcy5wdXNoKCdzdGF0aWMnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaGVhZGVyVGV4dCA9IGl0ZW0ubmFtZTtcblxuICAgICAgICAgICAgaWYgKG1lLmZpbHRlck1lbWJlcnNRdWVyeSAhPT0gJycgJiYgbWUuZmlsdGVyTWVtYmVyc1F1ZXJ5ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyVGV4dCA9IGhlYWRlclRleHQucmVwbGFjZShmaWx0ZXJNZW1iZXJzUmVnRXgsIG1hdGNoID0+IGA8c3BhbiBjbGFzcz1cIm5lby1oaWdobGlnaHQtc2VhcmNoXCI+JHttYXRjaH08L3NwYW4+YCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNvbmZpZ3NcbiAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgJiYgaXRlbS50eXBlLm5hbWVzKSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyVGV4dCArPSAoJzogeycgKyBNZW1iZXJzTGlzdC5lc2NhcGVIdG1sKGl0ZW0udHlwZS5uYW1lcy5qb2luKCd8JykpICsgJ30nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoJ2RlZmF1bHR2YWx1ZScpKSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyVGV4dCArPSAoJyA9ICcgKyBpdGVtLmRlZmF1bHR2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG1ldGhvZHNcbiAgICAgICAgICAgIGlmIChpdGVtLnBhcmFtcyAmJiBpdGVtLmtpbmQgIT09ICdldmVudCcpIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJUZXh0ICs9ICgnKCcgKyBpdGVtLnBhcmFtcy5yZWR1Y2UoKHJlc3VsdCwgcGFyYW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtLm5hbWUuaW5kZXhPZignLicpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtLm9wdGlvbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goJ1snICsgcGFyYW0ubmFtZSArICddJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHBhcmFtLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSwgW10pLmpvaW4oJywgJykgKyAnKScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXRlbS5yZXR1cm5zKSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyVGV4dCArPSAoJyDihpIgeycgKyBNZW1iZXJzTGlzdC5lc2NhcGVIdG1sKGl0ZW0ucmV0dXJuc1swXS50eXBlLm5hbWVzLmpvaW4oJ3wnKSArICd9JykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYXRoID0gaXRlbS5tZXRhLnBhdGg7XG5cbiAgICAgICAgICAgIGlmIChwYXRoLmluY2x1ZGVzKCcvbmVvLm1qcy8nKSkge1xuICAgICAgICAgICAgICAgIHBhdGggPSBwYXRoLnN1YnN0cihwYXRoLmluZGV4T2YoJy9uZW8ubWpzLycpICsgOSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhdGguaW5jbHVkZXMoJy9uZW9tanMvJykpIHtcbiAgICAgICAgICAgICAgICBwYXRoID0gcGF0aC5zdWJzdHIocGF0aC5pbmRleE9mKCcvbmVvbWpzLycpICArIDgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXRoLmluY2x1ZGVzKCcvbmVvLycpKSB7XG4gICAgICAgICAgICAgICAgcGF0aCA9IHBhdGguc3Vic3RyKHBhdGguaW5kZXhPZignL25lby8nKSAgICAgKyA1KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaXRlbUNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICBjbHM6IFsnbmVvLWxpc3QtaXRlbSddLFxuICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ25lby1saXN0LWl0ZW0taGVhZGVyLWNvbnRhaW5lciddLFxuICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbHMgICAgICA6IFsnbmVvLWxpc3QtaXRlbS1oZWFkZXInXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVySFRNTDogaGVhZGVyVGV4dFxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xzICAgICAgOiBbJ25lby1saXN0LWl0ZW0taGVhZGVyJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lckhUTUw6IGl0ZW1BdHRyaWJ1dGVzLmpvaW4oJywgJylcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGNsczogJ25lby1kb2NzLXZpZXctc291cmNlLWxpbmstY29udGFpbmVyJyxcbiAgICAgICAgICAgICAgICAgICAgY24gOlt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWcgICAgICA6ICdhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNscyAgICAgIDogWyduZW8tZG9jcy12aWV3LXNvdXJjZS1saW5rJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBocmVmICAgICA6ICcjdmlld1NvdXJjZT0nICsgaXRlbS5uZW9DbGFzc05hbWUgKyAnJmxpbmU9JyArIGl0ZW0ubWV0YS5saW5lbm8sXG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lckhUTUw6ICdTb3VyY2U6ICcgKyBwYXRoICsgJy8nICsgaXRlbS5tZXRhLmZpbGVuYW1lICsgJyAoTGluZSAnICsgaXRlbS5tZXRhLmxpbmVubyArICcpJ1xuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MOiBpdGVtLmRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChpdGVtLmV4YW1wbGVzICYmIGl0ZW0uZXhhbXBsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGhhc0V4YW1wbGVzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGl0ZW0uZXhhbXBsZXMuZm9yRWFjaChleGFtcGxlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUNvbmZpZy5jbi5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ3ByZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2NvZGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IGV4YW1wbGVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXRlbS5wYXJhbXMgJiYgaXRlbS5wYXJhbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGl0ZW1Db25maWcuY24ucHVzaChNZW1iZXJzTGlzdC5jcmVhdGVQYXJhbWV0ZXJzVGFibGUoaXRlbS5wYXJhbXMpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGl0ZW0ucmV0dXJucyAmJiBpdGVtLmtpbmQgIT09ICdldmVudCcpIHtcbiAgICAgICAgICAgICAgICBpdGVtQ29uZmlnLmNuLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpbm5lckhUTUw6ICdSZXR1cm5zIHsnICsgTWVtYmVyc0xpc3QuZXNjYXBlSHRtbChpdGVtLnJldHVybnNbMF0udHlwZS5uYW1lcy5qb2luKCd8JykgKyAnfSAnKSArIChpdGVtLnJldHVybnNbMF0uZGVzY3JpcHRpb24gfHwgJycpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZkb20uY24ucHVzaChpdGVtQ29uZmlnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG5cbiAgICAgICAgaWYgKGhhc0V4YW1wbGVzKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBOZW8ubWFpbi5hZGRvbi5IaWdobGlnaHRKUy5zeW50YXhIaWdobGlnaHRJbml0KCk7XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXG4gICAgICogQHJldHVybnMge09iamVjdH0gdmRvbVxuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGVQYXJhbWV0ZXJzVGFibGUocGFyYW1zKSB7XG4gICAgICAgIGxldCBoYXNEZWZhdWx0VmFsdWVzICA9IGZhbHNlLFxuICAgICAgICAgICAgaGFzT3B0aW9uYWxQYXJhbXMgPSBmYWxzZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLCBuZXN0ZWRQYXJhbXMsIHBhcmFtVGFibGU7XG5cbiAgICAgICAgcGFyYW1zLmZvckVhY2gocGFyYW0gPT4ge1xuICAgICAgICAgICAgaWYgKHBhcmFtLmhhc093blByb3BlcnR5KCdkZWZhdWx0dmFsdWUnKSkge1xuICAgICAgICAgICAgICAgIGhhc0RlZmF1bHRWYWx1ZXMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGFyYW0uaGFzT3duUHJvcGVydHkoJ29wdGlvbmFsJykpIHtcbiAgICAgICAgICAgICAgICBoYXNPcHRpb25hbFBhcmFtcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBhcmFtVGFibGUgPSB7XG4gICAgICAgICAgICB0YWc6ICd0YWJsZScsXG4gICAgICAgICAgICBjbHM6ICdkb2NzLXBhcmFtLXRhYmxlJyxcbiAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICB0YWc6ICd0aGVhZCcsXG4gICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICB0YWcgICAgICA6ICd0aCcsXG4gICAgICAgICAgICAgICAgICAgIGlubmVySFRNTDogJ05hbWUnXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0YWcgICAgICA6ICd0aCcsXG4gICAgICAgICAgICAgICAgICAgIGlubmVySFRNTDogJ1R5cGUnXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0YWcgICAgICA6ICd0aCcsXG4gICAgICAgICAgICAgICAgICAgIGlubmVySFRNTDogJ0Rlc2NyaXB0aW9uJ1xuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9XVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChoYXNEZWZhdWx0VmFsdWVzKSB7XG4gICAgICAgICAgICBwYXJhbVRhYmxlLmNuWzBdLmNuLnNwbGljZSgyLCAwLCB7XG4gICAgICAgICAgICAgICAgdGFnICAgICAgOiAndGgnLFxuICAgICAgICAgICAgICAgIGlubmVySFRNTDogJ0RlZmF1bHQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNPcHRpb25hbFBhcmFtcykge1xuICAgICAgICAgICAgcGFyYW1UYWJsZS5jblswXS5jbi5zcGxpY2UoMiwgMCwge1xuICAgICAgICAgICAgICAgIHRhZyAgICAgIDogJ3RoJyxcbiAgICAgICAgICAgICAgICBpbm5lckhUTUw6ICdPcHRpb25hbCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyYW1zLmZvckVhY2gocGFyYW0gPT4ge1xuICAgICAgICAgICAgaWYgKHBhcmFtLm5hbWUuaW5kZXhPZignLicpIDwgMCkgeyAvLyBpZ25vcmUgbmVzdGVkIHBhcmFtc1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICB0YWcgICAgICA6ICd0ZCcsXG4gICAgICAgICAgICAgICAgICAgIGlubmVySFRNTDogcGFyYW0uZGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIG5lc3RlZFBhcmFtcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgcGFyYW1zLmZvckVhY2gocCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwLm5hbWUuaW5kZXhPZihwYXJhbS5uYW1lICsgJy4nKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcCA9IE5lby5jbG9uZShwLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcC5uYW1lID0gcC5uYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwLm5hbWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHAubmFtZSA9IHAubmFtZS5qb2luKCcuJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG5lc3RlZFBhcmFtcy5wdXNoKHApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAobmVzdGVkUGFyYW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICd0ZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MOiBkZXNjcmlwdGlvbi5pbm5lckhUTUxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBNZW1iZXJzTGlzdC5jcmVhdGVQYXJhbWV0ZXJzVGFibGUobmVzdGVkUGFyYW1zKV1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHBhcmFtVGFibGUuY24ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRhZzogJ3RyJyxcbiAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFnICAgICAgOiAndGQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MOiBwYXJhbS5uYW1lXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZyAgICAgIDogJ3RkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVySFRNTDogcGFyYW0udHlwZSA/IE1lbWJlcnNMaXN0LmVzY2FwZUh0bWwocGFyYW0udHlwZS5uYW1lcy5qb2luKCcgfCAnKSkgOiAnJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbl1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChoYXNEZWZhdWx0VmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtVGFibGUuY25bcGFyYW1UYWJsZS5jbi5sZW5ndGggLSAxXS5jbi5zcGxpY2UoMiwgMCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFnICAgICAgOiAndGQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MOiBwYXJhbS5kZWZhdWx0dmFsdWUgPT09IHVuZGVmaW5lZCA/ICcnIDogKHBhcmFtLmRlZmF1bHR2YWx1ZSArICcnKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaGFzT3B0aW9uYWxQYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1UYWJsZS5jbltwYXJhbVRhYmxlLmNuLmxlbmd0aCAtIDFdLmNuLnNwbGljZSgyLCAwLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWcgICAgICA6ICd0ZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lckhUTUw6IHBhcmFtLm9wdGlvbmFsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHBhcmFtVGFibGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVwbGFjZXMgJzwnICYgJz4nXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICBzdGF0aWMgZXNjYXBlSHRtbCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoLz4vZywgJyZndDsnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGZpbHRlckFuZFNvcnRJdGVtcygpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGhpZXJhcmNoeU1hcCAgID0ge30sXG4gICAgICAgICAgICBoaWVyYXJjaHlTdG9yZSA9IG1lLnVwKCdjbGFzc2RldGFpbHMtbWFpbmNvbnRhaW5lcicpLmRvd24oJ2NsYXNzaGllcmFyY2h5LXRyZWVsaXN0Jykuc3RvcmUsXG4gICAgICAgICAgICBoaWVyYXJjaHlJdGVtcyA9IGhpZXJhcmNoeVN0b3JlLml0ZW1zLFxuICAgICAgICAgICAgaSAgICAgICAgICAgICAgPSAwLFxuICAgICAgICAgICAgdG1wSXRlbXMgICAgICAgPSBbXSxcbiAgICAgICAgICAgIGZpbHRlcnMsIHRtcEl0ZW1zTGVuO1xuXG4gICAgICAgIGhpZXJhcmNoeUl0ZW1zLmZvckVhY2goY2xzID0+IHtcbiAgICAgICAgICAgIGlmIChjbHMuY2hlY2tlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRtcEl0ZW1zLnB1c2goY2xzLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0bXBJdGVtc0xlbiA9IHRtcEl0ZW1zLmxlbmd0aDtcblxuICAgICAgICBmb3IgKDsgaSA8IHRtcEl0ZW1zTGVuOyBpKyspIHtcbiAgICAgICAgICAgIGhpZXJhcmNoeU1hcFt0bXBJdGVtc1tpXV0gPSBpO1xuICAgICAgICB9XG5cbiAgICAgICAgbWUudGFyZ2V0Q2xhc3NOYW1lID0gaGllcmFyY2h5SXRlbXNbaGllcmFyY2h5SXRlbXMubGVuZ3RoIC0xXS5uYW1lO1xuXG4gICAgICAgIGZpbHRlcnMgPSBbe1xuICAgICAgICAgICAgb3BlcmF0b3I6ICdpbmNsdWRlZCcsXG4gICAgICAgICAgICBwcm9wZXJ0eTogJ25lb0NsYXNzTmFtZScsXG4gICAgICAgICAgICB2YWx1ZSAgIDogdG1wSXRlbXNcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgb3BlcmF0b3I6ICchPT0nLFxuICAgICAgICAgICAgcHJvcGVydHk6ICdraW5kJyxcbiAgICAgICAgICAgIHZhbHVlICAgOiAnY2xhc3MnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnIT09JyxcbiAgICAgICAgICAgIHByb3BlcnR5OiAna2luZCcsXG4gICAgICAgICAgICB2YWx1ZSAgIDogJ2NvbnN0YW50JyAvLyB0b2RvP1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBvcGVyYXRvcjogJyE9PScsXG4gICAgICAgICAgICBwcm9wZXJ0eTogJ2tpbmQnLFxuICAgICAgICAgICAgdmFsdWUgICA6ICdtb2R1bGUnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnaXNVbmRlZmluZWQnLFxuICAgICAgICAgICAgcHJvcGVydHk6ICdpbmhlcml0ZWQnXG4gICAgICAgIH1dO1xuXG4gICAgICAgIGlmICghbWUuc2hvd1ByaXZhdGVNZW1iZXJzKSB7XG4gICAgICAgICAgICBmaWx0ZXJzLnB1c2goe1xuICAgICAgICAgICAgICAgIG9wZXJhdG9yOiAnIT09JyxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ2FjY2VzcycsXG4gICAgICAgICAgICAgICAgdmFsdWUgICA6ICdwcml2YXRlJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW1lLnNob3dQcm90ZWN0ZWRNZW1iZXJzKSB7XG4gICAgICAgICAgICBmaWx0ZXJzLnB1c2goe1xuICAgICAgICAgICAgICAgIG9wZXJhdG9yOiAnIT09JyxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ2FjY2VzcycsXG4gICAgICAgICAgICAgICAgdmFsdWUgICA6ICdwcm90ZWN0ZWQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbWUuc2hvd1N0YXRpY01lbWJlcnMpIHtcbiAgICAgICAgICAgIGZpbHRlcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgb3BlcmF0b3I6ICchPT0nLFxuICAgICAgICAgICAgICAgIHByb3BlcnR5OiAnc2NvcGUnLFxuICAgICAgICAgICAgICAgIHZhbHVlICAgOiAnc3RhdGljJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWUuZmlsdGVyTWVtYmVyc1F1ZXJ5ICE9PSAnJyAmJiBtZS5maWx0ZXJNZW1iZXJzUXVlcnkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGZpbHRlcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgb3BlcmF0b3I6ICdsaWtlJyxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ25hbWUnLFxuICAgICAgICAgICAgICAgIHZhbHVlICAgOiBtZS5maWx0ZXJNZW1iZXJzUXVlcnlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZmlsdGVycy5wdXNoKHtcbiAgICAgICAgICAgIHNjb3BlICAgOiBtZSxcbiAgICAgICAgICAgIGZpbHRlckJ5OiBmdW5jdGlvbihpdGVtLCBmaWx0ZXJlZEl0ZW1zLCBhbGxJdGVtcykge1xuICAgICAgICAgICAgICAgIGxldCBtZSAgICAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRDbGFzc05hbWUgPSBtZS50YXJnZXRDbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkSXRlbSwgaSwgbGVuO1xuXG4gICAgICAgICAgICAgICAgLy8gYWx3YXlzIGV4Y2x1ZGUgaW5oZXJpdGVkIGNsYXNzTmFtZSAmIG50eXBlIGNvbmZpZ3NcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5uYW1lID09PSAnbnR5cGUnICYmIGl0ZW0ubmVvQ2xhc3NOYW1lICE9PSB0YXJnZXRDbGFzc05hbWVcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubmVvQ2xhc3NOYW1lICE9PSB0YXJnZXRDbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaSAgID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gZmlsdGVyZWRJdGVtcy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRJdGVtID0gZmlsdGVyZWRJdGVtc1tpXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQgIT09IGZpbHRlcmVkSXRlbS5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5uYW1lICA9PT0gZmlsdGVyZWRJdGVtLm5hbWUgICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc2NvcGUgPT09IGZpbHRlcmVkSXRlbS5zY29wZSAmJiAvLyBzdGF0aWMgVlMgaW5zdGFuY2UgbWVtYmVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWVyYXJjaHlNYXBbaXRlbS5uZW9DbGFzc05hbWVdIDwgaGllcmFyY2h5TWFwW2ZpbHRlcmVkSXRlbS5uZW9DbGFzc05hbWVdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUuc3RvcmUuZmlsdGVycyA9IGZpbHRlcnM7XG5cbiAgICAgICAgbWUuc3RvcmUuc29ydGVycyA9IFt7XG4gICAgICAgICAgICAvLyBDb25maWdzID0+IE1ldGhvZHMgPT4gRXZlbnRzXG4gICAgICAgICAgICBzb3J0Qnk6IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgICAgICBhID0gYS5raW5kID09PSAnbWVtYmVyJyA/IDAgOiBhLmtpbmQgPT09ICdmdW5jdGlvbicgPyAxIDogMjtcbiAgICAgICAgICAgICAgICBiID0gYi5raW5kID09PSAnbWVtYmVyJyA/IDAgOiBiLmtpbmQgPT09ICdmdW5jdGlvbicgPyAxIDogMjtcblxuICAgICAgICAgICAgICAgIHJldHVybiBhID4gYiA/IDEgOiBhIDwgYiA/IC0xIDogMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGlyZWN0aW9uOiAnQVNDJyxcbiAgICAgICAgICAgIHByb3BlcnR5IDogJ25hbWUnXG4gICAgICAgIH1dO1xuXG4gICAgICAgIG1lLmZpcmUoJ211dGF0ZUl0ZW1zJywgbWUuc3RvcmUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRvIG5vdCBjYWxsIGNyZWF0ZUl0ZW1zKCkgYXQgdGhpcyBwb2ludCA9PiBvblJlZnJlc2hDbGFzc01lbWJlcnMoKVxuICAgICAqL1xuICAgIG9uU3RvcmVGaWx0ZXIoKSB7fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvblJlZnJlc2hDbGFzc01lbWJlcnMoKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyQW5kU29ydEl0ZW1zKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlSXRlbXMoKTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKE1lbWJlcnNMaXN0KTtcblxuZXhwb3J0IHtNZW1iZXJzTGlzdCBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9jb21wb25lbnQvQmFzZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBEb2NzLmFwcC52aWV3LmNsYXNzZGV0YWlscy5Tb3VyY2VWaWV3Q29tcG9uZW50XG4gKiBAZXh0ZW5kcyBOZW8uY29tcG9uZW50LkJhc2VcbiAqL1xuY2xhc3MgU291cmNlVmlld0NvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J0RvY3MuYXBwLnZpZXcuY2xhc3NkZXRhaWxzLlNvdXJjZVZpZXdDb21wb25lbnQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ0RvY3MuYXBwLnZpZXcuY2xhc3NkZXRhaWxzLlNvdXJjZVZpZXdDb21wb25lbnQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0nY2xhc3NkZXRhaWxzLXNvdXJjZXZpZXdjb21wb25lbnQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnY2xhc3NkZXRhaWxzLXNvdXJjZXZpZXdjb21wb25lbnQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gaXNIaWdobGlnaHRlZF89ZmFsc2VcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgaXNIaWdobGlnaHRlZF86IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfG51bGx9IGxpbmVfPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbGluZV86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8bnVsbH0gcHJldmlvdXNMaW5lPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgcHJldmlvdXNMaW5lOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fG51bGx9IHN0cnVjdHVyZURhdGE9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBzdHJ1Y3R1cmVEYXRhOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBzdHlsZT0ge292ZXJmbG93OiAnYXV0byd9XG4gICAgICAgICAqL1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgb3ZlcmZsb3c6ICdhdXRvJ1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBfdmRvbT17Y246IFsvLy4uLl19XG4gICAgICAgICAqL1xuICAgICAgICBfdmRvbToge1xuICAgICAgICAgICAgY246IFt7XG4gICAgICAgICAgICAgICAgdGFnOiAncHJlJyxcbiAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRhZyAgOiAnY29kZScsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnamF2YXNjcmlwdCdcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICB1cmwgID0gJy4uLy4uLycgKyBtZS5zdHJ1Y3R1cmVEYXRhLnNyY1BhdGg7XG5cbiAgICAgICAgTmVvLlhoci5wcm9taXNlUmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6IHVybFxuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIGVuc3VyZSB3ZSBhcmUgbm90IG1vdW50aW5nXG4gICAgICAgICAgICAgICAgbWUuYXBwbHlTb3VyY2VDb2RlKGRhdGEucmVzcG9uc2UpO1xuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBpc0hpZ2hsaWdodGVkIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0SXNIaWdobGlnaHRlZCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBOZW8ubWFpbi5hZGRvbi5IaWdobGlnaHRKUy5zeW50YXhIaWdobGlnaHRMaW5lKHtcbiAgICAgICAgICAgICAgICAgICAgYWRkTGluZSAgIDogbWUubGluZSxcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTGluZTogbWUucHJldmlvdXNMaW5lLFxuICAgICAgICAgICAgICAgICAgICB2bm9kZUlkICAgOiBtZS52ZG9tLmNuWzBdLmlkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGxpbmUgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0TGluZSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgIG1lLnByZXZpb3VzTGluZSA9IG9sZFZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1lLmlzSGlnaGxpZ2h0ZWQpIHtcbiAgICAgICAgICAgIG1lLmFmdGVyU2V0SXNIaWdobGlnaHRlZCh0cnVlLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgYXBwbHlTb3VyY2VDb2RlKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSA9IG1lLnZkb20sXG4gICAgICAgICAgICBub2RlID0gdmRvbS5jblswXTsgLy8gcHJlIHRhZ1xuXG4gICAgICAgIG5vZGUuY25bMF0uaW5uZXJIVE1MID0gZGF0YTsgLy8gY29kZSB0YWdcbiAgICAgICAgbWUudmRvbSA9IHZkb207XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBtZS5zeW50YXhIaWdobGlnaHQobm9kZS5pZCk7XG4gICAgICAgIH0sIDUwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2bm9kZUlkXG4gICAgICovXG4gICAgc3ludGF4SGlnaGxpZ2h0KHZub2RlSWQpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcyxcbiAgICAgICAgICAgIGlkO1xuXG4gICAgICAgIGlmIChtZS52bm9kZSkge1xuICAgICAgICAgICAgTmVvLm1haW4uYWRkb24uSGlnaGxpZ2h0SlMuc3ludGF4SGlnaGxpZ2h0KHtcbiAgICAgICAgICAgICAgICB2bm9kZUlkOiBtZS52ZG9tLmNuWzBdLmlkXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBtZS5pc0hpZ2hsaWdodGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWQgPSBtZS5vbignbW91bnRlZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbWUudW4oJ21vdW50ZWQnLCBpZCk7XG4gICAgICAgICAgICAgICAgICAgIG1lLnN5bnRheEhpZ2hsaWdodCh2bm9kZUlkKTtcbiAgICAgICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoU291cmNlVmlld0NvbXBvbmVudCk7XG5cbmV4cG9ydCB7U291cmNlVmlld0NvbXBvbmVudCBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9jb21wb25lbnQvQmFzZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBEb2NzLmFwcC52aWV3LmNsYXNzZGV0YWlscy5UdXRvcmlhbENvbXBvbmVudFxuICogQGV4dGVuZHMgTmVvLmNvbXBvbmVudC5CYXNlXG4gKi9cbmNsYXNzIFR1dG9yaWFsQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nRG9jcy5hcHAudmlldy5jbGFzc2RldGFpbHMuVHV0b3JpYWxDb21wb25lbnQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ0RvY3MuYXBwLnZpZXcuY2xhc3NkZXRhaWxzLlR1dG9yaWFsQ29tcG9uZW50JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J2NsYXNzZGV0YWlscy10dXRvcmlhbGNvbXBvbmVudCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICdjbGFzc2RldGFpbHMtdHV0b3JpYWxjb21wb25lbnQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ25lby1jbGFzc2RldGFpbHMtdHV0b3JpYWxjb21wb25lbnQnXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ25lby1jbGFzc2RldGFpbHMtdHV0b3JpYWxjb21wb25lbnQnXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBmaWxlTmFtZT1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBmaWxlTmFtZTogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBmaWxlVHlwZT1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBmaWxlVHlwZTogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gc3R5bGU9e292ZXJmbG93OiAnYXV0byd9XG4gICAgICAgICAqL1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgb3ZlcmZsb3c6ICdhdXRvJ1xuICAgICAgICB9XG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIGxldCBtZSAgICAgPSB0aGlzLFxuICAgICAgICAgICAgaXNKc29uID0gbWUuZmlsZVR5cGUgPT09ICdqc29uJyxcbiAgICAgICAgICAgIHVybCAgICA9ICcuLi8uLi9kb2NzL3R1dG9yaWFscy8nICsgbWUuZmlsZU5hbWU7XG5cbiAgICAgICAgTmVvLlhocltpc0pzb24gPyAncHJvbWlzZUpzb24nIDogJ3Byb21pc2VSZXF1ZXN0J10oe1xuICAgICAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyBlbnN1cmUgd2UgYXJlIG5vdCBtb3VudGluZ1xuICAgICAgICAgICAgICAgIG1lLmFwcGx5U291cmNlQ29kZShpc0pzb24gPyBkYXRhLmpzb24gOiBkYXRhLnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBhcHBseVNvdXJjZUNvZGUoZGF0YSkge1xuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tID0gbWUudmRvbTtcblxuICAgICAgICBpZiAobWUuZmlsZVR5cGUgPT09ICdqc29uJykge1xuICAgICAgICAgICAgdmRvbS5jbiA9IGRhdGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2ZG9tLmlubmVySFRNTCA9IGRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIFR1dG9yaWFsQ29tcG9uZW50LnN5bnRheEhpZ2hsaWdodCgpO1xuICAgICAgICB9LCA1MCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBzdGF0aWMgc3ludGF4SGlnaGxpZ2h0KCkge1xuICAgICAgICBOZW8ubWFpbi5hZGRvbi5IaWdobGlnaHRKUy5zeW50YXhIaWdobGlnaHRJbml0KCk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhUdXRvcmlhbENvbXBvbmVudCk7XG5cbmV4cG9ydCB7VHV0b3JpYWxDb21wb25lbnQgYXMgZGVmYXVsdH07Il0sInNvdXJjZVJvb3QiOiIifQ==