<template>
    <div class="plate-recommend">
        <section-plate :config="config" type="toutiao" :limitOnePage="false"></section-plate>
    </div>
</template>
<script>
import SectionPlate from "./SectionPlate";
export default {
    data() {
        return {
            config: {
                label: {
                    title: '推荐',
                    link: ''
                },
                plugin: [
                    {
                        title: '排球',
                        link: '//m.sohu.com/z/volleyball',
                    },
                    {
                        title: '台球',
                        link: '//m.sohu.com/z/billiards',
                    },
                    {
                        title: '乒乓',
                        link: '//m.sohu.com/z/pingpong',
                    },
                    {
                        title: '冰雪',
                        link: '://m.sohu.com/z/snowsports',
                    }
                ],
                feed: {
                    api: '//v2.sohu.com/integration-api/mix/region/5590',
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