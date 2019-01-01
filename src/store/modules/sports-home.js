import Request from '@/util/preq';
import { formatFeedList } from '@/util/format/feed';
import Util from '@/util/util';
const sReq = new Request();

export default {
    state: {
        focus: []
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
            })

        }
    }
}
