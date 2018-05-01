class EventBus {
  constructor() {
    this.listeners = Object
  }
  addEventListener(type, callback) {
    this.listeners[type] = this.listeners[type] || new Set()
    this.listeners[type].add(callback)
  }
  removeEventListener(type, callback) {
    const set = this.listeners[type]
    if (set && set.has(callback)) {
      set.remove(callback)
    }
  }
  dispatch(type, payload) {
    const set = this.listeners[type]
    if (set) {
      set.forEach(callback => {
        callback(payload)
      })
    }
  }
}

export default EventBus
