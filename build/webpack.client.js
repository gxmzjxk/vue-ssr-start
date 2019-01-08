const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const utils = require('./utils');
const config = require('../config');

const isProd = process.env.NODE_ENV === 'production';

const clientConfig = merge(base, {
    entry: {
        app: './src/entry-client.js'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: isProd ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: utils.assetsPath('js/[name].[chunkhash:7].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash:7].js')
    },
    plugins: [
        // strip dev-only code in Vue source
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        }),
        new VueSSRClientPlugin(),
    ],
    optimization: {
        splitChunks: {
            chunks: "all"
        },
    }
});

if (process.env.NODE_ENV === 'production') {
    clientConfig.plugins.push(
        // auto generate service worker
        new SWPrecachePlugin({
            cacheId: 'vue-hn',
            filename: 'service-worker.js',
            minify: true,
            dontCacheBustUrlsMatching: /./,
            staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
            runtimeCaching: [
                {
                    urlPattern: '/',
                    handler: 'networkFirst'
                },
                {
                    urlPattern: /\/(top|new|show|ask|jobs)/,
                    handler: 'networkFirst'
                },
                {
                    urlPattern: '/item/:id',
                    handler: 'networkFirst'
                },
                {
                    urlPattern: '/user/:id',
                    handler: 'networkFirst'
                }
            ]
        })
    )
}

module.exports = clientConfig;