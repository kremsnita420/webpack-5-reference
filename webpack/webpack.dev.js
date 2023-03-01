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
			// CSS loader
			{
				test: /\.css$/,
				exclude: /\.module\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			// CSS modules loader
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
			// CSS less loader
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader'],
			},
			// SCSS loader
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			// Images file loader
			{
				test: /\.(png|jpg|svg)$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						// If the size of asset is less tha 10kb make it inline
						maxSize: 10 * 1024,
					},
				},
				generator: {
					filename: './images/[name][ext]',
				},
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:12].css',
		}),
	],
});
