const JStorage = (function () {
    var isSupported = (function () {
        var key = 'isSupportLocalStorage';
        var localStorage;

        try {
            // 当客户端禁用localStorage，访问时会报“Uncaught SecurityError”权限异常
            localStorage = typeof window !== 'undefined' && window.localStorage;
        } catch (e) {
            localStorage = null;
            console.warn(e);
            return false;
        }
        if (localStorage) {
            // ios Safari无痕模式下调用localStorage.setItem/removeItem会报错"QuotaExceededError"，需主动捕获
            try {
                localStorage.setItem(key, key);
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                return false;
            }
        }
        return false;
    }());
    var local = {
        setItem: function (key, val) {
            if (isSupported) {
                localStorage.setItem(key, val);
            }
        },
        getItem: function (key) {
            if (isSupported) {
                return localStorage.getItem(key);
            } else {
                return null;
            }
        },
        removeItem: function (key) {
            if (isSupported) {
                return localStorage.removeItem(key);
            }
        }
    };
    var session = {
        setItem: function (key, val) {
            if (isSupported) {
                sessionStorage.setItem(key, val);
            }
        },
        getItem: function (key) {
            if (isSupported) {
                return sessionStorage.getItem(key);
            } else {
                return null;
            }
        },
        removeItem: function (key) {
            if (isSupported) {
                return sessionStorage.removeItem(key);
            }
        }
    };

    return {
        local,
        session
    };
})();
export default JStorage;