const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    entry: {
        app: "./src/app.js",
        index: "./src/index.html",
    },

	output: {
		filename: '[name].js',
		path: __dirname + "/dist/"
	},

	module: {
		rules: [
            {
                test: /\.html$/,
                loader: "file-loader?name=[name].[ext]",
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query  :{
                    presets:['react','es2015']
                }
            },
			{
				test: /\.(scss|css)$/,

				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					],
					fallback: 'style-loader'
				})
			}
		]
	},

	plugins: [
		new ExtractTextPlugin('styles.[contentHash].css')
	]
};
