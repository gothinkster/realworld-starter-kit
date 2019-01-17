import {tag, template, useShadow} from 'slim-js/Decorators';
import {Slim} from 'slim-js';
import Router from './router';
import {onEvent, Events} from '../event-bus';

@tag ('slim-router')
@template ('&nbsp')
export default class SlimRouter extends Slim {
  routes = {};
  currentComponent;
  onBeforeCreated () {
    this.scanChildren ();
    onEvent (Events.APP_READY, () => {
      Router.resolve()
    });
  }

  scanChildren () {
    [...this.children].forEach (child => {
      if (child.localName === 'route') {
        this.registerRoute (child);
      }
    });
  }

  registerRoute (child) {
    const route = child.getAttribute ('path');
    const component = child.getAttribute ('component');
    this.routes[route] = component;
    Router.on (route, params => this.applyRoute (route, params));
  }

  applyRoute (route, params) {
    const component = this.routes[route];
    if (this.currentComponent) {
      this.currentComponent.remove ();
    }
    // await lazyLoad(component)
    this.currentComponent = document.createElement (component);
    this.currentComponent.routeParams = params;
    if (this.currentComponent.hasOwnProperty ('routeParams')) {
      this.appendChild (this.currentComponent);
    }
  }
}
