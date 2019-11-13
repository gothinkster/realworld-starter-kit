import { render, html } from 'hybrids';
import { changeTab } from '../../actions/home';
import * as R from 'ramda';

export default {
  tags: [],
  render: render(
    ({ tags }) => html`
      <div class="sidebar">
        <p>Popular Tags</p>

        <div class="tag-list">
          ${R.map(renderTag, tags)}
        </div>
      </div>
    `,
    { shadowRoot: false },
  ),
};

function renderTag(tag) {
  return html`
    <a href="#/" onclick="${() => changeTab(`#${tag}`)}" class="tag-pill tag-default">
      ${tag}
    </a>
  `;
}
