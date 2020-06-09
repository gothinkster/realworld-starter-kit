import * as R from 'ramda';
import matchAction from '../../core/matchAction';

export default (
  state = {
    tags: [],
    tab: 'global',
    articles: { loading: true, list: [], page: 0, pageAmount: 1 },
  },
  action,
) =>
  matchAction(action, R.always({}), {
    LOAD_HOME: ({ tags }) => ({
      tags,
      articles: {
        loading: true,
        list: [],
      },
    }),
    START_LOAD_PAGE: ({ page }) => ({
      articles: {
        page,
        loading: true,
      },
    }),
    LOAD_PAGE: ({ articles, pageAmount }) => ({
      articles: {
        loading: false,
        list: articles,
        pageAmount: pageAmount,
      },
    }),
    CHANGE_TAB: ({ tab }) => ({
      tab,
      articles: {
        loading: true,
        list: [],
        pageAmount: 0,
      },
    }),
  }) |> R.mergeDeepRight(state);
