import * as R from 'ramda';
import matchAction from '../../core/matchAction';
import { defaultArticles } from './shared';

export default (
  state = {
    articles: defaultArticles,
  },
  action,
) =>
  matchAction(action, R.always({}), {
    START_LOAD_PROFILE_PAGE: ({ page }) => ({
      articles: {
        page,
        loading: true,
      },
    }),
    LOAD_PROFILE_PAGE: ({ articles, pageAmount }) => ({
      articles: {
        loading: false,
        list: articles,
        pageAmount: pageAmount,
      },
    }),
  }) |> R.mergeDeepRight(state);
