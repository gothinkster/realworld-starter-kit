(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src/main/addon/MapboxGL-mjs"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9hZGRvbi9NYXBib3hHTC5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUE0QztBQUNIOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0RBQUk7QUFDM0Isd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsTUFBTTtBQUMxQyxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxNQUFNO0FBQzFDLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxv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TztBQUN0QixlQUFlLFFBQVE7QUFDdkIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdGQUF3RjtBQUN4RixTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsUUFBUTtBQUN2QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUZBQXVGO0FBQ3ZGLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsY0FBYztBQUM3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLDhEQUE4RCxXQUFXLGdCQUFnQixpQkFBaUI7QUFDMUc7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRWUsdUVBQVEsRSIsImZpbGUiOiJzcmMvbWFpbi9hZGRvbi9NYXBib3hHTC1tanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSAgICAgIGZyb20gJy4uLy4uL2NvcmUvQmFzZS5tanMnO1xuaW1wb3J0IERvbUFjY2VzcyBmcm9tICcuLi9Eb21BY2Nlc3MubWpzJztcblxuLyoqXG4gKiBIZWxwZXIgY2xhc3MgdG8gaW5jbHVkZSBNYXBib3ggR0wgbWFwcyBpbnRvIHlvdXIgbmVvLm1qcyBhcHBcbiAqIFNlZTogaHR0cHM6Ly9kb2NzLm1hcGJveC5jb20vbWFwYm94LWdsLWpzL2FwaS9cbiAqIEluIGNhc2UgeW91IG5lZWQgbW9yZSBBUEkgbWV0aG9kcyB0byBnZXQgZXhwb3NlZCB0byB0aGUgQXBwIHdvcmtlcixcbiAqIHBsZWFzZSBvcGVuIGlzc3VlcyBpbnNpZGUgdGhlIHRyYWNrZXIgYW5kIC8gb3Igc3VibWl0IFBScy5cbiAqIEBjbGFzcyBOZW8ubWFpbi5hZGRvbi5NYXBib3hHTFxuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICogQHNpbmdsZXRvblxuICovXG5jbGFzcyBNYXBib3hHTCBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8ubWFpbi5hZGRvbi5NYXBib3hHTCdcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5tYWluLmFkZG9uLk1hcGJveEdMJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JlcyBhbGwgbWFwIGRhdGEgaW5zaWRlIGFuIG9iamVjdCB1bnRpbCBtb3VudGluZy4ga2V5ID0+IG1hcCBpZFxuICAgICAgICAgKiBObyBhcnJheSBzaW5jZSBpbiBjYXNlIGEgbWFwIGdldHMgbG9hZGVkIG11bHRpcGxlIHRpbWVzLCB3ZSBvbmx5IHdhbnQgdG8gYXBwbHkgdGhlIGxhc3QgZGF0YSBvbiBtb3VudC5cbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBkYXRhTWFwPXt9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBkYXRhTWFwOiB7fSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gZG93bmxvYWRQYXRoPSdodHRwczovL2FwaS5tYXBib3guY29tL21hcGJveC1nbC1qcy8nXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBkb3dubG9hZFBhdGg6ICdodHRwczovL2FwaS5tYXBib3guY29tL21hcGJveC1nbC1qcy8nLFxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcmVzIGFsbCBleHRyYSBtYXAgc291cmNlcyBsYXllcnMgYW4gb2JqZWN0LlxuICAgICAgICAgKiBrZXkgPT4gbWFwIGlkLCB2YWx1ZSA9PiB7QXJyYXl9IGxheWVyc1xuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IGxheWVycz17fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgbGF5ZXJzOiB7fSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JlcyBhbGwgbWFwIGlkcyBpbnNpZGUgYW4gb2JqZWN0XG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gbWFwcz17fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgbWFwczoge30sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9yZXMgYWxsIG1hcCBjb25maWcgb2JqZWN0cyB3aGljaCBhcnJpdmVkIGJlZm9yZSB0aGUgbWFwIGxpYiBzY3JpcHRzIGdvdCBsb2FkZWRcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0W119IG1hcHNUb0NyZWF0ZT1bXVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgbWFwc1RvQ3JlYXRlOiBbXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHNjcmlwdHNMb2FkZWRfPXRydWVcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHNjcmlwdHNMb2FkZWRfOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHNpbmdsZXRvbj10cnVlXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBzaW5nbGV0b246IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9yZXMgYWxsIG1hcCBzb3VyY2VzIGluc2lkZSBhbiBvYmplY3QuXG4gICAgICAgICAqIGtleSA9PiBtYXAgaWQsIHZhbHVlID0+IHtBcnJheX0gc291cmNlc1xuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHNvdXJjZXM9e31cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHNvdXJjZXM6IHt9LFxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3RlIG1ldGhvZCBhY2Nlc3MgZm9yIG90aGVyIHdvcmtlcnNcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSByZW1vdGVcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHJlbW90ZToge1xuICAgICAgICAgICAgYXBwOiBbXG4gICAgICAgICAgICAgICAgJ2FkZExheWVycycsXG4gICAgICAgICAgICAgICAgJ2FkZFNvdXJjZXMnLFxuICAgICAgICAgICAgICAgICdhdXRvUmVzaXplJyxcbiAgICAgICAgICAgICAgICAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAnY3JlYXRlJyxcbiAgICAgICAgICAgICAgICAnc2V0RmlsdGVyJyxcbiAgICAgICAgICAgICAgICAnc2V0TGF5b3V0UHJvcGVydHknLFxuICAgICAgICAgICAgICAgICdzZXRQYWludFByb3BlcnR5JyxcbiAgICAgICAgICAgICAgICAnc2V0U3R5bGUnLFxuICAgICAgICAgICAgICAgICd1cGRhdGVEYXRhJyxcbiAgICAgICAgICAgICAgICAnem9vbSdcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JlcyBhbGwgbWFwIHN0eWxlIG9iamVjdHMgaW5zaWRlIGFuIG9iamVjdHMgdG8gcHJldmVudCByZWxvYWRzIHdoZW4gc3dpdGNoaW5nIHRoZW1lcyBtdWx0aXBsZSB0aW1lcy5cbiAgICAgICAgICoga2V5ID0+IHN0eWxlIG5hbWUgKHVybClcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBzdHlsZU1hcD17fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgc3R5bGVNYXA6IHt9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSB2ZXJzaW9uPSd2MS45LjEnXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB2ZXJzaW9uOiAndjEuOS4xJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JlcyBhbGwgbWFwIHpvb20gdmFsdWVzIGluc2lkZSBhbiBvYmplY3QgdW50aWwgbW91bnRpbmcuIGtleSA9PiBtYXAgaWRcbiAgICAgICAgICogTm8gYXJyYXkgc2luY2UgaW4gY2FzZSBhIG1hcCBnZXRzIHpvb21lZCBtdWx0aXBsZSB0aW1lcywgd2Ugb25seSB3YW50IHRvIGFwcGx5IHRoZSBsYXN0IHZhbHVlIG9uIG1vdW50LlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHpvb21NYXA9e31cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHpvb21NYXA6IHt9XG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuICAgICAgICB0aGlzLmluc2VydE1hcGJveEdMU2NyaXB0cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IGRhdGEubGF5ZXJzXG4gICAgICovXG4gICAgYWRkTGF5ZXJzKGRhdGEpIHtcbiAgICAgICAgY29uc3QgbWUgID0gdGhpcyxcbiAgICAgICAgICAgICAgbWFwID0gbWUubWFwc1tkYXRhLmlkXTtcblxuICAgICAgICBsZXQgYmVmb3JlSWQ7XG5cbiAgICAgICAgaWYgKG1hcCkge1xuICAgICAgICAgICAgZGF0YS5sYXllcnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBiZWZvcmVJZCA9IGl0ZW0uYmVmb3JlSWQ7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGl0ZW0uYmVmb3JlSWQ7XG5cbiAgICAgICAgICAgICAgICBtYXAuYWRkTGF5ZXIoaXRlbSwgYmVmb3JlSWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZS5sYXllcnNbZGF0YS5pZF0gPSBPYmplY3QuYXNzaWduKG1lLmxheWVyc1tkYXRhLmlkXSB8fCB7fSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSBkYXRhLnNvdXJjZXNcbiAgICAgKi9cbiAgICBhZGRTb3VyY2VzKGRhdGEpIHtcbiAgICAgICAgY29uc3QgbWUgID0gdGhpcyxcbiAgICAgICAgICAgICAgbWFwID0gbWUubWFwc1tkYXRhLmlkXTtcblxuICAgICAgICBsZXQgaWQ7XG5cbiAgICAgICAgaWYgKG1hcCkge1xuICAgICAgICAgICAgZGF0YS5zb3VyY2VzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgaWQgPSBpdGVtLmlkO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBpdGVtLmlkO1xuXG4gICAgICAgICAgICAgICAgbWFwLmFkZFNvdXJjZShpZCwgaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lLnNvdXJjZXNbZGF0YS5pZF0gPSBPYmplY3QuYXNzaWduKG1lLnNvdXJjZXNbZGF0YS5pZF0gfHwge30sIGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBzY3JpcHRzTG9hZGVkIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhZnRlclNldFNjcmlwdHNMb2FkZWQodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICAgICAgICBtZS5tYXBzVG9DcmVhdGUuZm9yRWFjaChjb25maWcgPT4ge1xuICAgICAgICAgICAgICAgIG1lLmNyZWF0ZShjb25maWcpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1lLm1hcHNUb0NyZWF0ZSA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbWFwXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHN0eWxlSnNvblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbbmFtZV1cbiAgICAgKi9cbiAgICBhcHBseVN0eWxlT2JqZWN0KG1hcCwgc3R5bGVKc29uLCBuYW1lKSB7XG4gICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlTWFwW25hbWVdID0gc3R5bGVKc29uO1xuICAgICAgICB9XG5cbiAgICAgICAgc3R5bGVKc29uLmxheWVycy5mb3JFYWNoKGxheWVyID0+IHtcbiAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGxheWVyLnBhaW50KS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgICAgICBtYXAuc2V0UGFpbnRQcm9wZXJ0eShsYXllci5pZCwga2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW91bnRpbmcgYSBtYXAgaW50byBhbiBpbmFjdGl2ZSB0YWIgYW5kIGFjdGl2YXRpbmcgaXQgc2hvdWxkIGNhbGwgdGhpc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKi9cbiAgICBhdXRvUmVzaXplKGRhdGEpIHtcbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy5tYXBzW2RhdGEuaWRdO1xuXG4gICAgICAgIGlmIChtYXApIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIG1hcC5yZXNpemUoKTtcbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbZGF0YS5hbmltYXRlPWZhbHNlXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGRhdGEubGF0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGRhdGEubG5nXG4gICAgICovXG4gICAgY2VudGVyKGRhdGEpIHtcbiAgICAgICAgY29uc3QgbWFwICAgID0gdGhpcy5tYXBzW2RhdGEuaWRdLFxuICAgICAgICAgICAgICBjZW50ZXIgPSB7bGF0OiBkYXRhLmxhdCwgbG5nOiBkYXRhLmxuZ307XG5cbiAgICAgICAgaWYgKG1hcCkge1xuICAgICAgICAgICAgaWYgKGRhdGEuYW5pbWF0ZSkge1xuICAgICAgICAgICAgICAgIG1hcC5mbHlUbyh7Y2VudGVyOiBjZW50ZXJ9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWFwLnNldENlbnRlcihjZW50ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdG9kb1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmFjY2Vzc1Rva2VuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEuY2VudGVyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5tYXBib3hTdHlsZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLnpvb21cbiAgICAgKi9cbiAgICBjcmVhdGUoZGF0YSkge1xuICAgICAgICBjb25zdCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCFtZS5zY3JpcHRzTG9hZGVkKSB7XG4gICAgICAgICAgICBtZS5tYXBzVG9DcmVhdGUucHVzaChkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hcGJveGdsLmFjY2Vzc1Rva2VuID0gZGF0YS5hY2Nlc3NUb2tlbjtcblxuICAgICAgICAgICAgbGV0IHpvb20gPSBkYXRhLnpvb207XG5cbiAgICAgICAgICAgIGlmIChtZS56b29tTWFwW2RhdGEuaWRdKSB7XG4gICAgICAgICAgICAgICAgem9vbSA9IG1lLnpvb21NYXBbZGF0YS5pZF0uem9vbTtcbiAgICAgICAgICAgICAgICBkZWxldGUgbWUuem9vbU1hcFtkYXRhLmlkXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWUubWFwc1tkYXRhLmlkXSA9IG5ldyBtYXBib3hnbC5NYXAoe1xuICAgICAgICAgICAgICAgIGNlbnRlciAgIDogZGF0YS5jZW50ZXIsXG4gICAgICAgICAgICAgICAgY29udGFpbmVyOiBkYXRhLmlkLFxuICAgICAgICAgICAgICAgIHN0eWxlICAgIDogZGF0YS5tYXBib3hTdHlsZSxcbiAgICAgICAgICAgICAgICB6b29tICAgICA6IHpvb21cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtZS5tYXBzW2RhdGEuaWRdLm9uKCdsb2FkJywgbWUub25NYXBMb2FkZWQuYmluZChtZSwgZGF0YS5pZCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGhhc01hcChpZCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLm1hcHNbaWRdO1xuICAgIH1cblxuICAgIGluc2VydE1hcGJveEdMU2NyaXB0cygpIHtcbiAgICAgICAgY29uc3QgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgICBiYXNlUGF0aCA9IG1lLmRvd25sb2FkUGF0aCArIG1lLnZlcnNpb24gKyAnLyc7XG5cbiAgICAgICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgRG9tQWNjZXNzLmxvYWRTY3JpcHQoICAgIGJhc2VQYXRoICsgJ21hcGJveC1nbC5qcycpLFxuICAgICAgICAgICAgRG9tQWNjZXNzLmxvYWRTdHlsZXNoZWV0KGJhc2VQYXRoICsgJ21hcGJveC1nbC5jc3MnKVxuICAgICAgICBdKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIG1lLnNjcmlwdHNMb2FkZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtYXBJZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudC50YXJnZXQgbWFwIGluc3RhbmNlXG4gICAgICovXG4gICAgb25NYXBMb2FkZWQobWFwSWQsIGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUuc291cmNlc1ttYXBJZF0pIHtcbiAgICAgICAgICAgIG1lLmFkZFNvdXJjZXMobWUuc291cmNlc1ttYXBJZF0pO1xuICAgICAgICAgICAgZGVsZXRlIG1lLnNvdXJjZXNbbWFwSWRdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1lLmxheWVyc1ttYXBJZF0pIHtcbiAgICAgICAgICAgIG1lLmFkZExheWVycyhtZS5sYXllcnNbbWFwSWRdKTtcbiAgICAgICAgICAgIGRlbGV0ZSBtZS5sYXllcnNbbWFwSWRdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWFwLmxvYWRlZCgpIGlzIGZhbHNlIGF0IHRoaXMgcG9pbnQsXG4gICAgICAgIC8vIGluIGNhc2Ugd2UgZG8gYWRkIGxheWVycyAvIHNvdXJjZXNcbiAgICAgICAgLy8gdGhlIFwiaWRsZVwiIGV2ZW50IHNlZW1zIHRvIGJlIHRoZSBiZXN0IGZpdFxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmxvYWRlZCgpKSB7XG4gICAgICAgICAgICBtZS5vbk1hcFJlYWxseUxvYWRlZChtYXBJZCwgZXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXZlbnQudGFyZ2V0Lm9uY2UoJ2lkbGUnLCBtZS5vbk1hcFJlYWxseUxvYWRlZC5iaW5kKG1lLCBtYXBJZCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWFwSWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQudGFyZ2V0IG1hcCBpbnN0YW5jZVxuICAgICAqL1xuICAgIG9uTWFwUmVhbGx5TG9hZGVkKG1hcElkLCBldmVudCkge1xuICAgICAgICBjb25zdCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKG1lLmRhdGFNYXBbbWFwSWRdKSB7XG4gICAgICAgICAgICBtZS51cGRhdGVEYXRhKG1lLmRhdGFNYXBbbWFwSWRdKTtcbiAgICAgICAgICAgIGRlbGV0ZSBtZS5kYXRhTWFwW21hcElkXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGh0dHBzOi8vZG9jcy5tYXBib3guY29tL21hcGJveC1nbC1qcy9hcGkvI21hcCNzZXRmaWx0ZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEubGF5ZXJJZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhLm9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGRhdGEub3B0aW9ucy52YWxpZGF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGRhdGEudmFsdWVcbiAgICAgKi9cbiAgICBzZXRGaWx0ZXIoZGF0YSkge1xuICAgICAgICBjb25zdCBtYXAgPSB0aGlzLm1hcHNbZGF0YS5pZF07XG5cbiAgICAgICAgaWYgKG1hcCkge1xuICAgICAgICAgICAgbWFwLnNldEZpbHRlcihkYXRhLmxheWVySWQsIGRhdGEudmFsdWUsIGRhdGEub3B0aW9ucyB8fCB7fSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0b2RvOiB3ZSBjb3VsZCBjYWNoZSB0aGlzIGFuZCBhcHBseSBvbk1hcExvYWRlZFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaHR0cHM6Ly9kb2NzLm1hcGJveC5jb20vbWFwYm94LWdsLWpzL2FwaS8jbWFwI3NldGxheW91dHByb3BlcnR5XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmxheWVySWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5rZXlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YS5vcHRpb25zXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBkYXRhLm9wdGlvbnMudmFsaWRhdGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS52YWx1ZVxuICAgICAqL1xuICAgIHNldExheW91dFByb3BlcnR5KGRhdGEpIHtcbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy5tYXBzW2RhdGEuaWRdO1xuXG4gICAgICAgIGlmIChtYXApIHtcbiAgICAgICAgICAgIG1hcC5zZXRMYXlvdXRQcm9wZXJ0eShkYXRhLmxheWVySWQsIGRhdGEua2V5LCBkYXRhLnZhbHVlLCBkYXRhLm9wdGlvbnMgfHwge30pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdG9kbzogd2UgY291bGQgY2FjaGUgdGhpcyBhbmQgYXBwbHkgb25NYXBMb2FkZWRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGh0dHBzOi8vZG9jcy5tYXBib3guY29tL21hcGJveC1nbC1qcy9hcGkvI21hcCNzZXRwYWludHByb3BlcnR5XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmxheWVySWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5rZXlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YS5vcHRpb25zXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBkYXRhLm9wdGlvbnMudmFsaWRhdGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS52YWx1ZVxuICAgICAqL1xuICAgIHNldFBhaW50UHJvcGVydHkoZGF0YSkge1xuICAgICAgICBjb25zdCBtYXAgPSB0aGlzLm1hcHNbZGF0YS5pZF07XG5cbiAgICAgICAgaWYgKG1hcCkge1xuICAgICAgICAgICAgbWFwLnNldFBhaW50UHJvcGVydHkoZGF0YS5sYXllcklkLCBkYXRhLmtleSwgZGF0YS52YWx1ZSwgZGF0YS5vcHRpb25zIHx8IHt9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRvZG86IHdlIGNvdWxkIGNhY2hlIHRoaXMgYW5kIGFwcGx5IG9uTWFwTG9hZGVkXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuYWNjZXNzVG9rZW5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YS5zdHlsZVxuICAgICAqL1xuICAgIHNldFN0eWxlKGRhdGEpIHtcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmICghbWUuc2NyaXB0c0xvYWRlZCB8fCAhbWUuaGFzTWFwKGRhdGEuaWQpKSB7XG4gICAgICAgICAgICAvLyB0b2RvXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoTmVvLmlzU3RyaW5nKGRhdGEuc3R5bGUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuc3R5bGUuaW5kZXhPZignbWFwYm94Oi8vc3R5bGVzLycpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuc3R5bGUgPSBkYXRhLnN0eWxlLnN1YnN0cmluZygxNik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG1lLnN0eWxlTWFwW2RhdGEuc3R5bGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lLmFwcGx5U3R5bGVPYmplY3QobWUubWFwc1tkYXRhLmlkXSwgbWUuc3R5bGVNYXBbZGF0YS5zdHlsZV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZldGNoKGBodHRwczovL2FwaS5tYXBib3guY29tL3N0eWxlcy92MS8ke2RhdGEuc3R5bGV9P2FjY2Vzc190b2tlbj0ke2RhdGEuYWNjZXNzVG9rZW59YClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHN0eWxlSnNvbiA9PiBtZS5hcHBseVN0eWxlT2JqZWN0KG1lLm1hcHNbZGF0YS5pZF0sIHN0eWxlSnNvbiwgZGF0YS5zdHlsZSkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBtYXAuc2V0U3R5bGUgYnJlYWtzIHdpdGggb25seSBhIGNvbnNvbGUud2FybigpXG4gICAgICAgICAgICAvLyA9PiBjYXVzaW5nIGEgZnVsbCByZXBhaW50LCBsb3NpbmcgY3VzdG9tIHNvdXJjZXMgJiBsYXllcnNcbiAgICAgICAgICAgIC8vIG1hcC5zZXRTdHlsZShkYXRhLnN0eWxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YS5kYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuZGF0YVNvdXJjZUlkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKi9cbiAgICB1cGRhdGVEYXRhKGRhdGEpIHtcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmICghbWUuc2NyaXB0c0xvYWRlZCB8fCAhbWUuaGFzTWFwKGRhdGEuaWQpKSB7XG4gICAgICAgICAgICBtZS5kYXRhTWFwW2RhdGEuaWRdID0gZGF0YTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG1hcCAgICA9IG1lLm1hcHNbZGF0YS5pZF0sXG4gICAgICAgICAgICAgICAgICBzb3VyY2UgPSBtYXAuZ2V0U291cmNlKGRhdGEuZGF0YVNvdXJjZUlkKTtcblxuICAgICAgICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHNvdXJjZS5zZXREYXRhKGRhdGEuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZGF0YS56b29tXG4gICAgICovXG4gICAgem9vbShkYXRhKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMubWFwc1tkYXRhLmlkXTtcblxuICAgICAgICBpZiAobWFwKSB7XG4gICAgICAgICAgICBtYXAuc2V0Wm9vbShkYXRhLnpvb20pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy56b29tTWFwW2RhdGEuaWRdID0gZGF0YTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoTWFwYm94R0wpO1xuXG5sZXQgaW5zdGFuY2UgPSBOZW8uY3JlYXRlKE1hcGJveEdMKTtcblxuTmVvLmFwcGx5VG9HbG9iYWxOcyhpbnN0YW5jZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3RhbmNlOyJdLCJzb3VyY2VSb290IjoiIn0=