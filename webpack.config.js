var webpack = require('webpack');

module.exports = {
	context: __dirname,
	entry: "./src/app/app.js",
	output: {
		path: __dirname + "/src/build",
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test:/\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader:'babel-loader',
				query: {
					presets:['react', 'es2015', 'stage-0'],
				}
			}
		]
	}
	
}

