<template>
    <div class="loading-icon">
        <span class="spinner-holder" :class="{'active': showLoading}">
            <slot name="infinite-spinner">
                <spinner :style="{fill: loadingLayerColor, stroke: loadingLayerColor}"></spinner>
            </slot>
        </span>
    </div>
</template>
<script>
import Spinner from './Spinner';
export default {
    props: {
        loadingLayerColor: {
            type: String,
            default: '#AAA'
        }
    },
    data() {
        return {
            showLoading: true,
            loadingState: 1
        };
    },
    components: {
        Spinner
    }
};
</script>
<style lang="less">
.loading-icon {
    position: relative;
    width: 30px;
    height: 30px;
    color: #aaa;
    .spinner-holder {
        opacity: 0;
        transition: opacity 0.15s linear;
        -webkit-transition: opacity 0.15s linear;
        &.active {
            opacity: 1;
        }
    }
}
</style>