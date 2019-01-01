<template>
    <div class="sports-home-page">
        <s-header></s-header>
        <s-nav></s-nav>
        <!-- <s-focus></s-focus> -->
    </div>
</template>
<script>
import SHeader from './SHeader';
import SNav from './SNav';
// import SFocus from './SFocus';
export default {
    asyncData() {
        return {};
    },
    components: {
        SHeader,
        SNav,
        // SFocus
    }
}
</script>
<style lang="less">

</style>


