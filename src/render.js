import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './react/routes';
import AppRouter from './react/serverRouter';
import createStore from './redux/store';
import stats from '../dist/stats.generated';

function assets(name) {
  const prefix = '/static/';
  if (name instanceof Array) {
    return prefix + name[0];
  }
  return prefix + name;
}

module.exports = (req, res, next) => {
  const store = createStore();
  const promises = [];
  const componentNames = [];
  const componentsPath = [];
  routes.some((route) => {
    const match = matchPath(req.path, route);
    if (match) {
      let component = require(`./react/${route.componentName}`); // eslint-disable-line
      if (component.default) {
        component = component.default;
      }
      componentNames.push(route.componentName);
      componentsPath.push(route.path);
      if (typeof component.getInitialProps === 'function') {
        promises.push(component.getInitialProps({
          req,
          res,
          next,
          match,
          store,
          dispatch: store.dispatch,
        }));
      }
    }
    return match;
  });

  Promise.all(promises).then((data) => {
    if (data[0] && data[0].redirectUrl) {
      res.writeHead(301, { Location: data[0].redirectUrl });
      res.end();
      return;
    }

    const context = { data };
    const html = ReactDOMServer.renderToString((
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <AppRouter />
        </StaticRouter>
      </Provider>
    ));

    if (componentsPath.length === 0 || componentsPath[0] === '*') {
      res.writeHead(404);
    } else {
      res.writeHead(200);
    }

    res.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Conduit</title>
          <!-- Import Ionicon icons & Google Fonts our Bootstrap theme relies on -->
          <link href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
          <link href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">
          <!-- Import the custom Bootstrap 4 theme from our hosted CDN -->
          <link rel="stylesheet" href="//demo.productionready.io/main.css">
        </head>
        <body>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState(), null, 2).replace(/</g, '\\u003c')};
            window.__GWT__ = "${(req.signedCookies.token || '').replace(/</g, '\\u003c')}";
          </script>
          <section id="app">${html}</section>
          <script src='${assets(stats.common)}'></script>
          ${componentNames.map(componentName => `<script src='${assets(stats[componentName])}'></script>`)}
    `);
    res.end();
  });
};
