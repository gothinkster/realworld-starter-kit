(self["webpackChunkneo_mjs_realworld_example_app"] = self["webpackChunkneo_mjs_realworld_example_app"] || []).push([["apps_realworld_app_mjs"],{

/***/ "./apps/realworld/api/Article.mjs":
/*!****************************************!*\
  !*** ./apps/realworld/api/Article.mjs ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./apps/realworld/api/Base.mjs");


/**
 * @class RealWorld.api.Article
 * @extends RealWorld.api.Base
 */
class Article extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.api.Article'
         * @protected
         */
        className: 'RealWorld.api.Article',
        /**
         * @member {String} resource='/articles'
         */
        resource: '/articles'
    }}

    /**
     *
     * @param {String} slug
     * @param {Number} id
     */
    deleteComment(slug, id) {
        return this.delete({
            url: `/articles/${slug}/comments/${id}`
        });
    }

    /**
     *
     * @param {String} slug
     */
    getComments(slug) {
        return this.get({
            url: `/articles/${slug}/comments`
        });
    }

    /**
     *
     * @param {String} slug
     * @param {Object} opts
     */
    postComment(slug, opts) {
        return this.post({
            ...opts,
            url: `/articles/${slug}/comments`
        });
    }
}

Neo.applyClassConfig(Article);

let instance = Neo.create(Article);

Neo.applyToGlobalNs(instance);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (instance);

/***/ }),

/***/ "./apps/realworld/api/Base.mjs":
/*!*************************************!*\
  !*** ./apps/realworld/api/Base.mjs ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Base)
/* harmony export */ });
/* harmony import */ var _config_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.mjs */ "./apps/realworld/api/config.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_core_Base_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");



/**
 * @class RealWorld.api.Base
 * @extends Neo.core.Base
 */
class Base extends _node_modules_neo_mjs_src_core_Base_mjs__WEBPACK_IMPORTED_MODULE_1__.default {
    static getStaticConfig() {return {
        /**
         * True automatically applies the core/Observable.mjs mixin
         * @member {Boolean} observable=true
         * @static
         */
        observable: true,
        /**
         * @member {String|null} token=null
         * @protected
         * @static
         */
        token: null
    }}

    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.api.Base'
         * @protected
         */
        className: 'RealWorld.api.Base',
        /**
         * @member {Object|null} defaultHeaders=null
         */
        defaultHeaders: null,
        /**
         * @member {Boolean} isReady=false
         */
        isReady: false,
        /**
         * @member {String} resource=''
         */
        resource: '/'
    }}

    /**
     *
     */
    onConstructed() {
        super.onConstructed();
        this.afterConstructed();
    }

    /**
     * The class extensions Article, Favorite, Profile, Tag, User are singletons
     * and get directly imported into the MainContainer(Controller)
     * => their creation happens before the app is constructed
     * => Neo.apps['RealWorld'] does most likely not exist yet.
     */
    afterConstructed() {
        let me = this;

        if (!Neo.apps || !Neo.apps['RealWorld']) {
            setTimeout(() => {
                me.afterConstructed();
            }, 100);
        } else {
            if (Neo.apps['RealWorld'].rendered) {
                me.onAppRendered();
            } else {
                Neo.apps['RealWorld'].on('render',me.onAppRendered, me);
            }
        }
    }

    /**
     *
     */
    onAppRendered() {
        const me = this;

        if (Base.token) {
            me.onReady(Base.token);
        } else if (!Base.initialTokenRequestSent) {
            Base.initialTokenRequestSent = true;

            Neo.main.addon.LocalStorage.readLocalStorageItem({
                key: _config_mjs__WEBPACK_IMPORTED_MODULE_0__.LOCAL_STORAGE_KEY
            }).then(data => {
                const token = data.value;

                if (token) {
                    Base.token = token;
                }

                me.onReady(token);
                Base.isReady = true;
                Base.fire('ready', token);
            });
        } else {
            Base.on({
                ready: me.onReady,
                scope: me
            });
        }
    }

    /**
     *
     * @param {Object} [opts={}]
     * @param {Object} [opts.data]
     * @param {Object} [opts.params]
     * @param {String} [opts.resource]
     * @param {String} [opts.slug]
     * @param {String} [opts.url]
     * @returns {String} url
     */
    createUrl(opts) {
        if (opts.url) {
            return _config_mjs__WEBPACK_IMPORTED_MODULE_0__.API_URL + opts.url;
        }

        return _config_mjs__WEBPACK_IMPORTED_MODULE_0__.API_URL + (opts.resource || this.resource) + (opts.slug ? '/' + opts.slug : '');
    }

    /**
     *
     * @param {Object} [opts={}]
     * @param {Object} [opts.data]
     * @param {Object} [opts.params]
     * @param {String} [opts.resource]
     * @param {String} [opts.slug]
     * @returns {Promise<any>}
     */
    delete(opts={}) {
        // console.log('delete', opts);

        return Neo.Xhr.promiseJson({
            data   : opts.data,
            method : 'DELETE',
            params : opts.params,
            url    : this.createUrl(opts),

            headers: {
                ...this.defaultHeaders || {},
                'Content-Type'    : 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).catch(error => {
            console.log('RealWorld.api.Base:get()', error);
        });
    }

    /**
     *
     * @param {Object} [opts={}]
     * @param {Object} [opts.data]
     * @param {Object} [opts.params]
     * @param {String} [opts.resource]
     * @param {String} [opts.slug]
     * @returns {Promise<any>}
     */
    get(opts={}) {
        // console.log('get', opts);

        return Neo.Xhr.promiseJson({
            data   : opts.data,
            method : 'GET',
            params : opts.params,
            url    : this.createUrl(opts),

            headers: {
                ...this.defaultHeaders || {},
                'Content-Type'    : 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).catch(error => {
            console.log('RealWorld.api.Base:get()', error);
        });
    }

    /**
     * Placeholder method which gets triggered once the token is fetched from the local storage
     * @param {String|null} token
     */
    onReady(token) {
        let me = this;

        if (token) {
            me.defaultHeaders = me.defaultHeaders || {};
            me.defaultHeaders['Authorization'] = 'Token ' + token;
        }

        me.isReady = true;
        me.fire('ready', token);
    }

    /**
     *
     * @param {Object} [opts={}]
     * @param {Object} [opts.data]
     * @param {Object} [opts.params]
     * @param {String} [opts.resource]
     * @param {String} [opts.slug]
     * @returns {Promise<any>}
     */
    post(opts={}) {
        // console.log('post', opts);

        const params = opts.params;
        delete opts.params;

        return Neo.Xhr.promiseJson({
            data   : opts.data,
            method : 'POST',
            params : params,
            url    : this.createUrl(opts),

            headers: {
                ...this.defaultHeaders || {},
                'Content-Type'    : 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).catch(error => {
            console.log('RealWorld.api.Base:post()', error);
        });
    }

    /**
     *
     * @param {Object} [opts={}]
     * @param {Object} [opts.data]
     * @param {Object} [opts.params]
     * @param {String} [opts.resource]
     * @param {String} [opts.slug]
     * @returns {Promise<any>}
     */
    put(opts={}) {
        // console.log('put', opts);

        const params = opts.params;
        delete opts.params;

        return Neo.Xhr.promiseJson({
            data   : opts.data,
            method : 'PUT',
            params : params,
            url    : this.createUrl(opts),

            headers: {
                ...this.defaultHeaders || {},
                'Content-Type'    : 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).catch(error => {
            console.log('RealWorld.api.Base:put()', error);
        });
    }
}

Base.initialTokenRequestSent = false;
Base.token                   = null;

Neo.applyClassConfig(Base);




/***/ }),

/***/ "./apps/realworld/api/Favorite.mjs":
/*!*****************************************!*\
  !*** ./apps/realworld/api/Favorite.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./apps/realworld/api/Base.mjs");


/**
 * @class RealWorld.api.Favorite
 * @extends RealWorld.api.Base
 */
class Favorite extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.api.Favorite'
         * @protected
         */
        className: 'RealWorld.api.Favorite'
    }}

    /**
     *
     * @param {String} slug
     */
    add(slug) {
        return this.post({
            url: `/articles/${slug}/favorite`
        });
    }

    /**
     *
     * @param {String} slug
     */
    remove(slug) {
        return this.delete({
            url: `/articles/${slug}/favorite`
        });
    }
}

Neo.applyClassConfig(Favorite);

let instance = Neo.create(Favorite);

Neo.applyToGlobalNs(instance);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (instance);

/***/ }),

/***/ "./apps/realworld/api/Profile.mjs":
/*!****************************************!*\
  !*** ./apps/realworld/api/Profile.mjs ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./apps/realworld/api/Base.mjs");


/**
 * @class RealWorld.api.Profile
 * @extends RealWorld.api.Base
 */
class Profile extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.api.Profile'
         * @protected
         */
        className: 'RealWorld.api.Profile',
        /**
         * @member {String} resource='/profiles'
         */
        resource: '/profiles'
    }}

    /**
     *
     * @param {String} slug
     */
    follow(slug) {
        return this.post({
            url: `/profiles/${slug}/follow`
        });
    }

    /**
     *
     * @param {String} slug
     */
    unfollow(slug) {
        return this.delete({
            url: `/profiles/${slug}/follow`
        });
    }
}

Neo.applyClassConfig(Profile);

let instance = Neo.create(Profile);

Neo.applyToGlobalNs(instance);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (instance);

/***/ }),

/***/ "./apps/realworld/api/Tag.mjs":
/*!************************************!*\
  !*** ./apps/realworld/api/Tag.mjs ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./apps/realworld/api/Base.mjs");


/**
 * @class RealWorld.api.Tag
 * @extends RealWorld.api.Base
 */
class Tag extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.api.Tag'
         * @protected
         */
        className: 'RealWorld.api.Tag',
        /**
         * @member {String} resource='/tags'
         */
        resource: '/tags'
    }}
}

Neo.applyClassConfig(Tag);

let instance = Neo.create(Tag);

Neo.applyToGlobalNs(instance);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (instance);

/***/ }),

/***/ "./apps/realworld/api/User.mjs":
/*!*************************************!*\
  !*** ./apps/realworld/api/User.mjs ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./apps/realworld/api/Base.mjs");


/**
 * @class RealWorld.api.User
 * @extends RealWorld.api.Base
 */
class User extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.api.User'
         * @protected
         */
        className: 'RealWorld.api.User',
        /**
         * @member {String} resource='/tags'
         */
        resource: '/users'
    }}
}

Neo.applyClassConfig(User);

let instance = Neo.create(User);

Neo.applyToGlobalNs(instance);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (instance);

/***/ }),

/***/ "./apps/realworld/api/config.mjs":
/*!***************************************!*\
  !*** ./apps/realworld/api/config.mjs ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "API_URL": () => (/* binding */ API_URL),
/* harmony export */   "LOCAL_STORAGE_KEY": () => (/* binding */ LOCAL_STORAGE_KEY),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const API_URL           = 'https://conduit.productionready.io/api';
const LOCAL_STORAGE_KEY = 'neoRealWorldToken';

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({API_URL, LOCAL_STORAGE_KEY});

/***/ }),

/***/ "./apps/realworld/app.mjs":
/*!********************************!*\
  !*** ./apps/realworld/app.mjs ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "onStart": () => (/* binding */ onStart)
/* harmony export */ });
/* harmony import */ var _view_MainContainer_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/MainContainer.mjs */ "./apps/realworld/view/MainContainer.mjs");


const onStart = () => Neo.app({
    mainView: _view_MainContainer_mjs__WEBPACK_IMPORTED_MODULE_0__.default,
    name    : 'RealWorld'
});



/***/ }),

/***/ "./apps/realworld/view/FooterComponent.mjs":
/*!*************************************************!*\
  !*** ./apps/realworld/view/FooterComponent.mjs ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FooterComponent)
/* harmony export */ });
/* harmony import */ var _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");


/**
 * @class RealWorld.view.FooterComponent
 * @extends Neo.component.Base
 */
class FooterComponent extends _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.view.FooterComponent'
         * @protected
         */
        className: 'RealWorld.view.FooterComponent',
        /**
         * @member {Object} _vdom
         */
        _vdom:
            {tag: 'footer', cn: [
                {cls: ['container'], cn: [
                    {tag: 'a', cls: ['logo-font'], href: '#/', html: 'conduit'},
                    {tag: 'span', cls: 'attribution', html: 'An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.'}
                ]}
            ]}
    }}
}

Neo.applyClassConfig(FooterComponent);




/***/ }),

/***/ "./apps/realworld/view/HeaderComponent.mjs":
/*!*************************************************!*\
  !*** ./apps/realworld/view/HeaderComponent.mjs ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HeaderComponent)
/* harmony export */ });
/* harmony import */ var _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");



/**
 * @class RealWorld.view.HeaderComponent
 * @extends Neo.component.Base
 */
class HeaderComponent extends _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.view.HeaderComponent'
         * @protected
         */
        className: 'RealWorld.view.HeaderComponent',
        /**
         * @member {String} activeItem_='home'
         */
        activeItem_: 'home',
        /**
         * @member {String[]} cls=['navbar', 'navbar-light']
         */
        cls: ['navbar', 'navbar-light'],
        /**
         * @member {Boolean} loggedIn_=false
         */
        loggedIn_: false,
        /**
         * @member {String|null} userImage_=null
         */
        userImage_:null,
        /**
         * @member {String|null} userName_=null
         */
        userName_: null,
        /**
         * @member {Object} _vdom
         */
        _vdom:
            {tag: 'nav', cls: ['navbar navbar-light'], cn: [
                {cls: ['container'], cn: [
                    {tag: 'a',  cls: ['navbar-brand'], href: '#/', html: 'conduit'},
                    {tag: 'ul', cls: ['nav navbar-nav', 'pull-xs-right'], cn: [
                        {tag: 'li', cls: ['nav-item'], cn: [
                            {tag: 'a', cls: ['nav-link'], href: '#/', html: 'Home'}
                        ]},
                        {tag: 'li', cls: ['nav-item'], removeDom: true, cn: [
                            {tag: 'a', cls: ['nav-link'], href: '#/editor', cn: [
                                {tag: 'i', cls: 'ion-compose'},
                                {vtype: 'text', html: '&nbsp;New Article'}
                            ]}
                        ]},
                        {tag: 'li', cls: ['nav-item'], removeDom: true, cn: [
                            {tag: 'a', cls: ['nav-link'], href: '#/settings', cn: [
                                {tag: 'i', cls: 'ion-gear-a'},
                                {vtype: 'text', html: '&nbsp;Settings'}
                            ]}
                        ]},
                        {tag: 'li', cls: ['nav-item'], removeDom: true, cn: [
                            {tag: 'a', cls : ['nav-link'], href: '#/profile', cn: [
                                {tag: 'img', cls: ['user-pic']},
                                {vtype: 'text', html: '&nbsp;Profile'}
                            ]}
                        ]},
                        {tag: 'li', cls: ['nav-item'], cn: [
                            {tag : 'a', cls : ['nav-link'], href: '#/login', html: 'Sign in'}
                        ]},
                        {tag: 'li', cls: ['nav-item'], cn: [
                            {tag: 'a', cls : ['nav-link'], href: '#/register', html: 'Sign up'}
                        ]}
                    ]}
                ]}
            ]}
    }}

    /**
     * Triggered after the activeItem config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetActiveItem(value, oldValue) {
        let me   = this,
            vdom = me.vdom;

        if (oldValue) {
            _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__.default.remove(vdom.cn[0].cn[1].cn[me.getActiveIndex(oldValue)].cn[0].cls, 'active');
        }

        _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__.default.add(vdom.cn[0].cn[1].cn[me.getActiveIndex(value)].cn[0].cls, 'active');

        me.vdom = vdom;
    }

    /**
     * Triggered after the loggedIn config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetLoggedIn(value, oldValue) {
        if (Neo.isBoolean(oldValue)) {
            let me   = this,
                vdom = me.vdom,
                list = vdom.cn[0].cn[1];

            list.cn[1].removeDom = !value; // editor
            list.cn[2].removeDom = !value; // settings
            list.cn[3].removeDom = !value; // profile
            list.cn[4].removeDom = value;  // login
            list.cn[5].removeDom = value;  // register

            me.vdom = vdom;
        }
    }

    /**
     * Triggered after the userImage config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetUserImage(value, oldValue) {
        let me          = this,
            vdom        = me.vdom,
            profileLink = vdom.cn[0].cn[1].cn[3].cn[0];

        profileLink.cn[0].removeDom = !value;
        profileLink.cn[0].src       = value;

        me.vdom = vdom;
    }

    /**
     * Triggered after the userName config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetUserName(value, oldValue) {
        if (value) {
            let me          = this,
                vdom        = me.vdom,
                profileLink = vdom.cn[0].cn[1].cn[3].cn[0];

            profileLink.href = '#/profile/' + value;
            profileLink.cn[1].html = '&nbsp;' + value;

            me.vdom = vdom;
        }
    }

    /**
     *
     * @param {String} value
     * @returns {Number} The target index
     */
    getActiveIndex(value) {
        switch (value) {
            case '/settings': return 2;
            case '/login'   : return 4;
            case '/register': return 5;
        }

        if (value.includes('/editor')) {
            return 1;
        }

        if (value.includes('/profile')) {
            return 3;
        }

        // default to home
        return 0;
    }
}

Neo.applyClassConfig(HeaderComponent);




/***/ }),

/***/ "./apps/realworld/view/MainContainer.mjs":
/*!***********************************************!*\
  !*** ./apps/realworld/view/MainContainer.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainContainer)
/* harmony export */ });
/* harmony import */ var _FooterComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FooterComponent.mjs */ "./apps/realworld/view/FooterComponent.mjs");
/* harmony import */ var _HeaderComponent_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HeaderComponent.mjs */ "./apps/realworld/view/HeaderComponent.mjs");
/* harmony import */ var _MainContainerController_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MainContainerController.mjs */ "./apps/realworld/view/MainContainerController.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_container_Viewport_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/container/Viewport.mjs */ "./node_modules/neo.mjs/src/container/Viewport.mjs");





/**
 * @class RealWorld.view.MainContainer
 * @extends Neo.container.Viewport
 */
class MainContainer extends _node_modules_neo_mjs_src_container_Viewport_mjs__WEBPACK_IMPORTED_MODULE_3__.default {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.view.MainContainer'
         * @protected
         */
        className: 'RealWorld.view.MainContainer',
        /**
         * @member {Boolean} autoMount=true
         */
        autoMount: true,
        /**
         * @member {Array} cls=[]
         */
        cls: [],
        /**
         * @member {Neo.controller.Component} controller=MainContainerController
         */
        controller: _MainContainerController_mjs__WEBPACK_IMPORTED_MODULE_2__.default,
        /**
         * @member {Object} layout={ntype: 'vbox'}
         */
        layout: {ntype: 'base'},

        items: [{
            module   : _HeaderComponent_mjs__WEBPACK_IMPORTED_MODULE_1__.default,
            reference: 'header'
        }, {
            module: _FooterComponent_mjs__WEBPACK_IMPORTED_MODULE_0__.default
        }]
    }}
}

Neo.applyClassConfig(MainContainer);




/***/ }),

/***/ "./apps/realworld/view/MainContainerController.mjs":
/*!*********************************************************!*\
  !*** ./apps/realworld/view/MainContainerController.mjs ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainContainerController)
/* harmony export */ });
/* harmony import */ var _api_Article_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/Article.mjs */ "./apps/realworld/api/Article.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_controller_Component_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/controller/Component.mjs */ "./node_modules/neo.mjs/src/controller/Component.mjs");
/* harmony import */ var _api_Favorite_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/Favorite.mjs */ "./apps/realworld/api/Favorite.mjs");
/* harmony import */ var _api_config_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api/config.mjs */ "./apps/realworld/api/config.mjs");
/* harmony import */ var _api_Profile_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api/Profile.mjs */ "./apps/realworld/api/Profile.mjs");
/* harmony import */ var _api_Tag_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../api/Tag.mjs */ "./apps/realworld/api/Tag.mjs");
/* harmony import */ var _api_User_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../api/User.mjs */ "./apps/realworld/api/User.mjs");








/**
 * @class RealWorld.view.MainContainerController
 * @extends Neo.controller.Component
 */
class MainContainerController extends _node_modules_neo_mjs_src_controller_Component_mjs__WEBPACK_IMPORTED_MODULE_1__.default {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.view.MainContainerController'
         * @protected
         */
        className: 'RealWorld.view.MainContainerController',
        /**
         * @member {RealWorld.view.article.Component|null} articleComponent=null
         * @protected
         */
        articleComponent: null,
        /**
         * @member {Number} articlesOffset_=0
         */
        articlesOffset_: 0,
        /**
         * @member {RealWorld.view.article.CreateComponent|null} createComponent=null
         * @protected
         */
        createComponent: null,
        /**
         * Stores the current user data after logging in
         * @member {Object|null} currentUser_=null
         * @protected
         */
        currentUser_: null,
        /**
         * @member {String|null} hashString=null
         */
        hashString: null,
        /**
         * @member {RealWorld.view.HomeComponent|null} homeComponent=null
         * @protected
         */
        homeComponent: null,
        /**
         * @member {RealWorld.view.user.ProfileComponent|null} profileComponent=null
         * @protected
         */
        profileComponent: null,
        /**
         * @member {RealWorld.view.user.SettingsComponent|null} settingsComponent=null
         * @protected
         */
        settingsComponent: null,
        /**
         * @member {RealWorld.view.user.SignUpComponent|null} signUpComponent=null
         * @protected
         */
        signUpComponent: null
    }}

    /**
     * Triggered after the articlesOffset config got changed
     * @param {Object} value
     * @param {Object} oldValue
     * @protected
     */
    afterSetArticlesOffset(value, oldValue) {
        // ignore the initial config setter call
        if (Neo.isNumber(oldValue)) {
            this.getArticles();
        }
    }

    /**
     * Triggered after the currentUser config got changed
     * @param {Object} value
     * @param {Object} oldValue
     * @protected
     */
    afterSetCurrentUser(value, oldValue) {
        if (typeof oldValue === 'object') {
            this.getReference('header').set({
                loggedIn : !!value,
                userImage: value ? value.image    : null,
                userName : value ? value.username : null
            }).then(() => {
                // todo: test to ensure the initial markup is rendered
                setTimeout(() => {
                    this.fire('afterSetCurrentUser', value);
                }, 200);
            });
        }
    }

    /**
     *
     * @param {String} slug
     */
    deleteArticle(slug) {
        _api_Article_mjs__WEBPACK_IMPORTED_MODULE_0__.default.delete({slug: slug}).then(data => {
            Neo.Main.setRoute({
                value: '/'
            });
        });
    }

    /**
     *
     * @param {Number} id
     * @returns {Promise<any>}
     */
    deleteComment(id) {
        let me   = this,
            slug = me.hashString.split('/').pop();

        return _api_Article_mjs__WEBPACK_IMPORTED_MODULE_0__.default.deleteComment(slug, id).then(data => {
            me.getComments(slug);
        });
    }

    /**
     *
     * @param {String} slug
     * @param {Boolean} favorited
     */
    favoriteArticle(slug, favorited) {
        return _api_Favorite_mjs__WEBPACK_IMPORTED_MODULE_2__.default[favorited ? 'add' : 'remove'](slug);
    }

    /**
     *
     * @param {String} slug
     * @param {Boolean} follow
     */
    followUser(slug, follow) {
        return _api_Profile_mjs__WEBPACK_IMPORTED_MODULE_4__.default[follow ? 'follow' : 'unfollow'](slug);
    }

    /**
     * Article details: get an article providing a user slug
     * @param {String} slug
     * @returns {Promise<any>}
     */
    getArticle(slug) {
        return _api_Article_mjs__WEBPACK_IMPORTED_MODULE_0__.default.get({
            slug: slug
        });
    }

    /**
     *
     * @param {Object} [params={}]
     * @param {Object} [opts={}]
     * @returns {Promise<any>}
     */
    getArticles(params={}, opts={}) {
        return _api_Article_mjs__WEBPACK_IMPORTED_MODULE_0__.default.get({
            params: {
                limit : 10,
                offset: this.articlesOffset,
                ...params
            },
            ...opts
        });
    }

    /**
     *
     * @param {String} slug
     */
    getComments(slug) {
        _api_Article_mjs__WEBPACK_IMPORTED_MODULE_0__.default.getComments(slug).then(data => {
            this.articleComponent.comments = data.json.comments;
        });
    }

    /**
     *
     * @param {String} token
     */
    getCurrentUser(token) {
        if (token) {
            _api_User_mjs__WEBPACK_IMPORTED_MODULE_6__.default.get({
                resource: '/user' // edge case, user instead of users
            }).then(data => {
                this.currentUser = data.json.user;
            });
        }
    }

    /**
     *
     * @param {String} slug
     */
    getProfile(slug) {
        const me = this;

        _api_Profile_mjs__WEBPACK_IMPORTED_MODULE_4__.default.get({
            slug: slug
        }).then(data => {
            me.profileComponent.update({
                ...data.json.profile,
                myProfile: data.json.profile.username === (me.currentUser && me.currentUser.username)
            });
        });
    }

    /**
     *
     */
    getTags() {
        _api_Tag_mjs__WEBPACK_IMPORTED_MODULE_5__.default.get().then(data => {
            this.homeComponent.tagList.tags = data.json.tags;
        });
    }

    /**
     * @param {Object} userData
     */
    login(userData) {
        this.currentUser = userData;

        Neo.main.addon.LocalStorage.createLocalStorageItem({
            key  : _api_config_mjs__WEBPACK_IMPORTED_MODULE_3__.LOCAL_STORAGE_KEY,
            value: userData.token
        }).then(() => {
            // wait until the header vdom-update is done to avoid showing sign up & sign in twice
            setTimeout(() => {
                Neo.Main.setRoute({
                    value: '/'
                });
            }, 50);
        });
    }

    /**
     *
     */
    logout() {
        this.currentUser = null;

        Neo.main.addon.LocalStorage.destroyLocalStorageItem({
            key: _api_config_mjs__WEBPACK_IMPORTED_MODULE_3__.LOCAL_STORAGE_KEY
        }).then(() => {
            // wait until the header vdom-update is done to avoid showing sign up & sign in twice
            setTimeout(() => {
                Neo.Main.setRoute({
                    value: '/'
                });
            }, 50);
        });
    }

    /**
     *
     */
    onComponentConstructed() {
        super.onComponentConstructed();

        // default route => home
        if (!Neo.config.hash) {
            this.onHashChange({
                appNames  : ['RealWorld'],
                hash      : {'/': ''},
                hashString: '/'
            }, null);
        }
    }

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        _api_User_mjs__WEBPACK_IMPORTED_MODULE_6__.default.on('ready', this.getCurrentUser, this);
    }

    /**
     *
     * @param {Object} value
     * @param {Object} oldValue
     */
    async onHashChange(value, oldValue) {
        let me         = this,
            component  = me.component,
            hash       = value.hash,
            hashString = value.hashString,
            mode, newView, opts, slug;

        if (!component.isConstructed) { // the initial hash change gets triggered before the vnode got back from the vdom worker (using autoMount)
            component.on('constructed', () => {
                me.onHashChange(value, oldValue);
            });
        } else {
            me.hashString = hashString;

            // adjust the active header link
            component.items[0].activeItem = Object.keys(hash)[0];

                 if (hashString === '/')               {opts = ['homeComponent',     () => __webpack_require__.e(/*! import() */ "apps_realworld_view_HomeComponent_mjs").then(__webpack_require__.bind(__webpack_require__, /*! ./HomeComponent.mjs */ "./apps/realworld/view/HomeComponent.mjs")),           'home']}
            else if (hashString.includes('/article/')) {opts = ['articleComponent',  () => __webpack_require__.e(/*! import() */ "apps_realworld_view_article_Component_mjs").then(__webpack_require__.bind(__webpack_require__, /*! ./article/Component.mjs */ "./apps/realworld/view/article/Component.mjs")),       'article']}
            else if (hashString.includes('/editor'))   {opts = ['createComponent',   () => __webpack_require__.e(/*! import() */ "apps_realworld_view_article_CreateComponent_mjs").then(__webpack_require__.bind(__webpack_require__, /*! ./article/CreateComponent.mjs */ "./apps/realworld/view/article/CreateComponent.mjs")), 'editor']}
            else if (hashString.includes('/profile/')) {opts = ['profileComponent',  () => __webpack_require__.e(/*! import() */ "apps_realworld_view_user_ProfileComponent_mjs").then(__webpack_require__.bind(__webpack_require__, /*! ./user/ProfileComponent.mjs */ "./apps/realworld/view/user/ProfileComponent.mjs")),   'profile']}
            else if (hash.hasOwnProperty('/login'))    {opts = ['signUpComponent',   () => __webpack_require__.e(/*! import() */ "apps_realworld_view_user_SignUpComponent_mjs").then(__webpack_require__.bind(__webpack_require__, /*! ./user/SignUpComponent.mjs */ "./apps/realworld/view/user/SignUpComponent.mjs")),    'signup']; mode = 'signin';}
            else if (hash.hasOwnProperty('/register')) {opts = ['signUpComponent',   () => __webpack_require__.e(/*! import() */ "apps_realworld_view_user_SignUpComponent_mjs").then(__webpack_require__.bind(__webpack_require__, /*! ./user/SignUpComponent.mjs */ "./apps/realworld/view/user/SignUpComponent.mjs")),    'signup']; mode = 'signup';}
            else if (hash.hasOwnProperty('/settings')) {opts = ['settingsComponent', () => __webpack_require__.e(/*! import() */ "apps_realworld_view_user_SettingsComponent_mjs").then(__webpack_require__.bind(__webpack_require__, /*! ./user/SettingsComponent.mjs */ "./apps/realworld/view/user/SettingsComponent.mjs")),  'settings']}

            if (opts) {
                newView = await me.promiseView(...opts);

                if (mode) {
                    newView.mode = mode;
                }
            }

            if (!(oldValue && oldValue.hash && (
                oldValue.hash.hasOwnProperty('/login')    && hash.hasOwnProperty('/register') ||
                oldValue.hash.hasOwnProperty('/register') && hash.hasOwnProperty('/login')))
            ) {
                if (component.items.length > 2) {
                    component.removeAt(1, false, true);
                }

                if (newView) {
                    component.insert(1, newView);
                }
            }

            switch (newView.reference) {
                case 'article':
                    slug = hashString.split('/').pop();

                    me.getArticle(slug).then(data => {
                        let article = data.json.article,
                            body    = article.body;

                        delete article.body;

                        me.articleComponent.set(article).then(() => {
                            me.articleComponent.body = body;
                        });
                    });

                    me.getComments(slug);
                    break;
                case 'editor':
                    slug = hashString.split('/').pop();
                    if (slug !== 'editor') {
                        me.getArticle(slug).then(data => {
                            const article = data.json.article;

                            me.createComponent.set({
                                body       : article.body,
                                description: article.description,
                                slug       : article.slug,
                                tagList    : article.tagList,
                                title      : article.title
                            });
                        });
                    } else {
                        me.createComponent.resetForm();
                    }
                    break;
                case 'home':
                    me.homeComponent.loggedIn = !!me.currentUser;
                    me.homeComponent.getArticles();
                    me.getTags();
                    break;
                case 'profile':
                    me.getProfile(hashString.split('/').pop()); // pass the slug
                    break;
                case 'settings':
                    if (me.currentUser) {
                        setTimeout(() => { // added a short delay to not interfere with the mainContainer update
                            me.settingsComponent.onCurrentUserChange(me.currentUser);
                        }, 50);
                    }
                    break;
                case 'signup':
                    newView.errors = [];
                    break;
            }
        }
    }

    /**
     *
     * @param {Object} [opts)
     * @returns {Promise<any>}
     */
    postComment(opts={}) {
        let me   = this,
            slug = me.hashString.split('/').pop();

        return _api_Article_mjs__WEBPACK_IMPORTED_MODULE_0__.default.postComment(slug, opts).then(data => {
            me.getComments(slug);
        });
    }

    /**
     *
     * @param {String} key
     * @param {Function} module
     * @param {String} reference
     * @returns {Neo.component.Base} The matching view instance
     */
    async promiseView(key, module, reference) {
        let me = this;

        if (!me[key]) {
            module = await module();

            me[key] = Neo.create({
                module   : module.default,
                parentId : me.component.id,
                reference: reference
            });
        }

        return me[key];
    }

    /**
     *
     * @param {Object} opts
     * @returns {Promise<any>}
     */
    saveUser(opts) {
        return _api_User_mjs__WEBPACK_IMPORTED_MODULE_6__.default.post(opts);
    }

    /**
     *
     * @param {Object} [opts)
     * @returns {Promise<any>}
     */
    updateSettings(opts={}) {
        return _api_User_mjs__WEBPACK_IMPORTED_MODULE_6__.default.put({
            ...opts,
            resource: '/user' // edge case, user instead of users
        }).then(data => {
            if (!data.json.errors) {
                this.currentUser = data.json.user;
            }

            return data;
        });
    }
}

Neo.applyClassConfig(MainContainerController);




/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL2FwaS9BcnRpY2xlLm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL2FwaS9CYXNlLm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL2FwaS9GYXZvcml0ZS5tanMiLCJ3ZWJwYWNrOi8vbmVvLm1qcy1yZWFsd29ybGQtZXhhbXBsZS1hcHAvLi9hcHBzL3JlYWx3b3JsZC9hcGkvUHJvZmlsZS5tanMiLCJ3ZWJwYWNrOi8vbmVvLm1qcy1yZWFsd29ybGQtZXhhbXBsZS1hcHAvLi9hcHBzL3JlYWx3b3JsZC9hcGkvVGFnLm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL2FwaS9Vc2VyLm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL2FwaS9jb25maWcubWpzIiwid2VicGFjazovL25lby5tanMtcmVhbHdvcmxkLWV4YW1wbGUtYXBwLy4vYXBwcy9yZWFsd29ybGQvYXBwLm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL3ZpZXcvRm9vdGVyQ29tcG9uZW50Lm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL3ZpZXcvSGVhZGVyQ29tcG9uZW50Lm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL3ZpZXcvTWFpbkNvbnRhaW5lci5tanMiLCJ3ZWJwYWNrOi8vbmVvLm1qcy1yZWFsd29ybGQtZXhhbXBsZS1hcHAvLi9hcHBzL3JlYWx3b3JsZC92aWV3L01haW5Db250YWluZXJDb250cm9sbGVyLm1qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsOENBQUk7QUFDMUIsd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLEtBQUssWUFBWSxHQUFHO0FBQ2xELFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixLQUFLO0FBQ25DLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixLQUFLO0FBQ25DLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLGlFQUFlLFFBQVEsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRGlDO0FBQ21DOztBQUUzRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiw0RUFBUTtBQUMzQiw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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RUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IseUJBQXlCO0FBQ3pCLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixpQkFBaUI7QUFDakI7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTs7QUFFQSxlQUFlLGlFQUFzQjtBQUNyQztBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsU0FBUztBQUN4QixlQUFlLE9BQU87QUFDdEIsaUJBQWlCLG1CQUFtQjtBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxlQUFlLHVEQUFZO0FBQzNCOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsaUJBQWlCO0FBQ2pCO0FBQ0EsMEJBQTBCO0FBQzFCLGVBQWUsc0RBQVc7QUFDMUI7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFNEMiLCJmaWxlIjoiY2h1bmtzL2FwcC9hcHBzX3JlYWx3b3JsZF9hcHBfbWpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2UgZnJvbSAnLi9CYXNlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIFJlYWxXb3JsZC5hcGkuQXJ0aWNsZVxuICogQGV4dGVuZHMgUmVhbFdvcmxkLmFwaS5CYXNlXG4gKi9cbmNsYXNzIEFydGljbGUgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nUmVhbFdvcmxkLmFwaS5BcnRpY2xlJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdSZWFsV29ybGQuYXBpLkFydGljbGUnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSByZXNvdXJjZT0nL2FydGljbGVzJ1xuICAgICAgICAgKi9cbiAgICAgICAgcmVzb3VyY2U6ICcvYXJ0aWNsZXMnXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNsdWdcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaWRcbiAgICAgKi9cbiAgICBkZWxldGVDb21tZW50KHNsdWcsIGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlbGV0ZSh7XG4gICAgICAgICAgICB1cmw6IGAvYXJ0aWNsZXMvJHtzbHVnfS9jb21tZW50cy8ke2lkfWBcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2x1Z1xuICAgICAqL1xuICAgIGdldENvbW1lbnRzKHNsdWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KHtcbiAgICAgICAgICAgIHVybDogYC9hcnRpY2xlcy8ke3NsdWd9L2NvbW1lbnRzYFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzbHVnXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAgICAgKi9cbiAgICBwb3N0Q29tbWVudChzbHVnLCBvcHRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3Qoe1xuICAgICAgICAgICAgLi4ub3B0cyxcbiAgICAgICAgICAgIHVybDogYC9hcnRpY2xlcy8ke3NsdWd9L2NvbW1lbnRzYFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKEFydGljbGUpO1xuXG5sZXQgaW5zdGFuY2UgPSBOZW8uY3JlYXRlKEFydGljbGUpO1xuXG5OZW8uYXBwbHlUb0dsb2JhbE5zKGluc3RhbmNlKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7IiwiaW1wb3J0IHtBUElfVVJMLCBMT0NBTF9TVE9SQUdFX0tFWX0gZnJvbSAnLi9jb25maWcubWpzJztcbmltcG9ydCBDb3JlQmFzZSAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9jb3JlL0Jhc2UubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgUmVhbFdvcmxkLmFwaS5CYXNlXG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKi9cbmNsYXNzIEJhc2UgZXh0ZW5kcyBDb3JlQmFzZSB7XG4gICAgc3RhdGljIGdldFN0YXRpY0NvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogVHJ1ZSBhdXRvbWF0aWNhbGx5IGFwcGxpZXMgdGhlIGNvcmUvT2JzZXJ2YWJsZS5tanMgbWl4aW5cbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gb2JzZXJ2YWJsZT10cnVlXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIG9ic2VydmFibGU6IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gdG9rZW49bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIHRva2VuOiBudWxsXG4gICAgfX1cblxuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdSZWFsV29ybGQuYXBpLkJhc2UnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ1JlYWxXb3JsZC5hcGkuQmFzZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R8bnVsbH0gZGVmYXVsdEhlYWRlcnM9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgZGVmYXVsdEhlYWRlcnM6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBpc1JlYWR5PWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBpc1JlYWR5OiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gcmVzb3VyY2U9JydcbiAgICAgICAgICovXG4gICAgICAgIHJlc291cmNlOiAnLydcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkNvbnN0cnVjdGVkKCkge1xuICAgICAgICBzdXBlci5vbkNvbnN0cnVjdGVkKCk7XG4gICAgICAgIHRoaXMuYWZ0ZXJDb25zdHJ1Y3RlZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBjbGFzcyBleHRlbnNpb25zIEFydGljbGUsIEZhdm9yaXRlLCBQcm9maWxlLCBUYWcsIFVzZXIgYXJlIHNpbmdsZXRvbnNcbiAgICAgKiBhbmQgZ2V0IGRpcmVjdGx5IGltcG9ydGVkIGludG8gdGhlIE1haW5Db250YWluZXIoQ29udHJvbGxlcilcbiAgICAgKiA9PiB0aGVpciBjcmVhdGlvbiBoYXBwZW5zIGJlZm9yZSB0aGUgYXBwIGlzIGNvbnN0cnVjdGVkXG4gICAgICogPT4gTmVvLmFwcHNbJ1JlYWxXb3JsZCddIGRvZXMgbW9zdCBsaWtlbHkgbm90IGV4aXN0IHlldC5cbiAgICAgKi9cbiAgICBhZnRlckNvbnN0cnVjdGVkKCkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmICghTmVvLmFwcHMgfHwgIU5lby5hcHBzWydSZWFsV29ybGQnXSkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbWUuYWZ0ZXJDb25zdHJ1Y3RlZCgpO1xuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChOZW8uYXBwc1snUmVhbFdvcmxkJ10ucmVuZGVyZWQpIHtcbiAgICAgICAgICAgICAgICBtZS5vbkFwcFJlbmRlcmVkKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIE5lby5hcHBzWydSZWFsV29ybGQnXS5vbigncmVuZGVyJyxtZS5vbkFwcFJlbmRlcmVkLCBtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uQXBwUmVuZGVyZWQoKSB7XG4gICAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAoQmFzZS50b2tlbikge1xuICAgICAgICAgICAgbWUub25SZWFkeShCYXNlLnRva2VuKTtcbiAgICAgICAgfSBlbHNlIGlmICghQmFzZS5pbml0aWFsVG9rZW5SZXF1ZXN0U2VudCkge1xuICAgICAgICAgICAgQmFzZS5pbml0aWFsVG9rZW5SZXF1ZXN0U2VudCA9IHRydWU7XG5cbiAgICAgICAgICAgIE5lby5tYWluLmFkZG9uLkxvY2FsU3RvcmFnZS5yZWFkTG9jYWxTdG9yYWdlSXRlbSh7XG4gICAgICAgICAgICAgICAga2V5OiBMT0NBTF9TVE9SQUdFX0tFWVxuICAgICAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlbiA9IGRhdGEudmFsdWU7XG5cbiAgICAgICAgICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgQmFzZS50b2tlbiA9IHRva2VuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG1lLm9uUmVhZHkodG9rZW4pO1xuICAgICAgICAgICAgICAgIEJhc2UuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgQmFzZS5maXJlKCdyZWFkeScsIHRva2VuKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgQmFzZS5vbih7XG4gICAgICAgICAgICAgICAgcmVhZHk6IG1lLm9uUmVhZHksXG4gICAgICAgICAgICAgICAgc2NvcGU6IG1lXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzPXt9XVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy5kYXRhXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy5wYXJhbXNdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRzLnJlc291cmNlXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0cy5zbHVnXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0cy51cmxdXG4gICAgICogQHJldHVybnMge1N0cmluZ30gdXJsXG4gICAgICovXG4gICAgY3JlYXRlVXJsKG9wdHMpIHtcbiAgICAgICAgaWYgKG9wdHMudXJsKSB7XG4gICAgICAgICAgICByZXR1cm4gQVBJX1VSTCArIG9wdHMudXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEFQSV9VUkwgKyAob3B0cy5yZXNvdXJjZSB8fCB0aGlzLnJlc291cmNlKSArIChvcHRzLnNsdWcgPyAnLycgKyBvcHRzLnNsdWcgOiAnJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHM9e31dXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLmRhdGFdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLnBhcmFtc11cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdHMucmVzb3VyY2VdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRzLnNsdWddXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICAgKi9cbiAgICBkZWxldGUob3B0cz17fSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnZGVsZXRlJywgb3B0cyk7XG5cbiAgICAgICAgcmV0dXJuIE5lby5YaHIucHJvbWlzZUpzb24oe1xuICAgICAgICAgICAgZGF0YSAgIDogb3B0cy5kYXRhLFxuICAgICAgICAgICAgbWV0aG9kIDogJ0RFTEVURScsXG4gICAgICAgICAgICBwYXJhbXMgOiBvcHRzLnBhcmFtcyxcbiAgICAgICAgICAgIHVybCAgICA6IHRoaXMuY3JlYXRlVXJsKG9wdHMpLFxuXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5kZWZhdWx0SGVhZGVycyB8fCB7fSxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJyAgICA6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1JlYWxXb3JsZC5hcGkuQmFzZTpnZXQoKScsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHM9e31dXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLmRhdGFdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLnBhcmFtc11cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdHMucmVzb3VyY2VdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRzLnNsdWddXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICAgKi9cbiAgICBnZXQob3B0cz17fSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnZ2V0Jywgb3B0cyk7XG5cbiAgICAgICAgcmV0dXJuIE5lby5YaHIucHJvbWlzZUpzb24oe1xuICAgICAgICAgICAgZGF0YSAgIDogb3B0cy5kYXRhLFxuICAgICAgICAgICAgbWV0aG9kIDogJ0dFVCcsXG4gICAgICAgICAgICBwYXJhbXMgOiBvcHRzLnBhcmFtcyxcbiAgICAgICAgICAgIHVybCAgICA6IHRoaXMuY3JlYXRlVXJsKG9wdHMpLFxuXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5kZWZhdWx0SGVhZGVycyB8fCB7fSxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJyAgICA6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1JlYWxXb3JsZC5hcGkuQmFzZTpnZXQoKScsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGxhY2Vob2xkZXIgbWV0aG9kIHdoaWNoIGdldHMgdHJpZ2dlcmVkIG9uY2UgdGhlIHRva2VuIGlzIGZldGNoZWQgZnJvbSB0aGUgbG9jYWwgc3RvcmFnZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfG51bGx9IHRva2VuXG4gICAgICovXG4gICAgb25SZWFkeSh0b2tlbikge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgbWUuZGVmYXVsdEhlYWRlcnMgPSBtZS5kZWZhdWx0SGVhZGVycyB8fCB7fTtcbiAgICAgICAgICAgIG1lLmRlZmF1bHRIZWFkZXJzWydBdXRob3JpemF0aW9uJ10gPSAnVG9rZW4gJyArIHRva2VuO1xuICAgICAgICB9XG5cbiAgICAgICAgbWUuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgIG1lLmZpcmUoJ3JlYWR5JywgdG9rZW4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzPXt9XVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy5kYXRhXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy5wYXJhbXNdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRzLnJlc291cmNlXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0cy5zbHVnXVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAgICovXG4gICAgcG9zdChvcHRzPXt9KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdwb3N0Jywgb3B0cyk7XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0gb3B0cy5wYXJhbXM7XG4gICAgICAgIGRlbGV0ZSBvcHRzLnBhcmFtcztcblxuICAgICAgICByZXR1cm4gTmVvLlhoci5wcm9taXNlSnNvbih7XG4gICAgICAgICAgICBkYXRhICAgOiBvcHRzLmRhdGEsXG4gICAgICAgICAgICBtZXRob2QgOiAnUE9TVCcsXG4gICAgICAgICAgICBwYXJhbXMgOiBwYXJhbXMsXG4gICAgICAgICAgICB1cmwgICAgOiB0aGlzLmNyZWF0ZVVybChvcHRzKSxcblxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuZGVmYXVsdEhlYWRlcnMgfHwge30sXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZScgICAgOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZWFsV29ybGQuYXBpLkJhc2U6cG9zdCgpJywgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cz17fV1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHMuZGF0YV1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHMucGFyYW1zXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0cy5yZXNvdXJjZV1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdHMuc2x1Z11cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgICAqL1xuICAgIHB1dChvcHRzPXt9KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdwdXQnLCBvcHRzKTtcblxuICAgICAgICBjb25zdCBwYXJhbXMgPSBvcHRzLnBhcmFtcztcbiAgICAgICAgZGVsZXRlIG9wdHMucGFyYW1zO1xuXG4gICAgICAgIHJldHVybiBOZW8uWGhyLnByb21pc2VKc29uKHtcbiAgICAgICAgICAgIGRhdGEgICA6IG9wdHMuZGF0YSxcbiAgICAgICAgICAgIG1ldGhvZCA6ICdQVVQnLFxuICAgICAgICAgICAgcGFyYW1zIDogcGFyYW1zLFxuICAgICAgICAgICAgdXJsICAgIDogdGhpcy5jcmVhdGVVcmwob3B0cyksXG5cbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAuLi50aGlzLmRlZmF1bHRIZWFkZXJzIHx8IHt9LFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnICAgIDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0J1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUmVhbFdvcmxkLmFwaS5CYXNlOnB1dCgpJywgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbkJhc2UuaW5pdGlhbFRva2VuUmVxdWVzdFNlbnQgPSBmYWxzZTtcbkJhc2UudG9rZW4gICAgICAgICAgICAgICAgICAgPSBudWxsO1xuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhCYXNlKTtcblxuZXhwb3J0IHtCYXNlIGFzIGRlZmF1bHR9O1xuIiwiaW1wb3J0IEJhc2UgZnJvbSAnLi9CYXNlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIFJlYWxXb3JsZC5hcGkuRmF2b3JpdGVcbiAqIEBleHRlbmRzIFJlYWxXb3JsZC5hcGkuQmFzZVxuICovXG5jbGFzcyBGYXZvcml0ZSBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdSZWFsV29ybGQuYXBpLkZhdm9yaXRlJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdSZWFsV29ybGQuYXBpLkZhdm9yaXRlJ1xuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzbHVnXG4gICAgICovXG4gICAgYWRkKHNsdWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdCh7XG4gICAgICAgICAgICB1cmw6IGAvYXJ0aWNsZXMvJHtzbHVnfS9mYXZvcml0ZWBcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2x1Z1xuICAgICAqL1xuICAgIHJlbW92ZShzbHVnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlbGV0ZSh7XG4gICAgICAgICAgICB1cmw6IGAvYXJ0aWNsZXMvJHtzbHVnfS9mYXZvcml0ZWBcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhGYXZvcml0ZSk7XG5cbmxldCBpbnN0YW5jZSA9IE5lby5jcmVhdGUoRmF2b3JpdGUpO1xuXG5OZW8uYXBwbHlUb0dsb2JhbE5zKGluc3RhbmNlKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7IiwiaW1wb3J0IEJhc2UgZnJvbSAnLi9CYXNlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIFJlYWxXb3JsZC5hcGkuUHJvZmlsZVxuICogQGV4dGVuZHMgUmVhbFdvcmxkLmFwaS5CYXNlXG4gKi9cbmNsYXNzIFByb2ZpbGUgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nUmVhbFdvcmxkLmFwaS5Qcm9maWxlJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdSZWFsV29ybGQuYXBpLlByb2ZpbGUnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSByZXNvdXJjZT0nL3Byb2ZpbGVzJ1xuICAgICAgICAgKi9cbiAgICAgICAgcmVzb3VyY2U6ICcvcHJvZmlsZXMnXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNsdWdcbiAgICAgKi9cbiAgICBmb2xsb3coc2x1Zykge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0KHtcbiAgICAgICAgICAgIHVybDogYC9wcm9maWxlcy8ke3NsdWd9L2ZvbGxvd2BcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2x1Z1xuICAgICAqL1xuICAgIHVuZm9sbG93KHNsdWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlKHtcbiAgICAgICAgICAgIHVybDogYC9wcm9maWxlcy8ke3NsdWd9L2ZvbGxvd2BcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhQcm9maWxlKTtcblxubGV0IGluc3RhbmNlID0gTmVvLmNyZWF0ZShQcm9maWxlKTtcblxuTmVvLmFwcGx5VG9HbG9iYWxOcyhpbnN0YW5jZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3RhbmNlOyIsImltcG9ydCBCYXNlIGZyb20gJy4vQmFzZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBSZWFsV29ybGQuYXBpLlRhZ1xuICogQGV4dGVuZHMgUmVhbFdvcmxkLmFwaS5CYXNlXG4gKi9cbmNsYXNzIFRhZyBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdSZWFsV29ybGQuYXBpLlRhZydcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnUmVhbFdvcmxkLmFwaS5UYWcnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSByZXNvdXJjZT0nL3RhZ3MnXG4gICAgICAgICAqL1xuICAgICAgICByZXNvdXJjZTogJy90YWdzJ1xuICAgIH19XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKFRhZyk7XG5cbmxldCBpbnN0YW5jZSA9IE5lby5jcmVhdGUoVGFnKTtcblxuTmVvLmFwcGx5VG9HbG9iYWxOcyhpbnN0YW5jZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3RhbmNlOyIsImltcG9ydCBCYXNlIGZyb20gJy4vQmFzZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBSZWFsV29ybGQuYXBpLlVzZXJcbiAqIEBleHRlbmRzIFJlYWxXb3JsZC5hcGkuQmFzZVxuICovXG5jbGFzcyBVc2VyIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J1JlYWxXb3JsZC5hcGkuVXNlcidcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnUmVhbFdvcmxkLmFwaS5Vc2VyJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gcmVzb3VyY2U9Jy90YWdzJ1xuICAgICAgICAgKi9cbiAgICAgICAgcmVzb3VyY2U6ICcvdXNlcnMnXG4gICAgfX1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoVXNlcik7XG5cbmxldCBpbnN0YW5jZSA9IE5lby5jcmVhdGUoVXNlcik7XG5cbk5lby5hcHBseVRvR2xvYmFsTnMoaW5zdGFuY2UpO1xuXG5leHBvcnQgZGVmYXVsdCBpbnN0YW5jZTsiLCJleHBvcnQgY29uc3QgQVBJX1VSTCAgICAgICAgICAgPSAnaHR0cHM6Ly9jb25kdWl0LnByb2R1Y3Rpb25yZWFkeS5pby9hcGknO1xuZXhwb3J0IGNvbnN0IExPQ0FMX1NUT1JBR0VfS0VZID0gJ25lb1JlYWxXb3JsZFRva2VuJztcblxuZXhwb3J0IGRlZmF1bHQge0FQSV9VUkwsIExPQ0FMX1NUT1JBR0VfS0VZfTsiLCJpbXBvcnQgTWFpbkNvbnRhaW5lciBmcm9tICcuL3ZpZXcvTWFpbkNvbnRhaW5lci5tanMnO1xuXG5jb25zdCBvblN0YXJ0ID0gKCkgPT4gTmVvLmFwcCh7XG4gICAgbWFpblZpZXc6IE1haW5Db250YWluZXIsXG4gICAgbmFtZSAgICA6ICdSZWFsV29ybGQnXG59KTtcblxuZXhwb3J0IHtvblN0YXJ0IGFzIG9uU3RhcnR9OyIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbXBvbmVudC9CYXNlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIFJlYWxXb3JsZC52aWV3LkZvb3RlckNvbXBvbmVudFxuICogQGV4dGVuZHMgTmVvLmNvbXBvbmVudC5CYXNlXG4gKi9cbmNsYXNzIEZvb3RlckNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J1JlYWxXb3JsZC52aWV3LkZvb3RlckNvbXBvbmVudCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnUmVhbFdvcmxkLnZpZXcuRm9vdGVyQ29tcG9uZW50JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gX3Zkb21cbiAgICAgICAgICovXG4gICAgICAgIF92ZG9tOlxuICAgICAgICAgICAge3RhZzogJ2Zvb3RlcicsIGNuOiBbXG4gICAgICAgICAgICAgICAge2NsczogWydjb250YWluZXInXSwgY246IFtcbiAgICAgICAgICAgICAgICAgICAge3RhZzogJ2EnLCBjbHM6IFsnbG9nby1mb250J10sIGhyZWY6ICcjLycsIGh0bWw6ICdjb25kdWl0J30sXG4gICAgICAgICAgICAgICAgICAgIHt0YWc6ICdzcGFuJywgY2xzOiAnYXR0cmlidXRpb24nLCBodG1sOiAnQW4gaW50ZXJhY3RpdmUgbGVhcm5pbmcgcHJvamVjdCBmcm9tIDxhIGhyZWY9XCJodHRwczovL3RoaW5rc3Rlci5pb1wiPlRoaW5rc3RlcjwvYT4uIENvZGUgJmFtcDsgZGVzaWduIGxpY2Vuc2VkIHVuZGVyIE1JVC4nfVxuICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICBdfVxuICAgIH19XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKEZvb3RlckNvbXBvbmVudCk7XG5cbmV4cG9ydCB7Rm9vdGVyQ29tcG9uZW50IGFzIGRlZmF1bHR9O1xuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29tcG9uZW50L0Jhc2UubWpzJztcbmltcG9ydCBOZW9BcnJheSAgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL3V0aWwvQXJyYXkubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgUmVhbFdvcmxkLnZpZXcuSGVhZGVyQ29tcG9uZW50XG4gKiBAZXh0ZW5kcyBOZW8uY29tcG9uZW50LkJhc2VcbiAqL1xuY2xhc3MgSGVhZGVyQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nUmVhbFdvcmxkLnZpZXcuSGVhZGVyQ29tcG9uZW50J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdSZWFsV29ybGQudmlldy5IZWFkZXJDb21wb25lbnQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBhY3RpdmVJdGVtXz0naG9tZSdcbiAgICAgICAgICovXG4gICAgICAgIGFjdGl2ZUl0ZW1fOiAnaG9tZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gY2xzPVsnbmF2YmFyJywgJ25hdmJhci1saWdodCddXG4gICAgICAgICAqL1xuICAgICAgICBjbHM6IFsnbmF2YmFyJywgJ25hdmJhci1saWdodCddLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gbG9nZ2VkSW5fPWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBsb2dnZWRJbl86IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IHVzZXJJbWFnZV89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgdXNlckltYWdlXzpudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IHVzZXJOYW1lXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICB1c2VyTmFtZV86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IF92ZG9tXG4gICAgICAgICAqL1xuICAgICAgICBfdmRvbTpcbiAgICAgICAgICAgIHt0YWc6ICduYXYnLCBjbHM6IFsnbmF2YmFyIG5hdmJhci1saWdodCddLCBjbjogW1xuICAgICAgICAgICAgICAgIHtjbHM6IFsnY29udGFpbmVyJ10sIGNuOiBbXG4gICAgICAgICAgICAgICAgICAgIHt0YWc6ICdhJywgIGNsczogWyduYXZiYXItYnJhbmQnXSwgaHJlZjogJyMvJywgaHRtbDogJ2NvbmR1aXQnfSxcbiAgICAgICAgICAgICAgICAgICAge3RhZzogJ3VsJywgY2xzOiBbJ25hdiBuYXZiYXItbmF2JywgJ3B1bGwteHMtcmlnaHQnXSwgY246IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0YWc6ICdsaScsIGNsczogWyduYXYtaXRlbSddLCBjbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0YWc6ICdhJywgY2xzOiBbJ25hdi1saW5rJ10sIGhyZWY6ICcjLycsIGh0bWw6ICdIb21lJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIF19LFxuICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ2xpJywgY2xzOiBbJ25hdi1pdGVtJ10sIHJlbW92ZURvbTogdHJ1ZSwgY246IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAnYScsIGNsczogWyduYXYtbGluayddLCBocmVmOiAnIy9lZGl0b3InLCBjbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAnaScsIGNsczogJ2lvbi1jb21wb3NlJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt2dHlwZTogJ3RleHQnLCBodG1sOiAnJm5ic3A7TmV3IEFydGljbGUnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgICAgICBdfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0YWc6ICdsaScsIGNsczogWyduYXYtaXRlbSddLCByZW1vdmVEb206IHRydWUsIGNuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ2EnLCBjbHM6IFsnbmF2LWxpbmsnXSwgaHJlZjogJyMvc2V0dGluZ3MnLCBjbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAnaScsIGNsczogJ2lvbi1nZWFyLWEnfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Z0eXBlOiAndGV4dCcsIGh0bWw6ICcmbmJzcDtTZXR0aW5ncyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgICAgIF19LFxuICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ2xpJywgY2xzOiBbJ25hdi1pdGVtJ10sIHJlbW92ZURvbTogdHJ1ZSwgY246IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAnYScsIGNscyA6IFsnbmF2LWxpbmsnXSwgaHJlZjogJyMvcHJvZmlsZScsIGNuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0YWc6ICdpbWcnLCBjbHM6IFsndXNlci1waWMnXX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt2dHlwZTogJ3RleHQnLCBodG1sOiAnJm5ic3A7UHJvZmlsZSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgICAgIF19LFxuICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ2xpJywgY2xzOiBbJ25hdi1pdGVtJ10sIGNuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhZyA6ICdhJywgY2xzIDogWyduYXYtbGluayddLCBocmVmOiAnIy9sb2dpbicsIGh0bWw6ICdTaWduIGluJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIF19LFxuICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ2xpJywgY2xzOiBbJ25hdi1pdGVtJ10sIGNuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ2EnLCBjbHMgOiBbJ25hdi1saW5rJ10sIGhyZWY6ICcjL3JlZ2lzdGVyJywgaHRtbDogJ1NpZ24gdXAnfVxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgXX1cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBhY3RpdmVJdGVtIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEFjdGl2ZUl0ZW0odmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tO1xuXG4gICAgICAgIGlmIChvbGRWYWx1ZSkge1xuICAgICAgICAgICAgTmVvQXJyYXkucmVtb3ZlKHZkb20uY25bMF0uY25bMV0uY25bbWUuZ2V0QWN0aXZlSW5kZXgob2xkVmFsdWUpXS5jblswXS5jbHMsICdhY3RpdmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIE5lb0FycmF5LmFkZCh2ZG9tLmNuWzBdLmNuWzFdLmNuW21lLmdldEFjdGl2ZUluZGV4KHZhbHVlKV0uY25bMF0uY2xzLCAnYWN0aXZlJyk7XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBsb2dnZWRJbiBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldExvZ2dlZEluKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAoTmVvLmlzQm9vbGVhbihvbGRWYWx1ZSkpIHtcbiAgICAgICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICB2ZG9tID0gbWUudmRvbSxcbiAgICAgICAgICAgICAgICBsaXN0ID0gdmRvbS5jblswXS5jblsxXTtcblxuICAgICAgICAgICAgbGlzdC5jblsxXS5yZW1vdmVEb20gPSAhdmFsdWU7IC8vIGVkaXRvclxuICAgICAgICAgICAgbGlzdC5jblsyXS5yZW1vdmVEb20gPSAhdmFsdWU7IC8vIHNldHRpbmdzXG4gICAgICAgICAgICBsaXN0LmNuWzNdLnJlbW92ZURvbSA9ICF2YWx1ZTsgLy8gcHJvZmlsZVxuICAgICAgICAgICAgbGlzdC5jbls0XS5yZW1vdmVEb20gPSB2YWx1ZTsgIC8vIGxvZ2luXG4gICAgICAgICAgICBsaXN0LmNuWzVdLnJlbW92ZURvbSA9IHZhbHVlOyAgLy8gcmVnaXN0ZXJcblxuICAgICAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHVzZXJJbWFnZSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRVc2VySW1hZ2UodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tICAgICAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICBwcm9maWxlTGluayA9IHZkb20uY25bMF0uY25bMV0uY25bM10uY25bMF07XG5cbiAgICAgICAgcHJvZmlsZUxpbmsuY25bMF0ucmVtb3ZlRG9tID0gIXZhbHVlO1xuICAgICAgICBwcm9maWxlTGluay5jblswXS5zcmMgICAgICAgPSB2YWx1ZTtcblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHVzZXJOYW1lIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFVzZXJOYW1lKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGxldCBtZSAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICAgICAgdmRvbSAgICAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgICAgIHByb2ZpbGVMaW5rID0gdmRvbS5jblswXS5jblsxXS5jblszXS5jblswXTtcblxuICAgICAgICAgICAgcHJvZmlsZUxpbmsuaHJlZiA9ICcjL3Byb2ZpbGUvJyArIHZhbHVlO1xuICAgICAgICAgICAgcHJvZmlsZUxpbmsuY25bMV0uaHRtbCA9ICcmbmJzcDsnICsgdmFsdWU7XG5cbiAgICAgICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgdGFyZ2V0IGluZGV4XG4gICAgICovXG4gICAgZ2V0QWN0aXZlSW5kZXgodmFsdWUpIHtcbiAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICAgICAgY2FzZSAnL3NldHRpbmdzJzogcmV0dXJuIDI7XG4gICAgICAgICAgICBjYXNlICcvbG9naW4nICAgOiByZXR1cm4gNDtcbiAgICAgICAgICAgIGNhc2UgJy9yZWdpc3Rlcic6IHJldHVybiA1O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlLmluY2x1ZGVzKCcvZWRpdG9yJykpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlLmluY2x1ZGVzKCcvcHJvZmlsZScpKSB7XG4gICAgICAgICAgICByZXR1cm4gMztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRlZmF1bHQgdG8gaG9tZVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKEhlYWRlckNvbXBvbmVudCk7XG5cbmV4cG9ydCB7SGVhZGVyQ29tcG9uZW50IGFzIGRlZmF1bHR9O1xuIiwiaW1wb3J0IEZvb3RlckNvbXBvbmVudCAgICAgICAgIGZyb20gJy4vRm9vdGVyQ29tcG9uZW50Lm1qcyc7XG5pbXBvcnQgSGVhZGVyQ29tcG9uZW50ICAgICAgICAgZnJvbSAnLi9IZWFkZXJDb21wb25lbnQubWpzJztcbmltcG9ydCBNYWluQ29udGFpbmVyQ29udHJvbGxlciBmcm9tICcuL01haW5Db250YWluZXJDb250cm9sbGVyLm1qcyc7XG5pbXBvcnQgVmlld3BvcnQgICAgICAgICAgICAgICAgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbnRhaW5lci9WaWV3cG9ydC5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBSZWFsV29ybGQudmlldy5NYWluQ29udGFpbmVyXG4gKiBAZXh0ZW5kcyBOZW8uY29udGFpbmVyLlZpZXdwb3J0XG4gKi9cbmNsYXNzIE1haW5Db250YWluZXIgZXh0ZW5kcyBWaWV3cG9ydCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J1JlYWxXb3JsZC52aWV3Lk1haW5Db250YWluZXInXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ1JlYWxXb3JsZC52aWV3Lk1haW5Db250YWluZXInLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gYXV0b01vdW50PXRydWVcbiAgICAgICAgICovXG4gICAgICAgIGF1dG9Nb3VudDogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0FycmF5fSBjbHM9W11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogW10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOZW8uY29udHJvbGxlci5Db21wb25lbnR9IGNvbnRyb2xsZXI9TWFpbkNvbnRhaW5lckNvbnRyb2xsZXJcbiAgICAgICAgICovXG4gICAgICAgIGNvbnRyb2xsZXI6IE1haW5Db250YWluZXJDb250cm9sbGVyLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBsYXlvdXQ9e250eXBlOiAndmJveCd9XG4gICAgICAgICAqL1xuICAgICAgICBsYXlvdXQ6IHtudHlwZTogJ2Jhc2UnfSxcblxuICAgICAgICBpdGVtczogW3tcbiAgICAgICAgICAgIG1vZHVsZSAgIDogSGVhZGVyQ29tcG9uZW50LFxuICAgICAgICAgICAgcmVmZXJlbmNlOiAnaGVhZGVyJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBtb2R1bGU6IEZvb3RlckNvbXBvbmVudFxuICAgICAgICB9XVxuICAgIH19XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKE1haW5Db250YWluZXIpO1xuXG5leHBvcnQge01haW5Db250YWluZXIgYXMgZGVmYXVsdH07XG4iLCJpbXBvcnQgQXJ0aWNsZUFwaSAgICAgICAgICBmcm9tICcuLi9hcGkvQXJ0aWNsZS5tanMnO1xuaW1wb3J0IENvbXBvbmVudENvbnRyb2xsZXIgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbnRyb2xsZXIvQ29tcG9uZW50Lm1qcyc7XG5pbXBvcnQgRmF2b3JpdGVBcGkgICAgICAgICBmcm9tICcuLi9hcGkvRmF2b3JpdGUubWpzJztcbmltcG9ydCB7TE9DQUxfU1RPUkFHRV9LRVl9IGZyb20gJy4uL2FwaS9jb25maWcubWpzJztcbmltcG9ydCBQcm9maWxlQXBpICAgICAgICAgIGZyb20gJy4uL2FwaS9Qcm9maWxlLm1qcyc7XG5pbXBvcnQgVGFnQXBpICAgICAgICAgICAgICBmcm9tICcuLi9hcGkvVGFnLm1qcyc7XG5pbXBvcnQgVXNlckFwaSAgICAgICAgICAgICBmcm9tICcuLi9hcGkvVXNlci5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBSZWFsV29ybGQudmlldy5NYWluQ29udGFpbmVyQ29udHJvbGxlclxuICogQGV4dGVuZHMgTmVvLmNvbnRyb2xsZXIuQ29tcG9uZW50XG4gKi9cbmNsYXNzIE1haW5Db250YWluZXJDb250cm9sbGVyIGV4dGVuZHMgQ29tcG9uZW50Q29udHJvbGxlciB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J1JlYWxXb3JsZC52aWV3Lk1haW5Db250YWluZXJDb250cm9sbGVyJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdSZWFsV29ybGQudmlldy5NYWluQ29udGFpbmVyQ29udHJvbGxlcicsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtSZWFsV29ybGQudmlldy5hcnRpY2xlLkNvbXBvbmVudHxudWxsfSBhcnRpY2xlQ29tcG9uZW50PW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgYXJ0aWNsZUNvbXBvbmVudDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gYXJ0aWNsZXNPZmZzZXRfPTBcbiAgICAgICAgICovXG4gICAgICAgIGFydGljbGVzT2Zmc2V0XzogMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1JlYWxXb3JsZC52aWV3LmFydGljbGUuQ3JlYXRlQ29tcG9uZW50fG51bGx9IGNyZWF0ZUNvbXBvbmVudD1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZUNvbXBvbmVudDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JlcyB0aGUgY3VycmVudCB1c2VyIGRhdGEgYWZ0ZXIgbG9nZ2luZyBpblxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R8bnVsbH0gY3VycmVudFVzZXJfPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY3VycmVudFVzZXJfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IGhhc2hTdHJpbmc9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgaGFzaFN0cmluZzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1JlYWxXb3JsZC52aWV3LkhvbWVDb21wb25lbnR8bnVsbH0gaG9tZUNvbXBvbmVudD1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGhvbWVDb21wb25lbnQ6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtSZWFsV29ybGQudmlldy51c2VyLlByb2ZpbGVDb21wb25lbnR8bnVsbH0gcHJvZmlsZUNvbXBvbmVudD1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHByb2ZpbGVDb21wb25lbnQ6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtSZWFsV29ybGQudmlldy51c2VyLlNldHRpbmdzQ29tcG9uZW50fG51bGx9IHNldHRpbmdzQ29tcG9uZW50PW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc2V0dGluZ3NDb21wb25lbnQ6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtSZWFsV29ybGQudmlldy51c2VyLlNpZ25VcENvbXBvbmVudHxudWxsfSBzaWduVXBDb21wb25lbnQ9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBzaWduVXBDb21wb25lbnQ6IG51bGxcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBhcnRpY2xlc09mZnNldCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRBcnRpY2xlc09mZnNldCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgLy8gaWdub3JlIHRoZSBpbml0aWFsIGNvbmZpZyBzZXR0ZXIgY2FsbFxuICAgICAgICBpZiAoTmVvLmlzTnVtYmVyKG9sZFZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5nZXRBcnRpY2xlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBjdXJyZW50VXNlciBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRDdXJyZW50VXNlcih2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvbGRWYWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVmZXJlbmNlKCdoZWFkZXInKS5zZXQoe1xuICAgICAgICAgICAgICAgIGxvZ2dlZEluIDogISF2YWx1ZSxcbiAgICAgICAgICAgICAgICB1c2VySW1hZ2U6IHZhbHVlID8gdmFsdWUuaW1hZ2UgICAgOiBudWxsLFxuICAgICAgICAgICAgICAgIHVzZXJOYW1lIDogdmFsdWUgPyB2YWx1ZS51c2VybmFtZSA6IG51bGxcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHRvZG86IHRlc3QgdG8gZW5zdXJlIHRoZSBpbml0aWFsIG1hcmt1cCBpcyByZW5kZXJlZFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ2FmdGVyU2V0Q3VycmVudFVzZXInLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2x1Z1xuICAgICAqL1xuICAgIGRlbGV0ZUFydGljbGUoc2x1Zykge1xuICAgICAgICBBcnRpY2xlQXBpLmRlbGV0ZSh7c2x1Zzogc2x1Z30pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBOZW8uTWFpbi5zZXRSb3V0ZSh7XG4gICAgICAgICAgICAgICAgdmFsdWU6ICcvJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGlkXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICAgKi9cbiAgICBkZWxldGVDb21tZW50KGlkKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIHNsdWcgPSBtZS5oYXNoU3RyaW5nLnNwbGl0KCcvJykucG9wKCk7XG5cbiAgICAgICAgcmV0dXJuIEFydGljbGVBcGkuZGVsZXRlQ29tbWVudChzbHVnLCBpZCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIG1lLmdldENvbW1lbnRzKHNsdWcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzbHVnXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBmYXZvcml0ZWRcbiAgICAgKi9cbiAgICBmYXZvcml0ZUFydGljbGUoc2x1ZywgZmF2b3JpdGVkKSB7XG4gICAgICAgIHJldHVybiBGYXZvcml0ZUFwaVtmYXZvcml0ZWQgPyAnYWRkJyA6ICdyZW1vdmUnXShzbHVnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzbHVnXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBmb2xsb3dcbiAgICAgKi9cbiAgICBmb2xsb3dVc2VyKHNsdWcsIGZvbGxvdykge1xuICAgICAgICByZXR1cm4gUHJvZmlsZUFwaVtmb2xsb3cgPyAnZm9sbG93JyA6ICd1bmZvbGxvdyddKHNsdWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFydGljbGUgZGV0YWlsczogZ2V0IGFuIGFydGljbGUgcHJvdmlkaW5nIGEgdXNlciBzbHVnXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNsdWdcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgICAqL1xuICAgIGdldEFydGljbGUoc2x1Zykge1xuICAgICAgICByZXR1cm4gQXJ0aWNsZUFwaS5nZXQoe1xuICAgICAgICAgICAgc2x1Zzogc2x1Z1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXt9XVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cz17fV1cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgICAqL1xuICAgIGdldEFydGljbGVzKHBhcmFtcz17fSwgb3B0cz17fSkge1xuICAgICAgICByZXR1cm4gQXJ0aWNsZUFwaS5nZXQoe1xuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgbGltaXQgOiAxMCxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IHRoaXMuYXJ0aWNsZXNPZmZzZXQsXG4gICAgICAgICAgICAgICAgLi4ucGFyYW1zXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4ub3B0c1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzbHVnXG4gICAgICovXG4gICAgZ2V0Q29tbWVudHMoc2x1Zykge1xuICAgICAgICBBcnRpY2xlQXBpLmdldENvbW1lbnRzKHNsdWcpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFydGljbGVDb21wb25lbnQuY29tbWVudHMgPSBkYXRhLmpzb24uY29tbWVudHM7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRva2VuXG4gICAgICovXG4gICAgZ2V0Q3VycmVudFVzZXIodG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICBVc2VyQXBpLmdldCh7XG4gICAgICAgICAgICAgICAgcmVzb3VyY2U6ICcvdXNlcicgLy8gZWRnZSBjYXNlLCB1c2VyIGluc3RlYWQgb2YgdXNlcnNcbiAgICAgICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VXNlciA9IGRhdGEuanNvbi51c2VyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzbHVnXG4gICAgICovXG4gICAgZ2V0UHJvZmlsZShzbHVnKSB7XG4gICAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgICBQcm9maWxlQXBpLmdldCh7XG4gICAgICAgICAgICBzbHVnOiBzbHVnXG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBtZS5wcm9maWxlQ29tcG9uZW50LnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgLi4uZGF0YS5qc29uLnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgbXlQcm9maWxlOiBkYXRhLmpzb24ucHJvZmlsZS51c2VybmFtZSA9PT0gKG1lLmN1cnJlbnRVc2VyICYmIG1lLmN1cnJlbnRVc2VyLnVzZXJuYW1lKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgZ2V0VGFncygpIHtcbiAgICAgICAgVGFnQXBpLmdldCgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhvbWVDb21wb25lbnQudGFnTGlzdC50YWdzID0gZGF0YS5qc29uLnRhZ3M7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB1c2VyRGF0YVxuICAgICAqL1xuICAgIGxvZ2luKHVzZXJEYXRhKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFVzZXIgPSB1c2VyRGF0YTtcblxuICAgICAgICBOZW8ubWFpbi5hZGRvbi5Mb2NhbFN0b3JhZ2UuY3JlYXRlTG9jYWxTdG9yYWdlSXRlbSh7XG4gICAgICAgICAgICBrZXkgIDogTE9DQUxfU1RPUkFHRV9LRVksXG4gICAgICAgICAgICB2YWx1ZTogdXNlckRhdGEudG9rZW5cbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyB3YWl0IHVudGlsIHRoZSBoZWFkZXIgdmRvbS11cGRhdGUgaXMgZG9uZSB0byBhdm9pZCBzaG93aW5nIHNpZ24gdXAgJiBzaWduIGluIHR3aWNlXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBOZW8uTWFpbi5zZXRSb3V0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnLydcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBsb2dvdXQoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFVzZXIgPSBudWxsO1xuXG4gICAgICAgIE5lby5tYWluLmFkZG9uLkxvY2FsU3RvcmFnZS5kZXN0cm95TG9jYWxTdG9yYWdlSXRlbSh7XG4gICAgICAgICAgICBrZXk6IExPQ0FMX1NUT1JBR0VfS0VZXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gd2FpdCB1bnRpbCB0aGUgaGVhZGVyIHZkb20tdXBkYXRlIGlzIGRvbmUgdG8gYXZvaWQgc2hvd2luZyBzaWduIHVwICYgc2lnbiBpbiB0d2ljZVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgTmVvLk1haW4uc2V0Um91dGUoe1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJy8nXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgb25Db21wb25lbnRDb25zdHJ1Y3RlZCgpIHtcbiAgICAgICAgc3VwZXIub25Db21wb25lbnRDb25zdHJ1Y3RlZCgpO1xuXG4gICAgICAgIC8vIGRlZmF1bHQgcm91dGUgPT4gaG9tZVxuICAgICAgICBpZiAoIU5lby5jb25maWcuaGFzaCkge1xuICAgICAgICAgICAgdGhpcy5vbkhhc2hDaGFuZ2Uoe1xuICAgICAgICAgICAgICAgIGFwcE5hbWVzICA6IFsnUmVhbFdvcmxkJ10sXG4gICAgICAgICAgICAgICAgaGFzaCAgICAgIDogeycvJzogJyd9LFxuICAgICAgICAgICAgICAgIGhhc2hTdHJpbmc6ICcvJ1xuICAgICAgICAgICAgfSwgbnVsbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uQ29uc3RydWN0ZWQoKSB7XG4gICAgICAgIHN1cGVyLm9uQ29uc3RydWN0ZWQoKTtcblxuICAgICAgICBVc2VyQXBpLm9uKCdyZWFkeScsIHRoaXMuZ2V0Q3VycmVudFVzZXIsIHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9sZFZhbHVlXG4gICAgICovXG4gICAgYXN5bmMgb25IYXNoQ2hhbmdlKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBjb21wb25lbnQgID0gbWUuY29tcG9uZW50LFxuICAgICAgICAgICAgaGFzaCAgICAgICA9IHZhbHVlLmhhc2gsXG4gICAgICAgICAgICBoYXNoU3RyaW5nID0gdmFsdWUuaGFzaFN0cmluZyxcbiAgICAgICAgICAgIG1vZGUsIG5ld1ZpZXcsIG9wdHMsIHNsdWc7XG5cbiAgICAgICAgaWYgKCFjb21wb25lbnQuaXNDb25zdHJ1Y3RlZCkgeyAvLyB0aGUgaW5pdGlhbCBoYXNoIGNoYW5nZSBnZXRzIHRyaWdnZXJlZCBiZWZvcmUgdGhlIHZub2RlIGdvdCBiYWNrIGZyb20gdGhlIHZkb20gd29ya2VyICh1c2luZyBhdXRvTW91bnQpXG4gICAgICAgICAgICBjb21wb25lbnQub24oJ2NvbnN0cnVjdGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIG1lLm9uSGFzaENoYW5nZSh2YWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZS5oYXNoU3RyaW5nID0gaGFzaFN0cmluZztcblxuICAgICAgICAgICAgLy8gYWRqdXN0IHRoZSBhY3RpdmUgaGVhZGVyIGxpbmtcbiAgICAgICAgICAgIGNvbXBvbmVudC5pdGVtc1swXS5hY3RpdmVJdGVtID0gT2JqZWN0LmtleXMoaGFzaClbMF07XG5cbiAgICAgICAgICAgICAgICAgaWYgKGhhc2hTdHJpbmcgPT09ICcvJykgICAgICAgICAgICAgICB7b3B0cyA9IFsnaG9tZUNvbXBvbmVudCcsICAgICAoKSA9PiBpbXBvcnQoJy4vSG9tZUNvbXBvbmVudC5tanMnKSwgICAgICAgICAgICdob21lJ119XG4gICAgICAgICAgICBlbHNlIGlmIChoYXNoU3RyaW5nLmluY2x1ZGVzKCcvYXJ0aWNsZS8nKSkge29wdHMgPSBbJ2FydGljbGVDb21wb25lbnQnLCAgKCkgPT4gaW1wb3J0KCcuL2FydGljbGUvQ29tcG9uZW50Lm1qcycpLCAgICAgICAnYXJ0aWNsZSddfVxuICAgICAgICAgICAgZWxzZSBpZiAoaGFzaFN0cmluZy5pbmNsdWRlcygnL2VkaXRvcicpKSAgIHtvcHRzID0gWydjcmVhdGVDb21wb25lbnQnLCAgICgpID0+IGltcG9ydCgnLi9hcnRpY2xlL0NyZWF0ZUNvbXBvbmVudC5tanMnKSwgJ2VkaXRvciddfVxuICAgICAgICAgICAgZWxzZSBpZiAoaGFzaFN0cmluZy5pbmNsdWRlcygnL3Byb2ZpbGUvJykpIHtvcHRzID0gWydwcm9maWxlQ29tcG9uZW50JywgICgpID0+IGltcG9ydCgnLi91c2VyL1Byb2ZpbGVDb21wb25lbnQubWpzJyksICAgJ3Byb2ZpbGUnXX1cbiAgICAgICAgICAgIGVsc2UgaWYgKGhhc2guaGFzT3duUHJvcGVydHkoJy9sb2dpbicpKSAgICB7b3B0cyA9IFsnc2lnblVwQ29tcG9uZW50JywgICAoKSA9PiBpbXBvcnQoJy4vdXNlci9TaWduVXBDb21wb25lbnQubWpzJyksICAgICdzaWdudXAnXTsgbW9kZSA9ICdzaWduaW4nO31cbiAgICAgICAgICAgIGVsc2UgaWYgKGhhc2guaGFzT3duUHJvcGVydHkoJy9yZWdpc3RlcicpKSB7b3B0cyA9IFsnc2lnblVwQ29tcG9uZW50JywgICAoKSA9PiBpbXBvcnQoJy4vdXNlci9TaWduVXBDb21wb25lbnQubWpzJyksICAgICdzaWdudXAnXTsgbW9kZSA9ICdzaWdudXAnO31cbiAgICAgICAgICAgIGVsc2UgaWYgKGhhc2guaGFzT3duUHJvcGVydHkoJy9zZXR0aW5ncycpKSB7b3B0cyA9IFsnc2V0dGluZ3NDb21wb25lbnQnLCAoKSA9PiBpbXBvcnQoJy4vdXNlci9TZXR0aW5nc0NvbXBvbmVudC5tanMnKSwgICdzZXR0aW5ncyddfVxuXG4gICAgICAgICAgICBpZiAob3B0cykge1xuICAgICAgICAgICAgICAgIG5ld1ZpZXcgPSBhd2FpdCBtZS5wcm9taXNlVmlldyguLi5vcHRzKTtcblxuICAgICAgICAgICAgICAgIGlmIChtb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1ZpZXcubW9kZSA9IG1vZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIShvbGRWYWx1ZSAmJiBvbGRWYWx1ZS5oYXNoICYmIChcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZS5oYXNoLmhhc093blByb3BlcnR5KCcvbG9naW4nKSAgICAmJiBoYXNoLmhhc093blByb3BlcnR5KCcvcmVnaXN0ZXInKSB8fFxuICAgICAgICAgICAgICAgIG9sZFZhbHVlLmhhc2guaGFzT3duUHJvcGVydHkoJy9yZWdpc3RlcicpICYmIGhhc2guaGFzT3duUHJvcGVydHkoJy9sb2dpbicpKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnQuaXRlbXMubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQucmVtb3ZlQXQoMSwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChuZXdWaWV3KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5pbnNlcnQoMSwgbmV3Vmlldyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzd2l0Y2ggKG5ld1ZpZXcucmVmZXJlbmNlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnYXJ0aWNsZSc6XG4gICAgICAgICAgICAgICAgICAgIHNsdWcgPSBoYXNoU3RyaW5nLnNwbGl0KCcvJykucG9wKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbWUuZ2V0QXJ0aWNsZShzbHVnKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFydGljbGUgPSBkYXRhLmpzb24uYXJ0aWNsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5ICAgID0gYXJ0aWNsZS5ib2R5O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgYXJ0aWNsZS5ib2R5O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBtZS5hcnRpY2xlQ29tcG9uZW50LnNldChhcnRpY2xlKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZS5hcnRpY2xlQ29tcG9uZW50LmJvZHkgPSBib2R5O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIG1lLmdldENvbW1lbnRzKHNsdWcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdlZGl0b3InOlxuICAgICAgICAgICAgICAgICAgICBzbHVnID0gaGFzaFN0cmluZy5zcGxpdCgnLycpLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2x1ZyAhPT0gJ2VkaXRvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lLmdldEFydGljbGUoc2x1ZykudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnRpY2xlID0gZGF0YS5qc29uLmFydGljbGU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZS5jcmVhdGVDb21wb25lbnQuc2V0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keSAgICAgICA6IGFydGljbGUuYm9keSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGFydGljbGUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsdWcgICAgICAgOiBhcnRpY2xlLnNsdWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZ0xpc3QgICAgOiBhcnRpY2xlLnRhZ0xpc3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlICAgICAgOiBhcnRpY2xlLnRpdGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lLmNyZWF0ZUNvbXBvbmVudC5yZXNldEZvcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdob21lJzpcbiAgICAgICAgICAgICAgICAgICAgbWUuaG9tZUNvbXBvbmVudC5sb2dnZWRJbiA9ICEhbWUuY3VycmVudFVzZXI7XG4gICAgICAgICAgICAgICAgICAgIG1lLmhvbWVDb21wb25lbnQuZ2V0QXJ0aWNsZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgbWUuZ2V0VGFncygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwcm9maWxlJzpcbiAgICAgICAgICAgICAgICAgICAgbWUuZ2V0UHJvZmlsZShoYXNoU3RyaW5nLnNwbGl0KCcvJykucG9wKCkpOyAvLyBwYXNzIHRoZSBzbHVnXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3NldHRpbmdzJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1lLmN1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy8gYWRkZWQgYSBzaG9ydCBkZWxheSB0byBub3QgaW50ZXJmZXJlIHdpdGggdGhlIG1haW5Db250YWluZXIgdXBkYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWUuc2V0dGluZ3NDb21wb25lbnQub25DdXJyZW50VXNlckNoYW5nZShtZS5jdXJyZW50VXNlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc2lnbnVwJzpcbiAgICAgICAgICAgICAgICAgICAgbmV3Vmlldy5lcnJvcnMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cylcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgICAqL1xuICAgIHBvc3RDb21tZW50KG9wdHM9e30pIHtcbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgc2x1ZyA9IG1lLmhhc2hTdHJpbmcuc3BsaXQoJy8nKS5wb3AoKTtcblxuICAgICAgICByZXR1cm4gQXJ0aWNsZUFwaS5wb3N0Q29tbWVudChzbHVnLCBvcHRzKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgbWUuZ2V0Q29tbWVudHMoc2x1Zyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG1vZHVsZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSByZWZlcmVuY2VcbiAgICAgKiBAcmV0dXJucyB7TmVvLmNvbXBvbmVudC5CYXNlfSBUaGUgbWF0Y2hpbmcgdmlldyBpbnN0YW5jZVxuICAgICAqL1xuICAgIGFzeW5jIHByb21pc2VWaWV3KGtleSwgbW9kdWxlLCByZWZlcmVuY2UpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAoIW1lW2tleV0pIHtcbiAgICAgICAgICAgIG1vZHVsZSA9IGF3YWl0IG1vZHVsZSgpO1xuXG4gICAgICAgICAgICBtZVtrZXldID0gTmVvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgbW9kdWxlICAgOiBtb2R1bGUuZGVmYXVsdCxcbiAgICAgICAgICAgICAgICBwYXJlbnRJZCA6IG1lLmNvbXBvbmVudC5pZCxcbiAgICAgICAgICAgICAgICByZWZlcmVuY2U6IHJlZmVyZW5jZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWVba2V5XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICAgKi9cbiAgICBzYXZlVXNlcihvcHRzKSB7XG4gICAgICAgIHJldHVybiBVc2VyQXBpLnBvc3Qob3B0cyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHMpXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICAgKi9cbiAgICB1cGRhdGVTZXR0aW5ncyhvcHRzPXt9KSB7XG4gICAgICAgIHJldHVybiBVc2VyQXBpLnB1dCh7XG4gICAgICAgICAgICAuLi5vcHRzLFxuICAgICAgICAgICAgcmVzb3VyY2U6ICcvdXNlcicgLy8gZWRnZSBjYXNlLCB1c2VyIGluc3RlYWQgb2YgdXNlcnNcbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGlmICghZGF0YS5qc29uLmVycm9ycykge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFVzZXIgPSBkYXRhLmpzb24udXNlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoTWFpbkNvbnRhaW5lckNvbnRyb2xsZXIpO1xuXG5leHBvcnQge01haW5Db250YWluZXJDb250cm9sbGVyIGFzIGRlZmF1bHR9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==