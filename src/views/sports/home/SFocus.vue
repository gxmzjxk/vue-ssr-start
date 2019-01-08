<template>
    <div class="sports-focus">
        <swiper v-if="focusList.length > 0" duration="500" interval="3000" autoPlay="3000">
            <template v-for="(item, index) in focusList">
                <slide :key="index">
                    <a :href="item.link">
                        <div class="focus-item">
                            <img :src="item.picUrl" class="focus-item-img" />
                            <footer class="focus-item-info">
                                <span class="focus-item-info-t">{{item.title}}</span>
                            </footer>
                        </div>
                    </a>
                </slide>
            </template>
        </swiper>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { Swiper, Slide } from '@/components/swiper';
import { formatFeedList } from '@/_utils/format/feed';
export default {
    data() {
        return {

        };
    },
    methods: {

    },
    mounted() {
        const adSportsHome = require('@/ad/sports-home').default;
        this.$nextTick(() => {
            adSportsHome.focusMap({
                container: this.$el
            });
        });
    },
    components: {
        Swiper,
        Slide
    },
    computed: {
        ...mapState({
            focusList: state => state.SportsHome.focus
        })
    }

};
</script>
<style lang="less">
.focus-item {
    position: relative;
    height: 188px;
    overflow: hidden;
    .focus-item-img {
        width: 100%;
    }
    .focus-item-info {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 60px;
        background: linear-gradient(rgba(0, 0, 0, 0), rgba(43, 43, 43, 0.85));
        color: #fff;
    }
    .focus-item-info-t {
        .ellipsis;
        position: absolute;
        box-sizing: border-box;
        width: 100%;
        bottom: 14px;
        font-size: 18px;
        font-weight: 500;
        padding: 0 16px;
        line-height: 1.32em;
        max-height: 2.64em;
    }
}
</style>


