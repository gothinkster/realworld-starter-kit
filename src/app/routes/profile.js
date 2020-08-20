import { render, html } from 'hybrids';
import { connect } from '../core/store';
import { onPageLinkClickAction } from '../components/articleList/articleListAttributes';
import {
  loadProfileArticlePage,
  loadFavoriteArticlesPage,
  toggleFollowUserAction,
} from '../actions/profile';
import { changeLocation } from '../core/attributes';

export default {
  location: '',
  app: connect(({ app }) => app),
  userName: ({ location }) => location.split('/')[0],
  profile: connect(({ profile }) => profile),
  userIsLogged: ({ app: { user } }) => user !== null,
  render: render(
    ({
      app: { user },
      profile: {
        tab,
        articles,
        userProfile: { username, image, bio, following },
      },
      userName,
      userIsLogged,
    }) => html`
      <div class="profile-page">
        ${renderUserInfo(
          username,
          image,
          bio,
          following,
          userIsLogged && userName === user.username,
          userIsLogged,
        )}
        ${renderArticles(username, tab, articles)}
      </div>
    `,
    { shadowRoot: false },
  ),
};

function renderUserInfo(username, image, bio, following, isLoggedUser, userIsLogged) {
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
            : html`<button
                class="btn btn-sm btn-outline-secondary action-btn"
                onclick="${() =>
                  userIsLogged
                    ? toggleFollowUserAction(following, username)
                    : changeLocation('#/login')}"
              >
                <i class="ion-plus-round"></i>
                &nbsp; ${following ? 'Unfollow' : 'Follow'} ${username}
              </button>`}
        </div>
      </div>
    </div>
  </div>`;
}

function renderArticles(username, tab, articles) {
  return html`<div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a class="nav-link ${
                tab === 'My Articles' && 'active'
              }"" href="#/profile/${username}">My Articles</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link ${tab === 'Favorited Articles' && 'active'}"
                href="#/profile/${username}/favorites"
                >Favorited Articles</a
              >
            </li>
          </ul>
        </div>

        <article-list
          articles="${articles}"
          onPageLinkClick="${onPageLinkClickAction((index) =>
            tab === 'Favorited Articles'
              ? loadFavoriteArticlesPage(username, index)
              : loadProfileArticlePage(username, index),
          )}"
        ></article-list>
      </div>
    </div>
  </div>`;
}
