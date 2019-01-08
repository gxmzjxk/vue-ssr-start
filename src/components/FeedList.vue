<template>
    <div class="feed-list-wrap" ref="feed_list" :data-spm="spmCCode">

    </div>
</template>
<script>
export default {
    props: {
        spmCCode: {
            default: 'fd-d',
            type: String
        },
    }
};
</script>

<style lang="less">
.feed-list-wrap {
    position: relative;
    .tt {
        padding: 15px 13px 6.5px;
        font-size: 18px;
        font-weight: bold;
    }
    .loading-area {
        padding: 8px 0;
    }
    .toutiao-area {
        .feed-list {
            .feed-item:last-of-type {
                border-bottom: none;
            }
        }
    }
}
</style>