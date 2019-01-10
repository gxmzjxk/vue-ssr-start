<template>
    <div class="section-wrap">
        <header class="section-menu" ref="menu">
            <div class="label">{{config.label.title}}</div>
            <ul class="links">
                <template v-for="(item, index) in config.plugin">
                    <a :href="item.link" :key="index">
                        <li class="link">{{item.title}}</li>
                    </a>
                </template>
            </ul>
        </header>
        <div class="news-wrap">
            <!-- <template v-if="type === 'toutiao'"> -->
                <!-- <feed-list :inject="inject" :api="config.feed.api" :params="config.feed.params" :limitOnePage="limitOnePage" name="toutiao" formatType="1"></feed-list> -->
            <!-- </template> -->
            <!-- <template v-else> -->
                <!-- <feed-list :api="config.feed.api" :params="config.feed.params" :limitOnePage="limitOnePage" :name="type"></feed-list> -->
            <!-- </template> -->
        </div>
    </div>
</template>
<script>
// import FeedList from '@/components/FeedList';
// import { scrollGetPos, replaceFixedMenu } from './sticky-helper';
import TeamsSection from './TeamsSection';
export default {
    props: {
        config: {
            default: () => ({
                label: {},
                plugin: [],
                feed: {}
            }),
            type: Object
        },
        limitOnePage: {
            default: true,
            type: Boolean
        },
        fixedMenuHeight: {
            default: 40,
            type: Number
        },
        type: {
            type: String,
            default: ''
        },
        feedFormatType: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            inject: {
                model: TeamsSection,
                pos: 5,
                props: {
                    teams: this.config.hotTeams
                }
            }
        };
    },
    methods: {
        // addMenuHandler() {
        //     const MENU_HEIGHT = this.$refs.menu.getBoundingClientRect().height;
        //     const DELTA = MENU_HEIGHT - this.fixedMenuHeight;
        //     scrollGetPos({
        //         dom: this.$el,
        //         cb: (pos) => {
        //             if (pos.top === 0 && pos.bottom === 0) {
        //                 console.warn('scroll listener is pending');
        //             } else {
        //                 // console.log('top:' + pos.top + '|bottom:' + pos.bottom + '|height:' + pos.height);
        //                 if (pos.top <= DELTA && pos.bottom > DELTA) {
        //                     replaceFixedMenu(this.sectionMenus, true);
        //                 } else if (this.type === 'toutiao' && pos.top > DELTA) {
        //                     this.$bus.$emit('fm_hide');
        //                 }
        //             }
        //         }
        //     });
        // }
    },
    mounted() {
        this.$nextTick(() => {
            // this.addMenuHandler();
        });
    },
    components: {
        // FeedList
    },
    computed: {
        // sectionMenus() {
        //     let curItem = Object.assign({}, this.config.label);
        //     curItem.active = true;
        //     return Array.prototype.concat.call(curItem, this.config.plugin);
        // }
    }
};
</script>
<style lang="less">
.section-wrap {
    position: relative;
    border-bottom: 5px solid #f2f3f5;
    .section-menu {
        display: flex;
        align-items: flex-end;
        padding-top: 15px;
        padding-bottom: 6.5px;
        height: 20px;
        .label {
            position: relative;
            font-size: 20px;
            padding-left: 15px;
            color: #121212;
            &:before {
                position: absolute;
                left: 0;
                top: 4px;
                content: '';
                width: 10px;
                height: 12px;
                background-color: #fdd000;
            }
        }
        .links {
            display: flex;
            flex: 1;
            padding-right: 15px;
            justify-content: flex-end;
            .link {
                color: #121212;
                padding-left: 15px;
                font-size: 16px;
            }
        }
    }
    .feed-item:last-of-type {
        border-bottom: none;
    }
    .section-bill {
        border-top: 5px solid #f2f3f5;
        padding: 0 15px 0;
        .text-wrapper {
            padding: 12px 0;
        }
        .banner-wrapper {
            padding: 12px 0;
        }
        &>div:nth-of-type(n+2) {
            border-top: 1px solid #ebebeb; /*no*/
        }
    }
}
</style>
