<template>
    <div class="plate-toutiao">
        <section-menu :config="menuConfig"></section-menu>
        <div class="feed-list-wrap">
            <template v-for="item in feedList">
                <feed-item :feed="item" :key="item.uniqueKey"></feed-item>
            </template>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import SectionPlate from "./SectionPlate";
import hotTeams from "./_hotTeams";
import TeamsSection from './TeamsSection';
import FeedItem from '../../../components/FeedItem';
import SectionMenu from './SectionMenu';
export default {
    data() {
        return {
            menuConfig: {
                label: {
                    title: "要闻",
                    link: ""
                },
                plugin: [
                    {
                        title: "直播",
                        link: "//d2.m.sohu.com/z/live"
                    },
                    {
                        title: "视频",
                        link: "//m.sohu.com/v/"
                    }
                ],
            },
        };
    },
    mounted() {

    },
    components: {
        SectionMenu,
        FeedItem
    },
    computed: {
        ...mapState({
            feedList: state => state.SportsHome.toutiaoNews
        })
    }

};
</script>
<style lang="less">
</style>


