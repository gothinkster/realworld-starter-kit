import { html, define, render } from 'hybrids';
import { defaultArticles } from '../../store/reducers/shared';
import * as R from 'ramda';
import { connectEvent } from '../../core/factories';
import { preventDefault } from '../../core/attributes';

export const articleList = {
  articles: defaultArticles,
  onPageLinkClick: connectEvent((index) => ({ index })),
  render: render(
    ({ articles: { list, loading, page, pageAmount }, onPageLinkClick }) => html`
      ${R.map(renderArticle, list)}
      ${loading &&
      html`
        <div class="article-preview">
          Loading articles...
        </div>
      `}
      ${renderPagination(page, pageAmount, onPageLinkClick)}
    `,
    { shadowRoot: false },
  ),
};

function renderArticle(article) {
  return html` <home-article article="${article}"></home-article> `;
}

function renderPagination(page, pageAmount, onPageLinkClick) {
  return html`
    <nav>
      <ul class="pagination">
        ${R.times(renderPaginationlistItem(page, onPageLinkClick), pageAmount)}
      </ul>
    </nav>
  `;
}

function renderPaginationlistItem(page, onPageLinkClick) {
  return (index) => html`
    <li
      class="page-item${index === page ? ' active' : ''}"
      onclick="${() => onPageLinkClick(index)}"
    >
      <a class="page-link" href="" onclick="${preventDefault()}">${index + 1}</a>
    </li>
  `;
}

define('article-list', articleList); /* eslint-disable-line */
