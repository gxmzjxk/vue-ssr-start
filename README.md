## BNB-Vue-SSR
这是一个基于 `VUE-HACKERNEWS`-2.0 改造的脚手架，旨在一步一步打造一个完整的 `Vue`服务端渲染的脚手架，覆盖移动端 `Web App` 绝大多数使用场景

## How to use
1. `git clone git@github.com:gxmzjxk/vue-ssr-start.git`
2. `cd vue-ssr-start`
3. `cnpm i` or `npm i` or `yarn install`
4. `npm run dev`
5. 访问： `localhost:6080/z`
6. production环境，先执行 `npm run build`, 再 `npm start`

## 特性 `Feature`
#### 字体图标自动构建
利用 `webfonts-loader`(基于 `webfonts-generator`), 将`SVG`字体图标进行全自动化管理，新增一个字体图标只需将符合尺寸的`svg`拷贝进 `src/assets/fonts/svg` 目录下即可

#### 移动端响应式适配
1. 借鉴`lib-flexible` 的方案，在页面初始化时获取设备尺寸，动态设置根节点的`font-size`, 再借助 `px2rem-loader` 后处理 `CSS` 转成`rem`, 实现响应式
2. 引入 `postcss-loader`，解决不同版本 `CSS` 写法兼容，可以放心地使用最新`CSS`规范写法(部分特性如`flex-wrap`: `wrap` 等需自行考虑最低适配设备)
3. 项目统一使用 `less` 管理样式 (契合模块化的思想，写法简单优雅)，并使用`sass-resources-loader`将最常用的如 `.ellipsis/.line-clamp` 等样式实现，全局注入每一个`less`文件
> 后续会解决因为使用 Vue style scoped 导致无法 `shaking` 的问题。

#### 开发环境 `client` 和 `server` 热更新
1. 静态资源利用 `webpack-hot-middleware`和`webpack-dev-middleware`实现热更新
2. `vue-ssr-client-manifest.json` 利用 `webpack`的钩子函数，再构建完成时，更新清单文件
3. `vue-ssr-server-bundle.json` 利用 `memory-fs`, 通过 `webpack(serverConfig).watch()` 去更新服务端的 `bundle` 文件。

#### 服务端 `data-preFetch`，
1. 在组件中编写约定的 `asyncData`，`server` 端在 `router resolved` 之前会调用该函数并拿到结果
2. 引入 `Vuex`，通过 `state` 连通 `server` 和 `client` 的数据

#### 代码拆分
1. 构建出分目录的静态 `js/images`，更利于维护
2. 使用 `webpack` 推荐配置 `optimization` 抽离公共代码

#### ESlint
1. 解决过IE8的BUG，听闻过无分号可能压缩导致的BUG，其他变成语言对分号的认同，还是把分号引入ESlint
……

#### 其他
1. 支持最新的 `Node.js`, `webpack@4`, `ES6`, `部分 ES7`
2. `HTTPS` 下现代浏览器支持 `Service Worker`
3. 使用 静态资源 `contenthash`，便于开启 `longtime cache`

## TBD
##### CSS 提取问题
1. CSS 提取的主要好处就是为了启用 `longtime cache`，便于浏览器进行缓存
2. 在 `SSR` 项目中，`inline-css` 会在浏览器渲染的时候已经准备好了，无需再次发送请求，可以显著加快页面呈现速度
3. `mini-css-extract-plugin` 不支持SSR, 会报`document is not defined` 的问题，可以通过`css-loader/locals` 或者 `null-loader`, 或者`client`和`server`分别配置的方式解决，但均不优雅
4. 不提取 `css`, 能够将 `js-component` 组件化的思想实现得更纯粹，类似 `css in js`.
> 等待在更好的时机下，再引入 mini-css-extract-plugin

#### Server 缓存
- View cache
- API cache
- component cache

#### 单元测试
因为是`SSR`项目，一个小小的错误很可能被放大，导致服务崩溃，关键组件和`API`必须加入单元测试

#### 容灾
1. 添加容灾处理，在内存占用到达阈值时，强制清空暂时无关的内存占用
2. 使用`Docker`技术，在服务崩溃的时候能热切换，在负载过高时添加机器
3. 降级处理：在服务端没有处理能力时，将渲染和请求全部转发到浏览器端

#### 完善的日志系统
1. Render error: 获取数据超时，Vue-Object 占用内存过大导致服务器超过负载
2. API 相关: API timeout, API Error……
3. bundle 相关: 构建出来的 bundle 文件不完整，有错误，有路径依赖问题……

#### PC 端适配的问题
目前脚手架是基于移动端的，今后会再开启新的 `desktop` 分支，专门针对 PC 进行适配

#### IE8 兼容问题
需要在客户端放弃`Vue-core`，改用`jQuery`或者类`Vue`语法的库重新实现交互，服务端只负责渲染输出`HTML`（Dom Node）
> 由于是基于 Vue的 SSR 方案，而 Vue 天生不支持 IE8, 目前不考虑支持，预计会在下一个 React SSR 脚手架中支持


## 项目结构
```
├── README.md                       Readme
├── build                           存放打包相关的配置
│   ├── setup-dev-server.js         启动开发环境Dev Server, 热更新相关代码
│   ├── utils.js                    构建时需要用到的一些工具函数
│   ├── webpack.base.js             client 和 server 通用配置
│   ├── webpack.client.js           client 专属打包配置
│   └── webpack.server.js           server 专属打包配置
├── config                          存放目录资源，以及构建发布，环境变量等等配置
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── dist                            构建完成的资源存放路径
│   ├── service-worker.js
│   ├── static
│   ├── vue-ssr-client-manifest.json
│   └── vue-ssr-server-bundle.json
├── package.json                    管理项目依赖外部模块
├── server.js                       服务主入口
├── src                             源码目录
│   ├── App.vue                     起始 Vue-component，可以理解成 Vue 的 root Component
│   ├── _utils                      工具函数/方法
│   ├── ad                          广告相关代码
│   ├── app.js                      Vue app 入口文件
│   ├── assets                      源静态资源
│   ├── components                  通用组件
│   ├── constant.js                 全局变量
│   ├── entry-client.js             客户端专属入口
│   ├── entry-server.js             服务端专属入口
│   ├── index.template.html         html-webpack-plugin 生成丰富页面的 模板
│   ├── router                      前后端同构路由
│   ├── store                       前后端同构 Store(Vuex)
│   └── views                       页面相关：存放跟特定页面直接相关的Vue组件，如多个页面复用，请提出来放到 components 中
└── static                          webpack不进行处理的静态资源
    ├── logo-120.png
    ├── logo-144.png
    ├── logo-152.png
    ├── logo-192.png
    ├── logo-256.png
    ├── logo-384.png
    ├── logo-48.png
    └── logo-512.png
```

## 参考
[Vue.js Server-Side Rendering Guide](https://ssr.vuejs.org/)

[vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0/)
