import { html, define } from 'hybrids';
import { connect } from '../../core/store';
import { onPageLinkClickAction } from '../articleList/articleListAttributes';
import { loadProfilePage } from '../../actions/profile';
import render from 'hybrids/lib/render';

export const routeProfileMyArticles = {
  profile: connect(({ profile }) => profile),
  app: connect(({ app }) => app),
  render: render(
    ({
      profile: { articles },
      app: {
        user: { username },
      },
    }) => html`<article-list
      articles="${articles}"
      onPageLinkClick="${onPageLinkClickAction((index) => loadProfilePage(username, index))}"
    ></article-list>`,
    { shadowRoot: false },
  ),
};

define('route-profile-my-articles', routeProfileMyArticles); /* eslint-disable-line */
