import Model from '../model'
import {Slim} from 'slim-js'
import {onModelChanged} from '../event-bus'

export default function bindable(name) {
  return function(target, key, descriptor) {
    if (!name) {
      name = key
    }
    let self
    descriptor.writable = true
    descriptor.configurable = true
    descriptor.initializer = function() {
      self = this
    }
    onModelChanged(({prop, value}) => {
      if (prop === name) {
        self[key] = value
      }
    })
    return descriptor
  }
}
