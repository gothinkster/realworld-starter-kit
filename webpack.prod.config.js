//webpack and its dependencies
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//package.json to pull in the project title
var pjson = require('./package.json');

module.exports = {
    entry: [
        './src/index.jsx'
    ],
    module: {
        loaders:[
        {
            test: /\.scss$/,
            loaders: ["style", "css?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]", "sass"]
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
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'node_modules/html-webpack-template/index.html',
            title: pjson.name,
            appMountId: 'app'
        })
    ]
};
