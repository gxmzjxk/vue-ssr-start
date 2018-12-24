import { createApp } from './app'

export default context => {
    // 因为可能会是异步路由钩子函数或组件，所以这里返回一个 Promise，
    // 以便于服务器能够在渲染前，所有内容已经准备就绪。

    return new Promise((resolve, reject) => {
        const { app, router } = createApp();

        // 设置 Server 端 router 的位置
        router.push(context.url)

        // 等到 router 将可能的异步组件和钩子函数解析完
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            // 匹配不到路由，执行 reject 函数，并返回 404
            if (!matchedComponents) {
                return reject({ code: 404 })
            }
            // 没有任何问题, pending to render app
            resolve(app)
        }, reject)
    })
}