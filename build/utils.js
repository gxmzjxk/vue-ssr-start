'use strict';
const path = require('path');
const config = require('../config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const assetsPath = function(_path){
	const assetsSubDirectory = process.env.NODE_ENV === 'production'
		? config.build.assetsSubDirectory
		: config.dev.assetsSubDirectory;
	return path.posix.join(assetsSubDirectory, _path);
};

exports.assetsPath = assetsPath;

exports.cssLoaders = function(options){
	options = options || {};

	const cssLoader = {
		loader: 'css-loader?importLoaders=1',
		options: {
			minimize: process.env.NODE_ENV === 'production',
			sourceMap: options.sourceMap
		}
	};
	const px2remLoader = {
		loader: 'px2rem-loader',
		options: {
			remUnit: 37.5,
			baseDpr: 1
		}
	};
	const postCssLoader = [
		require('autoprefixer')({
			browsers: ['Android >= 4.0', 'IOS >= 6.0', 'last 2 versions']
		}),

	];

	// generate loader string to be used with extract text plugin
	function generateLoaders(loader, loaderOptions){
		const loaders = [cssLoader, px2remLoader];
		if (loader){
			loaders.push({
				loader: loader + '-loader',
				options: Object.assign({}, loaderOptions, {
					sourceMap: options.sourceMap
				})
			});
			// 引入 Global less 变量
			loaders.push({
				loader: 'sass-resources-loader',
				options: {
					resources: [
						path.resolve(__dirname, '../src/assets/style/global.less'),
					]
				}
			});
		}

		// Extract CSS when that option is specified
		// (which is the case during production build)
		if (options.extract){
			return ExtractTextPlugin.extract({
				use: loaders,
				fallback: 'vue-style-loader'
			});
		} else {
			return ['vue-style-loader'].concat(loaders);
		}
	}

	// https://vue-loader.vuejs.org/en/configurations/extract-css.html
	return {
		css: generateLoaders(),
		postcss: postCssLoader,
		less: generateLoaders('less'),
		sass: generateLoaders('sass', { indentedSyntax: true }),
		scss: generateLoaders('sass'),
		stylus: generateLoaders('stylus'),
		styl: generateLoaders('stylus')
	};
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options){
	const output = [];
	const loaders = exports.cssLoaders(options);
	for (const extension in loaders){
		const loader = loaders[extension];
		output.push({
			test: new RegExp('\\.' + extension + '$'),
			use: loader
		});
	}
	return output;
};

exports.fontsLoader = function(){
	let config = {};
	if (process.env.NODE_ENV === 'production'){
		config = ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: [
				{
					loader: 'css-loader'
				},
				{
					loader: 'webfonts-loader',
					options: {
						fileName: assetsPath('img/[fontname]-[hash:8].[ext]')
					}
				}
			]
		});
	} else {
		config = [
			'style-loader',
			'css-loader',
			{
				loader: 'webfonts-loader',
			}
		];
	}
	return config;

};
