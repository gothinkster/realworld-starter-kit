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
        this.onAfterConstructed();
    }

    /**
     * todo: this construct is just a workaround until webpack based builds are changed to the worker target
     * and lazy loading apps is supported in dist/*
     */
    onAfterConstructed() {
        const me = this;

        if (!Neo.apps || !Neo.apps['RealWorld']) {
            setTimeout(() => {
                me.onAfterConstructed();
            }, 200);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL2FwaS9BcnRpY2xlLm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL2FwaS9CYXNlLm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL2FwaS9GYXZvcml0ZS5tanMiLCJ3ZWJwYWNrOi8vbmVvLm1qcy1yZWFsd29ybGQtZXhhbXBsZS1hcHAvLi9hcHBzL3JlYWx3b3JsZC9hcGkvUHJvZmlsZS5tanMiLCJ3ZWJwYWNrOi8vbmVvLm1qcy1yZWFsd29ybGQtZXhhbXBsZS1hcHAvLi9hcHBzL3JlYWx3b3JsZC9hcGkvVGFnLm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL2FwaS9Vc2VyLm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL2FwaS9jb25maWcubWpzIiwid2VicGFjazovL25lby5tanMtcmVhbHdvcmxkLWV4YW1wbGUtYXBwLy4vYXBwcy9yZWFsd29ybGQvYXBwLm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL3ZpZXcvRm9vdGVyQ29tcG9uZW50Lm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL3ZpZXcvSGVhZGVyQ29tcG9uZW50Lm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL3ZpZXcvSG9tZUNvbXBvbmVudC5tanMiLCJ3ZWJwYWNrOi8vbmVvLm1qcy1yZWFsd29ybGQtZXhhbXBsZS1hcHAvLi9hcHBzL3JlYWx3b3JsZC92aWV3L01haW5Db250YWluZXIubWpzIiwid2VicGFjazovL25lby5tanMtcmVhbHdvcmxkLWV4YW1wbGUtYXBwLy4vYXBwcy9yZWFsd29ybGQvdmlldy9NYWluQ29udGFpbmVyQ29udHJvbGxlci5tanMiLCJ3ZWJwYWNrOi8vbmVvLm1qcy1yZWFsd29ybGQtZXhhbXBsZS1hcHAvLi9hcHBzL3JlYWx3b3JsZC92aWV3L2FydGljbGUvQ29tbWVudENvbXBvbmVudC5tanMiLCJ3ZWJwYWNrOi8vbmVvLm1qcy1yZWFsd29ybGQtZXhhbXBsZS1hcHAvLi9hcHBzL3JlYWx3b3JsZC92aWV3L2FydGljbGUvQ29tcG9uZW50Lm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL3ZpZXcvYXJ0aWNsZS9DcmVhdGVDb21tZW50Q29tcG9uZW50Lm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL3ZpZXcvYXJ0aWNsZS9DcmVhdGVDb21wb25lbnQubWpzIiwid2VicGFjazovL25lby5tanMtcmVhbHdvcmxkLWV4YW1wbGUtYXBwLy4vYXBwcy9yZWFsd29ybGQvdmlldy9hcnRpY2xlL1ByZXZpZXdDb21wb25lbnQubWpzIiwid2VicGFjazovL25lby5tanMtcmVhbHdvcmxkLWV4YW1wbGUtYXBwLy4vYXBwcy9yZWFsd29ybGQvdmlldy9hcnRpY2xlL1RhZ0xpc3RDb21wb25lbnQubWpzIiwid2VicGFjazovL25lby5tanMtcmVhbHdvcmxkLWV4YW1wbGUtYXBwLy4vYXBwcy9yZWFsd29ybGQvdmlldy91c2VyL1Byb2ZpbGVDb21wb25lbnQubWpzIiwid2VicGFjazovL25lby5tanMtcmVhbHdvcmxkLWV4YW1wbGUtYXBwLy4vYXBwcy9yZWFsd29ybGQvdmlldy91c2VyL1NldHRpbmdzQ29tcG9uZW50Lm1qcyIsIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL3ZpZXcvdXNlci9TaWduVXBDb21wb25lbnQubWpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQThCOztBQUU5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiw4Q0FBSTtBQUMxQix3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsS0FBSyxZQUFZLEdBQUc7QUFDbEQsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLEtBQUs7QUFDbkMsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLEtBQUs7QUFDbkMsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsaUVBQWUsUUFBUSxFOzs7Ozs7Ozs7Ozs7Ozs7OztBQzNEaUM7QUFDbUM7O0FBRTNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDRFQUFRO0FBQzNCLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2IsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBLGlCQUFpQiwwRkFBc0IsYUFBYSxzQkFBc0I7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRW9DIiwiZmlsZSI6ImNodW5rcy9hcHAvYXBwc19yZWFsd29ybGRfYXBwX21qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gJy4vQmFzZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBSZWFsV29ybGQuYXBpLkFydGljbGVcbiAqIEBleHRlbmRzIFJlYWxXb3JsZC5hcGkuQmFzZVxuICovXG5jbGFzcyBBcnRpY2xlIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J1JlYWxXb3JsZC5hcGkuQXJ0aWNsZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnUmVhbFdvcmxkLmFwaS5BcnRpY2xlJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gcmVzb3VyY2U9Jy9hcnRpY2xlcydcbiAgICAgICAgICovXG4gICAgICAgIHJlc291cmNlOiAnL2FydGljbGVzJ1xuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzbHVnXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGlkXG4gICAgICovXG4gICAgZGVsZXRlQ29tbWVudChzbHVnLCBpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWxldGUoe1xuICAgICAgICAgICAgdXJsOiBgL2FydGljbGVzLyR7c2x1Z30vY29tbWVudHMvJHtpZH1gXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNsdWdcbiAgICAgKi9cbiAgICBnZXRDb21tZW50cyhzbHVnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldCh7XG4gICAgICAgICAgICB1cmw6IGAvYXJ0aWNsZXMvJHtzbHVnfS9jb21tZW50c2BcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2x1Z1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICovXG4gICAgcG9zdENvbW1lbnQoc2x1Zywgb3B0cykge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0KHtcbiAgICAgICAgICAgIC4uLm9wdHMsXG4gICAgICAgICAgICB1cmw6IGAvYXJ0aWNsZXMvJHtzbHVnfS9jb21tZW50c2BcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhBcnRpY2xlKTtcblxubGV0IGluc3RhbmNlID0gTmVvLmNyZWF0ZShBcnRpY2xlKTtcblxuTmVvLmFwcGx5VG9HbG9iYWxOcyhpbnN0YW5jZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3RhbmNlOyIsImltcG9ydCB7QVBJX1VSTCwgTE9DQUxfU1RPUkFHRV9LRVl9IGZyb20gJy4vY29uZmlnLm1qcyc7XG5pbXBvcnQgQ29yZUJhc2UgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29yZS9CYXNlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIFJlYWxXb3JsZC5hcGkuQmFzZVxuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICovXG5jbGFzcyBCYXNlIGV4dGVuZHMgQ29yZUJhc2Uge1xuICAgIHN0YXRpYyBnZXRTdGF0aWNDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRydWUgYXV0b21hdGljYWxseSBhcHBsaWVzIHRoZSBjb3JlL09ic2VydmFibGUubWpzIG1peGluXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IG9ic2VydmFibGU9dHJ1ZVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBvYnNlcnZhYmxlOiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IHRva2VuPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICB0b2tlbjogbnVsbFxuICAgIH19XG5cbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nUmVhbFdvcmxkLmFwaS5CYXNlJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdSZWFsV29ybGQuYXBpLkJhc2UnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fG51bGx9IGRlZmF1bHRIZWFkZXJzPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGRlZmF1bHRIZWFkZXJzOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gaXNSZWFkeT1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgaXNSZWFkeTogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IHJlc291cmNlPScnXG4gICAgICAgICAqL1xuICAgICAgICByZXNvdXJjZTogJy8nXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgb25Db25zdHJ1Y3RlZCgpIHtcbiAgICAgICAgc3VwZXIub25Db25zdHJ1Y3RlZCgpO1xuICAgICAgICB0aGlzLm9uQWZ0ZXJDb25zdHJ1Y3RlZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRvZG86IHRoaXMgY29uc3RydWN0IGlzIGp1c3QgYSB3b3JrYXJvdW5kIHVudGlsIHdlYnBhY2sgYmFzZWQgYnVpbGRzIGFyZSBjaGFuZ2VkIHRvIHRoZSB3b3JrZXIgdGFyZ2V0XG4gICAgICogYW5kIGxhenkgbG9hZGluZyBhcHBzIGlzIHN1cHBvcnRlZCBpbiBkaXN0LypcbiAgICAgKi9cbiAgICBvbkFmdGVyQ29uc3RydWN0ZWQoKSB7XG4gICAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAoIU5lby5hcHBzIHx8ICFOZW8uYXBwc1snUmVhbFdvcmxkJ10pIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIG1lLm9uQWZ0ZXJDb25zdHJ1Y3RlZCgpO1xuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChOZW8uYXBwc1snUmVhbFdvcmxkJ10ucmVuZGVyZWQpIHtcbiAgICAgICAgICAgICAgICBtZS5vbkFwcFJlbmRlcmVkKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIE5lby5hcHBzWydSZWFsV29ybGQnXS5vbigncmVuZGVyJyxtZS5vbkFwcFJlbmRlcmVkLCBtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uQXBwUmVuZGVyZWQoKSB7XG4gICAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAoQmFzZS50b2tlbikge1xuICAgICAgICAgICAgbWUub25SZWFkeShCYXNlLnRva2VuKTtcbiAgICAgICAgfSBlbHNlIGlmICghQmFzZS5pbml0aWFsVG9rZW5SZXF1ZXN0U2VudCkge1xuICAgICAgICAgICAgQmFzZS5pbml0aWFsVG9rZW5SZXF1ZXN0U2VudCA9IHRydWU7XG5cbiAgICAgICAgICAgIE5lby5tYWluLmFkZG9uLkxvY2FsU3RvcmFnZS5yZWFkTG9jYWxTdG9yYWdlSXRlbSh7XG4gICAgICAgICAgICAgICAga2V5OiBMT0NBTF9TVE9SQUdFX0tFWVxuICAgICAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlbiA9IGRhdGEudmFsdWU7XG5cbiAgICAgICAgICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgQmFzZS50b2tlbiA9IHRva2VuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG1lLm9uUmVhZHkodG9rZW4pO1xuICAgICAgICAgICAgICAgIEJhc2UuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgQmFzZS5maXJlKCdyZWFkeScsIHRva2VuKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgQmFzZS5vbih7XG4gICAgICAgICAgICAgICAgcmVhZHk6IG1lLm9uUmVhZHksXG4gICAgICAgICAgICAgICAgc2NvcGU6IG1lXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzPXt9XVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy5kYXRhXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy5wYXJhbXNdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRzLnJlc291cmNlXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0cy5zbHVnXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0cy51cmxdXG4gICAgICogQHJldHVybnMge1N0cmluZ30gdXJsXG4gICAgICovXG4gICAgY3JlYXRlVXJsKG9wdHMpIHtcbiAgICAgICAgaWYgKG9wdHMudXJsKSB7XG4gICAgICAgICAgICByZXR1cm4gQVBJX1VSTCArIG9wdHMudXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEFQSV9VUkwgKyAob3B0cy5yZXNvdXJjZSB8fCB0aGlzLnJlc291cmNlKSArIChvcHRzLnNsdWcgPyAnLycgKyBvcHRzLnNsdWcgOiAnJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHM9e31dXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLmRhdGFdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLnBhcmFtc11cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdHMucmVzb3VyY2VdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRzLnNsdWddXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICAgKi9cbiAgICBkZWxldGUob3B0cz17fSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnZGVsZXRlJywgb3B0cyk7XG5cbiAgICAgICAgcmV0dXJuIE5lby5YaHIucHJvbWlzZUpzb24oe1xuICAgICAgICAgICAgZGF0YSAgIDogb3B0cy5kYXRhLFxuICAgICAgICAgICAgbWV0aG9kIDogJ0RFTEVURScsXG4gICAgICAgICAgICBwYXJhbXMgOiBvcHRzLnBhcmFtcyxcbiAgICAgICAgICAgIHVybCAgICA6IHRoaXMuY3JlYXRlVXJsKG9wdHMpLFxuXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5kZWZhdWx0SGVhZGVycyB8fCB7fSxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJyAgICA6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1JlYWxXb3JsZC5hcGkuQmFzZTpnZXQoKScsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHM9e31dXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLmRhdGFdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLnBhcmFtc11cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdHMucmVzb3VyY2VdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRzLnNsdWddXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICAgKi9cbiAgICBnZXQob3B0cz17fSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnZ2V0Jywgb3B0cyk7XG5cbiAgICAgICAgcmV0dXJuIE5lby5YaHIucHJvbWlzZUpzb24oe1xuICAgICAgICAgICAgZGF0YSAgIDogb3B0cy5kYXRhLFxuICAgICAgICAgICAgbWV0aG9kIDogJ0dFVCcsXG4gICAgICAgICAgICBwYXJhbXMgOiBvcHRzLnBhcmFtcyxcbiAgICAgICAgICAgIHVybCAgICA6IHRoaXMuY3JlYXRlVXJsKG9wdHMpLFxuXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5kZWZhdWx0SGVhZGVycyB8fCB7fSxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJyAgICA6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1JlYWxXb3JsZC5hcGkuQmFzZTpnZXQoKScsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGxhY2Vob2xkZXIgbWV0aG9kIHdoaWNoIGdldHMgdHJpZ2dlcmVkIG9uY2UgdGhlIHRva2VuIGlzIGZldGNoZWQgZnJvbSB0aGUgbG9jYWwgc3RvcmFnZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfG51bGx9IHRva2VuXG4gICAgICovXG4gICAgb25SZWFkeSh0b2tlbikge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgbWUuZGVmYXVsdEhlYWRlcnMgPSBtZS5kZWZhdWx0SGVhZGVycyB8fCB7fTtcbiAgICAgICAgICAgIG1lLmRlZmF1bHRIZWFkZXJzWydBdXRob3JpemF0aW9uJ10gPSAnVG9rZW4gJyArIHRva2VuO1xuICAgICAgICB9XG5cbiAgICAgICAgbWUuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgIG1lLmZpcmUoJ3JlYWR5JywgdG9rZW4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzPXt9XVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy5kYXRhXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy5wYXJhbXNdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRzLnJlc291cmNlXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0cy5zbHVnXVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAgICovXG4gICAgcG9zdChvcHRzPXt9KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdwb3N0Jywgb3B0cyk7XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0gb3B0cy5wYXJhbXM7XG4gICAgICAgIGRlbGV0ZSBvcHRzLnBhcmFtcztcblxuICAgICAgICByZXR1cm4gTmVvLlhoci5wcm9taXNlSnNvbih7XG4gICAgICAgICAgICBkYXRhICAgOiBvcHRzLmRhdGEsXG4gICAgICAgICAgICBtZXRob2QgOiAnUE9TVCcsXG4gICAgICAgICAgICBwYXJhbXMgOiBwYXJhbXMsXG4gICAgICAgICAgICB1cmwgICAgOiB0aGlzLmNyZWF0ZVVybChvcHRzKSxcblxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuZGVmYXVsdEhlYWRlcnMgfHwge30sXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZScgICAgOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZWFsV29ybGQuYXBpLkJhc2U6cG9zdCgpJywgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cz17fV1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHMuZGF0YV1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHMucGFyYW1zXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0cy5yZXNvdXJjZV1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdHMuc2x1Z11cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgICAqL1xuICAgIHB1dChvcHRzPXt9KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdwdXQnLCBvcHRzKTtcblxuICAgICAgICBjb25zdCBwYXJhbXMgPSBvcHRzLnBhcmFtcztcbiAgICAgICAgZGVsZXRlIG9wdHMucGFyYW1zO1xuXG4gICAgICAgIHJldHVybiBOZW8uWGhyLnByb21pc2VKc29uKHtcbiAgICAgICAgICAgIGRhdGEgICA6IG9wdHMuZGF0YSxcbiAgICAgICAgICAgIG1ldGhvZCA6ICdQVVQnLFxuICAgICAgICAgICAgcGFyYW1zIDogcGFyYW1zLFxuICAgICAgICAgICAgdXJsICAgIDogdGhpcy5jcmVhdGVVcmwob3B0cyksXG5cbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAuLi50aGlzLmRlZmF1bHRIZWFkZXJzIHx8IHt9LFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnICAgIDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0J1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUmVhbFdvcmxkLmFwaS5CYXNlOnB1dCgpJywgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbkJhc2UuaW5pdGlhbFRva2VuUmVxdWVzdFNlbnQgPSBmYWxzZTtcbkJhc2UudG9rZW4gICAgICAgICAgICAgICAgICAgPSBudWxsO1xuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhCYXNlKTtcblxuZXhwb3J0IHtCYXNlIGFzIGRlZmF1bHR9OyIsImltcG9ydCBCYXNlIGZyb20gJy4vQmFzZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBSZWFsV29ybGQuYXBpLkZhdm9yaXRlXG4gKiBAZXh0ZW5kcyBSZWFsV29ybGQuYXBpLkJhc2VcbiAqL1xuY2xhc3MgRmF2b3JpdGUgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nUmVhbFdvcmxkLmFwaS5GYXZvcml0ZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnUmVhbFdvcmxkLmFwaS5GYXZvcml0ZSdcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2x1Z1xuICAgICAqL1xuICAgIGFkZChzbHVnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3Qoe1xuICAgICAgICAgICAgdXJsOiBgL2FydGljbGVzLyR7c2x1Z30vZmF2b3JpdGVgXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNsdWdcbiAgICAgKi9cbiAgICByZW1vdmUoc2x1Zykge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWxldGUoe1xuICAgICAgICAgICAgdXJsOiBgL2FydGljbGVzLyR7c2x1Z30vZmF2b3JpdGVgXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoRmF2b3JpdGUpO1xuXG5sZXQgaW5zdGFuY2UgPSBOZW8uY3JlYXRlKEZhdm9yaXRlKTtcblxuTmVvLmFwcGx5VG9HbG9iYWxOcyhpbnN0YW5jZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3RhbmNlOyIsImltcG9ydCBCYXNlIGZyb20gJy4vQmFzZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBSZWFsV29ybGQuYXBpLlByb2ZpbGVcbiAqIEBleHRlbmRzIFJlYWxXb3JsZC5hcGkuQmFzZVxuICovXG5jbGFzcyBQcm9maWxlIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J1JlYWxXb3JsZC5hcGkuUHJvZmlsZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnUmVhbFdvcmxkLmFwaS5Qcm9maWxlJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gcmVzb3VyY2U9Jy9wcm9maWxlcydcbiAgICAgICAgICovXG4gICAgICAgIHJlc291cmNlOiAnL3Byb2ZpbGVzJ1xuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzbHVnXG4gICAgICovXG4gICAgZm9sbG93KHNsdWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdCh7XG4gICAgICAgICAgICB1cmw6IGAvcHJvZmlsZXMvJHtzbHVnfS9mb2xsb3dgXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNsdWdcbiAgICAgKi9cbiAgICB1bmZvbGxvdyhzbHVnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlbGV0ZSh7XG4gICAgICAgICAgICB1cmw6IGAvcHJvZmlsZXMvJHtzbHVnfS9mb2xsb3dgXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoUHJvZmlsZSk7XG5cbmxldCBpbnN0YW5jZSA9IE5lby5jcmVhdGUoUHJvZmlsZSk7XG5cbk5lby5hcHBseVRvR2xvYmFsTnMoaW5zdGFuY2UpO1xuXG5leHBvcnQgZGVmYXVsdCBpbnN0YW5jZTsiLCJpbXBvcnQgQmFzZSBmcm9tICcuL0Jhc2UubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgUmVhbFdvcmxkLmFwaS5UYWdcbiAqIEBleHRlbmRzIFJlYWxXb3JsZC5hcGkuQmFzZVxuICovXG5jbGFzcyBUYWcgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nUmVhbFdvcmxkLmFwaS5UYWcnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ1JlYWxXb3JsZC5hcGkuVGFnJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gcmVzb3VyY2U9Jy90YWdzJ1xuICAgICAgICAgKi9cbiAgICAgICAgcmVzb3VyY2U6ICcvdGFncydcbiAgICB9fVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhUYWcpO1xuXG5sZXQgaW5zdGFuY2UgPSBOZW8uY3JlYXRlKFRhZyk7XG5cbk5lby5hcHBseVRvR2xvYmFsTnMoaW5zdGFuY2UpO1xuXG5leHBvcnQgZGVmYXVsdCBpbnN0YW5jZTsiLCJpbXBvcnQgQmFzZSBmcm9tICcuL0Jhc2UubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgUmVhbFdvcmxkLmFwaS5Vc2VyXG4gKiBAZXh0ZW5kcyBSZWFsV29ybGQuYXBpLkJhc2VcbiAqL1xuY2xhc3MgVXNlciBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdSZWFsV29ybGQuYXBpLlVzZXInXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ1JlYWxXb3JsZC5hcGkuVXNlcicsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IHJlc291cmNlPScvdGFncydcbiAgICAgICAgICovXG4gICAgICAgIHJlc291cmNlOiAnL3VzZXJzJ1xuICAgIH19XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKFVzZXIpO1xuXG5sZXQgaW5zdGFuY2UgPSBOZW8uY3JlYXRlKFVzZXIpO1xuXG5OZW8uYXBwbHlUb0dsb2JhbE5zKGluc3RhbmNlKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7IiwiZXhwb3J0IGNvbnN0IEFQSV9VUkwgICAgICAgICAgID0gJ2h0dHBzOi8vY29uZHVpdC5wcm9kdWN0aW9ucmVhZHkuaW8vYXBpJztcbmV4cG9ydCBjb25zdCBMT0NBTF9TVE9SQUdFX0tFWSA9ICduZW9SZWFsV29ybGRUb2tlbic7XG5cbmV4cG9ydCBkZWZhdWx0IHtBUElfVVJMLCBMT0NBTF9TVE9SQUdFX0tFWX07IiwiaW1wb3J0IE1haW5Db250YWluZXIgZnJvbSAnLi92aWV3L01haW5Db250YWluZXIubWpzJztcblxuY29uc3Qgb25TdGFydCA9ICgpID0+IE5lby5hcHAoe1xuICAgIG1haW5WaWV3OiBNYWluQ29udGFpbmVyLFxuICAgIG5hbWUgICAgOiAnUmVhbFdvcmxkJ1xufSk7XG5cbmV4cG9ydCB7b25TdGFydCBhcyBvblN0YXJ0fTsiLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9jb21wb25lbnQvQmFzZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBSZWFsV29ybGQudmlldy5Gb290ZXJDb21wb25lbnRcbiAqIEBleHRlbmRzIE5lby5jb21wb25lbnQuQmFzZVxuICovXG5jbGFzcyBGb290ZXJDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdSZWFsV29ybGQudmlldy5Gb290ZXJDb21wb25lbnQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ1JlYWxXb3JsZC52aWV3LkZvb3RlckNvbXBvbmVudCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IF92ZG9tXG4gICAgICAgICAqL1xuICAgICAgICBfdmRvbToge1xuICAgICAgICAgICAgdGFnOiAnZm9vdGVyJyxcbiAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICBjbHM6IFsnY29udGFpbmVyJ10sXG4gICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICB0YWcgOiAnYScsXG4gICAgICAgICAgICAgICAgICAgIGNscyA6IFsnbG9nby1mb250J10sXG4gICAgICAgICAgICAgICAgICAgIGhyZWY6ICcjLycsXG4gICAgICAgICAgICAgICAgICAgIGh0bWw6ICdjb25kdWl0J1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdGFnIDogJ3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICBjbHMgOiAnYXR0cmlidXRpb24nLFxuICAgICAgICAgICAgICAgICAgICBodG1sOiAnQW4gaW50ZXJhY3RpdmUgbGVhcm5pbmcgcHJvamVjdCBmcm9tIDxhIGhyZWY9XCJodHRwczovL3RoaW5rc3Rlci5pb1wiPlRoaW5rc3RlcjwvYT4uIENvZGUgJmFtcDsgZGVzaWduIGxpY2Vuc2VkIHVuZGVyIE1JVC4nXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9fVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhGb290ZXJDb21wb25lbnQpO1xuXG5leHBvcnQge0Zvb3RlckNvbXBvbmVudCBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9jb21wb25lbnQvQmFzZS5tanMnO1xuaW1wb3J0IE5lb0FycmF5ICBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdXRpbC9BcnJheS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBSZWFsV29ybGQudmlldy5IZWFkZXJDb21wb25lbnRcbiAqIEBleHRlbmRzIE5lby5jb21wb25lbnQuQmFzZVxuICovXG5jbGFzcyBIZWFkZXJDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdSZWFsV29ybGQudmlldy5IZWFkZXJDb21wb25lbnQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ1JlYWxXb3JsZC52aWV3LkhlYWRlckNvbXBvbmVudCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGFjdGl2ZUl0ZW1fPSdob21lJ1xuICAgICAgICAgKi9cbiAgICAgICAgYWN0aXZlSXRlbV86ICdob21lJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBjbHM9WyduYXZiYXInLCAnbmF2YmFyLWxpZ2h0J11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWyduYXZiYXInLCAnbmF2YmFyLWxpZ2h0J10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBsb2dnZWRJbl89ZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGxvZ2dlZEluXzogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gdXNlckltYWdlXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICB1c2VySW1hZ2VfOm51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gdXNlck5hbWVfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHVzZXJOYW1lXzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gX3Zkb21cbiAgICAgICAgICovXG4gICAgICAgIF92ZG9tOiB7XG4gICAgICAgICAgICB0YWc6ICduYXYnLFxuICAgICAgICAgICAgY2xzOiBbJ25hdmJhciBuYXZiYXItbGlnaHQnXSxcbiAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICBjbHM6IFsnY29udGFpbmVyJ10sXG4gICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICB0YWcgOiAnYScsXG4gICAgICAgICAgICAgICAgICAgIGNscyA6IFsnbmF2YmFyLWJyYW5kJ10sXG4gICAgICAgICAgICAgICAgICAgIGhyZWY6ICcjLycsXG4gICAgICAgICAgICAgICAgICAgIGh0bWw6ICdjb25kdWl0J1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdGFnOiAndWwnLFxuICAgICAgICAgICAgICAgICAgICBjbHM6IFsnbmF2IG5hdmJhci1uYXYnLCAncHVsbC14cy1yaWdodCddLFxuICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdsaScsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbHM6IFsnbmF2LWl0ZW0nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgOiAnYScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWyduYXYtbGluayddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6ICcjLycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogJ0hvbWUnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWcgICAgICA6ICdsaScsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbHMgICAgICA6IFsnbmF2LWl0ZW0nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZURvbTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNuOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA6ICdhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ25hdi1saW5rJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZjogJyMvZWRpdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbjogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnaScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogJ2lvbi1jb21wb3NlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCA6ICcmbmJzcDtOZXcgQXJ0aWNsZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFnICAgICAgOiAnbGknLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xzICAgICAgOiBbJ25hdi1pdGVtJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVEb206IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2EnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNscyA6IFsnbmF2LWxpbmsnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmOiAnIy9zZXR0aW5ncycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY246IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2knLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHM6ICdpb24tZ2Vhci1hJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCA6ICcmbmJzcDtTZXR0aW5ncydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFnICAgICAgOiAnbGknLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xzICAgICAgOiBbJ25hdi1pdGVtJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVEb206IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbjogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgOiAnYScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWyduYXYtbGluayddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6ICcjL3Byb2ZpbGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuICA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2ltZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWyd1c2VyLXBpYyddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sIDogJyZuYnNwO1Byb2ZpbGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2xpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWyduYXYtaXRlbSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA6ICdhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ25hdi1saW5rJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZjogJyMvbG9naW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6ICdTaWduIGluJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnbGknLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ25hdi1pdGVtJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2EnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNscyA6IFsnbmF2LWxpbmsnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmOiAnIy9yZWdpc3RlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogJ1NpZ24gdXAnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgYWN0aXZlSXRlbSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRBY3RpdmVJdGVtKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tID0gbWUudmRvbTtcblxuICAgICAgICBpZiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgIE5lb0FycmF5LnJlbW92ZSh2ZG9tLmNuWzBdLmNuWzFdLmNuW21lLmdldEFjdGl2ZUluZGV4KG9sZFZhbHVlKV0uY25bMF0uY2xzLCAnYWN0aXZlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBOZW9BcnJheS5hZGQodmRvbS5jblswXS5jblsxXS5jblttZS5nZXRBY3RpdmVJbmRleCh2YWx1ZSldLmNuWzBdLmNscywgJ2FjdGl2ZScpO1xuXG4gICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgbG9nZ2VkSW4gY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRMb2dnZWRJbih2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKE5lby5pc0Jvb2xlYW4ob2xkVmFsdWUpKSB7XG4gICAgICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICAgICAgdmRvbSA9IG1lLnZkb20sXG4gICAgICAgICAgICAgICAgbGlzdCA9IHZkb20uY25bMF0uY25bMV07XG5cbiAgICAgICAgICAgIGxpc3QuY25bMV0ucmVtb3ZlRG9tID0gIXZhbHVlOyAvLyBlZGl0b3JcbiAgICAgICAgICAgIGxpc3QuY25bMl0ucmVtb3ZlRG9tID0gIXZhbHVlOyAvLyBzZXR0aW5nc1xuICAgICAgICAgICAgbGlzdC5jblszXS5yZW1vdmVEb20gPSAhdmFsdWU7IC8vIHByb2ZpbGVcbiAgICAgICAgICAgIGxpc3QuY25bNF0ucmVtb3ZlRG9tID0gdmFsdWU7ICAvLyBsb2dpblxuICAgICAgICAgICAgbGlzdC5jbls1XS5yZW1vdmVEb20gPSB2YWx1ZTsgIC8vIHJlZ2lzdGVyXG5cbiAgICAgICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSB1c2VySW1hZ2UgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0VXNlckltYWdlKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSAgICAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgcHJvZmlsZUxpbmsgPSB2ZG9tLmNuWzBdLmNuWzFdLmNuWzNdLmNuWzBdO1xuXG4gICAgICAgIHByb2ZpbGVMaW5rLmNuWzBdLnJlbW92ZURvbSA9ICF2YWx1ZTtcbiAgICAgICAgcHJvZmlsZUxpbmsuY25bMF0uc3JjICAgICAgID0gdmFsdWU7XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSB1c2VyTmFtZSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRVc2VyTmFtZSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgbWUgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgICAgIHZkb20gICAgICAgID0gbWUudmRvbSxcbiAgICAgICAgICAgICAgICBwcm9maWxlTGluayA9IHZkb20uY25bMF0uY25bMV0uY25bM10uY25bMF07XG5cbiAgICAgICAgICAgIHByb2ZpbGVMaW5rLmhyZWYgPSAnIy9wcm9maWxlLycgKyB2YWx1ZTtcbiAgICAgICAgICAgIHByb2ZpbGVMaW5rLmNuWzFdLmh0bWwgPSAnJm5ic3A7JyArIHZhbHVlO1xuXG4gICAgICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHJldHVybnMge051bWJlcn0gVGhlIHRhcmdldCBpbmRleFxuICAgICAqL1xuICAgIGdldEFjdGl2ZUluZGV4KHZhbHVlKSB7XG4gICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgICAgIGNhc2UgJy9zZXR0aW5ncyc6IHJldHVybiAyO1xuICAgICAgICAgICAgY2FzZSAnL2xvZ2luJyAgIDogcmV0dXJuIDQ7XG4gICAgICAgICAgICBjYXNlICcvcmVnaXN0ZXInOiByZXR1cm4gNTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZS5pbmNsdWRlcygnL2VkaXRvcicpKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZS5pbmNsdWRlcygnL3Byb2ZpbGUnKSkge1xuICAgICAgICAgICAgcmV0dXJuIDM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZWZhdWx0IHRvIGhvbWVcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhIZWFkZXJDb21wb25lbnQpO1xuXG5leHBvcnQge0hlYWRlckNvbXBvbmVudCBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQ29tcG9uZW50ICAgICAgICBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29tcG9uZW50L0Jhc2UubWpzJztcbmltcG9ydCBOZW9BcnJheSAgICAgICAgIGZyb20gJy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy91dGlsL0FycmF5Lm1qcyc7XG5pbXBvcnQgUHJldmlld0NvbXBvbmVudCBmcm9tICcuL2FydGljbGUvUHJldmlld0NvbXBvbmVudC5tanMnO1xuaW1wb3J0IFRhZ0xpc3RDb21wb25lbnQgZnJvbSAnLi9hcnRpY2xlL1RhZ0xpc3RDb21wb25lbnQubWpzJztcbmltcG9ydCBWRG9tVXRpbCAgICAgICAgIGZyb20gJy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy91dGlsL1ZEb20ubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgUmVhbFdvcmxkLnZpZXcuSG9tZUNvbXBvbmVudFxuICogQGV4dGVuZHMgTmVvLmNvbXBvbmVudC5CYXNlXG4gKi9cbmNsYXNzIEhvbWVDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdSZWFsV29ybGQudmlldy5Ib21lQ29tcG9uZW50J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdSZWFsV29ybGQudmlldy5Ib21lQ29tcG9uZW50JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBhY3RpdmVUYWc9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgYWN0aXZlVGFnOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0W118bnVsbH0gYXJ0aWNsZVByZXZpZXdzXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBhcnRpY2xlUHJldmlld3NfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ2hvbWUtcGFnZSddXG4gICAgICAgICAqL1xuICAgICAgICBjbHM6IFsnaG9tZS1wYWdlJ10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IGNvdW50QXJ0aWNsZXNfPTEwXG4gICAgICAgICAqL1xuICAgICAgICBjb3VudEFydGljbGVzXzogMTAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IGNvdW50QXJ0aWNsZXNfPTEwXG4gICAgICAgICAqL1xuICAgICAgICBjdXJyZW50UGFnZV86IDEsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3RbXX0gZmVlZHNfXG4gICAgICAgICAqL1xuICAgICAgICBmZWVkc186IFtcbiAgICAgICAgICAgIHtuYW1lOiAnWW91ciBGZWVkJywgICBkaXNhYmxlZDogdHJ1ZX0sXG4gICAgICAgICAgICB7bmFtZTogJ0dsb2JhbCBGZWVkJywgYWN0aXZlICA6IHRydWV9XG4gICAgICAgIF0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBsb2dnZWRJbl89ZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGxvZ2dlZEluXzogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IHBhZ2VTaXplXz0xMFxuICAgICAgICAgKi9cbiAgICAgICAgcGFnZVNpemVfOiAxMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1JlYWxXb3JsZC52aWV3LmFydGljbGUuUHJldmlld0NvbXBvbmVudFtdfSBwcmV2aWV3Q29tcG9uZW50cz1bXVxuICAgICAgICAgKi9cbiAgICAgICAgcHJldmlld0NvbXBvbmVudHM6IFtdLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7UmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5UYWdMaXN0Q29tcG9uZW50fG51bGx9IHRhZ0xpc3RfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHRhZ0xpc3RfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBfdmRvbVxuICAgICAgICAgKi9cbiAgICAgICAgX3Zkb206IHtcbiAgICAgICAgICAgIGNuOiBbe1xuICAgICAgICAgICAgICAgIGNsczogWydiYW5uZXInXSxcbiAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgIGNsczogWydjb250YWluZXInXSxcbiAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2gxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNscyA6IFsnbG9nby1mb250J10sXG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiAnY29uZHVpdCdcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ3AnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogJ0EgcGxhY2UgdG8gc2hhcmUgeW91ciBrbm93bGVkZ2UuJ1xuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgY2xzOiBbJ2NvbnRhaW5lcicsICdwYWdlJ10sXG4gICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICBjbHM6IFsncm93J10sXG4gICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWydjb2wtbWQtOSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWydmZWVkLXRvZ2dsZSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ3VsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWyduYXYnLCAnbmF2LXBpbGxzJywgJ291dGxpbmUtYWN0aXZlJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6ICdmZWVkLWhlYWRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuICA6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICduYXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ3VsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWydwYWdpbmF0aW9uJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6ICdwYWdpbmF0aW9uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIE5lby5tYWluLkRvbUV2ZW50cy5yZWdpc3RlclByZXZlbnREZWZhdWx0VGFyZ2V0cyh7XG4gICAgICAgICAgICBuYW1lOiAnY2xpY2snLFxuICAgICAgICAgICAgY2xzIDogJ3ByZXZlbnQtY2xpY2snXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBtZSAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgZG9tTGlzdGVuZXJzID0gbWUuZG9tTGlzdGVuZXJzO1xuXG4gICAgICAgIGRvbUxpc3RlbmVycy5wdXNoKFxuICAgICAgICAgICAge2NsaWNrOiB7Zm46IG1lLm9uTmF2TGlua0NsaWNrLCAgICAgZGVsZWdhdGU6ICcubmF2LWxpbmsnLCAgc2NvcGU6IG1lfX0sXG4gICAgICAgICAgICB7Y2xpY2s6IHtmbjogbWUub25QYWdlTmF2TGlua0NsaWNrLCBkZWxlZ2F0ZTogJy5wYWdlLWxpbmsnLCBzY29wZTogbWV9fVxuICAgICAgICApO1xuXG4gICAgICAgIG1lLmRvbUxpc3RlbmVycyA9IGRvbUxpc3RlbmVycztcblxuICAgICAgICBtZS5nZXRDb250cm9sbGVyKCkub24oe1xuICAgICAgICAgICAgYWZ0ZXJTZXRDdXJyZW50VXNlcjogbWUub25DdXJyZW50VXNlckNoYW5nZSxcbiAgICAgICAgICAgIHNjb3BlICAgICAgICAgICAgICA6IG1lXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgb25Db25zdHJ1Y3RlZCgpIHtcbiAgICAgICAgc3VwZXIub25Db25zdHJ1Y3RlZCgpO1xuXG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tO1xuXG4gICAgICAgIG1lLnRhZ0xpc3QgPSBOZW8uY3JlYXRlKHtcbiAgICAgICAgICAgIG1vZHVsZSAgOiBUYWdMaXN0Q29tcG9uZW50LFxuICAgICAgICAgICAgcGFyZW50SWQ6IG1lLmlkLFxuXG4gICAgICAgICAgICBsaXN0ZW5lcnM6IHtcbiAgICAgICAgICAgICAgICB0YWdDaGFuZ2U6IG1lLm9uVGFnQ2hhbmdlLFxuICAgICAgICAgICAgICAgIHNjb3BlICAgIDogbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmRvbS5jblsxXS5jblswXS5jbi5wdXNoKG1lLnRhZ0xpc3QudmRvbSk7XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBhcnRpY2xlUHJldmlld3MgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtPYmplY3RbXXxudWxsfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0W118bnVsbH0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRBcnRpY2xlUHJldmlld3ModmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgY29udGFpbmVyID0gbWUuZ2V0Q29udGFpbmVyKCksXG4gICAgICAgICAgICBmb290ZXIgICAgPSBjb250YWluZXIuY24ucG9wKCksXG4gICAgICAgICAgICB2ZG9tICAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgY29uZmlnO1xuXG4gICAgICAgIGNvbnRhaW5lci5jbiA9IFtjb250YWluZXIuY24uc2hpZnQoKV07XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgYXV0aG9yICAgICAgICA6IGl0ZW0uYXV0aG9yLnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXQgICAgIDogaXRlbS5jcmVhdGVkQXQsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uICAgOiBpdGVtLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZWQgICAgIDogaXRlbS5mYXZvcml0ZWQsXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlc0NvdW50OiBpdGVtLmZhdm9yaXRlc0NvdW50LFxuICAgICAgICAgICAgICAgICAgICBzbHVnICAgICAgICAgIDogaXRlbS5zbHVnLFxuICAgICAgICAgICAgICAgICAgICB0YWdMaXN0ICAgICAgIDogaXRlbS50YWdMaXN0LFxuICAgICAgICAgICAgICAgICAgICB0aXRsZSAgICAgICAgIDogaXRlbS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgdXNlckltYWdlICAgICA6IGl0ZW0uYXV0aG9yLmltYWdlXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmICghbWUucHJldmlld0NvbXBvbmVudHNbaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lLnByZXZpZXdDb21wb25lbnRzW2luZGV4XSA9IE5lby5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlICA6IFByZXZpZXdDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRJZDogbWUuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5jb25maWdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbWUucHJldmlld0NvbXBvbmVudHNbaW5kZXhdLnNldChjb25maWcsIHRydWUpOyAvLyBoaW50OiB0cnkgdGhpcyBjYWxsIHdpdGggZmFsc2UgYW5kIGNvbXBhcmUgdGhlIGRlbHRhIHVwZGF0ZXNcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb250YWluZXIuY24ucHVzaChtZS5wcmV2aWV3Q29tcG9uZW50c1tpbmRleF0udmRvbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRhaW5lci5jbi5wdXNoKGZvb3Rlcik7XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBjb3VudEFydGljbGVzIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldENvdW50QXJ0aWNsZXModmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tICAgICAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICBwYWdpbmF0aW9uICA9IFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAncGFnaW5hdGlvbicpLFxuICAgICAgICAgICAgcGFnZVNpemUgICAgPSBtZS5wYWdlU2l6ZSxcbiAgICAgICAgICAgIGNvdW50UGFnZXMgID0gTWF0aC5jZWlsKHZhbHVlIC8gcGFnZVNpemUpLFxuICAgICAgICAgICAgY3VycmVudFBhZ2UgPSBtZS5jdXJyZW50UGFnZSxcbiAgICAgICAgICAgIGkgICAgICAgICAgID0gMSxcbiAgICAgICAgICAgIGNscztcblxuICAgICAgICBpZiAoY291bnRQYWdlcyA8IDIpIHtcbiAgICAgICAgICAgIC8vIHRvZG86IGhpZGUgdGhlIHBhZ2luZyBiYmFyXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYWdpbmF0aW9uLmNuID0gW107XG5cbiAgICAgICAgICAgIGZvciAoOyBpIDw9IGNvdW50UGFnZXM7IGkrKykge1xuICAgICAgICAgICAgICAgIGNscyA9IFsncGFnZS1pdGVtJ107XG5cbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gY3VycmVudFBhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xzLnB1c2goJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb24uY24ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRhZzogJ2xpJyxcbiAgICAgICAgICAgICAgICAgICAgY2xzOiBjbHMsXG4gICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA6ICdhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNscyA6IFsncGFnZS1saW5rJywgJ3ByZXZlbnQtY2xpY2snXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkICA6IG1lLmdldE5hdkxpbmtWZG9tSWQoaSksXG4gICAgICAgICAgICAgICAgICAgICAgICBocmVmOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IGlcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgY3VycmVudFBhZ2UgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0Q3VycmVudFBhZ2UodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tLFxuICAgICAgICAgICAgbm9kZSwgb2xkTm9kZTtcblxuICAgICAgICBpZiAobWUubW91bnRlZCkge1xuICAgICAgICAgICAgbm9kZSAgICA9IFZEb21VdGlsLmZpbmRWZG9tQ2hpbGQodmRvbSwgbWUuZ2V0TmF2TGlua1Zkb21JZCh2YWx1ZSkpLnBhcmVudE5vZGU7XG4gICAgICAgICAgICBvbGROb2RlID0gVkRvbVV0aWwuZmluZFZkb21DaGlsZCh2ZG9tLCBtZS5nZXROYXZMaW5rVmRvbUlkKG9sZFZhbHVlKSkucGFyZW50Tm9kZTtcblxuICAgICAgICAgICAgTmVvQXJyYXkuYWRkKG5vZGUuY2xzLCAnYWN0aXZlJyk7XG4gICAgICAgICAgICBOZW9BcnJheS5yZW1vdmUob2xkTm9kZS5jbHMsICdhY3RpdmUnKTtcblxuICAgICAgICAgICAgbWUudmRvbSA9IHZkb207XG5cbiAgICAgICAgICAgIG1lLmdldENvbnRyb2xsZXIoKS5fYXJ0aWNsZXNPZmZzZXQgPSAodmFsdWUgLSAxKSAqIG1lLnBhZ2VTaXplOyAvLyBzaWxlbnQgdXBkYXRlXG4gICAgICAgICAgICBtZS5nZXRBcnRpY2xlcygpO1xuXG4gICAgICAgICAgICBOZW8ubWFpbi5Eb21BY2Nlc3Mud2luZG93U2Nyb2xsVG8oe30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBmZWVkcyBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0RmVlZHModmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gICAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgZmVlZEhlYWRlciA9IFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnZmVlZC1oZWFkZXInKSxcbiAgICAgICAgICAgIGNscztcblxuICAgICAgICBmZWVkSGVhZGVyLmNuID0gW107XG5cbiAgICAgICAgdmFsdWUuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNscyA9IFsncHJldmVudC1jbGljaycsICduYXYtbGluayddO1xuXG4gICAgICAgICAgICBpZiAoaXRlbS5hY3RpdmUpICAge2Nscy5wdXNoKCdhY3RpdmUnKTt9XG4gICAgICAgICAgICBpZiAoaXRlbS5kaXNhYmxlZCkge2Nscy5wdXNoKCdkaXNhYmxlZCcpO31cblxuICAgICAgICAgICAgZmVlZEhlYWRlci5jbi5wdXNoKHtcbiAgICAgICAgICAgICAgICB0YWc6ICdsaScsXG4gICAgICAgICAgICAgICAgY2xzOiBbJ25hdi1pdGVtJ10sXG4gICAgICAgICAgICAgICAgaWQgOiBtZS5pZCArICdfX25hdi1pdGVtXycgKyBpbmRleCxcbiAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRhZzogJ2EnLFxuICAgICAgICAgICAgICAgICAgICBjbHM6IGNscyxcbiAgICAgICAgICAgICAgICAgICAgaHJlZjogJycsXG4gICAgICAgICAgICAgICAgICAgIGh0bWw6IGl0ZW0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgaWQgIDogbWUuaWQgKyAnX19uYXYtaXRlbS1saW5rXycgKyBpbmRleCxcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgbG9nZ2VkSW4gY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRMb2dnZWRJbih2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICBuYXZJdGVtID0gVkRvbVV0aWwuZmluZFZkb21DaGlsZCh2ZG9tLCBtZS5pZCArICdfX25hdi1pdGVtLWxpbmtfMCcpLnZkb207XG5cbiAgICAgICAgTmVvQXJyYXlbdmFsdWUgPyAncmVtb3ZlJyA6ICdhZGQnXShuYXZJdGVtLmNscywgJ2Rpc2FibGVkJyk7XG4gICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRvZG9cbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHBhZ2VTaXplIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFBhZ2VTaXplKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzLFxuICAgICAgICAgICAgaSAgPSAwO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdhZnRlclNldFBhZ2VTaXplJywgdmFsdWUpO1xuXG4gICAgICAgIGZvciAoOyBpIDwgdmFsdWU7IGkrKykge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGFydGljbGUgaWQgdXNpbmcgdGhlIHZpZXcgaWQgYXMgYSBwcmVmaXhcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBpdGVtSWRcbiAgICAgKi9cbiAgICBnZXRBcnRpY2xlSWQoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQgKyAnX18nICsgaWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcz17fV1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHM9e31dXG4gICAgICovXG4gICAgZ2V0QXJ0aWNsZXMocGFyYW1zPXt9LCBvcHRzPXt9KSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKG1lLmFjdGl2ZVRhZykge1xuICAgICAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIHRhZzogbWUuYWN0aXZlVGFnLFxuICAgICAgICAgICAgICAgIC4uLnBhcmFtc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1lLmdldENvbnRyb2xsZXIoKS5nZXRBcnRpY2xlcyhwYXJhbXMsIG9wdHMpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBtZS5zZXQoe1xuICAgICAgICAgICAgICAgIGFydGljbGVQcmV2aWV3czogZGF0YS5qc29uLmFydGljbGVzLFxuICAgICAgICAgICAgICAgIGNvdW50QXJ0aWNsZXMgIDogZGF0YS5qc29uLmFydGljbGVzQ291bnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IHZkb21cbiAgICAgKi9cbiAgICBnZXRDb250YWluZXIoKSB7XG4gICAgICAgIGxldCBlbCA9IFZEb21VdGlsLmZpbmRWZG9tQ2hpbGQodGhpcy52ZG9tLCB7Y2xzOiAnY29sLW1kLTknfSk7XG4gICAgICAgIHJldHVybiBlbCAmJiBlbC52ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5vZGVJZFxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0TmF2TGlua0lkKG5vZGVJZCkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQobm9kZUlkLnNwbGl0KCdfXycpWzFdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gaWRcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldE5hdkxpbmtWZG9tSWQoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQgKyAnX18nICsgaWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uTmF2TGlua0NsaWNrKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSAgICAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICBlbCAgICAgICAgID0gVkRvbVV0aWwuZmluZFZkb21DaGlsZCh2ZG9tLCBkYXRhLnBhdGhbMF0uaWQpLFxuICAgICAgICAgICAgZmVlZEhlYWRlciA9IFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnZmVlZC1oZWFkZXInKSxcbiAgICAgICAgICAgIG9wdHMgICAgICAgPSB7fTtcblxuICAgICAgICBpZiAoIWVsLnZkb20uY2xzLmluY2x1ZGVzKCdkaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICBzd2l0Y2goZWwudmRvbS5odG1sKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnR2xvYmFsIEZlZWQnOlxuICAgICAgICAgICAgICAgICAgICBtZS5hY3RpdmVUYWcgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdZb3VyIEZlZWQnOlxuICAgICAgICAgICAgICAgICAgICBtZS5hY3RpdmVUYWcgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBvcHRzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2x1ZzogJ2ZlZWQnXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IC8vIHRhZ1xuICAgICAgICAgICAgICAgICAgICBtZS5hY3RpdmVUYWcgPSBlbC52ZG9tLmh0bWwuc3Vic3RyaW5nKDIpOyAvLyByZW1vdmUgdGhlICcjICdcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZlZWRIZWFkZXIuY24uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBOZW9BcnJheVtpdGVtLmlkID09PSBlbC5wYXJlbnROb2RlLmlkID8gJ2FkZCcgOiAncmVtb3ZlJ10oaXRlbS5jblswXS5jbHMsICdhY3RpdmUnKTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIG1lLl9jdXJyZW50UGFnZSA9IDE7IC8vIHNpbGVudCB1cGRhdGVcbiAgICAgICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuXG4gICAgICAgICAgICBtZS5nZXRDb250cm9sbGVyKCkuX2FydGljbGVzT2Zmc2V0ID0gMDsgLy8gc2lsZW50IHVwZGF0ZVxuICAgICAgICAgICAgbWUuZ2V0QXJ0aWNsZXMoe30sIG9wdHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcbiAgICAgKi9cbiAgICBvbkN1cnJlbnRVc2VyQ2hhbmdlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubG9nZ2VkSW4gPSAhIXZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvblBhZ2VOYXZMaW5rQ2xpY2soZGF0YSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5nZXROYXZMaW5rSWQoZGF0YS5wYXRoWzBdLmlkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICogQHBhcmFtIHtTdHJpbmd8bnVsbH0gb3B0cy5vbGRWYWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfG51bGx9IG9wdHMudmFsdWVcbiAgICAgKi9cbiAgICBvblRhZ0NoYW5nZShvcHRzKSB7XG4gICAgICAgIGxldCBtZSAgICA9IHRoaXMsXG4gICAgICAgICAgICBmZWVkcyA9IG1lLmZlZWRzLFxuICAgICAgICAgICAgbmFtZSAgPSAnIyAnICsgb3B0cy52YWx1ZTtcblxuICAgICAgICBmZWVkcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGZlZWRzLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgICAgIGZlZWRzLnB1c2goe1xuICAgICAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBuYW1lICA6IG5hbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihmZWVkc1syXSwge1xuICAgICAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBuYW1lICA6IG5hbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbWUuYWN0aXZlVGFnICAgID0gb3B0cy52YWx1ZTtcbiAgICAgICAgbWUuX2N1cnJlbnRQYWdlID0gMTsgLy8gc2lsZW50IHVwZGF0ZVxuICAgICAgICBtZS5mZWVkcyAgICAgICAgPSBmZWVkcztcblxuICAgICAgICBtZS5nZXRDb250cm9sbGVyKCkuX2FydGljbGVzT2Zmc2V0ID0gMDsgLy8gc2lsZW50IHVwZGF0ZVxuXG4gICAgICAgIG1lLmdldEFydGljbGVzKHtcbiAgICAgICAgICAgIHRhZzogb3B0cy52YWx1ZVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKEhvbWVDb21wb25lbnQpO1xuXG5leHBvcnQge0hvbWVDb21wb25lbnQgYXMgZGVmYXVsdH07IiwiaW1wb3J0IEZvb3RlckNvbXBvbmVudCAgICAgICAgIGZyb20gJy4vRm9vdGVyQ29tcG9uZW50Lm1qcyc7XG5pbXBvcnQgSGVhZGVyQ29tcG9uZW50ICAgICAgICAgZnJvbSAnLi9IZWFkZXJDb21wb25lbnQubWpzJztcbmltcG9ydCBIb21lQ29tcG9uZW50ICAgICAgICAgICBmcm9tICcuL0hvbWVDb21wb25lbnQubWpzJztcbmltcG9ydCBNYWluQ29udGFpbmVyQ29udHJvbGxlciBmcm9tICcuL01haW5Db250YWluZXJDb250cm9sbGVyLm1qcyc7XG5pbXBvcnQgVmlld3BvcnQgICAgICAgICAgICAgICAgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbnRhaW5lci9WaWV3cG9ydC5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBSZWFsV29ybGQudmlldy5NYWluQ29udGFpbmVyXG4gKiBAZXh0ZW5kcyBOZW8uY29udGFpbmVyLlZpZXdwb3J0XG4gKi9cbmNsYXNzIE1haW5Db250YWluZXIgZXh0ZW5kcyBWaWV3cG9ydCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J1JlYWxXb3JsZC52aWV3Lk1haW5Db250YWluZXInXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ1JlYWxXb3JsZC52aWV3Lk1haW5Db250YWluZXInLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gYXV0b01vdW50PXRydWVcbiAgICAgICAgICovXG4gICAgICAgIGF1dG9Nb3VudDogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0FycmF5fSBjbHM9W11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogW10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOZW8uY29udHJvbGxlci5Db21wb25lbnR9IGNvbnRyb2xsZXI9TWFpbkNvbnRhaW5lckNvbnRyb2xsZXJcbiAgICAgICAgICovXG4gICAgICAgIGNvbnRyb2xsZXI6IE1haW5Db250YWluZXJDb250cm9sbGVyLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBsYXlvdXQ9e250eXBlOiAndmJveCd9XG4gICAgICAgICAqL1xuICAgICAgICBsYXlvdXQ6IHtudHlwZTogJ2Jhc2UnfSxcblxuICAgICAgICBpdGVtczogW3tcbiAgICAgICAgICAgIG1vZHVsZSAgIDogSGVhZGVyQ29tcG9uZW50LFxuICAgICAgICAgICAgcmVmZXJlbmNlOiAnaGVhZGVyJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBtb2R1bGU6IEZvb3RlckNvbXBvbmVudFxuICAgICAgICB9XVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBpZiAoIU5lby5jb25maWcuaGFzaCkge1xuICAgICAgICAgICAgdGhpcy5faXRlbXMuc3BsaWNlKDEsIDAsIHtcbiAgICAgICAgICAgICAgICBtb2R1bGUgICA6IEhvbWVDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgZmxleCAgICAgOiAxLFxuICAgICAgICAgICAgICAgIHJlZmVyZW5jZTogJ2hvbWUnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoTWFpbkNvbnRhaW5lcik7XG5cbmV4cG9ydCB7TWFpbkNvbnRhaW5lciBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQXJ0aWNsZUNvbXBvbmVudCAgICBmcm9tICcuL2FydGljbGUvQ29tcG9uZW50Lm1qcyc7XG5pbXBvcnQgQXJ0aWNsZUFwaSAgICAgICAgICBmcm9tICcuLi9hcGkvQXJ0aWNsZS5tanMnO1xuaW1wb3J0IENvbXBvbmVudENvbnRyb2xsZXIgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbnRyb2xsZXIvQ29tcG9uZW50Lm1qcyc7XG5pbXBvcnQgQ3JlYXRlQ29tcG9uZW50ICAgICBmcm9tICcuL2FydGljbGUvQ3JlYXRlQ29tcG9uZW50Lm1qcyc7XG5pbXBvcnQgRmF2b3JpdGVBcGkgICAgICAgICBmcm9tICcuLi9hcGkvRmF2b3JpdGUubWpzJztcbmltcG9ydCBIb21lQ29tcG9uZW50ICAgICAgIGZyb20gJy4vSG9tZUNvbXBvbmVudC5tanMnO1xuaW1wb3J0IHtMT0NBTF9TVE9SQUdFX0tFWX0gZnJvbSAnLi4vYXBpL2NvbmZpZy5tanMnO1xuaW1wb3J0IFByb2ZpbGVBcGkgICAgICAgICAgZnJvbSAnLi4vYXBpL1Byb2ZpbGUubWpzJztcbmltcG9ydCBQcm9maWxlQ29tcG9uZW50ICAgIGZyb20gJy4vdXNlci9Qcm9maWxlQ29tcG9uZW50Lm1qcyc7XG5pbXBvcnQgU2V0dGluZ3NDb21wb25lbnQgICBmcm9tICcuL3VzZXIvU2V0dGluZ3NDb21wb25lbnQubWpzJztcbmltcG9ydCBTaWduVXBDb21wb25lbnQgICAgIGZyb20gJy4vdXNlci9TaWduVXBDb21wb25lbnQubWpzJztcbmltcG9ydCBUYWdBcGkgICAgICAgICAgICAgIGZyb20gJy4uL2FwaS9UYWcubWpzJztcbmltcG9ydCBVc2VyQXBpICAgICAgICAgICAgIGZyb20gJy4uL2FwaS9Vc2VyLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIFJlYWxXb3JsZC52aWV3Lk1haW5Db250YWluZXJDb250cm9sbGVyXG4gKiBAZXh0ZW5kcyBOZW8uY29udHJvbGxlci5Db21wb25lbnRcbiAqL1xuY2xhc3MgTWFpbkNvbnRhaW5lckNvbnRyb2xsZXIgZXh0ZW5kcyBDb21wb25lbnRDb250cm9sbGVyIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nUmVhbFdvcmxkLnZpZXcuTWFpbkNvbnRhaW5lckNvbnRyb2xsZXInXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ1JlYWxXb3JsZC52aWV3Lk1haW5Db250YWluZXJDb250cm9sbGVyJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1JlYWxXb3JsZC52aWV3LmFydGljbGUuQ29tcG9uZW50fG51bGx9IGFydGljbGVDb21wb25lbnQ9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBhcnRpY2xlQ29tcG9uZW50OiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBhcnRpY2xlc09mZnNldF89MFxuICAgICAgICAgKi9cbiAgICAgICAgYXJ0aWNsZXNPZmZzZXRfOiAwLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7UmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5DcmVhdGVDb21wb25lbnR8bnVsbH0gY3JlYXRlQ29tcG9uZW50PW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY3JlYXRlQ29tcG9uZW50OiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcmVzIHRoZSBjdXJyZW50IHVzZXIgZGF0YSBhZnRlciBsb2dnaW5nIGluXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdHxudWxsfSBjdXJyZW50VXNlcl89bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjdXJyZW50VXNlcl86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gaGFzaFN0cmluZz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBoYXNoU3RyaW5nOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7UmVhbFdvcmxkLnZpZXcuSG9tZUNvbXBvbmVudHxudWxsfSBob21lQ29tcG9uZW50PW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgaG9tZUNvbXBvbmVudDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1JlYWxXb3JsZC52aWV3LnVzZXIuUHJvZmlsZUNvbXBvbmVudHxudWxsfSBwcm9maWxlQ29tcG9uZW50PW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgcHJvZmlsZUNvbXBvbmVudDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1JlYWxXb3JsZC52aWV3LnVzZXIuU2V0dGluZ3NDb21wb25lbnR8bnVsbH0gc2V0dGluZ3NDb21wb25lbnQ9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBzZXR0aW5nc0NvbXBvbmVudDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1JlYWxXb3JsZC52aWV3LnVzZXIuU2lnblVwQ29tcG9uZW50fG51bGx9IHNpZ25VcENvbXBvbmVudD1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHNpZ25VcENvbXBvbmVudDogbnVsbFxuICAgIH19XG5cbiAgICBvbkNvbnN0cnVjdGVkKCkge1xuICAgICAgICBzdXBlci5vbkNvbnN0cnVjdGVkKCk7XG5cbiAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICAgIFVzZXJBcGkub24oJ3JlYWR5JywgbWUuZ2V0Q3VycmVudFVzZXIsIG1lKTtcblxuICAgICAgICAvLyBkZWZhdWx0IHJvdXRlID0+IGhvbWVcbiAgICAgICAgaWYgKCFOZW8uY29uZmlnLmhhc2gpIHtcbiAgICAgICAgICAgIG1lLm9uSGFzaENoYW5nZSh7XG4gICAgICAgICAgICAgICAgYXBwTmFtZXMgIDogWydSZWFsV29ybGQnXSxcbiAgICAgICAgICAgICAgICBoYXNoICAgICAgOiB7Jy8nOiAnJ30sXG4gICAgICAgICAgICAgICAgaGFzaFN0cmluZzogJy8nXG4gICAgICAgICAgICB9LCBudWxsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgYXJ0aWNsZXNPZmZzZXQgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0QXJ0aWNsZXNPZmZzZXQodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIC8vIGlnbm9yZSB0aGUgaW5pdGlhbCBjb25maWcgc2V0dGVyIGNhbGxcbiAgICAgICAgaWYgKE5lby5pc051bWJlcihvbGRWYWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0QXJ0aWNsZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgY3VycmVudFVzZXIgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0Q3VycmVudFVzZXIodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2xkVmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLmdldFJlZmVyZW5jZSgnaGVhZGVyJykuc2V0KHtcbiAgICAgICAgICAgICAgICBsb2dnZWRJbiA6ICEhdmFsdWUsXG4gICAgICAgICAgICAgICAgdXNlckltYWdlOiB2YWx1ZSA/IHZhbHVlLmltYWdlICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICB1c2VyTmFtZSA6IHZhbHVlID8gdmFsdWUudXNlcm5hbWUgOiBudWxsXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyB0b2RvOiB0ZXN0IHRvIGVuc3VyZSB0aGUgaW5pdGlhbCBtYXJrdXAgaXMgcmVuZGVyZWRcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJlKCdhZnRlclNldEN1cnJlbnRVc2VyJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNsdWdcbiAgICAgKi9cbiAgICBkZWxldGVBcnRpY2xlKHNsdWcpIHtcbiAgICAgICAgQXJ0aWNsZUFwaS5kZWxldGUoe3NsdWc6IHNsdWd9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgTmVvLk1haW4uc2V0Um91dGUoe1xuICAgICAgICAgICAgICAgIHZhbHVlOiAnLydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpZFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAgICovXG4gICAgZGVsZXRlQ29tbWVudChpZCkge1xuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICBzbHVnID0gbWUuaGFzaFN0cmluZy5zcGxpdCgnLycpLnBvcCgpO1xuXG4gICAgICAgIHJldHVybiBBcnRpY2xlQXBpLmRlbGV0ZUNvbW1lbnQoc2x1ZywgaWQpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBtZS5nZXRDb21tZW50cyhzbHVnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2x1Z1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZmF2b3JpdGVkXG4gICAgICovXG4gICAgZmF2b3JpdGVBcnRpY2xlKHNsdWcsIGZhdm9yaXRlZCkge1xuICAgICAgICByZXR1cm4gRmF2b3JpdGVBcGlbZmF2b3JpdGVkID8gJ2FkZCcgOiAncmVtb3ZlJ10oc2x1Zyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2x1Z1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZm9sbG93XG4gICAgICovXG4gICAgZm9sbG93VXNlcihzbHVnLCBmb2xsb3cpIHtcbiAgICAgICAgcmV0dXJuIFByb2ZpbGVBcGlbZm9sbG93ID8gJ2ZvbGxvdycgOiAndW5mb2xsb3cnXShzbHVnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcnRpY2xlIGRldGFpbHM6IGdldCBhbiBhcnRpY2xlIHByb3ZpZGluZyBhIHVzZXIgc2x1Z1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzbHVnXG4gICAgICovXG4gICAgZ2V0QXJ0aWNsZShzbHVnKSB7XG4gICAgICAgIHJldHVybiBBcnRpY2xlQXBpLmdldCh7XG4gICAgICAgICAgICBzbHVnOiBzbHVnXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXM9e31dXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzPXt9XVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAgICovXG4gICAgZ2V0QXJ0aWNsZXMocGFyYW1zPXt9LCBvcHRzPXt9KSB7XG4gICAgICAgIHJldHVybiBBcnRpY2xlQXBpLmdldCh7XG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICBsaW1pdCA6IDEwLFxuICAgICAgICAgICAgICAgIG9mZnNldDogdGhpcy5hcnRpY2xlc09mZnNldCxcbiAgICAgICAgICAgICAgICAuLi5wYXJhbXNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAuLi5vcHRzXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNsdWdcbiAgICAgKi9cbiAgICBnZXRDb21tZW50cyhzbHVnKSB7XG4gICAgICAgIEFydGljbGVBcGkuZ2V0Q29tbWVudHMoc2x1ZykudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXJ0aWNsZUNvbXBvbmVudC5jb21tZW50cyA9IGRhdGEuanNvbi5jb21tZW50cztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdG9rZW5cbiAgICAgKi9cbiAgICBnZXRDdXJyZW50VXNlcih0b2tlbikge1xuICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgIFVzZXJBcGkuZ2V0KHtcbiAgICAgICAgICAgICAgICByZXNvdXJjZTogJy91c2VyJyAvLyBlZGdlIGNhc2UsIHVzZXIgaW5zdGVhZCBvZiB1c2Vyc1xuICAgICAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRVc2VyID0gZGF0YS5qc29uLnVzZXI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNsdWdcbiAgICAgKi9cbiAgICBnZXRQcm9maWxlKHNsdWcpIHtcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICAgIFByb2ZpbGVBcGkuZ2V0KHtcbiAgICAgICAgICAgIHNsdWc6IHNsdWdcbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIG1lLnByb2ZpbGVDb21wb25lbnQudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAuLi5kYXRhLmpzb24ucHJvZmlsZSxcbiAgICAgICAgICAgICAgICBteVByb2ZpbGU6IGRhdGEuanNvbi5wcm9maWxlLnVzZXJuYW1lID09PSAobWUuY3VycmVudFVzZXIgJiYgbWUuY3VycmVudFVzZXIudXNlcm5hbWUpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXRUYWdzKCkge1xuICAgICAgICBUYWdBcGkuZ2V0KCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMuaG9tZUNvbXBvbmVudC50YWdMaXN0LnRhZ3MgPSBkYXRhLmpzb24udGFncztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtOZW8uY29tcG9uZW50LkJhc2V9IG1vZHVsZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSByZWZlcmVuY2VcbiAgICAgKiBAcmV0dXJucyB7TmVvLmNvbXBvbmVudC5CYXNlfSBUaGUgbWF0Y2hpbmcgdmlldyBpbnN0YW5jZVxuICAgICAqL1xuICAgIGdldFZpZXcoa2V5LCBtb2R1bGUsIHJlZmVyZW5jZSkge1xuICAgICAgICBjb25zdCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCFtZVtrZXldKSB7XG4gICAgICAgICAgICBtZVtrZXldID0gTmVvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgbW9kdWxlICAgOiBtb2R1bGUsXG4gICAgICAgICAgICAgICAgcGFyZW50SWQgOiBtZS5jb21wb25lbnQuaWQsXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlOiByZWZlcmVuY2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1lW2tleV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHVzZXJEYXRhXG4gICAgICovXG4gICAgbG9naW4odXNlckRhdGEpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VXNlciA9IHVzZXJEYXRhO1xuXG4gICAgICAgIE5lby5tYWluLmFkZG9uLkxvY2FsU3RvcmFnZS5jcmVhdGVMb2NhbFN0b3JhZ2VJdGVtKHtcbiAgICAgICAgICAgIGtleSAgOiBMT0NBTF9TVE9SQUdFX0tFWSxcbiAgICAgICAgICAgIHZhbHVlOiB1c2VyRGF0YS50b2tlblxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vIHdhaXQgdW50aWwgdGhlIGhlYWRlciB2ZG9tLXVwZGF0ZSBpcyBkb25lIHRvIGF2b2lkIHNob3dpbmcgc2lnbiB1cCAmIHNpZ24gaW4gdHdpY2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIE5lby5NYWluLnNldFJvdXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcvJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGxvZ291dCgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VXNlciA9IG51bGw7XG5cbiAgICAgICAgTmVvLm1haW4uYWRkb24uTG9jYWxTdG9yYWdlLmRlc3Ryb3lMb2NhbFN0b3JhZ2VJdGVtKHtcbiAgICAgICAgICAgIGtleTogTE9DQUxfU1RPUkFHRV9LRVlcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyB3YWl0IHVudGlsIHRoZSBoZWFkZXIgdmRvbS11cGRhdGUgaXMgZG9uZSB0byBhdm9pZCBzaG93aW5nIHNpZ24gdXAgJiBzaWduIGluIHR3aWNlXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBOZW8uTWFpbi5zZXRSb3V0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnLydcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2xkVmFsdWVcbiAgICAgKi9cbiAgICBvbkhhc2hDaGFuZ2UodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGNvbXBvbmVudCAgPSBtZS5jb21wb25lbnQsXG4gICAgICAgICAgICBoYXNoICAgICAgID0gdmFsdWUuaGFzaCxcbiAgICAgICAgICAgIGhhc2hTdHJpbmcgPSB2YWx1ZS5oYXNoU3RyaW5nLFxuICAgICAgICAgICAgbmV3Vmlldywgc2x1ZztcblxuICAgICAgICBpZiAoIWNvbXBvbmVudC5tb3VudGVkKSB7IC8vIHRoZSBpbml0aWFsIGhhc2ggY2hhbmdlIGdldHMgdHJpZ2dlcmVkIGJlZm9yZSB0aGUgdm5vZGUgZ290IGJhY2sgZnJvbSB0aGUgdmRvbSB3b3JrZXIgKHVzaW5nIGF1dG9Nb3VudClcbiAgICAgICAgICAgIGNvbXBvbmVudC5vbignbW91bnRlZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBtZS5vbkhhc2hDaGFuZ2UodmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWUuaGFzaFN0cmluZyA9IGhhc2hTdHJpbmc7XG5cbiAgICAgICAgICAgIC8vIGFkanVzdCB0aGUgYWN0aXZlIGhlYWRlciBsaW5rXG4gICAgICAgICAgICBjb21wb25lbnQuaXRlbXNbMF0uYWN0aXZlSXRlbSA9IE9iamVjdC5rZXlzKGhhc2gpWzBdO1xuXG4gICAgICAgICAgICAgICAgIGlmIChoYXNoU3RyaW5nID09PSAnLycpICAgICAgICAgICAgICAgIHtuZXdWaWV3ID0gbWUuZ2V0VmlldygnaG9tZUNvbXBvbmVudCcsICAgICBIb21lQ29tcG9uZW50LCAgICAgJ2hvbWUnKTt9XG4gICAgICAgICAgICBlbHNlIGlmIChoYXNoU3RyaW5nLmluY2x1ZGVzKCcvYXJ0aWNsZS8nKSkgIHtuZXdWaWV3ID0gbWUuZ2V0VmlldygnYXJ0aWNsZUNvbXBvbmVudCcsICBBcnRpY2xlQ29tcG9uZW50LCAgJ2FydGljbGUnKTt9XG4gICAgICAgICAgICBlbHNlIGlmIChoYXNoU3RyaW5nLmluY2x1ZGVzKCcvZWRpdG9yJykpICAgIHtuZXdWaWV3ID0gbWUuZ2V0VmlldygnY3JlYXRlQ29tcG9uZW50JywgICBDcmVhdGVDb21wb25lbnQsICAgJ2VkaXRvcicpO31cbiAgICAgICAgICAgIGVsc2UgaWYgKGhhc2hTdHJpbmcuaW5jbHVkZXMoJy9wcm9maWxlLycpKSAge25ld1ZpZXcgPSBtZS5nZXRWaWV3KCdwcm9maWxlQ29tcG9uZW50JywgIFByb2ZpbGVDb21wb25lbnQsICAncHJvZmlsZScpO31cbiAgICAgICAgICAgIGVsc2UgaWYgKGhhc2guaGFzT3duUHJvcGVydHkoJy9sb2dpbicpKSAgICB7bmV3VmlldyA9IG1lLmdldFZpZXcoJ3NpZ25VcENvbXBvbmVudCcsICAgU2lnblVwQ29tcG9uZW50LCAgICdzaWdudXAnKTsgbmV3Vmlldy5tb2RlID0gJ3NpZ25pbic7fVxuICAgICAgICAgICAgZWxzZSBpZiAoaGFzaC5oYXNPd25Qcm9wZXJ0eSgnL3JlZ2lzdGVyJykpIHtuZXdWaWV3ID0gbWUuZ2V0Vmlldygnc2lnblVwQ29tcG9uZW50JywgICBTaWduVXBDb21wb25lbnQsICAgJ3NpZ251cCcpOyBuZXdWaWV3Lm1vZGUgPSAnc2lnbnVwJzt9XG4gICAgICAgICAgICBlbHNlIGlmIChoYXNoLmhhc093blByb3BlcnR5KCcvc2V0dGluZ3MnKSkge25ld1ZpZXcgPSBtZS5nZXRWaWV3KCdzZXR0aW5nc0NvbXBvbmVudCcsIFNldHRpbmdzQ29tcG9uZW50LCAnc2V0dGluZ3MnKTt9XG5cbiAgICAgICAgICAgIGlmICghKG9sZFZhbHVlICYmIG9sZFZhbHVlLmhhc2ggJiYgKFxuICAgICAgICAgICAgICAgIG9sZFZhbHVlLmhhc2guaGFzT3duUHJvcGVydHkoJy9sb2dpbicpICAgICYmIGhhc2guaGFzT3duUHJvcGVydHkoJy9yZWdpc3RlcicpIHx8XG4gICAgICAgICAgICAgICAgb2xkVmFsdWUuaGFzaC5oYXNPd25Qcm9wZXJ0eSgnL3JlZ2lzdGVyJykgJiYgaGFzaC5oYXNPd25Qcm9wZXJ0eSgnL2xvZ2luJykpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5pdGVtcy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5yZW1vdmVBdCgxLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZpZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50Lmluc2VydCgxLCBuZXdWaWV3KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN3aXRjaCAobmV3Vmlldy5yZWZlcmVuY2UpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdhcnRpY2xlJzpcbiAgICAgICAgICAgICAgICAgICAgc2x1ZyA9IGhhc2hTdHJpbmcuc3BsaXQoJy8nKS5wb3AoKTtcblxuICAgICAgICAgICAgICAgICAgICBtZS5nZXRBcnRpY2xlKHNsdWcpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJ0aWNsZSA9IGRhdGEuanNvbi5hcnRpY2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkgICAgPSBhcnRpY2xlLmJvZHk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhcnRpY2xlLmJvZHk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG1lLmFydGljbGVDb21wb25lbnQuc2V0KGFydGljbGUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lLmFydGljbGVDb21wb25lbnQuYm9keSA9IGJvZHk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbWUuZ2V0Q29tbWVudHMoc2x1Zyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2VkaXRvcic6XG4gICAgICAgICAgICAgICAgICAgIHNsdWcgPSBoYXNoU3RyaW5nLnNwbGl0KCcvJykucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzbHVnICE9PSAnZWRpdG9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWUuZ2V0QXJ0aWNsZShzbHVnKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFydGljbGUgPSBkYXRhLmpzb24uYXJ0aWNsZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lLmNyZWF0ZUNvbXBvbmVudC5zZXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5ICAgICAgIDogYXJ0aWNsZS5ib2R5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogYXJ0aWNsZS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2x1ZyAgICAgICA6IGFydGljbGUuc2x1ZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnTGlzdCAgICA6IGFydGljbGUudGFnTGlzdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICAgICA6IGFydGljbGUudGl0bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWUuY3JlYXRlQ29tcG9uZW50LnJlc2V0Rm9ybSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hvbWUnOlxuICAgICAgICAgICAgICAgICAgICBtZS5ob21lQ29tcG9uZW50LmxvZ2dlZEluID0gISFtZS5jdXJyZW50VXNlcjtcbiAgICAgICAgICAgICAgICAgICAgbWUuaG9tZUNvbXBvbmVudC5nZXRBcnRpY2xlcygpO1xuICAgICAgICAgICAgICAgICAgICBtZS5nZXRUYWdzKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3Byb2ZpbGUnOlxuICAgICAgICAgICAgICAgICAgICBtZS5nZXRQcm9maWxlKGhhc2hTdHJpbmcuc3BsaXQoJy8nKS5wb3AoKSk7IC8vIHBhc3MgdGhlIHNsdWdcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc2V0dGluZ3MnOlxuICAgICAgICAgICAgICAgICAgICBpZiAobWUuY3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyBhZGRlZCBhIHNob3J0IGRlbGF5IHRvIG5vdCBpbnRlcmZlcmUgd2l0aCB0aGUgbWFpbkNvbnRhaW5lciB1cGRhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZS5zZXR0aW5nc0NvbXBvbmVudC5vbkN1cnJlbnRVc2VyQ2hhbmdlKG1lLmN1cnJlbnRVc2VyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzaWdudXAnOlxuICAgICAgICAgICAgICAgICAgICBuZXdWaWV3LmVycm9ycyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzKVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAgICovXG4gICAgcG9zdENvbW1lbnQob3B0cz17fSkge1xuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICBzbHVnID0gbWUuaGFzaFN0cmluZy5zcGxpdCgnLycpLnBvcCgpO1xuXG4gICAgICAgIHJldHVybiBBcnRpY2xlQXBpLnBvc3RDb21tZW50KHNsdWcsIG9wdHMpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBtZS5nZXRDb21tZW50cyhzbHVnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAgICovXG4gICAgc2F2ZVVzZXIob3B0cykge1xuICAgICAgICByZXR1cm4gVXNlckFwaS5wb3N0KG9wdHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzKVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAgICovXG4gICAgdXBkYXRlU2V0dGluZ3Mob3B0cz17fSkge1xuICAgICAgICByZXR1cm4gVXNlckFwaS5wdXQoe1xuICAgICAgICAgICAgLi4ub3B0cyxcbiAgICAgICAgICAgIHJlc291cmNlOiAnL3VzZXInIC8vIGVkZ2UgY2FzZSwgdXNlciBpbnN0ZWFkIG9mIHVzZXJzXG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBpZiAoIWRhdGEuanNvbi5lcnJvcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRVc2VyID0gZGF0YS5qc29uLnVzZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKE1haW5Db250YWluZXJDb250cm9sbGVyKTtcblxuZXhwb3J0IHtNYWluQ29udGFpbmVyQ29udHJvbGxlciBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9jb21wb25lbnQvQmFzZS5tanMnO1xuaW1wb3J0IFZEb21VdGlsICBmcm9tICcuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdXRpbC9WRG9tLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIFJlYWxXb3JsZC52aWV3LmFydGljbGUuQ29tbWVudENvbXBvbmVudFxuICogQGV4dGVuZHMgTmVvLmNvbXBvbmVudC5CYXNlXG4gKi9cbmNsYXNzIENvbW1lbnRDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdSZWFsV29ybGQudmlldy5hcnRpY2xlLkNvbW1lbnRDb21wb25lbnQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ1JlYWxXb3JsZC52aWV3LmFydGljbGUuQ29tbWVudENvbXBvbmVudCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R8bnVsbH0gYXV0aG9yXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBhdXRob3JfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IGJvZHlfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGJvZHlfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ2NhcmQnXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ2NhcmQnXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcnxudWxsfSBjb21tZW50SWQ9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgY29tbWVudElkOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IGNyZWF0ZWRBdF89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgY3JlYXRlZEF0XzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE5vdCBpbiB1c2VcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IHVwZGF0ZWRBdD1udWxsXG4gICAgICAgICAqL1xuICAgICAgICB1cGRhdGVkQXQ6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IF92ZG9tXG4gICAgICAgICAqL1xuICAgICAgICBfdmRvbToge1xuICAgICAgICAgICAgY246IFt7XG4gICAgICAgICAgICAgICAgY2xzOiBbJ2NhcmQtYmxvY2snXSxcbiAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRhZzogJ3AnLFxuICAgICAgICAgICAgICAgICAgICBjbHM6IFsnY2FyZC10ZXh0J11cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGNsczogWydjYXJkLWZvb3RlciddLFxuICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2EnLFxuICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ2NvbW1lbnQtYXV0aG9yJ10sXG4gICAgICAgICAgICAgICAgICAgIGhyZWY6ICcnLFxuICAgICAgICAgICAgICAgICAgICBjbiAgOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnaW1nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWydjb21tZW50LWF1dGhvci1pbWcnXVxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdnR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgaHRtbCA6ICcmbmJzcDsnXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0YWcgOiAnYScsXG4gICAgICAgICAgICAgICAgICAgIGNscyA6IFsnY29tbWVudC1hdXRob3InXSxcbiAgICAgICAgICAgICAgICAgICAgaHJlZjogJydcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRhZyA6ICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgY2xzIDogWydkYXRlLXBvc3RlZCddXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0YWcgOiAnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgIGNscyA6IFsnbW9kLW9wdGlvbnMnXSxcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogJ21vZC1vcHRpb25zJyxcbiAgICAgICAgICAgICAgICAgICAgY246IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8ve3RhZzogJ2knLCBjbHM6IFsnaW9uLWVkaXQnXX0sIC8vIG5vdCBpbXBsZW1lbnRlZCBpbiBvdGhlciBhcHBzID0+IG5vdCBzdXJlIHdoYXQgc2hvdWxkIGhhcHBlblxuICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ2knLCBjbHM6IFsnaW9uLXRyYXNoLWEnXX1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIGxldCBtZSAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgZG9tTGlzdGVuZXJzID0gbWUuZG9tTGlzdGVuZXJzO1xuXG4gICAgICAgIGRvbUxpc3RlbmVycy5wdXNoKHtcbiAgICAgICAgICAgIGNsaWNrOiB7XG4gICAgICAgICAgICAgICAgZm4gICAgICA6IG1lLm9uRGVsZXRlQnV0dG9uQ2xpY2ssXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6ICcuaW9uLXRyYXNoLWEnLFxuICAgICAgICAgICAgICAgIHNjb3BlICAgOiBtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LyosIHtcbiAgICAgICAgICAgIGNsaWNrOiB7XG4gICAgICAgICAgICAgICAgZm4gICAgICA6IG1lLm9uRWRpdEJ1dHRvbkNsaWNrLFxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiAnLmlvbi1lZGl0JyxcbiAgICAgICAgICAgICAgICBzY29wZSAgIDogbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSovKTtcblxuICAgICAgICBtZS5kb21MaXN0ZW5lcnMgPSBkb21MaXN0ZW5lcnM7XG5cbiAgICAgICAgbWUuZ2V0Q29udHJvbGxlcigpLm9uKHtcbiAgICAgICAgICAgIGFmdGVyU2V0Q3VycmVudFVzZXI6IG1lLm9uQ3VycmVudFVzZXJDaGFuZ2UsXG4gICAgICAgICAgICBzY29wZSAgICAgICAgICAgICAgOiBtZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGF1dGhvciBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge09iamVjdHxudWxsfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fG51bGx9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0QXV0aG9yKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICB2ZG9tID0gbWUudmRvbTtcblxuICAgICAgICAgICAgdmRvbS5jblsxXS5jblswXS5jblswXS5zcmMgPSB2YWx1ZS5pbWFnZTtcbiAgICAgICAgICAgIHZkb20uY25bMV0uY25bMl0uaHRtbCAgICAgID0gdmFsdWUudXNlcm5hbWU7XG5cbiAgICAgICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuXG4gICAgICAgICAgICBtZS5vbkN1cnJlbnRVc2VyQ2hhbmdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGJvZHkgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd8bnVsbH0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xudWxsfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEJvZHkodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG5cbiAgICAgICAgICAgIHZkb20uY25bMF0uY25bMF0uaHRtbCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgY3JlYXRlZEF0IGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfG51bGx9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd8bnVsbH0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRDcmVhdGVkQXQodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG5cbiAgICAgICAgICAgIHZkb20uY25bMV0uY25bM10uaHRtbCA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KCdlbi1VUycsIHtcbiAgICAgICAgICAgICAgICBkYXkgIDogJ251bWVyaWMnLFxuICAgICAgICAgICAgICAgIG1vbnRoOiAnbG9uZycsXG4gICAgICAgICAgICAgICAgeWVhciA6ICdudW1lcmljJ1xuICAgICAgICAgICAgfSkuZm9ybWF0KG5ldyBEYXRlKHZhbHVlKSk7XG5cbiAgICAgICAgICAgIHRoaXMudmRvbSA9IHZkb207XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uQ3VycmVudFVzZXJDaGFuZ2UoKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBjdXJyZW50VXNlciA9IG1lLmdldENvbnRyb2xsZXIoKS5jdXJyZW50VXNlcixcbiAgICAgICAgICAgIHZkb20gICAgICAgID0gbWUudmRvbTtcblxuICAgICAgICBpZiAoY3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgIFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnbW9kLW9wdGlvbnMnKS5yZW1vdmVEb20gPSBtZS5hdXRob3IudXNlcm5hbWUgIT09IGN1cnJlbnRVc2VyLnVzZXJuYW1lO1xuXG4gICAgICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbkRlbGV0ZUJ1dHRvbkNsaWNrKGRhdGEpIHtcbiAgICAgICAgdGhpcy5nZXRDb250cm9sbGVyKCkuZGVsZXRlQ29tbWVudCh0aGlzLmNvbW1lbnRJZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTm90IHN1cHBvcnRlZCB5ZXRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRWRpdEJ1dHRvbkNsaWNrKGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29uRWRpdEJ1dHRvbkNsaWNrJyk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhDb21tZW50Q29tcG9uZW50KTtcblxuZXhwb3J0IHtDb21tZW50Q29tcG9uZW50IGFzIGRlZmF1bHR9OyIsImltcG9ydCBCYXNlQ29tcG9uZW50ICAgICAgICAgIGZyb20gJy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9jb21wb25lbnQvQmFzZS5tanMnO1xuaW1wb3J0IENvbW1lbnRDb21wb25lbnQgICAgICAgZnJvbSAnLi9Db21tZW50Q29tcG9uZW50Lm1qcyc7XG5pbXBvcnQgQ3JlYXRlQ29tbWVudENvbXBvbmVudCBmcm9tICcuL0NyZWF0ZUNvbW1lbnRDb21wb25lbnQubWpzJztcbmltcG9ydCBOZW9BcnJheSAgICAgICAgICAgICAgIGZyb20gJy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy91dGlsL0FycmF5Lm1qcyc7XG5pbXBvcnQgVkRvbVV0aWwgICAgICAgICAgICAgICBmcm9tICcuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdXRpbC9WRG9tLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIFJlYWxXb3JsZC52aWV3LmFydGljbGUuQ29tcG9uZW50XG4gKiBAZXh0ZW5kcyBOZW8uY29tcG9uZW50LkJhc2VcbiAqL1xuY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J1JlYWxXb3JsZC52aWV3LmFydGljbGUuQ29tcG9uZW50J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdSZWFsV29ybGQudmlldy5hcnRpY2xlLkNvbXBvbmVudCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R8bnVsbH0gYXV0aG9yXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBhdXRob3JfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IGJvZHlfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGJvZHlfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7UmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5QcmV2aWV3Q29tcG9uZW50W119IGNvbW1lbnRDb21wb25lbnRzPVtdXG4gICAgICAgICAqL1xuICAgICAgICBjb21tZW50Q29tcG9uZW50czogW10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3RbXXxudWxsfSBjb21tZW50c189bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgY29tbWVudHNfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7UmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5DcmVhdGVDb21tZW50Q29tcG9uZW50fG51bGx9IGNyZWF0ZUNvbW1lbnRDb21wb25lbnQ9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgY3JlYXRlQ29tbWVudENvbXBvbmVudDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBjcmVhdGVkQXRfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZWRBdF86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gY2xzPVsnYXJ0aWNsZS1wYWdlJ11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWydhcnRpY2xlLXBhZ2UnXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGZhdm9yaXRlZF89ZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGZhdm9yaXRlZF86IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfG51bGx9IGZhdm9yaXRlc0NvdW50Xz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBmYXZvcml0ZXNDb3VudF86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtBcnJheXxudWxsfSB0YWdMaXN0Xz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICB0YWdMaXN0XzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSB0aXRsZV89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgdGl0bGVfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBfdmRvbVxuICAgICAgICAgKi9cbiAgICAgICAgX3Zkb206IHtcbiAgICAgICAgICAgIGNuOiBbe1xuICAgICAgICAgICAgICAgIGNsczogWydiYW5uZXInXSxcbiAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgIGNsczogWydjb250YWluZXInXSxcbiAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2gxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6ICd0aXRsZSdcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2FydGljbGUtbWV0YSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA6ICdhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiAndXNlcmltYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbiAgOiBbe3RhZzogJ2ltZyd9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWydpbmZvJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgOiAnYScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNscyA6IFsnYXV0aG9yJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6ICd1c2VybmFtZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA6ICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWydkYXRlJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6ICdjcmVhdGVkQXQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdidXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWydidG4nLCAnYnRuLXNtJywgJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsICdmb2xsb3ctYnV0dG9uJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgOiAnaScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6ICdmb2xsb3dJY29uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyA6ICdmb2xsb3dBdXRob3InXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnIDogJ3VzZXJuYW1lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnICAgICAgOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgICAgICA6IFsnYnRuJywgJ2J0bi1zbScsICdidG4tb3V0bGluZS1zZWNvbmRhcnknLCAnZWRpdC1idXR0b24nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnICAgICA6ICdlZGl0LWJ1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRG9tOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2lvbi1lZGl0J11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgOiAnIEVkaXQgQXJ0aWNsZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCA6ICcmbmJzcDsmbmJzcDsnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWydidG4nLCAnYnRuLXNtJywgJ2J0bi1vdXRsaW5lLXByaW1hcnknLCAnZmF2b3JpdGUtYnV0dG9uJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogJ2Zhdm9yaXRlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnaScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWydpb24taGVhcnQnXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCA6ICcmbmJzcDsnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHlwZTogJ3RleHQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sIDogJyBQb3N0ICdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA6ICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWydjb3VudGVyJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6ICdmYXZvcml0ZXNDb3VudCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyAgICAgIDogJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzICAgICAgOiBbJ2J0bicsICdidG4tc20nLCAnYnRuLW91dGxpbmUtZGFuZ2VyJywgJ2RlbGV0ZS1idXR0b24nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnICAgICA6ICdkZWxldGUtYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVEb206IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY246IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2knLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHM6IFsnaW9uLXRyYXNoLWEnXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCA6ICcgRGVsZXRlIEFydGljbGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBjbHM6IFsnY29udGFpbmVyJywgJ3BhZ2UnXSxcbiAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgIGNsczogWydyb3cnLCAnYXJ0aWNsZS1jb250ZW50J10sXG4gICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGNscyA6IFsnY29sLW1kLTEyJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiAnYm9keScsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbiAgOiBbXVxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdGFnOiAnaHInXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ2FydGljbGUtYWN0aW9ucyddLFxuICAgICAgICAgICAgICAgICAgICBmbGFnOiAnYXJ0aWNsZS1hY3Rpb25zJyxcbiAgICAgICAgICAgICAgICAgICAgY24gIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWydhcnRpY2xlLW1ldGEnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgOiAnYScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogJ3VzZXJpbWFnZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gIDogW3t0YWc6ICdpbWcnfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHM6IFsnaW5mbyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2EnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ2F1dGhvciddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiAndXNlcm5hbWUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgOiAnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNscyA6IFsnZGF0ZSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiAnSmFudWFyeSAyMHRoJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHM6IFsnYnRuJywgJ2J0bi1zbScsICdidG4tb3V0bGluZS1zZWNvbmRhcnknLCAnZm9sbG93LWJ1dHRvbiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2knLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiAnZm9sbG93SWNvbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgOiAnZm9sbG93QXV0aG9yJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyA6ICd1c2VybmFtZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCA6ICcmbmJzcDsmbmJzcDsnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWydidG4nLCAnYnRuLXNtJywgJ2J0bi1vdXRsaW5lLXByaW1hcnknLCAnZmF2b3JpdGUtYnV0dG9uJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogJ2Zhdm9yaXRlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnaScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWydpb24taGVhcnQnXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCA6ICcmbmJzcDsnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHlwZTogJ3RleHQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sIDogJyBQb3N0ICdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA6ICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWydjb3VudGVyJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6ICdmYXZvcml0ZXNDb3VudCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGNsczogJ3JvdycsXG4gICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGNscyA6IFsnY29sLXhzLTEyJywgJ2NvbC1tZC04JywgJ29mZnNldC1tZC0yJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiAnY29tbWVudHMtc2VjdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbiAgOiBbXVxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIGxldCBtZSAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgZG9tTGlzdGVuZXJzID0gbWUuZG9tTGlzdGVuZXJzO1xuXG4gICAgICAgIGRvbUxpc3RlbmVycy5wdXNoKFxuICAgICAgICAgICAge2NsaWNrOiB7Zm46IG1lLm9uRGVsZXRlQnV0dG9uQ2xpY2ssICAgZGVsZWdhdGU6ICcuZGVsZXRlLWJ1dHRvbicsICAgc2NvcGU6IG1lfX0sXG4gICAgICAgICAgICB7Y2xpY2s6IHtmbjogbWUub25FZGl0QnV0dG9uQ2xpY2ssICAgICBkZWxlZ2F0ZTogJy5lZGl0LWJ1dHRvbicsICAgICBzY29wZTogbWV9fSxcbiAgICAgICAgICAgIHtjbGljazoge2ZuOiBtZS5vbkZhdm9yaXRlQnV0dG9uQ2xpY2ssIGRlbGVnYXRlOiAnLmZhdm9yaXRlLWJ1dHRvbicsIHNjb3BlOiBtZX19LFxuICAgICAgICAgICAge2NsaWNrOiB7Zm46IG1lLm9uRm9sbG93QnV0dG9uQ2xpY2ssICAgZGVsZWdhdGU6ICcuZm9sbG93LWJ1dHRvbicsICAgc2NvcGU6IG1lfVxuICAgICAgICB9KTtcblxuICAgICAgICBtZS5kb21MaXN0ZW5lcnMgPSBkb21MaXN0ZW5lcnM7XG5cbiAgICAgICAgbWUuZ2V0Q29udHJvbGxlcigpLm9uKHtcbiAgICAgICAgICAgIGFmdGVyU2V0Q3VycmVudFVzZXI6IG1lLm9uQ3VycmVudFVzZXJDaGFuZ2UsXG4gICAgICAgICAgICBzY29wZSAgICAgICAgICAgICAgOiBtZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uQ29uc3RydWN0ZWQoKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBjdXJyZW50VXNlciA9IG1lLmdldENvbnRyb2xsZXIoKS5jdXJyZW50VXNlcixcbiAgICAgICAgICAgIHZkb20gICAgICAgID0gbWUudmRvbTtcblxuICAgICAgICBtZS5jcmVhdGVDb21tZW50Q29tcG9uZW50ID0gTmVvLmNyZWF0ZSh7XG4gICAgICAgICAgICBtb2R1bGUgICA6IENyZWF0ZUNvbW1lbnRDb21wb25lbnQsXG4gICAgICAgICAgICBwYXJlbnRJZCA6IG1lLmlkLFxuICAgICAgICAgICAgdXNlckltYWdlOiBjdXJyZW50VXNlciAmJiBjdXJyZW50VXNlci5pbWFnZSB8fCBudWxsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnY29tbWVudHMtc2VjdGlvbicpLmNuLnVuc2hpZnQobWUuY3JlYXRlQ29tbWVudENvbXBvbmVudC52ZG9tKTtcblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcblxuICAgICAgICBzdXBlci5vbkNvbnN0cnVjdGVkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBhdXRob3IgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0QXV0aG9yKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICB2ZG9tID0gbWUudmRvbTtcblxuICAgICAgICAgICAgVkRvbVV0aWwuZ2V0RmxhZ3ModmRvbSwgJ2ZvbGxvd0F1dGhvcicpLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgbm9kZS5odG1sID0gdmFsdWUuZm9sbG93aW5nID8gJyBVbmZvbGxvdyAnIDogJyBGb2xsb3cgJztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBWRG9tVXRpbC5nZXRGbGFncyh2ZG9tLCAnZm9sbG93SWNvbicpLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgbm9kZS5jbHMgPSB2YWx1ZS5mb2xsb3dpbmcgPyBbJ2lvbi1taW51cy1yb3VuZCddIDogWydpb24tcGx1cy1yb3VuZCddO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIFZEb21VdGlsLmdldEZsYWdzKHZkb20sICd1c2VyaW1hZ2UnKS5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgICAgIG5vZGUuaHJlZiA9ICcjL3Byb2ZpbGUvJyArIHZhbHVlLnVzZXJuYW1lO1xuICAgICAgICAgICAgICAgIG5vZGUuY25bMF0uc3JjID0gdmFsdWUuaW1hZ2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgVkRvbVV0aWwuZ2V0RmxhZ3ModmRvbSwgJ3VzZXJuYW1lJykuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgICAgICBub2RlLmhyZWYgPSAnIy9wcm9maWxlLycgKyB2YWx1ZS51c2VybmFtZTtcbiAgICAgICAgICAgICAgICBub2RlLmh0bWwgPSB2YWx1ZS51c2VybmFtZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtZS52ZG9tID0gdmRvbTtcblxuICAgICAgICAgICAgbWUub25DdXJyZW50VXNlckNoYW5nZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBib2R5IGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEJvZHkodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIE5lby5tYWluLmFkZG9uLk1hcmtkb3duLm1hcmtkb3duVG9IdG1sKHZhbHVlKS50aGVuKGh0bWwgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB2ZG9tID0gbWUudmRvbTtcblxuICAgICAgICAgICAgICAgIFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnYm9keScpLmNuWzBdID0ge1xuICAgICAgICAgICAgICAgICAgICBjbjogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA6ICdwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IGh0bWxcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgY29tbWVudHMgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtPYmplY3RbXXxudWxsfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0W118bnVsbH0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRDb21tZW50cyh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBsZXQgbWUgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICB2ZG9tICAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnY29tbWVudHMtc2VjdGlvbicpLFxuICAgICAgICAgICAgICAgIGNvbmZpZztcblxuICAgICAgICAgICAgY29udGFpbmVyLmNuID0gW2NvbnRhaW5lci5jbi5zaGlmdCgpXTsgLy8ga2VlcCB0aGUgQ3JlYXRlQ29tbWVudENvbXBvbmVudFxuXG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgYXV0aG9yICAgOiBpdGVtLmF1dGhvcixcbiAgICAgICAgICAgICAgICAgICAgYm9keSAgICAgOiBpdGVtLmJvZHksXG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnRJZDogaXRlbS5pZCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0OiBpdGVtLmNyZWF0ZWRBdCxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEF0OiBpdGVtLnVwZGF0ZWRBdFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoIW1lLmNvbW1lbnRDb21wb25lbnRzW2luZGV4XSkge1xuICAgICAgICAgICAgICAgICAgICBtZS5jb21tZW50Q29tcG9uZW50c1tpbmRleF0gPSBOZW8uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZSAgOiBDb21tZW50Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50SWQ6IG1lLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uY29uZmlnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1lLmNvbW1lbnRDb21wb25lbnRzW2luZGV4XS5zZXQoY29uZmlnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb250YWluZXIuY24ucHVzaChtZS5jb21tZW50Q29tcG9uZW50c1tpbmRleF0udmRvbSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGNyZWF0ZWRBdCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRDcmVhdGVkQXQodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG5cbiAgICAgICAgICAgIFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnY3JlYXRlZEF0JykuaHRtbCA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KCdlbi1VUycsIHtcbiAgICAgICAgICAgICAgICBkYXkgIDogJ251bWVyaWMnLFxuICAgICAgICAgICAgICAgIG1vbnRoOiAnbG9uZycsXG4gICAgICAgICAgICAgICAgeWVhciA6ICdudW1lcmljJ1xuICAgICAgICAgICAgfSkuZm9ybWF0KG5ldyBEYXRlKHZhbHVlKSk7XG5cbiAgICAgICAgICAgIHRoaXMudmRvbSA9IHZkb207XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGZhdm9yaXRlZCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEZhdm9yaXRlZCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSA9IG1lLnZkb207XG5cbiAgICAgICAgVkRvbVV0aWwuZ2V0RmxhZ3ModmRvbSwgJ2Zhdm9yaXRlZCcpLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICBub2RlLmNuWzJdLmh0bWwgPSB2YWx1ZSA/ICdVbmZhdm9yaXRlJyA6ICdGYXZvcml0ZSc7XG5cbiAgICAgICAgICAgIE5lb0FycmF5LmFkZChub2RlLmNscywgdmFsdWUgPyAnYnRuLXByaW1hcnknIDogJ2J0bi1vdXRsaW5lLXByaW1hcnknKTtcbiAgICAgICAgICAgIE5lb0FycmF5LnJlbW92ZShub2RlLmNscywgdmFsdWUgPyAnYnRuLW91dGxpbmUtcHJpbWFyeScgOiAnYnRuLXByaW1hcnknKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG5cbiAgICAgICAgLy8gaWdub3JlIHRoZSBpbml0aWFsIHNldHRlciBjYWxsXG4gICAgICAgIGlmIChOZW8uaXNCb29sZWFuKG9sZFZhbHVlKSkge1xuICAgICAgICAgICAgbWUuZ2V0Q29udHJvbGxlcigpLmZhdm9yaXRlQXJ0aWNsZShtZS5zbHVnLCB2YWx1ZSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBtZS5mYXZvcml0ZXNDb3VudCA9IGRhdGEuanNvbi5hcnRpY2xlLmZhdm9yaXRlc0NvdW50O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGZhdm9yaXRlc0NvdW50IGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEZhdm9yaXRlc0NvdW50KHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAoTmVvLmlzTnVtYmVyKHZhbHVlKSkge1xuICAgICAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG5cbiAgICAgICAgICAgIFZEb21VdGlsLmdldEZsYWdzKHZkb20sICdmYXZvcml0ZXNDb3VudCcpLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgbm9kZS5odG1sID0gYCgke3ZhbHVlfSlgO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMudmRvbSA9IHZkb207XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHRhZ0xpc3QgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtBcnJheX0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFRhZ0xpc3QodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tLFxuICAgICAgICAgICAgYm9keSA9IFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnYm9keScpLFxuICAgICAgICAgICAgdGFnTGlzdDtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGFnTGlzdCA9IHtcbiAgICAgICAgICAgICAgICB0YWc6ICd1bCcsXG4gICAgICAgICAgICAgICAgY2xzOiBbJ3RhZy1saXN0J10sXG4gICAgICAgICAgICAgICAgY24gOiBbXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFsdWUuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICB0YWdMaXN0LmNuLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0YWcgOiAnbGknLFxuICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ3RhZy1kZWZhdWx0JywgJ3RhZy1waWxsJywgJ3RhZy1vdXRsaW5lJ10sXG4gICAgICAgICAgICAgICAgICAgIGh0bWw6IGl0ZW1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGJvZHkuY25bMV0gPSB0YWdMaXN0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGJvZHkuY25bMV0pIHtcbiAgICAgICAgICAgICAgICBib2R5LmNuWzFdLnJlbW92ZURvbSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHRpdGxlIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFRpdGxlKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgdmRvbSA9IHRoaXMudmRvbTtcblxuICAgICAgICBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ3RpdGxlJykuaHRtbCA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgb25DdXJyZW50VXNlckNoYW5nZSgpIHtjb25zb2xlLmxvZygnIyMjIG9uQ3VycmVudFVzZXJDaGFuZ2UnKTtcbiAgICAgICAgbGV0IG1lICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGN1cnJlbnRVc2VyID0gbWUuZ2V0Q29udHJvbGxlcigpLmN1cnJlbnRVc2VyLFxuICAgICAgICAgICAgdmRvbSAgICAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgaXNDdXJyZW50VXNlcjtcblxuICAgICAgICBpZiAobWUuYXV0aG9yICYmIGN1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICBpc0N1cnJlbnRVc2VyID0gbWUuYXV0aG9yLnVzZXJuYW1lID09PSBjdXJyZW50VXNlci51c2VybmFtZTtcblxuICAgICAgICAgICAgdmRvbS5jblswXS5jblswXS5jblsxXS5jblsyXS5yZW1vdmVEb20gPSBpc0N1cnJlbnRVc2VyOyAvLyBmb2xsb3cgdXNlciBidXR0b25cbiAgICAgICAgICAgIHZkb20uY25bMF0uY25bMF0uY25bMV0uY25bNV0ucmVtb3ZlRG9tID0gaXNDdXJyZW50VXNlcjsgLy8gZmF2b3JpdGUgcG9zdCBidXR0b25cblxuICAgICAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdhcnRpY2xlLWFjdGlvbnMnKS5yZW1vdmVEb20gPSBpc0N1cnJlbnRVc2VyO1xuICAgICAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdkZWxldGUtYnV0dG9uJykgIC5yZW1vdmVEb20gPSAhaXNDdXJyZW50VXNlcjtcbiAgICAgICAgICAgIFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnZWRpdC1idXR0b24nKSAgICAucmVtb3ZlRG9tID0gIWlzQ3VycmVudFVzZXI7XG5cbiAgICAgICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRGVsZXRlQnV0dG9uQ2xpY2soZGF0YSkge1xuICAgICAgICB0aGlzLmdldENvbnRyb2xsZXIoKS5kZWxldGVBcnRpY2xlKHRoaXMuc2x1Zyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRWRpdEJ1dHRvbkNsaWNrKGRhdGEpIHtcbiAgICAgICAgTmVvLk1haW4uc2V0Um91dGUoe1xuICAgICAgICAgICAgdmFsdWU6ICcvZWRpdG9yLycgKyB0aGlzLnNsdWdcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRmF2b3JpdGVCdXR0b25DbGljayhkYXRhKSB7XG4gICAgICAgIHRoaXMuZmF2b3JpdGVkID0gIXRoaXMuZmF2b3JpdGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbkZvbGxvd0J1dHRvbkNsaWNrKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBtZS5nZXRDb250cm9sbGVyKCkuZm9sbG93VXNlcihtZS5hdXRob3IudXNlcm5hbWUsICFtZS5hdXRob3IuZm9sbG93aW5nKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgbWUuYXV0aG9yID0gZGF0YS5qc29uLnByb2ZpbGU7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoQ29tcG9uZW50KTtcblxuZXhwb3J0IHtDb21wb25lbnQgYXMgZGVmYXVsdH07XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9jb21wb25lbnQvQmFzZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBSZWFsV29ybGQudmlldy5hcnRpY2xlLkNyZWF0ZUNvbW1lbnRDb21wb25lbnRcbiAqIEBleHRlbmRzIE5lby5jb21wb25lbnQuQmFzZVxuICovXG5jbGFzcyBDcmVhdGVDb21tZW50Q29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nUmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5DcmVhdGVDb21tZW50Q29tcG9uZW50J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdSZWFsV29ybGQudmlldy5hcnRpY2xlLkNyZWF0ZUNvbW1lbnRDb21wb25lbnQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ2NhcmQnLCAnY29tbWVudC1mb3JtJ11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWydjYXJkJywgJ2NvbW1lbnQtZm9ybSddLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IHVzZXJJbWFnZV89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgdXNlckltYWdlXzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSB1c2VyTmFtZV89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgdXNlck5hbWVfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBfdmRvbVxuICAgICAgICAgKi9cbiAgICAgICAgX3Zkb206IHtcbiAgICAgICAgICAgIHRhZzogJ2Zvcm0nLFxuICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgIGNsczogWydjYXJkLWJsb2NrJ10sXG4gICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICB0YWcgICAgICAgIDogJ3RleHRhcmVhJyxcbiAgICAgICAgICAgICAgICAgICAgY2xzICAgICAgICA6IFsnZm9ybS1jb250cm9sJ10sXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnV3JpdGUgYSBjb21tZW50Li4uJyxcbiAgICAgICAgICAgICAgICAgICAgcm93cyAgICAgICA6IDNcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGNsczogWydjYXJkLWZvb3RlciddLFxuICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgdGFnOiAnaW1nJyxcbiAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2NvbW1lbnQtYXV0aG9yLWltZyddLFxuICAgICAgICAgICAgICAgICAgICBzcmM6ICdodHRwczovL3N0YXRpYy5wcm9kdWN0aW9ucmVhZHkuaW8vaW1hZ2VzL3NtaWxleS1jeXJ1cy5qcGcnIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nb3RoaW5rc3Rlci9yZWFsd29ybGQvaXNzdWVzLzQ0MlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdnR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgaHRtbCA6ICcmbmJzcDsnXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0YWcgOiAnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgIGNscyA6IFsnY29tbWVudC1hdXRob3InXVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgIGNscyA6IFsnYnRuJywgJ2J0bi1zbScsICdidG4tcHJpbWFyeSddLFxuICAgICAgICAgICAgICAgICAgICBodG1sOiAnUG9zdCBDb21tZW50JyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicgLy8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgc3VibWl0IHR5cGVcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBsZXQgbWUgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGRvbUxpc3RlbmVycyA9IG1lLmRvbUxpc3RlbmVycyxcbiAgICAgICAgICAgIHZkb20gICAgICAgICA9IG1lLnZkb207XG5cbiAgICAgICAgZG9tTGlzdGVuZXJzLnB1c2goe1xuICAgICAgICAgICAgY2xpY2s6IHtcbiAgICAgICAgICAgICAgICBmbiAgICAgIDogbWUub25TdWJtaXRCdXR0b25DbGljayxcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogJy5idG4tcHJpbWFyeScsXG4gICAgICAgICAgICAgICAgc2NvcGUgICA6IG1lXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lLmRvbUxpc3RlbmVycyA9IGRvbUxpc3RlbmVycztcblxuICAgICAgICB2ZG9tLmNuWzBdLmNuWzBdLmlkID0gbWUuZ2V0SW5wdXRFbElkKCk7XG4gICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuXG4gICAgICAgIG1lLmdldENvbnRyb2xsZXIoKS5vbih7XG4gICAgICAgICAgICBhZnRlclNldEN1cnJlbnRVc2VyOiBtZS5vbkN1cnJlbnRVc2VyQ2hhbmdlLFxuICAgICAgICAgICAgc2NvcGUgICAgICAgICAgICAgIDogbWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSB1c2VySW1hZ2UgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0VXNlckltYWdlKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGxldCB2ZG9tID0gdGhpcy52ZG9tO1xuXG4gICAgICAgICAgICB2ZG9tLmNuWzFdLmNuWzBdLnNyYyA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgdXNlck5hbWUgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0VXNlck5hbWUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG5cbiAgICAgICAgICAgIHZkb20uY25bMV0uY25bMl0uaHRtbCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRJbnB1dEVsSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkICsgJ19faW5wdXQnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlXG4gICAgICovXG4gICAgb25DdXJyZW50VXNlckNoYW5nZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLnNldCh7XG4gICAgICAgICAgICB1c2VySW1hZ2U6IHZhbHVlLmltYWdlLFxuICAgICAgICAgICAgdXNlck5hbWUgOiB2YWx1ZS51c2VybmFtZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25TdWJtaXRCdXR0b25DbGljayhkYXRhKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgLy8gcmVhZCB0aGUgaW5wdXQgdmFsdWVzIGZyb20gdGhlIG1haW4gdGhyZWFkXG4gICAgICAgIC8vIHdlIGNvdWxkIHJlZ2lzdGVyIGFuIG9uaW5wdXQgZXZlbnQgdG8gdGhpcyB2aWV3IGFzIHdlbGwgYW5kIHN0b3JlIHRoZSBjaGFuZ2VzXG4gICAgICAgIE5lby5tYWluLkRvbUFjY2Vzcy5nZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICAgIGlkICAgICAgICA6IG1lLmdldElucHV0RWxJZCgpLFxuICAgICAgICAgICAgYXR0cmlidXRlczogJ3ZhbHVlJ1xuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgbWUuZ2V0Q29udHJvbGxlcigpLnBvc3RDb21tZW50KHtcbiAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IGRhdGEudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB2ZG9tID0gbWUudmRvbTtcblxuICAgICAgICAgICAgICAgIHZkb20uY25bMF0uY25bMF0udmFsdWUgPSAnJzsgLy8gcmVzZXQgdGhlIHRleHRhcmVhIHZhbHVlXG4gICAgICAgICAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhDcmVhdGVDb21tZW50Q29tcG9uZW50KTtcblxuZXhwb3J0IHtDcmVhdGVDb21tZW50Q29tcG9uZW50IGFzIGRlZmF1bHR9OyIsImltcG9ydCBDb21wb25lbnQgIGZyb20gJy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9jb21wb25lbnQvQmFzZS5tanMnO1xuaW1wb3J0IFZEb21VdGlsICAgZnJvbSAnLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL3V0aWwvVkRvbS5tanMnO1xuaW1wb3J0IFZOb2RlVXRpbCAgZnJvbSAnLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL3V0aWwvVk5vZGUubWpzJztcbmltcG9ydCBBcnRpY2xlQXBpIGZyb20gJy4uLy4uL2FwaS9BcnRpY2xlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIFJlYWxXb3JsZC52aWV3LmFydGljbGUuQ3JlYXRlQ29tcG9uZW50XG4gKiBAZXh0ZW5kcyBOZW8uY29tcG9uZW50LkJhc2VcbiAqL1xuY2xhc3MgQ3JlYXRlQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nUmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5DcmVhdGVDb21wb25lbnQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ1JlYWxXb3JsZC52aWV3LmFydGljbGUuQ3JlYXRlQ29tcG9uZW50JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gYm9keV89JydcbiAgICAgICAgICovXG4gICAgICAgIGJvZHlfOiAnJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBjbHM9WydlZGl0b3ItcGFnZSddXG4gICAgICAgICAqL1xuICAgICAgICBjbHM6IFsnZWRpdG9yLXBhZ2UnXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdFtdfSBlcnJvcnNfPVtdXG4gICAgICAgICAqL1xuICAgICAgICBlcnJvcnNfOiBbXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gZGVzY3JpcHRpb25fPScnXG4gICAgICAgICAqL1xuICAgICAgICBkZXNjcmlwdGlvbl86ICcnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IHNsdWc9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgc2x1ZzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSB0YWdMaXN0Xz1bXVxuICAgICAgICAgKi9cbiAgICAgICAgdGFnTGlzdF86IFtdLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSB0aXRsZV89JydcbiAgICAgICAgICovXG4gICAgICAgIHRpdGxlXzogJycsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IF92ZG9tXG4gICAgICAgICAqL1xuICAgICAgICBfdmRvbToge1xuICAgICAgICAgICAgY246IFt7XG4gICAgICAgICAgICAgICAgY2xzOiBbJ2NvbnRhaW5lcicsICdwYWdlJ10sXG4gICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICBjbHM6IFsncm93J10sXG4gICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWydjb2wtbWQtMTAnLCAnb2Zmc2V0LW1kLTEnLCAnY29sLXhzLTEyJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ3VsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiAnZXJyb3JzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ2Vycm9yLW1lc3NhZ2VzJ11cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdmb3JtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2ZpZWxkc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnZmllbGRzZXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2Zvcm0tZ3JvdXAnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgICAgICAgIDogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgICAgICAgIDogWydmb3JtLWNvbnRyb2wnLCAnZm9ybS1jb250cm9sLWxnJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSAgICAgICA6ICd0aXRsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyAgICAgICA6ICd0aXRsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdBcnRpY2xlIFRpdGxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlICAgICAgIDogJ3RleHQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdmaWVsZHNldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHM6IFsnZm9ybS1ncm91cCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyAgICAgICAgOiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNscyAgICAgICAgOiBbJ2Zvcm0tY29udHJvbCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgICAgICAgOiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgICAgICAgOiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnV2hhdFxcJ3MgdGhpcyBhcnRpY2xlIGFib3V0PycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSAgICAgICA6ICd0ZXh0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnZmllbGRzZXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2Zvcm0tZ3JvdXAnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgICAgICAgIDogJ3RleHRhcmVhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgICAgICAgIDogWydmb3JtLWNvbnRyb2wnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lICAgICAgIDogJ2JvZHknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgICAgICAgOiAnYm9keScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdXcml0ZSB5b3VyIGFydGljbGUgKGluIG1hcmtkb3duKScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cyAgICAgICA6IDhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2ZpZWxkc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWydmb3JtLWdyb3VwJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnICAgICAgICA6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzICAgICAgICA6IFsnZm9ybS1jb250cm9sJywgJ2ZpZWxkLXRhZ3MnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lICAgICAgIDogJ3RhZ3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgICAgICAgOiAndGFncycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdFbnRlciB0YWdzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlICAgICAgIDogJ3RleHQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWyd0YWctbGlzdCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6ICd0YWctbGlzdCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA6ICdidXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWydidG4nLCAnYnRuLWxnJywgJ2J0bi1wcmltYXJ5JywgJ3B1bGwteHMtcmlnaHQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6ICdQdWJsaXNoIEFydGljbGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicgLy8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgc3VibWl0IHR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKiBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBsZXQgbWUgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGRvbUxpc3RlbmVycyA9IG1lLmRvbUxpc3RlbmVycztcblxuICAgICAgICBkb21MaXN0ZW5lcnMucHVzaCh7XG4gICAgICAgICAgICBjbGljazoge1xuICAgICAgICAgICAgICAgIGZuICAgICAgOiBtZS5vblN1Ym1pdEJ1dHRvbkNsaWNrLFxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiAnLmJ0bi1wcmltYXJ5JyxcbiAgICAgICAgICAgICAgICBzY29wZSAgIDogbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2xpY2s6IHtcbiAgICAgICAgICAgICAgICBmbiAgICAgIDogbWUub25UYWdDbG9zZSxcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogJy5pb24tY2xvc2Utcm91bmQnLFxuICAgICAgICAgICAgICAgIHNjb3BlICAgOiBtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXlkb3duOiB7XG4gICAgICAgICAgICAgICAgZm4gICAgICA6IG1lLm9uRmllbGRUYWdzS2V5RG93bixcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogJy5maWVsZC10YWdzJyxcbiAgICAgICAgICAgICAgICBzY29wZSAgIDogbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUuZG9tTGlzdGVuZXJzID0gZG9tTGlzdGVuZXJzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgYm9keSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRCb2R5KHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgdmRvbSA9IHRoaXMudmRvbTtcblxuICAgICAgICBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ2JvZHknKS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgZGVzY3JpcHRpb24gY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0RGVzY3JpcHRpb24odmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCB2ZG9tID0gdGhpcy52ZG9tO1xuXG4gICAgICAgIFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnZGVzY3JpcHRpb24nKS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgZXJyb3JzIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3RbXX0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRFcnJvcnModmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tLFxuICAgICAgICAgICAgbGlzdCA9IFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnZXJyb3JzJyk7XG5cbiAgICAgICAgbGlzdC5jbiA9IFtdO1xuXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHZhbHVlIHx8IHt9KS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgIGxpc3QuY24ucHVzaCh7XG4gICAgICAgICAgICAgICAgdGFnIDogJ2xpJyxcbiAgICAgICAgICAgICAgICBodG1sOiBrZXkgKyAnICcgKyB2YWx1ZS5qb2luKCcgYW5kICcpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSB0YWdMaXN0IGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIFJlbmRlciB0YWcgbGlzdCBhbmQgcmVzZXQgdGFnIGZpZWxkIHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmdbXX0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBvbGRWYWx1ZVxuICAgICAqL1xuICAgIGFmdGVyU2V0VGFnTGlzdCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gICAgID0gbWUudmRvbSxcbiAgICAgICAgICAgIGxpc3QgICAgID0gVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICd0YWctbGlzdCcpLFxuICAgICAgICAgICAgdGFnRmllbGQgPSBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ3RhZ3MnKTtcblxuICAgICAgICBsaXN0LmNuICAgICAgICA9IFtdO1xuICAgICAgICB0YWdGaWVsZC52YWx1ZSA9IG51bGw7IC8vIFRPRE8gUmVzZXQgdGFnIGZpZWxkIHZhbHVlIHByb3Blcmx5XG5cbiAgICAgICAgT2JqZWN0LmVudHJpZXModmFsdWUgfHwge30pLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgbGlzdC5jbi5wdXNoKHtcbiAgICAgICAgICAgICAgICB0YWc6ICdzcGFuJyxcbiAgICAgICAgICAgICAgICBjbHM6IFsndGFnLWRlZmF1bHQgdGFnLXBpbGwnXSxcbiAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRhZyAgICAgICAgIDogJ2knLFxuICAgICAgICAgICAgICAgICAgICBjbHMgICAgICAgICA6IFsnaW9uLWNsb3NlLXJvdW5kJ10sXG4gICAgICAgICAgICAgICAgICAgICdkYXRhLXZhbHVlJzogdmFsdWUsXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB2dHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICBodG1sIDogdmFsdWVcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgdGl0bGUgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0VGl0bGUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCB2ZG9tID0gdGhpcy52ZG9tO1xuXG4gICAgICAgIFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAndGl0bGUnKS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIG9uIGZpZWxkIHRhZ3Mga2V5IGRvd24gZW50ZXIgYWRkIHRhZyB0byB0YWcgbGlzdFxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqL1xuICAgIG9uRmllbGRUYWdzS2V5RG93bihldmVudCkge1xuICAgICAgICBjb25zdCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgTmVvLm1haW4uRG9tQWNjZXNzLmdldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgICAgIGlkICAgICAgICA6IGV2ZW50LnRhcmdldC5pZCxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiAndmFsdWUnXG4gICAgICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIFZOb2RlVXRpbC5maW5kQ2hpbGRWbm9kZShtZS52bm9kZSwge2NsYXNzTmFtZTogJ2ZpZWxkLXRhZ3MnfSkudm5vZGUuYXR0cmlidXRlcy52YWx1ZSA9IGRhdGEudmFsdWU7XG4gICAgICAgICAgICAgICAgbWUudGFnTGlzdCA9IFsuLi5tZS5fdGFnTGlzdCwgZGF0YS52YWx1ZV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldCB0aGUgZm9ybSBkYXRhIGFuZCBwb3N0IHRoZSBhcnRpY2xlIHZpYSBhcGlcbiAgICAgKi9cbiAgICBvblN1Ym1pdEJ1dHRvbkNsaWNrKCkge1xuICAgICAgICBsZXQgbWUgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSAgICAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgYm9keSAgICAgICAgPSBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ2JvZHknKSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdkZXNjcmlwdGlvbicpLFxuICAgICAgICAgICAgdGl0bGUgICAgICAgPSBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ3RpdGxlJyksXG4gICAgICAgICAgICBpZHMgICAgICAgICA9IFtcbiAgICAgICAgICAgICAgICB0aXRsZS5pZCxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbi5pZCxcbiAgICAgICAgICAgICAgICBib2R5LmlkXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgIE5lby5tYWluLkRvbUFjY2Vzcy5nZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICAgIGlkICAgICAgICA6IGlkcyxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6ICd2YWx1ZSdcbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIEFydGljbGVBcGlbbWUuc2x1ZyA/ICdwdXQnIDogJ3Bvc3QnXSh7XG4gICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICBcImFydGljbGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiICAgICAgOiBkYXRhWzBdLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBkYXRhWzFdLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib2R5XCIgICAgICAgOiBkYXRhWzJdLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWdMaXN0XCIgICAgOiBtZS50YWdMaXN0XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBzbHVnOiBtZS5zbHVnXG4gICAgICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9ycyA9IGRhdGEuanNvbi5lcnJvcnM7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lLmVycm9ycyA9IGVycm9ycztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBOZW8uTWFpbi5zZXRSb3V0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJy9hcnRpY2xlLycgKyBkYXRhLmpzb24uYXJ0aWNsZS5zbHVnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgY2xpY2tlZCB0YWcgZnJvbSBsaXN0XG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICovXG4gICAgb25UYWdDbG9zZShldmVudCkge1xuICAgICAgICB0aGlzLnRhZ0xpc3QgPSB0aGlzLnRhZ0xpc3QuZmlsdGVyKGUgPT4gZSAhPT0gZXZlbnQudGFyZ2V0LmRhdGEudmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgdmFsdWUgb2YgYWxsIGZpZWxkc1xuICAgICAqL1xuICAgIHJlc2V0Rm9ybSgpIHtcbiAgICAgICAgdGhpcy5zZXQoe1xuICAgICAgICAgICAgYm9keSAgICAgICA6ICcnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgICAgc2x1ZyAgICAgICA6IG51bGwsXG4gICAgICAgICAgICB0YWdMaXN0ICAgIDogW10sXG4gICAgICAgICAgICB0aXRsZSAgICAgIDogJydcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhDcmVhdGVDb21wb25lbnQpO1xuXG5leHBvcnQge0NyZWF0ZUNvbXBvbmVudCBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9jb21wb25lbnQvQmFzZS5tanMnO1xuaW1wb3J0IE5lb0FycmF5ICBmcm9tICcuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdXRpbC9BcnJheS5tanMnO1xuaW1wb3J0IFZEb21VdGlsICBmcm9tICcuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdXRpbC9WRG9tLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIFJlYWxXb3JsZC52aWV3LmFydGljbGUuUHJldmlld0NvbXBvbmVudFxuICogQGV4dGVuZHMgTmVvLmNvbXBvbmVudC5CYXNlXG4gKi9cbmNsYXNzIFByZXZpZXdDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdSZWFsV29ybGQudmlldy5hcnRpY2xlLlByZXZpZXdDb21wb25lbnQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ1JlYWxXb3JsZC52aWV3LmFydGljbGUuUHJldmlld0NvbXBvbmVudCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gYXV0aG9yXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBhdXRob3JfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ2FydGljbGUtcHJldmlldyddXG4gICAgICAgICAqL1xuICAgICAgICBjbHM6IFsnYXJ0aWNsZS1wcmV2aWV3J10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJU08gODYwMSB0aW1lc3RhbXBcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IGNyZWF0ZWRBdF89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgY3JlYXRlZEF0XzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBkZXNjcmlwdGlvbl89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgZGVzY3JpcHRpb25fOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gZmF2b3JpdGVkXz1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgZmF2b3JpdGVkXzogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8bnVsbH0gZmF2b3JpdGVzQ291bnRfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGZhdm9yaXRlc0NvdW50XzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBzbHVnXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBzbHVnXzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0FycmF5fG51bGx9IHRhZ0xpc3RfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHRhZ0xpc3RfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IHRpdGxlXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICB0aXRsZV86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gdXNlckltYWdlXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICB1c2VySW1hZ2VfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBfdmRvbVxuICAgICAgICAgKi9cbiAgICAgICAgX3Zkb206IHtcbiAgICAgICAgICAgIGNuOiBbe1xuICAgICAgICAgICAgICAgIGNsczogWydhcnRpY2xlLW1ldGEnXSxcbiAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRhZyA6ICdhJyxcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogJ3VzZXJJbWFnZUxpbmsnLFxuICAgICAgICAgICAgICAgICAgICBjbiAgOiBbe3RhZzogJ2ltZyd9XVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2luZm8nXSxcbiAgICAgICAgICAgICAgICAgICAgY24gOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGFnIDogJ2EnLCAgICBjbHMgOiBbJ2F1dGhvciddLCBmbGFnOiAnYXV0aG9yJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGFnIDogJ3NwYW4nLCBjbHMgOiBbJ2RhdGUnXSwgICBmbGFnOiAnY3JlYXRlZEF0J31cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdGFnOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2J0bicsICdidG4tc20nLCAncHVsbC14cy1yaWdodCddLFxuICAgICAgICAgICAgICAgICAgICBjbiA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0YWcgIDogJ2knLCAgICBjbHMgOiBbJ2lvbi1oZWFydCddfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt2dHlwZTogJ3RleHQnLCBmbGFnOiAnZmF2b3JpdGVzQ291bnQnfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0YWcgOiAnYScsXG4gICAgICAgICAgICAgICAgY2xzIDogWydwcmV2aWV3LWxpbmsnXSxcbiAgICAgICAgICAgICAgICBmbGFnOiAncHJldmlldy1saW5rJyxcbiAgICAgICAgICAgICAgICBjbiAgOiBbXG4gICAgICAgICAgICAgICAgICAgIHt0YWcgOiAnaDEnLCAgIGZsYWc6ICd0aXRsZSd9LFxuICAgICAgICAgICAgICAgICAgICB7dGFnIDogJ3AnLCAgICBmbGFnOiAnZGVzY3JpcHRpb24nfSxcbiAgICAgICAgICAgICAgICAgICAge3RhZyA6ICdzcGFuJywgaHRtbDogJ1JlYWQgbW9yZS4uLid9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBsZXQgbWUgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGRvbUxpc3RlbmVycyA9IG1lLmRvbUxpc3RlbmVycztcblxuICAgICAgICBkb21MaXN0ZW5lcnMucHVzaCh7XG4gICAgICAgICAgICBjbGljazoge1xuICAgICAgICAgICAgICAgIGZuICAgICAgOiBtZS5vbkZhdm9yaXRlQnV0dG9uQ2xpY2ssXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6ICcucHVsbC14cy1yaWdodCcsXG4gICAgICAgICAgICAgICAgc2NvcGUgICA6IG1lXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lLmRvbUxpc3RlbmVycyA9IGRvbUxpc3RlbmVycztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGF1dGhvciBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRBdXRob3IodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCB2ZG9tID0gdGhpcy52ZG9tLFxuICAgICAgICAgICAgbm9kZSA9IFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnYXV0aG9yJyksXG4gICAgICAgICAgICBocmVmID0gJyMvcHJvZmlsZS8nICsgdmFsdWU7XG5cbiAgICAgICAgbm9kZS5ocmVmID0gaHJlZjtcbiAgICAgICAgbm9kZS5odG1sID0gdmFsdWU7XG5cbiAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICd1c2VySW1hZ2VMaW5rJykuaHJlZiA9IGhyZWY7XG5cbiAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGNyZWF0ZWRBdCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRDcmVhdGVkQXQodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCB2ZG9tID0gdGhpcy52ZG9tO1xuXG4gICAgICAgIFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnY3JlYXRlZEF0JykuaHRtbCA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KCdlbi1VUycsIHtcbiAgICAgICAgICAgIGRheSAgOiAnbnVtZXJpYycsXG4gICAgICAgICAgICBtb250aDogJ2xvbmcnLFxuICAgICAgICAgICAgeWVhciA6ICdudW1lcmljJ1xuICAgICAgICB9KS5mb3JtYXQobmV3IERhdGUodmFsdWUpKTtcblxuICAgICAgICB0aGlzLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgZGVzY3JpcHRpb24gY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0RGVzY3JpcHRpb24odmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCB2ZG9tID0gdGhpcy52ZG9tO1xuXG4gICAgICAgIFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnZGVzY3JpcHRpb24nKS5odG1sID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBmYXZvcml0ZWQgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRGYXZvcml0ZWQodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSAgID0gbWUudmRvbSxcbiAgICAgICAgICAgIGJ1dHRvbiA9IHZkb20uY25bMF0uY25bMl07XG5cbiAgICAgICAgTmVvQXJyYXkuYWRkKGJ1dHRvbi5jbHMsIHZhbHVlID8gJ2J0bi1wcmltYXJ5JyA6ICdidG4tb3V0bGluZS1wcmltYXJ5Jyk7XG4gICAgICAgIE5lb0FycmF5LnJlbW92ZShidXR0b24uY2xzLCB2YWx1ZSA/ICdidG4tb3V0bGluZS1wcmltYXJ5JyA6ICdidG4tcHJpbWFyeScpO1xuXG4gICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuXG4gICAgICAgIC8vIGlnbm9yZSB0aGUgaW5pdGlhbCBzZXR0ZXIgY2FsbFxuICAgICAgICBpZiAoTmVvLmlzQm9vbGVhbihvbGRWYWx1ZSkpIHtcbiAgICAgICAgICAgIG1lLmdldENvbnRyb2xsZXIoKS5mYXZvcml0ZUFydGljbGUobWUuc2x1ZywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBmYXZvcml0ZXNDb3VudCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRGYXZvcml0ZXNDb3VudCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG5cbiAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdmYXZvcml0ZXNDb3VudCcpLmh0bWwgPSAnICcgKyB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHNsdWcgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0U2x1Zyh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG5cbiAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdwcmV2aWV3LWxpbmsnKS5ocmVmID0gJyMvYXJ0aWNsZS8nICsgdmFsdWU7XG4gICAgICAgIHRoaXMudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSB0YWdMaXN0IGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlXG4gICAgICogQHBhcmFtIHtBcnJheX0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRUYWdMaXN0KHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tID0gbWUudmRvbSxcbiAgICAgICAgICAgIHRhZ0xpc3Q7XG5cbiAgICAgICAgLy8gcmVtb3ZlIG9sZCB0YWdzIGlmIGV4aXN0c1xuICAgICAgICBpZiAodmRvbS5jblsxXS5jblszXSkge1xuICAgICAgICAgICAgdmRvbS5jblsxXS5jbi5wb3AoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0YWdMaXN0ID0ge1xuICAgICAgICAgICAgICAgIHRhZzogJ3VsJyxcbiAgICAgICAgICAgICAgICBjbHM6IFsndGFnLWxpc3QnXSxcbiAgICAgICAgICAgICAgICBjbiA6IFtdXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIHRhZ0xpc3QuY24ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRhZyA6ICdsaScsXG4gICAgICAgICAgICAgICAgICAgIGNscyA6IFsndGFnLWRlZmF1bHQnLCAndGFnLXBpbGwnLCAndGFnLW91dGxpbmUnXSxcbiAgICAgICAgICAgICAgICAgICAgaHRtbDogaXRlbVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmRvbS5jblsxXS5jbi5wdXNoKHRhZ0xpc3QpO1xuXG4gICAgICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgdGl0bGUgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0VGl0bGUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCB2ZG9tID0gdGhpcy52ZG9tO1xuXG4gICAgICAgIFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAndGl0bGUnKS5odG1sID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSB1c2VySW1hZ2UgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0VXNlckltYWdlKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgdmRvbSA9IHRoaXMudmRvbTtcblxuICAgICAgICBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ3VzZXJJbWFnZUxpbmsnKS5jblswXS5zcmMgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25GYXZvcml0ZUJ1dHRvbkNsaWNrKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBmYXZvcml0ZWQgPSAhbWUuZmF2b3JpdGVkO1xuXG4gICAgICAgIG1lLnNldCh7XG4gICAgICAgICAgICBmYXZvcml0ZWQgICAgIDogZmF2b3JpdGVkLFxuICAgICAgICAgICAgZmF2b3JpdGVzQ291bnQ6IGZhdm9yaXRlZCA/IChtZS5mYXZvcml0ZXNDb3VudCArIDEpIDogKG1lLmZhdm9yaXRlc0NvdW50IC0gMSlcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhQcmV2aWV3Q29tcG9uZW50KTtcblxuZXhwb3J0IHtQcmV2aWV3Q29tcG9uZW50IGFzIGRlZmF1bHR9OyIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbXBvbmVudC9CYXNlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIFJlYWxXb3JsZC52aWV3LmFydGljbGUuVGFnTGlzdENvbXBvbmVudFxuICogQGV4dGVuZHMgTmVvLmNvbXBvbmVudC5CYXNlXG4gKi9cbmNsYXNzIFRhZ0xpc3RDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBnZXRTdGF0aWNDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRydWUgYXV0b21hdGljYWxseSBhcHBsaWVzIHRoZSBjb3JlLk9ic2VydmFibGUgbWl4aW5cbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gb2JzZXJ2YWJsZT10cnVlXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIG9ic2VydmFibGU6IHRydWVcbiAgICB9fVxuXG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J1JlYWxXb3JsZC52aWV3LmFydGljbGUuVGFnTGlzdENvbXBvbmVudCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnUmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5UYWdMaXN0Q29tcG9uZW50JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBhY3RpdmVUYWdfXG4gICAgICAgICAqL1xuICAgICAgICBhY3RpdmVUYWdfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ2NvbC1tZC0zJ11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWydjb2wtbWQtMyddLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IHRhZ3NfPVtdXG4gICAgICAgICAqL1xuICAgICAgICB0YWdzXzogW10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IF92ZG9tXG4gICAgICAgICAqL1xuICAgICAgICBfdmRvbToge1xuICAgICAgICAgICAgY246IFt7XG4gICAgICAgICAgICAgICAgY2xzOiBbJ3NpZGViYXInXSxcbiAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRhZyA6ICdwJyxcbiAgICAgICAgICAgICAgICAgICAgaHRtbDogJ1BvcHVsYXIgVGFncydcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGNsczogWyd0YWctbGlzdCddXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgTmVvLm1haW4uRG9tRXZlbnRzLnJlZ2lzdGVyUHJldmVudERlZmF1bHRUYXJnZXRzKHtcbiAgICAgICAgICAgIG5hbWU6ICdjbGljaycsXG4gICAgICAgICAgICBjbHMgOiAndGFnLXBpbGwnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBtZSAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgZG9tTGlzdGVuZXJzID0gbWUuZG9tTGlzdGVuZXJzO1xuXG4gICAgICAgIGRvbUxpc3RlbmVycy5wdXNoKHtcbiAgICAgICAgICAgIGNsaWNrOiB7XG4gICAgICAgICAgICAgICAgZm4gICAgICA6IG1lLm9uVGFnTGlua0NsaWNrLFxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiAnLnRhZy1waWxsJyxcbiAgICAgICAgICAgICAgICBzY29wZSAgIDogbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUuZG9tTGlzdGVuZXJzID0gZG9tTGlzdGVuZXJzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgYWN0aXZlVGFnIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nW118bnVsbH0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfG51bGx9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0QWN0aXZlVGFnKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAob2xkVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5maXJlKCd0YWdDaGFuZ2UnLCB7XG4gICAgICAgICAgICAgICAgb2xkVmFsdWU6IG9sZFZhbHVlLFxuICAgICAgICAgICAgICAgIHZhbHVlICAgOiB2YWx1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHRhZ3MgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmdbXXxudWxsfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nW118bnVsbH0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRUYWdzKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tID0gbWUudmRvbTtcblxuICAgICAgICB2ZG9tLmNuWzBdLmNuWzFdLmNuID0gW107XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIHZkb20uY25bMF0uY25bMV0uY24ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRhZyA6ICdhJyxcbiAgICAgICAgICAgICAgICAgICAgY2xzIDogWyd0YWctcGlsbCcsICd0YWctZGVmYXVsdCddLFxuICAgICAgICAgICAgICAgICAgICBocmVmOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgaHRtbDogaXRlbSxcbiAgICAgICAgICAgICAgICAgICAgaWQgIDogbWUuZ2V0VGFnVmRvbUlkKGl0ZW0pXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBub2RlSWRcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldFRhZ0lkKG5vZGVJZCkge1xuICAgICAgICByZXR1cm4gbm9kZUlkLnNwbGl0KCdfXycpWzFdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldFRhZ1Zkb21JZChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkICsgJ19fJyArIG5hbWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uVGFnTGlua0NsaWNrKGRhdGEpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVUYWcgPSB0aGlzLmdldFRhZ0lkKGRhdGEucGF0aFswXS5pZCk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhUYWdMaXN0Q29tcG9uZW50KTtcblxuZXhwb3J0IHtUYWdMaXN0Q29tcG9uZW50IGFzIGRlZmF1bHR9OyIsImltcG9ydCBDb21wb25lbnQgICAgICAgIGZyb20gJy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9jb21wb25lbnQvQmFzZS5tanMnO1xuaW1wb3J0IE5lb0FycmF5ICAgICAgICAgZnJvbSAnLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL3V0aWwvQXJyYXkubWpzJztcbmltcG9ydCBQcmV2aWV3Q29tcG9uZW50IGZyb20gJy4uL2FydGljbGUvUHJldmlld0NvbXBvbmVudC5tanMnO1xuaW1wb3J0IFZEb21VdGlsICAgICAgICAgZnJvbSAnLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL3V0aWwvVkRvbS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBSZWFsV29ybGQudmlldy51c2VyLlByb2ZpbGVDb21wb25lbnRcbiAqIEBleHRlbmRzIE5lby5jb21wb25lbnQuQmFzZVxuICovXG5jbGFzcyBQcm9maWxlQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nUmVhbFdvcmxkLnZpZXcudXNlci5Qcm9maWxlQ29tcG9uZW50J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdSZWFsV29ybGQudmlldy51c2VyLlByb2ZpbGVDb21wb25lbnQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0W118bnVsbH0gYXJ0aWNsZVByZXZpZXdzXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBhcnRpY2xlUHJldmlld3NfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IGJpb189bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgYmlvXzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBjbHM9Wydwcm9maWxlLXBhZ2UnXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ3Byb2ZpbGUtcGFnZSddLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBjb3VudEFydGljbGVzXz01XG4gICAgICAgICAqL1xuICAgICAgICBjb3VudEFydGljbGVzXzogNSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW58bnVsbH0gZm9sbG93aW5nXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBmb2xsb3dpbmdfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IGltYWdlXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBpbWFnZV86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBteVByb2ZpbGVfPWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBteVByb2ZpbGVfOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1JlYWxXb3JsZC52aWV3LmFydGljbGUuUHJldmlld0NvbXBvbmVudFtdfSBwcmV2aWV3Q29tcG9uZW50cz1bXVxuICAgICAgICAgKi9cbiAgICAgICAgcHJldmlld0NvbXBvbmVudHM6IFtdLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IHVzZXJuYW1lXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICB1c2VybmFtZV86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IF92ZG9tXG4gICAgICAgICAqL1xuICAgICAgICBfdmRvbToge1xuICAgICAgICAgICAgY246IFt7XG4gICAgICAgICAgICAgICAgY2xzOiBbJ3VzZXItaW5mbyddLFxuICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2NvbnRhaW5lciddLFxuICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbHM6IFsncm93J10sXG4gICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2NvbC14cy0xMicsICdjb2wtbWQtMTAnLCAnb2Zmc2V0LW1kLTEnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA6ICdpbWcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ3VzZXItaW1nJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6ICdpbWFnZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA6ICdoNCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6ICd1c2VybmFtZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA6ICdwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogJ2JpbydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA6ICdidXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ2J0bicsICdidG4tc20nLCAnYnRuLW91dGxpbmUtc2Vjb25kYXJ5JywgJ2FjdGlvbi1idG4nLCAnZm9sbG93LWJ1dHRvbiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiAnZm9sbG93aW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2knLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2lvbi1wbHVzLXJvdW5kJ11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR5cGU6ICd0ZXh0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHlwZTogJ3RleHQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgICAgICA6ICdhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzICAgICAgOiBbJ2J0bicsICdidG4tc20nLCAnYnRuLW91dGxpbmUtc2Vjb25kYXJ5JywgJ2FjdGlvbi1idG4nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyAgICAgOiAnZWRpdC1wcm9maWxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZiAgICAgOiAnIy9zZXR0aW5ncycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZURvbTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY246IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWydpb24tZ2Vhci1hJ11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgOiAnIEVkaXQgUHJvZmlsZSBTZXR0aW5ncydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGNsczogWydjb250YWluZXInXSxcbiAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgIGNsczogWydyb3cnXSxcbiAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xzICA6IFsnY29sLXhzLTEyJywgJ2NvbC1tZC0xMCcsICdvZmZzZXQtbWQtMSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogJ2ZlZWQtY29udGFpbmVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNuICA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2FydGljbGVzLXRvZ2dsZSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ3VsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWyduYXYnLCAnbmF2LXBpbGxzJywgJ291dGxpbmUtYWN0aXZlJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6ICdmZWVkLWhlYWRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuICA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdsaScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHM6IFsnbmF2LWl0ZW0nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHM6IFsnbmF2LWxpbmsnLCAncHJldmVudC1jbGljaycsICdhY3RpdmUnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiAnTXkgQXJ0aWNsZXMnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdsaScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHM6IFsnbmF2LWl0ZW0nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHM6IFsnbmF2LWxpbmsnLCAncHJldmVudC1jbGljayddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6ICdGYXZvcml0ZWQgQXJ0aWNsZXMnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIE5lby5tYWluLkRvbUV2ZW50cy5yZWdpc3RlclByZXZlbnREZWZhdWx0VGFyZ2V0cyh7XG4gICAgICAgICAgICBuYW1lOiAnY2xpY2snLFxuICAgICAgICAgICAgY2xzIDogJ3ByZXZlbnQtY2xpY2snXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBtZSAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgZG9tTGlzdGVuZXJzID0gbWUuZG9tTGlzdGVuZXJzO1xuXG4gICAgICAgIGRvbUxpc3RlbmVycy5wdXNoKFxuICAgICAgICAgICAge2NsaWNrOiB7Zm46IG1lLm9uRm9sbG93QnV0dG9uQ2xpY2ssIGRlbGVnYXRlOiAnLmZvbGxvdy1idXR0b24nLCBzY29wZTogbWV9fSxcbiAgICAgICAgICAgIHtjbGljazoge2ZuOiBtZS5vbk5hdkxpbmtDbGljaywgICAgICBkZWxlZ2F0ZTogJy5uYXYtbGluaycsICAgICAgc2NvcGU6IG1lfX1cbiAgICAgICAgKTtcblxuICAgICAgICBtZS5kb21MaXN0ZW5lcnMgPSBkb21MaXN0ZW5lcnM7XG5cbiAgICAgICAgbWUuZ2V0Q29udHJvbGxlcigpLm9uKHtcbiAgICAgICAgICAgIGFmdGVyU2V0Q3VycmVudFVzZXI6IG1lLm9uQ3VycmVudFVzZXJDaGFuZ2UsXG4gICAgICAgICAgICBzY29wZSAgICAgICAgICAgICAgOiBtZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGFydGljbGVQcmV2aWV3cyBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfG51bGx9IHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3RbXXxudWxsfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEFydGljbGVQcmV2aWV3cyh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tICAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgY29udGFpbmVyID0gVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdmZWVkLWNvbnRhaW5lcicpLFxuICAgICAgICAgICAgY29uZmlnO1xuXG4gICAgICAgIGNvbnRhaW5lci5jbiA9IFtjb250YWluZXIuY24uc2hpZnQoKV07XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgYXV0aG9yICAgICAgICA6IGl0ZW0uYXV0aG9yLnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXQgICAgIDogaXRlbS5jcmVhdGVkQXQsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uICAgOiBpdGVtLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZWQgICAgIDogaXRlbS5mYXZvcml0ZWQsXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlc0NvdW50OiBpdGVtLmZhdm9yaXRlc0NvdW50LFxuICAgICAgICAgICAgICAgICAgICBzbHVnICAgICAgICAgIDogaXRlbS5zbHVnLFxuICAgICAgICAgICAgICAgICAgICB0YWdMaXN0ICAgICAgIDogaXRlbS50YWdMaXN0LFxuICAgICAgICAgICAgICAgICAgICB0aXRsZSAgICAgICAgIDogaXRlbS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgdXNlckltYWdlICAgICA6IGl0ZW0uYXV0aG9yLmltYWdlXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmICghbWUucHJldmlld0NvbXBvbmVudHNbaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lLnByZXZpZXdDb21wb25lbnRzW2luZGV4XSA9IE5lby5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlICA6IFByZXZpZXdDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRJZDogbWUuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5jb25maWdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbWUucHJldmlld0NvbXBvbmVudHNbaW5kZXhdLnNldChjb25maWcsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jbi5wdXNoKG1lLnByZXZpZXdDb21wb25lbnRzW2luZGV4XS52ZG9tKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBiaW8gY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0QmlvKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGxldCB2ZG9tID0gdGhpcy52ZG9tO1xuXG4gICAgICAgICAgICBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ2JpbycpLmh0bWwgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudmRvbSA9IHZkb207XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGZvbGxvd2luZyBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEZvbGxvd2luZyh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKE5lby5pc0Jvb2xlYW4odmFsdWUpKSB7XG4gICAgICAgICAgICBsZXQgdmRvbSA9IHRoaXMudmRvbSxcbiAgICAgICAgICAgICAgICBub2RlID0gVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdmb2xsb3dpbmcnKTtcblxuICAgICAgICAgICAgLy8gdG9iaXU6IGRpZCBub3Qgc2VlIHRoaXMgb25lIGluIHRoZSBzcGVjcywgYnV0IHRoZSByZWFjdCAmIHZ1ZSBhcHAgZG8gaXRcbiAgICAgICAgICAgIE5lb0FycmF5LnJlbW92ZShub2RlLmNscywgdmFsdWUgPyAnYnRuLW91dGxpbmUtc2Vjb25kYXJ5JyA6ICdidG4tc2Vjb25kYXJ5Jyk7XG4gICAgICAgICAgICBOZW9BcnJheS5hZGQobm9kZS5jbHMsIHZhbHVlID8gJ2J0bi1zZWNvbmRhcnknIDogJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScpO1xuXG4gICAgICAgICAgICBub2RlLmNuWzBdLmNscyAgPSBbdmFsdWUgPyAnaW9uLW1pbnVzLXJvdW5kJyA6ICdpb24tcGx1cy1yb3VuZCddO1xuICAgICAgICAgICAgbm9kZS5jblsxXS5odG1sID0gdmFsdWUgPyAnIFVuZm9sbG93ICcgOiAnIEZvbGxvdyAnO1xuICAgICAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgaW1hZ2UgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0SW1hZ2UodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCB2ZG9tID0gdGhpcy52ZG9tO1xuXG4gICAgICAgIFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnaW1hZ2UnKS5zcmMgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIG15UHJvZmlsZSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldE15UHJvZmlsZSh2YWx1ZSwgb2xkVmFsdWUpIHtjb25zb2xlLmxvZygnYWZ0ZXJTZXRNeVByb2ZpbGUnLCB2YWx1ZSk7XG4gICAgICAgIGlmIChOZW8uaXNCb29sZWFuKG9sZFZhbHVlKSkge1xuICAgICAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG5cbiAgICAgICAgICAgIFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnZWRpdC1wcm9maWxlJykucmVtb3ZlRG9tID0gIXZhbHVlO1xuICAgICAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdmb2xsb3dpbmcnKSAgIC5yZW1vdmVEb20gPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudmRvbSA9IHZkb207XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHVzZXJuYW1lIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFVzZXJuYW1lKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgdmRvbSA9IHRoaXMudmRvbTtcblxuICAgICAgICBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ2ZvbGxvd2luZycpLmNuWzJdLmh0bWwgPSB2YWx1ZTtcbiAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICd1c2VybmFtZScpLmh0bWwgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcbiAgICAgKi9cbiAgICBnZXRBcnRpY2xlcyhwYXJhbXMpIHtcbiAgICAgICAgdGhpcy5nZXRDb250cm9sbGVyKCkuZ2V0QXJ0aWNsZXMocGFyYW1zKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5hcnRpY2xlUHJldmlld3MgPSBkYXRhLmpzb24uYXJ0aWNsZXM7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlXG4gICAgICovXG4gICAgb25DdXJyZW50VXNlckNoYW5nZSh2YWx1ZSkge2NvbnNvbGUubG9nKCdvbkN1cnJlbnRVc2VyQ2hhbmdlJywgdmFsdWUpO1xuICAgICAgICB0aGlzLm15UHJvZmlsZSA9IHRoaXMudXNlcm5hbWUgPT09IHZhbHVlICYmIHZhbHVlLnVzZXJuYW1lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbkZvbGxvd0J1dHRvbkNsaWNrKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBtZS5nZXRDb250cm9sbGVyKCkuZm9sbG93VXNlcihtZS51c2VybmFtZSwgIW1lLmZvbGxvd2luZykudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIG1lLmZvbGxvd2luZyA9IGRhdGEuanNvbi5wcm9maWxlLmZvbGxvd2luZztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uTmF2TGlua0NsaWNrKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSAgICAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICBlbCAgICAgICAgID0gVkRvbVV0aWwuZmluZFZkb21DaGlsZCh2ZG9tLCBkYXRhLnBhdGhbMF0uaWQpLFxuICAgICAgICAgICAgZmVlZEhlYWRlciA9IFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnZmVlZC1oZWFkZXInKSxcbiAgICAgICAgICAgIHBhcmFtcyAgICAgPSB7fTtcblxuICAgICAgICBpZiAoIWVsLnZkb20uY2xzLmluY2x1ZGVzKCdkaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICBzd2l0Y2goZWwudmRvbS5odG1sKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnRmF2b3JpdGVkIEFydGljbGVzJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVkOiBtZS51c2VybmFtZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdNeSBBcnRpY2xlcyc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhvcjogbWUudXNlcm5hbWVcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZlZWRIZWFkZXIuY24uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBOZW9BcnJheVtpdGVtLmlkID09PSBlbC5wYXJlbnROb2RlLmlkID8gJ2FkZCcgOiAncmVtb3ZlJ10oaXRlbS5jblswXS5jbHMsICdhY3RpdmUnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtZS52ZG9tID0gdmRvbTtcblxuICAgICAgICAgICAgbWUuZ2V0QXJ0aWNsZXMoe1xuICAgICAgICAgICAgICAgIC4uLnBhcmFtcyxcbiAgICAgICAgICAgICAgICBsaW1pdCA6IG1lLmNvdW50QXJ0aWNsZXMsXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ3NcbiAgICAgKi9cbiAgICB1cGRhdGUoY29uZmlncykge1xuICAgICAgICBsZXQgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdXNlcm5hbWUgPSBjb25maWdzLnVzZXJuYW1lO1xuXG4gICAgICAgIG1lLnNldCh7XG4gICAgICAgICAgICBiaW8gICAgICA6IGNvbmZpZ3MuYmlvLFxuICAgICAgICAgICAgZm9sbG93aW5nOiBjb25maWdzLmZvbGxvd2luZyxcbiAgICAgICAgICAgIGltYWdlICAgIDogY29uZmlncy5pbWFnZSxcbiAgICAgICAgICAgIG15UHJvZmlsZTogY29uZmlncy5teVByb2ZpbGUsXG4gICAgICAgICAgICB1c2VybmFtZSA6IHVzZXJuYW1lXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgbWUuZ2V0QXJ0aWNsZXMoe1xuICAgICAgICAgICAgICAgIGF1dGhvcjogdXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgbGltaXQgOiBtZS5jb3VudEFydGljbGVzLFxuICAgICAgICAgICAgICAgIG9mZnNldDogMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoUHJvZmlsZUNvbXBvbmVudCk7XG5cbmV4cG9ydCB7UHJvZmlsZUNvbXBvbmVudCBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9jb21wb25lbnQvQmFzZS5tanMnO1xuaW1wb3J0IFZEb21VdGlsICBmcm9tICcuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdXRpbC9WRG9tLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIFJlYWxXb3JsZC52aWV3LnVzZXIuU2V0dGluZ3NDb21wb25lbnRcbiAqIEBleHRlbmRzIE5lby5jb21wb25lbnQuQmFzZVxuICovXG5jbGFzcyBTZXR0aW5nc0NvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J1JlYWxXb3JsZC52aWV3LnVzZXIuU2V0dGluZ3NDb21wb25lbnQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ1JlYWxXb3JsZC52aWV3LnVzZXIuU2V0dGluZ3NDb21wb25lbnQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBiaW9fPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGJpb186IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gY2xzPVsnc2V0dGluZ3MtcGFnZSddXG4gICAgICAgICAqL1xuICAgICAgICBjbHM6IFsnc2V0dGluZ3MtcGFnZSddLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBlbWFpbF89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgZW1haWxfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0W119IGVycm9yc189W11cbiAgICAgICAgICovXG4gICAgICAgIGVycm9yc186IFtdLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBpbWFnZV89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgaW1hZ2VfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSB1c2VyTmFtZV89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgdXNlck5hbWVfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBfdmRvbVxuICAgICAgICAgKi9cbiAgICAgICAgX3Zkb206IHtcbiAgICAgICAgICAgIGNuOiBbe1xuICAgICAgICAgICAgICAgIGNsczogWydjb250YWluZXInLCAncGFnZSddLFxuICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ3JvdyddLFxuICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbHM6IFsnY29sLW1kLTYnLCAnb2Zmc2V0LW1kLTMnLCAnY29sLXhzLTEyJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2gxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ3RleHQteHMtY2VudGVyJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogJ1lvdXIgU2V0dGluZ3MnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnICAgICAgOiAndWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNscyAgICAgIDogWydlcnJvci1tZXNzYWdlcyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgICAgIDogJ2Vycm9ycycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRG9tOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnZm9ybScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdmaWVsZHNldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2ZpZWxkc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWydmb3JtLWdyb3VwJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnICAgICAgICA6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzICAgICAgICA6IFsnZm9ybS1jb250cm9sJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyAgICAgICA6ICdpbWFnZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdVUkwgb2YgcHJvZmlsZSBwaWN0dXJlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlICAgICAgIDogJ3RleHQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdmaWVsZHNldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHM6IFsnZm9ybS1ncm91cCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyAgICAgICAgOiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNscyAgICAgICAgOiBbJ2Zvcm0tY29udHJvbCcsICdmb3JtLWNvbnRyb2wtbGcnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnICAgICAgIDogJ3VzZXJOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1lvdXIgTmFtZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSAgICAgICA6ICd0ZXh0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnZmllbGRzZXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ2Zvcm0tZ3JvdXAnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgICAgICAgIDogJ3RleHRhcmVhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgICAgICAgIDogWydmb3JtLWNvbnRyb2wnLCAnZm9ybS1jb250cm9sLWxnJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyAgICAgICA6ICdiaW8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnU2hvcnQgYmlvIGFib3V0IHlvdScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cyAgICAgICA6IDhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2ZpZWxkc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWydmb3JtLWdyb3VwJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnICAgICAgICA6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzICAgICAgICA6IFsnZm9ybS1jb250cm9sJywgJ2Zvcm0tY29udHJvbC1sZyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgICAgICAgOiAnZW1haWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnRW1haWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgICAgICAgOiAndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2ZpZWxkc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWydmb3JtLWdyb3VwJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnICAgICAgICA6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzICAgICAgICA6IFsnZm9ybS1jb250cm9sJywgJ2Zvcm0tY29udHJvbC1sZyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgICAgICAgOiAncGFzc3dvcmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnUGFzc3dvcmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgICAgICAgOiAncGFzc3dvcmQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNscyA6IFsnYnRuJywgJ2J0bi1sZycsICdidG4tcHJpbWFyeScsICdwdWxsLXhzLXJpZ2h0J10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiAnVXBkYXRlIFNldHRpbmdzJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnaHInXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWydidG4nLCAnYnRuLW91dGxpbmUtZGFuZ2VyJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogJ09yIGNsaWNrIGhlcmUgdG8gbG9nb3V0LidcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBkb21MaXN0ZW5lcnMgPSBtZS5kb21MaXN0ZW5lcnM7XG5cbiAgICAgICAgZG9tTGlzdGVuZXJzLnB1c2goXG4gICAgICAgICAgICB7Y2xpY2s6IHtmbjogbWUub25Mb2dvdXRCdXR0b25DbGljaywgZGVsZWdhdGU6ICcuYnRuLW91dGxpbmUtZGFuZ2VyJywgc2NvcGU6IG1lfX0sXG4gICAgICAgICAgICB7Y2xpY2s6IHtmbjogbWUub25TdWJtaXRCdXR0b25DbGljaywgZGVsZWdhdGU6ICcuYnRuLXByaW1hcnknLCAgICAgICAgc2NvcGU6IG1lfX1cbiAgICAgICAgKTtcblxuICAgICAgICBtZS5kb21MaXN0ZW5lcnMgPSBkb21MaXN0ZW5lcnM7XG5cbiAgICAgICAgbWUuZ2V0Q29udHJvbGxlcigpLm9uKHtcbiAgICAgICAgICAgIGFmdGVyU2V0Q3VycmVudFVzZXI6IG1lLm9uQ3VycmVudFVzZXJDaGFuZ2UsXG4gICAgICAgICAgICBzY29wZSAgICAgICAgICAgICAgOiBtZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGJpbyBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRCaW8odmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCB2ZG9tID0gdGhpcy52ZG9tO1xuXG4gICAgICAgIFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnYmlvJykudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGVtYWlsIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEVtYWlsKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgdmRvbSA9IHRoaXMudmRvbTtcblxuICAgICAgICBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ2VtYWlsJykudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGVycm9ycyBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSB2YWx1ZT1bXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0RXJyb3JzKHZhbHVlPVtdLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tID0gbWUudmRvbSxcbiAgICAgICAgICAgIGxpc3QgPSBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ2Vycm9ycycpO1xuXG4gICAgICAgIGxpc3QuY24gICAgICAgID0gW107XG4gICAgICAgIGxpc3QucmVtb3ZlRG9tID0gdmFsdWUubGVuZ3RoID09PSAwO1xuXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHZhbHVlKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgIGxpc3QuY24ucHVzaCh7XG4gICAgICAgICAgICAgICAgdGFnIDogJ2xpJyxcbiAgICAgICAgICAgICAgICBodG1sOiBrZXkgKyAnICcgKyB2YWx1ZS5qb2luKCcgYW5kICcpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBpbWFnZSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRJbWFnZSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG5cbiAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdpbWFnZScpLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSB1c2VyTmFtZSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRVc2VyTmFtZSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG5cbiAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICd1c2VyTmFtZScpLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcbiAgICAgKi9cbiAgICBvbkN1cnJlbnRVc2VyQ2hhbmdlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoe1xuICAgICAgICAgICAgICAgIGJpbyAgICAgOiB2YWx1ZS5iaW8sXG4gICAgICAgICAgICAgICAgZW1haWwgICA6IHZhbHVlLmVtYWlsLFxuICAgICAgICAgICAgICAgIGVycm9ycyAgOiBbXSxcbiAgICAgICAgICAgICAgICBpbWFnZSAgIDogdmFsdWUuaW1hZ2UsXG4gICAgICAgICAgICAgICAgdXNlck5hbWU6IHZhbHVlLnVzZXJuYW1lXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbkxvZ291dEJ1dHRvbkNsaWNrKGRhdGEpIHtcbiAgICAgICAgdGhpcy5nZXRDb250cm9sbGVyKCkubG9nb3V0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uU3VibWl0QnV0dG9uQ2xpY2soZGF0YSkge1xuICAgICAgICBsZXQgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgYmlvICAgICAgPSBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ2JpbycpLFxuICAgICAgICAgICAgZW1haWwgICAgPSBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ2VtYWlsJyksXG4gICAgICAgICAgICBpbWFnZSAgICA9IFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnaW1hZ2UnKSxcbiAgICAgICAgICAgIHBhc3N3b3JkID0gVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdwYXNzd29yZCcpLFxuICAgICAgICAgICAgdXNlck5hbWUgPSBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ3VzZXJOYW1lJyk7XG5cbiAgICAgICAgTmVvLm1haW4uRG9tQWNjZXNzLmdldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgaWQgICAgICAgIDogW2Jpby5pZCwgZW1haWwuaWQsIGltYWdlLmlkLCBwYXNzd29yZC5pZCwgdXNlck5hbWUuaWRdLFxuICAgICAgICAgICAgYXR0cmlidXRlczogJ3ZhbHVlJ1xuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgbWUuZ2V0Q29udHJvbGxlcigpLnVwZGF0ZVNldHRpbmdzKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbyAgICAgOiBkYXRhWzBdLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWwgICA6IGRhdGFbMV0udmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZSAgIDogZGF0YVsyXS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBkYXRhWzNdLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6IGRhdGFbNF0udmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9ycyA9IGRhdGEuanNvbi5lcnJvcnM7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lLmVycm9ycyA9IGVycm9ycztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBOZW8uTWFpbi5zZXRSb3V0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJy9wcm9maWxlLycgKyBkYXRhLmpzb24udXNlci51c2VybmFtZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKFNldHRpbmdzQ29tcG9uZW50KTtcblxuZXhwb3J0IHtTZXR0aW5nc0NvbXBvbmVudCBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9jb21wb25lbnQvQmFzZS5tanMnO1xuaW1wb3J0IFZEb21VdGlsICBmcm9tICcuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdXRpbC9WRG9tLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIFJlYWxXb3JsZC52aWV3LnVzZXIuU2lnblVwQ29tcG9uZW50XG4gKiBAZXh0ZW5kcyBOZW8uY29tcG9uZW50LkJhc2VcbiAqL1xuY2xhc3MgU2lnblVwQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nUmVhbFdvcmxkLnZpZXcudXNlci5TaWduVXBDb21wb25lbnQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ1JlYWxXb3JsZC52aWV3LnVzZXIuU2lnblVwQ29tcG9uZW50JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBjbHM9WydhdXRoLXBhZ2UnXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ2F1dGgtcGFnZSddLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0W119IGVycm9yc189W11cbiAgICAgICAgICovXG4gICAgICAgIGVycm9yc186IFtdLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0W119IGZpZWxkc2V0c19cbiAgICAgICAgICovXG4gICAgICAgIGZpZWxkc2V0c186IFtcbiAgICAgICAgICAgIHtuYW1lOiAndXNlcm5hbWUnLCBwbGFjZWhvbGRlcjogJ1lvdXIgTmFtZScsIHR5cGU6ICd0ZXh0J30sXG4gICAgICAgICAgICB7bmFtZTogJ2VtYWlsJywgICAgcGxhY2Vob2xkZXI6ICdFbWFpbCcsICAgICB0eXBlOiAndGV4dCd9LFxuICAgICAgICAgICAge25hbWU6ICdwYXNzd29yZCcsIHBsYWNlaG9sZGVyOiAnUGFzc3dvcmQnLCAgdHlwZTogJ3Bhc3N3b3JkJ31cbiAgICAgICAgXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0ga2V5c1xuICAgICAgICAgKi9cbiAgICAgICAga2V5czoge1xuICAgICAgICAgICAgJ0VudGVyJzogJ29uS2V5RG93bkVudGVyJ1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBtb2RlXz0nc2lnbnVwJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBtb2RlXzogJ3NpZ251cCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IF92ZG9tXG4gICAgICAgICAqL1xuICAgICAgICBfdmRvbToge1xuICAgICAgICAgICAgY246IFt7XG4gICAgICAgICAgICAgICAgY2xzOiBbJ2NvbnRhaW5lcicsICdwYWdlJ10sXG4gICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICBjbHM6IFsncm93J10sXG4gICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWydjb2wtbWQtNicsICdvZmZzZXQtbWQtMycsICdjb2wteHMtMTInXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgOiAnaDEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNscyA6IFsndGV4dC14cy1jZW50ZXInXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ3AnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWyd0ZXh0LXhzLWNlbnRlciddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3t0YWc6ICdhJ31dXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAndWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWydlcnJvci1tZXNzYWdlcyddXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnZm9ybScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdmaWVsZHNldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA6ICdidXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogWydidG4nLCAnYnRuLWxnJywgJ2J0bi1wcmltYXJ5JywgJ3B1bGwteHMtcmlnaHQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdidXR0b24nIC8vIG92ZXJyaWRlIHRoZSBkZWZhdWx0IHN1Ym1pdCB0eXBlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBkb21MaXN0ZW5lcnMgPSBtZS5kb21MaXN0ZW5lcnM7XG5cbiAgICAgICAgZG9tTGlzdGVuZXJzLnB1c2goe1xuICAgICAgICAgICAgY2xpY2s6IHtcbiAgICAgICAgICAgICAgICBmbiAgICAgIDogbWUub25TdWJtaXRCdXR0b25DbGljayxcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogJy5idG4tcHJpbWFyeScsXG4gICAgICAgICAgICAgICAgc2NvcGUgICA6IG1lXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lLmRvbUxpc3RlbmVycyA9IGRvbUxpc3RlbmVycztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGVycm9ycyBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0RXJyb3JzKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICBsaXN0ID0gbWUuZ2V0RXJyb3JNZXNzYWdlc0xpc3QoKSxcbiAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tO1xuXG4gICAgICAgIGxpc3QuY24gPSBbXTtcblxuICAgICAgICBPYmplY3QuZW50cmllcyh2YWx1ZSB8fCB7fSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICBsaXN0LmNuLnB1c2goe1xuICAgICAgICAgICAgICAgIHRhZyA6ICdsaScsXG4gICAgICAgICAgICAgICAgaHRtbDoga2V5ICsgJyAnICsgdmFsdWUuam9pbignIGFuZCAnKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgZmllbGRzZXRzIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEZpZWxkc2V0cyh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSA9IG1lLnZkb20sXG4gICAgICAgICAgICBmb3JtID0gdmRvbS5jblswXS5jblswXS5jblswXS5jblszXTtcblxuICAgICAgICAvLyBzbGljZSgpLnJldmVyc2UoKSA9PiBpdGVyYXRlIGJhY2t3YXJkc1xuICAgICAgICB2YWx1ZS5zbGljZSgpLnJldmVyc2UoKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgZm9ybS5jblswXS5jbi51bnNoaWZ0KHtcbiAgICAgICAgICAgICAgICB0YWc6ICdmaWVsZHNldCcsXG4gICAgICAgICAgICAgICAgY2xzOiBbJ2Zvcm0tZ3JvdXAnXSxcbiAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRhZyAgICAgICAgOiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICBjbHMgICAgICAgIDogWydmb3JtLWNvbnRyb2wnLCAnZm9ybS1jb250cm9sLWxnJ10sXG4gICAgICAgICAgICAgICAgICAgIGlkICAgICAgICAgOiBtZS5nZXRJbnB1dElkKGl0ZW0ubmFtZSksXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgICAgICAgOiBpdGVtLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpdGVtLnBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgICAgICAgICB0eXBlICAgICAgIDogaXRlbS50eXBlXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIG1vZGUgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0TW9kZSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgaXNTaWdudXAgICA9IHZhbHVlID09PSAnc2lnbnVwJyxcbiAgICAgICAgICAgIHZkb20gICAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgY29udGVudERpdiA9IHZkb20uY25bMF0uY25bMF0uY25bMF07XG5cbiAgICAgICAgLy8gdmRvbSBidWxrIHVwZGF0ZVxuICAgICAgICBjb250ZW50RGl2LmNuWzBdLmh0bWwgPSBpc1NpZ251cCA/ICdTaWduIHVwJyA6ICdTaWduIGluJztcblxuICAgICAgICBjb250ZW50RGl2LmNuWzFdLmNuWzBdLmhyZWYgPSBpc1NpZ251cCA/ICcjL2xvZ2luJyA6ICcjL3JlZ2lzdGVyJztcbiAgICAgICAgY29udGVudERpdi5jblsxXS5jblswXS5odG1sID0gaXNTaWdudXAgPyAnSGF2ZSBhbiBhY2NvdW50PycgOiAnTmVlZCBhbiBhY2NvdW50Pyc7XG5cbiAgICAgICAgLy8gcmVtb3ZlIHRoZSB1c2VybmFtZSBmaWVsZHNldCBpZiBuZWVkZWRcbiAgICAgICAgY29udGVudERpdi5jblszXS5jblswXS5jblswXS5yZW1vdmVEb20gPSAhaXNTaWdudXA7XG5cbiAgICAgICAgLy8gc3VibWl0IGJ1dHRvbiB0ZXh0XG4gICAgICAgIGNvbnRlbnREaXYuY25bM10uY25bMF0uY25bM10uaHRtbCA9IGlzU2lnbnVwID8gJ1NpZ24gdXAnIDogJ1NpZ24gaW4nO1xuXG4gICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4YW1wbGUgZm9yIGR5bmFtaWNhbGx5IGZpbmRpbmcgdmRvbSBlbGVtZW50c1xuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IHZkb21cbiAgICAgKi9cbiAgICBnZXRFcnJvck1lc3NhZ2VzTGlzdCgpIHtcbiAgICAgICAgbGV0IGVsID0gVkRvbVV0aWwuZmluZFZkb21DaGlsZCh0aGlzLnZkb20sIHtjbHM6ICdlcnJvci1tZXNzYWdlcyd9KTtcbiAgICAgICAgcmV0dXJuIGVsICYmIGVsLnZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnB1dEVsIGlkIHVzaW5nIHRoZSB2aWV3IGlkIGFzIGEgcHJlZml4XG4gICAgICogQHJldHVybnMge1N0cmluZ30gaXRlbUlkXG4gICAgICovXG4gICAgZ2V0SW5wdXRJZChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pZCArICdfXycgKyBpZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uS2V5RG93bkVudGVyKCkge1xuICAgICAgICB0aGlzLm9uU3VibWl0QnV0dG9uQ2xpY2soKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uU3VibWl0QnV0dG9uQ2xpY2soKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXIgPSBtZS5nZXRDb250cm9sbGVyKCksXG4gICAgICAgICAgICBpc1NpZ251cCAgID0gbWUubW9kZSA9PT0gJ3NpZ251cCcsXG4gICAgICAgICAgICBpZHMgICAgICAgID0gW21lLmdldElucHV0SWQoJ2VtYWlsJyksIG1lLmdldElucHV0SWQoJ3Bhc3N3b3JkJyldLFxuICAgICAgICAgICAgdXNlckRhdGE7XG5cbiAgICAgICAgaWYgKGlzU2lnbnVwKSB7XG4gICAgICAgICAgICBpZHMucHVzaChtZS5nZXRJbnB1dElkKCd1c2VybmFtZScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlYWQgdGhlIGlucHV0IHZhbHVlcyBmcm9tIHRoZSBtYWluIHRocmVhZFxuICAgICAgICAvLyB3ZSBjb3VsZCByZWdpc3RlciBhbiBvbmlucHV0IGV2ZW50IHRvIHRoaXMgdmlldyBhcyB3ZWxsIGFuZCBzdG9yZSB0aGUgY2hhbmdlc1xuICAgICAgICBOZW8ubWFpbi5Eb21BY2Nlc3MuZ2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICBpZCAgICAgICAgOiBpZHMsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiAndmFsdWUnXG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB1c2VyRGF0YSA9IHtcbiAgICAgICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsICAgOiBkYXRhWzBdLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogZGF0YVsxXS52YWx1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChpc1NpZ251cCkge1xuICAgICAgICAgICAgICAgIHVzZXJEYXRhLnVzZXIudXNlcm5hbWUgPSBkYXRhWzJdLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb250cm9sbGVyLnNhdmVVc2VyKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSksXG4gICAgICAgICAgICAgICAgc2x1ZzogaXNTaWdudXAgPyAnJyA6ICcvbG9naW4nXG4gICAgICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9ycyA9IGRhdGEuanNvbi5lcnJvcnM7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lLmVycm9ycyA9IGVycm9ycztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLmxvZ2luKGRhdGEuanNvbi51c2VyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhTaWduVXBDb21wb25lbnQpO1xuXG5leHBvcnQge1NpZ25VcENvbXBvbmVudCBhcyBkZWZhdWx0fTtcbiJdLCJzb3VyY2VSb290IjoiIn0=