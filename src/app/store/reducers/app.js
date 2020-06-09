import * as R from 'ramda';
import matchAction from '../../core/matchAction';

export default (state = { page: '', user: null, loading: true }, action) =>
  matchAction(action, R.always({}), {
    CHANGE_PAGE: ({ page }) => ({ page }),
    LOGIN: ({ user }) => ({ user }),
    LOAD: R.always({ loading: false }),
    LOG_OUT: R.always({ user: null, page: '' }),
  }) |> R.mergeDeepRight(state);
