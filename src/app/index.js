import { html, render } from 'hybrids';

export default {
  render: render(
    () => html`
      <app-nav></app-nav>
      <app-footer></app-footer>
    `,
    { shadowRoot: false },
  ),
};
