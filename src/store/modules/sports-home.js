import Request from '@/util/preq';
import { formatFeedList } from '@/util/format/feed';
import Util from '@/util/util';
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
    },
    getters: {
        focus: state => {
            let focus = Util.clone(state.focus);
            return formatFeedList(focus);
        }
    },
    mutations: {
        SET_FOCUS(state, { focus }) {
            state.focus = focus;
        },
        SET_RECOMMEND_LIVE(state, { live }) {
            state.live = live;
        }
    },
    actions: {
        FETCH_FOCUS({ commit }) {
            return sReq.fetch({
                url: 'https://v2.sohu.com/integration-api/pure/feedByRegion/5137'
            }).then(res => {
                commit('SET_FOCUS', {
                    focus: res.data
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
        }
    }
}
