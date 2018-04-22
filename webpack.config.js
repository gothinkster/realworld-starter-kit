const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const distFolder = path.resolve(__dirname, 'dist')

module.exports = {
    entry: './src/index.js',
    output: {
        path: distFolder,
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.(scss|css|sass)$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.html?$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    {
                        loader: 'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
                        query: {
                            mozjpeg: {
                              progressive: true,
                            },
                            gifsicle: {
                              interlaced: false,
                            },
                            optipng: {
                              optimizationLevel: 4,
                            },
                            pngquant: {
                              quality: '75-90',
                              speed: 3,
                            },
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'source-map',
    target: 'web',
    stats: 'errors-only',
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        // new CopyWebpackPlugin([
        //     {
        //         from: 'src/assets',
        //         to: distFolder + '/assets'
        //     }
        // ]),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'Development'
        })
    ]
}