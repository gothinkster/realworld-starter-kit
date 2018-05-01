const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const distFolder = path.resolve(__dirname, 'dist')

module.exports = {
  entry: './src/index.js',
  output: {
    path: distFolder,
    filename: '[name].bundle.js',
  },
  resolve: {
    alias: {
      'slim-js/Decorators$': path.resolve(
        __dirname,
        './node_modules/slim-js/Decorators.js'
      ),
      'slim-js': path.resolve(__dirname, './node_modules/slim-js/src/Slim.js'),
      // 'slim-js': path.resolve(__dirname, './src/Slim.js'),
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
  devtool: 'source-map',
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
    new BundleAnalyzerPlugin(),
    process.NODE_ENV === 'production' ? new UglifyJsPlugin() : () => {},
  ],
}
