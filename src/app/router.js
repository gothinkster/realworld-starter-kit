import { render, html } from 'hybrids';
import changePage, { loadApp } from './actions/app';
import { loadUser } from './actions/home';
import * as R from 'ramda';
import { connect } from './core/store';

export default {
  page: connect(({ app: { page } }) => page),
  render: render(
    ({ page }) => html`
      <component-router
        location="${page}"
        routes="${{
          '': 'route-home',
          login: 'route-sign-in',
          settings: 'route-settings',
          profile: 'route-profile',
        }}"
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
  if (R.pipe((x) => localStorage.getItem(x), R.isNil, R.not)('token')) {
    await loadUser();
  }
  loadApp();
  updateRoute();
}
