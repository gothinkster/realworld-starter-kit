/* eslint-disable functional/immutable-data */
import * as R from 'ramda';

/* Will connect an event to the property instead of using addEventListener
  eventFactory: A function which receives variable arguments and returns a data to be appended to
  the event result as data property
*/
export function connectEvent(eventFactory) {
  return {
    connect: (host, key) => {
      host.addEventListener = function (type, listener) {
        if (key === `on${type}`) {
          host[key] = (...args) => {
            const data = eventFactory(...args);
            return (host, event) => listener(R.assoc('data', data, event));
          };
        }
      };
    },
  };
}
