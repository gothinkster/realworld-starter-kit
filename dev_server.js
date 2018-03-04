const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cookieEncrypter = require('cookie-encrypter');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackClientDevMiddleware = require('webpack-dev-middleware');
const webpackClientHotMiddleware = require('webpack-hot-middleware');
const webpackClientConfig = require('./webpack/config.client');
const serverConfig = require('./webpack/config.server');
const api = require('./src/api/routes');

const serverCompiler = webpack(serverConfig);
const clientCompiler = webpack(webpackClientConfig);
const port = Number(process.env.PORT) || 3000;
const app = express();
const nodeEnv = process.env.NODE_ENV || 'development';

const serverPath = path.resolve(__dirname, './dist/render.bundle.js');
let render = require(serverPath); // eslint-disable-line import/no-dynamic-require


app.set('env', nodeEnv);
app.use(cookieParser('change secret value'));
app.use(cookieEncrypter('change secret value'));
app.use(bodyParser.json());
app.use('/api', api);

app.use(webpackClientDevMiddleware(clientCompiler, {
  publicPath: webpackClientConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
  historyApiFallback: true,
}));

app.use(webpackClientHotMiddleware(clientCompiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10000,
}));

app.use('/api', api);

app.use('/', (req, res, next) => render(req, res, next));

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});

function clearCache() {
  const cacheIds = Object.keys(require.cache);

  cacheIds.forEach((id) => {
    if (id === serverPath) {
      delete require.cache[id];
    }
  });
}

function onServerChange(err, stats) {
  if (err || (stats.compilation && stats.compilation.errors && stats.compilation.errors.length)) {
    console.log('Server bundling error:', err || stats.compilation.errors);
  }
  clearCache();
  try {
    render = require(serverPath); // eslint-disable-line import/no-dynamic-require, global-require
  } catch (ex) {
    console.log('Error detecded', ex);
  }
}

function watch() {
  const compilerOptions = {
    aggregateTimeout: 300,
    poll: 150,
  };

  serverCompiler.watch(compilerOptions, onServerChange);
}

watch();
