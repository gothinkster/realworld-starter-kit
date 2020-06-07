import store from '../store';

export function connect(mapState) {
  return {
    get: mapState ? () => mapState(store.getState()) : () => store.getState(),
    connect: (_, __, invalidate) => store.subscribe(invalidate),
  };
}
