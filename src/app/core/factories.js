/* eslint-disable functional/immutable-data */
import { dispatch } from 'hybrids';

/* Will connect an event to the property instead of using addEventListener
  eventFactory: A function which receives variable arguments and returns a data to be appended to
  the event result as the detail property
*/
export function connectEvent(eventFactory) {
  return {
    connect(host, key) {
      host[key] = (...args) => dispatch(host, key.slice(2), { detail: eventFactory(...args) });
    },
  };
}
