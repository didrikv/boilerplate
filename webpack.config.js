const env = process.env.NODE_ENV
const webpack = require('webpack')
const merge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const NpmInstallPlugin = require('npm-install-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

let titles = ['Attraktivitetsanalyser', 'Næringsindeksen', 'Norsk kulturindeks', 'Regional analyser']
let html = ['attraktivitet', 'naring', 'kultur', 'regional'].map( (chunk, i) => 
	new HtmlWebpackPlugin({
		title: titles[i],
		links: [
			"https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css",
			"https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css",
			"https://fonts.googleapis.com/css?family=EB+Garamond|Open+Sans",
		],
		template: './index.ejs',
		filename: chunk + '/index.html',
		chunks: chunk == 'regional' ? [ chunk ] : [chunk, 'commons'],
		appMountId: 'root',
		alwaysWriteToDisk: true,
		inject: false,
	})
)

var config = {
	context: __dirname,
	entry: {
		attraktivitet: ['babel-polyfill', './attraktivitet/index.js'],
		naring: ['babel-polyfill', './naring/index.js'],
		kultur: ['babel-polyfill', './kultur/index.js'],
		regional: ['babel-polyfill', './regional/index.js']
	},
	plugins: html.concat([ 
		new HtmlWebpackHarddiskPlugin()
	]),
	output: {
		filename: '[name]/[hash].bundle.js',
		path: __dirname + '/public',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['react', 'es2015', 'stage-0']
				}
			},
			{
				test: /\.css$/,
				include: __dirname + '/node_modules',
				use: [
					{ loader: 'style-loader' },
					{
						loader:'css-loader',
					}
				],
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
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

var production = {
	plugins: [
		new NpmInstallPlugin(),
		new ExtractTextPlugin({
			filename: 'style.css',
			allChunks: true
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV' : JSON.stringify('production')
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "commons",
			filename: "[hash].commons.js",
			chunks: ['attraktivitet', 'naring', 'kultur'],
			minChunks: 2
		}),
		new CompressionPlugin(),
		new CleanWebpackPlugin(['public']),
		new FaviconsWebpackPlugin('./logo/my-logo.png')
	]
}

var develompent = {
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	devtool: 'inline-source-map',
	devServer: {
		historyApiFallback: true,
		overlay: true
	}
}

if(env == 'production') {
	module.exports = merge(config, production)
} else { 
	module.exports = merge(config, develompent)
}


		
