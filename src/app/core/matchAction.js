import * as R from 'ramda';

const matchAction = R.curry((action, _default, pattern) =>
  R.propOr(_default, action.type, pattern)(action),
);
export default matchAction;
