import React from 'react';
import { Route, Switch } from 'react-router';
import routes from './routes';
import Loadable from 'react-loadable';
import Layout from './components/layout';

export default () => (
  <Layout>
    <Switch>
      {
        routes.map(props => {
          props.component = Loadable({ // eslint-disable-line  no-param-reassign
            loader: () => import(`./${props.componentName}`), // eslint-disable-line
            loading: () => null,
            delay: 0,
            timeout: 10000,
          });
          return <Route key={props.path} {...props}/>; // eslint-disable-line react/prop-types
        })
      }
    </Switch>
  </Layout>
);
