var webpack = require('webpack');

module.exports = {
	context: __dirname,
	entry: "./src/app/app.js",
	output: {
		path: __dirname + "/src/build",
		filename: "bundle.js"
	},
	devServer: {
		disableHostCheck: true,   // That solved it
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin()
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
				loader: 'style-loader'
			}, 
			{
				test: /\.css$/,
				loader: 'css-loader',
				query: {
					modules: true,
					localIdentName: '[name]__[local]___[hash:base64:5]'
				}
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader'
			}
		]
	}
	
}

