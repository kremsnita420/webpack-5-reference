const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
	mode: 'development',
	output: {
		filename: 'bundle.js',
	},
	devServer: {
		port: 9000,
		static: {
			directory: path.resolve(__dirname, '../dist'),
		},
		devMiddleware: {
			index: 'index.html',
			writeToDisk: true,
		},
		client: {
			overlay: true,
		},
		liveReload: false,
	},
	module: {
		rules: [
			// Css loading
			{
				test: /\.css$/,
				exclude: /\.module\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			// Css modules loading
			{
				test: /\.css$/,
				include: /\.module\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[local]--[md4:hash:7]',
							},
						},
					},
				],
			},
		],
	},
});
