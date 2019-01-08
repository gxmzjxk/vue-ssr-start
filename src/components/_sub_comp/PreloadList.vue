<template>
    <ul class="preload-list-wrap">
        <template v-for="item in load_list">
            <preload-item :key="item.id"></preload-item>
        </template>
    </ul>
</template>
<script>
import PreloadItem from './PreloadItem';
export default {
    props: {
        num: {
            type: [String, Number],
            default: 20
        }
    },
    data() {
        return {};
    },
    components: {
        PreloadItem
    },
    computed: {
        load_list() {
            let list = [];
            let item = {};
            let i;
            for (i = 0; i < this.num; i++) {
                item = {
                    id: i
                };
                list.push(item);
            }
            return list;
        }
    }
};
</script>

<style lang="less">
.preload-list-wrap {
    position: relative;
    padding: 0 15px;
}
</style>