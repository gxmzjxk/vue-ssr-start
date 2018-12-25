<template>
    <div class="Item">Item comp</div>
</template>
<script>
export default {
    asyncData ({ store, toute }) {
        // 触发 action 后，会返回 Promise
        return store.dispatch('fetchItem', route.params.id)
    },
    computed: {
        // 从 store 的 state 对象中获取 Item.
        item () {
            return this.$store.state.items[this.$route.params.id]
        }
    }
};
</script>
<style lang="less">
</style>