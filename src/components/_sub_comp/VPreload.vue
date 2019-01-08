<template>
    <div class="preload-wrap">
        <div class="loading">
            <spinner :style="{fill: loadingLayerColor, stroke: loadingLayerColor}"></spinner>
        </div>
        <footer class="tip">正在加载中…</footer>
    </div>
</template>
<script>
import Spinner from './Spinner';
export default {
    data() {
        return {
            loadingLayerColor: '#cfcfcf'
        };
    },
    components: {
        Spinner
    }
};
</script>
<style lang="less">
.preload-wrap {
    position: relative;
    padding: 90px 0;
    .loading{
        margin: 0 auto;
        width: 50px;
        height: 50px;
    }
    .tip{
        text-align: center;
        padding: 12px 0;
        font-size: 14px;
        color: #cfcfcf;
    }
}
</style>


