const Vue = require('vue')
const server = require('express')()
const createRenderer = require('vue-server-renderer').createRenderer;

// 使用模板, 模板还支持简单的插值。语法使用 Vue 语法
const renderer = createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})


server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>这是通过Template 方式访问，URL 是： {{ url }}</div>`
  })
  const context = {
    title: 'Hello, Vue SSR',
    meta: `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    `
  }
  // renderToString(vm: Vue, context: object, callback: RenderCallback): void;

  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})

server.listen(8080)