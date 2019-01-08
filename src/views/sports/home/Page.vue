<template>
    <div class="sports-home-page">
        <s-header></s-header>
        <s-nav></s-nav>
        <s-focus></s-focus>
        <recommend-live></recommend-live>
        <plate-toutiao></plate-toutiao>
    </div>
</template>
<script>
import SHeader from './SHeader';
import SNav from './SNav';
import SFocus from './SFocus';
import RecommendLive from './RecommendLive';
import PlateToutiao from './PlateToutiao';
export default {
    asyncData({ store }) {
        return Promise.all([
            store.dispatch('FETCH_FOCUS'),
            store.dispatch('FETCH_RECOMMEND_LIVE'),
            store.dispatch('FETCH_TOUTIAO_NEWS'),
        ]);
    },
    components: {
        SHeader,
        SNav,
        SFocus,
        RecommendLive,
        PlateToutiao
    }
}
</script>
<style lang="less">

</style>


