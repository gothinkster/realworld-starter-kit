//webpack and its dependencies
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        './src/index.js'
    ],
    module: {
        preLoaders: [
            {
                test: /\.json$/, 
                exclude: /node_modules/,
                loader: 'json'
            }
        ],
        loaders:[
            {
             test: /\.png$/,
             exclude: /node_modules/,
             loader: 'url-loader'
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]", "sass"]
            },
            {
                test: /\.js$/,
                // exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015'
            },
            {
                test: /\.tff?$/,
                exclude: /node_modules/,
                loader: 'file-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};
