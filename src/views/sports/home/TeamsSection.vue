<template>
    <div class="plugin-section">
        <div class="teams-section" v-show="hasData" data-spm="tm-a">
            <div class="tt-wrap" v-if="title">
                <div class="tt">{{title}}</div>
            </div>
            <section class="area">
                <template v-for="(item, index) in teams">
                    <a :href="item.link" :key="index">
                        <div class="team">
                            <div class="flag" v-lazy:background-image="item.flag"></div>
                            <div class="name">{{item.teamname}}</div>
                        </div>
                    </a>
                </template>
            </section>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            hasData: true,
            teams: [],
            title: ''
        };
    },
    methods: {
        getData() {

        }
    },
    created() {
        this.hasData = this.teams.length > 0;
    },
};
</script>
<style lang="less" scoped>
.teams-section {
    position: relative;
    margin-top: -1px;
    border-top: 5px solid #e8e8e8; /*no*/
    border-bottom: 5px solid #e8e8e8; /*no*/
    .tt-wrap {
        padding: 0 15px;
        .tt {
            display: flex;
            padding-top: 10px;
            font-size: 15px;
            font-weight: bold;
        }
        .close {
            position: absolute;
            right: 10px;
            padding: 5px;
            top: 2px;
            font-size: 18px;
            color: #aaa;
        }
    }

    .area {
        padding: 15px 0;
        overflow: hidden;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        white-space: nowrap;
        font-size: 0;
        &::-webkit-scrollbar {
            display: none;
        }
        // 球队
        .team {
            display: inline-block;
            margin: 0 20px;
            text-align: center;
            .flag {
                position: relative;
                margin: 0 auto;
                width: 40px;
                height: 40px;
                background-repeat: no-repeat;
                background-position: center center;
                background-size: cover;
            }
            .name {
                padding-top: 8px;
                font-size: 13px;
            }
        }
    }
}
</style>