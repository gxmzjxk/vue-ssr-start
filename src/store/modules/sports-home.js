import Request from '@/_utils/preq';
import { formatFeedList } from '@/_utils/format/feed';
import Util from '@/_utils/util';
const sReq = new Request();

export default {
    state: {
        // 焦点图
        focus: [],
        // 直播
        live: {
            living: 0,
            total: 0,
            recommand: []
        },
        // 头条 feed 流
        toutiaoNews: []
    },
    mutations: {
        SET_FOCUS(state, { focus }) {
            state.focus = focus;
        },
        SET_RECOMMEND_LIVE(state, { live }) {
            state.live = live;
        },
        SET_TOUTIAO_NEWS(state, { news }) {
            state.toutiaoNews = news;
        }
    },
    actions: {
        FETCH_FOCUS({ commit }) {
            return sReq.fetch({
                url: 'https://v2.sohu.com/integration-api/pure/feedByRegion/5137'
            }).then(res => {
                let focus = formatFeedList(res.data);
                commit('SET_FOCUS', {
                    focus: focus
                });
            });
        },
        FETCH_RECOMMEND_LIVE({ commit }) {
            return sReq.fetch({
                url: 'http://10.16.58.119:8081/sports-api/v2/zhibo/recommand'
            }).then(res => {
                commit('SET_RECOMMEND_LIVE', {
                    live: res
                });
            });
        },
        FETCH_TOUTIAO_NEWS({ commit }) {
            return sReq.fetch({
                url: 'https://v2.sohu.com/integration-api/pure/feedByRegion/5138'
            }).then(res => {
                let toutiaoNews = formatFeedList(res.data);
                commit('SET_TOUTIAO_NEWS', {
                    news: toutiaoNews
                });
            });
        }
    }
}
