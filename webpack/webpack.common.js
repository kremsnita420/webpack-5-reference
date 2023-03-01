const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
	entry: './src/js/index.js',
	output: {
		path: path.resolve(__dirname, '../dist'),
		clean: true,
	},
	module: {
		// Generating html file
		rules: [
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/template.html',
		}),
		// new CleanWebpackPlugin({
		// 	cleanOnceBeforeBuildPatterns: [
		// 		'**/*',
		// 		path.join(process.cwd(), 'build/**/*'),
		// 	],
		// }),
	],
};

module.exports = config;
