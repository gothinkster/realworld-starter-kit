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
      <component-router
        location="${page}"
        routes="${{ '': 'route-home', login: 'route-sign-in', settings: 'route-settigns' }}"
      ></component-router>
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
