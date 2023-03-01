const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');
const glob = require('glob');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const PATHS = {
	src: path.join(__dirname, '../src'),
};

module.exports = merge(common, {
	mode: 'production',
	output: {
		filename: 'js/[name].[contenthash:12].js',
	},
	optimization: {
		minimize: true,
		minimizer: [
			`...`,
			new CssMinimizerPlugin({
				minimizerOptions: {
					preset: [
						'default',
						{
							discardComments: { removeAll: true },
						},
					],
				},
			}),
		],
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /\.module\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
								localIdentName: '[hash:base64]',
							},
						},
					},
				],
			},
			{
				test: /\.less$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
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
					filename: './images/[name].[contenthash:12][ext]',
				},
				// Optimize images
				use: {
					loader: 'image-webpack-loader',
					options: {
						mozjpeg: {
							quality: 40,
						},
						pngquant: {
							quality: [0.65, 0.9],
							speed: 4,
						},
					},
				},
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:12].css',
		}),
		new PurgeCSSPlugin({
			paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
		}),
	],
});
