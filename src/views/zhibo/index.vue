<template>
    <div class="zhibo-app">
        <transition
            name="fade"
            mode="out-in">
            <router-view class="view"></router-view>
        </transition>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="less">
.zhibo-app {
    position: relative;
}
</style>