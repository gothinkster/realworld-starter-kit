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
            _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].loadScript(    basePath + 'mapbox-gl.js'),
            _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].loadStylesheet(basePath + 'mapbox-gl.css')
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

/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9hZGRvbi9NYXBib3hHTC5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUE0QztBQUNIOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0RBQUk7QUFDM0Isd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsTUFBTTtBQUMxQyxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxNQUFNO0FBQzFDLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRWUsdUVBQVEsRSIsImZpbGUiOiJzcmMvbWFpbi9hZGRvbi9NYXBib3hHTC1tanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSAgICAgIGZyb20gJy4uLy4uL2NvcmUvQmFzZS5tanMnO1xuaW1wb3J0IERvbUFjY2VzcyBmcm9tICcuLi9Eb21BY2Nlc3MubWpzJztcblxuLyoqXG4gKiBIZWxwZXIgY2xhc3MgdG8gaW5jbHVkZSBNYXBib3ggR0wgbWFwcyBpbnRvIHlvdXIgbmVvLm1qcyBhcHBcbiAqIFNlZTogaHR0cHM6Ly9kb2NzLm1hcGJveC5jb20vbWFwYm94LWdsLWpzL2FwaS9cbiAqIEluIGNhc2UgeW91IG5lZWQgbW9yZSBBUEkgbWV0aG9kcyB0byBnZXQgZXhwb3NlZCB0byB0aGUgQXBwIHdvcmtlcixcbiAqIHBsZWFzZSBvcGVuIGlzc3VlcyBpbnNpZGUgdGhlIHRyYWNrZXIgYW5kIC8gb3Igc3VibWl0IFBScy5cbiAqIEBjbGFzcyBOZW8ubWFpbi5hZGRvbi5NYXBib3hHTFxuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICogQHNpbmdsZXRvblxuICovXG5jbGFzcyBNYXBib3hHTCBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8ubWFpbi5hZGRvbi5NYXBib3hHTCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLm1haW4uYWRkb24uTWFwYm94R0wnLFxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcmVzIGFsbCBtYXAgZGF0YSBpbnNpZGUgYW4gb2JqZWN0IHVudGlsIG1vdW50aW5nLiBrZXkgPT4gbWFwIGlkXG4gICAgICAgICAqIE5vIGFycmF5IHNpbmNlIGluIGNhc2UgYSBtYXAgZ2V0cyBsb2FkZWQgbXVsdGlwbGUgdGltZXMsIHdlIG9ubHkgd2FudCB0byBhcHBseSB0aGUgbGFzdCBkYXRhIG9uIG1vdW50LlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IGRhdGFNYXA9e31cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgZGF0YU1hcDoge30sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGRvd25sb2FkUGF0aD0naHR0cHM6Ly9hcGkubWFwYm94LmNvbS9tYXBib3gtZ2wtanMvJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBkb3dubG9hZFBhdGg6ICdodHRwczovL2FwaS5tYXBib3guY29tL21hcGJveC1nbC1qcy8nLFxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcmVzIGFsbCBleHRyYSBtYXAgc291cmNlcyBsYXllcnMgYW4gb2JqZWN0LlxuICAgICAgICAgKiBrZXkgPT4gbWFwIGlkLCB2YWx1ZSA9PiB7QXJyYXl9IGxheWVyc1xuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IGxheWVycz17fVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBsYXllcnM6IHt9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcmVzIGFsbCBtYXAgaWRzIGluc2lkZSBhbiBvYmplY3RcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBtYXBzPXt9XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG1hcHM6IHt9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcmVzIGFsbCBtYXAgY29uZmlnIG9iamVjdHMgd2hpY2ggYXJyaXZlZCBiZWZvcmUgdGhlIG1hcCBsaWIgc2NyaXB0cyBnb3QgbG9hZGVkXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdFtdfSBtYXBzVG9DcmVhdGU9W11cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbWFwc1RvQ3JlYXRlOiBbXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHNjcmlwdHNMb2FkZWRfPXRydWVcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc2NyaXB0c0xvYWRlZF86IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc2luZ2xldG9uPXRydWVcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc2luZ2xldG9uOiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcmVzIGFsbCBtYXAgc291cmNlcyBpbnNpZGUgYW4gb2JqZWN0LlxuICAgICAgICAgKiBrZXkgPT4gbWFwIGlkLCB2YWx1ZSA9PiB7QXJyYXl9IHNvdXJjZXNcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBzb3VyY2VzPXt9XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHNvdXJjZXM6IHt9LFxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3RlIG1ldGhvZCBhY2Nlc3MgZm9yIG90aGVyIHdvcmtlcnNcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSByZW1vdGVcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3RlOiB7XG4gICAgICAgICAgICBhcHA6IFtcbiAgICAgICAgICAgICAgICAnYWRkTGF5ZXJzJyxcbiAgICAgICAgICAgICAgICAnYWRkU291cmNlcycsXG4gICAgICAgICAgICAgICAgJ2F1dG9SZXNpemUnLFxuICAgICAgICAgICAgICAgICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICdjcmVhdGUnLFxuICAgICAgICAgICAgICAgICdkZXN0cm95JyxcbiAgICAgICAgICAgICAgICAnc2V0RmlsdGVyJyxcbiAgICAgICAgICAgICAgICAnc2V0TGF5b3V0UHJvcGVydHknLFxuICAgICAgICAgICAgICAgICdzZXRQYWludFByb3BlcnR5JyxcbiAgICAgICAgICAgICAgICAnc2V0U3R5bGUnLFxuICAgICAgICAgICAgICAgICd1cGRhdGVEYXRhJyxcbiAgICAgICAgICAgICAgICAnem9vbSdcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JlcyBhbGwgbWFwIHN0eWxlIG9iamVjdHMgaW5zaWRlIGFuIG9iamVjdHMgdG8gcHJldmVudCByZWxvYWRzIHdoZW4gc3dpdGNoaW5nIHRoZW1lcyBtdWx0aXBsZSB0aW1lcy5cbiAgICAgICAgICoga2V5ID0+IHN0eWxlIG5hbWUgKHVybClcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBzdHlsZU1hcD17fVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBzdHlsZU1hcDoge30sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IHZlcnNpb249J3YxLjkuMSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgdmVyc2lvbjogJ3YxLjkuMScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9yZXMgYWxsIG1hcCB6b29tIHZhbHVlcyBpbnNpZGUgYW4gb2JqZWN0IHVudGlsIG1vdW50aW5nLiBrZXkgPT4gbWFwIGlkXG4gICAgICAgICAqIE5vIGFycmF5IHNpbmNlIGluIGNhc2UgYSBtYXAgZ2V0cyB6b29tZWQgbXVsdGlwbGUgdGltZXMsIHdlIG9ubHkgd2FudCB0byBhcHBseSB0aGUgbGFzdCB2YWx1ZSBvbiBtb3VudC5cbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSB6b29tTWFwPXt9XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHpvb21NYXA6IHt9XG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuICAgICAgICB0aGlzLmluc2VydE1hcGJveEdMU2NyaXB0cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IGRhdGEubGF5ZXJzXG4gICAgICovXG4gICAgYWRkTGF5ZXJzKGRhdGEpIHtcbiAgICAgICAgY29uc3QgbWUgID0gdGhpcyxcbiAgICAgICAgICAgICAgbWFwID0gbWUubWFwc1tkYXRhLmlkXTtcblxuICAgICAgICBsZXQgYmVmb3JlSWQ7XG5cbiAgICAgICAgaWYgKG1hcCkge1xuICAgICAgICAgICAgZGF0YS5sYXllcnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBiZWZvcmVJZCA9IGl0ZW0uYmVmb3JlSWQ7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGl0ZW0uYmVmb3JlSWQ7XG5cbiAgICAgICAgICAgICAgICBtYXAuYWRkTGF5ZXIoaXRlbSwgYmVmb3JlSWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZS5sYXllcnNbZGF0YS5pZF0gPSBPYmplY3QuYXNzaWduKG1lLmxheWVyc1tkYXRhLmlkXSB8fCB7fSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSBkYXRhLnNvdXJjZXNcbiAgICAgKi9cbiAgICBhZGRTb3VyY2VzKGRhdGEpIHtcbiAgICAgICAgY29uc3QgbWUgID0gdGhpcyxcbiAgICAgICAgICAgICAgbWFwID0gbWUubWFwc1tkYXRhLmlkXTtcblxuICAgICAgICBsZXQgaWQ7XG5cbiAgICAgICAgaWYgKG1hcCkge1xuICAgICAgICAgICAgZGF0YS5zb3VyY2VzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgaWQgPSBpdGVtLmlkO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBpdGVtLmlkO1xuXG4gICAgICAgICAgICAgICAgbWFwLmFkZFNvdXJjZShpZCwgaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lLnNvdXJjZXNbZGF0YS5pZF0gPSBPYmplY3QuYXNzaWduKG1lLnNvdXJjZXNbZGF0YS5pZF0gfHwge30sIGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBzY3JpcHRzTG9hZGVkIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0U2NyaXB0c0xvYWRlZCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBtZSA9IHRoaXM7XG5cbiAgICAgICAgICAgIG1lLm1hcHNUb0NyZWF0ZS5mb3JFYWNoKGNvbmZpZyA9PiB7XG4gICAgICAgICAgICAgICAgbWUuY3JlYXRlKGNvbmZpZyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWUubWFwc1RvQ3JlYXRlID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBtYXBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc3R5bGVKc29uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtuYW1lXVxuICAgICAqL1xuICAgIGFwcGx5U3R5bGVPYmplY3QobWFwLCBzdHlsZUpzb24sIG5hbWUpIHtcbiAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVNYXBbbmFtZV0gPSBzdHlsZUpzb247XG4gICAgICAgIH1cblxuICAgICAgICBzdHlsZUpzb24ubGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMobGF5ZXIucGFpbnQpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgICAgIG1hcC5zZXRQYWludFByb3BlcnR5KGxheWVyLmlkLCBrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VudGluZyBhIG1hcCBpbnRvIGFuIGluYWN0aXZlIHRhYiBhbmQgYWN0aXZhdGluZyBpdCBzaG91bGQgY2FsbCB0aGlzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqL1xuICAgIGF1dG9SZXNpemUoZGF0YSkge1xuICAgICAgICBjb25zdCBtYXAgPSB0aGlzLm1hcHNbZGF0YS5pZF07XG5cbiAgICAgICAgaWYgKG1hcCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbWFwLnJlc2l6ZSgpO1xuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtkYXRhLmFuaW1hdGU9ZmFsc2VdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZGF0YS5sYXRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZGF0YS5sbmdcbiAgICAgKi9cbiAgICBjZW50ZXIoZGF0YSkge1xuICAgICAgICBjb25zdCBtYXAgICAgPSB0aGlzLm1hcHNbZGF0YS5pZF0sXG4gICAgICAgICAgICAgIGNlbnRlciA9IHtsYXQ6IGRhdGEubGF0LCBsbmc6IGRhdGEubG5nfTtcblxuICAgICAgICBpZiAobWFwKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5hbmltYXRlKSB7XG4gICAgICAgICAgICAgICAgbWFwLmZseVRvKHtjZW50ZXI6IGNlbnRlcn0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtYXAuc2V0Q2VudGVyKGNlbnRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0b2RvXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgIGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gICBkYXRhLmFjY2Vzc1Rva2VuXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICAgZGF0YS5jZW50ZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gICBbZGF0YS5kYXRhXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgIFtkYXRhLmRhdGFTb3VyY2VJZF1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gICBkYXRhLmlkXG4gICAgICogQHBhcmFtIHtPYmplY3RbXX0gW2RhdGEubGF5ZXJzXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgIGRhdGEubWFwYm94U3R5bGVcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSBbZGF0YS5zb3VyY2VzXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgIGRhdGEuem9vbVxuICAgICAqL1xuICAgIGNyZWF0ZShkYXRhKSB7XG4gICAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAoIW1lLnNjcmlwdHNMb2FkZWQpIHtcbiAgICAgICAgICAgIG1lLm1hcHNUb0NyZWF0ZS5wdXNoKGRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWFwYm94Z2wuYWNjZXNzVG9rZW4gPSBkYXRhLmFjY2Vzc1Rva2VuO1xuXG4gICAgICAgICAgICBsZXQgem9vbSA9IGRhdGEuem9vbTtcblxuICAgICAgICAgICAgaWYgKG1lLnpvb21NYXBbZGF0YS5pZF0pIHtcbiAgICAgICAgICAgICAgICB6b29tID0gbWUuem9vbU1hcFtkYXRhLmlkXS56b29tO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBtZS56b29tTWFwW2RhdGEuaWRdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtZS5tYXBzW2RhdGEuaWRdID0gbmV3IG1hcGJveGdsLk1hcCh7XG4gICAgICAgICAgICAgICAgY2VudGVyICAgOiBkYXRhLmNlbnRlcixcbiAgICAgICAgICAgICAgICBjb250YWluZXI6IGRhdGEuaWQsXG4gICAgICAgICAgICAgICAgc3R5bGUgICAgOiBkYXRhLm1hcGJveFN0eWxlLFxuICAgICAgICAgICAgICAgIHpvb20gICAgIDogem9vbVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1lLm1hcHNbZGF0YS5pZF0ub24oJ2xvYWQnLCBtZS5vbk1hcExvYWRlZC5iaW5kKG1lLCBkYXRhKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKi9cbiAgICBkZXN0cm95KGRhdGEpIHtcbiAgICAgICAgdGhpcy5tYXBzW2RhdGEuaWRdLnJlbW92ZSgpO1xuICAgICAgICBkZWxldGUgdGhpcy5tYXBzW2RhdGEuaWRdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgaGFzTWFwKGlkKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMubWFwc1tpZF07XG4gICAgfVxuXG4gICAgaW5zZXJ0TWFwYm94R0xTY3JpcHRzKCkge1xuICAgICAgICBjb25zdCBtZSAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICAgIGJhc2VQYXRoID0gbWUuZG93bmxvYWRQYXRoICsgbWUudmVyc2lvbiArICcvJztcblxuICAgICAgICBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBEb21BY2Nlc3MubG9hZFNjcmlwdCggICAgYmFzZVBhdGggKyAnbWFwYm94LWdsLmpzJyksXG4gICAgICAgICAgICBEb21BY2Nlc3MubG9hZFN0eWxlc2hlZXQoYmFzZVBhdGggKyAnbWFwYm94LWdsLmNzcycpXG4gICAgICAgIF0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgbWUuc2NyaXB0c0xvYWRlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQudGFyZ2V0IG1hcCBpbnN0YW5jZVxuICAgICAqL1xuICAgIG9uTWFwTG9hZGVkKGRhdGEsIGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG1lICAgID0gdGhpcyxcbiAgICAgICAgICAgICAgbWFwSWQgPSBkYXRhLmlkO1xuXG4gICAgICAgIGlmIChkYXRhLnNvdXJjZXMpIHtcbiAgICAgICAgICAgIG1lLmFkZFNvdXJjZXMoe1xuICAgICAgICAgICAgICAgIGlkICAgICA6IGRhdGEuaWQsXG4gICAgICAgICAgICAgICAgc291cmNlczogZGF0YS5zb3VyY2VzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChtZS5zb3VyY2VzW21hcElkXSkge1xuICAgICAgICAgICAgbWUuYWRkU291cmNlcyhtZS5zb3VyY2VzW21hcElkXSk7XG4gICAgICAgICAgICBkZWxldGUgbWUuc291cmNlc1ttYXBJZF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YS5sYXllcnMpIHtcbiAgICAgICAgICAgIG1lLmFkZExheWVycyh7XG4gICAgICAgICAgICAgICAgaWQgICAgOiBkYXRhLmlkLFxuICAgICAgICAgICAgICAgIGxheWVyczogZGF0YS5sYXllcnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG1lLmxheWVyc1ttYXBJZF0pIHtcbiAgICAgICAgICAgIG1lLmFkZExheWVycyhtZS5sYXllcnNbbWFwSWRdKTtcbiAgICAgICAgICAgIGRlbGV0ZSBtZS5sYXllcnNbbWFwSWRdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWFwLmxvYWRlZCgpIGlzIGZhbHNlIGF0IHRoaXMgcG9pbnQsXG4gICAgICAgIC8vIGluIGNhc2Ugd2UgZG8gYWRkIGxheWVycyAvIHNvdXJjZXNcbiAgICAgICAgLy8gdGhlIFwiaWRsZVwiIGV2ZW50IHNlZW1zIHRvIGJlIHRoZSBiZXN0IGZpdFxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmxvYWRlZCgpKSB7XG4gICAgICAgICAgICBtZS5vbk1hcFJlYWxseUxvYWRlZChkYXRhLCBldmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudC50YXJnZXQub25jZSgnaWRsZScsIG1lLm9uTWFwUmVhbGx5TG9hZGVkLmJpbmQobWUsIGRhdGEpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQudGFyZ2V0IG1hcCBpbnN0YW5jZVxuICAgICAqL1xuICAgIG9uTWFwUmVhbGx5TG9hZGVkKGRhdGEsIGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmIChkYXRhLmRhdGEpIHtcbiAgICAgICAgICAgICAgICBtZS51cGRhdGVEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSAgICAgICAgOiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFTb3VyY2VJZDogZGF0YS5kYXRhU291cmNlSWQsXG4gICAgICAgICAgICAgICAgICAgIGlkICAgICAgICAgIDogZGF0YS5pZFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1lLmRhdGFNYXBbZGF0YS5pZF0pIHtcbiAgICAgICAgICAgICAgICBtZS51cGRhdGVEYXRhKG1lLmRhdGFNYXBbZGF0YS5pZF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGh0dHBzOi8vZG9jcy5tYXBib3guY29tL21hcGJveC1nbC1qcy9hcGkvI21hcCNzZXRmaWx0ZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEubGF5ZXJJZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhLm9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGRhdGEub3B0aW9ucy52YWxpZGF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGRhdGEudmFsdWVcbiAgICAgKi9cbiAgICBzZXRGaWx0ZXIoZGF0YSkge1xuICAgICAgICBjb25zdCBtYXAgPSB0aGlzLm1hcHNbZGF0YS5pZF07XG5cbiAgICAgICAgaWYgKG1hcCkge1xuICAgICAgICAgICAgbWFwLnNldEZpbHRlcihkYXRhLmxheWVySWQsIGRhdGEudmFsdWUsIGRhdGEub3B0aW9ucyB8fCB7fSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0b2RvOiB3ZSBjb3VsZCBjYWNoZSB0aGlzIGFuZCBhcHBseSBvbk1hcExvYWRlZFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaHR0cHM6Ly9kb2NzLm1hcGJveC5jb20vbWFwYm94LWdsLWpzL2FwaS8jbWFwI3NldGxheW91dHByb3BlcnR5XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmxheWVySWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5rZXlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YS5vcHRpb25zXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBkYXRhLm9wdGlvbnMudmFsaWRhdGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS52YWx1ZVxuICAgICAqL1xuICAgIHNldExheW91dFByb3BlcnR5KGRhdGEpIHtcbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy5tYXBzW2RhdGEuaWRdO1xuXG4gICAgICAgIGlmIChtYXApIHtcbiAgICAgICAgICAgIG1hcC5zZXRMYXlvdXRQcm9wZXJ0eShkYXRhLmxheWVySWQsIGRhdGEua2V5LCBkYXRhLnZhbHVlLCBkYXRhLm9wdGlvbnMgfHwge30pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdG9kbzogd2UgY291bGQgY2FjaGUgdGhpcyBhbmQgYXBwbHkgb25NYXBMb2FkZWRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGh0dHBzOi8vZG9jcy5tYXBib3guY29tL21hcGJveC1nbC1qcy9hcGkvI21hcCNzZXRwYWludHByb3BlcnR5XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmxheWVySWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5rZXlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YS5vcHRpb25zXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBkYXRhLm9wdGlvbnMudmFsaWRhdGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS52YWx1ZVxuICAgICAqL1xuICAgIHNldFBhaW50UHJvcGVydHkoZGF0YSkge1xuICAgICAgICBjb25zdCBtYXAgPSB0aGlzLm1hcHNbZGF0YS5pZF07XG5cbiAgICAgICAgaWYgKG1hcCkge1xuICAgICAgICAgICAgbWFwLnNldFBhaW50UHJvcGVydHkoZGF0YS5sYXllcklkLCBkYXRhLmtleSwgZGF0YS52YWx1ZSwgZGF0YS5vcHRpb25zIHx8IHt9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRvZG86IHdlIGNvdWxkIGNhY2hlIHRoaXMgYW5kIGFwcGx5IG9uTWFwTG9hZGVkXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuYWNjZXNzVG9rZW5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YS5zdHlsZVxuICAgICAqL1xuICAgIHNldFN0eWxlKGRhdGEpIHtcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmICghbWUuc2NyaXB0c0xvYWRlZCB8fCAhbWUuaGFzTWFwKGRhdGEuaWQpKSB7XG4gICAgICAgICAgICAvLyB0b2RvXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoTmVvLmlzU3RyaW5nKGRhdGEuc3R5bGUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuc3R5bGUuaW5kZXhPZignbWFwYm94Oi8vc3R5bGVzLycpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuc3R5bGUgPSBkYXRhLnN0eWxlLnN1YnN0cmluZygxNik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG1lLnN0eWxlTWFwW2RhdGEuc3R5bGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lLmFwcGx5U3R5bGVPYmplY3QobWUubWFwc1tkYXRhLmlkXSwgbWUuc3R5bGVNYXBbZGF0YS5zdHlsZV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZldGNoKGBodHRwczovL2FwaS5tYXBib3guY29tL3N0eWxlcy92MS8ke2RhdGEuc3R5bGV9P2FjY2Vzc190b2tlbj0ke2RhdGEuYWNjZXNzVG9rZW59YClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHN0eWxlSnNvbiA9PiBtZS5hcHBseVN0eWxlT2JqZWN0KG1lLm1hcHNbZGF0YS5pZF0sIHN0eWxlSnNvbiwgZGF0YS5zdHlsZSkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBtYXAuc2V0U3R5bGUgYnJlYWtzIHdpdGggb25seSBhIGNvbnNvbGUud2FybigpXG4gICAgICAgICAgICAvLyA9PiBjYXVzaW5nIGEgZnVsbCByZXBhaW50LCBsb3NpbmcgY3VzdG9tIHNvdXJjZXMgJiBsYXllcnNcbiAgICAgICAgICAgIC8vIG1hcC5zZXRTdHlsZShkYXRhLnN0eWxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YS5kYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuZGF0YVNvdXJjZUlkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKi9cbiAgICB1cGRhdGVEYXRhKGRhdGEpIHtcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmICghbWUuc2NyaXB0c0xvYWRlZCB8fCAhbWUuaGFzTWFwKGRhdGEuaWQpKSB7XG4gICAgICAgICAgICBtZS5kYXRhTWFwW2RhdGEuaWRdID0gZGF0YTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG1hcCAgICA9IG1lLm1hcHNbZGF0YS5pZF0sXG4gICAgICAgICAgICAgICAgICBzb3VyY2UgPSBtYXAuZ2V0U291cmNlKGRhdGEuZGF0YVNvdXJjZUlkKTtcblxuICAgICAgICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHNvdXJjZS5zZXREYXRhKGRhdGEuZGF0YSk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG1lLmRhdGFNYXBbZGF0YS5pZF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lLmRhdGFNYXBbZGF0YS5pZF0gPSBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGRhdGEuem9vbVxuICAgICAqL1xuICAgIHpvb20oZGF0YSkge1xuICAgICAgICBjb25zdCBtYXAgPSB0aGlzLm1hcHNbZGF0YS5pZF07XG5cbiAgICAgICAgaWYgKG1hcCkge1xuICAgICAgICAgICAgbWFwLnNldFpvb20oZGF0YS56b29tKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuem9vbU1hcFtkYXRhLmlkXSA9IGRhdGE7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKE1hcGJveEdMKTtcblxubGV0IGluc3RhbmNlID0gTmVvLmNyZWF0ZShNYXBib3hHTCk7XG5cbk5lby5hcHBseVRvR2xvYmFsTnMoaW5zdGFuY2UpO1xuXG5leHBvcnQgZGVmYXVsdCBpbnN0YW5jZTsiXSwic291cmNlUm9vdCI6IiJ9