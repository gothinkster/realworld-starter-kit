export default function injectable(deps) {
  return function(target) {
    const oMethod = target.prototype.onCreated
    target.prototype.onCreated = function onCreated() {
      Object.keys(deps).forEach(key => {
        const value = deps[key]
        target.prototype[key] = value
      })
      oMethod.call(this)
    }
  }
}
