'use strict';
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const config = require('../config');

// 组装 最终静态资源 路径
const assetsPath = function (_path) {
    const assetsSubDirectory = isProd ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path);
};

exports.assetsPath = assetsPath;

// 处理 less 样式文件
exports.lessLoaders = function (opt = {}) {
    return [
        {
            loader: 'vue-style-loader'
        },
        {
            loader: 'css-loader?importLoaders=1',
            options: {}
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: () => [require('autoprefixer')({
                    browsers: ['Android >= 4.0', 'IOS >= 6.0', 'last 2 versions']
                })],
            }
        },
        {
            loader: 'px2rem-loader',
            options: {
                remUnit: 37.5,
                baseDpr: 1
            }
        },
        {
            loader: 'less-loader',
            options: {}
        },
        {
            loader: 'sass-resources-loader',
            options: {
                resources: [
                    path.resolve(__dirname, '../src/assets/style/global.less'),
                ]
            }
        }
    ];
}

// 生成 字体文件 loader
exports.fontsLoader = function (opt = {}) {
    return [
        'vue-style-loader',
        'css-loader',
        {
            loader: 'webfonts-loader',
            options: isProd ? {
                fileName: assetsPath('img/[fontname]-[hash:7].[ext]')
            } : {}
        }
    ];
};
