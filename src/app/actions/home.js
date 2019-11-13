import { getTags, getArticles } from '../services/conduit';
import store from '../store';

export async function loadHome() {
  store.dispatch({
    type: 'LOAD_HOME',
    tags: await getTags(),
  });
}

export async function loadPage(page = 0) {
  store.dispatch({
    type: 'START_LOAD_PAGE',
    page,
  });

  const { articles, articlesCount } = await getArticles({ offset: 20 * page });
  endLoadPage(articles, articlesCount);
}

export async function loadTagPage(tag, page = 0) {
  store.dispatch({
    type: 'START_LOAD_PAGE',
    page,
  });

  const { articles, articlesCount } = await getArticles({ tag, offset: 20 * page });
  endLoadPage(articles, articlesCount);
}

function endLoadPage(articles, count) {
  store.dispatch({
    type: 'LOAD_PAGE',
    articles,
    pageAmount: Math.ceil(count / 20),
  });
}

export async function changeTab(tab) {
  store.dispatch({
    type: 'CHANGE_TAB',
    tab,
  });

  (await tab) === 'global' ? loadPage(0) : loadTagPage(0);
}
