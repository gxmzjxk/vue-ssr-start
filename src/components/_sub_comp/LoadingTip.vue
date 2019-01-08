<template>
    <div class="loading-tip-wrap">
        <div v-if="type !== 'error'" class="empty container">
            <div class="img-wrap"></div>
            <div class="info">{{tip}}</div>
        </div>
        <div v-else class="error container" @touchend="retry">
            <div class="img-wrap"></div>
            <div class="info">网络不给力，点击屏幕重试</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        type: {
            default: '',
            type: String
        },
        tip: {
            default: '暂无数据',
            type: String
        }
    },
    methods: {
        retry() {
            this.$emit('retry', null);
        }
    }
};
</script>
<style lang="less">
.loading-tip-wrap {
    .container {
        position: relative;
        padding: 90px 0;
        .img-wrap {
            position: relative;
            height: 90px;
        }
        &.empty {
            .img-wrap {
                background: url('../../assets/images/data-empty.png') no-repeat
                    center center;
                background-size: contain;
            }
        }
        &.error {
            .img-wrap {
                background: url('../../assets/images/loading-404.png') no-repeat
                    center center;
                background-size: contain;
            }
        }
        .info {
            font-size: 18px;
            text-align: center;
            color: #23885c;
            padding: 18px 0;
        }
    }
}
</style>


