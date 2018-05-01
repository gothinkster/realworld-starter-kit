import {Events, dispatch} from './event-bus'
import UserStatus from './user-status'

const model = {
  user: undefined,
  appInitialized: false,
  userStatus: UserStatus.UNKNOWN,
  selectedProfile: undefined,
  update: function(data) {
    Object.keys(data).forEach(key => {
      this[key] = data[key]
    })
  },
}

let promise
const collect = (prop, value) => {
  if (!promise) {
    promise = Promise.resolve().finally(() => {
      promise = undefined
    })
  }
  promise.then(() => {
    dispatch(Events.MODEL_CHANGE, {prop, value})
  })
}

const handler = {
  set: (target, prop, value) => {
    if (target[prop] !== value) {
      console.log(`model change (${prop})`)
      target[prop] = value
      collect(prop, value)
      // dispatch(Events.MODEL_CHANGE, {prop, value})
    }
    return true
  },
}

const proxy = new Proxy(model, handler)
export default proxy

window.model = model
