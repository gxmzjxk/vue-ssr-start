<template>
    <div class="plate-integrated">
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
                    title: '综合',
                    link: ''
                },
                plugin: [
                    {
                        title: '跑步',
                        link: '//m.sohu.com/z/running',
                    },
                    {
                        title: '高尔夫',
                        link: '//m.sohu.com/z/golf',
                    },
                    {
                        title: '网球',
                        link: '//m.sohu.com/z/tennis',
                    },
                    {
                        title: '电竞',
                        link: '//m.sohu.com/z/e_sport',
                    }
                ],
                feed: {
                    api: '//v2.sohu.com/integration-api/mix/region/5589',
                    params: {
                        pageSize: 20
                    }
                }
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