import { STORE_KEY } from '@/constant';
import JStorage from '@/_utils/jstorage';
function toNumber(value) {
    return Number(value);
}
function now() {
    return new Date();
}
function isObject(value) {
    var type = typeof value;
    return value !== null && (type === 'object' || type === 'function');
}
export default {
    generateRand(len = 7) {
        var rdmString = '';
        //toSting接受的参数表示进制，默认为10进制。36进制为0-9 a-z
        for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
        return rdmString.substr(0, len);
    },
    genSessionPvId(key) {
        let pvId, sessionMap = {};
        let sessionStr = JStorage.session.getItem(STORE_KEY.SESSION_PV_IDS);
        if (sessionStr) {
            sessionMap = JSON.parse(sessionStr);
        }
        if (key && sessionMap[key]) {
            pvId = sessionMap[key];
        } else {
            pvId = Date.now() + this.generateRand(7);
            sessionMap[key] = pvId;
        }
        window.sohuSpm = window.sohuSpm || {};
        window.sohuSpm._eCode = pvId;
        JStorage.session.setItem(STORE_KEY.SESSION_PV_IDS, JSON.stringify(sessionMap));
        return pvId;
    },
    // 将http开头的协议换成相对协议
    transferToRelativeProtocol(baseUrl) {
        return baseUrl.replace(/^http:\/\//, '//');
    },
    mixObjByTemplate(tplObj, item) {
        var objToStrFunc = Object.prototype.toString;
        var ObjStr = '[object Object]';
        var res = {};
        var i;
        if ((tplObj && objToStrFunc.call(tplObj) === ObjStr) && (item && objToStrFunc.call(item) === ObjStr)) {
            for (i in tplObj) {
                if (tplObj.hasOwnProperty(i)) {
                    if (typeof item[i] === 'number') {
                        res[i] = item[i];
                    } else {
                        res[i] = item[i] || tplObj[i];
                    }
                }
            }
        }
        return res;
    },
    isTestEnvironment() {
        const isClient = typeof window !== 'undefined';
        if (isClient) {
            let clientHost = window.location.host;
            return clientHost !== 'm.sohu.com' && clientHost !== 't3.m.sohu.com';
        } else {
            return process.env.RUNNING_ENV !== 'bx' && process.env.RUNNING_ENV !== 'yz';
        }
    },
    isEmpty: function (obj) {
        if (obj.replace(/(^\s*)|(\s*$)/g, '').length <= 0) {//null
            return true;
        } else {// not null
            return false;
        }
    },
    isSupportSticky: function () {//检测是否支持sticky
        var prefixTestList = ['', '-webkit-', '-ms-', '-moz-', '-o-'];
        var stickyText = '';
        var i, isSupport;
        var div = document.createElement('div');
        for (i = 0; i < prefixTestList.length; i++) {
            stickyText += 'position:' + prefixTestList[i] + 'sticky;';
        }
        // 实用创建的 dom 来检查
        div.style.cssText = stickyText;
        document.body.appendChild(div);
        isSupport = /sticky/i.test(window.getComputedStyle(div).position);
        document.body.removeChild(div);
        div = null;
        return isSupport;
    },
    checkMobile: function (obj) {
        if (this.isEmpty(obj) || (!/^1([3-9][0-9]{9})$/.test(obj))) {//格式不正确
            return false;
        } else {// 格式正确
            return true;
        }
    },
    checkEmail: function (obj) {
        if (this.isEmpty(obj) || (!/^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4}$/.test(obj))) {//格式不正确
            return false;
        } else {// 格式正确
            return true;
        }
    },
    /**
     * [addQueryArgs 给url添加参数]
     * @param {[string]} url      [需添加参数的url]
     * @param {[object]} paramObj [需添加的参数,hash键值对形式]
     */
    addQueryArgs: function (url, paramObj) {
        var result;
        var key, value;
        if (!url) {//url 为空不做处理。

            return '';
        }
        for (key in paramObj) {
            value = paramObj[key];
            result = new RegExp('(' + key + '=)[^&]+', 'i');
            if (url.match(result)) {
                url = url.replace(result, '$1' + value);
            } else {
                url += (url.indexOf('?') === -1) ?
                    ('?' + key + '=' + value) : ('&' + key + '=' + value);
            }
        }

        return url;
    },
    parseURL: function (_url) {
        let url = decodeURIComponent(_url);
        let paramStr = url.split('?')[1];
        if (!paramStr) {
            return {};
        }
        let args = {};
        let items = paramStr.split('&');

        let item = null, name = null, value = null;
        for (let i = 0; i < items.length; i++) {
            item = items[i].split('=');
            if (item[0]) {
                name = item[0];
                value = item[1] ? item[1] : '';
                args[name] = value;
            }
        }
        return args;
    },
    debounce: function (func, wait, options) {
        var lastArgs,
            lastThis,
            maxWait,
            result,
            timerId,
            lastCallTime,
            lastInvokeTime = 0,
            leading = false,
            maxing = false,
            trailing = true;

        if (typeof func !== 'function') {
            throw new TypeError('fun error');
        }
        wait = toNumber(wait) || 0;
        if (isObject(options)) {
            leading = !!options.leading;
            maxing = 'maxWait' in options;
            maxWait = maxing ? Math.max(toNumber(options.maxWait) || 0, wait) : maxWait;
            trailing = 'trailing' in options ? !!options.trailing : trailing;
        }

        function invokeFunc(time) {
            var args = lastArgs,
                thisArg = lastThis;

            lastArgs = lastThis = undefined;
            lastInvokeTime = time;
            result = func.apply(thisArg, args);
            return result;
        }

        function leadingEdge(time) {
            // Reset any `maxWait` timer.
            lastInvokeTime = time;
            // Start the timer for the trailing edge.
            timerId = setTimeout(timerExpired, wait);
            // Invoke the leading edge.
            return leading ? invokeFunc(time) : result;
        }

        function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime,
                timeSinceLastInvoke = time - lastInvokeTime,
                result = wait - timeSinceLastCall;

            return maxing ? Math.min(result, maxWait - timeSinceLastInvoke) : result;
        }

        function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime,
                timeSinceLastInvoke = time - lastInvokeTime;

            // Either this is the first call, activity has stopped and we're at the
            // trailing edge, the system time has gone backwards and we're treating
            // it as the trailing edge, or we've hit the `maxWait` limit.
            return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
                (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
        }

        function timerExpired() {
            var time = now();
            if (shouldInvoke(time)) {
                return trailingEdge(time);
            }
            // Restart the timer.
            timerId = setTimeout(timerExpired, remainingWait(time));
        }

        function trailingEdge(time) {
            timerId = undefined;

            // Only invoke if we have `lastArgs` which means `func` has been
            // debounced at least once.
            if (trailing && lastArgs) {
                return invokeFunc(time);
            }
            lastArgs = lastThis = undefined;
            return result;
        }

        function cancel() {
            if (timerId !== undefined) {
                clearTimeout(timerId);
            }
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined;
        }

        function flush() {
            return timerId === undefined ? result : trailingEdge(now());
        }

        function debounced() {
            var time = now(),
                isInvoking = shouldInvoke(time);

            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;

            if (isInvoking) {
                if (timerId === undefined) {
                    return leadingEdge(lastCallTime);
                }
                if (maxing) {
                    // Handle invocations in a tight loop.
                    timerId = setTimeout(timerExpired, wait);
                    return invokeFunc(lastCallTime);
                }
            }
            if (timerId === undefined) {
                timerId = setTimeout(timerExpired, wait);
            }
            return result;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
    },
    throttle: function (func, wait, options) {
        var leading = true,
            trailing = true;

        if (typeof func !== 'function') {
            throw new TypeError('fun error');
        }
        if (isObject(options)) {
            leading = 'leading' in options ? !!options.leading : leading;
            trailing = 'trailing' in options ? !!options.trailing : trailing;
        }
        return this.debounce(func, wait, {
            'leading': leading,
            'maxWait': wait,
            'trailing': trailing
        });
    },
    clone: function (obj) {
        // Handle the 3 simple types, and null or undefined
        if (obj === null || typeof obj !== 'object') return obj;

        // Handle Date
        if (obj instanceof Date) {
            const copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            const copy = [];
            const len = obj.length;
            for (let i = 0; i < len; ++i) {
                copy[i] = this.clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        const copy = {};
        for (const attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
        }
        return copy;
    }
};