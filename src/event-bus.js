import EventBus from 'eventbusjs';

EventBus.on = EventBus.addEventListener.bind(EventBus);
EventBus.off = EventBus.removeEventListener.bind(EventBus);

export default EventBus;
export const dispatch = (event, target) => {
  console.log(event, target);
  EventBus.dispatch(event, target);
};
export const onEvent = EventBus.on.bind(EventBus);
export const offEvent = EventBus.off.bind(EventBus);
export const onModelChanged = cb =>
  onEvent(Events.MODEL_CHANGE, ({target}) => cb(target));

export const Events = {
  INIT_APP: 'initialize-app',
  APP_READY: 'app-ready',
  LOGIN: 'login',
  LOGIN_FAILED: 'login-failed',
  LOGIN_SUCCESS: 'login-success',
  LOGOUT: 'logout',
  UPDATE_SETTINGS: 'update-settings',
  UPDATE_SETTINGS_SUCCESS: 'update-settings-success',
  UPDATE_SETTINGS_FAILED: 'update-settings-failed',
  NAVIGATE_HOME: 'go-home',
  NAVIGATE_PROFILE: 'go-profile',
  NAVIGATE_OWN_PROFILE: 'go-own-profile',
  NAVIGATE_ARTICLE: 'go-article',
  MODEL_CHANGE: 'model-changed',
};
