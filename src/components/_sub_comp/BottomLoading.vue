<template>
    <footer class="bottom-loading-area" ref="loading">
        <template v-if="allLoaded || error">
            <div class="load-all">暂时没有更多内容了……</div>
        </template>
        <template v-else-if="load_mode === 'manual' && !loading">
            <div class="more" @click="click2load">
                <div>查看更多</div>
                <i class="ico bicon-fold"></i>
            </div>
        </template>
        <template v-else>
            <div class="loading">
                <load-icon class="icon"></load-icon>
            </div>
        </template>
    </footer>
</template>
<script>
import LoadIcon from '../_sub_comp/LoadIcon';
import { throttle } from '../_helper/sticky';
/**
 * @description
 * @param
 *  load_mode: 手动点击触发
 *  loading: 正在加载
 *  allLoaded： 已经加载完成
 *  initCheck：起始校验是否触底
 */
export default {
    props: {
        load_mode: {
            type: String,
            default: 'auto'
        },
        loading: {
            type: Boolean,
            default: false
        },
        allLoaded: {
            type: Boolean,
            default: false
        },
        error: {
            type: Boolean,
            default: false
        },
        initCheck: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            availHeight: window.screen.availHeight,
            loadingDom: null,
            delta: 10,
        };
    },
    methods: {
        addEvent() {
            let that = this;
            window.addEventListener('scroll', throttle(function() {
                that.checkReach();
            }, 200));
        },
        checkReach() {
            let loadingPos;
            if (this.loadingDom) {
                loadingPos = this.loadingDom.getBoundingClientRect();
                if (loadingPos.top && loadingPos.top < this.availHeight + this.delta) {
                    this.$emit('reach', null);
                }
            }
        },
        click2load() {
            this.$emit('reach', null);
        },
        init() {
            this.$nextTick(() => {
                this.loadingDom = this.$refs.loading;
                if (this.initCheck) {
                    this.checkReach();
                }
                this.addEvent();
            });
        }
    },
    mounted() {
        if (this.load_mode !== 'manual') {
            this.init();
        }
    },
    components: {
        LoadIcon
    }
};
</script>
<style lang="less">
.bottom-loading-area {
    font-size: 14px;
    height: 30px;
    color: #aaa;
    .load-all {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .more {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .ico {
            font-size: 10px; /*no*/
            padding-left: 4px;
        }
    }
    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>


