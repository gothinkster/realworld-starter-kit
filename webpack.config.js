const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const Visualizer = require('webpack-visualizer-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const distFolder = path.resolve(__dirname, 'dist')

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

const productionPlugins = [
    new webpack.optimize.SplitChunksPlugin(
      {
        splitChunks: {
          cacheGroups: {
              commons: {
                  name: "commons",
                  chunks: "initial",
                  minChunks: 2
              }
          }
      }
    }),
    new UglifyJsPlugin()
]

const devPlugins = []

const envPlugins = IS_PRODUCTION ? productionPlugins : devPlugins


// if (IS_PRODUCTION) {
//   console.log('************* PRODUCTION BUILD ***************')
// }


module.exports = {
  mode: IS_PRODUCTION ? 'production' : 'development',
  node: false,
  entry: './src/index.js',
  output: {
    path: distFolder,
    filename: '[name].bundle.js',
    chunkFilename: 'app-[name].bundle.js'
  },
  resolve: {
    alias: {
      'slim-js/Decorators$': path.resolve(
        __dirname,
        './node_modules/slim-js/Decorators.js'
      ),
      'slim-js': path.resolve(__dirname, './node_modules/slim-js/src/Slim.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
    ],
  },
  devtool: IS_PRODUCTION ? false : 'source-map',
  target: 'web',
  stats: 'errors-only',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: distFolder + '/assets',
      },
      {
        from: 'src/favicon.ico',
        to: distFolder,
      },
    ]),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Development',
    }),
    ...envPlugins
  ],
}
