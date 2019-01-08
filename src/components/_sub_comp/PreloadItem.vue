<template>
    <li class="temp-content ratina-bd bd-b">
        <div class="temp-inner">
            <div class="temp-mask subheader-left"></div>
            <div class="temp-mask header-top"></div>
            <div class="temp-mask header-left"></div>
            <div class="temp-mask header-bottom"></div>
        </div>
    </li>
</template>
<script>
export default {

};
</script>

<style lang="less">
@keyframes placeHolderShimmer {
    0% {
        background-position: -468px 0;
    }
    to {
        background-position: 468px 0;
    }
}
.temp-content{
    padding: 12px 0;
    border-bottom: 1px solid #e8e8e8;/*no*/
}

.temp-inner {
    position: relative;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(90deg, #eee 8%, #ddd 18%, #eee 33%);
    background-size: 800px 104px;
    height: 75px;
    overflow: hidden;
    .temp-mask {
        position: absolute;
        background: #fff;
    }
    .header-top {
        height: 9px;
        top: 0;
        left: 0;
        right: 115px;
    }
    .header-left {
        height: 40px;
        width: 35px;
        top: 9px;
        right: 115px;
    }
    .header-bottom {
        height: 18px;
        top: 49px;
        right: 115px;
        left: 0;
    }
    .subheader-left {
        height: 8px;
        bottom: 0;
        width: auto;
        right: 115px;
        left: 204px;
    }
}
</style>