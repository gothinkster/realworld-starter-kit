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
        _vdom: {
            tag: 'footer',
            cn : [{
                cls: ['container'],
                cn : [{
                    tag : 'a',
                    cls : ['logo-font'],
                    href: '#/',
                    html: 'conduit'
                }, {
                    tag : 'span',
                    cls : 'attribution',
                    html: 'An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.'
                }]
            }]
        }
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
        _vdom: {
            tag: 'nav',
            cls: ['navbar navbar-light'],
            cn : [{
                cls: ['container'],
                cn : [{
                    tag : 'a',
                    cls : ['navbar-brand'],
                    href: '#/',
                    html: 'conduit'
                }, {
                    tag: 'ul',
                    cls: ['nav navbar-nav', 'pull-xs-right'],
                    cn : [{
                        tag: 'li',
                        cls: ['nav-item'],
                        cn : [{
                            tag : 'a',
                            cls : ['nav-link'],
                            href: '#/',
                            html: 'Home'
                        }]
                    }, {
                        tag      : 'li',
                        cls      : ['nav-item'],
                        removeDom: true,
                        cn: [{
                            tag : 'a',
                            cls : ['nav-link'],
                            href: '#/editor',
                            cn: [{
                                tag: 'i',
                                cls: 'ion-compose'
                            }, {
                                vtype: 'text',
                                html : '&nbsp;New Article'
                            }]
                        }]
                    }, {
                        tag      : 'li',
                        cls      : ['nav-item'],
                        removeDom: true,
                        cn : [{
                            tag : 'a',
                            cls : ['nav-link'],
                            href: '#/settings',
                            cn: [{
                                tag: 'i',
                                cls: 'ion-gear-a'
                            }, {
                                vtype: 'text',
                                html : '&nbsp;Settings'
                            }]
                        }]
                    }, {
                        tag      : 'li',
                        cls      : ['nav-item'],
                        removeDom: true,
                        cn: [{
                            tag : 'a',
                            cls : ['nav-link'],
                            href: '#/profile',
                            cn  : [{
                                tag: 'img',
                                cls: ['user-pic']
                            }, {
                                vtype: 'text',
                                html : '&nbsp;Profile'
                            }]
                        }]
                    }, {
                        tag: 'li',
                        cls: ['nav-item'],
                        cn : [{
                            tag : 'a',
                            cls : ['nav-link'],
                            href: '#/login',
                            html: 'Sign in'
                        }]
                    }, {
                        tag: 'li',
                        cls: ['nav-item'],
                        cn : [{
                            tag : 'a',
                            cls : ['nav-link'],
                            href: '#/register',
                            html: 'Sign up'
                        }]
                    }]
                }]
            }]
        }
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

/***/ "./apps/realworld/view/HomeComponent.mjs":
/*!***********************************************!*\
  !*** ./apps/realworld/view/HomeComponent.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");
/* harmony import */ var _article_PreviewComponent_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./article/PreviewComponent.mjs */ "./apps/realworld/view/article/PreviewComponent.mjs");
/* harmony import */ var _article_TagListComponent_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./article/TagListComponent.mjs */ "./apps/realworld/view/article/TagListComponent.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/util/VDom.mjs */ "./node_modules/neo.mjs/src/util/VDom.mjs");






/**
 * @class RealWorld.view.HomeComponent
 * @extends Neo.component.Base
 */
class HomeComponent extends _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.view.HomeComponent'
         * @protected
         */
        className: 'RealWorld.view.HomeComponent',
        /**
         * @member {String|null} activeTag=null
         */
        activeTag: null,
        /**
         * @member {Object[]|null} articlePreviews_=null
         */
        articlePreviews_: null,
        /**
         * @member {String[]} cls=['home-page']
         */
        cls: ['home-page'],
        /**
         * @member {Number} countArticles_=10
         */
        countArticles_: 10,
        /**
         * @member {Number} countArticles_=10
         */
        currentPage_: 1,
        /**
         * @member {Object[]} feeds_
         */
        feeds_: [
            {name: 'Your Feed',   disabled: true},
            {name: 'Global Feed', active  : true}
        ],
        /**
         * @member {Boolean} loggedIn_=false
         */
        loggedIn_: false,
        /**
         * @member {Number} pageSize_=10
         */
        pageSize_: 10,
        /**
         * @member {RealWorld.view.article.PreviewComponent[]} previewComponents=[]
         */
        previewComponents: [],
        /**
         * @member {RealWorld.view.article.TagListComponent|null} tagList_=null
         */
        tagList_: null,
        /**
         * @member {Object} _vdom
         */
        _vdom: {
            cn: [{
                cls: ['banner'],
                cn : [{
                    cls: ['container'],
                    cn : [{
                        tag : 'h1',
                        cls : ['logo-font'],
                        html: 'conduit'
                    }, {
                        tag : 'p',
                        html: 'A place to share your knowledge.'
                    }]
                }]
            }, {
                cls: ['container', 'page'],
                cn : [{
                    cls: ['row'],
                    cn : [{
                        cls: ['col-md-9'],
                        cn : [{
                            cls: ['feed-toggle'],
                            cn : [{
                                tag : 'ul',
                                cls : ['nav', 'nav-pills', 'outline-active'],
                                flag: 'feed-header',
                                cn  : []
                            }]
                        }, {
                            tag: 'nav',
                            cn : [{
                                tag : 'ul',
                                cls : ['pagination'],
                                flag: 'pagination'
                            }]
                        }]
                    }]
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

        Neo.main.DomEvents.registerPreventDefaultTargets({
            name: 'click',
            cls : 'prevent-click'
        });

        let me           = this,
            domListeners = me.domListeners;

        domListeners.push(
            {click: {fn: me.onNavLinkClick,     delegate: '.nav-link',  scope: me}},
            {click: {fn: me.onPageNavLinkClick, delegate: '.page-link', scope: me}}
        );

        me.domListeners = domListeners;

        me.getController().on({
            afterSetCurrentUser: me.onCurrentUserChange,
            scope              : me
        });
    }

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        let me   = this,
            vdom = me.vdom;

        me.tagList = Neo.create({
            module  : _article_TagListComponent_mjs__WEBPACK_IMPORTED_MODULE_3__.default,
            parentId: me.id,

            listeners: {
                tagChange: me.onTagChange,
                scope    : me
            }
        });

        vdom.cn[1].cn[0].cn.push(me.tagList.vdom);

        me.vdom = vdom;
    }

    /**
     * Triggered after the articlePreviews config got changed
     * @param {Object[]|null} value
     * @param {Object[]|null} oldValue
     * @protected
     */
    afterSetArticlePreviews(value, oldValue) {
        let me        = this,
            container = me.getContainer(),
            footer    = container.cn.pop(),
            vdom      = me.vdom,
            config;

        container.cn = [container.cn.shift()];

        if (Array.isArray(value)) {
            value.forEach((item, index) => {
                config = {
                    author        : item.author.username,
                    createdAt     : item.createdAt,
                    description   : item.description,
                    favorited     : item.favorited,
                    favoritesCount: item.favoritesCount,
                    slug          : item.slug,
                    tagList       : item.tagList,
                    title         : item.title,
                    userImage     : item.author.image
                };

                if (!me.previewComponents[index]) {
                    me.previewComponents[index] = Neo.create({
                        module  : _article_PreviewComponent_mjs__WEBPACK_IMPORTED_MODULE_2__.default,
                        parentId: me.id,
                        ...config
                    });
                } else {
                    me.previewComponents[index].set(config, true); // hint: try this call with false and compare the delta updates
                }

                container.cn.push(me.previewComponents[index].vdom);
            });
        }

        container.cn.push(footer);

        me.vdom = vdom;
    }

    /**
     * Triggered after the countArticles config got changed
     * @param {Number} value
     * @param {Number} oldValue
     * @protected
     */
    afterSetCountArticles(value, oldValue) {
        let me          = this,
            vdom        = me.vdom,
            pagination  = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__.default.getByFlag(vdom, 'pagination'),
            pageSize    = me.pageSize,
            countPages  = Math.ceil(value / pageSize),
            currentPage = me.currentPage,
            i           = 1,
            cls;

        if (countPages < 2) {
            // todo: hide the paging bbar
        } else {
            pagination.cn = [];

            for (; i <= countPages; i++) {
                cls = ['page-item'];

                if (i === currentPage) {
                    cls.push('active');
                }

                pagination.cn.push({
                    tag: 'li',
                    cls: cls,
                    cn : [{
                        tag : 'a',
                        cls : ['page-link', 'prevent-click'],
                        id  : me.getNavLinkVdomId(i),
                        href: '',
                        html: i
                    }]
                });
            }
        }

        me.vdom = vdom;
    }

    /**
     * Triggered after the currentPage config got changed
     * @param {Number} value
     * @param {Number} oldValue
     * @protected
     */
    afterSetCurrentPage(value, oldValue) {
        let me   = this,
            vdom = me.vdom,
            node, oldNode;

        if (me.mounted) {
            node    = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__.default.findVdomChild(vdom, me.getNavLinkVdomId(value)).parentNode;
            oldNode = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__.default.findVdomChild(vdom, me.getNavLinkVdomId(oldValue)).parentNode;

            _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__.default.add(node.cls, 'active');
            _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__.default.remove(oldNode.cls, 'active');

            me.vdom = vdom;

            me.getController()._articlesOffset = (value - 1) * me.pageSize; // silent update
            me.getArticles();

            Neo.main.DomAccess.windowScrollTo({});
        }
    }

    /**
     * Triggered after the feeds config got changed
     * @param {Object[]} value
     * @param {Object[]} oldValue
     * @protected
     */
    afterSetFeeds(value, oldValue) {
        let me         = this,
            vdom       = me.vdom,
            feedHeader = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__.default.getByFlag(vdom, 'feed-header'),
            cls;

        feedHeader.cn = [];

        value.forEach((item, index) => {
            cls = ['prevent-click', 'nav-link'];

            if (item.active)   {cls.push('active');}
            if (item.disabled) {cls.push('disabled');}

            feedHeader.cn.push({
                tag: 'li',
                cls: ['nav-item'],
                id : me.id + '__nav-item_' + index,
                cn : [{
                    tag: 'a',
                    cls: cls,
                    href: '',
                    html: item.name,
                    id  : me.id + '__nav-item-link_' + index,
                }]
            });
        });
    }

    /**
     * Triggered after the loggedIn config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetLoggedIn(value, oldValue) {
        let me      = this,
            vdom    = me.vdom,
            navItem = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__.default.findVdomChild(vdom, me.id + '__nav-item-link_0').vdom;

        _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__.default[value ? 'remove' : 'add'](navItem.cls, 'disabled');
        me.vdom = vdom;
    }

    /**
     * todo
     * Triggered after the pageSize config got changed
     * @param {Number} value
     * @param {Number} oldValue
     * @protected
     */
    afterSetPageSize(value, oldValue) {
        let me = this,
            i  = 0;

        console.log('afterSetPageSize', value);

        for (; i < value; i++) {

        }
    }

    /**
     * Creates an article id using the view id as a prefix
     * @returns {String} itemId
     */
    getArticleId(id) {
        return this.id + '__' + id;
    }

    /**
     *
     * @param {Object} [params={}]
     * @param {Object} [opts={}]
     */
    getArticles(params={}, opts={}) {
        let me = this;

        if (me.activeTag) {
            params = {
                tag: me.activeTag,
                ...params
            };
        }

        me.getController().getArticles(params, opts).then(data => {
            me.set({
                articlePreviews: data.json.articles,
                countArticles  : data.json.articlesCount
            });
        });
    }

    /**
     *
     * @returns {Object} vdom
     */
    getContainer() {
        let el = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__.default.findVdomChild(this.vdom, {cls: 'col-md-9'});
        return el && el.vdom;
    }

    /**
     *
     * @param {String} nodeId
     * @returns {Number}
     */
    getNavLinkId(nodeId) {
        return parseInt(nodeId.split('__')[1]);
    }

    /**
     *
     * @param {Number|String} id
     * @returns {String}
     */
    getNavLinkVdomId(id) {
        return this.id + '__' + id;
    }

    /**
     *
     * @param {Object} data
     */
    onNavLinkClick(data) {
        let me         = this,
            vdom       = me.vdom,
            el         = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__.default.findVdomChild(vdom, data.path[0].id),
            feedHeader = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__.default.getByFlag(vdom, 'feed-header'),
            opts       = {};

        if (!el.vdom.cls.includes('disabled')) {
            switch(el.vdom.html) {
                case 'Global Feed':
                    me.activeTag = null;
                    break;
                case 'Your Feed':
                    me.activeTag = null;
                    opts = {
                        slug: 'feed'
                    };
                    break;
                default: // tag
                    me.activeTag = el.vdom.html.substring(2); // remove the '# '
                    break;
            }

            feedHeader.cn.forEach(item => {
                _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__.default[item.id === el.parentNode.id ? 'add' : 'remove'](item.cn[0].cls, 'active');
            });


            me._currentPage = 1; // silent update
            me.vdom = vdom;

            me.getController()._articlesOffset = 0; // silent update
            me.getArticles({}, opts);
        }
    }

    /**
     *
     * @param {Object} value
     */
    onCurrentUserChange(value) {
        this.loggedIn = !!value;
    }

    /**
     *
     * @param {Object} data
     */
    onPageNavLinkClick(data) {
        this.currentPage = this.getNavLinkId(data.path[0].id);
    }

    /**
     *
     * @param {Object} opts
     * @param {String|null} opts.oldValue
     * @param {String|null} opts.value
     */
    onTagChange(opts) {
        let me    = this,
            feeds = me.feeds,
            name  = '# ' + opts.value;

        feeds.forEach(item => {
            item.active = false;
        });

        if (feeds.length < 3) {
            feeds.push({
                active: true,
                name  : name
            });
        } else {
            Object.assign(feeds[2], {
                active: true,
                name  : name
            });
        }

        me.activeTag    = opts.value;
        me._currentPage = 1; // silent update
        me.feeds        = feeds;

        me.getController()._articlesOffset = 0; // silent update

        me.getArticles({
            tag: opts.value
        });
    }
}

Neo.applyClassConfig(HomeComponent);



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
/* harmony import */ var _HomeComponent_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HomeComponent.mjs */ "./apps/realworld/view/HomeComponent.mjs");
/* harmony import */ var _MainContainerController_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MainContainerController.mjs */ "./apps/realworld/view/MainContainerController.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_container_Viewport_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/container/Viewport.mjs */ "./node_modules/neo.mjs/src/container/Viewport.mjs");






/**
 * @class RealWorld.view.MainContainer
 * @extends Neo.container.Viewport
 */
class MainContainer extends _node_modules_neo_mjs_src_container_Viewport_mjs__WEBPACK_IMPORTED_MODULE_4__.default {
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
        controller: _MainContainerController_mjs__WEBPACK_IMPORTED_MODULE_3__.default,
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

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        if (!Neo.config.hash) {
            this._items.splice(1, 0, {
                module   : _HomeComponent_mjs__WEBPACK_IMPORTED_MODULE_2__.default,
                flex     : 1,
                reference: 'home'
            });
        }
    }
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
/* harmony import */ var _article_Component_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./article/Component.mjs */ "./apps/realworld/view/article/Component.mjs");
/* harmony import */ var _api_Article_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/Article.mjs */ "./apps/realworld/api/Article.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_controller_Component_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/controller/Component.mjs */ "./node_modules/neo.mjs/src/controller/Component.mjs");
/* harmony import */ var _article_CreateComponent_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./article/CreateComponent.mjs */ "./apps/realworld/view/article/CreateComponent.mjs");
/* harmony import */ var _api_Favorite_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api/Favorite.mjs */ "./apps/realworld/api/Favorite.mjs");
/* harmony import */ var _HomeComponent_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./HomeComponent.mjs */ "./apps/realworld/view/HomeComponent.mjs");
/* harmony import */ var _api_config_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../api/config.mjs */ "./apps/realworld/api/config.mjs");
/* harmony import */ var _api_Profile_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../api/Profile.mjs */ "./apps/realworld/api/Profile.mjs");
/* harmony import */ var _user_ProfileComponent_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./user/ProfileComponent.mjs */ "./apps/realworld/view/user/ProfileComponent.mjs");
/* harmony import */ var _user_SettingsComponent_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./user/SettingsComponent.mjs */ "./apps/realworld/view/user/SettingsComponent.mjs");
/* harmony import */ var _user_SignUpComponent_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./user/SignUpComponent.mjs */ "./apps/realworld/view/user/SignUpComponent.mjs");
/* harmony import */ var _api_Tag_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../api/Tag.mjs */ "./apps/realworld/api/Tag.mjs");
/* harmony import */ var _api_User_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../api/User.mjs */ "./apps/realworld/api/User.mjs");














/**
 * @class RealWorld.view.MainContainerController
 * @extends Neo.controller.Component
 */
class MainContainerController extends _node_modules_neo_mjs_src_controller_Component_mjs__WEBPACK_IMPORTED_MODULE_2__.default {
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

    onConstructed() {
        super.onConstructed();

        const me = this;

        _api_User_mjs__WEBPACK_IMPORTED_MODULE_12__.default.on('ready', me.getCurrentUser, me);

        // default route => home
        if (!Neo.config.hash) {
            me.onHashChange({
                appNames  : ['RealWorld'],
                hash      : {'/': ''},
                hashString: '/'
            }, null);
        }
    }

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
        _api_Article_mjs__WEBPACK_IMPORTED_MODULE_1__.default.delete({slug: slug}).then(data => {
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

        return _api_Article_mjs__WEBPACK_IMPORTED_MODULE_1__.default.deleteComment(slug, id).then(data => {
            me.getComments(slug);
        });
    }

    /**
     *
     * @param {String} slug
     * @param {Boolean} favorited
     */
    favoriteArticle(slug, favorited) {
        return _api_Favorite_mjs__WEBPACK_IMPORTED_MODULE_4__.default[favorited ? 'add' : 'remove'](slug);
    }

    /**
     *
     * @param {String} slug
     * @param {Boolean} follow
     */
    followUser(slug, follow) {
        return _api_Profile_mjs__WEBPACK_IMPORTED_MODULE_7__.default[follow ? 'follow' : 'unfollow'](slug);
    }

    /**
     * Article details: get an article providing a user slug
     * @param {String} slug
     */
    getArticle(slug) {
        return _api_Article_mjs__WEBPACK_IMPORTED_MODULE_1__.default.get({
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
        return _api_Article_mjs__WEBPACK_IMPORTED_MODULE_1__.default.get({
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
        _api_Article_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getComments(slug).then(data => {
            this.articleComponent.comments = data.json.comments;
        });
    }

    /**
     *
     * @param {String} token
     */
    getCurrentUser(token) {
        if (token) {
            _api_User_mjs__WEBPACK_IMPORTED_MODULE_12__.default.get({
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

        _api_Profile_mjs__WEBPACK_IMPORTED_MODULE_7__.default.get({
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
        _api_Tag_mjs__WEBPACK_IMPORTED_MODULE_11__.default.get().then(data => {
            this.homeComponent.tagList.tags = data.json.tags;
        });
    }

    /**
     *
     * @param {String} key
     * @param {Neo.component.Base} module
     * @param {String} reference
     * @returns {Neo.component.Base} The matching view instance
     */
    getView(key, module, reference) {
        const me = this;

        if (!me[key]) {
            me[key] = Neo.create({
                module   : module,
                parentId : me.component.id,
                reference: reference
            });
        }

        return me[key];
    }

    /**
     * @param {Object} userData
     */
    login(userData) {
        this.currentUser = userData;

        Neo.main.addon.LocalStorage.createLocalStorageItem({
            key  : _api_config_mjs__WEBPACK_IMPORTED_MODULE_6__.LOCAL_STORAGE_KEY,
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
            key: _api_config_mjs__WEBPACK_IMPORTED_MODULE_6__.LOCAL_STORAGE_KEY
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
     * @param {Object} value
     * @param {Object} oldValue
     */
    onHashChange(value, oldValue) {
        let me         = this,
            component  = me.component,
            hash       = value.hash,
            hashString = value.hashString,
            newView, slug;

        if (!component.mounted) { // the initial hash change gets triggered before the vnode got back from the vdom worker (using autoMount)
            component.on('mounted', () => {
                me.onHashChange(value, oldValue);
            });
        } else {
            me.hashString = hashString;

            // adjust the active header link
            component.items[0].activeItem = Object.keys(hash)[0];

                 if (hashString === '/')                {newView = me.getView('homeComponent',     _HomeComponent_mjs__WEBPACK_IMPORTED_MODULE_5__.default,     'home');}
            else if (hashString.includes('/article/'))  {newView = me.getView('articleComponent',  _article_Component_mjs__WEBPACK_IMPORTED_MODULE_0__.default,  'article');}
            else if (hashString.includes('/editor'))    {newView = me.getView('createComponent',   _article_CreateComponent_mjs__WEBPACK_IMPORTED_MODULE_3__.default,   'editor');}
            else if (hashString.includes('/profile/'))  {newView = me.getView('profileComponent',  _user_ProfileComponent_mjs__WEBPACK_IMPORTED_MODULE_8__.default,  'profile');}
            else if (hash.hasOwnProperty('/login'))    {newView = me.getView('signUpComponent',   _user_SignUpComponent_mjs__WEBPACK_IMPORTED_MODULE_10__.default,   'signup'); newView.mode = 'signin';}
            else if (hash.hasOwnProperty('/register')) {newView = me.getView('signUpComponent',   _user_SignUpComponent_mjs__WEBPACK_IMPORTED_MODULE_10__.default,   'signup'); newView.mode = 'signup';}
            else if (hash.hasOwnProperty('/settings')) {newView = me.getView('settingsComponent', _user_SettingsComponent_mjs__WEBPACK_IMPORTED_MODULE_9__.default, 'settings');}

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

        return _api_Article_mjs__WEBPACK_IMPORTED_MODULE_1__.default.postComment(slug, opts).then(data => {
            me.getComments(slug);
        });
    }

    /**
     *
     * @param {Object} opts
     * @returns {Promise<any>}
     */
    saveUser(opts) {
        return _api_User_mjs__WEBPACK_IMPORTED_MODULE_12__.default.post(opts);
    }

    /**
     *
     * @param {Object} [opts)
     * @returns {Promise<any>}
     */
    updateSettings(opts={}) {
        return _api_User_mjs__WEBPACK_IMPORTED_MODULE_12__.default.put({
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



/***/ }),

/***/ "./apps/realworld/view/article/CommentComponent.mjs":
/*!**********************************************************!*\
  !*** ./apps/realworld/view/article/CommentComponent.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CommentComponent)
/* harmony export */ });
/* harmony import */ var _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/util/VDom.mjs */ "./node_modules/neo.mjs/src/util/VDom.mjs");



/**
 * @class RealWorld.view.article.CommentComponent
 * @extends Neo.component.Base
 */
class CommentComponent extends _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.view.article.CommentComponent'
         * @protected
         */
        className: 'RealWorld.view.article.CommentComponent',
        /**
         * @member {Object|null} author_=null
         */
        author_: null,
        /**
         * @member {String|null} body_=null
         */
        body_: null,
        /**
         * @member {String[]} cls=['card']
         */
        cls: ['card'],
        /**
         * @member {Number|null} commentId=null
         */
        commentId: null,
        /**
         * @member {String|null} createdAt_=null
         */
        createdAt_: null,
        /**
         * Not in use
         * @member {String|null} updatedAt=null
         */
        updatedAt: null,
        /**
         * @member {Object} _vdom
         */
        _vdom: {
            cn: [{
                cls: ['card-block'],
                cn : [{
                    tag: 'p',
                    cls: ['card-text']
                }]
            }, {
                cls: ['card-footer'],
                cn : [{
                    tag : 'a',
                    cls : ['comment-author'],
                    href: '',
                    cn  : [{
                        tag: 'img',
                        cls: ['comment-author-img']
                    }]
                }, {
                    vtype: 'text',
                    html : '&nbsp;'
                }, {
                    tag : 'a',
                    cls : ['comment-author'],
                    href: ''
                }, {
                    tag : 'span',
                    cls : ['date-posted']
                }, {
                    tag : 'span',
                    cls : ['mod-options'],
                    flag: 'mod-options',
                    cn: [
                        //{tag: 'i', cls: ['ion-edit']}, // not implemented in other apps => not sure what should happen
                        {tag: 'i', cls: ['ion-trash-a']}
                    ]
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

        let me           = this,
            domListeners = me.domListeners;

        domListeners.push({
            click: {
                fn      : me.onDeleteButtonClick,
                delegate: '.ion-trash-a',
                scope   : me
            }
        }/*, {
            click: {
                fn      : me.onEditButtonClick,
                delegate: '.ion-edit',
                scope   : me
            }
        }*/);

        me.domListeners = domListeners;

        me.getController().on({
            afterSetCurrentUser: me.onCurrentUserChange,
            scope              : me
        });
    }

    /**
     * Triggered after the author config got changed
     * @param {Object|null} value
     * @param {Object|null} oldValue
     * @protected
     */
    afterSetAuthor(value, oldValue) {
        if (value) {
            let me   = this,
                vdom = me.vdom;

            vdom.cn[1].cn[0].cn[0].src = value.image;
            vdom.cn[1].cn[2].html      = value.username;

            me.vdom = vdom;

            me.onCurrentUserChange();
        }
    }

    /**
     * Triggered after the body config got changed
     * @param {String|null} value
     * @param {String|null} oldValue
     * @protected
     */
    afterSetBody(value, oldValue) {
        if (value) {
            let vdom = this.vdom;

            vdom.cn[0].cn[0].html = value;
            this.vdom = vdom;
        }
    }

    /**
     * Triggered after the createdAt config got changed
     * @param {String|null} value
     * @param {String|null} oldValue
     * @protected
     */
    afterSetCreatedAt(value, oldValue) {
        if (value) {
            let vdom = this.vdom;

            vdom.cn[1].cn[3].html = new Intl.DateTimeFormat('en-US', {
                day  : 'numeric',
                month: 'long',
                year : 'numeric'
            }).format(new Date(value));

            this.vdom = vdom;
        }
    }

    /**
     *
     */
    onCurrentUserChange() {
        let me          = this,
            currentUser = me.getController().currentUser,
            vdom        = me.vdom;

        if (currentUser) {
            _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getByFlag(vdom, 'mod-options').removeDom = me.author.username !== currentUser.username;

            me.vdom = vdom;
        }
    }

    /**
     *
     * @param {Object} data
     */
    onDeleteButtonClick(data) {
        this.getController().deleteComment(this.commentId);
    }

    /**
     * Not supported yet
     * @param {Object} data
     */
    onEditButtonClick(data) {
        console.log('onEditButtonClick');
    }
}

Neo.applyClassConfig(CommentComponent);



/***/ }),

/***/ "./apps/realworld/view/article/Component.mjs":
/*!***************************************************!*\
  !*** ./apps/realworld/view/article/Component.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Component)
/* harmony export */ });
/* harmony import */ var _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");
/* harmony import */ var _CommentComponent_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CommentComponent.mjs */ "./apps/realworld/view/article/CommentComponent.mjs");
/* harmony import */ var _CreateCommentComponent_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CreateCommentComponent.mjs */ "./apps/realworld/view/article/CreateCommentComponent.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/util/VDom.mjs */ "./node_modules/neo.mjs/src/util/VDom.mjs");






/**
 * @class RealWorld.view.article.Component
 * @extends Neo.component.Base
 */
class Component extends _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.view.article.Component'
         * @protected
         */
        className: 'RealWorld.view.article.Component',
        /**
         * @member {Object|null} author_=null
         */
        author_: null,
        /**
         * @member {String|null} body_=null
         */
        body_: null,
        /**
         * @member {RealWorld.view.article.PreviewComponent[]} commentComponents=[]
         */
        commentComponents: [],
        /**
         * @member {Object[]|null} comments_=null
         */
        comments_: null,
        /**
         * @member {RealWorld.view.article.CreateCommentComponent|null} createCommentComponent=null
         */
        createCommentComponent: null,
        /**
         * @member {String|null} createdAt_=null
         */
        createdAt_: null,
        /**
         * @member {String[]} cls=['article-page']
         */
        cls: ['article-page'],
        /**
         * @member {Boolean} favorited_=false
         */
        favorited_: false,
        /**
         * @member {Number|null} favoritesCount_=null
         */
        favoritesCount_: null,
        /**
         * @member {Array|null} tagList_=null
         */
        tagList_: null,
        /**
         * @member {String|null} title_=null
         */
        title_: null,
        /**
         * @member {Object} _vdom
         */
        _vdom: {
            cn: [{
                cls: ['banner'],
                cn : [{
                    cls: ['container'],
                    cn : [{
                        tag : 'h1',
                        flag: 'title'
                    }, {
                        cls: ['article-meta'],
                        cn : [{
                            tag : 'a',
                            flag: 'userimage',
                            cn  : [{tag: 'img'}]
                        }, {
                            cls: ['info'],
                            cn : [{
                                tag : 'a',
                                cls : ['author'],
                                flag: 'username'
                            }, {
                                tag : 'span',
                                cls : ['date'],
                                flag: 'createdAt'
                            }]
                        }, {
                            tag: 'button',
                            cls: ['btn', 'btn-sm', 'btn-outline-secondary', 'follow-button'],
                            cn : [{
                                tag : 'i',
                                flag: 'followIcon'
                            }, {
                                vtype: 'text',
                                flag : 'followAuthor'
                            }, {
                                vtype: 'text',
                                flag : 'username'
                            }]
                        }, {
                            tag      : 'button',
                            cls      : ['btn', 'btn-sm', 'btn-outline-secondary', 'edit-button'],
                            flag     : 'edit-button',
                            removeDom: true,
                            cn: [{
                                tag: 'i',
                                cls: ['ion-edit']
                            }, {
                                vtype: 'text',
                                html : ' Edit Article'
                            }]
                        }, {
                            vtype: 'text',
                            html : '&nbsp;&nbsp;'
                        }, {
                            tag : 'button',
                            cls : ['btn', 'btn-sm', 'btn-outline-primary', 'favorite-button'],
                            flag: 'favorited',
                            cn  : [{
                                tag: 'i',
                                cls: ['ion-heart']
                            }, {
                                vtype: 'text',
                                html : '&nbsp;'
                            }, {
                                vtype: 'text'
                            }, {
                                vtype: 'text',
                                html : ' Post '
                            }, {
                                tag : 'span',
                                cls : ['counter'],
                                flag: 'favoritesCount'
                            }]
                        }, {
                            tag      : 'button',
                            cls      : ['btn', 'btn-sm', 'btn-outline-danger', 'delete-button'],
                            flag     : 'delete-button',
                            removeDom: true,
                            cn: [{
                                tag: 'i',
                                cls: ['ion-trash-a']
                            }, {
                                vtype: 'text',
                                html : ' Delete Article'
                            }]
                        }]
                    }]
                }]
            }, {
                cls: ['container', 'page'],
                cn : [{
                    cls: ['row', 'article-content'],
                    cn : [{
                        cls : ['col-md-12'],
                        flag: 'body',
                        cn  : []
                    }]
                }, {
                    tag: 'hr'
                }, {
                    cls : ['article-actions'],
                    flag: 'article-actions',
                    cn  : [{
                        cls: ['article-meta'],
                        cn : [{
                            tag : 'a',
                            flag: 'userimage',
                            cn  : [{tag: 'img'}]
                        }, {
                            cls: ['info'],
                            cn : [{
                                tag : 'a',
                                cls : ['author'],
                                flag: 'username'
                            }, {
                                tag : 'span',
                                cls : ['date'],
                                html: 'January 20th'
                            }]
                        }, {
                            tag: 'button',
                            cls: ['btn', 'btn-sm', 'btn-outline-secondary', 'follow-button'],
                            cn : [{
                                tag : 'i',
                                flag: 'followIcon'
                            }, {
                                vtype: 'text',
                                flag : 'followAuthor'
                            }, {
                                vtype: 'text',
                                flag : 'username'
                            }]
                        }, {
                            vtype: 'text',
                            html : '&nbsp;&nbsp;'
                        }, {
                            tag : 'button',
                            cls : ['btn', 'btn-sm', 'btn-outline-primary', 'favorite-button'],
                            flag: 'favorited',
                            cn  : [{
                                tag: 'i',
                                cls: ['ion-heart']
                            }, {
                                vtype: 'text',
                                html : '&nbsp;'
                            }, {
                                vtype: 'text'
                            }, {
                                vtype: 'text',
                                html : ' Post '
                            }, {
                                tag : 'span',
                                cls : ['counter'],
                                flag: 'favoritesCount'
                            }]
                        }]
                    }]
                }, {
                    cls: 'row',
                    cn : [{
                        cls : ['col-xs-12', 'col-md-8', 'offset-md-2'],
                        flag: 'comments-section',
                        cn  : []
                    }]
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

        let me           = this,
            domListeners = me.domListeners;

        domListeners.push(
            {click: {fn: me.onDeleteButtonClick,   delegate: '.delete-button',   scope: me}},
            {click: {fn: me.onEditButtonClick,     delegate: '.edit-button',     scope: me}},
            {click: {fn: me.onFavoriteButtonClick, delegate: '.favorite-button', scope: me}},
            {click: {fn: me.onFollowButtonClick,   delegate: '.follow-button',   scope: me}
        });

        me.domListeners = domListeners;

        me.getController().on({
            afterSetCurrentUser: me.onCurrentUserChange,
            scope              : me
        });
    }

    /**
     *
     */
    onConstructed() {
        let me          = this,
            currentUser = me.getController().currentUser,
            vdom        = me.vdom;

        me.createCommentComponent = Neo.create({
            module   : _CreateCommentComponent_mjs__WEBPACK_IMPORTED_MODULE_2__.default,
            parentId : me.id,
            userImage: currentUser && currentUser.image || null
        });

        _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__.default.getByFlag(vdom, 'comments-section').cn.unshift(me.createCommentComponent.vdom);

        me.vdom = vdom;

        super.onConstructed();
    }

    /**
     * Triggered after the author config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetAuthor(value, oldValue) {
        if (value) {
            let me   = this,
                vdom = me.vdom;

            _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__.default.getFlags(vdom, 'followAuthor').forEach(node => {
                node.html = value.following ? ' Unfollow ' : ' Follow ';
            });

            _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__.default.getFlags(vdom, 'followIcon').forEach(node => {
                node.cls = value.following ? ['ion-minus-round'] : ['ion-plus-round'];
            });

            _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__.default.getFlags(vdom, 'userimage').forEach(node => {
                node.href = '#/profile/' + value.username;
                node.cn[0].src = value.image;
            });

            _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__.default.getFlags(vdom, 'username').forEach(node => {
                node.href = '#/profile/' + value.username;
                node.html = value.username;
            });

            me.vdom = vdom;

            me.onCurrentUserChange();
        }
    }

    /**
     * Triggered after the body config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetBody(value, oldValue) {
        const me = this;

        if (value) {
            Neo.main.addon.Markdown.markdownToHtml(value).then(html => {
                let vdom = me.vdom;

                _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__.default.getByFlag(vdom, 'body').cn[0] = {
                    cn: [{
                        tag : 'p',
                        html: html
                    }]
                };

                me.vdom = vdom;
            });
        }
    }

    /**
     * Triggered after the comments config got changed
     * @param {Object[]|null} value
     * @param {Object[]|null} oldValue
     * @protected
     */
    afterSetComments(value, oldValue) {
        if (Array.isArray(value)) {
            let me        = this,
                vdom      = me.vdom,
                container = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__.default.getByFlag(vdom, 'comments-section'),
                config;

            container.cn = [container.cn.shift()]; // keep the CreateCommentComponent

            value.forEach((item, index) => {
                config = {
                    author   : item.author,
                    body     : item.body,
                    commentId: item.id,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                };

                if (!me.commentComponents[index]) {
                    me.commentComponents[index] = Neo.create({
                        module  : _CommentComponent_mjs__WEBPACK_IMPORTED_MODULE_1__.default,
                        parentId: me.id,
                        ...config
                    });
                } else {
                    me.commentComponents[index].set(config, true);
                }

                container.cn.push(me.commentComponents[index].vdom);
            });

            me.vdom = vdom;
        }
    }

    /**
     * Triggered after the createdAt config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetCreatedAt(value, oldValue) {
        if (value) {
            let vdom = this.vdom;

            _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__.default.getByFlag(vdom, 'createdAt').html = new Intl.DateTimeFormat('en-US', {
                day  : 'numeric',
                month: 'long',
                year : 'numeric'
            }).format(new Date(value));

            this.vdom = vdom;
        }
    }

    /**
     * Triggered after the favorited config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetFavorited(value, oldValue) {
        let me   = this,
            vdom = me.vdom;

        _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__.default.getFlags(vdom, 'favorited').forEach(node => {
            node.cn[2].html = value ? 'Unfavorite' : 'Favorite';

            _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__.default.add(node.cls, value ? 'btn-primary' : 'btn-outline-primary');
            _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__.default.remove(node.cls, value ? 'btn-outline-primary' : 'btn-primary');
        });

        me.vdom = vdom;

        // ignore the initial setter call
        if (Neo.isBoolean(oldValue)) {
            me.getController().favoriteArticle(me.slug, value).then(data => {
                me.favoritesCount = data.json.article.favoritesCount;
            });
        }
    }

    /**
     * Triggered after the favoritesCount config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetFavoritesCount(value, oldValue) {
        if (Neo.isNumber(value)) {
            let vdom = this.vdom;

            _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__.default.getFlags(vdom, 'favoritesCount').forEach(node => {
                node.html = `(${value})`;
            });

            this.vdom = vdom;
        }
    }

    /**
     * Triggered after the tagList config got changed
     * @param {Array} value
     * @param {Array} oldValue
     * @protected
     */
    afterSetTagList(value, oldValue) {
        let me   = this,
            vdom = me.vdom,
            body = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__.default.getByFlag(vdom, 'body'),
            tagList;

        if (Array.isArray(value) && value.length > 0) {
            tagList = {
                tag: 'ul',
                cls: ['tag-list'],
                cn : []
            };

            value.forEach(item => {
                tagList.cn.push({
                    tag : 'li',
                    cls : ['tag-default', 'tag-pill', 'tag-outline'],
                    html: item
                })
            });

            body.cn[1] = tagList;
        } else {
            if (body.cn[1]) {
                body.cn[1].removeDom = true;
            }
        }

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

        _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__.default.getByFlag(vdom, 'title').html = value;
        this.vdom = vdom;
    }

    /**
     *
     */
    onCurrentUserChange() {console.log('### onCurrentUserChange');
        let me          = this,
            currentUser = me.getController().currentUser,
            vdom        = me.vdom,
            isCurrentUser;

        if (me.author && currentUser) {
            isCurrentUser = me.author.username === currentUser.username;

            vdom.cn[0].cn[0].cn[1].cn[2].removeDom = isCurrentUser; // follow user button
            vdom.cn[0].cn[0].cn[1].cn[5].removeDom = isCurrentUser; // favorite post button

            _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__.default.getByFlag(vdom, 'article-actions').removeDom = isCurrentUser;
            _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__.default.getByFlag(vdom, 'delete-button')  .removeDom = !isCurrentUser;
            _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__.default.getByFlag(vdom, 'edit-button')    .removeDom = !isCurrentUser;

            me.vdom = vdom;
        }
    }

    /**
     *
     * @param {Object} data
     */
    onDeleteButtonClick(data) {
        this.getController().deleteArticle(this.slug);
    }

    /**
     *
     * @param {Object} data
     */
    onEditButtonClick(data) {
        Neo.Main.setRoute({
            value: '/editor/' + this.slug
        });
    }

    /**
     *
     * @param {Object} data
     */
    onFavoriteButtonClick(data) {
        this.favorited = !this.favorited;
    }

    /**
     *
     * @param {Object} data
     */
    onFollowButtonClick(data) {
        let me = this;

        me.getController().followUser(me.author.username, !me.author.following).then(data => {
            me.author = data.json.profile;
        });
    }
}

Neo.applyClassConfig(Component);




/***/ }),

/***/ "./apps/realworld/view/article/CreateCommentComponent.mjs":
/*!****************************************************************!*\
  !*** ./apps/realworld/view/article/CreateCommentComponent.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateCommentComponent)
/* harmony export */ });
/* harmony import */ var _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");


/**
 * @class RealWorld.view.article.CreateCommentComponent
 * @extends Neo.component.Base
 */
class CreateCommentComponent extends _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.view.article.CreateCommentComponent'
         * @protected
         */
        className: 'RealWorld.view.article.CreateCommentComponent',
        /**
         * @member {String[]} cls=['card', 'comment-form']
         */
        cls: ['card', 'comment-form'],
        /**
         * @member {String|null} userImage_=null
         */
        userImage_: null,
        /**
         * @member {String|null} userName_=null
         */
        userName_: null,
        /**
         * @member {Object} _vdom
         */
        _vdom: {
            tag: 'form',
            cn : [{
                cls: ['card-block'],
                cn : [{
                    tag        : 'textarea',
                    cls        : ['form-control'],
                    placeholder: 'Write a comment...',
                    rows       : 3
                }]
            }, {
                cls: ['card-footer'],
                cn : [{
                    tag: 'img',
                    cls: ['comment-author-img'],
                    src: 'https://static.productionready.io/images/smiley-cyrus.jpg' // https://github.com/gothinkster/realworld/issues/442
                }, {
                    vtype: 'text',
                    html : '&nbsp;'
                }, {
                    tag : 'span',
                    cls : ['comment-author']
                }, {
                    tag : 'button',
                    cls : ['btn', 'btn-sm', 'btn-primary'],
                    html: 'Post Comment',
                    type: 'button' // override the default submit type
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

        let me           = this,
            domListeners = me.domListeners,
            vdom         = me.vdom;

        domListeners.push({
            click: {
                fn      : me.onSubmitButtonClick,
                delegate: '.btn-primary',
                scope   : me
            }
        });

        me.domListeners = domListeners;

        vdom.cn[0].cn[0].id = me.getInputElId();
        me.vdom = vdom;

        me.getController().on({
            afterSetCurrentUser: me.onCurrentUserChange,
            scope              : me
        });
    }

    /**
     * Triggered after the userImage config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetUserImage(value, oldValue) {
        if (value) {
            let vdom = this.vdom;

            vdom.cn[1].cn[0].src = value;
            this.vdom = vdom;
        }
    }

    /**
     * Triggered after the userName config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetUserName(value, oldValue) {
        if (value) {
            let vdom = this.vdom;

            vdom.cn[1].cn[2].html = value;
            this.vdom = vdom;
        }
    }

    /**
     *
     * @returns {String}
     */
    getInputElId() {
        return this.id + '__input';
    }

    /**
     *
     * @param {Object} value
     */
    onCurrentUserChange(value) {
        this.set({
            userImage: value.image,
            userName : value.username
        });
    }

    /**
     *
     * @param {Object} data
     */
    onSubmitButtonClick(data) {
        let me = this;

        // read the input values from the main thread
        // we could register an oninput event to this view as well and store the changes
        Neo.main.DomAccess.getAttributes({
            id        : me.getInputElId(),
            attributes: 'value'
        }).then(data => {
            me.getController().postComment({
                data: JSON.stringify({
                    comment: {
                        body: data.value
                    }
                })
            }).then(data => {
                let vdom = me.vdom;

                vdom.cn[0].cn[0].value = ''; // reset the textarea value
                me.vdom = vdom;
            });
        });
    }
}

Neo.applyClassConfig(CreateCommentComponent);



/***/ }),

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
        _vdom: {
            cn: [{
                cls: ['container', 'page'],
                cn : [{
                    cls: ['row'],
                    cn : [{
                        cls: ['col-md-10', 'offset-md-1', 'col-xs-12'],
                        cn : [{
                            tag : 'ul',
                            flag: 'errors',
                            cls : ['error-messages']
                        }, {
                            tag: 'form',
                            cn : [{
                                tag: 'fieldset',
                                cn : [{
                                    tag: 'fieldset',
                                    cls: ['form-group'],
                                    cn : [{
                                        tag        : 'input',
                                        cls        : ['form-control', 'form-control-lg'],
                                        name       : 'title',
                                        flag       : 'title',
                                        placeholder: 'Article Title',
                                        type       : 'text'
                                    }]
                                }, {
                                    tag: 'fieldset',
                                    cls: ['form-group'],
                                    cn : [{
                                        tag        : 'input',
                                        cls        : ['form-control'],
                                        name       : 'description',
                                        flag       : 'description',
                                        placeholder: 'What\'s this article about?',
                                        type       : 'text'
                                    }]
                                }, {
                                    tag: 'fieldset',
                                    cls: ['form-group'],
                                    cn : [{
                                        tag        : 'textarea',
                                        cls        : ['form-control'],
                                        name       : 'body',
                                        flag       : 'body',
                                        placeholder: 'Write your article (in markdown)',
                                        rows       : 8
                                    }]
                                }, {
                                    tag: 'fieldset',
                                    cls: ['form-group'],
                                    cn : [{
                                        tag        : 'input',
                                        cls        : ['form-control', 'field-tags'],
                                        name       : 'tags',
                                        flag       : 'tags',
                                        placeholder: 'Enter tags',
                                        type       : 'text'
                                    }, {
                                        cls : ['tag-list'],
                                        flag: 'tag-list'
                                    }]
                                }, {
                                    tag : 'button',
                                    cls : ['btn', 'btn-lg', 'btn-primary', 'pull-xs-right'],
                                    html: 'Publish Article',
                                    type: 'button' // override the default submit type
                                }]
                            }]
                        }]
                    }]
                }]
            }]
        }
    }}

    /**
     * constructor
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
        }, {
            click: {
                fn      : me.onTagClose,
                delegate: '.ion-close-round',
                scope   : me
            }
        }, {
            keydown: {
                fn      : me.onFieldTagsKeyDown,
                delegate: '.field-tags',
                scope   : me
            }
        });

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



/***/ }),

/***/ "./apps/realworld/view/article/PreviewComponent.mjs":
/*!**********************************************************!*\
  !*** ./apps/realworld/view/article/PreviewComponent.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PreviewComponent)
/* harmony export */ });
/* harmony import */ var _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/util/VDom.mjs */ "./node_modules/neo.mjs/src/util/VDom.mjs");




/**
 * @class RealWorld.view.article.PreviewComponent
 * @extends Neo.component.Base
 */
class PreviewComponent extends _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.view.article.PreviewComponent'
         * @protected
         */
        className: 'RealWorld.view.article.PreviewComponent',
        /**
         * @member {String|null} author_=null
         */
        author_: null,
        /**
         * @member {String[]} cls=['article-preview']
         */
        cls: ['article-preview'],
        /**
         * ISO 8601 timestamp
         * @member {String|null} createdAt_=null
         */
        createdAt_: null,
        /**
         * @member {String|null} description_=null
         */
        description_: null,
        /**
         * @member {Boolean} favorited_=false
         */
        favorited_: false,
        /**
         * @member {Number|null} favoritesCount_=null
         */
        favoritesCount_: null,
        /**
         * @member {String|null} slug_=null
         */
        slug_: null,
        /**
         * @member {Array|null} tagList_=null
         */
        tagList_: null,
        /**
         * @member {String|null} title_=null
         */
        title_: null,
        /**
         * @member {String|null} userImage_=null
         */
        userImage_: null,
        /**
         * @member {Object} _vdom
         */
        _vdom: {
            cn: [{
                cls: ['article-meta'],
                cn : [{
                    tag : 'a',
                    flag: 'userImageLink',
                    cn  : [{tag: 'img'}]
                }, {
                    cls: ['info'],
                    cn : [
                        {tag : 'a',    cls : ['author'], flag: 'author'},
                        {tag : 'span', cls : ['date'],   flag: 'createdAt'}
                    ]
                }, {
                    tag: 'button',
                    cls: ['btn', 'btn-sm', 'pull-xs-right'],
                    cn : [
                        {tag  : 'i',    cls : ['ion-heart']},
                        {vtype: 'text', flag: 'favoritesCount'}
                    ]
                }]
            }, {
                tag : 'a',
                cls : ['preview-link'],
                flag: 'preview-link',
                cn  : [
                    {tag : 'h1',   flag: 'title'},
                    {tag : 'p',    flag: 'description'},
                    {tag : 'span', html: 'Read more...'}
                ]
            }]
        }
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
                fn      : me.onFavoriteButtonClick,
                delegate: '.pull-xs-right',
                scope   : me
            }
        });

        me.domListeners = domListeners;
    }

    /**
     * Triggered after the author config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetAuthor(value, oldValue) {
        let vdom = this.vdom,
            node = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_2__.default.getByFlag(vdom, 'author'),
            href = '#/profile/' + value;

        node.href = href;
        node.html = value;

        _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_2__.default.getByFlag(vdom, 'userImageLink').href = href;

        this.vdom = vdom;
    }

    /**
     * Triggered after the createdAt config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetCreatedAt(value, oldValue) {
        let vdom = this.vdom;

        _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_2__.default.getByFlag(vdom, 'createdAt').html = new Intl.DateTimeFormat('en-US', {
            day  : 'numeric',
            month: 'long',
            year : 'numeric'
        }).format(new Date(value));

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

        _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_2__.default.getByFlag(vdom, 'description').html = value;
        this.vdom = vdom;
    }

    /**
     * Triggered after the favorited config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetFavorited(value, oldValue) {
        let me     = this,
            vdom   = me.vdom,
            button = vdom.cn[0].cn[2];

        _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__.default.add(button.cls, value ? 'btn-primary' : 'btn-outline-primary');
        _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__.default.remove(button.cls, value ? 'btn-outline-primary' : 'btn-primary');

        me.vdom = vdom;

        // ignore the initial setter call
        if (Neo.isBoolean(oldValue)) {
            me.getController().favoriteArticle(me.slug, value);
        }
    }

    /**
     * Triggered after the favoritesCount config got changed
     * @param {Number} value
     * @param {Number} oldValue
     * @protected
     */
    afterSetFavoritesCount(value, oldValue) {
        let vdom = this.vdom;

        _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_2__.default.getByFlag(vdom, 'favoritesCount').html = ' ' + value;
        this.vdom = vdom;
    }

    /**
     * Triggered after the slug config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetSlug(value, oldValue) {
        let vdom = this.vdom;

        _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_2__.default.getByFlag(vdom, 'preview-link').href = '#/article/' + value;
        this.vdom = vdom;
    }

    /**
     * Triggered after the tagList config got changed
     * @param {Array} value
     * @param {Array} oldValue
     * @protected
     */
    afterSetTagList(value, oldValue) {
        let me   = this,
            vdom = me.vdom,
            tagList;

        // remove old tags if exists
        if (vdom.cn[1].cn[3]) {
            vdom.cn[1].cn.pop();
        }

        if (Array.isArray(value) && value.length > 0) {
            tagList = {
                tag: 'ul',
                cls: ['tag-list'],
                cn : []
            };

            value.forEach(item => {
                tagList.cn.push({
                    tag : 'li',
                    cls : ['tag-default', 'tag-pill', 'tag-outline'],
                    html: item
                })
            });

            vdom.cn[1].cn.push(tagList);

            me.vdom = vdom;
        }
    }

    /**
     * Triggered after the title config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetTitle(value, oldValue) {
        let vdom = this.vdom;

        _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_2__.default.getByFlag(vdom, 'title').html = value;
        this.vdom = vdom;
    }

    /**
     * Triggered after the userImage config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetUserImage(value, oldValue) {
        let vdom = this.vdom;

        _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_2__.default.getByFlag(vdom, 'userImageLink').cn[0].src = value;
        this.vdom = vdom;
    }

    /**
     *
     * @param {Object} data
     */
    onFavoriteButtonClick(data) {
        let me        = this,
            favorited = !me.favorited;

        me.set({
            favorited     : favorited,
            favoritesCount: favorited ? (me.favoritesCount + 1) : (me.favoritesCount - 1)
        });
    }
}

Neo.applyClassConfig(PreviewComponent);



/***/ }),

/***/ "./apps/realworld/view/article/TagListComponent.mjs":
/*!**********************************************************!*\
  !*** ./apps/realworld/view/article/TagListComponent.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TagListComponent)
/* harmony export */ });
/* harmony import */ var _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");


/**
 * @class RealWorld.view.article.TagListComponent
 * @extends Neo.component.Base
 */
class TagListComponent extends _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getStaticConfig() {return {
        /**
         * True automatically applies the core.Observable mixin
         * @member {Boolean} observable=true
         * @static
         */
        observable: true
    }}

    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.view.article.TagListComponent'
         * @protected
         */
        className: 'RealWorld.view.article.TagListComponent',
        /**
         * @member {String|null} activeTag_
         */
        activeTag_: null,
        /**
         * @member {String[]} cls=['col-md-3']
         */
        cls: ['col-md-3'],
        /**
         * @member {String[]} tags_=[]
         */
        tags_: [],
        /**
         * @member {Object} _vdom
         */
        _vdom: {
            cn: [{
                cls: ['sidebar'],
                cn : [{
                    tag : 'p',
                    html: 'Popular Tags'
                }, {
                    cls: ['tag-list']
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

        Neo.main.DomEvents.registerPreventDefaultTargets({
            name: 'click',
            cls : 'tag-pill'
        });

        let me           = this,
            domListeners = me.domListeners;

        domListeners.push({
            click: {
                fn      : me.onTagLinkClick,
                delegate: '.tag-pill',
                scope   : me
            }
        });

        me.domListeners = domListeners;
    }

    /**
     * Triggered after the activeTag config got changed
     * @param {String[]|null} value
     * @param {String[]|null} oldValue
     * @protected
     */
    afterSetActiveTag(value, oldValue) {
        if (oldValue !== undefined) {
            this.fire('tagChange', {
                oldValue: oldValue,
                value   : value
            });
        }
    }

    /**
     * Triggered after the tags config got changed
     * @param {String[]|null} value
     * @param {String[]|null} oldValue
     * @protected
     */
    afterSetTags(value, oldValue) {
        let me   = this,
            vdom = me.vdom;

        vdom.cn[0].cn[1].cn = [];

        if (Array.isArray(value)) {
            value.forEach(item => {
                vdom.cn[0].cn[1].cn.push({
                    tag : 'a',
                    cls : ['tag-pill', 'tag-default'],
                    href: '',
                    html: item,
                    id  : me.getTagVdomId(item)
                });
            });

            me.vdom = vdom;
        }
    }

    /**
     *
     * @param {String} nodeId
     * @returns {String}
     */
    getTagId(nodeId) {
        return nodeId.split('__')[1];
    }

    /**
     *
     * @param {String} name
     * @returns {String}
     */
    getTagVdomId(name) {
        return this.id + '__' + name;
    }

    /**
     *
     * @param {Object} data
     */
    onTagLinkClick(data) {
        this.activeTag = this.getTagId(data.path[0].id);
    }
}

Neo.applyClassConfig(TagListComponent);



/***/ }),

/***/ "./apps/realworld/view/user/ProfileComponent.mjs":
/*!*******************************************************!*\
  !*** ./apps/realworld/view/user/ProfileComponent.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProfileComponent)
/* harmony export */ });
/* harmony import */ var _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");
/* harmony import */ var _article_PreviewComponent_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../article/PreviewComponent.mjs */ "./apps/realworld/view/article/PreviewComponent.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/util/VDom.mjs */ "./node_modules/neo.mjs/src/util/VDom.mjs");





/**
 * @class RealWorld.view.user.ProfileComponent
 * @extends Neo.component.Base
 */
class ProfileComponent extends _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.view.user.ProfileComponent'
         * @protected
         */
        className: 'RealWorld.view.user.ProfileComponent',
        /**
         * @member {Object[]|null} articlePreviews_=null
         */
        articlePreviews_: null,
        /**
         * @member {String|null} bio_=null
         */
        bio_: null,
        /**
         * @member {String[]} cls=['profile-page']
         */
        cls: ['profile-page'],
        /**
         * @member {Number} countArticles_=5
         */
        countArticles_: 5,
        /**
         * @member {Boolean|null} following_=null
         */
        following_: null,
        /**
         * @member {String|null} image_=null
         */
        image_: null,
        /**
         * @member {Boolean} myProfile_=false
         */
        myProfile_: false,
        /**
         * @member {RealWorld.view.article.PreviewComponent[]} previewComponents=[]
         */
        previewComponents: [],
        /**
         * @member {String|null} username_=null
         */
        username_: null,
        /**
         * @member {Object} _vdom
         */
        _vdom: {
            cn: [{
                cls: ['user-info'],
                cn : [{
                    cls: ['container'],
                    cn : [{
                        cls: ['row'],
                        cn : [{
                            cls: ['col-xs-12', 'col-md-10', 'offset-md-1'],
                            cn : [{
                                tag : 'img',
                                cls : ['user-img'],
                                flag: 'image'
                            }, {
                                tag : 'h4',
                                flag: 'username'
                            }, {
                                tag : 'p',
                                flag: 'bio'
                            }, {
                                tag : 'button',
                                cls : ['btn', 'btn-sm', 'btn-outline-secondary', 'action-btn', 'follow-button'],
                                flag: 'following',
                                cn  : [{
                                    tag: 'i',
                                    cls: ['ion-plus-round']
                                }, {
                                    vtype: 'text'
                                }, {
                                    vtype: 'text'
                                }]
                            }, {
                                tag      : 'a',
                                cls      : ['btn', 'btn-sm', 'btn-outline-secondary', 'action-btn'],
                                flag     : 'edit-profile',
                                href     : '#/settings',
                                removeDom: true,
                                cn: [{
                                    tag: 'i',
                                    cls: ['ion-gear-a']
                                }, {
                                    vtype: 'text',
                                    html : ' Edit Profile Settings'
                                }]
                            }]
                        }]
                    }]
                }]
            }, {
                cls: ['container'],
                cn : [{
                    cls: ['row'],
                    cn : [{
                        cls  : ['col-xs-12', 'col-md-10', 'offset-md-1'],
                        flag: 'feed-container',
                        cn  : [{
                            cls: ['articles-toggle'],
                            cn : [{
                                tag : 'ul',
                                cls : ['nav', 'nav-pills', 'outline-active'],
                                flag: 'feed-header',
                                cn  : [{
                                    tag: 'li',
                                    cls: ['nav-item'],
                                    cn : [{
                                        tag: 'a',
                                        cls: ['nav-link', 'prevent-click', 'active'],
                                        href: '',
                                        html: 'My Articles'
                                    }]
                                }, {
                                    tag: 'li',
                                    cls: ['nav-item'],
                                    cn : [{
                                        tag: 'a',
                                        cls: ['nav-link', 'prevent-click'],
                                        href: '',
                                        html: 'Favorited Articles'
                                    }]
                                }]
                            }]
                        }]
                    }]
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

        Neo.main.DomEvents.registerPreventDefaultTargets({
            name: 'click',
            cls : 'prevent-click'
        });

        let me           = this,
            domListeners = me.domListeners;

        domListeners.push(
            {click: {fn: me.onFollowButtonClick, delegate: '.follow-button', scope: me}},
            {click: {fn: me.onNavLinkClick,      delegate: '.nav-link',      scope: me}}
        );

        me.domListeners = domListeners;

        me.getController().on({
            afterSetCurrentUser: me.onCurrentUserChange,
            scope              : me
        });
    }

    /**
     * Triggered after the articlePreviews config got changed
     * @param {Object[]|null} value
     * @param {Object[]|null} oldValue
     * @protected
     */
    afterSetArticlePreviews(value, oldValue) {
        let me        = this,
            vdom      = me.vdom,
            container = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getByFlag(vdom, 'feed-container'),
            config;

        container.cn = [container.cn.shift()];

        if (Array.isArray(value)) {
            value.forEach((item, index) => {
                config = {
                    author        : item.author.username,
                    createdAt     : item.createdAt,
                    description   : item.description,
                    favorited     : item.favorited,
                    favoritesCount: item.favoritesCount,
                    slug          : item.slug,
                    tagList       : item.tagList,
                    title         : item.title,
                    userImage     : item.author.image
                };

                if (!me.previewComponents[index]) {
                    me.previewComponents[index] = Neo.create({
                        module  : _article_PreviewComponent_mjs__WEBPACK_IMPORTED_MODULE_2__.default,
                        parentId: me.id,
                        ...config
                    });
                } else {
                    me.previewComponents[index].set(config, true);
                }

                container.cn.push(me.previewComponents[index].vdom);
            });
        }

        me.vdom = vdom;
    }

    /**
     * Triggered after the bio config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetBio(value, oldValue) {
        if (value) {
            let vdom = this.vdom;

            _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getByFlag(vdom, 'bio').html = value;
            this.vdom = vdom;
        }
    }

    /**
     * Triggered after the following config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetFollowing(value, oldValue) {
        if (Neo.isBoolean(value)) {
            let vdom = this.vdom,
                node = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getByFlag(vdom, 'following');

            // tobiu: did not see this one in the specs, but the react & vue app do it
            _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__.default.remove(node.cls, value ? 'btn-outline-secondary' : 'btn-secondary');
            _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__.default.add(node.cls, value ? 'btn-secondary' : 'btn-outline-secondary');

            node.cn[0].cls  = [value ? 'ion-minus-round' : 'ion-plus-round'];
            node.cn[1].html = value ? ' Unfollow ' : ' Follow ';
            this.vdom = vdom;
        }
    }

    /**
     * Triggered after the image config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetImage(value, oldValue) {
        let vdom = this.vdom;

        _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getByFlag(vdom, 'image').src = value;
        this.vdom = vdom;
    }

    /**
     * Triggered after the myProfile config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetMyProfile(value, oldValue) {console.log('afterSetMyProfile', value);
        if (Neo.isBoolean(oldValue)) {
            let vdom = this.vdom;

            _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getByFlag(vdom, 'edit-profile').removeDom = !value;
            _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getByFlag(vdom, 'following')   .removeDom = value;
            this.vdom = vdom;
        }
    }

    /**
     * Triggered after the username config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetUsername(value, oldValue) {
        let vdom = this.vdom;

        _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getByFlag(vdom, 'following').cn[2].html = value;
        _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getByFlag(vdom, 'username').html = value;
        this.vdom = vdom;
    }

    /**
     *
     * @param {Object} params
     */
    getArticles(params) {
        this.getController().getArticles(params).then(data => {
            this.articlePreviews = data.json.articles;
        });
    }

    /**
     *
     * @param {Object} value
     */
    onCurrentUserChange(value) {console.log('onCurrentUserChange', value);
        this.myProfile = this.username === value && value.username;
    }

    /**
     *
     * @param {Object} data
     */
    onFollowButtonClick(data) {
        let me = this;

        me.getController().followUser(me.username, !me.following).then(data => {
            me.following = data.json.profile.following;
        });
    }

    /**
     *
     * @param {Object} data
     */
    onNavLinkClick(data) {
        let me         = this,
            vdom       = me.vdom,
            el         = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.findVdomChild(vdom, data.path[0].id),
            feedHeader = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getByFlag(vdom, 'feed-header'),
            params     = {};

        if (!el.vdom.cls.includes('disabled')) {
            switch(el.vdom.html) {
                case 'Favorited Articles':
                    params = {
                        favorited: me.username
                    };
                    break;
                case 'My Articles':
                    params = {
                        author: me.username
                    };
                    break;
            }

            feedHeader.cn.forEach(item => {
                _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__.default[item.id === el.parentNode.id ? 'add' : 'remove'](item.cn[0].cls, 'active');
            });

            me.vdom = vdom;

            me.getArticles({
                ...params,
                limit : me.countArticles,
                offset: 0
            });
        }
    }

    /**
     *
     * @param {Object} configs
     */
    update(configs) {
        let me       = this,
            username = configs.username;

        me.set({
            bio      : configs.bio,
            following: configs.following,
            image    : configs.image,
            myProfile: configs.myProfile,
            username : username
        }).then(() => {
            me.getArticles({
                author: username,
                limit : me.countArticles,
                offset: 0
            });
        });
    }
}

Neo.applyClassConfig(ProfileComponent);



/***/ }),

/***/ "./apps/realworld/view/user/SettingsComponent.mjs":
/*!********************************************************!*\
  !*** ./apps/realworld/view/user/SettingsComponent.mjs ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SettingsComponent)
/* harmony export */ });
/* harmony import */ var _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/util/VDom.mjs */ "./node_modules/neo.mjs/src/util/VDom.mjs");



/**
 * @class RealWorld.view.user.SettingsComponent
 * @extends Neo.component.Base
 */
class SettingsComponent extends _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.view.user.SettingsComponent'
         * @protected
         */
        className: 'RealWorld.view.user.SettingsComponent',
        /**
         * @member {String} bio_=null
         */
        bio_: null,
        /**
         * @member {String[]} cls=['settings-page']
         */
        cls: ['settings-page'],
        /**
         * @member {String} email_=null
         */
        email_: null,
        /**
         * @member {Object[]} errors_=[]
         */
        errors_: [],
        /**
         * @member {String} image_=null
         */
        image_: null,
        /**
         * @member {String} userName_=null
         */
        userName_: null,
        /**
         * @member {Object} _vdom
         */
        _vdom: {
            cn: [{
                cls: ['container', 'page'],
                cn : [{
                    cls: ['row'],
                    cn : [{
                        cls: ['col-md-6', 'offset-md-3', 'col-xs-12'],
                        cn : [{
                            tag : 'h1',
                            cls : ['text-xs-center'],
                            html: 'Your Settings'
                        }, {
                            tag      : 'ul',
                            cls      : ['error-messages'],
                            flag     : 'errors',
                            removeDom: true
                        }, {
                            tag: 'form',
                            cn : [{
                                tag: 'fieldset',
                                cn : [{
                                    tag: 'fieldset',
                                    cls: ['form-group'],
                                    cn : [{
                                        tag        : 'input',
                                        cls        : ['form-control'],
                                        flag       : 'image',
                                        placeholder: 'URL of profile picture',
                                        type       : 'text'
                                    }]
                                }, {
                                    tag: 'fieldset',
                                    cls: ['form-group'],
                                    cn : [{
                                        tag        : 'input',
                                        cls        : ['form-control', 'form-control-lg'],
                                        flag       : 'userName',
                                        placeholder: 'Your Name',
                                        type       : 'text'
                                    }]
                                }, {
                                    tag: 'fieldset',
                                    cls: ['form-group'],
                                    cn : [{
                                        tag        : 'textarea',
                                        cls        : ['form-control', 'form-control-lg'],
                                        flag       : 'bio',
                                        placeholder: 'Short bio about you',
                                        rows       : 8
                                    }]
                                }, {
                                    tag: 'fieldset',
                                    cls: ['form-group'],
                                    cn : [{
                                        tag        : 'input',
                                        cls        : ['form-control', 'form-control-lg'],
                                        flag       : 'email',
                                        placeholder: 'Email',
                                        type       : 'text'
                                    }]
                                }, {
                                    tag: 'fieldset',
                                    cls: ['form-group'],
                                    cn : [{
                                        tag        : 'input',
                                        cls        : ['form-control', 'form-control-lg'],
                                        flag       : 'password',
                                        placeholder: 'Password',
                                        type       : 'password'
                                    }]
                                }, {
                                    tag : 'button',
                                    cls : ['btn', 'btn-lg', 'btn-primary', 'pull-xs-right'],
                                    html: 'Update Settings'
                                }]
                            }]
                        }, {
                            tag: 'hr'
                        }, {
                            tag : 'button',
                            cls : ['btn', 'btn-outline-danger'],
                            html: 'Or click here to logout.'
                        }]
                    }]
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

        let me           = this,
            domListeners = me.domListeners;

        domListeners.push(
            {click: {fn: me.onLogoutButtonClick, delegate: '.btn-outline-danger', scope: me}},
            {click: {fn: me.onSubmitButtonClick, delegate: '.btn-primary',        scope: me}}
        );

        me.domListeners = domListeners;

        me.getController().on({
            afterSetCurrentUser: me.onCurrentUserChange,
            scope              : me
        });
    }

    /**
     * Triggered after the bio config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetBio(value, oldValue) {
        let vdom = this.vdom;

        _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getByFlag(vdom, 'bio').value = value;
        this.vdom = vdom;
    }

    /**
     * Triggered after the email config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetEmail(value, oldValue) {
        let vdom = this.vdom;

        _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getByFlag(vdom, 'email').value = value;
        this.vdom = vdom;
    }

    /**
     * Triggered after the errors config got changed
     * @param {Object[]} value=[]
     * @param {Object[]} oldValue
     * @protected
     */
    afterSetErrors(value=[], oldValue) {
        let me   = this,
            vdom = me.vdom,
            list = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getByFlag(vdom, 'errors');

        list.cn        = [];
        list.removeDom = value.length === 0;

        Object.entries(value).forEach(([key, value]) => {
            list.cn.push({
                tag : 'li',
                html: key + ' ' + value.join(' and ')
            });
        });

        me.vdom = vdom;
    }

    /**
     * Triggered after the image config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetImage(value, oldValue) {
        let vdom = this.vdom;

        _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getByFlag(vdom, 'image').value = value;
        this.vdom = vdom;
    }

    /**
     * Triggered after the userName config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetUserName(value, oldValue) {
        let vdom = this.vdom;

        _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getByFlag(vdom, 'userName').value = value;
        this.vdom = vdom;
    }

    /**
     *
     * @param {Object} value
     */
    onCurrentUserChange(value) {
        if (value) {
            this.set({
                bio     : value.bio,
                email   : value.email,
                errors  : [],
                image   : value.image,
                userName: value.username
            });
        }
    }

    /**
     *
     * @param {Object} data
     */
    onLogoutButtonClick(data) {
        this.getController().logout();
    }

    /**
     *
     * @param {Object} data
     */
    onSubmitButtonClick(data) {
        let me       = this,
            vdom     = me.vdom,
            bio      = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getByFlag(vdom, 'bio'),
            email    = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getByFlag(vdom, 'email'),
            image    = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getByFlag(vdom, 'image'),
            password = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getByFlag(vdom, 'password'),
            userName = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getByFlag(vdom, 'userName');

        Neo.main.DomAccess.getAttributes({
            id        : [bio.id, email.id, image.id, password.id, userName.id],
            attributes: 'value'
        }).then(data => {
            me.getController().updateSettings({
                data: JSON.stringify({
                    user: {
                        bio     : data[0].value,
                        email   : data[1].value,
                        image   : data[2].value,
                        password: data[3].value,
                        username: data[4].value
                    }
                })
            }).then(data => {
                const errors = data.json.errors;

                if (errors) {
                    me.errors = errors;
                } else {
                    Neo.Main.setRoute({
                        value: '/profile/' + data.json.user.username
                    });
                }
            })
        });
    }
}

Neo.applyClassConfig(SettingsComponent);



/***/ }),

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
        _vdom: {
            cn: [{
                cls: ['container', 'page'],
                cn : [{
                    cls: ['row'],
                    cn : [{
                        cls: ['col-md-6', 'offset-md-3', 'col-xs-12'],
                        cn : [{
                            tag : 'h1',
                            cls : ['text-xs-center']
                        }, {
                            tag: 'p',
                            cls: ['text-xs-center'],
                            cn : [{tag: 'a'}]
                        }, {
                            tag: 'ul',
                            cls: ['error-messages']
                        }, {
                            tag: 'form',
                            cn : [{
                                tag: 'fieldset',
                                cn : [{
                                    tag : 'button',
                                    cls : ['btn', 'btn-lg', 'btn-primary', 'pull-xs-right'],
                                    type: 'button' // override the default submit type
                                }]
                            }]
                        }]
                    }]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL2FwaS9BcnRpY2xlLm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL2FwaS9CYXNlLm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL2FwaS9GYXZvcml0ZS5tanMiLCJ3ZWJwYWNrOi8vbmVvLm1qcy1yZWFsd29ybGQtZXhhbXBsZS1hcHAvLi9hcHBzL3JlYWx3b3JsZC9hcGkvUHJvZmlsZS5tanMiLCJ3ZWJwYWNrOi8vbmVvLm1qcy1yZWFsd29ybGQtZXhhbXBsZS1hcHAvLi9hcHBzL3JlYWx3b3JsZC9hcGkvVGFnLm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL2FwaS9Vc2VyLm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL2FwaS9jb25maWcubWpzIiwid2VicGFjazovL25lby5tanMtcmVhbHdvcmxkLWV4YW1wbGUtYXBwLy4vYXBwcy9yZWFsd29ybGQvYXBwLm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL3ZpZXcvRm9vdGVyQ29tcG9uZW50Lm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL3ZpZXcvSGVhZGVyQ29tcG9uZW50Lm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL3ZpZXcvSG9tZUNvbXBvbmVudC5tanMiLCJ3ZWJwYWNrOi8vbmVvLm1qcy1yZWFsd29ybGQtZXhhbXBsZS1hcHAvLi9hcHBzL3JlYWx3b3JsZC92aWV3L01haW5Db250YWluZXIubWpzIiwid2VicGFjazovL25lby5tanMtcmVhbHdvcmxkLWV4YW1wbGUtYXBwLy4vYXBwcy9yZWFsd29ybGQvdmlldy9NYWluQ29udGFpbmVyQ29udHJvbGxlci5tanMiLCJ3ZWJwYWNrOi8vbmVvLm1qcy1yZWFsd29ybGQtZXhhbXBsZS1hcHAvLi9hcHBzL3JlYWx3b3JsZC92aWV3L2FydGljbGUvQ29tbWVudENvbXBvbmVudC5tanMiLCJ3ZWJwYWNrOi8vbmVvLm1qcy1yZWFsd29ybGQtZXhhbXBsZS1hcHAvLi9hcHBzL3JlYWx3b3JsZC92aWV3L2FydGljbGUvQ29tcG9uZW50Lm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL3ZpZXcvYXJ0aWNsZS9DcmVhdGVDb21tZW50Q29tcG9uZW50Lm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL3ZpZXcvYXJ0aWNsZS9DcmVhdGVDb21wb25lbnQubWpzIiwid2VicGFjazovL25lby5tanMtcmVhbHdvcmxkLWV4YW1wbGUtYXBwLy4vYXBwcy9yZWFsd29ybGQvdmlldy9hcnRpY2xlL1ByZXZpZXdDb21wb25lbnQubWpzIiwid2VicGFjazovL25lby5tanMtcmVhbHdvcmxkLWV4YW1wbGUtYXBwLy4vYXBwcy9yZWFsd29ybGQvdmlldy9hcnRpY2xlL1RhZ0xpc3RDb21wb25lbnQubWpzIiwid2VicGFjazovL25lby5tanMtcmVhbHdvcmxkLWV4YW1wbGUtYXBwLy4vYXBwcy9yZWFsd29ybGQvdmlldy91c2VyL1Byb2ZpbGVDb21wb25lbnQubWpzIiwid2VicGFjazovL25lby5tanMtcmVhbHdvcmxkLWV4YW1wbGUtYXBwLy4vYXBwcy9yZWFsd29ybGQvdmlldy91c2VyL1NldHRpbmdzQ29tcG9uZW50Lm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL3ZpZXcvdXNlci9TaWduVXBDb21wb25lbnQubWpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQThCOztBQUU5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiw4Q0FBSTtBQUMxQix3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsS0FBSyxZQUFZLEdBQUc7QUFDbEQsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLEtBQUs7QUFDbkMsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLEtBQUs7QUFDbkMsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsaUVBQWUsUUFBUSxFOzs7Ozs7Ozs7Ozs7Ozs7OztBQzNEaUM7QUFDbUM7O0FBRTNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDRFQUFRO0FBQzNCLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQSxpQkFBaUIsMEZBQXNCLGFBQWEsc0JBQXNCO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVvQyIsImZpbGUiOiJjaHVua3MvYXBwL2FwcHNfcmVhbHdvcmxkX2FwcF9tanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tICcuL0Jhc2UubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgUmVhbFdvcmxkLmFwaS5BcnRpY2xlXG4gKiBAZXh0ZW5kcyBSZWFsV29ybGQuYXBpLkJhc2VcbiAqL1xuY2xhc3MgQXJ0aWNsZSBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdSZWFsV29ybGQuYXBpLkFydGljbGUnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ1JlYWxXb3JsZC5hcGkuQXJ0aWNsZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IHJlc291cmNlPScvYXJ0aWNsZXMnXG4gICAgICAgICAqL1xuICAgICAgICByZXNvdXJjZTogJy9hcnRpY2xlcydcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2x1Z1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpZFxuICAgICAqL1xuICAgIGRlbGV0ZUNvbW1lbnQoc2x1ZywgaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlKHtcbiAgICAgICAgICAgIHVybDogYC9hcnRpY2xlcy8ke3NsdWd9L2NvbW1lbnRzLyR7aWR9YFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzbHVnXG4gICAgICovXG4gICAgZ2V0Q29tbWVudHMoc2x1Zykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoe1xuICAgICAgICAgICAgdXJsOiBgL2FydGljbGVzLyR7c2x1Z30vY29tbWVudHNgXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNsdWdcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICAgICAqL1xuICAgIHBvc3RDb21tZW50KHNsdWcsIG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdCh7XG4gICAgICAgICAgICAuLi5vcHRzLFxuICAgICAgICAgICAgdXJsOiBgL2FydGljbGVzLyR7c2x1Z30vY29tbWVudHNgXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoQXJ0aWNsZSk7XG5cbmxldCBpbnN0YW5jZSA9IE5lby5jcmVhdGUoQXJ0aWNsZSk7XG5cbk5lby5hcHBseVRvR2xvYmFsTnMoaW5zdGFuY2UpO1xuXG5leHBvcnQgZGVmYXVsdCBpbnN0YW5jZTsiLCJpbXBvcnQge0FQSV9VUkwsIExPQ0FMX1NUT1JBR0VfS0VZfSBmcm9tICcuL2NvbmZpZy5tanMnO1xuaW1wb3J0IENvcmVCYXNlICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvcmUvQmFzZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBSZWFsV29ybGQuYXBpLkJhc2VcbiAqIEBleHRlbmRzIE5lby5jb3JlLkJhc2VcbiAqL1xuY2xhc3MgQmFzZSBleHRlbmRzIENvcmVCYXNlIHtcbiAgICBzdGF0aWMgZ2V0U3RhdGljQ29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcnVlIGF1dG9tYXRpY2FsbHkgYXBwbGllcyB0aGUgY29yZS9PYnNlcnZhYmxlLm1qcyBtaXhpblxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBvYnNlcnZhYmxlPXRydWVcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgb2JzZXJ2YWJsZTogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSB0b2tlbj1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgdG9rZW46IG51bGxcbiAgICB9fVxuXG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J1JlYWxXb3JsZC5hcGkuQmFzZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnUmVhbFdvcmxkLmFwaS5CYXNlJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdHxudWxsfSBkZWZhdWx0SGVhZGVycz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBkZWZhdWx0SGVhZGVyczogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGlzUmVhZHk9ZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGlzUmVhZHk6IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSByZXNvdXJjZT0nJ1xuICAgICAgICAgKi9cbiAgICAgICAgcmVzb3VyY2U6ICcvJ1xuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uQ29uc3RydWN0ZWQoKSB7XG4gICAgICAgIHN1cGVyLm9uQ29uc3RydWN0ZWQoKTtcbiAgICAgICAgdGhpcy5hZnRlckNvbnN0cnVjdGVkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGNsYXNzIGV4dGVuc2lvbnMgQXJ0aWNsZSwgRmF2b3JpdGUsIFByb2ZpbGUsIFRhZywgVXNlciBhcmUgc2luZ2xldG9uc1xuICAgICAqIGFuZCBnZXQgZGlyZWN0bHkgaW1wb3J0ZWQgaW50byB0aGUgTWFpbkNvbnRhaW5lcihDb250cm9sbGVyKVxuICAgICAqID0+IHRoZWlyIGNyZWF0aW9uIGhhcHBlbnMgYmVmb3JlIHRoZSBhcHAgaXMgY29uc3RydWN0ZWRcbiAgICAgKiA9PiBOZW8uYXBwc1snUmVhbFdvcmxkJ10gZG9lcyBtb3N0IGxpa2VseSBub3QgZXhpc3QgeWV0LlxuICAgICAqL1xuICAgIGFmdGVyQ29uc3RydWN0ZWQoKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCFOZW8uYXBwcyB8fCAhTmVvLmFwcHNbJ1JlYWxXb3JsZCddKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBtZS5hZnRlckNvbnN0cnVjdGVkKCk7XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKE5lby5hcHBzWydSZWFsV29ybGQnXS5yZW5kZXJlZCkge1xuICAgICAgICAgICAgICAgIG1lLm9uQXBwUmVuZGVyZWQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgTmVvLmFwcHNbJ1JlYWxXb3JsZCddLm9uKCdyZW5kZXInLG1lLm9uQXBwUmVuZGVyZWQsIG1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgb25BcHBSZW5kZXJlZCgpIHtcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChCYXNlLnRva2VuKSB7XG4gICAgICAgICAgICBtZS5vblJlYWR5KEJhc2UudG9rZW4pO1xuICAgICAgICB9IGVsc2UgaWYgKCFCYXNlLmluaXRpYWxUb2tlblJlcXVlc3RTZW50KSB7XG4gICAgICAgICAgICBCYXNlLmluaXRpYWxUb2tlblJlcXVlc3RTZW50ID0gdHJ1ZTtcblxuICAgICAgICAgICAgTmVvLm1haW4uYWRkb24uTG9jYWxTdG9yYWdlLnJlYWRMb2NhbFN0b3JhZ2VJdGVtKHtcbiAgICAgICAgICAgICAgICBrZXk6IExPQ0FMX1NUT1JBR0VfS0VZXG4gICAgICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuID0gZGF0YS52YWx1ZTtcblxuICAgICAgICAgICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICBCYXNlLnRva2VuID0gdG9rZW47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbWUub25SZWFkeSh0b2tlbik7XG4gICAgICAgICAgICAgICAgQmFzZS5pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBCYXNlLmZpcmUoJ3JlYWR5JywgdG9rZW4pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBCYXNlLm9uKHtcbiAgICAgICAgICAgICAgICByZWFkeTogbWUub25SZWFkeSxcbiAgICAgICAgICAgICAgICBzY29wZTogbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHM9e31dXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLmRhdGFdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLnBhcmFtc11cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdHMucmVzb3VyY2VdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRzLnNsdWddXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRzLnVybF1cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSB1cmxcbiAgICAgKi9cbiAgICBjcmVhdGVVcmwob3B0cykge1xuICAgICAgICBpZiAob3B0cy51cmwpIHtcbiAgICAgICAgICAgIHJldHVybiBBUElfVVJMICsgb3B0cy51cmw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gQVBJX1VSTCArIChvcHRzLnJlc291cmNlIHx8IHRoaXMucmVzb3VyY2UpICsgKG9wdHMuc2x1ZyA/ICcvJyArIG9wdHMuc2x1ZyA6ICcnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cz17fV1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHMuZGF0YV1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHMucGFyYW1zXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0cy5yZXNvdXJjZV1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdHMuc2x1Z11cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgICAqL1xuICAgIGRlbGV0ZShvcHRzPXt9KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdkZWxldGUnLCBvcHRzKTtcblxuICAgICAgICByZXR1cm4gTmVvLlhoci5wcm9taXNlSnNvbih7XG4gICAgICAgICAgICBkYXRhICAgOiBvcHRzLmRhdGEsXG4gICAgICAgICAgICBtZXRob2QgOiAnREVMRVRFJyxcbiAgICAgICAgICAgIHBhcmFtcyA6IG9wdHMucGFyYW1zLFxuICAgICAgICAgICAgdXJsICAgIDogdGhpcy5jcmVhdGVVcmwob3B0cyksXG5cbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAuLi50aGlzLmRlZmF1bHRIZWFkZXJzIHx8IHt9LFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnICAgIDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0J1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUmVhbFdvcmxkLmFwaS5CYXNlOmdldCgpJywgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cz17fV1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHMuZGF0YV1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHMucGFyYW1zXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0cy5yZXNvdXJjZV1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdHMuc2x1Z11cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgICAqL1xuICAgIGdldChvcHRzPXt9KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdnZXQnLCBvcHRzKTtcblxuICAgICAgICByZXR1cm4gTmVvLlhoci5wcm9taXNlSnNvbih7XG4gICAgICAgICAgICBkYXRhICAgOiBvcHRzLmRhdGEsXG4gICAgICAgICAgICBtZXRob2QgOiAnR0VUJyxcbiAgICAgICAgICAgIHBhcmFtcyA6IG9wdHMucGFyYW1zLFxuICAgICAgICAgICAgdXJsICAgIDogdGhpcy5jcmVhdGVVcmwob3B0cyksXG5cbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAuLi50aGlzLmRlZmF1bHRIZWFkZXJzIHx8IHt9LFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnICAgIDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0J1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUmVhbFdvcmxkLmFwaS5CYXNlOmdldCgpJywgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQbGFjZWhvbGRlciBtZXRob2Qgd2hpY2ggZ2V0cyB0cmlnZ2VyZWQgb25jZSB0aGUgdG9rZW4gaXMgZmV0Y2hlZCBmcm9tIHRoZSBsb2NhbCBzdG9yYWdlXG4gICAgICogQHBhcmFtIHtTdHJpbmd8bnVsbH0gdG9rZW5cbiAgICAgKi9cbiAgICBvblJlYWR5KHRva2VuKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICBtZS5kZWZhdWx0SGVhZGVycyA9IG1lLmRlZmF1bHRIZWFkZXJzIHx8IHt9O1xuICAgICAgICAgICAgbWUuZGVmYXVsdEhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9ICdUb2tlbiAnICsgdG9rZW47XG4gICAgICAgIH1cblxuICAgICAgICBtZS5pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgbWUuZmlyZSgncmVhZHknLCB0b2tlbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHM9e31dXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLmRhdGFdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLnBhcmFtc11cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdHMucmVzb3VyY2VdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRzLnNsdWddXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICAgKi9cbiAgICBwb3N0KG9wdHM9e30pIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3Bvc3QnLCBvcHRzKTtcblxuICAgICAgICBjb25zdCBwYXJhbXMgPSBvcHRzLnBhcmFtcztcbiAgICAgICAgZGVsZXRlIG9wdHMucGFyYW1zO1xuXG4gICAgICAgIHJldHVybiBOZW8uWGhyLnByb21pc2VKc29uKHtcbiAgICAgICAgICAgIGRhdGEgICA6IG9wdHMuZGF0YSxcbiAgICAgICAgICAgIG1ldGhvZCA6ICdQT1NUJyxcbiAgICAgICAgICAgIHBhcmFtcyA6IHBhcmFtcyxcbiAgICAgICAgICAgIHVybCAgICA6IHRoaXMuY3JlYXRlVXJsKG9wdHMpLFxuXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5kZWZhdWx0SGVhZGVycyB8fCB7fSxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJyAgICA6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1JlYWxXb3JsZC5hcGkuQmFzZTpwb3N0KCknLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzPXt9XVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy5kYXRhXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy5wYXJhbXNdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRzLnJlc291cmNlXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0cy5zbHVnXVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAgICovXG4gICAgcHV0KG9wdHM9e30pIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3B1dCcsIG9wdHMpO1xuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG9wdHMucGFyYW1zO1xuICAgICAgICBkZWxldGUgb3B0cy5wYXJhbXM7XG5cbiAgICAgICAgcmV0dXJuIE5lby5YaHIucHJvbWlzZUpzb24oe1xuICAgICAgICAgICAgZGF0YSAgIDogb3B0cy5kYXRhLFxuICAgICAgICAgICAgbWV0aG9kIDogJ1BVVCcsXG4gICAgICAgICAgICBwYXJhbXMgOiBwYXJhbXMsXG4gICAgICAgICAgICB1cmwgICAgOiB0aGlzLmNyZWF0ZVVybChvcHRzKSxcblxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuZGVmYXVsdEhlYWRlcnMgfHwge30sXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZScgICAgOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZWFsV29ybGQuYXBpLkJhc2U6cHV0KCknLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuQmFzZS5pbml0aWFsVG9rZW5SZXF1ZXN0U2VudCA9IGZhbHNlO1xuQmFzZS50b2tlbiAgICAgICAgICAgICAgICAgICA9IG51bGw7XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKEJhc2UpO1xuXG5leHBvcnQge0Jhc2UgYXMgZGVmYXVsdH07IiwiaW1wb3J0IEJhc2UgZnJvbSAnLi9CYXNlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIFJlYWxXb3JsZC5hcGkuRmF2b3JpdGVcbiAqIEBleHRlbmRzIFJlYWxXb3JsZC5hcGkuQmFzZVxuICovXG5jbGFzcyBGYXZvcml0ZSBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdSZWFsV29ybGQuYXBpLkZhdm9yaXRlJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdSZWFsV29ybGQuYXBpLkZhdm9yaXRlJ1xuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzbHVnXG4gICAgICovXG4gICAgYWRkKHNsdWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdCh7XG4gICAgICAgICAgICB1cmw6IGAvYXJ0aWNsZXMvJHtzbHVnfS9mYXZvcml0ZWBcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2x1Z1xuICAgICAqL1xuICAgIHJlbW92ZShzbHVnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlbGV0ZSh7XG4gICAgICAgICAgICB1cmw6IGAvYXJ0aWNsZXMvJHtzbHVnfS9mYXZvcml0ZWBcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhGYXZvcml0ZSk7XG5cbmxldCBpbnN0YW5jZSA9IE5lby5jcmVhdGUoRmF2b3JpdGUpO1xuXG5OZW8uYXBwbHlUb0dsb2JhbE5zKGluc3RhbmNlKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7IiwiaW1wb3J0IEJhc2UgZnJvbSAnLi9CYXNlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIFJlYWxXb3JsZC5hcGkuUHJvZmlsZVxuICogQGV4dGVuZHMgUmVhbFdvcmxkLmFwaS5CYXNlXG4gKi9cbmNsYXNzIFByb2ZpbGUgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nUmVhbFdvcmxkLmFwaS5Qcm9maWxlJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdSZWFsV29ybGQuYXBpLlByb2ZpbGUnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSByZXNvdXJjZT0nL3Byb2ZpbGVzJ1xuICAgICAgICAgKi9cbiAgICAgICAgcmVzb3VyY2U6ICcvcHJvZmlsZXMnXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNsdWdcbiAgICAgKi9cbiAgICBmb2xsb3coc2x1Zykge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0KHtcbiAgICAgICAgICAgIHVybDogYC9wcm9maWxlcy8ke3NsdWd9L2ZvbGxvd2BcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2x1Z1xuICAgICAqL1xuICAgIHVuZm9sbG93KHNsdWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlKHtcbiAgICAgICAgICAgIHVybDogYC9wcm9maWxlcy8ke3NsdWd9L2ZvbGxvd2BcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhQcm9maWxlKTtcblxubGV0IGluc3RhbmNlID0gTmVvLmNyZWF0ZShQcm9maWxlKTtcblxuTmVvLmFwcGx5VG9HbG9iYWxOcyhpbnN0YW5jZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3RhbmNlOyIsImltcG9ydCBCYXNlIGZyb20gJy4vQmFzZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBSZWFsV29ybGQuYXBpLlRhZ1xuICogQGV4dGVuZHMgUmVhbFdvcmxkLmFwaS5CYXNlXG4gKi9cbmNsYXNzIFRhZyBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdSZWFsV29ybGQuYXBpLlRhZydcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnUmVhbFdvcmxkLmFwaS5UYWcnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSByZXNvdXJjZT0nL3RhZ3MnXG4gICAgICAgICAqL1xuICAgICAgICByZXNvdXJjZTogJy90YWdzJ1xuICAgIH19XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKFRhZyk7XG5cbmxldCBpbnN0YW5jZSA9IE5lby5jcmVhdGUoVGFnKTtcblxuTmVvLmFwcGx5VG9HbG9iYWxOcyhpbnN0YW5jZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3RhbmNlOyIsImltcG9ydCBCYXNlIGZyb20gJy4vQmFzZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBSZWFsV29ybGQuYXBpLlVzZXJcbiAqIEBleHRlbmRzIFJlYWxXb3JsZC5hcGkuQmFzZVxuICovXG5jbGFzcyBVc2VyIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J1JlYWxXb3JsZC5hcGkuVXNlcidcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnUmVhbFdvcmxkLmFwaS5Vc2VyJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gcmVzb3VyY2U9Jy90YWdzJ1xuICAgICAgICAgKi9cbiAgICAgICAgcmVzb3VyY2U6ICcvdXNlcnMnXG4gICAgfX1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoVXNlcik7XG5cbmxldCBpbnN0YW5jZSA9IE5lby5jcmVhdGUoVXNlcik7XG5cbk5lby5hcHBseVRvR2xvYmFsTnMoaW5zdGFuY2UpO1xuXG5leHBvcnQgZGVmYXVsdCBpbnN0YW5jZTsiLCJleHBvcnQgY29uc3QgQVBJX1VSTCAgICAgICAgICAgPSAnaHR0cHM6Ly9jb25kdWl0LnByb2R1Y3Rpb25yZWFkeS5pby9hcGknO1xuZXhwb3J0IGNvbnN0IExPQ0FMX1NUT1JBR0VfS0VZID0gJ25lb1JlYWxXb3JsZFRva2VuJztcblxuZXhwb3J0IGRlZmF1bHQge0FQSV9VUkwsIExPQ0FMX1NUT1JBR0VfS0VZfTsiLCJpbXBvcnQgTWFpbkNvbnRhaW5lciBmcm9tICcuL3ZpZXcvTWFpbkNvbnRhaW5lci5tanMnO1xuXG5jb25zdCBvblN0YXJ0ID0gKCkgPT4gTmVvLmFwcCh7XG4gICAgbWFpblZpZXc6IE1haW5Db250YWluZXIsXG4gICAgbmFtZSAgICA6ICdSZWFsV29ybGQnXG59KTtcblxuZXhwb3J0IHtvblN0YXJ0IGFzIG9uU3RhcnR9OyIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbXBvbmVudC9CYXNlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIFJlYWxXb3JsZC52aWV3LkZvb3RlckNvbXBvbmVudFxuICogQGV4dGVuZHMgTmVvLmNvbXBvbmVudC5CYXNlXG4gKi9cbmNsYXNzIEZvb3RlckNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J1JlYWxXb3JsZC52aWV3LkZvb3RlckNvbXBvbmVudCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnUmVhbFdvcmxkLnZpZXcuRm9vdGVyQ29tcG9uZW50JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gX3Zkb21cbiAgICAgICAgICovXG4gICAgICAgIF92ZG9tOiB7XG4gICAgICAgICAgICB0YWc6ICdmb290ZXInLFxuICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgIGNsczogWydjb250YWluZXInXSxcbiAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRhZyA6ICdhJyxcbiAgICAgICAgICAgICAgICAgICAgY2xzIDogWydsb2dvLWZvbnQnXSxcbiAgICAgICAgICAgICAgICAgICAgaHJlZjogJyMvJyxcbiAgICAgICAgICAgICAgICAgICAgaHRtbDogJ2NvbmR1aXQnXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0YWcgOiAnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgIGNscyA6ICdhdHRyaWJ1dGlvbicsXG4gICAgICAgICAgICAgICAgICAgIGh0bWw6ICdBbiBpbnRlcmFjdGl2ZSBsZWFybmluZyBwcm9qZWN0IGZyb20gPGEgaHJlZj1cImh0dHBzOi8vdGhpbmtzdGVyLmlvXCI+VGhpbmtzdGVyPC9hPi4gQ29kZSAmYW1wOyBkZXNpZ24gbGljZW5zZWQgdW5kZXIgTUlULidcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH19XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKEZvb3RlckNvbXBvbmVudCk7XG5cbmV4cG9ydCB7Rm9vdGVyQ29tcG9uZW50IGFzIGRlZmF1bHR9OyIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbXBvbmVudC9CYXNlLm1qcyc7XG5pbXBvcnQgTmVvQXJyYXkgIGZyb20gJy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy91dGlsL0FycmF5Lm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIFJlYWxXb3JsZC52aWV3LkhlYWRlckNvbXBvbmVudFxuICogQGV4dGVuZHMgTmVvLmNvbXBvbmVudC5CYXNlXG4gKi9cbmNsYXNzIEhlYWRlckNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J1JlYWxXb3JsZC52aWV3LkhlYWRlckNvbXBvbmVudCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnUmVhbFdvcmxkLnZpZXcuSGVhZGVyQ29tcG9uZW50JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gYWN0aXZlSXRlbV89J2hvbWUnXG4gICAgICAgICAqL1xuICAgICAgICBhY3RpdmVJdGVtXzogJ2hvbWUnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ25hdmJhcicsICduYXZiYXItbGlnaHQnXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ25hdmJhcicsICduYXZiYXItbGlnaHQnXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGxvZ2dlZEluXz1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgbG9nZ2VkSW5fOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSB1c2VySW1hZ2VfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHVzZXJJbWFnZV86bnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSB1c2VyTmFtZV89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgdXNlck5hbWVfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBfdmRvbVxuICAgICAgICAgKi9cbiAgICAgICAgX3Zkb206IHtcbiAgICAgICAgICAgIHRhZzogJ25hdicsXG4gICAgICAgICAgICBjbHM6IFsnbmF2YmFyIG5hdmJhci1saWdodCddLFxuICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgIGNsczogWydjb250YWluZXInXSxcbiAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRhZyA6ICdhJyxcbiAgICAgICAgICAgICAgICAgICAgY2xzIDogWyduYXZiYXItYnJhbmQnXSxcbiAgICAgICAgICAgICAgICAgICAgaHJlZjogJyMvJyxcbiAgICAgICAgICAgICAgICAgICAgaHRtbDogJ2NvbmR1aXQnXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0YWc6ICd1bCcsXG4gICAgICAgICAgICAgICAgICAgIGNsczogWyduYXYgbmF2YmFyLW5hdicsICdwdWxsLXhzLXJpZ2h0J10sXG4gICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2xpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWyduYXYtaXRlbSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA6ICdhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ25hdi1saW5rJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZjogJyMvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiAnSG9tZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZyAgICAgIDogJ2xpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNscyAgICAgIDogWyduYXYtaXRlbSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRG9tOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY246IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2EnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNscyA6IFsnbmF2LWxpbmsnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmOiAnIy9lZGl0b3InLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiAnaW9uLWNvbXBvc2UnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sIDogJyZuYnNwO05ldyBBcnRpY2xlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWcgICAgICA6ICdsaScsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbHMgICAgICA6IFsnbmF2LWl0ZW0nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZURvbTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgOiAnYScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWyduYXYtbGluayddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6ICcjL3NldHRpbmdzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbjogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnaScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogJ2lvbi1nZWFyLWEnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sIDogJyZuYnNwO1NldHRpbmdzJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWcgICAgICA6ICdsaScsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbHMgICAgICA6IFsnbmF2LWl0ZW0nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZURvbTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNuOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA6ICdhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ25hdi1saW5rJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZjogJyMvcHJvZmlsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnaW1nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ3VzZXItcGljJ11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgOiAnJm5ic3A7UHJvZmlsZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnbGknLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ25hdi1pdGVtJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2EnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNscyA6IFsnbmF2LWxpbmsnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmOiAnIy9sb2dpbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogJ1NpZ24gaW4nXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdsaScsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbHM6IFsnbmF2LWl0ZW0nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgOiAnYScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWyduYXYtbGluayddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6ICcjL3JlZ2lzdGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiAnU2lnbiB1cCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBhY3RpdmVJdGVtIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEFjdGl2ZUl0ZW0odmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tO1xuXG4gICAgICAgIGlmIChvbGRWYWx1ZSkge1xuICAgICAgICAgICAgTmVvQXJyYXkucmVtb3ZlKHZkb20uY25bMF0uY25bMV0uY25bbWUuZ2V0QWN0aXZlSW5kZXgob2xkVmFsdWUpXS5jblswXS5jbHMsICdhY3RpdmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIE5lb0FycmF5LmFkZCh2ZG9tLmNuWzBdLmNuWzFdLmNuW21lLmdldEFjdGl2ZUluZGV4KHZhbHVlKV0uY25bMF0uY2xzLCAnYWN0aXZlJyk7XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBsb2dnZWRJbiBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldExvZ2dlZEluKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAoTmVvLmlzQm9vbGVhbihvbGRWYWx1ZSkpIHtcbiAgICAgICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICB2ZG9tID0gbWUudmRvbSxcbiAgICAgICAgICAgICAgICBsaXN0ID0gdmRvbS5jblswXS5jblsxXTtcblxuICAgICAgICAgICAgbGlzdC5jblsxXS5yZW1vdmVEb20gPSAhdmFsdWU7IC8vIGVkaXRvclxuICAgICAgICAgICAgbGlzdC5jblsyXS5yZW1vdmVEb20gPSAhdmFsdWU7IC8vIHNldHRpbmdzXG4gICAgICAgICAgICBsaXN0LmNuWzNdLnJlbW92ZURvbSA9ICF2YWx1ZTsgLy8gcHJvZmlsZVxuICAgICAgICAgICAgbGlzdC5jbls0XS5yZW1vdmVEb20gPSB2YWx1ZTsgIC8vIGxvZ2luXG4gICAgICAgICAgICBsaXN0LmNuWzVdLnJlbW92ZURvbSA9IHZhbHVlOyAgLy8gcmVnaXN0ZXJcblxuICAgICAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHVzZXJJbWFnZSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRVc2VySW1hZ2UodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tICAgICAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICBwcm9maWxlTGluayA9IHZkb20uY25bMF0uY25bMV0uY25bM10uY25bMF07XG5cbiAgICAgICAgcHJvZmlsZUxpbmsuY25bMF0ucmVtb3ZlRG9tID0gIXZhbHVlO1xuICAgICAgICBwcm9maWxlTGluay5jblswXS5zcmMgICAgICAgPSB2YWx1ZTtcblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHVzZXJOYW1lIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFVzZXJOYW1lKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGxldCBtZSAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICAgICAgdmRvbSAgICAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgICAgIHByb2ZpbGVMaW5rID0gdmRvbS5jblswXS5jblsxXS5jblszXS5jblswXTtcblxuICAgICAgICAgICAgcHJvZmlsZUxpbmsuaHJlZiA9ICcjL3Byb2ZpbGUvJyArIHZhbHVlO1xuICAgICAgICAgICAgcHJvZmlsZUxpbmsuY25bMV0uaHRtbCA9ICcmbmJzcDsnICsgdmFsdWU7XG5cbiAgICAgICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgdGFyZ2V0IGluZGV4XG4gICAgICovXG4gICAgZ2V0QWN0aXZlSW5kZXgodmFsdWUpIHtcbiAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICAgICAgY2FzZSAnL3NldHRpbmdzJzogcmV0dXJuIDI7XG4gICAgICAgICAgICBjYXNlICcvbG9naW4nICAgOiByZXR1cm4gNDtcbiAgICAgICAgICAgIGNhc2UgJy9yZWdpc3Rlcic6IHJldHVybiA1O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlLmluY2x1ZGVzKCcvZWRpdG9yJykpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlLmluY2x1ZGVzKCcvcHJvZmlsZScpKSB7XG4gICAgICAgICAgICByZXR1cm4gMztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRlZmF1bHQgdG8gaG9tZVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKEhlYWRlckNvbXBvbmVudCk7XG5cbmV4cG9ydCB7SGVhZGVyQ29tcG9uZW50IGFzIGRlZmF1bHR9OyIsImltcG9ydCBDb21wb25lbnQgICAgICAgIGZyb20gJy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9jb21wb25lbnQvQmFzZS5tanMnO1xuaW1wb3J0IE5lb0FycmF5ICAgICAgICAgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL3V0aWwvQXJyYXkubWpzJztcbmltcG9ydCBQcmV2aWV3Q29tcG9uZW50IGZyb20gJy4vYXJ0aWNsZS9QcmV2aWV3Q29tcG9uZW50Lm1qcyc7XG5pbXBvcnQgVGFnTGlzdENvbXBvbmVudCBmcm9tICcuL2FydGljbGUvVGFnTGlzdENvbXBvbmVudC5tanMnO1xuaW1wb3J0IFZEb21VdGlsICAgICAgICAgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL3V0aWwvVkRvbS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBSZWFsV29ybGQudmlldy5Ib21lQ29tcG9uZW50XG4gKiBAZXh0ZW5kcyBOZW8uY29tcG9uZW50LkJhc2VcbiAqL1xuY2xhc3MgSG9tZUNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J1JlYWxXb3JsZC52aWV3LkhvbWVDb21wb25lbnQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ1JlYWxXb3JsZC52aWV3LkhvbWVDb21wb25lbnQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IGFjdGl2ZVRhZz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBhY3RpdmVUYWc6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3RbXXxudWxsfSBhcnRpY2xlUHJldmlld3NfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGFydGljbGVQcmV2aWV3c186IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gY2xzPVsnaG9tZS1wYWdlJ11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWydob21lLXBhZ2UnXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gY291bnRBcnRpY2xlc189MTBcbiAgICAgICAgICovXG4gICAgICAgIGNvdW50QXJ0aWNsZXNfOiAxMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gY291bnRBcnRpY2xlc189MTBcbiAgICAgICAgICovXG4gICAgICAgIGN1cnJlbnRQYWdlXzogMSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdFtdfSBmZWVkc19cbiAgICAgICAgICovXG4gICAgICAgIGZlZWRzXzogW1xuICAgICAgICAgICAge25hbWU6ICdZb3VyIEZlZWQnLCAgIGRpc2FibGVkOiB0cnVlfSxcbiAgICAgICAgICAgIHtuYW1lOiAnR2xvYmFsIEZlZWQnLCBhY3RpdmUgIDogdHJ1ZX1cbiAgICAgICAgXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGxvZ2dlZEluXz1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgbG9nZ2VkSW5fOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gcGFnZVNpemVfPTEwXG4gICAgICAgICAqL1xuICAgICAgICBwYWdlU2l6ZV86IDEwLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7UmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5QcmV2aWV3Q29tcG9uZW50W119IHByZXZpZXdDb21wb25lbnRzPVtdXG4gICAgICAgICAqL1xuICAgICAgICBwcmV2aWV3Q29tcG9uZW50czogW10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtSZWFsV29ybGQudmlldy5hcnRpY2xlLlRhZ0xpc3RDb21wb25lbnR8bnVsbH0gdGFnTGlzdF89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgdGFnTGlzdF86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IF92ZG9tXG4gICAgICAgICAqL1xuICAgICAgICBfdmRvbToge1xuICAgICAgICAgICAgY246IFt7XG4gICAgICAgICAgICAgICAgY2xzOiBbJ2Jhbm5lciddLFxuICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2NvbnRhaW5lciddLFxuICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWcgOiAnaDEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWydsb2dvLWZvbnQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6ICdjb25kdWl0J1xuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWcgOiAncCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiAnQSBwbGFjZSB0byBzaGFyZSB5b3VyIGtub3dsZWRnZS4nXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBjbHM6IFsnY29udGFpbmVyJywgJ3BhZ2UnXSxcbiAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgIGNsczogWydyb3cnXSxcbiAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2NvbC1tZC05J10sXG4gICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2ZlZWQtdG9nZ2xlJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgOiAndWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ25hdicsICduYXYtcGlsbHMnLCAnb3V0bGluZS1hY3RpdmUnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogJ2ZlZWQtaGVhZGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gIDogW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ25hdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgOiAndWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ3BhZ2luYXRpb24nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogJ3BhZ2luYXRpb24nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgTmVvLm1haW4uRG9tRXZlbnRzLnJlZ2lzdGVyUHJldmVudERlZmF1bHRUYXJnZXRzKHtcbiAgICAgICAgICAgIG5hbWU6ICdjbGljaycsXG4gICAgICAgICAgICBjbHMgOiAncHJldmVudC1jbGljaydcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBkb21MaXN0ZW5lcnMgPSBtZS5kb21MaXN0ZW5lcnM7XG5cbiAgICAgICAgZG9tTGlzdGVuZXJzLnB1c2goXG4gICAgICAgICAgICB7Y2xpY2s6IHtmbjogbWUub25OYXZMaW5rQ2xpY2ssICAgICBkZWxlZ2F0ZTogJy5uYXYtbGluaycsICBzY29wZTogbWV9fSxcbiAgICAgICAgICAgIHtjbGljazoge2ZuOiBtZS5vblBhZ2VOYXZMaW5rQ2xpY2ssIGRlbGVnYXRlOiAnLnBhZ2UtbGluaycsIHNjb3BlOiBtZX19XG4gICAgICAgICk7XG5cbiAgICAgICAgbWUuZG9tTGlzdGVuZXJzID0gZG9tTGlzdGVuZXJzO1xuXG4gICAgICAgIG1lLmdldENvbnRyb2xsZXIoKS5vbih7XG4gICAgICAgICAgICBhZnRlclNldEN1cnJlbnRVc2VyOiBtZS5vbkN1cnJlbnRVc2VyQ2hhbmdlLFxuICAgICAgICAgICAgc2NvcGUgICAgICAgICAgICAgIDogbWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkNvbnN0cnVjdGVkKCkge1xuICAgICAgICBzdXBlci5vbkNvbnN0cnVjdGVkKCk7XG5cbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSA9IG1lLnZkb207XG5cbiAgICAgICAgbWUudGFnTGlzdCA9IE5lby5jcmVhdGUoe1xuICAgICAgICAgICAgbW9kdWxlICA6IFRhZ0xpc3RDb21wb25lbnQsXG4gICAgICAgICAgICBwYXJlbnRJZDogbWUuaWQsXG5cbiAgICAgICAgICAgIGxpc3RlbmVyczoge1xuICAgICAgICAgICAgICAgIHRhZ0NoYW5nZTogbWUub25UYWdDaGFuZ2UsXG4gICAgICAgICAgICAgICAgc2NvcGUgICAgOiBtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2ZG9tLmNuWzFdLmNuWzBdLmNuLnB1c2gobWUudGFnTGlzdC52ZG9tKTtcblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGFydGljbGVQcmV2aWV3cyBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfG51bGx9IHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3RbXXxudWxsfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEFydGljbGVQcmV2aWV3cyh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBjb250YWluZXIgPSBtZS5nZXRDb250YWluZXIoKSxcbiAgICAgICAgICAgIGZvb3RlciAgICA9IGNvbnRhaW5lci5jbi5wb3AoKSxcbiAgICAgICAgICAgIHZkb20gICAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICBjb25maWc7XG5cbiAgICAgICAgY29udGFpbmVyLmNuID0gW2NvbnRhaW5lci5jbi5zaGlmdCgpXTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgICAgICBhdXRob3IgICAgICAgIDogaXRlbS5hdXRob3IudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdCAgICAgOiBpdGVtLmNyZWF0ZWRBdCxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gICA6IGl0ZW0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlZCAgICAgOiBpdGVtLmZhdm9yaXRlZCxcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVzQ291bnQ6IGl0ZW0uZmF2b3JpdGVzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgIHNsdWcgICAgICAgICAgOiBpdGVtLnNsdWcsXG4gICAgICAgICAgICAgICAgICAgIHRhZ0xpc3QgICAgICAgOiBpdGVtLnRhZ0xpc3QsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlICAgICAgICAgOiBpdGVtLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICB1c2VySW1hZ2UgICAgIDogaXRlbS5hdXRob3IuaW1hZ2VcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKCFtZS5wcmV2aWV3Q29tcG9uZW50c1tpbmRleF0pIHtcbiAgICAgICAgICAgICAgICAgICAgbWUucHJldmlld0NvbXBvbmVudHNbaW5kZXhdID0gTmVvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGUgIDogUHJldmlld0NvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudElkOiBtZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmNvbmZpZ1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtZS5wcmV2aWV3Q29tcG9uZW50c1tpbmRleF0uc2V0KGNvbmZpZywgdHJ1ZSk7IC8vIGhpbnQ6IHRyeSB0aGlzIGNhbGwgd2l0aCBmYWxzZSBhbmQgY29tcGFyZSB0aGUgZGVsdGEgdXBkYXRlc1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jbi5wdXNoKG1lLnByZXZpZXdDb21wb25lbnRzW2luZGV4XS52ZG9tKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGFpbmVyLmNuLnB1c2goZm9vdGVyKTtcblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGNvdW50QXJ0aWNsZXMgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0Q291bnRBcnRpY2xlcyh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gICAgICAgID0gbWUudmRvbSxcbiAgICAgICAgICAgIHBhZ2luYXRpb24gID0gVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdwYWdpbmF0aW9uJyksXG4gICAgICAgICAgICBwYWdlU2l6ZSAgICA9IG1lLnBhZ2VTaXplLFxuICAgICAgICAgICAgY291bnRQYWdlcyAgPSBNYXRoLmNlaWwodmFsdWUgLyBwYWdlU2l6ZSksXG4gICAgICAgICAgICBjdXJyZW50UGFnZSA9IG1lLmN1cnJlbnRQYWdlLFxuICAgICAgICAgICAgaSAgICAgICAgICAgPSAxLFxuICAgICAgICAgICAgY2xzO1xuXG4gICAgICAgIGlmIChjb3VudFBhZ2VzIDwgMikge1xuICAgICAgICAgICAgLy8gdG9kbzogaGlkZSB0aGUgcGFnaW5nIGJiYXJcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhZ2luYXRpb24uY24gPSBbXTtcblxuICAgICAgICAgICAgZm9yICg7IGkgPD0gY291bnRQYWdlczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY2xzID0gWydwYWdlLWl0ZW0nXTtcblxuICAgICAgICAgICAgICAgIGlmIChpID09PSBjdXJyZW50UGFnZSkge1xuICAgICAgICAgICAgICAgICAgICBjbHMucHVzaCgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbi5jbi5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGFnOiAnbGknLFxuICAgICAgICAgICAgICAgICAgICBjbHM6IGNscyxcbiAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2EnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWydwYWdlLWxpbmsnLCAncHJldmVudC1jbGljayddLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQgIDogbWUuZ2V0TmF2TGlua1Zkb21JZChpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogaVxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBjdXJyZW50UGFnZSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRDdXJyZW50UGFnZSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSA9IG1lLnZkb20sXG4gICAgICAgICAgICBub2RlLCBvbGROb2RlO1xuXG4gICAgICAgIGlmIChtZS5tb3VudGVkKSB7XG4gICAgICAgICAgICBub2RlICAgID0gVkRvbVV0aWwuZmluZFZkb21DaGlsZCh2ZG9tLCBtZS5nZXROYXZMaW5rVmRvbUlkKHZhbHVlKSkucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIG9sZE5vZGUgPSBWRG9tVXRpbC5maW5kVmRvbUNoaWxkKHZkb20sIG1lLmdldE5hdkxpbmtWZG9tSWQob2xkVmFsdWUpKS5wYXJlbnROb2RlO1xuXG4gICAgICAgICAgICBOZW9BcnJheS5hZGQobm9kZS5jbHMsICdhY3RpdmUnKTtcbiAgICAgICAgICAgIE5lb0FycmF5LnJlbW92ZShvbGROb2RlLmNscywgJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICBtZS52ZG9tID0gdmRvbTtcblxuICAgICAgICAgICAgbWUuZ2V0Q29udHJvbGxlcigpLl9hcnRpY2xlc09mZnNldCA9ICh2YWx1ZSAtIDEpICogbWUucGFnZVNpemU7IC8vIHNpbGVudCB1cGRhdGVcbiAgICAgICAgICAgIG1lLmdldEFydGljbGVzKCk7XG5cbiAgICAgICAgICAgIE5lby5tYWluLkRvbUFjY2Vzcy53aW5kb3dTY3JvbGxUbyh7fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGZlZWRzIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3RbXX0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRGZWVkcyh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSAgICAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICBmZWVkSGVhZGVyID0gVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdmZWVkLWhlYWRlcicpLFxuICAgICAgICAgICAgY2xzO1xuXG4gICAgICAgIGZlZWRIZWFkZXIuY24gPSBbXTtcblxuICAgICAgICB2YWx1ZS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY2xzID0gWydwcmV2ZW50LWNsaWNrJywgJ25hdi1saW5rJ107XG5cbiAgICAgICAgICAgIGlmIChpdGVtLmFjdGl2ZSkgICB7Y2xzLnB1c2goJ2FjdGl2ZScpO31cbiAgICAgICAgICAgIGlmIChpdGVtLmRpc2FibGVkKSB7Y2xzLnB1c2goJ2Rpc2FibGVkJyk7fVxuXG4gICAgICAgICAgICBmZWVkSGVhZGVyLmNuLnB1c2goe1xuICAgICAgICAgICAgICAgIHRhZzogJ2xpJyxcbiAgICAgICAgICAgICAgICBjbHM6IFsnbmF2LWl0ZW0nXSxcbiAgICAgICAgICAgICAgICBpZCA6IG1lLmlkICsgJ19fbmF2LWl0ZW1fJyArIGluZGV4LFxuICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgdGFnOiAnYScsXG4gICAgICAgICAgICAgICAgICAgIGNsczogY2xzLFxuICAgICAgICAgICAgICAgICAgICBocmVmOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgaHRtbDogaXRlbS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBpZCAgOiBtZS5pZCArICdfX25hdi1pdGVtLWxpbmtfJyArIGluZGV4LFxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBsb2dnZWRJbiBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldExvZ2dlZEluKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tICAgID0gbWUudmRvbSxcbiAgICAgICAgICAgIG5hdkl0ZW0gPSBWRG9tVXRpbC5maW5kVmRvbUNoaWxkKHZkb20sIG1lLmlkICsgJ19fbmF2LWl0ZW0tbGlua18wJykudmRvbTtcblxuICAgICAgICBOZW9BcnJheVt2YWx1ZSA/ICdyZW1vdmUnIDogJ2FkZCddKG5hdkl0ZW0uY2xzLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdG9kb1xuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgcGFnZVNpemUgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0UGFnZVNpemUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXMsXG4gICAgICAgICAgICBpICA9IDA7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2FmdGVyU2V0UGFnZVNpemUnLCB2YWx1ZSk7XG5cbiAgICAgICAgZm9yICg7IGkgPCB2YWx1ZTsgaSsrKSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gYXJ0aWNsZSBpZCB1c2luZyB0aGUgdmlldyBpZCBhcyBhIHByZWZpeFxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IGl0ZW1JZFxuICAgICAqL1xuICAgIGdldEFydGljbGVJZChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pZCArICdfXycgKyBpZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zPXt9XVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cz17fV1cbiAgICAgKi9cbiAgICBnZXRBcnRpY2xlcyhwYXJhbXM9e30sIG9wdHM9e30pIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUuYWN0aXZlVGFnKSB7XG4gICAgICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgdGFnOiBtZS5hY3RpdmVUYWcsXG4gICAgICAgICAgICAgICAgLi4ucGFyYW1zXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgbWUuZ2V0Q29udHJvbGxlcigpLmdldEFydGljbGVzKHBhcmFtcywgb3B0cykudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIG1lLnNldCh7XG4gICAgICAgICAgICAgICAgYXJ0aWNsZVByZXZpZXdzOiBkYXRhLmpzb24uYXJ0aWNsZXMsXG4gICAgICAgICAgICAgICAgY291bnRBcnRpY2xlcyAgOiBkYXRhLmpzb24uYXJ0aWNsZXNDb3VudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge09iamVjdH0gdmRvbVxuICAgICAqL1xuICAgIGdldENvbnRhaW5lcigpIHtcbiAgICAgICAgbGV0IGVsID0gVkRvbVV0aWwuZmluZFZkb21DaGlsZCh0aGlzLnZkb20sIHtjbHM6ICdjb2wtbWQtOSd9KTtcbiAgICAgICAgcmV0dXJuIGVsICYmIGVsLnZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbm9kZUlkXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXROYXZMaW5rSWQobm9kZUlkKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludChub2RlSWQuc3BsaXQoJ19fJylbMV0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfSBpZFxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICovXG4gICAgZ2V0TmF2TGlua1Zkb21JZChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pZCArICdfXycgKyBpZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25OYXZMaW5rQ2xpY2soZGF0YSkge1xuICAgICAgICBsZXQgbWUgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tICAgICAgID0gbWUudmRvbSxcbiAgICAgICAgICAgIGVsICAgICAgICAgPSBWRG9tVXRpbC5maW5kVmRvbUNoaWxkKHZkb20sIGRhdGEucGF0aFswXS5pZCksXG4gICAgICAgICAgICBmZWVkSGVhZGVyID0gVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdmZWVkLWhlYWRlcicpLFxuICAgICAgICAgICAgb3B0cyAgICAgICA9IHt9O1xuXG4gICAgICAgIGlmICghZWwudmRvbS5jbHMuaW5jbHVkZXMoJ2Rpc2FibGVkJykpIHtcbiAgICAgICAgICAgIHN3aXRjaChlbC52ZG9tLmh0bWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdHbG9iYWwgRmVlZCc6XG4gICAgICAgICAgICAgICAgICAgIG1lLmFjdGl2ZVRhZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1lvdXIgRmVlZCc6XG4gICAgICAgICAgICAgICAgICAgIG1lLmFjdGl2ZVRhZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbHVnOiAnZmVlZCdcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogLy8gdGFnXG4gICAgICAgICAgICAgICAgICAgIG1lLmFjdGl2ZVRhZyA9IGVsLnZkb20uaHRtbC5zdWJzdHJpbmcoMik7IC8vIHJlbW92ZSB0aGUgJyMgJ1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZmVlZEhlYWRlci5jbi5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIE5lb0FycmF5W2l0ZW0uaWQgPT09IGVsLnBhcmVudE5vZGUuaWQgPyAnYWRkJyA6ICdyZW1vdmUnXShpdGVtLmNuWzBdLmNscywgJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgbWUuX2N1cnJlbnRQYWdlID0gMTsgLy8gc2lsZW50IHVwZGF0ZVxuICAgICAgICAgICAgbWUudmRvbSA9IHZkb207XG5cbiAgICAgICAgICAgIG1lLmdldENvbnRyb2xsZXIoKS5fYXJ0aWNsZXNPZmZzZXQgPSAwOyAvLyBzaWxlbnQgdXBkYXRlXG4gICAgICAgICAgICBtZS5nZXRBcnRpY2xlcyh7fSwgb3B0cyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZVxuICAgICAqL1xuICAgIG9uQ3VycmVudFVzZXJDaGFuZ2UodmFsdWUpIHtcbiAgICAgICAgdGhpcy5sb2dnZWRJbiA9ICEhdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uUGFnZU5hdkxpbmtDbGljayhkYXRhKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLmdldE5hdkxpbmtJZChkYXRhLnBhdGhbMF0uaWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xudWxsfSBvcHRzLm9sZFZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd8bnVsbH0gb3B0cy52YWx1ZVxuICAgICAqL1xuICAgIG9uVGFnQ2hhbmdlKG9wdHMpIHtcbiAgICAgICAgbGV0IG1lICAgID0gdGhpcyxcbiAgICAgICAgICAgIGZlZWRzID0gbWUuZmVlZHMsXG4gICAgICAgICAgICBuYW1lICA9ICcjICcgKyBvcHRzLnZhbHVlO1xuXG4gICAgICAgIGZlZWRzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZmVlZHMubGVuZ3RoIDwgMykge1xuICAgICAgICAgICAgZmVlZHMucHVzaCh7XG4gICAgICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgIG5hbWUgIDogbmFtZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGZlZWRzWzJdLCB7XG4gICAgICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgIG5hbWUgIDogbmFtZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBtZS5hY3RpdmVUYWcgICAgPSBvcHRzLnZhbHVlO1xuICAgICAgICBtZS5fY3VycmVudFBhZ2UgPSAxOyAvLyBzaWxlbnQgdXBkYXRlXG4gICAgICAgIG1lLmZlZWRzICAgICAgICA9IGZlZWRzO1xuXG4gICAgICAgIG1lLmdldENvbnRyb2xsZXIoKS5fYXJ0aWNsZXNPZmZzZXQgPSAwOyAvLyBzaWxlbnQgdXBkYXRlXG5cbiAgICAgICAgbWUuZ2V0QXJ0aWNsZXMoe1xuICAgICAgICAgICAgdGFnOiBvcHRzLnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoSG9tZUNvbXBvbmVudCk7XG5cbmV4cG9ydCB7SG9tZUNvbXBvbmVudCBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgRm9vdGVyQ29tcG9uZW50ICAgICAgICAgZnJvbSAnLi9Gb290ZXJDb21wb25lbnQubWpzJztcbmltcG9ydCBIZWFkZXJDb21wb25lbnQgICAgICAgICBmcm9tICcuL0hlYWRlckNvbXBvbmVudC5tanMnO1xuaW1wb3J0IEhvbWVDb21wb25lbnQgICAgICAgICAgIGZyb20gJy4vSG9tZUNvbXBvbmVudC5tanMnO1xuaW1wb3J0IE1haW5Db250YWluZXJDb250cm9sbGVyIGZyb20gJy4vTWFpbkNvbnRhaW5lckNvbnRyb2xsZXIubWpzJztcbmltcG9ydCBWaWV3cG9ydCAgICAgICAgICAgICAgICBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29udGFpbmVyL1ZpZXdwb3J0Lm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIFJlYWxXb3JsZC52aWV3Lk1haW5Db250YWluZXJcbiAqIEBleHRlbmRzIE5lby5jb250YWluZXIuVmlld3BvcnRcbiAqL1xuY2xhc3MgTWFpbkNvbnRhaW5lciBleHRlbmRzIFZpZXdwb3J0IHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nUmVhbFdvcmxkLnZpZXcuTWFpbkNvbnRhaW5lcidcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnUmVhbFdvcmxkLnZpZXcuTWFpbkNvbnRhaW5lcicsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBhdXRvTW91bnQ9dHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgYXV0b01vdW50OiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl9IGNscz1bXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge05lby5jb250cm9sbGVyLkNvbXBvbmVudH0gY29udHJvbGxlcj1NYWluQ29udGFpbmVyQ29udHJvbGxlclxuICAgICAgICAgKi9cbiAgICAgICAgY29udHJvbGxlcjogTWFpbkNvbnRhaW5lckNvbnRyb2xsZXIsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IGxheW91dD17bnR5cGU6ICd2Ym94J31cbiAgICAgICAgICovXG4gICAgICAgIGxheW91dDoge250eXBlOiAnYmFzZSd9LFxuXG4gICAgICAgIGl0ZW1zOiBbe1xuICAgICAgICAgICAgbW9kdWxlICAgOiBIZWFkZXJDb21wb25lbnQsXG4gICAgICAgICAgICByZWZlcmVuY2U6ICdoZWFkZXInXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG1vZHVsZTogRm9vdGVyQ29tcG9uZW50XG4gICAgICAgIH1dXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIGlmICghTmVvLmNvbmZpZy5oYXNoKSB7XG4gICAgICAgICAgICB0aGlzLl9pdGVtcy5zcGxpY2UoMSwgMCwge1xuICAgICAgICAgICAgICAgIG1vZHVsZSAgIDogSG9tZUNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICBmbGV4ICAgICA6IDEsXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlOiAnaG9tZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhNYWluQ29udGFpbmVyKTtcblxuZXhwb3J0IHtNYWluQ29udGFpbmVyIGFzIGRlZmF1bHR9OyIsImltcG9ydCBBcnRpY2xlQ29tcG9uZW50ICAgIGZyb20gJy4vYXJ0aWNsZS9Db21wb25lbnQubWpzJztcbmltcG9ydCBBcnRpY2xlQXBpICAgICAgICAgIGZyb20gJy4uL2FwaS9BcnRpY2xlLm1qcyc7XG5pbXBvcnQgQ29tcG9uZW50Q29udHJvbGxlciBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29udHJvbGxlci9Db21wb25lbnQubWpzJztcbmltcG9ydCBDcmVhdGVDb21wb25lbnQgICAgIGZyb20gJy4vYXJ0aWNsZS9DcmVhdGVDb21wb25lbnQubWpzJztcbmltcG9ydCBGYXZvcml0ZUFwaSAgICAgICAgIGZyb20gJy4uL2FwaS9GYXZvcml0ZS5tanMnO1xuaW1wb3J0IEhvbWVDb21wb25lbnQgICAgICAgZnJvbSAnLi9Ib21lQ29tcG9uZW50Lm1qcyc7XG5pbXBvcnQge0xPQ0FMX1NUT1JBR0VfS0VZfSBmcm9tICcuLi9hcGkvY29uZmlnLm1qcyc7XG5pbXBvcnQgUHJvZmlsZUFwaSAgICAgICAgICBmcm9tICcuLi9hcGkvUHJvZmlsZS5tanMnO1xuaW1wb3J0IFByb2ZpbGVDb21wb25lbnQgICAgZnJvbSAnLi91c2VyL1Byb2ZpbGVDb21wb25lbnQubWpzJztcbmltcG9ydCBTZXR0aW5nc0NvbXBvbmVudCAgIGZyb20gJy4vdXNlci9TZXR0aW5nc0NvbXBvbmVudC5tanMnO1xuaW1wb3J0IFNpZ25VcENvbXBvbmVudCAgICAgZnJvbSAnLi91c2VyL1NpZ25VcENvbXBvbmVudC5tanMnO1xuaW1wb3J0IFRhZ0FwaSAgICAgICAgICAgICAgZnJvbSAnLi4vYXBpL1RhZy5tanMnO1xuaW1wb3J0IFVzZXJBcGkgICAgICAgICAgICAgZnJvbSAnLi4vYXBpL1VzZXIubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgUmVhbFdvcmxkLnZpZXcuTWFpbkNvbnRhaW5lckNvbnRyb2xsZXJcbiAqIEBleHRlbmRzIE5lby5jb250cm9sbGVyLkNvbXBvbmVudFxuICovXG5jbGFzcyBNYWluQ29udGFpbmVyQ29udHJvbGxlciBleHRlbmRzIENvbXBvbmVudENvbnRyb2xsZXIge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdSZWFsV29ybGQudmlldy5NYWluQ29udGFpbmVyQ29udHJvbGxlcidcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnUmVhbFdvcmxkLnZpZXcuTWFpbkNvbnRhaW5lckNvbnRyb2xsZXInLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7UmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5Db21wb25lbnR8bnVsbH0gYXJ0aWNsZUNvbXBvbmVudD1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGFydGljbGVDb21wb25lbnQ6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IGFydGljbGVzT2Zmc2V0Xz0wXG4gICAgICAgICAqL1xuICAgICAgICBhcnRpY2xlc09mZnNldF86IDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtSZWFsV29ybGQudmlldy5hcnRpY2xlLkNyZWF0ZUNvbXBvbmVudHxudWxsfSBjcmVhdGVDb21wb25lbnQ9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVDb21wb25lbnQ6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9yZXMgdGhlIGN1cnJlbnQgdXNlciBkYXRhIGFmdGVyIGxvZ2dpbmcgaW5cbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fG51bGx9IGN1cnJlbnRVc2VyXz1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGN1cnJlbnRVc2VyXzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBoYXNoU3RyaW5nPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGhhc2hTdHJpbmc6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtSZWFsV29ybGQudmlldy5Ib21lQ29tcG9uZW50fG51bGx9IGhvbWVDb21wb25lbnQ9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBob21lQ29tcG9uZW50OiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7UmVhbFdvcmxkLnZpZXcudXNlci5Qcm9maWxlQ29tcG9uZW50fG51bGx9IHByb2ZpbGVDb21wb25lbnQ9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBwcm9maWxlQ29tcG9uZW50OiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7UmVhbFdvcmxkLnZpZXcudXNlci5TZXR0aW5nc0NvbXBvbmVudHxudWxsfSBzZXR0aW5nc0NvbXBvbmVudD1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHNldHRpbmdzQ29tcG9uZW50OiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7UmVhbFdvcmxkLnZpZXcudXNlci5TaWduVXBDb21wb25lbnR8bnVsbH0gc2lnblVwQ29tcG9uZW50PW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc2lnblVwQ29tcG9uZW50OiBudWxsXG4gICAgfX1cblxuICAgIG9uQ29uc3RydWN0ZWQoKSB7XG4gICAgICAgIHN1cGVyLm9uQ29uc3RydWN0ZWQoKTtcblxuICAgICAgICBjb25zdCBtZSA9IHRoaXM7XG5cbiAgICAgICAgVXNlckFwaS5vbigncmVhZHknLCBtZS5nZXRDdXJyZW50VXNlciwgbWUpO1xuXG4gICAgICAgIC8vIGRlZmF1bHQgcm91dGUgPT4gaG9tZVxuICAgICAgICBpZiAoIU5lby5jb25maWcuaGFzaCkge1xuICAgICAgICAgICAgbWUub25IYXNoQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICBhcHBOYW1lcyAgOiBbJ1JlYWxXb3JsZCddLFxuICAgICAgICAgICAgICAgIGhhc2ggICAgICA6IHsnLyc6ICcnfSxcbiAgICAgICAgICAgICAgICBoYXNoU3RyaW5nOiAnLydcbiAgICAgICAgICAgIH0sIG51bGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBhcnRpY2xlc09mZnNldCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRBcnRpY2xlc09mZnNldCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgLy8gaWdub3JlIHRoZSBpbml0aWFsIGNvbmZpZyBzZXR0ZXIgY2FsbFxuICAgICAgICBpZiAoTmVvLmlzTnVtYmVyKG9sZFZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5nZXRBcnRpY2xlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBjdXJyZW50VXNlciBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRDdXJyZW50VXNlcih2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvbGRWYWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVmZXJlbmNlKCdoZWFkZXInKS5zZXQoe1xuICAgICAgICAgICAgICAgIGxvZ2dlZEluIDogISF2YWx1ZSxcbiAgICAgICAgICAgICAgICB1c2VySW1hZ2U6IHZhbHVlID8gdmFsdWUuaW1hZ2UgICAgOiBudWxsLFxuICAgICAgICAgICAgICAgIHVzZXJOYW1lIDogdmFsdWUgPyB2YWx1ZS51c2VybmFtZSA6IG51bGxcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHRvZG86IHRlc3QgdG8gZW5zdXJlIHRoZSBpbml0aWFsIG1hcmt1cCBpcyByZW5kZXJlZFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ2FmdGVyU2V0Q3VycmVudFVzZXInLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2x1Z1xuICAgICAqL1xuICAgIGRlbGV0ZUFydGljbGUoc2x1Zykge1xuICAgICAgICBBcnRpY2xlQXBpLmRlbGV0ZSh7c2x1Zzogc2x1Z30pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBOZW8uTWFpbi5zZXRSb3V0ZSh7XG4gICAgICAgICAgICAgICAgdmFsdWU6ICcvJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGlkXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICAgKi9cbiAgICBkZWxldGVDb21tZW50KGlkKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIHNsdWcgPSBtZS5oYXNoU3RyaW5nLnNwbGl0KCcvJykucG9wKCk7XG5cbiAgICAgICAgcmV0dXJuIEFydGljbGVBcGkuZGVsZXRlQ29tbWVudChzbHVnLCBpZCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIG1lLmdldENvbW1lbnRzKHNsdWcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzbHVnXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBmYXZvcml0ZWRcbiAgICAgKi9cbiAgICBmYXZvcml0ZUFydGljbGUoc2x1ZywgZmF2b3JpdGVkKSB7XG4gICAgICAgIHJldHVybiBGYXZvcml0ZUFwaVtmYXZvcml0ZWQgPyAnYWRkJyA6ICdyZW1vdmUnXShzbHVnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzbHVnXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBmb2xsb3dcbiAgICAgKi9cbiAgICBmb2xsb3dVc2VyKHNsdWcsIGZvbGxvdykge1xuICAgICAgICByZXR1cm4gUHJvZmlsZUFwaVtmb2xsb3cgPyAnZm9sbG93JyA6ICd1bmZvbGxvdyddKHNsdWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFydGljbGUgZGV0YWlsczogZ2V0IGFuIGFydGljbGUgcHJvdmlkaW5nIGEgdXNlciBzbHVnXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNsdWdcbiAgICAgKi9cbiAgICBnZXRBcnRpY2xlKHNsdWcpIHtcbiAgICAgICAgcmV0dXJuIEFydGljbGVBcGkuZ2V0KHtcbiAgICAgICAgICAgIHNsdWc6IHNsdWdcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17fV1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHM9e31dXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICAgKi9cbiAgICBnZXRBcnRpY2xlcyhwYXJhbXM9e30sIG9wdHM9e30pIHtcbiAgICAgICAgcmV0dXJuIEFydGljbGVBcGkuZ2V0KHtcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgIGxpbWl0IDogMTAsXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiB0aGlzLmFydGljbGVzT2Zmc2V0LFxuICAgICAgICAgICAgICAgIC4uLnBhcmFtc1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC4uLm9wdHNcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2x1Z1xuICAgICAqL1xuICAgIGdldENvbW1lbnRzKHNsdWcpIHtcbiAgICAgICAgQXJ0aWNsZUFwaS5nZXRDb21tZW50cyhzbHVnKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5hcnRpY2xlQ29tcG9uZW50LmNvbW1lbnRzID0gZGF0YS5qc29uLmNvbW1lbnRzO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlblxuICAgICAqL1xuICAgIGdldEN1cnJlbnRVc2VyKHRva2VuKSB7XG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgVXNlckFwaS5nZXQoe1xuICAgICAgICAgICAgICAgIHJlc291cmNlOiAnL3VzZXInIC8vIGVkZ2UgY2FzZSwgdXNlciBpbnN0ZWFkIG9mIHVzZXJzXG4gICAgICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFVzZXIgPSBkYXRhLmpzb24udXNlcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2x1Z1xuICAgICAqL1xuICAgIGdldFByb2ZpbGUoc2x1Zykge1xuICAgICAgICBjb25zdCBtZSA9IHRoaXM7XG5cbiAgICAgICAgUHJvZmlsZUFwaS5nZXQoe1xuICAgICAgICAgICAgc2x1Zzogc2x1Z1xuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgbWUucHJvZmlsZUNvbXBvbmVudC51cGRhdGUoe1xuICAgICAgICAgICAgICAgIC4uLmRhdGEuanNvbi5wcm9maWxlLFxuICAgICAgICAgICAgICAgIG15UHJvZmlsZTogZGF0YS5qc29uLnByb2ZpbGUudXNlcm5hbWUgPT09IChtZS5jdXJyZW50VXNlciAmJiBtZS5jdXJyZW50VXNlci51c2VybmFtZSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGdldFRhZ3MoKSB7XG4gICAgICAgIFRhZ0FwaS5nZXQoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5ob21lQ29tcG9uZW50LnRhZ0xpc3QudGFncyA9IGRhdGEuanNvbi50YWdzO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge05lby5jb21wb25lbnQuQmFzZX0gbW9kdWxlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHJlZmVyZW5jZVxuICAgICAqIEByZXR1cm5zIHtOZW8uY29tcG9uZW50LkJhc2V9IFRoZSBtYXRjaGluZyB2aWV3IGluc3RhbmNlXG4gICAgICovXG4gICAgZ2V0VmlldyhrZXksIG1vZHVsZSwgcmVmZXJlbmNlKSB7XG4gICAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAoIW1lW2tleV0pIHtcbiAgICAgICAgICAgIG1lW2tleV0gPSBOZW8uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBtb2R1bGUgICA6IG1vZHVsZSxcbiAgICAgICAgICAgICAgICBwYXJlbnRJZCA6IG1lLmNvbXBvbmVudC5pZCxcbiAgICAgICAgICAgICAgICByZWZlcmVuY2U6IHJlZmVyZW5jZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWVba2V5XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdXNlckRhdGFcbiAgICAgKi9cbiAgICBsb2dpbih1c2VyRGF0YSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRVc2VyID0gdXNlckRhdGE7XG5cbiAgICAgICAgTmVvLm1haW4uYWRkb24uTG9jYWxTdG9yYWdlLmNyZWF0ZUxvY2FsU3RvcmFnZUl0ZW0oe1xuICAgICAgICAgICAga2V5ICA6IExPQ0FMX1NUT1JBR0VfS0VZLFxuICAgICAgICAgICAgdmFsdWU6IHVzZXJEYXRhLnRva2VuXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gd2FpdCB1bnRpbCB0aGUgaGVhZGVyIHZkb20tdXBkYXRlIGlzIGRvbmUgdG8gYXZvaWQgc2hvd2luZyBzaWduIHVwICYgc2lnbiBpbiB0d2ljZVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgTmVvLk1haW4uc2V0Um91dGUoe1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJy8nXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgbG9nb3V0KCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRVc2VyID0gbnVsbDtcblxuICAgICAgICBOZW8ubWFpbi5hZGRvbi5Mb2NhbFN0b3JhZ2UuZGVzdHJveUxvY2FsU3RvcmFnZUl0ZW0oe1xuICAgICAgICAgICAga2V5OiBMT0NBTF9TVE9SQUdFX0tFWVxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vIHdhaXQgdW50aWwgdGhlIGhlYWRlciB2ZG9tLXVwZGF0ZSBpcyBkb25lIHRvIGF2b2lkIHNob3dpbmcgc2lnbiB1cCAmIHNpZ24gaW4gdHdpY2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIE5lby5NYWluLnNldFJvdXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcvJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvbGRWYWx1ZVxuICAgICAqL1xuICAgIG9uSGFzaENoYW5nZSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgY29tcG9uZW50ICA9IG1lLmNvbXBvbmVudCxcbiAgICAgICAgICAgIGhhc2ggICAgICAgPSB2YWx1ZS5oYXNoLFxuICAgICAgICAgICAgaGFzaFN0cmluZyA9IHZhbHVlLmhhc2hTdHJpbmcsXG4gICAgICAgICAgICBuZXdWaWV3LCBzbHVnO1xuXG4gICAgICAgIGlmICghY29tcG9uZW50Lm1vdW50ZWQpIHsgLy8gdGhlIGluaXRpYWwgaGFzaCBjaGFuZ2UgZ2V0cyB0cmlnZ2VyZWQgYmVmb3JlIHRoZSB2bm9kZSBnb3QgYmFjayBmcm9tIHRoZSB2ZG9tIHdvcmtlciAodXNpbmcgYXV0b01vdW50KVxuICAgICAgICAgICAgY29tcG9uZW50Lm9uKCdtb3VudGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIG1lLm9uSGFzaENoYW5nZSh2YWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZS5oYXNoU3RyaW5nID0gaGFzaFN0cmluZztcblxuICAgICAgICAgICAgLy8gYWRqdXN0IHRoZSBhY3RpdmUgaGVhZGVyIGxpbmtcbiAgICAgICAgICAgIGNvbXBvbmVudC5pdGVtc1swXS5hY3RpdmVJdGVtID0gT2JqZWN0LmtleXMoaGFzaClbMF07XG5cbiAgICAgICAgICAgICAgICAgaWYgKGhhc2hTdHJpbmcgPT09ICcvJykgICAgICAgICAgICAgICAge25ld1ZpZXcgPSBtZS5nZXRWaWV3KCdob21lQ29tcG9uZW50JywgICAgIEhvbWVDb21wb25lbnQsICAgICAnaG9tZScpO31cbiAgICAgICAgICAgIGVsc2UgaWYgKGhhc2hTdHJpbmcuaW5jbHVkZXMoJy9hcnRpY2xlLycpKSAge25ld1ZpZXcgPSBtZS5nZXRWaWV3KCdhcnRpY2xlQ29tcG9uZW50JywgIEFydGljbGVDb21wb25lbnQsICAnYXJ0aWNsZScpO31cbiAgICAgICAgICAgIGVsc2UgaWYgKGhhc2hTdHJpbmcuaW5jbHVkZXMoJy9lZGl0b3InKSkgICAge25ld1ZpZXcgPSBtZS5nZXRWaWV3KCdjcmVhdGVDb21wb25lbnQnLCAgIENyZWF0ZUNvbXBvbmVudCwgICAnZWRpdG9yJyk7fVxuICAgICAgICAgICAgZWxzZSBpZiAoaGFzaFN0cmluZy5pbmNsdWRlcygnL3Byb2ZpbGUvJykpICB7bmV3VmlldyA9IG1lLmdldFZpZXcoJ3Byb2ZpbGVDb21wb25lbnQnLCAgUHJvZmlsZUNvbXBvbmVudCwgICdwcm9maWxlJyk7fVxuICAgICAgICAgICAgZWxzZSBpZiAoaGFzaC5oYXNPd25Qcm9wZXJ0eSgnL2xvZ2luJykpICAgIHtuZXdWaWV3ID0gbWUuZ2V0Vmlldygnc2lnblVwQ29tcG9uZW50JywgICBTaWduVXBDb21wb25lbnQsICAgJ3NpZ251cCcpOyBuZXdWaWV3Lm1vZGUgPSAnc2lnbmluJzt9XG4gICAgICAgICAgICBlbHNlIGlmIChoYXNoLmhhc093blByb3BlcnR5KCcvcmVnaXN0ZXInKSkge25ld1ZpZXcgPSBtZS5nZXRWaWV3KCdzaWduVXBDb21wb25lbnQnLCAgIFNpZ25VcENvbXBvbmVudCwgICAnc2lnbnVwJyk7IG5ld1ZpZXcubW9kZSA9ICdzaWdudXAnO31cbiAgICAgICAgICAgIGVsc2UgaWYgKGhhc2guaGFzT3duUHJvcGVydHkoJy9zZXR0aW5ncycpKSB7bmV3VmlldyA9IG1lLmdldFZpZXcoJ3NldHRpbmdzQ29tcG9uZW50JywgU2V0dGluZ3NDb21wb25lbnQsICdzZXR0aW5ncycpO31cblxuICAgICAgICAgICAgaWYgKCEob2xkVmFsdWUgJiYgb2xkVmFsdWUuaGFzaCAmJiAoXG4gICAgICAgICAgICAgICAgb2xkVmFsdWUuaGFzaC5oYXNPd25Qcm9wZXJ0eSgnL2xvZ2luJykgICAgJiYgaGFzaC5oYXNPd25Qcm9wZXJ0eSgnL3JlZ2lzdGVyJykgfHxcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZS5oYXNoLmhhc093blByb3BlcnR5KCcvcmVnaXN0ZXInKSAmJiBoYXNoLmhhc093blByb3BlcnR5KCcvbG9naW4nKSkpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50Lml0ZW1zLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LnJlbW92ZUF0KDEsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobmV3Vmlldykge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuaW5zZXJ0KDEsIG5ld1ZpZXcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3dpdGNoIChuZXdWaWV3LnJlZmVyZW5jZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2FydGljbGUnOlxuICAgICAgICAgICAgICAgICAgICBzbHVnID0gaGFzaFN0cmluZy5zcGxpdCgnLycpLnBvcCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIG1lLmdldEFydGljbGUoc2x1ZykudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhcnRpY2xlID0gZGF0YS5qc29uLmFydGljbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keSAgICA9IGFydGljbGUuYm9keTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGFydGljbGUuYm9keTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbWUuYXJ0aWNsZUNvbXBvbmVudC5zZXQoYXJ0aWNsZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWUuYXJ0aWNsZUNvbXBvbmVudC5ib2R5ID0gYm9keTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBtZS5nZXRDb21tZW50cyhzbHVnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZWRpdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgc2x1ZyA9IGhhc2hTdHJpbmcuc3BsaXQoJy8nKS5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNsdWcgIT09ICdlZGl0b3InKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZS5nZXRBcnRpY2xlKHNsdWcpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJ0aWNsZSA9IGRhdGEuanNvbi5hcnRpY2xlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWUuY3JlYXRlQ29tcG9uZW50LnNldCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkgICAgICAgOiBhcnRpY2xlLmJvZHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBhcnRpY2xlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbHVnICAgICAgIDogYXJ0aWNsZS5zbHVnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWdMaXN0ICAgIDogYXJ0aWNsZS50YWdMaXN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgICAgIDogYXJ0aWNsZS50aXRsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZS5jcmVhdGVDb21wb25lbnQucmVzZXRGb3JtKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaG9tZSc6XG4gICAgICAgICAgICAgICAgICAgIG1lLmhvbWVDb21wb25lbnQubG9nZ2VkSW4gPSAhIW1lLmN1cnJlbnRVc2VyO1xuICAgICAgICAgICAgICAgICAgICBtZS5ob21lQ29tcG9uZW50LmdldEFydGljbGVzKCk7XG4gICAgICAgICAgICAgICAgICAgIG1lLmdldFRhZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncHJvZmlsZSc6XG4gICAgICAgICAgICAgICAgICAgIG1lLmdldFByb2ZpbGUoaGFzaFN0cmluZy5zcGxpdCgnLycpLnBvcCgpKTsgLy8gcGFzcyB0aGUgc2x1Z1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzZXR0aW5ncyc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZS5jdXJyZW50VXNlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIGFkZGVkIGEgc2hvcnQgZGVsYXkgdG8gbm90IGludGVyZmVyZSB3aXRoIHRoZSBtYWluQ29udGFpbmVyIHVwZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lLnNldHRpbmdzQ29tcG9uZW50Lm9uQ3VycmVudFVzZXJDaGFuZ2UobWUuY3VycmVudFVzZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3NpZ251cCc6XG4gICAgICAgICAgICAgICAgICAgIG5ld1ZpZXcuZXJyb3JzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHMpXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICAgKi9cbiAgICBwb3N0Q29tbWVudChvcHRzPXt9KSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIHNsdWcgPSBtZS5oYXNoU3RyaW5nLnNwbGl0KCcvJykucG9wKCk7XG5cbiAgICAgICAgcmV0dXJuIEFydGljbGVBcGkucG9zdENvbW1lbnQoc2x1Zywgb3B0cykudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIG1lLmdldENvbW1lbnRzKHNsdWcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICAgKi9cbiAgICBzYXZlVXNlcihvcHRzKSB7XG4gICAgICAgIHJldHVybiBVc2VyQXBpLnBvc3Qob3B0cyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHMpXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICAgKi9cbiAgICB1cGRhdGVTZXR0aW5ncyhvcHRzPXt9KSB7XG4gICAgICAgIHJldHVybiBVc2VyQXBpLnB1dCh7XG4gICAgICAgICAgICAuLi5vcHRzLFxuICAgICAgICAgICAgcmVzb3VyY2U6ICcvdXNlcicgLy8gZWRnZSBjYXNlLCB1c2VyIGluc3RlYWQgb2YgdXNlcnNcbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGlmICghZGF0YS5qc29uLmVycm9ycykge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFVzZXIgPSBkYXRhLmpzb24udXNlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoTWFpbkNvbnRhaW5lckNvbnRyb2xsZXIpO1xuXG5leHBvcnQge01haW5Db250YWluZXJDb250cm9sbGVyIGFzIGRlZmF1bHR9OyIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbXBvbmVudC9CYXNlLm1qcyc7XG5pbXBvcnQgVkRvbVV0aWwgIGZyb20gJy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy91dGlsL1ZEb20ubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgUmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5Db21tZW50Q29tcG9uZW50XG4gKiBAZXh0ZW5kcyBOZW8uY29tcG9uZW50LkJhc2VcbiAqL1xuY2xhc3MgQ29tbWVudENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J1JlYWxXb3JsZC52aWV3LmFydGljbGUuQ29tbWVudENvbXBvbmVudCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnUmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5Db21tZW50Q29tcG9uZW50JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdHxudWxsfSBhdXRob3JfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGF1dGhvcl86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gYm9keV89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgYm9keV86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gY2xzPVsnY2FyZCddXG4gICAgICAgICAqL1xuICAgICAgICBjbHM6IFsnY2FyZCddLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfG51bGx9IGNvbW1lbnRJZD1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBjb21tZW50SWQ6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gY3JlYXRlZEF0Xz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVkQXRfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogTm90IGluIHVzZVxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gdXBkYXRlZEF0PW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHVwZGF0ZWRBdDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gX3Zkb21cbiAgICAgICAgICovXG4gICAgICAgIF92ZG9tOiB7XG4gICAgICAgICAgICBjbjogW3tcbiAgICAgICAgICAgICAgICBjbHM6IFsnY2FyZC1ibG9jayddLFxuICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgdGFnOiAncCcsXG4gICAgICAgICAgICAgICAgICAgIGNsczogWydjYXJkLXRleHQnXVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgY2xzOiBbJ2NhcmQtZm9vdGVyJ10sXG4gICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICB0YWcgOiAnYScsXG4gICAgICAgICAgICAgICAgICAgIGNscyA6IFsnY29tbWVudC1hdXRob3InXSxcbiAgICAgICAgICAgICAgICAgICAgaHJlZjogJycsXG4gICAgICAgICAgICAgICAgICAgIGNuICA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdpbWcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2NvbW1lbnQtYXV0aG9yLWltZyddXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB2dHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICBodG1sIDogJyZuYnNwOydcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRhZyA6ICdhJyxcbiAgICAgICAgICAgICAgICAgICAgY2xzIDogWydjb21tZW50LWF1dGhvciddLFxuICAgICAgICAgICAgICAgICAgICBocmVmOiAnJ1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdGFnIDogJ3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ2RhdGUtcG9zdGVkJ11cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRhZyA6ICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgY2xzIDogWydtb2Qtb3B0aW9ucyddLFxuICAgICAgICAgICAgICAgICAgICBmbGFnOiAnbW9kLW9wdGlvbnMnLFxuICAgICAgICAgICAgICAgICAgICBjbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgLy97dGFnOiAnaScsIGNsczogWydpb24tZWRpdCddfSwgLy8gbm90IGltcGxlbWVudGVkIGluIG90aGVyIGFwcHMgPT4gbm90IHN1cmUgd2hhdCBzaG91bGQgaGFwcGVuXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAnaScsIGNsczogWydpb24tdHJhc2gtYSddfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBkb21MaXN0ZW5lcnMgPSBtZS5kb21MaXN0ZW5lcnM7XG5cbiAgICAgICAgZG9tTGlzdGVuZXJzLnB1c2goe1xuICAgICAgICAgICAgY2xpY2s6IHtcbiAgICAgICAgICAgICAgICBmbiAgICAgIDogbWUub25EZWxldGVCdXR0b25DbGljayxcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogJy5pb24tdHJhc2gtYScsXG4gICAgICAgICAgICAgICAgc2NvcGUgICA6IG1lXG4gICAgICAgICAgICB9XG4gICAgICAgIH0vKiwge1xuICAgICAgICAgICAgY2xpY2s6IHtcbiAgICAgICAgICAgICAgICBmbiAgICAgIDogbWUub25FZGl0QnV0dG9uQ2xpY2ssXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6ICcuaW9uLWVkaXQnLFxuICAgICAgICAgICAgICAgIHNjb3BlICAgOiBtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9Ki8pO1xuXG4gICAgICAgIG1lLmRvbUxpc3RlbmVycyA9IGRvbUxpc3RlbmVycztcblxuICAgICAgICBtZS5nZXRDb250cm9sbGVyKCkub24oe1xuICAgICAgICAgICAgYWZ0ZXJTZXRDdXJyZW50VXNlcjogbWUub25DdXJyZW50VXNlckNoYW5nZSxcbiAgICAgICAgICAgIHNjb3BlICAgICAgICAgICAgICA6IG1lXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgYXV0aG9yIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fG51bGx9IHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3R8bnVsbH0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRBdXRob3IodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tO1xuXG4gICAgICAgICAgICB2ZG9tLmNuWzFdLmNuWzBdLmNuWzBdLnNyYyA9IHZhbHVlLmltYWdlO1xuICAgICAgICAgICAgdmRvbS5jblsxXS5jblsyXS5odG1sICAgICAgPSB2YWx1ZS51c2VybmFtZTtcblxuICAgICAgICAgICAgbWUudmRvbSA9IHZkb207XG5cbiAgICAgICAgICAgIG1lLm9uQ3VycmVudFVzZXJDaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgYm9keSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xudWxsfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfG51bGx9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0Qm9keSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgdmRvbSA9IHRoaXMudmRvbTtcblxuICAgICAgICAgICAgdmRvbS5jblswXS5jblswXS5odG1sID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnZkb20gPSB2ZG9tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBjcmVhdGVkQXQgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd8bnVsbH0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xudWxsfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldENyZWF0ZWRBdCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgdmRvbSA9IHRoaXMudmRvbTtcblxuICAgICAgICAgICAgdmRvbS5jblsxXS5jblszXS5odG1sID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoJ2VuLVVTJywge1xuICAgICAgICAgICAgICAgIGRheSAgOiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgbW9udGg6ICdsb25nJyxcbiAgICAgICAgICAgICAgICB5ZWFyIDogJ251bWVyaWMnXG4gICAgICAgICAgICB9KS5mb3JtYXQobmV3IERhdGUodmFsdWUpKTtcblxuICAgICAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgb25DdXJyZW50VXNlckNoYW5nZSgpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGN1cnJlbnRVc2VyID0gbWUuZ2V0Q29udHJvbGxlcigpLmN1cnJlbnRVc2VyLFxuICAgICAgICAgICAgdmRvbSAgICAgICAgPSBtZS52ZG9tO1xuXG4gICAgICAgIGlmIChjdXJyZW50VXNlcikge1xuICAgICAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdtb2Qtb3B0aW9ucycpLnJlbW92ZURvbSA9IG1lLmF1dGhvci51c2VybmFtZSAhPT0gY3VycmVudFVzZXIudXNlcm5hbWU7XG5cbiAgICAgICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRGVsZXRlQnV0dG9uQ2xpY2soZGF0YSkge1xuICAgICAgICB0aGlzLmdldENvbnRyb2xsZXIoKS5kZWxldGVDb21tZW50KHRoaXMuY29tbWVudElkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOb3Qgc3VwcG9ydGVkIHlldFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25FZGl0QnV0dG9uQ2xpY2soZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZygnb25FZGl0QnV0dG9uQ2xpY2snKTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKENvbW1lbnRDb21wb25lbnQpO1xuXG5leHBvcnQge0NvbW1lbnRDb21wb25lbnQgYXMgZGVmYXVsdH07IiwiaW1wb3J0IEJhc2VDb21wb25lbnQgICAgICAgICAgZnJvbSAnLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbXBvbmVudC9CYXNlLm1qcyc7XG5pbXBvcnQgQ29tbWVudENvbXBvbmVudCAgICAgICBmcm9tICcuL0NvbW1lbnRDb21wb25lbnQubWpzJztcbmltcG9ydCBDcmVhdGVDb21tZW50Q29tcG9uZW50IGZyb20gJy4vQ3JlYXRlQ29tbWVudENvbXBvbmVudC5tanMnO1xuaW1wb3J0IE5lb0FycmF5ICAgICAgICAgICAgICAgZnJvbSAnLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL3V0aWwvQXJyYXkubWpzJztcbmltcG9ydCBWRG9tVXRpbCAgICAgICAgICAgICAgIGZyb20gJy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy91dGlsL1ZEb20ubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgUmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5Db21wb25lbnRcbiAqIEBleHRlbmRzIE5lby5jb21wb25lbnQuQmFzZVxuICovXG5jbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nUmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5Db21wb25lbnQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ1JlYWxXb3JsZC52aWV3LmFydGljbGUuQ29tcG9uZW50JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdHxudWxsfSBhdXRob3JfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGF1dGhvcl86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gYm9keV89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgYm9keV86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtSZWFsV29ybGQudmlldy5hcnRpY2xlLlByZXZpZXdDb21wb25lbnRbXX0gY29tbWVudENvbXBvbmVudHM9W11cbiAgICAgICAgICovXG4gICAgICAgIGNvbW1lbnRDb21wb25lbnRzOiBbXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdFtdfG51bGx9IGNvbW1lbnRzXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBjb21tZW50c186IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtSZWFsV29ybGQudmlldy5hcnRpY2xlLkNyZWF0ZUNvbW1lbnRDb21wb25lbnR8bnVsbH0gY3JlYXRlQ29tbWVudENvbXBvbmVudD1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVDb21tZW50Q29tcG9uZW50OiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IGNyZWF0ZWRBdF89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgY3JlYXRlZEF0XzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBjbHM9WydhcnRpY2xlLXBhZ2UnXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ2FydGljbGUtcGFnZSddLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gZmF2b3JpdGVkXz1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgZmF2b3JpdGVkXzogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8bnVsbH0gZmF2b3JpdGVzQ291bnRfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGZhdm9yaXRlc0NvdW50XzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0FycmF5fG51bGx9IHRhZ0xpc3RfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHRhZ0xpc3RfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IHRpdGxlXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICB0aXRsZV86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IF92ZG9tXG4gICAgICAgICAqL1xuICAgICAgICBfdmRvbToge1xuICAgICAgICAgICAgY246IFt7XG4gICAgICAgICAgICAgICAgY2xzOiBbJ2Jhbm5lciddLFxuICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2NvbnRhaW5lciddLFxuICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWcgOiAnaDEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogJ3RpdGxlJ1xuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbHM6IFsnYXJ0aWNsZS1tZXRhJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2EnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6ICd1c2VyaW1hZ2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuICA6IFt7dGFnOiAnaW1nJ31dXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2luZm8nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA6ICdhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWydhdXRob3InXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogJ3VzZXJuYW1lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ2RhdGUnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogJ2NyZWF0ZWRBdCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2J0bicsICdidG4tc20nLCAnYnRuLW91dGxpbmUtc2Vjb25kYXJ5JywgJ2ZvbGxvdy1idXR0b24nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA6ICdpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogJ2ZvbGxvd0ljb24nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnIDogJ2ZvbGxvd0F1dGhvcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgOiAndXNlcm5hbWUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgICAgICA6ICdidXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNscyAgICAgIDogWydidG4nLCAnYnRuLXNtJywgJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsICdlZGl0LWJ1dHRvbiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgICAgIDogJ2VkaXQtYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVEb206IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY246IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2knLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHM6IFsnaW9uLWVkaXQnXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCA6ICcgRWRpdCBBcnRpY2xlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sIDogJyZuYnNwOyZuYnNwOydcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ2J0bicsICdidG4tc20nLCAnYnRuLW91dGxpbmUtcHJpbWFyeScsICdmYXZvcml0ZS1idXR0b24nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiAnZmF2b3JpdGVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbiAgOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2lvbi1oZWFydCddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sIDogJyZuYnNwOydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0eXBlOiAndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgOiAnIFBvc3QgJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ2NvdW50ZXInXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogJ2Zhdm9yaXRlc0NvdW50J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnICAgICAgOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgICAgICA6IFsnYnRuJywgJ2J0bi1zbScsICdidG4tb3V0bGluZS1kYW5nZXInLCAnZGVsZXRlLWJ1dHRvbiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgICAgIDogJ2RlbGV0ZS1idXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZURvbTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbjogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnaScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWydpb24tdHJhc2gtYSddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sIDogJyBEZWxldGUgQXJ0aWNsZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGNsczogWydjb250YWluZXInLCAncGFnZSddLFxuICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ3JvdycsICdhcnRpY2xlLWNvbnRlbnQnXSxcbiAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWydjb2wtbWQtMTInXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6ICdib2R5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNuICA6IFtdXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0YWc6ICdocidcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGNscyA6IFsnYXJ0aWNsZS1hY3Rpb25zJ10sXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6ICdhcnRpY2xlLWFjdGlvbnMnLFxuICAgICAgICAgICAgICAgICAgICBjbiAgOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2FydGljbGUtbWV0YSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA6ICdhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiAndXNlcmltYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbiAgOiBbe3RhZzogJ2ltZyd9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWydpbmZvJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgOiAnYScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNscyA6IFsnYXV0aG9yJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6ICd1c2VybmFtZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA6ICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWydkYXRlJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6ICdKYW51YXJ5IDIwdGgnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdidXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWydidG4nLCAnYnRuLXNtJywgJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsICdmb2xsb3ctYnV0dG9uJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgOiAnaScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6ICdmb2xsb3dJY29uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyA6ICdmb2xsb3dBdXRob3InXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnIDogJ3VzZXJuYW1lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sIDogJyZuYnNwOyZuYnNwOydcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ2J0bicsICdidG4tc20nLCAnYnRuLW91dGxpbmUtcHJpbWFyeScsICdmYXZvcml0ZS1idXR0b24nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiAnZmF2b3JpdGVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbiAgOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2lvbi1oZWFydCddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sIDogJyZuYnNwOydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0eXBlOiAndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgOiAnIFBvc3QgJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ2NvdW50ZXInXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogJ2Zhdm9yaXRlc0NvdW50J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgY2xzOiAncm93JyxcbiAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWydjb2wteHMtMTInLCAnY29sLW1kLTgnLCAnb2Zmc2V0LW1kLTInXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6ICdjb21tZW50cy1zZWN0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNuICA6IFtdXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBkb21MaXN0ZW5lcnMgPSBtZS5kb21MaXN0ZW5lcnM7XG5cbiAgICAgICAgZG9tTGlzdGVuZXJzLnB1c2goXG4gICAgICAgICAgICB7Y2xpY2s6IHtmbjogbWUub25EZWxldGVCdXR0b25DbGljaywgICBkZWxlZ2F0ZTogJy5kZWxldGUtYnV0dG9uJywgICBzY29wZTogbWV9fSxcbiAgICAgICAgICAgIHtjbGljazoge2ZuOiBtZS5vbkVkaXRCdXR0b25DbGljaywgICAgIGRlbGVnYXRlOiAnLmVkaXQtYnV0dG9uJywgICAgIHNjb3BlOiBtZX19LFxuICAgICAgICAgICAge2NsaWNrOiB7Zm46IG1lLm9uRmF2b3JpdGVCdXR0b25DbGljaywgZGVsZWdhdGU6ICcuZmF2b3JpdGUtYnV0dG9uJywgc2NvcGU6IG1lfX0sXG4gICAgICAgICAgICB7Y2xpY2s6IHtmbjogbWUub25Gb2xsb3dCdXR0b25DbGljaywgICBkZWxlZ2F0ZTogJy5mb2xsb3ctYnV0dG9uJywgICBzY29wZTogbWV9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lLmRvbUxpc3RlbmVycyA9IGRvbUxpc3RlbmVycztcblxuICAgICAgICBtZS5nZXRDb250cm9sbGVyKCkub24oe1xuICAgICAgICAgICAgYWZ0ZXJTZXRDdXJyZW50VXNlcjogbWUub25DdXJyZW50VXNlckNoYW5nZSxcbiAgICAgICAgICAgIHNjb3BlICAgICAgICAgICAgICA6IG1lXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgb25Db25zdHJ1Y3RlZCgpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGN1cnJlbnRVc2VyID0gbWUuZ2V0Q29udHJvbGxlcigpLmN1cnJlbnRVc2VyLFxuICAgICAgICAgICAgdmRvbSAgICAgICAgPSBtZS52ZG9tO1xuXG4gICAgICAgIG1lLmNyZWF0ZUNvbW1lbnRDb21wb25lbnQgPSBOZW8uY3JlYXRlKHtcbiAgICAgICAgICAgIG1vZHVsZSAgIDogQ3JlYXRlQ29tbWVudENvbXBvbmVudCxcbiAgICAgICAgICAgIHBhcmVudElkIDogbWUuaWQsXG4gICAgICAgICAgICB1c2VySW1hZ2U6IGN1cnJlbnRVc2VyICYmIGN1cnJlbnRVc2VyLmltYWdlIHx8IG51bGxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdjb21tZW50cy1zZWN0aW9uJykuY24udW5zaGlmdChtZS5jcmVhdGVDb21tZW50Q29tcG9uZW50LnZkb20pO1xuXG4gICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuXG4gICAgICAgIHN1cGVyLm9uQ29uc3RydWN0ZWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGF1dGhvciBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRBdXRob3IodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tO1xuXG4gICAgICAgICAgICBWRG9tVXRpbC5nZXRGbGFncyh2ZG9tLCAnZm9sbG93QXV0aG9yJykuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgICAgICBub2RlLmh0bWwgPSB2YWx1ZS5mb2xsb3dpbmcgPyAnIFVuZm9sbG93ICcgOiAnIEZvbGxvdyAnO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIFZEb21VdGlsLmdldEZsYWdzKHZkb20sICdmb2xsb3dJY29uJykuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgICAgICBub2RlLmNscyA9IHZhbHVlLmZvbGxvd2luZyA/IFsnaW9uLW1pbnVzLXJvdW5kJ10gOiBbJ2lvbi1wbHVzLXJvdW5kJ107XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgVkRvbVV0aWwuZ2V0RmxhZ3ModmRvbSwgJ3VzZXJpbWFnZScpLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgbm9kZS5ocmVmID0gJyMvcHJvZmlsZS8nICsgdmFsdWUudXNlcm5hbWU7XG4gICAgICAgICAgICAgICAgbm9kZS5jblswXS5zcmMgPSB2YWx1ZS5pbWFnZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBWRG9tVXRpbC5nZXRGbGFncyh2ZG9tLCAndXNlcm5hbWUnKS5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgICAgIG5vZGUuaHJlZiA9ICcjL3Byb2ZpbGUvJyArIHZhbHVlLnVzZXJuYW1lO1xuICAgICAgICAgICAgICAgIG5vZGUuaHRtbCA9IHZhbHVlLnVzZXJuYW1lO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuXG4gICAgICAgICAgICBtZS5vbkN1cnJlbnRVc2VyQ2hhbmdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGJvZHkgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0Qm9keSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgTmVvLm1haW4uYWRkb24uTWFya2Rvd24ubWFya2Rvd25Ub0h0bWwodmFsdWUpLnRoZW4oaHRtbCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHZkb20gPSBtZS52ZG9tO1xuXG4gICAgICAgICAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdib2R5JykuY25bMF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGNuOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ3AnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogaHRtbFxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBjb21tZW50cyBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfG51bGx9IHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3RbXXxudWxsfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldENvbW1lbnRzKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGxldCBtZSAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgICAgIHZkb20gICAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdjb21tZW50cy1zZWN0aW9uJyksXG4gICAgICAgICAgICAgICAgY29uZmlnO1xuXG4gICAgICAgICAgICBjb250YWluZXIuY24gPSBbY29udGFpbmVyLmNuLnNoaWZ0KCldOyAvLyBrZWVwIHRoZSBDcmVhdGVDb21tZW50Q29tcG9uZW50XG5cbiAgICAgICAgICAgIHZhbHVlLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgICAgICBhdXRob3IgICA6IGl0ZW0uYXV0aG9yLFxuICAgICAgICAgICAgICAgICAgICBib2R5ICAgICA6IGl0ZW0uYm9keSxcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudElkOiBpdGVtLmlkLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IGl0ZW0uY3JlYXRlZEF0LFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkQXQ6IGl0ZW0udXBkYXRlZEF0XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmICghbWUuY29tbWVudENvbXBvbmVudHNbaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lLmNvbW1lbnRDb21wb25lbnRzW2luZGV4XSA9IE5lby5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlICA6IENvbW1lbnRDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRJZDogbWUuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5jb25maWdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbWUuY29tbWVudENvbXBvbmVudHNbaW5kZXhdLnNldChjb25maWcsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jbi5wdXNoKG1lLmNvbW1lbnRDb21wb25lbnRzW2luZGV4XS52ZG9tKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgY3JlYXRlZEF0IGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldENyZWF0ZWRBdCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgdmRvbSA9IHRoaXMudmRvbTtcblxuICAgICAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdjcmVhdGVkQXQnKS5odG1sID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoJ2VuLVVTJywge1xuICAgICAgICAgICAgICAgIGRheSAgOiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgbW9udGg6ICdsb25nJyxcbiAgICAgICAgICAgICAgICB5ZWFyIDogJ251bWVyaWMnXG4gICAgICAgICAgICB9KS5mb3JtYXQobmV3IERhdGUodmFsdWUpKTtcblxuICAgICAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgZmF2b3JpdGVkIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0RmF2b3JpdGVkKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tID0gbWUudmRvbTtcblxuICAgICAgICBWRG9tVXRpbC5nZXRGbGFncyh2ZG9tLCAnZmF2b3JpdGVkJykuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgIG5vZGUuY25bMl0uaHRtbCA9IHZhbHVlID8gJ1VuZmF2b3JpdGUnIDogJ0Zhdm9yaXRlJztcblxuICAgICAgICAgICAgTmVvQXJyYXkuYWRkKG5vZGUuY2xzLCB2YWx1ZSA/ICdidG4tcHJpbWFyeScgOiAnYnRuLW91dGxpbmUtcHJpbWFyeScpO1xuICAgICAgICAgICAgTmVvQXJyYXkucmVtb3ZlKG5vZGUuY2xzLCB2YWx1ZSA/ICdidG4tb3V0bGluZS1wcmltYXJ5JyA6ICdidG4tcHJpbWFyeScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcblxuICAgICAgICAvLyBpZ25vcmUgdGhlIGluaXRpYWwgc2V0dGVyIGNhbGxcbiAgICAgICAgaWYgKE5lby5pc0Jvb2xlYW4ob2xkVmFsdWUpKSB7XG4gICAgICAgICAgICBtZS5nZXRDb250cm9sbGVyKCkuZmF2b3JpdGVBcnRpY2xlKG1lLnNsdWcsIHZhbHVlKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIG1lLmZhdm9yaXRlc0NvdW50ID0gZGF0YS5qc29uLmFydGljbGUuZmF2b3JpdGVzQ291bnQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgZmF2b3JpdGVzQ291bnQgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0RmF2b3JpdGVzQ291bnQodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmIChOZW8uaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgICAgICAgICBsZXQgdmRvbSA9IHRoaXMudmRvbTtcblxuICAgICAgICAgICAgVkRvbVV0aWwuZ2V0RmxhZ3ModmRvbSwgJ2Zhdm9yaXRlc0NvdW50JykuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgICAgICBub2RlLmh0bWwgPSBgKCR7dmFsdWV9KWA7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgdGFnTGlzdCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0FycmF5fSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0VGFnTGlzdCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSA9IG1lLnZkb20sXG4gICAgICAgICAgICBib2R5ID0gVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdib2R5JyksXG4gICAgICAgICAgICB0YWdMaXN0O1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0YWdMaXN0ID0ge1xuICAgICAgICAgICAgICAgIHRhZzogJ3VsJyxcbiAgICAgICAgICAgICAgICBjbHM6IFsndGFnLWxpc3QnXSxcbiAgICAgICAgICAgICAgICBjbiA6IFtdXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIHRhZ0xpc3QuY24ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRhZyA6ICdsaScsXG4gICAgICAgICAgICAgICAgICAgIGNscyA6IFsndGFnLWRlZmF1bHQnLCAndGFnLXBpbGwnLCAndGFnLW91dGxpbmUnXSxcbiAgICAgICAgICAgICAgICAgICAgaHRtbDogaXRlbVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYm9keS5jblsxXSA9IHRhZ0xpc3Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoYm9keS5jblsxXSkge1xuICAgICAgICAgICAgICAgIGJvZHkuY25bMV0ucmVtb3ZlRG9tID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgdGl0bGUgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0VGl0bGUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCB2ZG9tID0gdGhpcy52ZG9tO1xuXG4gICAgICAgIFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAndGl0bGUnKS5odG1sID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkN1cnJlbnRVc2VyQ2hhbmdlKCkge2NvbnNvbGUubG9nKCcjIyMgb25DdXJyZW50VXNlckNoYW5nZScpO1xuICAgICAgICBsZXQgbWUgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgY3VycmVudFVzZXIgPSBtZS5nZXRDb250cm9sbGVyKCkuY3VycmVudFVzZXIsXG4gICAgICAgICAgICB2ZG9tICAgICAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICBpc0N1cnJlbnRVc2VyO1xuXG4gICAgICAgIGlmIChtZS5hdXRob3IgJiYgY3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgIGlzQ3VycmVudFVzZXIgPSBtZS5hdXRob3IudXNlcm5hbWUgPT09IGN1cnJlbnRVc2VyLnVzZXJuYW1lO1xuXG4gICAgICAgICAgICB2ZG9tLmNuWzBdLmNuWzBdLmNuWzFdLmNuWzJdLnJlbW92ZURvbSA9IGlzQ3VycmVudFVzZXI7IC8vIGZvbGxvdyB1c2VyIGJ1dHRvblxuICAgICAgICAgICAgdmRvbS5jblswXS5jblswXS5jblsxXS5jbls1XS5yZW1vdmVEb20gPSBpc0N1cnJlbnRVc2VyOyAvLyBmYXZvcml0ZSBwb3N0IGJ1dHRvblxuXG4gICAgICAgICAgICBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ2FydGljbGUtYWN0aW9ucycpLnJlbW92ZURvbSA9IGlzQ3VycmVudFVzZXI7XG4gICAgICAgICAgICBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ2RlbGV0ZS1idXR0b24nKSAgLnJlbW92ZURvbSA9ICFpc0N1cnJlbnRVc2VyO1xuICAgICAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdlZGl0LWJ1dHRvbicpICAgIC5yZW1vdmVEb20gPSAhaXNDdXJyZW50VXNlcjtcblxuICAgICAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25EZWxldGVCdXR0b25DbGljayhkYXRhKSB7XG4gICAgICAgIHRoaXMuZ2V0Q29udHJvbGxlcigpLmRlbGV0ZUFydGljbGUodGhpcy5zbHVnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25FZGl0QnV0dG9uQ2xpY2soZGF0YSkge1xuICAgICAgICBOZW8uTWFpbi5zZXRSb3V0ZSh7XG4gICAgICAgICAgICB2YWx1ZTogJy9lZGl0b3IvJyArIHRoaXMuc2x1Z1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25GYXZvcml0ZUJ1dHRvbkNsaWNrKGRhdGEpIHtcbiAgICAgICAgdGhpcy5mYXZvcml0ZWQgPSAhdGhpcy5mYXZvcml0ZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRm9sbG93QnV0dG9uQ2xpY2soZGF0YSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIG1lLmdldENvbnRyb2xsZXIoKS5mb2xsb3dVc2VyKG1lLmF1dGhvci51c2VybmFtZSwgIW1lLmF1dGhvci5mb2xsb3dpbmcpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBtZS5hdXRob3IgPSBkYXRhLmpzb24ucHJvZmlsZTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhDb21wb25lbnQpO1xuXG5leHBvcnQge0NvbXBvbmVudCBhcyBkZWZhdWx0fTtcbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbXBvbmVudC9CYXNlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIFJlYWxXb3JsZC52aWV3LmFydGljbGUuQ3JlYXRlQ29tbWVudENvbXBvbmVudFxuICogQGV4dGVuZHMgTmVvLmNvbXBvbmVudC5CYXNlXG4gKi9cbmNsYXNzIENyZWF0ZUNvbW1lbnRDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdSZWFsV29ybGQudmlldy5hcnRpY2xlLkNyZWF0ZUNvbW1lbnRDb21wb25lbnQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ1JlYWxXb3JsZC52aWV3LmFydGljbGUuQ3JlYXRlQ29tbWVudENvbXBvbmVudCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gY2xzPVsnY2FyZCcsICdjb21tZW50LWZvcm0nXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ2NhcmQnLCAnY29tbWVudC1mb3JtJ10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gdXNlckltYWdlXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICB1c2VySW1hZ2VfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IHVzZXJOYW1lXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICB1c2VyTmFtZV86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IF92ZG9tXG4gICAgICAgICAqL1xuICAgICAgICBfdmRvbToge1xuICAgICAgICAgICAgdGFnOiAnZm9ybScsXG4gICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgY2xzOiBbJ2NhcmQtYmxvY2snXSxcbiAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRhZyAgICAgICAgOiAndGV4dGFyZWEnLFxuICAgICAgICAgICAgICAgICAgICBjbHMgICAgICAgIDogWydmb3JtLWNvbnRyb2wnXSxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdXcml0ZSBhIGNvbW1lbnQuLi4nLFxuICAgICAgICAgICAgICAgICAgICByb3dzICAgICAgIDogM1xuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgY2xzOiBbJ2NhcmQtZm9vdGVyJ10sXG4gICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICB0YWc6ICdpbWcnLFxuICAgICAgICAgICAgICAgICAgICBjbHM6IFsnY29tbWVudC1hdXRob3ItaW1nJ10sXG4gICAgICAgICAgICAgICAgICAgIHNyYzogJ2h0dHBzOi8vc3RhdGljLnByb2R1Y3Rpb25yZWFkeS5pby9pbWFnZXMvc21pbGV5LWN5cnVzLmpwZycgLy8gaHR0cHM6Ly9naXRodWIuY29tL2dvdGhpbmtzdGVyL3JlYWx3b3JsZC9pc3N1ZXMvNDQyXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB2dHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICBodG1sIDogJyZuYnNwOydcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRhZyA6ICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgY2xzIDogWydjb21tZW50LWF1dGhvciddXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0YWcgOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgY2xzIDogWydidG4nLCAnYnRuLXNtJywgJ2J0bi1wcmltYXJ5J10sXG4gICAgICAgICAgICAgICAgICAgIGh0bWw6ICdQb3N0IENvbW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyAvLyBvdmVycmlkZSB0aGUgZGVmYXVsdCBzdWJtaXQgdHlwZVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIGxldCBtZSAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgZG9tTGlzdGVuZXJzID0gbWUuZG9tTGlzdGVuZXJzLFxuICAgICAgICAgICAgdmRvbSAgICAgICAgID0gbWUudmRvbTtcblxuICAgICAgICBkb21MaXN0ZW5lcnMucHVzaCh7XG4gICAgICAgICAgICBjbGljazoge1xuICAgICAgICAgICAgICAgIGZuICAgICAgOiBtZS5vblN1Ym1pdEJ1dHRvbkNsaWNrLFxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiAnLmJ0bi1wcmltYXJ5JyxcbiAgICAgICAgICAgICAgICBzY29wZSAgIDogbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUuZG9tTGlzdGVuZXJzID0gZG9tTGlzdGVuZXJzO1xuXG4gICAgICAgIHZkb20uY25bMF0uY25bMF0uaWQgPSBtZS5nZXRJbnB1dEVsSWQoKTtcbiAgICAgICAgbWUudmRvbSA9IHZkb207XG5cbiAgICAgICAgbWUuZ2V0Q29udHJvbGxlcigpLm9uKHtcbiAgICAgICAgICAgIGFmdGVyU2V0Q3VycmVudFVzZXI6IG1lLm9uQ3VycmVudFVzZXJDaGFuZ2UsXG4gICAgICAgICAgICBzY29wZSAgICAgICAgICAgICAgOiBtZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHVzZXJJbWFnZSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRVc2VySW1hZ2UodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG5cbiAgICAgICAgICAgIHZkb20uY25bMV0uY25bMF0uc3JjID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnZkb20gPSB2ZG9tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSB1c2VyTmFtZSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRVc2VyTmFtZSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgdmRvbSA9IHRoaXMudmRvbTtcblxuICAgICAgICAgICAgdmRvbS5jblsxXS5jblsyXS5odG1sID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnZkb20gPSB2ZG9tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldElucHV0RWxJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQgKyAnX19pbnB1dCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcbiAgICAgKi9cbiAgICBvbkN1cnJlbnRVc2VyQ2hhbmdlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0KHtcbiAgICAgICAgICAgIHVzZXJJbWFnZTogdmFsdWUuaW1hZ2UsXG4gICAgICAgICAgICB1c2VyTmFtZSA6IHZhbHVlLnVzZXJuYW1lXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvblN1Ym1pdEJ1dHRvbkNsaWNrKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICAvLyByZWFkIHRoZSBpbnB1dCB2YWx1ZXMgZnJvbSB0aGUgbWFpbiB0aHJlYWRcbiAgICAgICAgLy8gd2UgY291bGQgcmVnaXN0ZXIgYW4gb25pbnB1dCBldmVudCB0byB0aGlzIHZpZXcgYXMgd2VsbCBhbmQgc3RvcmUgdGhlIGNoYW5nZXNcbiAgICAgICAgTmVvLm1haW4uRG9tQWNjZXNzLmdldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgaWQgICAgICAgIDogbWUuZ2V0SW5wdXRFbElkKCksXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiAndmFsdWUnXG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBtZS5nZXRDb250cm9sbGVyKCkucG9zdENvbW1lbnQoe1xuICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogZGF0YS52YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHZkb20gPSBtZS52ZG9tO1xuXG4gICAgICAgICAgICAgICAgdmRvbS5jblswXS5jblswXS52YWx1ZSA9ICcnOyAvLyByZXNldCB0aGUgdGV4dGFyZWEgdmFsdWVcbiAgICAgICAgICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKENyZWF0ZUNvbW1lbnRDb21wb25lbnQpO1xuXG5leHBvcnQge0NyZWF0ZUNvbW1lbnRDb21wb25lbnQgYXMgZGVmYXVsdH07IiwiaW1wb3J0IENvbXBvbmVudCAgZnJvbSAnLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbXBvbmVudC9CYXNlLm1qcyc7XG5pbXBvcnQgVkRvbVV0aWwgICBmcm9tICcuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdXRpbC9WRG9tLm1qcyc7XG5pbXBvcnQgVk5vZGVVdGlsICBmcm9tICcuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdXRpbC9WTm9kZS5tanMnO1xuaW1wb3J0IEFydGljbGVBcGkgZnJvbSAnLi4vLi4vYXBpL0FydGljbGUubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgUmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5DcmVhdGVDb21wb25lbnRcbiAqIEBleHRlbmRzIE5lby5jb21wb25lbnQuQmFzZVxuICovXG5jbGFzcyBDcmVhdGVDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdSZWFsV29ybGQudmlldy5hcnRpY2xlLkNyZWF0ZUNvbXBvbmVudCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnUmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5DcmVhdGVDb21wb25lbnQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBib2R5Xz0nJ1xuICAgICAgICAgKi9cbiAgICAgICAgYm9keV86ICcnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ2VkaXRvci1wYWdlJ11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWydlZGl0b3ItcGFnZSddLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0W119IGVycm9yc189W11cbiAgICAgICAgICovXG4gICAgICAgIGVycm9yc186IFtdLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBkZXNjcmlwdGlvbl89JydcbiAgICAgICAgICovXG4gICAgICAgIGRlc2NyaXB0aW9uXzogJycsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gc2x1Zz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBzbHVnOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IHRhZ0xpc3RfPVtdXG4gICAgICAgICAqL1xuICAgICAgICB0YWdMaXN0XzogW10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IHRpdGxlXz0nJ1xuICAgICAgICAgKi9cbiAgICAgICAgdGl0bGVfOiAnJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gX3Zkb21cbiAgICAgICAgICovXG4gICAgICAgIF92ZG9tOiB7XG4gICAgICAgICAgICBjbjogW3tcbiAgICAgICAgICAgICAgICBjbHM6IFsnY29udGFpbmVyJywgJ3BhZ2UnXSxcbiAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgIGNsczogWydyb3cnXSxcbiAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2NvbC1tZC0xMCcsICdvZmZzZXQtbWQtMScsICdjb2wteHMtMTInXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgOiAndWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6ICdlcnJvcnMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNscyA6IFsnZXJyb3ItbWVzc2FnZXMnXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2Zvcm0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnZmllbGRzZXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdmaWVsZHNldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHM6IFsnZm9ybS1ncm91cCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyAgICAgICAgOiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNscyAgICAgICAgOiBbJ2Zvcm0tY29udHJvbCcsICdmb3JtLWNvbnRyb2wtbGcnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lICAgICAgIDogJ3RpdGxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnICAgICAgIDogJ3RpdGxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0FydGljbGUgVGl0bGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgICAgICAgOiAndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2ZpZWxkc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWydmb3JtLWdyb3VwJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnICAgICAgICA6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzICAgICAgICA6IFsnZm9ybS1jb250cm9sJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSAgICAgICA6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyAgICAgICA6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdXaGF0XFwncyB0aGlzIGFydGljbGUgYWJvdXQ/JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlICAgICAgIDogJ3RleHQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdmaWVsZHNldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHM6IFsnZm9ybS1ncm91cCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyAgICAgICAgOiAndGV4dGFyZWEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNscyAgICAgICAgOiBbJ2Zvcm0tY29udHJvbCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgICAgICAgOiAnYm9keScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyAgICAgICA6ICdib2R5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1dyaXRlIHlvdXIgYXJ0aWNsZSAoaW4gbWFya2Rvd24pJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzICAgICAgIDogOFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnZmllbGRzZXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2Zvcm0tZ3JvdXAnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgICAgICAgIDogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgICAgICAgIDogWydmb3JtLWNvbnRyb2wnLCAnZmllbGQtdGFncyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgICAgICAgOiAndGFncycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyAgICAgICA6ICd0YWdzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0VudGVyIHRhZ3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgICAgICAgOiAndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ3RhZy1saXN0J10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogJ3RhZy1saXN0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ2J0bicsICdidG4tbGcnLCAnYnRuLXByaW1hcnknLCAncHVsbC14cy1yaWdodCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogJ1B1Ymxpc2ggQXJ0aWNsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyAvLyBvdmVycmlkZSB0aGUgZGVmYXVsdCBzdWJtaXQgdHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqIGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIGxldCBtZSAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgZG9tTGlzdGVuZXJzID0gbWUuZG9tTGlzdGVuZXJzO1xuXG4gICAgICAgIGRvbUxpc3RlbmVycy5wdXNoKHtcbiAgICAgICAgICAgIGNsaWNrOiB7XG4gICAgICAgICAgICAgICAgZm4gICAgICA6IG1lLm9uU3VibWl0QnV0dG9uQ2xpY2ssXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6ICcuYnRuLXByaW1hcnknLFxuICAgICAgICAgICAgICAgIHNjb3BlICAgOiBtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjbGljazoge1xuICAgICAgICAgICAgICAgIGZuICAgICAgOiBtZS5vblRhZ0Nsb3NlLFxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiAnLmlvbi1jbG9zZS1yb3VuZCcsXG4gICAgICAgICAgICAgICAgc2NvcGUgICA6IG1lXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleWRvd246IHtcbiAgICAgICAgICAgICAgICBmbiAgICAgIDogbWUub25GaWVsZFRhZ3NLZXlEb3duLFxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiAnLmZpZWxkLXRhZ3MnLFxuICAgICAgICAgICAgICAgIHNjb3BlICAgOiBtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBtZS5kb21MaXN0ZW5lcnMgPSBkb21MaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBib2R5IGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEJvZHkodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCB2ZG9tID0gdGhpcy52ZG9tO1xuXG4gICAgICAgIFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnYm9keScpLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBkZXNjcmlwdGlvbiBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXREZXNjcmlwdGlvbih2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG5cbiAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdkZXNjcmlwdGlvbicpLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBlcnJvcnMgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtPYmplY3RbXX0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEVycm9ycyh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSA9IG1lLnZkb20sXG4gICAgICAgICAgICBsaXN0ID0gVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdlcnJvcnMnKTtcblxuICAgICAgICBsaXN0LmNuID0gW107XG5cbiAgICAgICAgT2JqZWN0LmVudHJpZXModmFsdWUgfHwge30pLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgbGlzdC5jbi5wdXNoKHtcbiAgICAgICAgICAgICAgICB0YWcgOiAnbGknLFxuICAgICAgICAgICAgICAgIGh0bWw6IGtleSArICcgJyArIHZhbHVlLmpvaW4oJyBhbmQgJylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHRhZ0xpc3QgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogUmVuZGVyIHRhZyBsaXN0IGFuZCByZXNldCB0YWcgZmllbGQgdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IG9sZFZhbHVlXG4gICAgICovXG4gICAgYWZ0ZXJTZXRUYWdMaXN0KHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgbGlzdCAgICAgPSBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ3RhZy1saXN0JyksXG4gICAgICAgICAgICB0YWdGaWVsZCA9IFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAndGFncycpO1xuXG4gICAgICAgIGxpc3QuY24gICAgICAgID0gW107XG4gICAgICAgIHRhZ0ZpZWxkLnZhbHVlID0gbnVsbDsgLy8gVE9ETyBSZXNldCB0YWcgZmllbGQgdmFsdWUgcHJvcGVybHlcblxuICAgICAgICBPYmplY3QuZW50cmllcyh2YWx1ZSB8fCB7fSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICBsaXN0LmNuLnB1c2goe1xuICAgICAgICAgICAgICAgIHRhZzogJ3NwYW4nLFxuICAgICAgICAgICAgICAgIGNsczogWyd0YWctZGVmYXVsdCB0YWctcGlsbCddLFxuICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgdGFnICAgICAgICAgOiAnaScsXG4gICAgICAgICAgICAgICAgICAgIGNscyAgICAgICAgIDogWydpb24tY2xvc2Utcm91bmQnXSxcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGEtdmFsdWUnOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHZ0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgOiB2YWx1ZVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSB0aXRsZSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRUaXRsZSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG5cbiAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICd0aXRsZScpLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogb24gZmllbGQgdGFncyBrZXkgZG93biBlbnRlciBhZGQgdGFnIHRvIHRhZyBsaXN0XG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICovXG4gICAgb25GaWVsZFRhZ3NLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICBOZW8ubWFpbi5Eb21BY2Nlc3MuZ2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICAgICAgaWQgICAgICAgIDogZXZlbnQudGFyZ2V0LmlkLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6ICd2YWx1ZSdcbiAgICAgICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgVk5vZGVVdGlsLmZpbmRDaGlsZFZub2RlKG1lLnZub2RlLCB7Y2xhc3NOYW1lOiAnZmllbGQtdGFncyd9KS52bm9kZS5hdHRyaWJ1dGVzLnZhbHVlID0gZGF0YS52YWx1ZTtcbiAgICAgICAgICAgICAgICBtZS50YWdMaXN0ID0gWy4uLm1lLl90YWdMaXN0LCBkYXRhLnZhbHVlXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0IHRoZSBmb3JtIGRhdGEgYW5kIHBvc3QgdGhlIGFydGljbGUgdmlhIGFwaVxuICAgICAqL1xuICAgIG9uU3VibWl0QnV0dG9uQ2xpY2soKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tICAgICAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICBib2R5ICAgICAgICA9IFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnYm9keScpLFxuICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ2Rlc2NyaXB0aW9uJyksXG4gICAgICAgICAgICB0aXRsZSAgICAgICA9IFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAndGl0bGUnKSxcbiAgICAgICAgICAgIGlkcyAgICAgICAgID0gW1xuICAgICAgICAgICAgICAgIHRpdGxlLmlkLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLmlkLFxuICAgICAgICAgICAgICAgIGJvZHkuaWRcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgTmVvLm1haW4uRG9tQWNjZXNzLmdldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgaWQgICAgICAgIDogaWRzLFxuICAgICAgICAgICAgYXR0cmlidXRlczogJ3ZhbHVlJ1xuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgQXJ0aWNsZUFwaVttZS5zbHVnID8gJ3B1dCcgOiAncG9zdCddKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIFwiYXJ0aWNsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCIgICAgICA6IGRhdGFbMF0udmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IGRhdGFbMV0udmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvZHlcIiAgICAgICA6IGRhdGFbMl0udmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRhZ0xpc3RcIiAgICA6IG1lLnRhZ0xpc3RcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHNsdWc6IG1lLnNsdWdcbiAgICAgICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3JzID0gZGF0YS5qc29uLmVycm9ycztcblxuICAgICAgICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgbWUuZXJyb3JzID0gZXJyb3JzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIE5lby5NYWluLnNldFJvdXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnL2FydGljbGUvJyArIGRhdGEuanNvbi5hcnRpY2xlLnNsdWdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBjbGlja2VkIHRhZyBmcm9tIGxpc3RcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKi9cbiAgICBvblRhZ0Nsb3NlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudGFnTGlzdCA9IHRoaXMudGFnTGlzdC5maWx0ZXIoZSA9PiBlICE9PSBldmVudC50YXJnZXQuZGF0YS52YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoZSB2YWx1ZSBvZiBhbGwgZmllbGRzXG4gICAgICovXG4gICAgcmVzZXRGb3JtKCkge1xuICAgICAgICB0aGlzLnNldCh7XG4gICAgICAgICAgICBib2R5ICAgICAgIDogJycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICAgICAgICBzbHVnICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgIHRhZ0xpc3QgICAgOiBbXSxcbiAgICAgICAgICAgIHRpdGxlICAgICAgOiAnJ1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKENyZWF0ZUNvbXBvbmVudCk7XG5cbmV4cG9ydCB7Q3JlYXRlQ29tcG9uZW50IGFzIGRlZmF1bHR9OyIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbXBvbmVudC9CYXNlLm1qcyc7XG5pbXBvcnQgTmVvQXJyYXkgIGZyb20gJy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy91dGlsL0FycmF5Lm1qcyc7XG5pbXBvcnQgVkRvbVV0aWwgIGZyb20gJy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy91dGlsL1ZEb20ubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgUmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5QcmV2aWV3Q29tcG9uZW50XG4gKiBAZXh0ZW5kcyBOZW8uY29tcG9uZW50LkJhc2VcbiAqL1xuY2xhc3MgUHJldmlld0NvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J1JlYWxXb3JsZC52aWV3LmFydGljbGUuUHJldmlld0NvbXBvbmVudCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnUmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5QcmV2aWV3Q29tcG9uZW50JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBhdXRob3JfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGF1dGhvcl86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gY2xzPVsnYXJ0aWNsZS1wcmV2aWV3J11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWydhcnRpY2xlLXByZXZpZXcnXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElTTyA4NjAxIHRpbWVzdGFtcFxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gY3JlYXRlZEF0Xz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVkQXRfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IGRlc2NyaXB0aW9uXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBkZXNjcmlwdGlvbl86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBmYXZvcml0ZWRfPWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBmYXZvcml0ZWRfOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcnxudWxsfSBmYXZvcml0ZXNDb3VudF89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgZmF2b3JpdGVzQ291bnRfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IHNsdWdfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHNsdWdfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl8bnVsbH0gdGFnTGlzdF89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgdGFnTGlzdF86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gdGl0bGVfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHRpdGxlXzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSB1c2VySW1hZ2VfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHVzZXJJbWFnZV86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IF92ZG9tXG4gICAgICAgICAqL1xuICAgICAgICBfdmRvbToge1xuICAgICAgICAgICAgY246IFt7XG4gICAgICAgICAgICAgICAgY2xzOiBbJ2FydGljbGUtbWV0YSddLFxuICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2EnLFxuICAgICAgICAgICAgICAgICAgICBmbGFnOiAndXNlckltYWdlTGluaycsXG4gICAgICAgICAgICAgICAgICAgIGNuICA6IFt7dGFnOiAnaW1nJ31dXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBjbHM6IFsnaW5mbyddLFxuICAgICAgICAgICAgICAgICAgICBjbiA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0YWcgOiAnYScsICAgIGNscyA6IFsnYXV0aG9yJ10sIGZsYWc6ICdhdXRob3InfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0YWcgOiAnc3BhbicsIGNscyA6IFsnZGF0ZSddLCAgIGZsYWc6ICdjcmVhdGVkQXQnfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0YWc6ICdidXR0b24nLFxuICAgICAgICAgICAgICAgICAgICBjbHM6IFsnYnRuJywgJ2J0bi1zbScsICdwdWxsLXhzLXJpZ2h0J10sXG4gICAgICAgICAgICAgICAgICAgIGNuIDogW1xuICAgICAgICAgICAgICAgICAgICAgICAge3RhZyAgOiAnaScsICAgIGNscyA6IFsnaW9uLWhlYXJ0J119LFxuICAgICAgICAgICAgICAgICAgICAgICAge3Z0eXBlOiAndGV4dCcsIGZsYWc6ICdmYXZvcml0ZXNDb3VudCd9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRhZyA6ICdhJyxcbiAgICAgICAgICAgICAgICBjbHMgOiBbJ3ByZXZpZXctbGluayddLFxuICAgICAgICAgICAgICAgIGZsYWc6ICdwcmV2aWV3LWxpbmsnLFxuICAgICAgICAgICAgICAgIGNuICA6IFtcbiAgICAgICAgICAgICAgICAgICAge3RhZyA6ICdoMScsICAgZmxhZzogJ3RpdGxlJ30sXG4gICAgICAgICAgICAgICAgICAgIHt0YWcgOiAncCcsICAgIGZsYWc6ICdkZXNjcmlwdGlvbid9LFxuICAgICAgICAgICAgICAgICAgICB7dGFnIDogJ3NwYW4nLCBodG1sOiAnUmVhZCBtb3JlLi4uJ31cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIGxldCBtZSAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgZG9tTGlzdGVuZXJzID0gbWUuZG9tTGlzdGVuZXJzO1xuXG4gICAgICAgIGRvbUxpc3RlbmVycy5wdXNoKHtcbiAgICAgICAgICAgIGNsaWNrOiB7XG4gICAgICAgICAgICAgICAgZm4gICAgICA6IG1lLm9uRmF2b3JpdGVCdXR0b25DbGljayxcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogJy5wdWxsLXhzLXJpZ2h0JyxcbiAgICAgICAgICAgICAgICBzY29wZSAgIDogbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUuZG9tTGlzdGVuZXJzID0gZG9tTGlzdGVuZXJzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgYXV0aG9yIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEF1dGhvcih2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb20sXG4gICAgICAgICAgICBub2RlID0gVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdhdXRob3InKSxcbiAgICAgICAgICAgIGhyZWYgPSAnIy9wcm9maWxlLycgKyB2YWx1ZTtcblxuICAgICAgICBub2RlLmhyZWYgPSBocmVmO1xuICAgICAgICBub2RlLmh0bWwgPSB2YWx1ZTtcblxuICAgICAgICBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ3VzZXJJbWFnZUxpbmsnKS5ocmVmID0gaHJlZjtcblxuICAgICAgICB0aGlzLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgY3JlYXRlZEF0IGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldENyZWF0ZWRBdCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG5cbiAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdjcmVhdGVkQXQnKS5odG1sID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoJ2VuLVVTJywge1xuICAgICAgICAgICAgZGF5ICA6ICdudW1lcmljJyxcbiAgICAgICAgICAgIG1vbnRoOiAnbG9uZycsXG4gICAgICAgICAgICB5ZWFyIDogJ251bWVyaWMnXG4gICAgICAgIH0pLmZvcm1hdChuZXcgRGF0ZSh2YWx1ZSkpO1xuXG4gICAgICAgIHRoaXMudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBkZXNjcmlwdGlvbiBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXREZXNjcmlwdGlvbih2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG5cbiAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdkZXNjcmlwdGlvbicpLmh0bWwgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGZhdm9yaXRlZCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEZhdm9yaXRlZCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgYnV0dG9uID0gdmRvbS5jblswXS5jblsyXTtcblxuICAgICAgICBOZW9BcnJheS5hZGQoYnV0dG9uLmNscywgdmFsdWUgPyAnYnRuLXByaW1hcnknIDogJ2J0bi1vdXRsaW5lLXByaW1hcnknKTtcbiAgICAgICAgTmVvQXJyYXkucmVtb3ZlKGJ1dHRvbi5jbHMsIHZhbHVlID8gJ2J0bi1vdXRsaW5lLXByaW1hcnknIDogJ2J0bi1wcmltYXJ5Jyk7XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG5cbiAgICAgICAgLy8gaWdub3JlIHRoZSBpbml0aWFsIHNldHRlciBjYWxsXG4gICAgICAgIGlmIChOZW8uaXNCb29sZWFuKG9sZFZhbHVlKSkge1xuICAgICAgICAgICAgbWUuZ2V0Q29udHJvbGxlcigpLmZhdm9yaXRlQXJ0aWNsZShtZS5zbHVnLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGZhdm9yaXRlc0NvdW50IGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEZhdm9yaXRlc0NvdW50KHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgdmRvbSA9IHRoaXMudmRvbTtcblxuICAgICAgICBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ2Zhdm9yaXRlc0NvdW50JykuaHRtbCA9ICcgJyArIHZhbHVlO1xuICAgICAgICB0aGlzLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgc2x1ZyBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRTbHVnKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgdmRvbSA9IHRoaXMudmRvbTtcblxuICAgICAgICBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ3ByZXZpZXctbGluaycpLmhyZWYgPSAnIy9hcnRpY2xlLycgKyB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHRhZ0xpc3QgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtBcnJheX0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFRhZ0xpc3QodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tLFxuICAgICAgICAgICAgdGFnTGlzdDtcblxuICAgICAgICAvLyByZW1vdmUgb2xkIHRhZ3MgaWYgZXhpc3RzXG4gICAgICAgIGlmICh2ZG9tLmNuWzFdLmNuWzNdKSB7XG4gICAgICAgICAgICB2ZG9tLmNuWzFdLmNuLnBvcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRhZ0xpc3QgPSB7XG4gICAgICAgICAgICAgICAgdGFnOiAndWwnLFxuICAgICAgICAgICAgICAgIGNsczogWyd0YWctbGlzdCddLFxuICAgICAgICAgICAgICAgIGNuIDogW11cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhbHVlLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgdGFnTGlzdC5jbi5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2xpJyxcbiAgICAgICAgICAgICAgICAgICAgY2xzIDogWyd0YWctZGVmYXVsdCcsICd0YWctcGlsbCcsICd0YWctb3V0bGluZSddLFxuICAgICAgICAgICAgICAgICAgICBodG1sOiBpdGVtXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2ZG9tLmNuWzFdLmNuLnB1c2godGFnTGlzdCk7XG5cbiAgICAgICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSB0aXRsZSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRUaXRsZSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG5cbiAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICd0aXRsZScpLmh0bWwgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHVzZXJJbWFnZSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRVc2VySW1hZ2UodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCB2ZG9tID0gdGhpcy52ZG9tO1xuXG4gICAgICAgIFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAndXNlckltYWdlTGluaycpLmNuWzBdLnNyYyA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbkZhdm9yaXRlQnV0dG9uQ2xpY2soZGF0YSkge1xuICAgICAgICBsZXQgbWUgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGZhdm9yaXRlZCA9ICFtZS5mYXZvcml0ZWQ7XG5cbiAgICAgICAgbWUuc2V0KHtcbiAgICAgICAgICAgIGZhdm9yaXRlZCAgICAgOiBmYXZvcml0ZWQsXG4gICAgICAgICAgICBmYXZvcml0ZXNDb3VudDogZmF2b3JpdGVkID8gKG1lLmZhdm9yaXRlc0NvdW50ICsgMSkgOiAobWUuZmF2b3JpdGVzQ291bnQgLSAxKVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKFByZXZpZXdDb21wb25lbnQpO1xuXG5leHBvcnQge1ByZXZpZXdDb21wb25lbnQgYXMgZGVmYXVsdH07IiwiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29tcG9uZW50L0Jhc2UubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgUmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5UYWdMaXN0Q29tcG9uZW50XG4gKiBAZXh0ZW5kcyBOZW8uY29tcG9uZW50LkJhc2VcbiAqL1xuY2xhc3MgVGFnTGlzdENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldFN0YXRpY0NvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogVHJ1ZSBhdXRvbWF0aWNhbGx5IGFwcGxpZXMgdGhlIGNvcmUuT2JzZXJ2YWJsZSBtaXhpblxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBvYnNlcnZhYmxlPXRydWVcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgb2JzZXJ2YWJsZTogdHJ1ZVxuICAgIH19XG5cbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nUmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5UYWdMaXN0Q29tcG9uZW50J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdSZWFsV29ybGQudmlldy5hcnRpY2xlLlRhZ0xpc3RDb21wb25lbnQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IGFjdGl2ZVRhZ19cbiAgICAgICAgICovXG4gICAgICAgIGFjdGl2ZVRhZ186IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gY2xzPVsnY29sLW1kLTMnXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ2NvbC1tZC0zJ10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gdGFnc189W11cbiAgICAgICAgICovXG4gICAgICAgIHRhZ3NfOiBbXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gX3Zkb21cbiAgICAgICAgICovXG4gICAgICAgIF92ZG9tOiB7XG4gICAgICAgICAgICBjbjogW3tcbiAgICAgICAgICAgICAgICBjbHM6IFsnc2lkZWJhciddLFxuICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgdGFnIDogJ3AnLFxuICAgICAgICAgICAgICAgICAgICBodG1sOiAnUG9wdWxhciBUYWdzJ1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ3RhZy1saXN0J11cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBOZW8ubWFpbi5Eb21FdmVudHMucmVnaXN0ZXJQcmV2ZW50RGVmYXVsdFRhcmdldHMoe1xuICAgICAgICAgICAgbmFtZTogJ2NsaWNrJyxcbiAgICAgICAgICAgIGNscyA6ICd0YWctcGlsbCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBkb21MaXN0ZW5lcnMgPSBtZS5kb21MaXN0ZW5lcnM7XG5cbiAgICAgICAgZG9tTGlzdGVuZXJzLnB1c2goe1xuICAgICAgICAgICAgY2xpY2s6IHtcbiAgICAgICAgICAgICAgICBmbiAgICAgIDogbWUub25UYWdMaW5rQ2xpY2ssXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6ICcudGFnLXBpbGwnLFxuICAgICAgICAgICAgICAgIHNjb3BlICAgOiBtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBtZS5kb21MaXN0ZW5lcnMgPSBkb21MaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBhY3RpdmVUYWcgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmdbXXxudWxsfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nW118bnVsbH0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRBY3RpdmVUYWcodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmZpcmUoJ3RhZ0NoYW5nZScsIHtcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZTogb2xkVmFsdWUsXG4gICAgICAgICAgICAgICAgdmFsdWUgICA6IHZhbHVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgdGFncyBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfG51bGx9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmdbXXxudWxsfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFRhZ3ModmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tO1xuXG4gICAgICAgIHZkb20uY25bMF0uY25bMV0uY24gPSBbXTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgdmRvbS5jblswXS5jblsxXS5jbi5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2EnLFxuICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ3RhZy1waWxsJywgJ3RhZy1kZWZhdWx0J10sXG4gICAgICAgICAgICAgICAgICAgIGhyZWY6ICcnLFxuICAgICAgICAgICAgICAgICAgICBodG1sOiBpdGVtLFxuICAgICAgICAgICAgICAgICAgICBpZCAgOiBtZS5nZXRUYWdWZG9tSWQoaXRlbSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5vZGVJZFxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICovXG4gICAgZ2V0VGFnSWQobm9kZUlkKSB7XG4gICAgICAgIHJldHVybiBub2RlSWQuc3BsaXQoJ19fJylbMV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICovXG4gICAgZ2V0VGFnVmRvbUlkKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQgKyAnX18nICsgbmFtZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25UYWdMaW5rQ2xpY2soZGF0YSkge1xuICAgICAgICB0aGlzLmFjdGl2ZVRhZyA9IHRoaXMuZ2V0VGFnSWQoZGF0YS5wYXRoWzBdLmlkKTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKFRhZ0xpc3RDb21wb25lbnQpO1xuXG5leHBvcnQge1RhZ0xpc3RDb21wb25lbnQgYXMgZGVmYXVsdH07IiwiaW1wb3J0IENvbXBvbmVudCAgICAgICAgZnJvbSAnLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbXBvbmVudC9CYXNlLm1qcyc7XG5pbXBvcnQgTmVvQXJyYXkgICAgICAgICBmcm9tICcuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdXRpbC9BcnJheS5tanMnO1xuaW1wb3J0IFByZXZpZXdDb21wb25lbnQgZnJvbSAnLi4vYXJ0aWNsZS9QcmV2aWV3Q29tcG9uZW50Lm1qcyc7XG5pbXBvcnQgVkRvbVV0aWwgICAgICAgICBmcm9tICcuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdXRpbC9WRG9tLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIFJlYWxXb3JsZC52aWV3LnVzZXIuUHJvZmlsZUNvbXBvbmVudFxuICogQGV4dGVuZHMgTmVvLmNvbXBvbmVudC5CYXNlXG4gKi9cbmNsYXNzIFByb2ZpbGVDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdSZWFsV29ybGQudmlldy51c2VyLlByb2ZpbGVDb21wb25lbnQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ1JlYWxXb3JsZC52aWV3LnVzZXIuUHJvZmlsZUNvbXBvbmVudCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3RbXXxudWxsfSBhcnRpY2xlUHJldmlld3NfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGFydGljbGVQcmV2aWV3c186IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gYmlvXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBiaW9fOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ3Byb2ZpbGUtcGFnZSddXG4gICAgICAgICAqL1xuICAgICAgICBjbHM6IFsncHJvZmlsZS1wYWdlJ10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IGNvdW50QXJ0aWNsZXNfPTVcbiAgICAgICAgICovXG4gICAgICAgIGNvdW50QXJ0aWNsZXNfOiA1LFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbnxudWxsfSBmb2xsb3dpbmdfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGZvbGxvd2luZ186IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gaW1hZ2VfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGltYWdlXzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IG15UHJvZmlsZV89ZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIG15UHJvZmlsZV86IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7UmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5QcmV2aWV3Q29tcG9uZW50W119IHByZXZpZXdDb21wb25lbnRzPVtdXG4gICAgICAgICAqL1xuICAgICAgICBwcmV2aWV3Q29tcG9uZW50czogW10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gdXNlcm5hbWVfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHVzZXJuYW1lXzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gX3Zkb21cbiAgICAgICAgICovXG4gICAgICAgIF92ZG9tOiB7XG4gICAgICAgICAgICBjbjogW3tcbiAgICAgICAgICAgICAgICBjbHM6IFsndXNlci1pbmZvJ10sXG4gICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICBjbHM6IFsnY29udGFpbmVyJ10sXG4gICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWydyb3cnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHM6IFsnY29sLXhzLTEyJywgJ2NvbC1tZC0xMCcsICdvZmZzZXQtbWQtMSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2ltZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNscyA6IFsndXNlci1pbWcnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogJ2ltYWdlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2g0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogJ3VzZXJuYW1lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ3AnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiAnYmlvJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNscyA6IFsnYnRuJywgJ2J0bi1zbScsICdidG4tb3V0bGluZS1zZWNvbmRhcnknLCAnYWN0aW9uLWJ0bicsICdmb2xsb3ctYnV0dG9uJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6ICdmb2xsb3dpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbiAgOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnaScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHM6IFsnaW9uLXBsdXMtcm91bmQnXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHlwZTogJ3RleHQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0eXBlOiAndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyAgICAgIDogJ2EnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgICAgICA6IFsnYnRuJywgJ2J0bi1zbScsICdidG4tb3V0bGluZS1zZWNvbmRhcnknLCAnYWN0aW9uLWJ0biddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnICAgICA6ICdlZGl0LXByb2ZpbGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmICAgICA6ICcjL3NldHRpbmdzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRG9tOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbjogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2knLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2lvbi1nZWFyLWEnXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCA6ICcgRWRpdCBQcm9maWxlIFNldHRpbmdzJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgY2xzOiBbJ2NvbnRhaW5lciddLFxuICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ3JvdyddLFxuICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbHMgIDogWydjb2wteHMtMTInLCAnY29sLW1kLTEwJywgJ29mZnNldC1tZC0xJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiAnZmVlZC1jb250YWluZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgY24gIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHM6IFsnYXJ0aWNsZXMtdG9nZ2xlJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgOiAndWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ25hdicsICduYXYtcGlsbHMnLCAnb3V0bGluZS1hY3RpdmUnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogJ2ZlZWQtaGVhZGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2xpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWyduYXYtaXRlbSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2EnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWyduYXYtbGluaycsICdwcmV2ZW50LWNsaWNrJywgJ2FjdGl2ZSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6ICdNeSBBcnRpY2xlcydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2xpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWyduYXYtaXRlbSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2EnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWyduYXYtbGluaycsICdwcmV2ZW50LWNsaWNrJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZjogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogJ0Zhdm9yaXRlZCBBcnRpY2xlcydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgTmVvLm1haW4uRG9tRXZlbnRzLnJlZ2lzdGVyUHJldmVudERlZmF1bHRUYXJnZXRzKHtcbiAgICAgICAgICAgIG5hbWU6ICdjbGljaycsXG4gICAgICAgICAgICBjbHMgOiAncHJldmVudC1jbGljaydcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBkb21MaXN0ZW5lcnMgPSBtZS5kb21MaXN0ZW5lcnM7XG5cbiAgICAgICAgZG9tTGlzdGVuZXJzLnB1c2goXG4gICAgICAgICAgICB7Y2xpY2s6IHtmbjogbWUub25Gb2xsb3dCdXR0b25DbGljaywgZGVsZWdhdGU6ICcuZm9sbG93LWJ1dHRvbicsIHNjb3BlOiBtZX19LFxuICAgICAgICAgICAge2NsaWNrOiB7Zm46IG1lLm9uTmF2TGlua0NsaWNrLCAgICAgIGRlbGVnYXRlOiAnLm5hdi1saW5rJywgICAgICBzY29wZTogbWV9fVxuICAgICAgICApO1xuXG4gICAgICAgIG1lLmRvbUxpc3RlbmVycyA9IGRvbUxpc3RlbmVycztcblxuICAgICAgICBtZS5nZXRDb250cm9sbGVyKCkub24oe1xuICAgICAgICAgICAgYWZ0ZXJTZXRDdXJyZW50VXNlcjogbWUub25DdXJyZW50VXNlckNoYW5nZSxcbiAgICAgICAgICAgIHNjb3BlICAgICAgICAgICAgICA6IG1lXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgYXJ0aWNsZVByZXZpZXdzIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0W118bnVsbH0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfG51bGx9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0QXJ0aWNsZVByZXZpZXdzKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gICAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICBjb250YWluZXIgPSBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ2ZlZWQtY29udGFpbmVyJyksXG4gICAgICAgICAgICBjb25maWc7XG5cbiAgICAgICAgY29udGFpbmVyLmNuID0gW2NvbnRhaW5lci5jbi5zaGlmdCgpXTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgICAgICBhdXRob3IgICAgICAgIDogaXRlbS5hdXRob3IudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdCAgICAgOiBpdGVtLmNyZWF0ZWRBdCxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gICA6IGl0ZW0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlZCAgICAgOiBpdGVtLmZhdm9yaXRlZCxcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVzQ291bnQ6IGl0ZW0uZmF2b3JpdGVzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgIHNsdWcgICAgICAgICAgOiBpdGVtLnNsdWcsXG4gICAgICAgICAgICAgICAgICAgIHRhZ0xpc3QgICAgICAgOiBpdGVtLnRhZ0xpc3QsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlICAgICAgICAgOiBpdGVtLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICB1c2VySW1hZ2UgICAgIDogaXRlbS5hdXRob3IuaW1hZ2VcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKCFtZS5wcmV2aWV3Q29tcG9uZW50c1tpbmRleF0pIHtcbiAgICAgICAgICAgICAgICAgICAgbWUucHJldmlld0NvbXBvbmVudHNbaW5kZXhdID0gTmVvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGUgIDogUHJldmlld0NvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudElkOiBtZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmNvbmZpZ1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtZS5wcmV2aWV3Q29tcG9uZW50c1tpbmRleF0uc2V0KGNvbmZpZywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmNuLnB1c2gobWUucHJldmlld0NvbXBvbmVudHNbaW5kZXhdLnZkb20pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGJpbyBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRCaW8odmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG5cbiAgICAgICAgICAgIFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnYmlvJykuaHRtbCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgZm9sbG93aW5nIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0Rm9sbG93aW5nKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAoTmVvLmlzQm9vbGVhbih2YWx1ZSkpIHtcbiAgICAgICAgICAgIGxldCB2ZG9tID0gdGhpcy52ZG9tLFxuICAgICAgICAgICAgICAgIG5vZGUgPSBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ2ZvbGxvd2luZycpO1xuXG4gICAgICAgICAgICAvLyB0b2JpdTogZGlkIG5vdCBzZWUgdGhpcyBvbmUgaW4gdGhlIHNwZWNzLCBidXQgdGhlIHJlYWN0ICYgdnVlIGFwcCBkbyBpdFxuICAgICAgICAgICAgTmVvQXJyYXkucmVtb3ZlKG5vZGUuY2xzLCB2YWx1ZSA/ICdidG4tb3V0bGluZS1zZWNvbmRhcnknIDogJ2J0bi1zZWNvbmRhcnknKTtcbiAgICAgICAgICAgIE5lb0FycmF5LmFkZChub2RlLmNscywgdmFsdWUgPyAnYnRuLXNlY29uZGFyeScgOiAnYnRuLW91dGxpbmUtc2Vjb25kYXJ5Jyk7XG5cbiAgICAgICAgICAgIG5vZGUuY25bMF0uY2xzICA9IFt2YWx1ZSA/ICdpb24tbWludXMtcm91bmQnIDogJ2lvbi1wbHVzLXJvdW5kJ107XG4gICAgICAgICAgICBub2RlLmNuWzFdLmh0bWwgPSB2YWx1ZSA/ICcgVW5mb2xsb3cgJyA6ICcgRm9sbG93ICc7XG4gICAgICAgICAgICB0aGlzLnZkb20gPSB2ZG9tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBpbWFnZSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRJbWFnZSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG5cbiAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdpbWFnZScpLnNyYyA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgbXlQcm9maWxlIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0TXlQcm9maWxlKHZhbHVlLCBvbGRWYWx1ZSkge2NvbnNvbGUubG9nKCdhZnRlclNldE15UHJvZmlsZScsIHZhbHVlKTtcbiAgICAgICAgaWYgKE5lby5pc0Jvb2xlYW4ob2xkVmFsdWUpKSB7XG4gICAgICAgICAgICBsZXQgdmRvbSA9IHRoaXMudmRvbTtcblxuICAgICAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdlZGl0LXByb2ZpbGUnKS5yZW1vdmVEb20gPSAhdmFsdWU7XG4gICAgICAgICAgICBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ2ZvbGxvd2luZycpICAgLnJlbW92ZURvbSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgdXNlcm5hbWUgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0VXNlcm5hbWUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCB2ZG9tID0gdGhpcy52ZG9tO1xuXG4gICAgICAgIFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnZm9sbG93aW5nJykuY25bMl0uaHRtbCA9IHZhbHVlO1xuICAgICAgICBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ3VzZXJuYW1lJykuaHRtbCA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICAgICAqL1xuICAgIGdldEFydGljbGVzKHBhcmFtcykge1xuICAgICAgICB0aGlzLmdldENvbnRyb2xsZXIoKS5nZXRBcnRpY2xlcyhwYXJhbXMpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFydGljbGVQcmV2aWV3cyA9IGRhdGEuanNvbi5hcnRpY2xlcztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcbiAgICAgKi9cbiAgICBvbkN1cnJlbnRVc2VyQ2hhbmdlKHZhbHVlKSB7Y29uc29sZS5sb2coJ29uQ3VycmVudFVzZXJDaGFuZ2UnLCB2YWx1ZSk7XG4gICAgICAgIHRoaXMubXlQcm9maWxlID0gdGhpcy51c2VybmFtZSA9PT0gdmFsdWUgJiYgdmFsdWUudXNlcm5hbWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRm9sbG93QnV0dG9uQ2xpY2soZGF0YSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIG1lLmdldENvbnRyb2xsZXIoKS5mb2xsb3dVc2VyKG1lLnVzZXJuYW1lLCAhbWUuZm9sbG93aW5nKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgbWUuZm9sbG93aW5nID0gZGF0YS5qc29uLnByb2ZpbGUuZm9sbG93aW5nO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25OYXZMaW5rQ2xpY2soZGF0YSkge1xuICAgICAgICBsZXQgbWUgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tICAgICAgID0gbWUudmRvbSxcbiAgICAgICAgICAgIGVsICAgICAgICAgPSBWRG9tVXRpbC5maW5kVmRvbUNoaWxkKHZkb20sIGRhdGEucGF0aFswXS5pZCksXG4gICAgICAgICAgICBmZWVkSGVhZGVyID0gVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdmZWVkLWhlYWRlcicpLFxuICAgICAgICAgICAgcGFyYW1zICAgICA9IHt9O1xuXG4gICAgICAgIGlmICghZWwudmRvbS5jbHMuaW5jbHVkZXMoJ2Rpc2FibGVkJykpIHtcbiAgICAgICAgICAgIHN3aXRjaChlbC52ZG9tLmh0bWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdGYXZvcml0ZWQgQXJ0aWNsZXMnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZWQ6IG1lLnVzZXJuYW1lXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ015IEFydGljbGVzJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXV0aG9yOiBtZS51c2VybmFtZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZmVlZEhlYWRlci5jbi5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIE5lb0FycmF5W2l0ZW0uaWQgPT09IGVsLnBhcmVudE5vZGUuaWQgPyAnYWRkJyA6ICdyZW1vdmUnXShpdGVtLmNuWzBdLmNscywgJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuXG4gICAgICAgICAgICBtZS5nZXRBcnRpY2xlcyh7XG4gICAgICAgICAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgICAgICAgICAgIGxpbWl0IDogbWUuY291bnRBcnRpY2xlcyxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnc1xuICAgICAqL1xuICAgIHVwZGF0ZShjb25maWdzKSB7XG4gICAgICAgIGxldCBtZSAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB1c2VybmFtZSA9IGNvbmZpZ3MudXNlcm5hbWU7XG5cbiAgICAgICAgbWUuc2V0KHtcbiAgICAgICAgICAgIGJpbyAgICAgIDogY29uZmlncy5iaW8sXG4gICAgICAgICAgICBmb2xsb3dpbmc6IGNvbmZpZ3MuZm9sbG93aW5nLFxuICAgICAgICAgICAgaW1hZ2UgICAgOiBjb25maWdzLmltYWdlLFxuICAgICAgICAgICAgbXlQcm9maWxlOiBjb25maWdzLm15UHJvZmlsZSxcbiAgICAgICAgICAgIHVzZXJuYW1lIDogdXNlcm5hbWVcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBtZS5nZXRBcnRpY2xlcyh7XG4gICAgICAgICAgICAgICAgYXV0aG9yOiB1c2VybmFtZSxcbiAgICAgICAgICAgICAgICBsaW1pdCA6IG1lLmNvdW50QXJ0aWNsZXMsXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhQcm9maWxlQ29tcG9uZW50KTtcblxuZXhwb3J0IHtQcm9maWxlQ29tcG9uZW50IGFzIGRlZmF1bHR9OyIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbXBvbmVudC9CYXNlLm1qcyc7XG5pbXBvcnQgVkRvbVV0aWwgIGZyb20gJy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy91dGlsL1ZEb20ubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgUmVhbFdvcmxkLnZpZXcudXNlci5TZXR0aW5nc0NvbXBvbmVudFxuICogQGV4dGVuZHMgTmVvLmNvbXBvbmVudC5CYXNlXG4gKi9cbmNsYXNzIFNldHRpbmdzQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nUmVhbFdvcmxkLnZpZXcudXNlci5TZXR0aW5nc0NvbXBvbmVudCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnUmVhbFdvcmxkLnZpZXcudXNlci5TZXR0aW5nc0NvbXBvbmVudCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGJpb189bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgYmlvXzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBjbHM9WydzZXR0aW5ncy1wYWdlJ11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWydzZXR0aW5ncy1wYWdlJ10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGVtYWlsXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBlbWFpbF86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3RbXX0gZXJyb3JzXz1bXVxuICAgICAgICAgKi9cbiAgICAgICAgZXJyb3JzXzogW10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGltYWdlXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBpbWFnZV86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IHVzZXJOYW1lXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICB1c2VyTmFtZV86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IF92ZG9tXG4gICAgICAgICAqL1xuICAgICAgICBfdmRvbToge1xuICAgICAgICAgICAgY246IFt7XG4gICAgICAgICAgICAgICAgY2xzOiBbJ2NvbnRhaW5lcicsICdwYWdlJ10sXG4gICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICBjbHM6IFsncm93J10sXG4gICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWydjb2wtbWQtNicsICdvZmZzZXQtbWQtMycsICdjb2wteHMtMTInXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgOiAnaDEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNscyA6IFsndGV4dC14cy1jZW50ZXInXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiAnWW91ciBTZXR0aW5ncydcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgICAgICA6ICd1bCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzICAgICAgOiBbJ2Vycm9yLW1lc3NhZ2VzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyAgICAgOiAnZXJyb3JzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVEb206IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdmb3JtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2ZpZWxkc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnZmllbGRzZXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2Zvcm0tZ3JvdXAnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgICAgICAgIDogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgICAgICAgIDogWydmb3JtLWNvbnRyb2wnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnICAgICAgIDogJ2ltYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1VSTCBvZiBwcm9maWxlIHBpY3R1cmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgICAgICAgOiAndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2ZpZWxkc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWydmb3JtLWdyb3VwJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnICAgICAgICA6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzICAgICAgICA6IFsnZm9ybS1jb250cm9sJywgJ2Zvcm0tY29udHJvbC1sZyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgICAgICAgOiAndXNlck5hbWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnWW91ciBOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlICAgICAgIDogJ3RleHQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdmaWVsZHNldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHM6IFsnZm9ybS1ncm91cCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyAgICAgICAgOiAndGV4dGFyZWEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNscyAgICAgICAgOiBbJ2Zvcm0tY29udHJvbCcsICdmb3JtLWNvbnRyb2wtbGcnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnICAgICAgIDogJ2JpbycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdTaG9ydCBiaW8gYWJvdXQgeW91JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzICAgICAgIDogOFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnZmllbGRzZXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2Zvcm0tZ3JvdXAnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgICAgICAgIDogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgICAgICAgIDogWydmb3JtLWNvbnRyb2wnLCAnZm9ybS1jb250cm9sLWxnJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyAgICAgICA6ICdlbWFpbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdFbWFpbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSAgICAgICA6ICd0ZXh0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnZmllbGRzZXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2Zvcm0tZ3JvdXAnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgICAgICAgIDogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgICAgICAgIDogWydmb3JtLWNvbnRyb2wnLCAnZm9ybS1jb250cm9sLWxnJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyAgICAgICA6ICdwYXNzd29yZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdQYXNzd29yZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSAgICAgICA6ICdwYXNzd29yZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA6ICdidXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWydidG4nLCAnYnRuLWxnJywgJ2J0bi1wcmltYXJ5JywgJ3B1bGwteHMtcmlnaHQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6ICdVcGRhdGUgU2V0dGluZ3MnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdocidcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ2J0bicsICdidG4tb3V0bGluZS1kYW5nZXInXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiAnT3IgY2xpY2sgaGVyZSB0byBsb2dvdXQuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBsZXQgbWUgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGRvbUxpc3RlbmVycyA9IG1lLmRvbUxpc3RlbmVycztcblxuICAgICAgICBkb21MaXN0ZW5lcnMucHVzaChcbiAgICAgICAgICAgIHtjbGljazoge2ZuOiBtZS5vbkxvZ291dEJ1dHRvbkNsaWNrLCBkZWxlZ2F0ZTogJy5idG4tb3V0bGluZS1kYW5nZXInLCBzY29wZTogbWV9fSxcbiAgICAgICAgICAgIHtjbGljazoge2ZuOiBtZS5vblN1Ym1pdEJ1dHRvbkNsaWNrLCBkZWxlZ2F0ZTogJy5idG4tcHJpbWFyeScsICAgICAgICBzY29wZTogbWV9fVxuICAgICAgICApO1xuXG4gICAgICAgIG1lLmRvbUxpc3RlbmVycyA9IGRvbUxpc3RlbmVycztcblxuICAgICAgICBtZS5nZXRDb250cm9sbGVyKCkub24oe1xuICAgICAgICAgICAgYWZ0ZXJTZXRDdXJyZW50VXNlcjogbWUub25DdXJyZW50VXNlckNoYW5nZSxcbiAgICAgICAgICAgIHNjb3BlICAgICAgICAgICAgICA6IG1lXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgYmlvIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEJpbyh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG5cbiAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdiaW8nKS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgZW1haWwgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0RW1haWwodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCB2ZG9tID0gdGhpcy52ZG9tO1xuXG4gICAgICAgIFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnZW1haWwnKS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgZXJyb3JzIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IHZhbHVlPVtdXG4gICAgICogQHBhcmFtIHtPYmplY3RbXX0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRFcnJvcnModmFsdWU9W10sIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tLFxuICAgICAgICAgICAgbGlzdCA9IFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnZXJyb3JzJyk7XG5cbiAgICAgICAgbGlzdC5jbiAgICAgICAgPSBbXTtcbiAgICAgICAgbGlzdC5yZW1vdmVEb20gPSB2YWx1ZS5sZW5ndGggPT09IDA7XG5cbiAgICAgICAgT2JqZWN0LmVudHJpZXModmFsdWUpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgbGlzdC5jbi5wdXNoKHtcbiAgICAgICAgICAgICAgICB0YWcgOiAnbGknLFxuICAgICAgICAgICAgICAgIGh0bWw6IGtleSArICcgJyArIHZhbHVlLmpvaW4oJyBhbmQgJylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGltYWdlIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEltYWdlKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgdmRvbSA9IHRoaXMudmRvbTtcblxuICAgICAgICBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ2ltYWdlJykudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHVzZXJOYW1lIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFVzZXJOYW1lKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgdmRvbSA9IHRoaXMudmRvbTtcblxuICAgICAgICBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ3VzZXJOYW1lJykudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZVxuICAgICAqL1xuICAgIG9uQ3VycmVudFVzZXJDaGFuZ2UodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldCh7XG4gICAgICAgICAgICAgICAgYmlvICAgICA6IHZhbHVlLmJpbyxcbiAgICAgICAgICAgICAgICBlbWFpbCAgIDogdmFsdWUuZW1haWwsXG4gICAgICAgICAgICAgICAgZXJyb3JzICA6IFtdLFxuICAgICAgICAgICAgICAgIGltYWdlICAgOiB2YWx1ZS5pbWFnZSxcbiAgICAgICAgICAgICAgICB1c2VyTmFtZTogdmFsdWUudXNlcm5hbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uTG9nb3V0QnV0dG9uQ2xpY2soZGF0YSkge1xuICAgICAgICB0aGlzLmdldENvbnRyb2xsZXIoKS5sb2dvdXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25TdWJtaXRCdXR0b25DbGljayhkYXRhKSB7XG4gICAgICAgIGxldCBtZSAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tICAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICBiaW8gICAgICA9IFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnYmlvJyksXG4gICAgICAgICAgICBlbWFpbCAgICA9IFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnZW1haWwnKSxcbiAgICAgICAgICAgIGltYWdlICAgID0gVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdpbWFnZScpLFxuICAgICAgICAgICAgcGFzc3dvcmQgPSBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ3Bhc3N3b3JkJyksXG4gICAgICAgICAgICB1c2VyTmFtZSA9IFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAndXNlck5hbWUnKTtcblxuICAgICAgICBOZW8ubWFpbi5Eb21BY2Nlc3MuZ2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICBpZCAgICAgICAgOiBbYmlvLmlkLCBlbWFpbC5pZCwgaW1hZ2UuaWQsIHBhc3N3b3JkLmlkLCB1c2VyTmFtZS5pZF0sXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiAndmFsdWUnXG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBtZS5nZXRDb250cm9sbGVyKCkudXBkYXRlU2V0dGluZ3Moe1xuICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmlvICAgICA6IGRhdGFbMF0udmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbCAgIDogZGF0YVsxXS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlICAgOiBkYXRhWzJdLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGRhdGFbM10udmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTogZGF0YVs0XS52YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3JzID0gZGF0YS5qc29uLmVycm9ycztcblxuICAgICAgICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgbWUuZXJyb3JzID0gZXJyb3JzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIE5lby5NYWluLnNldFJvdXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnL3Byb2ZpbGUvJyArIGRhdGEuanNvbi51c2VyLnVzZXJuYW1lXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoU2V0dGluZ3NDb21wb25lbnQpO1xuXG5leHBvcnQge1NldHRpbmdzQ29tcG9uZW50IGFzIGRlZmF1bHR9OyIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbXBvbmVudC9CYXNlLm1qcyc7XG5pbXBvcnQgVkRvbVV0aWwgIGZyb20gJy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy91dGlsL1ZEb20ubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgUmVhbFdvcmxkLnZpZXcudXNlci5TaWduVXBDb21wb25lbnRcbiAqIEBleHRlbmRzIE5lby5jb21wb25lbnQuQmFzZVxuICovXG5jbGFzcyBTaWduVXBDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdSZWFsV29ybGQudmlldy51c2VyLlNpZ25VcENvbXBvbmVudCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnUmVhbFdvcmxkLnZpZXcudXNlci5TaWduVXBDb21wb25lbnQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ2F1dGgtcGFnZSddXG4gICAgICAgICAqL1xuICAgICAgICBjbHM6IFsnYXV0aC1wYWdlJ10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3RbXX0gZXJyb3JzXz1bXVxuICAgICAgICAgKi9cbiAgICAgICAgZXJyb3JzXzogW10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3RbXX0gZmllbGRzZXRzX1xuICAgICAgICAgKi9cbiAgICAgICAgZmllbGRzZXRzXzogW1xuICAgICAgICAgICAge25hbWU6ICd1c2VybmFtZScsIHBsYWNlaG9sZGVyOiAnWW91ciBOYW1lJywgdHlwZTogJ3RleHQnfSxcbiAgICAgICAgICAgIHtuYW1lOiAnZW1haWwnLCAgICBwbGFjZWhvbGRlcjogJ0VtYWlsJywgICAgIHR5cGU6ICd0ZXh0J30sXG4gICAgICAgICAgICB7bmFtZTogJ3Bhc3N3b3JkJywgcGxhY2Vob2xkZXI6ICdQYXNzd29yZCcsICB0eXBlOiAncGFzc3dvcmQnfVxuICAgICAgICBdLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBrZXlzXG4gICAgICAgICAqL1xuICAgICAgICBrZXlzOiB7XG4gICAgICAgICAgICAnRW50ZXInOiAnb25LZXlEb3duRW50ZXInXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG1vZGVfPSdzaWdudXAnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG1vZGVfOiAnc2lnbnVwJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gX3Zkb21cbiAgICAgICAgICovXG4gICAgICAgIF92ZG9tOiB7XG4gICAgICAgICAgICBjbjogW3tcbiAgICAgICAgICAgICAgICBjbHM6IFsnY29udGFpbmVyJywgJ3BhZ2UnXSxcbiAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgIGNsczogWydyb3cnXSxcbiAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2NvbC1tZC02JywgJ29mZnNldC1tZC0zJywgJ2NvbC14cy0xMiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA6ICdoMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWyd0ZXh0LXhzLWNlbnRlciddXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAncCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ3RleHQteHMtY2VudGVyJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe3RhZzogJ2EnfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICd1bCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2Vycm9yLW1lc3NhZ2VzJ11cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdmb3JtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2ZpZWxkc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ2J0bicsICdidG4tbGcnLCAnYnRuLXByaW1hcnknLCAncHVsbC14cy1yaWdodCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicgLy8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgc3VibWl0IHR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBsZXQgbWUgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGRvbUxpc3RlbmVycyA9IG1lLmRvbUxpc3RlbmVycztcblxuICAgICAgICBkb21MaXN0ZW5lcnMucHVzaCh7XG4gICAgICAgICAgICBjbGljazoge1xuICAgICAgICAgICAgICAgIGZuICAgICAgOiBtZS5vblN1Ym1pdEJ1dHRvbkNsaWNrLFxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiAnLmJ0bi1wcmltYXJ5JyxcbiAgICAgICAgICAgICAgICBzY29wZSAgIDogbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUuZG9tTGlzdGVuZXJzID0gZG9tTGlzdGVuZXJzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgZXJyb3JzIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3RbXX0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRFcnJvcnModmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIGxpc3QgPSBtZS5nZXRFcnJvck1lc3NhZ2VzTGlzdCgpLFxuICAgICAgICAgICAgdmRvbSA9IG1lLnZkb207XG5cbiAgICAgICAgbGlzdC5jbiA9IFtdO1xuXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHZhbHVlIHx8IHt9KS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgIGxpc3QuY24ucHVzaCh7XG4gICAgICAgICAgICAgICAgdGFnIDogJ2xpJyxcbiAgICAgICAgICAgICAgICBodG1sOiBrZXkgKyAnICcgKyB2YWx1ZS5qb2luKCcgYW5kICcpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBmaWVsZHNldHMgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0RmllbGRzZXRzKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tID0gbWUudmRvbSxcbiAgICAgICAgICAgIGZvcm0gPSB2ZG9tLmNuWzBdLmNuWzBdLmNuWzBdLmNuWzNdO1xuXG4gICAgICAgIC8vIHNsaWNlKCkucmV2ZXJzZSgpID0+IGl0ZXJhdGUgYmFja3dhcmRzXG4gICAgICAgIHZhbHVlLnNsaWNlKCkucmV2ZXJzZSgpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBmb3JtLmNuWzBdLmNuLnVuc2hpZnQoe1xuICAgICAgICAgICAgICAgIHRhZzogJ2ZpZWxkc2V0JyxcbiAgICAgICAgICAgICAgICBjbHM6IFsnZm9ybS1ncm91cCddLFxuICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgdGFnICAgICAgICA6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgIGNscyAgICAgICAgOiBbJ2Zvcm0tY29udHJvbCcsICdmb3JtLWNvbnRyb2wtbGcnXSxcbiAgICAgICAgICAgICAgICAgICAgaWQgICAgICAgICA6IG1lLmdldElucHV0SWQoaXRlbS5uYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZSAgICAgICA6IGl0ZW0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGl0ZW0ucGxhY2Vob2xkZXIsXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgICAgICAgOiBpdGVtLnR5cGVcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgbW9kZSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRNb2RlKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBpc1NpZ251cCAgID0gdmFsdWUgPT09ICdzaWdudXAnLFxuICAgICAgICAgICAgdmRvbSAgICAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICBjb250ZW50RGl2ID0gdmRvbS5jblswXS5jblswXS5jblswXTtcblxuICAgICAgICAvLyB2ZG9tIGJ1bGsgdXBkYXRlXG4gICAgICAgIGNvbnRlbnREaXYuY25bMF0uaHRtbCA9IGlzU2lnbnVwID8gJ1NpZ24gdXAnIDogJ1NpZ24gaW4nO1xuXG4gICAgICAgIGNvbnRlbnREaXYuY25bMV0uY25bMF0uaHJlZiA9IGlzU2lnbnVwID8gJyMvbG9naW4nIDogJyMvcmVnaXN0ZXInO1xuICAgICAgICBjb250ZW50RGl2LmNuWzFdLmNuWzBdLmh0bWwgPSBpc1NpZ251cCA/ICdIYXZlIGFuIGFjY291bnQ/JyA6ICdOZWVkIGFuIGFjY291bnQ/JztcblxuICAgICAgICAvLyByZW1vdmUgdGhlIHVzZXJuYW1lIGZpZWxkc2V0IGlmIG5lZWRlZFxuICAgICAgICBjb250ZW50RGl2LmNuWzNdLmNuWzBdLmNuWzBdLnJlbW92ZURvbSA9ICFpc1NpZ251cDtcblxuICAgICAgICAvLyBzdWJtaXQgYnV0dG9uIHRleHRcbiAgICAgICAgY29udGVudERpdi5jblszXS5jblswXS5jblszXS5odG1sID0gaXNTaWdudXAgPyAnU2lnbiB1cCcgOiAnU2lnbiBpbic7XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhhbXBsZSBmb3IgZHluYW1pY2FsbHkgZmluZGluZyB2ZG9tIGVsZW1lbnRzXG4gICAgICogQHJldHVybnMge09iamVjdH0gdmRvbVxuICAgICAqL1xuICAgIGdldEVycm9yTWVzc2FnZXNMaXN0KCkge1xuICAgICAgICBsZXQgZWwgPSBWRG9tVXRpbC5maW5kVmRvbUNoaWxkKHRoaXMudmRvbSwge2NsczogJ2Vycm9yLW1lc3NhZ2VzJ30pO1xuICAgICAgICByZXR1cm4gZWwgJiYgZWwudmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGlucHV0RWwgaWQgdXNpbmcgdGhlIHZpZXcgaWQgYXMgYSBwcmVmaXhcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBpdGVtSWRcbiAgICAgKi9cbiAgICBnZXRJbnB1dElkKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkICsgJ19fJyArIGlkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgb25LZXlEb3duRW50ZXIoKSB7XG4gICAgICAgIHRoaXMub25TdWJtaXRCdXR0b25DbGljaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgb25TdWJtaXRCdXR0b25DbGljaygpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgY29udHJvbGxlciA9IG1lLmdldENvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgIGlzU2lnbnVwICAgPSBtZS5tb2RlID09PSAnc2lnbnVwJyxcbiAgICAgICAgICAgIGlkcyAgICAgICAgPSBbbWUuZ2V0SW5wdXRJZCgnZW1haWwnKSwgbWUuZ2V0SW5wdXRJZCgncGFzc3dvcmQnKV0sXG4gICAgICAgICAgICB1c2VyRGF0YTtcblxuICAgICAgICBpZiAoaXNTaWdudXApIHtcbiAgICAgICAgICAgIGlkcy5wdXNoKG1lLmdldElucHV0SWQoJ3VzZXJuYW1lJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVhZCB0aGUgaW5wdXQgdmFsdWVzIGZyb20gdGhlIG1haW4gdGhyZWFkXG4gICAgICAgIC8vIHdlIGNvdWxkIHJlZ2lzdGVyIGFuIG9uaW5wdXQgZXZlbnQgdG8gdGhpcyB2aWV3IGFzIHdlbGwgYW5kIHN0b3JlIHRoZSBjaGFuZ2VzXG4gICAgICAgIE5lby5tYWluLkRvbUFjY2Vzcy5nZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICAgIGlkICAgICAgICA6IGlkcyxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6ICd2YWx1ZSdcbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHVzZXJEYXRhID0ge1xuICAgICAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgZW1haWwgICA6IGRhdGFbMF0udmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBkYXRhWzFdLnZhbHVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGlzU2lnbnVwKSB7XG4gICAgICAgICAgICAgICAgdXNlckRhdGEudXNlci51c2VybmFtZSA9IGRhdGFbMl0udmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRyb2xsZXIuc2F2ZVVzZXIoe1xuICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKSxcbiAgICAgICAgICAgICAgICBzbHVnOiBpc1NpZ251cCA/ICcnIDogJy9sb2dpbidcbiAgICAgICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3JzID0gZGF0YS5qc29uLmVycm9ycztcblxuICAgICAgICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgbWUuZXJyb3JzID0gZXJyb3JzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIubG9naW4oZGF0YS5qc29uLnVzZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKFNpZ25VcENvbXBvbmVudCk7XG5cbmV4cG9ydCB7U2lnblVwQ29tcG9uZW50IGFzIGRlZmF1bHR9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==