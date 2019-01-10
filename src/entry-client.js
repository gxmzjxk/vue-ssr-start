// 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态，
// 自动嵌入到最终的 HTML 中
import Vue from 'vue';
import 'es6-promise/auto';
import './assets/fonts/siconfont';
import { createApp } from './app';
import ProgressBar from './components/ProgressBar.vue';

// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount();
document.body.appendChild(bar.$el);

// 匹配要渲染的视图后，再获取数据
Vue.mixin({
    beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options;
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next);
        } else {
            next();
        }
    }
});

const { app, router, store } = createApp();

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
    // 添加路由钩子函数，用于处理 asyncData
    // 在初始路由 resolve 之后执行，通过diff,能够避免二次预取已有的数据
    // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to);
        const preMatched = router.getMatchedComponents(from);

        // 我们只关心 非预渲染的组件, 对比 它们， 找出两个匹配列表的差异组件
        // ？？这里 return diffed || (diffed = (preMatched[i] !== c)) 没看懂.
        let diffed = false;
        const actived = matched.filter((c, i) => {
            return diffed || (diffed = (preMatched[i] !== c));
        });

        const asyncDataHooks = actived.map(c => c.asyncData).filter(_ => _);

        if (!asyncDataHooks.length) {
            return next();
        }

        // 加载指示器(loading indicator)
        bar.start();
        Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
            .then(() => {
                bar.finish();
                next();
            })
            .catch(next);
    });

    // actually mount to DOM
    app.$mount('#app');
});

// service worker
if ('https:' === location.protocol && navigator.serviceWorker) {
    navigator.serviceWorker.register('/service-worker.js');
}