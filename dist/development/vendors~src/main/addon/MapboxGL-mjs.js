(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~src/main/addon/MapboxGL-mjs"],{

/***/ "./node_modules/neo.mjs/src/main/addon/MapboxGL.mjs":
/*!**********************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/addon/MapboxGL.mjs ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
class MapboxGL extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.addon.MapboxGL'
         * @private
         */
        className: 'Neo.main.addon.MapboxGL',
        /**
         * Stores all map data inside an object until mounting. key => map id
         * No array since in case a map gets loaded multiple times, we only want to apply the last data on mount.
         * @member {Object} dataMap={}
         * @private
         */
        dataMap: {},
        /**
         * @member {String} downloadPath='https://api.mapbox.com/mapbox-gl-js/'
         * @private
         */
        downloadPath: 'https://api.mapbox.com/mapbox-gl-js/',
        /**
         * Stores all extra map sources layers an object.
         * key => map id, value => {Array} layers
         * @member {Object} layers={}
         * @private
         */
        layers: {},
        /**
         * Stores all map ids inside an object
         * @member {Object} maps={}
         * @private
         */
        maps: {},
        /**
         * Stores all map config objects which arrived before the map lib scripts got loaded
         * @member {Object[]} mapsToCreate=[]
         * @private
         */
        mapsToCreate: [],
        /**
         * @member {Boolean} scriptsLoaded_=true
         * @private
         */
        scriptsLoaded_: false,
        /**
         * @member {Boolean} singleton=true
         * @private
         */
        singleton: true,
        /**
         * Stores all map sources inside an object.
         * key => map id, value => {Array} sources
         * @member {Object} sources={}
         * @private
         */
        sources: {},
        /**
         * Remote method access for other workers
         * @member {Object} remote
         * @private
         */
        remote: {
            app: [
                'addLayers',
                'addSources',
                'autoResize',
                'center',
                'create',
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
         * @private
         */
        styleMap: {},
        /**
         * @member {String} version='v1.9.1'
         * @private
         */
        version: 'v1.9.1',
        /**
         * Stores all map zoom values inside an object until mounting. key => map id
         * No array since in case a map gets zoomed multiple times, we only want to apply the last value on mount.
         * @member {Object} zoomMap={}
         * @private
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
     * @private
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
     * @param {Object} data
     * @param {String} data.accessToken
     * @param {Object} data.center
     * @param {String} data.id
     * @param {String} data.mapboxStyle
     * @param {String} data.zoom
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

            me.maps[data.id].on('load', me.onMapLoaded.bind(me, data.id));
        }
    }

    /**
     *
     * @param {String} id
     * @return {Boolean}
     */
    hasMap(id) {
        return !!this.maps[id];
    }

    insertMapboxGLScripts() {
        const me       = this,
              basePath = me.downloadPath + me.version + '/';

        Promise.all([
            _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].loadScript(    basePath + 'mapbox-gl.js'),
            _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].loadStylesheet(basePath + 'mapbox-gl.css')
        ]).then(() => {
            me.scriptsLoaded = true;
        });
    }

    /**
     *
     * @param {String} mapId
     * @param {Object} event
     * @param {Object} event.target map instance
     */
    onMapLoaded(mapId, event) {
        const me = this;

        if (me.sources[mapId]) {
            me.addSources(me.sources[mapId]);
            delete me.sources[mapId];
        }

        if (me.layers[mapId]) {
            me.addLayers(me.layers[mapId]);
            delete me.layers[mapId];
        }

        // map.loaded() is false at this point,
        // in case we do add layers / sources
        // the "idle" event seems to be the best fit
        if (event.target.loaded()) {
            me.onMapReallyLoaded(mapId, event);
        } else {
            event.target.once('idle', me.onMapReallyLoaded.bind(me, mapId));
        }
    }

    /**
     *
     * @param {String} mapId
     * @param {Object} event
     * @param {Object} event.target map instance
     */
    onMapReallyLoaded(mapId, event) {
        const me = this;

        if (me.dataMap[mapId]) {
            me.updateData(me.dataMap[mapId]);
            delete me.dataMap[mapId];
        }
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

/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9hZGRvbi9NYXBib3hHTC5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUE0QztBQUNIOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0RBQUk7QUFDM0Isd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsTUFBTTtBQUMxQyxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxNQUFNO0FBQzFDLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxv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TztBQUN0QixlQUFlLFFBQVE7QUFDdkIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdGQUF3RjtBQUN4RixTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsUUFBUTtBQUN2QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUZBQXVGO0FBQ3ZGLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsY0FBYztBQUM3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLDhEQUE4RCxXQUFXLGdCQUFnQixpQkFBaUI7QUFDMUc7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRWUsdUVBQVEsRSIsImZpbGUiOiJ2ZW5kb3JzfnNyYy9tYWluL2FkZG9uL01hcGJveEdMLW1qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlICAgICAgZnJvbSAnLi4vLi4vY29yZS9CYXNlLm1qcyc7XG5pbXBvcnQgRG9tQWNjZXNzIGZyb20gJy4uL0RvbUFjY2Vzcy5tanMnO1xuXG4vKipcbiAqIEhlbHBlciBjbGFzcyB0byBpbmNsdWRlIE1hcGJveCBHTCBtYXBzIGludG8geW91ciBuZW8ubWpzIGFwcFxuICogU2VlOiBodHRwczovL2RvY3MubWFwYm94LmNvbS9tYXBib3gtZ2wtanMvYXBpL1xuICogSW4gY2FzZSB5b3UgbmVlZCBtb3JlIEFQSSBtZXRob2RzIHRvIGdldCBleHBvc2VkIHRvIHRoZSBBcHAgd29ya2VyLFxuICogcGxlYXNlIG9wZW4gaXNzdWVzIGluc2lkZSB0aGUgdHJhY2tlciBhbmQgLyBvciBzdWJtaXQgUFJzLlxuICogQGNsYXNzIE5lby5tYWluLmFkZG9uLk1hcGJveEdMXG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKiBAc2luZ2xldG9uXG4gKi9cbmNsYXNzIE1hcGJveEdMIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5tYWluLmFkZG9uLk1hcGJveEdMJ1xuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLm1haW4uYWRkb24uTWFwYm94R0wnLFxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcmVzIGFsbCBtYXAgZGF0YSBpbnNpZGUgYW4gb2JqZWN0IHVudGlsIG1vdW50aW5nLiBrZXkgPT4gbWFwIGlkXG4gICAgICAgICAqIE5vIGFycmF5IHNpbmNlIGluIGNhc2UgYSBtYXAgZ2V0cyBsb2FkZWQgbXVsdGlwbGUgdGltZXMsIHdlIG9ubHkgd2FudCB0byBhcHBseSB0aGUgbGFzdCBkYXRhIG9uIG1vdW50LlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IGRhdGFNYXA9e31cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIGRhdGFNYXA6IHt9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBkb3dubG9hZFBhdGg9J2h0dHBzOi8vYXBpLm1hcGJveC5jb20vbWFwYm94LWdsLWpzLydcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIGRvd25sb2FkUGF0aDogJ2h0dHBzOi8vYXBpLm1hcGJveC5jb20vbWFwYm94LWdsLWpzLycsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9yZXMgYWxsIGV4dHJhIG1hcCBzb3VyY2VzIGxheWVycyBhbiBvYmplY3QuXG4gICAgICAgICAqIGtleSA9PiBtYXAgaWQsIHZhbHVlID0+IHtBcnJheX0gbGF5ZXJzXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gbGF5ZXJzPXt9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBsYXllcnM6IHt9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcmVzIGFsbCBtYXAgaWRzIGluc2lkZSBhbiBvYmplY3RcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBtYXBzPXt9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBtYXBzOiB7fSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JlcyBhbGwgbWFwIGNvbmZpZyBvYmplY3RzIHdoaWNoIGFycml2ZWQgYmVmb3JlIHRoZSBtYXAgbGliIHNjcmlwdHMgZ290IGxvYWRlZFxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3RbXX0gbWFwc1RvQ3JlYXRlPVtdXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBtYXBzVG9DcmVhdGU6IFtdLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc2NyaXB0c0xvYWRlZF89dHJ1ZVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgc2NyaXB0c0xvYWRlZF86IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc2luZ2xldG9uPXRydWVcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHNpbmdsZXRvbjogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JlcyBhbGwgbWFwIHNvdXJjZXMgaW5zaWRlIGFuIG9iamVjdC5cbiAgICAgICAgICoga2V5ID0+IG1hcCBpZCwgdmFsdWUgPT4ge0FycmF5fSBzb3VyY2VzXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gc291cmNlcz17fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgc291cmNlczoge30sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdGUgbWV0aG9kIGFjY2VzcyBmb3Igb3RoZXIgd29ya2Vyc1xuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHJlbW90ZVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3RlOiB7XG4gICAgICAgICAgICBhcHA6IFtcbiAgICAgICAgICAgICAgICAnYWRkTGF5ZXJzJyxcbiAgICAgICAgICAgICAgICAnYWRkU291cmNlcycsXG4gICAgICAgICAgICAgICAgJ2F1dG9SZXNpemUnLFxuICAgICAgICAgICAgICAgICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICdjcmVhdGUnLFxuICAgICAgICAgICAgICAgICdzZXRGaWx0ZXInLFxuICAgICAgICAgICAgICAgICdzZXRMYXlvdXRQcm9wZXJ0eScsXG4gICAgICAgICAgICAgICAgJ3NldFBhaW50UHJvcGVydHknLFxuICAgICAgICAgICAgICAgICdzZXRTdHlsZScsXG4gICAgICAgICAgICAgICAgJ3VwZGF0ZURhdGEnLFxuICAgICAgICAgICAgICAgICd6b29tJ1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcmVzIGFsbCBtYXAgc3R5bGUgb2JqZWN0cyBpbnNpZGUgYW4gb2JqZWN0cyB0byBwcmV2ZW50IHJlbG9hZHMgd2hlbiBzd2l0Y2hpbmcgdGhlbWVzIG11bHRpcGxlIHRpbWVzLlxuICAgICAgICAgKiBrZXkgPT4gc3R5bGUgbmFtZSAodXJsKVxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHN0eWxlTWFwPXt9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBzdHlsZU1hcDoge30sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IHZlcnNpb249J3YxLjkuMSdcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHZlcnNpb246ICd2MS45LjEnLFxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcmVzIGFsbCBtYXAgem9vbSB2YWx1ZXMgaW5zaWRlIGFuIG9iamVjdCB1bnRpbCBtb3VudGluZy4ga2V5ID0+IG1hcCBpZFxuICAgICAgICAgKiBObyBhcnJheSBzaW5jZSBpbiBjYXNlIGEgbWFwIGdldHMgem9vbWVkIG11bHRpcGxlIHRpbWVzLCB3ZSBvbmx5IHdhbnQgdG8gYXBwbHkgdGhlIGxhc3QgdmFsdWUgb24gbW91bnQuXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gem9vbU1hcD17fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgem9vbU1hcDoge31cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG4gICAgICAgIHRoaXMuaW5zZXJ0TWFwYm94R0xTY3JpcHRzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICogQHBhcmFtIHtPYmplY3RbXX0gZGF0YS5sYXllcnNcbiAgICAgKi9cbiAgICBhZGRMYXllcnMoZGF0YSkge1xuICAgICAgICBjb25zdCBtZSAgPSB0aGlzLFxuICAgICAgICAgICAgICBtYXAgPSBtZS5tYXBzW2RhdGEuaWRdO1xuXG4gICAgICAgIGxldCBiZWZvcmVJZDtcblxuICAgICAgICBpZiAobWFwKSB7XG4gICAgICAgICAgICBkYXRhLmxheWVycy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGJlZm9yZUlkID0gaXRlbS5iZWZvcmVJZDtcbiAgICAgICAgICAgICAgICBkZWxldGUgaXRlbS5iZWZvcmVJZDtcblxuICAgICAgICAgICAgICAgIG1hcC5hZGRMYXllcihpdGVtLCBiZWZvcmVJZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lLmxheWVyc1tkYXRhLmlkXSA9IE9iamVjdC5hc3NpZ24obWUubGF5ZXJzW2RhdGEuaWRdIHx8IHt9LCBkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IGRhdGEuc291cmNlc1xuICAgICAqL1xuICAgIGFkZFNvdXJjZXMoZGF0YSkge1xuICAgICAgICBjb25zdCBtZSAgPSB0aGlzLFxuICAgICAgICAgICAgICBtYXAgPSBtZS5tYXBzW2RhdGEuaWRdO1xuXG4gICAgICAgIGxldCBpZDtcblxuICAgICAgICBpZiAobWFwKSB7XG4gICAgICAgICAgICBkYXRhLnNvdXJjZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpZCA9IGl0ZW0uaWQ7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGl0ZW0uaWQ7XG5cbiAgICAgICAgICAgICAgICBtYXAuYWRkU291cmNlKGlkLCBpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWUuc291cmNlc1tkYXRhLmlkXSA9IE9iamVjdC5hc3NpZ24obWUuc291cmNlc1tkYXRhLmlkXSB8fCB7fSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHNjcmlwdHNMb2FkZWQgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGFmdGVyU2V0U2NyaXB0c0xvYWRlZCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBtZSA9IHRoaXM7XG5cbiAgICAgICAgICAgIG1lLm1hcHNUb0NyZWF0ZS5mb3JFYWNoKGNvbmZpZyA9PiB7XG4gICAgICAgICAgICAgICAgbWUuY3JlYXRlKGNvbmZpZyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWUubWFwc1RvQ3JlYXRlID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBtYXBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc3R5bGVKc29uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtuYW1lXVxuICAgICAqL1xuICAgIGFwcGx5U3R5bGVPYmplY3QobWFwLCBzdHlsZUpzb24sIG5hbWUpIHtcbiAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVNYXBbbmFtZV0gPSBzdHlsZUpzb247XG4gICAgICAgIH1cblxuICAgICAgICBzdHlsZUpzb24ubGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMobGF5ZXIucGFpbnQpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgICAgIG1hcC5zZXRQYWludFByb3BlcnR5KGxheWVyLmlkLCBrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VudGluZyBhIG1hcCBpbnRvIGFuIGluYWN0aXZlIHRhYiBhbmQgYWN0aXZhdGluZyBpdCBzaG91bGQgY2FsbCB0aGlzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqL1xuICAgIGF1dG9SZXNpemUoZGF0YSkge1xuICAgICAgICBjb25zdCBtYXAgPSB0aGlzLm1hcHNbZGF0YS5pZF07XG5cbiAgICAgICAgaWYgKG1hcCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbWFwLnJlc2l6ZSgpO1xuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtkYXRhLmFuaW1hdGU9ZmFsc2VdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZGF0YS5sYXRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZGF0YS5sbmdcbiAgICAgKi9cbiAgICBjZW50ZXIoZGF0YSkge1xuICAgICAgICBjb25zdCBtYXAgICAgPSB0aGlzLm1hcHNbZGF0YS5pZF0sXG4gICAgICAgICAgICAgIGNlbnRlciA9IHtsYXQ6IGRhdGEubGF0LCBsbmc6IGRhdGEubG5nfTtcblxuICAgICAgICBpZiAobWFwKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5hbmltYXRlKSB7XG4gICAgICAgICAgICAgICAgbWFwLmZseVRvKHtjZW50ZXI6IGNlbnRlcn0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtYXAuc2V0Q2VudGVyKGNlbnRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0b2RvXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuYWNjZXNzVG9rZW5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YS5jZW50ZXJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLm1hcGJveFN0eWxlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuem9vbVxuICAgICAqL1xuICAgIGNyZWF0ZShkYXRhKSB7XG4gICAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAoIW1lLnNjcmlwdHNMb2FkZWQpIHtcbiAgICAgICAgICAgIG1lLm1hcHNUb0NyZWF0ZS5wdXNoKGRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWFwYm94Z2wuYWNjZXNzVG9rZW4gPSBkYXRhLmFjY2Vzc1Rva2VuO1xuXG4gICAgICAgICAgICBsZXQgem9vbSA9IGRhdGEuem9vbTtcblxuICAgICAgICAgICAgaWYgKG1lLnpvb21NYXBbZGF0YS5pZF0pIHtcbiAgICAgICAgICAgICAgICB6b29tID0gbWUuem9vbU1hcFtkYXRhLmlkXS56b29tO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBtZS56b29tTWFwW2RhdGEuaWRdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtZS5tYXBzW2RhdGEuaWRdID0gbmV3IG1hcGJveGdsLk1hcCh7XG4gICAgICAgICAgICAgICAgY2VudGVyICAgOiBkYXRhLmNlbnRlcixcbiAgICAgICAgICAgICAgICBjb250YWluZXI6IGRhdGEuaWQsXG4gICAgICAgICAgICAgICAgc3R5bGUgICAgOiBkYXRhLm1hcGJveFN0eWxlLFxuICAgICAgICAgICAgICAgIHpvb20gICAgIDogem9vbVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1lLm1hcHNbZGF0YS5pZF0ub24oJ2xvYWQnLCBtZS5vbk1hcExvYWRlZC5iaW5kKG1lLCBkYXRhLmlkKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaGFzTWFwKGlkKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMubWFwc1tpZF07XG4gICAgfVxuXG4gICAgaW5zZXJ0TWFwYm94R0xTY3JpcHRzKCkge1xuICAgICAgICBjb25zdCBtZSAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICAgIGJhc2VQYXRoID0gbWUuZG93bmxvYWRQYXRoICsgbWUudmVyc2lvbiArICcvJztcblxuICAgICAgICBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBEb21BY2Nlc3MubG9hZFNjcmlwdCggICAgYmFzZVBhdGggKyAnbWFwYm94LWdsLmpzJyksXG4gICAgICAgICAgICBEb21BY2Nlc3MubG9hZFN0eWxlc2hlZXQoYmFzZVBhdGggKyAnbWFwYm94LWdsLmNzcycpXG4gICAgICAgIF0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgbWUuc2NyaXB0c0xvYWRlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1hcElkXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50LnRhcmdldCBtYXAgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBvbk1hcExvYWRlZChtYXBJZCwgZXZlbnQpIHtcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChtZS5zb3VyY2VzW21hcElkXSkge1xuICAgICAgICAgICAgbWUuYWRkU291cmNlcyhtZS5zb3VyY2VzW21hcElkXSk7XG4gICAgICAgICAgICBkZWxldGUgbWUuc291cmNlc1ttYXBJZF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWUubGF5ZXJzW21hcElkXSkge1xuICAgICAgICAgICAgbWUuYWRkTGF5ZXJzKG1lLmxheWVyc1ttYXBJZF0pO1xuICAgICAgICAgICAgZGVsZXRlIG1lLmxheWVyc1ttYXBJZF07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtYXAubG9hZGVkKCkgaXMgZmFsc2UgYXQgdGhpcyBwb2ludCxcbiAgICAgICAgLy8gaW4gY2FzZSB3ZSBkbyBhZGQgbGF5ZXJzIC8gc291cmNlc1xuICAgICAgICAvLyB0aGUgXCJpZGxlXCIgZXZlbnQgc2VlbXMgdG8gYmUgdGhlIGJlc3QgZml0XG4gICAgICAgIGlmIChldmVudC50YXJnZXQubG9hZGVkKCkpIHtcbiAgICAgICAgICAgIG1lLm9uTWFwUmVhbGx5TG9hZGVkKG1hcElkLCBldmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudC50YXJnZXQub25jZSgnaWRsZScsIG1lLm9uTWFwUmVhbGx5TG9hZGVkLmJpbmQobWUsIG1hcElkKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtYXBJZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudC50YXJnZXQgbWFwIGluc3RhbmNlXG4gICAgICovXG4gICAgb25NYXBSZWFsbHlMb2FkZWQobWFwSWQsIGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUuZGF0YU1hcFttYXBJZF0pIHtcbiAgICAgICAgICAgIG1lLnVwZGF0ZURhdGEobWUuZGF0YU1hcFttYXBJZF0pO1xuICAgICAgICAgICAgZGVsZXRlIG1lLmRhdGFNYXBbbWFwSWRdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaHR0cHM6Ly9kb2NzLm1hcGJveC5jb20vbWFwYm94LWdsLWpzL2FwaS8jbWFwI3NldGZpbHRlclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5sYXllcklkXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEub3B0aW9uc1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZGF0YS5vcHRpb25zLnZhbGlkYXRlXG4gICAgICogQHBhcmFtIHtBcnJheX0gZGF0YS52YWx1ZVxuICAgICAqL1xuICAgIHNldEZpbHRlcihkYXRhKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMubWFwc1tkYXRhLmlkXTtcblxuICAgICAgICBpZiAobWFwKSB7XG4gICAgICAgICAgICBtYXAuc2V0RmlsdGVyKGRhdGEubGF5ZXJJZCwgZGF0YS52YWx1ZSwgZGF0YS5vcHRpb25zIHx8IHt9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRvZG86IHdlIGNvdWxkIGNhY2hlIHRoaXMgYW5kIGFwcGx5IG9uTWFwTG9hZGVkXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBodHRwczovL2RvY3MubWFwYm94LmNvbS9tYXBib3gtZ2wtanMvYXBpLyNtYXAjc2V0bGF5b3V0cHJvcGVydHlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEubGF5ZXJJZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmtleVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhLm9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGRhdGEub3B0aW9ucy52YWxpZGF0ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLnZhbHVlXG4gICAgICovXG4gICAgc2V0TGF5b3V0UHJvcGVydHkoZGF0YSkge1xuICAgICAgICBjb25zdCBtYXAgPSB0aGlzLm1hcHNbZGF0YS5pZF07XG5cbiAgICAgICAgaWYgKG1hcCkge1xuICAgICAgICAgICAgbWFwLnNldExheW91dFByb3BlcnR5KGRhdGEubGF5ZXJJZCwgZGF0YS5rZXksIGRhdGEudmFsdWUsIGRhdGEub3B0aW9ucyB8fCB7fSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0b2RvOiB3ZSBjb3VsZCBjYWNoZSB0aGlzIGFuZCBhcHBseSBvbk1hcExvYWRlZFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaHR0cHM6Ly9kb2NzLm1hcGJveC5jb20vbWFwYm94LWdsLWpzL2FwaS8jbWFwI3NldHBhaW50cHJvcGVydHlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEubGF5ZXJJZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmtleVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhLm9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGRhdGEub3B0aW9ucy52YWxpZGF0ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLnZhbHVlXG4gICAgICovXG4gICAgc2V0UGFpbnRQcm9wZXJ0eShkYXRhKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMubWFwc1tkYXRhLmlkXTtcblxuICAgICAgICBpZiAobWFwKSB7XG4gICAgICAgICAgICBtYXAuc2V0UGFpbnRQcm9wZXJ0eShkYXRhLmxheWVySWQsIGRhdGEua2V5LCBkYXRhLnZhbHVlLCBkYXRhLm9wdGlvbnMgfHwge30pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdG9kbzogd2UgY291bGQgY2FjaGUgdGhpcyBhbmQgYXBwbHkgb25NYXBMb2FkZWRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5hY2Nlc3NUb2tlblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhLnN0eWxlXG4gICAgICovXG4gICAgc2V0U3R5bGUoZGF0YSkge1xuICAgICAgICBjb25zdCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCFtZS5zY3JpcHRzTG9hZGVkIHx8ICFtZS5oYXNNYXAoZGF0YS5pZCkpIHtcbiAgICAgICAgICAgIC8vIHRvZG9cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChOZW8uaXNTdHJpbmcoZGF0YS5zdHlsZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdHlsZS5pbmRleE9mKCdtYXBib3g6Ly9zdHlsZXMvJykgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zdHlsZSA9IGRhdGEuc3R5bGUuc3Vic3RyaW5nKDE2KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobWUuc3R5bGVNYXBbZGF0YS5zdHlsZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbWUuYXBwbHlTdHlsZU9iamVjdChtZS5tYXBzW2RhdGEuaWRdLCBtZS5zdHlsZU1hcFtkYXRhLnN0eWxlXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2goYGh0dHBzOi8vYXBpLm1hcGJveC5jb20vc3R5bGVzL3YxLyR7ZGF0YS5zdHlsZX0/YWNjZXNzX3Rva2VuPSR7ZGF0YS5hY2Nlc3NUb2tlbn1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oc3R5bGVKc29uID0+IG1lLmFwcGx5U3R5bGVPYmplY3QobWUubWFwc1tkYXRhLmlkXSwgc3R5bGVKc29uLCBkYXRhLnN0eWxlKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG1hcC5zZXRTdHlsZSBicmVha3Mgd2l0aCBvbmx5IGEgY29uc29sZS53YXJuKClcbiAgICAgICAgICAgIC8vID0+IGNhdXNpbmcgYSBmdWxsIHJlcGFpbnQsIGxvc2luZyBjdXN0b20gc291cmNlcyAmIGxheWVyc1xuICAgICAgICAgICAgLy8gbWFwLnNldFN0eWxlKGRhdGEuc3R5bGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhLmRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5kYXRhU291cmNlSWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqL1xuICAgIHVwZGF0ZURhdGEoZGF0YSkge1xuICAgICAgICBjb25zdCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCFtZS5zY3JpcHRzTG9hZGVkIHx8ICFtZS5oYXNNYXAoZGF0YS5pZCkpIHtcbiAgICAgICAgICAgIG1lLmRhdGFNYXBbZGF0YS5pZF0gPSBkYXRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbWFwICAgID0gbWUubWFwc1tkYXRhLmlkXSxcbiAgICAgICAgICAgICAgICAgIHNvdXJjZSA9IG1hcC5nZXRTb3VyY2UoZGF0YS5kYXRhU291cmNlSWQpO1xuXG4gICAgICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgc291cmNlLnNldERhdGEoZGF0YS5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkYXRhLnpvb21cbiAgICAgKi9cbiAgICB6b29tKGRhdGEpIHtcbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy5tYXBzW2RhdGEuaWRdO1xuXG4gICAgICAgIGlmIChtYXApIHtcbiAgICAgICAgICAgIG1hcC5zZXRab29tKGRhdGEuem9vbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnpvb21NYXBbZGF0YS5pZF0gPSBkYXRhO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhNYXBib3hHTCk7XG5cbmxldCBpbnN0YW5jZSA9IE5lby5jcmVhdGUoTWFwYm94R0wpO1xuXG5OZW8uYXBwbHlUb0dsb2JhbE5zKGluc3RhbmNlKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7Il0sInNvdXJjZVJvb3QiOiIifQ==