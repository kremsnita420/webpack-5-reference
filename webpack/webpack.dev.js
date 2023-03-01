const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
	mode: 'development',
	output: {
		filename: 'js/[name].[contenthash:12].js',
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
			{
				test: /\.css$/,
				exclude: /\.module\.css$/,
				use: ['style-loader', 'css-loader'],
			},
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
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader'],
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:12].css',
		}),
	],
});
