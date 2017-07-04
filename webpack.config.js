var webpack = require('webpack');

module.exports = {
	context: __dirname,
	entry: "./src/app/app.js",
	output: {
		path: __dirname + "/src/build",
		filename: "bundle.js"
	},
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
			}
		]
	}
	
}

