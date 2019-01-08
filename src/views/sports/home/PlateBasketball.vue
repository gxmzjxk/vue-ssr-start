<template>
    <div class="plate-basketball">
        <section-plate :config="config" type="toutiao"></section-plate>
    </div>
</template>
<script>
import SectionPlate from "./SectionPlate";
export default {
    data() {
        return {
            config: {
                label: {
                    title: '篮球',
                    link: ''
                },
                plugin: [
                    {
                        title: 'NBA',
                        link: '//m.sohu.com/z/nba/home'
                    },
                    {
                        title: 'CBA',
                        link: '://m.sohu.com/z/cba'
                    },
                ],
                feed: {
                    api: '//v2.sohu.com/integration-api/mix/region/5587',
                    params: {
                        pageSize: 20
                    }
                },
            },
        };
    },
    components: {
        SectionPlate
    }
};
</script>
<style lang="less">
</style>