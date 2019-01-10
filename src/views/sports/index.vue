<template>
    <div class="sports-app">
        <transition
            name="fade"
            mode="out-in">
            <router-view class="view"></router-view>
        </transition>
    </div>
</template>
<script>
export default {

};
</script>
<style lang="less">
.sports-app {
    position: relative;
}
</style>


