import Moment from '@/_utils/moment';
import JStorage from '@/_utils/jstorage';
import Util from '@/_utils/util';
import Request from '@/_utils/preq';
import { TAGS, AUTHOR_CHANNEL_DIC } from '@/constant';

// feed 流缓存到 sessionStorage 的时间
export const FEED_CACHE_TIME = 3 * 60 * 1000;

// 更新 sessionStorage 中的 feed 流
export const updateFeed2SessionTime = function (cacheKey = '') {
    let cache_val = JStorage.session.getItem(cacheKey);
    if (cache_val) {
        cache_val = JSON.parse(cache_val);
        if (typeof cache_val === 'object') {
            if (cache_val.feedList && cache_val.lastLoad) {
                cache_val.lastLoad = Date.now();
                JStorage.session.setItem(cacheKey, JSON.stringify(cache_val));
            } else {
                JStorage.session.setItem(cacheKey, '');
            }
        }
    }
};

// 0纯文本 1单图文 2图集 3视频
const genFeedShowType = function(o = {}) {
    let showType = 0;
    let images = o.images || [];
    let picUrl = o.picUrl || o.cover || o.backupCover || images[0];
    if (o.type === 4 || o.type === 5 || o.type === 182) {
        showType = 3;
    } else if (images.length > 2) {
        showType = 2;
    } else if (picUrl) {
        showType = 1;
    }
    return showType;
};

// 格式化数据给 View
/**
 *
 * @param {Array} _list 数据流
 * @param {Number} genType 0 默认， 1体育头条
 * @param {*}
 */
export const formatFeedList = function (_list, genType = 0) {
    let nowTime, showTime, list = [];
    if (Array.isArray(_list) && _list.length > 0) {
        nowTime = Date.now();
        list = _list.map((o) => {
            showTime = Number(o.publishTime) || Number(o.publicTime) || nowTime;
            o.showTime = new Moment(showTime).fixTime({
                wcup: true
            });
            o.link = Util.addQueryArgs(o.url, {
                scm: o.scm
            });
            o.picUrl = o.picUrl || o.bigCover || o.cover || (o.images && o.images[0]);
            const _title = o.title.replace(/【.*】/, '');
            if (_title) {
                o.title = _title;
            }
            //
            o.images = Array.isArray(o.images) ? o.images.slice(0, 3) : [];
            o.showType = genFeedShowType(o);
            if (o.type === 181) {
                o.isSubject = true;
            }
            if (genType === 1 && AUTHOR_CHANNEL_DIC[o.authorId]) {
                o.channelTag = AUTHOR_CHANNEL_DIC[o.authorId].channel;
            }
            o.uniqueKey = o.id + o.scm;
            o.pullTime = o.pullTime || 1;
            return o;
        });
    }
    return list;
};
// 格式化请求feed流的 tags
export const genTagsParams = function (tags = {}) {
    let andArr = tags.and, orArr = tags.or;
    let orParam = '', orParamArr = [];
    let tagsArr, tagsParams = TAGS.base;
    // 处理 并集
    if (orArr) {
        orParamArr = orArr.map((tag) => {
            if (typeof tag === 'object') {
                return tag.teamName;
            } else {
                return tag;
            }
        });
        orParam = orParamArr.join('|');
    }
    // 处理 交集
    if (Array.isArray(andArr)) {
        tagsArr = andArr.map((tag) => {
            return tag;
        });
        tagsArr = tagsArr.concat(TAGS.base);
        tagsParams = tagsArr.join(';');
    } else {
        if (andArr) {
            tagsParams += ';' + andArr;
        }
    }
    if (orParam) {
        tagsParams += ';' + orParam;
    }
    return tagsParams;
};

// 提取数组中的特定数据项
export const pickListByKey = function (list = [], key = '') {
    let key_list = [];
    list.forEach(function (o) {
        if (o[key]) {
            key_list.push(o[key]);
        }
    });
    return key_list;
};

// 获取世界杯 Feed流数据
export const genFeedList = function (opt = {}) {
    let request = opt.request;
    if (!request) {
        request = new Request({ type: 'recommend' });
    }
    const tagsParams = genTagsParams(opt.tags);
    const exposedList = Array.isArray(opt.exposed) ? opt.exposed.join(',') : opt.exposed;
    let sessionPvId = Util.genSessionPvId();
    return request.fetch({
        url: '/wcup/feeds',
        params: {
            size: opt.size || 20,
            target: tagsParams,
            type: opt.type || 2,
            exposed: exposedList,
            pvId: sessionPvId
        }
    });
};
export default {
    formatFeedList,
    genFeedList
};