import EventBusClass from './lib/eventbus'

const EventBus = new EventBusClass()

EventBus.on = EventBus.addEventListener.bind(EventBus)
EventBus.off = EventBus.removeEventListener.bind(EventBus)

export default EventBus
export const dispatch = (event, payload) => {
  logger.log(`%c Event Dispatched: ${event}`, 'color: #aaaa00', payload)
  if (typeof payload === 'object') {
    console.info(payload)
  }
  EventBus.dispatch(event, payload)
}
export const delay = () => {
  return Promise.resolve()
}
export const onEvent = EventBus.on.bind(EventBus)
export const offEvent = EventBus.off.bind(EventBus)
export const onModelChanged = cb => onEvent(Events.MODEL_CHANGE, cb)

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
  NAVIGATE_ARTICLE: 'go-article',
  MODEL_CHANGE: 'model-changed',
  OPEN_MODAL: 'open-modal',
  CLOSE_MODAL: 'close-modal',
  GET_ARTICLES: 'get-articles',
  GET_ARTICLE: 'get-article',
  GET_PROFILE: 'get-profile',
  GET_TAGS: 'get-tags',
  FAVOR_ARTICLE: 'add-favorite',
  UNFAVOR_ARTICLE: 'remove-favorite',
  FOLLOW: 'follow-user',
  UNFOLLOW: 'unfollow-user'
}

window.dispatch = dispatch
window.Events = Events
