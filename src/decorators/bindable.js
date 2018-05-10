import Model from '../model';
import {Slim} from 'slim-js';
import {onModelChanged, offEvent, Events, onEvent} from '../event-bus';

export default function bindable (name, callbacks) {
  return function (prototype, key, descriptor) {
    let fn;
    name = name || key
    const oOnRemoved = prototype.onRemoved;
    const oOnAdded = prototype.onAdded;
    const modelUpdated = function({prop, value}) {
      if (prop === name) {
        this[key] = value;
        if (callbacks) {
          if (Array.isArray(callbacks)) {
            for (let cb of callbacks) {
              this[cb].call (this);
            }
          } else if (typeof callbacks === 'string') {
            this[callbacks].call (this);
          }
        }
      }
    };

    name = name || key;

    prototype.onRemoved = function () {
      oOnRemoved.call (this);
      offEvent (Events.MODEL_CHANGE, fn);
    };
    prototype.onAdded = function () {
      oOnAdded.call (this);
      onModelChanged (fn);
      this[key] = Model[name];
    };

    descriptor.writable = true;
    descriptor.configurable = true;
    descriptor.initializer = function () {
      fn = modelUpdated.bind (this);
    };
    return descriptor;
  };
}
