/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/neo.mjs/src/Main.mjs");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/neo.mjs/src/DefaultConfig.mjs":
/*!****************************************************!*\
  !*** ./node_modules/neo.mjs/src/DefaultConfig.mjs ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DefaultConfig; });
const Neo = self.Neo || {};

Neo.config = Neo.config || {};

/**
 * Config object for the neo.mjs framework which will get passed to all workers
 * You can change the configs, e.g. inside the index.html of your app
 * @memberOf module:Neo
 * @name config
 * @type Object
 */
const DefaultConfig = {
    /**
     * true will apply 'neo-body' to the document.body classList
     * @default true
     * @memberOf! module:Neo
     * @name config.applyBodyCls
     * @type Boolean
     */
    applyBodyCls: true,
    /**
     * Path to your app.mjs file. You can create multiple apps there if needed.
     * @default null
     * @memberOf! module:Neo
     * @name config.appPath
     * @type String|null
     */
    appPath: null,
    /**
     * Path to the neo.mjs directory
     * @default './'
     * @memberOf! module:Neo
     * @name config.basePath
     * @type String
     */
    basePath: './',
    /**
     * Path to the neo.mjs theme css files
     * See main.addon.Stylesheet => createStyleSheet()
     * @default Neo.config.basePath + 'build/' + Neo.config.environment
     * @memberOf! module:Neo
     * @name [config.cssPath]
     * @optional
     * @type String|null
     */
    cssPath: null,
    /**
     * The current build => dist environment. Valid values: 'development', 'production'
     * Used for automatically including the matching theme files
     * @default 'production'
     * @memberOf! module:Neo
     * @name config.environment
     * @type String
     */
    environment: 'production',
    /**
     * Flag if Neo is running without any JS builds
     * @default false
     * @memberOf! module:Neo
     * @name config.isExperimental
     * @type Boolean
     */
    isExperimental: false,
    /**
     * Flag for running on https://neomjs.github.io/pages/
     * => to use local images paths instead of raw.githubusercontent.com
     * @default false
     * @memberOf! module:Neo
     * @name config.isGitHubPages
     * @type Boolean
     */
    isGitHubPages: false,
    /**
     * Flag for running the Neo main thread inside an iframe (Siesta Browser Harness)
     * @default false
     * @memberOf! module:Neo
     * @name config.isInsideSiesta
     * @type Boolean
     */
    isInsideSiesta: false,
    /**
     * Used by Intl.DateTimeFormat, for details take a look at:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     * @default 'default'
     * @memberOf! module:Neo
     * @name config.locale
     * @type String
     */
    locale: 'default',
    /**
     * Add addons for the main thread
     * Possible values: AmCharts, GoogleAnalytics, HighlightJS, LocalStorage, MapboxGL, Markdown, Siesta, Stylesheet
     * (src/main/addon)
     * @default ['Stylesheet']
     * @memberOf! module:Neo
     * @name config.mainThreadAddons
     * @type String[]
     */
    mainThreadAddons: ['Stylesheet'],
    /**
     * Add themes you want to use here. The first theme will get applied.
     * If config.useCss4 === true, other theme variables will get included as well
     * @default ['neo-theme-light', 'neo-theme-dark']
     * @memberOf! module:Neo
     * @name config.themes
     * @type String[]
     */
    themes: ['neo-theme-light', 'neo-theme-dark'],
    /**
     * Flag for standalone Siesta module tests => prevent registerRemote worker messages
     * @default false
     * @memberOf! module:Neo
     * @name config.unitTestMode
     * @type Boolean
     */
    unitTestMode: false,
    /**
     * Flag if CSS4 stylesheets are in use (important for switching themes)
     * @default true
     * @memberOf! module:Neo
     * @name config.useCss4
     * @type Boolean
     */
    useCss4: true,
    /**
     * True will automatically include the stylesheet
     * @default true
     * @memberOf! module:Neo
     * @name config.useFontAwesome
     * @type Boolean
     */
    useFontAwesome: true,
    /**
     * Adds global dom event listeners for mobile related events like rotate, swipe, tap
     * @default true
     * @memberOf! module:Neo
     * @name config.useTouchEvents
     * @type Boolean
     */
    useTouchEvents: true
};

Object.assign(DefaultConfig, {
    /**
     * Path to the top level neo.mjs resources folder
     * @default Neo.config.basePath + 'resources/'
     * @memberOf! module:Neo
     * @name config.resourcesPath
     * @type String
     */
    resourcesPath: (Neo.config.basePath || DefaultConfig.basePath) + 'resources/',
    /**
     * The default base URL for web worker entry points (App, Data, Vdom)
     * @default Neo.config.basePath + 'src/worker/'
     * @memberOf! module:Neo
     * @name config.workerBasePath
     * @type String
     */
    workerBasePath: (Neo.config.basePath || DefaultConfig.basePath) + 'src/worker/'
});



/***/ }),

/***/ "./node_modules/neo.mjs/src/Main.mjs":
/*!*******************************************!*\
  !*** ./node_modules/neo.mjs/src/Main.mjs ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Neo_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Neo.mjs */ "./node_modules/neo.mjs/src/Neo.mjs");
/* harmony import */ var _core_export_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/_export.mjs */ "./node_modules/neo.mjs/src/core/_export.mjs");
/* harmony import */ var _main_DomAccess_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main/DomAccess.mjs */ "./node_modules/neo.mjs/src/main/DomAccess.mjs");
/* harmony import */ var _main_DomEvents_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main/DomEvents.mjs */ "./node_modules/neo.mjs/src/main/DomEvents.mjs");
/* harmony import */ var _worker_Manager_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./worker/Manager.mjs */ "./node_modules/neo.mjs/src/worker/Manager.mjs");






/**
 * @class Neo.Main
 * @extends Neo.core.Base
 * @singleton
 */
class Main extends _core_export_mjs__WEBPACK_IMPORTED_MODULE_1__["Base"] {
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
         * @member {String} className='Neo.Main'
         * @private
         */
        className: 'Neo.Main',
        /**
         * @member {boolean} logAnimationFrames=true
         */
        logAnimationFrames: true,
        /**
         * @member {String} mode='read'
         * @private
         */
        mode: 'read',
        /**
         * @member {Array} readQueue=[]
         * @private
         */
        readQueue: [],
        /**
         * Remote method access for other workers
         * @member {Object} remote={app: [//...]}
         * @private
         */
        remote: {
            app: [
                'editRoute',
                'setRoute'
            ]
        },
        /**
         * @member {Boolean} running=false
         * @private
         */
        running: false,
        /**
         * @member {Boolean} showFps=false
         */
        showFps: false,
        /**
         * @member {Boolean} singleton=true
         * @private
         */
        singleton: true,
        /**
         * @member {Number} timeLimit=15
         */
        timeLimit: 15,
        /**
         * should be dev only
         * @member {Number} totalFrameCount=0
         * @private
         */
        totalFrameCount: 0,
        /**
         * @member {Array} updateQueue=[]
         * @private
         */
        updateQueue: [],
        /**
         * @member {Array} writeQueue=[]
         * @private
         */
        writeQueue: []
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me = this;

        _main_DomEvents_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].on('domContentLoaded', me.onDomContentLoaded, me);

        _worker_Manager_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].on({
            'automount'        : me.onRender,
            'message:mountDom' : me.onMountDom,
            'message:updateDom': me.onUpdateDom,
            'updateVdom'       : me.onUpdateVdom,
            scope              : me
        });
    }

    /**
     * Edit the location.hash value
     * A value of null will remove the given key.
     * @param {Object} data
     */
    editRoute(data) {
        let hashObj = _main_DomEvents_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].parseHash(window.location.hash.substr(1)),
            hashArr = [];

        if (typeof data === 'string') {
            data = _main_DomEvents_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].parseHash(data);
        }

        Object.assign(hashObj, data);

        Object.entries(hashObj).forEach(([key, value]) => {
            if (value !== null) {
                hashArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
            }
        });

        window.location.hash = hashArr.join('&');
    }

    /**
     *
     */
    async onDomContentLoaded() {
        let me      = this,
            imports = [];

        _main_DomAccess_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].onDomContentLoaded();

        // not in use right now
        // window.addEventListener('resize', me.globalResizeListener.bind(me));

        // we need different publicPath values for the main thread inside the webpack based dist envs,
        // depending on the hierarchy level of the app entry point
        if (window.webpackJsonp) {
            __webpack_require__.p = _Neo_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].config.basePath.substring(6);
        }

        _Neo_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].config.mainThreadAddons.forEach(addon => {
            imports.push(__webpack_require__("./node_modules/neo.mjs/src/main/addon lazy recursive ^\\.\\/.*\\.mjs$")(`./${addon}.mjs`));
        });

        const modules = await Promise.all(imports);

        me.addon = {};

        modules.forEach(module => {
            me.addon[module.default.constructor.name] = module.default;
        });

        _worker_Manager_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].onWorkerConstructed({
            origin: 'main'
        });
    }

    // todo: https://developer.mozilla.org/en-US/docs/Web/Events/resize
    globalResizeListener(event) {
        console.log('globalResizeListener', event);
    }

    /**
     *
     * @param data
     */
    onMountDom(data) {
        this.queueWrite(data);

        _worker_Manager_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].sendMessage(data.origin || 'app', {
            action : 'reply',
            replyId: data.id,
            success: true
        });
    }

    /**
     *
     * @param data
     */
    onRender(data) {
        data.data.replyId = data.replyId;
        this.queueWrite(data.data);
    }

    /**
     *
     * @param data
     */
    onUpdateDom(data) {
        this.queueUpdate(data);
    }

    /**
     *
     * @param data
     */
    onUpdateVdom(data) {
        data.data.replyId = data.replyId;
        this.queueUpdate(data.data);
    }

    /**
     *
     * @param queue
     * @param start
     * @returns {number}
     * @private
     */
    processQueue(queue, start) {
        let me    = this,
            limit = me.timeLimit,
            operation;

        while (operation = queue.shift()) {
            if (new Date() - start > limit) {
                queue.unshift(operation);
                return requestAnimationFrame(me.renderFrame.bind(me));
            } else {
                _main_DomAccess_mjs__WEBPACK_IMPORTED_MODULE_2__["default"][me.mode](operation);
                _worker_Manager_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].resolveDomOperationPromise(operation.replyId);
            }
        }
    }

    /**
     *
     * @param data
     * @private
     */
    queueRead(data) {
        let me = this;
        me.readQueue.push(data);

        if (!me.running) {
            me.running = true;
            requestAnimationFrame(me.renderFrame.bind(me));
        }
    }

    /**
     *
     * @param data
     * @private
     */
    queueUpdate(data) {
        let me = this;
        me.updateQueue.push(data);

        if (!me.running) {
            me.running = true;
            requestAnimationFrame(me.renderFrame.bind(me));
        }
    }

    /**
     *
     * @param data
     * @private
     */
    queueWrite(data) {
        let me = this;
        me.writeQueue.push(data);

        if (!me.running) {
            me.running = true;
            requestAnimationFrame(me.renderFrame.bind(me));
        }
    }

    /**
     * Triggers the different DOM operation queues
     * @private
     */
    renderFrame() {
        let me      = this,
            read    = me.readQueue,
            update  = me.updateQueue,
            write   = me.writeQueue,
            reading = me.mode === 'read',
            start   = new Date();

        if (me.logAnimationFrames) {
            me.totalFrameCount++;
            console.log('Total Frames: ' + me.totalFrameCount);
        }

        if (reading || !write.length) {
            me.mode = 'read';
            if (me.processQueue(read, start)) {
                return;
            }
        }

        if (update.length) {
            me.mode = 'update';
            if (me.processQueue(update, start)) {
                return;
            }
        }

        if (write.length) {
            me.mode = 'write';
            if (me.processQueue(write, start)) {
                return;
            }
        }

        me.running = false;
    }

    /**
     * Change the location.hash value
     * @param {Object} data
     * @param {String} data.value
     */
    setRoute(data) {
        window.location.hash = data.value;
    }
}

_Neo_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].applyClassConfig(Main);

let instance = _Neo_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].create(Main);

_Neo_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].applyToGlobalNs(instance);

/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ }),

/***/ "./node_modules/neo.mjs/src/Neo.mjs":
/*!******************************************!*\
  !*** ./node_modules/neo.mjs/src/Neo.mjs ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Neo; });
/* harmony import */ var _DefaultConfig_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DefaultConfig.mjs */ "./node_modules/neo.mjs/src/DefaultConfig.mjs");


const configSymbol = Symbol.for('configSymbol'),
      getSetCache  = Symbol('getSetCache');

/**
 * The base module to enhance classes, create instances and the Neo namespace
 * @module Neo
 * @singleton
 * @borrows Neo.core.Util.capitalize        as capitalize
 * @borrows Neo.core.Util.createStyleObject as createStyleObject
 * @borrows Neo.core.Util.createStyles      as createStyles
 * @borrows Neo.core.Util.decamel           as decamel
 * @borrows Neo.core.Util.isArray           as isArray
 * @borrows Neo.core.Util.isBoolean         as isBoolean
 * @borrows Neo.core.Util.isDefined         as isDefined
 * @borrows Neo.core.Util.isNumber          as isNumber
 * @borrows Neo.core.Util.isObject          as isObject
 * @borrows Neo.core.Util.isString          as isString
 * @borrows Neo.core.Util.toArray           as toArray
 * @tutorial 01_Concept
 */
let Neo = self.Neo || {};

Neo = self.Neo = Object.assign({
    /**
     * A map containing ntypes as key and Neo classes or singletons as values
     * @memberOf! module:Neo
     * @private
     * @type Object
     */
    ntypeMap: {},
    /**
     * Needed for Neo.create. False for the main thread, true for the App, Data & Vdom worker
     * @memberOf! module:Neo
     * @private
     * @type Boolean
     */
    insideWorker: typeof DedicatedWorkerGlobalScope !== 'undefined' || typeof WorkerGlobalScope !== 'undefined',

    /**
     * Internally used at the end of each class / module definition
     * @memberOf module:Neo
     * @param {Neo.core.Base} cls The Neo class to apply configs to
     * @private
     * @tutorial 02_ClassSystem
     */
    applyClassConfig(cls) {
        let baseCfg       = null,
            baseStaticCfg = null,
            config        = {},
            proto         = cls.prototype || cls,
            protos        = [],
            staticConfig  = {},
            ctor;

        while (proto.__proto__) {
            ctor = proto.constructor;

            if (ctor.hasOwnProperty('classConfigApplied')) {
                baseCfg       = Neo.clone(ctor.config, true);
                baseStaticCfg = Neo.clone(ctor.staticConfig, true);
                break;
            }

            protos.unshift(proto);
            proto = proto.__proto__;
        }

        config       = baseCfg       ? baseCfg       : config;
        staticConfig = baseStaticCfg ? baseStaticCfg : staticConfig;

        protos.forEach(element => {
            ctor = element.constructor;
            let cfg       = ctor.getConfig       && ctor.getConfig()       || {},
                staticCfg = ctor.getStaticConfig && ctor.getStaticConfig() || {},
                mixins;

            if (cfg) {
                Object.entries(cfg).forEach(([key, value]) => {
                    if (key.slice(-1) === '_') {
                        delete cfg[key];
                        key = key.slice(0, -1);
                        cfg[key] = value;
                        autoGenerateGetSet(element, key);
                    }

                    // only apply properties which have no setters inside the prototype chain
                    // those will get applied on create (Neo.core.Base -> initConfig)
                    else if (!hasPropertySetter(element, key)) {
                        Object.defineProperty(element, key, {
                            enumerable: true,
                            value     : value,
                            writable  : true
                        });
                    }
                });
            }

            Object.assign(ctor, staticCfg);

            if (cfg.hasOwnProperty('ntype')) {
                Neo.ntypeMap[cfg.ntype] = cfg.className;
            }

            mixins = config.hasOwnProperty('mixins') && config.mixins || [];

            if (staticCfg && staticCfg.observable) {
                mixins.push('Neo.core.Observable');
            }

            if (cfg.hasOwnProperty('mixins') && Array.isArray(cfg.mixins) && cfg.mixins.length > 0) {
                mixins.push(...cfg.mixins);
            }

            if (mixins.length) {
                applyMixins(ctor, mixins);
            }

            delete cfg.mixins;
            delete config.mixins;

            Object.assign(config, cfg);
            Object.assign(staticConfig, staticCfg);

            Object.assign(ctor, {
                classConfigApplied: true,
                config            : Neo.clone(config, true),
                isClass           : true,
                staticConfig      : Neo.clone(staticConfig, true)
            });

            delete ctor.getConfig;
            delete ctor.getStaticConfig;

            if (!config.singleton) {
                this.applyToGlobalNs(cls);
            }
        });
    },

    /**
     * Maps methods from one namespace to another one
     * @example
     * // aliases
     * Neo.applyFromNs(Neo, Util, {
     *     createStyleObject: 'createStyleObject',
     *     createStyles     : 'createStyles',
     *     capitalize       : 'capitalize',
     *     decamel          : 'decamel',
     *     isArray          : 'isArray',
     *     isBoolean        : 'isBoolean',
     *     isDefined        : 'isDefined',
     *     isNumber         : 'isNumber',
     *     isObject         : 'isObject',
     *     isString         : 'isString',
     *     toArray          : 'toArray'
     * }, true);
     *
     * // e.g. Neo.core.Util.isObject => Neo.isObject
     * @memberOf module:Neo
     * @param {Neo|Neo.core.Base} target The target class or singleton Instance or Neo
     * @param {Neo.core.Base} namespace The class containing the methods
     * @param {Object} config
     * @param {Boolean} [bind] set this to true in case you want to bind methods to the "from" namespace
     * @returns {Object} target
     */
    applyFromNs(target, namespace, config, bind) {
        let fnName;

        if (target && config && typeof config === 'object') {
            Object.entries(config).forEach(([key, value]) => {
                fnName = namespace[value];
                target[key] = bind ? fnName.bind(namespace) : fnName;
            });
        }

        return target;
    },

    /**
     * Maps a class to the global Neo or App namespace.
     * Can get called for classes and singleton instances
     * @memberOf module:Neo
     * @param {Neo.core.Base} cls
     */
    applyToGlobalNs(cls) {
        let proto = typeof cls === 'function' ? cls.prototype: cls,
            className, nsArray, key, ns;

        if (proto.constructor.registerToGlobalNs === true) {
            className = proto.isClass ? proto.config.className : proto.className;

            nsArray = className.split('.');
            key     = nsArray.pop();
            ns      = Neo.ns(nsArray, true);
            ns[key] = cls;
        }
    },

    /**
     * Copies all keys of defaults into target, in case they don't already exist
     * @memberOf module:Neo
     * @param {Object} target The target object
     * @param {Object} defaults The object containing the keys you want to copy
     * @returns {Object} target
     */
    assignDefaults(target, defaults) {
        if (target && defaults && typeof defaults === 'object') {
            Object.entries(defaults).forEach(([key, value]) => {
                if (!target.hasOwnProperty(key)) {
                    target[key] = value;
                }
            });
        }

        return target;
    },

    /**
     * @memberOf module:Neo
     * @param {Object|Array|*} obj
     * @param {Boolean} [deep=false] Set this to true in case you want to clone nested objects as well
     * @param {Boolean} [ignoreNeoInstances=false] returns existing instances if set to true
     * @returns {Object|Array|*} the cloned input
     */
    clone(obj, deep, ignoreNeoInstances) {
        let out;

        if (Array.isArray(obj)) {
            return obj.map(val => {
                return Neo.clone(val, deep, ignoreNeoInstances);
            });
        }
        if (obj !== null && typeof obj === 'object') {
            if (obj.constructor.isClass && obj instanceof Neo.core.Base) {
                return ignoreNeoInstances ? obj : this.cloneNeoInstance(obj);
            } else if(obj.constructor.isClass) {
                return obj;
            } else {
                out = {};
                Object.entries(obj).forEach(([key, value]) => {
                    if (deep) {
                        value = Neo.clone(value, deep, ignoreNeoInstances);
                    }
                    out[key] = value;
                });
                return out;
            }
        }
        return obj; // return all other data types
    },

    /**
     * Creates a new instance using the originalConfig without the id
     * @memberOf module:Neo
     * @param {Neo.core.Base} instance
     * @returns {Neo.core.Base} the cloned instance
     */
    cloneNeoInstance(instance) {
        let config = {...instance.originalConfig};
        delete config._id;
        delete config.id;
        return Neo.create(instance.className, config);
    },

    /**
     * Use Neo.create() instead of "new" to create instances of all Neo classes
     * @example
     * import Button from './Button.mjs';
     *
     * Neo.create(Button, {
     *     iconCls: 'fa fa-home',
     *     text   : 'Home'
     * });
     * @example
     * import Button from './Button.mjs';
     *
     * Neo.create({
     *     module : Button,
     *     iconCls: 'fa fa-home',
     *     text   : 'Home'
     * });
     * @example
     * Neo.create('Neo.component.Button' {
     *     iconCls: 'fa fa-home',
     *     text   : 'Home'
     * });
     * @example
     * Neo.create({
     *     className: 'Neo.component.Button',
     *     iconCls  : 'fa fa-home',
     *     text     : 'Home'
     * });
     * @memberOf module:Neo
     * @param {String|Object|Neo.core.Base} className
     * @param {Object} [config]
     * @returns {Neo.core.Base|null} The new class instance
     * @tutorial 02_ClassSystem
     */
    create(className, config) {
        let cls, instance;

        if (typeof className === 'function' && undefined !== className.constructor) {
            cls = className;
        } else {
            if (typeof className === 'object') {
                config = className;

                if (!config.className && !config.module) {
                    // using console.error instead of throw to show the config object
                    console.error('Class created with object configuration missing className or module property', config);
                    return null;
                }

                className = config.className ? config.className : config.module.prototype.className;
            }

            if (!exists(className)) {
                throw new Error('Class ' + className + ' does not exist');
            }

            cls = Neo.ns(className);
        }

        instance = new cls(config);

        instance.onConstructed();
        instance.init();

        return instance;
    },

    emptyFn() {},

    /**
     * Maps a className string into a global namespace
     * @example
     * Neo.ns('Neo.component.Button', true);
     * // =>
     * // self.Neo = self.Neo || {};
     * // self.Neo.component = self.Neo.component || {};
     * // self.Neo.component.Button = self.Neo.component.Button || {};
     * // return self.Neo.component.Button;
     *
     * @memberOf module:Neo
     * @param {Array|String} names The class name string containing dots or an Array of the string parts
     * @param {Boolean} [create] Set create to true to create empty objects for non existing parts
     * @param {Object} [scope] Set a different starting point as self
     * @returns {Object} reference to the toplevel namespace
     */
    ns(names, create, scope) {
        names = Array.isArray(names) ? names : names.split('.');

        return names.reduce((prev, current) => {
            if (create && !prev[current]) {
                prev[current] = {};
            }
            if (prev) {
                return prev[current];
            }
        }, scope || self);
    },

    /**
     * Creates instances of Neo classes using their ntype instead of the class name
     * @example
     * Neo.ntype('button' {
     *     iconCls: 'fa fa-home',
     *     text   : 'Home'
     * });
     * @example
     * Neo.ntype({
     *     ntype  : 'button',
     *     iconCls: 'fa fa-home',
     *     text   : 'Home'
     * });
     * @memberOf module:Neo
     * @param {String|Object} ntype
     * @param {Object} [config]
     * @returns {Neo.core.Base}
     * @see {@link module:Neo.create create}
     */
    ntype(ntype, config) {
        if (typeof ntype === 'object') {
            config = ntype;
            if (!config.ntype) {
                throw new Error('Class defined with object configuration missing ntype property. ' + config.ntype);
            }
            ntype = config.ntype;
        }

        let className = Neo.ntypeMap[ntype];

        if (!className) {
            throw new Error('ntype ' + ntype + ' does not exist');
        }
        return Neo.create(className, config);
    },

    onStart: Neo.emptyFn
}, Neo);

/**
 * List of class properties which are not supposed to get mixed into other classes
 * @type {string[]}
 * @private
 */
const ignoreMixin = [
    '_name',
    'classConfigApplied',
    'className',
    'constructor',
    'isClass',
    'mixin',
    'ntype',
    'observable',
    'registerToGlobalNs'
];

/**
 *
 * @param {Neo.core.Base} cls
 * @param {Array} mixins
 * @private
 */
function applyMixins(cls, mixins) {
    if (!Array.isArray(mixins)) {
        mixins = [mixins];
    }

    let i            = 0,
        len          = mixins.length,
        mixinClasses = {},
        mixin, mixinCls, mixinProto;

    for (;i < len;i++) {
        mixin = mixins[i];

        if (mixin.isClass) {
            mixinProto = mixin.prototype;
            mixinCls   = Neo.ns(mixinProto.className);
        } else {
            if (!exists(mixin)) {
                throw new Error('Attempting to mixin an undefined class: ' + mixin + ', ' + cls.prototype.className);
            }
            mixinCls   = Neo.ns(mixin);
            mixinProto = mixinCls.prototype;
        }

        mixinProto.className.split('.').reduce(mixReduce(mixinCls), mixinClasses);

        Object.getOwnPropertyNames(mixinProto).forEach(mixinProperty(cls.prototype, mixinProto));
    }

    cls.prototype.mixins = mixinClasses; // todo: we should do a deep merge
}

/**
 * Creates get / set methods for class configs ending with an underscore
 * @param {Neo.core.Base} proto
 * @param {String} key
 * @private
 * @tutorial 02_ClassSystem
 */
function autoGenerateGetSet(proto, key) {
    if (hasPropertySetter(proto, key)) {
        throw('Config ' + key + '_ (' + proto.className + ') already has a set method, use beforeGet, beforeSet & afterSet instead');
    }

    if (!Neo[getSetCache]) {
        Neo[getSetCache] = {};
    }

    if (!Neo[getSetCache][key]) {
        Neo[getSetCache][key] = {
            get() {
                let me        = this,
                    beforeGet = 'beforeGet' + Neo.capitalize(key),
                    hasNewKey = me[configSymbol].hasOwnProperty(key),
                    newKey    = me[configSymbol][key],
                    value     = hasNewKey ? newKey : me['_' + key];

                if (Array.isArray(value)) {
                    if (key !== 'items') {
                        value = [...value];
                    }
                } else if (value instanceof Date) {
                    value = new Date(value.valueOf());
                }

                if (hasNewKey) {
                    me[key] = value; // we do want to trigger the setter => beforeSet, afterSet
                    value = me['_' + key]; // return the value parsed by the setter
                }

                if (me[beforeGet] && typeof me[beforeGet] === 'function') {
                    value = me[beforeGet](value);
                }

                return value;
            },

            set(value) {
                let me        = this,
                    _key      = '_' + key,
                    uKey      = Neo.capitalize(key),
                    beforeSet = 'beforeSet' + uKey,
                    afterSet  = 'afterSet'  + uKey,
                    oldValue  = me[_key];

                // every set call has to delete the matching symbol
                delete me[configSymbol][key];

                // we do want to store the value before the beforeSet modification as well,
                // since it could get pulled by other beforeSet methods of different configs
                me[_key] = value;

                if (me[beforeSet] && typeof me[beforeSet] === 'function') {
                    value = me[beforeSet](value, oldValue);

                    // If they don't return a value, that means no change
                    if (value === undefined) {
                        me[_key] = oldValue;
                        return;
                    }

                    me[_key] = value;
                }

                // todo: we could compare objects & arrays for equality
                if (Neo.isObject(value) || Array.isArray(value) || value !== oldValue) {
                    if (me[afterSet] && typeof me[afterSet] === 'function') {
                        me[afterSet](value, oldValue);
                    }
                }
            }
        };
    }

    Object.defineProperty(proto, key, Neo[getSetCache][key]);
}

/**
 * Checks if the class name exists inside the Neo or app namespace
 * @param {String} className
 * @returns {Boolean}
 * @private
 */
function exists(className) {
    try {
        return !!className.split('.').reduce((prev, current) => {
            return prev[current];
        }, self);
    } catch(e) {
        return false;
    }
}

/**
 * Checks if there is a set method for a given property key inside the prototype chain
 * @param {Neo.core.Base} proto The top level prototype of a class
 * @param {String} key the property key to test
 * @returns {Boolean}
 * @private
 */
function hasPropertySetter(proto, key) {
    let descriptor;

    while (proto.__proto__) {
        descriptor = Object.getOwnPropertyDescriptor(proto, key);

        if (typeof descriptor === 'object' && typeof descriptor.set === 'function') {
            return true;
        }
        proto = proto.__proto__;
    }

    return false;
}

/**
 *
 * @param {Neo.core.Base} proto
 * @param {Neo.core.Base} mixinProto
 * @returns {Function}
 * @private
 */
function mixinProperty(proto, mixinProto) {
    return function(key) {
        if (~ignoreMixin.indexOf(key)) {
            return;
        }
        if (proto[key] && proto[key]._from) {
            if (mixinProto.className === proto[key]._from) {
                console.warn('Mixin set multiple times or already defined on a Base Class', proto.className, mixinProto.className, key);
                return;
            }
            throw new Error(
                proto.className + ': Multiple mixins defining same property (' +
                mixinProto.className + ', ' +
                proto[key]._from + ') => ' +
                key
            );
        }

        proto[key] = mixinProto[key];

        Object.getOwnPropertyDescriptor(proto, key)._from = mixinProto.className;

        if (typeof proto[key] === 'function') {
            proto[key]._name = key;
        }
    };
}

/**
 *
 * @param mixinCls
 * @returns {Function}
 * @private
 */
function mixReduce(mixinCls) {
    return (prev, current, idx, arr) => {
        return prev[current] = idx !== arr.length -1 ? prev[current] || {} : mixinCls;
    };
}

Neo.config = Neo.config || {};

Neo.assignDefaults(Neo.config, _DefaultConfig_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./node_modules/neo.mjs/src/core/Base.mjs":
/*!************************************************!*\
  !*** ./node_modules/neo.mjs/src/core/Base.mjs ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Base; });
/* harmony import */ var _IdGenerator_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IdGenerator.mjs */ "./node_modules/neo.mjs/src/core/IdGenerator.mjs");


const configSymbol = Symbol.for('configSymbol'),
      isInstance   = Symbol('isInstance');

/**
 * The base class for (almost) all classes inside the Neo namespace
 * Exceptions are e.g. core.IdGenerator, vdom.VNode
 * @class Neo.core.Base
 */
class Base {
    /**
     * The return value will get applied to the class constructor
     * @returns {Object} staticConfig
     * @tutorial 02_ClassSystem
     */
    static getStaticConfig() {return {
        /**
         * Set this one to false in case you don't want to stick
         * to the "anti-pattern" to apply classes to the global Neo or App namespace
         * @member {Boolean} registerToGlobalNs=true
         * @private
         * @static
         */
        registerToGlobalNs: true
    }}

    /**
     * The return value will get applied to each class instance
     * @returns {Object} staticConfig
     * @tutorial 02_ClassSystem
     */
    static getConfig() {return {
        /**
         * The class name which will get mapped into the Neo or app namespace
         * @member {String} className='Neo.core.Base'
         * @private
         */
        className: 'Neo.core.Base',
        /**
         * The class shortcut-name to use for e.g. creating child components inside a JSON-format
         * @member {String} ntype='base'
         * @private
         */
        ntype: 'base',
        /**
         * Add mixins as an array of classNames, imported modules or a mixed version
         * @member {String[]|Neo.core.Base[]|null} mixins=null
         */
        mixins: null
    }}

    /**
     * Consumes the static getConfig() object
     * Applies the observable mixin if needed, grants remote access if needed
     * @param {Object} config
     */
    constructor(config) {
        config = config || {};

        let me = this;

        Object.defineProperties(me, {
            [configSymbol]: {
                configurable: true,
                enumerable  : false,
                value       : {},
                writable    : true
            },
            [isInstance]: {
                enumerable: false,
                value     : true
            }
        });

        me.createId(config.id || me.id);
        delete config.id;

        if (me.constructor.config) {
            delete me.constructor.config.id;
        }

        if (me.getStaticConfig('observable') || me.mixins && Neo.ns('Neo.core.Observable', me.mixins)) {
            me.initObservable(config);
        }

        me.initConfig(config);

        if (me.controller) {
            me.controller.parseConfig();
        }

        Object.defineProperty(me, 'configsApplied', {
            enumerable: false,
            value     : true
        });

        if (me.remote) {
            setTimeout(me.initRemote.bind(me), 1);
        }
    }

    /**
     * Gets triggered after all constructors are done
     * @tutorial 02_ClassSystem
     */
    onConstructed() {}

    /**
     * Gets triggered after onConstructed is done
     * @see {@link Neo.core.Base#onConstructed onConstructed}
     * @tutorial 02_ClassSystem
     */
    init() {}

    /**
     * Convenience method for beforeSet functions which test if a given value is inside a static array
     * @param {String|Number} value
     * @param {String|Number} oldValue
     * @param {String} name config name
     * @param {String} [staticName=name + 's'] name of the static config array
     */
    beforeSetEnumValue(value, oldValue, name, staticName = name + 's') {
        const values = this.getStaticConfig(staticName);

        if (!values.includes(value)) {
            Neo.logError('Supported values for ' + name + ' are:', values.join(', '), this);
            return oldValue;
        }

        return value;
    }

    /**
     * Uses the IdGenerator to create an id if a static one is not explicitly set.
     * Registers the instance to manager.Instance if this one is already created,
     * otherwise stores it inside a tmp map.
     * @param {String} id
     */
    createId(id) {
        let me = this;

        me.id = id || _IdGenerator_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].getId(me.ntype);

        if (Base.instanceManagerAvailable === true) {
            Neo.manager.Instance.register(me);
        } else {
            if (!Neo.idMap) {
                Neo.idMap = {};
            }

            Neo.idMap[me.id] = me;
        }
    }

    /**
     * Unregisters this instance from Neo.manager.Instance
     * and removes all object entries from this instance
     */
    destroy() {
        let me = this;

        if (Base.instanceManagerAvailable === true) {
            Neo.manager.Instance.unregister(me);
        } else if (Neo.idMap) {
            delete Neo.idMap[me.id];
        }

        Object.keys(me).forEach(key => {
            if (Object.getOwnPropertyDescriptor(me, key).writable) {
                delete me[key];
            }
        });
    }

    /**
     * Returns the value of a static config key or the staticConfig object itself in case no value is set
     * @param {String} [key] The key of a staticConfig defined inside static getStaticConfig
     * @returns {*}
     */
    getStaticConfig(key) {
        let cfg = this.constructor.staticConfig;
        return (key ? cfg[key] : cfg);
    }

    /**
     * Applies all class configs to this instance
     * @param {Object} config
     * @param {Boolean} [preventOriginalConfig] True prevents the instance from getting an originalConfig property
     */
    initConfig(config, preventOriginalConfig) {
        let me = this;

        Object.assign(me[configSymbol], me.mergeConfig(config, preventOriginalConfig));
        me.processConfigs();
    }

    /**
     *
     */
    processConfigs() {
        let me   = this,
            keys = Object.keys(me[configSymbol]);

        // We do not want to iterate over the keys, since 1 config can remove more than 1 key (beforeSetX, afterSetX)
        if (keys.length > 0) {
            // The hasOwnProperty check is intended for configs without a trailing underscore
            // => they could already got assigned inside an afterSet-method
            if (!me.hasOwnProperty(keys[0])) {
                me[keys[0]] = me[configSymbol][keys[0]];
            }

            // there is a delete call inside the config getter as well (Neo.mjs => autoGenerateGetSet())
            // we need to keep this one for configs, which do not use getters (no trailing underscore)
            delete me[configSymbol][keys[0]];

            me.processConfigs();
        }
    }

    /**
     * Does get triggered with a delay to ensure that Neo.workerId & Neo.worker.Manager are defined
     * Remote method access via promises
     */
    initRemote() {
        let me        = this,
            remote    = me.remote,
            className = me.className,
            origin;

        if (!me.singleton) {
            throw new Error('Remote method access only functional for Singleton classes ' + className);
        }

        if (!Neo.config.unitTestMode && Neo.isObject(remote)) {
            Object.entries(remote).forEach(([worker, methods]) => {
                if (Neo.workerId !== worker) {
                    origin = Neo.workerId === 'main' ? Neo.worker.Manager : Neo.currentWorker;

                    origin.sendMessage(worker, {
                        action   : 'registerRemote',
                        methods  : methods,
                        className: className
                    });
                }
            });
        }
    }

    /**
     * Override this method to change the order configs are applied to this instance.
     * @param {Object} config
     * @param {Boolean} [preventOriginalConfig] True prevents the instance from getting an originalConfig property
     * @returns {Object} config
     */
    mergeConfig(config, preventOriginalConfig) {
        let me   = this,
            ctor = me.constructor;

        if (!ctor.config) {
            throw new Error('Neo.applyClassConfig has not been run on ' + me.className);
        }

        if (!preventOriginalConfig) {
            me.originalConfig = Neo.clone(config, true, true);
        }

        return {...ctor.config, ...config};
    }

    /**
     * Change multiple configs at once, ensuring that all afterSet methods get all new assigned values
     * @param {Object} values={}
     */
    set(values={}) {
        let me = this;

        // instead of using:
        // me[configSymbol] = values;
        // we keep the Object instance (defined via Object.defineProperties() => non enumerable)

        Object.keys(me[configSymbol]).forEach(key => {
            delete me[configSymbol][key];
        });

        Object.assign(me[configSymbol], values);

        me.processConfigs();
    }

    /**
     * Sets the value of a static config by a given key
     * @param {String} key The key of a staticConfig defined inside static getStaticConfig
     * @param {*} value
     * @returns {Boolean} true in case the config exists and got changed
     */
    setStaticConfig(key, value) {
        let staticConfig = this.constructor.staticConfig;

        if (staticConfig.hasOwnProperty(key)) {
            staticConfig[key] = value;
            return true;
        }

        return false;
    }

    /**
     * <p>Enhancing the toString() method, e.g.</p>
     * `Neo.create('Neo.component.Button').toString() => "[object Neo.component.Button (neo-button-1)]"`
     * @returns {String}
     */
    get [Symbol.toStringTag]() {
        return `${this.className} (id: ${this.id})`;
    }

    /**
     * <p>Enhancing the instanceof method. Without this change:</p>
     * `Neo.collection.Base.prototype instanceof Neo.core.Base => true`
     * <p>With this change:</p>
     * `Neo.collection.Base.prototype instanceof Neo.core.Base => false`<br>
     * `Neo.create(Neo.collection.Base) instanceof Neo.core.Base => true`
     * @returns {Boolean}
     */
    static [Symbol.hasInstance](instance) {
        if (!instance) {
            return false;
        }

        return instance[isInstance] === true ? super[Symbol.hasInstance](instance) : false;
    }
}

Neo.applyClassConfig(Base);

Base.instanceManagerAvailable = false;



/***/ }),

/***/ "./node_modules/neo.mjs/src/core/IdGenerator.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/neo.mjs/src/core/IdGenerator.mjs ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This class gets used by core.Base, so it can not extend it.
 * It could get simplified to just being an object (needs to manually get put into the Neo namespace in this case).
 * @class Neo.core.IdGenerator
 * @singleton
 */
class IdGenerator {
    static getStaticConfig() {return {
        /**
         * Set this one to false in case you don't want to stick
         * to the "anti-pattern" to apply classes to the global Neo or App namespace
         * @member {Boolean} registerToGlobalNs=true
         * @private
         * @static
         */
        registerToGlobalNs: true
    }}

    static getConfig() {return {
        /**
         * @member {String} className='Neo.core.IdGenerator'
         * @private
         */
        className: 'Neo.core.IdGenerator',
        /**
         * @member {String} ntype='id-generator'
         * @private
         */
        ntype: 'id-generator',
        /**
         * The default prefix for neo instance ids
         * @member {String} base='neo-'
         */
        base: 'neo-',
        /**
         * @member {Boolean} singleton='true
         * @private
         */
        singleton: true
    }}

    /**
     *
     * @param config
     */
    constructor(config) {
        let me = this;

        me.idCounter = {};

        // alias
        Neo.getId = me.getId.bind(me);
    }

    onConstructed() {}

    init() {}

    /**
     *
     * @param name
     * @returns {string}
     */
    getId(name) {
        name = name || 'neo';

        let me      = this,
            counter = me.idCounter,
            count   = counter[name] || 0;

        counter[name] = ++count;

        return me.base + (name === 'neo' ? '' : name + '-') + count;
    }
}

Neo.applyClassConfig(IdGenerator);

let instance = Neo.create(IdGenerator);

Neo.applyToGlobalNs(instance);

/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ }),

/***/ "./node_modules/neo.mjs/src/core/Logger.mjs":
/*!**************************************************!*\
  !*** ./node_modules/neo.mjs/src/core/Logger.mjs ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * @class Neo.core.Logger
 * @extends Neo.core.Base
 * @singleton
 */
class Logger extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.core.Logger'
         * @private
         */
        className: 'Neo.core.Logger',
        /**
         * @member {String} ntype='logger'
         * @private
         */
        ntype: 'logger',
        /**
         * Set this config to false to disable the logging
         * @member {boolean} enableLogs=true
         */
        enableLogs: true,
        /**
         * @member {String} level='log'
         * @private
         */
        level: 'log',
        /**
         * @member {boolean} enableLogs=true
         * @private
         */
        singleton: true
    }}

    /**
     *
     * @param config
     */
    constructor(config) {
        super(config);

        // aliases
        Neo.applyFromNs(Neo, this, {
            error   : 'error',
            info    : 'info',
            log     : 'log',
            logError: 'logError',
            warn    : 'warn'
        }, true);
    }

    /**
     *
     * @param value
     */
    error(value) {
        throw new Error(value);
    }

    /**
     *
     * @param args
     */
    log(...args) {
        this.level = 'log';
        this.write(...args);
    }

    /**
     *
     * @param args
     */
    info(...args) {
        this.level = 'info';
        this.write(...args);
    }

    /**
     *
     * @param args
     */
    logError(...args) {
        this.level = 'error';
        this.write(...args);
    }

    /**
     *
     * @param args
     */
    warn(...args) {
        this.level = 'warn';
        this.write(...args);
    }

    /**
     *
     * @param args
     * @private
     */
    write(...args) {
        if (this.enableLogs === true) {
            console[this.level](...args);
        }
    }
}

Neo.applyClassConfig(Logger);

let instance = Neo.create(Logger);

Neo.applyToGlobalNs(instance);

/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ }),

/***/ "./node_modules/neo.mjs/src/core/Observable.mjs":
/*!******************************************************!*\
  !*** ./node_modules/neo.mjs/src/core/Observable.mjs ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Observable; });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * @class Neo.core.Observable
 * @extends Neo.core.Base
 */
class Observable extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.core.Observable'
         * @private
         */
        className: 'Neo.core.Observable',
        /**
         * @member {String} ntype='mixin-observable'
         * @private
         */
        ntype: 'mixin-observable',
        /**
         * @member {Boolean} mixin=true
         * @private
         */
        mixin: true
    }}

    initObservable(config) {
        let me = this,
            proto = me.__proto__,
            listeners;

        if (config.listeners) {
            me.listeners = config.listeners;
            delete config.listeners;
        }

        listeners = me.listeners;

        me.listeners = {};

        if (listeners) {
            me.addListener(listeners);
        }

        while (proto && proto.constructor.isClass) {
            if (proto.constructor.staticConfig.observable && !proto.constructor.listeners) {
                Object.assign(proto.constructor, {
                    addListener   : me.addListener,
                    fire          : me.fire,
                    listeners     : {},
                    on            : me.on,
                    removeListener: me.removeListener,
                    un            : me.un
                });
            }
            proto = proto.__proto__;
        }
    }

    /**
     *
     * @param {Object|String} name
     * @param {Object} [opts]
     * @param {Object} [scope]
     * @param {String} [eventId]
     * @param {Object} [data]
     * @param {Number} [order]
     * @returns {String} eventId
     */
    addListener(name, opts, scope, eventId, data, order) {
        let me = this,
            listener, existing, eventConfig;

        if (typeof name === 'object') {
            if (name.hasOwnProperty('scope')) {
                scope = name.scope;
                delete name.scope;
            }

            Object.entries(name).forEach(([key, value]) => {
                me.addListener(key, value, scope);
            });
        } else if (typeof opts === 'object') {
            scope = scope || opts.scope;
            listener = opts.fn;
            order = order || opts.order;
            eventId = eventId || opts.eventId;
        } else if (typeof opts === 'function') {
            listener = opts;
        } else if (typeof opts === 'string') {
            listener = opts; // VC hook, can get parsed after onConstructed in case the view uses the parent VC
        } else {
            throw new Error('Invalid addListener call: ' + name);
        }

        eventConfig = {
            fn    : listener,
            scope : scope,
            data  : data,
            id    : eventId || Neo.getId('event')
        };

        if (existing = me.listeners && me.listeners[name]) {
            existing.forEach(cfg => {
                if (cfg.id === eventId || (cfg.fn === listener && cfg.scope === scope)) {
                    throw new Error('Duplicate event handler attached: ' + name);
                }
            });

            if (typeof order === 'number') {
                existing.splice(order, 0, eventConfig);
            } else if (order === 'before') {
                existing.unshift(eventConfig);
            } else {
                existing.push(eventConfig);
            }
        } else {
            me.listeners[name] = [eventConfig];
        }

        return eventConfig.id;
    }

    /**
     *
     * @param name
     */
    fire(name) {
        let me        = this,
            args      = [].slice.call(arguments, 1),
            listeners = me.listeners,
            eventConfig, events, i, len;

        if (listeners && listeners[name]) {
            events = [...listeners[name]];
            len    = events.length;

            for (i = 0; i < len; i++) {
                eventConfig = events[i];

                eventConfig.fn.apply(eventConfig.scope || me, eventConfig.data ? args.concat(eventConfig.data) : args);
            }
        }
    }

    /**
     *
     * @param name
     * @param eventId
     */
    removeListener(name, eventId) {
        if (Neo.isString(eventId)) {
            let listeners   = this.listeners[name],
                match       = false;

            listeners.forEach((eventConfig, idx) => {
                if (eventConfig.id === eventId) {
                    return match = idx;
                }
            });

            if (match !== false) {
                listeners.splice(match, 1);
            }
        }
    }

    // removeAllListeners: function(name) {

    // },

    // suspendListeners: function(queue) {

    // },

    // resumeListeners: function() {

    // }

    /**
     * Alias for addListener
     * @param {Object|String} name
     * @param {Object} [opts]
     * @param {Object} [scope]
     * @param {String} [eventId]
     * @param {Object} [data]
     * @param {Number} [order]
     * @returns {String} eventId
     */
    on(...args) {
        return this.addListener(...args);
    }

    /**
     * Alias for removeListener
     * @param name
     * @param eventId
     */
    un(...args) {
        this.removeListener(...args);
    }
}

Neo.applyClassConfig(Observable);



/***/ }),

/***/ "./node_modules/neo.mjs/src/core/Util.mjs":
/*!************************************************!*\
  !*** ./node_modules/neo.mjs/src/core/Util.mjs ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * @class Neo.core.Util
 * @extends Neo.core.Base
 */
class Util extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getStaticConfig() {return {
        /**
         * A regex to remove camel case syntax
         * @member {RegExp} decamelRegEx=/([a-z])([A-Z])/g
         * @private
         * @static
         */
        decamelRegEx: /([a-z])([A-Z])/g
    }}

    static getConfig() {return {
        /**
         * @member {String} className='Neo.core.Util'
         * @private
         */
        className: 'Neo.core.Util',
        /**
         * @member {String} ntype='core-util'
         * @private
         */
        ntype: 'core-util',
    }}

    /**
     * Converts a syles object which can use camelcase syntax into a styles string
     * @param {Object} styles The styles object
     * @returns {String} The styles string (DOM ready)
     */
    static createStyles(styles) {
        let style = '';

        Object.entries(styles).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                style += Util.decamel(key) + ':' + value + ';';
            }
        });

        return style;
    }

    /**
     * Makes the first character of a string uppercase
     * @param {String} string
     * @returns {Boolean|String} Returns false for non string inputs
     */
    static capitalize(string) {
        return Util.isString(string) && string[0].toUpperCase() + string.slice(1);
    }

    /**
     * Transforms all uppercase characters of a string into lowercase.
     * Does not touch special characters.
     * @param {String} value The input containing uppercase characters
     * @returns {String} The lowercase output
     */
    static decamel(value) {
        return value.replace(Util.decamelRegEx, '$1-$2').toLowerCase();
    }

    /**
     * Transforms a styles string into a styles object using camelcase syntax
     * @param {String} string The styles string to parse
     * @returns {Object} The camelcase styles object
     */
    static createStyleObject(string) {
        if (!string) {
            return null;
        }

        let parts;

        // split(';') does fetch semicolons inside brackets
        // -> background-image: "url('data:image/png;base64,...

        // TODO: Cache all regex
        return string.split(/;(?=[^\)]*(?:\(|$))/g).reduce((obj, el) => {
            // we have to split by the first colon only
            // -> background-image: url('http://example.com/image.png')
            parts = el.split((/:(.+)/)).map(function (x) {
                let num = parseFloat(x);

                return x == num ? num : x.trim();
            });

            if (parts[0] !== '') {
                parts[0] = parts[0].replace(/-([a-z])/g, (str, letter) => {
                    return letter.toUpperCase();
                });
                obj[parts[0]] = parts[1];
            }
            return obj;
        }, {});
    }

    /**
     * Returns true if the passed value is an array
     * @param {Object} value The value to test
     * @returns {Boolean}
     */
    static isArray(value) {
        return Array.isArray(value)
    }

    /**
     * Returns true if the passed value is a boolean
     * @param {Object} value The value to test
     * @returns {Boolean}
     */
    static isBoolean(value) {
        return typeof value === 'boolean';
    }

    /**
     * Returns true if the passed value is not undefined
     * @param {Object} value The value to test
     * @returns {Boolean}
     */
    static isDefined(value) {
        return typeof value !== 'undefined';
    }

    /**
     * Returns true if the passed value is an empty Array, Object or String
     * @param {Array|Object|String} value The value to test
     * @returns {Boolean}
     */
    static isEmpty(value) {
        if (Array.isArray(value)) {
            return value.length === 0;
        }

        if (Util.isObject(value)) {
            return Object.keys(value).length === 0;
        }

        if (Util.isString(value)) {
            return value === '';
        }

        return false;
    }

    /**
     * Returns true if the passed value is a function
     * @param {Function} value The value to test
     * @returns {Boolean}
     */
    static isFunction(value) {
        return typeof value === 'function';
    }

    /**
     * Returns true if the passed value is a number. Returns false for non-finite numbers
     * @param {Number} value The value to test
     * @returns {Boolean}
     */
    static isNumber(value){
        return typeof value === 'number' && isFinite(value);
    }

    /**
     * Returns true if the passed value is an object
     * @param {Object} value The value to test
     * @returns {Boolean}
     */
    static isObject(value) {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
    }

    /**
     * Returns true if the passed value is a string
     * @param {String} value The value to test
     * @returns {Boolean}
     */
    static isString(value) {
        return typeof value === 'string';
    }

    /**
     * Converts any iterable (strings, numeric indices and a length property) into a true array
     * @param {Object|String} iterable
     * @param {Number} [start=0] start index
     * @param {Number} [end=iterable.length] end index
     * @returns {Array}
     */
    static toArray(iterable, start, end) {
        let len;

        if (!iterable || !(len = iterable.length)) {
            return [];
        }

        if (typeof iterable === 'string') {
            return iterable.split('');
        }

        return Array.prototype.slice.call(iterable, start || 0, end || len);
    }
}

Neo.applyClassConfig(Util);

// aliases
Neo.applyFromNs(Neo, Util, {
    createStyleObject: 'createStyleObject',
    createStyles     : 'createStyles',
    capitalize       : 'capitalize',
    decamel          : 'decamel',
    isArray          : 'isArray',
    isBoolean        : 'isBoolean',
    isDefined        : 'isDefined',
    isEmpty          : 'isEmpty',
    isFunction       : 'isFunction',
    isNumber         : 'isNumber',
    isObject         : 'isObject',
    isString         : 'isString',
    toArray          : 'toArray'
}, true);

/* harmony default export */ __webpack_exports__["default"] = (Util);

/***/ }),

/***/ "./node_modules/neo.mjs/src/core/_export.mjs":
/*!***************************************************!*\
  !*** ./node_modules/neo.mjs/src/core/_export.mjs ***!
  \***************************************************/
/*! exports provided: Base, Logger, Observable, Util */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Base", function() { return _Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Logger_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Logger.mjs */ "./node_modules/neo.mjs/src/core/Logger.mjs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return _Logger_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Observable_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Observable.mjs */ "./node_modules/neo.mjs/src/core/Observable.mjs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Observable", function() { return _Observable_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Util_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Util.mjs */ "./node_modules/neo.mjs/src/core/Util.mjs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Util", function() { return _Util_mjs__WEBPACK_IMPORTED_MODULE_3__["default"]; });








/***/ }),

/***/ "./node_modules/neo.mjs/src/main/DomAccess.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/DomAccess.mjs ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");
/* harmony import */ var _mixin_DeltaUpdates_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mixin/DeltaUpdates.mjs */ "./node_modules/neo.mjs/src/main/mixin/DeltaUpdates.mjs");
/* harmony import */ var _core_Observable_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Observable.mjs */ "./node_modules/neo.mjs/src/core/Observable.mjs");




/**
 * @class Neo.main.DomAccess
 * @extends Neo.core.Base
 * @singleton
 */
class DomAccess extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.DomAccess'
         * @private
         */
        className: 'Neo.main.DomAccess',
        /**
         * @member {boolean} logDeltaUpdates=true
         */
        logDeltaUpdates: true,
        /**
         * @member {Array} mixins=[DeltaUpdates, Observable]
         */
        mixins: [
            _mixin_DeltaUpdates_mjs__WEBPACK_IMPORTED_MODULE_1__["default"],
            _core_Observable_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]
        ],
        /**
         * Remote method access for other workers
         * @member {Object} remote={app: [//...]}
         * @private
         */
        remote: {
            app: [
                'addScript',
                'applyBodyCls',
                'execCommand',
                'focus',
                'getAttributes',
                'getBoundingClientRect',
                'scrollIntoView',
                'scrollToTableRow',
                'selectNode',
                'windowScrollTo'
            ]
        },
        /**
         * @member {Boolean} singleton=true
         * @private
         */
        singleton: true,
        /**
         * Void attributes inside html tags
         * @member {String[]} voidAttributes
         * @private
         */
        voidAttributes: [
            'checked',
            'required'
        ]
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me = this;

        if (me.logDeltaUpdates) {
            me.countDeltas  = 0;
            me.countUpdates = 0;
        }
    }

    /**
     *
     * @param {Object} data
     * @param {Boolean} data.async
     * @param {Boolean} [data.defer=false]
     * @param {String} [data.src=true]
     */
    addScript(data) {
        const script = document.createElement('script');

        if (!data.hasOwnProperty('async')) {
            data.async = true;
        }

        Object.assign(script, data);

        document.head.appendChild(script);
    }

    /**
     *
     * @param {Object} data
     * @param {String[]} data.cls
     */
    applyBodyCls(data) {
        const cls = data.cls || [];
        document.body.classList.add(...cls);
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.command
     * @returns {Object} data
     */
    execCommand(data) {
        document.execCommand(data.command);
        return data;
    }

    /**
     * Calls focus on a node for a given dom node id
     * @param {Object} data
     * @returns {Object} obj.id => the passed id
     */
    focus(data) {
        let node = this.getElement(data.id);

        if (node) {
            node.focus();
        }

        return {id: data.id};
    }

    /**
     * Returns the attributes for a given dom node id
     * @param {Object} data
     * @param {Array|String} data.id either an id or an array of ids
     * @param {Array|String} data.attributes either an attribute or an array of attributes
     * @returns {Array|Object} In case id is an array, an array of atrrbute objects is returned, otherwise an object
     */
    getAttributes(data) {
        let returnData;

        if (Array.isArray(data.id)) {
            returnData = [];

            data.id.forEach(id => {
                returnData.push(this.getAttributes({
                    attributes: data.attributes,
                    id        : id
                }));
            });
        } else {
            let node = this.getElementOrBody(data.id);

            returnData = {};

            if (node) {
                if (!Array.isArray(data.attributes)) {
                    data.attributes = [data.attributes];

                    data.attributes.forEach(attribute => {
                        returnData[attribute] = node[attribute];
                    })
                }
            }
        }

        return returnData;
    }

    /**
     * Returns node.getBoundingClientRect() for a given dom node id
     * @param {Object} data
     * @param {Array|String} data.id either an id or an array of ids
     * @returns {Array|Object} In case id is an array, an array of DomRects is returned, otherwise an DomRect object
     */
    getBoundingClientRect(data) {
        let returnData;

        if (Array.isArray(data.id)) {
            returnData = [];

            data.id.forEach(id => {
                returnData.push(this.getBoundingClientRect({id: id}));
            });
        } else {
            let node = this.getElementOrBody(data.id),
                rect = {};

            returnData = {};

            if (node) {
                rect = node.getBoundingClientRect();

                // DomRect does not support spreading => {...DomRect} => {}
                Object.assign(returnData, {
                    bottom: rect.bottom,
                    height: rect.height,
                    left  : rect.left,
                    right : rect.right,
                    top   : rect.top,
                    width : rect.width,
                    x     : rect.x,
                    y     : rect.y
                });
            }
        }

        return returnData;
    }

    /**
     *
     * @param {String} nodeId
     * @return {HTMLElement}
     * @private
     */
    getElement(nodeId) {
        return document.getElementById(nodeId);
    }

    /**
     *
     * @param {String} [nodeId='body']
     * @return {HTMLElement}
     * @private
     */
    getElementOrBody(nodeId) {
        if (!nodeId || nodeId === 'body' || nodeId === 'document.body') {
            return document.body;
        }

        return this.getElement(nodeId);
    }

    /**
     * Include a script into the document.head
     * @param {String} src
     * @param {Boolean} [async=true]
     * @return {Promise<unknown>}
     */
    loadScript(src, async=true) {
        let script;

        return new Promise((resolve, reject) => {
            script = document.createElement('script');

            Object.assign(script, {
                async  : async,
                onerror: reject,
                onload : resolve,
                src    : src
            });

            document.head.appendChild(script);
        });
    }

    /**
     * Include a link into the document.head
     * @param {String} href
     * @return {Promise<unknown>}
     */
    loadStylesheet(href) {
        let link;

        return new Promise((resolve, reject) => {
            link = document.createElement('link');

            Object.assign(link, {
                href   : href,
                onerror: reject,
                onload : resolve,
                rel    : 'stylesheet',
                type   : 'text/css'
            });

            document.head.appendChild(link);
        });
    }

    /**
     *
     */
    onDomContentLoaded() {
        if (Neo.config.applyBodyCls) {
            this.applyBodyCls({cls: ['neo-body']});
        }
    }

    /**
     *
     * @param {Object} data
     * @param {String[]} data.attributes
     * @param {Array} data.functions An array containing strings and/or objects
     * @param {String[]} data.styles
     * @param {String} data.vnodeId
     * @private
     */
    onReadDom(data) {
        let attributes    = data.attributes || [],
            functions     = data.functions  || [],
            styles        = data.styles     || [],
            vnodeId       = data.vnodeId,
            retAttributes = {},
            retFunctions  = {},
            retStyles     = {},
            element       = vnodeId ? this.getElement(vnodeId) : null,
            fnName, scope;

        attributes.forEach(key => {
            retAttributes[key] = element[key];
        });

        functions.forEach((key, index) => {
            if (Neo.isObject(key)) {
                key.params         = key.params         || [];
                key.paramIsDomNode = key.paramIsDomNode || [];

                scope = key.scope ? document[key.scope] : element;

                key.params.forEach((param, paramIndex) => {
                    if (key.paramIsDomNode[paramIndex] && key.paramIsDomNode[paramIndex] === true) {
                        key.params[paramIndex] = this.getElement(key.params[paramIndex]);
                    }
                });

                fnName = key.returnFnName ? key.returnFnName : index;
                retFunctions[fnName] = scope[key.fn](...key.params);

                if (key.returnValue) {
                    retFunctions[fnName] = retFunctions[fnName][key.returnValue];
                }
            } else {
                retFunctions[key] = element[key]();
            }
        });

        styles.forEach(key => {
            retStyles[key] = element.style[key];
        });

        Object.assign(data, {
            attributes: retAttributes,
            functions : retFunctions,
            styles    : retStyles
        });

        Neo.worker.Manager.sendMessage(data.origin, {
            action : 'reply',
            data   : data,
            replyId: data.id,
            success: true
        });
    }

    /**
     *
     * @param {Object} data
     * @private
     */
    read(data) {
        if (typeof data === 'function') {
            data();
        }
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.id
     * @param {String} [data.behavior='smooth']
     * @param {String} [data.block='start']
     * @param {String} [data.inline='nearest']
     * @returns {Object} obj.id => the passed id
     */
    scrollIntoView(data) {
        let node = this.getElement(data.id);

        if (node) {
            node.scrollIntoView({
                behavior: data.behavior || 'smooth',
                block   : data.block    || 'start',
                inline  : data.inline   || 'nearest'
            });
        }

        return {id: data.id};
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.id
     * @param {String} [data.behavior='smooth']
     * @param {String} [data.offset=34]
     * @returns {Object} obj.id => the passed id
     */
    scrollToTableRow(data) {
        let node = this.getElement(data.id); // tr tag

        if (node) {
            let tableNode   = node.parentNode.parentNode,
                wrapperNode = tableNode.parentNode,
                tableTop    = tableNode.getBoundingClientRect().top,
                top         = node.getBoundingClientRect().top;

            wrapperNode.scrollTo({
                top     : top - tableTop - (data.hasOwnProperty('offset') ? data.offset : 34),
                behavior: data.behavior || 'smooth'
            });
        }

        return {id: data.id};
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.id
     * @param {Number} [data.start=0]
     * @param {Number} [data.end=99999]
     * @returns {Object} obj.id => the passed id
     */
    selectNode(data) {
        let node  = this.getElement(data.id),
            start = Neo.isNumber(data.start) || 0,
            end   = Neo.isNumber(data.end)   || 99999;

        if (node) {
            node.select();
            node.setSelectionRange(start, end);
        }

        return {id: data.id};
    }

    /**
     *
     * @param {Object} data
     * @param {String} [data.behavior='smooth'] // auto or smooth
     * @param {String} [data.left=0]
     * @param {String} [data.top=0]
     */
    windowScrollTo(data) {
        window.scrollTo({
            behavior: data.behavior || 'smooth',
            left    : data.left     || 0,
            top     : data.top      || 0
        });
    }

    /**
     *
     * @param {Object} data
     * @private
     */
    write(data) {
        let container   = this.getElementOrBody(data.parentId),
            countChilds = container.children.length,
            index       = data.parentIndex,
            html        = data.html || data.outerHTML;

        if (!data.parentIndex || countChilds < 1) {
            container.insertAdjacentHTML('beforeend', html);
        } else {
            if (countChilds > index) {
                container.children[index].insertAdjacentHTML('beforebegin', html);
            } else {
                container.children[countChilds - 1].insertAdjacentHTML('afterend', html);
            }
        }
    }
}

Neo.applyClassConfig(DomAccess);

let instance = Neo.create(DomAccess);

Neo.applyToGlobalNs(instance);

/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ }),

/***/ "./node_modules/neo.mjs/src/main/DomEvents.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/DomEvents.mjs ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");
/* harmony import */ var _core_Observable_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Observable.mjs */ "./node_modules/neo.mjs/src/core/Observable.mjs");
/* harmony import */ var _mixin_TouchDomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mixin/TouchDomEvents.mjs */ "./node_modules/neo.mjs/src/main/mixin/TouchDomEvents.mjs");




const globalDomEvents = [
    {name: 'change',      handler: 'onChange'},
    {name: 'click',       handler: 'onClick'},
    {name: 'contextmenu', handler: 'onContextMenu'},
    {name: 'focusin',     handler: 'onFocusIn'},
    {name: 'focusout',    handler: 'onFocusOut'},
    {name: 'input',       handler: 'onChange'},
    {name: 'keydown',     handler: 'onKeyDown'},
    {name: 'keyup',       handler: 'onKeyUp'},
    {name: 'mouseenter',  handler: 'onMouseEnter', options: {capture: true}},
    {name: 'mouseleave',  handler: 'onMouseLeave', options: {capture: true}},
    {name: 'wheel',       handler: 'onWheel',      options: {passive: false}}
];

// Will get applied to the document.body in case Neo.config.useTouchEvents === true (default value)
const touchEvents = [
    {name: 'touchcancel', handler: 'onTouchCancel'},
    {name: 'touchend',    handler: 'onTouchEnd'},
    {name: 'touchenter',  handler: 'onTouchEnter'},
    {name: 'touchleave',  handler: 'onTouchLeave'},
    {name: 'touchmove',   handler: 'onTouchMove'},
    {name: 'touchstart',  handler: 'onTouchStart'}
];

// wheel events fire very often, so we limit the targets to avoid unnecessary post messages from main to the app worker
const globalWheelTargets = [
    'neo-circle-component',
    'neo-dateselector',
    'neo-gallery',
    'neo-helix'
];

// separated from globalWheelTargets => performance
const globalWheelTargetsBuffer = {
    'neo-dateselector': 300 // buffer in ms
};

const lastWheelEvent = {
    date  : null,
    target: null
};

const preventClickTargets       = [],
      preventContextmenuTargets = [];

/**
 * @class Neo.main.DomEvents
 * @extends Neo.core.Base
 * @singleton
 */
class DomEvents extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
         * @member {String} className='Neo.main.DomEvents'
         * @private
         */
        className: 'Neo.main.DomEvents',
        /**
         * todo: conditional dynamic import once the build processes can handle it
         * @member {Array} mixins=[TouchDomEvents]
         */
        mixins: [_mixin_TouchDomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]],
        /**
         * @member {boolean} singleton=true
         * @private
         */
        singleton: true,
        /**
         * Remote method access for other workers
         * @member {Object} remote={app: ['addDomListener']}
         * @private
         */
        remote: {
            app: [
                'addDomListener',
                'registerPreventDefaultTargets'
            ]
        }
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me = this;

        document.addEventListener('DOMContentLoaded', me.onDomContentLoaded.bind(me));
        window  .addEventListener('hashchange',       me.onHashChange      .bind(me));
    }

    /**
     *
     * @param {Object} data
     */
    addDomListener(data) {
        let me  = this,
            i   = 0,
            len = data.events.length,
            event, id, targetNode;

        for (; i < len; i++) {
            event = data.events[i];

            if (!me[event.handler]) {
                me[event.handler] = Neo.emptyFn;
            }

            id = event.vnodeId || data.vnodeId;

            if (id === 'document.body') {
                targetNode = document.body;
            } else {
                targetNode = document.getElementById(id);
            }

            targetNode.addEventListener(event.name, me[event.handler].bind(me));
        }

        Neo.worker.Manager.sendMessage(data.origin, {
            action : 'reply',
            data   : data,
            replyId: data.id,
            success: true
        });
    }

    /**
     *
     */
    addGlobalDomListeners() {
        let me = this;

        [...globalDomEvents].concat(Neo.config.useTouchEvents ? touchEvents : []).forEach(event => {
            document.body.addEventListener(event.name, me[event.handler].bind(me), event.options);
        });
    }

    /**
     * Local domEvent listener
     * @param {Object} event
     */
    domEventListener(event) {
        let me     = this,
            target = event.target,
            config = {
                action   : 'domEvent',
                eventName: event.type,

                data: {
                    id   : target.id,
                    path : (event.path || event.composedPath()).map(e => e.id), // FF does not support composedPath()
                    value: target.value,
                }
            };

        // console.log('domEventListener', event.type, target.id, target.value, event);

        switch (event.type) {
            case 'dragend':
                me.dragElementId = null;
                break;
            case 'dragenter':
                if (me.dragElementId === target.id) {
                    return; // ignore target and source to be the same
                }
                break;
            case 'dragleave':
                if (me.dragElementId === target.id) {
                    return; // ignore target and source to be the same
                }
                break;
            case 'dragover':
                me.onDragOver(event);
                event.preventDefault();
                break;
            case 'dragstart':
                me.dragElementId = target.id;
                break;
            case 'drop':
                if (!me.dragElementId || this.dragElementId === target.id) {
                    return; // drop fires twice by default & drop should not trigger on the drag element
                }
                if (event.stopPropagation) {
                    event.stopPropagation(); // stops the browser from redirecting.
                }
                event.preventDefault();
                config.data.srcId = me.dragElementId;
                me.dragElementId = null;
                break;
            default:
                event.preventDefault();
                break;
        }

        Neo.worker.Manager.sendMessage('app', config);
    }

    getEventData(event) {
        let path = event.path || event.composedPath(); // FF does not support composedPath()

        return {
            path     : path.map(e => this.getTargetData(e)),
            target   : this.getTargetData(event.target),
            timeStamp: event.timeStamp,
            type     : event.type
        };
    }

    getKeyboardEventData(event) {
        const {altKey, code, ctrlKey, key, keyCode, metaKey, shiftKey} = event;

        return {
            ...this.getEventData(event),
            altKey  : altKey,
            code    : code,
            ctrlKey : ctrlKey,
            key     : key,
            keyCode : keyCode,
            metaKey : metaKey,
            shiftKey: shiftKey
        };
    }

    getMouseEventData(event) {
        const {altKey, clientX, clientY, ctrlKey, metaKey, offsetX, offsetY, pageX, pageY, screenX, screenY, shiftKey} = event;

        return {
            ...this.getEventData(event),
            altKey  : altKey,
            clientX : clientX,
            clientY : clientY,
            ctrlKey : ctrlKey,
            metaKey : metaKey,
            offsetX : offsetX,
            offsetY : offsetY,
            pageX   : pageX,
            pageY   : pageY,
            screenX : screenX,
            screenY : screenY,
            shiftKey: shiftKey
        };
    }

    /**
     *
     * @param {Object} node
     * @returns {Object}
     */
    getTargetData(node) {
        return {
            checked          : node.checked,
            childElementCount: node.childElementCount,
            clientHeight     : node.clientHeight,
            clientLeft       : node.clientLeft,
            clientTop        : node.clientTop,
            clientWidth      : node.clientWidth,
            cls              : node.classList ? [...node.classList] : [],
            data             : {...node.dataset},
            draggable        : node.draggable,
            hidden           : node.hidden,
            id               : node.id,
            inert            : node.inert,
            isConnected      : node.isConnected,
            isContentEditable: node.isContentEditable,
            nodeType         : node.nodeType,
            offsetHeight     : node.offsetHeight,
            offsetLeft       : node.offsetLeft,
            offsetTop        : node.offsetTop,
            offsetWidth      : node.offsetWidth,
            scrollHeight     : node.scrollHeight,
            scrollLeft       : node.scrollLeft,
            scrollTop        : node.scrollTop,
            scrollWidth      : node.scrollWidth,
            style            : node.style && node.style.cssText,
            tabIndex         : node.tabIndex,
            tagName          : node.tagName && node.tagName.toLowerCase()
        };
    }

    /**
     *
     * @param {Object} event
     */
    onChange(event) {
        this.sendMessageToApp({
            ...this.getEventData(event),
            valid: event.target.checkValidity(),
            value: event.target.value
        });
    }

    /**
     *
     * @param {Object} event
     */
    onClick(event) {
        let me = this;

        me.sendMessageToApp(me.getMouseEventData(event));

        if (me.testPathInclusion(event, preventClickTargets)) {
            event.preventDefault();
        }
    }

    /**
     *
     * @param {Object} event
     */
    onContextMenu(event) {
        let me = this;

        me.sendMessageToApp(me.getMouseEventData(event));

        if (me.testPathInclusion(event, preventContextmenuTargets)) {
            event.preventDefault();
        }
    }

    /**
     *
     */
    onDomContentLoaded() {
        this.addGlobalDomListeners();
        this.fire('domContentLoaded');
    }

    /**
     *
     * @param {Object} event
     */
    onDragOver(event) {
        event.dataTransfer.dropEffect = 'move';
        //console.log('onDragOver', event);
    }

    /**
     *
     * @param {Object} event
     */
    onFocusIn(event) {
        this.sendMessageToApp(this.getEventData(event));
    }

    /**
     *
     * @param {Object} event
     */
    onFocusOut(event) {
        this.sendMessageToApp(this.getEventData(event));
    }

    /**
     *
     */
    onHashChange() {
        const hashString = location.hash.substr(1);

        Neo.worker.Manager.sendMessage('app', {
            action    : 'hashChange',
            hash      : this.parseHash(hashString),
            hashString: hashString
        });
    }

    /**
     *
     * @param {Object} event
     */
    onKeyDown(event) {
        this.sendMessageToApp(this.getKeyboardEventData(event));

        if (['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp'].includes(event.key)) {
            event.preventDefault();
        }
    }

    /**
     *
     * @param {Object} event
     */
    onKeyUp(event) {
        this.sendMessageToApp(this.getKeyboardEventData(event));
    }

    /**
     *
     * @param {Object} event
     */
    onMouseEnter(event) {
        this.sendMessageToApp({
            ...this.getMouseEventData(event),
            fromElementId: event.fromElement && event.fromElement.id || null
        });
    }

    /**
     *
     * @param {Object} event
     */
    onMouseLeave(event) {
        this.sendMessageToApp({
            ...this.getMouseEventData(event),
            toElementId: event.toElement && event.toElement.id || null
        });
    }

    /**
     *
     * @param {Object} event
     */
    onWheel(event) {
        let targetCls     = this.testPathInclusion(event, globalWheelTargets),
            preventUpdate = false;

        if (targetCls) {
            if (globalWheelTargetsBuffer[targetCls]) {
                let date = new Date();

                if (lastWheelEvent.date && lastWheelEvent.target === targetCls && date - lastWheelEvent.date < globalWheelTargetsBuffer[targetCls]) {
                    preventUpdate = true;
                } else {
                    Object.assign(lastWheelEvent, {
                        date  : date,
                        target: targetCls
                    });
                }
            }

             if (!preventUpdate) {
                const {deltaX, deltaY, deltaZ} = event;

                this.sendMessageToApp({
                    ...this.getEventData(event),
                    deltaX: deltaX,
                    deltaY: deltaY,
                    deltaZ: deltaZ
                });
            }

            event.preventDefault();
        }
    }

    /**
     * Example for Array values: "categories[]=test1&categories[]=test2"
     * @param {String} str
     * @returns {Object}
     */
    parseHash(str) {
        if (str === '') {
            return {};
        }

        let pieces = str.split('&'),
            data   = {},
            i, key, parts, value;

        for (i = 0; i < pieces.length; i++) {
            parts = pieces[i].split('=');

            if (parts.length < 2) {
                parts.push('');
            }

            key   = decodeURIComponent(parts[0]);
            value = decodeURIComponent(parts[1]);

            if (key.indexOf('[]') !== -1) {
                key = key.substring(0, key.indexOf('[]'));

                if (typeof data[key] === 'undefined') {
                    data[key] = [];
                }

                data[key].push(this.parseValue(value));
            } else {
                data[key] = this.parseValue(value);
            }
        }

        return data;
    }

    /**
     * used by parseHash to convert tokens into boolean or number types if needed
     * @param {String} value
     * @returns {Boolean|Number|String}
     * @private
     */
    parseValue(value) {
        if (value == parseInt(value)) {
            value = parseInt(value);
        } else if (value === 'false') {
            value = false;
        } else if (value === 'true') {
            value = true;
        }

        return value;
    }

    /**
     *
     * @param {Object} data
     * @param {Array|String} data.cls
     * @param {String} data.name
     */
    registerPreventDefaultTargets(data) {
        let preventArray;

        if (!Array.isArray(data.cls)) {
            data.cls = [data.cls];
        }

        switch (data.name) {
            case 'click':
                preventArray = preventClickTargets;
                break;
            case 'contextmenu':
                preventArray = preventContextmenuTargets;
                break;
        }

        data.cls.forEach(cls => {
            if (!preventArray.includes(cls)) {
                preventArray.push(cls);
            }
        });
    }

    /**
     * Sends the parsed event data to the app worker
     * @param {Object} data
     * @private
     */
    sendMessageToApp(data) {
        Neo.worker.Manager.sendMessage('app', {
            action   : 'domEvent',
            eventName: data.type,
            data     : data
        });
    }



    /**
     *
     * @param {Object} event
     * @param {Object} targetArray
     * @returns {String|Boolean} target cls if found, false otherwise
     */
    testPathInclusion(event, targetArray) {
        let countTargets = targetArray.length,
            path         = event.path || event.composedPath(),
            i            = 0,
            len          = path.length,
            j, node;

        for (; i < len; i++) {
            node = path[i];

            for (j=0; j < countTargets; j++) {
                if (node.classList && node.classList.contains(targetArray[j])) {
                    return targetArray[j];
                }
            }
        }

        return false;
    }
}

Neo.applyClassConfig(DomEvents);

let instance = Neo.create(DomEvents);

Neo.applyToGlobalNs(instance);

/* harmony default export */ __webpack_exports__["default"] = (instance);


/***/ }),

/***/ "./node_modules/neo.mjs/src/main/addon lazy recursive ^\\.\\/.*\\.mjs$":
/*!****************************************************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/addon lazy ^\.\/.*\.mjs$ strict namespace object ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./AmCharts.mjs": [
		"./node_modules/neo.mjs/src/main/addon/AmCharts.mjs",
		"src/main/addon/AmCharts-mjs"
	],
	"./GoogleAnalytics.mjs": [
		"./node_modules/neo.mjs/src/main/addon/GoogleAnalytics.mjs",
		"src/main/addon/GoogleAnalytics-mjs"
	],
	"./HighlightJS.mjs": [
		"./node_modules/neo.mjs/src/main/addon/HighlightJS.mjs",
		"vendors~src/main/addon/HighlightJS-mjs"
	],
	"./LocalStorage.mjs": [
		"./node_modules/neo.mjs/src/main/addon/LocalStorage.mjs",
		"src/main/addon/LocalStorage-mjs"
	],
	"./MapboxGL.mjs": [
		"./node_modules/neo.mjs/src/main/addon/MapboxGL.mjs",
		"vendors~src/main/addon/MapboxGL-mjs"
	],
	"./Markdown.mjs": [
		"./node_modules/neo.mjs/src/main/addon/Markdown.mjs",
		"src/main/addon/Markdown-mjs"
	],
	"./Siesta.mjs": [
		"./node_modules/neo.mjs/src/main/addon/Siesta.mjs",
		"src/main/addon/Siesta-mjs"
	],
	"./Stylesheet.mjs": [
		"./node_modules/neo.mjs/src/main/addon/Stylesheet.mjs",
		"src/main/addon/Stylesheet-mjs"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./node_modules/neo.mjs/src/main/addon lazy recursive ^\\.\\/.*\\.mjs$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./node_modules/neo.mjs/src/main/mixin/DeltaUpdates.mjs":
/*!**************************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/mixin/DeltaUpdates.mjs ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DeltaUpdates; });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * Logic to apply the deltas generated by vdom.Helper to the real DOM
 * @class Neo.main.mixin.DeltaUpdates
 * @extends Neo.core.Base
 * @singleton
 */
class DeltaUpdates extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.mixin.DeltaUpdates'
         * @private
         */
        className: 'Neo.main.mixin.DeltaUpdates'
    }}

    /**
     *
     * @param {Object} delta
     * @param {String} delta.id
     */
    du_focusNode(delta) {
        this.getElement(delta.id).focus();
    }

    /**
     * node.children contains the "real" nodes (tags)
     * node.childNodes contains texts & comments as nodes too
     * since every vtype:'text' is wrapped inside a comment block (as an id),
     * we need the amount of nodes which are not comments to get the "realIndex".
     * insertAdjacentHTML() is faster than creating a node (template), but only available
     * for children and not for childNodes.
     * In case there are no comments (=> vtype: 'text' nodes), we stick to it for performance reasons.
     *
     * @param {Object} delta
     * @param {String} delta.index
     * @param {String} delta.outerHTML
     * @param {String} delta.parentId
     */
    du_insertNode(delta) {
        let index         = delta.index,
            parentNode    = this.getElement(delta.parentId),
            countChildren = parentNode.childNodes.length,
            i             = 0,
            realIndex     = index,
            hasComments   = false,
            node;

        // console.log('insertNode', index, countChildren, delta.parentId);

        for (; i < countChildren; i++) {
            if (parentNode.childNodes[i].nodeType === 8) { // ignore comments
                if (i < realIndex) {
                    realIndex++;
                }

                hasComments = true;
            }
        }

        if (!hasComments) {
            countChildren = parentNode.children.length;

            if (countChildren > 0 && countChildren > index) {
                parentNode.children[index].insertAdjacentHTML('beforebegin', delta.outerHTML);
            } else if (countChildren > 0) {
                parentNode.children[countChildren - 1].insertAdjacentHTML('afterend', delta.outerHTML);
            } else {
                parentNode.insertAdjacentHTML('beforeend', delta.outerHTML);
            }
        } else {
            node = this.htmlStringToElement(delta.outerHTML);

            if (countChildren > 0 && countChildren > realIndex) {
                parentNode.insertBefore(node, parentNode.childNodes[realIndex]);
            } else {
                parentNode.appendChild(node);
            }
        }
    }

    /**
     *
     * @param {Object} delta
     * @param {String} delta.id
     * @param {String} delta.index
     * @param {String} delta.parentId
     */
    du_moveNode(delta) {
        let index      = delta.index,
            node       = this.getElement(delta.id),
            parentNode = this.getElement(delta.parentId);

        if (index >= parentNode.children.length) {
            parentNode.appendChild(node);
        } else {
            //index++; // todo?: increase the index in case same parent, oldIndex < newIndex, direct swap
            if (node && parentNode.children[index].id !== delta.id) {
                parentNode.insertBefore(node, parentNode.children[index]);
            }
        }
    }

    /**
     *
     * @param {Object} delta
     * @param {String} delta.id
     */
    du_removeNode(delta) {
        let node = this.getElement(delta.id);

        if (!node) {
            // console.warn('du_removeNode: dom node not found for id', delta.id);
        } else {
            node.parentNode.removeChild(node);
        }
    }

    /**
     *
     * @param {Object} delta
     * @param {String} delta.fromId
     * @param {String} delta.parentId
     * @param {String} delta.toId
     */
    du_replaceChild(delta) {
        let me   = this,
            node = me.getElement(delta.parentId);

        node.replaceChild(me.getElement(delta.toId), me.getElement(delta.fromId));
    }

    /**
     *
     * @param {Object} delta
     * @param {String} [delta.attributes]
     * @param {String} [delta.cls]
     * @param {String} [delta.id]
     * @param {String} [delta.innerHTML]
     * @param {String} [delta.outerHTML]
     * @param {String} [delta.style]
     */
    du_updateNode(delta) {
        let node = this.getElementOrBody(delta.id);

        if (!node) {
            console.warn('du_updateNode: node not found for id', delta.id);
        } else {
            Object.entries(delta).forEach(([prop, value]) => {
                switch(prop) {
                    case 'attributes':
                        Object.entries(value).forEach(([key, value]) => {
                            if (this.voidAttributes.includes(key)) {
                                node[key] = value === 'true'; // vnode attribute values get converted into strings
                            } else if (value === null || value === '') {
                                if (key === 'value') {
                                    node[key] = ''; // input fields => pseudo attribute can not be removed
                                } else {
                                    node.removeAttribute(key);
                                }
                            } else {
                                node[key] = value;
                            }
                        });
                        break;
                    case 'cls':
                        node.classList.add(...value.add || []);
                        node.classList.remove(...value.remove || []);
                        break;
                    case 'innerHTML':
                        node.innerHTML = value || '';
                        break;
                    case 'outerHTML':
                        node.outerHTML = data.outerHTML;
                        break;
                    case 'style':
                        if (Neo.isObject(value)) {
                            if (node) {
                                Object.keys(value).forEach(function(styleName) {
                                    node.style[styleName] = value[styleName];
                                });
                            }
                        }
                        break;
                }
            });
        }
    }

    /**
     *
     * @param {Object} delta
     * @param {String} delta.id
     * @param {String} delta.parentId
     * @param {String} delta.value
     */
    du_updateVtext(delta) {
        let me        = this,
            node      = me.getElement(delta.parentId),
            innerHTML = node.innerHTML,
            startTag  = `<!-- ${delta.id} -->`,
            reg       = new RegExp(startTag + '[\\s\\S]*?<!-- \/neo-vtext -->');

        node.innerHTML = innerHTML.replace(reg, delta.value);
    }

    /**
     * @param {String} html representing a single element
     * @return {ChildNode}
     */
    htmlStringToElement(html) {
        const template = document.createElement('template');
        template.innerHTML = html;
        return template.content.firstChild;
    }

    /**
     *
     * @param {Object} data
     * @param {Object|Object[]} data.deltas
     * @param {String} data.id
     * @param {String} [data.origin='app']
     */
    update(data) {
        let me     = this,
            deltas = data.deltas,
            i      = 0,
            len;

        deltas = Array.isArray(deltas) ? deltas : [deltas];
        len    = deltas.length;

        if (me.logDeltaUpdates) {
            me.countDeltas += (data.deltas && data.deltas.length || 0);
            me.countUpdates++;
            console.log('update ' + me.countUpdates, 'total deltas ', me.countDeltas, Neo.clone(data, true));
        }

        const map = {
            focusNode   : me.du_focusNode,
            insertNode  : me.du_insertNode,
            moveNode    : me.du_moveNode,
            removeNode  : me.du_removeNode,
            replaceChild: me.du_replaceChild,
            updateVtext : me.du_updateVtext,
            default     : me.du_updateNode
        };

        for (; i < len; i++) {
            (map[deltas[i].action] || map['default']).call(me, deltas[i]);
        }

        Neo.worker.Manager.sendMessage(data.origin || 'app', {
            action : 'reply',
            replyId: data.id,
            success: true
        });
    }
}

Neo.applyClassConfig(DeltaUpdates);



/***/ }),

/***/ "./node_modules/neo.mjs/src/main/mixin/TouchDomEvents.mjs":
/*!****************************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/mixin/TouchDomEvents.mjs ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TouchDomEvents; });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * Will get imported in case Neo.config.useTouchEvents === true
 * @class Neo.main.mixin.TouchDomEvents
 * @extends Neo.core.Base
 * @singleton
 */
class TouchDomEvents extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {
        return {
            /**
             * @member {String} className='Neo.main.mixin.TouchDomEvents'
             * @private
             */
            className: 'Neo.main.mixin.TouchDomEvents'
        }
    }

    /**
     *
     * @param {Object} event
     */
    onTouchCancel(event) {
        this.sendMessageToApp(this.getEventData(event));
    }

    /**
     *
     * @param {Object} event
     */
    onTouchEnd(event) {
        this.sendMessageToApp(this.getEventData(event));
    }

    /**
     *
     * @param {Object} event
     */
    onTouchEnter(event) {
        this.sendMessageToApp(this.getEventData(event));
    }

    /**
     *
     * @param {Object} event
     */
    onTouchLeave(event) {
        this.sendMessageToApp(this.getEventData(event));
    }

    /**
     *
     * @param {Object} event
     */
    onTouchMove(event) {
        this.sendMessageToApp(this.getEventData(event));
    }

    /**
     *
     * @param {Object} event
     */
    onTouchStart(event) {
        console.log('onTouchStart', event);
        this.sendMessageToApp(this.getEventData(event));
    }
}

Neo.applyClassConfig(TouchDomEvents);



/***/ }),

/***/ "./node_modules/neo.mjs/src/worker/Manager.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/neo.mjs/src/worker/Manager.mjs ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");
/* harmony import */ var _main_DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../main/DomAccess.mjs */ "./node_modules/neo.mjs/src/main/DomAccess.mjs");
/* harmony import */ var _main_DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../main/DomEvents.mjs */ "./node_modules/neo.mjs/src/main/DomEvents.mjs");
/* harmony import */ var _Message_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Message.mjs */ "./node_modules/neo.mjs/src/worker/Message.mjs");
/* harmony import */ var _core_Observable_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/Observable.mjs */ "./node_modules/neo.mjs/src/core/Observable.mjs");
/* harmony import */ var _mixins_RemoteMethodAccess_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mixins/RemoteMethodAccess.mjs */ "./node_modules/neo.mjs/src/worker/mixins/RemoteMethodAccess.mjs");







/**
 * The worker manager lives inside the main thread and creates the App, Data & VDom worker.
 * Also responsible for sending messages from the main thread to the different workers.
 * @class Neo.worker.Manager
 * @extends Neo.core.Base
 * @singleton
 */
class Manager extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.worker.Manager'
         * @private
         */
        className: 'Neo.worker.Manager',
        /**
         * @member {String} ntype='worker-manager'
         * @private
         */
        ntype: 'worker-manager',
        /**
         * @member {boolean} singleton=true
         * @private
         */
        singleton: true,
        /**
         * The base path for the worker file URLs, can e.g. get set inside the index.html.
         * @member {String|null} basePath=Neo.config.workerBasePath || 'worker/'
         * @private
         */
        basePath: Neo.config.workerBasePath || 'worker/',
        /**
         * @member {Number} constructedThreads=0
         * @private
         */
        constructedThreads: 0,
        /**
         * @member {String[]|Neo.core.Base[]|null} mixins=[Observable, RemoteMethodAccess]
         */
        mixins: [_core_Observable_mjs__WEBPACK_IMPORTED_MODULE_4__["default"], _mixins_RemoteMethodAccess_mjs__WEBPACK_IMPORTED_MODULE_5__["default"]],
        /**
         * True in case the current browser supports window.SharedWorker.
         * @member {Boolean} sharedWorkersEnabled=false
         * @private
         */
        sharedWorkersEnabled: false,
        /**
         * Internal flag to stop the worker communication in case their creation fails
         * @member {Boolean} stopCommunication=false
         * @private
         */
        stopCommunication: false,
        /**
         * True in case the current browser supports window.Worker.
         * The neo.mjs framework is not able to run without web workers.
         * @member {Boolean} sharedWorkersEnabled=false
         * @private
         */
        webWorkersEnabled: false,
        /**
         * Contains the fileNames for the App, Data & Vdom workers
         * @member {Object} workers
         * @private
         */
        workers: {
            app: {
                fileName: Neo.config.isExperimental ? 'App.mjs'  : Neo.config.appPath
            },
            data: {
                fileName: Neo.config.isExperimental ? 'Data.mjs' : 'dataworker.js'
            },
            vdom: {
                fileName: Neo.config.isExperimental ? 'VDom.mjs' : 'vdomworker.js'
            }
        }
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        const me = this;

        me.detectFeatures();

        if (!Neo.insideWorker) {
            me.createWorkers();
        }

        Neo.workerId = 'main';

        me.promises = {};

        me.on({
            'message:addDomListener'   : {fn: _main_DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].addDomListener, scope: _main_DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]},
            'message:readDom'          : {fn: _main_DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].onReadDom,      scope: _main_DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]},
            'message:registerRemote'   : {fn: me.onRegisterRemote,      scope: me},
            'message:workerConstructed': {fn: me.onWorkerConstructed,   scope: me}
        });
    }

    /**
     *
     */
    detectFeatures() {
        const me = this;

        if (window.Worker) {
            me.webWorkersEnabled = true;
        } else {
            throw new Error('Your browser does not support Web Workers');
        }

        if (window.SharedWorker) {
            me.sharedWorkersEnabled = true;
        }
    }

    /**
     *
     * @param {String|Worker} name
     * @returns {Worker}
     */
    getWorker(name) {
        return name instanceof Worker ? name : this.workers[name].worker;
    }

    /**
     * Creates a web worker using the passed options as well as adding error & message event listeners.
     * @param {Object} opts
     * @returns {Worker}
     */
    createWorker(opts) {
        const me       = this,
              filePath = (opts.basePath || me.basePath) + opts.fileName,
              worker   = !Neo.config.isExperimental ? // todo: switch to the new syntax to create a worker from a JS module once browsers are ready
                  new Worker(filePath) :
                  new Worker(filePath, {type: 'module'});

        worker.addEventListener('message', me.onWorkerMessage.bind(me));
        worker.addEventListener('error', me.onWorkerError.bind(me));

        return worker;
    }

    /**
     * Calls createWorker for each worker inside the this.workers config.
     */
    createWorkers() {
        let me      = this,
            hash    = location.hash,
            workers = Object.entries(me.workers),
            key, value;

        // pass the initial hash value as Neo.configs
        if (hash) {
            Neo.config.hash       = _main_DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].parseHash(hash.substr(1));
            Neo.config.hashString = hash.substr(1);
        }

        for ([key, value] of workers) {
            try {
                value.worker = me.createWorker(value);
            } catch (e) {
                document.body.innerHTML = e;
                me.stopCommunication = true;
                break;
            }

            me.sendMessage(key, {
                action: 'registerNeoConfig',
                data  : Neo.config
            });
        }
    }

    /**
     *
     * @param {Object} data
     */
    onWorkerConstructed(data) {
        let me = this;

        me.constructedThreads++;

        if (me.constructedThreads === Object.keys(me.workers).length + 1) {
            if (Neo.config.appPath) {
                setTimeout(() => { // better save than sorry => all remotes need to be registered
                    me.loadApplication(Neo.config.appPath);
                }, 20);
            }
        }
    }

    /**
     * Handler method for worker error events
     * @param {Object} e
     */
    onWorkerError(e) {
        if (!Neo.config.isExperimental) { // starting a worker from a JS module will show JS errors in a correct way
            console.log('Worker Error:', e);
        }
    }

    /**
     * Handler method for worker message events
     * @param {Object} e
     */
    onWorkerMessage(e) {
        let me           = this,
            data         = e.data,
            delayPromise = false,
            promise;

        const {
             action,
             destination: dest,
             replyId
        } = data;

        // console.log('Main: Incoming Worker message: ' + data.origin + ':' + action, data);

        me.fire('message:'+action, data);

        if (promise = action === 'reply' && me.promises[replyId]) {
            if (data.destination === 'main') {
                data = data.data;
            }

            if (data.reject) {
                promise.reject(data);
            } else {
                if (data.data) {
                    if (data.data.autoMount) {
                        me.fire('automount', data);
                        delayPromise = true;
                    }
                    if (data.data.updateVdom) {
                        me.fire('updateVdom', data);
                        delayPromise = true;
                    }
                }

                if (!delayPromise) {
                    promise.resolve(data);
                } else {
                    me.promises[replyId].data = data;
                }
            }

            if (!delayPromise) {
                delete me.promises[replyId];
            }
        }

        if (dest !== 'main' && action !== 'reply') {
            me.promiseMessage(dest, data).then(response => {
                me.sendMessage(response.destination, response);
            }).catch(err => {
                me.sendMessage(data.origin, {
                    action : 'reply',
                    reject : true,
                    replyId: data.id,
                    error  : err.message
                });
            });
        }

        else if (dest === 'main' && action === 'remoteMethod') {
            me.onRemoteMethod(data);
        }
    }

    /**
     *
     * @param {String} path
     */
    loadApplication(path) {
        this.sendMessage('app', {
            action       : 'loadApplication',
            path         : path,
            resourcesPath: Neo.config.resourcesPath
        });
    }

    /**
     * Sends a message to each worker defined inside the this.workers config.
     * @param msg
     */
    broadcast(msg) {
        Object.entries(this.workers).forEach(name => {
            this.sendMessage(name, msg);
        });
    }

    /**
     *
     * @param {String} replyId
     */
    resolveDomOperationPromise(replyId) {
        if (replyId) {
            let promise = this.promises[replyId];

            if (promise) {
                promise.resolve(promise.data);
                delete this.promises[replyId];
            }
        }
    }

    /**
     *
     * @param {String} dest app, data or vdom
     * @param {Object} opts configs for Neo.worker.Message
     * @param {Array} [transfer] An optional array of Transferable objects to transfer ownership of.
     * If the ownership of an object is transferred, it becomes unusable (neutered) in the context it was sent from
     * and becomes available only to the worker it was sent to.
     * @returns {Neo.worker.Message}
     * @private
     */
    sendMessage(dest, opts, transfer) {
        if (!this.stopCommunication) {
            const worker = this.getWorker(dest);

            if (!worker) {
                throw new Error('Called sendMessage for a worker that does not exist: ' + dest);
            }

            opts.destination = dest;

            const message = new _Message_mjs__WEBPACK_IMPORTED_MODULE_3__["default"](opts);

            worker.postMessage(message, transfer);
            return message;
        }
    }

    /**
     *
     * @param {String} dest app, data or vdom
     * @param {Object} opts configs for Neo.worker.Message
     * @param {Array} [transfer] An optional array of Transferable objects to transfer ownership of.
     * If the ownership of an object is transferred, it becomes unusable (neutered) in the context it was sent from
     * and becomes available only to the worker it was sent to.
     * @returns {Promise<any>}
     */
    promiseMessage(dest, opts, transfer) {
        const me = this;

        return new Promise((resolve, reject) => {
            let message = me.sendMessage(dest, opts, transfer),
                msgId   = message.id;

            me.promises[msgId] = {
                reject : reject,
                resolve: resolve
            };
        });
    }
}

Neo.applyClassConfig(Manager);

let instance = Neo.create(Manager);

Neo.applyToGlobalNs(instance);

/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ }),

/***/ "./node_modules/neo.mjs/src/worker/Message.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/neo.mjs/src/worker/Message.mjs ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Message; });
/* harmony import */ var _core_IdGenerator_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/IdGenerator.mjs */ "./node_modules/neo.mjs/src/core/IdGenerator.mjs");


/**
 * A wrapper for worker post messages sent between the App, Data, VDom worker & the main thread.
 * You can add optional params as needed.
 * @class Neo.worker.Message
 */
class Message {
    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        /**
         * @member {String} action
         */

        /**
         * @member {String} destination='main'
         */

        /**
         * @member {String} id=IdGenerator.getId(Neo.workerId)
         */

        /**
         * @member {String} origin=Neo.workerId
         */

        config.destination = config.destination || 'main';
        config.id          = config.id          || _core_IdGenerator_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].getId(Neo.workerId);
        config.origin      = config.origin      || Neo.workerId;

        Object.assign(this, config);
    }
}

const ns = Neo.ns('Neo.worker', true);
ns['Message'] = Message;



/***/ }),

/***/ "./node_modules/neo.mjs/src/worker/mixins/RemoteMethodAccess.mjs":
/*!***********************************************************************!*\
  !*** ./node_modules/neo.mjs/src/worker/mixins/RemoteMethodAccess.mjs ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemoteMethodAccess; });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * @class Neo.worker.mixins.RemoteMethodAccess
 * @extends Neo.core.Base
 */
class RemoteMethodAccess extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.worker.mixins.RemoteMethodAccess'
         * @private
         */
        className: 'Neo.worker.mixins.RemoteMethodAccess',
        /**
         * @member {String} ntype='mixin-remote-method-access'
         * @private
         */
        ntype: 'mixin-remote-method-access',
        /**
         * @member {Boolean} mixin=true
         * @private
         */
        mixin: true
    }}

    /**
     *
     * @param {Object} remote
     * @param method
     * @returns {function(*=, *=): Promise<any>}
     */
    generateRemote(remote, method) {
        let me     = this,
            origin = remote.origin;

        return function(data, buffer) {
            let opts = {
                action         : 'remoteMethod',
                data           : data,
                destination    : origin,
                remoteClassName: remote.className,
                remoteMethod   : method
            };
            return me.promiseMessage(origin, opts, buffer);
        };
    }

    /**
     *
     * @param {Object} remote
     */
    onRegisterRemote(remote) {
        if (remote.destination === Neo.workerId) {
            let me        = this,
                className = remote.className,
                methods   = remote.methods,
                pkg       = Neo.ns(className, true);

            methods.forEach(function(method) {
                if (pkg[method]) {
                    throw new Error('Duplicate remote method definition ' + className + '.' + method);
                }

                pkg[method] = me.generateRemote(remote, method);
            });

            if (Neo.workerId !== 'main') {
                me.fire('remoteregistered', remote);
            }
        }
    }

    /**
     *
     * @param {Object} msg
     */
    onRemoteMethod(msg) {
        let me  = this,
            pkg = Neo.ns(msg.remoteClassName),
            out, method;

        if (!pkg) {
            throw new Error('Invalid remote namespace "' + msg.remoteClassName + '"');
        }

        method = pkg[msg.remoteMethod];

        if (!method) {
            throw new Error('Invalid remote method name "' + msg.remoteMethod + '"');
        }

        if (Array.isArray(msg.data)) {
            out = method.call(pkg, ...msg.data);
        } else {
            out = method.call(pkg, msg.data);
        }

        if (out instanceof Promise) {
            out.then(function(data) {
                me.resolve(msg, data);
            })
            .catch(function(err) {
                me.reject(msg, err);
            });
        } else {
            me.resolve(msg, out);
        }
    }

    /**
     * Gets called when promiseMessage gets rejected
     * @param {Object} msg
     * @param {Object} data
     */
    reject(msg, data) {
        this.sendMessage(msg.origin, {
            action : 'reply',
            data   : data,
            reject : true,
            replyId: msg.id
        });
    }

    /**
     * Gets called when promiseMessage gets resolved
     * @param {Object} msg
     * @param {Object} data
     */
    resolve(msg, data) {
        this.sendMessage(msg.origin, {
            action : 'reply',
            data   : data,
            replyId: msg.id
        });
    }
}

Neo.applyClassConfig(RemoteMethodAccess);



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL0RlZmF1bHRDb25maWcubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9NYWluLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvTmVvLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29yZS9CYXNlLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29yZS9JZEdlbmVyYXRvci5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvcmUvTG9nZ2VyLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29yZS9PYnNlcnZhYmxlLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29yZS9VdGlsLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29yZS9fZXhwb3J0Lm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9Eb21BY2Nlc3MubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9tYWluL0RvbUV2ZW50cy5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL21haW4vYWRkb24gbGF6eSBeXFwuXFwvLipcXC5tanMkIHN0cmljdCBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9tYWluL21peGluL0RlbHRhVXBkYXRlcy5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL21haW4vbWl4aW4vVG91Y2hEb21FdmVudHMubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy93b3JrZXIvTWFuYWdlci5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL3dvcmtlci9NZXNzYWdlLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvd29ya2VyL21peGlucy9SZW1vdGVNZXRob2RBY2Nlc3MubWpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7Ozs7UUFJQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7OztRQUdBOztRQUVBO1FBQ0EsaUNBQWlDOztRQUVqQztRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0Esd0JBQXdCLGtDQUFrQztRQUMxRCxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdD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Q0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuXG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdH07XG5cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwibWFpblwiOiAwXG4gXHR9O1xuXG5cblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcbiBcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuIFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuIFx0XHRcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiBcdFx0XHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0XHRcdGlmKGNodW5rKSB7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuIFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL01haW4ubWpzXCIpO1xuIiwiY29uc3QgTmVvID0gc2VsZi5OZW8gfHwge307XG5cbk5lby5jb25maWcgPSBOZW8uY29uZmlnIHx8IHt9O1xuXG4vKipcbiAqIENvbmZpZyBvYmplY3QgZm9yIHRoZSBuZW8ubWpzIGZyYW1ld29yayB3aGljaCB3aWxsIGdldCBwYXNzZWQgdG8gYWxsIHdvcmtlcnNcbiAqIFlvdSBjYW4gY2hhbmdlIHRoZSBjb25maWdzLCBlLmcuIGluc2lkZSB0aGUgaW5kZXguaHRtbCBvZiB5b3VyIGFwcFxuICogQG1lbWJlck9mIG1vZHVsZTpOZW9cbiAqIEBuYW1lIGNvbmZpZ1xuICogQHR5cGUgT2JqZWN0XG4gKi9cbmNvbnN0IERlZmF1bHRDb25maWcgPSB7XG4gICAgLyoqXG4gICAgICogdHJ1ZSB3aWxsIGFwcGx5ICduZW8tYm9keScgdG8gdGhlIGRvY3VtZW50LmJvZHkgY2xhc3NMaXN0XG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqIEBtZW1iZXJPZiEgbW9kdWxlOk5lb1xuICAgICAqIEBuYW1lIGNvbmZpZy5hcHBseUJvZHlDbHNcbiAgICAgKiBAdHlwZSBCb29sZWFuXG4gICAgICovXG4gICAgYXBwbHlCb2R5Q2xzOiB0cnVlLFxuICAgIC8qKlxuICAgICAqIFBhdGggdG8geW91ciBhcHAubWpzIGZpbGUuIFlvdSBjYW4gY3JlYXRlIG11bHRpcGxlIGFwcHMgdGhlcmUgaWYgbmVlZGVkLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAbWVtYmVyT2YhIG1vZHVsZTpOZW9cbiAgICAgKiBAbmFtZSBjb25maWcuYXBwUGF0aFxuICAgICAqIEB0eXBlIFN0cmluZ3xudWxsXG4gICAgICovXG4gICAgYXBwUGF0aDogbnVsbCxcbiAgICAvKipcbiAgICAgKiBQYXRoIHRvIHRoZSBuZW8ubWpzIGRpcmVjdG9yeVxuICAgICAqIEBkZWZhdWx0ICcuLydcbiAgICAgKiBAbWVtYmVyT2YhIG1vZHVsZTpOZW9cbiAgICAgKiBAbmFtZSBjb25maWcuYmFzZVBhdGhcbiAgICAgKiBAdHlwZSBTdHJpbmdcbiAgICAgKi9cbiAgICBiYXNlUGF0aDogJy4vJyxcbiAgICAvKipcbiAgICAgKiBQYXRoIHRvIHRoZSBuZW8ubWpzIHRoZW1lIGNzcyBmaWxlc1xuICAgICAqIFNlZSBtYWluLmFkZG9uLlN0eWxlc2hlZXQgPT4gY3JlYXRlU3R5bGVTaGVldCgpXG4gICAgICogQGRlZmF1bHQgTmVvLmNvbmZpZy5iYXNlUGF0aCArICdidWlsZC8nICsgTmVvLmNvbmZpZy5lbnZpcm9ubWVudFxuICAgICAqIEBtZW1iZXJPZiEgbW9kdWxlOk5lb1xuICAgICAqIEBuYW1lIFtjb25maWcuY3NzUGF0aF1cbiAgICAgKiBAb3B0aW9uYWxcbiAgICAgKiBAdHlwZSBTdHJpbmd8bnVsbFxuICAgICAqL1xuICAgIGNzc1BhdGg6IG51bGwsXG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgYnVpbGQgPT4gZGlzdCBlbnZpcm9ubWVudC4gVmFsaWQgdmFsdWVzOiAnZGV2ZWxvcG1lbnQnLCAncHJvZHVjdGlvbidcbiAgICAgKiBVc2VkIGZvciBhdXRvbWF0aWNhbGx5IGluY2x1ZGluZyB0aGUgbWF0Y2hpbmcgdGhlbWUgZmlsZXNcbiAgICAgKiBAZGVmYXVsdCAncHJvZHVjdGlvbidcbiAgICAgKiBAbWVtYmVyT2YhIG1vZHVsZTpOZW9cbiAgICAgKiBAbmFtZSBjb25maWcuZW52aXJvbm1lbnRcbiAgICAgKiBAdHlwZSBTdHJpbmdcbiAgICAgKi9cbiAgICBlbnZpcm9ubWVudDogJ3Byb2R1Y3Rpb24nLFxuICAgIC8qKlxuICAgICAqIEZsYWcgaWYgTmVvIGlzIHJ1bm5pbmcgd2l0aG91dCBhbnkgSlMgYnVpbGRzXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKiBAbWVtYmVyT2YhIG1vZHVsZTpOZW9cbiAgICAgKiBAbmFtZSBjb25maWcuaXNFeHBlcmltZW50YWxcbiAgICAgKiBAdHlwZSBCb29sZWFuXG4gICAgICovXG4gICAgaXNFeHBlcmltZW50YWw6IGZhbHNlLFxuICAgIC8qKlxuICAgICAqIEZsYWcgZm9yIHJ1bm5pbmcgb24gaHR0cHM6Ly9uZW9tanMuZ2l0aHViLmlvL3BhZ2VzL1xuICAgICAqID0+IHRvIHVzZSBsb2NhbCBpbWFnZXMgcGF0aHMgaW5zdGVhZCBvZiByYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKiBAbWVtYmVyT2YhIG1vZHVsZTpOZW9cbiAgICAgKiBAbmFtZSBjb25maWcuaXNHaXRIdWJQYWdlc1xuICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgKi9cbiAgICBpc0dpdEh1YlBhZ2VzOiBmYWxzZSxcbiAgICAvKipcbiAgICAgKiBGbGFnIGZvciBydW5uaW5nIHRoZSBOZW8gbWFpbiB0aHJlYWQgaW5zaWRlIGFuIGlmcmFtZSAoU2llc3RhIEJyb3dzZXIgSGFybmVzcylcbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqIEBtZW1iZXJPZiEgbW9kdWxlOk5lb1xuICAgICAqIEBuYW1lIGNvbmZpZy5pc0luc2lkZVNpZXN0YVxuICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgKi9cbiAgICBpc0luc2lkZVNpZXN0YTogZmFsc2UsXG4gICAgLyoqXG4gICAgICogVXNlZCBieSBJbnRsLkRhdGVUaW1lRm9ybWF0LCBmb3IgZGV0YWlscyB0YWtlIGEgbG9vayBhdDpcbiAgICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9EYXRlVGltZUZvcm1hdFxuICAgICAqIEBkZWZhdWx0ICdkZWZhdWx0J1xuICAgICAqIEBtZW1iZXJPZiEgbW9kdWxlOk5lb1xuICAgICAqIEBuYW1lIGNvbmZpZy5sb2NhbGVcbiAgICAgKiBAdHlwZSBTdHJpbmdcbiAgICAgKi9cbiAgICBsb2NhbGU6ICdkZWZhdWx0JyxcbiAgICAvKipcbiAgICAgKiBBZGQgYWRkb25zIGZvciB0aGUgbWFpbiB0aHJlYWRcbiAgICAgKiBQb3NzaWJsZSB2YWx1ZXM6IEFtQ2hhcnRzLCBHb29nbGVBbmFseXRpY3MsIEhpZ2hsaWdodEpTLCBMb2NhbFN0b3JhZ2UsIE1hcGJveEdMLCBNYXJrZG93biwgU2llc3RhLCBTdHlsZXNoZWV0XG4gICAgICogKHNyYy9tYWluL2FkZG9uKVxuICAgICAqIEBkZWZhdWx0IFsnU3R5bGVzaGVldCddXG4gICAgICogQG1lbWJlck9mISBtb2R1bGU6TmVvXG4gICAgICogQG5hbWUgY29uZmlnLm1haW5UaHJlYWRBZGRvbnNcbiAgICAgKiBAdHlwZSBTdHJpbmdbXVxuICAgICAqL1xuICAgIG1haW5UaHJlYWRBZGRvbnM6IFsnU3R5bGVzaGVldCddLFxuICAgIC8qKlxuICAgICAqIEFkZCB0aGVtZXMgeW91IHdhbnQgdG8gdXNlIGhlcmUuIFRoZSBmaXJzdCB0aGVtZSB3aWxsIGdldCBhcHBsaWVkLlxuICAgICAqIElmIGNvbmZpZy51c2VDc3M0ID09PSB0cnVlLCBvdGhlciB0aGVtZSB2YXJpYWJsZXMgd2lsbCBnZXQgaW5jbHVkZWQgYXMgd2VsbFxuICAgICAqIEBkZWZhdWx0IFsnbmVvLXRoZW1lLWxpZ2h0JywgJ25lby10aGVtZS1kYXJrJ11cbiAgICAgKiBAbWVtYmVyT2YhIG1vZHVsZTpOZW9cbiAgICAgKiBAbmFtZSBjb25maWcudGhlbWVzXG4gICAgICogQHR5cGUgU3RyaW5nW11cbiAgICAgKi9cbiAgICB0aGVtZXM6IFsnbmVvLXRoZW1lLWxpZ2h0JywgJ25lby10aGVtZS1kYXJrJ10sXG4gICAgLyoqXG4gICAgICogRmxhZyBmb3Igc3RhbmRhbG9uZSBTaWVzdGEgbW9kdWxlIHRlc3RzID0+IHByZXZlbnQgcmVnaXN0ZXJSZW1vdGUgd29ya2VyIG1lc3NhZ2VzXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKiBAbWVtYmVyT2YhIG1vZHVsZTpOZW9cbiAgICAgKiBAbmFtZSBjb25maWcudW5pdFRlc3RNb2RlXG4gICAgICogQHR5cGUgQm9vbGVhblxuICAgICAqL1xuICAgIHVuaXRUZXN0TW9kZTogZmFsc2UsXG4gICAgLyoqXG4gICAgICogRmxhZyBpZiBDU1M0IHN0eWxlc2hlZXRzIGFyZSBpbiB1c2UgKGltcG9ydGFudCBmb3Igc3dpdGNoaW5nIHRoZW1lcylcbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICogQG1lbWJlck9mISBtb2R1bGU6TmVvXG4gICAgICogQG5hbWUgY29uZmlnLnVzZUNzczRcbiAgICAgKiBAdHlwZSBCb29sZWFuXG4gICAgICovXG4gICAgdXNlQ3NzNDogdHJ1ZSxcbiAgICAvKipcbiAgICAgKiBUcnVlIHdpbGwgYXV0b21hdGljYWxseSBpbmNsdWRlIHRoZSBzdHlsZXNoZWV0XG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqIEBtZW1iZXJPZiEgbW9kdWxlOk5lb1xuICAgICAqIEBuYW1lIGNvbmZpZy51c2VGb250QXdlc29tZVxuICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgKi9cbiAgICB1c2VGb250QXdlc29tZTogdHJ1ZSxcbiAgICAvKipcbiAgICAgKiBBZGRzIGdsb2JhbCBkb20gZXZlbnQgbGlzdGVuZXJzIGZvciBtb2JpbGUgcmVsYXRlZCBldmVudHMgbGlrZSByb3RhdGUsIHN3aXBlLCB0YXBcbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICogQG1lbWJlck9mISBtb2R1bGU6TmVvXG4gICAgICogQG5hbWUgY29uZmlnLnVzZVRvdWNoRXZlbnRzXG4gICAgICogQHR5cGUgQm9vbGVhblxuICAgICAqL1xuICAgIHVzZVRvdWNoRXZlbnRzOiB0cnVlXG59O1xuXG5PYmplY3QuYXNzaWduKERlZmF1bHRDb25maWcsIHtcbiAgICAvKipcbiAgICAgKiBQYXRoIHRvIHRoZSB0b3AgbGV2ZWwgbmVvLm1qcyByZXNvdXJjZXMgZm9sZGVyXG4gICAgICogQGRlZmF1bHQgTmVvLmNvbmZpZy5iYXNlUGF0aCArICdyZXNvdXJjZXMvJ1xuICAgICAqIEBtZW1iZXJPZiEgbW9kdWxlOk5lb1xuICAgICAqIEBuYW1lIGNvbmZpZy5yZXNvdXJjZXNQYXRoXG4gICAgICogQHR5cGUgU3RyaW5nXG4gICAgICovXG4gICAgcmVzb3VyY2VzUGF0aDogKE5lby5jb25maWcuYmFzZVBhdGggfHwgRGVmYXVsdENvbmZpZy5iYXNlUGF0aCkgKyAncmVzb3VyY2VzLycsXG4gICAgLyoqXG4gICAgICogVGhlIGRlZmF1bHQgYmFzZSBVUkwgZm9yIHdlYiB3b3JrZXIgZW50cnkgcG9pbnRzIChBcHAsIERhdGEsIFZkb20pXG4gICAgICogQGRlZmF1bHQgTmVvLmNvbmZpZy5iYXNlUGF0aCArICdzcmMvd29ya2VyLydcbiAgICAgKiBAbWVtYmVyT2YhIG1vZHVsZTpOZW9cbiAgICAgKiBAbmFtZSBjb25maWcud29ya2VyQmFzZVBhdGhcbiAgICAgKiBAdHlwZSBTdHJpbmdcbiAgICAgKi9cbiAgICB3b3JrZXJCYXNlUGF0aDogKE5lby5jb25maWcuYmFzZVBhdGggfHwgRGVmYXVsdENvbmZpZy5iYXNlUGF0aCkgKyAnc3JjL3dvcmtlci8nXG59KTtcblxuZXhwb3J0IHtEZWZhdWx0Q29uZmlnIGFzIGRlZmF1bHR9OyIsImltcG9ydCBOZW8gICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL05lby5tanMnO1xuaW1wb3J0ICogYXMgY29yZSAgICAgICAgICAgICAgICAgIGZyb20gJy4vY29yZS9fZXhwb3J0Lm1qcyc7XG5pbXBvcnQgRG9tQWNjZXNzICAgICAgICAgICAgICAgICAgZnJvbSAnLi9tYWluL0RvbUFjY2Vzcy5tanMnO1xuaW1wb3J0IERvbUV2ZW50cyAgICAgICAgICAgICAgICAgIGZyb20gJy4vbWFpbi9Eb21FdmVudHMubWpzJztcbmltcG9ydCB7ZGVmYXVsdCBhcyBXb3JrZXJNYW5hZ2VyfSBmcm9tICcuL3dvcmtlci9NYW5hZ2VyLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby5NYWluXG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKiBAc2luZ2xldG9uXG4gKi9cbmNsYXNzIE1haW4gZXh0ZW5kcyBjb3JlLkJhc2Uge1xuICAgIHN0YXRpYyBnZXRTdGF0aWNDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRydWUgYXV0b21hdGljYWxseSBhcHBsaWVzIHRoZSBjb3JlL09ic2VydmFibGUubWpzIG1peGluXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IG9ic2VydmFibGU9dHJ1ZVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBvYnNlcnZhYmxlOiB0cnVlXG4gICAgfX1cblxuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uTWFpbidcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5NYWluJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge2Jvb2xlYW59IGxvZ0FuaW1hdGlvbkZyYW1lcz10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBsb2dBbmltYXRpb25GcmFtZXM6IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG1vZGU9J3JlYWQnXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBtb2RlOiAncmVhZCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtBcnJheX0gcmVhZFF1ZXVlPVtdXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICByZWFkUXVldWU6IFtdLFxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3RlIG1ldGhvZCBhY2Nlc3MgZm9yIG90aGVyIHdvcmtlcnNcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSByZW1vdGU9e2FwcDogWy8vLi4uXX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHJlbW90ZToge1xuICAgICAgICAgICAgYXBwOiBbXG4gICAgICAgICAgICAgICAgJ2VkaXRSb3V0ZScsXG4gICAgICAgICAgICAgICAgJ3NldFJvdXRlJ1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gcnVubmluZz1mYWxzZVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgcnVubmluZzogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBzaG93RnBzPWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBzaG93RnBzOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHNpbmdsZXRvbj10cnVlXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBzaW5nbGV0b246IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IHRpbWVMaW1pdD0xNVxuICAgICAgICAgKi9cbiAgICAgICAgdGltZUxpbWl0OiAxNSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNob3VsZCBiZSBkZXYgb25seVxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IHRvdGFsRnJhbWVDb3VudD0wXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0b3RhbEZyYW1lQ291bnQ6IDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtBcnJheX0gdXBkYXRlUXVldWU9W11cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHVwZGF0ZVF1ZXVlOiBbXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0FycmF5fSB3cml0ZVF1ZXVlPVtdXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB3cml0ZVF1ZXVlOiBbXVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIERvbUV2ZW50cy5vbignZG9tQ29udGVudExvYWRlZCcsIG1lLm9uRG9tQ29udGVudExvYWRlZCwgbWUpO1xuXG4gICAgICAgIFdvcmtlck1hbmFnZXIub24oe1xuICAgICAgICAgICAgJ2F1dG9tb3VudCcgICAgICAgIDogbWUub25SZW5kZXIsXG4gICAgICAgICAgICAnbWVzc2FnZTptb3VudERvbScgOiBtZS5vbk1vdW50RG9tLFxuICAgICAgICAgICAgJ21lc3NhZ2U6dXBkYXRlRG9tJzogbWUub25VcGRhdGVEb20sXG4gICAgICAgICAgICAndXBkYXRlVmRvbScgICAgICAgOiBtZS5vblVwZGF0ZVZkb20sXG4gICAgICAgICAgICBzY29wZSAgICAgICAgICAgICAgOiBtZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFZGl0IHRoZSBsb2NhdGlvbi5oYXNoIHZhbHVlXG4gICAgICogQSB2YWx1ZSBvZiBudWxsIHdpbGwgcmVtb3ZlIHRoZSBnaXZlbiBrZXkuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBlZGl0Um91dGUoZGF0YSkge1xuICAgICAgICBsZXQgaGFzaE9iaiA9IERvbUV2ZW50cy5wYXJzZUhhc2god2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyKDEpKSxcbiAgICAgICAgICAgIGhhc2hBcnIgPSBbXTtcblxuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBkYXRhID0gRG9tRXZlbnRzLnBhcnNlSGFzaChkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5hc3NpZ24oaGFzaE9iaiwgZGF0YSk7XG5cbiAgICAgICAgT2JqZWN0LmVudHJpZXMoaGFzaE9iaikuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBoYXNoQXJyLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBoYXNoQXJyLmpvaW4oJyYnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGFzeW5jIG9uRG9tQ29udGVudExvYWRlZCgpIHtcbiAgICAgICAgbGV0IG1lICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgaW1wb3J0cyA9IFtdO1xuXG4gICAgICAgIERvbUFjY2Vzcy5vbkRvbUNvbnRlbnRMb2FkZWQoKTtcblxuICAgICAgICAvLyBub3QgaW4gdXNlIHJpZ2h0IG5vd1xuICAgICAgICAvLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgbWUuZ2xvYmFsUmVzaXplTGlzdGVuZXIuYmluZChtZSkpO1xuXG4gICAgICAgIC8vIHdlIG5lZWQgZGlmZmVyZW50IHB1YmxpY1BhdGggdmFsdWVzIGZvciB0aGUgbWFpbiB0aHJlYWQgaW5zaWRlIHRoZSB3ZWJwYWNrIGJhc2VkIGRpc3QgZW52cyxcbiAgICAgICAgLy8gZGVwZW5kaW5nIG9uIHRoZSBoaWVyYXJjaHkgbGV2ZWwgb2YgdGhlIGFwcCBlbnRyeSBwb2ludFxuICAgICAgICBpZiAod2luZG93LndlYnBhY2tKc29ucCkge1xuICAgICAgICAgICAgX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gTmVvLmNvbmZpZy5iYXNlUGF0aC5zdWJzdHJpbmcoNik7XG4gICAgICAgIH1cblxuICAgICAgICBOZW8uY29uZmlnLm1haW5UaHJlYWRBZGRvbnMuZm9yRWFjaChhZGRvbiA9PiB7XG4gICAgICAgICAgICBpbXBvcnRzLnB1c2goaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6ICdzcmMvbWFpbi9hZGRvbi9bcmVxdWVzdF0nICovIGAuL21haW4vYWRkb24vJHthZGRvbn0ubWpzYCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBtb2R1bGVzID0gYXdhaXQgUHJvbWlzZS5hbGwoaW1wb3J0cyk7XG5cbiAgICAgICAgbWUuYWRkb24gPSB7fTtcblxuICAgICAgICBtb2R1bGVzLmZvckVhY2gobW9kdWxlID0+IHtcbiAgICAgICAgICAgIG1lLmFkZG9uW21vZHVsZS5kZWZhdWx0LmNvbnN0cnVjdG9yLm5hbWVdID0gbW9kdWxlLmRlZmF1bHQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIFdvcmtlck1hbmFnZXIub25Xb3JrZXJDb25zdHJ1Y3RlZCh7XG4gICAgICAgICAgICBvcmlnaW46ICdtYWluJ1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyB0b2RvOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9FdmVudHMvcmVzaXplXG4gICAgZ2xvYmFsUmVzaXplTGlzdGVuZXIoZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2dsb2JhbFJlc2l6ZUxpc3RlbmVyJywgZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKi9cbiAgICBvbk1vdW50RG9tKGRhdGEpIHtcbiAgICAgICAgdGhpcy5xdWV1ZVdyaXRlKGRhdGEpO1xuXG4gICAgICAgIFdvcmtlck1hbmFnZXIuc2VuZE1lc3NhZ2UoZGF0YS5vcmlnaW4gfHwgJ2FwcCcsIHtcbiAgICAgICAgICAgIGFjdGlvbiA6ICdyZXBseScsXG4gICAgICAgICAgICByZXBseUlkOiBkYXRhLmlkLFxuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICovXG4gICAgb25SZW5kZXIoZGF0YSkge1xuICAgICAgICBkYXRhLmRhdGEucmVwbHlJZCA9IGRhdGEucmVwbHlJZDtcbiAgICAgICAgdGhpcy5xdWV1ZVdyaXRlKGRhdGEuZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqL1xuICAgIG9uVXBkYXRlRG9tKGRhdGEpIHtcbiAgICAgICAgdGhpcy5xdWV1ZVVwZGF0ZShkYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICovXG4gICAgb25VcGRhdGVWZG9tKGRhdGEpIHtcbiAgICAgICAgZGF0YS5kYXRhLnJlcGx5SWQgPSBkYXRhLnJlcGx5SWQ7XG4gICAgICAgIHRoaXMucXVldWVVcGRhdGUoZGF0YS5kYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBxdWV1ZVxuICAgICAqIEBwYXJhbSBzdGFydFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcm9jZXNzUXVldWUocXVldWUsIHN0YXJ0KSB7XG4gICAgICAgIGxldCBtZSAgICA9IHRoaXMsXG4gICAgICAgICAgICBsaW1pdCA9IG1lLnRpbWVMaW1pdCxcbiAgICAgICAgICAgIG9wZXJhdGlvbjtcblxuICAgICAgICB3aGlsZSAob3BlcmF0aW9uID0gcXVldWUuc2hpZnQoKSkge1xuICAgICAgICAgICAgaWYgKG5ldyBEYXRlKCkgLSBzdGFydCA+IGxpbWl0KSB7XG4gICAgICAgICAgICAgICAgcXVldWUudW5zaGlmdChvcGVyYXRpb24pO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobWUucmVuZGVyRnJhbWUuYmluZChtZSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBEb21BY2Nlc3NbbWUubW9kZV0ob3BlcmF0aW9uKTtcbiAgICAgICAgICAgICAgICBXb3JrZXJNYW5hZ2VyLnJlc29sdmVEb21PcGVyYXRpb25Qcm9taXNlKG9wZXJhdGlvbi5yZXBseUlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHF1ZXVlUmVhZChkYXRhKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG4gICAgICAgIG1lLnJlYWRRdWV1ZS5wdXNoKGRhdGEpO1xuXG4gICAgICAgIGlmICghbWUucnVubmluZykge1xuICAgICAgICAgICAgbWUucnVubmluZyA9IHRydWU7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobWUucmVuZGVyRnJhbWUuYmluZChtZSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcXVldWVVcGRhdGUoZGF0YSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuICAgICAgICBtZS51cGRhdGVRdWV1ZS5wdXNoKGRhdGEpO1xuXG4gICAgICAgIGlmICghbWUucnVubmluZykge1xuICAgICAgICAgICAgbWUucnVubmluZyA9IHRydWU7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobWUucmVuZGVyRnJhbWUuYmluZChtZSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcXVldWVXcml0ZShkYXRhKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG4gICAgICAgIG1lLndyaXRlUXVldWUucHVzaChkYXRhKTtcblxuICAgICAgICBpZiAoIW1lLnJ1bm5pbmcpIHtcbiAgICAgICAgICAgIG1lLnJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1lLnJlbmRlckZyYW1lLmJpbmQobWUpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIHRoZSBkaWZmZXJlbnQgRE9NIG9wZXJhdGlvbiBxdWV1ZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHJlbmRlckZyYW1lKCkge1xuICAgICAgICBsZXQgbWUgICAgICA9IHRoaXMsXG4gICAgICAgICAgICByZWFkICAgID0gbWUucmVhZFF1ZXVlLFxuICAgICAgICAgICAgdXBkYXRlICA9IG1lLnVwZGF0ZVF1ZXVlLFxuICAgICAgICAgICAgd3JpdGUgICA9IG1lLndyaXRlUXVldWUsXG4gICAgICAgICAgICByZWFkaW5nID0gbWUubW9kZSA9PT0gJ3JlYWQnLFxuICAgICAgICAgICAgc3RhcnQgICA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgaWYgKG1lLmxvZ0FuaW1hdGlvbkZyYW1lcykge1xuICAgICAgICAgICAgbWUudG90YWxGcmFtZUNvdW50Kys7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVG90YWwgRnJhbWVzOiAnICsgbWUudG90YWxGcmFtZUNvdW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZWFkaW5nIHx8ICF3cml0ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIG1lLm1vZGUgPSAncmVhZCc7XG4gICAgICAgICAgICBpZiAobWUucHJvY2Vzc1F1ZXVlKHJlYWQsIHN0YXJ0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1cGRhdGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBtZS5tb2RlID0gJ3VwZGF0ZSc7XG4gICAgICAgICAgICBpZiAobWUucHJvY2Vzc1F1ZXVlKHVwZGF0ZSwgc3RhcnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdyaXRlLmxlbmd0aCkge1xuICAgICAgICAgICAgbWUubW9kZSA9ICd3cml0ZSc7XG4gICAgICAgICAgICBpZiAobWUucHJvY2Vzc1F1ZXVlKHdyaXRlLCBzdGFydCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBtZS5ydW5uaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hhbmdlIHRoZSBsb2NhdGlvbi5oYXNoIHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS52YWx1ZVxuICAgICAqL1xuICAgIHNldFJvdXRlKGRhdGEpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBkYXRhLnZhbHVlO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoTWFpbik7XG5cbmxldCBpbnN0YW5jZSA9IE5lby5jcmVhdGUoTWFpbik7XG5cbk5lby5hcHBseVRvR2xvYmFsTnMoaW5zdGFuY2UpO1xuXG5leHBvcnQgZGVmYXVsdCBpbnN0YW5jZTsiLCJpbXBvcnQgRGVmYXVsdENvbmZpZyBmcm9tICcuL0RlZmF1bHRDb25maWcubWpzJztcblxuY29uc3QgY29uZmlnU3ltYm9sID0gU3ltYm9sLmZvcignY29uZmlnU3ltYm9sJyksXG4gICAgICBnZXRTZXRDYWNoZSAgPSBTeW1ib2woJ2dldFNldENhY2hlJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgbW9kdWxlIHRvIGVuaGFuY2UgY2xhc3NlcywgY3JlYXRlIGluc3RhbmNlcyBhbmQgdGhlIE5lbyBuYW1lc3BhY2VcbiAqIEBtb2R1bGUgTmVvXG4gKiBAc2luZ2xldG9uXG4gKiBAYm9ycm93cyBOZW8uY29yZS5VdGlsLmNhcGl0YWxpemUgICAgICAgIGFzIGNhcGl0YWxpemVcbiAqIEBib3Jyb3dzIE5lby5jb3JlLlV0aWwuY3JlYXRlU3R5bGVPYmplY3QgYXMgY3JlYXRlU3R5bGVPYmplY3RcbiAqIEBib3Jyb3dzIE5lby5jb3JlLlV0aWwuY3JlYXRlU3R5bGVzICAgICAgYXMgY3JlYXRlU3R5bGVzXG4gKiBAYm9ycm93cyBOZW8uY29yZS5VdGlsLmRlY2FtZWwgICAgICAgICAgIGFzIGRlY2FtZWxcbiAqIEBib3Jyb3dzIE5lby5jb3JlLlV0aWwuaXNBcnJheSAgICAgICAgICAgYXMgaXNBcnJheVxuICogQGJvcnJvd3MgTmVvLmNvcmUuVXRpbC5pc0Jvb2xlYW4gICAgICAgICBhcyBpc0Jvb2xlYW5cbiAqIEBib3Jyb3dzIE5lby5jb3JlLlV0aWwuaXNEZWZpbmVkICAgICAgICAgYXMgaXNEZWZpbmVkXG4gKiBAYm9ycm93cyBOZW8uY29yZS5VdGlsLmlzTnVtYmVyICAgICAgICAgIGFzIGlzTnVtYmVyXG4gKiBAYm9ycm93cyBOZW8uY29yZS5VdGlsLmlzT2JqZWN0ICAgICAgICAgIGFzIGlzT2JqZWN0XG4gKiBAYm9ycm93cyBOZW8uY29yZS5VdGlsLmlzU3RyaW5nICAgICAgICAgIGFzIGlzU3RyaW5nXG4gKiBAYm9ycm93cyBOZW8uY29yZS5VdGlsLnRvQXJyYXkgICAgICAgICAgIGFzIHRvQXJyYXlcbiAqIEB0dXRvcmlhbCAwMV9Db25jZXB0XG4gKi9cbmxldCBOZW8gPSBzZWxmLk5lbyB8fCB7fTtcblxuTmVvID0gc2VsZi5OZW8gPSBPYmplY3QuYXNzaWduKHtcbiAgICAvKipcbiAgICAgKiBBIG1hcCBjb250YWluaW5nIG50eXBlcyBhcyBrZXkgYW5kIE5lbyBjbGFzc2VzIG9yIHNpbmdsZXRvbnMgYXMgdmFsdWVzXG4gICAgICogQG1lbWJlck9mISBtb2R1bGU6TmVvXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSBPYmplY3RcbiAgICAgKi9cbiAgICBudHlwZU1hcDoge30sXG4gICAgLyoqXG4gICAgICogTmVlZGVkIGZvciBOZW8uY3JlYXRlLiBGYWxzZSBmb3IgdGhlIG1haW4gdGhyZWFkLCB0cnVlIGZvciB0aGUgQXBwLCBEYXRhICYgVmRvbSB3b3JrZXJcbiAgICAgKiBAbWVtYmVyT2YhIG1vZHVsZTpOZW9cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgKi9cbiAgICBpbnNpZGVXb3JrZXI6IHR5cGVvZiBEZWRpY2F0ZWRXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJyxcblxuICAgIC8qKlxuICAgICAqIEludGVybmFsbHkgdXNlZCBhdCB0aGUgZW5kIG9mIGVhY2ggY2xhc3MgLyBtb2R1bGUgZGVmaW5pdGlvblxuICAgICAqIEBtZW1iZXJPZiBtb2R1bGU6TmVvXG4gICAgICogQHBhcmFtIHtOZW8uY29yZS5CYXNlfSBjbHMgVGhlIE5lbyBjbGFzcyB0byBhcHBseSBjb25maWdzIHRvXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHV0b3JpYWwgMDJfQ2xhc3NTeXN0ZW1cbiAgICAgKi9cbiAgICBhcHBseUNsYXNzQ29uZmlnKGNscykge1xuICAgICAgICBsZXQgYmFzZUNmZyAgICAgICA9IG51bGwsXG4gICAgICAgICAgICBiYXNlU3RhdGljQ2ZnID0gbnVsbCxcbiAgICAgICAgICAgIGNvbmZpZyAgICAgICAgPSB7fSxcbiAgICAgICAgICAgIHByb3RvICAgICAgICAgPSBjbHMucHJvdG90eXBlIHx8IGNscyxcbiAgICAgICAgICAgIHByb3RvcyAgICAgICAgPSBbXSxcbiAgICAgICAgICAgIHN0YXRpY0NvbmZpZyAgPSB7fSxcbiAgICAgICAgICAgIGN0b3I7XG5cbiAgICAgICAgd2hpbGUgKHByb3RvLl9fcHJvdG9fXykge1xuICAgICAgICAgICAgY3RvciA9IHByb3RvLmNvbnN0cnVjdG9yO1xuXG4gICAgICAgICAgICBpZiAoY3Rvci5oYXNPd25Qcm9wZXJ0eSgnY2xhc3NDb25maWdBcHBsaWVkJykpIHtcbiAgICAgICAgICAgICAgICBiYXNlQ2ZnICAgICAgID0gTmVvLmNsb25lKGN0b3IuY29uZmlnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBiYXNlU3RhdGljQ2ZnID0gTmVvLmNsb25lKGN0b3Iuc3RhdGljQ29uZmlnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJvdG9zLnVuc2hpZnQocHJvdG8pO1xuICAgICAgICAgICAgcHJvdG8gPSBwcm90by5fX3Byb3RvX187XG4gICAgICAgIH1cblxuICAgICAgICBjb25maWcgICAgICAgPSBiYXNlQ2ZnICAgICAgID8gYmFzZUNmZyAgICAgICA6IGNvbmZpZztcbiAgICAgICAgc3RhdGljQ29uZmlnID0gYmFzZVN0YXRpY0NmZyA/IGJhc2VTdGF0aWNDZmcgOiBzdGF0aWNDb25maWc7XG5cbiAgICAgICAgcHJvdG9zLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBjdG9yID0gZWxlbWVudC5jb25zdHJ1Y3RvcjtcbiAgICAgICAgICAgIGxldCBjZmcgICAgICAgPSBjdG9yLmdldENvbmZpZyAgICAgICAmJiBjdG9yLmdldENvbmZpZygpICAgICAgIHx8IHt9LFxuICAgICAgICAgICAgICAgIHN0YXRpY0NmZyA9IGN0b3IuZ2V0U3RhdGljQ29uZmlnICYmIGN0b3IuZ2V0U3RhdGljQ29uZmlnKCkgfHwge30sXG4gICAgICAgICAgICAgICAgbWl4aW5zO1xuXG4gICAgICAgICAgICBpZiAoY2ZnKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMoY2ZnKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleS5zbGljZSgtMSkgPT09ICdfJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNmZ1trZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5ID0ga2V5LnNsaWNlKDAsIC0xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNmZ1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvR2VuZXJhdGVHZXRTZXQoZWxlbWVudCwga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIG9ubHkgYXBwbHkgcHJvcGVydGllcyB3aGljaCBoYXZlIG5vIHNldHRlcnMgaW5zaWRlIHRoZSBwcm90b3R5cGUgY2hhaW5cbiAgICAgICAgICAgICAgICAgICAgLy8gdGhvc2Ugd2lsbCBnZXQgYXBwbGllZCBvbiBjcmVhdGUgKE5lby5jb3JlLkJhc2UgLT4gaW5pdENvbmZpZylcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIWhhc1Byb3BlcnR5U2V0dGVyKGVsZW1lbnQsIGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCBrZXksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICA6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlICA6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY3Rvciwgc3RhdGljQ2ZnKTtcblxuICAgICAgICAgICAgaWYgKGNmZy5oYXNPd25Qcm9wZXJ0eSgnbnR5cGUnKSkge1xuICAgICAgICAgICAgICAgIE5lby5udHlwZU1hcFtjZmcubnR5cGVdID0gY2ZnLmNsYXNzTmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWl4aW5zID0gY29uZmlnLmhhc093blByb3BlcnR5KCdtaXhpbnMnKSAmJiBjb25maWcubWl4aW5zIHx8IFtdO1xuXG4gICAgICAgICAgICBpZiAoc3RhdGljQ2ZnICYmIHN0YXRpY0NmZy5vYnNlcnZhYmxlKSB7XG4gICAgICAgICAgICAgICAgbWl4aW5zLnB1c2goJ05lby5jb3JlLk9ic2VydmFibGUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNmZy5oYXNPd25Qcm9wZXJ0eSgnbWl4aW5zJykgJiYgQXJyYXkuaXNBcnJheShjZmcubWl4aW5zKSAmJiBjZmcubWl4aW5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBtaXhpbnMucHVzaCguLi5jZmcubWl4aW5zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1peGlucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBhcHBseU1peGlucyhjdG9yLCBtaXhpbnMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWxldGUgY2ZnLm1peGlucztcbiAgICAgICAgICAgIGRlbGV0ZSBjb25maWcubWl4aW5zO1xuXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGNvbmZpZywgY2ZnKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oc3RhdGljQ29uZmlnLCBzdGF0aWNDZmcpO1xuXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGN0b3IsIHtcbiAgICAgICAgICAgICAgICBjbGFzc0NvbmZpZ0FwcGxpZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY29uZmlnICAgICAgICAgICAgOiBOZW8uY2xvbmUoY29uZmlnLCB0cnVlKSxcbiAgICAgICAgICAgICAgICBpc0NsYXNzICAgICAgICAgICA6IHRydWUsXG4gICAgICAgICAgICAgICAgc3RhdGljQ29uZmlnICAgICAgOiBOZW8uY2xvbmUoc3RhdGljQ29uZmlnLCB0cnVlKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRlbGV0ZSBjdG9yLmdldENvbmZpZztcbiAgICAgICAgICAgIGRlbGV0ZSBjdG9yLmdldFN0YXRpY0NvbmZpZztcblxuICAgICAgICAgICAgaWYgKCFjb25maWcuc2luZ2xldG9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseVRvR2xvYmFsTnMoY2xzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1hcHMgbWV0aG9kcyBmcm9tIG9uZSBuYW1lc3BhY2UgdG8gYW5vdGhlciBvbmVcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIGFsaWFzZXNcbiAgICAgKiBOZW8uYXBwbHlGcm9tTnMoTmVvLCBVdGlsLCB7XG4gICAgICogICAgIGNyZWF0ZVN0eWxlT2JqZWN0OiAnY3JlYXRlU3R5bGVPYmplY3QnLFxuICAgICAqICAgICBjcmVhdGVTdHlsZXMgICAgIDogJ2NyZWF0ZVN0eWxlcycsXG4gICAgICogICAgIGNhcGl0YWxpemUgICAgICAgOiAnY2FwaXRhbGl6ZScsXG4gICAgICogICAgIGRlY2FtZWwgICAgICAgICAgOiAnZGVjYW1lbCcsXG4gICAgICogICAgIGlzQXJyYXkgICAgICAgICAgOiAnaXNBcnJheScsXG4gICAgICogICAgIGlzQm9vbGVhbiAgICAgICAgOiAnaXNCb29sZWFuJyxcbiAgICAgKiAgICAgaXNEZWZpbmVkICAgICAgICA6ICdpc0RlZmluZWQnLFxuICAgICAqICAgICBpc051bWJlciAgICAgICAgIDogJ2lzTnVtYmVyJyxcbiAgICAgKiAgICAgaXNPYmplY3QgICAgICAgICA6ICdpc09iamVjdCcsXG4gICAgICogICAgIGlzU3RyaW5nICAgICAgICAgOiAnaXNTdHJpbmcnLFxuICAgICAqICAgICB0b0FycmF5ICAgICAgICAgIDogJ3RvQXJyYXknXG4gICAgICogfSwgdHJ1ZSk7XG4gICAgICpcbiAgICAgKiAvLyBlLmcuIE5lby5jb3JlLlV0aWwuaXNPYmplY3QgPT4gTmVvLmlzT2JqZWN0XG4gICAgICogQG1lbWJlck9mIG1vZHVsZTpOZW9cbiAgICAgKiBAcGFyYW0ge05lb3xOZW8uY29yZS5CYXNlfSB0YXJnZXQgVGhlIHRhcmdldCBjbGFzcyBvciBzaW5nbGV0b24gSW5zdGFuY2Ugb3IgTmVvXG4gICAgICogQHBhcmFtIHtOZW8uY29yZS5CYXNlfSBuYW1lc3BhY2UgVGhlIGNsYXNzIGNvbnRhaW5pbmcgdGhlIG1ldGhvZHNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbYmluZF0gc2V0IHRoaXMgdG8gdHJ1ZSBpbiBjYXNlIHlvdSB3YW50IHRvIGJpbmQgbWV0aG9kcyB0byB0aGUgXCJmcm9tXCIgbmFtZXNwYWNlXG4gICAgICogQHJldHVybnMge09iamVjdH0gdGFyZ2V0XG4gICAgICovXG4gICAgYXBwbHlGcm9tTnModGFyZ2V0LCBuYW1lc3BhY2UsIGNvbmZpZywgYmluZCkge1xuICAgICAgICBsZXQgZm5OYW1lO1xuXG4gICAgICAgIGlmICh0YXJnZXQgJiYgY29uZmlnICYmIHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBPYmplY3QuZW50cmllcyhjb25maWcpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgICAgIGZuTmFtZSA9IG5hbWVzcGFjZVt2YWx1ZV07XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBiaW5kID8gZm5OYW1lLmJpbmQobmFtZXNwYWNlKSA6IGZuTmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWFwcyBhIGNsYXNzIHRvIHRoZSBnbG9iYWwgTmVvIG9yIEFwcCBuYW1lc3BhY2UuXG4gICAgICogQ2FuIGdldCBjYWxsZWQgZm9yIGNsYXNzZXMgYW5kIHNpbmdsZXRvbiBpbnN0YW5jZXNcbiAgICAgKiBAbWVtYmVyT2YgbW9kdWxlOk5lb1xuICAgICAqIEBwYXJhbSB7TmVvLmNvcmUuQmFzZX0gY2xzXG4gICAgICovXG4gICAgYXBwbHlUb0dsb2JhbE5zKGNscykge1xuICAgICAgICBsZXQgcHJvdG8gPSB0eXBlb2YgY2xzID09PSAnZnVuY3Rpb24nID8gY2xzLnByb3RvdHlwZTogY2xzLFxuICAgICAgICAgICAgY2xhc3NOYW1lLCBuc0FycmF5LCBrZXksIG5zO1xuXG4gICAgICAgIGlmIChwcm90by5jb25zdHJ1Y3Rvci5yZWdpc3RlclRvR2xvYmFsTnMgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZSA9IHByb3RvLmlzQ2xhc3MgPyBwcm90by5jb25maWcuY2xhc3NOYW1lIDogcHJvdG8uY2xhc3NOYW1lO1xuXG4gICAgICAgICAgICBuc0FycmF5ID0gY2xhc3NOYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBrZXkgICAgID0gbnNBcnJheS5wb3AoKTtcbiAgICAgICAgICAgIG5zICAgICAgPSBOZW8ubnMobnNBcnJheSwgdHJ1ZSk7XG4gICAgICAgICAgICBuc1trZXldID0gY2xzO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENvcGllcyBhbGwga2V5cyBvZiBkZWZhdWx0cyBpbnRvIHRhcmdldCwgaW4gY2FzZSB0aGV5IGRvbid0IGFscmVhZHkgZXhpc3RcbiAgICAgKiBAbWVtYmVyT2YgbW9kdWxlOk5lb1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3RcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdHMgVGhlIG9iamVjdCBjb250YWluaW5nIHRoZSBrZXlzIHlvdSB3YW50IHRvIGNvcHlcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0YXJnZXRcbiAgICAgKi9cbiAgICBhc3NpZ25EZWZhdWx0cyh0YXJnZXQsIGRlZmF1bHRzKSB7XG4gICAgICAgIGlmICh0YXJnZXQgJiYgZGVmYXVsdHMgJiYgdHlwZW9mIGRlZmF1bHRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMoZGVmYXVsdHMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBtZW1iZXJPZiBtb2R1bGU6TmVvXG4gICAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl8Kn0gb2JqXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbZGVlcD1mYWxzZV0gU2V0IHRoaXMgdG8gdHJ1ZSBpbiBjYXNlIHlvdSB3YW50IHRvIGNsb25lIG5lc3RlZCBvYmplY3RzIGFzIHdlbGxcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtpZ25vcmVOZW9JbnN0YW5jZXM9ZmFsc2VdIHJldHVybnMgZXhpc3RpbmcgaW5zdGFuY2VzIGlmIHNldCB0byB0cnVlXG4gICAgICogQHJldHVybnMge09iamVjdHxBcnJheXwqfSB0aGUgY2xvbmVkIGlucHV0XG4gICAgICovXG4gICAgY2xvbmUob2JqLCBkZWVwLCBpZ25vcmVOZW9JbnN0YW5jZXMpIHtcbiAgICAgICAgbGV0IG91dDtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqLm1hcCh2YWwgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBOZW8uY2xvbmUodmFsLCBkZWVwLCBpZ25vcmVOZW9JbnN0YW5jZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKG9iai5jb25zdHJ1Y3Rvci5pc0NsYXNzICYmIG9iaiBpbnN0YW5jZW9mIE5lby5jb3JlLkJhc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWdub3JlTmVvSW5zdGFuY2VzID8gb2JqIDogdGhpcy5jbG9uZU5lb0luc3RhbmNlKG9iaik7XG4gICAgICAgICAgICB9IGVsc2UgaWYob2JqLmNvbnN0cnVjdG9yLmlzQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvdXQgPSB7fTtcbiAgICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyhvYmopLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVlcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBOZW8uY2xvbmUodmFsdWUsIGRlZXAsIGlnbm9yZU5lb0luc3RhbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb3V0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmo7IC8vIHJldHVybiBhbGwgb3RoZXIgZGF0YSB0eXBlc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIHVzaW5nIHRoZSBvcmlnaW5hbENvbmZpZyB3aXRob3V0IHRoZSBpZFxuICAgICAqIEBtZW1iZXJPZiBtb2R1bGU6TmVvXG4gICAgICogQHBhcmFtIHtOZW8uY29yZS5CYXNlfSBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtOZW8uY29yZS5CYXNlfSB0aGUgY2xvbmVkIGluc3RhbmNlXG4gICAgICovXG4gICAgY2xvbmVOZW9JbnN0YW5jZShpbnN0YW5jZSkge1xuICAgICAgICBsZXQgY29uZmlnID0gey4uLmluc3RhbmNlLm9yaWdpbmFsQ29uZmlnfTtcbiAgICAgICAgZGVsZXRlIGNvbmZpZy5faWQ7XG4gICAgICAgIGRlbGV0ZSBjb25maWcuaWQ7XG4gICAgICAgIHJldHVybiBOZW8uY3JlYXRlKGluc3RhbmNlLmNsYXNzTmFtZSwgY29uZmlnKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXNlIE5lby5jcmVhdGUoKSBpbnN0ZWFkIG9mIFwibmV3XCIgdG8gY3JlYXRlIGluc3RhbmNlcyBvZiBhbGwgTmVvIGNsYXNzZXNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGltcG9ydCBCdXR0b24gZnJvbSAnLi9CdXR0b24ubWpzJztcbiAgICAgKlxuICAgICAqIE5lby5jcmVhdGUoQnV0dG9uLCB7XG4gICAgICogICAgIGljb25DbHM6ICdmYSBmYS1ob21lJyxcbiAgICAgKiAgICAgdGV4dCAgIDogJ0hvbWUnXG4gICAgICogfSk7XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBpbXBvcnQgQnV0dG9uIGZyb20gJy4vQnV0dG9uLm1qcyc7XG4gICAgICpcbiAgICAgKiBOZW8uY3JlYXRlKHtcbiAgICAgKiAgICAgbW9kdWxlIDogQnV0dG9uLFxuICAgICAqICAgICBpY29uQ2xzOiAnZmEgZmEtaG9tZScsXG4gICAgICogICAgIHRleHQgICA6ICdIb21lJ1xuICAgICAqIH0pO1xuICAgICAqIEBleGFtcGxlXG4gICAgICogTmVvLmNyZWF0ZSgnTmVvLmNvbXBvbmVudC5CdXR0b24nIHtcbiAgICAgKiAgICAgaWNvbkNsczogJ2ZhIGZhLWhvbWUnLFxuICAgICAqICAgICB0ZXh0ICAgOiAnSG9tZSdcbiAgICAgKiB9KTtcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIE5lby5jcmVhdGUoe1xuICAgICAqICAgICBjbGFzc05hbWU6ICdOZW8uY29tcG9uZW50LkJ1dHRvbicsXG4gICAgICogICAgIGljb25DbHMgIDogJ2ZhIGZhLWhvbWUnLFxuICAgICAqICAgICB0ZXh0ICAgICA6ICdIb21lJ1xuICAgICAqIH0pO1xuICAgICAqIEBtZW1iZXJPZiBtb2R1bGU6TmVvXG4gICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fE5lby5jb3JlLkJhc2V9IGNsYXNzTmFtZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnXVxuICAgICAqIEByZXR1cm5zIHtOZW8uY29yZS5CYXNlfG51bGx9IFRoZSBuZXcgY2xhc3MgaW5zdGFuY2VcbiAgICAgKiBAdHV0b3JpYWwgMDJfQ2xhc3NTeXN0ZW1cbiAgICAgKi9cbiAgICBjcmVhdGUoY2xhc3NOYW1lLCBjb25maWcpIHtcbiAgICAgICAgbGV0IGNscywgaW5zdGFuY2U7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjbGFzc05hbWUgPT09ICdmdW5jdGlvbicgJiYgdW5kZWZpbmVkICE9PSBjbGFzc05hbWUuY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgIGNscyA9IGNsYXNzTmFtZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2xhc3NOYW1lID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGNvbmZpZyA9IGNsYXNzTmFtZTtcblxuICAgICAgICAgICAgICAgIGlmICghY29uZmlnLmNsYXNzTmFtZSAmJiAhY29uZmlnLm1vZHVsZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB1c2luZyBjb25zb2xlLmVycm9yIGluc3RlYWQgb2YgdGhyb3cgdG8gc2hvdyB0aGUgY29uZmlnIG9iamVjdFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdDbGFzcyBjcmVhdGVkIHdpdGggb2JqZWN0IGNvbmZpZ3VyYXRpb24gbWlzc2luZyBjbGFzc05hbWUgb3IgbW9kdWxlIHByb3BlcnR5JywgY29uZmlnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gY29uZmlnLmNsYXNzTmFtZSA/IGNvbmZpZy5jbGFzc05hbWUgOiBjb25maWcubW9kdWxlLnByb3RvdHlwZS5jbGFzc05hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZXhpc3RzKGNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NsYXNzICcgKyBjbGFzc05hbWUgKyAnIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNscyA9IE5lby5ucyhjbGFzc05hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5zdGFuY2UgPSBuZXcgY2xzKGNvbmZpZyk7XG5cbiAgICAgICAgaW5zdGFuY2Uub25Db25zdHJ1Y3RlZCgpO1xuICAgICAgICBpbnN0YW5jZS5pbml0KCk7XG5cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH0sXG5cbiAgICBlbXB0eUZuKCkge30sXG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGEgY2xhc3NOYW1lIHN0cmluZyBpbnRvIGEgZ2xvYmFsIG5hbWVzcGFjZVxuICAgICAqIEBleGFtcGxlXG4gICAgICogTmVvLm5zKCdOZW8uY29tcG9uZW50LkJ1dHRvbicsIHRydWUpO1xuICAgICAqIC8vID0+XG4gICAgICogLy8gc2VsZi5OZW8gPSBzZWxmLk5lbyB8fCB7fTtcbiAgICAgKiAvLyBzZWxmLk5lby5jb21wb25lbnQgPSBzZWxmLk5lby5jb21wb25lbnQgfHwge307XG4gICAgICogLy8gc2VsZi5OZW8uY29tcG9uZW50LkJ1dHRvbiA9IHNlbGYuTmVvLmNvbXBvbmVudC5CdXR0b24gfHwge307XG4gICAgICogLy8gcmV0dXJuIHNlbGYuTmVvLmNvbXBvbmVudC5CdXR0b247XG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgbW9kdWxlOk5lb1xuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBuYW1lcyBUaGUgY2xhc3MgbmFtZSBzdHJpbmcgY29udGFpbmluZyBkb3RzIG9yIGFuIEFycmF5IG9mIHRoZSBzdHJpbmcgcGFydHNcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtjcmVhdGVdIFNldCBjcmVhdGUgdG8gdHJ1ZSB0byBjcmVhdGUgZW1wdHkgb2JqZWN0cyBmb3Igbm9uIGV4aXN0aW5nIHBhcnRzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtzY29wZV0gU2V0IGEgZGlmZmVyZW50IHN0YXJ0aW5nIHBvaW50IGFzIHNlbGZcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSByZWZlcmVuY2UgdG8gdGhlIHRvcGxldmVsIG5hbWVzcGFjZVxuICAgICAqL1xuICAgIG5zKG5hbWVzLCBjcmVhdGUsIHNjb3BlKSB7XG4gICAgICAgIG5hbWVzID0gQXJyYXkuaXNBcnJheShuYW1lcykgPyBuYW1lcyA6IG5hbWVzLnNwbGl0KCcuJyk7XG5cbiAgICAgICAgcmV0dXJuIG5hbWVzLnJlZHVjZSgocHJldiwgY3VycmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNyZWF0ZSAmJiAhcHJldltjdXJyZW50XSkge1xuICAgICAgICAgICAgICAgIHByZXZbY3VycmVudF0gPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXZbY3VycmVudF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHNjb3BlIHx8IHNlbGYpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGluc3RhbmNlcyBvZiBOZW8gY2xhc3NlcyB1c2luZyB0aGVpciBudHlwZSBpbnN0ZWFkIG9mIHRoZSBjbGFzcyBuYW1lXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBOZW8ubnR5cGUoJ2J1dHRvbicge1xuICAgICAqICAgICBpY29uQ2xzOiAnZmEgZmEtaG9tZScsXG4gICAgICogICAgIHRleHQgICA6ICdIb21lJ1xuICAgICAqIH0pO1xuICAgICAqIEBleGFtcGxlXG4gICAgICogTmVvLm50eXBlKHtcbiAgICAgKiAgICAgbnR5cGUgIDogJ2J1dHRvbicsXG4gICAgICogICAgIGljb25DbHM6ICdmYSBmYS1ob21lJyxcbiAgICAgKiAgICAgdGV4dCAgIDogJ0hvbWUnXG4gICAgICogfSk7XG4gICAgICogQG1lbWJlck9mIG1vZHVsZTpOZW9cbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IG50eXBlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtjb25maWddXG4gICAgICogQHJldHVybnMge05lby5jb3JlLkJhc2V9XG4gICAgICogQHNlZSB7QGxpbmsgbW9kdWxlOk5lby5jcmVhdGUgY3JlYXRlfVxuICAgICAqL1xuICAgIG50eXBlKG50eXBlLCBjb25maWcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGNvbmZpZyA9IG50eXBlO1xuICAgICAgICAgICAgaWYgKCFjb25maWcubnR5cGUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NsYXNzIGRlZmluZWQgd2l0aCBvYmplY3QgY29uZmlndXJhdGlvbiBtaXNzaW5nIG50eXBlIHByb3BlcnR5LiAnICsgY29uZmlnLm50eXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG50eXBlID0gY29uZmlnLm50eXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNsYXNzTmFtZSA9IE5lby5udHlwZU1hcFtudHlwZV07XG5cbiAgICAgICAgaWYgKCFjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbnR5cGUgJyArIG50eXBlICsgJyBkb2VzIG5vdCBleGlzdCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBOZW8uY3JlYXRlKGNsYXNzTmFtZSwgY29uZmlnKTtcbiAgICB9LFxuXG4gICAgb25TdGFydDogTmVvLmVtcHR5Rm5cbn0sIE5lbyk7XG5cbi8qKlxuICogTGlzdCBvZiBjbGFzcyBwcm9wZXJ0aWVzIHdoaWNoIGFyZSBub3Qgc3VwcG9zZWQgdG8gZ2V0IG1peGVkIGludG8gb3RoZXIgY2xhc3Nlc1xuICogQHR5cGUge3N0cmluZ1tdfVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgaWdub3JlTWl4aW4gPSBbXG4gICAgJ19uYW1lJyxcbiAgICAnY2xhc3NDb25maWdBcHBsaWVkJyxcbiAgICAnY2xhc3NOYW1lJyxcbiAgICAnY29uc3RydWN0b3InLFxuICAgICdpc0NsYXNzJyxcbiAgICAnbWl4aW4nLFxuICAgICdudHlwZScsXG4gICAgJ29ic2VydmFibGUnLFxuICAgICdyZWdpc3RlclRvR2xvYmFsTnMnXG5dO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge05lby5jb3JlLkJhc2V9IGNsc1xuICogQHBhcmFtIHtBcnJheX0gbWl4aW5zXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBhcHBseU1peGlucyhjbHMsIG1peGlucykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShtaXhpbnMpKSB7XG4gICAgICAgIG1peGlucyA9IFttaXhpbnNdO1xuICAgIH1cblxuICAgIGxldCBpICAgICAgICAgICAgPSAwLFxuICAgICAgICBsZW4gICAgICAgICAgPSBtaXhpbnMubGVuZ3RoLFxuICAgICAgICBtaXhpbkNsYXNzZXMgPSB7fSxcbiAgICAgICAgbWl4aW4sIG1peGluQ2xzLCBtaXhpblByb3RvO1xuXG4gICAgZm9yICg7aSA8IGxlbjtpKyspIHtcbiAgICAgICAgbWl4aW4gPSBtaXhpbnNbaV07XG5cbiAgICAgICAgaWYgKG1peGluLmlzQ2xhc3MpIHtcbiAgICAgICAgICAgIG1peGluUHJvdG8gPSBtaXhpbi5wcm90b3R5cGU7XG4gICAgICAgICAgICBtaXhpbkNscyAgID0gTmVvLm5zKG1peGluUHJvdG8uY2xhc3NOYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghZXhpc3RzKG1peGluKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXR0ZW1wdGluZyB0byBtaXhpbiBhbiB1bmRlZmluZWQgY2xhc3M6ICcgKyBtaXhpbiArICcsICcgKyBjbHMucHJvdG90eXBlLmNsYXNzTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtaXhpbkNscyAgID0gTmVvLm5zKG1peGluKTtcbiAgICAgICAgICAgIG1peGluUHJvdG8gPSBtaXhpbkNscy5wcm90b3R5cGU7XG4gICAgICAgIH1cblxuICAgICAgICBtaXhpblByb3RvLmNsYXNzTmFtZS5zcGxpdCgnLicpLnJlZHVjZShtaXhSZWR1Y2UobWl4aW5DbHMpLCBtaXhpbkNsYXNzZXMpO1xuXG4gICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG1peGluUHJvdG8pLmZvckVhY2gobWl4aW5Qcm9wZXJ0eShjbHMucHJvdG90eXBlLCBtaXhpblByb3RvKSk7XG4gICAgfVxuXG4gICAgY2xzLnByb3RvdHlwZS5taXhpbnMgPSBtaXhpbkNsYXNzZXM7IC8vIHRvZG86IHdlIHNob3VsZCBkbyBhIGRlZXAgbWVyZ2Vcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGdldCAvIHNldCBtZXRob2RzIGZvciBjbGFzcyBjb25maWdzIGVuZGluZyB3aXRoIGFuIHVuZGVyc2NvcmVcbiAqIEBwYXJhbSB7TmVvLmNvcmUuQmFzZX0gcHJvdG9cbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwcml2YXRlXG4gKiBAdHV0b3JpYWwgMDJfQ2xhc3NTeXN0ZW1cbiAqL1xuZnVuY3Rpb24gYXV0b0dlbmVyYXRlR2V0U2V0KHByb3RvLCBrZXkpIHtcbiAgICBpZiAoaGFzUHJvcGVydHlTZXR0ZXIocHJvdG8sIGtleSkpIHtcbiAgICAgICAgdGhyb3coJ0NvbmZpZyAnICsga2V5ICsgJ18gKCcgKyBwcm90by5jbGFzc05hbWUgKyAnKSBhbHJlYWR5IGhhcyBhIHNldCBtZXRob2QsIHVzZSBiZWZvcmVHZXQsIGJlZm9yZVNldCAmIGFmdGVyU2V0IGluc3RlYWQnKTtcbiAgICB9XG5cbiAgICBpZiAoIU5lb1tnZXRTZXRDYWNoZV0pIHtcbiAgICAgICAgTmVvW2dldFNldENhY2hlXSA9IHt9O1xuICAgIH1cblxuICAgIGlmICghTmVvW2dldFNldENhY2hlXVtrZXldKSB7XG4gICAgICAgIE5lb1tnZXRTZXRDYWNoZV1ba2V5XSA9IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICBsZXQgbWUgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlR2V0ID0gJ2JlZm9yZUdldCcgKyBOZW8uY2FwaXRhbGl6ZShrZXkpLFxuICAgICAgICAgICAgICAgICAgICBoYXNOZXdLZXkgPSBtZVtjb25maWdTeW1ib2xdLmhhc093blByb3BlcnR5KGtleSksXG4gICAgICAgICAgICAgICAgICAgIG5ld0tleSAgICA9IG1lW2NvbmZpZ1N5bWJvbF1ba2V5XSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgID0gaGFzTmV3S2V5ID8gbmV3S2V5IDogbWVbJ18nICsga2V5XTtcblxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ICE9PSAnaXRlbXMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IFsuLi52YWx1ZV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IG5ldyBEYXRlKHZhbHVlLnZhbHVlT2YoKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGhhc05ld0tleSkge1xuICAgICAgICAgICAgICAgICAgICBtZVtrZXldID0gdmFsdWU7IC8vIHdlIGRvIHdhbnQgdG8gdHJpZ2dlciB0aGUgc2V0dGVyID0+IGJlZm9yZVNldCwgYWZ0ZXJTZXRcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBtZVsnXycgKyBrZXldOyAvLyByZXR1cm4gdGhlIHZhbHVlIHBhcnNlZCBieSB0aGUgc2V0dGVyXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG1lW2JlZm9yZUdldF0gJiYgdHlwZW9mIG1lW2JlZm9yZUdldF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBtZVtiZWZvcmVHZXRdKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgbWUgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgX2tleSAgICAgID0gJ18nICsga2V5LFxuICAgICAgICAgICAgICAgICAgICB1S2V5ICAgICAgPSBOZW8uY2FwaXRhbGl6ZShrZXkpLFxuICAgICAgICAgICAgICAgICAgICBiZWZvcmVTZXQgPSAnYmVmb3JlU2V0JyArIHVLZXksXG4gICAgICAgICAgICAgICAgICAgIGFmdGVyU2V0ICA9ICdhZnRlclNldCcgICsgdUtleSxcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWUgID0gbWVbX2tleV07XG5cbiAgICAgICAgICAgICAgICAvLyBldmVyeSBzZXQgY2FsbCBoYXMgdG8gZGVsZXRlIHRoZSBtYXRjaGluZyBzeW1ib2xcbiAgICAgICAgICAgICAgICBkZWxldGUgbWVbY29uZmlnU3ltYm9sXVtrZXldO1xuXG4gICAgICAgICAgICAgICAgLy8gd2UgZG8gd2FudCB0byBzdG9yZSB0aGUgdmFsdWUgYmVmb3JlIHRoZSBiZWZvcmVTZXQgbW9kaWZpY2F0aW9uIGFzIHdlbGwsXG4gICAgICAgICAgICAgICAgLy8gc2luY2UgaXQgY291bGQgZ2V0IHB1bGxlZCBieSBvdGhlciBiZWZvcmVTZXQgbWV0aG9kcyBvZiBkaWZmZXJlbnQgY29uZmlnc1xuICAgICAgICAgICAgICAgIG1lW19rZXldID0gdmFsdWU7XG5cbiAgICAgICAgICAgICAgICBpZiAobWVbYmVmb3JlU2V0XSAmJiB0eXBlb2YgbWVbYmVmb3JlU2V0XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IG1lW2JlZm9yZVNldF0odmFsdWUsIG9sZFZhbHVlKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGV5IGRvbid0IHJldHVybiBhIHZhbHVlLCB0aGF0IG1lYW5zIG5vIGNoYW5nZVxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVbX2tleV0gPSBvbGRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG1lW19rZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdG9kbzogd2UgY291bGQgY29tcGFyZSBvYmplY3RzICYgYXJyYXlzIGZvciBlcXVhbGl0eVxuICAgICAgICAgICAgICAgIGlmIChOZW8uaXNPYmplY3QodmFsdWUpIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpIHx8IHZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWVbYWZ0ZXJTZXRdICYmIHR5cGVvZiBtZVthZnRlclNldF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lW2FmdGVyU2V0XSh2YWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywga2V5LCBOZW9bZ2V0U2V0Q2FjaGVdW2tleV0pO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgY2xhc3MgbmFtZSBleGlzdHMgaW5zaWRlIHRoZSBOZW8gb3IgYXBwIG5hbWVzcGFjZVxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZVxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBleGlzdHMoY2xhc3NOYW1lKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuICEhY2xhc3NOYW1lLnNwbGl0KCcuJykucmVkdWNlKChwcmV2LCBjdXJyZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcHJldltjdXJyZW50XTtcbiAgICAgICAgfSwgc2VsZik7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZXJlIGlzIGEgc2V0IG1ldGhvZCBmb3IgYSBnaXZlbiBwcm9wZXJ0eSBrZXkgaW5zaWRlIHRoZSBwcm90b3R5cGUgY2hhaW5cbiAqIEBwYXJhbSB7TmVvLmNvcmUuQmFzZX0gcHJvdG8gVGhlIHRvcCBsZXZlbCBwcm90b3R5cGUgb2YgYSBjbGFzc1xuICogQHBhcmFtIHtTdHJpbmd9IGtleSB0aGUgcHJvcGVydHkga2V5IHRvIHRlc3RcbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaGFzUHJvcGVydHlTZXR0ZXIocHJvdG8sIGtleSkge1xuICAgIGxldCBkZXNjcmlwdG9yO1xuXG4gICAgd2hpbGUgKHByb3RvLl9fcHJvdG9fXykge1xuICAgICAgICBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90bywga2V5KTtcblxuICAgICAgICBpZiAodHlwZW9mIGRlc2NyaXB0b3IgPT09ICdvYmplY3QnICYmIHR5cGVvZiBkZXNjcmlwdG9yLnNldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdG8gPSBwcm90by5fX3Byb3RvX187XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge05lby5jb3JlLkJhc2V9IHByb3RvXG4gKiBAcGFyYW0ge05lby5jb3JlLkJhc2V9IG1peGluUHJvdG9cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1peGluUHJvcGVydHkocHJvdG8sIG1peGluUHJvdG8pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIGlmICh+aWdub3JlTWl4aW4uaW5kZXhPZihrZXkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3RvW2tleV0gJiYgcHJvdG9ba2V5XS5fZnJvbSkge1xuICAgICAgICAgICAgaWYgKG1peGluUHJvdG8uY2xhc3NOYW1lID09PSBwcm90b1trZXldLl9mcm9tKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdNaXhpbiBzZXQgbXVsdGlwbGUgdGltZXMgb3IgYWxyZWFkeSBkZWZpbmVkIG9uIGEgQmFzZSBDbGFzcycsIHByb3RvLmNsYXNzTmFtZSwgbWl4aW5Qcm90by5jbGFzc05hbWUsIGtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIHByb3RvLmNsYXNzTmFtZSArICc6IE11bHRpcGxlIG1peGlucyBkZWZpbmluZyBzYW1lIHByb3BlcnR5ICgnICtcbiAgICAgICAgICAgICAgICBtaXhpblByb3RvLmNsYXNzTmFtZSArICcsICcgK1xuICAgICAgICAgICAgICAgIHByb3RvW2tleV0uX2Zyb20gKyAnKSA9PiAnICtcbiAgICAgICAgICAgICAgICBrZXlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90b1trZXldID0gbWl4aW5Qcm90b1trZXldO1xuXG4gICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG8sIGtleSkuX2Zyb20gPSBtaXhpblByb3RvLmNsYXNzTmFtZTtcblxuICAgICAgICBpZiAodHlwZW9mIHByb3RvW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHByb3RvW2tleV0uX25hbWUgPSBrZXk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0gbWl4aW5DbHNcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1peFJlZHVjZShtaXhpbkNscykge1xuICAgIHJldHVybiAocHJldiwgY3VycmVudCwgaWR4LCBhcnIpID0+IHtcbiAgICAgICAgcmV0dXJuIHByZXZbY3VycmVudF0gPSBpZHggIT09IGFyci5sZW5ndGggLTEgPyBwcmV2W2N1cnJlbnRdIHx8IHt9IDogbWl4aW5DbHM7XG4gICAgfTtcbn1cblxuTmVvLmNvbmZpZyA9IE5lby5jb25maWcgfHwge307XG5cbk5lby5hc3NpZ25EZWZhdWx0cyhOZW8uY29uZmlnLCBEZWZhdWx0Q29uZmlnKTtcblxuZXhwb3J0IHtOZW8gYXMgZGVmYXVsdH07IiwiaW1wb3J0IElkR2VuZXJhdG9yIGZyb20gJy4vSWRHZW5lcmF0b3IubWpzJ1xuXG5jb25zdCBjb25maWdTeW1ib2wgPSBTeW1ib2wuZm9yKCdjb25maWdTeW1ib2wnKSxcbiAgICAgIGlzSW5zdGFuY2UgICA9IFN5bWJvbCgnaXNJbnN0YW5jZScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGNsYXNzIGZvciAoYWxtb3N0KSBhbGwgY2xhc3NlcyBpbnNpZGUgdGhlIE5lbyBuYW1lc3BhY2VcbiAqIEV4Y2VwdGlvbnMgYXJlIGUuZy4gY29yZS5JZEdlbmVyYXRvciwgdmRvbS5WTm9kZVxuICogQGNsYXNzIE5lby5jb3JlLkJhc2VcbiAqL1xuY2xhc3MgQmFzZSB7XG4gICAgLyoqXG4gICAgICogVGhlIHJldHVybiB2YWx1ZSB3aWxsIGdldCBhcHBsaWVkIHRvIHRoZSBjbGFzcyBjb25zdHJ1Y3RvclxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IHN0YXRpY0NvbmZpZ1xuICAgICAqIEB0dXRvcmlhbCAwMl9DbGFzc1N5c3RlbVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRTdGF0aWNDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCB0aGlzIG9uZSB0byBmYWxzZSBpbiBjYXNlIHlvdSBkb24ndCB3YW50IHRvIHN0aWNrXG4gICAgICAgICAqIHRvIHRoZSBcImFudGktcGF0dGVyblwiIHRvIGFwcGx5IGNsYXNzZXMgdG8gdGhlIGdsb2JhbCBOZW8gb3IgQXBwIG5hbWVzcGFjZVxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSByZWdpc3RlclRvR2xvYmFsTnM9dHJ1ZVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICByZWdpc3RlclRvR2xvYmFsTnM6IHRydWVcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogVGhlIHJldHVybiB2YWx1ZSB3aWxsIGdldCBhcHBsaWVkIHRvIGVhY2ggY2xhc3MgaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzdGF0aWNDb25maWdcbiAgICAgKiBAdHV0b3JpYWwgMDJfQ2xhc3NTeXN0ZW1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgY2xhc3MgbmFtZSB3aGljaCB3aWxsIGdldCBtYXBwZWQgaW50byB0aGUgTmVvIG9yIGFwcCBuYW1lc3BhY2VcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5jb3JlLkJhc2UnXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uY29yZS5CYXNlJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjbGFzcyBzaG9ydGN1dC1uYW1lIHRvIHVzZSBmb3IgZS5nLiBjcmVhdGluZyBjaGlsZCBjb21wb25lbnRzIGluc2lkZSBhIEpTT04tZm9ybWF0XG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J2Jhc2UnXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ2Jhc2UnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkIG1peGlucyBhcyBhbiBhcnJheSBvZiBjbGFzc05hbWVzLCBpbXBvcnRlZCBtb2R1bGVzIG9yIGEgbWl4ZWQgdmVyc2lvblxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXXxOZW8uY29yZS5CYXNlW118bnVsbH0gbWl4aW5zPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIG1peGluczogbnVsbFxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKiBDb25zdW1lcyB0aGUgc3RhdGljIGdldENvbmZpZygpIG9iamVjdFxuICAgICAqIEFwcGxpZXMgdGhlIG9ic2VydmFibGUgbWl4aW4gaWYgbmVlZGVkLCBncmFudHMgcmVtb3RlIGFjY2VzcyBpZiBuZWVkZWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcblxuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG1lLCB7XG4gICAgICAgICAgICBbY29uZmlnU3ltYm9sXToge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlICA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHZhbHVlICAgICAgIDoge30sXG4gICAgICAgICAgICAgICAgd3JpdGFibGUgICAgOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW2lzSW5zdGFuY2VdOiB7XG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmFsdWUgICAgIDogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBtZS5jcmVhdGVJZChjb25maWcuaWQgfHwgbWUuaWQpO1xuICAgICAgICBkZWxldGUgY29uZmlnLmlkO1xuXG4gICAgICAgIGlmIChtZS5jb25zdHJ1Y3Rvci5jb25maWcpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBtZS5jb25zdHJ1Y3Rvci5jb25maWcuaWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWUuZ2V0U3RhdGljQ29uZmlnKCdvYnNlcnZhYmxlJykgfHwgbWUubWl4aW5zICYmIE5lby5ucygnTmVvLmNvcmUuT2JzZXJ2YWJsZScsIG1lLm1peGlucykpIHtcbiAgICAgICAgICAgIG1lLmluaXRPYnNlcnZhYmxlKGNvbmZpZyk7XG4gICAgICAgIH1cblxuICAgICAgICBtZS5pbml0Q29uZmlnKGNvbmZpZyk7XG5cbiAgICAgICAgaWYgKG1lLmNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIG1lLmNvbnRyb2xsZXIucGFyc2VDb25maWcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtZSwgJ2NvbmZpZ3NBcHBsaWVkJywge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZSAgICAgOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtZS5yZW1vdGUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQobWUuaW5pdFJlbW90ZS5iaW5kKG1lKSwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRyaWdnZXJlZCBhZnRlciBhbGwgY29uc3RydWN0b3JzIGFyZSBkb25lXG4gICAgICogQHR1dG9yaWFsIDAyX0NsYXNzU3lzdGVtXG4gICAgICovXG4gICAgb25Db25zdHJ1Y3RlZCgpIHt9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRyaWdnZXJlZCBhZnRlciBvbkNvbnN0cnVjdGVkIGlzIGRvbmVcbiAgICAgKiBAc2VlIHtAbGluayBOZW8uY29yZS5CYXNlI29uQ29uc3RydWN0ZWQgb25Db25zdHJ1Y3RlZH1cbiAgICAgKiBAdHV0b3JpYWwgMDJfQ2xhc3NTeXN0ZW1cbiAgICAgKi9cbiAgICBpbml0KCkge31cblxuICAgIC8qKlxuICAgICAqIENvbnZlbmllbmNlIG1ldGhvZCBmb3IgYmVmb3JlU2V0IGZ1bmN0aW9ucyB3aGljaCB0ZXN0IGlmIGEgZ2l2ZW4gdmFsdWUgaXMgaW5zaWRlIGEgc3RhdGljIGFycmF5XG4gICAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gb2xkVmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBjb25maWcgbmFtZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbc3RhdGljTmFtZT1uYW1lICsgJ3MnXSBuYW1lIG9mIHRoZSBzdGF0aWMgY29uZmlnIGFycmF5XG4gICAgICovXG4gICAgYmVmb3JlU2V0RW51bVZhbHVlKHZhbHVlLCBvbGRWYWx1ZSwgbmFtZSwgc3RhdGljTmFtZSA9IG5hbWUgKyAncycpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gdGhpcy5nZXRTdGF0aWNDb25maWcoc3RhdGljTmFtZSk7XG5cbiAgICAgICAgaWYgKCF2YWx1ZXMuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgICAgICBOZW8ubG9nRXJyb3IoJ1N1cHBvcnRlZCB2YWx1ZXMgZm9yICcgKyBuYW1lICsgJyBhcmU6JywgdmFsdWVzLmpvaW4oJywgJyksIHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIG9sZFZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZXMgdGhlIElkR2VuZXJhdG9yIHRvIGNyZWF0ZSBhbiBpZCBpZiBhIHN0YXRpYyBvbmUgaXMgbm90IGV4cGxpY2l0bHkgc2V0LlxuICAgICAqIFJlZ2lzdGVycyB0aGUgaW5zdGFuY2UgdG8gbWFuYWdlci5JbnN0YW5jZSBpZiB0aGlzIG9uZSBpcyBhbHJlYWR5IGNyZWF0ZWQsXG4gICAgICogb3RoZXJ3aXNlIHN0b3JlcyBpdCBpbnNpZGUgYSB0bXAgbWFwLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqL1xuICAgIGNyZWF0ZUlkKGlkKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgbWUuaWQgPSBpZCB8fCBJZEdlbmVyYXRvci5nZXRJZChtZS5udHlwZSk7XG5cbiAgICAgICAgaWYgKEJhc2UuaW5zdGFuY2VNYW5hZ2VyQXZhaWxhYmxlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBOZW8ubWFuYWdlci5JbnN0YW5jZS5yZWdpc3RlcihtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIU5lby5pZE1hcCkge1xuICAgICAgICAgICAgICAgIE5lby5pZE1hcCA9IHt9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBOZW8uaWRNYXBbbWUuaWRdID0gbWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVbnJlZ2lzdGVycyB0aGlzIGluc3RhbmNlIGZyb20gTmVvLm1hbmFnZXIuSW5zdGFuY2VcbiAgICAgKiBhbmQgcmVtb3ZlcyBhbGwgb2JqZWN0IGVudHJpZXMgZnJvbSB0aGlzIGluc3RhbmNlXG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAoQmFzZS5pbnN0YW5jZU1hbmFnZXJBdmFpbGFibGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIE5lby5tYW5hZ2VyLkluc3RhbmNlLnVucmVnaXN0ZXIobWUpO1xuICAgICAgICB9IGVsc2UgaWYgKE5lby5pZE1hcCkge1xuICAgICAgICAgICAgZGVsZXRlIE5lby5pZE1hcFttZS5pZF07XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3Qua2V5cyhtZSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobWUsIGtleSkud3JpdGFibGUpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgbWVba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgYSBzdGF0aWMgY29uZmlnIGtleSBvciB0aGUgc3RhdGljQ29uZmlnIG9iamVjdCBpdHNlbGYgaW4gY2FzZSBubyB2YWx1ZSBpcyBzZXRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2tleV0gVGhlIGtleSBvZiBhIHN0YXRpY0NvbmZpZyBkZWZpbmVkIGluc2lkZSBzdGF0aWMgZ2V0U3RhdGljQ29uZmlnXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgZ2V0U3RhdGljQ29uZmlnKGtleSkge1xuICAgICAgICBsZXQgY2ZnID0gdGhpcy5jb25zdHJ1Y3Rvci5zdGF0aWNDb25maWc7XG4gICAgICAgIHJldHVybiAoa2V5ID8gY2ZnW2tleV0gOiBjZmcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgYWxsIGNsYXNzIGNvbmZpZ3MgdG8gdGhpcyBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtwcmV2ZW50T3JpZ2luYWxDb25maWddIFRydWUgcHJldmVudHMgdGhlIGluc3RhbmNlIGZyb20gZ2V0dGluZyBhbiBvcmlnaW5hbENvbmZpZyBwcm9wZXJ0eVxuICAgICAqL1xuICAgIGluaXRDb25maWcoY29uZmlnLCBwcmV2ZW50T3JpZ2luYWxDb25maWcpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBPYmplY3QuYXNzaWduKG1lW2NvbmZpZ1N5bWJvbF0sIG1lLm1lcmdlQ29uZmlnKGNvbmZpZywgcHJldmVudE9yaWdpbmFsQ29uZmlnKSk7XG4gICAgICAgIG1lLnByb2Nlc3NDb25maWdzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBwcm9jZXNzQ29uZmlncygpIHtcbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAga2V5cyA9IE9iamVjdC5rZXlzKG1lW2NvbmZpZ1N5bWJvbF0pO1xuXG4gICAgICAgIC8vIFdlIGRvIG5vdCB3YW50IHRvIGl0ZXJhdGUgb3ZlciB0aGUga2V5cywgc2luY2UgMSBjb25maWcgY2FuIHJlbW92ZSBtb3JlIHRoYW4gMSBrZXkgKGJlZm9yZVNldFgsIGFmdGVyU2V0WClcbiAgICAgICAgaWYgKGtleXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gVGhlIGhhc093blByb3BlcnR5IGNoZWNrIGlzIGludGVuZGVkIGZvciBjb25maWdzIHdpdGhvdXQgYSB0cmFpbGluZyB1bmRlcnNjb3JlXG4gICAgICAgICAgICAvLyA9PiB0aGV5IGNvdWxkIGFscmVhZHkgZ290IGFzc2lnbmVkIGluc2lkZSBhbiBhZnRlclNldC1tZXRob2RcbiAgICAgICAgICAgIGlmICghbWUuaGFzT3duUHJvcGVydHkoa2V5c1swXSkpIHtcbiAgICAgICAgICAgICAgICBtZVtrZXlzWzBdXSA9IG1lW2NvbmZpZ1N5bWJvbF1ba2V5c1swXV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHRoZXJlIGlzIGEgZGVsZXRlIGNhbGwgaW5zaWRlIHRoZSBjb25maWcgZ2V0dGVyIGFzIHdlbGwgKE5lby5tanMgPT4gYXV0b0dlbmVyYXRlR2V0U2V0KCkpXG4gICAgICAgICAgICAvLyB3ZSBuZWVkIHRvIGtlZXAgdGhpcyBvbmUgZm9yIGNvbmZpZ3MsIHdoaWNoIGRvIG5vdCB1c2UgZ2V0dGVycyAobm8gdHJhaWxpbmcgdW5kZXJzY29yZSlcbiAgICAgICAgICAgIGRlbGV0ZSBtZVtjb25maWdTeW1ib2xdW2tleXNbMF1dO1xuXG4gICAgICAgICAgICBtZS5wcm9jZXNzQ29uZmlncygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRG9lcyBnZXQgdHJpZ2dlcmVkIHdpdGggYSBkZWxheSB0byBlbnN1cmUgdGhhdCBOZW8ud29ya2VySWQgJiBOZW8ud29ya2VyLk1hbmFnZXIgYXJlIGRlZmluZWRcbiAgICAgKiBSZW1vdGUgbWV0aG9kIGFjY2VzcyB2aWEgcHJvbWlzZXNcbiAgICAgKi9cbiAgICBpbml0UmVtb3RlKCkge1xuICAgICAgICBsZXQgbWUgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHJlbW90ZSAgICA9IG1lLnJlbW90ZSxcbiAgICAgICAgICAgIGNsYXNzTmFtZSA9IG1lLmNsYXNzTmFtZSxcbiAgICAgICAgICAgIG9yaWdpbjtcblxuICAgICAgICBpZiAoIW1lLnNpbmdsZXRvbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZW1vdGUgbWV0aG9kIGFjY2VzcyBvbmx5IGZ1bmN0aW9uYWwgZm9yIFNpbmdsZXRvbiBjbGFzc2VzICcgKyBjbGFzc05hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFOZW8uY29uZmlnLnVuaXRUZXN0TW9kZSAmJiBOZW8uaXNPYmplY3QocmVtb3RlKSkge1xuICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMocmVtb3RlKS5mb3JFYWNoKChbd29ya2VyLCBtZXRob2RzXSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChOZW8ud29ya2VySWQgIT09IHdvcmtlcikge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW4gPSBOZW8ud29ya2VySWQgPT09ICdtYWluJyA/IE5lby53b3JrZXIuTWFuYWdlciA6IE5lby5jdXJyZW50V29ya2VyO1xuXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbi5zZW5kTWVzc2FnZSh3b3JrZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbiAgIDogJ3JlZ2lzdGVyUmVtb3RlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZHMgIDogbWV0aG9kcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gY2hhbmdlIHRoZSBvcmRlciBjb25maWdzIGFyZSBhcHBsaWVkIHRvIHRoaXMgaW5zdGFuY2UuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3ByZXZlbnRPcmlnaW5hbENvbmZpZ10gVHJ1ZSBwcmV2ZW50cyB0aGUgaW5zdGFuY2UgZnJvbSBnZXR0aW5nIGFuIG9yaWdpbmFsQ29uZmlnIHByb3BlcnR5XG4gICAgICogQHJldHVybnMge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgbWVyZ2VDb25maWcoY29uZmlnLCBwcmV2ZW50T3JpZ2luYWxDb25maWcpIHtcbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgY3RvciA9IG1lLmNvbnN0cnVjdG9yO1xuXG4gICAgICAgIGlmICghY3Rvci5jb25maWcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmVvLmFwcGx5Q2xhc3NDb25maWcgaGFzIG5vdCBiZWVuIHJ1biBvbiAnICsgbWUuY2xhc3NOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcHJldmVudE9yaWdpbmFsQ29uZmlnKSB7XG4gICAgICAgICAgICBtZS5vcmlnaW5hbENvbmZpZyA9IE5lby5jbG9uZShjb25maWcsIHRydWUsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsuLi5jdG9yLmNvbmZpZywgLi4uY29uZmlnfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGFuZ2UgbXVsdGlwbGUgY29uZmlncyBhdCBvbmNlLCBlbnN1cmluZyB0aGF0IGFsbCBhZnRlclNldCBtZXRob2RzIGdldCBhbGwgbmV3IGFzc2lnbmVkIHZhbHVlc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZXM9e31cbiAgICAgKi9cbiAgICBzZXQodmFsdWVzPXt9KSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgLy8gaW5zdGVhZCBvZiB1c2luZzpcbiAgICAgICAgLy8gbWVbY29uZmlnU3ltYm9sXSA9IHZhbHVlcztcbiAgICAgICAgLy8gd2Uga2VlcCB0aGUgT2JqZWN0IGluc3RhbmNlIChkZWZpbmVkIHZpYSBPYmplY3QuZGVmaW5lUHJvcGVydGllcygpID0+IG5vbiBlbnVtZXJhYmxlKVxuXG4gICAgICAgIE9iamVjdC5rZXlzKG1lW2NvbmZpZ1N5bWJvbF0pLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZSBtZVtjb25maWdTeW1ib2xdW2tleV07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24obWVbY29uZmlnU3ltYm9sXSwgdmFsdWVzKTtcblxuICAgICAgICBtZS5wcm9jZXNzQ29uZmlncygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHZhbHVlIG9mIGEgc3RhdGljIGNvbmZpZyBieSBhIGdpdmVuIGtleVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgVGhlIGtleSBvZiBhIHN0YXRpY0NvbmZpZyBkZWZpbmVkIGluc2lkZSBzdGF0aWMgZ2V0U3RhdGljQ29uZmlnXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSB0cnVlIGluIGNhc2UgdGhlIGNvbmZpZyBleGlzdHMgYW5kIGdvdCBjaGFuZ2VkXG4gICAgICovXG4gICAgc2V0U3RhdGljQ29uZmlnKGtleSwgdmFsdWUpIHtcbiAgICAgICAgbGV0IHN0YXRpY0NvbmZpZyA9IHRoaXMuY29uc3RydWN0b3Iuc3RhdGljQ29uZmlnO1xuXG4gICAgICAgIGlmIChzdGF0aWNDb25maWcuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgc3RhdGljQ29uZmlnW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIDxwPkVuaGFuY2luZyB0aGUgdG9TdHJpbmcoKSBtZXRob2QsIGUuZy48L3A+XG4gICAgICogYE5lby5jcmVhdGUoJ05lby5jb21wb25lbnQuQnV0dG9uJykudG9TdHJpbmcoKSA9PiBcIltvYmplY3QgTmVvLmNvbXBvbmVudC5CdXR0b24gKG5lby1idXR0b24tMSldXCJgXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmNsYXNzTmFtZX0gKGlkOiAke3RoaXMuaWR9KWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogPHA+RW5oYW5jaW5nIHRoZSBpbnN0YW5jZW9mIG1ldGhvZC4gV2l0aG91dCB0aGlzIGNoYW5nZTo8L3A+XG4gICAgICogYE5lby5jb2xsZWN0aW9uLkJhc2UucHJvdG90eXBlIGluc3RhbmNlb2YgTmVvLmNvcmUuQmFzZSA9PiB0cnVlYFxuICAgICAqIDxwPldpdGggdGhpcyBjaGFuZ2U6PC9wPlxuICAgICAqIGBOZW8uY29sbGVjdGlvbi5CYXNlLnByb3RvdHlwZSBpbnN0YW5jZW9mIE5lby5jb3JlLkJhc2UgPT4gZmFsc2VgPGJyPlxuICAgICAqIGBOZW8uY3JlYXRlKE5lby5jb2xsZWN0aW9uLkJhc2UpIGluc3RhbmNlb2YgTmVvLmNvcmUuQmFzZSA9PiB0cnVlYFxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBbU3ltYm9sLmhhc0luc3RhbmNlXShpbnN0YW5jZSkge1xuICAgICAgICBpZiAoIWluc3RhbmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5zdGFuY2VbaXNJbnN0YW5jZV0gPT09IHRydWUgPyBzdXBlcltTeW1ib2wuaGFzSW5zdGFuY2VdKGluc3RhbmNlKSA6IGZhbHNlO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoQmFzZSk7XG5cbkJhc2UuaW5zdGFuY2VNYW5hZ2VyQXZhaWxhYmxlID0gZmFsc2U7XG5cbmV4cG9ydCB7QmFzZSBhcyBkZWZhdWx0fTsiLCIvKipcbiAqIFRoaXMgY2xhc3MgZ2V0cyB1c2VkIGJ5IGNvcmUuQmFzZSwgc28gaXQgY2FuIG5vdCBleHRlbmQgaXQuXG4gKiBJdCBjb3VsZCBnZXQgc2ltcGxpZmllZCB0byBqdXN0IGJlaW5nIGFuIG9iamVjdCAobmVlZHMgdG8gbWFudWFsbHkgZ2V0IHB1dCBpbnRvIHRoZSBOZW8gbmFtZXNwYWNlIGluIHRoaXMgY2FzZSkuXG4gKiBAY2xhc3MgTmVvLmNvcmUuSWRHZW5lcmF0b3JcbiAqIEBzaW5nbGV0b25cbiAqL1xuY2xhc3MgSWRHZW5lcmF0b3Ige1xuICAgIHN0YXRpYyBnZXRTdGF0aWNDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCB0aGlzIG9uZSB0byBmYWxzZSBpbiBjYXNlIHlvdSBkb24ndCB3YW50IHRvIHN0aWNrXG4gICAgICAgICAqIHRvIHRoZSBcImFudGktcGF0dGVyblwiIHRvIGFwcGx5IGNsYXNzZXMgdG8gdGhlIGdsb2JhbCBOZW8gb3IgQXBwIG5hbWVzcGFjZVxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSByZWdpc3RlclRvR2xvYmFsTnM9dHJ1ZVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICByZWdpc3RlclRvR2xvYmFsTnM6IHRydWVcbiAgICB9fVxuXG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5jb3JlLklkR2VuZXJhdG9yJ1xuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLmNvcmUuSWRHZW5lcmF0b3InLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0naWQtZ2VuZXJhdG9yJ1xuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICdpZC1nZW5lcmF0b3InLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGRlZmF1bHQgcHJlZml4IGZvciBuZW8gaW5zdGFuY2UgaWRzXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gYmFzZT0nbmVvLSdcbiAgICAgICAgICovXG4gICAgICAgIGJhc2U6ICduZW8tJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHNpbmdsZXRvbj0ndHJ1ZVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgc2luZ2xldG9uOiB0cnVlXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIG1lLmlkQ291bnRlciA9IHt9O1xuXG4gICAgICAgIC8vIGFsaWFzXG4gICAgICAgIE5lby5nZXRJZCA9IG1lLmdldElkLmJpbmQobWUpO1xuICAgIH1cblxuICAgIG9uQ29uc3RydWN0ZWQoKSB7fVxuXG4gICAgaW5pdCgpIHt9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRJZChuYW1lKSB7XG4gICAgICAgIG5hbWUgPSBuYW1lIHx8ICduZW8nO1xuXG4gICAgICAgIGxldCBtZSAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGNvdW50ZXIgPSBtZS5pZENvdW50ZXIsXG4gICAgICAgICAgICBjb3VudCAgID0gY291bnRlcltuYW1lXSB8fCAwO1xuXG4gICAgICAgIGNvdW50ZXJbbmFtZV0gPSArK2NvdW50O1xuXG4gICAgICAgIHJldHVybiBtZS5iYXNlICsgKG5hbWUgPT09ICduZW8nID8gJycgOiBuYW1lICsgJy0nKSArIGNvdW50O1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoSWRHZW5lcmF0b3IpO1xuXG5sZXQgaW5zdGFuY2UgPSBOZW8uY3JlYXRlKElkR2VuZXJhdG9yKTtcblxuTmVvLmFwcGx5VG9HbG9iYWxOcyhpbnN0YW5jZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3RhbmNlOyIsImltcG9ydCBCYXNlIGZyb20gJy4vQmFzZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8uY29yZS5Mb2dnZXJcbiAqIEBleHRlbmRzIE5lby5jb3JlLkJhc2VcbiAqIEBzaW5nbGV0b25cbiAqL1xuY2xhc3MgTG9nZ2VyIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5jb3JlLkxvZ2dlcidcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5jb3JlLkxvZ2dlcicsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSdsb2dnZXInXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ2xvZ2dlcicsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgdGhpcyBjb25maWcgdG8gZmFsc2UgdG8gZGlzYWJsZSB0aGUgbG9nZ2luZ1xuICAgICAgICAgKiBAbWVtYmVyIHtib29sZWFufSBlbmFibGVMb2dzPXRydWVcbiAgICAgICAgICovXG4gICAgICAgIGVuYWJsZUxvZ3M6IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGxldmVsPSdsb2cnXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBsZXZlbDogJ2xvZycsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtib29sZWFufSBlbmFibGVMb2dzPXRydWVcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHNpbmdsZXRvbjogdHJ1ZVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICAvLyBhbGlhc2VzXG4gICAgICAgIE5lby5hcHBseUZyb21OcyhOZW8sIHRoaXMsIHtcbiAgICAgICAgICAgIGVycm9yICAgOiAnZXJyb3InLFxuICAgICAgICAgICAgaW5mbyAgICA6ICdpbmZvJyxcbiAgICAgICAgICAgIGxvZyAgICAgOiAnbG9nJyxcbiAgICAgICAgICAgIGxvZ0Vycm9yOiAnbG9nRXJyb3InLFxuICAgICAgICAgICAgd2FybiAgICA6ICd3YXJuJ1xuICAgICAgICB9LCB0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIGVycm9yKHZhbHVlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcih2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYXJnc1xuICAgICAqL1xuICAgIGxvZyguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMubGV2ZWwgPSAnbG9nJztcbiAgICAgICAgdGhpcy53cml0ZSguLi5hcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhcmdzXG4gICAgICovXG4gICAgaW5mbyguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMubGV2ZWwgPSAnaW5mbyc7XG4gICAgICAgIHRoaXMud3JpdGUoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYXJnc1xuICAgICAqL1xuICAgIGxvZ0Vycm9yKC4uLmFyZ3MpIHtcbiAgICAgICAgdGhpcy5sZXZlbCA9ICdlcnJvcic7XG4gICAgICAgIHRoaXMud3JpdGUoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYXJnc1xuICAgICAqL1xuICAgIHdhcm4oLi4uYXJncykge1xuICAgICAgICB0aGlzLmxldmVsID0gJ3dhcm4nO1xuICAgICAgICB0aGlzLndyaXRlKC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGFyZ3NcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHdyaXRlKC4uLmFyZ3MpIHtcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlTG9ncyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc29sZVt0aGlzLmxldmVsXSguLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoTG9nZ2VyKTtcblxubGV0IGluc3RhbmNlID0gTmVvLmNyZWF0ZShMb2dnZXIpO1xuXG5OZW8uYXBwbHlUb0dsb2JhbE5zKGluc3RhbmNlKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7IiwiaW1wb3J0IEJhc2UgZnJvbSAnLi9CYXNlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby5jb3JlLk9ic2VydmFibGVcbiAqIEBleHRlbmRzIE5lby5jb3JlLkJhc2VcbiAqL1xuY2xhc3MgT2JzZXJ2YWJsZSBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uY29yZS5PYnNlcnZhYmxlJ1xuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLmNvcmUuT2JzZXJ2YWJsZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSdtaXhpbi1vYnNlcnZhYmxlJ1xuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICdtaXhpbi1vYnNlcnZhYmxlJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IG1peGluPXRydWVcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIG1peGluOiB0cnVlXG4gICAgfX1cblxuICAgIGluaXRPYnNlcnZhYmxlKGNvbmZpZykge1xuICAgICAgICBsZXQgbWUgPSB0aGlzLFxuICAgICAgICAgICAgcHJvdG8gPSBtZS5fX3Byb3RvX18sXG4gICAgICAgICAgICBsaXN0ZW5lcnM7XG5cbiAgICAgICAgaWYgKGNvbmZpZy5saXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIG1lLmxpc3RlbmVycyA9IGNvbmZpZy5saXN0ZW5lcnM7XG4gICAgICAgICAgICBkZWxldGUgY29uZmlnLmxpc3RlbmVycztcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3RlbmVycyA9IG1lLmxpc3RlbmVycztcblxuICAgICAgICBtZS5saXN0ZW5lcnMgPSB7fTtcblxuICAgICAgICBpZiAobGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBtZS5hZGRMaXN0ZW5lcihsaXN0ZW5lcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKHByb3RvICYmIHByb3RvLmNvbnN0cnVjdG9yLmlzQ2xhc3MpIHtcbiAgICAgICAgICAgIGlmIChwcm90by5jb25zdHJ1Y3Rvci5zdGF0aWNDb25maWcub2JzZXJ2YWJsZSAmJiAhcHJvdG8uY29uc3RydWN0b3IubGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihwcm90by5jb25zdHJ1Y3Rvciwge1xuICAgICAgICAgICAgICAgICAgICBhZGRMaXN0ZW5lciAgIDogbWUuYWRkTGlzdGVuZXIsXG4gICAgICAgICAgICAgICAgICAgIGZpcmUgICAgICAgICAgOiBtZS5maXJlLFxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMgICAgIDoge30sXG4gICAgICAgICAgICAgICAgICAgIG9uICAgICAgICAgICAgOiBtZS5vbixcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTGlzdGVuZXI6IG1lLnJlbW92ZUxpc3RlbmVyLFxuICAgICAgICAgICAgICAgICAgICB1biAgICAgICAgICAgIDogbWUudW5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb3RvID0gcHJvdG8uX19wcm90b19fO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHNdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtzY29wZV1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2V2ZW50SWRdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtkYXRhXVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbb3JkZXJdXG4gICAgICogQHJldHVybnMge1N0cmluZ30gZXZlbnRJZFxuICAgICAqL1xuICAgIGFkZExpc3RlbmVyKG5hbWUsIG9wdHMsIHNjb3BlLCBldmVudElkLCBkYXRhLCBvcmRlcikge1xuICAgICAgICBsZXQgbWUgPSB0aGlzLFxuICAgICAgICAgICAgbGlzdGVuZXIsIGV4aXN0aW5nLCBldmVudENvbmZpZztcblxuICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBpZiAobmFtZS5oYXNPd25Qcm9wZXJ0eSgnc2NvcGUnKSkge1xuICAgICAgICAgICAgICAgIHNjb3BlID0gbmFtZS5zY29wZTtcbiAgICAgICAgICAgICAgICBkZWxldGUgbmFtZS5zY29wZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMobmFtZSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICAgICAgbWUuYWRkTGlzdGVuZXIoa2V5LCB2YWx1ZSwgc2NvcGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBzY29wZSA9IHNjb3BlIHx8IG9wdHMuc2NvcGU7XG4gICAgICAgICAgICBsaXN0ZW5lciA9IG9wdHMuZm47XG4gICAgICAgICAgICBvcmRlciA9IG9yZGVyIHx8IG9wdHMub3JkZXI7XG4gICAgICAgICAgICBldmVudElkID0gZXZlbnRJZCB8fCBvcHRzLmV2ZW50SWQ7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGxpc3RlbmVyID0gb3B0cztcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGxpc3RlbmVyID0gb3B0czsgLy8gVkMgaG9vaywgY2FuIGdldCBwYXJzZWQgYWZ0ZXIgb25Db25zdHJ1Y3RlZCBpbiBjYXNlIHRoZSB2aWV3IHVzZXMgdGhlIHBhcmVudCBWQ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFkZExpc3RlbmVyIGNhbGw6ICcgKyBuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50Q29uZmlnID0ge1xuICAgICAgICAgICAgZm4gICAgOiBsaXN0ZW5lcixcbiAgICAgICAgICAgIHNjb3BlIDogc2NvcGUsXG4gICAgICAgICAgICBkYXRhICA6IGRhdGEsXG4gICAgICAgICAgICBpZCAgICA6IGV2ZW50SWQgfHwgTmVvLmdldElkKCdldmVudCcpXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGV4aXN0aW5nID0gbWUubGlzdGVuZXJzICYmIG1lLmxpc3RlbmVyc1tuYW1lXSkge1xuICAgICAgICAgICAgZXhpc3RpbmcuZm9yRWFjaChjZmcgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjZmcuaWQgPT09IGV2ZW50SWQgfHwgKGNmZy5mbiA9PT0gbGlzdGVuZXIgJiYgY2ZnLnNjb3BlID09PSBzY29wZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEdXBsaWNhdGUgZXZlbnQgaGFuZGxlciBhdHRhY2hlZDogJyArIG5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9yZGVyID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nLnNwbGljZShvcmRlciwgMCwgZXZlbnRDb25maWcpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcmRlciA9PT0gJ2JlZm9yZScpIHtcbiAgICAgICAgICAgICAgICBleGlzdGluZy51bnNoaWZ0KGV2ZW50Q29uZmlnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmcucHVzaChldmVudENvbmZpZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZS5saXN0ZW5lcnNbbmFtZV0gPSBbZXZlbnRDb25maWddO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGV2ZW50Q29uZmlnLmlkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKi9cbiAgICBmaXJlKG5hbWUpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBhcmdzICAgICAgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICAgICAgICBsaXN0ZW5lcnMgPSBtZS5saXN0ZW5lcnMsXG4gICAgICAgICAgICBldmVudENvbmZpZywgZXZlbnRzLCBpLCBsZW47XG5cbiAgICAgICAgaWYgKGxpc3RlbmVycyAmJiBsaXN0ZW5lcnNbbmFtZV0pIHtcbiAgICAgICAgICAgIGV2ZW50cyA9IFsuLi5saXN0ZW5lcnNbbmFtZV1dO1xuICAgICAgICAgICAgbGVuICAgID0gZXZlbnRzLmxlbmd0aDtcblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRDb25maWcgPSBldmVudHNbaV07XG5cbiAgICAgICAgICAgICAgICBldmVudENvbmZpZy5mbi5hcHBseShldmVudENvbmZpZy5zY29wZSB8fCBtZSwgZXZlbnRDb25maWcuZGF0YSA/IGFyZ3MuY29uY2F0KGV2ZW50Q29uZmlnLmRhdGEpIDogYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHBhcmFtIGV2ZW50SWRcbiAgICAgKi9cbiAgICByZW1vdmVMaXN0ZW5lcihuYW1lLCBldmVudElkKSB7XG4gICAgICAgIGlmIChOZW8uaXNTdHJpbmcoZXZlbnRJZCkpIHtcbiAgICAgICAgICAgIGxldCBsaXN0ZW5lcnMgICA9IHRoaXMubGlzdGVuZXJzW25hbWVdLFxuICAgICAgICAgICAgICAgIG1hdGNoICAgICAgID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGxpc3RlbmVycy5mb3JFYWNoKChldmVudENvbmZpZywgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50Q29uZmlnLmlkID09PSBldmVudElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaCA9IGlkeDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG1hdGNoICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UobWF0Y2gsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlQWxsTGlzdGVuZXJzOiBmdW5jdGlvbihuYW1lKSB7XG5cbiAgICAvLyB9LFxuXG4gICAgLy8gc3VzcGVuZExpc3RlbmVyczogZnVuY3Rpb24ocXVldWUpIHtcblxuICAgIC8vIH0sXG5cbiAgICAvLyByZXN1bWVMaXN0ZW5lcnM6IGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gfVxuXG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIGFkZExpc3RlbmVyXG4gICAgICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbc2NvcGVdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtldmVudElkXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbZGF0YV1cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW29yZGVyXVxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IGV2ZW50SWRcbiAgICAgKi9cbiAgICBvbiguLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZExpc3RlbmVyKC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciByZW1vdmVMaXN0ZW5lclxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHBhcmFtIGV2ZW50SWRcbiAgICAgKi9cbiAgICB1biguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoLi4uYXJncyk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhPYnNlcnZhYmxlKTtcblxuZXhwb3J0IHtPYnNlcnZhYmxlIGFzIGRlZmF1bHR9OyIsImltcG9ydCBCYXNlIGZyb20gJy4vQmFzZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8uY29yZS5VdGlsXG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKi9cbmNsYXNzIFV0aWwgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0U3RhdGljQ29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIHJlZ2V4IHRvIHJlbW92ZSBjYW1lbCBjYXNlIHN5bnRheFxuICAgICAgICAgKiBAbWVtYmVyIHtSZWdFeHB9IGRlY2FtZWxSZWdFeD0vKFthLXpdKShbQS1aXSkvZ1xuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBkZWNhbWVsUmVnRXg6IC8oW2Etel0pKFtBLVpdKS9nXG4gICAgfX1cblxuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uY29yZS5VdGlsJ1xuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLmNvcmUuVXRpbCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSdjb3JlLXV0aWwnXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ2NvcmUtdXRpbCcsXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgc3lsZXMgb2JqZWN0IHdoaWNoIGNhbiB1c2UgY2FtZWxjYXNlIHN5bnRheCBpbnRvIGEgc3R5bGVzIHN0cmluZ1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXMgVGhlIHN0eWxlcyBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgc3R5bGVzIHN0cmluZyAoRE9NIHJlYWR5KVxuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGVTdHlsZXMoc3R5bGVzKSB7XG4gICAgICAgIGxldCBzdHlsZSA9ICcnO1xuXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHN0eWxlcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHN0eWxlICs9IFV0aWwuZGVjYW1lbChrZXkpICsgJzonICsgdmFsdWUgKyAnOyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzdHlsZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYWtlcyB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIGEgc3RyaW5nIHVwcGVyY2FzZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbnxTdHJpbmd9IFJldHVybnMgZmFsc2UgZm9yIG5vbiBzdHJpbmcgaW5wdXRzXG4gICAgICovXG4gICAgc3RhdGljIGNhcGl0YWxpemUoc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBVdGlsLmlzU3RyaW5nKHN0cmluZykgJiYgc3RyaW5nWzBdLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJhbnNmb3JtcyBhbGwgdXBwZXJjYXNlIGNoYXJhY3RlcnMgb2YgYSBzdHJpbmcgaW50byBsb3dlcmNhc2UuXG4gICAgICogRG9lcyBub3QgdG91Y2ggc3BlY2lhbCBjaGFyYWN0ZXJzLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBUaGUgaW5wdXQgY29udGFpbmluZyB1cHBlcmNhc2UgY2hhcmFjdGVyc1xuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBsb3dlcmNhc2Ugb3V0cHV0XG4gICAgICovXG4gICAgc3RhdGljIGRlY2FtZWwodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoVXRpbC5kZWNhbWVsUmVnRXgsICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJhbnNmb3JtcyBhIHN0eWxlcyBzdHJpbmcgaW50byBhIHN0eWxlcyBvYmplY3QgdXNpbmcgY2FtZWxjYXNlIHN5bnRheFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0eWxlcyBzdHJpbmcgdG8gcGFyc2VcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgY2FtZWxjYXNlIHN0eWxlcyBvYmplY3RcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlU3R5bGVPYmplY3Qoc3RyaW5nKSB7XG4gICAgICAgIGlmICghc3RyaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJ0cztcblxuICAgICAgICAvLyBzcGxpdCgnOycpIGRvZXMgZmV0Y2ggc2VtaWNvbG9ucyBpbnNpZGUgYnJhY2tldHNcbiAgICAgICAgLy8gLT4gYmFja2dyb3VuZC1pbWFnZTogXCJ1cmwoJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwuLi5cblxuICAgICAgICAvLyBUT0RPOiBDYWNoZSBhbGwgcmVnZXhcbiAgICAgICAgcmV0dXJuIHN0cmluZy5zcGxpdCgvOyg/PVteXFwpXSooPzpcXCh8JCkpL2cpLnJlZHVjZSgob2JqLCBlbCkgPT4ge1xuICAgICAgICAgICAgLy8gd2UgaGF2ZSB0byBzcGxpdCBieSB0aGUgZmlyc3QgY29sb24gb25seVxuICAgICAgICAgICAgLy8gLT4gYmFja2dyb3VuZC1pbWFnZTogdXJsKCdodHRwOi8vZXhhbXBsZS5jb20vaW1hZ2UucG5nJylcbiAgICAgICAgICAgIHBhcnRzID0gZWwuc3BsaXQoKC86KC4rKS8pKS5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICBsZXQgbnVtID0gcGFyc2VGbG9hdCh4KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB4ID09IG51bSA/IG51bSA6IHgudHJpbSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChwYXJ0c1swXSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBwYXJ0c1swXSA9IHBhcnRzWzBdLnJlcGxhY2UoLy0oW2Etel0pL2csIChzdHIsIGxldHRlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGV0dGVyLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb2JqW3BhcnRzWzBdXSA9IHBhcnRzWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfSwge30pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcGFzc2VkIHZhbHVlIGlzIGFuIGFycmF5XG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0XG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGlzQXJyYXkodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBwYXNzZWQgdmFsdWUgaXMgYSBib29sZWFuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0XG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGlzQm9vbGVhbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbic7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBwYXNzZWQgdmFsdWUgaXMgbm90IHVuZGVmaW5lZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdFxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBpc0RlZmluZWQodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBwYXNzZWQgdmFsdWUgaXMgYW4gZW1wdHkgQXJyYXksIE9iamVjdCBvciBTdHJpbmdcbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdHxTdHJpbmd9IHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0XG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGlzRW1wdHkodmFsdWUpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID09PSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFV0aWwuaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChVdGlsLmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHBhc3NlZCB2YWx1ZSBpcyBhIGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3RcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgaXNGdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcGFzc2VkIHZhbHVlIGlzIGEgbnVtYmVyLiBSZXR1cm5zIGZhbHNlIGZvciBub24tZmluaXRlIG51bWJlcnNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3RcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgaXNOdW1iZXIodmFsdWUpe1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBwYXNzZWQgdmFsdWUgaXMgYW4gb2JqZWN0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0XG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGlzT2JqZWN0KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHBhc3NlZCB2YWx1ZSBpcyBhIHN0cmluZ1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdFxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBpc1N0cmluZyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhbnkgaXRlcmFibGUgKHN0cmluZ3MsIG51bWVyaWMgaW5kaWNlcyBhbmQgYSBsZW5ndGggcHJvcGVydHkpIGludG8gYSB0cnVlIGFycmF5XG4gICAgICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBpdGVyYWJsZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbc3RhcnQ9MF0gc3RhcnQgaW5kZXhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2VuZD1pdGVyYWJsZS5sZW5ndGhdIGVuZCBpbmRleFxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKi9cbiAgICBzdGF0aWMgdG9BcnJheShpdGVyYWJsZSwgc3RhcnQsIGVuZCkge1xuICAgICAgICBsZXQgbGVuO1xuXG4gICAgICAgIGlmICghaXRlcmFibGUgfHwgIShsZW4gPSBpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZXJhYmxlLnNwbGl0KCcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChpdGVyYWJsZSwgc3RhcnQgfHwgMCwgZW5kIHx8IGxlbik7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhVdGlsKTtcblxuLy8gYWxpYXNlc1xuTmVvLmFwcGx5RnJvbU5zKE5lbywgVXRpbCwge1xuICAgIGNyZWF0ZVN0eWxlT2JqZWN0OiAnY3JlYXRlU3R5bGVPYmplY3QnLFxuICAgIGNyZWF0ZVN0eWxlcyAgICAgOiAnY3JlYXRlU3R5bGVzJyxcbiAgICBjYXBpdGFsaXplICAgICAgIDogJ2NhcGl0YWxpemUnLFxuICAgIGRlY2FtZWwgICAgICAgICAgOiAnZGVjYW1lbCcsXG4gICAgaXNBcnJheSAgICAgICAgICA6ICdpc0FycmF5JyxcbiAgICBpc0Jvb2xlYW4gICAgICAgIDogJ2lzQm9vbGVhbicsXG4gICAgaXNEZWZpbmVkICAgICAgICA6ICdpc0RlZmluZWQnLFxuICAgIGlzRW1wdHkgICAgICAgICAgOiAnaXNFbXB0eScsXG4gICAgaXNGdW5jdGlvbiAgICAgICA6ICdpc0Z1bmN0aW9uJyxcbiAgICBpc051bWJlciAgICAgICAgIDogJ2lzTnVtYmVyJyxcbiAgICBpc09iamVjdCAgICAgICAgIDogJ2lzT2JqZWN0JyxcbiAgICBpc1N0cmluZyAgICAgICAgIDogJ2lzU3RyaW5nJyxcbiAgICB0b0FycmF5ICAgICAgICAgIDogJ3RvQXJyYXknXG59LCB0cnVlKTtcblxuZXhwb3J0IGRlZmF1bHQgVXRpbDsiLCJpbXBvcnQgQmFzZSAgICAgICAgZnJvbSAnLi9CYXNlLm1qcyc7XG5pbXBvcnQgTG9nZ2VyICAgICAgZnJvbSAnLi9Mb2dnZXIubWpzJztcbmltcG9ydCBPYnNlcnZhYmxlICBmcm9tICcuL09ic2VydmFibGUubWpzJztcbmltcG9ydCBVdGlsICAgICAgICBmcm9tICcuL1V0aWwubWpzJztcblxuZXhwb3J0IHtCYXNlLCBMb2dnZXIsIE9ic2VydmFibGUsIFV0aWx9OyIsImltcG9ydCBCYXNlICAgICAgICAgZnJvbSAnLi4vY29yZS9CYXNlLm1qcyc7XG5pbXBvcnQgRGVsdGFVcGRhdGVzIGZyb20gJy4vbWl4aW4vRGVsdGFVcGRhdGVzLm1qcyc7XG5pbXBvcnQgT2JzZXJ2YWJsZSAgIGZyb20gJy4uL2NvcmUvT2JzZXJ2YWJsZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8ubWFpbi5Eb21BY2Nlc3NcbiAqIEBleHRlbmRzIE5lby5jb3JlLkJhc2VcbiAqIEBzaW5nbGV0b25cbiAqL1xuY2xhc3MgRG9tQWNjZXNzIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5tYWluLkRvbUFjY2VzcydcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5tYWluLkRvbUFjY2VzcycsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtib29sZWFufSBsb2dEZWx0YVVwZGF0ZXM9dHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgbG9nRGVsdGFVcGRhdGVzOiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl9IG1peGlucz1bRGVsdGFVcGRhdGVzLCBPYnNlcnZhYmxlXVxuICAgICAgICAgKi9cbiAgICAgICAgbWl4aW5zOiBbXG4gICAgICAgICAgICBEZWx0YVVwZGF0ZXMsXG4gICAgICAgICAgICBPYnNlcnZhYmxlXG4gICAgICAgIF0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdGUgbWV0aG9kIGFjY2VzcyBmb3Igb3RoZXIgd29ya2Vyc1xuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHJlbW90ZT17YXBwOiBbLy8uLi5dfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3RlOiB7XG4gICAgICAgICAgICBhcHA6IFtcbiAgICAgICAgICAgICAgICAnYWRkU2NyaXB0JyxcbiAgICAgICAgICAgICAgICAnYXBwbHlCb2R5Q2xzJyxcbiAgICAgICAgICAgICAgICAnZXhlY0NvbW1hbmQnLFxuICAgICAgICAgICAgICAgICdmb2N1cycsXG4gICAgICAgICAgICAgICAgJ2dldEF0dHJpYnV0ZXMnLFxuICAgICAgICAgICAgICAgICdnZXRCb3VuZGluZ0NsaWVudFJlY3QnLFxuICAgICAgICAgICAgICAgICdzY3JvbGxJbnRvVmlldycsXG4gICAgICAgICAgICAgICAgJ3Njcm9sbFRvVGFibGVSb3cnLFxuICAgICAgICAgICAgICAgICdzZWxlY3ROb2RlJyxcbiAgICAgICAgICAgICAgICAnd2luZG93U2Nyb2xsVG8nXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBzaW5nbGV0b249dHJ1ZVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgc2luZ2xldG9uOiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogVm9pZCBhdHRyaWJ1dGVzIGluc2lkZSBodG1sIHRhZ3NcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IHZvaWRBdHRyaWJ1dGVzXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB2b2lkQXR0cmlidXRlczogW1xuICAgICAgICAgICAgJ2NoZWNrZWQnLFxuICAgICAgICAgICAgJ3JlcXVpcmVkJ1xuICAgICAgICBdXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKG1lLmxvZ0RlbHRhVXBkYXRlcykge1xuICAgICAgICAgICAgbWUuY291bnREZWx0YXMgID0gMDtcbiAgICAgICAgICAgIG1lLmNvdW50VXBkYXRlcyA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBkYXRhLmFzeW5jXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbZGF0YS5kZWZlcj1mYWxzZV1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2RhdGEuc3JjPXRydWVdXG4gICAgICovXG4gICAgYWRkU2NyaXB0KGRhdGEpIHtcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgICAgICAgaWYgKCFkYXRhLmhhc093blByb3BlcnR5KCdhc3luYycpKSB7XG4gICAgICAgICAgICBkYXRhLmFzeW5jID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5hc3NpZ24oc2NyaXB0LCBkYXRhKTtcblxuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IGRhdGEuY2xzXG4gICAgICovXG4gICAgYXBwbHlCb2R5Q2xzKGRhdGEpIHtcbiAgICAgICAgY29uc3QgY2xzID0gZGF0YS5jbHMgfHwgW107XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCguLi5jbHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5jb21tYW5kXG4gICAgICogQHJldHVybnMge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIGV4ZWNDb21tYW5kKGRhdGEpIHtcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoZGF0YS5jb21tYW5kKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbHMgZm9jdXMgb24gYSBub2RlIGZvciBhIGdpdmVuIGRvbSBub2RlIGlkXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBvYmouaWQgPT4gdGhlIHBhc3NlZCBpZFxuICAgICAqL1xuICAgIGZvY3VzKGRhdGEpIHtcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmdldEVsZW1lbnQoZGF0YS5pZCk7XG5cbiAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgIG5vZGUuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7aWQ6IGRhdGEuaWR9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGF0dHJpYnV0ZXMgZm9yIGEgZ2l2ZW4gZG9tIG5vZGUgaWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBkYXRhLmlkIGVpdGhlciBhbiBpZCBvciBhbiBhcnJheSBvZiBpZHNcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gZGF0YS5hdHRyaWJ1dGVzIGVpdGhlciBhbiBhdHRyaWJ1dGUgb3IgYW4gYXJyYXkgb2YgYXR0cmlidXRlc1xuICAgICAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R9IEluIGNhc2UgaWQgaXMgYW4gYXJyYXksIGFuIGFycmF5IG9mIGF0cnJidXRlIG9iamVjdHMgaXMgcmV0dXJuZWQsIG90aGVyd2lzZSBhbiBvYmplY3RcbiAgICAgKi9cbiAgICBnZXRBdHRyaWJ1dGVzKGRhdGEpIHtcbiAgICAgICAgbGV0IHJldHVybkRhdGE7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YS5pZCkpIHtcbiAgICAgICAgICAgIHJldHVybkRhdGEgPSBbXTtcblxuICAgICAgICAgICAgZGF0YS5pZC5mb3JFYWNoKGlkID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm5EYXRhLnB1c2godGhpcy5nZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczogZGF0YS5hdHRyaWJ1dGVzLFxuICAgICAgICAgICAgICAgICAgICBpZCAgICAgICAgOiBpZFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmdldEVsZW1lbnRPckJvZHkoZGF0YS5pZCk7XG5cbiAgICAgICAgICAgIHJldHVybkRhdGEgPSB7fTtcblxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YS5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmF0dHJpYnV0ZXMgPSBbZGF0YS5hdHRyaWJ1dGVzXTtcblxuICAgICAgICAgICAgICAgICAgICBkYXRhLmF0dHJpYnV0ZXMuZm9yRWFjaChhdHRyaWJ1dGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuRGF0YVthdHRyaWJ1dGVdID0gbm9kZVthdHRyaWJ1dGVdO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXR1cm5EYXRhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSBmb3IgYSBnaXZlbiBkb20gbm9kZSBpZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGRhdGEuaWQgZWl0aGVyIGFuIGlkIG9yIGFuIGFycmF5IG9mIGlkc1xuICAgICAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R9IEluIGNhc2UgaWQgaXMgYW4gYXJyYXksIGFuIGFycmF5IG9mIERvbVJlY3RzIGlzIHJldHVybmVkLCBvdGhlcndpc2UgYW4gRG9tUmVjdCBvYmplY3RcbiAgICAgKi9cbiAgICBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZGF0YSkge1xuICAgICAgICBsZXQgcmV0dXJuRGF0YTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhLmlkKSkge1xuICAgICAgICAgICAgcmV0dXJuRGF0YSA9IFtdO1xuXG4gICAgICAgICAgICBkYXRhLmlkLmZvckVhY2goaWQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybkRhdGEucHVzaCh0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCh7aWQ6IGlkfSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuZ2V0RWxlbWVudE9yQm9keShkYXRhLmlkKSxcbiAgICAgICAgICAgICAgICByZWN0ID0ge307XG5cbiAgICAgICAgICAgIHJldHVybkRhdGEgPSB7fTtcblxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICByZWN0ID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAgICAgICAgIC8vIERvbVJlY3QgZG9lcyBub3Qgc3VwcG9ydCBzcHJlYWRpbmcgPT4gey4uLkRvbVJlY3R9ID0+IHt9XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihyZXR1cm5EYXRhLCB7XG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogcmVjdC5ib3R0b20sXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogcmVjdC5oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQgIDogcmVjdC5sZWZ0LFxuICAgICAgICAgICAgICAgICAgICByaWdodCA6IHJlY3QucmlnaHQsXG4gICAgICAgICAgICAgICAgICAgIHRvcCAgIDogcmVjdC50b3AsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoIDogcmVjdC53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgeCAgICAgOiByZWN0LngsXG4gICAgICAgICAgICAgICAgICAgIHkgICAgIDogcmVjdC55XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBub2RlSWRcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldEVsZW1lbnQobm9kZUlkKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChub2RlSWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtub2RlSWQ9J2JvZHknXVxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0RWxlbWVudE9yQm9keShub2RlSWQpIHtcbiAgICAgICAgaWYgKCFub2RlSWQgfHwgbm9kZUlkID09PSAnYm9keScgfHwgbm9kZUlkID09PSAnZG9jdW1lbnQuYm9keScpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5ib2R5O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudChub2RlSWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluY2x1ZGUgYSBzY3JpcHQgaW50byB0aGUgZG9jdW1lbnQuaGVhZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzcmNcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFthc3luYz10cnVlXVxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8dW5rbm93bj59XG4gICAgICovXG4gICAgbG9hZFNjcmlwdChzcmMsIGFzeW5jPXRydWUpIHtcbiAgICAgICAgbGV0IHNjcmlwdDtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oc2NyaXB0LCB7XG4gICAgICAgICAgICAgICAgYXN5bmMgIDogYXN5bmMsXG4gICAgICAgICAgICAgICAgb25lcnJvcjogcmVqZWN0LFxuICAgICAgICAgICAgICAgIG9ubG9hZCA6IHJlc29sdmUsXG4gICAgICAgICAgICAgICAgc3JjICAgIDogc3JjXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbmNsdWRlIGEgbGluayBpbnRvIHRoZSBkb2N1bWVudC5oZWFkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGhyZWZcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPHVua25vd24+fVxuICAgICAqL1xuICAgIGxvYWRTdHlsZXNoZWV0KGhyZWYpIHtcbiAgICAgICAgbGV0IGxpbms7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obGluaywge1xuICAgICAgICAgICAgICAgIGhyZWYgICA6IGhyZWYsXG4gICAgICAgICAgICAgICAgb25lcnJvcjogcmVqZWN0LFxuICAgICAgICAgICAgICAgIG9ubG9hZCA6IHJlc29sdmUsXG4gICAgICAgICAgICAgICAgcmVsICAgIDogJ3N0eWxlc2hlZXQnLFxuICAgICAgICAgICAgICAgIHR5cGUgICA6ICd0ZXh0L2NzcydcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uRG9tQ29udGVudExvYWRlZCgpIHtcbiAgICAgICAgaWYgKE5lby5jb25maWcuYXBwbHlCb2R5Q2xzKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5Qm9keUNscyh7Y2xzOiBbJ25lby1ib2R5J119KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBkYXRhLmF0dHJpYnV0ZXNcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhLmZ1bmN0aW9ucyBBbiBhcnJheSBjb250YWluaW5nIHN0cmluZ3MgYW5kL29yIG9iamVjdHNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBkYXRhLnN0eWxlc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLnZub2RlSWRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uUmVhZERvbShkYXRhKSB7XG4gICAgICAgIGxldCBhdHRyaWJ1dGVzICAgID0gZGF0YS5hdHRyaWJ1dGVzIHx8IFtdLFxuICAgICAgICAgICAgZnVuY3Rpb25zICAgICA9IGRhdGEuZnVuY3Rpb25zICB8fCBbXSxcbiAgICAgICAgICAgIHN0eWxlcyAgICAgICAgPSBkYXRhLnN0eWxlcyAgICAgfHwgW10sXG4gICAgICAgICAgICB2bm9kZUlkICAgICAgID0gZGF0YS52bm9kZUlkLFxuICAgICAgICAgICAgcmV0QXR0cmlidXRlcyA9IHt9LFxuICAgICAgICAgICAgcmV0RnVuY3Rpb25zICA9IHt9LFxuICAgICAgICAgICAgcmV0U3R5bGVzICAgICA9IHt9LFxuICAgICAgICAgICAgZWxlbWVudCAgICAgICA9IHZub2RlSWQgPyB0aGlzLmdldEVsZW1lbnQodm5vZGVJZCkgOiBudWxsLFxuICAgICAgICAgICAgZm5OYW1lLCBzY29wZTtcblxuICAgICAgICBhdHRyaWJ1dGVzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIHJldEF0dHJpYnV0ZXNba2V5XSA9IGVsZW1lbnRba2V5XTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb25zLmZvckVhY2goKGtleSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChOZW8uaXNPYmplY3Qoa2V5KSkge1xuICAgICAgICAgICAgICAgIGtleS5wYXJhbXMgICAgICAgICA9IGtleS5wYXJhbXMgICAgICAgICB8fCBbXTtcbiAgICAgICAgICAgICAgICBrZXkucGFyYW1Jc0RvbU5vZGUgPSBrZXkucGFyYW1Jc0RvbU5vZGUgfHwgW107XG5cbiAgICAgICAgICAgICAgICBzY29wZSA9IGtleS5zY29wZSA/IGRvY3VtZW50W2tleS5zY29wZV0gOiBlbGVtZW50O1xuXG4gICAgICAgICAgICAgICAga2V5LnBhcmFtcy5mb3JFYWNoKChwYXJhbSwgcGFyYW1JbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5LnBhcmFtSXNEb21Ob2RlW3BhcmFtSW5kZXhdICYmIGtleS5wYXJhbUlzRG9tTm9kZVtwYXJhbUluZGV4XSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5LnBhcmFtc1twYXJhbUluZGV4XSA9IHRoaXMuZ2V0RWxlbWVudChrZXkucGFyYW1zW3BhcmFtSW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZm5OYW1lID0ga2V5LnJldHVybkZuTmFtZSA/IGtleS5yZXR1cm5Gbk5hbWUgOiBpbmRleDtcbiAgICAgICAgICAgICAgICByZXRGdW5jdGlvbnNbZm5OYW1lXSA9IHNjb3BlW2tleS5mbl0oLi4ua2V5LnBhcmFtcyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoa2V5LnJldHVyblZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldEZ1bmN0aW9uc1tmbk5hbWVdID0gcmV0RnVuY3Rpb25zW2ZuTmFtZV1ba2V5LnJldHVyblZhbHVlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldEZ1bmN0aW9uc1trZXldID0gZWxlbWVudFtrZXldKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHN0eWxlcy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICByZXRTdHlsZXNba2V5XSA9IGVsZW1lbnQuc3R5bGVba2V5XTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbihkYXRhLCB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiByZXRBdHRyaWJ1dGVzLFxuICAgICAgICAgICAgZnVuY3Rpb25zIDogcmV0RnVuY3Rpb25zLFxuICAgICAgICAgICAgc3R5bGVzICAgIDogcmV0U3R5bGVzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIE5lby53b3JrZXIuTWFuYWdlci5zZW5kTWVzc2FnZShkYXRhLm9yaWdpbiwge1xuICAgICAgICAgICAgYWN0aW9uIDogJ3JlcGx5JyxcbiAgICAgICAgICAgIGRhdGEgICA6IGRhdGEsXG4gICAgICAgICAgICByZXBseUlkOiBkYXRhLmlkLFxuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICByZWFkKGRhdGEpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBkYXRhKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2RhdGEuYmVoYXZpb3I9J3Ntb290aCddXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtkYXRhLmJsb2NrPSdzdGFydCddXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtkYXRhLmlubGluZT0nbmVhcmVzdCddXG4gICAgICogQHJldHVybnMge09iamVjdH0gb2JqLmlkID0+IHRoZSBwYXNzZWQgaWRcbiAgICAgKi9cbiAgICBzY3JvbGxJbnRvVmlldyhkYXRhKSB7XG4gICAgICAgIGxldCBub2RlID0gdGhpcy5nZXRFbGVtZW50KGRhdGEuaWQpO1xuXG4gICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICBub2RlLnNjcm9sbEludG9WaWV3KHtcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogZGF0YS5iZWhhdmlvciB8fCAnc21vb3RoJyxcbiAgICAgICAgICAgICAgICBibG9jayAgIDogZGF0YS5ibG9jayAgICB8fCAnc3RhcnQnLFxuICAgICAgICAgICAgICAgIGlubGluZSAgOiBkYXRhLmlubGluZSAgIHx8ICduZWFyZXN0J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge2lkOiBkYXRhLmlkfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2RhdGEuYmVoYXZpb3I9J3Ntb290aCddXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtkYXRhLm9mZnNldD0zNF1cbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBvYmouaWQgPT4gdGhlIHBhc3NlZCBpZFxuICAgICAqL1xuICAgIHNjcm9sbFRvVGFibGVSb3coZGF0YSkge1xuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuZ2V0RWxlbWVudChkYXRhLmlkKTsgLy8gdHIgdGFnXG5cbiAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgIGxldCB0YWJsZU5vZGUgICA9IG5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLFxuICAgICAgICAgICAgICAgIHdyYXBwZXJOb2RlID0gdGFibGVOb2RlLnBhcmVudE5vZGUsXG4gICAgICAgICAgICAgICAgdGFibGVUb3AgICAgPSB0YWJsZU5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wLFxuICAgICAgICAgICAgICAgIHRvcCAgICAgICAgID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICAgICAgICAgIHdyYXBwZXJOb2RlLnNjcm9sbFRvKHtcbiAgICAgICAgICAgICAgICB0b3AgICAgIDogdG9wIC0gdGFibGVUb3AgLSAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgnb2Zmc2V0JykgPyBkYXRhLm9mZnNldCA6IDM0KSxcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogZGF0YS5iZWhhdmlvciB8fCAnc21vb3RoJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge2lkOiBkYXRhLmlkfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2RhdGEuc3RhcnQ9MF1cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2RhdGEuZW5kPTk5OTk5XVxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IG9iai5pZCA9PiB0aGUgcGFzc2VkIGlkXG4gICAgICovXG4gICAgc2VsZWN0Tm9kZShkYXRhKSB7XG4gICAgICAgIGxldCBub2RlICA9IHRoaXMuZ2V0RWxlbWVudChkYXRhLmlkKSxcbiAgICAgICAgICAgIHN0YXJ0ID0gTmVvLmlzTnVtYmVyKGRhdGEuc3RhcnQpIHx8IDAsXG4gICAgICAgICAgICBlbmQgICA9IE5lby5pc051bWJlcihkYXRhLmVuZCkgICB8fCA5OTk5OTtcblxuICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgbm9kZS5zZWxlY3QoKTtcbiAgICAgICAgICAgIG5vZGUuc2V0U2VsZWN0aW9uUmFuZ2Uoc3RhcnQsIGVuZCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge2lkOiBkYXRhLmlkfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtkYXRhLmJlaGF2aW9yPSdzbW9vdGgnXSAvLyBhdXRvIG9yIHNtb290aFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbZGF0YS5sZWZ0PTBdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtkYXRhLnRvcD0wXVxuICAgICAqL1xuICAgIHdpbmRvd1Njcm9sbFRvKGRhdGEpIHtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgICAgICAgIGJlaGF2aW9yOiBkYXRhLmJlaGF2aW9yIHx8ICdzbW9vdGgnLFxuICAgICAgICAgICAgbGVmdCAgICA6IGRhdGEubGVmdCAgICAgfHwgMCxcbiAgICAgICAgICAgIHRvcCAgICAgOiBkYXRhLnRvcCAgICAgIHx8IDBcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgd3JpdGUoZGF0YSkge1xuICAgICAgICBsZXQgY29udGFpbmVyICAgPSB0aGlzLmdldEVsZW1lbnRPckJvZHkoZGF0YS5wYXJlbnRJZCksXG4gICAgICAgICAgICBjb3VudENoaWxkcyA9IGNvbnRhaW5lci5jaGlsZHJlbi5sZW5ndGgsXG4gICAgICAgICAgICBpbmRleCAgICAgICA9IGRhdGEucGFyZW50SW5kZXgsXG4gICAgICAgICAgICBodG1sICAgICAgICA9IGRhdGEuaHRtbCB8fCBkYXRhLm91dGVySFRNTDtcblxuICAgICAgICBpZiAoIWRhdGEucGFyZW50SW5kZXggfHwgY291bnRDaGlsZHMgPCAxKSB7XG4gICAgICAgICAgICBjb250YWluZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBodG1sKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjb3VudENoaWxkcyA+IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmNoaWxkcmVuW2luZGV4XS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWJlZ2luJywgaHRtbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jaGlsZHJlbltjb3VudENoaWxkcyAtIDFdLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCBodG1sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoRG9tQWNjZXNzKTtcblxubGV0IGluc3RhbmNlID0gTmVvLmNyZWF0ZShEb21BY2Nlc3MpO1xuXG5OZW8uYXBwbHlUb0dsb2JhbE5zKGluc3RhbmNlKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7IiwiaW1wb3J0IEJhc2UgICAgICAgICAgIGZyb20gJy4uL2NvcmUvQmFzZS5tanMnO1xuaW1wb3J0IE9ic2VydmFibGUgICAgIGZyb20gJy4uL2NvcmUvT2JzZXJ2YWJsZS5tanMnO1xuaW1wb3J0IFRvdWNoRG9tRXZlbnRzIGZyb20gJy4vbWl4aW4vVG91Y2hEb21FdmVudHMubWpzJztcblxuY29uc3QgZ2xvYmFsRG9tRXZlbnRzID0gW1xuICAgIHtuYW1lOiAnY2hhbmdlJywgICAgICBoYW5kbGVyOiAnb25DaGFuZ2UnfSxcbiAgICB7bmFtZTogJ2NsaWNrJywgICAgICAgaGFuZGxlcjogJ29uQ2xpY2snfSxcbiAgICB7bmFtZTogJ2NvbnRleHRtZW51JywgaGFuZGxlcjogJ29uQ29udGV4dE1lbnUnfSxcbiAgICB7bmFtZTogJ2ZvY3VzaW4nLCAgICAgaGFuZGxlcjogJ29uRm9jdXNJbid9LFxuICAgIHtuYW1lOiAnZm9jdXNvdXQnLCAgICBoYW5kbGVyOiAnb25Gb2N1c091dCd9LFxuICAgIHtuYW1lOiAnaW5wdXQnLCAgICAgICBoYW5kbGVyOiAnb25DaGFuZ2UnfSxcbiAgICB7bmFtZTogJ2tleWRvd24nLCAgICAgaGFuZGxlcjogJ29uS2V5RG93bid9LFxuICAgIHtuYW1lOiAna2V5dXAnLCAgICAgICBoYW5kbGVyOiAnb25LZXlVcCd9LFxuICAgIHtuYW1lOiAnbW91c2VlbnRlcicsICBoYW5kbGVyOiAnb25Nb3VzZUVudGVyJywgb3B0aW9uczoge2NhcHR1cmU6IHRydWV9fSxcbiAgICB7bmFtZTogJ21vdXNlbGVhdmUnLCAgaGFuZGxlcjogJ29uTW91c2VMZWF2ZScsIG9wdGlvbnM6IHtjYXB0dXJlOiB0cnVlfX0sXG4gICAge25hbWU6ICd3aGVlbCcsICAgICAgIGhhbmRsZXI6ICdvbldoZWVsJywgICAgICBvcHRpb25zOiB7cGFzc2l2ZTogZmFsc2V9fVxuXTtcblxuLy8gV2lsbCBnZXQgYXBwbGllZCB0byB0aGUgZG9jdW1lbnQuYm9keSBpbiBjYXNlIE5lby5jb25maWcudXNlVG91Y2hFdmVudHMgPT09IHRydWUgKGRlZmF1bHQgdmFsdWUpXG5jb25zdCB0b3VjaEV2ZW50cyA9IFtcbiAgICB7bmFtZTogJ3RvdWNoY2FuY2VsJywgaGFuZGxlcjogJ29uVG91Y2hDYW5jZWwnfSxcbiAgICB7bmFtZTogJ3RvdWNoZW5kJywgICAgaGFuZGxlcjogJ29uVG91Y2hFbmQnfSxcbiAgICB7bmFtZTogJ3RvdWNoZW50ZXInLCAgaGFuZGxlcjogJ29uVG91Y2hFbnRlcid9LFxuICAgIHtuYW1lOiAndG91Y2hsZWF2ZScsICBoYW5kbGVyOiAnb25Ub3VjaExlYXZlJ30sXG4gICAge25hbWU6ICd0b3VjaG1vdmUnLCAgIGhhbmRsZXI6ICdvblRvdWNoTW92ZSd9LFxuICAgIHtuYW1lOiAndG91Y2hzdGFydCcsICBoYW5kbGVyOiAnb25Ub3VjaFN0YXJ0J31cbl07XG5cbi8vIHdoZWVsIGV2ZW50cyBmaXJlIHZlcnkgb2Z0ZW4sIHNvIHdlIGxpbWl0IHRoZSB0YXJnZXRzIHRvIGF2b2lkIHVubmVjZXNzYXJ5IHBvc3QgbWVzc2FnZXMgZnJvbSBtYWluIHRvIHRoZSBhcHAgd29ya2VyXG5jb25zdCBnbG9iYWxXaGVlbFRhcmdldHMgPSBbXG4gICAgJ25lby1jaXJjbGUtY29tcG9uZW50JyxcbiAgICAnbmVvLWRhdGVzZWxlY3RvcicsXG4gICAgJ25lby1nYWxsZXJ5JyxcbiAgICAnbmVvLWhlbGl4J1xuXTtcblxuLy8gc2VwYXJhdGVkIGZyb20gZ2xvYmFsV2hlZWxUYXJnZXRzID0+IHBlcmZvcm1hbmNlXG5jb25zdCBnbG9iYWxXaGVlbFRhcmdldHNCdWZmZXIgPSB7XG4gICAgJ25lby1kYXRlc2VsZWN0b3InOiAzMDAgLy8gYnVmZmVyIGluIG1zXG59O1xuXG5jb25zdCBsYXN0V2hlZWxFdmVudCA9IHtcbiAgICBkYXRlICA6IG51bGwsXG4gICAgdGFyZ2V0OiBudWxsXG59O1xuXG5jb25zdCBwcmV2ZW50Q2xpY2tUYXJnZXRzICAgICAgID0gW10sXG4gICAgICBwcmV2ZW50Q29udGV4dG1lbnVUYXJnZXRzID0gW107XG5cbi8qKlxuICogQGNsYXNzIE5lby5tYWluLkRvbUV2ZW50c1xuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICogQHNpbmdsZXRvblxuICovXG5jbGFzcyBEb21FdmVudHMgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0U3RhdGljQ29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcnVlIGF1dG9tYXRpY2FsbHkgYXBwbGllcyB0aGUgY29yZS9PYnNlcnZhYmxlLm1qcyBtaXhpblxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBvYnNlcnZhYmxlPXRydWVcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgb2JzZXJ2YWJsZTogdHJ1ZVxuICAgIH19XG5cbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLm1haW4uRG9tRXZlbnRzJ1xuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLm1haW4uRG9tRXZlbnRzJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRvZG86IGNvbmRpdGlvbmFsIGR5bmFtaWMgaW1wb3J0IG9uY2UgdGhlIGJ1aWxkIHByb2Nlc3NlcyBjYW4gaGFuZGxlIGl0XG4gICAgICAgICAqIEBtZW1iZXIge0FycmF5fSBtaXhpbnM9W1RvdWNoRG9tRXZlbnRzXVxuICAgICAgICAgKi9cbiAgICAgICAgbWl4aW5zOiBbVG91Y2hEb21FdmVudHNdLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Ym9vbGVhbn0gc2luZ2xldG9uPXRydWVcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHNpbmdsZXRvbjogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW90ZSBtZXRob2QgYWNjZXNzIGZvciBvdGhlciB3b3JrZXJzXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gcmVtb3RlPXthcHA6IFsnYWRkRG9tTGlzdGVuZXInXX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHJlbW90ZToge1xuICAgICAgICAgICAgYXBwOiBbXG4gICAgICAgICAgICAgICAgJ2FkZERvbUxpc3RlbmVyJyxcbiAgICAgICAgICAgICAgICAncmVnaXN0ZXJQcmV2ZW50RGVmYXVsdFRhcmdldHMnXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgbWUub25Eb21Db250ZW50TG9hZGVkLmJpbmQobWUpKTtcbiAgICAgICAgd2luZG93ICAuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsICAgICAgIG1lLm9uSGFzaENoYW5nZSAgICAgIC5iaW5kKG1lKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIGFkZERvbUxpc3RlbmVyKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lICA9IHRoaXMsXG4gICAgICAgICAgICBpICAgPSAwLFxuICAgICAgICAgICAgbGVuID0gZGF0YS5ldmVudHMubGVuZ3RoLFxuICAgICAgICAgICAgZXZlbnQsIGlkLCB0YXJnZXROb2RlO1xuXG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGV2ZW50ID0gZGF0YS5ldmVudHNbaV07XG5cbiAgICAgICAgICAgIGlmICghbWVbZXZlbnQuaGFuZGxlcl0pIHtcbiAgICAgICAgICAgICAgICBtZVtldmVudC5oYW5kbGVyXSA9IE5lby5lbXB0eUZuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZCA9IGV2ZW50LnZub2RlSWQgfHwgZGF0YS52bm9kZUlkO1xuXG4gICAgICAgICAgICBpZiAoaWQgPT09ICdkb2N1bWVudC5ib2R5Jykge1xuICAgICAgICAgICAgICAgIHRhcmdldE5vZGUgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXROb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0YXJnZXROb2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQubmFtZSwgbWVbZXZlbnQuaGFuZGxlcl0uYmluZChtZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgTmVvLndvcmtlci5NYW5hZ2VyLnNlbmRNZXNzYWdlKGRhdGEub3JpZ2luLCB7XG4gICAgICAgICAgICBhY3Rpb24gOiAncmVwbHknLFxuICAgICAgICAgICAgZGF0YSAgIDogZGF0YSxcbiAgICAgICAgICAgIHJlcGx5SWQ6IGRhdGEuaWQsXG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgYWRkR2xvYmFsRG9tTGlzdGVuZXJzKCkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIFsuLi5nbG9iYWxEb21FdmVudHNdLmNvbmNhdChOZW8uY29uZmlnLnVzZVRvdWNoRXZlbnRzID8gdG91Y2hFdmVudHMgOiBbXSkuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQubmFtZSwgbWVbZXZlbnQuaGFuZGxlcl0uYmluZChtZSksIGV2ZW50Lm9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2NhbCBkb21FdmVudCBsaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIGRvbUV2ZW50TGlzdGVuZXIoZXZlbnQpIHtcbiAgICAgICAgbGV0IG1lICAgICA9IHRoaXMsXG4gICAgICAgICAgICB0YXJnZXQgPSBldmVudC50YXJnZXQsXG4gICAgICAgICAgICBjb25maWcgPSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uICAgOiAnZG9tRXZlbnQnLFxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogZXZlbnQudHlwZSxcblxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQgICA6IHRhcmdldC5pZCxcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA6IChldmVudC5wYXRoIHx8IGV2ZW50LmNvbXBvc2VkUGF0aCgpKS5tYXAoZSA9PiBlLmlkKSwgLy8gRkYgZG9lcyBub3Qgc3VwcG9ydCBjb21wb3NlZFBhdGgoKVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGFyZ2V0LnZhbHVlLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2RvbUV2ZW50TGlzdGVuZXInLCBldmVudC50eXBlLCB0YXJnZXQuaWQsIHRhcmdldC52YWx1ZSwgZXZlbnQpO1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnZHJhZ2VuZCc6XG4gICAgICAgICAgICAgICAgbWUuZHJhZ0VsZW1lbnRJZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkcmFnZW50ZXInOlxuICAgICAgICAgICAgICAgIGlmIChtZS5kcmFnRWxlbWVudElkID09PSB0YXJnZXQuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBpZ25vcmUgdGFyZ2V0IGFuZCBzb3VyY2UgdG8gYmUgdGhlIHNhbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkcmFnbGVhdmUnOlxuICAgICAgICAgICAgICAgIGlmIChtZS5kcmFnRWxlbWVudElkID09PSB0YXJnZXQuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBpZ25vcmUgdGFyZ2V0IGFuZCBzb3VyY2UgdG8gYmUgdGhlIHNhbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkcmFnb3Zlcic6XG4gICAgICAgICAgICAgICAgbWUub25EcmFnT3ZlcihldmVudCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RyYWdzdGFydCc6XG4gICAgICAgICAgICAgICAgbWUuZHJhZ0VsZW1lbnRJZCA9IHRhcmdldC5pZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Ryb3AnOlxuICAgICAgICAgICAgICAgIGlmICghbWUuZHJhZ0VsZW1lbnRJZCB8fCB0aGlzLmRyYWdFbGVtZW50SWQgPT09IHRhcmdldC5pZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47IC8vIGRyb3AgZmlyZXMgdHdpY2UgYnkgZGVmYXVsdCAmIGRyb3Agc2hvdWxkIG5vdCB0cmlnZ2VyIG9uIHRoZSBkcmFnIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgLy8gc3RvcHMgdGhlIGJyb3dzZXIgZnJvbSByZWRpcmVjdGluZy5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBjb25maWcuZGF0YS5zcmNJZCA9IG1lLmRyYWdFbGVtZW50SWQ7XG4gICAgICAgICAgICAgICAgbWUuZHJhZ0VsZW1lbnRJZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBOZW8ud29ya2VyLk1hbmFnZXIuc2VuZE1lc3NhZ2UoJ2FwcCcsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgZ2V0RXZlbnREYXRhKGV2ZW50KSB7XG4gICAgICAgIGxldCBwYXRoID0gZXZlbnQucGF0aCB8fCBldmVudC5jb21wb3NlZFBhdGgoKTsgLy8gRkYgZG9lcyBub3Qgc3VwcG9ydCBjb21wb3NlZFBhdGgoKVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXRoICAgICA6IHBhdGgubWFwKGUgPT4gdGhpcy5nZXRUYXJnZXREYXRhKGUpKSxcbiAgICAgICAgICAgIHRhcmdldCAgIDogdGhpcy5nZXRUYXJnZXREYXRhKGV2ZW50LnRhcmdldCksXG4gICAgICAgICAgICB0aW1lU3RhbXA6IGV2ZW50LnRpbWVTdGFtcCxcbiAgICAgICAgICAgIHR5cGUgICAgIDogZXZlbnQudHlwZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldEtleWJvYXJkRXZlbnREYXRhKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHthbHRLZXksIGNvZGUsIGN0cmxLZXksIGtleSwga2V5Q29kZSwgbWV0YUtleSwgc2hpZnRLZXl9ID0gZXZlbnQ7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0RXZlbnREYXRhKGV2ZW50KSxcbiAgICAgICAgICAgIGFsdEtleSAgOiBhbHRLZXksXG4gICAgICAgICAgICBjb2RlICAgIDogY29kZSxcbiAgICAgICAgICAgIGN0cmxLZXkgOiBjdHJsS2V5LFxuICAgICAgICAgICAga2V5ICAgICA6IGtleSxcbiAgICAgICAgICAgIGtleUNvZGUgOiBrZXlDb2RlLFxuICAgICAgICAgICAgbWV0YUtleSA6IG1ldGFLZXksXG4gICAgICAgICAgICBzaGlmdEtleTogc2hpZnRLZXlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRNb3VzZUV2ZW50RGF0YShldmVudCkge1xuICAgICAgICBjb25zdCB7YWx0S2V5LCBjbGllbnRYLCBjbGllbnRZLCBjdHJsS2V5LCBtZXRhS2V5LCBvZmZzZXRYLCBvZmZzZXRZLCBwYWdlWCwgcGFnZVksIHNjcmVlblgsIHNjcmVlblksIHNoaWZ0S2V5fSA9IGV2ZW50O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50aGlzLmdldEV2ZW50RGF0YShldmVudCksXG4gICAgICAgICAgICBhbHRLZXkgIDogYWx0S2V5LFxuICAgICAgICAgICAgY2xpZW50WCA6IGNsaWVudFgsXG4gICAgICAgICAgICBjbGllbnRZIDogY2xpZW50WSxcbiAgICAgICAgICAgIGN0cmxLZXkgOiBjdHJsS2V5LFxuICAgICAgICAgICAgbWV0YUtleSA6IG1ldGFLZXksXG4gICAgICAgICAgICBvZmZzZXRYIDogb2Zmc2V0WCxcbiAgICAgICAgICAgIG9mZnNldFkgOiBvZmZzZXRZLFxuICAgICAgICAgICAgcGFnZVggICA6IHBhZ2VYLFxuICAgICAgICAgICAgcGFnZVkgICA6IHBhZ2VZLFxuICAgICAgICAgICAgc2NyZWVuWCA6IHNjcmVlblgsXG4gICAgICAgICAgICBzY3JlZW5ZIDogc2NyZWVuWSxcbiAgICAgICAgICAgIHNoaWZ0S2V5OiBzaGlmdEtleVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldFRhcmdldERhdGEobm9kZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2hlY2tlZCAgICAgICAgICA6IG5vZGUuY2hlY2tlZCxcbiAgICAgICAgICAgIGNoaWxkRWxlbWVudENvdW50OiBub2RlLmNoaWxkRWxlbWVudENvdW50LFxuICAgICAgICAgICAgY2xpZW50SGVpZ2h0ICAgICA6IG5vZGUuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgICAgY2xpZW50TGVmdCAgICAgICA6IG5vZGUuY2xpZW50TGVmdCxcbiAgICAgICAgICAgIGNsaWVudFRvcCAgICAgICAgOiBub2RlLmNsaWVudFRvcCxcbiAgICAgICAgICAgIGNsaWVudFdpZHRoICAgICAgOiBub2RlLmNsaWVudFdpZHRoLFxuICAgICAgICAgICAgY2xzICAgICAgICAgICAgICA6IG5vZGUuY2xhc3NMaXN0ID8gWy4uLm5vZGUuY2xhc3NMaXN0XSA6IFtdLFxuICAgICAgICAgICAgZGF0YSAgICAgICAgICAgICA6IHsuLi5ub2RlLmRhdGFzZXR9LFxuICAgICAgICAgICAgZHJhZ2dhYmxlICAgICAgICA6IG5vZGUuZHJhZ2dhYmxlLFxuICAgICAgICAgICAgaGlkZGVuICAgICAgICAgICA6IG5vZGUuaGlkZGVuLFxuICAgICAgICAgICAgaWQgICAgICAgICAgICAgICA6IG5vZGUuaWQsXG4gICAgICAgICAgICBpbmVydCAgICAgICAgICAgIDogbm9kZS5pbmVydCxcbiAgICAgICAgICAgIGlzQ29ubmVjdGVkICAgICAgOiBub2RlLmlzQ29ubmVjdGVkLFxuICAgICAgICAgICAgaXNDb250ZW50RWRpdGFibGU6IG5vZGUuaXNDb250ZW50RWRpdGFibGUsXG4gICAgICAgICAgICBub2RlVHlwZSAgICAgICAgIDogbm9kZS5ub2RlVHlwZSxcbiAgICAgICAgICAgIG9mZnNldEhlaWdodCAgICAgOiBub2RlLm9mZnNldEhlaWdodCxcbiAgICAgICAgICAgIG9mZnNldExlZnQgICAgICAgOiBub2RlLm9mZnNldExlZnQsXG4gICAgICAgICAgICBvZmZzZXRUb3AgICAgICAgIDogbm9kZS5vZmZzZXRUb3AsXG4gICAgICAgICAgICBvZmZzZXRXaWR0aCAgICAgIDogbm9kZS5vZmZzZXRXaWR0aCxcbiAgICAgICAgICAgIHNjcm9sbEhlaWdodCAgICAgOiBub2RlLnNjcm9sbEhlaWdodCxcbiAgICAgICAgICAgIHNjcm9sbExlZnQgICAgICAgOiBub2RlLnNjcm9sbExlZnQsXG4gICAgICAgICAgICBzY3JvbGxUb3AgICAgICAgIDogbm9kZS5zY3JvbGxUb3AsXG4gICAgICAgICAgICBzY3JvbGxXaWR0aCAgICAgIDogbm9kZS5zY3JvbGxXaWR0aCxcbiAgICAgICAgICAgIHN0eWxlICAgICAgICAgICAgOiBub2RlLnN0eWxlICYmIG5vZGUuc3R5bGUuY3NzVGV4dCxcbiAgICAgICAgICAgIHRhYkluZGV4ICAgICAgICAgOiBub2RlLnRhYkluZGV4LFxuICAgICAgICAgICAgdGFnTmFtZSAgICAgICAgICA6IG5vZGUudGFnTmFtZSAmJiBub2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgb25DaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZVRvQXBwKHtcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0RXZlbnREYXRhKGV2ZW50KSxcbiAgICAgICAgICAgIHZhbGlkOiBldmVudC50YXJnZXQuY2hlY2tWYWxpZGl0eSgpLFxuICAgICAgICAgICAgdmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBtZS5zZW5kTWVzc2FnZVRvQXBwKG1lLmdldE1vdXNlRXZlbnREYXRhKGV2ZW50KSk7XG5cbiAgICAgICAgaWYgKG1lLnRlc3RQYXRoSW5jbHVzaW9uKGV2ZW50LCBwcmV2ZW50Q2xpY2tUYXJnZXRzKSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgb25Db250ZXh0TWVudShldmVudCkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIG1lLnNlbmRNZXNzYWdlVG9BcHAobWUuZ2V0TW91c2VFdmVudERhdGEoZXZlbnQpKTtcblxuICAgICAgICBpZiAobWUudGVzdFBhdGhJbmNsdXNpb24oZXZlbnQsIHByZXZlbnRDb250ZXh0bWVudVRhcmdldHMpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkRvbUNvbnRlbnRMb2FkZWQoKSB7XG4gICAgICAgIHRoaXMuYWRkR2xvYmFsRG9tTGlzdGVuZXJzKCk7XG4gICAgICAgIHRoaXMuZmlyZSgnZG9tQ29udGVudExvYWRlZCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgb25EcmFnT3ZlcihldmVudCkge1xuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcbiAgICAgICAgLy9jb25zb2xlLmxvZygnb25EcmFnT3ZlcicsIGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG9uRm9jdXNJbihldmVudCkge1xuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlVG9BcHAodGhpcy5nZXRFdmVudERhdGEoZXZlbnQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG9uRm9jdXNPdXQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZVRvQXBwKHRoaXMuZ2V0RXZlbnREYXRhKGV2ZW50KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkhhc2hDaGFuZ2UoKSB7XG4gICAgICAgIGNvbnN0IGhhc2hTdHJpbmcgPSBsb2NhdGlvbi5oYXNoLnN1YnN0cigxKTtcblxuICAgICAgICBOZW8ud29ya2VyLk1hbmFnZXIuc2VuZE1lc3NhZ2UoJ2FwcCcsIHtcbiAgICAgICAgICAgIGFjdGlvbiAgICA6ICdoYXNoQ2hhbmdlJyxcbiAgICAgICAgICAgIGhhc2ggICAgICA6IHRoaXMucGFyc2VIYXNoKGhhc2hTdHJpbmcpLFxuICAgICAgICAgICAgaGFzaFN0cmluZzogaGFzaFN0cmluZ1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG9uS2V5RG93bihldmVudCkge1xuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlVG9BcHAodGhpcy5nZXRLZXlib2FyZEV2ZW50RGF0YShldmVudCkpO1xuXG4gICAgICAgIGlmIChbJ0Fycm93RG93bicsICdBcnJvd0xlZnQnLCAnQXJyb3dSaWdodCcsICdBcnJvd1VwJ10uaW5jbHVkZXMoZXZlbnQua2V5KSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgb25LZXlVcChldmVudCkge1xuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlVG9BcHAodGhpcy5nZXRLZXlib2FyZEV2ZW50RGF0YShldmVudCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgb25Nb3VzZUVudGVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2VUb0FwcCh7XG4gICAgICAgICAgICAuLi50aGlzLmdldE1vdXNlRXZlbnREYXRhKGV2ZW50KSxcbiAgICAgICAgICAgIGZyb21FbGVtZW50SWQ6IGV2ZW50LmZyb21FbGVtZW50ICYmIGV2ZW50LmZyb21FbGVtZW50LmlkIHx8IG51bGxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKi9cbiAgICBvbk1vdXNlTGVhdmUoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZVRvQXBwKHtcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0TW91c2VFdmVudERhdGEoZXZlbnQpLFxuICAgICAgICAgICAgdG9FbGVtZW50SWQ6IGV2ZW50LnRvRWxlbWVudCAmJiBldmVudC50b0VsZW1lbnQuaWQgfHwgbnVsbFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG9uV2hlZWwoZXZlbnQpIHtcbiAgICAgICAgbGV0IHRhcmdldENscyAgICAgPSB0aGlzLnRlc3RQYXRoSW5jbHVzaW9uKGV2ZW50LCBnbG9iYWxXaGVlbFRhcmdldHMpLFxuICAgICAgICAgICAgcHJldmVudFVwZGF0ZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0YXJnZXRDbHMpIHtcbiAgICAgICAgICAgIGlmIChnbG9iYWxXaGVlbFRhcmdldHNCdWZmZXJbdGFyZ2V0Q2xzXSkge1xuICAgICAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcblxuICAgICAgICAgICAgICAgIGlmIChsYXN0V2hlZWxFdmVudC5kYXRlICYmIGxhc3RXaGVlbEV2ZW50LnRhcmdldCA9PT0gdGFyZ2V0Q2xzICYmIGRhdGUgLSBsYXN0V2hlZWxFdmVudC5kYXRlIDwgZ2xvYmFsV2hlZWxUYXJnZXRzQnVmZmVyW3RhcmdldENsc10pIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmVudFVwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihsYXN0V2hlZWxFdmVudCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZSAgOiBkYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRDbHNcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgaWYgKCFwcmV2ZW50VXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qge2RlbHRhWCwgZGVsdGFZLCBkZWx0YVp9ID0gZXZlbnQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlVG9BcHAoe1xuICAgICAgICAgICAgICAgICAgICAuLi50aGlzLmdldEV2ZW50RGF0YShldmVudCksXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhWDogZGVsdGFYLFxuICAgICAgICAgICAgICAgICAgICBkZWx0YVk6IGRlbHRhWSxcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFaOiBkZWx0YVpcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4YW1wbGUgZm9yIEFycmF5IHZhbHVlczogXCJjYXRlZ29yaWVzW109dGVzdDEmY2F0ZWdvcmllc1tdPXRlc3QyXCJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBwYXJzZUhhc2goc3RyKSB7XG4gICAgICAgIGlmIChzdHIgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGllY2VzID0gc3RyLnNwbGl0KCcmJyksXG4gICAgICAgICAgICBkYXRhICAgPSB7fSxcbiAgICAgICAgICAgIGksIGtleSwgcGFydHMsIHZhbHVlO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwaWVjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBhcnRzID0gcGllY2VzW2ldLnNwbGl0KCc9Jyk7XG5cbiAgICAgICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgcGFydHMucHVzaCgnJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGtleSAgID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzBdKTtcbiAgICAgICAgICAgIHZhbHVlID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzFdKTtcblxuICAgICAgICAgICAgaWYgKGtleS5pbmRleE9mKCdbXScpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGtleSA9IGtleS5zdWJzdHJpbmcoMCwga2V5LmluZGV4T2YoJ1tdJykpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFba2V5XSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRhdGFba2V5XS5wdXNoKHRoaXMucGFyc2VWYWx1ZSh2YWx1ZSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhW2tleV0gPSB0aGlzLnBhcnNlVmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdXNlZCBieSBwYXJzZUhhc2ggdG8gY29udmVydCB0b2tlbnMgaW50byBib29sZWFuIG9yIG51bWJlciB0eXBlcyBpZiBuZWVkZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbnxOdW1iZXJ8U3RyaW5nfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcGFyc2VWYWx1ZSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT0gcGFyc2VJbnQodmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgdmFsdWUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBkYXRhLmNsc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLm5hbWVcbiAgICAgKi9cbiAgICByZWdpc3RlclByZXZlbnREZWZhdWx0VGFyZ2V0cyhkYXRhKSB7XG4gICAgICAgIGxldCBwcmV2ZW50QXJyYXk7XG5cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEuY2xzKSkge1xuICAgICAgICAgICAgZGF0YS5jbHMgPSBbZGF0YS5jbHNdO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChkYXRhLm5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgICAgICAgICAgICBwcmV2ZW50QXJyYXkgPSBwcmV2ZW50Q2xpY2tUYXJnZXRzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY29udGV4dG1lbnUnOlxuICAgICAgICAgICAgICAgIHByZXZlbnRBcnJheSA9IHByZXZlbnRDb250ZXh0bWVudVRhcmdldHM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBkYXRhLmNscy5mb3JFYWNoKGNscyA9PiB7XG4gICAgICAgICAgICBpZiAoIXByZXZlbnRBcnJheS5pbmNsdWRlcyhjbHMpKSB7XG4gICAgICAgICAgICAgICAgcHJldmVudEFycmF5LnB1c2goY2xzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VuZHMgdGhlIHBhcnNlZCBldmVudCBkYXRhIHRvIHRoZSBhcHAgd29ya2VyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHNlbmRNZXNzYWdlVG9BcHAoZGF0YSkge1xuICAgICAgICBOZW8ud29ya2VyLk1hbmFnZXIuc2VuZE1lc3NhZ2UoJ2FwcCcsIHtcbiAgICAgICAgICAgIGFjdGlvbiAgIDogJ2RvbUV2ZW50JyxcbiAgICAgICAgICAgIGV2ZW50TmFtZTogZGF0YS50eXBlLFxuICAgICAgICAgICAgZGF0YSAgICAgOiBkYXRhXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRBcnJheVxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd8Qm9vbGVhbn0gdGFyZ2V0IGNscyBpZiBmb3VuZCwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgICovXG4gICAgdGVzdFBhdGhJbmNsdXNpb24oZXZlbnQsIHRhcmdldEFycmF5KSB7XG4gICAgICAgIGxldCBjb3VudFRhcmdldHMgPSB0YXJnZXRBcnJheS5sZW5ndGgsXG4gICAgICAgICAgICBwYXRoICAgICAgICAgPSBldmVudC5wYXRoIHx8IGV2ZW50LmNvbXBvc2VkUGF0aCgpLFxuICAgICAgICAgICAgaSAgICAgICAgICAgID0gMCxcbiAgICAgICAgICAgIGxlbiAgICAgICAgICA9IHBhdGgubGVuZ3RoLFxuICAgICAgICAgICAgaiwgbm9kZTtcblxuICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBub2RlID0gcGF0aFtpXTtcblxuICAgICAgICAgICAgZm9yIChqPTA7IGogPCBjb3VudFRhcmdldHM7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLmNsYXNzTGlzdCAmJiBub2RlLmNsYXNzTGlzdC5jb250YWlucyh0YXJnZXRBcnJheVtqXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldEFycmF5W2pdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKERvbUV2ZW50cyk7XG5cbmxldCBpbnN0YW5jZSA9IE5lby5jcmVhdGUoRG9tRXZlbnRzKTtcblxuTmVvLmFwcGx5VG9HbG9iYWxOcyhpbnN0YW5jZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3RhbmNlO1xuIiwidmFyIG1hcCA9IHtcblx0XCIuL0FtQ2hhcnRzLm1qc1wiOiBbXG5cdFx0XCIuL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9tYWluL2FkZG9uL0FtQ2hhcnRzLm1qc1wiLFxuXHRcdFwic3JjL21haW4vYWRkb24vQW1DaGFydHMtbWpzXCJcblx0XSxcblx0XCIuL0dvb2dsZUFuYWx5dGljcy5tanNcIjogW1xuXHRcdFwiLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9hZGRvbi9Hb29nbGVBbmFseXRpY3MubWpzXCIsXG5cdFx0XCJzcmMvbWFpbi9hZGRvbi9Hb29nbGVBbmFseXRpY3MtbWpzXCJcblx0XSxcblx0XCIuL0hpZ2hsaWdodEpTLm1qc1wiOiBbXG5cdFx0XCIuL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9tYWluL2FkZG9uL0hpZ2hsaWdodEpTLm1qc1wiLFxuXHRcdFwidmVuZG9yc35zcmMvbWFpbi9hZGRvbi9IaWdobGlnaHRKUy1tanNcIlxuXHRdLFxuXHRcIi4vTG9jYWxTdG9yYWdlLm1qc1wiOiBbXG5cdFx0XCIuL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9tYWluL2FkZG9uL0xvY2FsU3RvcmFnZS5tanNcIixcblx0XHRcInNyYy9tYWluL2FkZG9uL0xvY2FsU3RvcmFnZS1tanNcIlxuXHRdLFxuXHRcIi4vTWFwYm94R0wubWpzXCI6IFtcblx0XHRcIi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL21haW4vYWRkb24vTWFwYm94R0wubWpzXCIsXG5cdFx0XCJ2ZW5kb3JzfnNyYy9tYWluL2FkZG9uL01hcGJveEdMLW1qc1wiXG5cdF0sXG5cdFwiLi9NYXJrZG93bi5tanNcIjogW1xuXHRcdFwiLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9hZGRvbi9NYXJrZG93bi5tanNcIixcblx0XHRcInNyYy9tYWluL2FkZG9uL01hcmtkb3duLW1qc1wiXG5cdF0sXG5cdFwiLi9TaWVzdGEubWpzXCI6IFtcblx0XHRcIi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL21haW4vYWRkb24vU2llc3RhLm1qc1wiLFxuXHRcdFwic3JjL21haW4vYWRkb24vU2llc3RhLW1qc1wiXG5cdF0sXG5cdFwiLi9TdHlsZXNoZWV0Lm1qc1wiOiBbXG5cdFx0XCIuL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9tYWluL2FkZG9uL1N0eWxlc2hlZXQubWpzXCIsXG5cdFx0XCJzcmMvbWFpbi9hZGRvbi9TdHlsZXNoZWV0LW1qc1wiXG5cdF1cbn07XG5mdW5jdGlvbiB3ZWJwYWNrQXN5bmNDb250ZXh0KHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdFx0dGhyb3cgZTtcblx0XHR9KTtcblx0fVxuXG5cdHZhciBpZHMgPSBtYXBbcmVxXSwgaWQgPSBpZHNbMF07XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoaWRzWzFdKS50aGVuKGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcblx0fSk7XG59XG53ZWJwYWNrQXN5bmNDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQXN5bmNDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0FzeW5jQ29udGV4dC5pZCA9IFwiLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9hZGRvbiBsYXp5IHJlY3Vyc2l2ZSBeXFxcXC5cXFxcLy4qXFxcXC5tanMkXCI7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tBc3luY0NvbnRleHQ7IiwiaW1wb3J0IEJhc2UgZnJvbSAnLi4vLi4vY29yZS9CYXNlLm1qcyc7XG5cbi8qKlxuICogTG9naWMgdG8gYXBwbHkgdGhlIGRlbHRhcyBnZW5lcmF0ZWQgYnkgdmRvbS5IZWxwZXIgdG8gdGhlIHJlYWwgRE9NXG4gKiBAY2xhc3MgTmVvLm1haW4ubWl4aW4uRGVsdGFVcGRhdGVzXG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKiBAc2luZ2xldG9uXG4gKi9cbmNsYXNzIERlbHRhVXBkYXRlcyBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8ubWFpbi5taXhpbi5EZWx0YVVwZGF0ZXMnXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8ubWFpbi5taXhpbi5EZWx0YVVwZGF0ZXMnXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRlbHRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRlbHRhLmlkXG4gICAgICovXG4gICAgZHVfZm9jdXNOb2RlKGRlbHRhKSB7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudChkZWx0YS5pZCkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBub2RlLmNoaWxkcmVuIGNvbnRhaW5zIHRoZSBcInJlYWxcIiBub2RlcyAodGFncylcbiAgICAgKiBub2RlLmNoaWxkTm9kZXMgY29udGFpbnMgdGV4dHMgJiBjb21tZW50cyBhcyBub2RlcyB0b29cbiAgICAgKiBzaW5jZSBldmVyeSB2dHlwZTondGV4dCcgaXMgd3JhcHBlZCBpbnNpZGUgYSBjb21tZW50IGJsb2NrIChhcyBhbiBpZCksXG4gICAgICogd2UgbmVlZCB0aGUgYW1vdW50IG9mIG5vZGVzIHdoaWNoIGFyZSBub3QgY29tbWVudHMgdG8gZ2V0IHRoZSBcInJlYWxJbmRleFwiLlxuICAgICAqIGluc2VydEFkamFjZW50SFRNTCgpIGlzIGZhc3RlciB0aGFuIGNyZWF0aW5nIGEgbm9kZSAodGVtcGxhdGUpLCBidXQgb25seSBhdmFpbGFibGVcbiAgICAgKiBmb3IgY2hpbGRyZW4gYW5kIG5vdCBmb3IgY2hpbGROb2Rlcy5cbiAgICAgKiBJbiBjYXNlIHRoZXJlIGFyZSBubyBjb21tZW50cyAoPT4gdnR5cGU6ICd0ZXh0JyBub2RlcyksIHdlIHN0aWNrIHRvIGl0IGZvciBwZXJmb3JtYW5jZSByZWFzb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRlbHRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRlbHRhLmluZGV4XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRlbHRhLm91dGVySFRNTFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkZWx0YS5wYXJlbnRJZFxuICAgICAqL1xuICAgIGR1X2luc2VydE5vZGUoZGVsdGEpIHtcbiAgICAgICAgbGV0IGluZGV4ICAgICAgICAgPSBkZWx0YS5pbmRleCxcbiAgICAgICAgICAgIHBhcmVudE5vZGUgICAgPSB0aGlzLmdldEVsZW1lbnQoZGVsdGEucGFyZW50SWQpLFxuICAgICAgICAgICAgY291bnRDaGlsZHJlbiA9IHBhcmVudE5vZGUuY2hpbGROb2Rlcy5sZW5ndGgsXG4gICAgICAgICAgICBpICAgICAgICAgICAgID0gMCxcbiAgICAgICAgICAgIHJlYWxJbmRleCAgICAgPSBpbmRleCxcbiAgICAgICAgICAgIGhhc0NvbW1lbnRzICAgPSBmYWxzZSxcbiAgICAgICAgICAgIG5vZGU7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2luc2VydE5vZGUnLCBpbmRleCwgY291bnRDaGlsZHJlbiwgZGVsdGEucGFyZW50SWQpO1xuXG4gICAgICAgIGZvciAoOyBpIDwgY291bnRDaGlsZHJlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50Tm9kZS5jaGlsZE5vZGVzW2ldLm5vZGVUeXBlID09PSA4KSB7IC8vIGlnbm9yZSBjb21tZW50c1xuICAgICAgICAgICAgICAgIGlmIChpIDwgcmVhbEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWxJbmRleCsrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGhhc0NvbW1lbnRzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaGFzQ29tbWVudHMpIHtcbiAgICAgICAgICAgIGNvdW50Q2hpbGRyZW4gPSBwYXJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKGNvdW50Q2hpbGRyZW4gPiAwICYmIGNvdW50Q2hpbGRyZW4gPiBpbmRleCkge1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUuY2hpbGRyZW5baW5kZXhdLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlYmVnaW4nLCBkZWx0YS5vdXRlckhUTUwpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudENoaWxkcmVuID4gMCkge1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUuY2hpbGRyZW5bY291bnRDaGlsZHJlbiAtIDFdLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCBkZWx0YS5vdXRlckhUTUwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgZGVsdGEub3V0ZXJIVE1MKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLmh0bWxTdHJpbmdUb0VsZW1lbnQoZGVsdGEub3V0ZXJIVE1MKTtcblxuICAgICAgICAgICAgaWYgKGNvdW50Q2hpbGRyZW4gPiAwICYmIGNvdW50Q2hpbGRyZW4gPiByZWFsSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCBwYXJlbnROb2RlLmNoaWxkTm9kZXNbcmVhbEluZGV4XSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkZWx0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkZWx0YS5pZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkZWx0YS5pbmRleFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkZWx0YS5wYXJlbnRJZFxuICAgICAqL1xuICAgIGR1X21vdmVOb2RlKGRlbHRhKSB7XG4gICAgICAgIGxldCBpbmRleCAgICAgID0gZGVsdGEuaW5kZXgsXG4gICAgICAgICAgICBub2RlICAgICAgID0gdGhpcy5nZXRFbGVtZW50KGRlbHRhLmlkKSxcbiAgICAgICAgICAgIHBhcmVudE5vZGUgPSB0aGlzLmdldEVsZW1lbnQoZGVsdGEucGFyZW50SWQpO1xuXG4gICAgICAgIGlmIChpbmRleCA+PSBwYXJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgcGFyZW50Tm9kZS5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vaW5kZXgrKzsgLy8gdG9kbz86IGluY3JlYXNlIHRoZSBpbmRleCBpbiBjYXNlIHNhbWUgcGFyZW50LCBvbGRJbmRleCA8IG5ld0luZGV4LCBkaXJlY3Qgc3dhcFxuICAgICAgICAgICAgaWYgKG5vZGUgJiYgcGFyZW50Tm9kZS5jaGlsZHJlbltpbmRleF0uaWQgIT09IGRlbHRhLmlkKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobm9kZSwgcGFyZW50Tm9kZS5jaGlsZHJlbltpbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGVsdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGVsdGEuaWRcbiAgICAgKi9cbiAgICBkdV9yZW1vdmVOb2RlKGRlbHRhKSB7XG4gICAgICAgIGxldCBub2RlID0gdGhpcy5nZXRFbGVtZW50KGRlbHRhLmlkKTtcblxuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUud2FybignZHVfcmVtb3ZlTm9kZTogZG9tIG5vZGUgbm90IGZvdW5kIGZvciBpZCcsIGRlbHRhLmlkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRlbHRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRlbHRhLmZyb21JZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkZWx0YS5wYXJlbnRJZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkZWx0YS50b0lkXG4gICAgICovXG4gICAgZHVfcmVwbGFjZUNoaWxkKGRlbHRhKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIG5vZGUgPSBtZS5nZXRFbGVtZW50KGRlbHRhLnBhcmVudElkKTtcblxuICAgICAgICBub2RlLnJlcGxhY2VDaGlsZChtZS5nZXRFbGVtZW50KGRlbHRhLnRvSWQpLCBtZS5nZXRFbGVtZW50KGRlbHRhLmZyb21JZCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRlbHRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtkZWx0YS5hdHRyaWJ1dGVzXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbZGVsdGEuY2xzXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbZGVsdGEuaWRdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtkZWx0YS5pbm5lckhUTUxdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtkZWx0YS5vdXRlckhUTUxdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtkZWx0YS5zdHlsZV1cbiAgICAgKi9cbiAgICBkdV91cGRhdGVOb2RlKGRlbHRhKSB7XG4gICAgICAgIGxldCBub2RlID0gdGhpcy5nZXRFbGVtZW50T3JCb2R5KGRlbHRhLmlkKTtcblxuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignZHVfdXBkYXRlTm9kZTogbm9kZSBub3QgZm91bmQgZm9yIGlkJywgZGVsdGEuaWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMoZGVsdGEpLmZvckVhY2goKFtwcm9wLCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2gocHJvcCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdhdHRyaWJ1dGVzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKHZhbHVlKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy52b2lkQXR0cmlidXRlcy5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVba2V5XSA9IHZhbHVlID09PSAndHJ1ZSc7IC8vIHZub2RlIGF0dHJpYnV0ZSB2YWx1ZXMgZ2V0IGNvbnZlcnRlZCBpbnRvIHN0cmluZ3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAndmFsdWUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlW2tleV0gPSAnJzsgLy8gaW5wdXQgZmllbGRzID0+IHBzZXVkbyBhdHRyaWJ1dGUgY2FuIG5vdCBiZSByZW1vdmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2xzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZCguLi52YWx1ZS5hZGQgfHwgW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKC4uLnZhbHVlLnJlbW92ZSB8fCBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaW5uZXJIVE1MJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuaW5uZXJIVE1MID0gdmFsdWUgfHwgJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnb3V0ZXJIVE1MJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUub3V0ZXJIVE1MID0gZGF0YS5vdXRlckhUTUw7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3R5bGUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE5lby5pc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZSkuZm9yRWFjaChmdW5jdGlvbihzdHlsZU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc3R5bGVbc3R5bGVOYW1lXSA9IHZhbHVlW3N0eWxlTmFtZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGVsdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGVsdGEuaWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGVsdGEucGFyZW50SWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGVsdGEudmFsdWVcbiAgICAgKi9cbiAgICBkdV91cGRhdGVWdGV4dChkZWx0YSkge1xuICAgICAgICBsZXQgbWUgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIG5vZGUgICAgICA9IG1lLmdldEVsZW1lbnQoZGVsdGEucGFyZW50SWQpLFxuICAgICAgICAgICAgaW5uZXJIVE1MID0gbm9kZS5pbm5lckhUTUwsXG4gICAgICAgICAgICBzdGFydFRhZyAgPSBgPCEtLSAke2RlbHRhLmlkfSAtLT5gLFxuICAgICAgICAgICAgcmVnICAgICAgID0gbmV3IFJlZ0V4cChzdGFydFRhZyArICdbXFxcXHNcXFxcU10qPzwhLS0gXFwvbmVvLXZ0ZXh0IC0tPicpO1xuXG4gICAgICAgIG5vZGUuaW5uZXJIVE1MID0gaW5uZXJIVE1MLnJlcGxhY2UocmVnLCBkZWx0YS52YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGh0bWwgcmVwcmVzZW50aW5nIGEgc2luZ2xlIGVsZW1lbnRcbiAgICAgKiBAcmV0dXJuIHtDaGlsZE5vZGV9XG4gICAgICovXG4gICAgaHRtbFN0cmluZ1RvRWxlbWVudChodG1sKSB7XG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlLmNvbnRlbnQuZmlyc3RDaGlsZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtPYmplY3R8T2JqZWN0W119IGRhdGEuZGVsdGFzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2RhdGEub3JpZ2luPSdhcHAnXVxuICAgICAqL1xuICAgIHVwZGF0ZShkYXRhKSB7XG4gICAgICAgIGxldCBtZSAgICAgPSB0aGlzLFxuICAgICAgICAgICAgZGVsdGFzID0gZGF0YS5kZWx0YXMsXG4gICAgICAgICAgICBpICAgICAgPSAwLFxuICAgICAgICAgICAgbGVuO1xuXG4gICAgICAgIGRlbHRhcyA9IEFycmF5LmlzQXJyYXkoZGVsdGFzKSA/IGRlbHRhcyA6IFtkZWx0YXNdO1xuICAgICAgICBsZW4gICAgPSBkZWx0YXMubGVuZ3RoO1xuXG4gICAgICAgIGlmIChtZS5sb2dEZWx0YVVwZGF0ZXMpIHtcbiAgICAgICAgICAgIG1lLmNvdW50RGVsdGFzICs9IChkYXRhLmRlbHRhcyAmJiBkYXRhLmRlbHRhcy5sZW5ndGggfHwgMCk7XG4gICAgICAgICAgICBtZS5jb3VudFVwZGF0ZXMrKztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGUgJyArIG1lLmNvdW50VXBkYXRlcywgJ3RvdGFsIGRlbHRhcyAnLCBtZS5jb3VudERlbHRhcywgTmVvLmNsb25lKGRhdGEsIHRydWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1hcCA9IHtcbiAgICAgICAgICAgIGZvY3VzTm9kZSAgIDogbWUuZHVfZm9jdXNOb2RlLFxuICAgICAgICAgICAgaW5zZXJ0Tm9kZSAgOiBtZS5kdV9pbnNlcnROb2RlLFxuICAgICAgICAgICAgbW92ZU5vZGUgICAgOiBtZS5kdV9tb3ZlTm9kZSxcbiAgICAgICAgICAgIHJlbW92ZU5vZGUgIDogbWUuZHVfcmVtb3ZlTm9kZSxcbiAgICAgICAgICAgIHJlcGxhY2VDaGlsZDogbWUuZHVfcmVwbGFjZUNoaWxkLFxuICAgICAgICAgICAgdXBkYXRlVnRleHQgOiBtZS5kdV91cGRhdGVWdGV4dCxcbiAgICAgICAgICAgIGRlZmF1bHQgICAgIDogbWUuZHVfdXBkYXRlTm9kZVxuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIChtYXBbZGVsdGFzW2ldLmFjdGlvbl0gfHwgbWFwWydkZWZhdWx0J10pLmNhbGwobWUsIGRlbHRhc1tpXSk7XG4gICAgICAgIH1cblxuICAgICAgICBOZW8ud29ya2VyLk1hbmFnZXIuc2VuZE1lc3NhZ2UoZGF0YS5vcmlnaW4gfHwgJ2FwcCcsIHtcbiAgICAgICAgICAgIGFjdGlvbiA6ICdyZXBseScsXG4gICAgICAgICAgICByZXBseUlkOiBkYXRhLmlkLFxuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKERlbHRhVXBkYXRlcyk7XG5cbmV4cG9ydCB7RGVsdGFVcGRhdGVzIGFzIGRlZmF1bHR9OyIsImltcG9ydCBCYXNlIGZyb20gJy4uLy4uL2NvcmUvQmFzZS5tanMnO1xuXG4vKipcbiAqIFdpbGwgZ2V0IGltcG9ydGVkIGluIGNhc2UgTmVvLmNvbmZpZy51c2VUb3VjaEV2ZW50cyA9PT0gdHJ1ZVxuICogQGNsYXNzIE5lby5tYWluLm1peGluLlRvdWNoRG9tRXZlbnRzXG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKiBAc2luZ2xldG9uXG4gKi9cbmNsYXNzIFRvdWNoRG9tRXZlbnRzIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5tYWluLm1peGluLlRvdWNoRG9tRXZlbnRzJ1xuICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnTmVvLm1haW4ubWl4aW4uVG91Y2hEb21FdmVudHMnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG9uVG91Y2hDYW5jZWwoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZVRvQXBwKHRoaXMuZ2V0RXZlbnREYXRhKGV2ZW50KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKi9cbiAgICBvblRvdWNoRW5kKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2VUb0FwcCh0aGlzLmdldEV2ZW50RGF0YShldmVudCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgb25Ub3VjaEVudGVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2VUb0FwcCh0aGlzLmdldEV2ZW50RGF0YShldmVudCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgb25Ub3VjaExlYXZlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2VUb0FwcCh0aGlzLmdldEV2ZW50RGF0YShldmVudCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgb25Ub3VjaE1vdmUoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZVRvQXBwKHRoaXMuZ2V0RXZlbnREYXRhKGV2ZW50KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKi9cbiAgICBvblRvdWNoU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29uVG91Y2hTdGFydCcsIGV2ZW50KTtcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZVRvQXBwKHRoaXMuZ2V0RXZlbnREYXRhKGV2ZW50KSk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhUb3VjaERvbUV2ZW50cyk7XG5cbmV4cG9ydCB7VG91Y2hEb21FdmVudHMgYXMgZGVmYXVsdH07IiwiaW1wb3J0IEJhc2UgICAgICAgICAgICAgICBmcm9tICcuLi9jb3JlL0Jhc2UubWpzJztcbmltcG9ydCBEb21BY2Nlc3MgICAgICAgICAgZnJvbSAnLi4vbWFpbi9Eb21BY2Nlc3MubWpzJztcbmltcG9ydCBEb21FdmVudHMgICAgICAgICAgZnJvbSAnLi4vbWFpbi9Eb21FdmVudHMubWpzJztcbmltcG9ydCBNZXNzYWdlICAgICAgICAgICAgZnJvbSAnLi9NZXNzYWdlLm1qcyc7XG5pbXBvcnQgT2JzZXJ2YWJsZSAgICAgICAgIGZyb20gJy4uL2NvcmUvT2JzZXJ2YWJsZS5tanMnO1xuaW1wb3J0IFJlbW90ZU1ldGhvZEFjY2VzcyBmcm9tICcuL21peGlucy9SZW1vdGVNZXRob2RBY2Nlc3MubWpzJztcblxuLyoqXG4gKiBUaGUgd29ya2VyIG1hbmFnZXIgbGl2ZXMgaW5zaWRlIHRoZSBtYWluIHRocmVhZCBhbmQgY3JlYXRlcyB0aGUgQXBwLCBEYXRhICYgVkRvbSB3b3JrZXIuXG4gKiBBbHNvIHJlc3BvbnNpYmxlIGZvciBzZW5kaW5nIG1lc3NhZ2VzIGZyb20gdGhlIG1haW4gdGhyZWFkIHRvIHRoZSBkaWZmZXJlbnQgd29ya2Vycy5cbiAqIEBjbGFzcyBOZW8ud29ya2VyLk1hbmFnZXJcbiAqIEBleHRlbmRzIE5lby5jb3JlLkJhc2VcbiAqIEBzaW5nbGV0b25cbiAqL1xuY2xhc3MgTWFuYWdlciBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8ud29ya2VyLk1hbmFnZXInXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8ud29ya2VyLk1hbmFnZXInLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0nd29ya2VyLW1hbmFnZXInXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ3dvcmtlci1tYW5hZ2VyJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge2Jvb2xlYW59IHNpbmdsZXRvbj10cnVlXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBzaW5nbGV0b246IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgYmFzZSBwYXRoIGZvciB0aGUgd29ya2VyIGZpbGUgVVJMcywgY2FuIGUuZy4gZ2V0IHNldCBpbnNpZGUgdGhlIGluZGV4Lmh0bWwuXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBiYXNlUGF0aD1OZW8uY29uZmlnLndvcmtlckJhc2VQYXRoIHx8ICd3b3JrZXIvJ1xuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgYmFzZVBhdGg6IE5lby5jb25maWcud29ya2VyQmFzZVBhdGggfHwgJ3dvcmtlci8nLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBjb25zdHJ1Y3RlZFRocmVhZHM9MFxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0ZWRUaHJlYWRzOiAwLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW118TmVvLmNvcmUuQmFzZVtdfG51bGx9IG1peGlucz1bT2JzZXJ2YWJsZSwgUmVtb3RlTWV0aG9kQWNjZXNzXVxuICAgICAgICAgKi9cbiAgICAgICAgbWl4aW5zOiBbT2JzZXJ2YWJsZSwgUmVtb3RlTWV0aG9kQWNjZXNzXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRydWUgaW4gY2FzZSB0aGUgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIHdpbmRvdy5TaGFyZWRXb3JrZXIuXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHNoYXJlZFdvcmtlcnNFbmFibGVkPWZhbHNlXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBzaGFyZWRXb3JrZXJzRW5hYmxlZDogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnRlcm5hbCBmbGFnIHRvIHN0b3AgdGhlIHdvcmtlciBjb21tdW5pY2F0aW9uIGluIGNhc2UgdGhlaXIgY3JlYXRpb24gZmFpbHNcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc3RvcENvbW11bmljYXRpb249ZmFsc2VcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHN0b3BDb21tdW5pY2F0aW9uOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRydWUgaW4gY2FzZSB0aGUgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIHdpbmRvdy5Xb3JrZXIuXG4gICAgICAgICAqIFRoZSBuZW8ubWpzIGZyYW1ld29yayBpcyBub3QgYWJsZSB0byBydW4gd2l0aG91dCB3ZWIgd29ya2Vycy5cbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc2hhcmVkV29ya2Vyc0VuYWJsZWQ9ZmFsc2VcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHdlYldvcmtlcnNFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRhaW5zIHRoZSBmaWxlTmFtZXMgZm9yIHRoZSBBcHAsIERhdGEgJiBWZG9tIHdvcmtlcnNcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSB3b3JrZXJzXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB3b3JrZXJzOiB7XG4gICAgICAgICAgICBhcHA6IHtcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogTmVvLmNvbmZpZy5pc0V4cGVyaW1lbnRhbCA/ICdBcHAubWpzJyAgOiBOZW8uY29uZmlnLmFwcFBhdGhcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZmlsZU5hbWU6IE5lby5jb25maWcuaXNFeHBlcmltZW50YWwgPyAnRGF0YS5tanMnIDogJ2RhdGF3b3JrZXIuanMnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmRvbToge1xuICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBOZW8uY29uZmlnLmlzRXhwZXJpbWVudGFsID8gJ1ZEb20ubWpzJyA6ICd2ZG9td29ya2VyLmpzJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgICBtZS5kZXRlY3RGZWF0dXJlcygpO1xuXG4gICAgICAgIGlmICghTmVvLmluc2lkZVdvcmtlcikge1xuICAgICAgICAgICAgbWUuY3JlYXRlV29ya2VycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgTmVvLndvcmtlcklkID0gJ21haW4nO1xuXG4gICAgICAgIG1lLnByb21pc2VzID0ge307XG5cbiAgICAgICAgbWUub24oe1xuICAgICAgICAgICAgJ21lc3NhZ2U6YWRkRG9tTGlzdGVuZXInICAgOiB7Zm46IERvbUV2ZW50cy5hZGREb21MaXN0ZW5lciwgc2NvcGU6IERvbUV2ZW50c30sXG4gICAgICAgICAgICAnbWVzc2FnZTpyZWFkRG9tJyAgICAgICAgICA6IHtmbjogRG9tQWNjZXNzLm9uUmVhZERvbSwgICAgICBzY29wZTogRG9tQWNjZXNzfSxcbiAgICAgICAgICAgICdtZXNzYWdlOnJlZ2lzdGVyUmVtb3RlJyAgIDoge2ZuOiBtZS5vblJlZ2lzdGVyUmVtb3RlLCAgICAgIHNjb3BlOiBtZX0sXG4gICAgICAgICAgICAnbWVzc2FnZTp3b3JrZXJDb25zdHJ1Y3RlZCc6IHtmbjogbWUub25Xb3JrZXJDb25zdHJ1Y3RlZCwgICBzY29wZTogbWV9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgZGV0ZWN0RmVhdHVyZXMoKSB7XG4gICAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAod2luZG93Lldvcmtlcikge1xuICAgICAgICAgICAgbWUud2ViV29ya2Vyc0VuYWJsZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBXZWIgV29ya2VycycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdpbmRvdy5TaGFyZWRXb3JrZXIpIHtcbiAgICAgICAgICAgIG1lLnNoYXJlZFdvcmtlcnNFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8V29ya2VyfSBuYW1lXG4gICAgICogQHJldHVybnMge1dvcmtlcn1cbiAgICAgKi9cbiAgICBnZXRXb3JrZXIobmFtZSkge1xuICAgICAgICByZXR1cm4gbmFtZSBpbnN0YW5jZW9mIFdvcmtlciA/IG5hbWUgOiB0aGlzLndvcmtlcnNbbmFtZV0ud29ya2VyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSB3ZWIgd29ya2VyIHVzaW5nIHRoZSBwYXNzZWQgb3B0aW9ucyBhcyB3ZWxsIGFzIGFkZGluZyBlcnJvciAmIG1lc3NhZ2UgZXZlbnQgbGlzdGVuZXJzLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICogQHJldHVybnMge1dvcmtlcn1cbiAgICAgKi9cbiAgICBjcmVhdGVXb3JrZXIob3B0cykge1xuICAgICAgICBjb25zdCBtZSAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICAgIGZpbGVQYXRoID0gKG9wdHMuYmFzZVBhdGggfHwgbWUuYmFzZVBhdGgpICsgb3B0cy5maWxlTmFtZSxcbiAgICAgICAgICAgICAgd29ya2VyICAgPSAhTmVvLmNvbmZpZy5pc0V4cGVyaW1lbnRhbCA/IC8vIHRvZG86IHN3aXRjaCB0byB0aGUgbmV3IHN5bnRheCB0byBjcmVhdGUgYSB3b3JrZXIgZnJvbSBhIEpTIG1vZHVsZSBvbmNlIGJyb3dzZXJzIGFyZSByZWFkeVxuICAgICAgICAgICAgICAgICAgbmV3IFdvcmtlcihmaWxlUGF0aCkgOlxuICAgICAgICAgICAgICAgICAgbmV3IFdvcmtlcihmaWxlUGF0aCwge3R5cGU6ICdtb2R1bGUnfSk7XG5cbiAgICAgICAgd29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBtZS5vbldvcmtlck1lc3NhZ2UuYmluZChtZSkpO1xuICAgICAgICB3b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBtZS5vbldvcmtlckVycm9yLmJpbmQobWUpKTtcblxuICAgICAgICByZXR1cm4gd29ya2VyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxzIGNyZWF0ZVdvcmtlciBmb3IgZWFjaCB3b3JrZXIgaW5zaWRlIHRoZSB0aGlzLndvcmtlcnMgY29uZmlnLlxuICAgICAqL1xuICAgIGNyZWF0ZVdvcmtlcnMoKSB7XG4gICAgICAgIGxldCBtZSAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGhhc2ggICAgPSBsb2NhdGlvbi5oYXNoLFxuICAgICAgICAgICAgd29ya2VycyA9IE9iamVjdC5lbnRyaWVzKG1lLndvcmtlcnMpLFxuICAgICAgICAgICAga2V5LCB2YWx1ZTtcblxuICAgICAgICAvLyBwYXNzIHRoZSBpbml0aWFsIGhhc2ggdmFsdWUgYXMgTmVvLmNvbmZpZ3NcbiAgICAgICAgaWYgKGhhc2gpIHtcbiAgICAgICAgICAgIE5lby5jb25maWcuaGFzaCAgICAgICA9IERvbUV2ZW50cy5wYXJzZUhhc2goaGFzaC5zdWJzdHIoMSkpO1xuICAgICAgICAgICAgTmVvLmNvbmZpZy5oYXNoU3RyaW5nID0gaGFzaC5zdWJzdHIoMSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKFtrZXksIHZhbHVlXSBvZiB3b3JrZXJzKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHZhbHVlLndvcmtlciA9IG1lLmNyZWF0ZVdvcmtlcih2YWx1ZSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBlO1xuICAgICAgICAgICAgICAgIG1lLnN0b3BDb21tdW5pY2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWUuc2VuZE1lc3NhZ2Uoa2V5LCB7XG4gICAgICAgICAgICAgICAgYWN0aW9uOiAncmVnaXN0ZXJOZW9Db25maWcnLFxuICAgICAgICAgICAgICAgIGRhdGEgIDogTmVvLmNvbmZpZ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25Xb3JrZXJDb25zdHJ1Y3RlZChkYXRhKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgbWUuY29uc3RydWN0ZWRUaHJlYWRzKys7XG5cbiAgICAgICAgaWYgKG1lLmNvbnN0cnVjdGVkVGhyZWFkcyA9PT0gT2JqZWN0LmtleXMobWUud29ya2VycykubGVuZ3RoICsgMSkge1xuICAgICAgICAgICAgaWYgKE5lby5jb25maWcuYXBwUGF0aCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyBiZXR0ZXIgc2F2ZSB0aGFuIHNvcnJ5ID0+IGFsbCByZW1vdGVzIG5lZWQgdG8gYmUgcmVnaXN0ZXJlZFxuICAgICAgICAgICAgICAgICAgICBtZS5sb2FkQXBwbGljYXRpb24oTmVvLmNvbmZpZy5hcHBQYXRoKTtcbiAgICAgICAgICAgICAgICB9LCAyMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIG1ldGhvZCBmb3Igd29ya2VyIGVycm9yIGV2ZW50c1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlXG4gICAgICovXG4gICAgb25Xb3JrZXJFcnJvcihlKSB7XG4gICAgICAgIGlmICghTmVvLmNvbmZpZy5pc0V4cGVyaW1lbnRhbCkgeyAvLyBzdGFydGluZyBhIHdvcmtlciBmcm9tIGEgSlMgbW9kdWxlIHdpbGwgc2hvdyBKUyBlcnJvcnMgaW4gYSBjb3JyZWN0IHdheVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1dvcmtlciBFcnJvcjonLCBlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgbWV0aG9kIGZvciB3b3JrZXIgbWVzc2FnZSBldmVudHNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZVxuICAgICAqL1xuICAgIG9uV29ya2VyTWVzc2FnZShlKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgZGF0YSAgICAgICAgID0gZS5kYXRhLFxuICAgICAgICAgICAgZGVsYXlQcm9taXNlID0gZmFsc2UsXG4gICAgICAgICAgICBwcm9taXNlO1xuXG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICBhY3Rpb24sXG4gICAgICAgICAgICAgZGVzdGluYXRpb246IGRlc3QsXG4gICAgICAgICAgICAgcmVwbHlJZFxuICAgICAgICB9ID0gZGF0YTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZygnTWFpbjogSW5jb21pbmcgV29ya2VyIG1lc3NhZ2U6ICcgKyBkYXRhLm9yaWdpbiArICc6JyArIGFjdGlvbiwgZGF0YSk7XG5cbiAgICAgICAgbWUuZmlyZSgnbWVzc2FnZTonK2FjdGlvbiwgZGF0YSk7XG5cbiAgICAgICAgaWYgKHByb21pc2UgPSBhY3Rpb24gPT09ICdyZXBseScgJiYgbWUucHJvbWlzZXNbcmVwbHlJZF0pIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmRlc3RpbmF0aW9uID09PSAnbWFpbicpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS5kYXRhO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS5yZWplY3QpIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlLnJlamVjdChkYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5kYXRhLmF1dG9Nb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWUuZmlyZSgnYXV0b21vdW50JywgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxheVByb21pc2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmRhdGEudXBkYXRlVmRvbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWUuZmlyZSgndXBkYXRlVmRvbScsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXlQcm9taXNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghZGVsYXlQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtZS5wcm9taXNlc1tyZXBseUlkXS5kYXRhID0gZGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZGVsYXlQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG1lLnByb21pc2VzW3JlcGx5SWRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlc3QgIT09ICdtYWluJyAmJiBhY3Rpb24gIT09ICdyZXBseScpIHtcbiAgICAgICAgICAgIG1lLnByb21pc2VNZXNzYWdlKGRlc3QsIGRhdGEpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIG1lLnNlbmRNZXNzYWdlKHJlc3BvbnNlLmRlc3RpbmF0aW9uLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIG1lLnNlbmRNZXNzYWdlKGRhdGEub3JpZ2luLCB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbiA6ICdyZXBseScsXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHJlcGx5SWQ6IGRhdGEuaWQsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yICA6IGVyci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2UgaWYgKGRlc3QgPT09ICdtYWluJyAmJiBhY3Rpb24gPT09ICdyZW1vdGVNZXRob2QnKSB7XG4gICAgICAgICAgICBtZS5vblJlbW90ZU1ldGhvZChkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAgICAgKi9cbiAgICBsb2FkQXBwbGljYXRpb24ocGF0aCkge1xuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKCdhcHAnLCB7XG4gICAgICAgICAgICBhY3Rpb24gICAgICAgOiAnbG9hZEFwcGxpY2F0aW9uJyxcbiAgICAgICAgICAgIHBhdGggICAgICAgICA6IHBhdGgsXG4gICAgICAgICAgICByZXNvdXJjZXNQYXRoOiBOZW8uY29uZmlnLnJlc291cmNlc1BhdGhcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBtZXNzYWdlIHRvIGVhY2ggd29ya2VyIGRlZmluZWQgaW5zaWRlIHRoZSB0aGlzLndvcmtlcnMgY29uZmlnLlxuICAgICAqIEBwYXJhbSBtc2dcbiAgICAgKi9cbiAgICBicm9hZGNhc3QobXNnKSB7XG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHRoaXMud29ya2VycykuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UobmFtZSwgbXNnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVwbHlJZFxuICAgICAqL1xuICAgIHJlc29sdmVEb21PcGVyYXRpb25Qcm9taXNlKHJlcGx5SWQpIHtcbiAgICAgICAgaWYgKHJlcGx5SWQpIHtcbiAgICAgICAgICAgIGxldCBwcm9taXNlID0gdGhpcy5wcm9taXNlc1tyZXBseUlkXTtcblxuICAgICAgICAgICAgaWYgKHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlLnJlc29sdmUocHJvbWlzZS5kYXRhKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5wcm9taXNlc1tyZXBseUlkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRlc3QgYXBwLCBkYXRhIG9yIHZkb21cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyBjb25maWdzIGZvciBOZW8ud29ya2VyLk1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBbdHJhbnNmZXJdIEFuIG9wdGlvbmFsIGFycmF5IG9mIFRyYW5zZmVyYWJsZSBvYmplY3RzIHRvIHRyYW5zZmVyIG93bmVyc2hpcCBvZi5cbiAgICAgKiBJZiB0aGUgb3duZXJzaGlwIG9mIGFuIG9iamVjdCBpcyB0cmFuc2ZlcnJlZCwgaXQgYmVjb21lcyB1bnVzYWJsZSAobmV1dGVyZWQpIGluIHRoZSBjb250ZXh0IGl0IHdhcyBzZW50IGZyb21cbiAgICAgKiBhbmQgYmVjb21lcyBhdmFpbGFibGUgb25seSB0byB0aGUgd29ya2VyIGl0IHdhcyBzZW50IHRvLlxuICAgICAqIEByZXR1cm5zIHtOZW8ud29ya2VyLk1lc3NhZ2V9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBzZW5kTWVzc2FnZShkZXN0LCBvcHRzLCB0cmFuc2Zlcikge1xuICAgICAgICBpZiAoIXRoaXMuc3RvcENvbW11bmljYXRpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IHdvcmtlciA9IHRoaXMuZ2V0V29ya2VyKGRlc3QpO1xuXG4gICAgICAgICAgICBpZiAoIXdvcmtlcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FsbGVkIHNlbmRNZXNzYWdlIGZvciBhIHdvcmtlciB0aGF0IGRvZXMgbm90IGV4aXN0OiAnICsgZGVzdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9wdHMuZGVzdGluYXRpb24gPSBkZXN0O1xuXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gbmV3IE1lc3NhZ2Uob3B0cyk7XG5cbiAgICAgICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZShtZXNzYWdlLCB0cmFuc2Zlcik7XG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRlc3QgYXBwLCBkYXRhIG9yIHZkb21cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyBjb25maWdzIGZvciBOZW8ud29ya2VyLk1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBbdHJhbnNmZXJdIEFuIG9wdGlvbmFsIGFycmF5IG9mIFRyYW5zZmVyYWJsZSBvYmplY3RzIHRvIHRyYW5zZmVyIG93bmVyc2hpcCBvZi5cbiAgICAgKiBJZiB0aGUgb3duZXJzaGlwIG9mIGFuIG9iamVjdCBpcyB0cmFuc2ZlcnJlZCwgaXQgYmVjb21lcyB1bnVzYWJsZSAobmV1dGVyZWQpIGluIHRoZSBjb250ZXh0IGl0IHdhcyBzZW50IGZyb21cbiAgICAgKiBhbmQgYmVjb21lcyBhdmFpbGFibGUgb25seSB0byB0aGUgd29ya2VyIGl0IHdhcyBzZW50IHRvLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAgICovXG4gICAgcHJvbWlzZU1lc3NhZ2UoZGVzdCwgb3B0cywgdHJhbnNmZXIpIHtcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IG1lLnNlbmRNZXNzYWdlKGRlc3QsIG9wdHMsIHRyYW5zZmVyKSxcbiAgICAgICAgICAgICAgICBtc2dJZCAgID0gbWVzc2FnZS5pZDtcblxuICAgICAgICAgICAgbWUucHJvbWlzZXNbbXNnSWRdID0ge1xuICAgICAgICAgICAgICAgIHJlamVjdCA6IHJlamVjdCxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiByZXNvbHZlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKE1hbmFnZXIpO1xuXG5sZXQgaW5zdGFuY2UgPSBOZW8uY3JlYXRlKE1hbmFnZXIpO1xuXG5OZW8uYXBwbHlUb0dsb2JhbE5zKGluc3RhbmNlKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7IiwiaW1wb3J0IElkR2VuZXJhdG9yIGZyb20gJy4uL2NvcmUvSWRHZW5lcmF0b3IubWpzJztcblxuLyoqXG4gKiBBIHdyYXBwZXIgZm9yIHdvcmtlciBwb3N0IG1lc3NhZ2VzIHNlbnQgYmV0d2VlbiB0aGUgQXBwLCBEYXRhLCBWRG9tIHdvcmtlciAmIHRoZSBtYWluIHRocmVhZC5cbiAqIFlvdSBjYW4gYWRkIG9wdGlvbmFsIHBhcmFtcyBhcyBuZWVkZWQuXG4gKiBAY2xhc3MgTmVvLndvcmtlci5NZXNzYWdlXG4gKi9cbmNsYXNzIE1lc3NhZ2Uge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBhY3Rpb25cbiAgICAgICAgICovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gZGVzdGluYXRpb249J21haW4nXG4gICAgICAgICAqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGlkPUlkR2VuZXJhdG9yLmdldElkKE5lby53b3JrZXJJZClcbiAgICAgICAgICovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gb3JpZ2luPU5lby53b3JrZXJJZFxuICAgICAgICAgKi9cblxuICAgICAgICBjb25maWcuZGVzdGluYXRpb24gPSBjb25maWcuZGVzdGluYXRpb24gfHwgJ21haW4nO1xuICAgICAgICBjb25maWcuaWQgICAgICAgICAgPSBjb25maWcuaWQgICAgICAgICAgfHwgSWRHZW5lcmF0b3IuZ2V0SWQoTmVvLndvcmtlcklkKTtcbiAgICAgICAgY29uZmlnLm9yaWdpbiAgICAgID0gY29uZmlnLm9yaWdpbiAgICAgIHx8IE5lby53b3JrZXJJZDtcblxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGNvbmZpZyk7XG4gICAgfVxufVxuXG5jb25zdCBucyA9IE5lby5ucygnTmVvLndvcmtlcicsIHRydWUpO1xubnNbJ01lc3NhZ2UnXSA9IE1lc3NhZ2U7XG5cbmV4cG9ydCB7TWVzc2FnZSBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQmFzZSBmcm9tICcuLi8uLi9jb3JlL0Jhc2UubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgTmVvLndvcmtlci5taXhpbnMuUmVtb3RlTWV0aG9kQWNjZXNzXG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKi9cbmNsYXNzIFJlbW90ZU1ldGhvZEFjY2VzcyBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8ud29ya2VyLm1peGlucy5SZW1vdGVNZXRob2RBY2Nlc3MnXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8ud29ya2VyLm1peGlucy5SZW1vdGVNZXRob2RBY2Nlc3MnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0nbWl4aW4tcmVtb3RlLW1ldGhvZC1hY2Nlc3MnXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ21peGluLXJlbW90ZS1tZXRob2QtYWNjZXNzJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IG1peGluPXRydWVcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIG1peGluOiB0cnVlXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlbW90ZVxuICAgICAqIEBwYXJhbSBtZXRob2RcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb24oKj0sICo9KTogUHJvbWlzZTxhbnk+fVxuICAgICAqL1xuICAgIGdlbmVyYXRlUmVtb3RlKHJlbW90ZSwgbWV0aG9kKSB7XG4gICAgICAgIGxldCBtZSAgICAgPSB0aGlzLFxuICAgICAgICAgICAgb3JpZ2luID0gcmVtb3RlLm9yaWdpbjtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oZGF0YSwgYnVmZmVyKSB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHtcbiAgICAgICAgICAgICAgICBhY3Rpb24gICAgICAgICA6ICdyZW1vdGVNZXRob2QnLFxuICAgICAgICAgICAgICAgIGRhdGEgICAgICAgICAgIDogZGF0YSxcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiAgICA6IG9yaWdpbixcbiAgICAgICAgICAgICAgICByZW1vdGVDbGFzc05hbWU6IHJlbW90ZS5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgcmVtb3RlTWV0aG9kICAgOiBtZXRob2RcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gbWUucHJvbWlzZU1lc3NhZ2Uob3JpZ2luLCBvcHRzLCBidWZmZXIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlbW90ZVxuICAgICAqL1xuICAgIG9uUmVnaXN0ZXJSZW1vdGUocmVtb3RlKSB7XG4gICAgICAgIGlmIChyZW1vdGUuZGVzdGluYXRpb24gPT09IE5lby53b3JrZXJJZCkge1xuICAgICAgICAgICAgbGV0IG1lICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gcmVtb3RlLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICBtZXRob2RzICAgPSByZW1vdGUubWV0aG9kcyxcbiAgICAgICAgICAgICAgICBwa2cgICAgICAgPSBOZW8ubnMoY2xhc3NOYW1lLCB0cnVlKTtcblxuICAgICAgICAgICAgbWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgIGlmIChwa2dbbWV0aG9kXSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0R1cGxpY2F0ZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gJyArIGNsYXNzTmFtZSArICcuJyArIG1ldGhvZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcGtnW21ldGhvZF0gPSBtZS5nZW5lcmF0ZVJlbW90ZShyZW1vdGUsIG1ldGhvZCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKE5lby53b3JrZXJJZCAhPT0gJ21haW4nKSB7XG4gICAgICAgICAgICAgICAgbWUuZmlyZSgncmVtb3RlcmVnaXN0ZXJlZCcsIHJlbW90ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBtc2dcbiAgICAgKi9cbiAgICBvblJlbW90ZU1ldGhvZChtc2cpIHtcbiAgICAgICAgbGV0IG1lICA9IHRoaXMsXG4gICAgICAgICAgICBwa2cgPSBOZW8ubnMobXNnLnJlbW90ZUNsYXNzTmFtZSksXG4gICAgICAgICAgICBvdXQsIG1ldGhvZDtcblxuICAgICAgICBpZiAoIXBrZykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHJlbW90ZSBuYW1lc3BhY2UgXCInICsgbXNnLnJlbW90ZUNsYXNzTmFtZSArICdcIicpO1xuICAgICAgICB9XG5cbiAgICAgICAgbWV0aG9kID0gcGtnW21zZy5yZW1vdGVNZXRob2RdO1xuXG4gICAgICAgIGlmICghbWV0aG9kKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcmVtb3RlIG1ldGhvZCBuYW1lIFwiJyArIG1zZy5yZW1vdGVNZXRob2QgKyAnXCInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG1zZy5kYXRhKSkge1xuICAgICAgICAgICAgb3V0ID0gbWV0aG9kLmNhbGwocGtnLCAuLi5tc2cuZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXQgPSBtZXRob2QuY2FsbChwa2csIG1zZy5kYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvdXQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICBvdXQudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgbWUucmVzb2x2ZShtc2csIGRhdGEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICBtZS5yZWplY3QobXNnLCBlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZS5yZXNvbHZlKG1zZywgb3V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgY2FsbGVkIHdoZW4gcHJvbWlzZU1lc3NhZ2UgZ2V0cyByZWplY3RlZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBtc2dcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIHJlamVjdChtc2csIGRhdGEpIHtcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShtc2cub3JpZ2luLCB7XG4gICAgICAgICAgICBhY3Rpb24gOiAncmVwbHknLFxuICAgICAgICAgICAgZGF0YSAgIDogZGF0YSxcbiAgICAgICAgICAgIHJlamVjdCA6IHRydWUsXG4gICAgICAgICAgICByZXBseUlkOiBtc2cuaWRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBjYWxsZWQgd2hlbiBwcm9taXNlTWVzc2FnZSBnZXRzIHJlc29sdmVkXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG1zZ1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgcmVzb2x2ZShtc2csIGRhdGEpIHtcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShtc2cub3JpZ2luLCB7XG4gICAgICAgICAgICBhY3Rpb24gOiAncmVwbHknLFxuICAgICAgICAgICAgZGF0YSAgIDogZGF0YSxcbiAgICAgICAgICAgIHJlcGx5SWQ6IG1zZy5pZFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKFJlbW90ZU1ldGhvZEFjY2Vzcyk7XG5cbmV4cG9ydCB7UmVtb3RlTWV0aG9kQWNjZXNzIGFzIGRlZmF1bHR9OyJdLCJzb3VyY2VSb290IjoiIn0=