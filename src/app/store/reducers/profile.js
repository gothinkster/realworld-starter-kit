import * as R from 'ramda';
import matchAction from '../../core/matchAction';
import { defaultArticles } from './shared';

export default (
  state = {
    articles: defaultArticles,
    tab: 'My Articles',
    userProfile: null,
  },
  action,
) =>
  matchAction(action, R.always({}), {
    LOAD_PROFILE: ({ tab, userProfile }) => ({
      tab,
      userProfile,
    }),
    LOAD_USER_PROFILE: ({ userProfile }) => ({
      userProfile,
    }),
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
