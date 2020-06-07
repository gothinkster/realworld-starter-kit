import { render, html } from 'hybrids';
import store from './store';
import changePage, { loadApp } from './actions/app';
import { loadUser } from './actions/home';
import * as R from 'ramda';

const connect = (store, mapState) => ({
  get: mapState ? () => mapState(store.getState()) : () => store.getState(),
  connect: (_, __, invalidate) => store.subscribe(invalidate),
});

export default {
  page: connect(store, ({ app: { page } }) => page),
  render: render(
    ({ page }) => html`
      ${page === ''
        ? html`
            <route-home></route-home>
          `
        : page === 'login'
        ? html`
            <route-sign-in></route-sign-in>
          `
        : page === 'settings'
        ? html`
            <route-settings></route-settings>
          `
        : html`
            <h1>404</h1>
          `}
    `,
    { shadowRoot: false },
  ),
};

/* eslint-disable */
window.addEventListener('hashchange', updateRoute);
window.addEventListener('load', load);

function updateRoute() {
  changePage(window.location.hash.length === 0 ? '' : window.location.hash.split('#/')[1]);
}

async function load() {
  if (R.pipe(x => localStorage.getItem(x), R.isNil, R.not)('token')) {
    await loadUser();
  }
  loadApp();
  updateRoute();
}
