/* eslint-disable */

import { render, define } from 'hybrids';

export const componentRouter = {
  location: '',
  routes: {},
  render: render(
    ({ location }) => ({ location, routes }, target) => {
      target.innerHTML = '';

      const entries = Object.entries(routes);
      const entry = entries.find(([url]) =>
        location.match(new RegExp(`^(${url})(\\/[\\s\\S]*)?$`)),
      );

      if (entry !== null && entry !== undefined) {
        const element = document.createElement(entry[1]);
        element.location = location.split(entry[0] + '/')[1];
        target.appendChild(element);
      }
    },
    { shadowRoot: false },
  ),
};

define('component-router', componentRouter); /* eslint-disable-line */
