<template>
    <li class="feed-item" :data-pull-time="feed.pullTime" data-spm-type="resource">
        <div v-if="feed.isFeedBack" class="plainText" @click="jump2FeedBack">
            <h3 class="title" v-html="feed.title"></h3>
            <footer class="item_info">
                <div v-if="feed.channelTag" class="prefix">{{feed.channelTag}}</div>
                <div v-if="feed.isSubject" class="tag subject">专题</div>
                <div class="name">{{feed.authorName}}</div>
                <div class="time"></div>
            </footer>
        </div>
        <a v-else-if="feed.showType === 0" class="plainText" :href="feed.link" data-spm-type="content">
            <h3 class="title" v-html="feed.title"></h3>
            <footer class="item_info">
                <div class="name">{{feed.authorName}}</div>
                <div class="time" :data-news_id="feed.id"></div>
            </footer>
        </a>
        <a v-else-if="feed.showType === 1" class="onePic" :href="feed.link" data-spm-type="content">
            <div class="onePic_detail">
                <h3 class="title" v-html="feed.title"></h3>
                <div class="item_info">
                    <div v-if="feed.channelTag" class="prefix">{{feed.channelTag}}</div>
                    <div v-if="feed.isSubject" class="tag subject">专题</div>
                    <div class="name">{{feed.authorName}}</div>
                    <div class="time" :data-news_id="feed.id"></div>
                </div>
            </div>
            <div class="onePic_img" v-lazy:background-image="feed.picUrl"></div>
        </a>
        <a v-else-if="feed.showType === 2" class="threePics" :href="feed.link" data-spm-type="content">
            <h3 class="title" v-html="feed.title"></h3>
            <div class="pics-list">
                <template v-for="(item, index) in feed.images">
                    <div class="pic-wrap" :key="index" v-lazy:background-image="item"></div>
                </template>
            </div>
            <div class="item_info">
                <div v-if="feed.channelTag" class="prefix">{{feed.channelTag}}</div>
                <div class="name">{{feed.authorName}}</div>
                <div class="time" :data-news_id="feed.id"></div>
            </div>
        </a>
        <a v-else-if="feed.showType === 3" class="bigVideo" :href="feed.link" data-spm-type="content">
            <h3 class="title" v-html="feed.title"></h3>
            <div class="poster" v-lazy:background-image="feed.picUrl">
                <img class="play-ico" src="../assets/images/ic_play_b.png"/>
            </div>
            <footer class="item_info">
                <div v-if="feed.channelTag" class="prefix">{{feed.channelTag}}</div>
                <div class="name">{{feed.authorName}}</div>
                <div class="time" :data-news_id="feed.id">{{feed.showTime}}</div>
            </footer>
        </a>
    </li>
</template>
<script>
import JStorage from '@/_utils/jstorage';
import { STORE_KEY } from '@/constant';
export default {
    props: {
        feed: {},
        pulltime: {
            default: 1
        }
    },
    methods: {
        jump2FeedBack() {
            JStorage.local.setItem(STORE_KEY.FEEDBACK_VISITED_FLAG, true);
            window.location.href = '//m.sohu.com/a/250273948_100200180';
        }
    },
    computed: {
        tagClass() {
            let tag = '';
            if (this.feed.type === 181) {
                tag = 'subject';
            } else if (this.feed.type === 5) {
                tag = 'video';
            } else if (this.feed.type === 3) {
                tag = 'pics';
            }
            return tag;
        }
    }
};
</script>
<style lang="less" rel="stylesheet/less">
.feed-item {
    position: relative;
    margin: 0 13px;
    border-bottom: 1px solid #e8e8e8; /*no*/
    .top-tag {
        position: absolute;
        display: none;
        top: 0;
        left: -13px;
        width: 28px;
        height: 28px;
        &.subject {
            background: url('../assets/images/tag-subject.png') no-repeat center center;
            background-size: contain;
        }
        &.video {
            background: url('../assets/images/tag-video.png') no-repeat center center;
            background-size: contain;
        }
        &.pics {
            background: url('../assets/images/tag-pics.png') no-repeat center center;
            background-size: contain;
        }
    }
    // 基础样式 start
    .title {
        .line-clamp(2);
        font-size: 18px; /*no*/
        line-height: 1.4em; /*25px*/
        color: #212121;
    }
    .item_info {
        display: flex;
        align-items: center;
        overflow: hidden;
        color: #999;
        font-size: 12px;
        width: 100%;
        padding-right: 10px;
        box-sizing: border-box;
        .prefix {
            float: left;
            position: relative;
            color: #0061E5;
            padding-right: 8px;
        }
        .tag {
            float: left;
            position: relative;
            // margin-right: 3px;
            padding: 2px;
            border-radius: 2px;
            font-size: 12px;/*no*/
            &.subject {
                color: #fc4b4b;
            }
            &.fiction {
                color: #f0a400;
            }
            &.promotion {
                color: #a4a4a4;
            }
        }
        .name {
            .ellipsis;
            float: left;
            max-width: 10em;
        }
        .time {
            float: left;
            position: relative;
            line-height: 1.05em;
            padding-left: 6px;
        }
    }
    // 基础样式 end
    // 纯文本
    .plainText {
        .title {
            padding-top: 11.5px;
            margin-bottom: 8.5px; /*使用margin为了防止overflow 裁掉一半文字*/
        }
        .item_info {
            margin-bottom: 15px;
        }
    }
    // 单图
    .onePic {
        display: flex;
        padding-top: 8.5px;
        padding-bottom: 8.5px;
        .onePic_detail {
            position: relative;
            flex: 1;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .title {
                padding-right: 10px;
                -webkit-line-clamp: 5;
            }
            .item_info {
                padding-top: 8.5px;
                padding-bottom: 3.5px;
            }
        }
        .onePic_img {
            position: relative;
            flex-shrink: 0;
            width: 114px;
            height: 74px;
            background-size: cover;
            .video-icon {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                width: 32px;
                height: 32px;
                margin: auto;
                background-size: contain;
            }
        }
    }
    // 大视频
    .bigVideo {
        .title {
            padding-top: 8.5px;
            margin-bottom: 8.5px; /*使用margin为了防止overflow 裁掉一半文字*/
        }
        .poster {
            position: relative;
            height: 172px;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
            .play-ico {
                position: absolute;
                top: 0; right: 0; bottom: 0; left: 0;
                margin: auto;
                width: 54px;
                height: 54px;
            }
        }
        .item_info {
            margin-top: 12px;
            margin-bottom: 12px;
        }
    }
    // 三图
    .threePics {
        .title {
            padding-top: 8.5px;
            margin-bottom: 6.5px;
        }
        .pics-list {
            display: flex;
            .pic-wrap {
                flex: 1;
                width: 1%;
                height: 74px;
                overflow: hidden;
                margin-right: 3.5px;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;
                &:last-child {
                    margin-right: 0;
                }
                .pic {
                    width: 100%;
                }
            }
        }
        .item_info {
            margin-top: 8.5px;
            margin-bottom: 12px;
        }
    }
    // 大图广告 fix style
    .banner-big-link {
        padding: 8.5px 0;
    }
}

//加载中
@keyframes fadeOut {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>