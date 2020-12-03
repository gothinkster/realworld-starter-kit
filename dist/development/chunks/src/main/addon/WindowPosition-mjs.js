(self["webpackChunkneo_mjs_realworld_example_app"] = self["webpackChunkneo_mjs_realworld_example_app"] || []).push([["src/main/addon/WindowPosition-mjs"],{

/***/ "./node_modules/neo.mjs/src/main/addon/WindowPosition.mjs":
/*!****************************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/addon/WindowPosition.mjs ***!
  \****************************************************************/
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


/**
 *
 * @class Neo.main.addon.WindowPosition
 * @extends Neo.core.Base
 * @singleton
 */
class WindowPosition extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.addon.WindowPosition'
         * @protected
         */
        className: 'Neo.main.addon.WindowPosition',
        /**
         * @member {String|null} intervalId=null
         */
        intervalId: null,
        /**
         * @member {Number} intervalTime=100
         */
        intervalTime: 20,
        /**
         * Remote method access for other workers
         * @member {Object} remote
         * @protected
         */
        remote: {
            app: [
                'registerWindow',
                'unregisterWindow'
            ]
        },
        /**
         * @member {Number|null} screenLeft=null
         */
        screenLeft: null,
        /**
         * @member {Number|null} screenTop=null
         */
        screenTop: null,
        /**
         * @member {Boolean} singleton=true
         * @protected
         */
        singleton: true,
        /**
         * @member {Object} windows={}
         * @protected
         */
        windows: {}
    }}

    /**
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me  = this,
            win = window;

        me.screenLeft = win.screenLeft;
        me.screenTop  = win.screenTop;

        win.addEventListener('mouseout', me.onMouseOut.bind(me));
        win.addEventListener('resize',   me.onResize.bind(me));
    }

    /**
     *
     * @param {Object} data
     */
    adjustPositions(data) {
        let me = this,
            left, top;

        Object.entries(me.windows).forEach(([key, value]) => {
            switch (value.dock) {
                case 'bottom':
                    left = data.screenLeft;
                    top  = data.outerHeight  + data.screenTop - 50;
                    break;
                case 'left':
                    left = data.screenLeft - value.size;
                    top  = data.screenTop  + 28;
                    break;
                case 'right':
                    left = data.outerWidth + data.screenLeft;
                    top  = data.screenTop  + 28;
                    break;
                case 'top':
                    left = data.screenLeft;
                    top  = data.screenTop - value.size;
                    break;
            }

            Neo.Main.windowMoveTo({
                windowName: key,
                x         : left,
                y         : top
            });
        });
    }

    /**
     *
     */
    checkMovement() {
        let me         = this,
            Manager    = Neo.worker.Manager,
            win        = window,
            screenLeft = win.screenLeft,
            screenTop  = win.screenTop,
            winData;

        if (me.screenLeft !== screenLeft || me.screenTop !== screenTop) {
            winData = Neo.Main.getWindowData();

            me.adjustPositions(winData);

            Manager.sendMessage('app', {
                action: 'windowPositionChange',
                data  : {
                    appName: Manager.appName,
                    ...winData
                }
            });

            me.screenLeft = screenLeft;
            me.screenTop  = screenTop;
        }
    }

    /**
     *
     * @param {MouseEvent} event
     */
    onMouseOut(event) {
        let me = this;

        if (!event.toElement) {
            if (!me.intervalId) {
                me.intervalId = setInterval(me.checkMovement.bind(me), me.intervalTime);
            }
        } else if (me.intervalId) {
            clearInterval(me.intervalId);
            me.intervalId = null;
        }
    }

    /**
     *
     * @param {Object} event
     */
    onResize(event) {
        let me      = this,
            winData = Neo.Main.getWindowData(),
            height, width;

        Object.entries(me.windows).forEach(([key, value]) => {
            switch (value.dock) {
                case 'bottom':
                case 'top':
                    width = winData.outerWidth;
                    break;
                case 'left':
                case 'right':
                    height = winData.outerHeight - 28;
                    break;
            }

            Neo.Main.windowResizeTo({
                height    : height,
                width     : width,
                windowName: key
            });
        });

        me.adjustPositions(winData);
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.dock
     * @param {String} data.name
     * @param {Number} data.size
     */
    registerWindow(data) {
        this.windows[data.name] = data;
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.name
     */
    unregisterWindow(data) {
        delete this.windows[data.name];
    }
}

Neo.applyClassConfig(WindowPosition);

let instance = Neo.create(WindowPosition);

Neo.applyToGlobalNs(instance);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (instance);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9tYWluL2FkZG9uL1dpbmRvd1Bvc2l0aW9uLm1qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBdUM7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixtREFBSTtBQUNqQyx3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxXQUFXO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLGlFQUFlLFFBQVEsRSIsImZpbGUiOiJjaHVua3Mvc3JjL21haW4vYWRkb24vV2luZG93UG9zaXRpb24tbWpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2UgZnJvbSAnLi4vLi4vY29yZS9CYXNlLm1qcyc7XG5cbi8qKlxuICpcbiAqIEBjbGFzcyBOZW8ubWFpbi5hZGRvbi5XaW5kb3dQb3NpdGlvblxuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICogQHNpbmdsZXRvblxuICovXG5jbGFzcyBXaW5kb3dQb3NpdGlvbiBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8ubWFpbi5hZGRvbi5XaW5kb3dQb3NpdGlvbidcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLm1haW4uYWRkb24uV2luZG93UG9zaXRpb24nLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IGludGVydmFsSWQ9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgaW50ZXJ2YWxJZDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gaW50ZXJ2YWxUaW1lPTEwMFxuICAgICAgICAgKi9cbiAgICAgICAgaW50ZXJ2YWxUaW1lOiAyMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW90ZSBtZXRob2QgYWNjZXNzIGZvciBvdGhlciB3b3JrZXJzXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gcmVtb3RlXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHJlbW90ZToge1xuICAgICAgICAgICAgYXBwOiBbXG4gICAgICAgICAgICAgICAgJ3JlZ2lzdGVyV2luZG93JyxcbiAgICAgICAgICAgICAgICAndW5yZWdpc3RlcldpbmRvdydcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcnxudWxsfSBzY3JlZW5MZWZ0PW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHNjcmVlbkxlZnQ6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8bnVsbH0gc2NyZWVuVG9wPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHNjcmVlblRvcDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHNpbmdsZXRvbj10cnVlXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHNpbmdsZXRvbjogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gd2luZG93cz17fVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICB3aW5kb3dzOiB7fVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lICA9IHRoaXMsXG4gICAgICAgICAgICB3aW4gPSB3aW5kb3c7XG5cbiAgICAgICAgbWUuc2NyZWVuTGVmdCA9IHdpbi5zY3JlZW5MZWZ0O1xuICAgICAgICBtZS5zY3JlZW5Ub3AgID0gd2luLnNjcmVlblRvcDtcblxuICAgICAgICB3aW4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBtZS5vbk1vdXNlT3V0LmJpbmQobWUpKTtcbiAgICAgICAgd2luLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICAgbWUub25SZXNpemUuYmluZChtZSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBhZGp1c3RQb3NpdGlvbnMoZGF0YSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzLFxuICAgICAgICAgICAgbGVmdCwgdG9wO1xuXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKG1lLndpbmRvd3MpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoICh2YWx1ZS5kb2NrKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGRhdGEuc2NyZWVuTGVmdDtcbiAgICAgICAgICAgICAgICAgICAgdG9wICA9IGRhdGEub3V0ZXJIZWlnaHQgICsgZGF0YS5zY3JlZW5Ub3AgLSA1MDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSBkYXRhLnNjcmVlbkxlZnQgLSB2YWx1ZS5zaXplO1xuICAgICAgICAgICAgICAgICAgICB0b3AgID0gZGF0YS5zY3JlZW5Ub3AgICsgMjg7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGRhdGEub3V0ZXJXaWR0aCArIGRhdGEuc2NyZWVuTGVmdDtcbiAgICAgICAgICAgICAgICAgICAgdG9wICA9IGRhdGEuc2NyZWVuVG9wICArIDI4O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gZGF0YS5zY3JlZW5MZWZ0O1xuICAgICAgICAgICAgICAgICAgICB0b3AgID0gZGF0YS5zY3JlZW5Ub3AgLSB2YWx1ZS5zaXplO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTmVvLk1haW4ud2luZG93TW92ZVRvKHtcbiAgICAgICAgICAgICAgICB3aW5kb3dOYW1lOiBrZXksXG4gICAgICAgICAgICAgICAgeCAgICAgICAgIDogbGVmdCxcbiAgICAgICAgICAgICAgICB5ICAgICAgICAgOiB0b3BcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGNoZWNrTW92ZW1lbnQoKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIE1hbmFnZXIgICAgPSBOZW8ud29ya2VyLk1hbmFnZXIsXG4gICAgICAgICAgICB3aW4gICAgICAgID0gd2luZG93LFxuICAgICAgICAgICAgc2NyZWVuTGVmdCA9IHdpbi5zY3JlZW5MZWZ0LFxuICAgICAgICAgICAgc2NyZWVuVG9wICA9IHdpbi5zY3JlZW5Ub3AsXG4gICAgICAgICAgICB3aW5EYXRhO1xuXG4gICAgICAgIGlmIChtZS5zY3JlZW5MZWZ0ICE9PSBzY3JlZW5MZWZ0IHx8IG1lLnNjcmVlblRvcCAhPT0gc2NyZWVuVG9wKSB7XG4gICAgICAgICAgICB3aW5EYXRhID0gTmVvLk1haW4uZ2V0V2luZG93RGF0YSgpO1xuXG4gICAgICAgICAgICBtZS5hZGp1c3RQb3NpdGlvbnMod2luRGF0YSk7XG5cbiAgICAgICAgICAgIE1hbmFnZXIuc2VuZE1lc3NhZ2UoJ2FwcCcsIHtcbiAgICAgICAgICAgICAgICBhY3Rpb246ICd3aW5kb3dQb3NpdGlvbkNoYW5nZScsXG4gICAgICAgICAgICAgICAgZGF0YSAgOiB7XG4gICAgICAgICAgICAgICAgICAgIGFwcE5hbWU6IE1hbmFnZXIuYXBwTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgLi4ud2luRGF0YVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtZS5zY3JlZW5MZWZ0ID0gc2NyZWVuTGVmdDtcbiAgICAgICAgICAgIG1lLnNjcmVlblRvcCAgPSBzY3JlZW5Ub3A7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnRcbiAgICAgKi9cbiAgICBvbk1vdXNlT3V0KGV2ZW50KSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCFldmVudC50b0VsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmICghbWUuaW50ZXJ2YWxJZCkge1xuICAgICAgICAgICAgICAgIG1lLmludGVydmFsSWQgPSBzZXRJbnRlcnZhbChtZS5jaGVja01vdmVtZW50LmJpbmQobWUpLCBtZS5pbnRlcnZhbFRpbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG1lLmludGVydmFsSWQpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwobWUuaW50ZXJ2YWxJZCk7XG4gICAgICAgICAgICBtZS5pbnRlcnZhbElkID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgb25SZXNpemUoZXZlbnQpIHtcbiAgICAgICAgbGV0IG1lICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgd2luRGF0YSA9IE5lby5NYWluLmdldFdpbmRvd0RhdGEoKSxcbiAgICAgICAgICAgIGhlaWdodCwgd2lkdGg7XG5cbiAgICAgICAgT2JqZWN0LmVudHJpZXMobWUud2luZG93cykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKHZhbHVlLmRvY2spIHtcbiAgICAgICAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoID0gd2luRGF0YS5vdXRlcldpZHRoO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IHdpbkRhdGEub3V0ZXJIZWlnaHQgLSAyODtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE5lby5NYWluLndpbmRvd1Jlc2l6ZVRvKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQgICAgOiBoZWlnaHQsXG4gICAgICAgICAgICAgICAgd2lkdGggICAgIDogd2lkdGgsXG4gICAgICAgICAgICAgICAgd2luZG93TmFtZToga2V5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUuYWRqdXN0UG9zaXRpb25zKHdpbkRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5kb2NrXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEubmFtZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkYXRhLnNpemVcbiAgICAgKi9cbiAgICByZWdpc3RlcldpbmRvdyhkYXRhKSB7XG4gICAgICAgIHRoaXMud2luZG93c1tkYXRhLm5hbWVdID0gZGF0YTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEubmFtZVxuICAgICAqL1xuICAgIHVucmVnaXN0ZXJXaW5kb3coZGF0YSkge1xuICAgICAgICBkZWxldGUgdGhpcy53aW5kb3dzW2RhdGEubmFtZV07XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhXaW5kb3dQb3NpdGlvbik7XG5cbmxldCBpbnN0YW5jZSA9IE5lby5jcmVhdGUoV2luZG93UG9zaXRpb24pO1xuXG5OZW8uYXBwbHlUb0dsb2JhbE5zKGluc3RhbmNlKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7Il0sInNvdXJjZVJvb3QiOiIifQ==