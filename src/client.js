import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './react/clientRouter'; // eslint-disable-line
import createStore from './redux/store';
import { setHydrated } from './redux/services/hydrated';

const preloadedState = window.__PRELOADED_STATE__; // eslint-disable-line
delete window.__PRELOADED_STATE__; // eslint-disable-line
const store = createStore(preloadedState);

window.onload= () => store.dispatch(setHydrated()); // eslint-disable-line

hydrate(
  <AppContainer>
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('app') // eslint-disable-line
);

if (module.hot) {
  hot.module(AppRouter);
}