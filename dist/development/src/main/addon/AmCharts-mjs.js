(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src/main/addon/AmCharts-mjs"],{

/***/ "./node_modules/neo.mjs/src/main/addon/AmCharts.mjs":
/*!**********************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/addon/AmCharts.mjs ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");
/* harmony import */ var _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DomAccess.mjs */ "./node_modules/neo.mjs/src/main/DomAccess.mjs");



/**
 * Helper class to include amCharts into your neo.mjs app
 * https://www.amcharts.com/docs/v4/
 * @class Neo.main.addon.AmCharts
 * @extends Neo.core.Base
 * @singleton
 */
class AmCharts extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.addon.AmCharts'
         * @protected
         */
        className: 'Neo.main.addon.AmCharts',
        /**
         * Stores all chart ids inside an object
         * @member {Object} charts={}
         * @protected
         */
        charts: {},
        /**
         * Stores all chart config objects which arrived before the chart lib scripts got loaded
         * @member {Object[]} chartsToCreate=[]
         * @protected
         */
        chartsToCreate: [],
        /**
         * Stores all chart data inside an object. key => chart id
         * No array since in case a chart gets loaded multiple times, we only want to apply the last data on mount.
         * @member {Object} dataMap={}
         * @protected
         */
        dataMap: {},
        /**
         * @member {String} downloadPath='https//www.amcharts.com/lib/4/'
         * @protected
         */
        downloadPath: 'https://www.amcharts.com/lib/4/',
        /**
         * @member {String} fallbackPath='https://neomjs.github.io/pages/resources/amCharts/'
         * @protected
         */
        fallbackPath: 'https://neomjs.github.io/pages/resources/amCharts/',
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
         * Remote method access for other workers
         * @member {Object} remote={app: [//...]}
         * @protected
         */
        remote: {
            app: [
                'callMethod',
                'create',
                'destroy',
                'setProperties',
                'setProperty',
                'updateData'
            ]
        }
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        this.insertAmChartsScripts();
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

            me.chartsToCreate.forEach(config => {
                me.create(config);
            });

            me.chartsToCreate = [];

            setTimeout(() => {
                Object.entries(me.dataMap).forEach(([key, dataValue]) => {
                    me.updateData(dataValue);
                });

                me.dataMap = {};
            }, 1000);
        }
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.id
     * @param {String} data.path
     * @param {Array} [data.params]
     */
    callMethod(data) {
        if (this.hasChart(data.id)) {
            const chart      = this.charts[data.id],
                  pathArray  = data.path.split('.'),
                  methodName = pathArray.pop(),
                  scope      = pathArray.length < 1 ? chart:  Neo.ns(pathArray.join('.'), false, chart);

            scope[methodName].call(scope, ...data.params || []);
        } else {
            // todo
        }
    }

    /**
     *
     * @param {Object} chart
     */
    combineSeriesTooltip(chart) {
        chart.series.each(series => {
            series.adapter.add('tooltipText', () => {
                let text = "[bold]{dateX}[/]\n";

                chart.series.each(item => {
                    text += "[" + item.stroke + "]●[/] " + item.name + ": {" + item.dataFields.valueY + "}\n";
                });

                return text;
            });
        });
    }

    /**
     *
     * @param {Object}  data
     * @param {Boolean} data.combineSeriesTooltip
     * @param {Object}  data.config
     * @param {Array}   [data.data]
     * @param {String}  [data.dataPath]
     * @param {String}  data.id
     * @param {String}  data.package
     * @param {String}  data.type='XYChart'
     */
    create(data) {
        const me = this;

        if (!me.scriptsLoaded) {
            me.chartsToCreate.push(data);
        } else {
            // todo: check if self[data.package] exists, if not load it and call create afterwards

            me.charts[data.id] = am4core.createFromConfig(data.config, data.id, self[data.package][data.type || 'XYChart']);

            if (data.combineSeriesTooltip) {
                me.combineSeriesTooltip(me.charts[data.id]);
            }

            // in case data has arrived before the chart got created, apply it now
            if (data.data) {
                me.updateData({
                    data    : data.data,
                    dataPath: data.dataPath,
                    id      : data.id
                });
            } else if (me.dataMap[data.id]) {
                me.updateData(me.dataMap[data.id]);
                delete me.dataMap[data.id];
            }
        }
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.id
     */
    destroy(data) {
        this.charts[data.id].dispose();
        delete this.charts[data.id];
    }

    /**
     *
     * @param {String} id
     * @returns {Boolean}
     */
    hasChart(id) {
        return !!this.charts[id];
    }

    /**
     * Async approach
     * core.js has to arrive first or the other scripts will cause JS errors since they rely on it
     * => fetching the other files after core.js is loaded
     */
    insertAmChartsScripts(useFallback=false) {
        const me       = this,
              basePath = useFallback ? me.fallbackPath : me.downloadPath;

        _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].loadScript(basePath + 'core.js').then(() => {
            Promise.all([
                _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].loadScript(basePath + 'charts.js'),
                _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].loadScript(basePath + 'maps.js'),
                _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].loadScript(basePath + 'geodata/worldLow.js')
            ]).then(() => {
                me.scriptsLoaded = true;
            });
        }).catch(e => {
            console.log('Download from amcharts.com failed, switching to fallback', e);
            me.insertAmChartsScripts(true);
        });
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.id
     * @param {Object} data.properties
     */
    setProperties(data) {
        Object.entries(data.properties).forEach(([key, value]) => {
            this.setProperty({
                id   : data.id,
                path : key,
                value: value
            })
        });
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.id
     * @param {Boolean} [data.isColor=false] true will wrap the value into am4core.color()
     * @param {String} data.path
     * @param {*} data.value
     */
    setProperty(data) {
        if (this.hasChart(data.id)) {
            const chart        = this.charts[data.id],
                  pathArray    = data.path.split('.'),
                  propertyName = pathArray.pop(),
                  scope        = Neo.ns(pathArray.join('.'), false, chart);

            scope[propertyName] = data.isColor ? am4core.color(data.value) : data.value;
        } else {
            // todo
        }
    }

    /**
     *
     * @param {Object} data
     * @param {Object} data.data
     * @param {String} data.dataPath
     * @param {String} data.id
     */
    updateData(data) {
        const me = this;

        if (!me.scriptsLoaded || !me.hasChart(data.id)) {
            me.dataMap[data.id] = data;
        } else {
            const chart = me.charts[data.id];

            if (data.dataPath === '') {
                chart.data = data.data;
            } else {
                Neo.ns(data.dataPath, false, chart).data = data.data;
            }
        }
    }
}

Neo.applyClassConfig(AmCharts);

let instance = Neo.create(AmCharts);

Neo.applyToGlobalNs(instance);

/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9hZGRvbi9BbUNoYXJ0cy5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUE0QztBQUNIOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzREFBSTtBQUMzQix3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTyxTQUFTO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsTUFBTTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxNQUFNOztBQUV6QztBQUNBLDJFQUEyRSwrQkFBK0I7QUFDMUcsaUJBQWlCOztBQUVqQjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLFFBQVE7QUFDdkIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsTUFBTTtBQUNyQixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxzREFBUztBQUNqQjtBQUNBLGdCQUFnQixzREFBUztBQUN6QixnQkFBZ0Isc0RBQVM7QUFDekIsZ0JBQWdCLHNEQUFTO0FBQ3pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLFFBQVE7QUFDdkIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsRUFBRTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRWUsdUVBQVEsRSIsImZpbGUiOiJzcmMvbWFpbi9hZGRvbi9BbUNoYXJ0cy1tanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSAgICAgIGZyb20gJy4uLy4uL2NvcmUvQmFzZS5tanMnO1xuaW1wb3J0IERvbUFjY2VzcyBmcm9tICcuLi9Eb21BY2Nlc3MubWpzJztcblxuLyoqXG4gKiBIZWxwZXIgY2xhc3MgdG8gaW5jbHVkZSBhbUNoYXJ0cyBpbnRvIHlvdXIgbmVvLm1qcyBhcHBcbiAqIGh0dHBzOi8vd3d3LmFtY2hhcnRzLmNvbS9kb2NzL3Y0L1xuICogQGNsYXNzIE5lby5tYWluLmFkZG9uLkFtQ2hhcnRzXG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKiBAc2luZ2xldG9uXG4gKi9cbmNsYXNzIEFtQ2hhcnRzIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5tYWluLmFkZG9uLkFtQ2hhcnRzJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8ubWFpbi5hZGRvbi5BbUNoYXJ0cycsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9yZXMgYWxsIGNoYXJ0IGlkcyBpbnNpZGUgYW4gb2JqZWN0XG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gY2hhcnRzPXt9XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNoYXJ0czoge30sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9yZXMgYWxsIGNoYXJ0IGNvbmZpZyBvYmplY3RzIHdoaWNoIGFycml2ZWQgYmVmb3JlIHRoZSBjaGFydCBsaWIgc2NyaXB0cyBnb3QgbG9hZGVkXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdFtdfSBjaGFydHNUb0NyZWF0ZT1bXVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjaGFydHNUb0NyZWF0ZTogW10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9yZXMgYWxsIGNoYXJ0IGRhdGEgaW5zaWRlIGFuIG9iamVjdC4ga2V5ID0+IGNoYXJ0IGlkXG4gICAgICAgICAqIE5vIGFycmF5IHNpbmNlIGluIGNhc2UgYSBjaGFydCBnZXRzIGxvYWRlZCBtdWx0aXBsZSB0aW1lcywgd2Ugb25seSB3YW50IHRvIGFwcGx5IHRoZSBsYXN0IGRhdGEgb24gbW91bnQuXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gZGF0YU1hcD17fVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBkYXRhTWFwOiB7fSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gZG93bmxvYWRQYXRoPSdodHRwcy8vd3d3LmFtY2hhcnRzLmNvbS9saWIvNC8nXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGRvd25sb2FkUGF0aDogJ2h0dHBzOi8vd3d3LmFtY2hhcnRzLmNvbS9saWIvNC8nLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBmYWxsYmFja1BhdGg9J2h0dHBzOi8vbmVvbWpzLmdpdGh1Yi5pby9wYWdlcy9yZXNvdXJjZXMvYW1DaGFydHMvJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBmYWxsYmFja1BhdGg6ICdodHRwczovL25lb21qcy5naXRodWIuaW8vcGFnZXMvcmVzb3VyY2VzL2FtQ2hhcnRzLycsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBzY3JpcHRzTG9hZGVkXz10cnVlXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHNjcmlwdHNMb2FkZWRfOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHNpbmdsZXRvbj10cnVlXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHNpbmdsZXRvbjogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW90ZSBtZXRob2QgYWNjZXNzIGZvciBvdGhlciB3b3JrZXJzXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gcmVtb3RlPXthcHA6IFsvLy4uLl19XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHJlbW90ZToge1xuICAgICAgICAgICAgYXBwOiBbXG4gICAgICAgICAgICAgICAgJ2NhbGxNZXRob2QnLFxuICAgICAgICAgICAgICAgICdjcmVhdGUnLFxuICAgICAgICAgICAgICAgICdkZXN0cm95JyxcbiAgICAgICAgICAgICAgICAnc2V0UHJvcGVydGllcycsXG4gICAgICAgICAgICAgICAgJ3NldFByb3BlcnR5JyxcbiAgICAgICAgICAgICAgICAndXBkYXRlRGF0YSdcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICB0aGlzLmluc2VydEFtQ2hhcnRzU2NyaXB0cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgc2NyaXB0c0xvYWRlZCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFNjcmlwdHNMb2FkZWQodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICAgICAgICBtZS5jaGFydHNUb0NyZWF0ZS5mb3JFYWNoKGNvbmZpZyA9PiB7XG4gICAgICAgICAgICAgICAgbWUuY3JlYXRlKGNvbmZpZyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWUuY2hhcnRzVG9DcmVhdGUgPSBbXTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMobWUuZGF0YU1hcCkuZm9yRWFjaCgoW2tleSwgZGF0YVZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBtZS51cGRhdGVEYXRhKGRhdGFWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBtZS5kYXRhTWFwID0ge307XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLnBhdGhcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBbZGF0YS5wYXJhbXNdXG4gICAgICovXG4gICAgY2FsbE1ldGhvZChkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc0NoYXJ0KGRhdGEuaWQpKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFydCAgICAgID0gdGhpcy5jaGFydHNbZGF0YS5pZF0sXG4gICAgICAgICAgICAgICAgICBwYXRoQXJyYXkgID0gZGF0YS5wYXRoLnNwbGl0KCcuJyksXG4gICAgICAgICAgICAgICAgICBtZXRob2ROYW1lID0gcGF0aEFycmF5LnBvcCgpLFxuICAgICAgICAgICAgICAgICAgc2NvcGUgICAgICA9IHBhdGhBcnJheS5sZW5ndGggPCAxID8gY2hhcnQ6ICBOZW8ubnMocGF0aEFycmF5LmpvaW4oJy4nKSwgZmFsc2UsIGNoYXJ0KTtcblxuICAgICAgICAgICAgc2NvcGVbbWV0aG9kTmFtZV0uY2FsbChzY29wZSwgLi4uZGF0YS5wYXJhbXMgfHwgW10pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdG9kb1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY2hhcnRcbiAgICAgKi9cbiAgICBjb21iaW5lU2VyaWVzVG9vbHRpcChjaGFydCkge1xuICAgICAgICBjaGFydC5zZXJpZXMuZWFjaChzZXJpZXMgPT4ge1xuICAgICAgICAgICAgc2VyaWVzLmFkYXB0ZXIuYWRkKCd0b29sdGlwVGV4dCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdGV4dCA9IFwiW2JvbGRde2RhdGVYfVsvXVxcblwiO1xuXG4gICAgICAgICAgICAgICAgY2hhcnQuc2VyaWVzLmVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgKz0gXCJbXCIgKyBpdGVtLnN0cm9rZSArIFwiXeKXj1svXSBcIiArIGl0ZW0ubmFtZSArIFwiOiB7XCIgKyBpdGVtLmRhdGFGaWVsZHMudmFsdWVZICsgXCJ9XFxuXCI7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgZGF0YVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZGF0YS5jb21iaW5lU2VyaWVzVG9vbHRpcFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgZGF0YS5jb25maWdcbiAgICAgKiBAcGFyYW0ge0FycmF5fSAgIFtkYXRhLmRhdGFdXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICBbZGF0YS5kYXRhUGF0aF1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gIGRhdGEuaWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gIGRhdGEucGFja2FnZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgZGF0YS50eXBlPSdYWUNoYXJ0J1xuICAgICAqL1xuICAgIGNyZWF0ZShkYXRhKSB7XG4gICAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAoIW1lLnNjcmlwdHNMb2FkZWQpIHtcbiAgICAgICAgICAgIG1lLmNoYXJ0c1RvQ3JlYXRlLnB1c2goZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0b2RvOiBjaGVjayBpZiBzZWxmW2RhdGEucGFja2FnZV0gZXhpc3RzLCBpZiBub3QgbG9hZCBpdCBhbmQgY2FsbCBjcmVhdGUgYWZ0ZXJ3YXJkc1xuXG4gICAgICAgICAgICBtZS5jaGFydHNbZGF0YS5pZF0gPSBhbTRjb3JlLmNyZWF0ZUZyb21Db25maWcoZGF0YS5jb25maWcsIGRhdGEuaWQsIHNlbGZbZGF0YS5wYWNrYWdlXVtkYXRhLnR5cGUgfHwgJ1hZQ2hhcnQnXSk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLmNvbWJpbmVTZXJpZXNUb29sdGlwKSB7XG4gICAgICAgICAgICAgICAgbWUuY29tYmluZVNlcmllc1Rvb2x0aXAobWUuY2hhcnRzW2RhdGEuaWRdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaW4gY2FzZSBkYXRhIGhhcyBhcnJpdmVkIGJlZm9yZSB0aGUgY2hhcnQgZ290IGNyZWF0ZWQsIGFwcGx5IGl0IG5vd1xuICAgICAgICAgICAgaWYgKGRhdGEuZGF0YSkge1xuICAgICAgICAgICAgICAgIG1lLnVwZGF0ZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhICAgIDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgICAgICBkYXRhUGF0aDogZGF0YS5kYXRhUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgaWQgICAgICA6IGRhdGEuaWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWUuZGF0YU1hcFtkYXRhLmlkXSkge1xuICAgICAgICAgICAgICAgIG1lLnVwZGF0ZURhdGEobWUuZGF0YU1hcFtkYXRhLmlkXSk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG1lLmRhdGFNYXBbZGF0YS5pZF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKi9cbiAgICBkZXN0cm95KGRhdGEpIHtcbiAgICAgICAgdGhpcy5jaGFydHNbZGF0YS5pZF0uZGlzcG9zZSgpO1xuICAgICAgICBkZWxldGUgdGhpcy5jaGFydHNbZGF0YS5pZF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBoYXNDaGFydChpZCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLmNoYXJ0c1tpZF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXN5bmMgYXBwcm9hY2hcbiAgICAgKiBjb3JlLmpzIGhhcyB0byBhcnJpdmUgZmlyc3Qgb3IgdGhlIG90aGVyIHNjcmlwdHMgd2lsbCBjYXVzZSBKUyBlcnJvcnMgc2luY2UgdGhleSByZWx5IG9uIGl0XG4gICAgICogPT4gZmV0Y2hpbmcgdGhlIG90aGVyIGZpbGVzIGFmdGVyIGNvcmUuanMgaXMgbG9hZGVkXG4gICAgICovXG4gICAgaW5zZXJ0QW1DaGFydHNTY3JpcHRzKHVzZUZhbGxiYWNrPWZhbHNlKSB7XG4gICAgICAgIGNvbnN0IG1lICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgICAgYmFzZVBhdGggPSB1c2VGYWxsYmFjayA/IG1lLmZhbGxiYWNrUGF0aCA6IG1lLmRvd25sb2FkUGF0aDtcblxuICAgICAgICBEb21BY2Nlc3MubG9hZFNjcmlwdChiYXNlUGF0aCArICdjb3JlLmpzJykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgRG9tQWNjZXNzLmxvYWRTY3JpcHQoYmFzZVBhdGggKyAnY2hhcnRzLmpzJyksXG4gICAgICAgICAgICAgICAgRG9tQWNjZXNzLmxvYWRTY3JpcHQoYmFzZVBhdGggKyAnbWFwcy5qcycpLFxuICAgICAgICAgICAgICAgIERvbUFjY2Vzcy5sb2FkU2NyaXB0KGJhc2VQYXRoICsgJ2dlb2RhdGEvd29ybGRMb3cuanMnKVxuICAgICAgICAgICAgXSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgbWUuc2NyaXB0c0xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRG93bmxvYWQgZnJvbSBhbWNoYXJ0cy5jb20gZmFpbGVkLCBzd2l0Y2hpbmcgdG8gZmFsbGJhY2snLCBlKTtcbiAgICAgICAgICAgIG1lLmluc2VydEFtQ2hhcnRzU2NyaXB0cyh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEucHJvcGVydGllc1xuICAgICAqL1xuICAgIHNldFByb3BlcnRpZXMoZGF0YSkge1xuICAgICAgICBPYmplY3QuZW50cmllcyhkYXRhLnByb3BlcnRpZXMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRQcm9wZXJ0eSh7XG4gICAgICAgICAgICAgICAgaWQgICA6IGRhdGEuaWQsXG4gICAgICAgICAgICAgICAgcGF0aCA6IGtleSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2RhdGEuaXNDb2xvcj1mYWxzZV0gdHJ1ZSB3aWxsIHdyYXAgdGhlIHZhbHVlIGludG8gYW00Y29yZS5jb2xvcigpXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEucGF0aFxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YS52YWx1ZVxuICAgICAqL1xuICAgIHNldFByb3BlcnR5KGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzQ2hhcnQoZGF0YS5pZCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoYXJ0ICAgICAgICA9IHRoaXMuY2hhcnRzW2RhdGEuaWRdLFxuICAgICAgICAgICAgICAgICAgcGF0aEFycmF5ICAgID0gZGF0YS5wYXRoLnNwbGl0KCcuJyksXG4gICAgICAgICAgICAgICAgICBwcm9wZXJ0eU5hbWUgPSBwYXRoQXJyYXkucG9wKCksXG4gICAgICAgICAgICAgICAgICBzY29wZSAgICAgICAgPSBOZW8ubnMocGF0aEFycmF5LmpvaW4oJy4nKSwgZmFsc2UsIGNoYXJ0KTtcblxuICAgICAgICAgICAgc2NvcGVbcHJvcGVydHlOYW1lXSA9IGRhdGEuaXNDb2xvciA/IGFtNGNvcmUuY29sb3IoZGF0YS52YWx1ZSkgOiBkYXRhLnZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdG9kb1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhLmRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5kYXRhUGF0aFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICovXG4gICAgdXBkYXRlRGF0YShkYXRhKSB7XG4gICAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAoIW1lLnNjcmlwdHNMb2FkZWQgfHwgIW1lLmhhc0NoYXJ0KGRhdGEuaWQpKSB7XG4gICAgICAgICAgICBtZS5kYXRhTWFwW2RhdGEuaWRdID0gZGF0YTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGNoYXJ0ID0gbWUuY2hhcnRzW2RhdGEuaWRdO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5kYXRhUGF0aCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICBjaGFydC5kYXRhID0gZGF0YS5kYXRhO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBOZW8ubnMoZGF0YS5kYXRhUGF0aCwgZmFsc2UsIGNoYXJ0KS5kYXRhID0gZGF0YS5kYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhBbUNoYXJ0cyk7XG5cbmxldCBpbnN0YW5jZSA9IE5lby5jcmVhdGUoQW1DaGFydHMpO1xuXG5OZW8uYXBwbHlUb0dsb2JhbE5zKGluc3RhbmNlKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7Il0sInNvdXJjZVJvb3QiOiIifQ==