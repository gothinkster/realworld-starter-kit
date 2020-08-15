import { render, html } from 'hybrids';
import * as R from 'ramda';
import { loadPage, changeTab, loadTagPage } from '../../actions/home';
import { connect } from '../../core/store';

export default {
  home: connect(({ home }) => home),
  render: render(
    ({ home: { tags, articles, tab } }) => html`
      <div class="home-page">
        <div class="banner">
          <div class="container">
            <h1 class="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div class="container page">
          <div class="row">
            <div class="col-md-9">
              <div class="feed-toggle">
                <ul class="nav nav-pills outline-active">
                  <li class="nav-item">
                    <a href="#/" class="nav-link disabled" href="">Your Feed</a>
                  </li>
                  <li class="nav-item">
                    <a
                      href="#/"
                      class="nav-link${tab === 'global' ? ' active' : ''}"
                      onclick="${() => changeTab('global')}"
                      >Global Feed</a
                    >
                  </li>
                  ${!tab.startsWith('#')
                    ? ''
                    : html`
                        <li class="nav-item">
                          <a href="#/" class="nav-link active" onclick="${() => changeTab(tab)}"
                            >${tab}</a
                          >
                        </li>
                      `}
                </ul>
              </div>

              ${R.map(renderArticle, articles.list)}
              ${articles.loading
                ? html`
                    <div class="article-preview">
                      Loading articles...
                    </div>
                  `
                : ''}
              ${renderPagination(articles.page, articles.pageAmount, tab)}
            </div>

            <div class="col-md-3"><home-sidebar tags="${tags}"></home-sidebar></div>
          </div>
        </div>
      </div>
    `,
    { shadowRoot: false },
  ),
};

function renderArticle(article) {
  return html` <home-article article="${article}"></home-article> `;
}

function renderPagination(page, pageAmount, tab) {
  return html`
    <nav>
      <ul class="pagination">
        ${pageAmount <= 0
          ? ''
          : R.times(
              (index) =>
                html`
                  <li
                    class="page-item${index === page ? ' active' : ''}"
                    onclick="${() => (tab === 'global' ? loadPage(index) : loadTagPage(index))}"
                  >
                    <a class="page-link" href="#/">${index + 1}</a>
                  </li>
                `,
              pageAmount,
            )}
      </ul>
    </nav>
  `;
}
