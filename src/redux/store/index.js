import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

let store;
export default function prepareStore(initialState) {
  if (module.hot) {
    store = compose(
      applyMiddleware(thunk),
      applyMiddleware(createLogger({})),
    )(createStore)(rootReducer, initialState);

    module.hot.accept('../reducers', () => {
      const nextRootReducer = rootReducer;

      store.replaceReducer(nextRootReducer);
    });
  } else {
    store = compose(applyMiddleware(thunk))(createStore)(rootReducer, initialState);
  }

  return store;
}

export function getStore() {
  return store;
}
