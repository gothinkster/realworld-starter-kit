//webpack and its dependencies
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//package.json to pull in the project title
var pjson = require('./package.json');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8000',
        'webpack/hot/only-dev-server',
        './src/index.jsx'
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
                exclude: /node_modules/,
                loaders: ["style", "css?sourceMap&modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]", "sass?sourceMap"]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'react-hot!babel'
            },
            {
                test: /\.tff$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dev_build',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dev_build',
        port: 8000,
        noInfo: true,
        open: true,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'node_modules/html-webpack-template/index.html',
            title: pjson.name,
            appMountId: 'app'
        })
    ]
};
