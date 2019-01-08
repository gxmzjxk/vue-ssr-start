/*
** @desc:   纯工具方法，与业务无关
** @author: yikuang@sohu-inc.com
** @date:   2017-05-12
*/

var Helper = {
    /*
    ** @desc  混合两个对象的属性
    ** @param {Object} parent: 被混合的对象
    ** @param {Object} child:  要混合的对象
    */
    extendObjects: function (parent, child) {
        //对参数进行类型检查。当参数类型不满足条件时，直接返回空对象
        var objToStrFunc = Object.prototype.toString;
        var ObjStr = '[object Object]';
        var key;
        if ((parent && objToStrFunc.call(parent) === ObjStr) && (child && objToStrFunc.call(child) === ObjStr)) {
            for (key in child) {
                if (child.hasOwnProperty(key)) {
                    parent[key] = child[key];
                }
            }
            return parent;
        } else {
            return {};
        }
    },
    /*
    ** @desc   将传入的对象转换成get请求中的参数形式
    ** @param  {Object} 参数对象
    ** @return {String} 以&连接的参数
    */
    objToParams: function (obj) {
        var paramsArr = [];
        var key;
        if (typeof obj === 'object' && JSON.stringify(obj) !== JSON.stringify({})) {
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    paramsArr.push(key + '=' + obj[key]);
                }
            }
            return paramsArr.join('&');
        } else {
            return '';
        }
    },
    /*
    ** @desc   将url中的参数转换成对象
    ** @return {String} url
    ** @param  {Object} 参数对象
    */
    urlToObj: function (url) {
        var paramsStr, result = {}, paramsArr, length, tempArr;
        var i;
        if (typeof url !== 'string') {
            return {};
        }
        paramsStr = url.split('?')[1];

        if (!paramsStr || !paramsStr.length) {
            return {};
        }

        paramsArr = paramsStr.split('&');
        length = paramsArr.length;
        tempArr = [];

        for (i = 0; i < length; i++) {
            tempArr = paramsArr[i].split('=');
            result[tempArr[0]] = tempArr[1] || '';
        }

        return result;
    },
    /*
    ** @desc 指定函数的运行作用域
    */
    proxy: function (fun, context) {
        var source = context || this;

        return function () {
            fun.apply(source, arguments);
        };
    },
    /*
    ** @desc: 判断对象是否为空
    */
    isEmptyObject: function (obj) {
        var name;
        for (name in obj) {
            return false;
        }
        return true;
    },
    /*
    ** @desc：往元素前面插入新元素
    */
    insertBefore: function (newNode, referenceNode) {
        var parentNode = referenceNode && referenceNode.parentNode;
        if (newNode && referenceNode) {
            parentNode.insertBefore(newNode, referenceNode);
        }
    },
    /*
    ** @desc：往元素后面插入新元素
    */
    insertAfter: function (newNode, referenceNode) {
        var parentNode = referenceNode && referenceNode.parentNode;
        var nextSibling = referenceNode && referenceNode.nextSibling;
        if (!parentNode) {
            return;
        }
        if (nextSibling) {
            parentNode.insertBefore(newNode, nextSibling);
        } else {
            parentNode.appendChild(newNode);
        }
    },
    // 是否在webp白名单
    isInWebpList: function (link) {
        const webpWhiteList = /.*(5b0988e595225.cdn.sohucs.com|29e5534ea20a8.cdn.sohucs.com|img.mp.itc.cn|img.mp.sohu.com).+/i;

        return !!webpWhiteList.exec(link);
    },
    // 动态插入js
    insertScript: function (scriptSrc, isInsertToHead) {
        var insertScriptElem = document.createElement('script');
        var parentElem = isInsertToHead ? document.head : document.body;
        insertScriptElem.src = scriptSrc;
        parentElem.appendChild(insertScriptElem);
    },
    // 获取随机数
    getRandomNumber: function (range) {
        var randomNum;
        if (range <= 1) {
            randomNum = 1;
        } else {
            randomNum = Math.ceil(Math.random() * range);
        }
        return randomNum;
    }
};

export default Helper;