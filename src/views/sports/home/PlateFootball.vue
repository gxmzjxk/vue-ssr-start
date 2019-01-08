<template>
    <div class="plate-football">
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
                    title: '足球',
                    link: ''
                },
                plugin: [
                    {
                        title: '中超',
                        link: '//m.sohu.com/z/csl',
                    },
                    {
                        title: '国足',
                        link: '//m.sohu.com/z/cnmenfootball',
                    },
                    {
                        title: '英超',
                        link: '//m.sohu.com/z/football/17',
                    },
                    {
                        title: '西甲',
                        link: '//m.sohu.com/z/football/8',
                    }
                ],
                feed: {
                    api: '//v2.sohu.com/integration-api/mix/region/5588',
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