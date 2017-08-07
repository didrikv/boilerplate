var webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	context: __dirname,
    entry: './src/app/index.js',
	output: {
		path: __dirname + "/src/build",
		filename: "bundle.js",
        libraryTarget: 'umd'
	},
	devServer: {
		disableHostCheck: true,   // That solved it
		historyApiFallback: true,
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new CompressionPlugin(),
		new ExtractTextPlugin({
			  filename: 'styles.css',
			  allChunks: true
			}),
	],
	module: {
		rules: [
			{
				test:/\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader:'babel-loader',
				query: {
					presets:['react', 'es2015', 'stage-0'],
				}
			},
			{
				test: /\.css$/,
					use: [
						{ loader: 'style-loader' },
						{
							loader:'css-loader',
							options: {
								modules: true,
								localIdentName: '[path][name]__[local]--[hash:base64:5]',
							}
						}
					],
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader'
			}
		]
	}
	
}

