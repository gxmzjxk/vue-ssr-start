<template>
    <nav class="navs-wrap">
        <ul class="nav-list clearfix">
            <template v-for="(item, index) in navs">
                <a :href="item.link"
                    :key="index">
                    <li class="nav">{{item.title}}</li>
                </a>
            </template>
        </ul>
    </nav>
</template>
<script>
export default {
    data() {
        return {
            navs: [
                {
                    link: "/z/nba",
                    title: "NBA"
                },
                {
                    link: "/z/csl",
                    title: "中超"
                },
                {
                    link: "/z/afccl",
                    title: "亚冠"
                },
                {
                    link: "/z/cnmenfootball",
                    title: "国足"
                },
                {
                    link: "/z/womenfootball",
                    title: "女足"
                },
                {
                    link: "/z/live",
                    title: "直播"
                },
                {
                    link: "/z/football/cba",
                    title: "CBA"
                },
                {
                    link: "/z/football/7",
                    title: "欧冠"
                },
                {
                    link: "/z/football/17",
                    title: "英超"
                },
                {
                    link: "/z/football/8",
                    title: "西甲"
                },
                {
                    link: "/z/football/23",
                    title: "意甲"
                },
                {
                    link: "/z/football/34",
                    title: "法甲"
                },
                {
                    link: "/z/tennis",
                    title: "网球"
                },
                {
                    link: "/z/e_sport",
                    title: "电竞"
                },
                {
                    link: "/z/golf",
                    title: "高尔夫"
                },
                {
                    link: "/z/integrated",
                    title: "综合"
                },
                {
                    link: "/z/running",
                    title: "跑步"
                },
                {
                    link: "//m.sohu.com/v/",
                    title: "视频"
                }
            ]
        };
    }
};
</script>
<style lang="less">
.navs-wrap {
    background-color: #322f22;
    .nav-list {
        position: relative;
        clear: both;
        padding: 4px;
        .nav {
            float: left;
            width: 16.666666%;
            font-size: 17px;
            padding: 8px 0;
            text-align: center;
            color: #fff;
        }
    }
}
</style>


