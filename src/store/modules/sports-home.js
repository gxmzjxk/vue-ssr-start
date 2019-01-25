import Request from '@/_utils/preq';
import { formatFeedList } from '@/_utils/format/feed';
// import Util from '@/_utils/util';
const sReq = new Request();

export default {
    state: {
        // 焦点图
        focus: [],
        // 直播
        live: {
            recommand: [
                {
                    streams: [134649],
                    contentStreams: [
                        {
                            display: 1,
                            id: 134649,
                            index: 1,
                            name: '直播',
                            roomId: 128877,
                            template: 0
                        }
                    ],
                    id: 128877,
                    abstract: '全景直播澳大利亚网球公开赛。\r\n ',
                    begin_time: 1548392400,
                    end_time: 1548428400,
                    icon:
                        'http://s7.rr.itc.cn/org/wapChange/20191_17_18/a924gw2142698226050.jpg',
                    is_accumulated_online: false,
                    is_against: false,
                    live_id: 73122,
                    name: '澳网-16:30播：德约 VS 普伊',
                    onlines: 2187,
                    sid: 190125130128877,
                    alias_name: '澳网-16:30播：德约 VS 普伊',
                    recommand: true,
                    originalName: '全景直播澳大利亚网球公开赛',
                    showStatus: 1,
                    showStatusStr: '正在直播'
                },
                {
                    streams: [134755],
                    contentStreams: [
                        {
                            display: 1,
                            id: 134755,
                            index: 1,
                            name: '互动聊球',
                            roomId: 128948,
                            template: 0
                        }
                    ],
                    id: 128948,
                    abstract: '2018-19赛季CBA常规赛第35轮，八一南昌VS北京首钢',
                    away_team_name: '北京首钢',
                    away_team_score: 0,
                    begin_time: 1548416100,
                    end_time: 1548432000,
                    home_team_name: '八一南昌',
                    home_team_score: 0,
                    icon:
                        'http://s7.rr.itc.cn/org/wapChange/20139_12_15/b10orc9062390704340.png',
                    is_accumulated_online: false,
                    is_against: true,
                    live_id: 73234,
                    name: 'CBA:八一VS首钢',
                    onlines: 62,
                    sid: 190125193628948,
                    alias_name: 'CBA:八一VS首钢',
                    recommand: true,
                    originalName: '八一南昌 VS 北京首钢',
                    showStatus: 0,
                    showStatusStr: '即将开始',
                    url: '//m.sohu.com/z/cba/match/346?tab=match-live',
                    matchInfo: {
                        articleData: null,
                        leagueId: 1002,
                        roomId: 128948,
                        reportId: -1,
                        gameCode: 346,
                        gameDateTime: 1548416100000,
                        isHot: false,
                        category: 'cba'
                    }
                },
                {
                    streams: [134757],
                    contentStreams: [
                        {
                            display: 1,
                            id: 134757,
                            index: 1,
                            name: '互动聊球',
                            roomId: 128950,
                            template: 0
                        }
                    ],
                    id: 128950,
                    abstract: '2018-19赛季CBA常规赛第35轮，时代中国广州VS辽宁本钢',
                    away_team_name: '辽宁本钢',
                    away_team_score: 0,
                    begin_time: 1548416100,
                    end_time: 1548432000,
                    home_team_name: '时代中国广州',
                    home_team_score: 0,
                    icon:
                        'http://s7.rr.itc.cn/org/wapChange/20139_12_15/b10orc9062390704340.png',
                    is_accumulated_online: false,
                    is_against: true,
                    live_id: 73236,
                    name: 'CBA:广州VS辽宁',
                    onlines: 212,
                    sid: 190125193628950,
                    alias_name: 'CBA:广州VS辽宁',
                    recommand: true,
                    originalName: '时代中国广州 VS 辽宁本钢',
                    showStatus: 0,
                    showStatusStr: '即将开始',
                    url: '//m.sohu.com/z/cba/match/348?tab=match-live',
                    matchInfo: {
                        articleData: null,
                        leagueId: 1002,
                        roomId: 128950,
                        reportId: -1,
                        gameCode: 348,
                        gameDateTime: 1548416100000,
                        isHot: true,
                        category: 'cba'
                    }
                },
                {
                    streams: [134821],
                    contentStreams: [
                        {
                            display: 1,
                            id: 134821,
                            index: 1,
                            name: '2019亚洲杯8强战',
                            roomId: 128993,
                            template: 0
                        }
                    ],
                    id: 128993,
                    abstract: '搜狐体育直播2019亚洲杯8强战:韩国VS卡塔尔。\r\n ',
                    begin_time: 1548421200,
                    end_time: 1548431700,
                    icon:
                        'http://s7.rr.itc.cn/org/wapChange/20151_4_11/a7zyjn156879263667.jpg',
                    is_accumulated_online: false,
                    is_against: true,
                    live_id: 73246,
                    name: '亚洲杯:韩国VS卡塔尔',
                    onlines: 105,
                    sid: 190125210128993,
                    away_team_name: '卡塔尔',
                    away_team_score: 0,
                    home_team_name: '韩国',
                    home_team_score: 0,
                    alias_name: '亚洲杯:韩国VS卡塔尔',
                    recommand: true,
                    originalName: '韩国 VS 卡塔尔',
                    showStatus: 0,
                    showStatusStr: '即将开始'
                }
            ],
            living: 1,
            total: 14
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
};
