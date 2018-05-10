import {Events, dispatch} from './event-bus'

// single-store schema
const model = {
  user: undefined,
  articles: undefined,
  articlesCount: 0,
  profile: undefined,
  article: undefined,
  comments: undefined
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
      // logger.log(`model change (${prop})`)
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
