
'use strict';
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');
// const isProd = process.env.NODE_ENV === 'production'

module.exports = {
	build: {
		env: require('./prod.env'), // 生产环境 - 环境变量
		port: 6080, // 生产环境 - 端口号
		assetsRoot: path.resolve(__dirname, '../dist'), // 静态资源 - 根路径
		assetsSubDirectory: 'static', // 静态资源 - 子路径
		assetsPublicPath: '/', // Todo: 静态资源发布CDN之后的地址
		productionSourceMap: false, // 生产环境是否开启 SourceMap
		proxyTable: {}, // 生产环境 - 代理
	},
	dev: {
		env: require('./dev.env'), // 开发环境 - 环境变量
		port: 6080, // 开发环境 - 端口号
		autoOpenBrowser: true, // 开发环境 - 是否自动打开浏览器
		assetsSubDirectory: 'static', // 静态资源 - 子路径
		assetsPublicPath: '/', // 静态资源 - 子路径
		proxyTable: {}, // 开发环境 - 代理
	}
};
