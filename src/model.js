import Bus, {Events, dispatch} from './event-bus';

const model = {
  user: null,
  feed: [],
  appInitialized: false,
};

const handler = {
  set: (target, prop, value) => {
    if (target[prop] !== value) {
      target[prop] = value;
      dispatch(Events.MODEL_CHANGE, {prop, value});
    }
    return true;
  },
};

export default new Proxy(model, handler);

window.model = model;
