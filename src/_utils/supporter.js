var supporter = (function (window) {
    var supporter;
    var navigator = window.navigator,
        userAgent = navigator.userAgent,
        android = userAgent.match(/(Android)[\s\/]*([\d\.]+)/i),
        ios = userAgent.match(/(iPad|iPhone|iPod)[\w\s]*;(?:[\w\s]+;)*[\w\s]+(?:iPad|iPhone|iPod)?\sOS\s([\d_\.]+)/i),
        wp = userAgent.match(/(Windows\s+Phone)(?:\sOS)?\s([\d\.]+)/i),
        adrPadRegex = /pad|XiaoMi\/MiPad|lepad|YOGA|MediaPad|GT-P|SM-T|GT-N5100|sch-i800|HUAWEI\s?[MTS]\d+-\w+|Nexus\s7|Nexus\s8|Nexus\s11|Kindle Fire HD|Tablet|tab/i,
        isWebkit = /WebKit\/[\d.]+/i.test(userAgent),
        isSafari = ios ? (navigator.standalone ? isWebkit : (/Safari/i.test(userAgent) && !/CriOS/i.test(userAgent) && !/MQQBrowser/i.test(userAgent) && !/baidubrowser/i.test(userAgent))) : false,
        os = {};

    if (android) {
        os.android = true;
        os.version = android[2];
        os.android4 = /^4/.test(os.version);
        os.android3 = /^3/.test(os.version);
        os.android2 = /^2/.test(os.version);
        os.androidpad = adrPadRegex.test(userAgent);
    }
    if (ios) {
        os.ios = true;
        os.version = ios[2].replace(/_/g, '.');
        os['ios' + os.version.match(/^(\w+)/i)[1]] = true;
        if (ios[1] === 'iPad') {
            os.ipad = true;
        } else if (ios[1] === 'iPhone') {
            os.iphone = true;
        } else if (ios[1] === 'iPod') {
            os.ipod = true;
        }
    }
    if (wp) {
        os.wp = true;
        os.version = wp[2];
        os.wp8 = /^8/.test(os.version);
        os.wp7 = /^7/.test(os.version);
        os.wppad = /Pad/i.test(os.version);
    }

    supporter = {
        /**
         * 移动设备操作系统信息，可能会包含以下属性:
         *
         *  Boolean : android
         *  Boolean : android4
         *  Boolean : android3
         *  Boolean : android2
         *  Boolean : ios
         *  Boolean : ios7
         *  Boolean : ios6
         *  Boolean : ios5
         *  Boolean : ipad
         *  Boolean : iphone
         *  Boolean : ipod
         *  Boolean : wp
         *  Boolean : wp8
         *  Boolean : wp7
         *  Boolean : wppad
         *  String : version 系统版本号
         *
         */
        os: os,

        /**
         * 是否智能设备
         */
        isSmartDevice: (function () {
            return !!(os.ios || os.android || os.wp);
        }()),

        /**
         * 是否webkit内核浏览器
         */
        isWebkit: isWebkit,

        /**
         * 是否safari浏览器
         */
        isSafari: isSafari,

        /**
         * 低于iOS7
         */
        isBelowIos7: !!(os.ios && os.version.match(/^(\w+)/i)[1] < 7),

        /**
         * 是否UC浏览器
         */
        isUC: /UC/i.test(userAgent),

        /**
         * 是否QQ浏览器
         */
        isQQ: /QBrowser/i.test(userAgent) && !/MicroMessenger/i.test(userAgent),

        /**
         * 是否是微信内置浏览器
         */
        isWeixin: /MicroMessenger/i.test(userAgent),

        // 判断是否是搜狗浏览器
        isSogouBrowser: /sogou/i.test(userAgent),

        // 判断是否是手机百度
        isBaiduboxapp: /baiduboxapp/i.test(userAgent),

        /* 是否是百度浏览器 */
        isBaiduBrowser: /baidubrowser/i.test(userAgent),

        /* 华为手机 */
        // isHuawei: /huawei/i.test(userAgent),
        isHuawei: /huawei|honor/ig.test(userAgent),

        /* 小米手机 */
        // isXiaomi: /MI\s\d/i.test(userAgent),
        isXiaomi: /HM|RedMi|Mi/ig.test(userAgent),

        /* oppo手机 */
        isOppo: /oppo/i.test(userAgent),

        /* vivo手机 */
        isVivo: /vivo/i.test(userAgent),

        /* 三星手机 */
        isSamsung: /SAMSUNG/i.test(userAgent),

        /**
         * 是否是手机百度
         */
        isBaiduBoxApp: /baiduboxapp/i.test(userAgent),

        /**
         * 是否是搜狗浏览器
         */
        isSogou: /sogoumobilebrowser/i.test(userAgent),

        /**
         * 是否是手机搜狐的轻APP
         */
        isMSOHU: /MSOHU/i.test(userAgent),

        /**
         * 是否是搜狐新闻资讯版
         */
        isSohuInfoNews: /sohuinfonews/i.test(userAgent),

        /**
         * 检测是否支持window.localStorage
         */
        isSupportLocalStorage: (function () {
            var key = 'isSupportLocalStorage';
            var localStorage;

            try {
                // 当客户端禁用localStorage，访问时会报“Uncaught SecurityError”权限异常
                localStorage = window.localStorage;
            } catch (e) {
                localStorage = null;
                console.log(e);
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
        }())
    };

    /* 自带浏览器 */
    supporter.isInstalled = supporter.isSafari || (!supporter.isUC && !supporter.isQQ && !supporter.isWeixin && !supporter.isSogouBrowser && !supporter.isBaiduboxapp && !supporter.isBaiduBrowser);

    return supporter;
})(window);


export default supporter;
