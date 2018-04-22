import Bus, {dispatch} from './event-bus';

const model = {
  user: null,
  feed: [],
  appInitialized: false,
};

const handler = {
  set: (target, prop, value) => {
    if (model[prop] !== value) {
      target[prop] = value;
      dispatch('model-changed', prop);
    }
    return target[prop];
  },
};

export default new Proxy(model, handler);
