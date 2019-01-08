<template>
    <header class="section-menu">
        <div class="label">{{config.label.title}}</div>
        <ul class="links">
            <template v-for="(item, index) in config.plugin">
                <a :href="item.link" :key="index">
                    <li class="link">{{item.title}}</li>
                </a>
            </template>
        </ul>
    </header>
</template>
<script>
export default {
    props: {
        config: {
            type: Object,
            default: () => ({
                label: {},
                plugin: []
            })
        }
    }
};
</script>
<style lang="less">
.section-menu {
    display: flex;
    align-items: flex-end;
    padding-top: 15px;
    padding-bottom: 6.5px;
    height: 20px;
    .label {
        position: relative;
        font-size: 20px;
        padding-left: 15px;
        color: #121212;
        &:before {
            position: absolute;
            left: 0;
            top: 4px;
            content: '';
            width: 10px;
            height: 12px;
            background-color: #fdd000;
        }
    }
    .links {
        display: flex;
        flex: 1;
        padding-right: 15px;
        justify-content: flex-end;
        .link {
            color: #121212;
            padding-left: 15px;
            font-size: 16px;
        }
    }
}
</style>

