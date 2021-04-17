(self["webpackChunkneo_mjs_realworld_example_app"] = self["webpackChunkneo_mjs_realworld_example_app"] || []).push([["src/main/addon/MapboxGL-mjs"],{

/***/ "./node_modules/neo.mjs/src/main/addon/MapboxGL.mjs":
/*!**********************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/addon/MapboxGL.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9tYWluL2FkZG9uL01hcGJveEdMLm1qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBNEM7QUFDSDs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1EQUFJO0FBQzNCLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLE1BQU07QUFDMUMsb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsTUFBTTtBQUMxQyxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FB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LFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsaUVBQWUsUUFBUSxFIiwiZmlsZSI6ImNodW5rcy9tYWluL3NyYy9tYWluL2FkZG9uL01hcGJveEdMLW1qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlICAgICAgZnJvbSAnLi4vLi4vY29yZS9CYXNlLm1qcyc7XG5pbXBvcnQgRG9tQWNjZXNzIGZyb20gJy4uL0RvbUFjY2Vzcy5tanMnO1xuXG4vKipcbiAqIEhlbHBlciBjbGFzcyB0byBpbmNsdWRlIE1hcGJveCBHTCBtYXBzIGludG8geW91ciBuZW8ubWpzIGFwcFxuICogU2VlOiBodHRwczovL2RvY3MubWFwYm94LmNvbS9tYXBib3gtZ2wtanMvYXBpL1xuICogSW4gY2FzZSB5b3UgbmVlZCBtb3JlIEFQSSBtZXRob2RzIHRvIGdldCBleHBvc2VkIHRvIHRoZSBBcHAgd29ya2VyLFxuICogcGxlYXNlIG9wZW4gaXNzdWVzIGluc2lkZSB0aGUgdHJhY2tlciBhbmQgLyBvciBzdWJtaXQgUFJzLlxuICogQGNsYXNzIE5lby5tYWluLmFkZG9uLk1hcGJveEdMXG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKiBAc2luZ2xldG9uXG4gKi9cbmNsYXNzIE1hcGJveEdMIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5tYWluLmFkZG9uLk1hcGJveEdMJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8ubWFpbi5hZGRvbi5NYXBib3hHTCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9yZXMgYWxsIG1hcCBkYXRhIGluc2lkZSBhbiBvYmplY3QgdW50aWwgbW91bnRpbmcuIGtleSA9PiBtYXAgaWRcbiAgICAgICAgICogTm8gYXJyYXkgc2luY2UgaW4gY2FzZSBhIG1hcCBnZXRzIGxvYWRlZCBtdWx0aXBsZSB0aW1lcywgd2Ugb25seSB3YW50IHRvIGFwcGx5IHRoZSBsYXN0IGRhdGEgb24gbW91bnQuXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gZGF0YU1hcD17fVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBkYXRhTWFwOiB7fSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gZG93bmxvYWRQYXRoPSdodHRwczovL2FwaS5tYXBib3guY29tL21hcGJveC1nbC1qcy8nXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGRvd25sb2FkUGF0aDogJ2h0dHBzOi8vYXBpLm1hcGJveC5jb20vbWFwYm94LWdsLWpzLycsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9yZXMgYWxsIGV4dHJhIG1hcCBzb3VyY2VzIGxheWVycyBhbiBvYmplY3QuXG4gICAgICAgICAqIGtleSA9PiBtYXAgaWQsIHZhbHVlID0+IHtBcnJheX0gbGF5ZXJzXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gbGF5ZXJzPXt9XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGxheWVyczoge30sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9yZXMgYWxsIG1hcCBpZHMgaW5zaWRlIGFuIG9iamVjdFxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IG1hcHM9e31cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbWFwczoge30sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9yZXMgYWxsIG1hcCBjb25maWcgb2JqZWN0cyB3aGljaCBhcnJpdmVkIGJlZm9yZSB0aGUgbWFwIGxpYiBzY3JpcHRzIGdvdCBsb2FkZWRcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0W119IG1hcHNUb0NyZWF0ZT1bXVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBtYXBzVG9DcmVhdGU6IFtdLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc2NyaXB0c0xvYWRlZF89dHJ1ZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBzY3JpcHRzTG9hZGVkXzogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBzaW5nbGV0b249dHJ1ZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBzaW5nbGV0b246IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9yZXMgYWxsIG1hcCBzb3VyY2VzIGluc2lkZSBhbiBvYmplY3QuXG4gICAgICAgICAqIGtleSA9PiBtYXAgaWQsIHZhbHVlID0+IHtBcnJheX0gc291cmNlc1xuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHNvdXJjZXM9e31cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc291cmNlczoge30sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdGUgbWV0aG9kIGFjY2VzcyBmb3Igb3RoZXIgd29ya2Vyc1xuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHJlbW90ZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICByZW1vdGU6IHtcbiAgICAgICAgICAgIGFwcDogW1xuICAgICAgICAgICAgICAgICdhZGRMYXllcnMnLFxuICAgICAgICAgICAgICAgICdhZGRTb3VyY2VzJyxcbiAgICAgICAgICAgICAgICAnYXV0b1Jlc2l6ZScsXG4gICAgICAgICAgICAgICAgJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgJ2NyZWF0ZScsXG4gICAgICAgICAgICAgICAgJ2Rlc3Ryb3knLFxuICAgICAgICAgICAgICAgICdzZXRGaWx0ZXInLFxuICAgICAgICAgICAgICAgICdzZXRMYXlvdXRQcm9wZXJ0eScsXG4gICAgICAgICAgICAgICAgJ3NldFBhaW50UHJvcGVydHknLFxuICAgICAgICAgICAgICAgICdzZXRTdHlsZScsXG4gICAgICAgICAgICAgICAgJ3VwZGF0ZURhdGEnLFxuICAgICAgICAgICAgICAgICd6b29tJ1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcmVzIGFsbCBtYXAgc3R5bGUgb2JqZWN0cyBpbnNpZGUgYW4gb2JqZWN0cyB0byBwcmV2ZW50IHJlbG9hZHMgd2hlbiBzd2l0Y2hpbmcgdGhlbWVzIG11bHRpcGxlIHRpbWVzLlxuICAgICAgICAgKiBrZXkgPT4gc3R5bGUgbmFtZSAodXJsKVxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHN0eWxlTWFwPXt9XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHN0eWxlTWFwOiB7fSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gdmVyc2lvbj0ndjEuOS4xJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICB2ZXJzaW9uOiAndjEuOS4xJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JlcyBhbGwgbWFwIHpvb20gdmFsdWVzIGluc2lkZSBhbiBvYmplY3QgdW50aWwgbW91bnRpbmcuIGtleSA9PiBtYXAgaWRcbiAgICAgICAgICogTm8gYXJyYXkgc2luY2UgaW4gY2FzZSBhIG1hcCBnZXRzIHpvb21lZCBtdWx0aXBsZSB0aW1lcywgd2Ugb25seSB3YW50IHRvIGFwcGx5IHRoZSBsYXN0IHZhbHVlIG9uIG1vdW50LlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHpvb21NYXA9e31cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgem9vbU1hcDoge31cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG4gICAgICAgIHRoaXMuaW5zZXJ0TWFwYm94R0xTY3JpcHRzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICogQHBhcmFtIHtPYmplY3RbXX0gZGF0YS5sYXllcnNcbiAgICAgKi9cbiAgICBhZGRMYXllcnMoZGF0YSkge1xuICAgICAgICBjb25zdCBtZSAgPSB0aGlzLFxuICAgICAgICAgICAgICBtYXAgPSBtZS5tYXBzW2RhdGEuaWRdO1xuXG4gICAgICAgIGxldCBiZWZvcmVJZDtcblxuICAgICAgICBpZiAobWFwKSB7XG4gICAgICAgICAgICBkYXRhLmxheWVycy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGJlZm9yZUlkID0gaXRlbS5iZWZvcmVJZDtcbiAgICAgICAgICAgICAgICBkZWxldGUgaXRlbS5iZWZvcmVJZDtcblxuICAgICAgICAgICAgICAgIG1hcC5hZGRMYXllcihpdGVtLCBiZWZvcmVJZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lLmxheWVyc1tkYXRhLmlkXSA9IE9iamVjdC5hc3NpZ24obWUubGF5ZXJzW2RhdGEuaWRdIHx8IHt9LCBkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IGRhdGEuc291cmNlc1xuICAgICAqL1xuICAgIGFkZFNvdXJjZXMoZGF0YSkge1xuICAgICAgICBjb25zdCBtZSAgPSB0aGlzLFxuICAgICAgICAgICAgICBtYXAgPSBtZS5tYXBzW2RhdGEuaWRdO1xuXG4gICAgICAgIGxldCBpZDtcblxuICAgICAgICBpZiAobWFwKSB7XG4gICAgICAgICAgICBkYXRhLnNvdXJjZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpZCA9IGl0ZW0uaWQ7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGl0ZW0uaWQ7XG5cbiAgICAgICAgICAgICAgICBtYXAuYWRkU291cmNlKGlkLCBpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWUuc291cmNlc1tkYXRhLmlkXSA9IE9iamVjdC5hc3NpZ24obWUuc291cmNlc1tkYXRhLmlkXSB8fCB7fSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHNjcmlwdHNMb2FkZWQgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRTY3JpcHRzTG9hZGVkKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgICAgICAgbWUubWFwc1RvQ3JlYXRlLmZvckVhY2goY29uZmlnID0+IHtcbiAgICAgICAgICAgICAgICBtZS5jcmVhdGUoY29uZmlnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtZS5tYXBzVG9DcmVhdGUgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG1hcFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZUpzb25cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW25hbWVdXG4gICAgICovXG4gICAgYXBwbHlTdHlsZU9iamVjdChtYXAsIHN0eWxlSnNvbiwgbmFtZSkge1xuICAgICAgICBpZiAobmFtZSkge1xuICAgICAgICAgICAgdGhpcy5zdHlsZU1hcFtuYW1lXSA9IHN0eWxlSnNvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0eWxlSnNvbi5sYXllcnMuZm9yRWFjaChsYXllciA9PiB7XG4gICAgICAgICAgICBPYmplY3QuZW50cmllcyhsYXllci5wYWludCkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICAgICAgbWFwLnNldFBhaW50UHJvcGVydHkobGF5ZXIuaWQsIGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdW50aW5nIGEgbWFwIGludG8gYW4gaW5hY3RpdmUgdGFiIGFuZCBhY3RpdmF0aW5nIGl0IHNob3VsZCBjYWxsIHRoaXNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICovXG4gICAgYXV0b1Jlc2l6ZShkYXRhKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMubWFwc1tkYXRhLmlkXTtcblxuICAgICAgICBpZiAobWFwKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBtYXAucmVzaXplKCk7XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2RhdGEuYW5pbWF0ZT1mYWxzZV1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkYXRhLmxhdFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkYXRhLmxuZ1xuICAgICAqL1xuICAgIGNlbnRlcihkYXRhKSB7XG4gICAgICAgIGNvbnN0IG1hcCAgICA9IHRoaXMubWFwc1tkYXRhLmlkXSxcbiAgICAgICAgICAgICAgY2VudGVyID0ge2xhdDogZGF0YS5sYXQsIGxuZzogZGF0YS5sbmd9O1xuXG4gICAgICAgIGlmIChtYXApIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmFuaW1hdGUpIHtcbiAgICAgICAgICAgICAgICBtYXAuZmx5VG8oe2NlbnRlcjogY2VudGVyfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1hcC5zZXRDZW50ZXIoY2VudGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRvZG9cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICAgZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgIGRhdGEuYWNjZXNzVG9rZW5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gICBkYXRhLmNlbnRlclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgIFtkYXRhLmRhdGFdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICAgW2RhdGEuZGF0YVNvdXJjZUlkXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgIGRhdGEuaWRcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSBbZGF0YS5sYXllcnNdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICAgZGF0YS5tYXBib3hTdHlsZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IFtkYXRhLnNvdXJjZXNdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICAgZGF0YS56b29tXG4gICAgICovXG4gICAgY3JlYXRlKGRhdGEpIHtcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmICghbWUuc2NyaXB0c0xvYWRlZCkge1xuICAgICAgICAgICAgbWUubWFwc1RvQ3JlYXRlLnB1c2goZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXBib3hnbC5hY2Nlc3NUb2tlbiA9IGRhdGEuYWNjZXNzVG9rZW47XG5cbiAgICAgICAgICAgIGxldCB6b29tID0gZGF0YS56b29tO1xuXG4gICAgICAgICAgICBpZiAobWUuem9vbU1hcFtkYXRhLmlkXSkge1xuICAgICAgICAgICAgICAgIHpvb20gPSBtZS56b29tTWFwW2RhdGEuaWRdLnpvb207XG4gICAgICAgICAgICAgICAgZGVsZXRlIG1lLnpvb21NYXBbZGF0YS5pZF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1lLm1hcHNbZGF0YS5pZF0gPSBuZXcgbWFwYm94Z2wuTWFwKHtcbiAgICAgICAgICAgICAgICBjZW50ZXIgICA6IGRhdGEuY2VudGVyLFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lcjogZGF0YS5pZCxcbiAgICAgICAgICAgICAgICBzdHlsZSAgICA6IGRhdGEubWFwYm94U3R5bGUsXG4gICAgICAgICAgICAgICAgem9vbSAgICAgOiB6b29tXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWUubWFwc1tkYXRhLmlkXS5vbignbG9hZCcsIG1lLm9uTWFwTG9hZGVkLmJpbmQobWUsIGRhdGEpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqL1xuICAgIGRlc3Ryb3koZGF0YSkge1xuICAgICAgICB0aGlzLm1hcHNbZGF0YS5pZF0ucmVtb3ZlKCk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLm1hcHNbZGF0YS5pZF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBoYXNNYXAoaWQpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5tYXBzW2lkXTtcbiAgICB9XG5cbiAgICBpbnNlcnRNYXBib3hHTFNjcmlwdHMoKSB7XG4gICAgICAgIGNvbnN0IG1lICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgICAgYmFzZVBhdGggPSBtZS5kb3dubG9hZFBhdGggKyBtZS52ZXJzaW9uICsgJy8nO1xuXG4gICAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIERvbUFjY2Vzcy5sb2FkU2NyaXB0KCAgICBiYXNlUGF0aCArICdtYXBib3gtZ2wuanMnKSxcbiAgICAgICAgICAgIERvbUFjY2Vzcy5sb2FkU3R5bGVzaGVldChiYXNlUGF0aCArICdtYXBib3gtZ2wuY3NzJylcbiAgICAgICAgXSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBtZS5zY3JpcHRzTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudC50YXJnZXQgbWFwIGluc3RhbmNlXG4gICAgICovXG4gICAgb25NYXBMb2FkZWQoZGF0YSwgZXZlbnQpIHtcbiAgICAgICAgY29uc3QgbWUgICAgPSB0aGlzLFxuICAgICAgICAgICAgICBtYXBJZCA9IGRhdGEuaWQ7XG5cbiAgICAgICAgaWYgKGRhdGEuc291cmNlcykge1xuICAgICAgICAgICAgbWUuYWRkU291cmNlcyh7XG4gICAgICAgICAgICAgICAgaWQgICAgIDogZGF0YS5pZCxcbiAgICAgICAgICAgICAgICBzb3VyY2VzOiBkYXRhLnNvdXJjZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG1lLnNvdXJjZXNbbWFwSWRdKSB7XG4gICAgICAgICAgICBtZS5hZGRTb3VyY2VzKG1lLnNvdXJjZXNbbWFwSWRdKTtcbiAgICAgICAgICAgIGRlbGV0ZSBtZS5zb3VyY2VzW21hcElkXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhLmxheWVycykge1xuICAgICAgICAgICAgbWUuYWRkTGF5ZXJzKHtcbiAgICAgICAgICAgICAgICBpZCAgICA6IGRhdGEuaWQsXG4gICAgICAgICAgICAgICAgbGF5ZXJzOiBkYXRhLmxheWVyc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobWUubGF5ZXJzW21hcElkXSkge1xuICAgICAgICAgICAgbWUuYWRkTGF5ZXJzKG1lLmxheWVyc1ttYXBJZF0pO1xuICAgICAgICAgICAgZGVsZXRlIG1lLmxheWVyc1ttYXBJZF07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtYXAubG9hZGVkKCkgaXMgZmFsc2UgYXQgdGhpcyBwb2ludCxcbiAgICAgICAgLy8gaW4gY2FzZSB3ZSBkbyBhZGQgbGF5ZXJzIC8gc291cmNlc1xuICAgICAgICAvLyB0aGUgXCJpZGxlXCIgZXZlbnQgc2VlbXMgdG8gYmUgdGhlIGJlc3QgZml0XG4gICAgICAgIGlmIChldmVudC50YXJnZXQubG9hZGVkKCkpIHtcbiAgICAgICAgICAgIG1lLm9uTWFwUmVhbGx5TG9hZGVkKGRhdGEsIGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5vbmNlKCdpZGxlJywgbWUub25NYXBSZWFsbHlMb2FkZWQuYmluZChtZSwgZGF0YSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudC50YXJnZXQgbWFwIGluc3RhbmNlXG4gICAgICovXG4gICAgb25NYXBSZWFsbHlMb2FkZWQoZGF0YSwgZXZlbnQpIHtcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEuZGF0YSkge1xuICAgICAgICAgICAgICAgIG1lLnVwZGF0ZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhICAgICAgICA6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVNvdXJjZUlkOiBkYXRhLmRhdGFTb3VyY2VJZCxcbiAgICAgICAgICAgICAgICAgICAgaWQgICAgICAgICAgOiBkYXRhLmlkXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWUuZGF0YU1hcFtkYXRhLmlkXSkge1xuICAgICAgICAgICAgICAgIG1lLnVwZGF0ZURhdGEobWUuZGF0YU1hcFtkYXRhLmlkXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaHR0cHM6Ly9kb2NzLm1hcGJveC5jb20vbWFwYm94LWdsLWpzL2FwaS8jbWFwI3NldGZpbHRlclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5sYXllcklkXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEub3B0aW9uc1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZGF0YS5vcHRpb25zLnZhbGlkYXRlXG4gICAgICogQHBhcmFtIHtBcnJheX0gZGF0YS52YWx1ZVxuICAgICAqL1xuICAgIHNldEZpbHRlcihkYXRhKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMubWFwc1tkYXRhLmlkXTtcblxuICAgICAgICBpZiAobWFwKSB7XG4gICAgICAgICAgICBtYXAuc2V0RmlsdGVyKGRhdGEubGF5ZXJJZCwgZGF0YS52YWx1ZSwgZGF0YS5vcHRpb25zIHx8IHt9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRvZG86IHdlIGNvdWxkIGNhY2hlIHRoaXMgYW5kIGFwcGx5IG9uTWFwTG9hZGVkXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBodHRwczovL2RvY3MubWFwYm94LmNvbS9tYXBib3gtZ2wtanMvYXBpLyNtYXAjc2V0bGF5b3V0cHJvcGVydHlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEubGF5ZXJJZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmtleVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhLm9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGRhdGEub3B0aW9ucy52YWxpZGF0ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLnZhbHVlXG4gICAgICovXG4gICAgc2V0TGF5b3V0UHJvcGVydHkoZGF0YSkge1xuICAgICAgICBjb25zdCBtYXAgPSB0aGlzLm1hcHNbZGF0YS5pZF07XG5cbiAgICAgICAgaWYgKG1hcCkge1xuICAgICAgICAgICAgbWFwLnNldExheW91dFByb3BlcnR5KGRhdGEubGF5ZXJJZCwgZGF0YS5rZXksIGRhdGEudmFsdWUsIGRhdGEub3B0aW9ucyB8fCB7fSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0b2RvOiB3ZSBjb3VsZCBjYWNoZSB0aGlzIGFuZCBhcHBseSBvbk1hcExvYWRlZFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaHR0cHM6Ly9kb2NzLm1hcGJveC5jb20vbWFwYm94LWdsLWpzL2FwaS8jbWFwI3NldHBhaW50cHJvcGVydHlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEubGF5ZXJJZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmtleVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhLm9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGRhdGEub3B0aW9ucy52YWxpZGF0ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLnZhbHVlXG4gICAgICovXG4gICAgc2V0UGFpbnRQcm9wZXJ0eShkYXRhKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMubWFwc1tkYXRhLmlkXTtcblxuICAgICAgICBpZiAobWFwKSB7XG4gICAgICAgICAgICBtYXAuc2V0UGFpbnRQcm9wZXJ0eShkYXRhLmxheWVySWQsIGRhdGEua2V5LCBkYXRhLnZhbHVlLCBkYXRhLm9wdGlvbnMgfHwge30pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdG9kbzogd2UgY291bGQgY2FjaGUgdGhpcyBhbmQgYXBwbHkgb25NYXBMb2FkZWRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5hY2Nlc3NUb2tlblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhLnN0eWxlXG4gICAgICovXG4gICAgc2V0U3R5bGUoZGF0YSkge1xuICAgICAgICBjb25zdCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCFtZS5zY3JpcHRzTG9hZGVkIHx8ICFtZS5oYXNNYXAoZGF0YS5pZCkpIHtcbiAgICAgICAgICAgIC8vIHRvZG9cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChOZW8uaXNTdHJpbmcoZGF0YS5zdHlsZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdHlsZS5pbmRleE9mKCdtYXBib3g6Ly9zdHlsZXMvJykgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zdHlsZSA9IGRhdGEuc3R5bGUuc3Vic3RyaW5nKDE2KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobWUuc3R5bGVNYXBbZGF0YS5zdHlsZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbWUuYXBwbHlTdHlsZU9iamVjdChtZS5tYXBzW2RhdGEuaWRdLCBtZS5zdHlsZU1hcFtkYXRhLnN0eWxlXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2goYGh0dHBzOi8vYXBpLm1hcGJveC5jb20vc3R5bGVzL3YxLyR7ZGF0YS5zdHlsZX0/YWNjZXNzX3Rva2VuPSR7ZGF0YS5hY2Nlc3NUb2tlbn1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oc3R5bGVKc29uID0+IG1lLmFwcGx5U3R5bGVPYmplY3QobWUubWFwc1tkYXRhLmlkXSwgc3R5bGVKc29uLCBkYXRhLnN0eWxlKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG1hcC5zZXRTdHlsZSBicmVha3Mgd2l0aCBvbmx5IGEgY29uc29sZS53YXJuKClcbiAgICAgICAgICAgIC8vID0+IGNhdXNpbmcgYSBmdWxsIHJlcGFpbnQsIGxvc2luZyBjdXN0b20gc291cmNlcyAmIGxheWVyc1xuICAgICAgICAgICAgLy8gbWFwLnNldFN0eWxlKGRhdGEuc3R5bGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhLmRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5kYXRhU291cmNlSWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqL1xuICAgIHVwZGF0ZURhdGEoZGF0YSkge1xuICAgICAgICBjb25zdCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCFtZS5zY3JpcHRzTG9hZGVkIHx8ICFtZS5oYXNNYXAoZGF0YS5pZCkpIHtcbiAgICAgICAgICAgIG1lLmRhdGFNYXBbZGF0YS5pZF0gPSBkYXRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbWFwICAgID0gbWUubWFwc1tkYXRhLmlkXSxcbiAgICAgICAgICAgICAgICAgIHNvdXJjZSA9IG1hcC5nZXRTb3VyY2UoZGF0YS5kYXRhU291cmNlSWQpO1xuXG4gICAgICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgc291cmNlLnNldERhdGEoZGF0YS5kYXRhKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgbWUuZGF0YU1hcFtkYXRhLmlkXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWUuZGF0YU1hcFtkYXRhLmlkXSA9IGRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZGF0YS56b29tXG4gICAgICovXG4gICAgem9vbShkYXRhKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMubWFwc1tkYXRhLmlkXTtcblxuICAgICAgICBpZiAobWFwKSB7XG4gICAgICAgICAgICBtYXAuc2V0Wm9vbShkYXRhLnpvb20pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy56b29tTWFwW2RhdGEuaWRdID0gZGF0YTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoTWFwYm94R0wpO1xuXG5sZXQgaW5zdGFuY2UgPSBOZW8uY3JlYXRlKE1hcGJveEdMKTtcblxuTmVvLmFwcGx5VG9HbG9iYWxOcyhpbnN0YW5jZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3RhbmNlOyJdLCJzb3VyY2VSb290IjoiIn0=