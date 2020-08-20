import { getArticles, getUser, toggleFollowUser } from '../services/conduit';
import store from '../store';

export async function loadProfile(page) {
  const user = page.split('/')[1];
  const method = page.endsWith('favorites') ? loadFavoriteArticlesPage : loadProfileArticlePage;
  const tab = page.endsWith('favorites') ? 'Favorited Articles' : 'My Articles';

  const userProfile = await getUser(user);

  store.dispatch({
    type: 'LOAD_PROFILE',
    tab,
    userProfile,
  });

  return await method(user);
}

export async function loadProfileArticlePage(author, page = 0) {
  return await loadProfileArticles({ offset: 5 * page, author, limit: 5 }, page);
}

export async function loadFavoriteArticlesPage(favorited, page = 0) {
  return await loadProfileArticles({ offset: 5 * page, favorited, limit: 5 }, page);
}

async function loadProfileArticles(filter, page) {
  store.dispatch({
    type: 'START_LOAD_PROFILE_PAGE',
    page,
  });

  const { articles, articlesCount } = await getArticles(filter);
  endLoadProfilePage(articles, articlesCount);
}

function endLoadProfilePage(articles, count) {
  store.dispatch({
    type: 'LOAD_PROFILE_PAGE',
    articles,
    pageAmount: Math.ceil(count / 5),
  });
}

export async function toggleFollowUserAction(follow, username) {
  const userProfile = await toggleFollowUser(follow, username);
  store.dispatch({
    type: 'LOAD_USER_PROFILE',
    userProfile,
  });
}
