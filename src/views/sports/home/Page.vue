<template>
    <div class="sports-home-page">
        <s-header></s-header>
        <s-nav></s-nav>
        <s-focus></s-focus>
        <recommend-live></recommend-live>
    </div>
</template>
<script>
import SHeader from './SHeader';
import SNav from './SNav';
import SFocus from './SFocus';
import RecommendLive from './RecommendLive';
export default {
    asyncData({ store }) {
        return Promise.all([
            store.dispatch('FETCH_FOCUS'),
            store.dispatch('FETCH_RECOMMEND_LIVE'),
        ]);
    },
    components: {
        SHeader,
        SNav,
        SFocus,
        RecommendLive
    }
}
</script>
<style lang="less">

</style>


