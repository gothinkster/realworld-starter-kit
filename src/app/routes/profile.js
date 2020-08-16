import { render, html } from 'hybrids';
import { connect } from '../core/store';

export default {
  location: '',
  app: connect(({ app }) => app),
  userName: ({ location }) => location.split('/')[0],
  path: ({ location }) => location.split('/')[1] || '',
  render: render(
    ({
      app: {
        user: { image, bio, username },
      },
      path,
      location,
    }) => html`
      <div class="profile-page">
        ${renderUserInfo(username, image, bio, location.split('/')[0] === username)}
        ${renderArticles(path)}
      </div>
    `,
    { shadowRoot: false },
  ),
};

function renderUserInfo(username, image, bio, isLoggedUser) {
  return html` <div class="user-info">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <img
            src="${image || 'https://static.productionready.io/images/smiley-cyrus.jpg'}"
            class="user-img"
          />
          <h4>${username}</h4>
          <p>
            ${bio}
          </p>

          ${isLoggedUser
            ? html`<a class="btn btn-sm btn-outline-secondary action-btn" href="#/settings">
                <i class="ion-gear-a"></i>
                Edit Profile Settings
              </a>`
            : html`<button class="btn btn-sm btn-outline-secondary action-btn">
                <i class="ion-plus-round"></i>
                &nbsp; Follow ${username}
              </button>`}
        </div>
      </div>
    </div>
  </div>`;
}

function renderArticles(path) {
  return html`<div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a class="nav-link active" href="">My Articles</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">Favorited Articles</a>
            </li>
          </ul>
        </div>

        <component-router
          location="${path}"
          routes="${{ '': 'route-profile-my-articles' }}"
        ></component-router>
      </div>
    </div>
  </div>`;
}
