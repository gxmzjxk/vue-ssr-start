<template>
    <div class="recommend-live">
        <ul class="live-list">
            <template v-for="(item, index) in recommandList">
                <a :href="item.link" :key="index">
                    <li class="live-item">
                        <img class="logo" :src="item.icon"/>
                        <div class="title">{{item.name}}</div>
                        <div class="progress" :class="item.statusClass">
                            <span v-if="item.showProgress" class="result">{{item.showProgress}}</span>
                            <div class="status">
                                <i v-if="item.showStatus === 1" class="ico bicon-lightning"></i>
                                <span>{{item.showStatusName}}</span>
                            </div>
                        </div>
                    </li>
                </a>
            </template>
        </ul>
        <a :href="moreLink">
            <footer class="info">今天共有<em class="r">{{live.total}}</em>场热门比赛,
                <span v-if="live.living" class="r living">正在直播<em>{{live.living}}</em>场</span>
                <span v-else class="r empty">当前暂无直播</span>
            </footer>
        </a>
    </div>
</template>
<script>
import Moment from '@/_utils/moment';
import Util from '@/_utils/util';
export default {
    data() {
        return {
            moreLink: Util.isTestEnvironment() ? '//d2.m.sohu.com/z/live' : '//m.sohu.com/z/live'
        };
    },
    computed: {
        live() {
            return this.$store.state.SportsHome.live;
        },
        recommandList() {
            let list = [];
            if (Array.isArray(this.live.recommand)) {
                list = this.live.recommand.map((item) => {
                    let beginTime = new Moment(item.begin_time * 1000).formatShowTime();
                    let vsResult = '';
                    if (typeof item.home_team_score !== 'undefined' && item.away_team_score !== 'undefined') {
                        vsResult = item.home_team_score + '-' + item.away_team_score;
                    }
                    switch (item.showStatus) {
                        case 0:
                            item.statusClass = 'pre';
                            item.showStatusName = '即将开始';
                            item.showProgress = beginTime;
                            break;
                        case 1:
                            item.statusClass = 'ing';
                            item.showStatusName = '进行中';
                            item.showProgress = vsResult;
                            break;
                        case 2:
                            item.statusClass = 'end';
                            item.showStatusName = '已结束';
                            item.showProgress = vsResult;
                            break;
                    }
                    if (Util.isTestEnvironment()) {
                        item.link = item.url || `//d2.m.sohu.com/z/live/${item.id}`;
                    } else {
                        item.link = item.url || `//m.sohu.com/z/live/${item.id}`;
                    }
                    return item;
                });
            }
            return list;
        }
    }
};
</script>
<style lang="less">
.recommend-live {
    font-size: 12px;
    .live-list {
        padding: 0 15px;
        .live-item {
            display: flex;
            align-items: center;
            height: 44px;
            border-bottom: 1px solid #eee; /*no*/
            .logo {
                width: 18px;
                max-height: 18px;
                overflow: hidden;
            }
            .title {
                flex: 1;
                font-size: 16px;
                padding-left: 10px;
                color: #222;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .progress {
                display: flex;
                align-items: center;
                height: 18px;
                color: #F43D60;
                border-radius: 2px;
                &.pre {
                    color: #487AE7;
                    .status {
                        background-color: #487AE7;
                    }
                }
                &.ing {
                    background-color: #f6f4f4;
                    color: #F43D60;
                    .status {
                        background-color: #F43D60;
                    }
                }
                &.end {
                    color: #999;
                    .status {
                        background-color: #999;
                    }
                }
                .result {
                    padding: 0 8px;
                    font-weight: bold;
                }
                .status {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 56px;
                    font-size: 11px;
                    height: 18px;
                    background-color: #999;
                    color: #fff;
                    border-radius: 2px;
                    .ico {
                        margin-right: 4px;
                        font-size: 12px;
                    }
                }
            }
        }
    }
    // 底部直播信息
    .info {
        height: 32px;
        background-color: #f2f3f5;
        font-size: 14px;
        line-height: 32px;
        text-align: center;
        color: #666;
        .r {
            position: relative;
            &.living {
                color: #f43d60;
                &:after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    margin-top: -3px;
                    right: -13px;
                    width: 0;
                    height: 0;
                    border-top: 3px solid transparent;
                    border-left: 7px solid red;
                    border-bottom: 3px solid transparent;
                }
            }
            &.empty {

            }
        }
    }
}
</style>


