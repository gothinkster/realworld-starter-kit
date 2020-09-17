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
     * In case you are using the GoogleAnalytics mainThreadAddon or useGoogleAnalytics: true,
     * you can change the gtag id here. Required for the online examples (gh pages)
     * @default 'UA-153734404-1'
     * @memberOf! module:Neo
     * @name config.gtagId
     * @type String
     */
    gtagId: 'UA-153734404-1',
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
     * Possible values: AmCharts, AnalyticsByGoogle, HighlightJS, LocalStorage, MapboxGL, Markdown, Siesta, Stylesheet
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
     * Intended for the online examples where we need an easy way to add GA to every generated app
     * @default false
     * @memberOf! module:Neo
     * @name config.useGoogleAnalytics
     * @type Boolean
     */
    useGoogleAnalytics: false,
    /**
     * Creates App, Data & VDom as SharedWorkers.
     * Set this one to true in case you want to connect multiple main threads.
     * @default false
     * @memberOf! module:Neo
     * @name config.useSharedWorkers
     * @type Boolean
     */
    useSharedWorkers: false,
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
         * @protected
         */
        className: 'Neo.Main',
        /**
         * @member {boolean} logAnimationFrames=true
         */
        logAnimationFrames: true,
        /**
         * @member {String} mode='read'
         * @protected
         */
        mode: 'read',
        /**
         * @member {Object} openWindows={}
         * @protected
         */
        openWindows: {},
        /**
         * @member {Array} readQueue=[]
         * @protected
         */
        readQueue: [],
        /**
         * Remote method access for other workers
         * @member {Object} remote={app: [//...]}
         * @protected
         */
        remote: {
            app: [
                'editRoute',
                'getWindowData',
                'setRoute',
                'windowClose',
                'windowOpen'
            ]
        },
        /**
         * @member {Boolean} running=false
         * @protected
         */
        running: false,
        /**
         * @member {Boolean} showFps=false
         */
        showFps: false,
        /**
         * @member {Boolean} singleton=true
         * @protected
         */
        singleton: true,
        /**
         * @member {Number} timeLimit=15
         */
        timeLimit: 15,
        /**
         * should be dev only
         * @member {Number} totalFrameCount=0
         * @protected
         */
        totalFrameCount: 0,
        /**
         * @member {Array} updateQueue=[]
         * @protected
         */
        updateQueue: [],
        /**
         * @member {Array} writeQueue=[]
         * @protected
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
     * window.screen is not spreadable
     * @returns {Object}
     */
    getWindowData() {
        const win    = window,
              screen = win.screen;

        return {
            innerHeight: win.innerHeight,
            innerWidth : win.innerWidth,
            outerHeight: win.outerHeight,
            outerWidth : win.outerWidth,
            screen: {
                availHeight: screen.availHeight,
                availLeft  : screen.availLeft,
                availTop   : screen.availTop,
                availWidth : screen.availWidth,
                colorDepth : screen.colorDepth,
                height     : screen.height,
                orientation: {angle: screen.orientation.angle, type: screen.orientation.type},
                pixelDepth : screen.pixelDepth,
                width      : screen.width
            },
            screenLeft: win.screenLeft,
            screenTop : win.screenTop,
        };
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
            if (addon !== 'AnalyticsByGoogle') {
                imports.push(__webpack_require__("./node_modules/neo.mjs/src/main/addon lazy recursive ^\\.\\/.*\\.mjs$")(`./${addon}.mjs`));
            }
        });

        // intended for the online examples where we need an easy way to add GA to every generated app
        if (_Neo_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].config.mainThreadAddons.includes('AnalyticsByGoogle') || _Neo_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].config.useGoogleAnalytics) {
            // for this use case webpack creates a chunk called "[request]" if not named manually.
            imports.push(__webpack_require__.e(/*! import() | src/main/addon/AnalyticsByGoogle-mjs.js */ "src/main/addon/AnalyticsByGoogle-mjs").then(__webpack_require__.bind(null, /*! ./main/addon/AnalyticsByGoogle.mjs */ "./node_modules/neo.mjs/src/main/addon/AnalyticsByGoogle.mjs")));
        }

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
     * @protected
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
     * @protected
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
     * @protected
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
     * @protected
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
     * @protected
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

    /**
     * Closes popup windows
     * @param {Object} data
     * @param {Array|String} data.names
     */
    windowClose(data) {
        if (!Array.isArray(data.names)) {
            data.names = [data.names];
        }

        data.names.forEach(name => {
            this.openWindows[name].close();
            delete this.openWindows[name];
        })
    }

    /**
     * Open a new popup window
     * @param {Object} data
     * @param {String} data.url
     * @param {String} data.windowFeatures
     * @param {String} data.windowName
     */
    windowOpen(data) {
        this.openWindows[data.windowName] = window.open(data.url, data.windowName, data.windowFeatures);
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
     * @protected
     * @type Object
     */
    ntypeMap: {},
    /**
     * Needed for Neo.create. False for the main thread, true for the App, Data & Vdom worker
     * @memberOf! module:Neo
     * @protected
     * @type Boolean
     */
    insideWorker: typeof DedicatedWorkerGlobalScope !== 'undefined' || typeof WorkerGlobalScope !== 'undefined',

    /**
     * Internally used at the end of each class / module definition
     * @memberOf module:Neo
     * @param {Neo.core.Base} cls The Neo class to apply configs to
     * @protected
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
    clone(obj, deep=false, ignoreNeoInstances=false) {
        let out;

        if (Array.isArray(obj)) {
            return !deep ? [...obj] : [...obj.map(val => Neo.clone(val, deep, ignoreNeoInstances))];
        }

        if (obj !== null && typeof obj === 'object') {
            if (obj.constructor.isClass && obj instanceof Neo.core.Base) {
                return ignoreNeoInstances ? obj : this.cloneNeoInstance(obj);
            } else if(obj.constructor.isClass) {
                return obj;
            } else if (obj instanceof Date) {
                obj = new Date(obj.valueOf());
            } else if (obj instanceof Map) {
                obj = new Map(obj); // shallow copy
            } else {
                out = {};

                Object.entries(obj).forEach(([key, value]) => {
                    out[key] = !deep ? value : Neo.clone(value, deep, ignoreNeoInstances);
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
     * import Button from '../button/Base.mjs';
     *
     * Neo.create(Button, {
     *     iconCls: 'fa fa-home',
     *     text   : 'Home'
     * });
     * @example
     * import Button from '../button/Base.mjs';
     *
     * Neo.create({
     *     module : Button,
     *     iconCls: 'fa fa-home',
     *     text   : 'Home'
     * });
     * @example
     * Neo.create('Neo.button.Base' {
     *     iconCls: 'fa fa-home',
     *     text   : 'Home'
     * });
     * @example
     * Neo.create({
     *     className: 'Neo.button.Base',
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
     * Neo.ns('Neo.button.Base', true);
     * // =>
     * // self.Neo = self.Neo || {};
     * // self.Neo.component = self.Neo.component || {};
     * // self.Neo.button.Base = self.Neo.button.Base || {};
     * // return self.Neo.button.Base;
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
    }
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

                if (typeof me[beforeGet] === 'function') {
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

                if (key !== 'items') {
                    value = Neo.clone(value, true, true);
                }

                // we do want to store the value before the beforeSet modification as well,
                // since it could get pulled by other beforeSet methods of different configs
                me[_key] = value;

                if (typeof me[beforeSet] === 'function') {
                    value = me[beforeSet](value, oldValue);

                    // If they don't return a value, that means no change
                    if (value === undefined) {
                        me[_key] = oldValue;
                        return;
                    }

                    me[_key] = value;
                }

                if (hasChanged(value, oldValue)) {
                    if (typeof me[afterSet] === 'function') {
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
 * Checks if the value of a config has changed
 * todo: we could compare objects & arrays for equality
 * @param {*} value
 * @param {*} oldValue
 * @returns {Boolean}
 * @private
 */
function hasChanged(value, oldValue) {
    if (Array.isArray(value)) {
        return true;
    } else if (Neo.isObject(value)) {
        if (oldValue instanceof Date && value instanceof Date) {
            return oldValue.valueOf() !== value.valueOf();
        }

        return true;
    }

    return oldValue !== value;
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
     * @static
     * @tutorial 02_ClassSystem
     */
    static getStaticConfig() {return {
        /**
         * Set this one to false in case you don't want to stick
         * to the "anti-pattern" to apply classes to the global Neo or App namespace
         * @member {Boolean} registerToGlobalNs=true
         * @protected
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
         * @protected
         */
        className: 'Neo.core.Base',
        /**
         * The class shortcut-name to use for e.g. creating child components inside a JSON-format
         * @member {String} ntype='base'
         * @protected
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
     * @param {Array|String} [staticName=name + 's'] name of the static config array
     * @returns {String|Number} value or oldValue
     */
    beforeSetEnumValue(value, oldValue, name, staticName = name + 's') {
        const values = Array.isArray(staticName) ? staticName : this.getStaticConfig(staticName);

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

        me.id = id || _IdGenerator_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].getId(me.getIdKey());

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
     * Used inside createId() as the default value passed to the IdGenerator.
     * Override this method as needed.
     * @returns {String}
     */
    getIdKey() {
        return this.ntype;
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
     * Does get triggered with a delay to ensure that Neo.workerId & Neo.worker.Manager are defined
     * Remote method access via promises
     */
    initRemote() {
        let me            = this,
            remote        = me.remote,
            className     = me.className,
            currentWorker = Neo.currentWorker,
            listenerId;

        if (!me.singleton) {
            throw new Error('Remote method access only functional for Singleton classes ' + className);
        }

        if (!Neo.config.unitTestMode && Neo.isObject(remote)) {
            if (Neo.workerId !== 'main' && currentWorker.isSharedWorker && !currentWorker.isConnected) {
                listenerId = currentWorker.on('connected', () => {
                    currentWorker.un('connected', listenerId);
                    Base.sendRemotes(className, remote);
                });
            } else {
                Base.sendRemotes(className, remote);
            }
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
     * When using set(), configs without a trailing underscore can already be assigned,
     * so the hasOwnProperty() check will return true
     * @param {Boolean} [forceAssign=false]
     */
    processConfigs(forceAssign=false) {
        let me   = this,
            keys = Object.keys(me[configSymbol]);

        // We do not want to iterate over the keys, since 1 config can remove more than 1 key (beforeSetX, afterSetX)
        if (keys.length > 0) {
            // The hasOwnProperty check is intended for configs without a trailing underscore
            // => they could already got assigned inside an afterSet-method
            if (forceAssign || !me.hasOwnProperty(keys[0])) {
                me[keys[0]] = me[configSymbol][keys[0]];
            }

            // there is a delete call inside the config getter as well (Neo.mjs => autoGenerateGetSet())
            // we need to keep this one for configs, which do not use getters (no trailing underscore)
            delete me[configSymbol][keys[0]];

            me.processConfigs(forceAssign);
        }
    }

    /**
     *
     * @param {String} className
     * @param {Object} remote
     */
    static sendRemotes(className, remote) {
        let origin;

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

        me.processConfigs(true);
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
     * `Neo.create('Neo.button.Base').toString() => "[object Neo.button.Base (neo-button-1)]"`
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
         * @protected
         * @static
         */
        registerToGlobalNs: true
    }}

    static getConfig() {return {
        /**
         * @member {String} className='Neo.core.IdGenerator'
         * @protected
         */
        className: 'Neo.core.IdGenerator',
        /**
         * @member {String} ntype='id-generator'
         * @protected
         */
        ntype: 'id-generator',
        /**
         * The default prefix for neo instance ids
         * @member {String} base='neo-'
         */
        base: 'neo-',
        /**
         * @member {Boolean} singleton='true
         * @protected
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
         * @protected
         */
        className: 'Neo.core.Logger',
        /**
         * @member {String} ntype='logger'
         * @protected
         */
        ntype: 'logger',
        /**
         * Set this config to false to disable the logging
         * @member {boolean} enableLogs=true
         */
        enableLogs: true,
        /**
         * @member {String} level='log'
         * @protected
         */
        level: 'log',
        /**
         * @member {boolean} enableLogs=true
         * @protected
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
     * @protected
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
         * @protected
         */
        className: 'Neo.core.Observable',
        /**
         * @member {String} ntype='mixin-observable'
         * @protected
         */
        ntype: 'mixin-observable',
        /**
         * @member {Boolean} mixin=true
         * @protected
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
            if (Neo.isObject(listeners)) {
                listeners = {...listeners};
            }

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
         * @protected
         * @static
         */
        decamelRegEx: /([a-z])([A-Z])/g
    }}

    static getConfig() {return {
        /**
         * @member {String} className='Neo.core.Util'
         * @protected
         */
        className: 'Neo.core.Util',
        /**
         * @member {String} ntype='core-util'
         * @protected
         */
        ntype: 'core-util',
    }}

    /**
     *
     * @param {Object} scope
     * @param {String[]} values
     */
    static bindMethods(scope, values) {
        values.forEach(value => {
            scope[value] = scope[value].bind(scope);
        });
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
     * Converts a styles object which can use camelcase syntax into a styles string
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
     * Transforms all uppercase characters of a string into lowercase.
     * Does not touch special characters.
     * @param {String} value The input containing uppercase characters
     * @returns {String} The lowercase output
     */
    static decamel(value) {
        return value.replace(Util.decamelRegEx, '$1-$2').toLowerCase();
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

        if (value instanceof Date) {
            return false;
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
    bindMethods      : 'bindMethods',
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
         * @protected
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
         * @protected
         */
        remote: {
            app: [
                'addScript',
                'applyBodyCls',
                'execCommand',
                'focus',
                'getAttributes',
                'getBoundingClientRect',
                'scrollBy',
                'scrollIntoView',
                'scrollTo',
                'scrollToTableRow',
                'selectNode',
                'setBodyCls',
                'setStyle',
                'windowScrollTo'
            ]
        },
        /**
         * @member {Boolean} singleton=true
         * @protected
         */
        singleton: true,
        /**
         * Void attributes inside html tags
         * @member {String[]} voidAttributes
         * @protected
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
     * @returns {HTMLElement}
     * @protected
     */
    getElement(nodeId) {
        return document.getElementById(nodeId);
    }

    /**
     *
     * @param {String} [nodeId='document.body']
     * @returns {HTMLElement}
     * @protected
     */
    getElementOrBody(nodeId='document.body') {
        if (nodeId === 'body' || nodeId === 'document.body') {
            return document.body;
        }

        return this.getElement(nodeId);
    }

    /**
     * Include a script into the document.head
     * @param {String} src
     * @param {Boolean} [async=true]
     * @returns {Promise<unknown>}
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
     * @returns {Promise<unknown>}
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
     * @protected
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
     * @protected
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
     * @param {String} data.direction left, top
     * @param {String} data.id
     * @param {Number} data.value
     * @returns {Object} obj.id => the passed id
     */
    scrollBy(data) {
        let node = this.getElement(data.id);

        if (node) {
            node[`scroll${Neo.capitalize(data.direction)}`] += data.value;
        }

        return {id: data.id};
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.direction left, top
     * @param {String} data.id
     * @param {Number} data.value
     * @returns {Object} obj.id => the passed id
     */
    scrollTo(data) {
        let node = this.getElement(data.id);

        if (node) {
            node[`scroll${Neo.capitalize(data.direction)}`] = data.value;
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
     * @param {Object} data
     * @param {String[]} data.add
     * @param {Object[]} data.remove
     */
    setBodyCls(data) {
        document.body.classList.remove(...data.remove || []);
        document.body.classList.add(...data.add || []);
    }

    /**
     * Not recommended to use => stick to vdom updates.
     * Can be handy for custom CSS based animations though.
     * @param {Object} data
     * @param {String} data.id A node id or 'document.body'
     * @param {Object} data.style
     * @returns {Object} obj.id => the passed id
     */
    setStyle(data) {
        let node = this.getElementOrBody(data.id);

        if (node) {
            Object.entries(data.style).forEach(([key, value]) => {
                if (Neo.isString(value) && value.includes('!important')) {
                    value = value.replace('!important', '').trim();
                    node.style.setProperty(Neo.decamel(key), value, 'important');
                } else {
                    node.style[Neo.decamel(key)] = value;
                }
            });
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
     * @protected
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
    {name: 'dblclick',    handler: 'onDoubleClick'},
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
    'neo-c-m-scrollcontainer',
    'neo-c-w-scrollcontainer',
    'neo-calendar-yearcomponent',
    'neo-circle-component',
    'neo-dateselector',
    'neo-gallery',
    'neo-helix'
];

// separated from globalWheelTargets => performance
// buffer in ms
const globalWheelTargetsBuffer = {
    'neo-c-m-scrollcontainer'   : 100,
    'neo-c-w-scrollcontainer'   : 100,
    'neo-calendar-yearcomponent': 300,
    'neo-dateselector'          : 300
};

// separated from globalWheelTargets => performance
const globalWheelTargetsKeepEvent = [
    'neo-c-m-scrollcontainer',
    'neo-c-w-scrollcontainer'
];

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
         * @protected
         */
        className: 'Neo.main.DomEvents',
        /**
         * todo: conditional dynamic import once the build processes can handle it
         * @member {Array} mixins=[TouchDomEvents]
         */
        mixins: [_mixin_TouchDomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]],
        /**
         * @member {boolean} singleton=true
         * @protected
         */
        singleton: true,
        /**
         * Remote method access for other workers
         * @member {Object} remote={app: ['addDomListener']}
         * @protected
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

        if (Neo.config.useSharedWorkers) {
            window.addEventListener('beforeunload', me.onBeforeUnload.bind(me));
        }
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
     * Returns the distance between two points
     * @param  {Number} x1 The X position of the first point
     * @param  {Number} y1 The Y position of the first point
     * @param  {Number} x2 The X position of the second point
     * @param  {Number} y2 The Y position of the second point
     * @returns {Number}
     */
    getDistance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
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
                    ...me.getEventData(event),
                    id   : target.id,
                    value: target.value
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
                if (!me.dragElementId || me.dragElementId === target.id) {
                    return; // drop fires twice by default & drop should not trigger on the drag element
                }
                if (event.stopPropagation) {
                    event.stopPropagation(); // stops the browser from redirecting.
                }
                event.preventDefault();
                config.data.srcId = me.dragElementId;
                me.dragElementId = null;
                break;
            case 'mousemove':
                Object.assign(config.data, me.getMouseEventData(event));
                break;
            default:
                event.preventDefault();
                break;
        }

        Neo.worker.Manager.sendMessage('app', config);
    }

    getEventData(event) {
        let path = event.path || event.composedPath(); // FF does not support path

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
     * @param {Element} element
     * @returns {Element[]}
     */
    getPathFromElement(element) {
        let path = [];

        if (element) {
            path.push(element);

            while (element.parentNode) {
                path.push(element.parentNode);
                element = element.parentNode;
            }
        }

        return path;
    }

    /**
     *
     * @param {Object} node
     * @returns {Object}
     */
    getTargetData(node) {
        let r    = node.getBoundingClientRect && node.getBoundingClientRect(),
            rect = {};

        if (r) {
            Object.assign(rect, {
                bottom: r.bottom,
                height: r.height,
                left  : r.left,
                right : r.right,
                top   : r.top,
                width : r.width,
                x     : r.x,
                y     : r.y
            });
        }

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
            rect,
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
     * Returns the first touch event found in touches or changedTouches of a TouchEvent
     * @param {TouchEvent} event
     * @returns {Touch}
     */
    getTouchCoords(event) {
        const {touches, changedTouches} = event;
        return (touches && touches[0]) || (changedTouches && changedTouches[0]);
    }

    /**
     * Only in use if Neo.config.useSharedWorkers = true
     * @param {Object} event
     */
    onBeforeUnload(event) {
        const M = Neo.worker.Manager;

        M.broadcast({
            action : 'disconnect',
            appName: M.appName
        });
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
    onDoubleClick(event) {
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
        const Manager    = Neo.worker.Manager,
              hashString = location.hash.substr(1);

        Manager.sendMessage('app', {
            action: 'hashChange',
            data  : {
                appName   : Manager.appName,
                hash      : this.parseHash(hashString),
                hashString: hashString
            }
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
        let target        = this.testPathInclusion(event, globalWheelTargets),
            preventUpdate = false,
            targetCls;

        if (target) {
            targetCls = target.cls;

            if (globalWheelTargetsBuffer[target.cls]) {
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
                    clientHeight: target.node.clientHeight,
                    clientWidth : target.node.clientWidth,
                    deltaX      : deltaX,
                    deltaY      : deltaY,
                    deltaZ      : deltaZ,
                    scrollLeft  : target.node.scrollLeft,
                    scrollTop   : target.node.scrollTop
                });
            }

            if (!globalWheelTargetsKeepEvent.includes(targetCls)) {
                event.preventDefault();
            }
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
     * @protected
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
     * @protected
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
     * @returns {Object|Boolean} target cls & node if found, false otherwise
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
                    return {
                        cls : targetArray[j],
                        node: node
                    };
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
	"./AnalyticsByGoogle.mjs": [
		"./node_modules/neo.mjs/src/main/addon/AnalyticsByGoogle.mjs",
		"src/main/addon/AnalyticsByGoogle-mjs"
	],
	"./DragDrop.mjs": [
		"./node_modules/neo.mjs/src/main/addon/DragDrop.mjs",
		"src/main/addon/DragDrop-mjs"
	],
	"./HighlightJS.mjs": [
		"./node_modules/neo.mjs/src/main/addon/HighlightJS.mjs",
		"src/main/addon/HighlightJS-mjs"
	],
	"./LocalStorage.mjs": [
		"./node_modules/neo.mjs/src/main/addon/LocalStorage.mjs",
		"src/main/addon/LocalStorage-mjs"
	],
	"./MapboxGL.mjs": [
		"./node_modules/neo.mjs/src/main/addon/MapboxGL.mjs",
		"src/main/addon/MapboxGL-mjs"
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
         * @protected
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
     * @param {Object} [delta.attributes]
     * @param {String} [delta.cls]
     * @param {String} [delta.id]
     * @param {String} [delta.innerHTML]
     * @param {String} [delta.outerHTML]
     * @param {Object} [delta.style]
     */
    du_updateNode(delta) {
        let node = this.getElementOrBody(delta.id);

        if (!node) {
            console.warn('du_updateNode: node not found for id', delta.id);
        } else {
            Object.entries(delta).forEach(([prop, value]) => {
                switch(prop) {
                    case 'attributes':
                        Object.entries(value).forEach(([key, val]) => {
                            if (this.voidAttributes.includes(key)) {
                                node[key] = val === 'true'; // vnode attribute values get converted into strings
                            } else if (val === null || val === '') {
                                if (key === 'value') {
                                    node[key] = ''; // input fields => pseudo attribute can not be removed
                                } else {
                                    node.removeAttribute(key);
                                }
                            } else {
                                node[key] = val;
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
                        node.outerHTML = value || '';
                        break;
                    case 'style':
                        if (Neo.isObject(value)) {
                            Object.entries(value).forEach(([key, val]) => {
                                if (Neo.isString(val) && val.includes('!important')) {
                                    val = val.replace('!important', '').trim();
                                    node.style.setProperty(Neo.decamel(key), val, 'important');
                                } else {
                                    node.style[Neo.decamel(key)] = val;
                                }
                            });
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
     * @returns {ChildNode}
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

        if (me.logDeltaUpdates && len > 0) {
            me.countDeltas += (len || 0);
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
             * @protected
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
/* harmony import */ var _mixin_RemoteMethodAccess_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mixin/RemoteMethodAccess.mjs */ "./node_modules/neo.mjs/src/worker/mixin/RemoteMethodAccess.mjs");







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
         * @protected
         */
        className: 'Neo.worker.Manager',
        /**
         * @member {String} ntype='worker-manager'
         * @protected
         */
        ntype: 'worker-manager',
        /**
         * @member {boolean} singleton=true
         * @protected
         */
        singleton: true,
        /**
         * @member {String|null} appName=null
         * @protected
         */
        appName: null,
        /**
         * The base path for the worker file URLs, can e.g. get set inside the index.html.
         * @member {String|null} basePath=Neo.config.workerBasePath || 'worker/'
         * @protected
         */
        basePath: Neo.config.workerBasePath || 'worker/',
        /**
         * @member {Number} constructedThreads=0
         * @protected
         */
        constructedThreads: 0,
        /**
         * @member {String[]|Neo.core.Base[]|null} mixins=[Observable, RemoteMethodAccess]
         */
        mixins: [_core_Observable_mjs__WEBPACK_IMPORTED_MODULE_4__["default"], _mixin_RemoteMethodAccess_mjs__WEBPACK_IMPORTED_MODULE_5__["default"]],
        /**
         * True in case the current browser supports window.SharedWorker.
         * @member {Boolean} sharedWorkersEnabled=false
         * @protected
         */
        sharedWorkersEnabled: false,
        /**
         * Internal flag to stop the worker communication in case their creation fails
         * @member {Boolean} stopCommunication=false
         * @protected
         */
        stopCommunication: false,
        /**
         * True in case the current browser supports window.Worker.
         * The neo.mjs framework is not able to run without web workers.
         * @member {Boolean} sharedWorkersEnabled=false
         * @protected
         */
        webWorkersEnabled: false,
        /**
         * Contains the fileNames for the App, Data & Vdom workers
         * @member {Object} workers
         * @protected
         */
        workers: {
            app: {
                fileName: Neo.config.isExperimental ? 'App.mjs'  : 'appworker.js'
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
     * Sends a message to each worker defined inside the this.workers config.
     * @param msg
     */
    broadcast(msg) {
        Object.keys(this.workers).forEach(name => {
            this.sendMessage(name, msg);
        });
    }

    /**
     * Creates a web worker using the passed options as well as adding error & message event listeners.
     * @param {Object} opts
     * @returns {Worker}
     */
    createWorker(opts) {
        const me       = this,
              filePath = (opts.basePath || me.basePath) + opts.fileName,
              s        = me.sharedWorkersEnabled && Neo.config.useSharedWorkers,
              worker   = !Neo.config.isExperimental  // todo: switch to the new syntax to create a worker from a JS module once browsers are ready
                  ? new (s ? SharedWorker : Worker)(filePath)
                  : new (s ? SharedWorker : Worker)(filePath, {type: 'module'});

        (s ? worker.port : worker).onmessage = me.onWorkerMessage.bind(me);
        (s ? worker.port : worker).onerror   = me.onWorkerError.bind(me);

        return worker;
    }

    /**
     * Calls createWorker for each worker inside the this.workers config.
     */
    createWorkers() {
        let me   = this,
            hash = location.hash,
            key, value;

        // pass the initial hash value as Neo.configs
        if (hash) {
            Neo.config.hash = {
                appName   : me.appName, // null at this point
                hash      : _main_DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].parseHash(hash.substr(1)),
                hashString: hash.substr(1)
            }
        }

        for ([key, value] of Object.entries(me.workers)) {
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
     */
    detectFeatures() {
        const me = this;

        Neo.config.hasTouchEvents = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

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

        // only needed for SharedWorkers
        else if (dest === 'main' && action === 'registerAppName') {
            me.appName = data.appName;
        }

        else if (dest === 'main' && action === 'remoteMethod') {
            me.onRemoteMethod(data);
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
     * @protected
     */
    sendMessage(dest, opts, transfer) {
        const me = this;

        if (!me.stopCommunication) {
            const worker = me.getWorker(dest);

            if (!worker) {
                throw new Error('Called sendMessage for a worker that does not exist: ' + dest);
            }

            opts.destination = dest;

            const message = new _Message_mjs__WEBPACK_IMPORTED_MODULE_3__["default"](opts);

            (me.sharedWorkersEnabled && Neo.config.useSharedWorkers ? worker.port : worker).postMessage(message, transfer);
            return message;
        }
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

/***/ "./node_modules/neo.mjs/src/worker/mixin/RemoteMethodAccess.mjs":
/*!**********************************************************************!*\
  !*** ./node_modules/neo.mjs/src/worker/mixin/RemoteMethodAccess.mjs ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemoteMethodAccess; });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * @class Neo.worker.mixin.RemoteMethodAccess
 * @extends Neo.core.Base
 */
class RemoteMethodAccess extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.worker.mixin.RemoteMethodAccess'
         * @protected
         */
        className: 'Neo.worker.mixin.RemoteMethodAccess',
        /**
         * @member {String} ntype='mixin-remote-method-access'
         * @protected
         */
        ntype: 'mixin-remote-method-access',
        /**
         * @member {Boolean} mixin=true
         * @protected
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

            if (me.isSharedWorker) {
                opts.appName = opts.appName || data && data.appName;
                opts.port    = opts.port    || data && data.port;
            }

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
                exists    = false,
                methods   = remote.methods,
                pkg       = Neo.ns(className, true);

            methods.forEach(function(method) {
                if (remote.origin !== 'main' && pkg[method]) {
                    throw new Error('Duplicate remote method definition ' + className + '.' + method);
                }

                if (!pkg[method] ) {
                    pkg[method] = me.generateRemote(remote, method);
                } else {
                    exists = true;
                }
            });

            if (!exists && Neo.workerId !== 'main') {
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
            out.then(data => {
                me.resolve(msg, data);
            })
            .catch(err => {
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
        let opts = {
            action : 'reply',
            data   : data,
            reject : true,
            replyId: msg.id
        };

        if (this.isSharedWorker) {
            opts.appName = msg.appName;
            opts.port    = msg.port;
        }

        this.sendMessage(msg.origin, opts);
    }

    /**
     * Gets called when promiseMessage gets resolved
     * @param {Object} msg
     * @param {Object} data
     */
    resolve(msg, data) {
        let opts = {
            action : 'reply',
            data   : data,
            replyId: msg.id
        };

        if (this.isSharedWorker) {
            opts.appName = msg.appName;
            opts.port    = msg.port;
        }

        this.sendMessage(msg.origin, opts);
    }
}

Neo.applyClassConfig(RemoteMethodAccess);



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL0RlZmF1bHRDb25maWcubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9NYWluLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvTmVvLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29yZS9CYXNlLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29yZS9JZEdlbmVyYXRvci5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvcmUvTG9nZ2VyLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29yZS9PYnNlcnZhYmxlLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29yZS9VdGlsLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29yZS9fZXhwb3J0Lm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9Eb21BY2Nlc3MubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9tYWluL0RvbUV2ZW50cy5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL21haW4vYWRkb24gbGF6eSBeXFwuXFwvLipcXC5tanMkIHN0cmljdCBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9tYWluL21peGluL0RlbHRhVXBkYXRlcy5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL21haW4vbWl4aW4vVG91Y2hEb21FdmVudHMubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy93b3JrZXIvTWFuYWdlci5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL3dvcmtlci9NZXNzYWdlLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvd29ya2VyL21peGluL1JlbW90ZU1ldGhvZEFjY2Vzcy5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBOzs7UUFHQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7OztRQUlBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTs7O1FBR0E7O1FBRUE7UUFDQSxpQ0FBaUM7O1FBRWpDO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx3QkFBd0Isa0NBQWtDO1FBQzFELE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7O1FBRUE7UUFDQSwwQ0FBMEMsb0JBQW9CLFdBQVc7O1FBRXpFO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsZ0JBQWdCLHVCQUF1QjtRQUN2Qzs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ3JNQTtBQUFBO0FBQUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDekxEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFzQztBQUNTO0FBQ0U7QUFDQTtBQUNBOztBQUVqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHFEQUFTO0FBQzVCLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQSxvQkFBb0IsTUFBTTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU8sU0FBUztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE1BQU07QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsTUFBTTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxRQUFRLDJEQUFTOztBQUVqQixRQUFRLDJEQUFhO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQSxzQkFBc0IsMkRBQVM7QUFDL0I7O0FBRUE7QUFDQSxtQkFBbUIsMkRBQVM7QUFDNUI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsK0RBQStEO0FBQzdGO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsMkRBQVM7O0FBRWpCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxtQkFBbUIsS0FBSyxnREFBRztBQUN2Qzs7QUFFQSxRQUFRLGdEQUFHO0FBQ1g7QUFDQSw2QkFBNkIsNkZBQTBELEdBQWMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUNuSDtBQUNBLFNBQVM7O0FBRVQ7QUFDQSxZQUFZLGdEQUFHLDBEQUEwRCxnREFBRztBQUM1RTtBQUNBLHlCQUF5QixxUUFBOEc7QUFDdkk7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQsUUFBUSwyREFBYTtBQUNyQjtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSwyREFBYTtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixnQkFBZ0IsMkRBQVM7QUFDekIsZ0JBQWdCLDJEQUFhO0FBQzdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLGFBQWE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdEQUFHOztBQUVILGVBQWUsZ0RBQUc7O0FBRWxCLGdEQUFHOztBQUVZLHVFQUFRLEU7Ozs7Ozs7Ozs7OztBQ3padkI7QUFBQTtBQUFBO0FBQWdEOztBQUVoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGNBQWM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnRkFBZ0Y7QUFDaEYsZ0ZBQWdGO0FBQ2hGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLGVBQWUsa0JBQWtCO0FBQ2pDLGVBQWUsY0FBYztBQUM3QixlQUFlLE9BQU87QUFDdEIsZUFBZSxRQUFRO0FBQ3ZCLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGNBQWM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkIsaUJBQWlCLGVBQWU7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsbUNBQW1DO0FBQ25DLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CO0FBQ25CLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsZUFBZSxjQUFjO0FBQzdCLGlCQUFpQixjQUFjO0FBQy9CO0FBQ0E7QUFDQSxzQkFBc0I7O0FBRXRCO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLGVBQWUsNEJBQTRCO0FBQzNDLGVBQWUsT0FBTztBQUN0QixpQkFBaUIsbUJBQW1CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUwsZ0JBQWdCOztBQUVoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxhQUFhO0FBQzVCLGVBQWUsUUFBUTtBQUN2QixlQUFlLE9BQU87QUFDdEIsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxlQUFlLGNBQWM7QUFDN0IsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7O0FBRUEsVUFBVSxRQUFRO0FBQ2xCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSx3Q0FBd0M7QUFDeEM7O0FBRUE7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQztBQUNwQywwQ0FBMEM7QUFDMUM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiLFdBQVcsRUFBRTtBQUNiLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixXQUFXLE9BQU87QUFDbEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsV0FBVyxjQUFjO0FBQ3pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBFQUEwRTtBQUMxRTtBQUNBOztBQUVBOztBQUVBLCtCQUErQiwwREFBYTs7Ozs7Ozs7Ozs7Ozs7QUNscEI1QztBQUFBO0FBQUE7QUFBMkM7O0FBRTNDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw4QkFBOEI7QUFDbEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLGNBQWM7QUFDN0IsZUFBZSxjQUFjO0FBQzdCLGVBQWUsT0FBTztBQUN0QixlQUFlLGFBQWE7QUFDNUIsaUJBQWlCLGNBQWM7QUFDL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBLHNCQUFzQix3REFBVzs7QUFFakM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLFFBQVE7QUFDdkIsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxFQUFFO0FBQ2pCLGlCQUFpQixRQUFRO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0Esa0JBQWtCLGVBQWUsUUFBUSxRQUFRO0FBQ2pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUMvV0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVlLHVFQUFRLEU7Ozs7Ozs7Ozs7OztBQ2xGdkI7QUFBQTtBQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpREFBSTtBQUN6Qix3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRWUsdUVBQVEsRTs7Ozs7Ozs7Ozs7O0FDbkh2QjtBQUFBO0FBQUE7QUFBOEI7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGlEQUFJO0FBQzdCLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsY0FBYztBQUM3QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1QsNEJBQTRCO0FBQzVCLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLFNBQVM7QUFDaEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFFBQVE7O0FBRVI7O0FBRUEsUUFBUTs7QUFFUjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxjQUFjO0FBQzdCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQzlNQTtBQUFBO0FBQThCOztBQUU5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpREFBSTtBQUN2Qiw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQixlQUFlO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQkFBbUI7QUFDbkIscURBQXFEOztBQUVyRDtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLFNBQVMsSUFBSTtBQUNiOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2REFBNkQ7QUFDN0Q7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLG9CQUFvQjtBQUNuQyxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLGNBQWM7QUFDN0IsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFYyxtRUFBSSxFOzs7Ozs7Ozs7Ozs7QUNsUG5CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXFDO0FBQ0U7QUFDSTtBQUNOOzs7Ozs7Ozs7Ozs7OztBQ0hyQztBQUFBO0FBQUE7QUFBQTtBQUE0QztBQUNRO0FBQ0Y7O0FBRWxEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isc0RBQUk7QUFDNUIsd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsTUFBTTtBQUMxQjtBQUNBO0FBQ0EsWUFBWSwrREFBWTtBQUN4QixZQUFZLDREQUFVO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPLFNBQVM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsYUFBYTtBQUM1QixlQUFlLGFBQWE7QUFDNUIsaUJBQWlCLGFBQWE7QUFDOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiLFNBQVM7QUFDVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsYUFBYTtBQUM1QixpQkFBaUIsYUFBYTtBQUM5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDREQUE0RCxPQUFPO0FBQ25FLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLDBEQUEwRCxXQUFXO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsUUFBUTtBQUN2QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGtCQUFrQjtBQUNqRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxTQUFTO0FBQ3hCLGVBQWUsTUFBTTtBQUNyQixlQUFlLFNBQVM7QUFDeEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCLDhCQUE4QjtBQUM5Qiw4QkFBOEI7QUFDOUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsK0JBQStCO0FBQ3pEOztBQUVBLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQiwrQkFBK0I7QUFDekQ7O0FBRUEsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUEsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxTQUFTO0FBQ3hCLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUEsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRWUsdUVBQVEsRTs7Ozs7Ozs7Ozs7O0FDNWlCdkI7QUFBQTtBQUFBO0FBQUE7QUFBOEM7QUFDTTtBQUNJOztBQUV4RDtBQUNBLEtBQUsseUNBQXlDO0FBQzlDLEtBQUssd0NBQXdDO0FBQzdDLEtBQUssOENBQThDO0FBQ25ELEtBQUssOENBQThDO0FBQ25ELEtBQUssMENBQTBDO0FBQy9DLEtBQUssMkNBQTJDO0FBQ2hELEtBQUsseUNBQXlDO0FBQzlDLEtBQUssMENBQTBDO0FBQy9DLEtBQUssd0NBQXdDO0FBQzdDLEtBQUssd0RBQXdELGVBQWU7QUFDNUUsS0FBSyx3REFBd0QsZUFBZTtBQUM1RSxLQUFLLHdEQUF3RDtBQUM3RDs7QUFFQTtBQUNBO0FBQ0EsS0FBSyw4Q0FBOEM7QUFDbkQsS0FBSywyQ0FBMkM7QUFDaEQsS0FBSyw2Q0FBNkM7QUFDbEQsS0FBSyw2Q0FBNkM7QUFDbEQsS0FBSyw0Q0FBNEM7QUFDakQsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isc0RBQUk7QUFDNUIsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE1BQU07QUFDMUI7QUFDQSxpQkFBaUIsaUVBQWM7QUFDL0I7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU8sU0FBUztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLFNBQVM7QUFDdkI7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QixnQkFBZ0IsT0FBTztBQUN2QixnQkFBZ0IsT0FBTztBQUN2QixnQkFBZ0IsT0FBTztBQUN2QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHNEQUFzRDs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLHVEQUF1RDs7QUFFdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsdUdBQXVHOztBQUV0SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxnQkFBZ0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFdBQVc7QUFDMUIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxlQUFlLHdCQUF3QjtBQUN2QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLHVCQUF1Qjs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QjtBQUN2Qjs7QUFFQSxtQkFBbUIsbUJBQW1CO0FBQ3RDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxhQUFhO0FBQzVCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7OztBQUlBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQixlQUFlO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsU0FBUztBQUN2Qjs7QUFFQSxxQkFBcUIsa0JBQWtCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVlLHVFQUFRLEVBQUM7Ozs7Ozs7Ozs7OztBQzlzQnhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQzs7Ozs7Ozs7Ozs7O0FDeERBO0FBQUE7QUFBQTtBQUF1Qzs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHNEQUFJO0FBQy9CLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsY0FBYyxtQkFBbUI7QUFDakMsMERBQTBEO0FBQzFEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVCxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRCw2QkFBNkI7QUFDN0I7QUFDQSxtREFBbUQ7QUFDbkQsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFNBQVM7QUFDekM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGVBQWUsT0FBTztBQUN0QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxnQkFBZ0I7QUFDL0IsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQ3hRQTtBQUFBO0FBQUE7QUFBdUM7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixzREFBSTtBQUNqQztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUNyRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBa0Q7QUFDSztBQUNBO0FBQ1I7QUFDUztBQUNROztBQUVoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixzREFBSTtBQUMxQix3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw4QkFBOEI7QUFDbEQ7QUFDQSxpQkFBaUIsNERBQVUsRUFBRSxxRUFBa0I7QUFDL0M7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsMENBQTBDLElBQUksMkRBQVMsd0JBQXdCLDJEQUFTLENBQUM7QUFDekYsMENBQTBDLElBQUksMkRBQVMsd0JBQXdCLDJEQUFTLENBQUM7QUFDekYsMENBQTBDLHdDQUF3QztBQUNsRiwwQ0FBMEM7QUFDMUMsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELGVBQWU7O0FBRTlFO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QiwyREFBUztBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLGNBQWM7QUFDN0IsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsTUFBTTtBQUNyQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxNQUFNO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsZ0NBQWdDLG9EQUFPOztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVlLHVFQUFRLEU7Ozs7Ozs7Ozs7OztBQ3pZdkI7QUFBQTtBQUFBO0FBQWtEOztBQUVsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCOztBQUVBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7O0FBRUE7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjs7QUFFQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCOztBQUVBO0FBQ0EsbURBQW1ELDZEQUFXO0FBQzlEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUFBO0FBQUE7QUFBdUM7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHNEQUFJO0FBQ3JDLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0fTtcblxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJtYWluXCI6IDBcbiBcdH07XG5cblxuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuIFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvTWFpbi5tanNcIik7XG4iLCJjb25zdCBOZW8gPSBzZWxmLk5lbyB8fCB7fTtcblxuTmVvLmNvbmZpZyA9IE5lby5jb25maWcgfHwge307XG5cbi8qKlxuICogQ29uZmlnIG9iamVjdCBmb3IgdGhlIG5lby5tanMgZnJhbWV3b3JrIHdoaWNoIHdpbGwgZ2V0IHBhc3NlZCB0byBhbGwgd29ya2Vyc1xuICogWW91IGNhbiBjaGFuZ2UgdGhlIGNvbmZpZ3MsIGUuZy4gaW5zaWRlIHRoZSBpbmRleC5odG1sIG9mIHlvdXIgYXBwXG4gKiBAbWVtYmVyT2YgbW9kdWxlOk5lb1xuICogQG5hbWUgY29uZmlnXG4gKiBAdHlwZSBPYmplY3RcbiAqL1xuY29uc3QgRGVmYXVsdENvbmZpZyA9IHtcbiAgICAvKipcbiAgICAgKiB0cnVlIHdpbGwgYXBwbHkgJ25lby1ib2R5JyB0byB0aGUgZG9jdW1lbnQuYm9keSBjbGFzc0xpc3RcbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICogQG1lbWJlck9mISBtb2R1bGU6TmVvXG4gICAgICogQG5hbWUgY29uZmlnLmFwcGx5Qm9keUNsc1xuICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgKi9cbiAgICBhcHBseUJvZHlDbHM6IHRydWUsXG4gICAgLyoqXG4gICAgICogUGF0aCB0byB5b3VyIGFwcC5tanMgZmlsZS4gWW91IGNhbiBjcmVhdGUgbXVsdGlwbGUgYXBwcyB0aGVyZSBpZiBuZWVkZWQuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBtZW1iZXJPZiEgbW9kdWxlOk5lb1xuICAgICAqIEBuYW1lIGNvbmZpZy5hcHBQYXRoXG4gICAgICogQHR5cGUgU3RyaW5nfG51bGxcbiAgICAgKi9cbiAgICBhcHBQYXRoOiBudWxsLFxuICAgIC8qKlxuICAgICAqIFBhdGggdG8gdGhlIG5lby5tanMgZGlyZWN0b3J5XG4gICAgICogQGRlZmF1bHQgJy4vJ1xuICAgICAqIEBtZW1iZXJPZiEgbW9kdWxlOk5lb1xuICAgICAqIEBuYW1lIGNvbmZpZy5iYXNlUGF0aFxuICAgICAqIEB0eXBlIFN0cmluZ1xuICAgICAqL1xuICAgIGJhc2VQYXRoOiAnLi8nLFxuICAgIC8qKlxuICAgICAqIFBhdGggdG8gdGhlIG5lby5tanMgdGhlbWUgY3NzIGZpbGVzXG4gICAgICogU2VlIG1haW4uYWRkb24uU3R5bGVzaGVldCA9PiBjcmVhdGVTdHlsZVNoZWV0KClcbiAgICAgKiBAZGVmYXVsdCBOZW8uY29uZmlnLmJhc2VQYXRoICsgJ2J1aWxkLycgKyBOZW8uY29uZmlnLmVudmlyb25tZW50XG4gICAgICogQG1lbWJlck9mISBtb2R1bGU6TmVvXG4gICAgICogQG5hbWUgW2NvbmZpZy5jc3NQYXRoXVxuICAgICAqIEBvcHRpb25hbFxuICAgICAqIEB0eXBlIFN0cmluZ3xudWxsXG4gICAgICovXG4gICAgY3NzUGF0aDogbnVsbCxcbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBidWlsZCA9PiBkaXN0IGVudmlyb25tZW50LiBWYWxpZCB2YWx1ZXM6ICdkZXZlbG9wbWVudCcsICdwcm9kdWN0aW9uJ1xuICAgICAqIFVzZWQgZm9yIGF1dG9tYXRpY2FsbHkgaW5jbHVkaW5nIHRoZSBtYXRjaGluZyB0aGVtZSBmaWxlc1xuICAgICAqIEBkZWZhdWx0ICdwcm9kdWN0aW9uJ1xuICAgICAqIEBtZW1iZXJPZiEgbW9kdWxlOk5lb1xuICAgICAqIEBuYW1lIGNvbmZpZy5lbnZpcm9ubWVudFxuICAgICAqIEB0eXBlIFN0cmluZ1xuICAgICAqL1xuICAgIGVudmlyb25tZW50OiAncHJvZHVjdGlvbicsXG4gICAgLyoqXG4gICAgICogSW4gY2FzZSB5b3UgYXJlIHVzaW5nIHRoZSBHb29nbGVBbmFseXRpY3MgbWFpblRocmVhZEFkZG9uIG9yIHVzZUdvb2dsZUFuYWx5dGljczogdHJ1ZSxcbiAgICAgKiB5b3UgY2FuIGNoYW5nZSB0aGUgZ3RhZyBpZCBoZXJlLiBSZXF1aXJlZCBmb3IgdGhlIG9ubGluZSBleGFtcGxlcyAoZ2ggcGFnZXMpXG4gICAgICogQGRlZmF1bHQgJ1VBLTE1MzczNDQwNC0xJ1xuICAgICAqIEBtZW1iZXJPZiEgbW9kdWxlOk5lb1xuICAgICAqIEBuYW1lIGNvbmZpZy5ndGFnSWRcbiAgICAgKiBAdHlwZSBTdHJpbmdcbiAgICAgKi9cbiAgICBndGFnSWQ6ICdVQS0xNTM3MzQ0MDQtMScsXG4gICAgLyoqXG4gICAgICogRmxhZyBpZiBOZW8gaXMgcnVubmluZyB3aXRob3V0IGFueSBKUyBidWlsZHNcbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqIEBtZW1iZXJPZiEgbW9kdWxlOk5lb1xuICAgICAqIEBuYW1lIGNvbmZpZy5pc0V4cGVyaW1lbnRhbFxuICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgKi9cbiAgICBpc0V4cGVyaW1lbnRhbDogZmFsc2UsXG4gICAgLyoqXG4gICAgICogRmxhZyBmb3IgcnVubmluZyBvbiBodHRwczovL25lb21qcy5naXRodWIuaW8vcGFnZXMvXG4gICAgICogPT4gdG8gdXNlIGxvY2FsIGltYWdlcyBwYXRocyBpbnN0ZWFkIG9mIHJhdy5naXRodWJ1c2VyY29udGVudC5jb21cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqIEBtZW1iZXJPZiEgbW9kdWxlOk5lb1xuICAgICAqIEBuYW1lIGNvbmZpZy5pc0dpdEh1YlBhZ2VzXG4gICAgICogQHR5cGUgQm9vbGVhblxuICAgICAqL1xuICAgIGlzR2l0SHViUGFnZXM6IGZhbHNlLFxuICAgIC8qKlxuICAgICAqIEZsYWcgZm9yIHJ1bm5pbmcgdGhlIE5lbyBtYWluIHRocmVhZCBpbnNpZGUgYW4gaWZyYW1lIChTaWVzdGEgQnJvd3NlciBIYXJuZXNzKVxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICogQG1lbWJlck9mISBtb2R1bGU6TmVvXG4gICAgICogQG5hbWUgY29uZmlnLmlzSW5zaWRlU2llc3RhXG4gICAgICogQHR5cGUgQm9vbGVhblxuICAgICAqL1xuICAgIGlzSW5zaWRlU2llc3RhOiBmYWxzZSxcbiAgICAvKipcbiAgICAgKiBVc2VkIGJ5IEludGwuRGF0ZVRpbWVGb3JtYXQsIGZvciBkZXRhaWxzIHRha2UgYSBsb29rIGF0OlxuICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0RhdGVUaW1lRm9ybWF0XG4gICAgICogQGRlZmF1bHQgJ2RlZmF1bHQnXG4gICAgICogQG1lbWJlck9mISBtb2R1bGU6TmVvXG4gICAgICogQG5hbWUgY29uZmlnLmxvY2FsZVxuICAgICAqIEB0eXBlIFN0cmluZ1xuICAgICAqL1xuICAgIGxvY2FsZTogJ2RlZmF1bHQnLFxuICAgIC8qKlxuICAgICAqIEFkZCBhZGRvbnMgZm9yIHRoZSBtYWluIHRocmVhZFxuICAgICAqIFBvc3NpYmxlIHZhbHVlczogQW1DaGFydHMsIEFuYWx5dGljc0J5R29vZ2xlLCBIaWdobGlnaHRKUywgTG9jYWxTdG9yYWdlLCBNYXBib3hHTCwgTWFya2Rvd24sIFNpZXN0YSwgU3R5bGVzaGVldFxuICAgICAqIChzcmMvbWFpbi9hZGRvbilcbiAgICAgKiBAZGVmYXVsdCBbJ1N0eWxlc2hlZXQnXVxuICAgICAqIEBtZW1iZXJPZiEgbW9kdWxlOk5lb1xuICAgICAqIEBuYW1lIGNvbmZpZy5tYWluVGhyZWFkQWRkb25zXG4gICAgICogQHR5cGUgU3RyaW5nW11cbiAgICAgKi9cbiAgICBtYWluVGhyZWFkQWRkb25zOiBbJ1N0eWxlc2hlZXQnXSxcbiAgICAvKipcbiAgICAgKiBBZGQgdGhlbWVzIHlvdSB3YW50IHRvIHVzZSBoZXJlLiBUaGUgZmlyc3QgdGhlbWUgd2lsbCBnZXQgYXBwbGllZC5cbiAgICAgKiBJZiBjb25maWcudXNlQ3NzNCA9PT0gdHJ1ZSwgb3RoZXIgdGhlbWUgdmFyaWFibGVzIHdpbGwgZ2V0IGluY2x1ZGVkIGFzIHdlbGxcbiAgICAgKiBAZGVmYXVsdCBbJ25lby10aGVtZS1saWdodCcsICduZW8tdGhlbWUtZGFyayddXG4gICAgICogQG1lbWJlck9mISBtb2R1bGU6TmVvXG4gICAgICogQG5hbWUgY29uZmlnLnRoZW1lc1xuICAgICAqIEB0eXBlIFN0cmluZ1tdXG4gICAgICovXG4gICAgdGhlbWVzOiBbJ25lby10aGVtZS1saWdodCcsICduZW8tdGhlbWUtZGFyayddLFxuICAgIC8qKlxuICAgICAqIEZsYWcgZm9yIHN0YW5kYWxvbmUgU2llc3RhIG1vZHVsZSB0ZXN0cyA9PiBwcmV2ZW50IHJlZ2lzdGVyUmVtb3RlIHdvcmtlciBtZXNzYWdlc1xuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICogQG1lbWJlck9mISBtb2R1bGU6TmVvXG4gICAgICogQG5hbWUgY29uZmlnLnVuaXRUZXN0TW9kZVxuICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgKi9cbiAgICB1bml0VGVzdE1vZGU6IGZhbHNlLFxuICAgIC8qKlxuICAgICAqIEZsYWcgaWYgQ1NTNCBzdHlsZXNoZWV0cyBhcmUgaW4gdXNlIChpbXBvcnRhbnQgZm9yIHN3aXRjaGluZyB0aGVtZXMpXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqIEBtZW1iZXJPZiEgbW9kdWxlOk5lb1xuICAgICAqIEBuYW1lIGNvbmZpZy51c2VDc3M0XG4gICAgICogQHR5cGUgQm9vbGVhblxuICAgICAqL1xuICAgIHVzZUNzczQ6IHRydWUsXG4gICAgLyoqXG4gICAgICogVHJ1ZSB3aWxsIGF1dG9tYXRpY2FsbHkgaW5jbHVkZSB0aGUgc3R5bGVzaGVldFxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKiBAbWVtYmVyT2YhIG1vZHVsZTpOZW9cbiAgICAgKiBAbmFtZSBjb25maWcudXNlRm9udEF3ZXNvbWVcbiAgICAgKiBAdHlwZSBCb29sZWFuXG4gICAgICovXG4gICAgdXNlRm9udEF3ZXNvbWU6IHRydWUsXG4gICAgLyoqXG4gICAgICogSW50ZW5kZWQgZm9yIHRoZSBvbmxpbmUgZXhhbXBsZXMgd2hlcmUgd2UgbmVlZCBhbiBlYXN5IHdheSB0byBhZGQgR0EgdG8gZXZlcnkgZ2VuZXJhdGVkIGFwcFxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICogQG1lbWJlck9mISBtb2R1bGU6TmVvXG4gICAgICogQG5hbWUgY29uZmlnLnVzZUdvb2dsZUFuYWx5dGljc1xuICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgKi9cbiAgICB1c2VHb29nbGVBbmFseXRpY3M6IGZhbHNlLFxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgQXBwLCBEYXRhICYgVkRvbSBhcyBTaGFyZWRXb3JrZXJzLlxuICAgICAqIFNldCB0aGlzIG9uZSB0byB0cnVlIGluIGNhc2UgeW91IHdhbnQgdG8gY29ubmVjdCBtdWx0aXBsZSBtYWluIHRocmVhZHMuXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKiBAbWVtYmVyT2YhIG1vZHVsZTpOZW9cbiAgICAgKiBAbmFtZSBjb25maWcudXNlU2hhcmVkV29ya2Vyc1xuICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgKi9cbiAgICB1c2VTaGFyZWRXb3JrZXJzOiBmYWxzZSxcbiAgICAvKipcbiAgICAgKiBBZGRzIGdsb2JhbCBkb20gZXZlbnQgbGlzdGVuZXJzIGZvciBtb2JpbGUgcmVsYXRlZCBldmVudHMgbGlrZSByb3RhdGUsIHN3aXBlLCB0YXBcbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICogQG1lbWJlck9mISBtb2R1bGU6TmVvXG4gICAgICogQG5hbWUgY29uZmlnLnVzZVRvdWNoRXZlbnRzXG4gICAgICogQHR5cGUgQm9vbGVhblxuICAgICAqL1xuICAgIHVzZVRvdWNoRXZlbnRzOiB0cnVlXG59O1xuXG5PYmplY3QuYXNzaWduKERlZmF1bHRDb25maWcsIHtcbiAgICAvKipcbiAgICAgKiBQYXRoIHRvIHRoZSB0b3AgbGV2ZWwgbmVvLm1qcyByZXNvdXJjZXMgZm9sZGVyXG4gICAgICogQGRlZmF1bHQgTmVvLmNvbmZpZy5iYXNlUGF0aCArICdyZXNvdXJjZXMvJ1xuICAgICAqIEBtZW1iZXJPZiEgbW9kdWxlOk5lb1xuICAgICAqIEBuYW1lIGNvbmZpZy5yZXNvdXJjZXNQYXRoXG4gICAgICogQHR5cGUgU3RyaW5nXG4gICAgICovXG4gICAgcmVzb3VyY2VzUGF0aDogKE5lby5jb25maWcuYmFzZVBhdGggfHwgRGVmYXVsdENvbmZpZy5iYXNlUGF0aCkgKyAncmVzb3VyY2VzLycsXG4gICAgLyoqXG4gICAgICogVGhlIGRlZmF1bHQgYmFzZSBVUkwgZm9yIHdlYiB3b3JrZXIgZW50cnkgcG9pbnRzIChBcHAsIERhdGEsIFZkb20pXG4gICAgICogQGRlZmF1bHQgTmVvLmNvbmZpZy5iYXNlUGF0aCArICdzcmMvd29ya2VyLydcbiAgICAgKiBAbWVtYmVyT2YhIG1vZHVsZTpOZW9cbiAgICAgKiBAbmFtZSBjb25maWcud29ya2VyQmFzZVBhdGhcbiAgICAgKiBAdHlwZSBTdHJpbmdcbiAgICAgKi9cbiAgICB3b3JrZXJCYXNlUGF0aDogKE5lby5jb25maWcuYmFzZVBhdGggfHwgRGVmYXVsdENvbmZpZy5iYXNlUGF0aCkgKyAnc3JjL3dvcmtlci8nXG59KTtcblxuZXhwb3J0IHtEZWZhdWx0Q29uZmlnIGFzIGRlZmF1bHR9OyIsImltcG9ydCBOZW8gICAgICAgICAgIGZyb20gJy4vTmVvLm1qcyc7XG5pbXBvcnQgKiBhcyBjb3JlICAgICBmcm9tICcuL2NvcmUvX2V4cG9ydC5tanMnO1xuaW1wb3J0IERvbUFjY2VzcyAgICAgZnJvbSAnLi9tYWluL0RvbUFjY2Vzcy5tanMnO1xuaW1wb3J0IERvbUV2ZW50cyAgICAgZnJvbSAnLi9tYWluL0RvbUV2ZW50cy5tanMnO1xuaW1wb3J0IFdvcmtlck1hbmFnZXIgZnJvbSAnLi93b3JrZXIvTWFuYWdlci5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8uTWFpblxuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICogQHNpbmdsZXRvblxuICovXG5jbGFzcyBNYWluIGV4dGVuZHMgY29yZS5CYXNlIHtcbiAgICBzdGF0aWMgZ2V0U3RhdGljQ29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcnVlIGF1dG9tYXRpY2FsbHkgYXBwbGllcyB0aGUgY29yZS9PYnNlcnZhYmxlLm1qcyBtaXhpblxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBvYnNlcnZhYmxlPXRydWVcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgb2JzZXJ2YWJsZTogdHJ1ZVxuICAgIH19XG5cbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLk1haW4nXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5NYWluJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge2Jvb2xlYW59IGxvZ0FuaW1hdGlvbkZyYW1lcz10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBsb2dBbmltYXRpb25GcmFtZXM6IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG1vZGU9J3JlYWQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG1vZGU6ICdyZWFkJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gb3BlbldpbmRvd3M9e31cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgb3BlbldpbmRvd3M6IHt9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl9IHJlYWRRdWV1ZT1bXVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICByZWFkUXVldWU6IFtdLFxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3RlIG1ldGhvZCBhY2Nlc3MgZm9yIG90aGVyIHdvcmtlcnNcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSByZW1vdGU9e2FwcDogWy8vLi4uXX1cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3RlOiB7XG4gICAgICAgICAgICBhcHA6IFtcbiAgICAgICAgICAgICAgICAnZWRpdFJvdXRlJyxcbiAgICAgICAgICAgICAgICAnZ2V0V2luZG93RGF0YScsXG4gICAgICAgICAgICAgICAgJ3NldFJvdXRlJyxcbiAgICAgICAgICAgICAgICAnd2luZG93Q2xvc2UnLFxuICAgICAgICAgICAgICAgICd3aW5kb3dPcGVuJ1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gcnVubmluZz1mYWxzZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBydW5uaW5nOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHNob3dGcHM9ZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHNob3dGcHM6IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc2luZ2xldG9uPXRydWVcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc2luZ2xldG9uOiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSB0aW1lTGltaXQ9MTVcbiAgICAgICAgICovXG4gICAgICAgIHRpbWVMaW1pdDogMTUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzaG91bGQgYmUgZGV2IG9ubHlcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSB0b3RhbEZyYW1lQ291bnQ9MFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICB0b3RhbEZyYW1lQ291bnQ6IDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtBcnJheX0gdXBkYXRlUXVldWU9W11cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgdXBkYXRlUXVldWU6IFtdLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl9IHdyaXRlUXVldWU9W11cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgd3JpdGVRdWV1ZTogW11cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBEb21FdmVudHMub24oJ2RvbUNvbnRlbnRMb2FkZWQnLCBtZS5vbkRvbUNvbnRlbnRMb2FkZWQsIG1lKTtcblxuICAgICAgICBXb3JrZXJNYW5hZ2VyLm9uKHtcbiAgICAgICAgICAgICdhdXRvbW91bnQnICAgICAgICA6IG1lLm9uUmVuZGVyLFxuICAgICAgICAgICAgJ21lc3NhZ2U6bW91bnREb20nIDogbWUub25Nb3VudERvbSxcbiAgICAgICAgICAgICdtZXNzYWdlOnVwZGF0ZURvbSc6IG1lLm9uVXBkYXRlRG9tLFxuICAgICAgICAgICAgJ3VwZGF0ZVZkb20nICAgICAgIDogbWUub25VcGRhdGVWZG9tLFxuICAgICAgICAgICAgc2NvcGUgICAgICAgICAgICAgIDogbWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRWRpdCB0aGUgbG9jYXRpb24uaGFzaCB2YWx1ZVxuICAgICAqIEEgdmFsdWUgb2YgbnVsbCB3aWxsIHJlbW92ZSB0aGUgZ2l2ZW4ga2V5LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgZWRpdFJvdXRlKGRhdGEpIHtcbiAgICAgICAgbGV0IGhhc2hPYmogPSBEb21FdmVudHMucGFyc2VIYXNoKHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cigxKSksXG4gICAgICAgICAgICBoYXNoQXJyID0gW107XG5cbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZGF0YSA9IERvbUV2ZW50cy5wYXJzZUhhc2goZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3QuYXNzaWduKGhhc2hPYmosIGRhdGEpO1xuXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGhhc2hPYmopLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaGFzaEFyci5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gaGFzaEFyci5qb2luKCcmJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogd2luZG93LnNjcmVlbiBpcyBub3Qgc3ByZWFkYWJsZVxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0V2luZG93RGF0YSgpIHtcbiAgICAgICAgY29uc3Qgd2luICAgID0gd2luZG93LFxuICAgICAgICAgICAgICBzY3JlZW4gPSB3aW4uc2NyZWVuO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbm5lckhlaWdodDogd2luLmlubmVySGVpZ2h0LFxuICAgICAgICAgICAgaW5uZXJXaWR0aCA6IHdpbi5pbm5lcldpZHRoLFxuICAgICAgICAgICAgb3V0ZXJIZWlnaHQ6IHdpbi5vdXRlckhlaWdodCxcbiAgICAgICAgICAgIG91dGVyV2lkdGggOiB3aW4ub3V0ZXJXaWR0aCxcbiAgICAgICAgICAgIHNjcmVlbjoge1xuICAgICAgICAgICAgICAgIGF2YWlsSGVpZ2h0OiBzY3JlZW4uYXZhaWxIZWlnaHQsXG4gICAgICAgICAgICAgICAgYXZhaWxMZWZ0ICA6IHNjcmVlbi5hdmFpbExlZnQsXG4gICAgICAgICAgICAgICAgYXZhaWxUb3AgICA6IHNjcmVlbi5hdmFpbFRvcCxcbiAgICAgICAgICAgICAgICBhdmFpbFdpZHRoIDogc2NyZWVuLmF2YWlsV2lkdGgsXG4gICAgICAgICAgICAgICAgY29sb3JEZXB0aCA6IHNjcmVlbi5jb2xvckRlcHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodCAgICAgOiBzY3JlZW4uaGVpZ2h0LFxuICAgICAgICAgICAgICAgIG9yaWVudGF0aW9uOiB7YW5nbGU6IHNjcmVlbi5vcmllbnRhdGlvbi5hbmdsZSwgdHlwZTogc2NyZWVuLm9yaWVudGF0aW9uLnR5cGV9LFxuICAgICAgICAgICAgICAgIHBpeGVsRGVwdGggOiBzY3JlZW4ucGl4ZWxEZXB0aCxcbiAgICAgICAgICAgICAgICB3aWR0aCAgICAgIDogc2NyZWVuLndpZHRoXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NyZWVuTGVmdDogd2luLnNjcmVlbkxlZnQsXG4gICAgICAgICAgICBzY3JlZW5Ub3AgOiB3aW4uc2NyZWVuVG9wLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgYXN5bmMgb25Eb21Db250ZW50TG9hZGVkKCkge1xuICAgICAgICBsZXQgbWUgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBpbXBvcnRzID0gW107XG5cbiAgICAgICAgRG9tQWNjZXNzLm9uRG9tQ29udGVudExvYWRlZCgpO1xuXG4gICAgICAgIC8vIG5vdCBpbiB1c2UgcmlnaHQgbm93XG4gICAgICAgIC8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBtZS5nbG9iYWxSZXNpemVMaXN0ZW5lci5iaW5kKG1lKSk7XG5cbiAgICAgICAgLy8gd2UgbmVlZCBkaWZmZXJlbnQgcHVibGljUGF0aCB2YWx1ZXMgZm9yIHRoZSBtYWluIHRocmVhZCBpbnNpZGUgdGhlIHdlYnBhY2sgYmFzZWQgZGlzdCBlbnZzLFxuICAgICAgICAvLyBkZXBlbmRpbmcgb24gdGhlIGhpZXJhcmNoeSBsZXZlbCBvZiB0aGUgYXBwIGVudHJ5IHBvaW50XG4gICAgICAgIGlmICh3aW5kb3cud2VicGFja0pzb25wKSB7XG4gICAgICAgICAgICBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBOZW8uY29uZmlnLmJhc2VQYXRoLnN1YnN0cmluZyg2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIE5lby5jb25maWcubWFpblRocmVhZEFkZG9ucy5mb3JFYWNoKGFkZG9uID0+IHtcbiAgICAgICAgICAgIGlmIChhZGRvbiAhPT0gJ0FuYWx5dGljc0J5R29vZ2xlJykge1xuICAgICAgICAgICAgICAgIGltcG9ydHMucHVzaChpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogJ3NyYy9tYWluL2FkZG9uL1tyZXF1ZXN0XScgKi8gYC4vbWFpbi9hZGRvbi8ke2FkZG9ufS5tanNgKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGludGVuZGVkIGZvciB0aGUgb25saW5lIGV4YW1wbGVzIHdoZXJlIHdlIG5lZWQgYW4gZWFzeSB3YXkgdG8gYWRkIEdBIHRvIGV2ZXJ5IGdlbmVyYXRlZCBhcHBcbiAgICAgICAgaWYgKE5lby5jb25maWcubWFpblRocmVhZEFkZG9ucy5pbmNsdWRlcygnQW5hbHl0aWNzQnlHb29nbGUnKSB8fCBOZW8uY29uZmlnLnVzZUdvb2dsZUFuYWx5dGljcykge1xuICAgICAgICAgICAgLy8gZm9yIHRoaXMgdXNlIGNhc2Ugd2VicGFjayBjcmVhdGVzIGEgY2h1bmsgY2FsbGVkIFwiW3JlcXVlc3RdXCIgaWYgbm90IG5hbWVkIG1hbnVhbGx5LlxuICAgICAgICAgICAgaW1wb3J0cy5wdXNoKGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiAnc3JjL21haW4vYWRkb24vQW5hbHl0aWNzQnlHb29nbGUtbWpzLmpzJyAqLyAnLi9tYWluL2FkZG9uL0FuYWx5dGljc0J5R29vZ2xlLm1qcycpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vZHVsZXMgPSBhd2FpdCBQcm9taXNlLmFsbChpbXBvcnRzKTtcblxuICAgICAgICBtZS5hZGRvbiA9IHt9O1xuXG4gICAgICAgIG1vZHVsZXMuZm9yRWFjaChtb2R1bGUgPT4ge1xuICAgICAgICAgICAgbWUuYWRkb25bbW9kdWxlLmRlZmF1bHQuY29uc3RydWN0b3IubmFtZV0gPSBtb2R1bGUuZGVmYXVsdDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgV29ya2VyTWFuYWdlci5vbldvcmtlckNvbnN0cnVjdGVkKHtcbiAgICAgICAgICAgIG9yaWdpbjogJ21haW4nXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHRvZG86IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0V2ZW50cy9yZXNpemVcbiAgICBnbG9iYWxSZXNpemVMaXN0ZW5lcihldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnZ2xvYmFsUmVzaXplTGlzdGVuZXInLCBldmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqL1xuICAgIG9uTW91bnREb20oZGF0YSkge1xuICAgICAgICB0aGlzLnF1ZXVlV3JpdGUoZGF0YSk7XG5cbiAgICAgICAgV29ya2VyTWFuYWdlci5zZW5kTWVzc2FnZShkYXRhLm9yaWdpbiB8fCAnYXBwJywge1xuICAgICAgICAgICAgYWN0aW9uIDogJ3JlcGx5JyxcbiAgICAgICAgICAgIHJlcGx5SWQ6IGRhdGEuaWQsXG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKi9cbiAgICBvblJlbmRlcihkYXRhKSB7XG4gICAgICAgIGRhdGEuZGF0YS5yZXBseUlkID0gZGF0YS5yZXBseUlkO1xuICAgICAgICB0aGlzLnF1ZXVlV3JpdGUoZGF0YS5kYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICovXG4gICAgb25VcGRhdGVEb20oZGF0YSkge1xuICAgICAgICB0aGlzLnF1ZXVlVXBkYXRlKGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKi9cbiAgICBvblVwZGF0ZVZkb20oZGF0YSkge1xuICAgICAgICBkYXRhLmRhdGEucmVwbHlJZCA9IGRhdGEucmVwbHlJZDtcbiAgICAgICAgdGhpcy5xdWV1ZVVwZGF0ZShkYXRhLmRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHF1ZXVlXG4gICAgICogQHBhcmFtIHN0YXJ0XG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgcHJvY2Vzc1F1ZXVlKHF1ZXVlLCBzdGFydCkge1xuICAgICAgICBsZXQgbWUgICAgPSB0aGlzLFxuICAgICAgICAgICAgbGltaXQgPSBtZS50aW1lTGltaXQsXG4gICAgICAgICAgICBvcGVyYXRpb247XG5cbiAgICAgICAgd2hpbGUgKG9wZXJhdGlvbiA9IHF1ZXVlLnNoaWZ0KCkpIHtcbiAgICAgICAgICAgIGlmIChuZXcgRGF0ZSgpIC0gc3RhcnQgPiBsaW1pdCkge1xuICAgICAgICAgICAgICAgIHF1ZXVlLnVuc2hpZnQob3BlcmF0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1lLnJlbmRlckZyYW1lLmJpbmQobWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgRG9tQWNjZXNzW21lLm1vZGVdKG9wZXJhdGlvbik7XG4gICAgICAgICAgICAgICAgV29ya2VyTWFuYWdlci5yZXNvbHZlRG9tT3BlcmF0aW9uUHJvbWlzZShvcGVyYXRpb24ucmVwbHlJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHF1ZXVlUmVhZChkYXRhKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG4gICAgICAgIG1lLnJlYWRRdWV1ZS5wdXNoKGRhdGEpO1xuXG4gICAgICAgIGlmICghbWUucnVubmluZykge1xuICAgICAgICAgICAgbWUucnVubmluZyA9IHRydWU7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobWUucmVuZGVyRnJhbWUuYmluZChtZSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBxdWV1ZVVwZGF0ZShkYXRhKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG4gICAgICAgIG1lLnVwZGF0ZVF1ZXVlLnB1c2goZGF0YSk7XG5cbiAgICAgICAgaWYgKCFtZS5ydW5uaW5nKSB7XG4gICAgICAgICAgICBtZS5ydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShtZS5yZW5kZXJGcmFtZS5iaW5kKG1lKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHF1ZXVlV3JpdGUoZGF0YSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuICAgICAgICBtZS53cml0ZVF1ZXVlLnB1c2goZGF0YSk7XG5cbiAgICAgICAgaWYgKCFtZS5ydW5uaW5nKSB7XG4gICAgICAgICAgICBtZS5ydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShtZS5yZW5kZXJGcmFtZS5iaW5kKG1lKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyB0aGUgZGlmZmVyZW50IERPTSBvcGVyYXRpb24gcXVldWVzXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHJlbmRlckZyYW1lKCkge1xuICAgICAgICBsZXQgbWUgICAgICA9IHRoaXMsXG4gICAgICAgICAgICByZWFkICAgID0gbWUucmVhZFF1ZXVlLFxuICAgICAgICAgICAgdXBkYXRlICA9IG1lLnVwZGF0ZVF1ZXVlLFxuICAgICAgICAgICAgd3JpdGUgICA9IG1lLndyaXRlUXVldWUsXG4gICAgICAgICAgICByZWFkaW5nID0gbWUubW9kZSA9PT0gJ3JlYWQnLFxuICAgICAgICAgICAgc3RhcnQgICA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgaWYgKG1lLmxvZ0FuaW1hdGlvbkZyYW1lcykge1xuICAgICAgICAgICAgbWUudG90YWxGcmFtZUNvdW50Kys7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVG90YWwgRnJhbWVzOiAnICsgbWUudG90YWxGcmFtZUNvdW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZWFkaW5nIHx8ICF3cml0ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIG1lLm1vZGUgPSAncmVhZCc7XG4gICAgICAgICAgICBpZiAobWUucHJvY2Vzc1F1ZXVlKHJlYWQsIHN0YXJ0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1cGRhdGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBtZS5tb2RlID0gJ3VwZGF0ZSc7XG4gICAgICAgICAgICBpZiAobWUucHJvY2Vzc1F1ZXVlKHVwZGF0ZSwgc3RhcnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdyaXRlLmxlbmd0aCkge1xuICAgICAgICAgICAgbWUubW9kZSA9ICd3cml0ZSc7XG4gICAgICAgICAgICBpZiAobWUucHJvY2Vzc1F1ZXVlKHdyaXRlLCBzdGFydCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBtZS5ydW5uaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hhbmdlIHRoZSBsb2NhdGlvbi5oYXNoIHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS52YWx1ZVxuICAgICAqL1xuICAgIHNldFJvdXRlKGRhdGEpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBkYXRhLnZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsb3NlcyBwb3B1cCB3aW5kb3dzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gZGF0YS5uYW1lc1xuICAgICAqL1xuICAgIHdpbmRvd0Nsb3NlKGRhdGEpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEubmFtZXMpKSB7XG4gICAgICAgICAgICBkYXRhLm5hbWVzID0gW2RhdGEubmFtZXNdO1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0YS5uYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICAgICAgdGhpcy5vcGVuV2luZG93c1tuYW1lXS5jbG9zZSgpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMub3BlbldpbmRvd3NbbmFtZV07XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbiBhIG5ldyBwb3B1cCB3aW5kb3dcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLnVybFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLndpbmRvd0ZlYXR1cmVzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEud2luZG93TmFtZVxuICAgICAqL1xuICAgIHdpbmRvd09wZW4oZGF0YSkge1xuICAgICAgICB0aGlzLm9wZW5XaW5kb3dzW2RhdGEud2luZG93TmFtZV0gPSB3aW5kb3cub3BlbihkYXRhLnVybCwgZGF0YS53aW5kb3dOYW1lLCBkYXRhLndpbmRvd0ZlYXR1cmVzKTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKE1haW4pO1xuXG5sZXQgaW5zdGFuY2UgPSBOZW8uY3JlYXRlKE1haW4pO1xuXG5OZW8uYXBwbHlUb0dsb2JhbE5zKGluc3RhbmNlKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7IiwiaW1wb3J0IERlZmF1bHRDb25maWcgZnJvbSAnLi9EZWZhdWx0Q29uZmlnLm1qcyc7XG5cbmNvbnN0IGNvbmZpZ1N5bWJvbCA9IFN5bWJvbC5mb3IoJ2NvbmZpZ1N5bWJvbCcpLFxuICAgICAgZ2V0U2V0Q2FjaGUgID0gU3ltYm9sKCdnZXRTZXRDYWNoZScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIG1vZHVsZSB0byBlbmhhbmNlIGNsYXNzZXMsIGNyZWF0ZSBpbnN0YW5jZXMgYW5kIHRoZSBOZW8gbmFtZXNwYWNlXG4gKiBAbW9kdWxlIE5lb1xuICogQHNpbmdsZXRvblxuICogQGJvcnJvd3MgTmVvLmNvcmUuVXRpbC5jYXBpdGFsaXplICAgICAgICBhcyBjYXBpdGFsaXplXG4gKiBAYm9ycm93cyBOZW8uY29yZS5VdGlsLmNyZWF0ZVN0eWxlT2JqZWN0IGFzIGNyZWF0ZVN0eWxlT2JqZWN0XG4gKiBAYm9ycm93cyBOZW8uY29yZS5VdGlsLmNyZWF0ZVN0eWxlcyAgICAgIGFzIGNyZWF0ZVN0eWxlc1xuICogQGJvcnJvd3MgTmVvLmNvcmUuVXRpbC5kZWNhbWVsICAgICAgICAgICBhcyBkZWNhbWVsXG4gKiBAYm9ycm93cyBOZW8uY29yZS5VdGlsLmlzQXJyYXkgICAgICAgICAgIGFzIGlzQXJyYXlcbiAqIEBib3Jyb3dzIE5lby5jb3JlLlV0aWwuaXNCb29sZWFuICAgICAgICAgYXMgaXNCb29sZWFuXG4gKiBAYm9ycm93cyBOZW8uY29yZS5VdGlsLmlzRGVmaW5lZCAgICAgICAgIGFzIGlzRGVmaW5lZFxuICogQGJvcnJvd3MgTmVvLmNvcmUuVXRpbC5pc051bWJlciAgICAgICAgICBhcyBpc051bWJlclxuICogQGJvcnJvd3MgTmVvLmNvcmUuVXRpbC5pc09iamVjdCAgICAgICAgICBhcyBpc09iamVjdFxuICogQGJvcnJvd3MgTmVvLmNvcmUuVXRpbC5pc1N0cmluZyAgICAgICAgICBhcyBpc1N0cmluZ1xuICogQGJvcnJvd3MgTmVvLmNvcmUuVXRpbC50b0FycmF5ICAgICAgICAgICBhcyB0b0FycmF5XG4gKiBAdHV0b3JpYWwgMDFfQ29uY2VwdFxuICovXG5sZXQgTmVvID0gc2VsZi5OZW8gfHwge307XG5cbk5lbyA9IHNlbGYuTmVvID0gT2JqZWN0LmFzc2lnbih7XG4gICAgLyoqXG4gICAgICogQSBtYXAgY29udGFpbmluZyBudHlwZXMgYXMga2V5IGFuZCBOZW8gY2xhc3NlcyBvciBzaW5nbGV0b25zIGFzIHZhbHVlc1xuICAgICAqIEBtZW1iZXJPZiEgbW9kdWxlOk5lb1xuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAdHlwZSBPYmplY3RcbiAgICAgKi9cbiAgICBudHlwZU1hcDoge30sXG4gICAgLyoqXG4gICAgICogTmVlZGVkIGZvciBOZW8uY3JlYXRlLiBGYWxzZSBmb3IgdGhlIG1haW4gdGhyZWFkLCB0cnVlIGZvciB0aGUgQXBwLCBEYXRhICYgVmRvbSB3b3JrZXJcbiAgICAgKiBAbWVtYmVyT2YhIG1vZHVsZTpOZW9cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQHR5cGUgQm9vbGVhblxuICAgICAqL1xuICAgIGluc2lkZVdvcmtlcjogdHlwZW9mIERlZGljYXRlZFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09ICd1bmRlZmluZWQnLFxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWxseSB1c2VkIGF0IHRoZSBlbmQgb2YgZWFjaCBjbGFzcyAvIG1vZHVsZSBkZWZpbml0aW9uXG4gICAgICogQG1lbWJlck9mIG1vZHVsZTpOZW9cbiAgICAgKiBAcGFyYW0ge05lby5jb3JlLkJhc2V9IGNscyBUaGUgTmVvIGNsYXNzIHRvIGFwcGx5IGNvbmZpZ3MgdG9cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQHR1dG9yaWFsIDAyX0NsYXNzU3lzdGVtXG4gICAgICovXG4gICAgYXBwbHlDbGFzc0NvbmZpZyhjbHMpIHtcbiAgICAgICAgbGV0IGJhc2VDZmcgICAgICAgPSBudWxsLFxuICAgICAgICAgICAgYmFzZVN0YXRpY0NmZyA9IG51bGwsXG4gICAgICAgICAgICBjb25maWcgICAgICAgID0ge30sXG4gICAgICAgICAgICBwcm90byAgICAgICAgID0gY2xzLnByb3RvdHlwZSB8fCBjbHMsXG4gICAgICAgICAgICBwcm90b3MgICAgICAgID0gW10sXG4gICAgICAgICAgICBzdGF0aWNDb25maWcgID0ge30sXG4gICAgICAgICAgICBjdG9yO1xuXG4gICAgICAgIHdoaWxlIChwcm90by5fX3Byb3RvX18pIHtcbiAgICAgICAgICAgIGN0b3IgPSBwcm90by5jb25zdHJ1Y3RvcjtcblxuICAgICAgICAgICAgaWYgKGN0b3IuaGFzT3duUHJvcGVydHkoJ2NsYXNzQ29uZmlnQXBwbGllZCcpKSB7XG4gICAgICAgICAgICAgICAgYmFzZUNmZyAgICAgICA9IE5lby5jbG9uZShjdG9yLmNvbmZpZywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgYmFzZVN0YXRpY0NmZyA9IE5lby5jbG9uZShjdG9yLnN0YXRpY0NvbmZpZywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByb3Rvcy51bnNoaWZ0KHByb3RvKTtcbiAgICAgICAgICAgIHByb3RvID0gcHJvdG8uX19wcm90b19fO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uZmlnICAgICAgID0gYmFzZUNmZyAgICAgICA/IGJhc2VDZmcgICAgICAgOiBjb25maWc7XG4gICAgICAgIHN0YXRpY0NvbmZpZyA9IGJhc2VTdGF0aWNDZmcgPyBiYXNlU3RhdGljQ2ZnIDogc3RhdGljQ29uZmlnO1xuXG4gICAgICAgIHByb3Rvcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgY3RvciA9IGVsZW1lbnQuY29uc3RydWN0b3I7XG4gICAgICAgICAgICBsZXQgY2ZnICAgICAgID0gY3Rvci5nZXRDb25maWcgICAgICAgJiYgY3Rvci5nZXRDb25maWcoKSAgICAgICB8fCB7fSxcbiAgICAgICAgICAgICAgICBzdGF0aWNDZmcgPSBjdG9yLmdldFN0YXRpY0NvbmZpZyAmJiBjdG9yLmdldFN0YXRpY0NvbmZpZygpIHx8IHt9LFxuICAgICAgICAgICAgICAgIG1peGlucztcblxuICAgICAgICAgICAgaWYgKGNmZykge1xuICAgICAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGNmZykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkuc2xpY2UoLTEpID09PSAnXycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjZmdba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSA9IGtleS5zbGljZSgwLCAtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZmdba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b0dlbmVyYXRlR2V0U2V0KGVsZW1lbnQsIGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IGFwcGx5IHByb3BlcnRpZXMgd2hpY2ggaGF2ZSBubyBzZXR0ZXJzIGluc2lkZSB0aGUgcHJvdG90eXBlIGNoYWluXG4gICAgICAgICAgICAgICAgICAgIC8vIHRob3NlIHdpbGwgZ2V0IGFwcGxpZWQgb24gY3JlYXRlIChOZW8uY29yZS5CYXNlIC0+IGluaXRDb25maWcpXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFoYXNQcm9wZXJ0eVNldHRlcihlbGVtZW50LCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudCwga2V5LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0YWJsZSAgOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGN0b3IsIHN0YXRpY0NmZyk7XG5cbiAgICAgICAgICAgIGlmIChjZmcuaGFzT3duUHJvcGVydHkoJ250eXBlJykpIHtcbiAgICAgICAgICAgICAgICBOZW8ubnR5cGVNYXBbY2ZnLm50eXBlXSA9IGNmZy5jbGFzc05hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1peGlucyA9IGNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgnbWl4aW5zJykgJiYgY29uZmlnLm1peGlucyB8fCBbXTtcblxuICAgICAgICAgICAgaWYgKHN0YXRpY0NmZyAmJiBzdGF0aWNDZmcub2JzZXJ2YWJsZSkge1xuICAgICAgICAgICAgICAgIG1peGlucy5wdXNoKCdOZW8uY29yZS5PYnNlcnZhYmxlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjZmcuaGFzT3duUHJvcGVydHkoJ21peGlucycpICYmIEFycmF5LmlzQXJyYXkoY2ZnLm1peGlucykgJiYgY2ZnLm1peGlucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbWl4aW5zLnB1c2goLi4uY2ZnLm1peGlucyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtaXhpbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgYXBwbHlNaXhpbnMoY3RvciwgbWl4aW5zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVsZXRlIGNmZy5taXhpbnM7XG4gICAgICAgICAgICBkZWxldGUgY29uZmlnLm1peGlucztcblxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjb25maWcsIGNmZyk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHN0YXRpY0NvbmZpZywgc3RhdGljQ2ZnKTtcblxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjdG9yLCB7XG4gICAgICAgICAgICAgICAgY2xhc3NDb25maWdBcHBsaWVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbmZpZyAgICAgICAgICAgIDogTmVvLmNsb25lKGNvbmZpZywgdHJ1ZSksXG4gICAgICAgICAgICAgICAgaXNDbGFzcyAgICAgICAgICAgOiB0cnVlLFxuICAgICAgICAgICAgICAgIHN0YXRpY0NvbmZpZyAgICAgIDogTmVvLmNsb25lKHN0YXRpY0NvbmZpZywgdHJ1ZSlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkZWxldGUgY3Rvci5nZXRDb25maWc7XG4gICAgICAgICAgICBkZWxldGUgY3Rvci5nZXRTdGF0aWNDb25maWc7XG5cbiAgICAgICAgICAgIGlmICghY29uZmlnLnNpbmdsZXRvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlUb0dsb2JhbE5zKGNscyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNYXBzIG1ldGhvZHMgZnJvbSBvbmUgbmFtZXNwYWNlIHRvIGFub3RoZXIgb25lXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBhbGlhc2VzXG4gICAgICogTmVvLmFwcGx5RnJvbU5zKE5lbywgVXRpbCwge1xuICAgICAqICAgICBjcmVhdGVTdHlsZU9iamVjdDogJ2NyZWF0ZVN0eWxlT2JqZWN0JyxcbiAgICAgKiAgICAgY3JlYXRlU3R5bGVzICAgICA6ICdjcmVhdGVTdHlsZXMnLFxuICAgICAqICAgICBjYXBpdGFsaXplICAgICAgIDogJ2NhcGl0YWxpemUnLFxuICAgICAqICAgICBkZWNhbWVsICAgICAgICAgIDogJ2RlY2FtZWwnLFxuICAgICAqICAgICBpc0FycmF5ICAgICAgICAgIDogJ2lzQXJyYXknLFxuICAgICAqICAgICBpc0Jvb2xlYW4gICAgICAgIDogJ2lzQm9vbGVhbicsXG4gICAgICogICAgIGlzRGVmaW5lZCAgICAgICAgOiAnaXNEZWZpbmVkJyxcbiAgICAgKiAgICAgaXNOdW1iZXIgICAgICAgICA6ICdpc051bWJlcicsXG4gICAgICogICAgIGlzT2JqZWN0ICAgICAgICAgOiAnaXNPYmplY3QnLFxuICAgICAqICAgICBpc1N0cmluZyAgICAgICAgIDogJ2lzU3RyaW5nJyxcbiAgICAgKiAgICAgdG9BcnJheSAgICAgICAgICA6ICd0b0FycmF5J1xuICAgICAqIH0sIHRydWUpO1xuICAgICAqXG4gICAgICogLy8gZS5nLiBOZW8uY29yZS5VdGlsLmlzT2JqZWN0ID0+IE5lby5pc09iamVjdFxuICAgICAqIEBtZW1iZXJPZiBtb2R1bGU6TmVvXG4gICAgICogQHBhcmFtIHtOZW98TmVvLmNvcmUuQmFzZX0gdGFyZ2V0IFRoZSB0YXJnZXQgY2xhc3Mgb3Igc2luZ2xldG9uIEluc3RhbmNlIG9yIE5lb1xuICAgICAqIEBwYXJhbSB7TmVvLmNvcmUuQmFzZX0gbmFtZXNwYWNlIFRoZSBjbGFzcyBjb250YWluaW5nIHRoZSBtZXRob2RzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2JpbmRdIHNldCB0aGlzIHRvIHRydWUgaW4gY2FzZSB5b3Ugd2FudCB0byBiaW5kIG1ldGhvZHMgdG8gdGhlIFwiZnJvbVwiIG5hbWVzcGFjZVxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IHRhcmdldFxuICAgICAqL1xuICAgIGFwcGx5RnJvbU5zKHRhcmdldCwgbmFtZXNwYWNlLCBjb25maWcsIGJpbmQpIHtcbiAgICAgICAgbGV0IGZuTmFtZTtcblxuICAgICAgICBpZiAodGFyZ2V0ICYmIGNvbmZpZyAmJiB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMoY29uZmlnKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgICAgICBmbk5hbWUgPSBuYW1lc3BhY2VbdmFsdWVdO1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gYmluZCA/IGZuTmFtZS5iaW5kKG5hbWVzcGFjZSkgOiBmbk5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1hcHMgYSBjbGFzcyB0byB0aGUgZ2xvYmFsIE5lbyBvciBBcHAgbmFtZXNwYWNlLlxuICAgICAqIENhbiBnZXQgY2FsbGVkIGZvciBjbGFzc2VzIGFuZCBzaW5nbGV0b24gaW5zdGFuY2VzXG4gICAgICogQG1lbWJlck9mIG1vZHVsZTpOZW9cbiAgICAgKiBAcGFyYW0ge05lby5jb3JlLkJhc2V9IGNsc1xuICAgICAqL1xuICAgIGFwcGx5VG9HbG9iYWxOcyhjbHMpIHtcbiAgICAgICAgbGV0IHByb3RvID0gdHlwZW9mIGNscyA9PT0gJ2Z1bmN0aW9uJyA/IGNscy5wcm90b3R5cGU6IGNscyxcbiAgICAgICAgICAgIGNsYXNzTmFtZSwgbnNBcnJheSwga2V5LCBucztcblxuICAgICAgICBpZiAocHJvdG8uY29uc3RydWN0b3IucmVnaXN0ZXJUb0dsb2JhbE5zID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgPSBwcm90by5pc0NsYXNzID8gcHJvdG8uY29uZmlnLmNsYXNzTmFtZSA6IHByb3RvLmNsYXNzTmFtZTtcblxuICAgICAgICAgICAgbnNBcnJheSA9IGNsYXNzTmFtZS5zcGxpdCgnLicpO1xuICAgICAgICAgICAga2V5ICAgICA9IG5zQXJyYXkucG9wKCk7XG4gICAgICAgICAgICBucyAgICAgID0gTmVvLm5zKG5zQXJyYXksIHRydWUpO1xuICAgICAgICAgICAgbnNba2V5XSA9IGNscztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDb3BpZXMgYWxsIGtleXMgb2YgZGVmYXVsdHMgaW50byB0YXJnZXQsIGluIGNhc2UgdGhleSBkb24ndCBhbHJlYWR5IGV4aXN0XG4gICAgICogQG1lbWJlck9mIG1vZHVsZTpOZW9cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRzIFRoZSBvYmplY3QgY29udGFpbmluZyB0aGUga2V5cyB5b3Ugd2FudCB0byBjb3B5XG4gICAgICogQHJldHVybnMge09iamVjdH0gdGFyZ2V0XG4gICAgICovXG4gICAgYXNzaWduRGVmYXVsdHModGFyZ2V0LCBkZWZhdWx0cykge1xuICAgICAgICBpZiAodGFyZ2V0ICYmIGRlZmF1bHRzICYmIHR5cGVvZiBkZWZhdWx0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGRlZmF1bHRzKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRhcmdldC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAbWVtYmVyT2YgbW9kdWxlOk5lb1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fCp9IG9ialxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2RlZXA9ZmFsc2VdIFNldCB0aGlzIHRvIHRydWUgaW4gY2FzZSB5b3Ugd2FudCB0byBjbG9uZSBuZXN0ZWQgb2JqZWN0cyBhcyB3ZWxsXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbaWdub3JlTmVvSW5zdGFuY2VzPWZhbHNlXSByZXR1cm5zIGV4aXN0aW5nIGluc3RhbmNlcyBpZiBzZXQgdG8gdHJ1ZVxuICAgICAqIEByZXR1cm5zIHtPYmplY3R8QXJyYXl8Kn0gdGhlIGNsb25lZCBpbnB1dFxuICAgICAqL1xuICAgIGNsb25lKG9iaiwgZGVlcD1mYWxzZSwgaWdub3JlTmVvSW5zdGFuY2VzPWZhbHNlKSB7XG4gICAgICAgIGxldCBvdXQ7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgcmV0dXJuICFkZWVwID8gWy4uLm9ial0gOiBbLi4ub2JqLm1hcCh2YWwgPT4gTmVvLmNsb25lKHZhbCwgZGVlcCwgaWdub3JlTmVvSW5zdGFuY2VzKSldO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKG9iai5jb25zdHJ1Y3Rvci5pc0NsYXNzICYmIG9iaiBpbnN0YW5jZW9mIE5lby5jb3JlLkJhc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWdub3JlTmVvSW5zdGFuY2VzID8gb2JqIDogdGhpcy5jbG9uZU5lb0luc3RhbmNlKG9iaik7XG4gICAgICAgICAgICB9IGVsc2UgaWYob2JqLmNvbnN0cnVjdG9yLmlzQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgb2JqID0gbmV3IERhdGUob2JqLnZhbHVlT2YoKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgICAgIG9iaiA9IG5ldyBNYXAob2JqKTsgLy8gc2hhbGxvdyBjb3B5XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG91dCA9IHt9O1xuXG4gICAgICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMob2JqKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb3V0W2tleV0gPSAhZGVlcCA/IHZhbHVlIDogTmVvLmNsb25lKHZhbHVlLCBkZWVwLCBpZ25vcmVOZW9JbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmo7IC8vIHJldHVybiBhbGwgb3RoZXIgZGF0YSB0eXBlc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIHVzaW5nIHRoZSBvcmlnaW5hbENvbmZpZyB3aXRob3V0IHRoZSBpZFxuICAgICAqIEBtZW1iZXJPZiBtb2R1bGU6TmVvXG4gICAgICogQHBhcmFtIHtOZW8uY29yZS5CYXNlfSBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtOZW8uY29yZS5CYXNlfSB0aGUgY2xvbmVkIGluc3RhbmNlXG4gICAgICovXG4gICAgY2xvbmVOZW9JbnN0YW5jZShpbnN0YW5jZSkge1xuICAgICAgICBsZXQgY29uZmlnID0gey4uLmluc3RhbmNlLm9yaWdpbmFsQ29uZmlnfTtcblxuICAgICAgICBkZWxldGUgY29uZmlnLl9pZDtcbiAgICAgICAgZGVsZXRlIGNvbmZpZy5pZDtcblxuICAgICAgICByZXR1cm4gTmVvLmNyZWF0ZShpbnN0YW5jZS5jbGFzc05hbWUsIGNvbmZpZyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVzZSBOZW8uY3JlYXRlKCkgaW5zdGVhZCBvZiBcIm5ld1wiIHRvIGNyZWF0ZSBpbnN0YW5jZXMgb2YgYWxsIE5lbyBjbGFzc2VzXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBpbXBvcnQgQnV0dG9uIGZyb20gJy4uL2J1dHRvbi9CYXNlLm1qcyc7XG4gICAgICpcbiAgICAgKiBOZW8uY3JlYXRlKEJ1dHRvbiwge1xuICAgICAqICAgICBpY29uQ2xzOiAnZmEgZmEtaG9tZScsXG4gICAgICogICAgIHRleHQgICA6ICdIb21lJ1xuICAgICAqIH0pO1xuICAgICAqIEBleGFtcGxlXG4gICAgICogaW1wb3J0IEJ1dHRvbiBmcm9tICcuLi9idXR0b24vQmFzZS5tanMnO1xuICAgICAqXG4gICAgICogTmVvLmNyZWF0ZSh7XG4gICAgICogICAgIG1vZHVsZSA6IEJ1dHRvbixcbiAgICAgKiAgICAgaWNvbkNsczogJ2ZhIGZhLWhvbWUnLFxuICAgICAqICAgICB0ZXh0ICAgOiAnSG9tZSdcbiAgICAgKiB9KTtcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIE5lby5jcmVhdGUoJ05lby5idXR0b24uQmFzZScge1xuICAgICAqICAgICBpY29uQ2xzOiAnZmEgZmEtaG9tZScsXG4gICAgICogICAgIHRleHQgICA6ICdIb21lJ1xuICAgICAqIH0pO1xuICAgICAqIEBleGFtcGxlXG4gICAgICogTmVvLmNyZWF0ZSh7XG4gICAgICogICAgIGNsYXNzTmFtZTogJ05lby5idXR0b24uQmFzZScsXG4gICAgICogICAgIGljb25DbHMgIDogJ2ZhIGZhLWhvbWUnLFxuICAgICAqICAgICB0ZXh0ICAgICA6ICdIb21lJ1xuICAgICAqIH0pO1xuICAgICAqIEBtZW1iZXJPZiBtb2R1bGU6TmVvXG4gICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fE5lby5jb3JlLkJhc2V9IGNsYXNzTmFtZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnXVxuICAgICAqIEByZXR1cm5zIHtOZW8uY29yZS5CYXNlfG51bGx9IFRoZSBuZXcgY2xhc3MgaW5zdGFuY2VcbiAgICAgKiBAdHV0b3JpYWwgMDJfQ2xhc3NTeXN0ZW1cbiAgICAgKi9cbiAgICBjcmVhdGUoY2xhc3NOYW1lLCBjb25maWcpIHtcbiAgICAgICAgbGV0IGNscywgaW5zdGFuY2U7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjbGFzc05hbWUgPT09ICdmdW5jdGlvbicgJiYgdW5kZWZpbmVkICE9PSBjbGFzc05hbWUuY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgIGNscyA9IGNsYXNzTmFtZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2xhc3NOYW1lID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGNvbmZpZyA9IGNsYXNzTmFtZTtcblxuICAgICAgICAgICAgICAgIGlmICghY29uZmlnLmNsYXNzTmFtZSAmJiAhY29uZmlnLm1vZHVsZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB1c2luZyBjb25zb2xlLmVycm9yIGluc3RlYWQgb2YgdGhyb3cgdG8gc2hvdyB0aGUgY29uZmlnIG9iamVjdFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdDbGFzcyBjcmVhdGVkIHdpdGggb2JqZWN0IGNvbmZpZ3VyYXRpb24gbWlzc2luZyBjbGFzc05hbWUgb3IgbW9kdWxlIHByb3BlcnR5JywgY29uZmlnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gY29uZmlnLmNsYXNzTmFtZSA/IGNvbmZpZy5jbGFzc05hbWUgOiBjb25maWcubW9kdWxlLnByb3RvdHlwZS5jbGFzc05hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZXhpc3RzKGNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NsYXNzICcgKyBjbGFzc05hbWUgKyAnIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNscyA9IE5lby5ucyhjbGFzc05hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5zdGFuY2UgPSBuZXcgY2xzKGNvbmZpZyk7XG5cbiAgICAgICAgaW5zdGFuY2Uub25Db25zdHJ1Y3RlZCgpO1xuICAgICAgICBpbnN0YW5jZS5pbml0KCk7XG5cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH0sXG5cbiAgICBlbXB0eUZuKCkge30sXG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGEgY2xhc3NOYW1lIHN0cmluZyBpbnRvIGEgZ2xvYmFsIG5hbWVzcGFjZVxuICAgICAqIEBleGFtcGxlXG4gICAgICogTmVvLm5zKCdOZW8uYnV0dG9uLkJhc2UnLCB0cnVlKTtcbiAgICAgKiAvLyA9PlxuICAgICAqIC8vIHNlbGYuTmVvID0gc2VsZi5OZW8gfHwge307XG4gICAgICogLy8gc2VsZi5OZW8uY29tcG9uZW50ID0gc2VsZi5OZW8uY29tcG9uZW50IHx8IHt9O1xuICAgICAqIC8vIHNlbGYuTmVvLmJ1dHRvbi5CYXNlID0gc2VsZi5OZW8uYnV0dG9uLkJhc2UgfHwge307XG4gICAgICogLy8gcmV0dXJuIHNlbGYuTmVvLmJ1dHRvbi5CYXNlO1xuICAgICAqXG4gICAgICogQG1lbWJlck9mIG1vZHVsZTpOZW9cbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gbmFtZXMgVGhlIGNsYXNzIG5hbWUgc3RyaW5nIGNvbnRhaW5pbmcgZG90cyBvciBhbiBBcnJheSBvZiB0aGUgc3RyaW5nIHBhcnRzXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbY3JlYXRlXSBTZXQgY3JlYXRlIHRvIHRydWUgdG8gY3JlYXRlIGVtcHR5IG9iamVjdHMgZm9yIG5vbiBleGlzdGluZyBwYXJ0c1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbc2NvcGVdIFNldCBhIGRpZmZlcmVudCBzdGFydGluZyBwb2ludCBhcyBzZWxmXG4gICAgICogQHJldHVybnMge09iamVjdH0gcmVmZXJlbmNlIHRvIHRoZSB0b3BsZXZlbCBuYW1lc3BhY2VcbiAgICAgKi9cbiAgICBucyhuYW1lcywgY3JlYXRlLCBzY29wZSkge1xuICAgICAgICBuYW1lcyA9IEFycmF5LmlzQXJyYXkobmFtZXMpID8gbmFtZXMgOiBuYW1lcy5zcGxpdCgnLicpO1xuXG4gICAgICAgIHJldHVybiBuYW1lcy5yZWR1Y2UoKHByZXYsIGN1cnJlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChjcmVhdGUgJiYgIXByZXZbY3VycmVudF0pIHtcbiAgICAgICAgICAgICAgICBwcmV2W2N1cnJlbnRdID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJldikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2W2N1cnJlbnRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBzY29wZSB8fCBzZWxmKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBpbnN0YW5jZXMgb2YgTmVvIGNsYXNzZXMgdXNpbmcgdGhlaXIgbnR5cGUgaW5zdGVhZCBvZiB0aGUgY2xhc3MgbmFtZVxuICAgICAqIEBleGFtcGxlXG4gICAgICogTmVvLm50eXBlKCdidXR0b24nIHtcbiAgICAgKiAgICAgaWNvbkNsczogJ2ZhIGZhLWhvbWUnLFxuICAgICAqICAgICB0ZXh0ICAgOiAnSG9tZSdcbiAgICAgKiB9KTtcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIE5lby5udHlwZSh7XG4gICAgICogICAgIG50eXBlICA6ICdidXR0b24nLFxuICAgICAqICAgICBpY29uQ2xzOiAnZmEgZmEtaG9tZScsXG4gICAgICogICAgIHRleHQgICA6ICdIb21lJ1xuICAgICAqIH0pO1xuICAgICAqIEBtZW1iZXJPZiBtb2R1bGU6TmVvXG4gICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBudHlwZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnXVxuICAgICAqIEByZXR1cm5zIHtOZW8uY29yZS5CYXNlfVxuICAgICAqIEBzZWUge0BsaW5rIG1vZHVsZTpOZW8uY3JlYXRlIGNyZWF0ZX1cbiAgICAgKi9cbiAgICBudHlwZShudHlwZSwgY29uZmlnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBjb25maWcgPSBudHlwZTtcbiAgICAgICAgICAgIGlmICghY29uZmlnLm50eXBlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDbGFzcyBkZWZpbmVkIHdpdGggb2JqZWN0IGNvbmZpZ3VyYXRpb24gbWlzc2luZyBudHlwZSBwcm9wZXJ0eS4gJyArIGNvbmZpZy5udHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBudHlwZSA9IGNvbmZpZy5udHlwZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjbGFzc05hbWUgPSBOZW8ubnR5cGVNYXBbbnR5cGVdO1xuXG4gICAgICAgIGlmICghY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ250eXBlICcgKyBudHlwZSArICcgZG9lcyBub3QgZXhpc3QnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTmVvLmNyZWF0ZShjbGFzc05hbWUsIGNvbmZpZyk7XG4gICAgfVxufSwgTmVvKTtcblxuLyoqXG4gKiBMaXN0IG9mIGNsYXNzIHByb3BlcnRpZXMgd2hpY2ggYXJlIG5vdCBzdXBwb3NlZCB0byBnZXQgbWl4ZWQgaW50byBvdGhlciBjbGFzc2VzXG4gKiBAdHlwZSB7c3RyaW5nW119XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBpZ25vcmVNaXhpbiA9IFtcbiAgICAnX25hbWUnLFxuICAgICdjbGFzc0NvbmZpZ0FwcGxpZWQnLFxuICAgICdjbGFzc05hbWUnLFxuICAgICdjb25zdHJ1Y3RvcicsXG4gICAgJ2lzQ2xhc3MnLFxuICAgICdtaXhpbicsXG4gICAgJ250eXBlJyxcbiAgICAnb2JzZXJ2YWJsZScsXG4gICAgJ3JlZ2lzdGVyVG9HbG9iYWxOcydcbl07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7TmVvLmNvcmUuQmFzZX0gY2xzXG4gKiBAcGFyYW0ge0FycmF5fSBtaXhpbnNcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGFwcGx5TWl4aW5zKGNscywgbWl4aW5zKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG1peGlucykpIHtcbiAgICAgICAgbWl4aW5zID0gW21peGluc107XG4gICAgfVxuXG4gICAgbGV0IGkgICAgICAgICAgICA9IDAsXG4gICAgICAgIGxlbiAgICAgICAgICA9IG1peGlucy5sZW5ndGgsXG4gICAgICAgIG1peGluQ2xhc3NlcyA9IHt9LFxuICAgICAgICBtaXhpbiwgbWl4aW5DbHMsIG1peGluUHJvdG87XG5cbiAgICBmb3IgKDtpIDwgbGVuO2krKykge1xuICAgICAgICBtaXhpbiA9IG1peGluc1tpXTtcblxuICAgICAgICBpZiAobWl4aW4uaXNDbGFzcykge1xuICAgICAgICAgICAgbWl4aW5Qcm90byA9IG1peGluLnByb3RvdHlwZTtcbiAgICAgICAgICAgIG1peGluQ2xzICAgPSBOZW8ubnMobWl4aW5Qcm90by5jbGFzc05hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFleGlzdHMobWl4aW4pKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdHRlbXB0aW5nIHRvIG1peGluIGFuIHVuZGVmaW5lZCBjbGFzczogJyArIG1peGluICsgJywgJyArIGNscy5wcm90b3R5cGUuY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1peGluQ2xzICAgPSBOZW8ubnMobWl4aW4pO1xuICAgICAgICAgICAgbWl4aW5Qcm90byA9IG1peGluQ2xzLnByb3RvdHlwZTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1peGluUHJvdG8uY2xhc3NOYW1lLnNwbGl0KCcuJykucmVkdWNlKG1peFJlZHVjZShtaXhpbkNscyksIG1peGluQ2xhc3Nlcyk7XG5cbiAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobWl4aW5Qcm90bykuZm9yRWFjaChtaXhpblByb3BlcnR5KGNscy5wcm90b3R5cGUsIG1peGluUHJvdG8pKTtcbiAgICB9XG5cbiAgICBjbHMucHJvdG90eXBlLm1peGlucyA9IG1peGluQ2xhc3NlczsgLy8gdG9kbzogd2Ugc2hvdWxkIGRvIGEgZGVlcCBtZXJnZVxufVxuXG4vKipcbiAqIENyZWF0ZXMgZ2V0IC8gc2V0IG1ldGhvZHMgZm9yIGNsYXNzIGNvbmZpZ3MgZW5kaW5nIHdpdGggYW4gdW5kZXJzY29yZVxuICogQHBhcmFtIHtOZW8uY29yZS5CYXNlfSBwcm90b1xuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHByaXZhdGVcbiAqIEB0dXRvcmlhbCAwMl9DbGFzc1N5c3RlbVxuICovXG5mdW5jdGlvbiBhdXRvR2VuZXJhdGVHZXRTZXQocHJvdG8sIGtleSkge1xuICAgIGlmIChoYXNQcm9wZXJ0eVNldHRlcihwcm90bywga2V5KSkge1xuICAgICAgICB0aHJvdygnQ29uZmlnICcgKyBrZXkgKyAnXyAoJyArIHByb3RvLmNsYXNzTmFtZSArICcpIGFscmVhZHkgaGFzIGEgc2V0IG1ldGhvZCwgdXNlIGJlZm9yZUdldCwgYmVmb3JlU2V0ICYgYWZ0ZXJTZXQgaW5zdGVhZCcpO1xuICAgIH1cblxuICAgIGlmICghTmVvW2dldFNldENhY2hlXSkge1xuICAgICAgICBOZW9bZ2V0U2V0Q2FjaGVdID0ge307XG4gICAgfVxuXG4gICAgaWYgKCFOZW9bZ2V0U2V0Q2FjaGVdW2tleV0pIHtcbiAgICAgICAgTmVvW2dldFNldENhY2hlXVtrZXldID0ge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIGxldCBtZSAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgICAgICAgICBiZWZvcmVHZXQgPSAnYmVmb3JlR2V0JyArIE5lby5jYXBpdGFsaXplKGtleSksXG4gICAgICAgICAgICAgICAgICAgIGhhc05ld0tleSA9IG1lW2NvbmZpZ1N5bWJvbF0uaGFzT3duUHJvcGVydHkoa2V5KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3S2V5ICAgID0gbWVbY29uZmlnU3ltYm9sXVtrZXldLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgPSBoYXNOZXdLZXkgPyBuZXdLZXkgOiBtZVsnXycgKyBrZXldO1xuXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgIT09ICdpdGVtcycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gWy4uLnZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gbmV3IERhdGUodmFsdWUudmFsdWVPZigpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaGFzTmV3S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIG1lW2tleV0gPSB2YWx1ZTsgLy8gd2UgZG8gd2FudCB0byB0cmlnZ2VyIHRoZSBzZXR0ZXIgPT4gYmVmb3JlU2V0LCBhZnRlclNldFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IG1lWydfJyArIGtleV07IC8vIHJldHVybiB0aGUgdmFsdWUgcGFyc2VkIGJ5IHRoZSBzZXR0ZXJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lW2JlZm9yZUdldF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBtZVtiZWZvcmVHZXRdKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgbWUgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgX2tleSAgICAgID0gJ18nICsga2V5LFxuICAgICAgICAgICAgICAgICAgICB1S2V5ICAgICAgPSBOZW8uY2FwaXRhbGl6ZShrZXkpLFxuICAgICAgICAgICAgICAgICAgICBiZWZvcmVTZXQgPSAnYmVmb3JlU2V0JyArIHVLZXksXG4gICAgICAgICAgICAgICAgICAgIGFmdGVyU2V0ICA9ICdhZnRlclNldCcgICsgdUtleSxcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWUgID0gbWVbX2tleV07XG5cbiAgICAgICAgICAgICAgICAvLyBldmVyeSBzZXQgY2FsbCBoYXMgdG8gZGVsZXRlIHRoZSBtYXRjaGluZyBzeW1ib2xcbiAgICAgICAgICAgICAgICBkZWxldGUgbWVbY29uZmlnU3ltYm9sXVtrZXldO1xuXG4gICAgICAgICAgICAgICAgaWYgKGtleSAhPT0gJ2l0ZW1zJykge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IE5lby5jbG9uZSh2YWx1ZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gd2UgZG8gd2FudCB0byBzdG9yZSB0aGUgdmFsdWUgYmVmb3JlIHRoZSBiZWZvcmVTZXQgbW9kaWZpY2F0aW9uIGFzIHdlbGwsXG4gICAgICAgICAgICAgICAgLy8gc2luY2UgaXQgY291bGQgZ2V0IHB1bGxlZCBieSBvdGhlciBiZWZvcmVTZXQgbWV0aG9kcyBvZiBkaWZmZXJlbnQgY29uZmlnc1xuICAgICAgICAgICAgICAgIG1lW19rZXldID0gdmFsdWU7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lW2JlZm9yZVNldF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBtZVtiZWZvcmVTZXRdKHZhbHVlLCBvbGRWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhleSBkb24ndCByZXR1cm4gYSB2YWx1ZSwgdGhhdCBtZWFucyBubyBjaGFuZ2VcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lW19rZXldID0gb2xkVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBtZVtfa2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChoYXNDaGFuZ2VkKHZhbHVlLCBvbGRWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZVthZnRlclNldF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lW2FmdGVyU2V0XSh2YWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywga2V5LCBOZW9bZ2V0U2V0Q2FjaGVdW2tleV0pO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgY2xhc3MgbmFtZSBleGlzdHMgaW5zaWRlIHRoZSBOZW8gb3IgYXBwIG5hbWVzcGFjZVxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZVxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBleGlzdHMoY2xhc3NOYW1lKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuICEhY2xhc3NOYW1lLnNwbGl0KCcuJykucmVkdWNlKChwcmV2LCBjdXJyZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcHJldltjdXJyZW50XTtcbiAgICAgICAgfSwgc2VsZik7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSB2YWx1ZSBvZiBhIGNvbmZpZyBoYXMgY2hhbmdlZFxuICogdG9kbzogd2UgY291bGQgY29tcGFyZSBvYmplY3RzICYgYXJyYXlzIGZvciBlcXVhbGl0eVxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHBhcmFtIHsqfSBvbGRWYWx1ZVxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBoYXNDaGFuZ2VkKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKE5lby5pc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlIGluc3RhbmNlb2YgRGF0ZSAmJiB2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBvbGRWYWx1ZS52YWx1ZU9mKCkgIT09IHZhbHVlLnZhbHVlT2YoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBvbGRWYWx1ZSAhPT0gdmFsdWU7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZXJlIGlzIGEgc2V0IG1ldGhvZCBmb3IgYSBnaXZlbiBwcm9wZXJ0eSBrZXkgaW5zaWRlIHRoZSBwcm90b3R5cGUgY2hhaW5cbiAqIEBwYXJhbSB7TmVvLmNvcmUuQmFzZX0gcHJvdG8gVGhlIHRvcCBsZXZlbCBwcm90b3R5cGUgb2YgYSBjbGFzc1xuICogQHBhcmFtIHtTdHJpbmd9IGtleSB0aGUgcHJvcGVydHkga2V5IHRvIHRlc3RcbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaGFzUHJvcGVydHlTZXR0ZXIocHJvdG8sIGtleSkge1xuICAgIGxldCBkZXNjcmlwdG9yO1xuXG4gICAgd2hpbGUgKHByb3RvLl9fcHJvdG9fXykge1xuICAgICAgICBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90bywga2V5KTtcblxuICAgICAgICBpZiAodHlwZW9mIGRlc2NyaXB0b3IgPT09ICdvYmplY3QnICYmIHR5cGVvZiBkZXNjcmlwdG9yLnNldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdG8gPSBwcm90by5fX3Byb3RvX187XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge05lby5jb3JlLkJhc2V9IHByb3RvXG4gKiBAcGFyYW0ge05lby5jb3JlLkJhc2V9IG1peGluUHJvdG9cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1peGluUHJvcGVydHkocHJvdG8sIG1peGluUHJvdG8pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIGlmICh+aWdub3JlTWl4aW4uaW5kZXhPZihrZXkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3RvW2tleV0gJiYgcHJvdG9ba2V5XS5fZnJvbSkge1xuICAgICAgICAgICAgaWYgKG1peGluUHJvdG8uY2xhc3NOYW1lID09PSBwcm90b1trZXldLl9mcm9tKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdNaXhpbiBzZXQgbXVsdGlwbGUgdGltZXMgb3IgYWxyZWFkeSBkZWZpbmVkIG9uIGEgQmFzZSBDbGFzcycsIHByb3RvLmNsYXNzTmFtZSwgbWl4aW5Qcm90by5jbGFzc05hbWUsIGtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIHByb3RvLmNsYXNzTmFtZSArICc6IE11bHRpcGxlIG1peGlucyBkZWZpbmluZyBzYW1lIHByb3BlcnR5ICgnICtcbiAgICAgICAgICAgICAgICBtaXhpblByb3RvLmNsYXNzTmFtZSArICcsICcgK1xuICAgICAgICAgICAgICAgIHByb3RvW2tleV0uX2Zyb20gKyAnKSA9PiAnICtcbiAgICAgICAgICAgICAgICBrZXlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90b1trZXldID0gbWl4aW5Qcm90b1trZXldO1xuXG4gICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG8sIGtleSkuX2Zyb20gPSBtaXhpblByb3RvLmNsYXNzTmFtZTtcblxuICAgICAgICBpZiAodHlwZW9mIHByb3RvW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHByb3RvW2tleV0uX25hbWUgPSBrZXk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0gbWl4aW5DbHNcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1peFJlZHVjZShtaXhpbkNscykge1xuICAgIHJldHVybiAocHJldiwgY3VycmVudCwgaWR4LCBhcnIpID0+IHtcbiAgICAgICAgcmV0dXJuIHByZXZbY3VycmVudF0gPSBpZHggIT09IGFyci5sZW5ndGggLTEgPyBwcmV2W2N1cnJlbnRdIHx8IHt9IDogbWl4aW5DbHM7XG4gICAgfTtcbn1cblxuTmVvLmNvbmZpZyA9IE5lby5jb25maWcgfHwge307XG5cbk5lby5hc3NpZ25EZWZhdWx0cyhOZW8uY29uZmlnLCBEZWZhdWx0Q29uZmlnKTtcblxuZXhwb3J0IHtOZW8gYXMgZGVmYXVsdH07IiwiaW1wb3J0IElkR2VuZXJhdG9yIGZyb20gJy4vSWRHZW5lcmF0b3IubWpzJ1xuXG5jb25zdCBjb25maWdTeW1ib2wgPSBTeW1ib2wuZm9yKCdjb25maWdTeW1ib2wnKSxcbiAgICAgIGlzSW5zdGFuY2UgICA9IFN5bWJvbCgnaXNJbnN0YW5jZScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGNsYXNzIGZvciAoYWxtb3N0KSBhbGwgY2xhc3NlcyBpbnNpZGUgdGhlIE5lbyBuYW1lc3BhY2VcbiAqIEV4Y2VwdGlvbnMgYXJlIGUuZy4gY29yZS5JZEdlbmVyYXRvciwgdmRvbS5WTm9kZVxuICogQGNsYXNzIE5lby5jb3JlLkJhc2VcbiAqL1xuY2xhc3MgQmFzZSB7XG4gICAgLyoqXG4gICAgICogVGhlIHJldHVybiB2YWx1ZSB3aWxsIGdldCBhcHBsaWVkIHRvIHRoZSBjbGFzcyBjb25zdHJ1Y3RvclxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IHN0YXRpY0NvbmZpZ1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAdHV0b3JpYWwgMDJfQ2xhc3NTeXN0ZW1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0U3RhdGljQ29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgdGhpcyBvbmUgdG8gZmFsc2UgaW4gY2FzZSB5b3UgZG9uJ3Qgd2FudCB0byBzdGlja1xuICAgICAgICAgKiB0byB0aGUgXCJhbnRpLXBhdHRlcm5cIiB0byBhcHBseSBjbGFzc2VzIHRvIHRoZSBnbG9iYWwgTmVvIG9yIEFwcCBuYW1lc3BhY2VcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gcmVnaXN0ZXJUb0dsb2JhbE5zPXRydWVcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICByZWdpc3RlclRvR2xvYmFsTnM6IHRydWVcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogVGhlIHJldHVybiB2YWx1ZSB3aWxsIGdldCBhcHBsaWVkIHRvIGVhY2ggY2xhc3MgaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzdGF0aWNDb25maWdcbiAgICAgKiBAdHV0b3JpYWwgMDJfQ2xhc3NTeXN0ZW1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgY2xhc3MgbmFtZSB3aGljaCB3aWxsIGdldCBtYXBwZWQgaW50byB0aGUgTmVvIG9yIGFwcCBuYW1lc3BhY2VcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5jb3JlLkJhc2UnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5jb3JlLkJhc2UnLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGNsYXNzIHNob3J0Y3V0LW5hbWUgdG8gdXNlIGZvciBlLmcuIGNyZWF0aW5nIGNoaWxkIGNvbXBvbmVudHMgaW5zaWRlIGEgSlNPTi1mb3JtYXRcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0nYmFzZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICdiYXNlJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBtaXhpbnMgYXMgYW4gYXJyYXkgb2YgY2xhc3NOYW1lcywgaW1wb3J0ZWQgbW9kdWxlcyBvciBhIG1peGVkIHZlcnNpb25cbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW118TmVvLmNvcmUuQmFzZVtdfG51bGx9IG1peGlucz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBtaXhpbnM6IG51bGxcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogQ29uc3VtZXMgdGhlIHN0YXRpYyBnZXRDb25maWcoKSBvYmplY3RcbiAgICAgKiBBcHBsaWVzIHRoZSBvYnNlcnZhYmxlIG1peGluIGlmIG5lZWRlZCwgZ3JhbnRzIHJlbW90ZSBhY2Nlc3MgaWYgbmVlZGVkXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBjb25maWcgPSBjb25maWcgfHwge307XG5cbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhtZSwge1xuICAgICAgICAgICAgW2NvbmZpZ1N5bWJvbF06IHtcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZSAgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICA6IHt9LFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlICAgIDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtpc0luc3RhbmNlXToge1xuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHZhbHVlICAgICA6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUuY3JlYXRlSWQoY29uZmlnLmlkIHx8IG1lLmlkKTtcbiAgICAgICAgZGVsZXRlIGNvbmZpZy5pZDtcblxuICAgICAgICBpZiAobWUuY29uc3RydWN0b3IuY29uZmlnKSB7XG4gICAgICAgICAgICBkZWxldGUgbWUuY29uc3RydWN0b3IuY29uZmlnLmlkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1lLmdldFN0YXRpY0NvbmZpZygnb2JzZXJ2YWJsZScpIHx8IG1lLm1peGlucyAmJiBOZW8ubnMoJ05lby5jb3JlLk9ic2VydmFibGUnLCBtZS5taXhpbnMpKSB7XG4gICAgICAgICAgICBtZS5pbml0T2JzZXJ2YWJsZShjb25maWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgbWUuaW5pdENvbmZpZyhjb25maWcpO1xuXG4gICAgICAgIGlmIChtZS5jb250cm9sbGVyKSB7XG4gICAgICAgICAgICBtZS5jb250cm9sbGVyLnBhcnNlQ29uZmlnKCk7XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobWUsICdjb25maWdzQXBwbGllZCcsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWUgICAgIDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobWUucmVtb3RlKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KG1lLmluaXRSZW1vdGUuYmluZChtZSksIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0cmlnZ2VyZWQgYWZ0ZXIgYWxsIGNvbnN0cnVjdG9ycyBhcmUgZG9uZVxuICAgICAqIEB0dXRvcmlhbCAwMl9DbGFzc1N5c3RlbVxuICAgICAqL1xuICAgIG9uQ29uc3RydWN0ZWQoKSB7fVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0cmlnZ2VyZWQgYWZ0ZXIgb25Db25zdHJ1Y3RlZCBpcyBkb25lXG4gICAgICogQHNlZSB7QGxpbmsgTmVvLmNvcmUuQmFzZSNvbkNvbnN0cnVjdGVkIG9uQ29uc3RydWN0ZWR9XG4gICAgICogQHR1dG9yaWFsIDAyX0NsYXNzU3lzdGVtXG4gICAgICovXG4gICAgaW5pdCgpIHt9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZW5pZW5jZSBtZXRob2QgZm9yIGJlZm9yZVNldCBmdW5jdGlvbnMgd2hpY2ggdGVzdCBpZiBhIGdpdmVuIHZhbHVlIGlzIGluc2lkZSBhIHN0YXRpYyBhcnJheVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IG9sZFZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgY29uZmlnIG5hbWVcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gW3N0YXRpY05hbWU9bmFtZSArICdzJ10gbmFtZSBvZiB0aGUgc3RhdGljIGNvbmZpZyBhcnJheVxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd8TnVtYmVyfSB2YWx1ZSBvciBvbGRWYWx1ZVxuICAgICAqL1xuICAgIGJlZm9yZVNldEVudW1WYWx1ZSh2YWx1ZSwgb2xkVmFsdWUsIG5hbWUsIHN0YXRpY05hbWUgPSBuYW1lICsgJ3MnKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IEFycmF5LmlzQXJyYXkoc3RhdGljTmFtZSkgPyBzdGF0aWNOYW1lIDogdGhpcy5nZXRTdGF0aWNDb25maWcoc3RhdGljTmFtZSk7XG5cbiAgICAgICAgaWYgKCF2YWx1ZXMuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgICAgICBOZW8ubG9nRXJyb3IoJ1N1cHBvcnRlZCB2YWx1ZXMgZm9yICcgKyBuYW1lICsgJyBhcmU6JywgdmFsdWVzLmpvaW4oJywgJyksIHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIG9sZFZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZXMgdGhlIElkR2VuZXJhdG9yIHRvIGNyZWF0ZSBhbiBpZCBpZiBhIHN0YXRpYyBvbmUgaXMgbm90IGV4cGxpY2l0bHkgc2V0LlxuICAgICAqIFJlZ2lzdGVycyB0aGUgaW5zdGFuY2UgdG8gbWFuYWdlci5JbnN0YW5jZSBpZiB0aGlzIG9uZSBpcyBhbHJlYWR5IGNyZWF0ZWQsXG4gICAgICogb3RoZXJ3aXNlIHN0b3JlcyBpdCBpbnNpZGUgYSB0bXAgbWFwLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqL1xuICAgIGNyZWF0ZUlkKGlkKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgbWUuaWQgPSBpZCB8fCBJZEdlbmVyYXRvci5nZXRJZChtZS5nZXRJZEtleSgpKTtcblxuICAgICAgICBpZiAoQmFzZS5pbnN0YW5jZU1hbmFnZXJBdmFpbGFibGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIE5lby5tYW5hZ2VyLkluc3RhbmNlLnJlZ2lzdGVyKG1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghTmVvLmlkTWFwKSB7XG4gICAgICAgICAgICAgICAgTmVvLmlkTWFwID0ge307XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE5lby5pZE1hcFttZS5pZF0gPSBtZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVucmVnaXN0ZXJzIHRoaXMgaW5zdGFuY2UgZnJvbSBOZW8ubWFuYWdlci5JbnN0YW5jZVxuICAgICAqIGFuZCByZW1vdmVzIGFsbCBvYmplY3QgZW50cmllcyBmcm9tIHRoaXMgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChCYXNlLmluc3RhbmNlTWFuYWdlckF2YWlsYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgTmVvLm1hbmFnZXIuSW5zdGFuY2UudW5yZWdpc3RlcihtZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoTmVvLmlkTWFwKSB7XG4gICAgICAgICAgICBkZWxldGUgTmVvLmlkTWFwW21lLmlkXTtcbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5rZXlzKG1lKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtZSwga2V5KS53cml0YWJsZSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBtZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGluc2lkZSBjcmVhdGVJZCgpIGFzIHRoZSBkZWZhdWx0IHZhbHVlIHBhc3NlZCB0byB0aGUgSWRHZW5lcmF0b3IuXG4gICAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgYXMgbmVlZGVkLlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICovXG4gICAgZ2V0SWRLZXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm50eXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIGEgc3RhdGljIGNvbmZpZyBrZXkgb3IgdGhlIHN0YXRpY0NvbmZpZyBvYmplY3QgaXRzZWxmIGluIGNhc2Ugbm8gdmFsdWUgaXMgc2V0XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtrZXldIFRoZSBrZXkgb2YgYSBzdGF0aWNDb25maWcgZGVmaW5lZCBpbnNpZGUgc3RhdGljIGdldFN0YXRpY0NvbmZpZ1xuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGdldFN0YXRpY0NvbmZpZyhrZXkpIHtcbiAgICAgICAgbGV0IGNmZyA9IHRoaXMuY29uc3RydWN0b3Iuc3RhdGljQ29uZmlnO1xuICAgICAgICByZXR1cm4gKGtleSA/IGNmZ1trZXldIDogY2ZnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIGFsbCBjbGFzcyBjb25maWdzIHRvIHRoaXMgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbcHJldmVudE9yaWdpbmFsQ29uZmlnXSBUcnVlIHByZXZlbnRzIHRoZSBpbnN0YW5jZSBmcm9tIGdldHRpbmcgYW4gb3JpZ2luYWxDb25maWcgcHJvcGVydHlcbiAgICAgKi9cbiAgICBpbml0Q29uZmlnKGNvbmZpZywgcHJldmVudE9yaWdpbmFsQ29uZmlnKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbihtZVtjb25maWdTeW1ib2xdLCBtZS5tZXJnZUNvbmZpZyhjb25maWcsIHByZXZlbnRPcmlnaW5hbENvbmZpZykpO1xuICAgICAgICBtZS5wcm9jZXNzQ29uZmlncygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvZXMgZ2V0IHRyaWdnZXJlZCB3aXRoIGEgZGVsYXkgdG8gZW5zdXJlIHRoYXQgTmVvLndvcmtlcklkICYgTmVvLndvcmtlci5NYW5hZ2VyIGFyZSBkZWZpbmVkXG4gICAgICogUmVtb3RlIG1ldGhvZCBhY2Nlc3MgdmlhIHByb21pc2VzXG4gICAgICovXG4gICAgaW5pdFJlbW90ZSgpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgcmVtb3RlICAgICAgICA9IG1lLnJlbW90ZSxcbiAgICAgICAgICAgIGNsYXNzTmFtZSAgICAgPSBtZS5jbGFzc05hbWUsXG4gICAgICAgICAgICBjdXJyZW50V29ya2VyID0gTmVvLmN1cnJlbnRXb3JrZXIsXG4gICAgICAgICAgICBsaXN0ZW5lcklkO1xuXG4gICAgICAgIGlmICghbWUuc2luZ2xldG9uKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlbW90ZSBtZXRob2QgYWNjZXNzIG9ubHkgZnVuY3Rpb25hbCBmb3IgU2luZ2xldG9uIGNsYXNzZXMgJyArIGNsYXNzTmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIU5lby5jb25maWcudW5pdFRlc3RNb2RlICYmIE5lby5pc09iamVjdChyZW1vdGUpKSB7XG4gICAgICAgICAgICBpZiAoTmVvLndvcmtlcklkICE9PSAnbWFpbicgJiYgY3VycmVudFdvcmtlci5pc1NoYXJlZFdvcmtlciAmJiAhY3VycmVudFdvcmtlci5pc0Nvbm5lY3RlZCkge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVySWQgPSBjdXJyZW50V29ya2VyLm9uKCdjb25uZWN0ZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRXb3JrZXIudW4oJ2Nvbm5lY3RlZCcsIGxpc3RlbmVySWQpO1xuICAgICAgICAgICAgICAgICAgICBCYXNlLnNlbmRSZW1vdGVzKGNsYXNzTmFtZSwgcmVtb3RlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgQmFzZS5zZW5kUmVtb3RlcyhjbGFzc05hbWUsIHJlbW90ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCB0byBjaGFuZ2UgdGhlIG9yZGVyIGNvbmZpZ3MgYXJlIGFwcGxpZWQgdG8gdGhpcyBpbnN0YW5jZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbcHJldmVudE9yaWdpbmFsQ29uZmlnXSBUcnVlIHByZXZlbnRzIHRoZSBpbnN0YW5jZSBmcm9tIGdldHRpbmcgYW4gb3JpZ2luYWxDb25maWcgcHJvcGVydHlcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBtZXJnZUNvbmZpZyhjb25maWcsIHByZXZlbnRPcmlnaW5hbENvbmZpZykge1xuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICBjdG9yID0gbWUuY29uc3RydWN0b3I7XG5cbiAgICAgICAgaWYgKCFjdG9yLmNvbmZpZykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZW8uYXBwbHlDbGFzc0NvbmZpZyBoYXMgbm90IGJlZW4gcnVuIG9uICcgKyBtZS5jbGFzc05hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFwcmV2ZW50T3JpZ2luYWxDb25maWcpIHtcbiAgICAgICAgICAgIG1lLm9yaWdpbmFsQ29uZmlnID0gTmVvLmNsb25lKGNvbmZpZywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gey4uLmN0b3IuY29uZmlnLCAuLi5jb25maWd9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gdXNpbmcgc2V0KCksIGNvbmZpZ3Mgd2l0aG91dCBhIHRyYWlsaW5nIHVuZGVyc2NvcmUgY2FuIGFscmVhZHkgYmUgYXNzaWduZWQsXG4gICAgICogc28gdGhlIGhhc093blByb3BlcnR5KCkgY2hlY2sgd2lsbCByZXR1cm4gdHJ1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZvcmNlQXNzaWduPWZhbHNlXVxuICAgICAqL1xuICAgIHByb2Nlc3NDb25maWdzKGZvcmNlQXNzaWduPWZhbHNlKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIGtleXMgPSBPYmplY3Qua2V5cyhtZVtjb25maWdTeW1ib2xdKTtcblxuICAgICAgICAvLyBXZSBkbyBub3Qgd2FudCB0byBpdGVyYXRlIG92ZXIgdGhlIGtleXMsIHNpbmNlIDEgY29uZmlnIGNhbiByZW1vdmUgbW9yZSB0aGFuIDEga2V5IChiZWZvcmVTZXRYLCBhZnRlclNldFgpXG4gICAgICAgIGlmIChrZXlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIFRoZSBoYXNPd25Qcm9wZXJ0eSBjaGVjayBpcyBpbnRlbmRlZCBmb3IgY29uZmlncyB3aXRob3V0IGEgdHJhaWxpbmcgdW5kZXJzY29yZVxuICAgICAgICAgICAgLy8gPT4gdGhleSBjb3VsZCBhbHJlYWR5IGdvdCBhc3NpZ25lZCBpbnNpZGUgYW4gYWZ0ZXJTZXQtbWV0aG9kXG4gICAgICAgICAgICBpZiAoZm9yY2VBc3NpZ24gfHwgIW1lLmhhc093blByb3BlcnR5KGtleXNbMF0pKSB7XG4gICAgICAgICAgICAgICAgbWVba2V5c1swXV0gPSBtZVtjb25maWdTeW1ib2xdW2tleXNbMF1dO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB0aGVyZSBpcyBhIGRlbGV0ZSBjYWxsIGluc2lkZSB0aGUgY29uZmlnIGdldHRlciBhcyB3ZWxsIChOZW8ubWpzID0+IGF1dG9HZW5lcmF0ZUdldFNldCgpKVxuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byBrZWVwIHRoaXMgb25lIGZvciBjb25maWdzLCB3aGljaCBkbyBub3QgdXNlIGdldHRlcnMgKG5vIHRyYWlsaW5nIHVuZGVyc2NvcmUpXG4gICAgICAgICAgICBkZWxldGUgbWVbY29uZmlnU3ltYm9sXVtrZXlzWzBdXTtcblxuICAgICAgICAgICAgbWUucHJvY2Vzc0NvbmZpZ3MoZm9yY2VBc3NpZ24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlbW90ZVxuICAgICAqL1xuICAgIHN0YXRpYyBzZW5kUmVtb3RlcyhjbGFzc05hbWUsIHJlbW90ZSkge1xuICAgICAgICBsZXQgb3JpZ2luO1xuXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHJlbW90ZSkuZm9yRWFjaCgoW3dvcmtlciwgbWV0aG9kc10pID0+IHtcbiAgICAgICAgICAgIGlmIChOZW8ud29ya2VySWQgIT09IHdvcmtlcikge1xuICAgICAgICAgICAgICAgIG9yaWdpbiA9IE5lby53b3JrZXJJZCA9PT0gJ21haW4nID8gTmVvLndvcmtlci5NYW5hZ2VyIDogTmVvLmN1cnJlbnRXb3JrZXI7XG5cbiAgICAgICAgICAgICAgICBvcmlnaW4uc2VuZE1lc3NhZ2Uod29ya2VyLCB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbiAgIDogJ3JlZ2lzdGVyUmVtb3RlJyxcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kcyAgOiBtZXRob2RzLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGFuZ2UgbXVsdGlwbGUgY29uZmlncyBhdCBvbmNlLCBlbnN1cmluZyB0aGF0IGFsbCBhZnRlclNldCBtZXRob2RzIGdldCBhbGwgbmV3IGFzc2lnbmVkIHZhbHVlc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZXM9e31cbiAgICAgKi9cbiAgICBzZXQodmFsdWVzPXt9KSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgLy8gaW5zdGVhZCBvZiB1c2luZzpcbiAgICAgICAgLy8gbWVbY29uZmlnU3ltYm9sXSA9IHZhbHVlcztcbiAgICAgICAgLy8gd2Uga2VlcCB0aGUgT2JqZWN0IGluc3RhbmNlIChkZWZpbmVkIHZpYSBPYmplY3QuZGVmaW5lUHJvcGVydGllcygpID0+IG5vbiBlbnVtZXJhYmxlKVxuXG4gICAgICAgIE9iamVjdC5rZXlzKG1lW2NvbmZpZ1N5bWJvbF0pLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZSBtZVtjb25maWdTeW1ib2xdW2tleV07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24obWVbY29uZmlnU3ltYm9sXSwgdmFsdWVzKTtcblxuICAgICAgICBtZS5wcm9jZXNzQ29uZmlncyh0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB2YWx1ZSBvZiBhIHN0YXRpYyBjb25maWcgYnkgYSBnaXZlbiBrZXlcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IFRoZSBrZXkgb2YgYSBzdGF0aWNDb25maWcgZGVmaW5lZCBpbnNpZGUgc3RhdGljIGdldFN0YXRpY0NvbmZpZ1xuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBpbiBjYXNlIHRoZSBjb25maWcgZXhpc3RzIGFuZCBnb3QgY2hhbmdlZFxuICAgICAqL1xuICAgIHNldFN0YXRpY0NvbmZpZyhrZXksIHZhbHVlKSB7XG4gICAgICAgIGxldCBzdGF0aWNDb25maWcgPSB0aGlzLmNvbnN0cnVjdG9yLnN0YXRpY0NvbmZpZztcblxuICAgICAgICBpZiAoc3RhdGljQ29uZmlnLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIHN0YXRpY0NvbmZpZ1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiA8cD5FbmhhbmNpbmcgdGhlIHRvU3RyaW5nKCkgbWV0aG9kLCBlLmcuPC9wPlxuICAgICAqIGBOZW8uY3JlYXRlKCdOZW8uYnV0dG9uLkJhc2UnKS50b1N0cmluZygpID0+IFwiW29iamVjdCBOZW8uYnV0dG9uLkJhc2UgKG5lby1idXR0b24tMSldXCJgXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmNsYXNzTmFtZX0gKGlkOiAke3RoaXMuaWR9KWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogPHA+RW5oYW5jaW5nIHRoZSBpbnN0YW5jZW9mIG1ldGhvZC4gV2l0aG91dCB0aGlzIGNoYW5nZTo8L3A+XG4gICAgICogYE5lby5jb2xsZWN0aW9uLkJhc2UucHJvdG90eXBlIGluc3RhbmNlb2YgTmVvLmNvcmUuQmFzZSA9PiB0cnVlYFxuICAgICAqIDxwPldpdGggdGhpcyBjaGFuZ2U6PC9wPlxuICAgICAqIGBOZW8uY29sbGVjdGlvbi5CYXNlLnByb3RvdHlwZSBpbnN0YW5jZW9mIE5lby5jb3JlLkJhc2UgPT4gZmFsc2VgPGJyPlxuICAgICAqIGBOZW8uY3JlYXRlKE5lby5jb2xsZWN0aW9uLkJhc2UpIGluc3RhbmNlb2YgTmVvLmNvcmUuQmFzZSA9PiB0cnVlYFxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBbU3ltYm9sLmhhc0luc3RhbmNlXShpbnN0YW5jZSkge1xuICAgICAgICBpZiAoIWluc3RhbmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5zdGFuY2VbaXNJbnN0YW5jZV0gPT09IHRydWUgPyBzdXBlcltTeW1ib2wuaGFzSW5zdGFuY2VdKGluc3RhbmNlKSA6IGZhbHNlO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoQmFzZSk7XG5cbkJhc2UuaW5zdGFuY2VNYW5hZ2VyQXZhaWxhYmxlID0gZmFsc2U7XG5cbmV4cG9ydCB7QmFzZSBhcyBkZWZhdWx0fTsiLCIvKipcbiAqIFRoaXMgY2xhc3MgZ2V0cyB1c2VkIGJ5IGNvcmUuQmFzZSwgc28gaXQgY2FuIG5vdCBleHRlbmQgaXQuXG4gKiBJdCBjb3VsZCBnZXQgc2ltcGxpZmllZCB0byBqdXN0IGJlaW5nIGFuIG9iamVjdCAobmVlZHMgdG8gbWFudWFsbHkgZ2V0IHB1dCBpbnRvIHRoZSBOZW8gbmFtZXNwYWNlIGluIHRoaXMgY2FzZSkuXG4gKiBAY2xhc3MgTmVvLmNvcmUuSWRHZW5lcmF0b3JcbiAqIEBzaW5nbGV0b25cbiAqL1xuY2xhc3MgSWRHZW5lcmF0b3Ige1xuICAgIHN0YXRpYyBnZXRTdGF0aWNDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCB0aGlzIG9uZSB0byBmYWxzZSBpbiBjYXNlIHlvdSBkb24ndCB3YW50IHRvIHN0aWNrXG4gICAgICAgICAqIHRvIHRoZSBcImFudGktcGF0dGVyblwiIHRvIGFwcGx5IGNsYXNzZXMgdG8gdGhlIGdsb2JhbCBOZW8gb3IgQXBwIG5hbWVzcGFjZVxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSByZWdpc3RlclRvR2xvYmFsTnM9dHJ1ZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIHJlZ2lzdGVyVG9HbG9iYWxOczogdHJ1ZVxuICAgIH19XG5cbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLmNvcmUuSWRHZW5lcmF0b3InXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5jb3JlLklkR2VuZXJhdG9yJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J2lkLWdlbmVyYXRvcidcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICdpZC1nZW5lcmF0b3InLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGRlZmF1bHQgcHJlZml4IGZvciBuZW8gaW5zdGFuY2UgaWRzXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gYmFzZT0nbmVvLSdcbiAgICAgICAgICovXG4gICAgICAgIGJhc2U6ICduZW8tJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHNpbmdsZXRvbj0ndHJ1ZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBzaW5nbGV0b246IHRydWVcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgbWUuaWRDb3VudGVyID0ge307XG5cbiAgICAgICAgLy8gYWxpYXNcbiAgICAgICAgTmVvLmdldElkID0gbWUuZ2V0SWQuYmluZChtZSk7XG4gICAgfVxuXG4gICAgb25Db25zdHJ1Y3RlZCgpIHt9XG5cbiAgICBpbml0KCkge31cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldElkKG5hbWUpIHtcbiAgICAgICAgbmFtZSA9IG5hbWUgfHwgJ25lbyc7XG5cbiAgICAgICAgbGV0IG1lICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgY291bnRlciA9IG1lLmlkQ291bnRlcixcbiAgICAgICAgICAgIGNvdW50ICAgPSBjb3VudGVyW25hbWVdIHx8IDA7XG5cbiAgICAgICAgY291bnRlcltuYW1lXSA9ICsrY291bnQ7XG5cbiAgICAgICAgcmV0dXJuIG1lLmJhc2UgKyAobmFtZSA9PT0gJ25lbycgPyAnJyA6IG5hbWUgKyAnLScpICsgY291bnQ7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhJZEdlbmVyYXRvcik7XG5cbmxldCBpbnN0YW5jZSA9IE5lby5jcmVhdGUoSWRHZW5lcmF0b3IpO1xuXG5OZW8uYXBwbHlUb0dsb2JhbE5zKGluc3RhbmNlKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7IiwiaW1wb3J0IEJhc2UgZnJvbSAnLi9CYXNlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby5jb3JlLkxvZ2dlclxuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICogQHNpbmdsZXRvblxuICovXG5jbGFzcyBMb2dnZXIgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLmNvcmUuTG9nZ2VyJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uY29yZS5Mb2dnZXInLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0nbG9nZ2VyJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ2xvZ2dlcicsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgdGhpcyBjb25maWcgdG8gZmFsc2UgdG8gZGlzYWJsZSB0aGUgbG9nZ2luZ1xuICAgICAgICAgKiBAbWVtYmVyIHtib29sZWFufSBlbmFibGVMb2dzPXRydWVcbiAgICAgICAgICovXG4gICAgICAgIGVuYWJsZUxvZ3M6IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGxldmVsPSdsb2cnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGxldmVsOiAnbG9nJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge2Jvb2xlYW59IGVuYWJsZUxvZ3M9dHJ1ZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBzaW5nbGV0b246IHRydWVcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgLy8gYWxpYXNlc1xuICAgICAgICBOZW8uYXBwbHlGcm9tTnMoTmVvLCB0aGlzLCB7XG4gICAgICAgICAgICBlcnJvciAgIDogJ2Vycm9yJyxcbiAgICAgICAgICAgIGluZm8gICAgOiAnaW5mbycsXG4gICAgICAgICAgICBsb2cgICAgIDogJ2xvZycsXG4gICAgICAgICAgICBsb2dFcnJvcjogJ2xvZ0Vycm9yJyxcbiAgICAgICAgICAgIHdhcm4gICAgOiAnd2FybidcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBlcnJvcih2YWx1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGFyZ3NcbiAgICAgKi9cbiAgICBsb2coLi4uYXJncykge1xuICAgICAgICB0aGlzLmxldmVsID0gJ2xvZyc7XG4gICAgICAgIHRoaXMud3JpdGUoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYXJnc1xuICAgICAqL1xuICAgIGluZm8oLi4uYXJncykge1xuICAgICAgICB0aGlzLmxldmVsID0gJ2luZm8nO1xuICAgICAgICB0aGlzLndyaXRlKC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGFyZ3NcbiAgICAgKi9cbiAgICBsb2dFcnJvciguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMubGV2ZWwgPSAnZXJyb3InO1xuICAgICAgICB0aGlzLndyaXRlKC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGFyZ3NcbiAgICAgKi9cbiAgICB3YXJuKC4uLmFyZ3MpIHtcbiAgICAgICAgdGhpcy5sZXZlbCA9ICd3YXJuJztcbiAgICAgICAgdGhpcy53cml0ZSguLi5hcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhcmdzXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHdyaXRlKC4uLmFyZ3MpIHtcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlTG9ncyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc29sZVt0aGlzLmxldmVsXSguLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoTG9nZ2VyKTtcblxubGV0IGluc3RhbmNlID0gTmVvLmNyZWF0ZShMb2dnZXIpO1xuXG5OZW8uYXBwbHlUb0dsb2JhbE5zKGluc3RhbmNlKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7IiwiaW1wb3J0IEJhc2UgZnJvbSAnLi9CYXNlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby5jb3JlLk9ic2VydmFibGVcbiAqIEBleHRlbmRzIE5lby5jb3JlLkJhc2VcbiAqL1xuY2xhc3MgT2JzZXJ2YWJsZSBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uY29yZS5PYnNlcnZhYmxlJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uY29yZS5PYnNlcnZhYmxlJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J21peGluLW9ic2VydmFibGUnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnbWl4aW4tb2JzZXJ2YWJsZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBtaXhpbj10cnVlXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG1peGluOiB0cnVlXG4gICAgfX1cblxuICAgIGluaXRPYnNlcnZhYmxlKGNvbmZpZykge1xuICAgICAgICBsZXQgbWUgPSB0aGlzLFxuICAgICAgICAgICAgcHJvdG8gPSBtZS5fX3Byb3RvX18sXG4gICAgICAgICAgICBsaXN0ZW5lcnM7XG5cbiAgICAgICAgaWYgKGNvbmZpZy5saXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIG1lLmxpc3RlbmVycyA9IGNvbmZpZy5saXN0ZW5lcnM7XG4gICAgICAgICAgICBkZWxldGUgY29uZmlnLmxpc3RlbmVycztcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3RlbmVycyA9IG1lLmxpc3RlbmVycztcblxuICAgICAgICBtZS5saXN0ZW5lcnMgPSB7fTtcblxuICAgICAgICBpZiAobGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBpZiAoTmVvLmlzT2JqZWN0KGxpc3RlbmVycykpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMgPSB7Li4ubGlzdGVuZXJzfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWUuYWRkTGlzdGVuZXIobGlzdGVuZXJzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChwcm90byAmJiBwcm90by5jb25zdHJ1Y3Rvci5pc0NsYXNzKSB7XG4gICAgICAgICAgICBpZiAocHJvdG8uY29uc3RydWN0b3Iuc3RhdGljQ29uZmlnLm9ic2VydmFibGUgJiYgIXByb3RvLmNvbnN0cnVjdG9yLmxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocHJvdG8uY29uc3RydWN0b3IsIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkTGlzdGVuZXIgICA6IG1lLmFkZExpc3RlbmVyLFxuICAgICAgICAgICAgICAgICAgICBmaXJlICAgICAgICAgIDogbWUuZmlyZSxcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzICAgICA6IHt9LFxuICAgICAgICAgICAgICAgICAgICBvbiAgICAgICAgICAgIDogbWUub24sXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUxpc3RlbmVyOiBtZS5yZW1vdmVMaXN0ZW5lcixcbiAgICAgICAgICAgICAgICAgICAgdW4gICAgICAgICAgICA6IG1lLnVuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm90byA9IHByb3RvLl9fcHJvdG9fXztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbc2NvcGVdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtldmVudElkXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbZGF0YV1cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW29yZGVyXVxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IGV2ZW50SWRcbiAgICAgKi9cbiAgICBhZGRMaXN0ZW5lcihuYW1lLCBvcHRzLCBzY29wZSwgZXZlbnRJZCwgZGF0YSwgb3JkZXIpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcyxcbiAgICAgICAgICAgIGxpc3RlbmVyLCBleGlzdGluZywgZXZlbnRDb25maWc7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKG5hbWUuaGFzT3duUHJvcGVydHkoJ3Njb3BlJykpIHtcbiAgICAgICAgICAgICAgICBzY29wZSA9IG5hbWUuc2NvcGU7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG5hbWUuc2NvcGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKG5hbWUpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgICAgIG1lLmFkZExpc3RlbmVyKGtleSwgdmFsdWUsIHNjb3BlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgc2NvcGUgPSBzY29wZSB8fCBvcHRzLnNjb3BlO1xuICAgICAgICAgICAgbGlzdGVuZXIgPSBvcHRzLmZuO1xuICAgICAgICAgICAgb3JkZXIgPSBvcmRlciB8fCBvcHRzLm9yZGVyO1xuICAgICAgICAgICAgZXZlbnRJZCA9IGV2ZW50SWQgfHwgb3B0cy5ldmVudElkO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBsaXN0ZW5lciA9IG9wdHM7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBsaXN0ZW5lciA9IG9wdHM7IC8vIFZDIGhvb2ssIGNhbiBnZXQgcGFyc2VkIGFmdGVyIG9uQ29uc3RydWN0ZWQgaW4gY2FzZSB0aGUgdmlldyB1c2VzIHRoZSBwYXJlbnQgVkNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhZGRMaXN0ZW5lciBjYWxsOiAnICsgbmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudENvbmZpZyA9IHtcbiAgICAgICAgICAgIGZuICAgIDogbGlzdGVuZXIsXG4gICAgICAgICAgICBzY29wZSA6IHNjb3BlLFxuICAgICAgICAgICAgZGF0YSAgOiBkYXRhLFxuICAgICAgICAgICAgaWQgICAgOiBldmVudElkIHx8IE5lby5nZXRJZCgnZXZlbnQnKVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChleGlzdGluZyA9IG1lLmxpc3RlbmVycyAmJiBtZS5saXN0ZW5lcnNbbmFtZV0pIHtcbiAgICAgICAgICAgIGV4aXN0aW5nLmZvckVhY2goY2ZnID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2ZnLmlkID09PSBldmVudElkIHx8IChjZmcuZm4gPT09IGxpc3RlbmVyICYmIGNmZy5zY29wZSA9PT0gc2NvcGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRHVwbGljYXRlIGV2ZW50IGhhbmRsZXIgYXR0YWNoZWQ6ICcgKyBuYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcmRlciA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBleGlzdGluZy5zcGxpY2Uob3JkZXIsIDAsIGV2ZW50Q29uZmlnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3JkZXIgPT09ICdiZWZvcmUnKSB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmcudW5zaGlmdChldmVudENvbmZpZyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nLnB1c2goZXZlbnRDb25maWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWUubGlzdGVuZXJzW25hbWVdID0gW2V2ZW50Q29uZmlnXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBldmVudENvbmZpZy5pZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICovXG4gICAgZmlyZShuYW1lKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgYXJncyAgICAgID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgICAgICAgbGlzdGVuZXJzID0gbWUubGlzdGVuZXJzLFxuICAgICAgICAgICAgZXZlbnRDb25maWcsIGV2ZW50cywgaSwgbGVuO1xuXG4gICAgICAgIGlmIChsaXN0ZW5lcnMgJiYgbGlzdGVuZXJzW25hbWVdKSB7XG4gICAgICAgICAgICBldmVudHMgPSBbLi4ubGlzdGVuZXJzW25hbWVdXTtcbiAgICAgICAgICAgIGxlbiAgICA9IGV2ZW50cy5sZW5ndGg7XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGV2ZW50Q29uZmlnID0gZXZlbnRzW2ldO1xuXG4gICAgICAgICAgICAgICAgZXZlbnRDb25maWcuZm4uYXBwbHkoZXZlbnRDb25maWcuc2NvcGUgfHwgbWUsIGV2ZW50Q29uZmlnLmRhdGEgPyBhcmdzLmNvbmNhdChldmVudENvbmZpZy5kYXRhKSA6IGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEBwYXJhbSBldmVudElkXG4gICAgICovXG4gICAgcmVtb3ZlTGlzdGVuZXIobmFtZSwgZXZlbnRJZCkge1xuICAgICAgICBpZiAoTmVvLmlzU3RyaW5nKGV2ZW50SWQpKSB7XG4gICAgICAgICAgICBsZXQgbGlzdGVuZXJzICAgPSB0aGlzLmxpc3RlbmVyc1tuYW1lXSxcbiAgICAgICAgICAgICAgICBtYXRjaCAgICAgICA9IGZhbHNlO1xuXG4gICAgICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaCgoZXZlbnRDb25maWcsIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudENvbmZpZy5pZCA9PT0gZXZlbnRJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2ggPSBpZHg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKG1hdGNoLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJlbW92ZUFsbExpc3RlbmVyczogZnVuY3Rpb24obmFtZSkge1xuXG4gICAgLy8gfSxcblxuICAgIC8vIHN1c3BlbmRMaXN0ZW5lcnM6IGZ1bmN0aW9uKHF1ZXVlKSB7XG5cbiAgICAvLyB9LFxuXG4gICAgLy8gcmVzdW1lTGlzdGVuZXJzOiBmdW5jdGlvbigpIHtcblxuICAgIC8vIH1cblxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciBhZGRMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0c11cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3Njb3BlXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbZXZlbnRJZF1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW2RhdGFdXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcmRlcl1cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBldmVudElkXG4gICAgICovXG4gICAgb24oLi4uYXJncykge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRMaXN0ZW5lciguLi5hcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3IgcmVtb3ZlTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEBwYXJhbSBldmVudElkXG4gICAgICovXG4gICAgdW4oLi4uYXJncykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKC4uLmFyZ3MpO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoT2JzZXJ2YWJsZSk7XG5cbmV4cG9ydCB7T2JzZXJ2YWJsZSBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQmFzZSBmcm9tICcuL0Jhc2UubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgTmVvLmNvcmUuVXRpbFxuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICovXG5jbGFzcyBVdGlsIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldFN0YXRpY0NvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQSByZWdleCB0byByZW1vdmUgY2FtZWwgY2FzZSBzeW50YXhcbiAgICAgICAgICogQG1lbWJlciB7UmVnRXhwfSBkZWNhbWVsUmVnRXg9LyhbYS16XSkoW0EtWl0pL2dcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBkZWNhbWVsUmVnRXg6IC8oW2Etel0pKFtBLVpdKS9nXG4gICAgfX1cblxuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uY29yZS5VdGlsJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uY29yZS5VdGlsJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J2NvcmUtdXRpbCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICdjb3JlLXV0aWwnLFxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IHZhbHVlc1xuICAgICAqL1xuICAgIHN0YXRpYyBiaW5kTWV0aG9kcyhzY29wZSwgdmFsdWVzKSB7XG4gICAgICAgIHZhbHVlcy5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgICAgIHNjb3BlW3ZhbHVlXSA9IHNjb3BlW3ZhbHVlXS5iaW5kKHNjb3BlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZXMgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiBhIHN0cmluZyB1cHBlcmNhc2VcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gICAgICogQHJldHVybnMge0Jvb2xlYW58U3RyaW5nfSBSZXR1cm5zIGZhbHNlIGZvciBub24gc3RyaW5nIGlucHV0c1xuICAgICAqL1xuICAgIHN0YXRpYyBjYXBpdGFsaXplKHN0cmluZykge1xuICAgICAgICByZXR1cm4gVXRpbC5pc1N0cmluZyhzdHJpbmcpICYmIHN0cmluZ1swXS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyYW5zZm9ybXMgYSBzdHlsZXMgc3RyaW5nIGludG8gYSBzdHlsZXMgb2JqZWN0IHVzaW5nIGNhbWVsY2FzZSBzeW50YXhcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHlsZXMgc3RyaW5nIHRvIHBhcnNlXG4gICAgICogQHJldHVybnMge09iamVjdH0gVGhlIGNhbWVsY2FzZSBzdHlsZXMgb2JqZWN0XG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZVN0eWxlT2JqZWN0KHN0cmluZykge1xuICAgICAgICBpZiAoIXN0cmluZykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGFydHM7XG5cbiAgICAgICAgLy8gc3BsaXQoJzsnKSBkb2VzIGZldGNoIHNlbWljb2xvbnMgaW5zaWRlIGJyYWNrZXRzXG4gICAgICAgIC8vIC0+IGJhY2tncm91bmQtaW1hZ2U6IFwidXJsKCdkYXRhOmltYWdlL3BuZztiYXNlNjQsLi4uXG5cbiAgICAgICAgLy8gVE9ETzogQ2FjaGUgYWxsIHJlZ2V4XG4gICAgICAgIHJldHVybiBzdHJpbmcuc3BsaXQoLzsoPz1bXlxcKV0qKD86XFwofCQpKS9nKS5yZWR1Y2UoKG9iaiwgZWwpID0+IHtcbiAgICAgICAgICAgIC8vIHdlIGhhdmUgdG8gc3BsaXQgYnkgdGhlIGZpcnN0IGNvbG9uIG9ubHlcbiAgICAgICAgICAgIC8vIC0+IGJhY2tncm91bmQtaW1hZ2U6IHVybCgnaHR0cDovL2V4YW1wbGUuY29tL2ltYWdlLnBuZycpXG4gICAgICAgICAgICBwYXJ0cyA9IGVsLnNwbGl0KCgvOiguKykvKSkubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgbGV0IG51bSA9IHBhcnNlRmxvYXQoeCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4geCA9PSBudW0gPyBudW0gOiB4LnRyaW0oKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAocGFydHNbMF0gIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgcGFydHNbMF0gPSBwYXJ0c1swXS5yZXBsYWNlKC8tKFthLXpdKS9nLCAoc3RyLCBsZXR0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxldHRlci50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG9ialtwYXJ0c1swXV0gPSBwYXJ0c1sxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH0sIHt9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIHN0eWxlcyBvYmplY3Qgd2hpY2ggY2FuIHVzZSBjYW1lbGNhc2Ugc3ludGF4IGludG8gYSBzdHlsZXMgc3RyaW5nXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyBUaGUgc3R5bGVzIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBzdHlsZXMgc3RyaW5nIChET00gcmVhZHkpXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZVN0eWxlcyhzdHlsZXMpIHtcbiAgICAgICAgbGV0IHN0eWxlID0gJyc7XG5cbiAgICAgICAgT2JqZWN0LmVudHJpZXMoc3R5bGVzKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc3R5bGUgKz0gVXRpbC5kZWNhbWVsKGtleSkgKyAnOicgKyB2YWx1ZSArICc7JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyYW5zZm9ybXMgYWxsIHVwcGVyY2FzZSBjaGFyYWN0ZXJzIG9mIGEgc3RyaW5nIGludG8gbG93ZXJjYXNlLlxuICAgICAqIERvZXMgbm90IHRvdWNoIHNwZWNpYWwgY2hhcmFjdGVycy5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgVGhlIGlucHV0IGNvbnRhaW5pbmcgdXBwZXJjYXNlIGNoYXJhY3RlcnNcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgbG93ZXJjYXNlIG91dHB1dFxuICAgICAqL1xuICAgIHN0YXRpYyBkZWNhbWVsKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKFV0aWwuZGVjYW1lbFJlZ0V4LCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcGFzc2VkIHZhbHVlIGlzIGFuIGFycmF5XG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0XG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGlzQXJyYXkodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBwYXNzZWQgdmFsdWUgaXMgYSBib29sZWFuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0XG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGlzQm9vbGVhbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbic7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBwYXNzZWQgdmFsdWUgaXMgbm90IHVuZGVmaW5lZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdFxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBpc0RlZmluZWQodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBwYXNzZWQgdmFsdWUgaXMgYW4gZW1wdHkgQXJyYXksIE9iamVjdCBvciBTdHJpbmdcbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdHxTdHJpbmd9IHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0XG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGlzRW1wdHkodmFsdWUpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID09PSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFV0aWwuaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChVdGlsLmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHBhc3NlZCB2YWx1ZSBpcyBhIGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3RcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgaXNGdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcGFzc2VkIHZhbHVlIGlzIGEgbnVtYmVyLiBSZXR1cm5zIGZhbHNlIGZvciBub24tZmluaXRlIG51bWJlcnNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3RcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgaXNOdW1iZXIodmFsdWUpe1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBwYXNzZWQgdmFsdWUgaXMgYW4gb2JqZWN0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0XG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGlzT2JqZWN0KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHBhc3NlZCB2YWx1ZSBpcyBhIHN0cmluZ1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdFxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBpc1N0cmluZyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhbnkgaXRlcmFibGUgKHN0cmluZ3MsIG51bWVyaWMgaW5kaWNlcyBhbmQgYSBsZW5ndGggcHJvcGVydHkpIGludG8gYSB0cnVlIGFycmF5XG4gICAgICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBpdGVyYWJsZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbc3RhcnQ9MF0gc3RhcnQgaW5kZXhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2VuZD1pdGVyYWJsZS5sZW5ndGhdIGVuZCBpbmRleFxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKi9cbiAgICBzdGF0aWMgdG9BcnJheShpdGVyYWJsZSwgc3RhcnQsIGVuZCkge1xuICAgICAgICBsZXQgbGVuO1xuXG4gICAgICAgIGlmICghaXRlcmFibGUgfHwgIShsZW4gPSBpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZXJhYmxlLnNwbGl0KCcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChpdGVyYWJsZSwgc3RhcnQgfHwgMCwgZW5kIHx8IGxlbik7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhVdGlsKTtcblxuLy8gYWxpYXNlc1xuTmVvLmFwcGx5RnJvbU5zKE5lbywgVXRpbCwge1xuICAgIGJpbmRNZXRob2RzICAgICAgOiAnYmluZE1ldGhvZHMnLFxuICAgIGNyZWF0ZVN0eWxlT2JqZWN0OiAnY3JlYXRlU3R5bGVPYmplY3QnLFxuICAgIGNyZWF0ZVN0eWxlcyAgICAgOiAnY3JlYXRlU3R5bGVzJyxcbiAgICBjYXBpdGFsaXplICAgICAgIDogJ2NhcGl0YWxpemUnLFxuICAgIGRlY2FtZWwgICAgICAgICAgOiAnZGVjYW1lbCcsXG4gICAgaXNBcnJheSAgICAgICAgICA6ICdpc0FycmF5JyxcbiAgICBpc0Jvb2xlYW4gICAgICAgIDogJ2lzQm9vbGVhbicsXG4gICAgaXNEZWZpbmVkICAgICAgICA6ICdpc0RlZmluZWQnLFxuICAgIGlzRW1wdHkgICAgICAgICAgOiAnaXNFbXB0eScsXG4gICAgaXNGdW5jdGlvbiAgICAgICA6ICdpc0Z1bmN0aW9uJyxcbiAgICBpc051bWJlciAgICAgICAgIDogJ2lzTnVtYmVyJyxcbiAgICBpc09iamVjdCAgICAgICAgIDogJ2lzT2JqZWN0JyxcbiAgICBpc1N0cmluZyAgICAgICAgIDogJ2lzU3RyaW5nJyxcbiAgICB0b0FycmF5ICAgICAgICAgIDogJ3RvQXJyYXknXG59LCB0cnVlKTtcblxuZXhwb3J0IGRlZmF1bHQgVXRpbDsiLCJpbXBvcnQgQmFzZSAgICAgICAgZnJvbSAnLi9CYXNlLm1qcyc7XG5pbXBvcnQgTG9nZ2VyICAgICAgZnJvbSAnLi9Mb2dnZXIubWpzJztcbmltcG9ydCBPYnNlcnZhYmxlICBmcm9tICcuL09ic2VydmFibGUubWpzJztcbmltcG9ydCBVdGlsICAgICAgICBmcm9tICcuL1V0aWwubWpzJztcblxuZXhwb3J0IHtCYXNlLCBMb2dnZXIsIE9ic2VydmFibGUsIFV0aWx9OyIsImltcG9ydCBCYXNlICAgICAgICAgZnJvbSAnLi4vY29yZS9CYXNlLm1qcyc7XG5pbXBvcnQgRGVsdGFVcGRhdGVzIGZyb20gJy4vbWl4aW4vRGVsdGFVcGRhdGVzLm1qcyc7XG5pbXBvcnQgT2JzZXJ2YWJsZSAgIGZyb20gJy4uL2NvcmUvT2JzZXJ2YWJsZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8ubWFpbi5Eb21BY2Nlc3NcbiAqIEBleHRlbmRzIE5lby5jb3JlLkJhc2VcbiAqIEBzaW5nbGV0b25cbiAqL1xuY2xhc3MgRG9tQWNjZXNzIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5tYWluLkRvbUFjY2VzcydcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLm1haW4uRG9tQWNjZXNzJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge2Jvb2xlYW59IGxvZ0RlbHRhVXBkYXRlcz10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBsb2dEZWx0YVVwZGF0ZXM6IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtBcnJheX0gbWl4aW5zPVtEZWx0YVVwZGF0ZXMsIE9ic2VydmFibGVdXG4gICAgICAgICAqL1xuICAgICAgICBtaXhpbnM6IFtcbiAgICAgICAgICAgIERlbHRhVXBkYXRlcyxcbiAgICAgICAgICAgIE9ic2VydmFibGVcbiAgICAgICAgXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW90ZSBtZXRob2QgYWNjZXNzIGZvciBvdGhlciB3b3JrZXJzXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gcmVtb3RlPXthcHA6IFsvLy4uLl19XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHJlbW90ZToge1xuICAgICAgICAgICAgYXBwOiBbXG4gICAgICAgICAgICAgICAgJ2FkZFNjcmlwdCcsXG4gICAgICAgICAgICAgICAgJ2FwcGx5Qm9keUNscycsXG4gICAgICAgICAgICAgICAgJ2V4ZWNDb21tYW5kJyxcbiAgICAgICAgICAgICAgICAnZm9jdXMnLFxuICAgICAgICAgICAgICAgICdnZXRBdHRyaWJ1dGVzJyxcbiAgICAgICAgICAgICAgICAnZ2V0Qm91bmRpbmdDbGllbnRSZWN0JyxcbiAgICAgICAgICAgICAgICAnc2Nyb2xsQnknLFxuICAgICAgICAgICAgICAgICdzY3JvbGxJbnRvVmlldycsXG4gICAgICAgICAgICAgICAgJ3Njcm9sbFRvJyxcbiAgICAgICAgICAgICAgICAnc2Nyb2xsVG9UYWJsZVJvdycsXG4gICAgICAgICAgICAgICAgJ3NlbGVjdE5vZGUnLFxuICAgICAgICAgICAgICAgICdzZXRCb2R5Q2xzJyxcbiAgICAgICAgICAgICAgICAnc2V0U3R5bGUnLFxuICAgICAgICAgICAgICAgICd3aW5kb3dTY3JvbGxUbydcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHNpbmdsZXRvbj10cnVlXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHNpbmdsZXRvbjogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZvaWQgYXR0cmlidXRlcyBpbnNpZGUgaHRtbCB0YWdzXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSB2b2lkQXR0cmlidXRlc1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICB2b2lkQXR0cmlidXRlczogW1xuICAgICAgICAgICAgJ2NoZWNrZWQnLFxuICAgICAgICAgICAgJ3JlcXVpcmVkJ1xuICAgICAgICBdXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKG1lLmxvZ0RlbHRhVXBkYXRlcykge1xuICAgICAgICAgICAgbWUuY291bnREZWx0YXMgID0gMDtcbiAgICAgICAgICAgIG1lLmNvdW50VXBkYXRlcyA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBkYXRhLmFzeW5jXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbZGF0YS5kZWZlcj1mYWxzZV1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2RhdGEuc3JjPXRydWVdXG4gICAgICovXG4gICAgYWRkU2NyaXB0KGRhdGEpIHtcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgICAgICAgaWYgKCFkYXRhLmhhc093blByb3BlcnR5KCdhc3luYycpKSB7XG4gICAgICAgICAgICBkYXRhLmFzeW5jID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5hc3NpZ24oc2NyaXB0LCBkYXRhKTtcblxuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IGRhdGEuY2xzXG4gICAgICovXG4gICAgYXBwbHlCb2R5Q2xzKGRhdGEpIHtcbiAgICAgICAgY29uc3QgY2xzID0gZGF0YS5jbHMgfHwgW107XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCguLi5jbHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5jb21tYW5kXG4gICAgICogQHJldHVybnMge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIGV4ZWNDb21tYW5kKGRhdGEpIHtcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoZGF0YS5jb21tYW5kKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbHMgZm9jdXMgb24gYSBub2RlIGZvciBhIGdpdmVuIGRvbSBub2RlIGlkXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBvYmouaWQgPT4gdGhlIHBhc3NlZCBpZFxuICAgICAqL1xuICAgIGZvY3VzKGRhdGEpIHtcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmdldEVsZW1lbnQoZGF0YS5pZCk7XG5cbiAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgIG5vZGUuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7aWQ6IGRhdGEuaWR9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGF0dHJpYnV0ZXMgZm9yIGEgZ2l2ZW4gZG9tIG5vZGUgaWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBkYXRhLmlkIGVpdGhlciBhbiBpZCBvciBhbiBhcnJheSBvZiBpZHNcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gZGF0YS5hdHRyaWJ1dGVzIGVpdGhlciBhbiBhdHRyaWJ1dGUgb3IgYW4gYXJyYXkgb2YgYXR0cmlidXRlc1xuICAgICAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R9IEluIGNhc2UgaWQgaXMgYW4gYXJyYXksIGFuIGFycmF5IG9mIGF0cnJidXRlIG9iamVjdHMgaXMgcmV0dXJuZWQsIG90aGVyd2lzZSBhbiBvYmplY3RcbiAgICAgKi9cbiAgICBnZXRBdHRyaWJ1dGVzKGRhdGEpIHtcbiAgICAgICAgbGV0IHJldHVybkRhdGE7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YS5pZCkpIHtcbiAgICAgICAgICAgIHJldHVybkRhdGEgPSBbXTtcblxuICAgICAgICAgICAgZGF0YS5pZC5mb3JFYWNoKGlkID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm5EYXRhLnB1c2godGhpcy5nZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczogZGF0YS5hdHRyaWJ1dGVzLFxuICAgICAgICAgICAgICAgICAgICBpZCAgICAgICAgOiBpZFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmdldEVsZW1lbnRPckJvZHkoZGF0YS5pZCk7XG5cbiAgICAgICAgICAgIHJldHVybkRhdGEgPSB7fTtcblxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YS5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmF0dHJpYnV0ZXMgPSBbZGF0YS5hdHRyaWJ1dGVzXTtcblxuICAgICAgICAgICAgICAgICAgICBkYXRhLmF0dHJpYnV0ZXMuZm9yRWFjaChhdHRyaWJ1dGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuRGF0YVthdHRyaWJ1dGVdID0gbm9kZVthdHRyaWJ1dGVdO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXR1cm5EYXRhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSBmb3IgYSBnaXZlbiBkb20gbm9kZSBpZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGRhdGEuaWQgZWl0aGVyIGFuIGlkIG9yIGFuIGFycmF5IG9mIGlkc1xuICAgICAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R9IEluIGNhc2UgaWQgaXMgYW4gYXJyYXksIGFuIGFycmF5IG9mIERvbVJlY3RzIGlzIHJldHVybmVkLCBvdGhlcndpc2UgYW4gRG9tUmVjdCBvYmplY3RcbiAgICAgKi9cbiAgICBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZGF0YSkge1xuICAgICAgICBsZXQgcmV0dXJuRGF0YTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhLmlkKSkge1xuICAgICAgICAgICAgcmV0dXJuRGF0YSA9IFtdO1xuXG4gICAgICAgICAgICBkYXRhLmlkLmZvckVhY2goaWQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybkRhdGEucHVzaCh0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCh7aWQ6IGlkfSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuZ2V0RWxlbWVudE9yQm9keShkYXRhLmlkKSxcbiAgICAgICAgICAgICAgICByZWN0ID0ge307XG5cbiAgICAgICAgICAgIHJldHVybkRhdGEgPSB7fTtcblxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICByZWN0ID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAgICAgICAgIC8vIERvbVJlY3QgZG9lcyBub3Qgc3VwcG9ydCBzcHJlYWRpbmcgPT4gey4uLkRvbVJlY3R9ID0+IHt9XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihyZXR1cm5EYXRhLCB7XG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogcmVjdC5ib3R0b20sXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogcmVjdC5oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQgIDogcmVjdC5sZWZ0LFxuICAgICAgICAgICAgICAgICAgICByaWdodCA6IHJlY3QucmlnaHQsXG4gICAgICAgICAgICAgICAgICAgIHRvcCAgIDogcmVjdC50b3AsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoIDogcmVjdC53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgeCAgICAgOiByZWN0LngsXG4gICAgICAgICAgICAgICAgICAgIHkgICAgIDogcmVjdC55XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBub2RlSWRcbiAgICAgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGdldEVsZW1lbnQobm9kZUlkKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChub2RlSWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtub2RlSWQ9J2RvY3VtZW50LmJvZHknXVxuICAgICAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgZ2V0RWxlbWVudE9yQm9keShub2RlSWQ9J2RvY3VtZW50LmJvZHknKSB7XG4gICAgICAgIGlmIChub2RlSWQgPT09ICdib2R5JyB8fCBub2RlSWQgPT09ICdkb2N1bWVudC5ib2R5Jykge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmJvZHk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRFbGVtZW50KG5vZGVJZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5jbHVkZSBhIHNjcmlwdCBpbnRvIHRoZSBkb2N1bWVudC5oZWFkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNyY1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2FzeW5jPXRydWVdXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dW5rbm93bj59XG4gICAgICovXG4gICAgbG9hZFNjcmlwdChzcmMsIGFzeW5jPXRydWUpIHtcbiAgICAgICAgbGV0IHNjcmlwdDtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oc2NyaXB0LCB7XG4gICAgICAgICAgICAgICAgYXN5bmMgIDogYXN5bmMsXG4gICAgICAgICAgICAgICAgb25lcnJvcjogcmVqZWN0LFxuICAgICAgICAgICAgICAgIG9ubG9hZCA6IHJlc29sdmUsXG4gICAgICAgICAgICAgICAgc3JjICAgIDogc3JjXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbmNsdWRlIGEgbGluayBpbnRvIHRoZSBkb2N1bWVudC5oZWFkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGhyZWZcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx1bmtub3duPn1cbiAgICAgKi9cbiAgICBsb2FkU3R5bGVzaGVldChocmVmKSB7XG4gICAgICAgIGxldCBsaW5rO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGxpbmssIHtcbiAgICAgICAgICAgICAgICBocmVmICAgOiBocmVmLFxuICAgICAgICAgICAgICAgIG9uZXJyb3I6IHJlamVjdCxcbiAgICAgICAgICAgICAgICBvbmxvYWQgOiByZXNvbHZlLFxuICAgICAgICAgICAgICAgIHJlbCAgICA6ICdzdHlsZXNoZWV0JyxcbiAgICAgICAgICAgICAgICB0eXBlICAgOiAndGV4dC9jc3MnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkRvbUNvbnRlbnRMb2FkZWQoKSB7XG4gICAgICAgIGlmIChOZW8uY29uZmlnLmFwcGx5Qm9keUNscykge1xuICAgICAgICAgICAgdGhpcy5hcHBseUJvZHlDbHMoe2NsczogWyduZW8tYm9keSddfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmdbXX0gZGF0YS5hdHRyaWJ1dGVzXG4gICAgICogQHBhcmFtIHtBcnJheX0gZGF0YS5mdW5jdGlvbnMgQW4gYXJyYXkgY29udGFpbmluZyBzdHJpbmdzIGFuZC9vciBvYmplY3RzXG4gICAgICogQHBhcmFtIHtTdHJpbmdbXX0gZGF0YS5zdHlsZXNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS52bm9kZUlkXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uUmVhZERvbShkYXRhKSB7XG4gICAgICAgIGxldCBhdHRyaWJ1dGVzICAgID0gZGF0YS5hdHRyaWJ1dGVzIHx8IFtdLFxuICAgICAgICAgICAgZnVuY3Rpb25zICAgICA9IGRhdGEuZnVuY3Rpb25zICB8fCBbXSxcbiAgICAgICAgICAgIHN0eWxlcyAgICAgICAgPSBkYXRhLnN0eWxlcyAgICAgfHwgW10sXG4gICAgICAgICAgICB2bm9kZUlkICAgICAgID0gZGF0YS52bm9kZUlkLFxuICAgICAgICAgICAgcmV0QXR0cmlidXRlcyA9IHt9LFxuICAgICAgICAgICAgcmV0RnVuY3Rpb25zICA9IHt9LFxuICAgICAgICAgICAgcmV0U3R5bGVzICAgICA9IHt9LFxuICAgICAgICAgICAgZWxlbWVudCAgICAgICA9IHZub2RlSWQgPyB0aGlzLmdldEVsZW1lbnQodm5vZGVJZCkgOiBudWxsLFxuICAgICAgICAgICAgZm5OYW1lLCBzY29wZTtcblxuICAgICAgICBhdHRyaWJ1dGVzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIHJldEF0dHJpYnV0ZXNba2V5XSA9IGVsZW1lbnRba2V5XTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb25zLmZvckVhY2goKGtleSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChOZW8uaXNPYmplY3Qoa2V5KSkge1xuICAgICAgICAgICAgICAgIGtleS5wYXJhbXMgICAgICAgICA9IGtleS5wYXJhbXMgICAgICAgICB8fCBbXTtcbiAgICAgICAgICAgICAgICBrZXkucGFyYW1Jc0RvbU5vZGUgPSBrZXkucGFyYW1Jc0RvbU5vZGUgfHwgW107XG5cbiAgICAgICAgICAgICAgICBzY29wZSA9IGtleS5zY29wZSA/IGRvY3VtZW50W2tleS5zY29wZV0gOiBlbGVtZW50O1xuXG4gICAgICAgICAgICAgICAga2V5LnBhcmFtcy5mb3JFYWNoKChwYXJhbSwgcGFyYW1JbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5LnBhcmFtSXNEb21Ob2RlW3BhcmFtSW5kZXhdICYmIGtleS5wYXJhbUlzRG9tTm9kZVtwYXJhbUluZGV4XSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5LnBhcmFtc1twYXJhbUluZGV4XSA9IHRoaXMuZ2V0RWxlbWVudChrZXkucGFyYW1zW3BhcmFtSW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZm5OYW1lID0ga2V5LnJldHVybkZuTmFtZSA/IGtleS5yZXR1cm5Gbk5hbWUgOiBpbmRleDtcbiAgICAgICAgICAgICAgICByZXRGdW5jdGlvbnNbZm5OYW1lXSA9IHNjb3BlW2tleS5mbl0oLi4ua2V5LnBhcmFtcyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoa2V5LnJldHVyblZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldEZ1bmN0aW9uc1tmbk5hbWVdID0gcmV0RnVuY3Rpb25zW2ZuTmFtZV1ba2V5LnJldHVyblZhbHVlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldEZ1bmN0aW9uc1trZXldID0gZWxlbWVudFtrZXldKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHN0eWxlcy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICByZXRTdHlsZXNba2V5XSA9IGVsZW1lbnQuc3R5bGVba2V5XTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbihkYXRhLCB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiByZXRBdHRyaWJ1dGVzLFxuICAgICAgICAgICAgZnVuY3Rpb25zIDogcmV0RnVuY3Rpb25zLFxuICAgICAgICAgICAgc3R5bGVzICAgIDogcmV0U3R5bGVzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIE5lby53b3JrZXIuTWFuYWdlci5zZW5kTWVzc2FnZShkYXRhLm9yaWdpbiwge1xuICAgICAgICAgICAgYWN0aW9uIDogJ3JlcGx5JyxcbiAgICAgICAgICAgIGRhdGEgICA6IGRhdGEsXG4gICAgICAgICAgICByZXBseUlkOiBkYXRhLmlkLFxuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHJlYWQoZGF0YSkge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGRhdGEoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbZGF0YS5iZWhhdmlvcj0nc21vb3RoJ11cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2RhdGEuYmxvY2s9J3N0YXJ0J11cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2RhdGEuaW5saW5lPSduZWFyZXN0J11cbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBvYmouaWQgPT4gdGhlIHBhc3NlZCBpZFxuICAgICAqL1xuICAgIHNjcm9sbEludG9WaWV3KGRhdGEpIHtcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmdldEVsZW1lbnQoZGF0YS5pZCk7XG5cbiAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgIG5vZGUuc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiBkYXRhLmJlaGF2aW9yIHx8ICdzbW9vdGgnLFxuICAgICAgICAgICAgICAgIGJsb2NrICAgOiBkYXRhLmJsb2NrICAgIHx8ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgaW5saW5lICA6IGRhdGEuaW5saW5lICAgfHwgJ25lYXJlc3QnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7aWQ6IGRhdGEuaWR9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5kaXJlY3Rpb24gbGVmdCwgdG9wXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZGF0YS52YWx1ZVxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IG9iai5pZCA9PiB0aGUgcGFzc2VkIGlkXG4gICAgICovXG4gICAgc2Nyb2xsQnkoZGF0YSkge1xuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuZ2V0RWxlbWVudChkYXRhLmlkKTtcblxuICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgbm9kZVtgc2Nyb2xsJHtOZW8uY2FwaXRhbGl6ZShkYXRhLmRpcmVjdGlvbil9YF0gKz0gZGF0YS52YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7aWQ6IGRhdGEuaWR9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5kaXJlY3Rpb24gbGVmdCwgdG9wXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZGF0YS52YWx1ZVxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IG9iai5pZCA9PiB0aGUgcGFzc2VkIGlkXG4gICAgICovXG4gICAgc2Nyb2xsVG8oZGF0YSkge1xuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuZ2V0RWxlbWVudChkYXRhLmlkKTtcblxuICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgbm9kZVtgc2Nyb2xsJHtOZW8uY2FwaXRhbGl6ZShkYXRhLmRpcmVjdGlvbil9YF0gPSBkYXRhLnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtpZDogZGF0YS5pZH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtkYXRhLmJlaGF2aW9yPSdzbW9vdGgnXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbZGF0YS5vZmZzZXQ9MzRdXG4gICAgICogQHJldHVybnMge09iamVjdH0gb2JqLmlkID0+IHRoZSBwYXNzZWQgaWRcbiAgICAgKi9cbiAgICBzY3JvbGxUb1RhYmxlUm93KGRhdGEpIHtcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmdldEVsZW1lbnQoZGF0YS5pZCk7IC8vIHRyIHRhZ1xuXG4gICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICBsZXQgdGFibGVOb2RlICAgPSBub2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZSxcbiAgICAgICAgICAgICAgICB3cmFwcGVyTm9kZSA9IHRhYmxlTm9kZS5wYXJlbnROb2RlLFxuICAgICAgICAgICAgICAgIHRhYmxlVG9wICAgID0gdGFibGVOb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCxcbiAgICAgICAgICAgICAgICB0b3AgICAgICAgICA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgICAgICAgICB3cmFwcGVyTm9kZS5zY3JvbGxUbyh7XG4gICAgICAgICAgICAgICAgdG9wICAgICA6IHRvcCAtIHRhYmxlVG9wIC0gKGRhdGEuaGFzT3duUHJvcGVydHkoJ29mZnNldCcpID8gZGF0YS5vZmZzZXQgOiAzNCksXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6IGRhdGEuYmVoYXZpb3IgfHwgJ3Ntb290aCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtpZDogZGF0YS5pZH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtkYXRhLnN0YXJ0PTBdXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtkYXRhLmVuZD05OTk5OV1cbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBvYmouaWQgPT4gdGhlIHBhc3NlZCBpZFxuICAgICAqL1xuICAgIHNlbGVjdE5vZGUoZGF0YSkge1xuICAgICAgICBsZXQgbm9kZSAgPSB0aGlzLmdldEVsZW1lbnQoZGF0YS5pZCksXG4gICAgICAgICAgICBzdGFydCA9IE5lby5pc051bWJlcihkYXRhLnN0YXJ0KSB8fCAwLFxuICAgICAgICAgICAgZW5kICAgPSBOZW8uaXNOdW1iZXIoZGF0YS5lbmQpICAgfHwgOTk5OTk7XG5cbiAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgIG5vZGUuc2VsZWN0KCk7XG4gICAgICAgICAgICBub2RlLnNldFNlbGVjdGlvblJhbmdlKHN0YXJ0LCBlbmQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtpZDogZGF0YS5pZH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBkYXRhLmFkZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IGRhdGEucmVtb3ZlXG4gICAgICovXG4gICAgc2V0Qm9keUNscyhkYXRhKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSguLi5kYXRhLnJlbW92ZSB8fCBbXSk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCguLi5kYXRhLmFkZCB8fCBbXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTm90IHJlY29tbWVuZGVkIHRvIHVzZSA9PiBzdGljayB0byB2ZG9tIHVwZGF0ZXMuXG4gICAgICogQ2FuIGJlIGhhbmR5IGZvciBjdXN0b20gQ1NTIGJhc2VkIGFuaW1hdGlvbnMgdGhvdWdoLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWQgQSBub2RlIGlkIG9yICdkb2N1bWVudC5ib2R5J1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhLnN0eWxlXG4gICAgICogQHJldHVybnMge09iamVjdH0gb2JqLmlkID0+IHRoZSBwYXNzZWQgaWRcbiAgICAgKi9cbiAgICBzZXRTdHlsZShkYXRhKSB7XG4gICAgICAgIGxldCBub2RlID0gdGhpcy5nZXRFbGVtZW50T3JCb2R5KGRhdGEuaWQpO1xuXG4gICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICBPYmplY3QuZW50cmllcyhkYXRhLnN0eWxlKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoTmVvLmlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS5pbmNsdWRlcygnIWltcG9ydGFudCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgnIWltcG9ydGFudCcsICcnKS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUuc2V0UHJvcGVydHkoTmVvLmRlY2FtZWwoa2V5KSwgdmFsdWUsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnN0eWxlW05lby5kZWNhbWVsKGtleSldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge2lkOiBkYXRhLmlkfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtkYXRhLmJlaGF2aW9yPSdzbW9vdGgnXSAvLyBhdXRvIG9yIHNtb290aFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbZGF0YS5sZWZ0PTBdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtkYXRhLnRvcD0wXVxuICAgICAqL1xuICAgIHdpbmRvd1Njcm9sbFRvKGRhdGEpIHtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgICAgICAgIGJlaGF2aW9yOiBkYXRhLmJlaGF2aW9yIHx8ICdzbW9vdGgnLFxuICAgICAgICAgICAgbGVmdCAgICA6IGRhdGEubGVmdCAgICAgfHwgMCxcbiAgICAgICAgICAgIHRvcCAgICAgOiBkYXRhLnRvcCAgICAgIHx8IDBcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICB3cml0ZShkYXRhKSB7XG4gICAgICAgIGxldCBjb250YWluZXIgICA9IHRoaXMuZ2V0RWxlbWVudE9yQm9keShkYXRhLnBhcmVudElkKSxcbiAgICAgICAgICAgIGNvdW50Q2hpbGRzID0gY29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aCxcbiAgICAgICAgICAgIGluZGV4ICAgICAgID0gZGF0YS5wYXJlbnRJbmRleCxcbiAgICAgICAgICAgIGh0bWwgICAgICAgID0gZGF0YS5odG1sIHx8IGRhdGEub3V0ZXJIVE1MO1xuXG4gICAgICAgIGlmICghZGF0YS5wYXJlbnRJbmRleCB8fCBjb3VudENoaWxkcyA8IDEpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGh0bWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNvdW50Q2hpbGRzID4gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuY2hpbGRyZW5baW5kZXhdLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlYmVnaW4nLCBodG1sKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmNoaWxkcmVuW2NvdW50Q2hpbGRzIC0gMV0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIGh0bWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhEb21BY2Nlc3MpO1xuXG5sZXQgaW5zdGFuY2UgPSBOZW8uY3JlYXRlKERvbUFjY2Vzcyk7XG5cbk5lby5hcHBseVRvR2xvYmFsTnMoaW5zdGFuY2UpO1xuXG5leHBvcnQgZGVmYXVsdCBpbnN0YW5jZTsiLCJpbXBvcnQgQmFzZSAgICAgICAgICAgZnJvbSAnLi4vY29yZS9CYXNlLm1qcyc7XG5pbXBvcnQgT2JzZXJ2YWJsZSAgICAgZnJvbSAnLi4vY29yZS9PYnNlcnZhYmxlLm1qcyc7XG5pbXBvcnQgVG91Y2hEb21FdmVudHMgZnJvbSAnLi9taXhpbi9Ub3VjaERvbUV2ZW50cy5tanMnO1xuXG5jb25zdCBnbG9iYWxEb21FdmVudHMgPSBbXG4gICAge25hbWU6ICdjaGFuZ2UnLCAgICAgIGhhbmRsZXI6ICdvbkNoYW5nZSd9LFxuICAgIHtuYW1lOiAnY2xpY2snLCAgICAgICBoYW5kbGVyOiAnb25DbGljayd9LFxuICAgIHtuYW1lOiAnY29udGV4dG1lbnUnLCBoYW5kbGVyOiAnb25Db250ZXh0TWVudSd9LFxuICAgIHtuYW1lOiAnZGJsY2xpY2snLCAgICBoYW5kbGVyOiAnb25Eb3VibGVDbGljayd9LFxuICAgIHtuYW1lOiAnZm9jdXNpbicsICAgICBoYW5kbGVyOiAnb25Gb2N1c0luJ30sXG4gICAge25hbWU6ICdmb2N1c291dCcsICAgIGhhbmRsZXI6ICdvbkZvY3VzT3V0J30sXG4gICAge25hbWU6ICdpbnB1dCcsICAgICAgIGhhbmRsZXI6ICdvbkNoYW5nZSd9LFxuICAgIHtuYW1lOiAna2V5ZG93bicsICAgICBoYW5kbGVyOiAnb25LZXlEb3duJ30sXG4gICAge25hbWU6ICdrZXl1cCcsICAgICAgIGhhbmRsZXI6ICdvbktleVVwJ30sXG4gICAge25hbWU6ICdtb3VzZWVudGVyJywgIGhhbmRsZXI6ICdvbk1vdXNlRW50ZXInLCBvcHRpb25zOiB7Y2FwdHVyZTogdHJ1ZX19LFxuICAgIHtuYW1lOiAnbW91c2VsZWF2ZScsICBoYW5kbGVyOiAnb25Nb3VzZUxlYXZlJywgb3B0aW9uczoge2NhcHR1cmU6IHRydWV9fSxcbiAgICB7bmFtZTogJ3doZWVsJywgICAgICAgaGFuZGxlcjogJ29uV2hlZWwnLCAgICAgIG9wdGlvbnM6IHtwYXNzaXZlOiBmYWxzZX19XG5dO1xuXG4vLyBXaWxsIGdldCBhcHBsaWVkIHRvIHRoZSBkb2N1bWVudC5ib2R5IGluIGNhc2UgTmVvLmNvbmZpZy51c2VUb3VjaEV2ZW50cyA9PT0gdHJ1ZSAoZGVmYXVsdCB2YWx1ZSlcbmNvbnN0IHRvdWNoRXZlbnRzID0gW1xuICAgIHtuYW1lOiAndG91Y2hjYW5jZWwnLCBoYW5kbGVyOiAnb25Ub3VjaENhbmNlbCd9LFxuICAgIHtuYW1lOiAndG91Y2hlbmQnLCAgICBoYW5kbGVyOiAnb25Ub3VjaEVuZCd9LFxuICAgIHtuYW1lOiAndG91Y2hlbnRlcicsICBoYW5kbGVyOiAnb25Ub3VjaEVudGVyJ30sXG4gICAge25hbWU6ICd0b3VjaGxlYXZlJywgIGhhbmRsZXI6ICdvblRvdWNoTGVhdmUnfSxcbiAgICB7bmFtZTogJ3RvdWNobW92ZScsICAgaGFuZGxlcjogJ29uVG91Y2hNb3ZlJ30sXG4gICAge25hbWU6ICd0b3VjaHN0YXJ0JywgIGhhbmRsZXI6ICdvblRvdWNoU3RhcnQnfVxuXTtcblxuLy8gd2hlZWwgZXZlbnRzIGZpcmUgdmVyeSBvZnRlbiwgc28gd2UgbGltaXQgdGhlIHRhcmdldHMgdG8gYXZvaWQgdW5uZWNlc3NhcnkgcG9zdCBtZXNzYWdlcyBmcm9tIG1haW4gdG8gdGhlIGFwcCB3b3JrZXJcbmNvbnN0IGdsb2JhbFdoZWVsVGFyZ2V0cyA9IFtcbiAgICAnbmVvLWMtbS1zY3JvbGxjb250YWluZXInLFxuICAgICduZW8tYy13LXNjcm9sbGNvbnRhaW5lcicsXG4gICAgJ25lby1jYWxlbmRhci15ZWFyY29tcG9uZW50JyxcbiAgICAnbmVvLWNpcmNsZS1jb21wb25lbnQnLFxuICAgICduZW8tZGF0ZXNlbGVjdG9yJyxcbiAgICAnbmVvLWdhbGxlcnknLFxuICAgICduZW8taGVsaXgnXG5dO1xuXG4vLyBzZXBhcmF0ZWQgZnJvbSBnbG9iYWxXaGVlbFRhcmdldHMgPT4gcGVyZm9ybWFuY2Vcbi8vIGJ1ZmZlciBpbiBtc1xuY29uc3QgZ2xvYmFsV2hlZWxUYXJnZXRzQnVmZmVyID0ge1xuICAgICduZW8tYy1tLXNjcm9sbGNvbnRhaW5lcicgICA6IDEwMCxcbiAgICAnbmVvLWMtdy1zY3JvbGxjb250YWluZXInICAgOiAxMDAsXG4gICAgJ25lby1jYWxlbmRhci15ZWFyY29tcG9uZW50JzogMzAwLFxuICAgICduZW8tZGF0ZXNlbGVjdG9yJyAgICAgICAgICA6IDMwMFxufTtcblxuLy8gc2VwYXJhdGVkIGZyb20gZ2xvYmFsV2hlZWxUYXJnZXRzID0+IHBlcmZvcm1hbmNlXG5jb25zdCBnbG9iYWxXaGVlbFRhcmdldHNLZWVwRXZlbnQgPSBbXG4gICAgJ25lby1jLW0tc2Nyb2xsY29udGFpbmVyJyxcbiAgICAnbmVvLWMtdy1zY3JvbGxjb250YWluZXInXG5dO1xuXG5jb25zdCBsYXN0V2hlZWxFdmVudCA9IHtcbiAgICBkYXRlICA6IG51bGwsXG4gICAgdGFyZ2V0OiBudWxsXG59O1xuXG5jb25zdCBwcmV2ZW50Q2xpY2tUYXJnZXRzICAgICAgID0gW10sXG4gICAgICBwcmV2ZW50Q29udGV4dG1lbnVUYXJnZXRzID0gW107XG5cbi8qKlxuICogQGNsYXNzIE5lby5tYWluLkRvbUV2ZW50c1xuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICogQHNpbmdsZXRvblxuICovXG5jbGFzcyBEb21FdmVudHMgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0U3RhdGljQ29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcnVlIGF1dG9tYXRpY2FsbHkgYXBwbGllcyB0aGUgY29yZS9PYnNlcnZhYmxlLm1qcyBtaXhpblxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBvYnNlcnZhYmxlPXRydWVcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgb2JzZXJ2YWJsZTogdHJ1ZVxuICAgIH19XG5cbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLm1haW4uRG9tRXZlbnRzJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8ubWFpbi5Eb21FdmVudHMnLFxuICAgICAgICAvKipcbiAgICAgICAgICogdG9kbzogY29uZGl0aW9uYWwgZHluYW1pYyBpbXBvcnQgb25jZSB0aGUgYnVpbGQgcHJvY2Vzc2VzIGNhbiBoYW5kbGUgaXRcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl9IG1peGlucz1bVG91Y2hEb21FdmVudHNdXG4gICAgICAgICAqL1xuICAgICAgICBtaXhpbnM6IFtUb3VjaERvbUV2ZW50c10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtib29sZWFufSBzaW5nbGV0b249dHJ1ZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBzaW5nbGV0b246IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdGUgbWV0aG9kIGFjY2VzcyBmb3Igb3RoZXIgd29ya2Vyc1xuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHJlbW90ZT17YXBwOiBbJ2FkZERvbUxpc3RlbmVyJ119XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHJlbW90ZToge1xuICAgICAgICAgICAgYXBwOiBbXG4gICAgICAgICAgICAgICAgJ2FkZERvbUxpc3RlbmVyJyxcbiAgICAgICAgICAgICAgICAncmVnaXN0ZXJQcmV2ZW50RGVmYXVsdFRhcmdldHMnXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgbWUub25Eb21Db250ZW50TG9hZGVkLmJpbmQobWUpKTtcbiAgICAgICAgd2luZG93ICAuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsICAgICAgIG1lLm9uSGFzaENoYW5nZSAgICAgIC5iaW5kKG1lKSk7XG5cbiAgICAgICAgaWYgKE5lby5jb25maWcudXNlU2hhcmVkV29ya2Vycykge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIG1lLm9uQmVmb3JlVW5sb2FkLmJpbmQobWUpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBhZGREb21MaXN0ZW5lcihkYXRhKSB7XG4gICAgICAgIGxldCBtZSAgPSB0aGlzLFxuICAgICAgICAgICAgaSAgID0gMCxcbiAgICAgICAgICAgIGxlbiA9IGRhdGEuZXZlbnRzLmxlbmd0aCxcbiAgICAgICAgICAgIGV2ZW50LCBpZCwgdGFyZ2V0Tm9kZTtcblxuICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBldmVudCA9IGRhdGEuZXZlbnRzW2ldO1xuXG4gICAgICAgICAgICBpZiAoIW1lW2V2ZW50LmhhbmRsZXJdKSB7XG4gICAgICAgICAgICAgICAgbWVbZXZlbnQuaGFuZGxlcl0gPSBOZW8uZW1wdHlGbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWQgPSBldmVudC52bm9kZUlkIHx8IGRhdGEudm5vZGVJZDtcblxuICAgICAgICAgICAgaWYgKGlkID09PSAnZG9jdW1lbnQuYm9keScpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXROb2RlID0gZG9jdW1lbnQuYm9keTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Tm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGFyZ2V0Tm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50Lm5hbWUsIG1lW2V2ZW50LmhhbmRsZXJdLmJpbmQobWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIE5lby53b3JrZXIuTWFuYWdlci5zZW5kTWVzc2FnZShkYXRhLm9yaWdpbiwge1xuICAgICAgICAgICAgYWN0aW9uIDogJ3JlcGx5JyxcbiAgICAgICAgICAgIGRhdGEgICA6IGRhdGEsXG4gICAgICAgICAgICByZXBseUlkOiBkYXRhLmlkLFxuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGFkZEdsb2JhbERvbUxpc3RlbmVycygpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBbLi4uZ2xvYmFsRG9tRXZlbnRzXS5jb25jYXQoTmVvLmNvbmZpZy51c2VUb3VjaEV2ZW50cyA/IHRvdWNoRXZlbnRzIDogW10pLmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKGV2ZW50Lm5hbWUsIG1lW2V2ZW50LmhhbmRsZXJdLmJpbmQobWUpLCBldmVudC5vcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gcG9pbnRzXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB4MSBUaGUgWCBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgcG9pbnRcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHkxIFRoZSBZIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBwb2ludFxuICAgICAqIEBwYXJhbSAge051bWJlcn0geDIgVGhlIFggcG9zaXRpb24gb2YgdGhlIHNlY29uZCBwb2ludFxuICAgICAqIEBwYXJhbSAge051bWJlcn0geTIgVGhlIFkgcG9zaXRpb24gb2YgdGhlIHNlY29uZCBwb2ludFxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0RGlzdGFuY2UoeDEsIHkxLCB4MiwgeTIpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCgoeDIgLSB4MSkgKiogMiArICh5MiAtIHkxKSAqKiAyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2NhbCBkb21FdmVudCBsaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIGRvbUV2ZW50TGlzdGVuZXIoZXZlbnQpIHtcbiAgICAgICAgbGV0IG1lICAgICA9IHRoaXMsXG4gICAgICAgICAgICB0YXJnZXQgPSBldmVudC50YXJnZXQsXG4gICAgICAgICAgICBjb25maWcgPSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uICAgOiAnZG9tRXZlbnQnLFxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogZXZlbnQudHlwZSxcblxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgLi4ubWUuZ2V0RXZlbnREYXRhKGV2ZW50KSxcbiAgICAgICAgICAgICAgICAgICAgaWQgICA6IHRhcmdldC5pZCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2RvbUV2ZW50TGlzdGVuZXInLCBldmVudC50eXBlLCB0YXJnZXQuaWQsIHRhcmdldC52YWx1ZSwgZXZlbnQpO1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnZHJhZ2VuZCc6XG4gICAgICAgICAgICAgICAgbWUuZHJhZ0VsZW1lbnRJZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkcmFnZW50ZXInOlxuICAgICAgICAgICAgICAgIGlmIChtZS5kcmFnRWxlbWVudElkID09PSB0YXJnZXQuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBpZ25vcmUgdGFyZ2V0IGFuZCBzb3VyY2UgdG8gYmUgdGhlIHNhbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkcmFnbGVhdmUnOlxuICAgICAgICAgICAgICAgIGlmIChtZS5kcmFnRWxlbWVudElkID09PSB0YXJnZXQuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBpZ25vcmUgdGFyZ2V0IGFuZCBzb3VyY2UgdG8gYmUgdGhlIHNhbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkcmFnb3Zlcic6XG4gICAgICAgICAgICAgICAgbWUub25EcmFnT3ZlcihldmVudCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RyYWdzdGFydCc6XG4gICAgICAgICAgICAgICAgbWUuZHJhZ0VsZW1lbnRJZCA9IHRhcmdldC5pZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Ryb3AnOlxuICAgICAgICAgICAgICAgIGlmICghbWUuZHJhZ0VsZW1lbnRJZCB8fCBtZS5kcmFnRWxlbWVudElkID09PSB0YXJnZXQuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBkcm9wIGZpcmVzIHR3aWNlIGJ5IGRlZmF1bHQgJiBkcm9wIHNob3VsZCBub3QgdHJpZ2dlciBvbiB0aGUgZHJhZyBlbGVtZW50XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIHN0b3BzIHRoZSBicm93c2VyIGZyb20gcmVkaXJlY3RpbmcuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY29uZmlnLmRhdGEuc3JjSWQgPSBtZS5kcmFnRWxlbWVudElkO1xuICAgICAgICAgICAgICAgIG1lLmRyYWdFbGVtZW50SWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbW91c2Vtb3ZlJzpcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGNvbmZpZy5kYXRhLCBtZS5nZXRNb3VzZUV2ZW50RGF0YShldmVudCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgTmVvLndvcmtlci5NYW5hZ2VyLnNlbmRNZXNzYWdlKCdhcHAnLCBjb25maWcpO1xuICAgIH1cblxuICAgIGdldEV2ZW50RGF0YShldmVudCkge1xuICAgICAgICBsZXQgcGF0aCA9IGV2ZW50LnBhdGggfHwgZXZlbnQuY29tcG9zZWRQYXRoKCk7IC8vIEZGIGRvZXMgbm90IHN1cHBvcnQgcGF0aFxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXRoICAgICA6IHBhdGgubWFwKGUgPT4gdGhpcy5nZXRUYXJnZXREYXRhKGUpKSxcbiAgICAgICAgICAgIHRhcmdldCAgIDogdGhpcy5nZXRUYXJnZXREYXRhKGV2ZW50LnRhcmdldCksXG4gICAgICAgICAgICB0aW1lU3RhbXA6IGV2ZW50LnRpbWVTdGFtcCxcbiAgICAgICAgICAgIHR5cGUgICAgIDogZXZlbnQudHlwZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldEtleWJvYXJkRXZlbnREYXRhKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHthbHRLZXksIGNvZGUsIGN0cmxLZXksIGtleSwga2V5Q29kZSwgbWV0YUtleSwgc2hpZnRLZXl9ID0gZXZlbnQ7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0RXZlbnREYXRhKGV2ZW50KSxcbiAgICAgICAgICAgIGFsdEtleSAgOiBhbHRLZXksXG4gICAgICAgICAgICBjb2RlICAgIDogY29kZSxcbiAgICAgICAgICAgIGN0cmxLZXkgOiBjdHJsS2V5LFxuICAgICAgICAgICAga2V5ICAgICA6IGtleSxcbiAgICAgICAgICAgIGtleUNvZGUgOiBrZXlDb2RlLFxuICAgICAgICAgICAgbWV0YUtleSA6IG1ldGFLZXksXG4gICAgICAgICAgICBzaGlmdEtleTogc2hpZnRLZXlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRNb3VzZUV2ZW50RGF0YShldmVudCkge1xuICAgICAgICBjb25zdCB7YWx0S2V5LCBjbGllbnRYLCBjbGllbnRZLCBjdHJsS2V5LCBtZXRhS2V5LCBvZmZzZXRYLCBvZmZzZXRZLCBwYWdlWCwgcGFnZVksIHNjcmVlblgsIHNjcmVlblksIHNoaWZ0S2V5fSA9IGV2ZW50O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50aGlzLmdldEV2ZW50RGF0YShldmVudCksXG4gICAgICAgICAgICBhbHRLZXkgIDogYWx0S2V5LFxuICAgICAgICAgICAgY2xpZW50WCA6IGNsaWVudFgsXG4gICAgICAgICAgICBjbGllbnRZIDogY2xpZW50WSxcbiAgICAgICAgICAgIGN0cmxLZXkgOiBjdHJsS2V5LFxuICAgICAgICAgICAgbWV0YUtleSA6IG1ldGFLZXksXG4gICAgICAgICAgICBvZmZzZXRYIDogb2Zmc2V0WCxcbiAgICAgICAgICAgIG9mZnNldFkgOiBvZmZzZXRZLFxuICAgICAgICAgICAgcGFnZVggICA6IHBhZ2VYLFxuICAgICAgICAgICAgcGFnZVkgICA6IHBhZ2VZLFxuICAgICAgICAgICAgc2NyZWVuWCA6IHNjcmVlblgsXG4gICAgICAgICAgICBzY3JlZW5ZIDogc2NyZWVuWSxcbiAgICAgICAgICAgIHNoaWZ0S2V5OiBzaGlmdEtleVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICogQHJldHVybnMge0VsZW1lbnRbXX1cbiAgICAgKi9cbiAgICBnZXRQYXRoRnJvbUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICBsZXQgcGF0aCA9IFtdO1xuXG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICBwYXRoLnB1c2goZWxlbWVudCk7XG5cbiAgICAgICAgICAgIHdoaWxlIChlbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICBwYXRoLnB1c2goZWxlbWVudC5wYXJlbnROb2RlKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0VGFyZ2V0RGF0YShub2RlKSB7XG4gICAgICAgIGxldCByICAgID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QgJiYgbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICAgIHJlY3QgPSB7fTtcblxuICAgICAgICBpZiAocikge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihyZWN0LCB7XG4gICAgICAgICAgICAgICAgYm90dG9tOiByLmJvdHRvbSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHIuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIGxlZnQgIDogci5sZWZ0LFxuICAgICAgICAgICAgICAgIHJpZ2h0IDogci5yaWdodCxcbiAgICAgICAgICAgICAgICB0b3AgICA6IHIudG9wLFxuICAgICAgICAgICAgICAgIHdpZHRoIDogci53aWR0aCxcbiAgICAgICAgICAgICAgICB4ICAgICA6IHIueCxcbiAgICAgICAgICAgICAgICB5ICAgICA6IHIueVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2hlY2tlZCAgICAgICAgICA6IG5vZGUuY2hlY2tlZCxcbiAgICAgICAgICAgIGNoaWxkRWxlbWVudENvdW50OiBub2RlLmNoaWxkRWxlbWVudENvdW50LFxuICAgICAgICAgICAgY2xpZW50SGVpZ2h0ICAgICA6IG5vZGUuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgICAgY2xpZW50TGVmdCAgICAgICA6IG5vZGUuY2xpZW50TGVmdCxcbiAgICAgICAgICAgIGNsaWVudFRvcCAgICAgICAgOiBub2RlLmNsaWVudFRvcCxcbiAgICAgICAgICAgIGNsaWVudFdpZHRoICAgICAgOiBub2RlLmNsaWVudFdpZHRoLFxuICAgICAgICAgICAgY2xzICAgICAgICAgICAgICA6IG5vZGUuY2xhc3NMaXN0ID8gWy4uLm5vZGUuY2xhc3NMaXN0XSA6IFtdLFxuICAgICAgICAgICAgZGF0YSAgICAgICAgICAgICA6IHsuLi5ub2RlLmRhdGFzZXR9LFxuICAgICAgICAgICAgZHJhZ2dhYmxlICAgICAgICA6IG5vZGUuZHJhZ2dhYmxlLFxuICAgICAgICAgICAgaGlkZGVuICAgICAgICAgICA6IG5vZGUuaGlkZGVuLFxuICAgICAgICAgICAgaWQgICAgICAgICAgICAgICA6IG5vZGUuaWQsXG4gICAgICAgICAgICBpbmVydCAgICAgICAgICAgIDogbm9kZS5pbmVydCxcbiAgICAgICAgICAgIGlzQ29ubmVjdGVkICAgICAgOiBub2RlLmlzQ29ubmVjdGVkLFxuICAgICAgICAgICAgaXNDb250ZW50RWRpdGFibGU6IG5vZGUuaXNDb250ZW50RWRpdGFibGUsXG4gICAgICAgICAgICBub2RlVHlwZSAgICAgICAgIDogbm9kZS5ub2RlVHlwZSxcbiAgICAgICAgICAgIG9mZnNldEhlaWdodCAgICAgOiBub2RlLm9mZnNldEhlaWdodCxcbiAgICAgICAgICAgIG9mZnNldExlZnQgICAgICAgOiBub2RlLm9mZnNldExlZnQsXG4gICAgICAgICAgICBvZmZzZXRUb3AgICAgICAgIDogbm9kZS5vZmZzZXRUb3AsXG4gICAgICAgICAgICBvZmZzZXRXaWR0aCAgICAgIDogbm9kZS5vZmZzZXRXaWR0aCxcbiAgICAgICAgICAgIHJlY3QsXG4gICAgICAgICAgICBzY3JvbGxIZWlnaHQgICAgIDogbm9kZS5zY3JvbGxIZWlnaHQsXG4gICAgICAgICAgICBzY3JvbGxMZWZ0ICAgICAgIDogbm9kZS5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgc2Nyb2xsVG9wICAgICAgICA6IG5vZGUuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgc2Nyb2xsV2lkdGggICAgICA6IG5vZGUuc2Nyb2xsV2lkdGgsXG4gICAgICAgICAgICBzdHlsZSAgICAgICAgICAgIDogbm9kZS5zdHlsZSAmJiBub2RlLnN0eWxlLmNzc1RleHQsXG4gICAgICAgICAgICB0YWJJbmRleCAgICAgICAgIDogbm9kZS50YWJJbmRleCxcbiAgICAgICAgICAgIHRhZ05hbWUgICAgICAgICAgOiBub2RlLnRhZ05hbWUgJiYgbm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBmaXJzdCB0b3VjaCBldmVudCBmb3VuZCBpbiB0b3VjaGVzIG9yIGNoYW5nZWRUb3VjaGVzIG9mIGEgVG91Y2hFdmVudFxuICAgICAqIEBwYXJhbSB7VG91Y2hFdmVudH0gZXZlbnRcbiAgICAgKiBAcmV0dXJucyB7VG91Y2h9XG4gICAgICovXG4gICAgZ2V0VG91Y2hDb29yZHMoZXZlbnQpIHtcbiAgICAgICAgY29uc3Qge3RvdWNoZXMsIGNoYW5nZWRUb3VjaGVzfSA9IGV2ZW50O1xuICAgICAgICByZXR1cm4gKHRvdWNoZXMgJiYgdG91Y2hlc1swXSkgfHwgKGNoYW5nZWRUb3VjaGVzICYmIGNoYW5nZWRUb3VjaGVzWzBdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPbmx5IGluIHVzZSBpZiBOZW8uY29uZmlnLnVzZVNoYXJlZFdvcmtlcnMgPSB0cnVlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgb25CZWZvcmVVbmxvYWQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgTSA9IE5lby53b3JrZXIuTWFuYWdlcjtcblxuICAgICAgICBNLmJyb2FkY2FzdCh7XG4gICAgICAgICAgICBhY3Rpb24gOiAnZGlzY29ubmVjdCcsXG4gICAgICAgICAgICBhcHBOYW1lOiBNLmFwcE5hbWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKi9cbiAgICBvbkNoYW5nZShldmVudCkge1xuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlVG9BcHAoe1xuICAgICAgICAgICAgLi4udGhpcy5nZXRFdmVudERhdGEoZXZlbnQpLFxuICAgICAgICAgICAgdmFsaWQ6IGV2ZW50LnRhcmdldC5jaGVja1ZhbGlkaXR5KCksXG4gICAgICAgICAgICB2YWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgb25Eb3VibGVDbGljayhldmVudCkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIG1lLnNlbmRNZXNzYWdlVG9BcHAobWUuZ2V0TW91c2VFdmVudERhdGEoZXZlbnQpKTtcblxuICAgICAgICBpZiAobWUudGVzdFBhdGhJbmNsdXNpb24oZXZlbnQsIHByZXZlbnRDbGlja1RhcmdldHMpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKi9cbiAgICBvbkNvbnRleHRNZW51KGV2ZW50KSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgbWUuc2VuZE1lc3NhZ2VUb0FwcChtZS5nZXRNb3VzZUV2ZW50RGF0YShldmVudCkpO1xuXG4gICAgICAgIGlmIChtZS50ZXN0UGF0aEluY2x1c2lvbihldmVudCwgcHJldmVudENvbnRleHRtZW51VGFyZ2V0cykpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uRG9tQ29udGVudExvYWRlZCgpIHtcbiAgICAgICAgdGhpcy5hZGRHbG9iYWxEb21MaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5maXJlKCdkb21Db250ZW50TG9hZGVkJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKi9cbiAgICBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgbWUuc2VuZE1lc3NhZ2VUb0FwcChtZS5nZXRNb3VzZUV2ZW50RGF0YShldmVudCkpO1xuXG4gICAgICAgIGlmIChtZS50ZXN0UGF0aEluY2x1c2lvbihldmVudCwgcHJldmVudENsaWNrVGFyZ2V0cykpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG9uRHJhZ092ZXIoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ29uRHJhZ092ZXInLCBldmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKi9cbiAgICBvbkZvY3VzSW4oZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZVRvQXBwKHRoaXMuZ2V0RXZlbnREYXRhKGV2ZW50KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKi9cbiAgICBvbkZvY3VzT3V0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2VUb0FwcCh0aGlzLmdldEV2ZW50RGF0YShldmVudCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgb25IYXNoQ2hhbmdlKCkge1xuICAgICAgICBjb25zdCBNYW5hZ2VyICAgID0gTmVvLndvcmtlci5NYW5hZ2VyLFxuICAgICAgICAgICAgICBoYXNoU3RyaW5nID0gbG9jYXRpb24uaGFzaC5zdWJzdHIoMSk7XG5cbiAgICAgICAgTWFuYWdlci5zZW5kTWVzc2FnZSgnYXBwJywge1xuICAgICAgICAgICAgYWN0aW9uOiAnaGFzaENoYW5nZScsXG4gICAgICAgICAgICBkYXRhICA6IHtcbiAgICAgICAgICAgICAgICBhcHBOYW1lICAgOiBNYW5hZ2VyLmFwcE5hbWUsXG4gICAgICAgICAgICAgICAgaGFzaCAgICAgIDogdGhpcy5wYXJzZUhhc2goaGFzaFN0cmluZyksXG4gICAgICAgICAgICAgICAgaGFzaFN0cmluZzogaGFzaFN0cmluZ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG9uS2V5RG93bihldmVudCkge1xuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlVG9BcHAodGhpcy5nZXRLZXlib2FyZEV2ZW50RGF0YShldmVudCkpO1xuXG4gICAgICAgIGlmIChbJ0Fycm93RG93bicsICdBcnJvd0xlZnQnLCAnQXJyb3dSaWdodCcsICdBcnJvd1VwJ10uaW5jbHVkZXMoZXZlbnQua2V5KSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgb25LZXlVcChldmVudCkge1xuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlVG9BcHAodGhpcy5nZXRLZXlib2FyZEV2ZW50RGF0YShldmVudCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgb25Nb3VzZUVudGVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2VUb0FwcCh7XG4gICAgICAgICAgICAuLi50aGlzLmdldE1vdXNlRXZlbnREYXRhKGV2ZW50KSxcbiAgICAgICAgICAgIGZyb21FbGVtZW50SWQ6IGV2ZW50LmZyb21FbGVtZW50ICYmIGV2ZW50LmZyb21FbGVtZW50LmlkIHx8IG51bGxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKi9cbiAgICBvbk1vdXNlTGVhdmUoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZVRvQXBwKHtcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0TW91c2VFdmVudERhdGEoZXZlbnQpLFxuICAgICAgICAgICAgdG9FbGVtZW50SWQ6IGV2ZW50LnRvRWxlbWVudCAmJiBldmVudC50b0VsZW1lbnQuaWQgfHwgbnVsbFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG9uV2hlZWwoZXZlbnQpIHtcbiAgICAgICAgbGV0IHRhcmdldCAgICAgICAgPSB0aGlzLnRlc3RQYXRoSW5jbHVzaW9uKGV2ZW50LCBnbG9iYWxXaGVlbFRhcmdldHMpLFxuICAgICAgICAgICAgcHJldmVudFVwZGF0ZSA9IGZhbHNlLFxuICAgICAgICAgICAgdGFyZ2V0Q2xzO1xuXG4gICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgIHRhcmdldENscyA9IHRhcmdldC5jbHM7XG5cbiAgICAgICAgICAgIGlmIChnbG9iYWxXaGVlbFRhcmdldHNCdWZmZXJbdGFyZ2V0LmNsc10pIHtcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAobGFzdFdoZWVsRXZlbnQuZGF0ZSAmJiBsYXN0V2hlZWxFdmVudC50YXJnZXQgPT09IHRhcmdldENscyAmJiBkYXRlIC0gbGFzdFdoZWVsRXZlbnQuZGF0ZSA8IGdsb2JhbFdoZWVsVGFyZ2V0c0J1ZmZlclt0YXJnZXRDbHNdKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnRVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obGFzdFdoZWVsRXZlbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUgIDogZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0Q2xzXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgIGlmICghcHJldmVudFVwZGF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtkZWx0YVgsIGRlbHRhWSwgZGVsdGFafSA9IGV2ZW50O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kTWVzc2FnZVRvQXBwKHtcbiAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5nZXRFdmVudERhdGEoZXZlbnQpLFxuICAgICAgICAgICAgICAgICAgICBjbGllbnRIZWlnaHQ6IHRhcmdldC5ub2RlLmNsaWVudEhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50V2lkdGggOiB0YXJnZXQubm9kZS5jbGllbnRXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFYICAgICAgOiBkZWx0YVgsXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhWSAgICAgIDogZGVsdGFZLFxuICAgICAgICAgICAgICAgICAgICBkZWx0YVogICAgICA6IGRlbHRhWixcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTGVmdCAgOiB0YXJnZXQubm9kZS5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3AgICA6IHRhcmdldC5ub2RlLnNjcm9sbFRvcFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWdsb2JhbFdoZWVsVGFyZ2V0c0tlZXBFdmVudC5pbmNsdWRlcyh0YXJnZXRDbHMpKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4YW1wbGUgZm9yIEFycmF5IHZhbHVlczogXCJjYXRlZ29yaWVzW109dGVzdDEmY2F0ZWdvcmllc1tdPXRlc3QyXCJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBwYXJzZUhhc2goc3RyKSB7XG4gICAgICAgIGlmIChzdHIgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGllY2VzID0gc3RyLnNwbGl0KCcmJyksXG4gICAgICAgICAgICBkYXRhICAgPSB7fSxcbiAgICAgICAgICAgIGksIGtleSwgcGFydHMsIHZhbHVlO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwaWVjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBhcnRzID0gcGllY2VzW2ldLnNwbGl0KCc9Jyk7XG5cbiAgICAgICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgcGFydHMucHVzaCgnJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGtleSAgID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzBdKTtcbiAgICAgICAgICAgIHZhbHVlID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzFdKTtcblxuICAgICAgICAgICAgaWYgKGtleS5pbmRleE9mKCdbXScpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGtleSA9IGtleS5zdWJzdHJpbmcoMCwga2V5LmluZGV4T2YoJ1tdJykpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFba2V5XSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRhdGFba2V5XS5wdXNoKHRoaXMucGFyc2VWYWx1ZSh2YWx1ZSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhW2tleV0gPSB0aGlzLnBhcnNlVmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdXNlZCBieSBwYXJzZUhhc2ggdG8gY29udmVydCB0b2tlbnMgaW50byBib29sZWFuIG9yIG51bWJlciB0eXBlcyBpZiBuZWVkZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbnxOdW1iZXJ8U3RyaW5nfVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBwYXJzZVZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBwYXJzZUludCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gcGFyc2VJbnQodmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGRhdGEuY2xzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEubmFtZVxuICAgICAqL1xuICAgIHJlZ2lzdGVyUHJldmVudERlZmF1bHRUYXJnZXRzKGRhdGEpIHtcbiAgICAgICAgbGV0IHByZXZlbnRBcnJheTtcblxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YS5jbHMpKSB7XG4gICAgICAgICAgICBkYXRhLmNscyA9IFtkYXRhLmNsc107XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGRhdGEubmFtZSkge1xuICAgICAgICAgICAgY2FzZSAnY2xpY2snOlxuICAgICAgICAgICAgICAgIHByZXZlbnRBcnJheSA9IHByZXZlbnRDbGlja1RhcmdldHM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjb250ZXh0bWVudSc6XG4gICAgICAgICAgICAgICAgcHJldmVudEFycmF5ID0gcHJldmVudENvbnRleHRtZW51VGFyZ2V0cztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGEuY2xzLmZvckVhY2goY2xzID0+IHtcbiAgICAgICAgICAgIGlmICghcHJldmVudEFycmF5LmluY2x1ZGVzKGNscykpIHtcbiAgICAgICAgICAgICAgICBwcmV2ZW50QXJyYXkucHVzaChjbHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kcyB0aGUgcGFyc2VkIGV2ZW50IGRhdGEgdG8gdGhlIGFwcCB3b3JrZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBzZW5kTWVzc2FnZVRvQXBwKGRhdGEpIHtcbiAgICAgICAgTmVvLndvcmtlci5NYW5hZ2VyLnNlbmRNZXNzYWdlKCdhcHAnLCB7XG4gICAgICAgICAgICBhY3Rpb24gICA6ICdkb21FdmVudCcsXG4gICAgICAgICAgICBldmVudE5hbWU6IGRhdGEudHlwZSxcbiAgICAgICAgICAgIGRhdGEgICAgIDogZGF0YVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0QXJyYXlcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fEJvb2xlYW59IHRhcmdldCBjbHMgJiBub2RlIGlmIGZvdW5kLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKi9cbiAgICB0ZXN0UGF0aEluY2x1c2lvbihldmVudCwgdGFyZ2V0QXJyYXkpIHtcbiAgICAgICAgbGV0IGNvdW50VGFyZ2V0cyA9IHRhcmdldEFycmF5Lmxlbmd0aCxcbiAgICAgICAgICAgIHBhdGggICAgICAgICA9IGV2ZW50LnBhdGggfHwgZXZlbnQuY29tcG9zZWRQYXRoKCksXG4gICAgICAgICAgICBpICAgICAgICAgICAgPSAwLFxuICAgICAgICAgICAgbGVuICAgICAgICAgID0gcGF0aC5sZW5ndGgsXG4gICAgICAgICAgICBqLCBub2RlO1xuXG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIG5vZGUgPSBwYXRoW2ldO1xuXG4gICAgICAgICAgICBmb3IgKGo9MDsgaiA8IGNvdW50VGFyZ2V0czsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuY2xhc3NMaXN0ICYmIG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKHRhcmdldEFycmF5W2pdKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xzIDogdGFyZ2V0QXJyYXlbal0sXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlOiBub2RlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoRG9tRXZlbnRzKTtcblxubGV0IGluc3RhbmNlID0gTmVvLmNyZWF0ZShEb21FdmVudHMpO1xuXG5OZW8uYXBwbHlUb0dsb2JhbE5zKGluc3RhbmNlKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7XG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vQW1DaGFydHMubWpzXCI6IFtcblx0XHRcIi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL21haW4vYWRkb24vQW1DaGFydHMubWpzXCIsXG5cdFx0XCJzcmMvbWFpbi9hZGRvbi9BbUNoYXJ0cy1tanNcIlxuXHRdLFxuXHRcIi4vQW5hbHl0aWNzQnlHb29nbGUubWpzXCI6IFtcblx0XHRcIi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL21haW4vYWRkb24vQW5hbHl0aWNzQnlHb29nbGUubWpzXCIsXG5cdFx0XCJzcmMvbWFpbi9hZGRvbi9BbmFseXRpY3NCeUdvb2dsZS1tanNcIlxuXHRdLFxuXHRcIi4vRHJhZ0Ryb3AubWpzXCI6IFtcblx0XHRcIi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL21haW4vYWRkb24vRHJhZ0Ryb3AubWpzXCIsXG5cdFx0XCJzcmMvbWFpbi9hZGRvbi9EcmFnRHJvcC1tanNcIlxuXHRdLFxuXHRcIi4vSGlnaGxpZ2h0SlMubWpzXCI6IFtcblx0XHRcIi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL21haW4vYWRkb24vSGlnaGxpZ2h0SlMubWpzXCIsXG5cdFx0XCJzcmMvbWFpbi9hZGRvbi9IaWdobGlnaHRKUy1tanNcIlxuXHRdLFxuXHRcIi4vTG9jYWxTdG9yYWdlLm1qc1wiOiBbXG5cdFx0XCIuL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9tYWluL2FkZG9uL0xvY2FsU3RvcmFnZS5tanNcIixcblx0XHRcInNyYy9tYWluL2FkZG9uL0xvY2FsU3RvcmFnZS1tanNcIlxuXHRdLFxuXHRcIi4vTWFwYm94R0wubWpzXCI6IFtcblx0XHRcIi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL21haW4vYWRkb24vTWFwYm94R0wubWpzXCIsXG5cdFx0XCJzcmMvbWFpbi9hZGRvbi9NYXBib3hHTC1tanNcIlxuXHRdLFxuXHRcIi4vTWFya2Rvd24ubWpzXCI6IFtcblx0XHRcIi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL21haW4vYWRkb24vTWFya2Rvd24ubWpzXCIsXG5cdFx0XCJzcmMvbWFpbi9hZGRvbi9NYXJrZG93bi1tanNcIlxuXHRdLFxuXHRcIi4vU2llc3RhLm1qc1wiOiBbXG5cdFx0XCIuL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9tYWluL2FkZG9uL1NpZXN0YS5tanNcIixcblx0XHRcInNyYy9tYWluL2FkZG9uL1NpZXN0YS1tanNcIlxuXHRdLFxuXHRcIi4vU3R5bGVzaGVldC5tanNcIjogW1xuXHRcdFwiLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9hZGRvbi9TdHlsZXNoZWV0Lm1qc1wiLFxuXHRcdFwic3JjL21haW4vYWRkb24vU3R5bGVzaGVldC1tanNcIlxuXHRdXG59O1xuZnVuY3Rpb24gd2VicGFja0FzeW5jQ29udGV4dChyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbigpIHtcblx0XHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHRcdHRocm93IGU7XG5cdFx0fSk7XG5cdH1cblxuXHR2YXIgaWRzID0gbWFwW3JlcV0sIGlkID0gaWRzWzBdO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGlkc1sxXSkudGhlbihmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG5cdH0pO1xufVxud2VicGFja0FzeW5jQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0FzeW5jQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tBc3luY0NvbnRleHQuaWQgPSBcIi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL21haW4vYWRkb24gbGF6eSByZWN1cnNpdmUgXlxcXFwuXFxcXC8uKlxcXFwubWpzJFwiO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQXN5bmNDb250ZXh0OyIsImltcG9ydCBCYXNlIGZyb20gJy4uLy4uL2NvcmUvQmFzZS5tanMnO1xuXG4vKipcbiAqIExvZ2ljIHRvIGFwcGx5IHRoZSBkZWx0YXMgZ2VuZXJhdGVkIGJ5IHZkb20uSGVscGVyIHRvIHRoZSByZWFsIERPTVxuICogQGNsYXNzIE5lby5tYWluLm1peGluLkRlbHRhVXBkYXRlc1xuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICogQHNpbmdsZXRvblxuICovXG5jbGFzcyBEZWx0YVVwZGF0ZXMgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLm1haW4ubWl4aW4uRGVsdGFVcGRhdGVzJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8ubWFpbi5taXhpbi5EZWx0YVVwZGF0ZXMnXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRlbHRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRlbHRhLmlkXG4gICAgICovXG4gICAgZHVfZm9jdXNOb2RlKGRlbHRhKSB7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudChkZWx0YS5pZCkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBub2RlLmNoaWxkcmVuIGNvbnRhaW5zIHRoZSBcInJlYWxcIiBub2RlcyAodGFncylcbiAgICAgKiBub2RlLmNoaWxkTm9kZXMgY29udGFpbnMgdGV4dHMgJiBjb21tZW50cyBhcyBub2RlcyB0b29cbiAgICAgKiBzaW5jZSBldmVyeSB2dHlwZTondGV4dCcgaXMgd3JhcHBlZCBpbnNpZGUgYSBjb21tZW50IGJsb2NrIChhcyBhbiBpZCksXG4gICAgICogd2UgbmVlZCB0aGUgYW1vdW50IG9mIG5vZGVzIHdoaWNoIGFyZSBub3QgY29tbWVudHMgdG8gZ2V0IHRoZSBcInJlYWxJbmRleFwiLlxuICAgICAqIGluc2VydEFkamFjZW50SFRNTCgpIGlzIGZhc3RlciB0aGFuIGNyZWF0aW5nIGEgbm9kZSAodGVtcGxhdGUpLCBidXQgb25seSBhdmFpbGFibGVcbiAgICAgKiBmb3IgY2hpbGRyZW4gYW5kIG5vdCBmb3IgY2hpbGROb2Rlcy5cbiAgICAgKiBJbiBjYXNlIHRoZXJlIGFyZSBubyBjb21tZW50cyAoPT4gdnR5cGU6ICd0ZXh0JyBub2RlcyksIHdlIHN0aWNrIHRvIGl0IGZvciBwZXJmb3JtYW5jZSByZWFzb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRlbHRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRlbHRhLmluZGV4XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRlbHRhLm91dGVySFRNTFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkZWx0YS5wYXJlbnRJZFxuICAgICAqL1xuICAgIGR1X2luc2VydE5vZGUoZGVsdGEpIHtcbiAgICAgICAgbGV0IGluZGV4ICAgICAgICAgPSBkZWx0YS5pbmRleCxcbiAgICAgICAgICAgIHBhcmVudE5vZGUgICAgPSB0aGlzLmdldEVsZW1lbnQoZGVsdGEucGFyZW50SWQpLFxuICAgICAgICAgICAgY291bnRDaGlsZHJlbiA9IHBhcmVudE5vZGUuY2hpbGROb2Rlcy5sZW5ndGgsXG4gICAgICAgICAgICBpICAgICAgICAgICAgID0gMCxcbiAgICAgICAgICAgIHJlYWxJbmRleCAgICAgPSBpbmRleCxcbiAgICAgICAgICAgIGhhc0NvbW1lbnRzICAgPSBmYWxzZSxcbiAgICAgICAgICAgIG5vZGU7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2luc2VydE5vZGUnLCBpbmRleCwgY291bnRDaGlsZHJlbiwgZGVsdGEucGFyZW50SWQpO1xuXG4gICAgICAgIGZvciAoOyBpIDwgY291bnRDaGlsZHJlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50Tm9kZS5jaGlsZE5vZGVzW2ldLm5vZGVUeXBlID09PSA4KSB7IC8vIGlnbm9yZSBjb21tZW50c1xuICAgICAgICAgICAgICAgIGlmIChpIDwgcmVhbEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWxJbmRleCsrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGhhc0NvbW1lbnRzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaGFzQ29tbWVudHMpIHtcbiAgICAgICAgICAgIGNvdW50Q2hpbGRyZW4gPSBwYXJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKGNvdW50Q2hpbGRyZW4gPiAwICYmIGNvdW50Q2hpbGRyZW4gPiBpbmRleCkge1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUuY2hpbGRyZW5baW5kZXhdLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlYmVnaW4nLCBkZWx0YS5vdXRlckhUTUwpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudENoaWxkcmVuID4gMCkge1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUuY2hpbGRyZW5bY291bnRDaGlsZHJlbiAtIDFdLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCBkZWx0YS5vdXRlckhUTUwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgZGVsdGEub3V0ZXJIVE1MKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLmh0bWxTdHJpbmdUb0VsZW1lbnQoZGVsdGEub3V0ZXJIVE1MKTtcblxuICAgICAgICAgICAgaWYgKGNvdW50Q2hpbGRyZW4gPiAwICYmIGNvdW50Q2hpbGRyZW4gPiByZWFsSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCBwYXJlbnROb2RlLmNoaWxkTm9kZXNbcmVhbEluZGV4XSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkZWx0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkZWx0YS5pZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkZWx0YS5pbmRleFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkZWx0YS5wYXJlbnRJZFxuICAgICAqL1xuICAgIGR1X21vdmVOb2RlKGRlbHRhKSB7XG4gICAgICAgIGxldCBpbmRleCAgICAgID0gZGVsdGEuaW5kZXgsXG4gICAgICAgICAgICBub2RlICAgICAgID0gdGhpcy5nZXRFbGVtZW50KGRlbHRhLmlkKSxcbiAgICAgICAgICAgIHBhcmVudE5vZGUgPSB0aGlzLmdldEVsZW1lbnQoZGVsdGEucGFyZW50SWQpO1xuXG4gICAgICAgIGlmIChpbmRleCA+PSBwYXJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgcGFyZW50Tm9kZS5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vaW5kZXgrKzsgLy8gdG9kbz86IGluY3JlYXNlIHRoZSBpbmRleCBpbiBjYXNlIHNhbWUgcGFyZW50LCBvbGRJbmRleCA8IG5ld0luZGV4LCBkaXJlY3Qgc3dhcFxuICAgICAgICAgICAgaWYgKG5vZGUgJiYgcGFyZW50Tm9kZS5jaGlsZHJlbltpbmRleF0uaWQgIT09IGRlbHRhLmlkKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobm9kZSwgcGFyZW50Tm9kZS5jaGlsZHJlbltpbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGVsdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGVsdGEuaWRcbiAgICAgKi9cbiAgICBkdV9yZW1vdmVOb2RlKGRlbHRhKSB7XG4gICAgICAgIGxldCBub2RlID0gdGhpcy5nZXRFbGVtZW50KGRlbHRhLmlkKTtcblxuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUud2FybignZHVfcmVtb3ZlTm9kZTogZG9tIG5vZGUgbm90IGZvdW5kIGZvciBpZCcsIGRlbHRhLmlkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRlbHRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRlbHRhLmZyb21JZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkZWx0YS5wYXJlbnRJZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkZWx0YS50b0lkXG4gICAgICovXG4gICAgZHVfcmVwbGFjZUNoaWxkKGRlbHRhKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIG5vZGUgPSBtZS5nZXRFbGVtZW50KGRlbHRhLnBhcmVudElkKTtcblxuICAgICAgICBub2RlLnJlcGxhY2VDaGlsZChtZS5nZXRFbGVtZW50KGRlbHRhLnRvSWQpLCBtZS5nZXRFbGVtZW50KGRlbHRhLmZyb21JZCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRlbHRhXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtkZWx0YS5hdHRyaWJ1dGVzXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbZGVsdGEuY2xzXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbZGVsdGEuaWRdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtkZWx0YS5pbm5lckhUTUxdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtkZWx0YS5vdXRlckhUTUxdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtkZWx0YS5zdHlsZV1cbiAgICAgKi9cbiAgICBkdV91cGRhdGVOb2RlKGRlbHRhKSB7XG4gICAgICAgIGxldCBub2RlID0gdGhpcy5nZXRFbGVtZW50T3JCb2R5KGRlbHRhLmlkKTtcblxuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignZHVfdXBkYXRlTm9kZTogbm9kZSBub3QgZm91bmQgZm9yIGlkJywgZGVsdGEuaWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMoZGVsdGEpLmZvckVhY2goKFtwcm9wLCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2gocHJvcCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdhdHRyaWJ1dGVzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKHZhbHVlKS5mb3JFYWNoKChba2V5LCB2YWxdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudm9pZEF0dHJpYnV0ZXMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlW2tleV0gPSB2YWwgPT09ICd0cnVlJzsgLy8gdm5vZGUgYXR0cmlidXRlIHZhbHVlcyBnZXQgY29udmVydGVkIGludG8gc3RyaW5nc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ3ZhbHVlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZVtrZXldID0gJyc7IC8vIGlucHV0IGZpZWxkcyA9PiBwc2V1ZG8gYXR0cmlidXRlIGNhbiBub3QgYmUgcmVtb3ZlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVba2V5XSA9IHZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjbHMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKC4uLnZhbHVlLmFkZCB8fCBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoLi4udmFsdWUucmVtb3ZlIHx8IFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdpbm5lckhUTUwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5pbm5lckhUTUwgPSB2YWx1ZSB8fCAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdvdXRlckhUTUwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5vdXRlckhUTUwgPSB2YWx1ZSB8fCAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdzdHlsZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTmVvLmlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKHZhbHVlKS5mb3JFYWNoKChba2V5LCB2YWxdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOZW8uaXNTdHJpbmcodmFsKSAmJiB2YWwuaW5jbHVkZXMoJyFpbXBvcnRhbnQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gdmFsLnJlcGxhY2UoJyFpbXBvcnRhbnQnLCAnJykudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zdHlsZS5zZXRQcm9wZXJ0eShOZW8uZGVjYW1lbChrZXkpLCB2YWwsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc3R5bGVbTmVvLmRlY2FtZWwoa2V5KV0gPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGVsdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGVsdGEuaWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGVsdGEucGFyZW50SWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGVsdGEudmFsdWVcbiAgICAgKi9cbiAgICBkdV91cGRhdGVWdGV4dChkZWx0YSkge1xuICAgICAgICBsZXQgbWUgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIG5vZGUgICAgICA9IG1lLmdldEVsZW1lbnQoZGVsdGEucGFyZW50SWQpLFxuICAgICAgICAgICAgaW5uZXJIVE1MID0gbm9kZS5pbm5lckhUTUwsXG4gICAgICAgICAgICBzdGFydFRhZyAgPSBgPCEtLSAke2RlbHRhLmlkfSAtLT5gLFxuICAgICAgICAgICAgcmVnICAgICAgID0gbmV3IFJlZ0V4cChzdGFydFRhZyArICdbXFxcXHNcXFxcU10qPzwhLS0gXFwvbmVvLXZ0ZXh0IC0tPicpO1xuXG4gICAgICAgIG5vZGUuaW5uZXJIVE1MID0gaW5uZXJIVE1MLnJlcGxhY2UocmVnLCBkZWx0YS52YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGh0bWwgcmVwcmVzZW50aW5nIGEgc2luZ2xlIGVsZW1lbnRcbiAgICAgKiBAcmV0dXJucyB7Q2hpbGROb2RlfVxuICAgICAqL1xuICAgIGh0bWxTdHJpbmdUb0VsZW1lbnQoaHRtbCkge1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZS5jb250ZW50LmZpcnN0Q2hpbGQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fE9iamVjdFtdfSBkYXRhLmRlbHRhc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtkYXRhLm9yaWdpbj0nYXBwJ11cbiAgICAgKi9cbiAgICB1cGRhdGUoZGF0YSkge1xuICAgICAgICBsZXQgbWUgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGRlbHRhcyA9IGRhdGEuZGVsdGFzLFxuICAgICAgICAgICAgaSAgICAgID0gMCxcbiAgICAgICAgICAgIGxlbjtcblxuICAgICAgICBkZWx0YXMgPSBBcnJheS5pc0FycmF5KGRlbHRhcykgPyBkZWx0YXMgOiBbZGVsdGFzXTtcbiAgICAgICAgbGVuICAgID0gZGVsdGFzLmxlbmd0aDtcblxuICAgICAgICBpZiAobWUubG9nRGVsdGFVcGRhdGVzICYmIGxlbiA+IDApIHtcbiAgICAgICAgICAgIG1lLmNvdW50RGVsdGFzICs9IChsZW4gfHwgMCk7XG4gICAgICAgICAgICBtZS5jb3VudFVwZGF0ZXMrKztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGUgJyArIG1lLmNvdW50VXBkYXRlcywgJ3RvdGFsIGRlbHRhcyAnLCBtZS5jb3VudERlbHRhcywgTmVvLmNsb25lKGRhdGEsIHRydWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1hcCA9IHtcbiAgICAgICAgICAgIGZvY3VzTm9kZSAgIDogbWUuZHVfZm9jdXNOb2RlLFxuICAgICAgICAgICAgaW5zZXJ0Tm9kZSAgOiBtZS5kdV9pbnNlcnROb2RlLFxuICAgICAgICAgICAgbW92ZU5vZGUgICAgOiBtZS5kdV9tb3ZlTm9kZSxcbiAgICAgICAgICAgIHJlbW92ZU5vZGUgIDogbWUuZHVfcmVtb3ZlTm9kZSxcbiAgICAgICAgICAgIHJlcGxhY2VDaGlsZDogbWUuZHVfcmVwbGFjZUNoaWxkLFxuICAgICAgICAgICAgdXBkYXRlVnRleHQgOiBtZS5kdV91cGRhdGVWdGV4dCxcbiAgICAgICAgICAgIGRlZmF1bHQgICAgIDogbWUuZHVfdXBkYXRlTm9kZVxuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIChtYXBbZGVsdGFzW2ldLmFjdGlvbl0gfHwgbWFwWydkZWZhdWx0J10pLmNhbGwobWUsIGRlbHRhc1tpXSk7XG4gICAgICAgIH1cblxuICAgICAgICBOZW8ud29ya2VyLk1hbmFnZXIuc2VuZE1lc3NhZ2UoZGF0YS5vcmlnaW4gfHwgJ2FwcCcsIHtcbiAgICAgICAgICAgIGFjdGlvbiA6ICdyZXBseScsXG4gICAgICAgICAgICByZXBseUlkOiBkYXRhLmlkLFxuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKERlbHRhVXBkYXRlcyk7XG5cbmV4cG9ydCB7RGVsdGFVcGRhdGVzIGFzIGRlZmF1bHR9OyIsImltcG9ydCBCYXNlIGZyb20gJy4uLy4uL2NvcmUvQmFzZS5tanMnO1xuXG4vKipcbiAqIFdpbGwgZ2V0IGltcG9ydGVkIGluIGNhc2UgTmVvLmNvbmZpZy51c2VUb3VjaEV2ZW50cyA9PT0gdHJ1ZVxuICogQGNsYXNzIE5lby5tYWluLm1peGluLlRvdWNoRG9tRXZlbnRzXG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKiBAc2luZ2xldG9uXG4gKi9cbmNsYXNzIFRvdWNoRG9tRXZlbnRzIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5tYWluLm1peGluLlRvdWNoRG9tRXZlbnRzJ1xuICAgICAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdOZW8ubWFpbi5taXhpbi5Ub3VjaERvbUV2ZW50cydcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgb25Ub3VjaENhbmNlbChldmVudCkge1xuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlVG9BcHAodGhpcy5nZXRFdmVudERhdGEoZXZlbnQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG9uVG91Y2hFbmQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZVRvQXBwKHRoaXMuZ2V0RXZlbnREYXRhKGV2ZW50KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKi9cbiAgICBvblRvdWNoRW50ZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZVRvQXBwKHRoaXMuZ2V0RXZlbnREYXRhKGV2ZW50KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKi9cbiAgICBvblRvdWNoTGVhdmUoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZVRvQXBwKHRoaXMuZ2V0RXZlbnREYXRhKGV2ZW50KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKi9cbiAgICBvblRvdWNoTW92ZShldmVudCkge1xuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlVG9BcHAodGhpcy5nZXRFdmVudERhdGEoZXZlbnQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG9uVG91Y2hTdGFydChldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnb25Ub3VjaFN0YXJ0JywgZXZlbnQpO1xuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlVG9BcHAodGhpcy5nZXRFdmVudERhdGEoZXZlbnQpKTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKFRvdWNoRG9tRXZlbnRzKTtcblxuZXhwb3J0IHtUb3VjaERvbUV2ZW50cyBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQmFzZSAgICAgICAgICAgICAgIGZyb20gJy4uL2NvcmUvQmFzZS5tanMnO1xuaW1wb3J0IERvbUFjY2VzcyAgICAgICAgICBmcm9tICcuLi9tYWluL0RvbUFjY2Vzcy5tanMnO1xuaW1wb3J0IERvbUV2ZW50cyAgICAgICAgICBmcm9tICcuLi9tYWluL0RvbUV2ZW50cy5tanMnO1xuaW1wb3J0IE1lc3NhZ2UgICAgICAgICAgICBmcm9tICcuL01lc3NhZ2UubWpzJztcbmltcG9ydCBPYnNlcnZhYmxlICAgICAgICAgZnJvbSAnLi4vY29yZS9PYnNlcnZhYmxlLm1qcyc7XG5pbXBvcnQgUmVtb3RlTWV0aG9kQWNjZXNzIGZyb20gJy4vbWl4aW4vUmVtb3RlTWV0aG9kQWNjZXNzLm1qcyc7XG5cbi8qKlxuICogVGhlIHdvcmtlciBtYW5hZ2VyIGxpdmVzIGluc2lkZSB0aGUgbWFpbiB0aHJlYWQgYW5kIGNyZWF0ZXMgdGhlIEFwcCwgRGF0YSAmIFZEb20gd29ya2VyLlxuICogQWxzbyByZXNwb25zaWJsZSBmb3Igc2VuZGluZyBtZXNzYWdlcyBmcm9tIHRoZSBtYWluIHRocmVhZCB0byB0aGUgZGlmZmVyZW50IHdvcmtlcnMuXG4gKiBAY2xhc3MgTmVvLndvcmtlci5NYW5hZ2VyXG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKiBAc2luZ2xldG9uXG4gKi9cbmNsYXNzIE1hbmFnZXIgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLndvcmtlci5NYW5hZ2VyJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8ud29ya2VyLk1hbmFnZXInLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0nd29ya2VyLW1hbmFnZXInXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnd29ya2VyLW1hbmFnZXInLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Ym9vbGVhbn0gc2luZ2xldG9uPXRydWVcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc2luZ2xldG9uOiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IGFwcE5hbWU9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBhcHBOYW1lOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGJhc2UgcGF0aCBmb3IgdGhlIHdvcmtlciBmaWxlIFVSTHMsIGNhbiBlLmcuIGdldCBzZXQgaW5zaWRlIHRoZSBpbmRleC5odG1sLlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gYmFzZVBhdGg9TmVvLmNvbmZpZy53b3JrZXJCYXNlUGF0aCB8fCAnd29ya2VyLydcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgYmFzZVBhdGg6IE5lby5jb25maWcud29ya2VyQmFzZVBhdGggfHwgJ3dvcmtlci8nLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBjb25zdHJ1Y3RlZFRocmVhZHM9MFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RlZFRocmVhZHM6IDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXXxOZW8uY29yZS5CYXNlW118bnVsbH0gbWl4aW5zPVtPYnNlcnZhYmxlLCBSZW1vdGVNZXRob2RBY2Nlc3NdXG4gICAgICAgICAqL1xuICAgICAgICBtaXhpbnM6IFtPYnNlcnZhYmxlLCBSZW1vdGVNZXRob2RBY2Nlc3NdLFxuICAgICAgICAvKipcbiAgICAgICAgICogVHJ1ZSBpbiBjYXNlIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgd2luZG93LlNoYXJlZFdvcmtlci5cbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc2hhcmVkV29ya2Vyc0VuYWJsZWQ9ZmFsc2VcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc2hhcmVkV29ya2Vyc0VuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogSW50ZXJuYWwgZmxhZyB0byBzdG9wIHRoZSB3b3JrZXIgY29tbXVuaWNhdGlvbiBpbiBjYXNlIHRoZWlyIGNyZWF0aW9uIGZhaWxzXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHN0b3BDb21tdW5pY2F0aW9uPWZhbHNlXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHN0b3BDb21tdW5pY2F0aW9uOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRydWUgaW4gY2FzZSB0aGUgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIHdpbmRvdy5Xb3JrZXIuXG4gICAgICAgICAqIFRoZSBuZW8ubWpzIGZyYW1ld29yayBpcyBub3QgYWJsZSB0byBydW4gd2l0aG91dCB3ZWIgd29ya2Vycy5cbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc2hhcmVkV29ya2Vyc0VuYWJsZWQ9ZmFsc2VcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgd2ViV29ya2Vyc0VuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGFpbnMgdGhlIGZpbGVOYW1lcyBmb3IgdGhlIEFwcCwgRGF0YSAmIFZkb20gd29ya2Vyc1xuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHdvcmtlcnNcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgd29ya2Vyczoge1xuICAgICAgICAgICAgYXBwOiB7XG4gICAgICAgICAgICAgICAgZmlsZU5hbWU6IE5lby5jb25maWcuaXNFeHBlcmltZW50YWwgPyAnQXBwLm1qcycgIDogJ2FwcHdvcmtlci5qcydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZmlsZU5hbWU6IE5lby5jb25maWcuaXNFeHBlcmltZW50YWwgPyAnRGF0YS5tanMnIDogJ2RhdGF3b3JrZXIuanMnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmRvbToge1xuICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBOZW8uY29uZmlnLmlzRXhwZXJpbWVudGFsID8gJ1ZEb20ubWpzJyA6ICd2ZG9td29ya2VyLmpzJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgICBtZS5kZXRlY3RGZWF0dXJlcygpO1xuXG4gICAgICAgIGlmICghTmVvLmluc2lkZVdvcmtlcikge1xuICAgICAgICAgICAgbWUuY3JlYXRlV29ya2VycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgTmVvLndvcmtlcklkID0gJ21haW4nO1xuXG4gICAgICAgIG1lLnByb21pc2VzID0ge307XG5cbiAgICAgICAgbWUub24oe1xuICAgICAgICAgICAgJ21lc3NhZ2U6YWRkRG9tTGlzdGVuZXInICAgOiB7Zm46IERvbUV2ZW50cy5hZGREb21MaXN0ZW5lciwgc2NvcGU6IERvbUV2ZW50c30sXG4gICAgICAgICAgICAnbWVzc2FnZTpyZWFkRG9tJyAgICAgICAgICA6IHtmbjogRG9tQWNjZXNzLm9uUmVhZERvbSwgICAgICBzY29wZTogRG9tQWNjZXNzfSxcbiAgICAgICAgICAgICdtZXNzYWdlOnJlZ2lzdGVyUmVtb3RlJyAgIDoge2ZuOiBtZS5vblJlZ2lzdGVyUmVtb3RlLCAgICAgIHNjb3BlOiBtZX0sXG4gICAgICAgICAgICAnbWVzc2FnZTp3b3JrZXJDb25zdHJ1Y3RlZCc6IHtmbjogbWUub25Xb3JrZXJDb25zdHJ1Y3RlZCwgICBzY29wZTogbWV9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgbWVzc2FnZSB0byBlYWNoIHdvcmtlciBkZWZpbmVkIGluc2lkZSB0aGUgdGhpcy53b3JrZXJzIGNvbmZpZy5cbiAgICAgKiBAcGFyYW0gbXNnXG4gICAgICovXG4gICAgYnJvYWRjYXN0KG1zZykge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLndvcmtlcnMpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKG5hbWUsIG1zZyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSB3ZWIgd29ya2VyIHVzaW5nIHRoZSBwYXNzZWQgb3B0aW9ucyBhcyB3ZWxsIGFzIGFkZGluZyBlcnJvciAmIG1lc3NhZ2UgZXZlbnQgbGlzdGVuZXJzLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICogQHJldHVybnMge1dvcmtlcn1cbiAgICAgKi9cbiAgICBjcmVhdGVXb3JrZXIob3B0cykge1xuICAgICAgICBjb25zdCBtZSAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICAgIGZpbGVQYXRoID0gKG9wdHMuYmFzZVBhdGggfHwgbWUuYmFzZVBhdGgpICsgb3B0cy5maWxlTmFtZSxcbiAgICAgICAgICAgICAgcyAgICAgICAgPSBtZS5zaGFyZWRXb3JrZXJzRW5hYmxlZCAmJiBOZW8uY29uZmlnLnVzZVNoYXJlZFdvcmtlcnMsXG4gICAgICAgICAgICAgIHdvcmtlciAgID0gIU5lby5jb25maWcuaXNFeHBlcmltZW50YWwgIC8vIHRvZG86IHN3aXRjaCB0byB0aGUgbmV3IHN5bnRheCB0byBjcmVhdGUgYSB3b3JrZXIgZnJvbSBhIEpTIG1vZHVsZSBvbmNlIGJyb3dzZXJzIGFyZSByZWFkeVxuICAgICAgICAgICAgICAgICAgPyBuZXcgKHMgPyBTaGFyZWRXb3JrZXIgOiBXb3JrZXIpKGZpbGVQYXRoKVxuICAgICAgICAgICAgICAgICAgOiBuZXcgKHMgPyBTaGFyZWRXb3JrZXIgOiBXb3JrZXIpKGZpbGVQYXRoLCB7dHlwZTogJ21vZHVsZSd9KTtcblxuICAgICAgICAocyA/IHdvcmtlci5wb3J0IDogd29ya2VyKS5vbm1lc3NhZ2UgPSBtZS5vbldvcmtlck1lc3NhZ2UuYmluZChtZSk7XG4gICAgICAgIChzID8gd29ya2VyLnBvcnQgOiB3b3JrZXIpLm9uZXJyb3IgICA9IG1lLm9uV29ya2VyRXJyb3IuYmluZChtZSk7XG5cbiAgICAgICAgcmV0dXJuIHdvcmtlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyBjcmVhdGVXb3JrZXIgZm9yIGVhY2ggd29ya2VyIGluc2lkZSB0aGUgdGhpcy53b3JrZXJzIGNvbmZpZy5cbiAgICAgKi9cbiAgICBjcmVhdGVXb3JrZXJzKCkge1xuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICBoYXNoID0gbG9jYXRpb24uaGFzaCxcbiAgICAgICAgICAgIGtleSwgdmFsdWU7XG5cbiAgICAgICAgLy8gcGFzcyB0aGUgaW5pdGlhbCBoYXNoIHZhbHVlIGFzIE5lby5jb25maWdzXG4gICAgICAgIGlmIChoYXNoKSB7XG4gICAgICAgICAgICBOZW8uY29uZmlnLmhhc2ggPSB7XG4gICAgICAgICAgICAgICAgYXBwTmFtZSAgIDogbWUuYXBwTmFtZSwgLy8gbnVsbCBhdCB0aGlzIHBvaW50XG4gICAgICAgICAgICAgICAgaGFzaCAgICAgIDogRG9tRXZlbnRzLnBhcnNlSGFzaChoYXNoLnN1YnN0cigxKSksXG4gICAgICAgICAgICAgICAgaGFzaFN0cmluZzogaGFzaC5zdWJzdHIoMSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG1lLndvcmtlcnMpKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHZhbHVlLndvcmtlciA9IG1lLmNyZWF0ZVdvcmtlcih2YWx1ZSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBlO1xuICAgICAgICAgICAgICAgIG1lLnN0b3BDb21tdW5pY2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWUuc2VuZE1lc3NhZ2Uoa2V5LCB7XG4gICAgICAgICAgICAgICAgYWN0aW9uOiAncmVnaXN0ZXJOZW9Db25maWcnLFxuICAgICAgICAgICAgICAgIGRhdGEgIDogTmVvLmNvbmZpZ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGRldGVjdEZlYXR1cmVzKCkge1xuICAgICAgICBjb25zdCBtZSA9IHRoaXM7XG5cbiAgICAgICAgTmVvLmNvbmZpZy5oYXNUb3VjaEV2ZW50cyA9ICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHx8IChuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwKTtcblxuICAgICAgICBpZiAod2luZG93Lldvcmtlcikge1xuICAgICAgICAgICAgbWUud2ViV29ya2Vyc0VuYWJsZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBXZWIgV29ya2VycycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdpbmRvdy5TaGFyZWRXb3JrZXIpIHtcbiAgICAgICAgICAgIG1lLnNoYXJlZFdvcmtlcnNFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8V29ya2VyfSBuYW1lXG4gICAgICogQHJldHVybnMge1dvcmtlcn1cbiAgICAgKi9cbiAgICBnZXRXb3JrZXIobmFtZSkge1xuICAgICAgICByZXR1cm4gbmFtZSBpbnN0YW5jZW9mIFdvcmtlciA/IG5hbWUgOiB0aGlzLndvcmtlcnNbbmFtZV0ud29ya2VyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAgICAgKi9cbiAgICBsb2FkQXBwbGljYXRpb24ocGF0aCkge1xuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKCdhcHAnLCB7XG4gICAgICAgICAgICBhY3Rpb24gICAgICAgOiAnbG9hZEFwcGxpY2F0aW9uJyxcbiAgICAgICAgICAgIHBhdGggICAgICAgICA6IHBhdGgsXG4gICAgICAgICAgICByZXNvdXJjZXNQYXRoOiBOZW8uY29uZmlnLnJlc291cmNlc1BhdGhcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uV29ya2VyQ29uc3RydWN0ZWQoZGF0YSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIG1lLmNvbnN0cnVjdGVkVGhyZWFkcysrO1xuXG4gICAgICAgIGlmIChtZS5jb25zdHJ1Y3RlZFRocmVhZHMgPT09IE9iamVjdC5rZXlzKG1lLndvcmtlcnMpLmxlbmd0aCArIDEpIHtcbiAgICAgICAgICAgIGlmIChOZW8uY29uZmlnLmFwcFBhdGgpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy8gYmV0dGVyIHNhdmUgdGhhbiBzb3JyeSA9PiBhbGwgcmVtb3RlcyBuZWVkIHRvIGJlIHJlZ2lzdGVyZWRcbiAgICAgICAgICAgICAgICAgICAgbWUubG9hZEFwcGxpY2F0aW9uKE5lby5jb25maWcuYXBwUGF0aCk7XG4gICAgICAgICAgICAgICAgfSwgMjApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBtZXRob2QgZm9yIHdvcmtlciBlcnJvciBldmVudHNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZVxuICAgICAqL1xuICAgIG9uV29ya2VyRXJyb3IoZSkge1xuICAgICAgICBpZiAoIU5lby5jb25maWcuaXNFeHBlcmltZW50YWwpIHsgLy8gc3RhcnRpbmcgYSB3b3JrZXIgZnJvbSBhIEpTIG1vZHVsZSB3aWxsIHNob3cgSlMgZXJyb3JzIGluIGEgY29ycmVjdCB3YXlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdXb3JrZXIgRXJyb3I6JywgZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIG1ldGhvZCBmb3Igd29ya2VyIG1lc3NhZ2UgZXZlbnRzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVcbiAgICAgKi9cbiAgICBvbldvcmtlck1lc3NhZ2UoZSkge1xuICAgICAgICBsZXQgbWUgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGRhdGEgICAgICAgICA9IGUuZGF0YSxcbiAgICAgICAgICAgIGRlbGF5UHJvbWlzZSA9IGZhbHNlLFxuICAgICAgICAgICAgcHJvbWlzZTtcblxuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgYWN0aW9uLFxuICAgICAgICAgICAgIGRlc3RpbmF0aW9uOiBkZXN0LFxuICAgICAgICAgICAgIHJlcGx5SWRcbiAgICAgICAgfSA9IGRhdGE7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ01haW46IEluY29taW5nIFdvcmtlciBtZXNzYWdlOiAnICsgZGF0YS5vcmlnaW4gKyAnOicgKyBhY3Rpb24sIGRhdGEpO1xuXG4gICAgICAgIG1lLmZpcmUoJ21lc3NhZ2U6JythY3Rpb24sIGRhdGEpO1xuXG4gICAgICAgIGlmIChwcm9taXNlID0gYWN0aW9uID09PSAncmVwbHknICYmIG1lLnByb21pc2VzW3JlcGx5SWRdKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5kZXN0aW5hdGlvbiA9PT0gJ21haW4nKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEuZGF0YTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEucmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZS5yZWplY3QoZGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZGF0YS5hdXRvTW91bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lLmZpcmUoJ2F1dG9tb3VudCcsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXlQcm9taXNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5kYXRhLnVwZGF0ZVZkb20pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lLmZpcmUoJ3VwZGF0ZVZkb20nLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5UHJvbWlzZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIWRlbGF5UHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbWUucHJvbWlzZXNbcmVwbHlJZF0uZGF0YSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWRlbGF5UHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBtZS5wcm9taXNlc1tyZXBseUlkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZXN0ICE9PSAnbWFpbicgJiYgYWN0aW9uICE9PSAncmVwbHknKSB7XG4gICAgICAgICAgICBtZS5wcm9taXNlTWVzc2FnZShkZXN0LCBkYXRhKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBtZS5zZW5kTWVzc2FnZShyZXNwb25zZS5kZXN0aW5hdGlvbiwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBtZS5zZW5kTWVzc2FnZShkYXRhLm9yaWdpbiwge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24gOiAncmVwbHknLFxuICAgICAgICAgICAgICAgICAgICByZWplY3QgOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICByZXBseUlkOiBkYXRhLmlkLFxuICAgICAgICAgICAgICAgICAgICBlcnJvciAgOiBlcnIubWVzc2FnZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvbmx5IG5lZWRlZCBmb3IgU2hhcmVkV29ya2Vyc1xuICAgICAgICBlbHNlIGlmIChkZXN0ID09PSAnbWFpbicgJiYgYWN0aW9uID09PSAncmVnaXN0ZXJBcHBOYW1lJykge1xuICAgICAgICAgICAgbWUuYXBwTmFtZSA9IGRhdGEuYXBwTmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2UgaWYgKGRlc3QgPT09ICdtYWluJyAmJiBhY3Rpb24gPT09ICdyZW1vdGVNZXRob2QnKSB7XG4gICAgICAgICAgICBtZS5vblJlbW90ZU1ldGhvZChkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRlc3QgYXBwLCBkYXRhIG9yIHZkb21cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyBjb25maWdzIGZvciBOZW8ud29ya2VyLk1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBbdHJhbnNmZXJdIEFuIG9wdGlvbmFsIGFycmF5IG9mIFRyYW5zZmVyYWJsZSBvYmplY3RzIHRvIHRyYW5zZmVyIG93bmVyc2hpcCBvZi5cbiAgICAgKiBJZiB0aGUgb3duZXJzaGlwIG9mIGFuIG9iamVjdCBpcyB0cmFuc2ZlcnJlZCwgaXQgYmVjb21lcyB1bnVzYWJsZSAobmV1dGVyZWQpIGluIHRoZSBjb250ZXh0IGl0IHdhcyBzZW50IGZyb21cbiAgICAgKiBhbmQgYmVjb21lcyBhdmFpbGFibGUgb25seSB0byB0aGUgd29ya2VyIGl0IHdhcyBzZW50IHRvLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAgICovXG4gICAgcHJvbWlzZU1lc3NhZ2UoZGVzdCwgb3B0cywgdHJhbnNmZXIpIHtcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IG1lLnNlbmRNZXNzYWdlKGRlc3QsIG9wdHMsIHRyYW5zZmVyKSxcbiAgICAgICAgICAgICAgICBtc2dJZCAgID0gbWVzc2FnZS5pZDtcblxuICAgICAgICAgICAgbWUucHJvbWlzZXNbbXNnSWRdID0ge1xuICAgICAgICAgICAgICAgIHJlamVjdCA6IHJlamVjdCxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiByZXNvbHZlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXBseUlkXG4gICAgICovXG4gICAgcmVzb2x2ZURvbU9wZXJhdGlvblByb21pc2UocmVwbHlJZCkge1xuICAgICAgICBpZiAocmVwbHlJZCkge1xuICAgICAgICAgICAgbGV0IHByb21pc2UgPSB0aGlzLnByb21pc2VzW3JlcGx5SWRdO1xuXG4gICAgICAgICAgICBpZiAocHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIHByb21pc2UucmVzb2x2ZShwcm9taXNlLmRhdGEpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnByb21pc2VzW3JlcGx5SWRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGVzdCBhcHAsIGRhdGEgb3IgdmRvbVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIGNvbmZpZ3MgZm9yIE5lby53b3JrZXIuTWVzc2FnZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFt0cmFuc2Zlcl0gQW4gb3B0aW9uYWwgYXJyYXkgb2YgVHJhbnNmZXJhYmxlIG9iamVjdHMgdG8gdHJhbnNmZXIgb3duZXJzaGlwIG9mLlxuICAgICAqIElmIHRoZSBvd25lcnNoaXAgb2YgYW4gb2JqZWN0IGlzIHRyYW5zZmVycmVkLCBpdCBiZWNvbWVzIHVudXNhYmxlIChuZXV0ZXJlZCkgaW4gdGhlIGNvbnRleHQgaXQgd2FzIHNlbnQgZnJvbVxuICAgICAqIGFuZCBiZWNvbWVzIGF2YWlsYWJsZSBvbmx5IHRvIHRoZSB3b3JrZXIgaXQgd2FzIHNlbnQgdG8uXG4gICAgICogQHJldHVybnMge05lby53b3JrZXIuTWVzc2FnZX1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgc2VuZE1lc3NhZ2UoZGVzdCwgb3B0cywgdHJhbnNmZXIpIHtcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmICghbWUuc3RvcENvbW11bmljYXRpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IHdvcmtlciA9IG1lLmdldFdvcmtlcihkZXN0KTtcblxuICAgICAgICAgICAgaWYgKCF3b3JrZXIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbGxlZCBzZW5kTWVzc2FnZSBmb3IgYSB3b3JrZXIgdGhhdCBkb2VzIG5vdCBleGlzdDogJyArIGRlc3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvcHRzLmRlc3RpbmF0aW9uID0gZGVzdDtcblxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IG5ldyBNZXNzYWdlKG9wdHMpO1xuXG4gICAgICAgICAgICAobWUuc2hhcmVkV29ya2Vyc0VuYWJsZWQgJiYgTmVvLmNvbmZpZy51c2VTaGFyZWRXb3JrZXJzID8gd29ya2VyLnBvcnQgOiB3b3JrZXIpLnBvc3RNZXNzYWdlKG1lc3NhZ2UsIHRyYW5zZmVyKTtcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhNYW5hZ2VyKTtcblxubGV0IGluc3RhbmNlID0gTmVvLmNyZWF0ZShNYW5hZ2VyKTtcblxuTmVvLmFwcGx5VG9HbG9iYWxOcyhpbnN0YW5jZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3RhbmNlOyIsImltcG9ydCBJZEdlbmVyYXRvciBmcm9tICcuLi9jb3JlL0lkR2VuZXJhdG9yLm1qcyc7XG5cbi8qKlxuICogQSB3cmFwcGVyIGZvciB3b3JrZXIgcG9zdCBtZXNzYWdlcyBzZW50IGJldHdlZW4gdGhlIEFwcCwgRGF0YSwgVkRvbSB3b3JrZXIgJiB0aGUgbWFpbiB0aHJlYWQuXG4gKiBZb3UgY2FuIGFkZCBvcHRpb25hbCBwYXJhbXMgYXMgbmVlZGVkLlxuICogQGNsYXNzIE5lby53b3JrZXIuTWVzc2FnZVxuICovXG5jbGFzcyBNZXNzYWdlIHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gYWN0aW9uXG4gICAgICAgICAqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGRlc3RpbmF0aW9uPSdtYWluJ1xuICAgICAgICAgKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBpZD1JZEdlbmVyYXRvci5nZXRJZChOZW8ud29ya2VySWQpXG4gICAgICAgICAqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG9yaWdpbj1OZW8ud29ya2VySWRcbiAgICAgICAgICovXG5cbiAgICAgICAgY29uZmlnLmRlc3RpbmF0aW9uID0gY29uZmlnLmRlc3RpbmF0aW9uIHx8ICdtYWluJztcbiAgICAgICAgY29uZmlnLmlkICAgICAgICAgID0gY29uZmlnLmlkICAgICAgICAgIHx8IElkR2VuZXJhdG9yLmdldElkKE5lby53b3JrZXJJZCk7XG4gICAgICAgIGNvbmZpZy5vcmlnaW4gICAgICA9IGNvbmZpZy5vcmlnaW4gICAgICB8fCBOZW8ud29ya2VySWQ7XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb25maWcpO1xuICAgIH1cbn1cblxuY29uc3QgbnMgPSBOZW8ubnMoJ05lby53b3JrZXInLCB0cnVlKTtcbm5zWydNZXNzYWdlJ10gPSBNZXNzYWdlO1xuXG5leHBvcnQge01lc3NhZ2UgYXMgZGVmYXVsdH07IiwiaW1wb3J0IEJhc2UgZnJvbSAnLi4vLi4vY29yZS9CYXNlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby53b3JrZXIubWl4aW4uUmVtb3RlTWV0aG9kQWNjZXNzXG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKi9cbmNsYXNzIFJlbW90ZU1ldGhvZEFjY2VzcyBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8ud29ya2VyLm1peGluLlJlbW90ZU1ldGhvZEFjY2VzcydcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLndvcmtlci5taXhpbi5SZW1vdGVNZXRob2RBY2Nlc3MnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0nbWl4aW4tcmVtb3RlLW1ldGhvZC1hY2Nlc3MnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnbWl4aW4tcmVtb3RlLW1ldGhvZC1hY2Nlc3MnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gbWl4aW49dHJ1ZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBtaXhpbjogdHJ1ZVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZW1vdGVcbiAgICAgKiBAcGFyYW0gbWV0aG9kXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9uKCo9LCAqPSk6IFByb21pc2U8YW55Pn1cbiAgICAgKi9cbiAgICBnZW5lcmF0ZVJlbW90ZShyZW1vdGUsIG1ldGhvZCkge1xuICAgICAgICBsZXQgbWUgICAgID0gdGhpcyxcbiAgICAgICAgICAgIG9yaWdpbiA9IHJlbW90ZS5vcmlnaW47XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGRhdGEsIGJ1ZmZlcikge1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uICAgICAgICAgOiAncmVtb3RlTWV0aG9kJyxcbiAgICAgICAgICAgICAgICBkYXRhICAgICAgICAgICA6IGRhdGEsXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb24gICAgOiBvcmlnaW4sXG4gICAgICAgICAgICAgICAgcmVtb3RlQ2xhc3NOYW1lOiByZW1vdGUuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIHJlbW90ZU1ldGhvZCAgIDogbWV0aG9kXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAobWUuaXNTaGFyZWRXb3JrZXIpIHtcbiAgICAgICAgICAgICAgICBvcHRzLmFwcE5hbWUgPSBvcHRzLmFwcE5hbWUgfHwgZGF0YSAmJiBkYXRhLmFwcE5hbWU7XG4gICAgICAgICAgICAgICAgb3B0cy5wb3J0ICAgID0gb3B0cy5wb3J0ICAgIHx8IGRhdGEgJiYgZGF0YS5wb3J0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbWUucHJvbWlzZU1lc3NhZ2Uob3JpZ2luLCBvcHRzLCBidWZmZXIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlbW90ZVxuICAgICAqL1xuICAgIG9uUmVnaXN0ZXJSZW1vdGUocmVtb3RlKSB7XG4gICAgICAgIGlmIChyZW1vdGUuZGVzdGluYXRpb24gPT09IE5lby53b3JrZXJJZCkge1xuICAgICAgICAgICAgbGV0IG1lICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gcmVtb3RlLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICBleGlzdHMgICAgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBtZXRob2RzICAgPSByZW1vdGUubWV0aG9kcyxcbiAgICAgICAgICAgICAgICBwa2cgICAgICAgPSBOZW8ubnMoY2xhc3NOYW1lLCB0cnVlKTtcblxuICAgICAgICAgICAgbWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgIGlmIChyZW1vdGUub3JpZ2luICE9PSAnbWFpbicgJiYgcGtnW21ldGhvZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEdXBsaWNhdGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uICcgKyBjbGFzc05hbWUgKyAnLicgKyBtZXRob2QpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghcGtnW21ldGhvZF0gKSB7XG4gICAgICAgICAgICAgICAgICAgIHBrZ1ttZXRob2RdID0gbWUuZ2VuZXJhdGVSZW1vdGUocmVtb3RlLCBtZXRob2QpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICghZXhpc3RzICYmIE5lby53b3JrZXJJZCAhPT0gJ21haW4nKSB7XG4gICAgICAgICAgICAgICAgbWUuZmlyZSgncmVtb3RlcmVnaXN0ZXJlZCcsIHJlbW90ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBtc2dcbiAgICAgKi9cbiAgICBvblJlbW90ZU1ldGhvZChtc2cpIHtcbiAgICAgICAgbGV0IG1lICA9IHRoaXMsXG4gICAgICAgICAgICBwa2cgPSBOZW8ubnMobXNnLnJlbW90ZUNsYXNzTmFtZSksXG4gICAgICAgICAgICBvdXQsIG1ldGhvZDtcblxuICAgICAgICBpZiAoIXBrZykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHJlbW90ZSBuYW1lc3BhY2UgXCInICsgbXNnLnJlbW90ZUNsYXNzTmFtZSArICdcIicpO1xuICAgICAgICB9XG5cbiAgICAgICAgbWV0aG9kID0gcGtnW21zZy5yZW1vdGVNZXRob2RdO1xuXG4gICAgICAgIGlmICghbWV0aG9kKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcmVtb3RlIG1ldGhvZCBuYW1lIFwiJyArIG1zZy5yZW1vdGVNZXRob2QgKyAnXCInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG1zZy5kYXRhKSkge1xuICAgICAgICAgICAgb3V0ID0gbWV0aG9kLmNhbGwocGtnLCAuLi5tc2cuZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXQgPSBtZXRob2QuY2FsbChwa2csIG1zZy5kYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvdXQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICBvdXQudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBtZS5yZXNvbHZlKG1zZywgZGF0YSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgbWUucmVqZWN0KG1zZywgZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWUucmVzb2x2ZShtc2csIG91dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGNhbGxlZCB3aGVuIHByb21pc2VNZXNzYWdlIGdldHMgcmVqZWN0ZWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbXNnXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICByZWplY3QobXNnLCBkYXRhKSB7XG4gICAgICAgIGxldCBvcHRzID0ge1xuICAgICAgICAgICAgYWN0aW9uIDogJ3JlcGx5JyxcbiAgICAgICAgICAgIGRhdGEgICA6IGRhdGEsXG4gICAgICAgICAgICByZWplY3QgOiB0cnVlLFxuICAgICAgICAgICAgcmVwbHlJZDogbXNnLmlkXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTaGFyZWRXb3JrZXIpIHtcbiAgICAgICAgICAgIG9wdHMuYXBwTmFtZSA9IG1zZy5hcHBOYW1lO1xuICAgICAgICAgICAgb3B0cy5wb3J0ICAgID0gbXNnLnBvcnQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKG1zZy5vcmlnaW4sIG9wdHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgY2FsbGVkIHdoZW4gcHJvbWlzZU1lc3NhZ2UgZ2V0cyByZXNvbHZlZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBtc2dcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIHJlc29sdmUobXNnLCBkYXRhKSB7XG4gICAgICAgIGxldCBvcHRzID0ge1xuICAgICAgICAgICAgYWN0aW9uIDogJ3JlcGx5JyxcbiAgICAgICAgICAgIGRhdGEgICA6IGRhdGEsXG4gICAgICAgICAgICByZXBseUlkOiBtc2cuaWRcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy5pc1NoYXJlZFdvcmtlcikge1xuICAgICAgICAgICAgb3B0cy5hcHBOYW1lID0gbXNnLmFwcE5hbWU7XG4gICAgICAgICAgICBvcHRzLnBvcnQgICAgPSBtc2cucG9ydDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UobXNnLm9yaWdpbiwgb3B0cyk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhSZW1vdGVNZXRob2RBY2Nlc3MpO1xuXG5leHBvcnQge1JlbW90ZU1ldGhvZEFjY2VzcyBhcyBkZWZhdWx0fTsiXSwic291cmNlUm9vdCI6IiJ9