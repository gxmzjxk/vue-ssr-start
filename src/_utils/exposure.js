/*
** @desc:    元素曝光监听
** @author:  yikuang@sohu-inc.com
** @date:    2017-05-25
*/

import EventHelper from './event-helper';
import Helper from './helper';
import Util from './util';

function Exposure(wrapper) {
    // wrapper可选参数，是曝光的外层容器，若没有即默认为window
    this.domArr = [];
    this.wrapper = wrapper || null;
}

Exposure.prototype = {
    constructor: Exposure,
    /*
    ** @desc 判断元素是否曝光
    */
    isExposure: function (dom) {
        var domArr, length, offset, i;
        if (!dom) {
            return false;
        }
        domArr = [dom].concat(Array.prototype.slice.call(dom.children));
        length = domArr.length;
        offset;
        const wrapperOffset = this.wrapper && this.wrapper.getBoundingClientRect() || null;
        const left = wrapperOffset && wrapperOffset.left || 0;
        const right = wrapperOffset && wrapperOffset.right || window.innerWidth;
        const top = wrapperOffset && wrapperOffset.top || 0;
        const bottom = wrapperOffset && wrapperOffset.bottom || window.innerHeight;

        // 容器存在的情况下，如果容器都没在视野里曝光，直接返回false
        if (wrapperOffset && !(wrapperOffset.top < window.innerHeight && wrapperOffset.bottom > 0 && wrapperOffset.left < window.innerWidth && wrapperOffset.right > 0)) {
            return false;
        }

        for (i = 0; i < length; i++) {
            offset = domArr[i].getBoundingClientRect();
            if (offset.top < bottom && offset.bottom > top && offset.left < right && offset.right > left) {
                return true;
            }
        }
        return false;
    },
    /*
    ** @desc 增加监听曝光的元素
    ** opt = {
    **   dom:
    **   callback:
    **   isHideCheck:
    ** }
    */
    add: function (opt) {
        this.domArr.push(opt);
        return this;
    },
    /*
    ** @desc 删除监听曝光的元素
    */
    removeElement: function (indexArr) {
        var tempArr = [];
        var length = this.domArr.length;
        var i;
        for (i = 0; i < length; i++) {
            if (indexArr.indexOf(i) < 0) {
                tempArr.push(this.domArr[i]);
            }
        }
        this.domArr = tempArr;
    },
    /*
    ** @desc 对所有监听的元素，判断是否曝光
    */
    allExposureCheck: function () {
        var length = this.domArr.length;
        var indexArr = [];
        var i;
        for (i = 0; i < length; i++) {
            if (this.isExposure(this.domArr[i].dom)) {
                if (typeof this.domArr[i].isHideCheck === 'function') {
                    if (!this.domArr[i].isHideCheck()) {
                        indexArr.push(i);
                        if (typeof this.domArr[i].callback === 'function') {
                            this.domArr[i].callback();
                        }
                    }
                } else {
                    indexArr.push(i);
                    if (typeof this.domArr[i].callback === 'function') {
                        this.domArr[i].callback();
                    }
                }
            }
        }
        this.removeElement(indexArr);
    },
    /*
    ** @desc 曝光监听函数
    */
    exposureHandler: function () {
        var self = this;
        setTimeout(function () {
            self.allExposureCheck();
        }, 50);
    },
    /*
    ** @desc 添加曝光监听
    */
    addListener: function () {
        EventHelper.addHandler(window, 'scroll', Util.debounce(Helper.proxy(this.exposureHandler, this), 200));
    },
    /*
    ** @desc 移除曝光监听
    */
    removeListener: function () {
        EventHelper.removeHandler(window, 'scroll', Util.debounce(Helper.proxy(this.exposureHandler, this), 200));
    }
};

export default Exposure;