/*
** @desc:   跨浏览器的事件处理方法
** @author: yikuang@sohu-inc.com
** @date:   2017-05-25
*/
import Vendor from './vendor';
export default {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    getEventPos: function (event) {
        var position = {
            x: 0,
            y: 0
        };
        var e = event.originalEvent || event;
        event = this.getEvent();
        if ('ontouchstart' in window && !('event' in e) && e.touches && e.touches[0]) {
            // if(!e.touches || !e.touches[0]) {
            //     return;
            // }
            position.x = e.touches[0].clientX;
            position.y = e.touches[0].clientY;
        } else {
            position.x = e.clientX || e.event.clientX;
            position.y = e.clientY || e.event.clientY;
        }
        return position;
    },
    getTouchEvent: function () {
        var hasPointerSupport = navigator.msPointerEnabled;
        var IE10Plus = /IE (1\d)/.exec(navigator.userAgent);
        var _EVT_DOWN = 'ontouchstart' in window ? 'touchstart' : hasPointerSupport ? 'MSPointerDown' : 'mousedown';
        var _EVT_MOVE = 'ontouchmove' in window ? 'touchmove' : hasPointerSupport ? 'MSPointerMove' : 'mousemove';
        var _EVT_UP = 'ontouchend' in window ? 'touchend' : hasPointerSupport ? 'MSPointerUp' : 'mouseup';
        var _EVT_TRANSITIONEND = ('ontransitionend' in window || IE10Plus) ? 'transitionend' : Vendor.vendor + 'TransitionEnd';
        var _EVT_WRAP = function (e) {
            e = e.originalEvent || e;
            if (_EVT_DOWN === 'touchstart' && !('event' in e) && e.touches && e.touches[0]) {
                e.x = e.touches[0].clientX;
                e.y = e.touches[0].clientY;
            } else {
                e.x = e.clientX || (e.event && e.event.clientX);
                e.y = e.clientY || (e.event && e.event.clientY);
            }
            return e;
        };
        return {
            _EVT_DOWN: _EVT_DOWN,
            _EVT_MOVE: _EVT_MOVE,
            _EVT_UP: _EVT_UP,
            _EVT_TRANSITIONEND: _EVT_TRANSITIONEND,
            _EVT_WRAP: _EVT_WRAP
        };
    }
};