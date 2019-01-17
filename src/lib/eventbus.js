class EventBus {
  constructor() {
    this.listeners = {}
    window.subs = this.listeners
  }
  addEventListener(type, callback) {
    this.listeners[type] = this.listeners[type] || new Set()
    this.listeners[type].add(callback)
    // logger.log(
    //   `%c watch ${type} count: ${this.listeners[type].size}`,
    //   'color: cyan'
    // )
  }
  removeEventListener(type, callback) {
    const set = this.listeners[type]
    if (set && set.has(callback)) {
      set.delete(callback)
      // logger.log(`%c watch ${type} count: ${set.size}`, 'color: cyan')
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
