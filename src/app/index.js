import { html, render } from 'hybrids';

export default {
  render: render(
    () => html`
      <app-nav></app-nav>
      <app-router></app-router>
      <app-footer></app-footer>
    `,
    { shadowRoot: false },
  ),
};
