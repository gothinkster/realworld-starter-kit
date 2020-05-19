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
         * @private
         */
        className: 'Neo.main.addon.AmCharts',
        /**
         * Stores all chart ids inside an object
         * @member {Object} charts={}
         * @private
         */
        charts: {},
        /**
         * Stores all chart config objects which arrived before the chart lib scripts got loaded
         * @member {Object[]} chartsToCreate=[]
         * @private
         */
        chartsToCreate: [],
        /**
         * Stores all chart data inside an object. key => chart id
         * No array since in case a chart gets loaded multiple times, we only want to apply the last data on mount.
         * @member {Object} dataMap={}
         * @private
         */
        dataMap: {},
        /**
         * @member {String} downloadPath='https//www.amcharts.com/lib/4/'
         * @private
         */
        downloadPath: 'https://www.amcharts.com/lib/4/',
        /**
         * @member {String} fallbackPath='https://neomjs.github.io/pages/resources/amCharts/'
         * @private
         */
        fallbackPath: 'https://neomjs.github.io/pages/resources/amCharts/',
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
         * Remote method access for other workers
         * @member {Object} remote={app: [//...]}
         * @private
         */
        remote: {
            app: [
                'callMethod',
                'create',
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
     * @private
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
     * @param {Object} data
     * @param {Boolean} data.combineSeriesTooltip
     * @param {Object} data.config
     * @param {String} data.id
     * @param {String} data.package
     * @param {String} data.type='XYChart'
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
            if (me.dataMap[data.id]) {
                me.updateData(me.dataMap[data.id]);
                delete me.dataMap[data.id];
            }
        }
    }

    /**
     *
     * @param {String} id
     * @return {Boolean}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9hZGRvbi9BbUNoYXJ0cy5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUE0QztBQUNIOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzREFBSTtBQUMzQix3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTyxTQUFTO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE1BQU07QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsTUFBTTs7QUFFekM7QUFDQSwyRUFBMkUsK0JBQStCO0FBQzFHLGlCQUFpQjs7QUFFakI7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLHNEQUFTO0FBQ2pCO0FBQ0EsZ0JBQWdCLHNEQUFTO0FBQ3pCLGdCQUFnQixzREFBUztBQUN6QixnQkFBZ0Isc0RBQVM7QUFDekI7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsUUFBUTtBQUN2QixlQUFlLE9BQU87QUFDdEIsZUFBZSxFQUFFO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFZSx1RUFBUSxFIiwiZmlsZSI6InNyYy9tYWluL2FkZG9uL0FtQ2hhcnRzLW1qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlICAgICAgZnJvbSAnLi4vLi4vY29yZS9CYXNlLm1qcyc7XG5pbXBvcnQgRG9tQWNjZXNzIGZyb20gJy4uL0RvbUFjY2Vzcy5tanMnO1xuXG4vKipcbiAqIEhlbHBlciBjbGFzcyB0byBpbmNsdWRlIGFtQ2hhcnRzIGludG8geW91ciBuZW8ubWpzIGFwcFxuICogaHR0cHM6Ly93d3cuYW1jaGFydHMuY29tL2RvY3MvdjQvXG4gKiBAY2xhc3MgTmVvLm1haW4uYWRkb24uQW1DaGFydHNcbiAqIEBleHRlbmRzIE5lby5jb3JlLkJhc2VcbiAqIEBzaW5nbGV0b25cbiAqL1xuY2xhc3MgQW1DaGFydHMgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLm1haW4uYWRkb24uQW1DaGFydHMnXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8ubWFpbi5hZGRvbi5BbUNoYXJ0cycsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9yZXMgYWxsIGNoYXJ0IGlkcyBpbnNpZGUgYW4gb2JqZWN0XG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gY2hhcnRzPXt9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBjaGFydHM6IHt9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcmVzIGFsbCBjaGFydCBjb25maWcgb2JqZWN0cyB3aGljaCBhcnJpdmVkIGJlZm9yZSB0aGUgY2hhcnQgbGliIHNjcmlwdHMgZ290IGxvYWRlZFxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3RbXX0gY2hhcnRzVG9DcmVhdGU9W11cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIGNoYXJ0c1RvQ3JlYXRlOiBbXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JlcyBhbGwgY2hhcnQgZGF0YSBpbnNpZGUgYW4gb2JqZWN0LiBrZXkgPT4gY2hhcnQgaWRcbiAgICAgICAgICogTm8gYXJyYXkgc2luY2UgaW4gY2FzZSBhIGNoYXJ0IGdldHMgbG9hZGVkIG11bHRpcGxlIHRpbWVzLCB3ZSBvbmx5IHdhbnQgdG8gYXBwbHkgdGhlIGxhc3QgZGF0YSBvbiBtb3VudC5cbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBkYXRhTWFwPXt9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBkYXRhTWFwOiB7fSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gZG93bmxvYWRQYXRoPSdodHRwcy8vd3d3LmFtY2hhcnRzLmNvbS9saWIvNC8nXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBkb3dubG9hZFBhdGg6ICdodHRwczovL3d3dy5hbWNoYXJ0cy5jb20vbGliLzQvJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gZmFsbGJhY2tQYXRoPSdodHRwczovL25lb21qcy5naXRodWIuaW8vcGFnZXMvcmVzb3VyY2VzL2FtQ2hhcnRzLydcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIGZhbGxiYWNrUGF0aDogJ2h0dHBzOi8vbmVvbWpzLmdpdGh1Yi5pby9wYWdlcy9yZXNvdXJjZXMvYW1DaGFydHMvJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHNjcmlwdHNMb2FkZWRfPXRydWVcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHNjcmlwdHNMb2FkZWRfOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHNpbmdsZXRvbj10cnVlXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBzaW5nbGV0b246IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdGUgbWV0aG9kIGFjY2VzcyBmb3Igb3RoZXIgd29ya2Vyc1xuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHJlbW90ZT17YXBwOiBbLy8uLi5dfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3RlOiB7XG4gICAgICAgICAgICBhcHA6IFtcbiAgICAgICAgICAgICAgICAnY2FsbE1ldGhvZCcsXG4gICAgICAgICAgICAgICAgJ2NyZWF0ZScsXG4gICAgICAgICAgICAgICAgJ3NldFByb3BlcnRpZXMnLFxuICAgICAgICAgICAgICAgICdzZXRQcm9wZXJ0eScsXG4gICAgICAgICAgICAgICAgJ3VwZGF0ZURhdGEnXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgdGhpcy5pbnNlcnRBbUNoYXJ0c1NjcmlwdHMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHNjcmlwdHNMb2FkZWQgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGFmdGVyU2V0U2NyaXB0c0xvYWRlZCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBtZSA9IHRoaXM7XG5cbiAgICAgICAgICAgIG1lLmNoYXJ0c1RvQ3JlYXRlLmZvckVhY2goY29uZmlnID0+IHtcbiAgICAgICAgICAgICAgICBtZS5jcmVhdGUoY29uZmlnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtZS5jaGFydHNUb0NyZWF0ZSA9IFtdO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyhtZS5kYXRhTWFwKS5mb3JFYWNoKChba2V5LCBkYXRhVmFsdWVdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1lLnVwZGF0ZURhdGEoZGF0YVZhbHVlKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG1lLmRhdGFNYXAgPSB7fTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEucGF0aFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFtkYXRhLnBhcmFtc11cbiAgICAgKi9cbiAgICBjYWxsTWV0aG9kKGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzQ2hhcnQoZGF0YS5pZCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoYXJ0ICAgICAgPSB0aGlzLmNoYXJ0c1tkYXRhLmlkXSxcbiAgICAgICAgICAgICAgICAgIHBhdGhBcnJheSAgPSBkYXRhLnBhdGguc3BsaXQoJy4nKSxcbiAgICAgICAgICAgICAgICAgIG1ldGhvZE5hbWUgPSBwYXRoQXJyYXkucG9wKCksXG4gICAgICAgICAgICAgICAgICBzY29wZSAgICAgID0gcGF0aEFycmF5Lmxlbmd0aCA8IDEgPyBjaGFydDogIE5lby5ucyhwYXRoQXJyYXkuam9pbignLicpLCBmYWxzZSwgY2hhcnQpO1xuXG4gICAgICAgICAgICBzY29wZVttZXRob2ROYW1lXS5jYWxsKHNjb3BlLCAuLi5kYXRhLnBhcmFtcyB8fCBbXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0b2RvXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjaGFydFxuICAgICAqL1xuICAgIGNvbWJpbmVTZXJpZXNUb29sdGlwKGNoYXJ0KSB7XG4gICAgICAgIGNoYXJ0LnNlcmllcy5lYWNoKHNlcmllcyA9PiB7XG4gICAgICAgICAgICBzZXJpZXMuYWRhcHRlci5hZGQoJ3Rvb2x0aXBUZXh0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gXCJbYm9sZF17ZGF0ZVh9Wy9dXFxuXCI7XG5cbiAgICAgICAgICAgICAgICBjaGFydC5zZXJpZXMuZWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBcIltcIiArIGl0ZW0uc3Ryb2tlICsgXCJd4pePWy9dIFwiICsgaXRlbS5uYW1lICsgXCI6IHtcIiArIGl0ZW0uZGF0YUZpZWxkcy52YWx1ZVkgKyBcIn1cXG5cIjtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGRhdGEuY29tYmluZVNlcmllc1Rvb2x0aXBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YS5jb25maWdcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLnBhY2thZ2VcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS50eXBlPSdYWUNoYXJ0J1xuICAgICAqL1xuICAgIGNyZWF0ZShkYXRhKSB7XG4gICAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAoIW1lLnNjcmlwdHNMb2FkZWQpIHtcbiAgICAgICAgICAgIG1lLmNoYXJ0c1RvQ3JlYXRlLnB1c2goZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0b2RvOiBjaGVjayBpZiBzZWxmW2RhdGEucGFja2FnZV0gZXhpc3RzLCBpZiBub3QgbG9hZCBpdCBhbmQgY2FsbCBjcmVhdGUgYWZ0ZXJ3YXJkc1xuXG4gICAgICAgICAgICBtZS5jaGFydHNbZGF0YS5pZF0gPSBhbTRjb3JlLmNyZWF0ZUZyb21Db25maWcoZGF0YS5jb25maWcsIGRhdGEuaWQsIHNlbGZbZGF0YS5wYWNrYWdlXVtkYXRhLnR5cGUgfHwgJ1hZQ2hhcnQnXSk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLmNvbWJpbmVTZXJpZXNUb29sdGlwKSB7XG4gICAgICAgICAgICAgICAgbWUuY29tYmluZVNlcmllc1Rvb2x0aXAobWUuY2hhcnRzW2RhdGEuaWRdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaW4gY2FzZSBkYXRhIGhhcyBhcnJpdmVkIGJlZm9yZSB0aGUgY2hhcnQgZ290IGNyZWF0ZWQsIGFwcGx5IGl0IG5vd1xuICAgICAgICAgICAgaWYgKG1lLmRhdGFNYXBbZGF0YS5pZF0pIHtcbiAgICAgICAgICAgICAgICBtZS51cGRhdGVEYXRhKG1lLmRhdGFNYXBbZGF0YS5pZF0pO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBtZS5kYXRhTWFwW2RhdGEuaWRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGhhc0NoYXJ0KGlkKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuY2hhcnRzW2lkXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBc3luYyBhcHByb2FjaFxuICAgICAqIGNvcmUuanMgaGFzIHRvIGFycml2ZSBmaXJzdCBvciB0aGUgb3RoZXIgc2NyaXB0cyB3aWxsIGNhdXNlIEpTIGVycm9ycyBzaW5jZSB0aGV5IHJlbHkgb24gaXRcbiAgICAgKiA9PiBmZXRjaGluZyB0aGUgb3RoZXIgZmlsZXMgYWZ0ZXIgY29yZS5qcyBpcyBsb2FkZWRcbiAgICAgKi9cbiAgICBpbnNlcnRBbUNoYXJ0c1NjcmlwdHModXNlRmFsbGJhY2s9ZmFsc2UpIHtcbiAgICAgICAgY29uc3QgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgICBiYXNlUGF0aCA9IHVzZUZhbGxiYWNrID8gbWUuZmFsbGJhY2tQYXRoIDogbWUuZG93bmxvYWRQYXRoO1xuXG4gICAgICAgIERvbUFjY2Vzcy5sb2FkU2NyaXB0KGJhc2VQYXRoICsgJ2NvcmUuanMnKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBEb21BY2Nlc3MubG9hZFNjcmlwdChiYXNlUGF0aCArICdjaGFydHMuanMnKSxcbiAgICAgICAgICAgICAgICBEb21BY2Nlc3MubG9hZFNjcmlwdChiYXNlUGF0aCArICdtYXBzLmpzJyksXG4gICAgICAgICAgICAgICAgRG9tQWNjZXNzLmxvYWRTY3JpcHQoYmFzZVBhdGggKyAnZ2VvZGF0YS93b3JsZExvdy5qcycpXG4gICAgICAgICAgICBdKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBtZS5zY3JpcHRzTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEb3dubG9hZCBmcm9tIGFtY2hhcnRzLmNvbSBmYWlsZWQsIHN3aXRjaGluZyB0byBmYWxsYmFjaycsIGUpO1xuICAgICAgICAgICAgbWUuaW5zZXJ0QW1DaGFydHNTY3JpcHRzKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YS5wcm9wZXJ0aWVzXG4gICAgICovXG4gICAgc2V0UHJvcGVydGllcyhkYXRhKSB7XG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGRhdGEucHJvcGVydGllcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFByb3BlcnR5KHtcbiAgICAgICAgICAgICAgICBpZCAgIDogZGF0YS5pZCxcbiAgICAgICAgICAgICAgICBwYXRoIDoga2V5LFxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbZGF0YS5pc0NvbG9yPWZhbHNlXSB0cnVlIHdpbGwgd3JhcCB0aGUgdmFsdWUgaW50byBhbTRjb3JlLmNvbG9yKClcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5wYXRoXG4gICAgICogQHBhcmFtIHsqfSBkYXRhLnZhbHVlXG4gICAgICovXG4gICAgc2V0UHJvcGVydHkoZGF0YSkge1xuICAgICAgICBpZiAodGhpcy5oYXNDaGFydChkYXRhLmlkKSkge1xuICAgICAgICAgICAgY29uc3QgY2hhcnQgICAgICAgID0gdGhpcy5jaGFydHNbZGF0YS5pZF0sXG4gICAgICAgICAgICAgICAgICBwYXRoQXJyYXkgICAgPSBkYXRhLnBhdGguc3BsaXQoJy4nKSxcbiAgICAgICAgICAgICAgICAgIHByb3BlcnR5TmFtZSA9IHBhdGhBcnJheS5wb3AoKSxcbiAgICAgICAgICAgICAgICAgIHNjb3BlICAgICAgICA9IE5lby5ucyhwYXRoQXJyYXkuam9pbignLicpLCBmYWxzZSwgY2hhcnQpO1xuXG4gICAgICAgICAgICBzY29wZVtwcm9wZXJ0eU5hbWVdID0gZGF0YS5pc0NvbG9yID8gYW00Y29yZS5jb2xvcihkYXRhLnZhbHVlKSA6IGRhdGEudmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0b2RvXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEuZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmRhdGFQYXRoXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKi9cbiAgICB1cGRhdGVEYXRhKGRhdGEpIHtcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmICghbWUuc2NyaXB0c0xvYWRlZCB8fCAhbWUuaGFzQ2hhcnQoZGF0YS5pZCkpIHtcbiAgICAgICAgICAgIG1lLmRhdGFNYXBbZGF0YS5pZF0gPSBkYXRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgY2hhcnQgPSBtZS5jaGFydHNbZGF0YS5pZF07XG5cbiAgICAgICAgICAgIGlmIChkYXRhLmRhdGFQYXRoID09PSAnJykge1xuICAgICAgICAgICAgICAgIGNoYXJ0LmRhdGEgPSBkYXRhLmRhdGE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIE5lby5ucyhkYXRhLmRhdGFQYXRoLCBmYWxzZSwgY2hhcnQpLmRhdGEgPSBkYXRhLmRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKEFtQ2hhcnRzKTtcblxubGV0IGluc3RhbmNlID0gTmVvLmNyZWF0ZShBbUNoYXJ0cyk7XG5cbk5lby5hcHBseVRvR2xvYmFsTnMoaW5zdGFuY2UpO1xuXG5leHBvcnQgZGVmYXVsdCBpbnN0YW5jZTsiXSwic291cmNlUm9vdCI6IiJ9