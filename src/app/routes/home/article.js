import { render, html } from 'hybrids';
import * as R from 'ramda';

export default {
  article: {},
  render: render(
    ({ article }) => html`
      <div class="article-preview">
        <div class="article-meta">
          <a href="profile.html"><img src="${article.author.image}" /></a>
          <div class="info">
            <a href="#/profile/${article.author.username}" class="author"
              >${article.author.username}
            </a>
            <span class="date">${article.createdAt}</span>
          </div>
          <button class="btn btn-outline-primary btn-sm pull-xs-right">
            <i class="ion-heart"></i> ${article.favoritedCount}
            <!-- TODO change icon when favorited -->
          </button>
        </div>
        <a href="" class="preview-link">
          <h1>${article.title}</h1>
          <p>${article.description}</p>
          <span>Read more...</span>
          <ul class="tag-list">
            ${R.map(renderTag, article.tagList)}
          </ul>
        </a>
      </div>
    `,
    { shadowRoot: false },
  ),
};

function renderTag(tag) {
  return html` <li class="tag-default tag-pill tag-outline">${tag}</li> `;
}
