//webpack and its dependencies
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//package.json to pull in the project title
var pjson = require('./package.json');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index.jsx'
    ],
    module: {
        loaders:[
        {
            test: /\.scss$/,
            loaders: ["style", "css?sourceMap&modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]", "sass?sourceMap"]
        },
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'react-hot!babel'
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
