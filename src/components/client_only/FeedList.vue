<template>
    <div class="feed-list-wrap" ref="feed_list" :data-spm="spmCCode">
        <v-req source="recommend" @ready="initFetch" :empty="empty" preload="feed">
            <template slot="tombstone">
                <preload-list></preload-list>
            </template>
            <!-- 首页特殊处理 -->
            <template v-if="page === 'home' && toutiaoNum > 0">
                <!-- 头条区域 -->
                <div class="toutiao-area" v-if="show_toutiao.length > 0">
                    <h3 class="tt">头条</h3>
                    <ul class="feed-list">
                        <template v-for="tfeed in show_toutiao">
                            <feed-item :key="tfeed.uniqueKey" :feed="tfeed"></feed-item>
                        </template>
                    </ul>
                </div>
                <!-- 为您推荐区域 -->
                <div class="recommend-area" v-if="show_recommend.length > 0">
                    <h3 class="tt">推荐</h3>
                    <ul class="feed-list">
                        <template v-for="rfeed in show_recommend">
                            <feed-item :key="rfeed.uniqueKey" :feed="rfeed"></feed-item>
                        </template>
                    </ul>
                </div>
            </template>
            <template v-else>
                <ul class="feed-list">
                    <template v-for="item in feed_list">
                        <feed-item :key="item.uniqueKey" :feed="item"></feed-item>
                    </template>
                </ul>
            </template>
            <!-- 加载更多 -->
            <footer class="loading-area" v-if="!limitOnePage">
                <bottom-loading @reach="loadMore" :load_mode="load_mode" :loading="loading" :allLoaded="allLoaded" :error="catchError">
                </bottom-loading>
            </footer>
        </v-req>
    </div>
</template>
<script>
// util
import { throttle } from './_helper/sticky';
import {
    formatFeedList,
    updateFeed2SessionTime,
    FEED_CACHE_TIME
} from '../_utils/format/feed';
import stateHelper from './_helper/state';
import JStorage from '@/_utils/jstorage';
import Util from '@/_utils/util';
import Request from './_helper/preq';
import Cookie from 'js-cookie';
// components
import PreloadList from './_sub_comp/PreloadList';
import FeedItem from './FeedItem';
import BottomLoading from './_sub_comp/BottomLoading';
// 广告
import adFeed from '@/ad/pages/ad-feed';
import Helper from '@/_utils/helper';
import Vue from 'vue';
// 静态
const vReq = new Request({ type: 'recommend' });
const SUV = Cookie.get('SUV');

/**
 * @description
 * @param
 * empty: 无数据时的默认文案
 * load_mode: ‘manual’ 为手动点击加载，auto 触底自动加载
 * params: 请求推荐接口初始化参数，如果不传将使用 Feed 流通用参数进行请求
 * load_acode: 加载更多的事件码
 * inject: 需要插入的 DOM 或者组件
 */
export default {
    props: {
        empty: { // 无数据时的默认文案
            type: String
        },
        load_mode: { // 加载方式
            default: 'auto',
            type: String
        },
        api: { // feed 流请求 API
            default: '',
            type: String
        },
        params: { // feed 流请求 参数
            default: () => ({}),
            type: Object
        },
        load_acode: { // 加载更多 事件码
            type: [Number, String]
        },
        inject: { // 动态插入 dom
            type: Object,
            default: null
        },
        toutiaoNum: { // 拆分头条， 拆出多少条作为头条
            type: Number,
            default: 0, // to be done.
        },
        page: { // 页面类型
            type: String,
            default: 'sub', // to be done.
        },
        secureScore: {
            default: 50,
            type: Number
        },
        limitOnePage: { // 是否控制只加载首屏
            type: Boolean,
            default: false
        },
        name: { // 区分两个雷同组件，目前主要用于 sessionStorage cache
            type: String,
            default: ''
        },
        formatType: { // feed 流格式化类型，目前主要 add prefix
            type: Number,
            default: 0
        },
        ad: { // 广告相关配置
            type: Object
        },
        spmCCode: {
            default: 'fd-d',
            type: String
        }
    },
    data() {
        return {
            request: null,
            pageNo: 1,
            pageSize: 40,
            mpId: '',
            preList: [],
            allLoaded: false,
            catchError: false, // 请求异常，断网 或者 接口crash
            loading: false,
            cacheKey: `${window.location.pathname}_${this.name}_feed`, // 如果单个页面存在两个流，得换用其他方式
            feedMode: true
        };
    },
    methods: {
        preFormat(list) {
            let pullTime = this.pageNo;
            if (Array.isArray(list) && list.length > 0) {
                list.forEach(item => {
                    item.pullTime = pullTime;
                });
            }
            // 处理是否加载完成
            if (list.length === 0) {
                this.allLoaded = true;
            }
            return list;
        },
        saveFeed2Session(list) {
            let that = this;
            let storeList = [];
            if (typeof list === 'object') {
                storeList = list;
            } else {
                storeList = that.preList;
            }
            JStorage.session.setItem(
                that.cacheKey,
                JSON.stringify({
                    pageNo: that.pageNo,
                    feedList: storeList,
                    lastLoad: Date.now(),
                    allLoaded: that.allLoaded
                })
            );
        },
        updateSessionTime() {
            updateFeed2SessionTime(this.cacheKey);
        },
        genFromCache() {
            let now = Date.now();
            let feedList = [];
            let cache_val = JStorage.session.getItem(this.cacheKey);
            if (cache_val) {
                cache_val = JSON.parse(cache_val);
                if (
                    cache_val.lastLoad &&
                    now - cache_val.lastLoad < FEED_CACHE_TIME
                ) {
                    feedList = cache_val.feedList;
                    if (Array.isArray(feedList) && feedList.length > 0) {
                        // 可以直接读取缓存，更新状态
                        this.pageNo = cache_val.pageNo;
                        this.allLoaded = cache_val.allLoaded;
                    }
                }
            }
            return feedList;
        },
        initFetch(request) {
            let that = this;
            let cacheList = this.genFromCache();
            if (!that.api) {
                request.status = 2;
                return;
            }
            if (cacheList.length > 0) {
                this.preList = cacheList;
                this.updateSessionTime();
                request.status = 1;
                that.initFetchEnd();
            } else {
                request
                    .fetch({
                        url: that.api,
                        params: that.genReqParam(that.api)
                    })
                    .then(result => {
                        that.preList = this.preFormat(result.data);
                        if (that.preList.length < 10) {
                            that.allLoaded = true;
                        }
                        that.saveFeed2Session();
                        that.initFetchEnd();
                    })
                    .catch(() => {
                        that.catchError = true;
                    });
            }
        },
        loadMore() {
            let that = this;
            if (this.loading || this.allLoaded) {
                return;
            }
            that.loading = true;
            that.pageNo++;
            if (
                window.sohuSpm &&
                typeof window.sohuSpm.sendAction === 'function'
            ) {
                if (this.load_acode) {
                    window.sohuSpm.sendAction({ acode: this.load_acode });
                }
            }
            vReq.fetch({
                url: that.api,
                params: that.genReqParam(that.api)
            })
                .then(result => {
                    let data;
                    if (result.data && result.data.length > 0) {
                        data = that.preFormat(result.data);
                        stateHelper.genCmtNum(data, this.$refs.feed_list);
                        that.preList = that.preList.concat(data);
                        that.loadMoreComplete();
                        that.catchError = false;
                    } else {
                        that.allLoaded = true;
                    }
                })
                .catch(err => {
                    console.warn(err);
                    that.catchError = true;
                    that.loadMoreComplete();
                });
        },
        injectPluginDom() {
            let model,
                props,
                PluginCtor,
                pluginComponent,
                pluginDom,
                feedItemList,
                posDom;
            if (this.inject) {
                model = this.inject.model;
                props = this.inject.props;
                if (model && model._compiled) {
                    PluginCtor = Vue.extend(this.inject.model);
                    pluginComponent = new PluginCtor({
                        el: document.createElement('div'),
                        data: props
                    });
                    pluginDom = pluginComponent.$el;
                } else if (model && model.nodeType === 1) {
                    pluginDom = model;
                }
                //...
                if (pluginDom) {
                    feedItemList = this.$el.querySelectorAll('.feed-item');
                    posDom = feedItemList[this.inject.pos - 1];
                    Helper.insertAfter(pluginDom, posDom);
                }
            }
        },
        initFetchEnd() {
            stateHelper.genCmtNum(this.preList, this.$refs.feed_list);
            this.$nextTick(() => {
                this.injectPluginDom();
                this.loadAd();
                if (
                    window.sohuSpm &&
                    typeof window.sohuSpm.domDidChange === 'function'
                ) {
                    window.sohuSpm.domDidChange();
                }
                if (this.load_mode !== 'manual' && !this.limitOnePage) {
                    this.addEvent();
                }
            });
        },
        addEvent() {
            let that = this;
            let aH = window.screen.availHeight;
            let dom = this.$refs.loading;
            let pos,
                delta = 10;
            if (dom) {
                window.addEventListener(
                    'scroll',
                    throttle(function() {
                        pos = dom.getBoundingClientRect();
                        if (pos.top && pos.top < aH + delta) {
                            that.loadMore();
                        }
                    }, 200)
                );
            }
        },
        loadMoreComplete() {
            this.saveFeed2Session();
            this.$nextTick(() => {
                this.loading = false;
                if (
                    window.sohuSpm &&
                    typeof window.sohuSpm.domDidChange === 'function'
                ) {
                    window.sohuSpm.domDidChange();
                }
            });
        },
        errorCalback(err) {
            console.warn(err);
            this.loading = false;
            this.allLoaded = true;
        },
        genReqParam(apiUrl = '') {
            let requestId = SUV ? SUV + '_' + Date.now() : '';
            let sessionIdKey = apiUrl + '_' + this.mpId;
            let sessionId = Util.genSessionPvId(sessionIdKey);
            let pvId = '';
            if ( window.sohuSpm && typeof window.sohuSpm.getCodes === 'function') {
                pvId = window.sohuSpm.getCodes().e;
            }
            return {
                page: this.pageNo,
                size: this.pageSize,
                mpId: this.mpId,
                client: 1,
                requestId: requestId,
                pvId: pvId,
                sessionId: sessionId,
                secureScore: this.secureScore
            };
        },
        initReqParams() {
            if (this.params.mpId) this.mpId = this.params.mpId;
            //
            if (this.params.pageNo) this.pageNo = this.params.pageNo;
            if (this.params.pageSize) this.pageSize = this.params.pageSize;
        },
        loadAd() {
            let posArr = [];
            if (this.preList.length >= 18) {
                posArr = [3, 9, 15];
            } else if (this.preList.length >= 11) {
                posArr = [3, 9];
            } else if (this.preList.length >= 4) {
                posArr = [3];
            }

            if (this.ad && posArr.length > 0) {
                console.log('ready to load ad');

                adFeed.autoLoad({
                    adData: this.ad,
                    container: this.$el,
                    lc: 1,// 目前只第一屏出广告
                    posArr: posArr
                });
            }
        }
    },
    created() {
        let mode = JStorage.local.getItem('feedMode');
        if (mode === 'false') {
            this.feedMode = false;
        }
        this.$bus.$on('switch_feed_mode', mode => {
            this.feedMode = mode;
        });
        this.initReqParams();
    },
    components: {
        FeedItem,
        BottomLoading,
        PreloadList
    },
    watch: {
        params: {
            deep: true,
            handler() {
                this.initFetch({
                    flush: true
                });
            }
        },
        api() {
            this.initFetch({
                flush: true
            });
        }
    },
    computed: {
        feed_list() {
            return formatFeedList(this.preList, this.formatType);
        },
        show_toutiao() {
            return this.feed_list.slice(0, this.toutiaoNum);
        },
        show_recommend() {
            return this.feed_list.slice(this.toutiaoNum);
        },
        cannot_load() {
            return this.allLoaded || this.loading;
        }
    }
};
</script>
<style lang="less">
.feed-list-wrap {
    position: relative;
    .tt {
        padding: 15px 13px 6.5px;
        font-size: 18px;
        font-weight: bold;
    }
    .loading-area {
        padding: 8px 0;
    }
    .toutiao-area {
        .feed-list {
            .feed-item:last-of-type {
                border-bottom: none;
            }
        }
    }
    &.hideImg .feed-item {
        .onePic_img {
            display: none;
        }
        .pics-list {
            display: none;
        }
        .item_info {
            display: none;
        }
        .onePic .onePic_detail .title {
            padding-right: 0;
        }
        .link {
            padding-top: 0;
            padding-bottom: 0;
        }
        //
        .title {
            .ellipsis;
            display: block;
            font-size: 15px;
            padding-top: 12px;
            margin-bottom: 12px;
        }
        .top-tag {
            display: block;
        }
    }
}
</style>