(self["webpackChunkneo_mjs_realworld_example_app"] = self["webpackChunkneo_mjs_realworld_example_app"] || []).push([["src/main/addon/MapboxGL-mjs"],{

/***/ "./node_modules/neo.mjs/src/main/addon/MapboxGL.mjs":
/*!**********************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/addon/MapboxGL.mjs ***!
  \**********************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");
/* harmony import */ var _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DomAccess.mjs */ "./node_modules/neo.mjs/src/main/DomAccess.mjs");



/**
 * Helper class to include Mapbox GL maps into your neo.mjs app
 * See: https://docs.mapbox.com/mapbox-gl-js/api/
 * In case you need more API methods to get exposed to the App worker,
 * please open issues inside the tracker and / or submit PRs.
 * @class Neo.main.addon.MapboxGL
 * @extends Neo.core.Base
 * @singleton
 */
class MapboxGL extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.addon.MapboxGL'
         * @protected
         */
        className: 'Neo.main.addon.MapboxGL',
        /**
         * Stores all map data inside an object until mounting. key => map id
         * No array since in case a map gets loaded multiple times, we only want to apply the last data on mount.
         * @member {Object} dataMap={}
         * @protected
         */
        dataMap: {},
        /**
         * @member {String} downloadPath='https://api.mapbox.com/mapbox-gl-js/'
         * @protected
         */
        downloadPath: 'https://api.mapbox.com/mapbox-gl-js/',
        /**
         * Stores all extra map sources layers an object.
         * key => map id, value => {Array} layers
         * @member {Object} layers={}
         * @protected
         */
        layers: {},
        /**
         * Stores all map ids inside an object
         * @member {Object} maps={}
         * @protected
         */
        maps: {},
        /**
         * Stores all map config objects which arrived before the map lib scripts got loaded
         * @member {Object[]} mapsToCreate=[]
         * @protected
         */
        mapsToCreate: [],
        /**
         * @member {Boolean} scriptsLoaded_=true
         * @protected
         */
        scriptsLoaded_: false,
        /**
         * @member {Boolean} singleton=true
         * @protected
         */
        singleton: true,
        /**
         * Stores all map sources inside an object.
         * key => map id, value => {Array} sources
         * @member {Object} sources={}
         * @protected
         */
        sources: {},
        /**
         * Remote method access for other workers
         * @member {Object} remote
         * @protected
         */
        remote: {
            app: [
                'addLayers',
                'addSources',
                'autoResize',
                'center',
                'create',
                'destroy',
                'setFilter',
                'setLayoutProperty',
                'setPaintProperty',
                'setStyle',
                'updateData',
                'zoom'
            ]
        },
        /**
         * Stores all map style objects inside an objects to prevent reloads when switching themes multiple times.
         * key => style name (url)
         * @member {Object} styleMap={}
         * @protected
         */
        styleMap: {},
        /**
         * @member {String} version='v1.9.1'
         * @protected
         */
        version: 'v1.9.1',
        /**
         * Stores all map zoom values inside an object until mounting. key => map id
         * No array since in case a map gets zoomed multiple times, we only want to apply the last value on mount.
         * @member {Object} zoomMap={}
         * @protected
         */
        zoomMap: {}
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);
        this.insertMapboxGLScripts();
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.id
     * @param {Object[]} data.layers
     */
    addLayers(data) {
        const me  = this,
              map = me.maps[data.id];

        let beforeId;

        if (map) {
            data.layers.forEach(item => {
                beforeId = item.beforeId;
                delete item.beforeId;

                map.addLayer(item, beforeId);
            });
        } else {
            me.layers[data.id] = Object.assign(me.layers[data.id] || {}, data);
        }
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.id
     * @param {Object[]} data.sources
     */
    addSources(data) {
        const me  = this,
              map = me.maps[data.id];

        let id;

        if (map) {
            data.sources.forEach(item => {
                id = item.id;
                delete item.id;

                map.addSource(id, item);
            });
        } else {
            me.sources[data.id] = Object.assign(me.sources[data.id] || {}, data);
        }
    }

    /**
     * Triggered after the scriptsLoaded config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetScriptsLoaded(value, oldValue) {
        if (value) {
            const me = this;

            me.mapsToCreate.forEach(config => {
                me.create(config);
            });

            me.mapsToCreate = [];
        }
    }

    /**
     *
     * @param {Object} map
     * @param {Object} styleJson
     * @param {String} [name]
     */
    applyStyleObject(map, styleJson, name) {
        if (name) {
            this.styleMap[name] = styleJson;
        }

        styleJson.layers.forEach(layer => {
            Object.entries(layer.paint).forEach(([key, value]) => {
                map.setPaintProperty(layer.id, key, value);
            });
        });
    }

    /**
     * Mounting a map into an inactive tab and activating it should call this
     * @param {Object} data
     * @param {String} data.id
     */
    autoResize(data) {
        const map = this.maps[data.id];

        if (map) {
            setTimeout(() => {
                map.resize();
            }, 100);
        }
    }

    /**
     *
     * @param {Object} data
     * @param {Boolean} [data.animate=false]
     * @param {String} data.id
     * @param {Number} data.lat
     * @param {Number} data.lng
     */
    center(data) {
        const map    = this.maps[data.id],
              center = {lat: data.lat, lng: data.lng};

        if (map) {
            if (data.animate) {
                map.flyTo({center: center});
            } else {
                map.setCenter(center);
            }
        } else {
            // todo
        }
    }

    /**
     *
     * @param {Object}   data
     * @param {String}   data.accessToken
     * @param {Object}   data.center
     * @param {Object}   [data.data]
     * @param {String}   [data.dataSourceId]
     * @param {String}   data.id
     * @param {Object[]} [data.layers]
     * @param {String}   data.mapboxStyle
     * @param {Object[]} [data.sources]
     * @param {String}   data.zoom
     */
    create(data) {
        const me = this;

        if (!me.scriptsLoaded) {
            me.mapsToCreate.push(data);
        } else {
            mapboxgl.accessToken = data.accessToken;

            let zoom = data.zoom;

            if (me.zoomMap[data.id]) {
                zoom = me.zoomMap[data.id].zoom;
                delete me.zoomMap[data.id];
            }

            me.maps[data.id] = new mapboxgl.Map({
                center   : data.center,
                container: data.id,
                style    : data.mapboxStyle,
                zoom     : zoom
            });

            me.maps[data.id].on('load', me.onMapLoaded.bind(me, data));
        }
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.id
     */
    destroy(data) {
        this.maps[data.id].remove();
        delete this.maps[data.id];
    }

    /**
     *
     * @param {String} id
     * @returns {Boolean}
     */
    hasMap(id) {
        return !!this.maps[id];
    }

    insertMapboxGLScripts() {
        const me       = this,
              basePath = me.downloadPath + me.version + '/';

        Promise.all([
            _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__.default.loadScript(    basePath + 'mapbox-gl.js'),
            _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__.default.loadStylesheet(basePath + 'mapbox-gl.css')
        ]).then(() => {
            me.scriptsLoaded = true;
        });
    }

    /**
     *
     * @param {Object} data
     * @param {Object} event
     * @param {Object} event.target map instance
     */
    onMapLoaded(data, event) {
        const me    = this,
              mapId = data.id;

        if (data.sources) {
            me.addSources({
                id     : data.id,
                sources: data.sources
            });
        } else if (me.sources[mapId]) {
            me.addSources(me.sources[mapId]);
            delete me.sources[mapId];
        }

        if (data.layers) {
            me.addLayers({
                id    : data.id,
                layers: data.layers
            });
        } else if (me.layers[mapId]) {
            me.addLayers(me.layers[mapId]);
            delete me.layers[mapId];
        }

        // map.loaded() is false at this point,
        // in case we do add layers / sources
        // the "idle" event seems to be the best fit
        if (event.target.loaded()) {
            me.onMapReallyLoaded(data, event);
        } else {
            event.target.once('idle', me.onMapReallyLoaded.bind(me, data));
        }
    }

    /**
     *
     * @param {Object} data
     * @param {Object} event
     * @param {Object} event.target map instance
     */
    onMapReallyLoaded(data, event) {
        const me = this;

        setTimeout(() => {
            if (data.data) {
                me.updateData({
                    data        : data.data,
                    dataSourceId: data.dataSourceId,
                    id          : data.id
                })
            } else if (me.dataMap[data.id]) {
                me.updateData(me.dataMap[data.id]);
            }
        }, 100);
    }

    /**
     * https://docs.mapbox.com/mapbox-gl-js/api/#map#setfilter
     * @param {Object} data
     * @param {String} data.id
     * @param {String} data.layerId
     * @param {Object} data.options
     * @param {Boolean} data.options.validate
     * @param {Array} data.value
     */
    setFilter(data) {
        const map = this.maps[data.id];

        if (map) {
            map.setFilter(data.layerId, data.value, data.options || {});
        } else {
            // todo: we could cache this and apply onMapLoaded
        }
    }

    /**
     * https://docs.mapbox.com/mapbox-gl-js/api/#map#setlayoutproperty
     * @param {Object} data
     * @param {String} data.id
     * @param {String} data.layerId
     * @param {String} data.key
     * @param {Object} data.options
     * @param {Boolean} data.options.validate
     * @param {String} data.value
     */
    setLayoutProperty(data) {
        const map = this.maps[data.id];

        if (map) {
            map.setLayoutProperty(data.layerId, data.key, data.value, data.options || {});
        } else {
            // todo: we could cache this and apply onMapLoaded
        }
    }

    /**
     * https://docs.mapbox.com/mapbox-gl-js/api/#map#setpaintproperty
     * @param {Object} data
     * @param {String} data.id
     * @param {String} data.layerId
     * @param {String} data.key
     * @param {Object} data.options
     * @param {Boolean} data.options.validate
     * @param {String} data.value
     */
    setPaintProperty(data) {
        const map = this.maps[data.id];

        if (map) {
            map.setPaintProperty(data.layerId, data.key, data.value, data.options || {});
        } else {
            // todo: we could cache this and apply onMapLoaded
        }
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.accessToken
     * @param {String} data.id
     * @param {Object|String} data.style
     */
    setStyle(data) {
        const me = this;

        if (!me.scriptsLoaded || !me.hasMap(data.id)) {
            // todo
        } else {
            if (Neo.isString(data.style)) {
                if (data.style.indexOf('mapbox://styles/') === 0) {
                    data.style = data.style.substring(16);
                }

                if (me.styleMap[data.style]) {
                    me.applyStyleObject(me.maps[data.id], me.styleMap[data.style]);
                } else {
                    fetch(`https://api.mapbox.com/styles/v1/${data.style}?access_token=${data.accessToken}`)
                        .then(response => response.json())
                        .then(styleJson => me.applyStyleObject(me.maps[data.id], styleJson, data.style))
                }
            }

            // map.setStyle breaks with only a console.warn()
            // => causing a full repaint, losing custom sources & layers
            // map.setStyle(data.style);
        }
    }

    /**
     *
     * @param {Object} data
     * @param {Object} data.data
     * @param {String} data.dataSourceId
     * @param {String} data.id
     */
    updateData(data) {
        const me = this;

        if (!me.scriptsLoaded || !me.hasMap(data.id)) {
            me.dataMap[data.id] = data;
        } else {
            const map    = me.maps[data.id],
                  source = map.getSource(data.dataSourceId);

            if (source) {
                source.setData(data.data);
                delete me.dataMap[data.id];
            } else {
                me.dataMap[data.id] = data;
            }
        }
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.id
     * @param {Number} data.zoom
     */
    zoom(data) {
        const map = this.maps[data.id];

        if (map) {
            map.setZoom(data.zoom);
        } else {
            this.zoomMap[data.id] = data;
        }
    }
}

Neo.applyClassConfig(MapboxGL);

let instance = Neo.create(MapboxGL);

Neo.applyToGlobalNs(instance);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (instance);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9tYWluL2FkZG9uL01hcGJveEdMLm1qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTRDO0FBQ0g7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixtREFBSTtBQUMzQix3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxNQUFNO0FBQzFDLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLE1BQU07QUFDMUMsb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFD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QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLGlFQUFlLFFBQVEsRSIsImZpbGUiOiJjaHVua3Mvc3JjL21haW4vYWRkb24vTWFwYm94R0wtbWpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2UgICAgICBmcm9tICcuLi8uLi9jb3JlL0Jhc2UubWpzJztcbmltcG9ydCBEb21BY2Nlc3MgZnJvbSAnLi4vRG9tQWNjZXNzLm1qcyc7XG5cbi8qKlxuICogSGVscGVyIGNsYXNzIHRvIGluY2x1ZGUgTWFwYm94IEdMIG1hcHMgaW50byB5b3VyIG5lby5tanMgYXBwXG4gKiBTZWU6IGh0dHBzOi8vZG9jcy5tYXBib3guY29tL21hcGJveC1nbC1qcy9hcGkvXG4gKiBJbiBjYXNlIHlvdSBuZWVkIG1vcmUgQVBJIG1ldGhvZHMgdG8gZ2V0IGV4cG9zZWQgdG8gdGhlIEFwcCB3b3JrZXIsXG4gKiBwbGVhc2Ugb3BlbiBpc3N1ZXMgaW5zaWRlIHRoZSB0cmFja2VyIGFuZCAvIG9yIHN1Ym1pdCBQUnMuXG4gKiBAY2xhc3MgTmVvLm1haW4uYWRkb24uTWFwYm94R0xcbiAqIEBleHRlbmRzIE5lby5jb3JlLkJhc2VcbiAqIEBzaW5nbGV0b25cbiAqL1xuY2xhc3MgTWFwYm94R0wgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLm1haW4uYWRkb24uTWFwYm94R0wnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5tYWluLmFkZG9uLk1hcGJveEdMJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JlcyBhbGwgbWFwIGRhdGEgaW5zaWRlIGFuIG9iamVjdCB1bnRpbCBtb3VudGluZy4ga2V5ID0+IG1hcCBpZFxuICAgICAgICAgKiBObyBhcnJheSBzaW5jZSBpbiBjYXNlIGEgbWFwIGdldHMgbG9hZGVkIG11bHRpcGxlIHRpbWVzLCB3ZSBvbmx5IHdhbnQgdG8gYXBwbHkgdGhlIGxhc3QgZGF0YSBvbiBtb3VudC5cbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBkYXRhTWFwPXt9XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGRhdGFNYXA6IHt9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBkb3dubG9hZFBhdGg9J2h0dHBzOi8vYXBpLm1hcGJveC5jb20vbWFwYm94LWdsLWpzLydcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgZG93bmxvYWRQYXRoOiAnaHR0cHM6Ly9hcGkubWFwYm94LmNvbS9tYXBib3gtZ2wtanMvJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JlcyBhbGwgZXh0cmEgbWFwIHNvdXJjZXMgbGF5ZXJzIGFuIG9iamVjdC5cbiAgICAgICAgICoga2V5ID0+IG1hcCBpZCwgdmFsdWUgPT4ge0FycmF5fSBsYXllcnNcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBsYXllcnM9e31cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbGF5ZXJzOiB7fSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JlcyBhbGwgbWFwIGlkcyBpbnNpZGUgYW4gb2JqZWN0XG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gbWFwcz17fVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBtYXBzOiB7fSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JlcyBhbGwgbWFwIGNvbmZpZyBvYmplY3RzIHdoaWNoIGFycml2ZWQgYmVmb3JlIHRoZSBtYXAgbGliIHNjcmlwdHMgZ290IGxvYWRlZFxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3RbXX0gbWFwc1RvQ3JlYXRlPVtdXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG1hcHNUb0NyZWF0ZTogW10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBzY3JpcHRzTG9hZGVkXz10cnVlXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHNjcmlwdHNMb2FkZWRfOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHNpbmdsZXRvbj10cnVlXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHNpbmdsZXRvbjogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JlcyBhbGwgbWFwIHNvdXJjZXMgaW5zaWRlIGFuIG9iamVjdC5cbiAgICAgICAgICoga2V5ID0+IG1hcCBpZCwgdmFsdWUgPT4ge0FycmF5fSBzb3VyY2VzXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gc291cmNlcz17fVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBzb3VyY2VzOiB7fSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW90ZSBtZXRob2QgYWNjZXNzIGZvciBvdGhlciB3b3JrZXJzXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gcmVtb3RlXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHJlbW90ZToge1xuICAgICAgICAgICAgYXBwOiBbXG4gICAgICAgICAgICAgICAgJ2FkZExheWVycycsXG4gICAgICAgICAgICAgICAgJ2FkZFNvdXJjZXMnLFxuICAgICAgICAgICAgICAgICdhdXRvUmVzaXplJyxcbiAgICAgICAgICAgICAgICAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAnY3JlYXRlJyxcbiAgICAgICAgICAgICAgICAnZGVzdHJveScsXG4gICAgICAgICAgICAgICAgJ3NldEZpbHRlcicsXG4gICAgICAgICAgICAgICAgJ3NldExheW91dFByb3BlcnR5JyxcbiAgICAgICAgICAgICAgICAnc2V0UGFpbnRQcm9wZXJ0eScsXG4gICAgICAgICAgICAgICAgJ3NldFN0eWxlJyxcbiAgICAgICAgICAgICAgICAndXBkYXRlRGF0YScsXG4gICAgICAgICAgICAgICAgJ3pvb20nXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9yZXMgYWxsIG1hcCBzdHlsZSBvYmplY3RzIGluc2lkZSBhbiBvYmplY3RzIHRvIHByZXZlbnQgcmVsb2FkcyB3aGVuIHN3aXRjaGluZyB0aGVtZXMgbXVsdGlwbGUgdGltZXMuXG4gICAgICAgICAqIGtleSA9PiBzdHlsZSBuYW1lICh1cmwpXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gc3R5bGVNYXA9e31cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc3R5bGVNYXA6IHt9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSB2ZXJzaW9uPSd2MS45LjEnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHZlcnNpb246ICd2MS45LjEnLFxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcmVzIGFsbCBtYXAgem9vbSB2YWx1ZXMgaW5zaWRlIGFuIG9iamVjdCB1bnRpbCBtb3VudGluZy4ga2V5ID0+IG1hcCBpZFxuICAgICAgICAgKiBObyBhcnJheSBzaW5jZSBpbiBjYXNlIGEgbWFwIGdldHMgem9vbWVkIG11bHRpcGxlIHRpbWVzLCB3ZSBvbmx5IHdhbnQgdG8gYXBwbHkgdGhlIGxhc3QgdmFsdWUgb24gbW91bnQuXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gem9vbU1hcD17fVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICB6b29tTWFwOiB7fVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcbiAgICAgICAgdGhpcy5pbnNlcnRNYXBib3hHTFNjcmlwdHMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSBkYXRhLmxheWVyc1xuICAgICAqL1xuICAgIGFkZExheWVycyhkYXRhKSB7XG4gICAgICAgIGNvbnN0IG1lICA9IHRoaXMsXG4gICAgICAgICAgICAgIG1hcCA9IG1lLm1hcHNbZGF0YS5pZF07XG5cbiAgICAgICAgbGV0IGJlZm9yZUlkO1xuXG4gICAgICAgIGlmIChtYXApIHtcbiAgICAgICAgICAgIGRhdGEubGF5ZXJzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgYmVmb3JlSWQgPSBpdGVtLmJlZm9yZUlkO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBpdGVtLmJlZm9yZUlkO1xuXG4gICAgICAgICAgICAgICAgbWFwLmFkZExheWVyKGl0ZW0sIGJlZm9yZUlkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWUubGF5ZXJzW2RhdGEuaWRdID0gT2JqZWN0LmFzc2lnbihtZS5sYXllcnNbZGF0YS5pZF0gfHwge30sIGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICogQHBhcmFtIHtPYmplY3RbXX0gZGF0YS5zb3VyY2VzXG4gICAgICovXG4gICAgYWRkU291cmNlcyhkYXRhKSB7XG4gICAgICAgIGNvbnN0IG1lICA9IHRoaXMsXG4gICAgICAgICAgICAgIG1hcCA9IG1lLm1hcHNbZGF0YS5pZF07XG5cbiAgICAgICAgbGV0IGlkO1xuXG4gICAgICAgIGlmIChtYXApIHtcbiAgICAgICAgICAgIGRhdGEuc291cmNlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGlkID0gaXRlbS5pZDtcbiAgICAgICAgICAgICAgICBkZWxldGUgaXRlbS5pZDtcblxuICAgICAgICAgICAgICAgIG1hcC5hZGRTb3VyY2UoaWQsIGl0ZW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZS5zb3VyY2VzW2RhdGEuaWRdID0gT2JqZWN0LmFzc2lnbihtZS5zb3VyY2VzW2RhdGEuaWRdIHx8IHt9LCBkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgc2NyaXB0c0xvYWRlZCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFNjcmlwdHNMb2FkZWQodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICAgICAgICBtZS5tYXBzVG9DcmVhdGUuZm9yRWFjaChjb25maWcgPT4ge1xuICAgICAgICAgICAgICAgIG1lLmNyZWF0ZShjb25maWcpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1lLm1hcHNUb0NyZWF0ZSA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbWFwXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHN0eWxlSnNvblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbbmFtZV1cbiAgICAgKi9cbiAgICBhcHBseVN0eWxlT2JqZWN0KG1hcCwgc3R5bGVKc29uLCBuYW1lKSB7XG4gICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlTWFwW25hbWVdID0gc3R5bGVKc29uO1xuICAgICAgICB9XG5cbiAgICAgICAgc3R5bGVKc29uLmxheWVycy5mb3JFYWNoKGxheWVyID0+IHtcbiAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGxheWVyLnBhaW50KS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgICAgICBtYXAuc2V0UGFpbnRQcm9wZXJ0eShsYXllci5pZCwga2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW91bnRpbmcgYSBtYXAgaW50byBhbiBpbmFjdGl2ZSB0YWIgYW5kIGFjdGl2YXRpbmcgaXQgc2hvdWxkIGNhbGwgdGhpc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKi9cbiAgICBhdXRvUmVzaXplKGRhdGEpIHtcbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy5tYXBzW2RhdGEuaWRdO1xuXG4gICAgICAgIGlmIChtYXApIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIG1hcC5yZXNpemUoKTtcbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbZGF0YS5hbmltYXRlPWZhbHNlXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGRhdGEubGF0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGRhdGEubG5nXG4gICAgICovXG4gICAgY2VudGVyKGRhdGEpIHtcbiAgICAgICAgY29uc3QgbWFwICAgID0gdGhpcy5tYXBzW2RhdGEuaWRdLFxuICAgICAgICAgICAgICBjZW50ZXIgPSB7bGF0OiBkYXRhLmxhdCwgbG5nOiBkYXRhLmxuZ307XG5cbiAgICAgICAgaWYgKG1hcCkge1xuICAgICAgICAgICAgaWYgKGRhdGEuYW5pbWF0ZSkge1xuICAgICAgICAgICAgICAgIG1hcC5mbHlUbyh7Y2VudGVyOiBjZW50ZXJ9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWFwLnNldENlbnRlcihjZW50ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdG9kb1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gICBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICAgZGF0YS5hY2Nlc3NUb2tlblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgIGRhdGEuY2VudGVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICAgW2RhdGEuZGF0YV1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gICBbZGF0YS5kYXRhU291cmNlSWRdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICAgZGF0YS5pZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IFtkYXRhLmxheWVyc11cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gICBkYXRhLm1hcGJveFN0eWxlXG4gICAgICogQHBhcmFtIHtPYmplY3RbXX0gW2RhdGEuc291cmNlc11cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gICBkYXRhLnpvb21cbiAgICAgKi9cbiAgICBjcmVhdGUoZGF0YSkge1xuICAgICAgICBjb25zdCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCFtZS5zY3JpcHRzTG9hZGVkKSB7XG4gICAgICAgICAgICBtZS5tYXBzVG9DcmVhdGUucHVzaChkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hcGJveGdsLmFjY2Vzc1Rva2VuID0gZGF0YS5hY2Nlc3NUb2tlbjtcblxuICAgICAgICAgICAgbGV0IHpvb20gPSBkYXRhLnpvb207XG5cbiAgICAgICAgICAgIGlmIChtZS56b29tTWFwW2RhdGEuaWRdKSB7XG4gICAgICAgICAgICAgICAgem9vbSA9IG1lLnpvb21NYXBbZGF0YS5pZF0uem9vbTtcbiAgICAgICAgICAgICAgICBkZWxldGUgbWUuem9vbU1hcFtkYXRhLmlkXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWUubWFwc1tkYXRhLmlkXSA9IG5ldyBtYXBib3hnbC5NYXAoe1xuICAgICAgICAgICAgICAgIGNlbnRlciAgIDogZGF0YS5jZW50ZXIsXG4gICAgICAgICAgICAgICAgY29udGFpbmVyOiBkYXRhLmlkLFxuICAgICAgICAgICAgICAgIHN0eWxlICAgIDogZGF0YS5tYXBib3hTdHlsZSxcbiAgICAgICAgICAgICAgICB6b29tICAgICA6IHpvb21cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtZS5tYXBzW2RhdGEuaWRdLm9uKCdsb2FkJywgbWUub25NYXBMb2FkZWQuYmluZChtZSwgZGF0YSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICovXG4gICAgZGVzdHJveShkYXRhKSB7XG4gICAgICAgIHRoaXMubWFwc1tkYXRhLmlkXS5yZW1vdmUoKTtcbiAgICAgICAgZGVsZXRlIHRoaXMubWFwc1tkYXRhLmlkXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGhhc01hcChpZCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLm1hcHNbaWRdO1xuICAgIH1cblxuICAgIGluc2VydE1hcGJveEdMU2NyaXB0cygpIHtcbiAgICAgICAgY29uc3QgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgICBiYXNlUGF0aCA9IG1lLmRvd25sb2FkUGF0aCArIG1lLnZlcnNpb24gKyAnLyc7XG5cbiAgICAgICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgRG9tQWNjZXNzLmxvYWRTY3JpcHQoICAgIGJhc2VQYXRoICsgJ21hcGJveC1nbC5qcycpLFxuICAgICAgICAgICAgRG9tQWNjZXNzLmxvYWRTdHlsZXNoZWV0KGJhc2VQYXRoICsgJ21hcGJveC1nbC5jc3MnKVxuICAgICAgICBdKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIG1lLnNjcmlwdHNMb2FkZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50LnRhcmdldCBtYXAgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBvbk1hcExvYWRlZChkYXRhLCBldmVudCkge1xuICAgICAgICBjb25zdCBtZSAgICA9IHRoaXMsXG4gICAgICAgICAgICAgIG1hcElkID0gZGF0YS5pZDtcblxuICAgICAgICBpZiAoZGF0YS5zb3VyY2VzKSB7XG4gICAgICAgICAgICBtZS5hZGRTb3VyY2VzKHtcbiAgICAgICAgICAgICAgICBpZCAgICAgOiBkYXRhLmlkLFxuICAgICAgICAgICAgICAgIHNvdXJjZXM6IGRhdGEuc291cmNlc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobWUuc291cmNlc1ttYXBJZF0pIHtcbiAgICAgICAgICAgIG1lLmFkZFNvdXJjZXMobWUuc291cmNlc1ttYXBJZF0pO1xuICAgICAgICAgICAgZGVsZXRlIG1lLnNvdXJjZXNbbWFwSWRdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEubGF5ZXJzKSB7XG4gICAgICAgICAgICBtZS5hZGRMYXllcnMoe1xuICAgICAgICAgICAgICAgIGlkICAgIDogZGF0YS5pZCxcbiAgICAgICAgICAgICAgICBsYXllcnM6IGRhdGEubGF5ZXJzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChtZS5sYXllcnNbbWFwSWRdKSB7XG4gICAgICAgICAgICBtZS5hZGRMYXllcnMobWUubGF5ZXJzW21hcElkXSk7XG4gICAgICAgICAgICBkZWxldGUgbWUubGF5ZXJzW21hcElkXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1hcC5sb2FkZWQoKSBpcyBmYWxzZSBhdCB0aGlzIHBvaW50LFxuICAgICAgICAvLyBpbiBjYXNlIHdlIGRvIGFkZCBsYXllcnMgLyBzb3VyY2VzXG4gICAgICAgIC8vIHRoZSBcImlkbGVcIiBldmVudCBzZWVtcyB0byBiZSB0aGUgYmVzdCBmaXRcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5sb2FkZWQoKSkge1xuICAgICAgICAgICAgbWUub25NYXBSZWFsbHlMb2FkZWQoZGF0YSwgZXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXZlbnQudGFyZ2V0Lm9uY2UoJ2lkbGUnLCBtZS5vbk1hcFJlYWxseUxvYWRlZC5iaW5kKG1lLCBkYXRhKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50LnRhcmdldCBtYXAgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBvbk1hcFJlYWxseUxvYWRlZChkYXRhLCBldmVudCkge1xuICAgICAgICBjb25zdCBtZSA9IHRoaXM7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZGF0YS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgbWUudXBkYXRlRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgICAgICAgIDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgICAgICBkYXRhU291cmNlSWQ6IGRhdGEuZGF0YVNvdXJjZUlkLFxuICAgICAgICAgICAgICAgICAgICBpZCAgICAgICAgICA6IGRhdGEuaWRcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmIChtZS5kYXRhTWFwW2RhdGEuaWRdKSB7XG4gICAgICAgICAgICAgICAgbWUudXBkYXRlRGF0YShtZS5kYXRhTWFwW2RhdGEuaWRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBodHRwczovL2RvY3MubWFwYm94LmNvbS9tYXBib3gtZ2wtanMvYXBpLyNtYXAjc2V0ZmlsdGVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmxheWVySWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YS5vcHRpb25zXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBkYXRhLm9wdGlvbnMudmFsaWRhdGVcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhLnZhbHVlXG4gICAgICovXG4gICAgc2V0RmlsdGVyKGRhdGEpIHtcbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy5tYXBzW2RhdGEuaWRdO1xuXG4gICAgICAgIGlmIChtYXApIHtcbiAgICAgICAgICAgIG1hcC5zZXRGaWx0ZXIoZGF0YS5sYXllcklkLCBkYXRhLnZhbHVlLCBkYXRhLm9wdGlvbnMgfHwge30pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdG9kbzogd2UgY291bGQgY2FjaGUgdGhpcyBhbmQgYXBwbHkgb25NYXBMb2FkZWRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGh0dHBzOi8vZG9jcy5tYXBib3guY29tL21hcGJveC1nbC1qcy9hcGkvI21hcCNzZXRsYXlvdXRwcm9wZXJ0eVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5sYXllcklkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEua2V5XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEub3B0aW9uc1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZGF0YS5vcHRpb25zLnZhbGlkYXRlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEudmFsdWVcbiAgICAgKi9cbiAgICBzZXRMYXlvdXRQcm9wZXJ0eShkYXRhKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMubWFwc1tkYXRhLmlkXTtcblxuICAgICAgICBpZiAobWFwKSB7XG4gICAgICAgICAgICBtYXAuc2V0TGF5b3V0UHJvcGVydHkoZGF0YS5sYXllcklkLCBkYXRhLmtleSwgZGF0YS52YWx1ZSwgZGF0YS5vcHRpb25zIHx8IHt9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRvZG86IHdlIGNvdWxkIGNhY2hlIHRoaXMgYW5kIGFwcGx5IG9uTWFwTG9hZGVkXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBodHRwczovL2RvY3MubWFwYm94LmNvbS9tYXBib3gtZ2wtanMvYXBpLyNtYXAjc2V0cGFpbnRwcm9wZXJ0eVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5sYXllcklkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEua2V5XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEub3B0aW9uc1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZGF0YS5vcHRpb25zLnZhbGlkYXRlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEudmFsdWVcbiAgICAgKi9cbiAgICBzZXRQYWludFByb3BlcnR5KGRhdGEpIHtcbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy5tYXBzW2RhdGEuaWRdO1xuXG4gICAgICAgIGlmIChtYXApIHtcbiAgICAgICAgICAgIG1hcC5zZXRQYWludFByb3BlcnR5KGRhdGEubGF5ZXJJZCwgZGF0YS5rZXksIGRhdGEudmFsdWUsIGRhdGEub3B0aW9ucyB8fCB7fSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0b2RvOiB3ZSBjb3VsZCBjYWNoZSB0aGlzIGFuZCBhcHBseSBvbk1hcExvYWRlZFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmFjY2Vzc1Rva2VuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEuc3R5bGVcbiAgICAgKi9cbiAgICBzZXRTdHlsZShkYXRhKSB7XG4gICAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAoIW1lLnNjcmlwdHNMb2FkZWQgfHwgIW1lLmhhc01hcChkYXRhLmlkKSkge1xuICAgICAgICAgICAgLy8gdG9kb1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKE5lby5pc1N0cmluZyhkYXRhLnN0eWxlKSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnN0eWxlLmluZGV4T2YoJ21hcGJveDovL3N0eWxlcy8nKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLnN0eWxlID0gZGF0YS5zdHlsZS5zdWJzdHJpbmcoMTYpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChtZS5zdHlsZU1hcFtkYXRhLnN0eWxlXSkge1xuICAgICAgICAgICAgICAgICAgICBtZS5hcHBseVN0eWxlT2JqZWN0KG1lLm1hcHNbZGF0YS5pZF0sIG1lLnN0eWxlTWFwW2RhdGEuc3R5bGVdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmZXRjaChgaHR0cHM6Ly9hcGkubWFwYm94LmNvbS9zdHlsZXMvdjEvJHtkYXRhLnN0eWxlfT9hY2Nlc3NfdG9rZW49JHtkYXRhLmFjY2Vzc1Rva2VufWApXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihzdHlsZUpzb24gPT4gbWUuYXBwbHlTdHlsZU9iamVjdChtZS5tYXBzW2RhdGEuaWRdLCBzdHlsZUpzb24sIGRhdGEuc3R5bGUpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbWFwLnNldFN0eWxlIGJyZWFrcyB3aXRoIG9ubHkgYSBjb25zb2xlLndhcm4oKVxuICAgICAgICAgICAgLy8gPT4gY2F1c2luZyBhIGZ1bGwgcmVwYWludCwgbG9zaW5nIGN1c3RvbSBzb3VyY2VzICYgbGF5ZXJzXG4gICAgICAgICAgICAvLyBtYXAuc2V0U3R5bGUoZGF0YS5zdHlsZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEuZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmRhdGFTb3VyY2VJZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICovXG4gICAgdXBkYXRlRGF0YShkYXRhKSB7XG4gICAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAoIW1lLnNjcmlwdHNMb2FkZWQgfHwgIW1lLmhhc01hcChkYXRhLmlkKSkge1xuICAgICAgICAgICAgbWUuZGF0YU1hcFtkYXRhLmlkXSA9IGRhdGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBtYXAgICAgPSBtZS5tYXBzW2RhdGEuaWRdLFxuICAgICAgICAgICAgICAgICAgc291cmNlID0gbWFwLmdldFNvdXJjZShkYXRhLmRhdGFTb3VyY2VJZCk7XG5cbiAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBzb3VyY2Uuc2V0RGF0YShkYXRhLmRhdGEpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBtZS5kYXRhTWFwW2RhdGEuaWRdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZS5kYXRhTWFwW2RhdGEuaWRdID0gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkYXRhLnpvb21cbiAgICAgKi9cbiAgICB6b29tKGRhdGEpIHtcbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy5tYXBzW2RhdGEuaWRdO1xuXG4gICAgICAgIGlmIChtYXApIHtcbiAgICAgICAgICAgIG1hcC5zZXRab29tKGRhdGEuem9vbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnpvb21NYXBbZGF0YS5pZF0gPSBkYXRhO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhNYXBib3hHTCk7XG5cbmxldCBpbnN0YW5jZSA9IE5lby5jcmVhdGUoTWFwYm94R0wpO1xuXG5OZW8uYXBwbHlUb0dsb2JhbE5zKGluc3RhbmNlKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7Il0sInNvdXJjZVJvb3QiOiIifQ==