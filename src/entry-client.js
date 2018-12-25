// 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态，
// 自动嵌入到最终的 HTML 中
import Vue from 'vue'
import { createApp } from './app'

const { app, router, store } = createApp()

// 匹配要渲染的视图后，再获取数据
Vue.mixin({
    beforeMount() {
        const { asyncData } = this.$options
        if (asyncData) {
            this.dataPromise = asyncData({
                store: this.$store,
                route: this.$route
            })
        }
    },
    beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next)
        } else {
            next()
        }
    }
})

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

// 客户端数据预取 Client Data Fetching
router.onReady(() => {
    // 添加路由钩子函数，用于处理 asyncData
    // 在初始路由 resolve 之后执行，通过diff,能够避免二次预取已有的数据
    // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const preMatched = router.getMatchedComponents(from)

        // 我们只关心 非预渲染的组件, 对比 它们， 找出两个匹配列表的差异组件
        // ？？这里 return diffed || (diffed = (preMatched[i] !== c)) 没看懂.
        let diffed = false
        const actived = matched.filter((c, i) => {
            return diffed || (diffed = (preMatched[i] !== c))
        })

        if (!actived.length) {
            return next()
        }
        // 加载指示器(loading indicator)

        Promise.all(actived.map(c => {
            if (c.asyncData) {
                return c.asyncData({ store, route: to })
            }
        })).then(() => {
            // 停止指示器 (loading indicator)
            next()
        }).catch(next)
    })

    app.$mount('#app')
})