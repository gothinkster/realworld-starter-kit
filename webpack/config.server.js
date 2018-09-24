const path = require('path');
const nodeExternals = require('webpack-node-externals');

const externalFolder = new RegExp(`^${path.resolve(__dirname, '../src')}/(react|redux)/.*$`);
const nodeEnv = process.env.NODE_ENV || 'development';
const isDevelopment = nodeEnv === 'development';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  name: 'server',
  devtool: isDevelopment ? 'eval' : false,
  entry: './src/render.js',
  target: 'node',
  bail: !isDevelopment,
  externals: [
    nodeExternals(),
    function externals(context, request, callback) {
      if (request === module.exports.entry
        || externalFolder.test(path.resolve(context, request))) {
        return callback();
      }
      return callback(null, `commonjs2 ${request}`);
    },
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'render.bundle.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: [/node_modules/],
      use: 'babel-loader?retainLines=true',
    }],
  },
};
