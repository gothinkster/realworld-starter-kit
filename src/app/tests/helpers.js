import * as R from 'ramda';
import { render } from 'hybrids';

export function renderHelper(component, host) {
  if (R.has('render', component)) {
    if (typeof component.render === 'function') {
      render(component.render).get(host)();
    } else {
      component.render.get(host)();
    }
  }
  return host.shadowRoot ? host.shadowRoot : host;
}
