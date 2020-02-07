const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: {
		app: "./src/copy-to-clipboard.directive.js"
	},
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "[name].min.js"
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: [
				'ng-annotate-loader',
				'babel-loader',
			],
			exclude: /node_modules/,
		}]
	}
};
