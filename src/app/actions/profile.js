import { getArticles } from '../services/conduit';
import store from '../store';

export async function loadProfilePage(author, page = 0) {
  store.dispatch({
    type: 'START_LOAD_PROFILE_PAGE',
    page,
  });

  const { articles, articlesCount } = await getArticles({ offset: 5 * page, author, limit: 5 });
  endLoadProfilePage(articles, articlesCount);
}

function endLoadProfilePage(articles, count) {
  store.dispatch({
    type: 'LOAD_PROFILE_PAGE',
    articles,
    pageAmount: Math.ceil(count / 5),
  });
}
