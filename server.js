const express = require('express');
const cookieParser = require('cookie-parser');
const cookieEncrypter = require('cookie-encrypter');
const bodyParser = require('body-parser');
const apicache = require('apicache');
const api = require('./src/api/routes');
const render = require('./dist/render.bundle.js');
const morgan = require('morgan');

const port = Number(process.env.PORT) || 3000;
const app = express();

const nodeEnv = process.env.NODE_ENV || 'development';
app.use(morgan('method :url :status :res[content-length] - :response-time ms'));
const cache = apicache.options({
  appendKey: req => req.get('Authorization'),
  defaultDuration: 1000,
  headerBlacklist: ['Authorization', 'authorization'],
}).middleware;

app.set('env', nodeEnv);
app.use(cookieParser('change secret value'));
app.use(cookieEncrypter('change secret value'));
app.use(bodyParser.json());
app.use('/api', api);
app.use('/static', express.static('dist'));
app.use('/api', api);
app.use('/', cache(1000), render);

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
