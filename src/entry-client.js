// 客户端 entry 只需创建应用程序，并且将其挂载到 DOM 中

import { createApp } from './app'

const { app, router } = createApp()
// 在可能的异步钩子和异步组件执行完成之后，再进行挂载。
router.onReady(() => {
    app.$mount('#app')
})