import { render, html } from 'hybrids';
import store from './store';

const connect = (store, mapState) => ({
  get: mapState ? () => mapState(store.getState()) : () => store.getState(),
  connect: (_, __, invalidate) => store.subscribe(invalidate),
});

export default {
  page: connect(store, ({ app: { page } }) => page),
  render: render(
    ({ page }) => html`
      ${page === 'home'
        ? html`
            <route-home></route-home>
          `
        : html`
            <h1>404</h1>
          `}
    `,
    { shadowRoot: false },
  ),
};
